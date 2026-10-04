import { describe, expect, it } from "vitest";
import {
  auditTerminology,
  extractDoc006Terms,
  extractPrdBTerms,
  extractRuleCanonicalTerms,
} from "../src/terminology-audit.js";
import { memTree } from "./helpers.js";

const RULES_FIXTURE = `## 45. Resource Rules
WTT-RULE-RES-001: Naming MUST stay canonical (\`WTT\`, \`Session\`, \`Capability\`, \`Tool\`) — one concept, one name.`;

const PRD_FIXTURE = `## 1.5 Glossary
WTT-DOC-006: The PRD MUST define terms in Appendix B. Implementations MUST use glossary terms consistently (Session, Finding, Report).

### Appendix B — Glossary (normative terms)

| Term | Meaning |
|---|---|
| Session | One lifecycle. |
| Test / Scenario / Step | Executable check / sequence / action. |
| Finding | Observation. |
| Report | Verdict render. |

### Appendix C — Next
| Not counted |`;

const TERMS_OK = {
  version: 1,
  definedElsewhere: [
    { term: "WTT", doc: "PRD.md", anchor: "WTT — Website Testing Tool" },
    { term: "Capability", doc: "TOOLS.md", anchor: "## 5. Capability Model" },
    { term: "Tool", doc: "TOOLS.md", anchor: "## 6. Tool Model" },
  ],
  forbiddenAliases: [{ alias: "web tester", canonical: "WTT" }],
};

function fixture(overrides: Partial<Record<string, string>> = {}) {
  return memTree(
    new Map<string, string>(
      Object.entries({
        "RULES.md": RULES_FIXTURE,
        "PRD.md": `${PRD_FIXTURE}\nWTT — Website Testing Tool\n`,
        "TOOLS.md": "## 5. Capability Model\n## 6. Tool Model\n",
        "docs/engineering/TERMS.json": JSON.stringify(TERMS_OK),
        ...overrides,
      }),
    ),
  );
}

describe("term extraction", () => {
  it("extracts canonical names from the RULES RES-001 sentence", () => {
    expect(extractRuleCanonicalTerms(RULES_FIXTURE)).toEqual([
      "WTT",
      "Session",
      "Capability",
      "Tool",
    ]);
  });

  it("splits combined Appendix B rows like 'Test / Scenario / Step'", () => {
    expect(extractPrdBTerms(PRD_FIXTURE)).toEqual([
      "Session",
      "Test",
      "Scenario",
      "Step",
      "Finding",
      "Report",
    ]);
  });

  it("extracts DOC-006 inline list", () => {
    expect(extractDoc006Terms(PRD_FIXTURE)).toEqual(["Session", "Finding", "Report"]);
  });
});

describe("auditTerminology", () => {
  it("passes when every canonical term is defined exactly once", () => {
    const report = auditTerminology(fixture());
    expect(report.ok).toBe(true);
    expect(report.summary).toContain("undefined=0");
  });

  it("flags canonical terms with no definition location", () => {
    const report = auditTerminology(
      fixture({
        "docs/engineering/TERMS.json": JSON.stringify({ ...TERMS_OK, definedElsewhere: [] }),
      }),
    );
    const codes = report.issues.map((i) => i.code);
    expect(codes).toContain("UNDEFINED_TERM");
    expect(report.issues.some((i) => i.message.includes("Capability"))).toBe(true);
  });

  it("flags dangling definition anchors", () => {
    const report = auditTerminology(
      fixture({
        "docs/engineering/TERMS.json": JSON.stringify({
          ...TERMS_OK,
          definedElsewhere: [{ term: "WTT", doc: "PRD.md", anchor: "nonexistent anchor zzz" }],
        }),
      }),
    );
    expect(report.issues.some((i) => i.code === "TERMS_ANCHOR")).toBe(true);
  });

  it("forbids duplicate/overlapping definitions (single source of truth)", () => {
    const report = auditTerminology(
      fixture({
        "docs/engineering/TERMS.json": JSON.stringify({
          ...TERMS_OK,
          definedElsewhere: [
            ...TERMS_OK.definedElsewhere,
            { term: "Session", doc: "PRD.md", anchor: "WTT — Website Testing Tool" },
          ],
        }),
      }),
    );
    expect(report.issues.some((i) => i.code === "TERMS_OVERLAP")).toBe(true);
  });

  it("flags forbidden aliases across repo markdown", () => {
    const report = auditTerminology(
      fixture({
        "docs/guide.md": "Some doc where a rogue alias web tester slipped in",
      }),
    );
    expect(
      report.issues.some(
        (i) => i.code === "FORBIDDEN_ALIAS" && i.message.includes("docs/guide.md"),
      ),
    ).toBe(true);
  });

  it("flags DOC-006 terms missing from Appendix B", () => {
    const report = auditTerminology(
      fixture({
        "PRD.md": `${PRD_FIXTURE.replace("| Report | Verdict render. |", "")}\nWTT — Website Testing Tool`,
      }),
    );
    expect(
      report.issues.some((i) => i.code === "DOC006_UNDOCUM" && i.message.includes("Report")),
    ).toBe(true);
  });

  it("errors when required inputs are missing", () => {
    const report = auditTerminology(memTree(new Map([["RULES.md", "x"]])));
    expect(report.issues[0]?.code).toBe("MISSING_INPUT");
  });
});
