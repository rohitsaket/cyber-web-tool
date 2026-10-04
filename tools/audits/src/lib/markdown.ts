/**
 * Shared audit primitives: safe document reading + markdown parsing.
 * Governance tooling only — runs at build/CI time, never inside a WTT session.
 */
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, join, resolve, sep } from "node:path";

export interface AuditIssue {
  readonly audit: string;
  readonly code: string;
  readonly message: string;
}

export interface AuditReport {
  readonly audit: string;
  readonly ok: boolean;
  readonly summary: string;
  readonly issues: readonly AuditIssue[];
}

export function buildReport(
  audit: string,
  summary: string,
  issues: readonly AuditIssue[],
): AuditReport {
  return { audit, ok: issues.length === 0, summary, issues };
}

export function issue(audit: string, code: string, message: string): AuditIssue {
  return { audit, code, message };
}

/**
 * Repository-scoped document reader. All paths are repo-root relative;
 * absolute paths, `..` traversal and symlink escapes are rejected (security
 * review, WTT-P00 plan §6).
 */
export interface DocReader {
  readText(relPath: string): string;
  exists(relPath: string): boolean;
  /** Directory entries (names only) for a root-relative directory. */
  listDir(relDir: string): string[];
  /** All markdown files (root-relative paths) at repo root + under docs/. */
  listMarkdownFiles(): string[];
}

function normalizeRelPath(relPath: string): string {
  const parts = relPath.split(/[\\/]/);
  if (isAbsolute(relPath) || parts.some((p) => p === "..")) {
    throw new Error(`Path escapes the repository root: ${relPath}`);
  }
  return join(...parts);
}

export class FsDocReader implements DocReader {
  constructor(private readonly root: string) {
    this.root = realpathSync(root);
  }

  private resolveContained(relPath: string): string {
    const normalized = normalizeRelPath(relPath);
    const abs = resolve(this.root, normalized);
    if (abs !== this.root && !abs.startsWith(this.root + sep)) {
      throw new Error(`Path escapes the repository root: ${relPath}`);
    }
    if (existsSync(abs)) {
      const real = realpathSync(abs);
      if (real !== this.root && !real.startsWith(this.root + sep)) {
        throw new Error(`Symlink escapes the repository root: ${relPath}`);
      }
    }
    return abs;
  }

  readText(relPath: string): string {
    const abs = this.resolveContained(relPath);
    if (!existsSync(abs)) throw new Error(`File not found: ${relPath}`);
    return normalizeNewlines(readFileSync(abs, "utf8"));
  }

  exists(relPath: string): boolean {
    return existsSync(this.resolveContained(relPath));
  }

  listDir(relDir: string): string[] {
    const abs = this.resolveContained(relDir);
    if (!existsSync(abs) || !statSync(abs).isDirectory()) return [];
    return readdirSync(abs).sort();
  }

  listMarkdownFiles(): string[] {
    const out: string[] = [];
    for (const name of this.listDir(".")) {
      if (name.endsWith(".md")) out.push(name);
    }
    const walk = (dir: string): void => {
      for (const name of this.listDir(dir)) {
        const rel = `${dir}/${name}`;
        const abs = resolve(this.root, rel);
        if (statSync(abs).isDirectory()) walk(rel);
        else if (name.endsWith(".md")) out.push(rel);
      }
    };
    if (this.exists("docs")) walk("docs");
    return out.sort();
  }
}

/** CRLF/CR → LF so audits behave identically on every OS checkout. */
export function normalizeNewlines(text: string): string {
  return text.replace(/\r\n?/g, "\n");
}

/** Extract a markdown pipe-table row's cells (without leading/trailing empties). */
export function parseTableRow(line: string): string[] | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  if (/^\|[\s\-:|]+\|$/.test(trimmed)) return null; // separator row
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

/** Collect all table rows that follow a heading matching `headingNeedle` until the next heading of same-or-higher level. */
export function tableRowsUnder(
  markdown: string,
  headingNeedle: string,
): { header: string[]; rows: string[][] } {
  const lines = markdown.split("\n");
  const headingIdx = lines.findIndex((l) => l.startsWith("#") && l.includes(headingNeedle));
  if (headingIdx === -1) return { header: [], rows: [] };
  const headingLine = lines[headingIdx] ?? "";
  const levelMatch = /^#+/.exec(headingLine);
  const level = levelMatch ? levelMatch[0].length : 2;
  const tableLines: string[] = [];
  for (let i = headingIdx + 1; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const [, hashes] = /^(#+)\s/.exec(line) ?? [];
    if (hashes && hashes.length <= level) break;
    tableLines.push(line);
  }
  const rows = tableLines.map((l) => parseTableRow(l)).filter((r): r is string[] => r !== null);
  const [header, ...dataRows] = rows;
  return { header: header ?? [], rows: dataRows };
}
