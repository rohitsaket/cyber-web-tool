/**
 * Contract ownership-registry audit (WTT-P00 exit gate: "ownership registry complete").
 * Validates contracts/ownership.json: unique family ids, valid WTT-Pnn owners,
 * status enums, repo-root-contained paths, resolvable spec anchors, and
 * coverage of every contracts/ subdirectory.
 */
import { type AuditIssue, type AuditReport, buildReport, issue } from "./lib/markdown.js";

const AUDIT = "ownership";
const PHASE_RE = /^WTT-P(?:0[0-9]|[1-3][0-9]|4[0-8])$/;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_ROOTS = new Set(["apps", "packages", "services", "tools", "contracts", "docs"]);

export interface FamilySpec {
  readonly doc: string;
  readonly ref: string;
}

export interface ContractFamily {
  readonly id: string;
  readonly name: string;
  readonly ownerPhase: string;
  readonly enhancedByPhase?: string;
  readonly status: string;
  readonly path: string;
  readonly specs: readonly FamilySpec[];
}

export interface OwnershipRegistry {
  readonly version: number;
  readonly ratifiedBy: string;
  readonly granularity?: string;
  readonly statusValues: readonly string[];
  readonly families: readonly ContractFamily[];
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function parseOwnershipRegistry(raw: unknown): OwnershipRegistry | AuditIssue {
  if (!isRecord(raw)) {
    return issue(AUDIT, "SHAPE", "registry root must be an object");
  }
  if (
    raw.version !== 1 &&
    !(typeof raw.version === "number" && Number.isInteger(raw.version) && raw.version >= 1)
  ) {
    return issue(AUDIT, "VERSION", "version must be a positive integer");
  }
  if (typeof raw.ratifiedBy !== "string" || !PHASE_RE.test(raw.ratifiedBy)) {
    return issue(AUDIT, "RATIFIED_BY", "ratifiedBy must be a WTT-Pnn phase id");
  }
  if (!Array.isArray(raw.statusValues) || raw.statusValues.length === 0) {
    return issue(AUDIT, "STATUS_VALUES", "statusValues must be a non-empty array");
  }
  if (!Array.isArray(raw.families)) {
    return issue(AUDIT, "FAMILIES", "families must be an array");
  }
  return {
    version: raw.version as number,
    ratifiedBy: raw.ratifiedBy,
    granularity: asString(raw.granularity) ?? undefined,
    statusValues: raw.statusValues.filter((s): s is string => typeof s === "string"),
    families: raw.families as ContractFamily[],
  };
}

export function validateOwnershipRegistry(
  registry: OwnershipRegistry,
  reader: {
    exists(relPath: string): boolean;
    readText(relPath: string): string;
    listDir(relDir: string): string[];
  },
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const seenIds = new Set<string>();
  const coveredContractDirs = new Set<string>();

  for (const [index, family] of registry.families.entries()) {
    const where = `families[${index}]${family.id ? ` (${family.id})` : ""}`;
    const id = asString(family.id);
    if (id === null || !ID_RE.test(id)) {
      issues.push(issue(AUDIT, "FAMILY_ID", `${where}: id missing or not kebab-case`));
    } else if (seenIds.has(id)) {
      issues.push(issue(AUDIT, "FAMILY_ID", `${where}: duplicate id "${id}"`));
    } else {
      seenIds.add(id);
    }

    if (typeof family.name !== "string" || family.name.trim() === "") {
      issues.push(issue(AUDIT, "FAMILY_NAME", `${where}: name must be a non-empty string`));
    }
    if (typeof family.ownerPhase !== "string" || !PHASE_RE.test(family.ownerPhase)) {
      issues.push(issue(AUDIT, "OWNER_PHASE", `${where}: ownerPhase must match WTT-P00..WTT-P48`));
    }
    if (family.enhancedByPhase !== undefined && !PHASE_RE.test(family.enhancedByPhase)) {
      issues.push(
        issue(AUDIT, "ENHANCED_BY", `${where}: enhancedByPhase must match WTT-P00..WTT-P48`),
      );
    }
    if (typeof family.status !== "string" || !registry.statusValues.includes(family.status)) {
      issues.push(
        issue(
          AUDIT,
          "STATUS",
          `${where}: status must be one of ${registry.statusValues.join("/")}`,
        ),
      );
    }

    const path = typeof family.path === "string" ? family.path : "";
    const pathParts = path.split(/[\\/]/);
    if (path === "" || path.startsWith("/") || pathParts.includes("..")) {
      issues.push(
        issue(AUDIT, "PATH", `${where}: path must be repo-root-relative without traversal`),
      );
    } else if (!ALLOWED_ROOTS.has(pathParts[0] ?? "")) {
      issues.push(
        issue(
          AUDIT,
          "PATH",
          `${where}: path root "${pathParts[0]}" outside ${[...ALLOWED_ROOTS].join("/")}`,
        ),
      );
    } else if (path.endsWith("/")) {
      // Planned family directories may not exist yet; the contracts/ ones do.
      if (family.status !== "PLANNED" && !reader.exists(path)) {
        issues.push(issue(AUDIT, "PATH", `${where}: path "${path}" does not exist`));
      }
    } else if (family.status !== "PLANNED" && !reader.exists(path)) {
      issues.push(issue(AUDIT, "PATH", `${where}: file "${path}" does not exist`));
    }
    if (pathParts[0] === "contracts" && pathParts[1]) {
      coveredContractDirs.add(pathParts[1]);
    }

    if (!Array.isArray(family.specs) || family.specs.length === 0) {
      issues.push(issue(AUDIT, "SPECS", `${where}: at least one spec anchor required`));
    } else {
      for (const spec of family.specs) {
        if (!isRecord(spec) || typeof spec.doc !== "string" || typeof spec.ref !== "string") {
          issues.push(issue(AUDIT, "SPECS", `${where}: spec entries need {doc, ref} strings`));
          continue;
        }
        if (!reader.exists(spec.doc)) {
          issues.push(
            issue(AUDIT, "SPEC_DANGLING_DOC", `${where}: spec doc "${spec.doc}" missing`),
          );
          continue;
        }
        let text = "";
        try {
          text = reader.readText(spec.doc);
        } catch (err) {
          issues.push(
            issue(
              AUDIT,
              "SPEC_READ",
              `${where}: cannot read "${spec.doc}": ${(err as Error).message}`,
            ),
          );
          continue;
        }
        if (!text.includes(spec.ref)) {
          issues.push(
            issue(
              AUDIT,
              "SPEC_DANGLING_REF",
              `${where}: ref "${spec.ref}" not found in ${spec.doc}`,
            ),
          );
        }
      }
    }
  }

  // Every contracts/ subdirectory must be owned by at least one family.
  for (const entry of reader.listDir("contracts")) {
    if (entry === "README.md" || entry === "ownership.json") continue;
    if (!coveredContractDirs.has(entry)) {
      issues.push(
        issue(AUDIT, "UNOWNED_DIR", `contracts/${entry} is not covered by any family path`),
      );
    }
  }
  return issues;
}

export function auditOwnership(reader: {
  exists(relPath: string): boolean;
  readText(relPath: string): string;
  listDir(relDir: string): string[];
}): AuditReport {
  if (!reader.exists("contracts/ownership.json")) {
    return buildReport(AUDIT, "missing contracts/ownership.json", [
      issue(AUDIT, "MISSING_REGISTRY", "contracts/ownership.json not found"),
    ]);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(reader.readText("contracts/ownership.json"));
  } catch (err) {
    return buildReport(AUDIT, "invalid JSON", [issue(AUDIT, "JSON_PARSE", (err as Error).message)]);
  }
  const registry = parseOwnershipRegistry(parsed);
  if ("audit" in registry) {
    return buildReport(AUDIT, "invalid registry shape", [registry]);
  }
  const issues = validateOwnershipRegistry(registry, reader);
  const summary = `families=${registry.families.length} | issues=${issues.length}`;
  return buildReport(AUDIT, summary, issues);
}
