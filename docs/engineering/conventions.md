# Engineering conventions (WTT-P00 baseline)

Derived only from RULES.md (engineering constitution) + ARCHITECTURE §77 monorepo note —
conventions ratify the docs, never replace them. Rule citations are mandatory vocabulary.

## Commits & branches

- Format: `type(scope): imperative summary` (≤72 chars), body = what/why (RULES COD-006: why),
  trailers `Phase: WTT-Pnn` and `PRD: WTT-XXX-nnn…` where applicable (PRD Appendix D
  traceability practice; PHASES WTT-PHZ-TRC-001).
- One phase per PR on its own branch; PR description carries the phase's §91/§51 report sections.
- Squash-merge to `main`; commit authorship for generated/AI-assisted changes MUST be honest
  (RULES WTT-RULE-AI-004/005 — no unexecuted claims in messages).
- Never force-push shared branches; WTT-the-product has the same rule for targets (RULES
  WTT-RULE-GIT-001) and the repo practices what it preaches.

## Code placement (monorepo boundaries, ADR-010)

- Domain logic → `packages/*`; `apps/*` stay thin shells; nothing imports driver/vendor SDKs
  outside its engine package (RULES WTT-RULE-ARC-001/002, BRW-001).
- No `utils/` dumping grounds (RULES COD-005); governance scripts live in `tools/` and are
  build-time only.
- Contracts are authored ONLY in `contracts/` (ARCH-310); generated bindings marked + never
  hand-edited (RULES ARC-010); every contract family is listed in `contracts/ownership.json`
  with its owning phase — new families require a registry PR entry BEFORE first schema lands
  (`npm run audit:ownership` enforces validity; human review enforces the "before" part).

## Testing conventions (PHASES §80 maturity ladder seeds)

- Unit colocated per package (`test/` or `*.test.ts` next to module — predictable naming, RULES
  COD-005); integration tests run against real boundaries (RULES §29 gate; mocks insufficient
  alone); fixtures isolated, no hidden global coupling; `--ci` headless parity from P03 on.
- Red/green discipline: a failing mandatory gate stops the phase (protocol §1 "move forward with
  failing mandatory tests" prohibited).

## Documentation discipline

- Canonical docs at repo root; `docs/` holds ADRs, reports, guides. Spec slices
  (`SECURITY.md`, `TESTING.md`, `DEPLOYMENT.md`, `EVENTS.md`, `CLI_SPEC.md`, …) are introduced by
  their owning phase's "Docs:" line (PHASES §19–§67) — never pre-stubbed, never duplicated.
- Every material change → `CHANGELOG.md [Unreleased]` (RULES WTT-RULE-DOC-011); no version/date
  invention (protocol §38). Terminology: canonical terms per RULES RES-001/002 + PRD Appendix B
  (`npm run audit:terminology` enforces; extend `docs/engineering/TERMS.json`, never weaken).
- PLACEHOLDERS cap at PARTIAL (PHASES §9): TODOs must be specific: `TODO(WTT-Pnn): reason`
  (RULES COD-006).

## Dependency & security hygiene

- Lockfile-pinned everything; `npm audit --audit-level=high` advisory in CI (blocking posture is
  the P48 hardening decision — recorded, not smuggled); no secrets in code/log output ever
  (RULES §37 NON-NEGOTIABLE; ARCH §79 invariant 10); `.env*` ignored by default.
- Supply-chain posture per PHASES §75 "Governed supply" stage — P00 only refuses to regress it.

## Review

RULES §57 checklist verbatim in PR template? — P38+ owns repo tooling; until then reviewers
follow RULES §47/§57 and protocol §39 (final diff review: files, deps, migrations, APIs,
permissions, config, security, tests, docs — nothing unrelated).
