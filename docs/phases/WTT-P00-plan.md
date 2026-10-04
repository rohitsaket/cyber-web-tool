# WTT-P00 Phase Plan — Governance, Product Contract & Engineering Foundation

Status: `PREPARING → DESIGNING` (this doc) · Milestone M0 · Owner: WTT engineering
Sources: PRD §1/§6.2/§80/Appendix B · ARCHITECTURE §8/§14/§34–35/§47–53/§77–81 · RULES §§3–8/§39–§46/§54 · PHASES §§9/§19/§68/§70/§74/§87–91

---

## 1. Phase Objective (§7)

Stand up WTT's **immutable engineering baseline**: ratify the monorepo repository layout (ADR-010), pin and prove the multi-language toolchain (TypeScript primary; Python tooling; Java documented-dormant), create the `contracts/` ownership registry that assigns every future contract an owner + path, resolve the Phase-0 architecture decisions (ADR-001/002/003/004/007/010/012/014 + ARCH-OD-013/015/017/019), initialize `CHANGELOG.md`, record the security-invariant baseline and seed the threat checklist, and prove a green lint/typecheck/build/unit pipeline behind a CI skeleton with a Windows/macOS/Linux matrix.

- **Input:** ratified PRD/ARCH/RULES/PHASES + catalog structure (PHASES §70); repo + toolchain install rights.
- **Processing:** documentation governance, repo scaffolding, toolchain pinning, contract-ownership registry, audit tooling (catalog structural + terminology + ownership), CI skeleton.
- **Output:** buildable/lintable/typecheckable/testable repo; ADR baseline; CHANGELOG initialized; ownership registry complete; baseline commit tagged.
- **Authority:** PHASES §19 is the phase contract; docs remain source-of-truth per RULES §3.
- **Boundaries:** no runtime services, no browser/AI code, no scanners (PHASES §19 "Must NOT create").
- **Success condition:** all AC below green; P01 unblocked (exit: zero architectural ambiguity blocking P01).

## 2. Scope (§8)

**IN SCOPE**
- Repository layout per ARCHITECTURE §77 monorepo sketch (`apps/ packages/ services/ tools/ contracts/ docs/`)
- Toolchain: npm-workspaces + TypeScript strict + Biome (lint/format) + tsc + Vitest; Python 3 (pytest/Ruff/mypy) for governance tooling; Java policy documented, dormant (no scaffolding, no code)
- CI skeleton (GitHub Actions): quality matrix (ubuntu/macos/windows) + governance-audit job
- `contracts/` ownership registry (`contracts/ownership.json`) + registry rules
- ADR baseline: register ADR-001…ADR-014; ACCEPT the Phase-0-due decisions (001 shape, 002 transport, 003 queue start, 004/007 serialization split + contracts ownership, 010 monorepo, 012 audit immutability, 014 Fastify) incl. ARCH-OD-013 PRD typo amendment, ARCH-OD-015 (Redis **Streams** fanout), ARCH-OD-017, ARCH-OD-019; ADR-005/006/008/009 recorded ACCEPTED as PRD/ARCH-approved baselines; ADR-011/013 recorded PENDING with due phases (P10/P05) — they block nothing in P01
- `CHANGELOG.md` initialization (Keep-a-Changelog, `[Unreleased]`)
- Security invariants recorded (pointers to RULES §54 / ARCH §79 — no duplicated truth) + seeded threat checklist (`docs/security/threat-checklist.md`)
- Governance audit tooling: PHASES §92 catalog structural audit (Python) + terminology audit + ownership-registry audit (TypeScript), wired into CI
- Cross-cutting: README, .editorconfig, .gitignore, .gitattributes, engineering conventions doc

**OUT OF SCOPE** (owned by later phases — nothing may be pre-built)
- Domain model, sessions, DB entities, migrations (P01) · scope/authorization engine (P02) · CLI/runtime (P03) · event system (P04) · dashboard (P05) · browser (P06–P07) · tool gateway/registry (P08) · discovery (P09) · everything downstream
- LICENSE ratification (not decided in any source doc → recorded as Open Decision, not invented)
- Tool-native spec docs `SECURITY.md`/`TESTING.md`/`DEPLOYMENT.md`/`CLI_SPEC.md` etc. — each is created by its owning phase as a "slice" (PHASES §19–§21, §363ff); P00 must not stub them

## 3. Prerequisite graph (§9)

| Prerequisite | State |
|---|---|
| PRD/ARCH/RULES/PHASES drafts available | AVAILABLE ✓ (v0.1.0/v0.1.0/v0.1.0/v0.2.0) |
| Catalog structure PHASES §70 (104 domains, 1–1235) | AVAILABLE ✓ (validated by §92 script) |
| Repo + toolchain install rights | AVAILABLE ✓ (Node 22, npm 10, Python 3.11; Java absent → dormant policy) |
| No source-of-truth conflict affecting P00 | VERIFIED ✓ (ARCH-OD-013 editorial item dispositioned here) |
| SECURITY/TESTING/DEPLOYMENT docs | NOT REQUIRED for P00 (future slices; P00 only "records invariants" which live in RULES §54/ARCH §79) |

## 4. Capability → tool mapping (§10–13)

| Capability | Candidate | Selected | Reason | Required? | Status |
|---|---|---|---|---|---|
| Monorepo package management | npm/pnpm/yarn workspaces | **npm workspaces** | zero extra install burden, lockfile built-in, CI-native on 3 OSes | Yes | AVAILABLE |
| TypeScript type safety | tsc strict | **tsc `--noEmit` + build** | mandated by PHASES §19 ("tsc") | Yes | AVAILABLE |
| Unit test runner | Vitest / Jest | **Vitest** | PHASES §19 lists it; TOOLS.md marks Vitest T1/`P00 toolchain`; ESM-native | Yes | AVAILABLE |
| Lint + format | ESLint+Prettier / Biome | **Biome** | one binary, fast, cross-OS parity; PHASES §19 "ESLint-Biome" | Yes | NEEDS_INSTALL→installed |
| Python test/lint/type for governance tools | pytest+Ruff+mypy | **selected per PHASES §19** | Python used for §92 catalog audit | Yes | NEEDS_INSTALL→venv |
| Java toolchain | Gradle+JUnit | **documented, dormant** | PHASES §19: "dormant until Java modules begin" | No | DEFERRED (by design) |
| CI execution | GitHub Actions | **selected** | repo already GitHub; matrix covers 3 OSes | Yes | AVAILABLE |
| Catalog structural audit (§92) | script (python) | **`tools/catalog-audit`** | §92 prescribes the method; made reproducible + CI-gated | Yes | NEEDS_IMPLEMENTATION |
| Terminology audit | script | **`tools/audits` terminology** | P00 test: "zero undefined canonical terms" | Yes | NEEDS_IMPLEMENTATION |
| Ownership registry | json + audit | **`contracts/ownership.json` + audit** | P00: "assigns every future contract an owner + path" | Yes | NEEDS_IMPLEMENTATION |
| DB migration tool / ORM | Prisma/Drizzle/Kysely… | **NOT selected now** | DATABASE.md DB-OD-002/003 = `DATABASE_DECISION_REQUIRED`, "unset until implementation stack supports the decision" → owned by P01 plan | No (for P00) | DEFERRED (canonical deferral) |

No required capability is unavailable → no `PHASE_BLOCKED — REQUIRED_CAPABILITY_UNAVAILABLE`.

## 5. Authoritative state (§17) & data/API/event impact (§18–20)

- ADRs, conventions, CHANGELOG, ownership registry → **repo files** (Git is the authority; no DB, no events, no APIs — API.md line "P00 | None (ownership registry only)").
- No database entities/migrations (P01). No endpoints (P03/P05). No events (P04). `contracts/` contains registry + README stubs only — **no schemas invented** (schemas arrive with owning phases).

## 6. Security review (§21–22)

Untrusted input: markdown docs parsed by audit tools (regex DoS/complexity → inputs are repo-controlled only; line-count bounded). No network, no exec of tools, no secrets. Files written are repo docs/configs. Risk class of every P00 operation: **READ_ONLY / SAFE_WRITE (repo files only)**. Threat checklist seeded to the 8 invariant families (scope, terminal, filesystem, network, secrets, untrusted-target, AI-authority, audit) — enforcement implemented by their owning phases; P00 only records.

## 7. Integration flow (§16)

```
Docs (PRD/ARCH/RULES/PHASES) ──ratify──▶ docs/adr/*.md + CHANGELOG + conventions
        │                                        │
        ▼                                        ▼
Monorepo layout (ADR-010) ──pin──▶ toolchain configs ──run──▶ local pipeline
        │                                        │
        ▼                                        ▼
contracts/ownership.json ◀──validates── tools/audits (TS) ──▶ CI `governance-audits`
PHASES §70 table          ◀──validates── tools/catalog-audit (Py) ──▶ CI `governance-audits`
        └───────────────── CI quality matrix (ubuntu/macos/windows) ◀── all of above
```

## 8. Test plan (§23)

- **Unit (TS, Vitest):** ownership-registry validator (schema, uniqueness, phase-ID format, path rules, dangling spec anchors); terminology auditor (canonical set extraction from RULES §45 + PRD Appendix B incl. combined rows; TERMS.json coverage; forbidden-alias scan); markdown helpers.
- **Unit (Python, pytest):** §92 parser — gaps, overlaps, non-contiguous dash forms, domain completeness, phase-catalog cross-check; CLI exit codes.
- **Static validation:** `biome check` (lint+format), `tsc --noEmit` strict, `tsc` build, `ruff check`+`ruff format --check`, `mypy` strict on `tools/catalog-audit` src.
- **Integration:** audits run against the **real repo docs** (not just fixtures) in CI; npm ci from lockfile on 3 OSes; fresh-clone proof = CI clean-checkout run.
- **Negative:** validator rejects malformed registry entries / bad phase IDs / dangling anchors; catalog auditor reports overlap/gap fixtures with nonzero exit.
- **Security:** audit tools must not follow symlinks outside repo root / must not eval doc content; path inputs confined to repo root (tested).
- **Acceptance:** AC-001..AC-010 below. **Regression:** docs-only change — regression = audits + full pipeline still green; P00 is the baseline (no prior suites).

## 9. Acceptance criteria (§24)

- AC-001 Fresh clone of the branch: `npm ci && npm run quality` (format/lint/typecheck/build/unit) exits 0 on Linux (proven in sandbox).
- AC-002 CI workflow exists with `ubuntu-latest × macos-latest × windows-latest` quality matrix and it passes on push (evidence: Actions run URLs).
- AC-003 `python3` + `pip install -e tools/catalog-audit[dev]` → catalog structural audit exits 0 reporting domains 104/104, IDs 1235/1235, 0 gaps, 0 overlaps; pytest+ruff+mypy green.
- AC-004 Ownership-registry audit exits 0: every contract family has unique id, valid `WTT-Pnn` owner, status enum, repo-root-contained path, and resolvable spec anchors; every `contracts/` subdir is owned.
- AC-005 Terminology audit exits 0: every canonical term (RULES §45 ∪ PRD DOC-006/B) has a definition location; seeded forbidden aliases have zero hits across all repo markdown.
- AC-006 `CHANGELOG.md` exists with `[Unreleased]` populated; PRD/ARCH/RULES/PHASES unchanged except (a) PHASES P00 status update, (b) approved ARCH-OD-013 editorial amendment to PRD WTT-RTE-005.
- AC-007 ADR-001…014 all registered; every Phase-0-due decision (OD-001/002/009, ARCH-OD-013/014/015/017/019) resolved with rationale; PENDING ADRs record due phases that cannot block P01.
- AC-008 No runtime services/browser/AI/scanner code exists in the tree (audit by structure: only `tools/` contains executables; `apps/`, `packages/`, `services/` carry READMEs only).
- AC-009 Security invariant pointers + threat checklist exist and are linked from docs/adr and README (no duplicated invariants text).
- AC-010 Phase report filed (§51/§91 template) + PHASES §19 status `COMPLETE` + §92 honesty line updated + baseline commit tagged.

## 10. Exit / close gates (§40)

Per PHASES §87–90 + protocol §40 checklist. Evidence artifacts: local command transcripts, Actions runs, test reports, tag. Known-limitation policy: any criterion unverifiable in-sandbox (e.g., Windows/macOS local runs) is closed ONLY by CI runs; otherwise marked `IMPLEMENTED_NOT_VERIFIED`.
