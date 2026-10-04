# WTT — Website Testing Tool

AI-governed, evidence-driven website testing: one canonical entrypoint — `wtt <URL>` — through a
document-first, phase-gated program (`WTT-P00` → `WTT-P48`, PHASES §10–§11). The product pipeline
(PHASES §4) is never forked:

```text
wtt <URL> → Target/Scope Policy → Session → Runtime → Dashboard + Target Browser
→ Discovery → Knowledge → Plan → Capability Selection → Execution → Evidence
→ Findings → RCA → (gated) Remediation → Verification → Gates → Report
```

## Canonical documentation

| Doc | Authority |
|---|---|
| `PRD.md` | WHAT WTT must do (requirements, §10 UX, §80 open decisions) |
| `ARCHITECTURE.md` | HOW the system is structured (module map, ADR list, §79 invariants) |
| `RULES.md` | Engineering constitution (constraints, §54 non-negotiable invariants, DoD §§48–51) |
| `PHASES.md` | WHEN each capability ships (§19–§67 phases, §68 dependencies, §70 catalog map) |
| `DESIGN.md` | HOW users interact (UX contracts) |
| `TOOLS.md` | Global capability/tool/adapter registry semantics |
| `TOOL-MATRIX.md` | Which tools implement which capabilities |
| `DATABASE.md` | Authoritative persistence (PostgreSQL) |
| `API.md` | Component communication (REST/WS/SSE/queues) |
| `CHANGELOG.md` | What actually changed (`[Unreleased]` only until a release process occurs) |

`SECURITY.md`, `TESTING.md`, `EVENTS.md`, `CLI_SPEC.md`, `DASHBOARD_SPEC.md`, `TOOL_SDK.md` and
friends are **spec slices owned by specific phases** (PHASES §§19–67 "Docs:" lines) and are
created with their phases — they are intentionally absent pre-phase and must not be stubbed.

## Repository layout (ADR-010)

```text
apps/        executable applications (cli, control-plane, dashboard) — introduced P03/P05
packages/    shared TS libraries (core, contracts, event-schema, tool-sdk-ts, browser-engine)
services/    non-TS runtimes (python-ai, java-worker) — dormant until their phases
tools/       governance tooling (P00: audits, catalog-audit) → adapters from P08
contracts/   canonical contract source of truth + ownership.json (P00 registry)
docs/        adr/, engineering/, security/, phases/ — governance records & reports
PRD.md … CHANGELOG.md — the canonical docs above (repository root)
```

## Engineering quickstart

```bash
node --version        # want 22.x (pinned in package.json engines)
npm ci
npm run quality       # Biome check + tsc typecheck + build + Vitest unit tests
npm run governance    # ownership-registry audit + terminology audit (on real docs)

python3 -m venv .venv && . .venv/bin/activate
pip install -e tools/catalog-audit[dev]
wtt-catalog-audit --phases PHASES.md      # §92 structural audit (expect PASS)
pytest tools/catalog-audit/tests          # + ruff check/format --check + mypy (see package README)
```

CI (`.github/workflows/ci.yml`) runs the quality matrix on Windows/macOS/Linux plus the
governance-audit job on every push/PR. Phase discipline: one phase at a time — implement → test
→ verify → document → close (PHASES §§87–90; `docs/phases/` holds plans/reports).

## Program status

Milestone **M0 — Governance & Foundation**: WTT-P00 **COMPLETE**
(`docs/phases/WTT-P00-report.md`), WTT-P01 next. Everything else is `NOT_STARTED` — statuses are
earned via PHASES §§87–90 gates, never claimed from documentation.
