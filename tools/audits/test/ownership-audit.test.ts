import { describe, expect, it } from "vitest";
import {
  auditOwnership,
  type OwnershipRegistry,
  validateOwnershipRegistry,
} from "../src/ownership-audit.js";
import { memTree } from "./helpers.js";

const BASE_FAMILY = {
  id: "event-system-contracts",
  name: "Event envelope + families",
  ownerPhase: "WTT-P04",
  status: "PLANNED",
  path: "contracts/schemas/events/",
  specs: [{ doc: "PHASES.md", ref: "envelope v1" }],
};

function tree(overrides: Record<string, unknown> = {}) {
  const registry = {
    version: 1,
    ratifiedBy: "WTT-P00",
    statusValues: ["PLANNED", "ACTIVE", "FROZEN"],
    families: [BASE_FAMILY],
    ...overrides,
  };
  return memTree({
    "contracts/ownership.json": JSON.stringify(registry),
    "contracts/schemas/README.md": "# schemas",
    "PHASES.md": "text mentioning envelope v1 here",
  });
}

describe("auditOwnership", () => {
  it("passes a valid registry", () => {
    const report = auditOwnership(tree());
    expect(report.ok).toBe(true);
    expect(report.summary).toContain("families=1");
  });

  it("flags missing registry file", () => {
    const report = auditOwnership(memTree({ "PHASES.md": "x" }));
    expect(report.ok).toBe(false);
    expect(report.issues[0]?.code).toBe("MISSING_REGISTRY");
  });

  it("flags invalid JSON", () => {
    const report = auditOwnership(memTree({ "contracts/ownership.json": "{not json" }));
    expect(report.issues[0]?.code).toBe("JSON_PARSE");
  });

  const codesFor = (registryOverrides: Record<string, unknown>): string[] => {
    const r = registryOverrides;
    const report = auditOwnership(
      (() => {
        const reg = {
          version: 1,
          ratifiedBy: "WTT-P00",
          statusValues: ["PLANNED", "ACTIVE", "FROZEN"],
          families: [BASE_FAMILY],
          ...r,
        };
        return memTree({
          "contracts/ownership.json": JSON.stringify(reg),
          "contracts/schemas/README.md": "# schemas",
          "PHASES.md": "text mentioning envelope v1 here",
        });
      })(),
    );
    return report.issues.map((i) => i.code);
  };

  it("rejects duplicate ids, bad phases, bad status, bad ids", () => {
    const dup = codesFor({
      families: [BASE_FAMILY, { ...BASE_FAMILY, path: "contracts/proto/" }],
    });
    expect(dup).toContain("FAMILY_ID");

    const badPhase = codesFor({ families: [{ ...BASE_FAMILY, ownerPhase: "WTT-P49" }] });
    expect(badPhase).toContain("OWNER_PHASE");

    const badStatus = codesFor({ families: [{ ...BASE_FAMILY, status: "SOMEDAY" }] });
    expect(badStatus).toContain("STATUS");

    const badId = codesFor({ families: [{ ...BASE_FAMILY, id: "Bad_ID" }] });
    expect(badId).toContain("FAMILY_ID");
  });

  it("rejects traversal/absolute paths and paths outside allowed roots", () => {
    expect(codesFor({ families: [{ ...BASE_FAMILY, path: "../outside/" }] })).toContain("PATH");
    expect(codesFor({ families: [{ ...BASE_FAMILY, path: "/etc/" }] })).toContain("PATH");
    expect(codesFor({ families: [{ ...BASE_FAMILY, path: "elsewhere/x/" }] })).toContain("PATH");
  });

  it("requires path existence for non-PLANNED statuses", () => {
    const issues = codesFor({
      families: [{ ...BASE_FAMILY, status: "ACTIVE", path: "contracts/does-not-exist/" }],
    });
    expect(issues).toContain("PATH");
  });

  it("detects dangling spec doc and ref", () => {
    expect(
      codesFor({
        families: [{ ...BASE_FAMILY, specs: [{ doc: "NOPE.md", ref: "x" }] }],
      }),
    ).toContain("SPEC_DANGLING_DOC");
    expect(
      codesFor({
        families: [
          { ...BASE_FAMILY, specs: [{ doc: "PHASES.md", ref: "phrase not present at all" }] },
        ],
      }),
    ).toContain("SPEC_DANGLING_REF");
    expect(codesFor({ families: [{ ...BASE_FAMILY, specs: [] }] })).toContain("SPECS");
  });

  it("detects unowned contracts subdirectories", () => {
    const reader = memTree({
      "contracts/ownership.json": JSON.stringify({
        version: 1,
        ratifiedBy: "WTT-P00",
        statusValues: ["PLANNED", "ACTIVE", "FROZEN"],
        families: [BASE_FAMILY],
      }),
      "contracts/schemas/README.md": "# s",
      "contracts/mystery/README.md": "# oops, nobody owns this",
      "PHASES.md": "mentions envelope v1",
    });
    const report = auditOwnership(reader);
    expect(
      report.issues.some((i) => i.code === "UNOWNED_DIR" && i.message.includes("mystery")),
    ).toBe(true);
  });

  it("validates a registry-shaped object directly (unit-level)", () => {
    const registry: OwnershipRegistry = {
      version: 1,
      ratifiedBy: "WTT-P00",
      statusValues: ["PLANNED"],
      families: [{ ...BASE_FAMILY, enhancedByPhase: "WTT-P05" }],
    };
    const reader = memTree({ "PHASES.md": "envelope v1" });
    expect(validateOwnershipRegistry(registry, reader)).toEqual([]);
    const broken = { ...registry, families: [{ ...BASE_FAMILY, enhancedByPhase: "P05" }] };
    expect(validateOwnershipRegistry(broken, reader).map((i) => i.code)).toContain("ENHANCED_BY");
  });
});
