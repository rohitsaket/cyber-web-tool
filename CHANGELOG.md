# Changelog — WTT — Website Testing Tool

All notable changes to this repository are documented here. The format follows
*Keep a Changelog*; the project will adhere to semantic versioning **once a release process
occurs**. Per WTT protocol §38, no versions, dates, or release claims are invented: this file
carries `[Unreleased]` until the first ratified release.

## [Unreleased]

### Added — WTT-P00 (Governance, Product Contract & Engineering Foundation)

- Monorepo repository layout per ARCHITECTURE §77 / `docs/adr/ADR-010-monorepo-strategy.md`:
  `apps/` `packages/` `services/` `tools/` `contracts/` `docs/` (future app/package/service
  areas carry README ownership notes only — no runtime services, browser, AI, or scanner code).
- TypeScript toolchain established and CI-proven: npm workspaces, `tsconfig.base.json` strict
  baseline, Biome (lint + format), `tsc --noEmit` typecheck + build, Vitest unit runner
  (`tools/audits`).
- Python toolchain established for governance tooling (`tools/catalog-audit`):
  pytest + Ruff + mypy(strict), packaging via `pyproject.toml`.
- Java policy: documented-dormant per PHASES §19/§74 (no scaffolding until a Java module's
  phase begins).
- `contracts/` ownership registry (`contracts/ownership.json`): 28 contract families, each with
  exactly one owning phase (`WTT-Pnn`), status, canonical path, and verified spec anchors
  (55 anchors across 10 canonical docs, validated in CI).
- `docs/adr/` ADR baseline (ADR-001…ADR-014): Phase-0 decisions ratified — control-plane shape
  (ADR-001), event transport in-proc + PG outbox + Redis Streams fanout (ADR-002/ARCH-OD-015),
  queue start point BullMQ-class (ADR-003/PRD OD-002), contract serialization split +
  `contracts/` ownership incl. JSON Schema 2020-12 baseline (ADR-004/ADR-007/ARCH-OD-017),
  monorepo strategy (ADR-010), audit immutability hash-chain (ADR-012/PRD OD-009/ARCH-OD-019),
  control-plane framework Fastify (ADR-014/PRD OD-001/ARCH-OD-014). ADR-011 (graph persistence)
  and ADR-013 (dashboard realtime) recorded PENDING with due phases WTT-P10/WTT-P05 — neither
  blocks WTT-P01.
- Governance audits, CI-gated:
  `tools/catalog-audit` — PHASES §92 structural audit (104 domains, capability IDs 1–1235
  exactly-once coverage, phase `Catalog:` cross-check);
  `tools/audits` — ownership-registry validation + cross-document terminology audit
  (RULES WTT-RULE-RES-001 ∪ PRD WTT-DOC-006/Appendix B canonical terms; seeded forbidden-alias
  list; definition anchors verified against source docs; `docs/engineering/TERMS.json`).
- CI skeleton (GitHub Actions, `.github/workflows/ci.yml`): quality job matrix
  (ubuntu-latest × macos-latest × windows-latest: install → Biome check → typecheck → build →
  unit tests) + governance-audit job (catalog audit, ownership audit, terminology audit, P00
  tree-purity guard, CHANGELOG presence check).
- Security baseline: `docs/security/threat-checklist.md` seeded over the eight recorded invariant
  families (scope / terminal / filesystem / network / secrets / untrusted-target / AI-authority /
  audit) with per-invariant rule citations (RULES §54, ARCHITECTURE §79) and the owning-phase
  verification hooks. Invariants are referenced, never re-stated (no dual authority).
- Repo hygiene: `.editorconfig`, `.gitignore`, `.gitattributes` (LF normalization for
  cross-platform parity per RULES WTT-RULE-XPL-001), root README rewritten as the project index,
  `CHANGELOG.md` initialized (this file).
- Phase planning/reporting: `docs/phases/WTT-P00-plan.md` and
  `docs/phases/WTT-P00-report.md` per PHASES §91.

### Changed

- `PRD.md`: editorial amendment ratified via ADR-007/ARCH-OD-013 — WTT-RTE-005 wording
  "distributed прикреплениe to" → "distributed attachment to" (foreign-token artifact confirmed
  as "attachment"; semantics unchanged, no behavior or contract impact).
- `PHASES.md`: WTT-P00 status `NOT_STARTED` → `COMPLETE` with evidence pointers; §92 status-
  honesty line updated (P00 COMPLETE; all other phases remain `NOT_STARTED` — statuses are
  earned via §§87–90, never claimed).

### Deferred deliberately (recorded, not built)

- Product LICENSE: no canonical document ratifies one; recorded as an open decision (see
  `docs/phases/WTT-P00-report.md` §Open Decisions). Not invented here.
- DB migration tool + ORM/query layer: DATABASE.md `DB-OD-002`/`DB-OD-003` are explicitly
  "unset until implementation stack supports the decision" → owned by the WTT-P01 plan.
- `SECURITY.md` / `EVENTS.md` / `CLI_SPEC.md` / `DASHBOARD_SPEC.md` / `TOOL_SDK.md` spec slices
  and `TESTING.md`/`DEPLOYMENT.md`: each is introduced by its owning phase per PHASES §§19–67
  "Docs:" lines; P00 does not pre-stub them.
