# ADR-010 — Monorepo strategy

**Status:** ACCEPTED (ratified WTT-P00; layout implemented by this phase) · **Trace:** ARCHITECTURE §77 (sketch RECOMMENDED → selected), §30 (language architecture), RULES §7/§8 (ARC-010, COD-005), PHASES §19 ("repo layout, toolchains, CI skeleton, contracts/ ownership").

## Context

WTT is one product with three language ecosystems, generated cross-language schemas, and 49
phase-gated deliverables. The architecture recommended a monorepo sketch; P00 must ratify it,
implement the layout, and define the anti-erosion guards.

## Decision

Selected monorepo (implemented):

```text
apps/{cli,control-plane,dashboard}            P03/P05 — thin shells; no domain logic
packages/{core,contracts,tool-sdk-ts,browser-engine,event-schema,…}   owned by P01/P04/P06/P08
services/{python-ai,java-worker}              dormant until their phases (P13 / P12+P35)
tools/{audits,catalog-audit,adapters…}        governance tooling (P00) + adapters (P08+)
contracts/{schemas,openapi,proto} + ownership.json   single schema source (ARCH-310; ADR-004/007)
docs/{adr,engineering,security,phases}        governance records + phase plans/reports (§91)
PRD.md … API.md                               canonical docs stay at repo root (source-of-truth
                                              hierarchy must remain unambiguous)
```

- **npm workspaces** (Node 22, `package.json engines` pinned; root lockfile as the single
  dependency truth — RULES WTT-RULE-DPD-002).
- Boundary guards: `apps/*` may import `packages/*` + `services/*` contracts, never internals;
  `packages/core` imports no driver/transport/vendor SDK (RULES WTT-RULE-ARC-002); cross-package
  dependency direction + import rules are CI checks from P01 on; `contracts/` changes are
  ownership-registry-audited (this phase).
- Python governance tooling packages standalone (`tools/catalog-audit`, own pyproject) —
  product Python (P13) lives in `services/python-ai` under its own tooling.
- Java: no scaffolding until its first real module; Gradle + JUnit 5 then (PHASES §19 —
  "dormant"; RULES §12 anti-duplication).

## Conventions ratified (this phase, in `docs/engineering/`)

TypeScript strict + `noUncheckedIndexedAccess`; Biome format+lint (single toolchain, no style
invention); Vitest; pytest+Ruff+mypy(strict); LF-normalized checkout (`.gitattributes`);
`.editorconfig`; commit messages `type(scope): summary` + trailer `Phase: WTT-Pnn`;
PR-per-phase, squash-merge to trunk; no generated artifacts committed (RULES WTT-RULE-COD-007).

## Consequences

- ✅ Atomic contract changes across languages; one CI truth; generated bindings reproducible.
- ⚠️ Boundary erosion is the standing risk — mitigations above are phase-gate items, not
  suggestions.
- ⚠️ Repo grows with adapters — CI path filters keep lanes fast from P08 on.
