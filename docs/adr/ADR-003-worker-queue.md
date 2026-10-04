# ADR-003 — Worker queue (V1 start point)

**Status:** ACCEPTED as V1 start point (ratified WTT-P00; queue subsystem built WTT-P35, first real consumers P07+) · **Trace:** PRD OD-002 (due "Phase 0/9"); ARCHITECTURE §32/§33, §78 (Queue row); RULES §23–24; API.md §1195 (message contract); PHASES §55 (P35).

## Context

Tool/browser/test execution needs retry, priority, DLQ, quotas, and cancellation without new
infrastructure. Candidates: BullMQ-class on Redis, NATS, Temporal-lite, RabbitMQ (PRD OD-002).
"Phase 0/9" due dates mean: choose the V1 starting point now; the evolution decision belongs to
P35 with measured triggers (ARCH-OD-020).

## Decision

**BullMQ-class queue on the existing Redis** is the V1 start point (zero new infrastructure,
DLQ/retry/scheduling built-in, §78 RECOMMENDED → hereby selected). Binding constraints for all
future evolution:

- Job/message contract is the versioned `contracts/schemas/worker/` schema (owner WTT-P35):
  `{messageId, schemaVersion, type, correlationId, causationId?, sessionId, payload, timestamp,
  idempotencyKey?, priority?, shardKey?}` — payloads carry references, never large artifacts.
- Queue backends are a port (ARCH §78/§72 extensibility, RULES WTT-RULE-DPD-003 no vendor
  lock-in): swapping to NATS/Kafka/Temporal requires their own ADR (P35, OD-020) and MUST NOT
  change the contract or control-plane behavior.
- Local execution stays first-class (RULES invariant 22; ARCHITECTURE §65 local topology):
  single-machine WTT runs without any distributed queue deployment.

## Consequences

- ✅ Redis already required by ADR-002 — no new operational surface in V1.
- ⚠️ Redis durability semantics → queue is coordination, never state authority; resume/report/
  audit survive Redis loss via Postgres (API §1195 rule; test gate at P35).
- ⚠️ Temporal-class workflow semantics (long sagas) deferred until P32/P35 evidence demands it.
