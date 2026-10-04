# ADR-004 — Tool contract serialization & versioning

**Status:** ACCEPTED baseline (ratified WTT-P00; full manifest/contract schemas land WTT-P08) · **Trace:** ARCHITECTURE §27–29, §30–31, ARCH-310; RULES WTT-RULE-TOOL-002/WTT-RULE-LANG-004; TOOLS.md §13/§17; PHASES §27 (P08); API WTT-API-OAS-002; PRD WTT-TOOL-020.

## Context

Every tool (TS/Python/Java, native or external) honors one Tool Contract; cross-language schemas
must not drift and generation pipelines must be real (ARCH-310: no hand-maintained parallel
schemas). ARCH-OD-017 (due Phase 0) asks: where JSON Schema ends and Protobuf begins.

## Decision

Baseline split (binding from P08; registry already records owners/paths in
`contracts/ownership.json`):

- **JSON Schema 2020-12 (draft ratified here)** for: tool manifests, tool input/output schemas,
  event payloads, config, scope files, CLI machine output, AI structured outputs, webhook
  payloads (API WTT-API-VAL-003 list). Location `contracts/schemas/…`.
- **OpenAPI 3.1** for HTTP surfaces (dashboard, control-plane APIs); generated clients where a
  real consumer exists (WTT-API-OAS-003 — no triple-SDK-for-show).
- **Protobuf** for hot/typed inter-language paths only: worker control, streaming worker events,
  high-throughput execution (API §1189; ADR-007) — never duplicating REST CRUD.
- **Versioning:** schema-version fields on every artifact; additive-then-major; gateway rejects
  incompatible majors with actionable errors (ARCH-510; RULES WTT-RULE-TOOL-005 compatibility
  declaration). Generated code marked + never hand-edited (WTT-RULE-ARC-010).

## Consequences

- ✅ Human-authorable schemas for governance-heavy surfaces; binary efficiency where throughput
  justifies it.
- ⚠️ Two-toolchain codegen (JSON Schema + protobuf) from P08 — CI drift gates are part of the
  P08 exit, seeded by P00's registry audit.
- Tool I/O schema violations fail fast with diagnostics (RULES WTT-RULE-TOOL-002) — no vendor
  payload may enter canonical state directly (WTT-RULE-TOOL-003).
