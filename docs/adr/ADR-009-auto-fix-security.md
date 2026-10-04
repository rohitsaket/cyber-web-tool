# ADR-009 — Auto-fix security model

**Status:** ACCEPTED as principle (ratified WTT-P00; mechanics implemented WTT-P32) · **Trace:** PRD §50/§51/§66 areas; RULES WTT-RULE-FIX-* (§29) + §41; ARCHITECTURE §41/§54 trust boundaries; PHASES §51 (P32); SECURITY posture ladder PHASES §75 "Consent-gated autonomy".

## Context

WTT's headline differentiator (guarded remediation) is also its highest-risk capability: it writes
to user code. ARCHITECTURE §79 invariants 3/4 and RULES §29/§41 make non-negotiable constraints:
attribution, verification status, checkpoint/rollback, external deployment authority.

## Decision

Baseline security model, binding on P32 (recorded now so no earlier phase can design around it):

1. Every applied change happens on a **checkpointed, policy-scoped workspace** — transactional
   applier: diff + hashes + checkpoint + reason recorded before/after (WTT-RULE-FIX-*).
2. **Independent verification**: fixer ≠ verifier; verification status is one of the canonical
   verdict set; unverified fixes never read "fixed" (§79 invariant 4; DATABASE verdict enum
   VERIFIED_FIXED/…/INCONCLUSIVE).
3. Environment bans: production + unauthorized targets can never auto-fix; writes limited to the
   session's scoped filesystem roots; destructive classes require explicit approval, never
   auto-retry (PHASES §22/§58; RULES §15–16).
4. **Git safety:** inspect/diff/checkpoint/restore allowed; push/force-push/merge/deploy are NOT
   (RULES §39, WTT-RULE-DEP-001 "deployment authority stays external").
5. Rollback is a first-class operation with its own tests (P32 exit criteria).
6. AI may propose patches only through the Policy Engine + Tool Gateway — no separate write path
   exists to bypass (ADR-008 boundary; §79 invariant 9).

## Consequences

- ✅ P00–P31 code can be reviewed against these six rules before any fixing code exists.
- ⚠️ Feature-flag default OFF until P32 closes its gates (RULES WTT-RULE-DEP-003 Safe Mode).
- ⚠️ PHZ-OD-003 (may autonomy ever reach prod?) stays open — default NEVER until ratified (M6).
