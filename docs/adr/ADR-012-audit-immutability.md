# ADR-012 — Audit immutability mechanism

**Status:** ACCEPTED (ratified WTT-P00; PRD OD-009 / ARCH-OD-019 resolved) · **Trace:** ARCHITECTURE §59 (Audit), §79 invariant 15; RULES §34/§35; PRD AUD area; PHASES §22–23 (execution audit rows P03, decision logs P02).

## Context

"Every significant automated action must be auditable" (RULES §54 invariant 25) is worthless if
the log can be silently rewritten. Options (PRD OD-009): application-level hash chain, WORM
storage, external ledger.

## Decision

**Append-only hash-chained audit records in PostgreSQL**, decided now because P02 emits the first
policy-decision log and P03 the first execution audit rows — both depend on the record shape:

- Record: `{auditId, seq, recordedAt, principal, action, target, decision, reason, ruleRef,
  policyVersion, correlationId, prevHash, recordHash, integrityAlgo: "sha256"}`;
  `recordHash = sha256(canonical-json(record minus recordHash) || prevHash)`; chain head stored
  with the session/project aggregate.
- Store semantics: `INSERT`-only grants for the audit sink role; DB-side UPDATE/DELETE revoked;
  tampering attempt = fail-closed for gated operations (a broken chain ⇒ `BLOCKED`, never a
  silent pass — mirrors quality-gate determinism).
- Anchoring: periodic head-hash export to artifact store (evidence family) so verification does
  not require trusting the hot DB alone.
- WORM/object-lock or external ledger: enterprise options (P47 posture) behind a port —
  `AuditSink` stays a port precisely so the storage can be hardened without core changes
  (RULES WTT-RULE-DPD-003).

## Consequences

- ✅ Deterministic, dependency-free integrity verifiable by `wtt doctor`-style checks and CI.
- ⚠️ Application-level ≠ forensic-grade: P25+ red-team tests must treat DBA-privileged rewrite
  as the residual risk to document for enterprise users (deferred, recorded here).
