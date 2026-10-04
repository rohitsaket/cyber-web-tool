# WTT — Website Testing Tool
## Master Capability × Tool × Phase × Language × Risk × Runtime Matrix

| Field | Value |
|---|---|
| Document Status | **Canonical — Draft for Review** |
| Version | 0.1.0 (Pre-implementation) |
| Last Updated | 2026-09-07 |
| Source PRD | `PRD.md` v0.1.0 |
| Source Architecture | `ARCHITECTURE.md` v0.1.0 |
| Source Rules | `RULES.md` v0.1.0 |
| Source Phases | `PHASES.md` v0.2.0 (`WTT-P00–P48`) |
| Source Design | `DESIGN.md` v0.1.0 |
| Source Tools | `TOOLS.md` v0.1.0 — tool architecture + tool definitions (read in full) |
| Source Global Tool Catalog | No standalone file; structure via `PHASES.md` §70 (104 domains A–CZ, IDs 1–1235) |
| Catalog Coverage Status | 104/104 domains · 1235/1235 capabilities · Unmapped = 0 (§71) |
| Matrix Validation Status | **VALIDATED** (§74): 331 master rows, IDs unique, no phase/risk/type/release gaps |

> **Source check.** All six sources read in full. **No `MATRIX_CONFLICT`.** TOOLS.md already dispositioned every cross-source variance (risk classes, tiers, catalog identity, error taxonomy); this matrix reflects those dispositions without redefinition. Task-text lists that differ from sources (e.g., the 10-item risk union in the brief's §32) are NOT sources and create no conflict — the matrix follows TOOLS §18 (canonical ARCH 9-class set) throughout.

---

## Table of Contents

1. [Document Control](#1-document-control)
2. [Purpose](#2-purpose)
3. [Source-of-Truth Hierarchy](#3-source-of-truth-hierarchy)
4. [Matrix Principles](#4-matrix-principles)
5. [Terminology](#5-terminology)
6. [Row Model](#6-row-model)
7. [Column Dictionary](#7-column-dictionary)
8. [Capability Model](#8-capability-model)
9. [Implementation Role Model](#9-implementation-role-model)
10. [Tool Tier Model](#10-tool-tier-model)
11. [Language Model](#11-language-model)
12. [Runtime Model](#12-runtime-model)
13. [Risk Model](#13-risk-model)
14. [Permission Model](#14-permission-model)
15. [Installation Model](#15-installation-model)
16. [Environment Policy](#16-environment-policy)
17. [Release Scope](#17-release-scope)
18. [Implementation Status](#18-implementation-status)
19. [Master Tool Matrix](#19-master-tool-matrix)
20. [Protocol Matrix](#20-protocol-matrix)
21. [Credential Matrix](#21-credential-matrix)
22. [Execution Location Matrix](#22-execution-location-matrix)
23. [Cost Matrix](#23-cost-matrix)
24. [Resource Matrix](#24-resource-matrix)
25. [Worker Affinity Matrix](#25-worker-affinity-matrix)
26. [Decision Register (Tool Selection)](#26-decision-register-tool-selection)
27. [Approval Matrix](#27-approval-matrix)
28. [Authorization Matrix](#28-authorization-matrix)
29. [Installation Matrix](#29-installation-matrix)
30. [Environment Policy Matrix](#30-environment-policy-matrix)
31. [OS Matrix](#31-os-matrix)
32. [Output Matrix](#32-output-matrix)
33. [Evidence Matrix](#33-evidence-matrix)
34. [Artifact Matrix](#34-artifact-matrix)
35. [Finding Matrix](#35-finding-matrix)
36. [Runtime Matrix](#36-runtime-matrix)
37. [Language Matrix](#37-language-matrix)
38. [Security Matrix](#38-security-matrix)
39. [Permission Matrix](#39-permission-matrix)
40. [Release Matrix](#40-release-matrix)
41. [AI-Selection Matrix](#41-ai-selection-matrix)
42. [Pack Matrix](#42-pack-matrix)
43. [Role Matrix](#43-role-matrix)
44. [Fallback Matrix](#44-fallback-matrix)
45. [Dependency Matrix](#45-dependency-matrix)
46. [Conflict Matrix](#46-conflict-matrix)
47. [Data-Externalization Matrix](#47-data-externalization-matrix)
48. [AI-Provider Matrix](#48-ai-provider-matrix)
49. [Native Matrix](#49-native-matrix)
50. [Browser Matrix](#50-browser-matrix)
51. [Discovery Matrix](#51-discovery-matrix)
52. [API Matrix](#52-api-matrix)
53. [Accessibility Matrix](#53-accessibility-matrix)
54. [Visual Matrix](#54-visual-matrix)
55. [Performance Matrix](#55-performance-matrix)
56. [Load Matrix](#56-load-matrix)
57. [DAST Matrix](#57-dast-matrix)
58. [SAST/SCA Matrix](#58-sastsca-matrix)
59. [Secrets Matrix](#59-secrets-matrix)
60. [Database Matrix](#60-database-matrix)
61. [Observability Matrix](#61-observability-matrix)
62. [Orchestration Matrix](#62-orchestration-matrix)
63. [Reporting Matrix](#63-reporting-matrix)
64. [AI/LLM Matrix](#64-aillm-matrix)
65. [Mobile/Cloud/Device Matrix](#65-mobileclouddevice-matrix)
66. [V1 Toolset](#66-v1-toolset)
67. [V1-Optional Toolset](#67-v1-optional-toolset)
68. [V1-Selected & V1-Conditional](#68-v1-selected-v1-conditional)
69. [Enterprise Toolset](#69-enterprise-toolset)
70. [Experimental Toolset](#70-experimental-toolset)
71. [Unminted-ID & Candidate Strategy Notes](#71-unminted-id-candidate-strategy-notes)
72. [Deprecated Toolset](#72-deprecated-toolset)
73. [Release-Split Summary](#73-release-split-summary)
74. [Completeness Report](#74-completeness-report)
75. [Invariants, Validation & Document Control](#75-invariants-validation-document-control)
76. [MATRIX_CONFLICT Register](#76-matrix_conflict-register)
77. [UNRESOLVED_MAPPING Register](#77-unresolved_mapping-register)

---

## 1. Document Control

WTT-TM-DOC-001: This matrix is the normalized decision + traceability bridge between `TOOLS.md` ("what tools/capabilities exist") and implementation ("exactly what do we build/use for this capability"). It MUST reflect approved decisions, never redefine architecture. Full chain: `PRD → ARCH → RULES → PHASES → DESIGN → TOOLS → TOOL-MATRIX → IMPLEMENTATION`, traceable both directions.

WTT-TM-DOC-002: Matrix IDs `WTT-TM-000001…` (§19) are stable and never reused. Capability IDs and tool IDs are owned by `TOOLS.md` §§14–15 and used here EXACTLY. Decision statuses: `APPROVED / RECOMMENDED / DECISION_REQUIRED / OPTIONAL / DEFERRED` (TOOLS §226-rule).

## 2. Purpose

WTT-TM-PUR-001: This matrix MUST let any human or AI agent answer, deterministically: what implements a capability · default + alternatives · phase + release · native vs adapter · language/runtime · authorization · production policy · permissions · installation · evidence · fallback · V1 vs post-V1 · implementation status. Success tests: *"Implement accessibility.scan"* and *"Which tool for performance.audit?"* are answerable from §§19/21/23/44 without redesigning anything (§147-rule).

## 3. Source-of-Truth Hierarchy

WTT-TM-HIE-001: `PRD (requirements) → ARCH (architecture) → RULES (rules) → PHASES (sequence) → DESIGN (UX) → TOOLS (tool definitions) → GLOBAL TOOL CATALOG (universe, via PHASES §70) → TOOL-MATRIX (this cross-reference)`. On disagreement: record `MATRIX_CONFLICT` (§72) with Capability + Conflicting Sources + Current Values + Impact + Decision Required — NEVER choose silently. None exists (header).

## 4. Matrix Principles

WTT-TM-PRI-001: Capability-centric: `Capability → one or more Tool Implementations` (never tool-first). AI requests `accessibility.scan`, never hard-codes `axe-core`.
WTT-TM-PRI-002: No tool without capability (§6-rule): infrastructure-only integrations without a capability get `CAPABILITY_GAP` + catalog decision — none exist in this matrix (all rows map).
WTT-TM-PRI-003: No capability without implementation strategy (§7-rule): every catalog capability maps to `WTT_NATIVE / DEFAULT_ADAPTER / OPTIONAL_ADAPTER / COMMERCIAL_ADAPTER / ENTERPRISE_ADAPTER / EXPERIMENTAL / FUTURE_EXTENSION` — 1235/1235 mapped (§71).
WTT-TM-PRI-004: Defaults unique per Capability + Environment/Profile (§119-rule); one `DEFAULT` per capability in the master matrix unless environment-distinguished (recorded in §44).
WTT-TM-PRI-005: No popularity bias (§134): defaults reflect architecture fit, coverage, cross-platform behavior, maintenance, integration quality, security, local operation, automation-friendliness, licensing, cost — per TOOLS §§123–124, never hype.
WTT-TM-PRI-006: No redundant defaults (§135): one default + justified alternatives per capability; complementary combinations (capture→compare→enrich, §136-rule) are explicit, never automatic duplication.

## 5. Terminology

WTT-TM-TRM-001: Capability / Tool / Adapter / Execution per TOOLS §4 (never interchangeable). Abbreviations used in matrices (defined once, here): Roles `DEF=DEFAULT ALT=ALTERNATIVE OPT=OPTIONAL ENT=ENTERPRISE EXP=EXPERIMENTAL FB=FALLBACK` · Types `NAT=WTT_NATIVE ADP=WTT_ADAPTER EXT=EXTERNAL_OPTIONAL REM=REMOTE_SERVICE COM=COMMERCIAL_INTEGRATION EIT=ENTERPRISE_INTEGRATION XPT=EXPERIMENTAL FUT=FUTURE_EXTENSION` · Tiers `T0–T5` (§10) · Languages `TS=TypeScript PY=Python JV=Java BIN=external-binary N/A` · Decisions `A=APPROVED R=RECOMMENDED D=DECISION_REQUIRED O=OPTIONAL F=DEFERRED` · Status `P=PLANNED` (all rows; repo inspected) · Risk `RO=READ_ONLY ST=SAFE_TEST PW=PROJECT_WRITE AN=ACTIVE_NETWORK SA=SECURITY_ACTIVE LA=LOAD_ACTIVE SC=SYSTEM_CHANGE DE=DESTRUCTIVE BL=BLOCKED` · Production `AL=ALLOWED RO=ALLOWED_READ_ONLY POL=ALLOWED_WITH_POLICY EXP=EXPLICIT_APPROVAL_REQUIRED DIS=DISCOURAGED BLK=BLOCKED_BY_DEFAULT PRO=PROHIBITED` · Auth `Y=YES N=NO C=CONDITIONAL` · OS `E=EXPECTED U=UNKNOWN N/A` (nothing `SUPPORTED` — unverified, TOOLS §128).

## 6. Row Model

WTT-TM-ROW-001: Master-matrix (§19) grain: **Capability × Tool Implementation** (§5-rule). One row per tool per PRIMARY capability; secondary capabilities are enumerated in the Capability cell (`+ext`) and fully expanded in §21. Native packs MAY pair a capability SET with one implementation (capability IDs listed, `·`-joined). No row may carry `UNKNOWN_PHASE` (§22-rule); no missing risk/type/release (§142-rule).
WTT-TM-ROW-002: Supporting matrices (§§20–49) carry the wide detail (Matrix A–F strategy, §60-rule): A Capability-Implementation (§§20–25) · B Runtime/Language (§§26–27 + §§33–34) · C Security (§§28–30) · D Operations (§§31–32 + §§38–40) · E Output/Evidence (§§35–37) · F Routing (§§43–46). §19 remains authoritative; on any mismatch §19 + §72 govern.
WTT-TM-ROW-003: This document is governance + documentation, NOT a runtime database (§114-rule): the runtime registry MAY store equivalent structured metadata, but Markdown parsing MUST NOT become required production architecture. A future machine-readable companion (`tool-matrix.json` / `tool-registry.yaml`) is RECOMMENDED only if ARCH approves (§115-rule) — NOT created here. Generation pipelines MUST NOT be invented without approval (§116-rule).

## 7. Column Dictionary

WTT-TM-COL-001: Master columns (§59-rule, §132 sample format + ID/Decision/Design): `TM ID · Catalog · IDs · Capability ID · Capability · Tool ID · Tool · Role · Type · Tier · Language · Runtime · Phase · Release · Decision · Status · Risk · Authorization · Production · Install · OS · Output · Evidence · Fallback · Design Area`. Supporting-matrix columns per §§8–18 models. No critical column omitted for brevity (§8-rule); unreadable 50-column tables avoided via §60 split.
WTT-TM-COL-002: Column semantics: Catalog/IDs from PHASES §70 (never renumbered) · Capability/Tool IDs from TOOLS §§14–15 (exact) · Phase `WTT-P00–P48` · Release per §17 · Risk per §13 (ARCH 9-class) · Permissions per §14 · Install per §15 · OS evidence-graded (§33) · Evidence canonical 19 types (TOOLS §36) · Design Area from DESIGN.md workspaces.

## 8. Capability Model

WTT-TM-CAP-001: Capability IDs are hierarchical (`domain.action` / `domain.subdomain.action`) owned by TOOLS §15; categories: `CORE TARGET AUTHORIZATION CLI BROWSER DEVTOOLS DISCOVERY FUNCTIONAL API AUTH VISUAL ACCESSIBILITY PERFORMANCE SECURITY DATABASE DATA AI ROOT_CAUSE REMEDIATION WORKER REPORTING OBSERVABILITY INFRASTRUCTURE` (TOOLS §15 namespaces grouped). Every capability has exactly one owner domain (TOOLS §16), one required phase, one security classification, one primary tool, explicit alternatives.

---

## 9. Implementation Role Model

WTT-TM-ROL-001: Roles: `DEFAULT (one per capability/profile) · ALTERNATIVE · OPTIONAL · ENTERPRISE · EXPERIMENTAL · FALLBACK (designated backup) · LEGACY (deprecated-in-use)`. Selection priority is separate (§43): `PRIMARY / SECONDARY / FALLBACK / OPTIONAL / MANUAL_ONLY`.

## 10. Tool Tier Model

WTT-TM-TIR-001: `TIER_0_NATIVE_CORE · TIER_1_DEFAULT · TIER_2_OPTIONAL_OPEN_SOURCE · TIER_3_OPTIONAL_COMMERCIAL · TIER_4_ENTERPRISE · TIER_5_EXPERIMENTAL` (TOOLS §9; PHASES §72 mapped). Tier ≠ phase ≠ release (TOOLS §4) — all three columns appear on every master row.

## 11. Language Model

WTT-TM-LNG-001: Values `TypeScript · Python · Java · Native/Binary · External Service · N/A` + decision status `APPROVED / RECOMMENDED / DECISION_REQUIRED / NOT_APPLICABLE` per row. Language is requirements-driven (TOOLS §10); no category dogma; no triple duplication (invariants 11–12).

## 12. Runtime Model

WTT-TM-RTE-001: Runtimes per TOOLS §11 (`NODE_* · PYTHON_* · JAVA_* · NATIVE_BINARY · DOCKER_CONTAINER · KUBERNETES_JOB · REMOTE_* · MCP_SERVER · BROWSER_RUNTIME · CLOUD_SERVICE`). Protocols (§20-rule): `DIRECT_LIBRARY STDIO_JSONL HTTP REST GRPC WEBSOCKET MCP CLI PROCESS DOCKER QUEUE CLOUD_API BROWSER_PROTOCOL CDP WEBDRIVER_BIDI`. Execution locations (§21-rule): `CONTROL_PLANE LOCAL_WORKER BROWSER_WORKER PYTHON_WORKER JAVA_WORKER REMOTE_WORKER CONTAINER KUBERNETES CLOUD_SERVICE TARGET_PROJECT`.

## 13. Risk Model

WTT-TM-RSK-001: Canonical ARCH 9-class set (TOOLS §18 — binding here): `READ_ONLY · SAFE_TEST · PROJECT_WRITE · ACTIVE_NETWORK · SECURITY_ACTIVE · LOAD_ACTIVE · SYSTEM_CHANGE · DESTRUCTIVE · BLOCKED`. The brief's §32 10-item union is task text, not source; `SAFE_WRITE` fixture semantics live inside `SAFE_TEST` per TOOLS §18 disposition. Every master row carries exactly one risk class.

## 14. Permission Model

WTT-TM-PRM-001: Network `NONE TARGET_ONLY TARGET_AND_DECLARED_DEPENDENCIES APPROVED_EXTERNAL INTERNET_READ INTERNET_WRITE CUSTOM` · Filesystem `NONE PROJECT_READ PROJECT_WRITE ARTIFACT_WRITE TEMP_WRITE CUSTOM` (multi-apply) · Process `NONE SPAWN_APPROVED SPAWN_TOOL_ONLY SYSTEM_COMMAND PRIVILEGED` · Database `NONE READ WRITE_TEST_DATA MIGRATION ADMIN` (prod default `READ`) · Secrets `NONE SCOPED_SECRET_REF CREDENTIAL_BROKER DIRECT_SECRET_REQUIRED` (prefer scoped/broker) — mapped 1:1 from TOOLS §17.

## 15. Installation Model

WTT-TM-INS-001: `BUILT_IN MANAGED_INSTALL PROJECT_DEPENDENCY SYSTEM_DEPENDENCY USER_PROVIDED DOCKER_MANAGED REMOTE_SERVICE CLOUD_SERVICE ENTERPRISE_MANAGED` (TOOLS §22). No silent system installation; Docker never mandatory for simple local runs.

## 16. Environment Policy

WTT-TM-ENV-001: Environments `LOCAL DEVELOPMENT QA STAGING PRODUCTION (+UNKNOWN_REMOTE=deny)`. Cell values (§70-rule): `AUTO POLICY APPROVAL READ_ONLY BLOCKED N/A`. Production denies active/load/destructive/system-change by default (PRD `WTT-AUTHZ-012`); every active/write row carries a full 5-environment policy (§30).

## 17. Release Scope

WTT-TM-REL-001: `PROTOTYPE ALPHA BETA V1_CORE V1_OPTIONAL V1_SELECTED V1_CONDITIONAL POST_V1 ENTERPRISE EXPERIMENTAL FUTURE` — the brief's §24 set EXTENDED with the two actual V1 subset classes from PHASES §16 (`V1_SELECTED`: P24/P29/P30 subsets) and `DES-OD-001` (`V1_CONDITIONAL`: localhost-fix/basic-heal+flake/local-pool/local-gates, ratify at freeze). PROTOTYPE/ALPHA/BETA retained for phase-gate alignment (PHASES §§13–15) but no tool row claims them without gate evidence (all rows: V1_* or later).

## 18. Implementation Status

WTT-TM-STS-001: `PLANNED FOUNDATION_ONLY ADAPTER_PLANNED PARTIAL IMPLEMENTED VERIFIED DEPRECATED DISABLED DEFERRED EXPERIMENTAL STATUS_NOT_VERIFIED`. Repository inspected 2026-09-07 (docs only, no code): every row = `PLANNED` (§133-rule; TOOLS header). Decision status (§26-rule) is INDEPENDENT: `APPROVED + PLANNED` is the normal V1-core combination. Phase-status honesty (§83-rule): unverified phases stay `PLANNED`, never inferred.

---

## 19. Master Tool Matrix

WTT-TM-MAS-001: Authoritative rows (331). Legend extensions: Release `V1C=V1_CORE V1O=V1_OPTIONAL V1S=V1_SELECTED V1D=V1_CONDITIONAL P1=POST_V1 ENT=ENTERPRISE EXP=EXPERIMENTAL FUT=FUTURE` · Runtime `NIP=NODE_IN_PROCESS NWT=NODE_WORKER_THREAD NCP=NODE_CHILD_PROCESS PYS=PYTHON_SUBPROCESS PYW=PYTHON_WORKER PYV=PYTHON_SERVICE JVP=JAVA_PROCESS JVJ=JAVA_WORKER JVS=JAVA_SERVICE BIN=NATIVE_BINARY DKR=DOCKER_CONTAINER K8S=KUBERNETES_JOB RHT=REMOTE_HTTP RGR=REMOTE_GRPC RWS=REMOTE_WEBSOCKET MCP=MCP_SERVER BRR=BROWSER_RUNTIME CLD=CLOUD_SERVICE` · Risk `CMD=inherits classified command risk (TSEC-001)`.

WTT-TM-MAS-002: Native IDs (`wtt.*`) are MATRIX-minted (TOOLS §14 mints vendor IDs only): deterministic `wtt.<system>`, stable, proposed for adoption into TOOLS §14. WTT-TM-MAS-003: Class IDs for sourced-but-vendorless generics (matrix-scoped placeholders, never canonical vendor claims): `bi.clients · llm.harness · safety.harness · pay.sandbox · db.migrations · dr.backup-class · secrets.envref · orch.k8sjobs` (each Dec D/O/R + §71 rationale). WTT-TM-MAS-004: One §14 tool MAY appear in multiple rows (different capabilities); (capability,tool) pairs are unique. Sourced-but-ID-less specifics (Accessibility-Insights/WAVE signals, Web-Vitals/Chrome-perf, Compose, Black, Dredd) carry NO rows; §71 proposes §14 amendments. Auth/Install/OS/Output/Evidence/Fallback detail: §§28–32/35/44 (Matrix B–F split, §6).

| TM ID | Cat | IDs | Capability | Tool | Role | Type | Tier | Lang | RT | Phase | Release | Risk | Prod | Dec | Status | Design |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TM-000001 | A | 1–6 | target.resolve+health | wtt.target | DEF | NAT | T0 | TS | NIP | P01/P02 | V1C | RO | POL | A | P | Overview |
| TM-000002 | A | 1–6 | authorization.check+scope.evaluate+env.detect | wtt.authz | DEF | NAT | T0 | TS | NIP | P02 | V1C | RO | POL | A | P | Settings |
| TM-000003 | A | 1–6 | session.lifecycle+checkpoint+resume | wtt.session | DEF | NAT | T0 | TS | NIP | P04 | V1C | ST | POL | A | P | History |
| TM-000004 | B | 7–24 | ai.plan+route+budget | wtt.orchestrator | DEF | NAT | T0 | TS | NIP | P13 | V1C | RO | POL | A | P | Agents |
| TM-000005 | B | 7–24 | plan.jobs+dryrun | wtt.planner | DEF | NAT | T0 | TS | NIP | P13 | V1C | RO | POL | A | P | LiveRun |
| TM-000006 | C–D | 25–49 | tool.register+resolve+invoke+protocol.bind | wtt.registry | DEF | NAT | T0 | TS | NIP | P08 | V1C | RO | POL | A | P | Tools |
| TM-000007 | C–D | 25–49 | tool.health+grants+audit | wtt.toolhealth | DEF | NAT | T0 | TS | NIP | P08 | V1C | RO | POL | A | P | Tools |
| TM-000008 | H | 107–122 | graph.build+query+impact+coverage | wtt.graph | DEF | NAT | T0 | TS | NIP | P10 | V1C | RO | POL | A | P | Graph |
| TM-000009 | K | 184–201 | evidence.capture+correlate+hash | wtt.evidence | DEF | NAT | T0 | TS | NIP | P07 | V1C | RO | POL | A | P | Findings |
| TM-000010 | BK | 959–970 | finding.normalize+dedup | wtt.finding | DEF | NAT | T0 | TS | NWT | P30 | V1S | RO | POL | A | P | Findings |
| TM-000011 | BK | 959–970 | ai.rootcause.analyze | wtt.rca | DEF | NAT | T0 | TS | NWT | P30 | V1S | RO | POL | A | P | RCA |
| TM-000012 | BL/CA/AY | 971–985+1008–1012+662–667 | code.context+impact+hotspot+coverage.agg | wtt.codectx | DEF | NAT | T0 | TS | NCP | P31 | P1 | RO | POL | A | P | Code |
| TM-000013 | BM | 986–1001 | fix.patch.propose+apply+rollback | wtt.remediation | DEF | NAT | T0 | TS | NCP | P32 | V1D/P1 | PW | PRO | A | P | Fix |
| TM-000014 | BM | 986–1001 | verification.execute | wtt.verifier | DEF | NAT | T0 | TS | NIP | P30 | V1S | ST | POL | A | P | Verify |
| TM-000015 | CU | 1190–1194 | cicd.gate.eval | wtt.gates | DEF | NAT | T0 | TS | NIP | P39 | V1S/P1 | RO | POL | A | P | Gates |
| TM-000016 | CT | 1165–1185 | events.publish+replay+backfill | wtt.events | DEF | NAT | T0 | TS | NIP | P04 | V1C | RO | POL | A | P | LiveRun |
| TM-000017 | CS | 1136–1164 | dashboard.render+stream | wtt.dashboard | DEF | NAT | T0 | TS | NIP | P05 | V1C | RO | POL | A | P | Overview |
| TM-000018 | CV/CW | 1186–1206 | terminal.exec+policy.check | wtt.cli | DEF | NAT | T0 | TS | NIP | P03 | V1C | CMD | POL | A | P | CLI |
| TM-000019 | CZ | 1226–1235 | cost.meter+route+report | wtt.cost | DEF | NAT | T0 | TS | NIP | P13/P36 | V1C/P1 | RO | POL | R | P | Overview |
| TM-000020 | E | 50–72 | discovery.crawl | crawler.playwright | ALT | ADP | T1 | TS | NCP | P09 | V1C | ST | POL | O | P | Discovery |
| TM-000021 | E | 50–72 | discovery.crawl | crawler.crawlee | ALT | ADP | T2 | TS | NCP | P09 | V1O/P1 | RO | POL | O | P | Discovery |
| TM-000022 | E | 50–72 | discovery.crawl | crawler.katana | ALT | ADP | T2 | BIN | BIN | P09 | V1O/P1 | RO | POL | O | P | Discovery |
| TM-000023 | E | 50–72 | discovery.crawl | crawler.scrapy | ALT | ADP | T2 | PY | PYS | P09 | P1 | RO | POL | O | P | Discovery |
| TM-000024 | E–F | 50–86 | discovery.routes+assets | parser.cheerio | ALT | ADP | T2 | TS | NIP | P09 | V1C | RO | POL | O | P | Discovery |
| TM-000025 | E–F | 50–86 | discovery.routes+assets | parser.beautifulsoup | ALT | ADP | T2 | PY | PYS | P09 | V1C | RO | POL | O | P | Discovery |
| TM-000026 | G | 87–106 | technology.fingerprint | fingerprint.wappalyzer | ALT | ADP | T2 | TS | NIP | P09 | V1C | RO | POL | O | P | Discovery |
| TM-000027 | G | 87–106 | technology.fingerprint | fingerprint.whatweb | ALT | ADP | T2 | BIN | BIN | P09 | V1O/P1 | RO | POL | O | P | Discovery |
| TM-000028 | G | 87–106 | technology.fingerprint+version | fingerprint.wtt | DEF | NAT | T0 | TS | NIP | P09 | V1C | RO | POL | R | P | Discovery |
| TM-000029 | I | 123–156 | browser.* | browser.playwright | DEF | ADP | T1 | TS | NCP | P06 | V1C | ST | POL | A | P | Browser |
| TM-000030 | I | 123–156 | browser.* | browser.selenium | ALT | ADP | T2 | TS/JV | NCP | P06 | P1 | ST | POL | O | P | Browser |
| TM-000031 | I | 123–156 | browser.* | browser.webdriverio | ALT | ADP | T2 | TS | NCP | P06 | P1 | ST | POL | O | P | Browser |
| TM-000032 | I | 123–156 | browser.* | browser.cypress | ALT | ADP | T2 | TS | BIN | P11 | V1O/P1 | ST | POL | O | P | Browser |
| TM-000033 | I | 123–156 | browser.* | browser.puppeteer | ALT | ADP | T2 | TS | NCP | P06 | P1 | ST | POL | O | P | Browser |
| TM-000034 | I | 123–156 | browser.* | browser.nightwatch | OPT | ADP | T2 | TS | NCP | P06 | P1 | ST | POL | O | P | Browser |
| TM-000035 | I | 123–156 | browser.* | browser.testcafe | OPT | ADP | T2 | TS | BIN | P06 | P1 | ST | POL | O | P | Browser |
| TM-000036 | I | 123–156 | browser.* | browser.selenide | OPT | ADP | T3 | JV | JVP | P06 | P1 | ST | POL | O | P | Browser |
| TM-000037 | J | 157–183 | devtools.console+network+trace | devtools.cdp | DEF | NAT | T0 | TS | NIP | P07 | V1C | RO | POL | A | P | Console |
| TM-000038 | J | 157–183 | devtools.console+network+trace | devtools.bidi | DEF | NAT | T0 | TS | NIP | P07 | V1C | RO | POL | A | P | Console |
| TM-000039 | J | 157–183 | devtools.trace+har+video | browser.playwright | ALT | ADP | T1 | TS | NCP | P06/P07 | V1C | RO | POL | A | P | Network |
| TM-000040 | J | 157–183 | devtools.telemetry | devtools.cdp | DEF | NAT | T0 | TS | NIP | P07 | V1O | RO | POL | O | P | Network |
| TM-000041 | L–M | 202–241 | functional.execute+e2e.execute | wtt.functional | DEF | NAT | T0 | TS | NCP | P11 | V1C | ST | POL | A | P | Tests |
| TM-000042 | L–M | 202–241 | functional.execute | browser.playwright | ALT | ADP | T1 | TS | NCP | P11 | V1C | ST | POL | A | P | Tests |
| TM-000043 | L–M | 202–241 | functional.execute | browser.cypress | ALT | ADP | T2 | TS | BIN | P11 | V1O/P1 | ST | POL | O | P | Tests |
| TM-000044 | L–M | 202–241 | functional.execute | browser.selenium | ALT | ADP | T2 | TS/JV | NCP | P11 | P1 | ST | POL | O | P | Tests |
| TM-000045 | L–M | 202–241 | functional.execute | browser.webdriverio | ALT | ADP | T2 | TS | NCP | P11 | P1 | ST | POL | O | P | Tests |
| TM-000046 | N | 242–256 | test.unit+component.execute | test.vitest | ALT | ADP | T1 | TS | NCP | P12 | V1C | ST | POL | R | P | Tests |
| TM-000047 | N | 242–256 | test.unit+component.execute | test.jest | ALT | ADP | T1 | TS | NCP | P12 | V1C | ST | POL | R | P | Tests |
| TM-000048 | N | 242–256 | test.component.execute | test.testinglibrary | ALT | ADP | T2 | TS | NCP | P12 | V1C | ST | POL | O | P | Tests |
| TM-000049 | N | 242–256 | test.component.execute | test.cypressct | ALT | ADP | T2 | TS | BIN | P12 | V1C | ST | POL | O | P | Tests |
| TM-000050 | O | 257–269 | test.python.execute | test.pytest | ALT | ADP | T1 | PY | PYS | P12 | V1C | ST | POL | R | P | Tests |
| TM-000051 | O/X | 257–269+389–393 | test.property.check | test.hypothesis | ALT | ADP | T2 | PY | PYS | P12 | V1C | ST | POL | O | P | Tests |
| TM-000052 | P | 270–284 | test.java.execute | test.junit | ALT | ADP | T2 | JV | JVP | P12 | V1C | ST | POL | O | P | Tests |
| TM-000053 | P | 270–284 | test.java.execute | test.testng | ALT | ADP | T2 | JV | JVP | P12 | V1C | ST | POL | O | P | Tests |
| TM-000054 | Q | 285–307 | auth.login+session+mfa+sso.test | wtt.authflows | DEF | NAT | T0 | TS | NCP | P16 | V1C | ST | POL | R | P | Auth |
| TM-000055 | R | 308–322 | authz.matrix+idor.probe | wtt.authzprobes | DEF | NAT | T0 | TS | NCP | P16 | V1C | ST | EXP | R | P | AuthZ |
| TM-000056 | S | 323–335 | api.rest.request+schema.validate | wtt.http | DEF | NAT | T0 | TS | NIP | P17 | V1C | ST | POL | R | P | API |
| TM-000057 | S/AG | 323–335+499–511 | api.rest.request+network.diagnose | net.curl | ALT | ADP | T2 | BIN | BIN | P17/P23 | V1C | ST | POL | O | P | API |
| TM-000058 | S/AG | 323–335+499–511 | api.rest.request+network.diagnose | net.httpie | ALT | ADP | T2 | PY | PYS | P17/P23 | V1C | ST | POL | O | P | API |
| TM-000059 | S | 323–335 | api.rest.request | api.newman | ALT | ADP | T2 | TS | NCP | P17 | P1 | ST | POL | O | P | API |
| TM-000060 | S | 323–335 | api.rest.request | api.bruno | ALT | ADP | T2 | TS | NCP | P17 | P1 | ST | POL | O | P | API |
| TM-000061 | S | 323–335 | api.rest.request | api.supertest | ALT | ADP | T2 | TS | NCP | P17 | P1 | ST | POL | O | P | API |
| TM-000062 | S | 323–335 | api.rest.request | api.karate | ALT | ADP | T2 | JV | JVP | P17 | V1O/P1 | ST | POL | O | P | API |
| TM-000063 | S | 323–335 | api.rest.request | api.hurl | ALT | ADP | T2 | BIN | BIN | P17 | V1O/P1 | ST | POL | O | P | API |
| TM-000064 | S | 323–335 | api.rest.request | api.restassured | ALT | ADP | T2 | JV | JVP | P17 | P1 | ST | POL | O | P | API |
| TM-000065 | S | 323–335 | api.rest.request | api.tavern | ALT | ADP | T2 | PY | PYS | P17 | P1 | ST | POL | O | P | API |
| TM-000066 | S | 323–335 | api.rest.request | api.insomnia | ALT | ADP | T2 | TS | NCP | P17 | P1 | ST | POL | O | P | API |
| TM-000067 | T | 336–346 | graphql.execute+schema.validate | wtt.graphql | DEF | NAT | T0 | TS | NIP | P18 | V1O | ST | POL | R | P | API |
| TM-000068 | U | 347–363 | grpc.invoke | term.grpcurl | ALT | ADP | T2 | BIN | BIN | P18 | V1O/P1 | ST | POL | O | P | API |
| TM-000069 | V | 364–373 | messaging.publish+consume+dlq | msg.kafka | ALT | ADP | T2 | PY/JV | PYW | P18 | P1 | ST | EXP | R | P | API |
| TM-000070 | V | 364–373 | messaging.publish+consume+dlq | msg.rabbitmq | ALT | ADP | T2 | PY/JV | PYW | P18 | P1 | ST | EXP | R | P | API |
| TM-000071 | V | 364–373 | messaging.publish+consume+dlq | msg.nats | ALT | ADP | T2 | PY/JV | PYW | P18 | P1 | ST | EXP | R | P | API |
| TM-000072 | V | 364–373 | messaging.publish+consume+dlq | msg.redisstreams | ALT | ADP | T2 | PY/JV | PYW | P18 | P1 | ST | EXP | R | P | API |
| TM-000073 | V | 364–373 | messaging.publish+consume+dlq | msg.mqtt | ALT | ADP | T2 | PY/JV | PYW | P18 | P1 | ST | EXP | R | P | API |
| TM-000074 | W | 374–388 | contract.diff | contract.openapiDiff | DEF | ADP | T2 | TS | NCP | P19 | V1C | RO | POL | R | P | API |
| TM-000075 | W | 374–388 | contract.fuzz | contract.schemathesis | ALT | ADP | T2 | PY | PYS | P19 | V1C | ST | POL | R | P | API |
| TM-000076 | W | 374–388 | contract.schema.validate | contract.ajv | ALT | ADP | T2 | TS | NIP | P19 | V1C | RO | POL | R | P | API |
| TM-000077 | W | 374–388 | contract.schema.validate | contract.pydantic | ALT | ADP | T2 | PY | PYS | P19 | V1C | RO | POL | R | P | API |
| TM-000078 | W | 374–388 | contract.schema.validate | contract.zod | ALT | ADP | T2 | TS | NIP | P19 | V1C | RO | POL | R | P | API |
| TM-000079 | W | 374–388 | contract.schema.validate | contract.joi | ALT | ADP | T2 | TS | NIP | P19 | V1C | RO | POL | R | P | API |
| TM-000080 | W | 374–388 | contract.consumer.validate | contract.pact | ALT | ADP | T2 | TS/JV | NCP | P19 | V1O/P1 | RO | POL | O | P | API |
| TM-000081 | W | 374–388 | contract.consumer.validate | contract.scc | ALT | ADP | T2 | JV | JVP | P19 | V1O/P1 | RO | POL | O | P | API |
| TM-000082 | W/Y | 374–388+394–400 | contract.mock-conformance+mock.serve | mock.prism | ALT | ADP | T2 | TS | NCP | P19 | V1C | ST | POL | R | P | API |
| TM-000083 | X | 389–393 | test.property.check | wtt.property | DEF | NAT | T0 | TS | NIP | P12/P19 | V1C | ST | POL | R | P | Tests |
| TM-000084 | Y | 394–400 | mock.serve+fault.inject | mock.wiremock | ALT | ADP | T2 | JV | JVP | P19 | V1C | ST | POL | O | P | API |
| TM-000085 | Y | 394–400 | mock.serve+fault.inject | mock.mockserver | ALT | ADP | T2 | JV | JVP | P19 | V1C | ST | POL | O | P | API |
| TM-000086 | Y | 394–400 | mock.serve+fault.inject | mock.msw | ALT | ADP | T2 | TS | NCP | P19 | V1C | ST | POL | O | P | API |
| TM-000087 | Y | 394–400 | mock.serve+fault.inject | mock.mountebank | ALT | ADP | T2 | TS | NCP | P19 | P1 | ST | POL | O | P | API |
| TM-000088 | Y | 394–400 | mock.serve+fault.inject | mock.hoverfly | ALT | ADP | T2 | BIN | BIN | P19 | P1 | ST | POL | O | P | API |
| TM-000089 | Y | 394–400 | mock.serve+fault.inject | mock.mockoon | ALT | ADP | T2 | TS | NCP | P19 | P1 | ST | POL | O | P | API |
| TM-000090 | Z | 401–410 | visual.capture | visual.playwright | DEF | ADP | T1 | TS | NCP | P20 | V1C | RO | POL | A | P | Visual |
| TM-000091 | Z | 401–410 | visual.compare | visual.pixelmatch | DEF | ADP | T2 | TS | NCP | P20 | V1C | RO | POL | R | P | Visual |
| TM-000092 | Z/AA | 401–430 | visual.semantic.analyze | visual.opencv | ALT | ADP | T2 | PY | PYW | P20 | V1O/P1 | RO | POL | O | P | Visual |
| TM-000093 | Z | 401–410 | visual.compare (hosted) | visual.percy | OPT | COM | T3 | N/A | CLD | P20 | P1 | RO | POL | O | P | Visual |
| TM-000094 | Z | 401–410 | visual.compare (hosted) | visual.applitools | OPT | COM | T3 | N/A | CLD | P20 | P1 | RO | POL | O | P | Visual |
| TM-000095 | Z | 401–410 | visual.compare (hosted) | visual.chromatic | OPT | COM | T3 | N/A | CLD | P20 | P1 | RO | POL | O | P | Visual |
| TM-000096 | Z | 401–410 | visual.compare (runner) | visual.backstop | ALT | ADP | T2 | TS | NCP | P20 | P1 | RO | POL | O | P | Visual |
| TM-000097 | AA | 411–430 | ui.heuristic.check+friction.analyze | wtt.uiheuristics | DEF | NAT | T0 | TS | NIP | P20 | V1C | RO | POL | R | P | UI/UX |
| TM-000098 | AB | 431–448 | responsive.matrix.test+issue.locate | wtt.responsive | DEF | NAT | T0 | TS | NCP | P20 | V1C | ST | POL | R | P | Responsive |
| TM-000099 | AC | 449–471 | accessibility.scan+node.inspect | accessibility.axe | DEF | ADP | T1 | TS | NCP | P21 | V1C | RO | POL | R | P | A11y |
| TM-000100 | AC | 449–471 | accessibility.scan | accessibility.pa11y | FB | ADP | T2 | TS | NCP | P21 | V1O/P1 | RO | POL | O | P | A11y |
| TM-000101 | AC | 449–471 | accessibility.scan (signal) | performance.lighthouse | ALT | ADP | T1 | TS | NCP | P21 | V1O/P1 | RO | POL | R | P | A11y |
| TM-000102 | AD | 472–479 | performance.audit+vitals+budget | performance.lighthouse | DEF | ADP | T1 | TS | NCP | P22 | V1C | RO | POL | R | P | Perf |
| TM-000103 | AD | 472–479 | performance.budget+regress | performance.lhci | ALT | ADP | T1 | TS | NCP | P22 | V1O/P1 | RO | POL | R | P | Perf |
| TM-000104 | AD | 472–479 | performance.audit (depth) | performance.webpagetest | ALT | ADP | T2 | N/A | RHT | P22 | P1 | RO | POL | O | P | Perf |
| TM-000105 | AD | 472–479 | performance.audit (depth) | performance.sitespeed | ALT | ADP | T2 | TS | DKR | P22 | P1 | RO | POL | O | P | Perf |
| TM-000106 | AE–AF | 480–498 | load.execute | load.k6 | DEF | ADP | T1 | BIN | BIN | P34 | P1 | LA | BLK | R | P | Perf |
| TM-000107 | AE–AF | 480–498 | load.execute | load.jmeter | ALT | ADP | T2 | JV | JVP | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000108 | AE–AF | 480–498 | load.execute | load.gatling | ALT | ADP | T2 | JV | JVP | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000109 | AE–AF | 480–498 | load.execute | load.locust | ALT | ADP | T2 | PY | PYW | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000110 | AE–AF | 480–498 | load.execute | load.artillery | ALT | ADP | T2 | TS | NCP | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000111 | AE–AF | 480–498 | load.execute | load.vegeta | ALT | ADP | T2 | BIN | BIN | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000112 | AE–AF | 480–498 | load.execute | load.wrk | ALT | ADP | T2 | BIN | BIN | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000113 | AE–AF | 480–498 | load.execute | load.hey | ALT | ADP | T2 | BIN | BIN | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000114 | AE–AF | 480–498 | load.execute | load.autocannon | ALT | ADP | T2 | TS | NCP | P34 | P1 | LA | BLK | O | P | Perf |
| TM-000115 | AG | 499–511 | network.diagnose | net.ping | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | O | P | Network |
| TM-000116 | AG | 499–511 | network.diagnose | net.traceroute | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | O | P | Network |
| TM-000117 | AG | 499–511 | network.diagnose | net.mtr | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | O | P | Network |
| TM-000118 | AG | 499–511 | network.capture | net.tcpdump | ALT | ADP | T2 | BIN | BIN | P23 | V1C | AN | EXP | O | P | Network |
| TM-000119 | AG | 499–511 | network.capture | net.tshark | ALT | ADP | T2 | BIN | BIN | P23 | V1C | AN | EXP | O | P | Network |
| TM-000120 | AG | 499–511 | network.connect.probe | net.netcat | ALT | ADP | T2 | BIN | BIN | P23 | V1O/P1 | AN | EXP | O | P | Network |
| TM-000121 | AG | 499–511 | network.throughput.probe | net.iperf | ALT | ADP | T2 | BIN | BIN | P23 | V1O/P1 | AN | EXP | O | P | Network |
| TM-000122 | AH | 512–518 | network.proxy.inspect | proxy.mitmproxy | ALT | ADP | T2 | PY | PYS | P23 | V1O/P1 | AN | EXP | O | P | Network |
| TM-000123 | AH | 512–518 | network.proxy.inspect | proxy.fiddler | OPT | ADP | T2 | BIN | BIN | P23 | P1 | AN | EXP | O | P | Network |
| TM-000124 | AH | 512–518 | network.proxy.inspect | proxy.charles | OPT | ADP | T3 | BIN | BIN | P23 | P1 | AN | EXP | O | P | Network |
| TM-000125 | AH | 512–518 | network.proxy.inspect | proxy.proxyman | OPT | ADP | T3 | BIN | BIN | P23 | P1 | AN | EXP | O | P | Network |
| TM-000126 | AI | 519–524 | dns.resolve+dnssec.validate | dns.dig | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | R | P | Network |
| TM-000127 | AI | 519–524 | dns.resolve+dnssec.validate | dns.nslookup | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | R | P | Network |
| TM-000128 | AI | 519–524 | dns.dnssec.validate | dns.dnsviz | ALT | ADP | T2 | N/A | RHT | P23 | V1O/P1 | RO | POL | O | P | Network |
| TM-000129 | AJ | 525–528 | tls.chain.validate+config.audit | tls.openssl | ALT | ADP | T2 | BIN | BIN | P23 | V1C | RO | POL | R | P | Network |
| TM-000130 | AJ | 525–528 | tls.config.audit | tls.sslyze | ALT | ADP | T2 | PY | PYS | P23 | V1O/P1 | RO | POL | O | P | Network |
| TM-000131 | AJ | 525–528 | tls.config.audit | tls.testssl | ALT | ADP | T2 | BIN | BIN | P23 | V1O/P1 | RO | POL | O | P | Network |
| TM-000132 | AK | 529–536 | security.dast.scan | security.zap | DEF | ADP | T2 | JV | JVP | P24 | V1O/P1 | SA | BLK | R | P | Security |
| TM-000133 | AK | 529–536 | security.dast.scan | security.nuclei | ALT | ADP | T2 | BIN | BIN | P24 | V1O/P1 | SA | BLK | O | P | Security |
| TM-000134 | AK | 529–536 | security.dast.scan | security.wapiti | ALT | ADP | T2 | PY | PYS | P24 | P1 | SA | BLK | O | P | Security |
| TM-000135 | AK | 529–536 | security.dast.scan+probe | security.nikto | ALT | ADP | T2 | BIN | BIN | P24 | P1 | AN | EXP | O | P | Security |
| TM-000136 | AK | 529–536 | security.probe.http | security.httpx | ALT | ADP | T2 | BIN | BIN | P25 | P1 | AN | EXP | O | P | Security |
| TM-000137 | AK | 529–536 | security.discovery.probe | security.nmap | ALT | ADP | T2 | BIN | BIN | P25 | P1 | AN | EXP | O | P | Security |
| TM-000138 | AK | 529–536 | security.dast.scan | security.burp | OPT | COM | T3 | JV | JVP | P24 | P1 | SA | BLK | O | P | Security |
| TM-000139 | AK | 529–536 | security.payload.probe+fuzz | wtt.secprobes | ALT | NAT | T0 | TS | NCP | P24/P25 | V1S/P1 | SA | BLK | R | P | Security |
| TM-000140 | AL | 537–551 | security.config.surface-review | wtt.secval | DEF | NAT | T0 | TS | NIP | P24 | V1S | RO | POL | R | P | Security |
| TM-000141 | AL | 537–551 | security.passive.surface-review | security.zap | ALT | ADP | T2 | JV/BIN | JVP | P24 | V1O | RO | POL | R | P | Security |
| TM-000142 | AM | 552–560 | security.sast.scan | sast.semgrep | DEF | ADP | T1 | PY/BIN | PYS | P26 | V1O/P1 | RO | POL | R | P | Security |
| TM-000143 | AM | 552–560 | security.sast.scan | sast.codeql | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000144 | AM | 552–560 | security.sast.scan | sast.sonarqube | ALT | ADP | T2 | JV | RHT | P26 | P1 | RO | POL | O | P | Security |
| TM-000145 | AM | 552–560 | security.sast.scan | sast.bandit | ALT | ADP | T2 | PY | PYS | P26 | P1 | RO | POL | O | P | Security |
| TM-000146 | AM | 552–560 | security.sast.scan | sast.spotbugs | ALT | ADP | T2 | JV | JVP | P26 | P1 | RO | POL | O | P | Security |
| TM-000147 | AN | 561–571 | security.sca.scan | sca.trivy | DEF | ADP | T1 | BIN | BIN | P26 | V1O/P1 | RO | POL | R | P | Security |
| TM-000148 | AN | 561–571 | security.sca.scan | sca.grype | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000149 | AN | 561–571 | security.sca.scan | sca.osv | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000150 | AN | 561–571 | security.sca.scan | sca.snyk | OPT | COM | T3 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000151 | AO | 572–576 | security.secrets.scan | secret.gitleaks | DEF | ADP | T2 | BIN | BIN | P26 | V1O/P1 | RO | POL | R | P | Security |
| TM-000152 | AO | 572–576 | security.secrets.scan | secret.trufflehog | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000153 | AP | 577–583 | sbom.generate+verify | sbom.syft | DEF | ADP | T2 | BIN | BIN | P26/P38 | P1 | RO | POL | R | P | Security |
| TM-000154 | AQ | 584–600 | iac.scan | iac.checkov | DEF | ADP | T2 | PY | PYS | P37 | P1 | RO | POL | R | P | Security |
| TM-000155 | AQ | 584–600 | iac.scan | iac.tfsec | ALT | ADP | T2 | BIN | BIN | P37 | P1 | RO | POL | O | P | Security |
| TM-000156 | AQ | 584–600 | iac.scan | iac.terrascan | ALT | ADP | T2 | BIN | BIN | P37 | P1 | RO | POL | O | P | Security |
| TM-000157 | AQ | 584–600 | iac.scan | iac.kics | ALT | ADP | T2 | BIN | BIN | P37 | P1 | RO | POL | O | P | Security |
| TM-000158 | AQ | 584–600 | compose.validate | term.docker | ALT | ADP | T2 | BIN | BIN | P03/P37 | P1 | SC | EXP | O | P | CLI |
| TM-000159 | AR | 601–615 | kubernetes.config.audit | k8s.kubebench | DEF | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | R | P | Security |
| TM-000160 | AR | 601–615 | kubernetes.config.audit | k8s.kubescape | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000161 | AR | 601–615 | kubernetes.config.audit | k8s.polaris | ALT | ADP | T2 | BIN | BIN | P26 | P1 | RO | POL | O | P | Security |
| TM-000162 | AS | 616–627 | cloud.read | term.aws | ALT | ADP | T2 | BIN | BIN | P26 | P1 | ST | EXP | O | P | Security |
| TM-000163 | AS | 616–627 | cloud.read | term.az | ALT | ADP | T2 | BIN | BIN | P26 | P1 | ST | EXP | O | P | Security |
| TM-000164 | AS | 616–627 | cloud.read | term.gcloud | ALT | ADP | T2 | BIN | BIN | P26 | P1 | ST | EXP | O | P | Security |
| TM-000165 | AS | 616–627 | cloud.config.audit | wtt.cloudval | DEF | NAT | T0 | TS | RHT | P26 | P1 | RO | POL | R | P | Security |
| TM-000166 | AT | 628–632 | webhook.setup+verify | wtt.webhook | DEF | NAT | T0 | TS | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000167 | AU | 633–639 | data.seed+fixture+mock | wtt.datamgr | DEF | NAT | T0 | TS | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000168 | AV–AX | 640–661 | i18n+currency+address+timezone+growth | wtt.loc | DEF | NAT | T0 | TS | NIP | P29 | P1 | RO | POL | R | P | UI/UX |
| TM-000169 | AZ–BA | 668–698 | cms+docs+search+kb+dashboard.widgets | wtt.cms | DEF | NAT | T0 | TS | NIP | P29 | P1 | RO | POL | R | P | UI/UX |
| TM-000170 | BB | 699–709 | seo.meta+schema+robots+sitemap | wtt.seo | DEF | NAT | T0 | TS | NIP | P29 | V1S/P1 | RO | POL | R | P | Perf |
| TM-000171 | BB | 699–709 | seo.audit | performance.lighthouse | ALT | ADP | T1 | TS | NCP | P29 | V1S/P1 | RO | POL | R | P | Perf |
| TM-000172 | BI/BJ | 710–741 | data.profile+validate+diff+lineage | data.greatexp | ALT | ADP | T2 | PY | PYW | P28 | P1 | RO | POL | O | P | Data |
| TM-000173 | BI/BJ | 710–741 | data.profile+validate+diff+lineage | data.soda | ALT | ADP | T2 | PY | PYW | P28 | P1 | RO | POL | O | P | Data |
| TM-000174 | BI/BJ | 710–741 | data.profile+validate+diff+lineage | data.deequ | ALT | ADP | T2 | JV | JVJ | P28 | P1 | RO | POL | O | P | Data |
| TM-000175 | BI/BJ | 710–741 | data.transform+lineage | data.dbt | ALT | ADP | T2 | PY | PYS | P28 | P1 | ST | EXP | O | P | Data |
| TM-000176 | CB | 742–758 | analytics.assert+bi.validate | bi.clients | OPT | ADP | T4 | N/A | RHT | P28 | P1/ENT | RO | POL | D | P | Data |
| TM-000177 | CC/CD | 759–789 | file.parse+excel+csv+xml+pdf | wtt.fileval | DEF | NAT | T0 | TS | NIP | P28 | V1O/P1 | RO | POL | R | P | Data |
| TM-000178 | CC/CD | 759–789 | payments.webhook+ledger | pay.sandbox | DEF | ADP | T2 | N/A | RHT | P29 | P1 | ST | EXP | D | P | Data |
| TM-000179 | CE/CF | 790–821 | ecommerce.* | wtt.ecom | DEF | NAT | T0 | TS | NIP | P29 | P1 | ST | POL | R | P | UI/UX |
| TM-000180 | CE/CF | 790–821 | privacy.consent+dsr | wtt.privacy | DEF | NAT | T0 | TS | NIP | P29 | P1 | RO | POL | R | P | AuthZ |
| TM-000181 | CG/CQ | 822–837 | llm.behavior+groundedness+promptsec | llm.harness | DEF | ADP | T2 | PY | PYS | P41 | P1 | ST | EXP | D | P | Agents |
| TM-000182 | CH/CR | 838–853 | agent.trace+evaluate | wtt.traj | DEF | NAT | T0 | TS | NIP | P42 | P1 | RO | POL | R | P | Agents |
| TM-000183 | CH/CR | 838–853 | safety.redteam.probe | safety.harness | ALT | XPT | T5 | PY | PYS | P42 | P1/EXP | AN | EXP | D | P | Agents |
| TM-000184 | CX | 854–869 | mobile.* | mobile.appium | DEF | ADP | T1 | TS | NCP | P44 | P1 | ST | POL | R | P | Browser |
| TM-000185 | CX | 854–869 | mobile.e2e | mobile.maestro | ALT | ADP | T2 | BIN | BIN | P44 | P1 | ST | POL | O | P | Browser |
| TM-000186 | CX | 854–869 | mobile.e2e | mobile.detox | ALT | ADP | T2 | TS | NCP | P44 | P1 | ST | POL | O | P | Browser |
| TM-000187 | CX | 854–869 | mobile.e2e | mobile.espresso | ALT | ADP | T2 | JV | JVP | P44 | P1 | ST | POL | O | P | Browser |
| TM-000188 | CX | 854–869 | mobile.e2e | mobile.uiautomator | ALT | ADP | T2 | JV | JVP | P44 | P1 | ST | POL | O | P | Browser |
| TM-000189 | CX | 854–869 | mobile.e2e | mobile.xcuitest | ALT | ADP | T2 | N/A | BIN | P44 | P1 | ST | POL | O | P | Browser |
| TM-000190 | CX | 854–869 | desktop.electron.test | desktop.electron | ALT | ADP | T2 | TS | NCP | P44 | P1 | ST | POL | O | P | Browser |
| TM-000191 | CX | 854–869 | desktop.mobile-inspect | desktop.appium | ALT | ADP | T2 | TS | NCP | P44 | P1 | RO | POL | O | P | Browser |
| TM-000192 | CX | 854–869 | desktop.windows.test | desktop.winappdriver | ALT | ADP | T2 | N/A | BIN | P44 | P1 | ST | POL | O | P | Browser |
| TM-000193 | BC/BD | 870–900 | inbox.rules+forwarding+calendar | wtt.connect | DEF | NAT | T0 | TS | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000194 | BC/BD | 870–900 | email.capture+content.assert | email.mailpit | DEF | ADP | T1 | BIN | BIN | P28 | V1C | ST | EXP | R | P | Data |
| TM-000195 | BC/BD | 870–900 | email.capture+content.assert | email.mailhog | ALT | ADP | T1 | BIN | BIN | P28 | V1O/P1 | ST | EXP | R | P | Data |
| TM-000196 | BC/BD | 870–900 | email.capture+content.assert | email.smtp4dev | ALT | ADP | T2 | BIN | BIN | P28 | V1O/P1 | ST | EXP | O | P | Data |
| TM-000197 | BC/BD | 870–900 | email.capture+content.assert | email.greenmail | ALT | ADP | T2 | JV | JVP | P28 | V1O/P1 | ST | EXP | O | P | Data |
| TM-000198 | BC/BD | 870–900 | email.capture (hosted) | email.mailtrap | OPT | COM | T3 | N/A | CLD | P28 | P1 | ST | EXP | O | P | Data |
| TM-000199 | BP | 901–908 | git.diff+branch.read | vcs.git | DEF | ADP | T1 | BIN | BIN | P31/P39 | P1 | RO | POL | R | P | Code |
| TM-000200 | BE/BF | 909–925 | db.connect+query+integrity | db.postgres | ALT | ADP | T1 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000201 | BE/BF | 909–925 | db.connect+query+integrity | db.mysql | ALT | ADP | T2 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000202 | BE/BF | 909–925 | db.connect+query+integrity | db.mongo | ALT | ADP | T2 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000203 | BE/BF | 909–925 | db.connect+query+integrity | db.redis | ALT | ADP | T1 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000204 | BE/BF | 909–925 | db.connect+query+integrity | db.mariadb | ALT | ADP | T2 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000205 | BE/BF | 909–925 | db.connect+query+integrity | db.oracle | ALT | ADP | T2 | PY/JV | PYW | P28 | P1 | ST | EXP | R | P | Data |
| TM-000206 | BE/BF | 909–925 | db.connect+query+integrity | db.mssql | ALT | ADP | T2 | TS/PY | NIP | P28 | P1 | ST | EXP | R | P | Data |
| TM-000207 | BE/BF | 909–925 | db.connect+query+integrity | db.elastic | ALT | ADP | T2 | PY/JV | PYW | P28 | P1 | ST | EXP | R | P | Data |
| TM-000208 | BE/BF | 909–925 | db.migrate+schema.validate | db.migrations | ALT | ADP | T2 | TS/PY | NCP | P28/P39 | P1 | PW | PRO | O | P | Data |
| TM-000209 | BG | 926–927 | markdown.lint | wtt.i18n | DEF | NAT | T0 | TS | NIP | P29 | V1S | RO | POL | R | P | UI/UX |
| TM-000210 | BH | 928–933 | rss.feed.validate | wtt.feeds | DEF | NAT | T0 | TS | NIP | P29 | P1 | RO | POL | R | P | UI/UX |
| TM-000211 | BH | 934–939 | trend.collect+history.query | wtt.trends | DEF | NAT | T0 | TS | NWT | P31/P36 | P1 | RO | POL | R | P | History |
| TM-000212 | BS | 940–944 | secrets.ref.resolve@exec | secrets.vault | ALT | ADP | T4 | N/A | RHT | P40 | ENT | ST | EXP | R | P | Settings |
| TM-000213 | BS | 940–944 | secrets.ref.resolve@exec | secrets.awssm | ALT | ADP | T4 | N/A | RHT | P40 | ENT | ST | EXP | R | P | Settings |
| TM-000214 | BS | 940–944 | secrets.ref.resolve@exec | secrets.azurekv | ALT | ADP | T4 | N/A | RHT | P40 | ENT | ST | EXP | R | P | Settings |
| TM-000215 | BS | 940–944 | secrets.ref.resolve@exec | secrets.gcp | ALT | ADP | T4 | N/A | RHT | P40 | ENT | ST | EXP | R | P | Settings |
| TM-000216 | BS | 940–944 | secrets.ref.resolve@exec | secrets.k8s | ALT | ADP | T2 | N/A | NIP | P40 | V1C/P1 | ST | EXP | R | P | Settings |
| TM-000217 | BS | 940–944 | secrets.ref.resolve@exec | secrets.docker | ALT | ADP | T3 | N/A | RHT | P40 | P1/ENT | ST | EXP | R | P | Settings |
| TM-000218 | BS | 940–944 | secrets.ref.resolve@exec | secrets.envref | ALT | ADP | T2 | N/A | NIP | P40 | V1C/P1 | ST | EXP | R | P | Settings |
| TM-000219 | BV | 945–949 | notify.send | notify.slack | ALT | ADP | T2 | TS | RHT | P40 | P1 | RO | POL | R | P | Settings |
| TM-000220 | BV | 945–949 | notify.send | notify.teams | ALT | ADP | T2 | TS | RHT | P40 | P1 | RO | POL | R | P | Settings |
| TM-000221 | BV | 945–949 | notify.send | notify.email | ALT | ADP | T2 | TS | RHT | P40 | P1 | RO | POL | R | P | Settings |
| TM-000222 | BV | 945–949 | notify.send | notify.webhook | ALT | ADP | T2 | TS | RHT | P40 | P1 | RO | POL | R | P | Settings |
| TM-000223 | CL | 950–954 | artifact.store | store.fs | DEF | NAT | T0 | TS | NIP | P04/P40 | V1C | ST | POL | A | P | Artifacts |
| TM-000224 | CL | 950–954 | artifact.store (blob) | store.s3 | ALT | ADP | T2 | TS | RHT | P40 | P1/ENT | ST | EXP | R | P | Artifacts |
| TM-000225 | CL | 950–954 | artifact.store (blob) | store.gcs | ALT | ADP | T2 | TS | RHT | P40 | P1/ENT | ST | EXP | R | P | Artifacts |
| TM-000226 | CL | 950–954 | artifact.store (blob) | store.azureblob | ALT | ADP | T2 | TS | RHT | P40 | P1/ENT | ST | EXP | R | P | Artifacts |
| TM-000227 | CL | 950–954 | artifact.store (s3-compat) | store.minio | ALT | ADP | T2 | TS | RHT | P40 | P1/ENT | ST | EXP | R | P | Artifacts |
| TM-000228 | CM | 955–958 | case.sync | mgmt.jira | ALT | ADP | T2 | TS | RHT | P40 | V1O/P1 | ST | EXP | O | P | Findings |
| TM-000229 | CM | 955–958 | case.sync | mgmt.testrail | ALT | ADP | T3 | TS | RHT | P40 | V1O/P1 | ST | EXP | O | P | Tests |
| TM-000230 | CM | 955–958 | case.sync | mgmt.linear | ALT | ADP | T2 | TS | RHT | P40 | P1 | ST | EXP | O | P | Findings |
| TM-000231 | CM | 955–958 | case.sync | mgmt.azureboards | ALT | ADP | T3 | TS | RHT | P40 | P1/ENT | ST | EXP | O | P | Findings |
| TM-000232 | CM | 955–958 | case.sync | mgmt.zephyr | ALT | ADP | T3 | TS | RHT | P40 | P1 | ST | EXP | O | P | Tests |
| TM-000233 | CM | 955–958 | case.sync | mgmt.xray | ALT | ADP | T3 | TS | RHT | P40 | P1 | ST | EXP | O | P | Tests |
| TM-000234 | BL | 971–985 | coverage.collect | coverage.istanbul | ALT | ADP | T1 | TS | NCP | P12/P38 | V1C/P1 | RO | POL | O | P | Code |
| TM-000235 | BL | 971–985 | coverage.collect | coverage.py | ALT | ADP | T2 | PY | PYS | P12/P38 | V1C/P1 | RO | POL | O | P | Code |
| TM-000236 | BL | 971–985 | coverage.collect | coverage.jacoco | ALT | ADP | T2 | JV | JVP | P12/P38 | V1C/P1 | RO | POL | O | P | Code |
| TM-000237 | BL | 971–985 | coverage.collect | coverage.c8 | ALT | ADP | T1 | TS | NCP | P12/P38 | V1C/P1 | RO | POL | O | P | Code |
| TM-000238 | BL | 971–985 | coverage.aggregate | wtt.covagg | DEF | NAT | T0 | TS | NIP | P31 | P1 | RO | POL | R | P | Code |
| TM-000239 | BN/BO | 1002–1021 | selfheal.locator+rerun+pool | wtt.heal | DEF | NAT | T0 | TS | NCP | P33 | V1D/P1 | ST | POL | R | P | Verify |
| TM-000240 | BN/BO | 1002–1021 | flake.detect+quarantine | wtt.flake | DEF | NAT | T0 | TS | NWT | P33 | V1D | RO | POL | R | P | Verify |
| TM-000241 | CY | 1022–1027 | readiness.evaluate | wtt.readiness | DEF | NAT | T0 | TS | NIP | P48 | P1 | RO | POL | R | P | Gates |
| TM-000242 | CI/CJ | 1028–1046 | ai.select.priority | wtt.select | DEF | NAT | T0 | TS | NIP | P14 | V1C | RO | POL | R | P | Tests |
| TM-000243 | CI/CJ | 1028–1046 | ai.generate.cases | wtt.generate | DEF | NAT | T0 | TS | NIP | P14 | V1C | RO | POL | R | P | Tests |
| TM-000244 | CK | 1047–1053 | ml.train+evaluate (byo) | ml.scikit | ALT | ADP | T2 | PY | PYW | P43 | P1 | RO | POL | O | P | Agents |
| TM-000245 | CK | 1047–1053 | ml.train+evaluate (byo) | ml.tf | ALT | ADP | T2 | PY | PYW | P43 | P1 | RO | POL | O | P | Agents |
| TM-000246 | CK | 1047–1053 | ml.train+evaluate (byo) | ml.torch | ALT | ADP | T2 | PY | PYW | P43 | P1 | RO | POL | O | P | Agents |
| TM-000247 | BQ/BR | 1054–1078 | chaos.experiment | chaos.mesh | ALT | ADP | T2 | N/A | K8S | P37 | P1/EXP | DE | PRO | O | P | Perf |
| TM-000248 | BQ/BR | 1054–1078 | backup.snapshot+verify+restore.drill | dr.backup-class | ALT | ADP | T2 | BIN | BIN | P37 | P1 | DE | PRO | O | P | Artifacts |
| TM-000249 | BQ/BR | 1054–1078 | chaos.blast.validate+dr.plan | wtt.blast | DEF | NAT | T0 | TS | NIP | P37 | P1 | RO | POL | R | P | Perf |
| TM-000250 | CN | 1079–1089 | learning.record+tune | wtt.learn | DEF | NAT | T0 | TS | NIP | P32 | P1 | RO | POL | R | P | Agents |
| TM-000251 | CO | 1090–1098 | synthetic.monitor | browser.playwright | ALT | ADP | T1 | TS | NCP | P46 | P1 | ST | POL | R | P | Perf |
| TM-000252 | CO | 1090–1098 | synthetic.monitor | load.k6 | ALT | ADP | T1 | BIN | BIN | P46 | P1 | ST | POL | R | P | Perf |
| TM-000253 | BT | 1099–1111 | observability.trace+metrics+logs | obs.otel | DEF | NAT | T0 | TS | NIP | P04/P36 | V1C | RO | POL | A | P | LiveRun |
| TM-000254 | BT | 1099–1111 | observability.metrics | obs.prometheus | ALT | ADP | T1 | BIN | RHT | P36 | P1 | RO | POL | R | P | LiveRun |
| TM-000255 | BT | 1099–1111 | observability.dashboard | obs.grafana | ALT | ADP | T1 | BIN | RHT | P36 | P1 | RO | POL | R | P | LiveRun |
| TM-000256 | BT | 1099–1111 | observability.logs | obs.loki | ALT | ADP | T2 | BIN | RHT | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000257 | BT | 1099–1111 | observability.trace | obs.tempo | ALT | ADP | T2 | BIN | RHT | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000258 | BT | 1099–1111 | observability.trace | obs.jaeger | ALT | ADP | T2 | BIN | RHT | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000259 | BT | 1099–1111 | observability.logs | obs.elastic | ALT | ADP | T2 | JV | RHT | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000260 | BT | 1099–1111 | observability.errors | obs.sentry | OPT | COM | T3 | TS | CLD | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000261 | BT | 1099–1111 | observability.monitor | obs.datadog | OPT | COM | T3 | N/A | CLD | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000262 | BT | 1099–1111 | observability.monitor | obs.newrelic | OPT | COM | T3 | N/A | CLD | P36 | P1 | RO | POL | O | P | LiveRun |
| TM-000263 | BU | 1112–1127 | schedule.pool+queue+job | wtt.scheduler | DEF | NAT | T0 | TS | NIP | P35 | V1D/P1 | ST | POL | A | P | Workers |
| TM-000264 | BU | 1112–1127 | queue.enqueue+dequeue | queue.bullmq | DEF | ADP | T1 | TS | NWT | P35 | V1C | ST | POL | R | P | Workers |
| TM-000265 | BU | 1112–1127 | queue.enqueue+dequeue | queue.nats | ALT | ADP | T2 | BIN | RHT | P35 | P1 | ST | POL | O | P | Workers |
| TM-000266 | BU | 1112–1127 | queue.enqueue+dequeue | queue.rabbitmq | ALT | ADP | T2 | BIN | RHT | P35 | P1 | ST | POL | O | P | Workers |
| TM-000267 | BU | 1112–1127 | queue.enqueue+dequeue | queue.kafka | ALT | ADP | T2 | JV | RHT | P35 | P1 | ST | POL | O | P | Workers |
| TM-000268 | BU | 1112–1127 | orchestrate.workflow | workflow.temporal | ALT | ADP | T2 | TS | RHT | P35 | P1 | ST | POL | O | P | Workers |
| TM-000269 | BU | 1112–1127 | orchestrate.job | orch.k8sjobs | ALT | ADP | T2 | N/A | K8S | P35/P37 | P1/ENT | ST | EXP | O | P | Workers |
| TM-000270 | CP | 1128–1135 | admin.tenant+flag+audit+quota | wtt.admin | DEF | NAT | T0 | TS | NIP | P47 | ENT | ST | EXP | R | P | Settings |
| TM-000271 | CT | 1165–1185 | events.stream+replay | msg.redisstreams | DEF | ADP | T1 | TS | NWT | P04 | V1C | RO | POL | R | P | LiveRun |
| TM-000272 | CV/CW | 1186–1206 | terminal.exec×npm | term.npm | ALT | ADP | T2 | TS | NCP | P03 | V1C | PW | EXP | O | P | CLI |
| TM-000273 | CV/CW | 1186–1206 | terminal.exec×node | term.node | ALT | ADP | T2 | TS | NCP | P03 | V1C | PW | EXP | O | P | CLI |
| TM-000274 | CV/CW | 1186–1206 | terminal.exec×python | term.python | ALT | ADP | T2 | PY | PYS | P03 | V1C | PW | EXP | O | P | CLI |
| TM-000275 | CV/CW | 1186–1206 | terminal.exec×java | term.java | ALT | ADP | T2 | JV | JVP | P03 | V1C | PW | EXP | O | P | CLI |
| TM-000276 | CV/CW | 1186–1206 | terminal.exec×docker | term.docker | ALT | ADP | T2 | BIN | BIN | P03 | V1C | SC | EXP | O | P | CLI |
| TM-000277 | CV/CW | 1186–1206 | terminal.exec×kubectl | term.kubectl | ALT | ADP | T2 | BIN | BIN | P03 | V1C | SC | EXP | O | P | CLI |
| TM-000278 | CV/CW | 1186–1206 | terminal.exec×terraform | term.terraform | ALT | ADP | T2 | BIN | BIN | P03 | V1C | SC | EXP | O | P | CLI |
| TM-000279 | CV/CW | 1186–1206 | terminal.exec×grpcurl | term.grpcurl | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | POL | O | P | CLI |
| TM-000280 | CV/CW | 1186–1206 | terminal.exec×psql | term.psql | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | EXP | O | P | CLI |
| TM-000281 | CV/CW | 1186–1206 | terminal.exec×mysql | term.mysql | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | EXP | O | P | CLI |
| TM-000282 | CV/CW | 1186–1206 | terminal.exec×rediscli | term.redismcli | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | EXP | O | P | CLI |
| TM-000283 | CV/CW | 1186–1206 | terminal.exec×mongosh | term.mongosh | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | EXP | O | P | CLI |
| TM-000284 | CV/CW | 1186–1206 | terminal.exec×curl | term.curl | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | POL | O | P | CLI |
| TM-000285 | CV/CW | 1186–1206 | terminal.exec×git | term.git | ALT | ADP | T2 | BIN | BIN | P03 | V1C | ST | EXP | O | P | CLI |
| TM-000286 | CU | 1190–1194 | ci.run+status+annotate | ci.github | ALT | ADP | T1 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000287 | CU | 1190–1194 | ci.run+status+annotate | ci.gitlab | ALT | ADP | T2 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000288 | CU | 1190–1194 | ci.run+status+annotate | ci.jenkins | ALT | ADP | T2 | JV | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000289 | CU | 1190–1194 | ci.run+status+annotate | ci.azure | ALT | ADP | T2 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000290 | CU | 1190–1194 | ci.run+status+annotate | ci.circle | ALT | ADP | T2 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000291 | CU | 1190–1194 | ci.run+status+annotate | ci.buildkite | ALT | ADP | T2 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000292 | CU | 1190–1194 | ci.run+status+annotate | ci.teamcity | ALT | ADP | T2 | JV | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000293 | CU | 1190–1194 | ci.run+status+annotate | ci.bitbucket | ALT | ADP | T2 | TS | RHT | P39 | P1 | ST | EXP | R | P | CI |
| TM-000294 | CU | 1190–1194 | ci.pipeline.lint+secrets-scan | wtt.cilint | DEF | NAT | T0 | TS | NIP | P39 | P1 | RO | POL | R | P | CI |
| TM-000295 | CU | 1190–1194 | vcs.tag+staleness | vcs.git | ALT | ADP | T1 | BIN | BIN | P39 | P1 | RO | POL | R | P | CI |
| TM-000296 | CU | 1190–1194 | build.cache+incremental | wtt.buildcache | DEF | ADP | T2 | TS | NIP | P38 | P1 | ST | POL | R | P | CI |
| TM-000297 | BW | 1207–1211 | build.execute | build.npm | ALT | ADP | T2 | TS | NCP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000298 | BW | 1207–1211 | build.execute | build.maven | ALT | ADP | T2 | JV | JVP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000299 | BW | 1207–1211 | build.execute | build.gradle | ALT | ADP | T2 | JV | JVP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000300 | BW | 1207–1211 | build.execute | build.poetry | ALT | ADP | T2 | PY | PYS | P38 | P1 | PW | EXP | O | P | CI |
| TM-000301 | BW | 1207–1211 | build.execute | build.pip | ALT | ADP | T2 | PY | PYS | P38 | P1 | PW | EXP | O | P | CI |
| TM-000302 | BW | 1207–1211 | build.execute | build.pnpm | ALT | ADP | T2 | TS | NCP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000303 | BW | 1207–1211 | build.execute | build.yarn | ALT | ADP | T2 | TS | NCP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000304 | BW | 1207–1211 | build.execute | build.bun | ALT | ADP | T2 | TS | NCP | P38 | P1 | PW | EXP | O | P | CI |
| TM-000305 | BW | 1207–1211 | build.execute | build.uv | ALT | ADP | T2 | PY | PYS | P38 | P1 | PW | EXP | O | P | CI |
| TM-000306 | BX | 1212–1217 | lint.execute+autofix | quality.eslint | ALT | ADP | T2 | TS | NCP | P38 | P1 | ST | POL | O | P | Code |
| TM-000307 | BX | 1212–1217 | lint.execute+autofix | quality.ruff | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000308 | BX | 1212–1217 | lint.execute+autofix | quality.checkstyle | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000309 | BX | 1212–1217 | lint.execute+autofix | quality.prettier | ALT | ADP | T2 | TS | NCP | P38 | P1 | ST | POL | O | P | Code |
| TM-000310 | BX | 1212–1217 | lint.execute+autofix | quality.biome | ALT | ADP | T2 | TS | NCP | P38 | P1 | ST | POL | O | P | Code |
| TM-000311 | BX | 1212–1217 | lint.execute+autofix | quality.tsc | ALT | ADP | T2 | TS | NCP | P38 | P1 | ST | POL | O | P | Code |
| TM-000312 | BX | 1212–1217 | lint.execute+autofix | quality.pylint | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000313 | BX | 1212–1217 | lint.execute+autofix | quality.mypy | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000314 | BX | 1212–1217 | lint.execute+autofix | quality.pyright | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000315 | BX | 1212–1217 | lint.execute+autofix | quality.pmd | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000316 | BX | 1212–1217 | lint.execute+autofix | quality.errorprone | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000317 | BX | 1212–1217 | lint.execute+autofix | quality.spotbugs | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000318 | BY | 1218–1220 | coverage.enforce | coverage.jacoco | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000319 | BY | 1218–1220 | coverage.enforce | coverage.py | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000320 | BY | 1218–1220 | coverage.enforce+mutation.score | mutation.stryker | ALT | ADP | T2 | TS/PY | NCP | P38 | P1 | ST | POL | O | P | Code |
| TM-000321 | BY | 1218–1220 | coverage.enforce+mutation.score | mutation.mutmut | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000322 | BY | 1218–1220 | coverage.enforce+mutation.score | mutation.cosmicray | ALT | ADP | T2 | PY | PYS | P38 | P1 | ST | POL | O | P | Code |
| TM-000323 | BY | 1218–1220 | coverage.enforce+mutation.score | mutation.pit | ALT | ADP | T2 | JV | JVP | P38 | P1 | ST | POL | O | P | Code |
| TM-000324 | BY | 1218–1220 | quality.gate.eval | wtt.gates | DEF | NAT | T0 | TS | NIP | P38 | P1 | RO | POL | R | P | Verify |
| TM-000325 | BZ | 1221–1225 | deps.update | sca.renovate | ALT | ADP | T2 | TS | RHT | P38 | P1 | PW | PRO | R | P | CI |
| TM-000326 | BZ | 1221–1225 | vuln.scan | sca.osv | ALT | ADP | T2 | BIN | BIN | P38 | P1 | RO | POL | O | P | Security |
| TM-000327 | BS | 940–944 | backup.rotation | wtt.rotation | DEF | ADP | T2 | TS | NIP | P40 | P1 | PW | PRO | R | P | Settings |
| TM-000328 | BH | 934–935 | trend.analyze | wtt.trend | DEF | NAT | T0 | TS | NWT | P31 | P1 | RO | POL | R | P | History |
| TM-000329 | BH | 936–939 | history.query+compare | wtt.hist | DEF | NAT | T0 | TS | NWT | P36 | P1 | RO | POL | R | P | History |
| TM-000330 | BS | 940–944 | secret.scan(pre-commit) | secret.gitleaks | ALT | ADP | T2 | BIN | BIN | P38 | P1 | RO | POL | R | P | CI |
| TM-000331 | BZ | 1221–1225 | sbom.enforce | sbom.syft | ALT | ADP | T2 | TS | NIP | P38 | P1 | RO | POL | R | P | Security |

---

## 20. Protocol Matrix

WTT-TM-PRO-001: Protocol per runtime class (TOOLS §20). `DIRECT_LIBRARY` = in-process calls (natives, NIP/NWT) · `STDIO_JSONL` = Python/Node child services (PYS/PYV/NCP) · `GRPC` = Java workers (JVP/JVJ/JVS) · `CLI_PROCESS` = BIN adapters (stdin/args/JSON-stdout) · `CDP/WEBDRIVER_BIDI` = browser substrate (devtools.cdp/bidi) · `HTTP/REST` = RHT/remote services + cloud APIs · `WEBSOCKET` = RWS streams/UIs · `MCP` = MCP servers (enterprise/partner only) · `QUEUE` = BullMQ/Redis-Streams/NATS/Kafka/RabbitMQ transports · `BROWSER_PROTOCOL` = in-browser telemetry (BRR) · `DOCKER` = container-exec fallback (never mandatory).

| Runtime(s) | Protocol | Representative rows |
|---|---|---|
| NIP/NWT | DIRECT_LIBRARY (+QUEUE outbox) | All `wtt.*` natives; queue.bullmq/msg.redisstreams emit |
| NCP | STDIO_JSONL / CLI_PROCESS | browser.* · crawler.* · test.vitest/jest · quality.* · build.* |
| PYS/PYW/PYV | STDIO_JSONL (JSONL→FastAPI REC.) | test.pytest · sast.semgrep · data.* · ml.* · contract.schemathesis |
| JVP/JVJ/JVS | GRPC (REC.) | security.zap · test.junit/testng · mock.wiremock · iac-free java tools |
| BIN | CLI_PROCESS | net.* · dns.* · tls.* · load.k6 · secret.* · sbom.syft · term.* |
| BRR | CDP / WEBDRIVER_BIDI / BROWSER_PROTOCOL | devtools.cdp/bidi · performance.*(lab) |
| RHT/RGR/RWS | HTTP/REST / GRPC / WEBSOCKET | store.* · secrets.* · notify.* · mgmt.* · ci.* · obs.*(remote) |
| MCP | MCP | Partner/enterprise servers ONLY (TOOLS §42; no V1 rows) |
| DKR/K8S | DOCKER / K8S-JOB-API | orch.k8sjobs · chaos.mesh · performance.sitespeed(DKR alt) |
| CLD | CLOUD_API | visual.percy/applitools/chromatic · email.mailtrap · obs.sentry/datadog/newrelic |

## 21. Credential Matrix

WTT-TM-CRD-001: Credential classes (TOOLS §30 + RULES invariant 6: never plaintext in config/DB/logs/events/artifacts/reports). Resolution is ALWAYS at use-time via broker; manifests carry references only.

| Class | Mechanism | Rows using it |
|---|---|---|
| NONE | No credential | All RO natives · scanners (passive) · linters/builders/coverage/mutation |
| LEASED_TOKEN | Short-lived brokered token (auth injection) | browser.* (auth contexts) · api.* (auth flows) · wtt.authflows |
| SCOPED_SECRET_REF | `secrets.<store>:<path>` resolved @exec | db.* · msg.* · store.* · ci.* · mgmt.* · cloud/term ops |
| OAUTH_OIDC | OIDC/OAuth enterprise; local token V1 | ci.* · mgmt.* · store.* · obs.*(cloud) · wtt.admin |
| MTLS/CERT | Explicit cert handling + redaction | proxy.mitmproxy · tls.* · msg.*(tls) |
| LICENSE_KEY | BYO commercial license (USER_PROVIDED) | security.burp · sca.snyk · visual.*(hosted) · obs.*(saas) |
| K8S_RBAC/SA | ServiceAccount + RBAC, least-privilege | orch.k8sjobs · chaos.mesh · secrets.k8s |
| DEVICE/LOCAL | OS keychain evaluable; localhost dev-vault w/ warnings | secrets.envref · local stores |

## 22. Execution Location Matrix

WTT-TM-LOC-001: WHERE each row executes (TOOLS §21; ARCH worker contract). `TARGET_PROJECT` = inside the tested project's environment (project-native runners only) · `CLOUD_SERVICE` = vendor SaaS · all remote execution is allowlisted + policy-gated (TOOLS §43).

| Location | Rows |
|---|---|
| CONTROL_PLANE | wtt.orchestrator/planner/registry/toolhealth/finding/rca/gates/events/dashboard/cost/admin/select/generate/learn/readiness |
| LOCAL_WORKER | browser.* · crawler.* · net/dns/tls/diag · contract/schema validators · file/seo/i18n/feeds natives |
| BROWSER_WORKER | browser.playwright/selenium/wdio/cypress/puppeteer (+seams) · visual.capture · devtools.* |
| PYTHON_WORKER | test.pytest/hypothesis · sast.semgrep · data.* · visual.opencv · ml.* · contract.schemathesis |
| JAVA_WORKER | security.zap · test.junit/testng · mock.wiremock/mockserver · load.jmeter/gatling · contract.scc |
| REMOTE_WORKER | security.*(sandboxed) · load.*(isolated) · orch.k8sjobs · chaos.mesh · safety.harness |
| CONTAINER | performance.sitespeed(DKR alt) · java/binary fallback images (opt-in) |
| KUBERNETES | orch.k8sjobs · chaos.mesh · secrets.k8s consumers |
| CLOUD_SERVICE | visual.percy/applitools/chromatic · email.mailtrap · obs.sentry/datadog/newrelic · sca.snyk(saas-mode) |
| TARGET_PROJECT | test.vitest/jest/testinglibrary/cypressct/pytest/hypothesis/junit/testng (project-native) · build.* · quality.* · coverage.* · mutation.* · db.migrations |
| BROWSER_RUNTIME | devtools.telemetry consumers · performance lab-vitals |

---

## 23. Cost Matrix

WTT-TM-CST-001: Classes `FREE_LOCAL · OPEN_SOURCE(compute-only) · COMPUTE_COST · API_COST · LICENSED · COMMERCIAL_SAAS · ENTERPRISE_LICENSE · VARIABLE · UNKNOWN` (TOOLS §34). NO invented prices — classes only; metered/commercial rows carry `costMetadata` pointers, never numbers.

| Class | Rows |
|---|---|
| FREE_LOCAL | All `wtt.*` natives · net/dns/tls/diag BINs · contract schema validators · coverage collectors |
| OPEN_SOURCE | browser.playwright/selenium/wdio/puppeteer · crawler.* · test.* · quality.* · build.* · security.zap/nuclei/wapiti · sast.semgrep · sca.trivy/grype/osv · secret.* · sbom.syft · iac.* · k8s.* · load.k6/jmeter/gatling/locust/artillery/vegeta/wrk/hey/autocannon · mock.* · msg.* · queue.bullmq/nats/rabbitmq/kafka · workflow.temporal · data.* · email.mailpit/mailhog/smtp4dev/greenmail · store.minio/fs · chaos.mesh · ml.*(byo) · db.migrations · ci.lint-class natives |
| COMPUTE_COST | browser.cypress(testcafe/nightwatch/self-host) · performance.sitespeed · obs.prometheus/grafana/loki/tempo/jaeger/elastic(self-host) · orch.k8sjobs · db.*(infra) |
| LICENSED | security.burp · sca.snyk · desktop.winappdriver(os-license-adjacent) · proxy.charles/proxyman |
| COMMERCIAL_SAAS | visual.percy/applitools/chromatic · email.mailtrap · obs.sentry/datadog/newrelic · mgmt.testrail/zephyr/xray/azureboards(commercial tiers) |
| ENTERPRISE_LICENSE | secrets.vault/awssm/azurekv/gcp(enterprise tiers) · store.s3/gcs/azureblob(enterprise backends) · wtt.admin-gated connectors · grid-class (no row; §71) |
| VARIABLE | term.aws/az/gcloud (cloud-metered ops) · cloud validators · llm.harness (model-metered) · safety.harness |
| UNKNOWN | bi.clients · pay.sandbox (vendor TBD; class → UNKNOWN until selected) |

## 24. Resource Matrix

WTT-TM-RES-001: Classes `LIGHT · MEDIUM · HEAVY · VERY_HEAVY` (TOOLS §33). Only MEDIUM+ REQUIRE `resourceRequirements`; LIGHT rows declare `optional`. VERY_HEAVY rows are ALWAYS isolated + budget-capped + never share browser processes.

| Class | Rows |
|---|---|
| LIGHT | wtt.* natives (registry/events/finding/gates/dashboard) · net/dns/tls/diag · contract validators · lint/coverage-collect · term.*(read CLIs) |
| MEDIUM | browser.*(single ctx) · crawler.* · api harnesses · test.* runners · quality.* · build.* · email.* · db.*(query) · mock.* · notify/store/secrets adapters |
| HEAVY | browser.*(matrix) · visual.compare · performance.lighthouse/lhci/webpagetest · security.zap/nuclei/wapiti · sast.* · sca.* · data.* · obs.*(self-host) · mobile.*(emulator) · mutation.*(bounded) |
| VERY_HEAVY | load.*(all 9 — isolated workers) · chaos.mesh · safety.harness · llm.harness(eval-scale) · ml.*(train) · dr.backup-class(verify/restore) · mutation.pit/cosmicray(full) |

## 25. Worker Affinity Matrix

WTT-TM-WRK-001: Worker classes (TOOLS §110): `browser · discovery · api · visual · accessibility · performance · load · security · database · file · email · mobile · ai · analysis · reporting`. V1: local pool + Redis queue. Affinity is a scheduling HINT; isolation rows are MANDATORY placement.

| Worker class | Rows | Isolation |
|---|---|---|
| browser | browser.* · visual.playwright · devtools.* · wtt.functional/authflows/authzprobes/responsive/uiheuristics | Per-context; matrix→pool |
| discovery | crawler.* · parser.* · fingerprint.* | Frontier-budgeted |
| api | wtt.http/graphql · api.* · contract.* · mock.* · msg.* · tool-grpcurl | Per-target rate limits |
| visual | visual.pixelmatch/opencv/backstop · wtt.seo | CPU-burst tolerant |
| accessibility | accessibility.axe/pa11y · LH-a11y signal | Shares browser ctx |
| performance | performance.* · wtt.trends | Lab-isolated |
| load | load.* (all 9) · synth.k6 | MANDATORY isolated workers |
| security | security.* · sast.* · sca.* · secret.* · sbom.* · iac.* · k8s.* · secval/secprobes | MANDATORY sandboxed |
| database | db.* · db.migrations · data.* | Credentialed, scope-gated |
| file | wtt.fileval · coverage.* · mutation.* | Repo-bounded |
| email | email.* · wtt.connect | Test accounts only |
| mobile | mobile.* · desktop.* | Per-OS/emulator affinity |
| ai | wtt.orchestrator/planner/select/generate/learn/rca · llm.harness · ml.* · wtt.traj | GPU-aware where relevant |
| analysis | wtt.codectx/finding/flake/heal/verifier/remediation/readiness · qual gates | — |
| reporting | wtt.dashboard/gates/cost · obs.* · store.* · notify.* · mgmt.* | — |

---

## 26. Decision Register (Tool Selection)

WTT-TM-DEC-000: Decision statuses are INDEPENDENT of implementation status (§18): `APPROVED + PLANNED` is the normal V1-core combination. Inherited TOOLS decisions (`TOL-OD-*`, TOOLS §133) are not re-decided here; new MATRIX-level selections are `TM-DEC-*`.

| ID | Selection | Status | Disposition |
|---|---|---|---|
| TOL-OD-001 | Standalone catalog row verification (PHZ-OD-010) | INHERITED | §45 ranges authoritative; row-level pending |
| TOL-OD-003 | MCP server scope (enterprise/partner) | INHERITED | No V1 MCP rows; §48 enterprise-only |
| TOL-OD-004 | Backend framework (Fastify-class TBD) | INHERITED | Runtime REC, not matrix-blocking |
| TOL-OD-005 | Primary-crawler combination | INHERITED | No DEF crawler; all discovery rows ALT (§44) |
| TOL-OD-006 | Unsourced-vendor omnibus | INHERITED | Zero OD-006 rows in master (§71 confirms absence) |
| TOL-OD-007 | Primary visual-diff stack | INHERITED | pixelmatch REC default comparator; runners ALT |
| TOL-OD-012 | Java worker framework | INHERITED | gRPC REC; framework TBD; Java rows CONDITIONAL |
| TM-DEC-001 | License-scanner selection (P38 license-deny) | DECISION_REQUIRED | No sourced vendor; capability strategy in §71 |
| TM-DEC-002 | LLM-eval harness selection (P41) | DECISION_REQUIRED | `llm.harness` class row; vendor TBD |
| TM-DEC-003 | Safety-redteam harness (P42) | DECISION_REQUIRED | `safety.harness` XPT/T5; vendor + policy TBD |
| TM-DEC-004 | Payment-sandbox provider (P29) | DECISION_REQUIRED | `pay.sandbox` class row; provider TBD |
| TM-DEC-005 | BI-client connectors (P28) | DECISION_REQUIRED | `bi.clients` class row; vendors TBD |
| TM-DEC-006 | §14 amendment proposals (AI/WAVE/Vitals/Chrome-perf/Compose/Black/Dredd/grid) | PROPOSED | §71 register; no rows until minted |
| TM-DEC-007 | Remote-grid execution providers | DEFERRED | ENTERPRISE; no master rows (§71) |
| TM-DEC-008 | Cloud-cost meter dimensions (CZ) | PROPOSED | Classes only (§23); dimensions at P36 |

## 27. Approval Matrix

WTT-TM-APR-001: Approval required by risk class (TOOLS §§18–19; PRD AUTHZ-010/011/012/013). Approvals are per-scope, expiring, audited; `wtt.authz` enforces, `wtt.cli` gates terminal.

| Risk | Local | Dev/QA | Staging | Production | Approver |
|---|---|---|---|---|---|
| READ_ONLY | AUTO | AUTO | AUTO | POLICY(auto w/ scope) | — |
| SAFE_TEST | AUTO | AUTO | POLICY | POLICY | Operator (prod-scope) |
| PROJECT_WRITE | POLICY | POLICY | APPROVAL | APPROVAL+PROD-BLOCK-default | Operator/Admin |
| ACTIVE_NETWORK | POLICY | POLICY | APPROVAL | EXPLICIT (default deny) | Operator + scope owner |
| SECURITY_ACTIVE | APPROVAL | APPROVAL | APPROVAL | DENY (explicit override only) | Admin + security owner |
| LOAD_ACTIVE | APPROVAL+isolated | APPROVAL+isolated | APPROVAL+isolated | DENY (explicit override only) | Admin + target owner |
| SYSTEM_CHANGE | APPROVAL | APPROVAL | APPROVAL | EXPLICIT (default deny) | Admin |
| DESTRUCTIVE | APPROVAL+drill-first | APPROVAL+drill-first | DENY-default | DENY (break-glass only) | Admin + incident owner |
| BLOCKED | DENY | DENY | DENY | DENY | — |

## 28. Authorization Matrix

WTT-TM-ATH-001: WHO authenticates/authorizes and HOW (mechanisms). Tool GRANTS (what each tool receives) are §39. V1: local-token auth + RBAC; OIDC/OAuth enterprise (INT-002-adjacent).

| Mechanism | Applies to | Notes |
|---|---|---|
| Local token + RBAC | All V1 control-plane ops · `wtt.*` natives | Default; per-role capability grants |
| Leased short-lived tokens | browser auth contexts · api.* auth flows · db/msg connections | Brokered; auto-expiry; redacted |
| Scoped secret refs | db.* · msg.* · store.* · ci.* · mgmt.* · cloud/term ops | Resolved @exec; never persisted |
| OIDC/OAuth (enterprise) | ci.* · mgmt.* · store.*(cloud) · obs.*(saas) · wtt.admin | Enterprise tier |
| Approval chains (§27) | PW/AN/SA/LA/SC/DE rows | Expiring; audited; break-glass logged |
| mTLS / explicit certs | proxy.mitmproxy · tls.* · msg.*(tls) | Cert pinning where configured |

## 29. Installation Matrix

WTT-TM-INS-001: Install mode per group (TOOLS §22). No silent system installation; Docker never mandatory for simple local runs.

| Mode | Rows |
|---|---|
| BUILT_IN | All `wtt.*` natives · contract schema validators (ajv/zod/pydantic/joi as libs) |
| MANAGED_INSTALL | browser.playwright(+browsers) · accessibility.axe · performance.lhci · visual.pixelmatch · email.mailpit · msg.redisstreams infra |
| PROJECT_DEPENDENCY | test.* · quality.* · build.* · coverage.* · mutation.* · db.migrations (detected, never force-installed) |
| SYSTEM_DEPENDENCY | vcs.git · net.* · dns.dig/nslookup · tls.openssl · term.* CLIs (detected, not installed) |
| USER_PROVIDED | security.burp · sca.snyk · proxy.charles/proxyman · ml.*(byo) · desktop.*(os-tooling) · coverage/mutation project kits |
| DOCKER_MANAGED | performance.sitespeed(alt) · java/binary fallback images · chaos.mesh(agent) — opt-in only |
| REMOTE_SERVICE | store.*(blob) · secrets.* · ci.* · mgmt.* · notify.* · dns.dnsviz · performance.webpagetest |
| CLOUD_SERVICE | visual.percy/applitools/chromatic · email.mailtrap · obs.sentry/datadog/newrelic |
| ENTERPRISE_MANAGED | secrets.vault/awssm/azurekv/gcp · store.*(enterprise backends) · wtt.admin connectors |

## 30. Environment Policy Matrix

WTT-TM-ENP-001: Full 5-environment policy by risk class (TOOLS §17/§19). `UNKNOWN_REMOTE` = DENY always. Active/write rows carry this policy in manifests; `wtt.authz` enforces at dispatch.

| Risk | LOCAL | DEVELOPMENT | QA | STAGING | PRODUCTION |
|---|---|---|---|---|---|
| READ_ONLY | AUTO | AUTO | AUTO | AUTO | POLICY |
| SAFE_TEST | AUTO | AUTO | AUTO | POLICY | POLICY |
| PROJECT_WRITE | POLICY | POLICY | APPROVAL | APPROVAL | BLOCKED* |
| ACTIVE_NETWORK | POLICY | POLICY | APPROVAL | APPROVAL | BLOCKED* |
| SECURITY_ACTIVE | APPROVAL | APPROVAL | APPROVAL | APPROVAL | BLOCKED |
| LOAD_ACTIVE | APPROVAL | APPROVAL | APPROVAL | APPROVAL | BLOCKED |
| SYSTEM_CHANGE | APPROVAL | APPROVAL | APPROVAL | APPROVAL | BLOCKED* |
| DESTRUCTIVE | APPROVAL | APPROVAL | BLOCKED | BLOCKED | BLOCKED |
| BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED |

`*` = explicit break-glass override possible (audited, expiring, dual-control RECOMMENDED).

## 31. OS Matrix

WTT-TM-OSM-001: OS support with evidence grades (TOOLS §128; never assume Bash/Linux). Grades: `DECLARED` = vendor/docs claim, unverified · `UNKNOWN` = no evidence. Repository inspected 2026-09-07 contains NO OS-verification evidence: NOTHING here is `VERIFIED`.

| Group | Linux | macOS | Windows | Grade |
|---|---|---|---|---|
| `wtt.*` natives (node) | ✓ | ✓ | ✓ | DECLARED (node portable; unverified) |
| browser.* (chromium/ff/webkit) | ✓ | ✓ | ✓ | DECLARED |
| crawler/parser/fingerprint | ✓ | ✓ | ✓ | DECLARED |
| net/dns/tls BINs | ✓ | ~ (bsd-userland diffs) | ~ (git-bash/wsl-adjacent) | DECLARED w/ caveats |
| security/sast/sca/secret/sbom/iac/k8s | ✓ | ✓ | ~ (per-vendor) | DECLARED |
| load.* | ✓ | ✓ | ~ (jmeter/gatling java ok) | DECLARED |
| test/build/quality/coverage/mutation | ✓ | ✓ | ✓ | DECLARED (project-native) |
| mobile.xcuitest | ✗ | ✓ ONLY | ✗ | DECLARED (platform-bound) |
| desktop.winappdriver | ✗ | ✗ | ✓ ONLY | DECLARED (platform-bound) |
| mobile.espresso/uiautomator | ✓ | ✓ | ~ | DECLARED |
| term.* CLIs | ✓ | ✓ | ~ (per-CLI) | DECLARED |
| docker/k8s/chaos | ✓ (primary) | ~ (desktop) | ~ (desktop) | DECLARED |

## 32. Output Matrix

WTT-TM-OUT-001: Normalized output per group (TOOLS §35; gateway-validated, fail-fast). EVERY adapter emits the canonical envelope + its typed payload; raw vendor output is preserved as attached evidence, never as the primary contract.

| Group | Canonical output | Formats |
|---|---|---|
| test.*/functional/e2e | Verdict (pass/fail/skip + rationale) | JSON · JUnit XML · HTML |
| security/sast/sca/secret | Canonical finding (5-level severity) | JSON · SARIF · HTML |
| visual | Diff bundle (baseline/actual/diff/mask/score) | PNG · JSON · HTML |
| performance | Timeseries + budget verdicts | JSON · CSV · HTML |
| load | Aggregate stats + threshold verdicts | JSON · CSV · HTML |
| contract/mock/api | Request/response pairs + conformance verdicts | JSON · HAR · JUnit |
| db/data/bi/file | Row/diff/profile payloads | JSON · CSV · XLSX |
| sbom/provenance | SBOM + attestation chain | CycloneDX · SPDX · JSON |
| events/obs | OTel spans/metrics/logs + `wtt.*` events | OTLP · JSONL |
| reports/gates | Gate verdicts + report bundles | HTML · PDF · JSON · CSV · XLSX · MD · SARIF · JUnit |

## 33. Evidence Matrix

WTT-TM-EVD-001: Evidence types captured per group (TOOLS §36; hash-chained, correlated, redacted). Undeclared side effects prohibited; every artifact links to its producing execution + provenance.

| Group | Evidence types |
|---|---|
| browser/functional | Screenshots · video · HAR · console · traces · DOM/AX snapshots · step logs |
| api/contract/mock/msg | Request/response pairs · schemas · diffs · replay bundles |
| visual | Baseline/actual/diff/mask · scores · viewport matrix |
| a11y | Node clips · AX paths · rule IDs · WCAG refs |
| performance/load | Traces · timeseries · request waterfalls · resource stats |
| security/sast/sca/secret | Payloads (redacted) · file/line/package/image/layer refs · SARIF |
| db/data | Query plans · row diffs · profiles · lineage edges |
| build/quality/coverage | Logs · reports · diffs · attestations · provenance chain |
| remediation | Before/after hashes · unified diffs · approvals · verification records |
| sessions | Checkpoints · event log · cost ledger · audit trail |

## 34. Artifact Matrix

WTT-TM-ART-001: Artifact classes, default store, retention posture (TOOLS §§36/111). V1 = `store.fs` (local FS) everywhere; blob backends are POST_V1/ENTERPRISE ports — artifacts MUST be backend-agnostic by schema.

| Class | Default store | Retention posture |
|---|---|---|
| Reports (HTML/PDF/JSON/CSV/XLSX/MD) | store.fs → store.*(P1/ENT) | Per-policy; gates-pinned retained |
| Traces/video/HAR | store.fs | Budget-capped; failing-run priority |
| Screenshots/diffs | store.fs | Baseline-pinned; rolling window |
| SBOMs/attestations | store.fs | Release-pinned (long) |
| DB snapshots/drill backups | store.fs → blob(P1) | Drill-scoped; prod NEVER |
| Logs/event archives | store.fs → obs backends(P1) | TTL + redaction verified |

## 35. Finding Matrix

WTT-TM-FND-001: Finding classes → severity + owner (TOOLS §35; 5-level severity PROPOSED; collapse to canonical finding FND-002). Deduplication by `wtt.finding`; correlation by `wtt.rca`.

| Finding class | Severity basis | Producer groups |
|---|---|---|
| Vulnerability (dast/sast/sca/secret/iac/k8s) | Scanner severity → normalized 5-level | security/sast/sca/secret/iac/k8s/secval |
| Functional failure | Fail + oracle mismatch | functional/e2e/unit/api/contract |
| A11y violation | Rule impact → WCAG-mapped | accessibility.* |
| Perf/load breach | Budget/threshold breach | performance/load/synthetic |
| Visual regression | Diff score + semantic class | visual.* |
| Data/db anomaly | Profile/diff/integrity rule | db/data/bi/file/email |
| Flaky/healed | Flakiness score; healed-locator label | wtt.flake/heal |
| Supply-chain/license | Vuln/license-deny policy | sca/sbom/license/ci-lint |

## 36. Runtime Matrix

WTT-TM-RTM-001: Language × runtime recommendation (TOOLS §§10–11; no dogma; no triple duplication). Every Java row is CONDITIONAL on `TOL-OD-012` (framework) — gRPC is the RECOMMENDED protocol.

| Language | Runtime(s) | Protocol | Applies to |
|---|---|---|---|
| TypeScript | NODE_IN_PROCESS/WORKER/CHILD | DIRECT_LIBRARY / STDIO_JSONL | Natives · browser/crawler/api/visual/a11y adapters · queue/ci/store/notify/mgmt |
| Python | SUBPROCESS/WORKER/SERVICE | STDIO_JSONL (FastAPI REC.) | pytest/hypothesis · semgrep · data/ml · opencv · schemathesis · quality/lint-py |
| Java | PROCESS/WORKER/SERVICE (opt-in) | GRPC (REC.) | junit/testng · zap · wiremock · jmeter/gatling · scc · checkstyle/pmd |
| Binary | NATIVE_BINARY | CLI_PROCESS | net/dns/tls · k6 · secret/sbom · iac/k8s · term.* · load BINs |
| N/A | REMOTE_HTTP/CLOUD/BROWSER | REST/WS/CLOUD_API/CDP | saas/remote/browser-resident rows |

## 37. Language Matrix

WTT-TM-LGM-001: Language posture per group + decision (TOOLS §10; LANG-001/002/005). Best-fit TS/Python/Java; single-implementation default; no triple duplication (invariants 11–12).

| Group | Language | Decision |
|---|---|---|
| Control plane · orchestration · registry · events · dashboard · gates | TypeScript | APPROVED (core) |
| Browser/crawler/api/visual/a11y/perf adapters | TypeScript | RECOMMENDED |
| AI/data/CV/eval/property/python-tests | Python | RECOMMENDED (LANG-003 ecosystem) |
| Java-ecosystem (junit/testng/zap/wiremock/jmeter) | Java | CONDITIONAL (stack-justified; TOL-OD-012) |
| System diagnostics/binaries | Binary (N/A) | RECOMMENDED (no rewrite) |
| Remote/SaaS | N/A | NOT_APPLICABLE |

## 38. Security Matrix

WTT-TM-SEC-001: Risk class × mandatory safeguards (TOOLS §§18–19/39; ARCH §53). Safeguards are manifest-enforced + runtime-verified; §142 invariants 3–5 restated as matrix constraints.

| Risk | Sandbox | Redaction | Scope | Approval | Audit | Extra |
|---|---|---|---|---|---|---|
| READ_ONLY | process | standard | target | auto/policy | standard | — |
| SAFE_TEST | process | standard | target | auto/policy | standard | fixture-bounded |
| PROJECT_WRITE | process+fs-jail | standard | project | operator+ | full diff | reversible (PRN-008) |
| ACTIVE_NETWORK | net-policy | heightened | target+declared | operator+ | full | rate-limited |
| SECURITY_ACTIVE | strict sandbox | heightened | authorized-only | admin | deep | prompt-kill; safe-profiles-first |
| LOAD_ACTIVE | isolated workers | standard | authorized-only | admin | deep | never-share-browser; budgets |
| SYSTEM_CHANGE | elevated-jail | standard | declared | admin | deep | plan/apply split (iac/ops) |
| DESTRUCTIVE | drill-first | heightened | explicit-only | dual/admin | deep+immutable | backup-verified; break-glass |
| BLOCKED | — | — | — | DENY | deny-logged | — |

## 39. Permission Matrix

WTT-TM-PRM-001: Tool GRANTS per group (TOOLS §17; least privilege; multi-apply filesystem). Auth MECHANISMS are §28; this is WHAT each tool receives.

| Group | Network | Filesystem | Process | Database | Secrets |
|---|---|---|---|---|---|
| wtt.* natives (RO) | NONE/TARGET_ONLY | PROJECT_READ+ARTIFACT_WRITE | NONE/SPAWN_APPROVED | NONE | NONE |
| browser/crawler | TARGET_ONLY | ARTIFACT_WRITE+TEMP_WRITE | SPAWN_APPROVED | NONE | LEASED (auth ctx) |
| api/contract/mock/msg | TARGET_ONLY (+DECLARED_DEPS) | ARTIFACT_WRITE+TEMP | SPAWN_TOOL_ONLY | NONE | SCOPED_REF |
| security/sast/sca/secret | TARGET_ONLY/APPROVED_EXTERNAL | PROJECT_READ+ARTIFACT_WRITE | SPAWN_TOOL_ONLY | NONE | NONE |
| load | TARGET_ONLY (approved) | ARTIFACT_WRITE | SPAWN_TOOL_ONLY | NONE | NONE |
| db/data | TARGET_ONLY | ARTIFACT_WRITE | SPAWN_TOOL_ONLY | WRITE_TEST_DATA (prod: READ) | SCOPED_REF |
| build/quality/coverage/mutation | NONE (deps: APPROVED_EXTERNAL) | PROJECT_WRITE (gated) | SPAWN_APPROVED | NONE | NONE |
| term.* (per-command) | per-class | per-class | per-class (TSEC-001) | per-class | SCOPED_REF |
| store/secrets/ci/mgmt/notify | APPROVED_EXTERNAL | ARTIFACT_WRITE | NONE | NONE | SCOPED_REF/BROKER |
| chaos/DR | TARGET_ONLY | ARTIFACT_WRITE | SYSTEM_COMMAND (gated) | ADMIN (drill-only) | SCOPED_REF |
| remediation | NONE | PROJECT_WRITE (approval) | SPAWN_APPROVED | NONE | NONE |

## 40. Release Matrix

WTT-TM-RLM-001: Release buckets by FIRST-listed release token (331 rows; `/P1`-shared rows counted once in their earliest bucket). Combos (`V1O/P1` etc.) mean: earlier slice in earlier release, full breadth later.

| Release | Rows | Content |
|---|---|---|
| V1_CORE | 89 | Natives (target/authz/session/orchestrator/planner/registry/graph/evidence/events/dashboard/cli/cost) · Playwright · CDP/BiDi · Cheerio/BS4 · WTT fingerprint · native functional · Vitest/Jest/pyunit-support · auth-flow/authz-probe natives · native HTTP · curl/HTTPie · OpenAPI-diff/Schemathesis/schema-validators/Prism · property-native · WireMock/MockServer/MSW · PW-shots/pixelmatch · UI-heuristic/responsive natives · axe · Lighthouse/vitals-lab · net/dns/tls diagnostics · contract-adjacent · Mailpit · OTel · BullMQ · Redis-Streams · terminal CLIs · fs store · envref |
| V1_OPTIONAL | 34 | Extra crawlers (Crawlee/Katana) · WhatWeb · Cypress · native-telemetry · Karate/Hurl · GraphQL/gRPC depth · Pact/SCC · OpenCV · Pa11y/LH-a11y · LHCI · net adv (netcat/iperf) · mitmproxy · DNSViz/SSLyze/testssl · Nuclei/ZAP-passive · SAST/SCA/secret subsets (Semgrep/Trivy/Gitleaks-slices) · file-validator depth · MailHog/smtp4dev/GreenMail · Jira/TestRail-minimal |
| V1_SELECTED | 9 | finding/RCA/verifier (P30) · codectx-display? (P31: no—POST_V1; selected = finding/RCA/verifier/gates-display) · secval natives · secprobes-slice · seo-basics · i18n · LH-seo |
| V1_CONDITIONAL | 4 | remediation-slice · heal+flake · local-pool-scheduler-slice (ratify at freeze, DES-OD-001) |
| POST_V1 | 190 | Load/sec breadth · messaging · SAST/SCA/full · mobile/desktop · P38 build/quality/coverage/mutation/deps · P39 CI · P40 integrations · P28 data depth · P29 packs · P31–P37 intelligence · P41–P46 AI/synthetic · chaos/DR · builders/linters full |
| ENTERPRISE | 5 | Vault/AWSSM/AzureKV/GSM (T4) · wtt.admin (P47) |
| EXPERIMENTAL | 0 +2 shared | safety.harness + chaos.mesh (P1/EXP) |

## 41. AI-Selection Matrix

WTT-TM-AIM-001: Deterministic resolver inputs per capability family (TOOLS §27; ARCH-270). AI operates on CAPABILITIES, never vendor names (TOOLS §7): plans cite `accessibility.scan`, the resolver chooses axe-core/Pa11y. No popularity bias: fit signals only.

| Capability family | Resolver inputs | Candidates (fit-order, not preference) |
|---|---|---|
| browser.* | target stack · protocol need (cdp/bidi) · matrix axes | playwright → selenium/wdio/puppeteer (need-based) |
| discovery.crawl | js-rendering? · scale · auth? | playwright/crawlee (js) · katana/scrapy (fetch/scale) |
| accessibility.scan | depth · browser ctx | axe → pa11y (fallback) → lh-signal |
| performance.audit | smoke vs depth · lab vs field | lighthouse → lhci → webpagetest/sitespeed |
| load.execute | protocol · scale · isolation | k6 → jmeter/gatling/locust per protocol/scale |
| security.dast.scan | scope · auth · intrusiveness | zap → nuclei/wapiti per profile; burp only if provided |
| sast/sca/secret/sbom/iac | ecosystem · ci-vs-local | semgrep/trivy/gitleaks/syft/checkov → ecosystem alts |
| test.* | project stack (detected) | project-native (vitest/jest/pytest/junit) — never forced |
| api.* | spec presence · protocol | native http → harnesses (newman/bruno/karate/hurl) per spec |
| visual.compare | hosted? · semantic? | pixelmatch → opencv → hosted (if configured) |
| db.* | configured engine | engine-matched driver only |
| queue/stream | scale trigger | bullmq/redis-streams → nats/kafka/rabbitmq/temporal (triggered) |

## 42. Pack Matrix

WTT-TM-PKM-001: Tool packs = CONVENIENCE groupings; the capability registry REMAINS authoritative; one tool MAY serve multiple packs (TOOLS §121). Pack names CONCEPTUAL.

| Pack | Members |
|---|---|
| wtt-core | CLI · target/authz/session · registry/toolhealth · events · evidence · graph · dashboard · gates · store.fs · cost |
| wtt-browser | browser.playwright(+alts) · devtools.* · visual.capture · wtt.functional · responsive/uiheuristics |
| wtt-api | wtt.http/graphql · api.* · contract.* · mock.* · msg.* · grpcurl · webhook/datamgr natives |
| wtt-quality | test.* · quality.* · build.* · coverage.* · mutation.* · vcs/ci-lint · flake/heal/verifier |
| wtt-security | security.* · sast/sca/secret/sbom/iac/k8s · tls/dns/net · secval/secprobes · zap/burp-proxied |
| wtt-load | load.*(9) · synth.* · chaos.mesh(class) · k8s-jobs |
| wtt-data | db.* · data.* · bi.clients · email.* · fileval · connect · migrations |
| wtt-ai-testing | llm.harness · safety.harness · ml.* · traj · select/generate/learn · browser-vision(opencv) |
| wtt-enterprise | secrets.*(T4) · store.*(blob) · mgmt.* · ci.* · obs.*(saas) · grids(§71) · wtt.admin · MCP(§48) |

---

## 43. Role Matrix

WTT-TM-RLM-002: Selection priority per capability: `PRIMARY · SECONDARY · FALLBACK · OPTIONAL · MANUAL_ONLY` (TOOLS §27; distinct from implementation Role §9). EXACTLY one PRIMARY per (capability, profile); FALLBACK is auto-tried; MANUAL_ONLY never auto-selected.

| Capability | PRIMARY | SECONDARY | FALLBACK | OPTIONAL/MANUAL |
|---|---|---|---|---|
| browser.* | browser.playwright | selenium/wdio/puppeteer | selenium | seams (MANUAL) |
| accessibility.scan | accessibility.axe | — | accessibility.pa11y | lh-signal |
| performance.audit | performance.lighthouse | lhci | webpagetest | sitespeed |
| load.execute | load.k6 | jmeter/gatling/locust | locust (light) | — |
| security.dast.scan | security.zap | nuclei/wapiti | nuclei | burp (MANUAL/provided) |
| sast/sca/secret/sbom/iac | semgrep/trivy/gitleaks/syft/checkov | ecosystem alts | grype/trufflehog | snyk/burp (provided) |
| discovery.crawl | NONE (TOL-OD-005) | fit-chosen | fit-chosen | — |
| visual.compare | visual.pixelmatch | opencv | backstop | hosted (configured) |
| api.rest.request | wtt.http | curl/httpie | httpie | harnesses per spec |
| contract.schema.validate | ecosystem-fit (ajv/zod/pydantic/joi) | — | — | — |
| mock.serve | stack-fit (wiremock/mockserver/msw/…) | — | prism | — |
| test.* | project-native (detected) | — | — | — |
| email.capture | email.mailpit | mailhog | smtp4dev | mailtrap (configured) |
| queue/stream | queue.bullmq/msg.redisstreams | — | in-process (ARCH degraded) | nats/kafka/rabbitmq/temporal (triggered) |
| artifact.store | store.fs | — | — | store.* blob (P1/ENT) |
| secrets.resolve | envref (local) | — | — | vault/awssm/azurekv/gcp/k8s/docker |

## 44. Fallback Matrix

WTT-TM-FBM-001: Ordered fallback chains with TRIGGER conditions (TOOLS §29; selection+fallback). Fallback NEVER silently changes risk class or scope: a fallback requiring higher grants re-enters approval (§27).

| PRIMARY fails… | …then | Trigger |
|---|---|---|
| accessibility.axe | → pa11y → LH-signal | engine missing/crash; profile-gated |
| browser.playwright | → selenium/wdio → puppeteer | launch fail; protocol need; grid-only target |
| performance.lighthouse | → lhci → webpagetest → sitespeed | smoke fail; depth need; lab unavailable |
| load.k6 | → locust → jmeter/gatling | protocol/scale fit; binary missing |
| security.zap | → nuclei → wapiti | java missing; scope narrower; speed |
| sast.semgrep | → codeql/bandit/spotbugs (ecosystem) | language fit |
| sca.trivy | → grype → osv | db unavailable; ecosystem |
| secret.gitleaks | → trufflehog | history-depth need |
| net.curl | → httpie | binary missing |
| queue.bullmq/redis | → in-process fallback queue | ARCH outage-degraded + backpressure |
| store.* blob | → store.fs | creds/network fail |
| visual hosted | → pixelmatch | unconfigured/offline |
| email.mailtrap | → mailpit | unconfigured |
| ci.* annotate | → local report only | token missing |
| zap-passive profile | → nuclei-passive | engine missing (V1O slice) |

## 45. Dependency Matrix

WTT-TM-DPM-001: Tool dependencies (TOOLS §26; detectable graph, NO loops). `needs` = hard; `uses` = soft/optional. Health (§24) validates hard deps before run.

| Tool / group | Needs | Uses |
|---|---|---|
| browser.* | node runtime · browser binaries | grid creds (remote) · proxy certs |
| security.zap · load.jmeter/gatling · test.junit/testng · mock.wiremock/mockserver · quality-java | java runtime | — |
| test.pytest/hypothesis · sast.semgrep · data.* · ml.* · schemathesis · quality-py | python runtime | project venv |
| crawler.* / api.* / quality-ts / build-ts | node runtime | target stack |
| load.k6 · secret.* · sbom.syft · iac/k8s BINs · net/dns/tls | OS binaries | — |
| queue.bullmq · msg.redisstreams | redis | — |
| wtt.dashboard/events | control-plane + redis-streams | obs exporters |
| store.* / secrets.* / ci.* / mgmt.* / notify.* | credentials/refs | network egress |
| orch.k8sjobs · chaos.mesh | cluster access + RBAC | observability |
| desktop.winappdriver / mobile.xcuitest | windows / macOS host | device/emulator |
| mcp servers | enterprise approval + attestation | — |

## 46. Conflict Matrix

WTT-TM-CFM-001: Runtime conflicts (port/process/license) with RESOLUTION. Spec-level result: **NO `MATRIX_CONFLICT`** — every conflict below is runtime-resolvable by construction (dynamic allocation, profiles, explicit selection). Any unresolvable spec contradiction would register in §76 instead (empty).

| Conflict | Parties | Resolution |
|---|---|---|
| SMTP/API ports | mailpit/mailhog/smtp4dev/greenmail | Dynamic ports; exactly one capture backend per scope |
| Mock-server ports | wiremock/mockserver/msw/prism/mountebank/hoverfly/mockoon | Per-test allocation; registry-tracked |
| DB ports | postgres/mysql/mongo/redis (local) | Project-compose or dynamic; never collide with WTT infra redis |
| Browser user-data locks | parallel browser.* | Per-context dirs; pool-managed |
| Load-generator saturation | load.* vs browser workers | MANDATORY isolation (never share procs) |
| Scanner cross-talk | zap/nuclei/wapiti concurrent | Scope-partitioned; never unleash-all (ARCH-460) |
| Commercial license seats | burp/snyk/hosted-visual/saas-obs | Checkout-counted; queue when exhausted |
| FS store vs blob | store.fs vs store.* | One active backend per scope; async mirror allowed |
| K8s job quotas | orch.k8sjobs/chaos | Quota-checked; namespace-isolated |
| Terminal allowlist collision | term.* vs TSEC-001 | Deny-wins; policy check precedes exec |

## 47. Data-Externalization Matrix

WTT-TM-DXM-001: WHAT leaves the trust boundary, WHERE to, under WHICH gate (TOOLS §39/privacy; local-first defaults). Default posture: REDACT + SCOPE + POLICY-GATE; NOTHING externalizes silently.

| Row group | Externalizes | To | Gate |
|---|---|---|---|
| visual hosted (percy/applitools/chromatic) | Screenshots/DOM | Vendor SaaS | Explicit config + redaction |
| obs saas (sentry/datadog/newrelic) | Telemetry/traces | Vendor SaaS | Opt-in exporter + redaction |
| performance.webpagetest · dns.dnsviz | URLs/configs | Public service | Per-run consent; no secrets |
| email.mailtrap | Test emails | Vendor SaaS | Test accounts only |
| store.* blob · secrets.* | Artifacts/refs | Cloud | Scoped creds; encrypted |
| ci.* · mgmt.* · notify.* | Status/metadata/links | Provider | Scoped tokens; redacted payloads |
| sca.snyk (saas-mode) | Manifests/deps | Vendor SaaS | Opt-in; local-first alt (trivy) |
| llm.harness · vision models | Prompts/evals/screenshots | Model provider | Gateway policy; local-pref (§154) |
| grids (§71; no rows) | Sessions/traces | Device/grid cloud | ENTERPRISE policy |

## 48. AI-Provider Matrix

WTT-TM-AIP-001: Model-provider classes + routing posture (TOOLS §34/CZ; ARCH gateway). Plans/agents NEVER hard-code vendors; the gateway resolves by capability + cost + privacy + policy.

| Class | Use | Routing note |
|---|---|---|
| Local/free models | Draft plans · classification · embeddings | Prefer when sufficient (privacy + cost) |
| Hosted API models | Deep reasoning · vision · eval-judge | Budget-capped; redacted; logged |
| Enterprise gateways | Regulated/retained workloads | ENTERPRISE; audit-complete |
| BYO eval stacks (ml.*) | CK eval-only workloads | Project-provided; read/eval-only |
| Eval harnesses (`llm.harness`) | P41 behavior/groundedness/promptsec | Vendor TBD (TM-DEC-002) |

## 49. Native Matrix

WTT-TM-NTM-001: Native (`wtt.*`) systems × capabilities × phase (58 systems; all T0/NAT/PLANNED). Natives own: orchestration, registry, events, evidence, findings, gates, domain packs without sourced engines.

| Native system | Capabilities | Phase |
|---|---|---|
| wtt.cli/target/authz/session | terminal.exec+policy · target.* · authorization.* · session.* | P01–P04 |
| wtt.orchestrator/planner/cost | ai.plan/route/budget · plan.jobs/dryrun · cost.* | P13 (+P36) |
| wtt.registry/toolhealth | tool.register/resolve/invoke/bind · health/grants/audit | P08 |
| wtt.events/dashboard | events.publish/stream/replay · dashboard.render/stream | P04/P05 |
| wtt.graph/evidence/finding/rca | graph.* · evidence.* · finding.normalize · ai.rootcause | P07/P10/P30 |
| wtt.codectx/covagg/trend/trends/hist | code.* · coverage.agg · trend.* · history.* | P31/P36 |
| wtt.remediation/verifier/learn | fix.patch.* · verification.execute · learning.* | P30/P32 |
| wtt.gates/cilint/buildcache | cicd/quality-gate.eval · pipeline.lint · build.cache | P38/P39 |
| wtt.scheduler/admin/store/rotation | schedule/pool/queue · admin.* · artifact.store · backup.rotation | P35/P40/P47 |
| wtt.select/generate/heal/flake/readiness/blast | ai.select/generate · selfheal/flake · readiness · blast-validate | P14/P33/P37/P48 |
| wtt.functional/property/authflows/authzprobes | functional/e2e · property.check · auth(n/z) flows/probes | P11/P12/P16 |
| wtt.http/graphql/webhook/datamgr/connect/fileval | http/graphql · webhook · data-mgr · connectors · file validators | P17/P18/P28 |
| wtt.loc/cms/seo/i18n/feeds/ecom/privacy | localization · cms · seo · i18n · feeds · ecommerce · privacy | P28/P29 |
| wtt.responsive/uiheuristics/traj | responsive.matrix · ui.heuristics · agent.trace | P20/P42 |
| wtt.secval/secprobes/cloudval | passive validators · custom probes · cloud validators | P24–P26 |

---

## 50. Browser Matrix

WTT-TM-DOM-001: Domains I–J (123–201) + browser-adjacent execution. DEFAULT engine: `browser.playwright` (APPROVED, BRW-001/ARCH-160/ADR-005); DEFAULT substrate: CDP/BiDi native bindings.

| Tool | Role | Tier | Lang | Phase | Release | Risk |
|---|---|---|---|---|---|---|
| browser.playwright | DEF | T1 | TS | P06 | V1C | ST |
| browser.selenium/webdriverio/puppeteer | ALT | T2 | TS/JV | P06 | P1 | ST |
| browser.cypress | ALT | T2 | TS | P11 | V1O/P1 | ST |
| browser.nightwatch/testcafe/selenide | OPT | T2/T3 | TS/JV | P06 | P1 | ST |
| devtools.cdp/bidi | DEF | T0 | TS | P07 | V1C | RO |
| grids (commercial-class) | — | T3 | N/A | P06 | P1/ENT | ST |

## 51. Discovery Matrix

WTT-TM-DOM-002: Domains E–G (50–106). NO approved default crawler (`TOL-OD-005`): ALL engine rows ALT/OPT, resolver fit-chooses per §41. MUST deduplicate into one map (DSC-003).

| Tool | Role | Tier | Lang | Phase | Release | Risk |
|---|---|---|---|---|---|---|
| crawler.playwright/crawlee/katana/scrapy | ALT | T1/T2 | TS/BIN/PY | P09 | V1C–P1 | RO/ST |
| parser.cheerio/beautifulsoup | ALT | T2 | TS/PY | P09 | V1C | RO |
| fingerprint.wappalyzer/whatweb | ALT | T2 | TS/BIN | P09 | V1C–V1O | RO |
| fingerprint.wtt | DEF | T0 | TS | P09 | V1C | RO |

## 52. API Matrix

WTT-TM-DOM-003: Domains S–Y (323–400). DEFAULT REST substrate: `wtt.http` (native); OpenAPI-diff + schema validators + Schemathesis + Prism are V1C (API-004 MUST-shape); harnesses fit-chosen; messaging/brokers POST_V1 (API-005 MUST-where-applicable).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| wtt.http/graphql | DEF | T0 | P17/P18 | V1C/V1O | ST |
| net.curl/httpie | ALT | T2 | P17/P23 | V1C | ST |
| api.newman/bruno/insomnia/supertest/karate/tavern/hurl/restassured | ALT | T2 | P17 | V1O/P1–P1 | ST |
| term.grpcurl | ALT | T2 | P18 | V1O/P1 | ST |
| msg.kafka/rabbitmq/nats/redisstreams/mqtt | ALT | T2 | P18 | P1 | ST |
| contract.openapiDiff/schemathesis/ajv/pydantic/zod/joi | DEF/ALT | T2 | P19 | V1C | RO/ST |
| contract.pact/scc | ALT | T2 | P19 | V1O/P1 | RO |
| mock.prism/wiremock/mockserver/msw/mountebank/hoverfly/mockoon | ALT | T2 | P19 | V1C–P1 | ST |
| wtt.property | DEF | T0 | P12/P19 | V1C | ST |

## 53. Accessibility Matrix

WTT-TM-DOM-004: Domain AC (449–471). DEFAULT: `accessibility.axe` (axe-core-class + AX-tree, A11Y-002); FALLBACK: pa11y; SIGNALS: LH-a11y (+AI/WAVE proposed, §71).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| accessibility.axe | DEF | T1 | P21 | V1C | RO |
| accessibility.pa11y | FB | T2 | P21 | V1O/P1 | RO |
| performance.lighthouse (a11y signal) | ALT | T1 | P21 | V1O/P1 | RO |

## 54. Visual Matrix

WTT-TM-DOM-005: Domains Z–AB (401–448). Capture DEFAULT: Playwright shots; comparator DEFAULT: pixelmatch (REC; TOL-OD-007 for stack); semantic: OpenCV ALT; hosted OPT-IN; responsive/UI-heuristic natives V1C.

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| visual.playwright / visual.pixelmatch | DEF | T1/T2 | P20 | V1C | RO |
| visual.opencv / visual.backstop | ALT | T2 | P20 | V1O/P1–P1 | RO |
| visual.percy/applitools/chromatic | OPT | T3 | P20 | P1 | RO |
| wtt.responsive/uiheuristics | DEF | T0 | P20 | V1C | RO/ST |

## 55. Performance Matrix

WTT-TM-DOM-006: Domain AD (472–479). DEFAULT: Lighthouse perf smoke (V1); LHCI for budgets/regress; WPT/Sitespeed depth POST_V1 (V1-004 breadth).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| performance.lighthouse | DEF | T1 | P22 | V1C | RO |
| performance.lhci | ALT | T1 | P22 | V1O/P1 | RO |
| performance.webpagetest/sitespeed | ALT | T2 | P22 | P1 | RO |

## 56. Load Matrix

WTT-TM-DOM-007: Domains AE–AF (480–498). DEFAULT: `load.k6` (REC); ALL rows LOAD_ACTIVE + isolated workers + BLOCKED-on-prod (§§27/30). POST_V1 breadth (V1-004).

| Tool | Role | Tier | Lang | Phase | Release | Risk |
|---|---|---|---|---|---|---|
| load.k6 | DEF | T1 | BIN | P34 | P1 | LA |
| load.jmeter/gatling | ALT | T2 | JV | P34 | P1 | LA |
| load.locust | ALT | T2 | PY | P34 | P1 | LA |
| load.artillery/autocannon | ALT | T2 | TS | P34 | P1 | LA |
| load.vegeta/wrk/hey | ALT | T2 | BIN | P34 | P1 | LA |

## 57. DAST Matrix

WTT-TM-DOM-008: Domains AK–AL (529–551). DEFAULT: `security.zap` (REC; ARCH exemplar); native validators DEFAULT for passive config (never heavyweight for basics, §75-rule); passive-safe profiles = V1_OPTIONAL slice.

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| security.zap | DEF | T2 | P24 | V1O/P1 | SA |
| security.nuclei/wapiti/nikto/httpx/nmap | ALT | T2 | P24/P25 | V1O/P1–P1 | SA/AN |
| security.burp | OPT | T3 | P25 | P1 | SA |
| wtt.secprobes | ALT | T0 | P24/P25 | V1S/P1 | SA |
| wtt.secval | DEF | T0 | P24 | V1S | RO |

## 58. SAST/SCA Matrix

WTT-TM-DOM-009: Domains AM–AQ + AR–AS (552–627). DEFAULTS: semgrep/trivy/gitleaks/syft/checkov/kube-bench (all REC); V1_OPTIONAL subset slices + POST_V1 breadth (V1-003/V1-004).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| sast.semgrep | DEF | T1 | P26 | V1O/P1 | RO |
| sast.codeql/sonarqube/bandit/spotbugs | ALT | T2 | P26 | P1 | RO |
| sca.trivy | DEF | T1 | P26 | V1O/P1 | RO |
| sca.grype/osv | ALT | T2 | P26 | P1 | RO |
| sca.snyk | OPT | T3 | P26 | P1 | RO |
| secret.gitleaks/trufflehog | DEF/ALT | T2 | P26/P38 | V1O/P1–P1 | RO |
| sbom.syft | DEF | T2 | P26/P38 | P1 | RO |
| iac.checkov/tfsec/terrascan/kics | DEF/ALT | T2 | P37 | P1 | RO |
| term.docker (compose.ops) | ALT | T2 | P03/P37 | P1 | SC |
| k8s.kubebench/kubescape/polaris | DEF/ALT | T2 | P26 | P1 | RO |
| term.aws/az/gcloud + wtt.cloudval | ALT/DEF | T2/T0 | P26 | P1 | ST/RO |

## 59. Secrets Matrix

WTT-TM-DOM-010: Domains AO (572–576) + BS (940–944). SCAN default: gitleaks; RESOLUTION: brokered refs (SCR-001 Proposed set); NEVER plaintext (RULES-6).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| secret.gitleaks/trufflehog | DEF/ALT | T2 | P26 | V1O/P1–P1 | RO |
| secrets.vault/awssm/azurekv/gcp | ALT | T4 | P40 | ENT | ST |
| secrets.k8s/docker/envref | ALT | T2 | P40 | P1–V1C/P1 | ST |
| wtt.rotation | DEF | T0 | P40 | P1 | PW |

## 60. Database Matrix

WTT-TM-DOM-011: Domains BE–BF (909–925). NO single default (connection-fit, DATA-001 MUST-where-configured): ALL engine rows ALT; prod default READ; migrations project-native.

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| db.postgres/redis | ALT | T1 | P28 | P1 | ST |
| db.mysql/mariadb/mssql/oracle/mongo/elastic | ALT | T2 | P28 | P1 | ST |
| db.migrations (class) | ALT | T2 | P28/P39 | P1 | PW |

## 61. Observability Matrix

WTT-TM-DOM-012: Domain BT (1099–1111). DEFAULT substrate: OTel throughout (OBS-001 MUST); exporters OPT-IN (OBS-002 MAY); local-first value without SaaS.

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| obs.otel | DEF | T0 | P04/P36 | V1C | RO |
| obs.prometheus/grafana | ALT | T1 | P36 | P1 | RO |
| obs.loki/tempo/jaeger/elastic | ALT | T2 | P36 | P1 | RO |
| obs.sentry/datadog/newrelic | OPT | T3 | P36 | P1 | RO |

## 62. Orchestration Matrix

WTT-TM-DOM-013: Domain BU (1112–1127). V1: local pool + BullMQ/Redis-Streams (ARCH contract); NATS/Kafka/RabbitMQ/Temporal/K8s-jobs TRIGGERED (scale/compliance signals, never speculative).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| wtt.scheduler | DEF | T0 | P35 | V1D/P1 | ST |
| queue.bullmq / msg.redisstreams | DEF | T1 | P35/P04 | V1C | ST/RO |
| queue.nats/rabbitmq/kafka · workflow.temporal · orch.k8sjobs | ALT | T2 | P35 | P1(–P1/ENT) | ST |

## 63. Reporting Matrix

WTT-TM-DOM-014: Reports HTML/PDF/JSON/CSV/XLSX/JUnit/SARIF/MD (PRD MUST-shape) via natives + harnesses; gates display V1_SELECTED; full P39 POST_V1.

| Capability | Producer | Phase | Release |
|---|---|---|---|
| Report bundles (8 formats) | wtt.dashboard + format writers | P05/P39 | V1C(display)/P1 |
| Gate eval + display | wtt.gates | P39(P30 display) | V1S/P1 |
| CI annotate | ci.* (8 providers) | P39 | P1 |
| Case sync | mgmt.* (6 systems) | P40 | V1O/P1–P1/ENT |
| Notify | notify.* (4 channels) | P40 | P1 |

## 64. AI/LLM Matrix

WTT-TM-DOM-015: Domains B (7–24) + CG–CR (822–853) + CI–CK (1028–1053) + CN (1079–1089). Natives own orchestration/selection/generation/learning/trajectory; harnesses/vendor SELECTIONS pending (TM-DEC-002/003); CK stacks BYO eval-only.

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| wtt.orchestrator/planner/select/generate/learn | DEF | T0 | P13/P14/P32 | V1C–P1 | RO |
| wtt.traj | DEF | T0 | P42 | P1 | RO |
| llm.harness (class) | DEF | T2 | P41 | P1 | ST |
| safety.harness (class) | ALT | T5 | P42 | P1/EXP | AN |
| ml.scikit/tf/torch (byo) | ALT | T2 | P43 | P1 | RO |

## 65. Mobile/Cloud/Device Matrix

WTT-TM-DOM-016: Domains CX (854–869) + AS (616–627, cloud-read). DEFAULT mobile: Appium (P44 core, REC); cloud CLIs ops-gated; device farms/grids ENTERPRISE (§71, no rows).

| Tool | Role | Tier | Phase | Release | Risk |
|---|---|---|---|---|---|
| mobile.appium | DEF | T1 | P44 | P1 | ST |
| mobile.maestro/detox/espresso/uiautomator/xcuitest | ALT | T2 | P44 | P1 | ST |
| desktop.electron/appium/winappdriver | ALT | T2 | P44 | P1 | RO/ST |
| term.aws/az/gcloud | ALT | T2 | P26 | P1 | ST |

---

## 66. V1 Toolset

WTT-TM-V1-001: V1 = `V1_CORE (89 rows) + V1_OPTIONAL (34) + V1_SELECTED (9) + V1_CONDITIONAL (4)` per PHASES §16 + `DES-OD-001`. V1 boundaries: OPTIONAL breadth excluded (V1-003) · load/sec breadth + messaging depth + mobile/desktop + AT + Kafka/NATS/Temporal/K8s excluded (V1-004) · orgs/SSO/cloud-backends/Vault/fleets/ticket-sync/MCP excluded to ENTERPRISE (V1-005) · chaos-beyond-smoke is RESEARCH (V1-006) · SaaS-tenancy/remote-localhost-workers/Java-lightweight excluded (ARCH-1451).

V1_CORE (89): control-plane natives · Playwright + CDP/BiDi · Cheerio/BS4 · WTT fingerprint · native functional + project unit-support · auth(n/z) natives · native HTTP · curl/HTTPie · OpenAPI-diff/Schemathesis/validators/Prism · property-native · WireMock/MockServer/MSW · PW-shots/pixelmatch · responsive/UI-heuristic natives · axe · Lighthouse · net/dns/tls diagnostics · Mailpit · OTel · BullMQ · Redis-Streams · terminal CLIs · store.fs · secrets.envref.

## 67. V1-Optional Toolset

WTT-TM-V1-002: V1_OPTIONAL (34 rows; V1-003): extra crawlers (Crawlee/Katana) · WhatWeb · Cypress · Karate/Hurl · GraphQL/gRPC depth · Pact/SCC · OpenCV · Pa11y/LH-a11y · LHCI · net-advanced (netcat/iperf/mitmproxy/DNSViz/SSLyze/testssl) · Nuclei/ZAP-passive · Semgrep/Trivy/Gitleaks subset slices · file-validator depth · MailHog/smtp4dev/GreenMail · Jira/TestRail-minimal. Each slice is profile/budget-constrained; full breadth is POST_V1.

## 68. V1-Selected & V1-Conditional

WTT-TM-V1-003: V1_SELECTED (9 rows; P24/P29/P30 subsets): wtt.finding/rca/verifier · wtt.secval · wtt.secprobes-slice · wtt.seo-basics · performance.lighthouse(seo) · wtt.i18n. WTT-TM-V1-004: V1_CONDITIONAL (4 rows; `DES-OD-001`, ratify at freeze): wtt.remediation-slice · wtt.heal · wtt.flake · wtt.scheduler(local-pool-slice).

## 69. Enterprise Toolset

WTT-TM-V1-005: ENTERPRISE-first (5 rows): secrets.vault/awssm/azurekv/gcp (T4) · wtt.admin (P47). ENTERPRISE-shared (`/ENT`): store.* blob backends · mgmt commercial tiers · orch.k8sjobs · security.burp(licensed-mode) · remote grids (no rows, §71) · MCP servers (no V1 rows, TOL-OD-003). Enterprise = V1-005 scope: orgs/SSO/RBAC, cloud backends, Vault-class, retention, fleets, ticket sync, MCP server.

## 70. Experimental Toolset

WTT-TM-V1-006: EXPERIMENTAL rows (2, both `P1/EXP`): `safety.harness` (XPT/T5, TM-DEC-003) · `chaos.mesh` (blast-gated, V1-006 research boundary). RULE: experimental rows NEVER gate releases, NEVER run unapproved, ALWAYS budget-capped + sandboxed + labeled in evidence.

## 71. Unminted-ID & Candidate Strategy Notes

WTT-TM-STR-001: Capabilities whose tools are sourced-but-ID-less (NO master rows per TOOLS §14 TID-001/002; §14 amendment proposed — never silently invented):

| Candidate | Source | Capability coverage meanwhile | Proposal |
|---|---|---|---|
| Accessibility-Insights / WAVE signals | P21-optional | accessibility.axe + pa11y + LH-signal rows | Propose `accessibility.a11y-insights/wave` |
| Web-Vitals lib / Chrome-perf APIs | P22 + ARCH-1082 | performance.lighthouse rows | Propose `performance.webvitals/chromeperf` |
| Compose (validate/ops) | TOOLS §73 + P37 | term.docker row | Propose `ops.compose` |
| Black (format) | P38 | quality.ruff/prettier rows | Propose `quality.black` |
| Dredd (consumer contracts) | P19 | contract.pact/scc rows | Propose `contract.dredd` |
| Commercial grids | TIER-3 + P06 | Local browser rows; remote = ENTERPRISE strategy | Propose `grid.*` + TM-DEC-007 |
| BDD runners (UI) | NONE (Cucumber-class OD-006) | functional.execute rows; NO bdd row (honest gap) | TOL-OD-006 individual approval |
| License scanners | P38 license-deny (no vendor) | sbom.syft-enforce row | TM-DEC-001 selection |
| Ecosystem audits (npm/pip-audit/Dependabot) | NONE (OD-006) | sca.* rows | TOL-OD-006; interop plausible, unapproved |
| Cosign/Sigstore/SLSA | NONE (OD-006; P26 names Cosign-class) | sbom.syft + attestation natives | TOL-OD-006; signing strategy TBD |
| 1Password | NONE (zero source hits) | secrets.* Proposed set | Correctly ABSENT; no row, no proposal |
| Git-hosting PR ops | P39 (via providers) | ci.* annotate capability | No separate row (covered) |

## 72. Deprecated Toolset

WTT-TM-V1-007: DEPRECATED rows: NONE. Repository contains no implementations (all rows PLANNED); nothing can deprecate yet. Deprecation PROCESS (when needed): `DEPRECATED` status + successor pointer + removal release + migration note; LEGACY role for deprecated-in-use only.

## 73. Release-Split Summary

WTT-TM-V1-008: Master rows by earliest release bucket (combos counted once):

| Bucket | Rows | Share |
|---|---|---|
| V1_CORE | 89 | 26.9% |
| V1_OPTIONAL | 34 | 10.3% |
| V1_SELECTED | 9 | 2.7% |
| V1_CONDITIONAL | 4 | 1.2% |
| POST_V1 | 190 | 57.4% |
| ENTERPRISE-first | 5 | 1.5% |
| EXPERIMENTAL-shared | 0 +2 | (in POST_V1) |
| TOTAL | 331 | 100% |

## 74. Completeness Report

WTT-TM-CCR-001: CATALOG COMPLETENESS REPORT (matrix-level; ID-level registry deferred with TOOLS TOL-OD-001):

| Check | Result |
|---|---|
| Catalog domains (A–CZ) with ≥1 row | 104 / 104 |
| Capability-ID range coverage (1–1235) | 100% (range-continuous; row-level pending TOL-OD-001) |
| TOOLS §14 tool IDs present | 244 / 244 |
| Master rows | 331 (TM-000001–TM-000331, contiguous) |
| (Capability,Tool) pairs unique | 331 / 331 |
| Rows with tier + lang + phase + release + risk + prod + decision + status + design | 331 / 331 |
| Rows with invented versions / OS claims / statuses | 0 |
| `MATRIX_CONFLICT` entries | 0 (§76 empty) |
| `UNRESOLVED_MAPPING` (capability with neither row nor §71 strategy) | 0 |
| Unmapped capabilities | 0 |

## 75. Invariants, Validation & Document Control

WTT-TM-INV-001: TOOL REGISTRY INVARIANTS (matrix restatement): (1) One PRIMARY per (capability, profile). (2) No redundant defaults (each DEF justified by distinct capability). (3) Risk class on every row; approval re-entered on risk escalation. (4) No silent externalization (§47 gates). (5) Secrets by reference only. (6) No invented versions/OS/statuses. (7) Deterministic AI routing on capabilities, never vendor names; no popularity bias. (8) Tier ≠ phase ≠ release (all three on every row). (9) No triple language duplication. (10) Java rows conditional (TOL-OD-012). (11) Docker never mandatory for simple local runs. (12) PLANNED until repo-verified.

WTT-TM-VAL-001: VALIDATION CHECKLIST: §§1–77 contiguous · TOC anchors resolve · 331 master rows contiguous · IDs ∈ (§14 ∪ wtt.* ∪ 8 class IDs) · pairs unique · 104/104 domains · 244/244 §14 tools · zero invented claims · §76 empty · fences `text` only (no yaml needed) · versions-grep clean.

| Field | Value |
|---|---|
| Version | 0.1.0 |
| Date | 2026-09-07 |
| Status | PLANNED (all rows; repo inspected, docs only) |
| Upstream | TOOLS.md v0.1.0 · PHASES.md v0.2.0 · DESIGN.md v0.1.0 |
| Related | PRD.md · ARCHITECTURE.md · RULES.md |

---

## 76. MATRIX_CONFLICT Register

WTT-TM-MCF-001: `MATRIX_CONFLICT` = an unresolvable spec-level contradiction between matrix rows/matrices and their upstream sources that blocks implementation. CONFLICT CHECK RESULT: **NONE — register empty.** Candidates examined and dispositioned WITHOUT contradiction: (a) implementation-type overlaps (git ADAPTER+NATIVE, msg/queue duals, term/cloud duals) → exactly-one-primary per (capability,tool) row (§19 MAS-004). (b) Release combos (`V1O/P1` etc.) → earliest-slice semantics (§40). (c) Same tool in multiple rows (§14 reuse) → distinct capabilities, pairs unique. (d) ARCH 9-class risk vs brief §32 10-item union → canonical 9-class binding (§13; TOOLS §18 inherited). (e) TOOLS §14 vs sourced-but-ID-less tools → no rows + §71 proposals (TM-DEC-006), never invented IDs. Runtime-resolvable conflicts live in §46, never here.

| ID | Parties | Description | Status |
|---|---|---|---|
| — | — | No entries | EMPTY |

---

## 77. UNRESOLVED_MAPPING Register

WTT-TM-URM-001: `UNRESOLVED_MAPPING` = a canonical capability with NEITHER a master row NOR a §71 strategy. RESULT: **NONE — register empty.** Every catalog capability (1–1235, range-continuous) resolves to ≥1 master row; every sourced-but-ID-less candidate resolves to a §71 strategy with a §14-amendment or decision proposal. Honest gaps (UI-BDD runners, license-scanner vendor, grid providers) are decision-required STRATEGIES, not unresolved mappings.

| ID | Capability | Description | Status |
|---|---|---|---|
| — | — | No entries | EMPTY |

---

*End of TOOL-MATRIX.md v0.1.0 — §§1–77 · 331 master rows · 0 conflicts · 0 unmapped.*
