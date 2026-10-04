/**
 * Cross-document terminology audit (WTT-P00 test: "zero undefined canonical terms").
 * Canonical term sets: RULES WTT-RULE-RES-001 naming list + PRD WTT-DOC-006 glossary list.
 * A term is DEFINED when it has a PRD Appendix B row, or a docs/engineering/TERMS.json
 * entry pointing at a definition anchor that verifiably exists in the cited doc.
 * TERMS.json also seeds forbidden-alias pairs (RULES RES-002 "ambiguous aliases are
 * prohibited") that must never appear in any repo markdown.
 */
import {
  type AuditIssue,
  type AuditReport,
  buildReport,
  issue,
  tableRowsUnder,
} from "./lib/markdown.js";

const AUDIT = "terminology";

export interface TermsRegistry {
  readonly version: number;
  readonly definedElsewhere: readonly { term: string; doc: string; anchor: string }[];
  readonly forbiddenAliases: readonly { alias: string; canonical: string }[];
}

interface Reader {
  exists(relPath: string): boolean;
  readText(relPath: string): string;
  listMarkdownFiles(): string[];
}

export function extractRuleCanonicalTerms(rulesText: string): string[] {
  const match = rulesText.match(/Naming MUST stay canonical \(([^)]*)\)/);
  if (!match || match[1] === undefined) return [];
  return match[1]
    .split(",")
    .map((t) => t.trim().replace(/`/g, ""))
    .filter((t) => t.length > 0);
}

export function extractPrdBTerms(prdText: string): string[] {
  const { rows } = tableRowsUnder(prdText, "Appendix B — Glossary");
  const terms: string[] = [];
  for (const row of rows) {
    const cell = row[0];
    if (!cell) continue;
    for (const part of cell.split("/")) {
      const term = part.trim();
      if (term.length > 0) terms.push(term);
    }
  }
  return terms;
}

export function extractDoc006Terms(prdText: string): string[] {
  const match = prdText.match(/use glossary terms consistently \(([^)]*)\)/);
  if (!match || match[1] === undefined) return [];
  return match[1]
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function parseTermsRegistry(raw: unknown): TermsRegistry | AuditIssue {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return issue(AUDIT, "TERMS_SHAPE", "TERMS.json root must be an object");
  }
  const rec = raw as Record<string, unknown>;
  if (rec.version !== 1) return issue(AUDIT, "TERMS_SHAPE", "TERMS.json version must be 1");
  const defined = Array.isArray(rec.definedElsewhere) ? rec.definedElsewhere : null;
  const aliases = Array.isArray(rec.forbiddenAliases) ? rec.forbiddenAliases : null;
  if (!defined || !aliases) {
    return issue(AUDIT, "TERMS_SHAPE", "definedElsewhere and forbiddenAliases must be arrays");
  }
  const definedRows: { term: string; doc: string; anchor: string }[] = [];
  for (const entry of defined) {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof (entry as Record<string, unknown>).term !== "string" ||
      typeof (entry as Record<string, unknown>).doc !== "string" ||
      typeof (entry as Record<string, unknown>).anchor !== "string"
    ) {
      return issue(AUDIT, "TERMS_SHAPE", "definedElsewhere entries need {term, doc, anchor}");
    }
    const e = entry as { term: string; doc: string; anchor: string };
    definedRows.push(e);
  }
  const aliasRows: { alias: string; canonical: string }[] = [];
  for (const entry of aliases) {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof (entry as Record<string, unknown>).alias !== "string" ||
      typeof (entry as Record<string, unknown>).canonical !== "string"
    ) {
      return issue(AUDIT, "TERMS_SHAPE", "forbiddenAliases entries need {alias, canonical}");
    }
    aliasRows.push(entry as { alias: string; canonical: string });
  }
  return { version: 1, definedElsewhere: definedRows, forbiddenAliases: aliasRows };
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function auditTerminology(reader: Reader): AuditReport {
  const issues: AuditIssue[] = [];
  for (const required of ["RULES.md", "PRD.md", "docs/engineering/TERMS.json"]) {
    if (!reader.exists(required)) {
      return buildReport(AUDIT, `missing ${required}`, [
        issue(AUDIT, "MISSING_INPUT", `${required} not found`),
      ]);
    }
  }
  const rulesText = reader.readText("RULES.md");
  const prdText = reader.readText("PRD.md");
  const rulesTerms = extractRuleCanonicalTerms(rulesText);
  const prdTerms = extractPrdBTerms(prdText);
  if (rulesTerms.length === 0) {
    issues.push(
      issue(AUDIT, "RULES_PARSE", "could not extract canonical terms from RULES.md RES-001"),
    );
  }
  if (prdTerms.length === 0) {
    issues.push(
      issue(AUDIT, "PRD_PARSE", "could not extract Appendix B glossary rows from PRD.md"),
    );
  }

  const doc006 = extractDoc006Terms(prdText);
  for (const term of doc006) {
    if (!prdTerms.includes(term)) {
      issues.push(
        issue(AUDIT, "DOC006_UNDOCUM", `WTT-DOC-006 term "${term}" has no Appendix B row`),
      );
    }
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(reader.readText("docs/engineering/TERMS.json"));
  } catch (err) {
    return buildReport(AUDIT, "invalid TERMS.json JSON", [
      issue(AUDIT, "TERMS_JSON", (err as Error).message),
    ]);
  }
  const registryOrIssue = parseTermsRegistry(parsed);
  if ("audit" in registryOrIssue) {
    return buildReport(AUDIT, "invalid TERMS.json", [registryOrIssue]);
  }
  const registry = registryOrIssue;

  // (1) every canonical term must be defined in PRD B or TERMS.json (not both).
  const definedElsewhereTerms = new Set<string>();
  for (const entry of registry.definedElsewhere) {
    if (definedElsewhereTerms.has(entry.term)) {
      issues.push(
        issue(AUDIT, "TERMS_DUP", `duplicate definedElsewhere entry for "${entry.term}"`),
      );
    }
    definedElsewhereTerms.add(entry.term);
    if (prdTerms.includes(entry.term)) {
      issues.push(
        issue(
          AUDIT,
          "TERMS_OVERLAP",
          `"${entry.term}" defined both in TERMS.json and PRD Appendix B`,
        ),
      );
      continue;
    }
    if (!reader.exists(entry.doc)) {
      issues.push(issue(AUDIT, "TERMS_DOC", `${entry.term}: doc "${entry.doc}" missing`));
      continue;
    }
    if (!reader.readText(entry.doc).includes(entry.anchor)) {
      issues.push(
        issue(
          AUDIT,
          "TERMS_ANCHOR",
          `${entry.term}: anchor "${entry.anchor}" not found in ${entry.doc}`,
        ),
      );
    }
  }

  const canonical = new Set([...rulesTerms, ...doc006, ...prdTerms]);
  let undefinedCount = 0;
  for (const term of canonical) {
    if (!prdTerms.includes(term) && !definedElsewhereTerms.has(term)) {
      undefinedCount++;
      issues.push(
        issue(AUDIT, "UNDEFINED_TERM", `"${term}" is canonical but has no definition location`),
      );
    }
  }

  // (2) forbidden aliases must have zero hits in any repo markdown.
  const mdFiles = reader.listMarkdownFiles();
  const corpus = mdFiles
    .map((file) => ({ file, text: reader.readText(file) }))
    .filter((f) => f.text !== undefined);
  let aliasHits = 0;
  for (const { alias, canonical: replacement } of registry.forbiddenAliases) {
    const pattern = new RegExp(`\\b${escapeRegExp(alias)}\\b`, "i");
    for (const { file, text } of corpus) {
      if (pattern.test(text)) {
        aliasHits++;
        issues.push(
          issue(
            AUDIT,
            "FORBIDDEN_ALIAS",
            `alias "${alias}" found in ${file} — canonical: "${replacement}"`,
          ),
        );
      }
    }
  }

  const summary =
    `canonical=${canonical.size} | prdB=${prdTerms.length} | termsJson=${registry.definedElsewhere.length} | ` +
    `undefined=${undefinedCount} | aliasEntries=${registry.forbiddenAliases.length} | aliasHits=${aliasHits} | mdFiles=${corpus.length}`;
  return buildReport(AUDIT, summary, issues);
}
