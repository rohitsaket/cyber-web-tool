# WTT Security Invariant & Threat Checklist (seeded — WTT-P00)

**Status: SEED.** PHASES §19 requires P00 to *record* invariants and *seed* the threat checklist;
the full threat model is SECURITY.md — created as a slice by WTT-P02 (scope/auth/scope engine),
deepened by P03/P05/P07/P08/P24–P26/P32/P48 per PHASES §75. This file is the single index into
the canonical invariant sources — it re-states nothing (RULES §54 and ARCHITECTURE §79 remain
the ONLY authoritative invariant texts; duplication prohibited).

## Invariant families → enforcement map

| # | Family (P00 term) | Canonical sources (MUST not weaken) | Enforcement implemented by | Threat seeds to verify there |
|---|---|---|---|---|
| 1 | Scope authority | RULES §6/§17, §54 (2,4,19); ARCH §79 (1,5); PRD §13 | P02 (policy engine) → P03 (enforcement) → P25 (gated active) | unauthorized target, redirect escape, out-of-scope pivot, DNS rebinding, prod-by-default-denied |
| 2 | Terminal safety | RULES §15; PHASES §22 (8-class pipeline); ARCH §63 | P03 (executor), P32 (fix commands) | shell injection via argv, `../` escapes, symlink escape, unbounded runtimes, approval bypass, redaction bypass |
| 3 | Filesystem policy | RULES §16; PHASES §18/§21 | P01 roots → P09 crawl dirs → P32 workspace policy | path traversal, artifact store escape, secret files in evidence, quota exhaustion (DoS) |
| 4 | Network policy | RULES §17; ARCH §53/§54 trust boundaries | P02/§54 detectors → P03 runtime → P09 (crawl) → P23 (probes) | SSRF (incl. private/metadata IPs), TLS downgrade, proxy leakage, unbounded concurrency |
| 5 | Secrets | RULES §37 (NON-NEGOTIABLE); ARCH §52, §79 (10) | P01 refs from day one → P40 broker | plaintext persistence, secret-in-event-log, doctor output leakage, AI-context exfil (WTT-RULE-AISEC-003) |
| 6 | Untrusted target | RULES §10 AISEC-001/002 (NON-NEGOTIABLE); ARCH §26.1/§54 | P05 (rendering) → P06/P07 (browser+devtools) → P09 (malicious HTML/URL) → P13 (prompt injection) | on-page "ignore previous instructions", malicious URL forms, script-borne tool prompts, XSS via dashboard, artifact-viewer exploits |
| 7 | AI authority | RULES §9 AI-001/004 (NON-NEGOTIABLE); ARCH §24.4, §79 (9) | P13 (orchestrator) → P32/P33 (fix/heal consent) | tool escalation via model output, fake "already authorized" claims, budget-bypass loops, model-provider exfiltration |
| 8 | Audit integrity | RULES §54 (25); ARCH §59 + ADR-012; PRD AUD | P02 (decision log) → P03 (execution records) → P30 (sealed findings) | audit chain break/rewrite, redaction-bypass via error payloads, log-injection, cross-session data bleed |

## Cross-cutting gates (all phases)

- IDOR / cross-session access (every read API, from P05) — P05/P08 tests.
- Malformed tool output → fail-fast, contained (RULES TOOL-002/004) — P08 conformance suite.
- Resource bounds: timeouts/caps on every executor (RULES §44–45) — P03 `doctor` + runtime caps.
- Dependency supply chain (RULES §42) — root lockfile in CI (done here); SCA blocking posture
  lands P38/P48.

## Usage rule

A phase's plan cites rows above by ID; a phase may close (PHASES §89/protocol §31) only with its
mapped threat-seed tests green (or the row explicitly marked not-applicable with rationale).
The row set here is additive: SECURITY.md/P02 refines wording; no refinement may *narrow* a
RULES §54 invariant (exception path: RULES §53 only).
