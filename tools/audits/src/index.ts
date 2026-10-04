#!/usr/bin/env node
/**
 * WTT governance audits CLI (build/CI tooling, WTT-P00).
 * Exit codes: 0 = all selected audits pass, 1 = violations found, 2 = usage/internal error.
 */
import { type AuditReport, FsDocReader } from "./lib/markdown.js";
import { auditOwnership } from "./ownership-audit.js";
import { auditTerminology } from "./terminology-audit.js";

type Command = "ownership" | "terminology" | "all";

const USAGE = `Usage: wtt-audits <ownership|terminology|all> [--root <repoRoot>]

Runs WTT governance audits from the repository root:
  ownership      validate contracts/ownership.json (registry rules)
  terminology    canonical-term coverage + forbidden-alias scan
  all            both audits (default)
Exit codes: 0 ok · 1 violations · 2 usage/internal error`;

function printReport(report: AuditReport): void {
  const status = report.ok ? "PASS" : "FAIL";
  console.log(`[${report.audit}] ${status} — ${report.summary}`);
  for (const it of report.issues) {
    console.log(`  (${it.code}) ${it.message}`);
  }
}

function parseArgs(argv: readonly string[]): { command: Command; root: string } {
  let command: Command = "all";
  let root = process.cwd();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--root") {
      const next = argv[++i];
      if (!next) throw new Error("--root requires a value");
      root = next;
    } else if (arg === "ownership" || arg === "terminology" || arg === "all") {
      command = arg;
    } else if (arg === "--help" || arg === "-h") {
      console.log(USAGE);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return { command, root };
}

function main(): number {
  let parsed: { command: Command; root: string };
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`error: ${(err as Error).message}\n\n${USAGE}`);
    return 2;
  }
  const reader = new FsDocReader(parsed.root);
  const reports: AuditReport[] = [];
  if (parsed.command === "ownership" || parsed.command === "all") {
    reports.push(auditOwnership(reader));
  }
  if (parsed.command === "terminology" || parsed.command === "all") {
    reports.push(auditTerminology(reader));
  }
  let failed = false;
  for (const report of reports) {
    printReport(report);
    failed ||= !report.ok;
  }
  return failed ? 1 : 0;
}

process.exitCode = main();
