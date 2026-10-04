# ADR-007 — Inter-language RPC & `contracts/` ownership

**Status:** ACCEPTED (ratified WTT-P00 — incl. ARCH-OD-013 disposition) · **Trace:** ARCHITECTURE §30–31, §63, §78 (Python/Java comms rows), ARCH-310/510; API.md §1189; TOOLS.md WTT-TOL-COM-001; RULES WTT-RULE-LANG-004.

## Context

WTT spans TypeScript (control plane), Python (AI/data/vision tooling), and Java (throughput
workers, dormant). Free-form JSON between services is prohibited; the escalation ladder and
schema ownership must be fixed once. ARCH-OD-013 additionally asked to confirm the PRD WTT-RTE-005
wording ("distributed прикреплениe"): confirmed as **"distributed attachment"**; PRD.md amended
editorially in P00 (see CHANGELOG) — configuration-only distributed attachment, no code changes.

## Decision

Escalation ladder (binding from the first cross-language consumer, P08+):

1. **Short-lived tool processes:** stdin/stdout **JSON Lines** + structured exit codes — lowest
   ops, no ports (WTT-TOL-COM-001 default).
2. **Local persistent services:** Unix socket → loopback HTTP.
3. **High-throughput / streaming / distributed:** gRPC with versioned `.proto` in
   `contracts/proto/` (owner: inter-language-services family, WTT-P08). Java workers take the
   gRPC path when they exist (PHASES §74 "DECIDED-dormant").
- REST is never duplicated in gRPC without measured benefit (API §1189 rule).
- `contracts/` is the **single schema source** for all three languages; bindings are generated,
  marked, and never hand-edited (ARCH-310; RULES WTT-RULE-ARC-010). Ownership of every contract
  family is machine-recorded in `contracts/ownership.json` (P00 registry; CI-audited).

## Consequences

- ✅ Python tools cost nothing to run (spawn, stream JSONL, exit); gRPC reserved for paths that
  measurably need it.
- ⚠️ Codegen tooling must be pinned per toolchain at P08 (lockfile + SCA per RULES §42).
