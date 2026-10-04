/**
 * Integration test (WTT-P00 AC-004/AC-005): run both audits against the REAL
 * repository documents — not just fixtures — exactly as CI does.
 */
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FsDocReader } from "../src/lib/markdown.js";
import { auditOwnership } from "../src/ownership-audit.js";
import { auditTerminology } from "../src/terminology-audit.js";

const repoRoot = resolve(import.meta.dirname, "../../..");

describe("repo governance audits (integration)", () => {
  const reader = new FsDocReader(repoRoot);

  it("ownership registry passes on the real repo", () => {
    const report = auditOwnership(reader);
    expect(report.issues.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    expect(report.ok).toBe(true);
  });

  it("terminology audit passes on the real repo", () => {
    const report = auditTerminology(reader);
    expect(report.issues.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    expect(report.ok).toBe(true);
  });
});
