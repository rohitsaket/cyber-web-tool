# Architecture Decision Records (ADR)

Baseline register per ARCHITECTURE §77 ("Required ADRs"), ratified in **WTT-P00**. ADRs record
decisions from the source-of-truth hierarchy (RULES §3) — they never override PRD/ARCHITECTURE;
they resolve options those docs leave open. Format: Context · Decision · Consequences · Trace.

**Status vocabulary:** `ACCEPTED` (decision made and binding) · `PENDING` (registered, decision
due in the named phase) · `SUPERSEDED` (never silently — replaced-by is linked).

| ADR | Subject | Status (post-P00) | Due |
|---|---|---|---|
| [ADR-001](ADR-001-control-plane-shape.md) | Control-plane shape | ACCEPTED | P00 (blocks P01 module map) |
| [ADR-002](ADR-002-event-transport.md) | Event transport | ACCEPTED | P00 (P01 ships outbox stub) |
| [ADR-003](ADR-003-worker-queue.md) | Worker queue start point | ACCEPTED (V1 start; evolution P35+) | P00 (PRD OD-002 "Phase 0/9") |
| [ADR-004](ADR-004-tool-contract-serialization.md) | Contract serialization + versioning | ACCEPTED (baseline) | P00 (ARCH-OD-017 due "Phase 0") |
| [ADR-005](ADR-005-browser-engine.md) | Browser engine | ACCEPTED (baseline; ports locked P06) | PRD MUST + P06 depth |
| [ADR-006](ADR-006-artifact-storage.md) | Artifact storage | ACCEPTED (baseline; layout P07/P40) | PRD baseline |
| [ADR-007](ADR-007-inter-language-rpc.md) | Inter-language RPC + `contracts/` ownership | ACCEPTED | P00 (also dispositions ARCH-OD-013) |
| [ADR-008](ADR-008-ai-provider-abstraction.md) | AI provider abstraction | ACCEPTED (principle; list/tuning P13) | PRD MUST |
| [ADR-009](ADR-009-auto-fix-security.md) | Auto-fix security model | ACCEPTED (principle; mechanics P32) | PRD/RULES MUSTs |
| [ADR-010](ADR-010-monorepo-strategy.md) | Monorepo strategy | ACCEPTED (implemented P00) | P00 |
| [ADR-011](ADR-011-graph-persistence.md) | Graph persistence | PENDING | P10 plan (PRD OD-003) |
| [ADR-012](ADR-012-audit-immutability.md) | Audit immutability | ACCEPTED | P00 (PRD OD-009 due "Phase 0") |
| [ADR-013](ADR-013-dashboard-realtime.md) | Dashboard realtime transport | PENDING | P05 (ARCH-OD-016) |
| [ADR-014](ADR-014-control-plane-framework.md) | Control-plane framework | ACCEPTED | P00 (PRD OD-001 / ARCH-OD-014) |

## Phase-0 decision ledger (from PRD §80 / ARCHITECTURE §81)

| Open item | Disposition |
|---|---|
| PRD OD-001 control-plane framework | **RESOLVED** → ADR-014 (Fastify) |
| PRD OD-002 queue/fabric start | **RESOLVED (start point)** → ADR-003; evolution triggers deferred to P35 (ARCH-350/OD-020) |
| PRD OD-009 audit immutability | **RESOLVED** → ADR-012 (hash chain) |
| ARCH-OD-013 PRD WTT-RTE-005 wording | **RESOLVED** — confirmed "distributed attachment"; PRD amended (typo disposition only, semantics unchanged); recorded in CHANGELOG |
| ARCH-OD-014 Fastify vs NestJS | **RESOLVED** → ADR-014 |
| ARCH-OD-015 Redis Streams vs Pub/Sub | **RESOLVED** → ADR-002 (Redis **Streams** + consumer groups) |
| ARCH-OD-017 contract serialization split | **RESOLVED** → ADR-004 + ADR-007 |
| ARCH-OD-019 audit hash-chain vs WORM vs ledger | **RESOLVED** → ADR-012 |
| ARCH-OD-016 dashboard WS vs SSE vs hybrid | **DEFERRED** → ADR-013, due P05 (blocks nothing in P01) |
| ARCH-OD-018 browser process-per-context | **DEFERRED** → WTT-P06 browser plan (blocks nothing in P01) |
| ARCH-OD-020 NATS/Kafka/Temporal triggers | **DEFERRED** → WTT-P35 (measured triggers; ADR-002/003 reserve the seam) |
| PRD OD-003 graph store | **DEFERRED** → ADR-011, due P10 (blocks nothing in P01) |
| PRD OD-004/005/006/007/008/010/011/012 | Unchanged — due per PRD §80 in their owning phases; none is P00/P01-blocking |

Exit-criterion check: after this ledger, **zero architectural ambiguity blocks WTT-P01** — P01's
inputs (module map, package layout, persistence posture, repository ports pattern, secret-ref
rule) are all ACCEPTED above.

DB-registry pointer: DATABASE.md §98 records `ADR-DB-001…ADR-DB-008` (decision records with the
DB doc as owner; `DB-OD-002` migration tool and `DB-OD-003` ORM/query layer are
`DATABASE_DECISION_REQUIRED` **by canonical design** — "unset until implementation stack
supports the decision" — therefore decided in the WTT-P01 plan, not here).
