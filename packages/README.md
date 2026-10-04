# packages/ — shared WTT-native libraries (planned)

Per ADR-010 and ARCHITECTURE §77. **P00 rule:** READMEs only — packages are introduced by their owning phase.

| Planned package | Introduced by | Purpose |
|---|---|---|
| `packages/core` | WTT-P01 | domain model, aggregates, state machines, repository ports |
| `packages/contracts` | WTT-P01 | generated/consumed contract bindings (single source: `contracts/`, ARCH-310) |
| `packages/event-schema` | WTT-P04 | canonical event envelope v1 + family schemas |
| `packages/tool-sdk-ts` | WTT-P08 (public SDK WTT-P45) | Tool Contract runtime for TS adapters |
| `packages/browser-engine` | WTT-P06 | Playwright-first browser driver ports |

Dependency direction is enforced by convention (RULES WTT-RULE-ARC-002: `Domain ← Application ← Infrastructure/Adapters`) and, from the owning phases on, by package-boundary CI checks.
