# ADR-014 — Control-plane framework

**Status:** ACCEPTED (ratified WTT-P00; PRD OD-001 / ARCH-OD-014 resolved) · **Trace:** ARCHITECTURE §78 ("Backend framework: Fastify-class (or NestJS) … final via ADR-014"), §14 (control plane), §8 (modular monolith); API WTT-API-INT-001…003; RULES WTT-RULE-ARC-001/003.

## Context

The control plane needs: schema-first validation (contracts-first API policy), loopback HTTP for
CLI/dashboard, WS+SSE support (ADR-013), testability of modules as plain functions/classes
(ADR-001), and zero lock-in of domain logic to a web framework. The one open option (OD-001):
Fastify vs NestJS vs other.

## Decision

**Fastify (v5, pinned at P05 adoption)** as the control-plane HTTP/realtime layer.

Rationale against the criteria §78 itself names (perf + schema-first + final via ADR):
1. **Schema-first by construction**: native JSON-Schema validation lifecycle hooks — the same
   `contracts/schemas/*` artifacts (ADR-004), no parallel DTO ceremony (API WTT-API-OAS-002
   contracts-first rule).
2. **Framework as a shell**: plain constructor-injected services keep `packages/core`
   framework-free (WTT-RULE-ARC-002 dependency direction). NestJS's DI/decorator module system
   would either leak framework types into domain boundaries or require the same wrapper layer
   anyway — with heavier runtime and build cost for zero additional enforcement.
3. **WS/SSE**: `@fastify/websocket` + first-class reply hijack for SSE, both cursor-friendly
   (P05 needs duplex + stream on one port).
4. **Enforcement stays ours**: policy checks, auth, and gate logic run as registered hooks —
   the Policy Engine remains the deterministic authority (ARCH §14.3), the framework never is.
5. Distribution: one dependency tree through the root lockfile; plugin ecosystem compatible with
   Biome/Vitest toolchain (ADR-010).

## Consequences

- ✅ Fast boot, low overhead for local-first; OpenAPI generation path via route schema metadata
  (evaluated at P05 — generated from `contracts/`, not hand-maintained, per WTT-API-OAS-002).
- ⚠️ Less "batteries" than NestJS: module wiring, config, and testing utilities are WTT-owned
  patterns — accepted deliberately; they double as the enforcement layer (ADR-001 seams).
- ⚠️ Pin discipline: Fastify majors are adoption-gated at their own upgrade ADR/CHANGELOG entry.
