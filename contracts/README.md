# contracts/ — canonical contract source of truth

Single source for cross-boundary schemas, generated TS/Python/Java bindings, version negotiation (ARCH-310; RULES WTT-RULE-LANG-004; API WTT-API-OAS-002). WTT-P00 registers **ownership**; the schema artifacts themselves arrive with their owning phases (PHASES §19: P00 implements no contracts).

## Rules

1. **Ownership:** every contract family has exactly one owning phase recorded in `ownership.json` (machine registry — this file is prose only, no duplicated truth).
2. **Layout:** `schemas/` JSON Schema (baseline draft **2020-12**, ratified in ADR-004), `openapi/` HTTP surfaces (OAS 3.1), `proto/` versioned `.proto` per `contracts/<proto-pkg>/vN/`.
3. **Versioning:** additive-then-major (ARCH-340); never silent skew — readers MUST fail loud with actionable mismatch errors (ARCH-510).
4. **Bindings:** generated only — no hand-maintained parallel schemas in TS/Python/Java (ARCH-310); generated code is marked and never hand-edited (RULES WTT-RULE-ARC-010).
5. **Drift gates:** from the owning phase onward, CI verifies implementation ↔ published contract ↔ `contracts/` do not drift (API WTT-API-OAS-002; PHASES §88 "contracts versioned under `contracts/`").
6. **Registry integrity:** `ownership.json` is validated in CI (`npm run audit:ownership`) — unique ids, valid `WTT-Pnn` owners, repo-root-contained paths, resolvable spec anchors.

## Ownership registry

`ownership.json` — family-level registry (id, name, owner phase, optional enhancing phase, status, canonical path, spec anchors). Granularity is **contract family**, matching how PHASES §§19–67 "Contracts:" lines and API/TOOLS/DATABASE specs enumerate contracts.
