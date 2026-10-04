# ADR-002 — Event transport

**Status:** ACCEPTED (ratified WTT-P00; schemas implemented WTT-P04) · **Trace:** ARCHITECTURE §34/§34.3 (outbox relay), §35, ARCH-340/ARCH-350; ARCH §78 (Event transport row); PHASES §24 (P04); RULES §22.

## Context

Every consequential occurrence must be observable, replayable, and redaction-safe. Options:
Redis Streams vs Redis Pub/Sub (ARCH-OD-015), plus in-proc path and durable backing. Kafka/NATS
are explicitly trigger-gated future options (ARCH-350, ARCH-OD-020 due P35 — quantified
thresholds then).

## Decision

V1 transport stack (binding):

1. **In-process emitter** for same-process hot paths (never the only path for durable events).
2. **PostgreSQL is durable truth:** domain rows + **outbox rows commit in one transaction**;
   relay publishes and marks relayed ("DB commit first, event second"; ARCH-34.3). Events older
   than retention are reconstructable only from durable state — Redis loss must never lose
   session truth (API.md: Redis is never authoritative).
3. **Redis Streams with consumer groups — chosen over Pub/Sub** (resolves ARCH-OD-015):
   at-least-once delivery, per-group cursors, replay/backfill for dashboards, DLQ + poison
   quarantine, and the cursor protocol P05/P07 depend on. Pub/Sub's fire-and-forget cannot
   satisfy "kill consumer → resume from cursor with zero loss" (PHASES §24 acceptance).
4. Envelope + family schemas live under `contracts/schemas/events/` (owner WTT-P04,
   `contracts/ownership.json`). Transport swaps MUST NOT change envelope/consumer contracts
   (ARCH-350).

## Consequences

- ✅ Replay, cursors, backpressure, quarantine all native to the chosen transport.
- ⚠️ Redis memory ceilings apply → relay batching/sampling limits are P04 test gates (flood
  10k/min bounded per PHASES §24), streams trimmed by retention policy with archive-to-PG paths.
- NATS/Kafka only via ARCH-350 triggers + new ADR (P35/OD-020), same envelope.
