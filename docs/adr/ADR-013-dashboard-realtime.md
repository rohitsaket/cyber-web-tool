# ADR-013 — Dashboard realtime transport

**Status:** PENDING — decision due in the WTT-P05 plan (registered WTT-P00; ARCH-OD-016) · **Trace:** ARCHITECTURE §17/§35, §78 (Realtime row: "WebSocket + SSE + cursors — RECOMMENDED"); API.md realtime sections; PHASES §24 (P05: stream cursor protocol + backfill); DESIGN.md dashboard surface.

## Context

Dashboard must show live, honest state with reconnect+backfill, on a loopback-bound local server,
with origin/token isolation. WS vs SSE vs hybrid default is explicitly open (ARCH-OD-016, due
"Phase 1" ≈ P05). P05 also owns the cursor protocol contract.

## Interim decision (P00 records, P05 decides)

Baseline stands as ARCH §78 RECOMMENDED: **hybrid — WebSocket for duplex control + live
fine-grained streams, SSE for simple fire-and-forget streams, both cursor-backed from the same
outbox/streams spine (ADR-002)** — the cursor protocol must make the transport swappable without
semantics change. P05's plan ratifies or replaces this with a benchmark (per-connection cost,
proxy behavior on Windows/macOS/Linux, reconnect storms) and flips this ADR to ACCEPTED.

## Consequences

- ✅ P01–P04 carry no transport obligations; event source stays transport-agnostic by design.
- ⚠️ Two transports = two auth/render paths in P05 tests (chaos/resync gates cover both).
