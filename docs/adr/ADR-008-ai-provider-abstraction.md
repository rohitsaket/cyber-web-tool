# ADR-008 — AI provider abstraction

**Status:** ACCEPTED as principle (ratified WTT-P00; implementation WTT-P13/P26-adjacent) · **Trace:** PRD WTT-MOD-001…006; ARCHITECTURE §24/§26 (gateway, AI security boundary §26.1); RULES WTT-RULE-AI-002 (MUST not hard-code one provider); PHASES §32 (P13).

## Context

AI authority is strictly bounded: models recommend, deterministic policy decides
(WTT-RULE-AI-001/004 NON-NEGOTIABLE; ARCHITECTURE §79 invariant 9 "no backdoor clients"). No
code path may hard-code a provider/model/API shape.

## Decision

One **in-control-plane AI gateway** port layer (routing/fallback/budgets/usage ledger/redaction
per §78 "RECOMMENDED → selected"), behind which providers are adapters:

- Provider registry + model registry with capability detection, context/token limits, retry /
  429-backoff, per-provider data policy (WTT-MOD-003/004); credentials are **secret refs only**
  (never logged; WTT-MOD-004, ARCH §79 invariant 10).
- Every call records provider/model/task/io-references/action/usage (WTT-MOD-005,
  WTT-RULE-AI-007) — traceability without chain-of-thought storage.
- All prompt content passes the untrusted-target boundary: on-page instructions are data,
  flagged, never executed (WTT-RULE-AISEC-001/002 NON-NEGOTIABLE).
- Local/offline operation stays supported: deterministic planner + local models where configured
  (WTT-MOD-006; P13 degraded-mode test gates).
- Concrete default provider list + local-model floor = PRD OD-006, due P13 — P00 deliberately
  does not pre-pick vendors (capability-first; RULES §11).

## Consequences

- ✅ Provider swaps never touch core; budgets/ledgers are auditable product state.
- ⚠️ Gateway becomes a critical-path component at P13 — injection/escalation suites are its
  acceptance gates (PHASES §32), seeded in `docs/security/threat-checklist.md`.
