# Toolchain (WTT-P00 baseline)

Ratified per ADR-010 / PHASES §19 ("establish TS · Python · dormant Java · no unnecessary
services"). Versions are pinned by **lockfiles** — `package-lock.json` (npm) and `uv`/`pip`
constraints for Python where a lockfile exists per package; floating critical deps prohibited
(RULES WTT-RULE-DPD-002).

## TypeScript / JavaScript (primary — control plane, CLI, dashboard, adapters-hot-path)

| Tool | Selection | Role |
|---|---|---|
| Node.js | `>=22 <23` (`engines`) | single core runtime (ARCH §78) |
| npm workspaces | root `package-lock.json` | packages + root tooling |
| TypeScript | `^5.9` via `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`) | typecheck gate = `tsc --noEmit`; build = `tsc -p tsconfig.build.json` |
| Biome | `^2` | lint + format (single tool; PHASES §19 "ESLint-Biome" → Biome selected; RULES COD-004: no invented style) |
| Vitest | `^3` | unit tests (TOOLS.md T1 project tooling row) |

Commands (repo root): `npm ci` · `npm run check` (lint+format audit) · `npm run typecheck` ·
`npm run build` · `npm run test:unit` · `npm run quality` (all of the above) ·
`npm run governance` (ownership + terminology audits over real docs).

**Node built-ins first.** Governance tooling uses ZERO runtime dependencies (fs/path/url only);
input validation is hand-rolled where shapes are small and fixed (RULES §42: no library for
trivial function). New runtime deps require the §42 evaluation recorded in the PR (need,
maintenance, security, license, cost, equivalents).

## Python (governance tooling now; AI/vision/data later)

`tools/catalog-audit` per PHASES §92 method. `requires-python >= 3.10`, dev extras pinned
(`pytest>=8`, `ruff>=0.6`, `mypy>=1.11` with `strict = true`). Commands from
`tools/catalog-audit/`: `pip install -e ".[dev]"` → `pytest` · `ruff check src tests` ·
`ruff format --check src tests` · `mypy src` · `wtt-catalog-audit --phases ../../PHASES.md`.

## Java — DORMANT (policy recorded; nothing installed/stubbed)

Toolchain decision recorded for later (Gradle + JUnit 5 class, per PHASES §19), no `build.gradle`,
no source dirs, until a Java module's phase opens (PHASES §74: "DECIDED-dormant"; no
scaffolding theater per protocol §25).

## Cross-platform contract

Same commands green on **Windows/macOS/Linux** (PHASES §19 acceptance + WTT-RULE-XPL-001),
CI-enforced by matrix (`.github/workflows/ci.yml`). LF normalization via `.gitattributes`;
`shell: bash` explicitly on every runner OS.

## CI

GitHub Actions (skeleton): `quality` = 3-OS matrix over the npm commands; `governance-audits` =
Python toolchain proof + all three audits + P00 tree-purity guard (apps/packages/services carry
no code) + CHANGELOG presence. Branch protection and environment promotion are later-phase
concerns (P48 hardening).
