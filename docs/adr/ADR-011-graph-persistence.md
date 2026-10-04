# ADR-011 — Graph persistence

**Status:** PENDING — decision due in the WTT-P10 plan (registered WTT-P00; PRD OD-003 "Phase 2") · **Trace:** ARCHITECTURE §19 (Knowledge Graph), §47, §78; DATABASE.md (relational+JSONB posture); PHASES §29 (P10); RULES WTT-RULE-ARC-008 (no fashionable infra).

## Context

Application knowledge graph (pages/routes/assets/flows ↔ findings/fixes) needs multi-hop
traversal at modest scale. Options per PRD OD-003: PostgreSQL relational + JSONB, PostgreSQL +
graph extension (AGE-class), or a dedicated graph DB (rejected for V1 by local-first unless
measured — §78/§79 posture).

## Interim decision (P00 records, P10 decides)

The **architecture-invisible default stands**: model the graph relationally (nodes/edges tables,
recursive CTEs) inside the P10 schema — extensions/dedicated stores require a P10-measured
trigger + this ADR flipped to ACCEPTED with alternatives evaluated (performance numbers, backup/
ops cost, RULES §42 dependency evaluation). No schema, dependency, or vendor is introduced before
P10 (no future-phase leakage; PHASES §19 "no speculative tables" per protocol §18).

## Consequences

- ✅ P01–P09 unblocked; nothing to revisit downstream if plain relational holds (expected at V1
  data volumes).
- ⚠️ P10 plan MUST close this ADR (its entry criteria already include the §74 language/TBD
  resolution rule analog).
