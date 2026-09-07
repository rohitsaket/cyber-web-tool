# WTT — Website Testing Tool
## Global Capability, Tool, Adapter & Execution Registry

| Field | Value |
|---|---|
| Document Status | **Canonical — Draft for Review** |
| Version | 0.1.0 (Pre-implementation) |
| Last Updated | 2026-09-07 |
| Source PRD | `PRD.md` v0.1.0 — product requirements, capability namespaces, V1 scope |
| Source Architecture | `ARCHITECTURE.md` v0.1.0 — tool registry/contract/runtime, ADRs, tech decisions |
| Source Rules | `RULES.md` v0.1.0 — security, execution, language, engineering constraints |
| Source Phases | `PHASES.md` v0.2.0 (`WTT-P00–P48`) — phase ownership, tier model (§72), catalog structure (§70) |
| Source Design | `DESIGN.md` v0.1.0 — tool UX surfaces (§42), catalog→UX (§77), phase→UX (§78) |
| Source Global Tool Catalog | **No standalone catalog file exists in repo.** Catalog structure taken from `PHASES.md` §70: 104 domains (A–CZ), capability IDs 1–1235 contiguous. Row-level verification pending `PHZ-OD-010` (inherited as `TOL-OD-001`). |
| Catalog Coverage Status | 104/104 domains mapped · 1235/1235 capability IDs covered by range (§170 rule) · Unmapped = 0 (§132) |
| Repository State | Inspected 2026-09-07: docs only (`PRD/ARCH/RULES/PHASES/DESIGN.md`), no implementation. All tool statuses = `PLANNED` (§129 rule). |

> **Source-of-truth check.** All five sources read in full; repository inspected. **No `BLOCKED — TOOL SPECIFICATION CONFLICT`.** Dispositions (non-blocking, recorded here and in §3): (a) this prompt's §51 domain sketch differs from the actual catalog (`PHASES.md` §70) — per the prompt's own rule ("use the source"), §45 normalizes the actual catalog; variance logged in §45.1. (b) Risk classes: canonical 9-class set from ARCH §53.2 (refined by `DESIGN.md` §3.2); the 10-item union in this prompt's §17 is task text, not source — mapping in §18. (c) Tier models: `PHASES.md` §72 (TIER-1/2/3) is mapped into this document's 6-tier executable model in §9 — refinement, not contradiction. (d) No `WTT-E-*` error-code taxonomy exists in any source; §32 defines the TOOLS-level failure taxonomy (decision status `RECOMMENDED`). (e) `DESIGN.md` cites "ARCH §64" for error taxonomy; ARCH §64 is Deployment Architecture — errors live in ARCH §60/§61. Editorial, non-semantic; tracked as `TOL-OD-002` (fix in DESIGN.md, not here).

---

## Table of Contents

1. [Document Control](#1-document-control)
2. [Purpose](#2-purpose)
3. [Source-of-Truth Hierarchy](#3-source-of-truth-hierarchy)
4. [WTT Tool Philosophy](#4-wtt-tool-philosophy)
5. [Capability Model](#5-capability-model)
6. [Tool Model](#6-tool-model)
7. [Adapter Model](#7-adapter-model)
8. [Implementation Types](#8-implementation-types)
9. [Tool Tiers](#9-tool-tiers)
10. [Programming Language Policy](#10-programming-language-policy)
11. [Runtime Types](#11-runtime-types)
12. [Inter-Language Communication](#12-inter-language-communication)
13. [Tool Manifest](#13-tool-manifest)
14. [Tool IDs](#14-tool-ids)
15. [Capability Naming](#15-capability-naming)
16. [Capability Ownership](#16-capability-ownership)
17. [Permission Model](#17-permission-model)
18. [Risk Model](#18-risk-model)
19. [Automation Policy](#19-automation-policy)
20. [Environment Policy](#20-environment-policy)
21. [Authorization](#21-authorization)
22. [Installation Model](#22-installation-model)
23. [Discovery](#23-discovery)
24. [Health Model](#24-health-model)
25. [Versioning](#25-versioning)
26. [Dependencies](#26-dependencies)
27. [Tool Selection](#27-tool-selection)
28. [Fallback](#28-fallback)
29. [Execution Contract](#29-execution-contract)
30. [Execution Lifecycle](#30-execution-lifecycle)
31. [Cancellation](#31-cancellation)
32. [Retry](#32-retry)
33. [Resources](#33-resources)
34. [Cost](#34-cost)
35. [Output Normalization](#35-output-normalization)
36. [Evidence](#36-evidence)
37. [Events](#37-events)
38. [Audit](#38-audit)
39. [Logging](#39-logging)
40. [Sandboxing](#40-sandboxing)
41. [Plugin Security](#41-plugin-security)
42. [MCP](#42-mcp)
43. [Remote Services](#43-remote-services)
44. [Data Privacy](#44-data-privacy)
45. [Global Catalog](#45-global-catalog)
46. [Native WTT Systems](#46-native-wtt-systems)
47. [Browser Tools](#47-browser-tools)
48. [DevTools](#48-devtools)
49. [Discovery](#49-discovery)
50. [Functional/E2E](#50-functionale2e)
51. [Unit/Component](#51-unitcomponent)
52. [Python Testing](#52-python-testing)
53. [Java Testing](#53-java-testing)
54. [API](#54-api)
55. [GraphQL](#55-graphql)
56. [gRPC/SOAP](#56-grpcsoap)
57. [Messaging](#57-messaging)
58. [Contracts](#58-contracts)
59. [Visual](#59-visual)
60. [Accessibility](#60-accessibility)
61. [Performance](#61-performance)
62. [Load](#62-load)
63. [Network](#63-network)
64. [Proxy](#64-proxy)
65. [DNS](#65-dns)
66. [TLS](#66-tls)
67. [DAST](#67-dast)
68. [Security Configuration](#68-security-configuration)
69. [SAST](#69-sast)
70. [SCA](#70-sca)
71. [Secret Scanning](#71-secret-scanning)
72. [Supply Chain](#72-supply-chain)
73. [Container/IaC](#73-containeriac)
74. [Kubernetes](#74-kubernetes)
75. [Cloud](#75-cloud)
76. [Database](#76-database)
77. [Data](#77-data)
78. [Files](#78-files)
79. [Email](#79-email)
80. [Mobile](#80-mobile)
81. [Desktop](#81-desktop)
82. [Build](#82-build)
83. [Static Quality](#83-static-quality)
84. [Coverage](#84-coverage)
85. [Mutation](#85-mutation)
86. [CI/CD](#86-cicd)
87. [Git](#87-git)
88. [Deployment](#88-deployment)
89. [Observability](#89-observability)
90. [Monitoring](#90-monitoring)
91. [Chaos](#91-chaos)
92. [Test Data](#92-test-data)
93. [Payments](#93-payments)
94. [E-Commerce](#94-e-commerce)
95. [SEO](#95-seo)
96. [Privacy](#96-privacy)
97. [AI/LLM](#97-aillm)
98. [Prompt/RAG](#98-promptrag)
99. [Agent Testing](#99-agent-testing)
100. [AI Safety](#100-ai-safety)
101. [ML](#101-ml)
102. [Browser Vision](#102-browser-vision)
103. [Self-Healing](#103-self-healing)
104. [Flakiness](#104-flakiness)
105. [Root Cause](#105-root-cause)
106. [Code Intelligence](#106-code-intelligence)
107. [Test Generation](#107-test-generation)
108. [Auto Remediation](#108-auto-remediation)
109. [Orchestration](#109-orchestration)
110. [Workers](#110-workers)
111. [Artifact Storage](#111-artifact-storage)
112. [Secrets](#112-secrets)
113. [Notifications](#113-notifications)
114. [Test Management](#114-test-management)
115. [Reporting](#115-reporting)
116. [Tool SDK](#116-tool-sdk)
117. [Tool CLI](#117-tool-cli)
118. [Tool Profiles](#118-tool-profiles)
119. [V1 Toolset](#119-v1-toolset)
120. [Post-V1 Toolsets](#120-post-v1-toolsets)
121. [Tool Packs](#121-tool-packs)
122. [Catalog-to-Phase Matrix](#122-catalog-to-phase-matrix)
123. [Default Tool Matrix](#123-default-tool-matrix)
124. [Tool Tier Matrix](#124-tool-tier-matrix)
125. [Language Matrix](#125-language-matrix)
126. [Security Matrix](#126-security-matrix)
127. [Installation Matrix](#127-installation-matrix)
128. [OS Compatibility Matrix](#128-os-compatibility-matrix)
129. [Tool Testing Requirements](#129-tool-testing-requirements)
130. [Tool Definitions of Done](#130-tool-definitions-of-done)
131. [Tool Registry Invariants](#131-tool-registry-invariants)
132. [Catalog Completeness Report](#132-catalog-completeness-report)
133. [Open Tool Decisions](#133-open-tool-decisions)
134. [Appendices](#134-appendices)

---

## 1. Document Control

WTT-TOL-DOC-001: This document is the canonical executable tool model for WTT: capability system, tool registry, catalog normalization, manifests, adapters, runtimes, language selection, installation, permissions, risk, execution, evidence, health, versioning, dependencies, phase ownership, AI selection, lifecycle, and plugin strategy. Engineering agents MUST implement tooling from this document without inventing a parallel tool architecture.

WTT-TOL-DOC-002: Identifiers follow `WTT-TOL-<AREA>-<NNN>`, are stable, and MUST be cited in adapter implementation plans. Decision statuses follow §226-rule vocabulary: `APPROVED` (sourced MUST/approval) · `RECOMMENDED` (sourced recommendation/proposal) · `DECISION_REQUIRED` (unresolved, tracked in §133) · `OPTIONAL` (sourced MAY/candidate) · `DEFERRED` (explicitly later) · `NOT_APPLICABLE`.

WTT-TOL-DOC-003: Authority order is `PRD → ARCHITECTURE → RULES → PHASES → DESIGN → GLOBAL TOOL CATALOG (via PHASES §70) → TOOLS (this document)`. This document MUST NOT silently contradict higher sources; conflicts are recorded as `BLOCKED — TOOL SPECIFICATION CONFLICT`. None exists (header + §3).

WTT-TOL-DOC-004: No implementation status is invented: repository inspected 2026-09-07 contains docs only; every tool status is `PLANNED` (§25-rule). No OS support beyond source evidence (§128). No version numbers invented (§25).

## 2. Purpose

WTT-TOL-PUR-001: For every important WTT capability, this document MUST answer: capability exposed · native vs adapter · implementing tool(s) · default · language/runtime + why · OS support · environment needs · permissions · risk · AI-invocability · approval needs · production policy · installation · detection · health · versioning · inputs/outputs · evidence · events · failure modes · cancellability · retry · cost · owning phase · release scope (V1/core/optional/enterprise/experimental).

WTT-TOL-PUR-002: A future agent receiving `PRD+ARCH+RULES+PHASES+DESIGN+TOOLS` and instructed *"Implement the accessibility.scan capability"* MUST be able to determine capability ID, default tool/adapter, alternatives, owning phase, language/runtime, permissions, risk, installation, health, execution, events, evidence, normalization, failure reporting, tests, and Definition of Done from this document + `TOOL-MATRIX.md`, without redesigning tool architecture.

## 3. Source-of-Truth Hierarchy

WTT-TOL-HIE-001: `PRD.md` (WHAT: capabilities, namespaces `WTT-TOOL-002`, V1 scope §74) → `ARCHITECTURE.md` (HOW: registry/contract/runtime, 5-level model §27, risk §53.2, ADRs, §78 tech decisions) → `RULES.md` (CONSTRAINTS: invariants §54, tool/execution/safety rules) → `PHASES.md` (WHEN: `WTT-P00–P48` ownership, tiers §72, catalog §70) → `DESIGN.md` (UX: Tools center §42, mappings §§77–78) → `GLOBAL TOOL CATALOG` (UNIVERSE: A–CZ / 1–1235 via PHASES §70) → `TOOLS.md` (EXECUTABLE MODEL: this document).

WTT-TOL-HIE-002: Conflict check result: **no `BLOCKED — TOOL SPECIFICATION CONFLICT`.** All cross-source variances were dispositioned without contradiction: risk-class mapping (§18), tier-model mapping (§9), catalog identification (§45.1), error-taxonomy ownership (§32), DESIGN §64-citation editorial (`TOL-OD-002`). Open tool decisions live in §133; none blocks this document.

## 4. WTT Tool Philosophy

WTT-TOL-PHI-001: AI operates on **capabilities, not vendor names** (PRD `WTT-TOOL-001/004`, ARCH-270). GOOD: `accessibility.scan` → resolver chooses axe-core / Pa11y / enterprise scanner. BAD: AI hard-codes `axe-core` in plans, prompts, or code. Vendor names appear only in manifests, registries, matrices, and evidence provenance — never as capability identifiers.

WTT-TOL-PHI-002: Canonical flow (normative):

```text
AI / Test Planner → Capability Request → Policy Engine → Capability Registry
→ Tool Resolver → Tool Implementation → Execution → Canonical Result → Evidence / Finding
```

WTT-TOL-PHI-003: Three-axis separation (normative, resolves tier-vs-phase confusion): **Tier** (§9) = preference/relationship (what WTT prefers) · **Phase** (§§45/122) = availability (when it ships, `WTT-P00–P48`) · **Release scope** (§§119–120) = audience gate (V1/POST_V1/ENTERPRISE/EXPERIMENTAL/FUTURE). A `TIER_1_DEFAULT` tool owned by a POST_V1 phase (e.g., k6/P34) is NOT a V1 dependency. No document layer may collapse these axes.

WTT-TOL-PHI-004: Anti-overengineering (RULES invariant 23, ARCH-021): no tool is integrated for popularity; no overlapping tools without justified default+alternatives; no enterprise infra before measured need; no Python/Java where TypeScript suffices (PRD `WTT-LANG-005`); no rebuilt mature engines without documented unique-need justification (PHASES line 165); no commercial core dependencies; no abstraction beyond current phase needs. Every family section (§§47–115) MUST name its default + rationale and relegate the rest to explicit alternatives.

---

## 5. Capability Model

WTT-TOL-CAP-001: A **capability** is WHAT WTT can do: a stable, namespaced, versioned contract (`domain.action` or `domain.subdomain.action`, §15) with input/output schemas, permission + risk declarations, and ownership (§16). Capabilities are the ONLY unit AI may request (PRD `WTT-TOOL-001`, RULES invariant 11).

WTT-TOL-CAP-002: Canonical capability examples (normative IDs; full registry in §15): `browser.navigate · browser.screenshot · browser.devtools.console.read · browser.devtools.network.read · discovery.crawl · discovery.routes · discovery.forms · accessibility.scan · performance.audit · security.passive.headers.scan · security.active.dast.scan · api.rest.request · api.rest.schema.validate · database.query.read · ai.test.generate · ai.rootcause.analyze · fix.patch.propose · fix.patch.apply · verification.execute`.

WTT-TOL-CAP-003: Every capability MUST declare: `Domain Owner · Primary Tool · Alternative Tools · Required Phase · Security Classification` (§15/§16). Exactly one logical capability owner exists (PRD namespace ownership; registry enforces uniqueness).

WTT-TOL-CAP-004: Capability versioning (PRD `WTT-TOOL-005`): registry supports versioning, deprecation, aliasing, side-by-side versions; breaking capability changes REQUIRE major version + migration note. Aliases MUST resolve deterministically and be visible in `tools info` (§117).

## 6. Tool Model

WTT-TOL-MOD-001: A **tool** is a concrete implementation providing one or more capabilities (e.g., Playwright, axe-core, Lighthouse, ZAP, k6, Semgrep, Trivy). A **tool execution** is one runtime invocation with a stable `toolExecutionId` (`TOOL-EXEC-…`), bound to session/capability/tool/target/environment (§29).

WTT-TOL-MOD-002: Five-level model (ARCH §27): `Capability → Tool → Implementation → Instance → Execution`. Registry levels: capability definitions, tool definitions, pinned implementations (builds/versions), provisioned instances (workers/services), execution records. Levels MUST NOT be conflated in schemas, events, or UI (§117, DESIGN §42).

WTT-TOL-MOD-003: Tool lifecycle states (ARCH §27): `DISCOVERED → AVAILABLE ⇄ UNAVAILABLE → INSTALLING → READY → RUNNING → (READY | DEGRADED | FAILED) → DISABLED`, covering registration, discovery, dependency/version/health checks, execution, cancellation, upgrade, disable/uninstall. A crash in any tool is contained to its job and MUST NOT terminate the session (RULES `WTT-RULE-TOOL-004`; ARCH §61).

WTT-TOL-MOD-004: Tools MUST declare evidence types produced and finding categories emitted; undeclared side effects are prohibited (PRD `WTT-TOOL-014`). Execution MUST be cancellable, timeout-bounded, idempotent-aware, and evidence-emitting; long-running tools MUST stream progress + partials (PRD `WTT-TOOL-013`).

## 7. Adapter Model

WTT-TOL-ADP-001: A **tool adapter** is the WTT-owned translation layer between an external tool and WTT contracts: `External Tool → Adapter → Canonical WTT structures` (ARCH anti-corruption mandate §16-principle/§78-evolution). Vendor models MUST NEVER leak into the domain (ARCH-460, RULES `WTT-RULE-ARC-002`). Example: `Lighthouse → LighthouseAdapter → WTT PerformanceResult`; `ZAP Result → ZapAdapter → WTT RawSecurityFinding → Finding Normalizer → Canonical Finding`.

WTT-TOL-ADP-002: Every adapter MUST: map capabilities (§15) · validate inputs · normalize outputs (§35) · map severities (§35) · declare permissions (§17) + risk (§18) · enforce timeout/cancel/retry (§§31–32) · expose health (§24) · emit lifecycle events (§37) · integrate evidence (§36) · redact secrets (§39) · record provenance (tool version + adapter version + config fingerprint, §38). Definition of Done in §130.

WTT-TOL-ADP-003: Protocol vs executable distinction (§48-rule): `CDP / WebDriver BiDi / OTel / OpenAPI` are protocols (capability transports), not tools; they MUST NOT receive tool IDs, tiers, or health checks as if they were executables. Executables (browser binaries, exporters, scanners) are tools. Adapters may bind a protocol (e.g., `devtools.cdp` adapter) but the protocol itself stays a contract.

## 8. Implementation Types

WTT-TOL-TYP-001: Every tool has exactly one primary implementation type:

| Type | Meaning | Examples (grounded) |
|---|---|---|
| `WTT_NATIVE` | Implemented directly by WTT | Target/Session/Capability managers, Finding Normalizer, Evidence Correlator, RCA Coordinator, Remediation Controller, Policy/Gate engines (§46) |
| `WTT_ADAPTER` | WTT integration over a mature external engine | Playwright, axe-core, Lighthouse, ZAP, k6, Semgrep, Trivy adapters (PHASES line 165; ARCH-460 exemplars) |
| `EXTERNAL_OPTIONAL` | Useful external, not required for core operation | WebPageTest, Crawlee/Katana alternates, Newman/Bruno harnesses (TIER-2, §9) |
| `REMOTE_SERVICE` | External API/service execution | SSL Labs-class checks, hosted eval/model providers (privacy-classified §44) |
| `COMMERCIAL_INTEGRATION` | Licensed/commercial SaaS | BrowserStack/Sauce/LambdaTest, Applitools/Percy/Chromatic, Burp (licensed), Snyk/Sonar-commercial (PHASES TIER-3) |
| `ENTERPRISE_INTEGRATION` | Org/environment integration | SSO/RBAC, fleet grids, Vault-class secrets, TestRail/Zephyr sync (PRD `WTT-V1-005`) |
| `EXPERIMENTAL` | Research/unstable | P42 red-team depth, P37 prod-chaos, advanced AI visual agents (gated §120) |
| `FUTURE_EXTENSION` | Catalogued, not near-term scheduled | AT automation, MCP server breadth, plugin marketplace (PRD Future) |

WTT-TOL-TYP-002: Type determines governance: `WTT_NATIVE` → full WTT test/contract ownership (§130) · `WTT_ADAPTER` → adapter DoD + upstream-compat tracking (§25) · `EXTERNAL_OPTIONAL` → never blocks core runs (§32) · `REMOTE_SERVICE/COMMERCIAL/ENTERPRISE` → privacy + cost + auth handling (§§43–44, §130-DoD) · `EXPERIMENTAL/FUTURE_EXTENSION` → feature-flagged or absent from default resolution (§27).

## 9. Tool Tiers

WTT-TOL-TIR-001: Every tool receives one tier (TOOLS-defined 6-tier model; PHASES §72 3-tier map shown — refinement, not contradiction):

| Tier | Meaning | PHASES §72 map | Members (sourced) |
|---|---|---|---|
| `TIER_0_NATIVE_CORE` | Fundamental WTT-owned systems | Native pattern (line 165) | §46 systems: CLI, managers, registries, engines |
| `TIER_1_DEFAULT` | Recommended default engines | TIER-1 (V1-preferred/built-in-or-managed) | Playwright, axe-core, Lighthouse/LHCI, k6, Semgrep, Trivy, Postgres/Redis drivers, GitHub Checks, OTel/Prometheus clients, Vitest/Jest, pytest, MailHog/Mailpit-class, Appium (P44 core), OIDC client libs |
| `TIER_2_OPTIONAL_OPEN_SOURCE` | Supported open alternatives / BYO | TIER-2 | Selenium/WebdriverIO/Cypress/Puppeteer (+Nightwatch/TestCafe/Selenide seams P06), Pa11y, WebPageTest/Sitespeed, Gatling/Locust/JMeter/Wrk, CodeQL/Bandit/Grype/OSV/Gitleaks/Syft, Newman/Bruno/SuperTest/Karate/Hurl, Pact/Schemathesis/WireMock/MSW, Crawlee/Katana/Scrapy, ZAP/Nuclei/Wapiti, Terraform/Compose, GitLab/Jenkins/Azure/Circle providers, S3/GCS/Azure/MinIO backends, Slack/mail notifiers, Espresso/XCUITest/WinAppDriver, eval harnesses |
| `TIER_3_OPTIONAL_COMMERCIAL` | Commercial/cloud alternatives, opt-in | TIER-3 | BrowserStack/Sauce/LambdaTest/TestingBot, Applitools/Percy/Chromatic, Burp (licensed), Snyk/Sonar-commercial, Datadog/RUM-vendors, TestRail/Zephyr, device farms, hosted model providers |
| `TIER_4_ENTERPRISE` | Enterprise infrastructure | Enterprise pattern (line 165: "Enterprise (org connection)") + PRD `WTT-V1-005` | SSO/RBAC, org fleets, Vault-class secrets, legal-hold retention, ticket/test-mgmt sync, partner adapters, MCP server (enterprise) |
| `TIER_5_EXPERIMENTAL` | Experimental/research | GA `EXPERIMENTAL` class (§18) | P42 red-team depth, P37 prod chaos, research oracles (PRD `WTT-V1-006`) |

WTT-TOL-TIR-002: Tier ≠ phase ≠ release (§4): tier expresses preference/relationship only. `TIER_1_DEFAULT` members owned by POST_V1 phases (k6/P34, Semgrep+Trivy/P26, Appium/P44) MUST NOT be read as V1 scope. `TOOL-MATRIX.md` MUST carry all three axes per row.

WTT-TOL-TIR-003: Do NOT make every listed tool mandatory: only `TIER_0` + V1-phase `TIER_1` members are core-required; everything else resolves by capability need + profile + policy (§§27/118). Missing optional tools yield `TOOL_UNAVAILABLE` + degraded coverage, never fatal session failure (§32).

---

## 10. Programming Language Policy

WTT-TOL-LNG-001: WTT officially supports tool implementation in **TypeScript/JavaScript, Python, and Java** (PRD `WTT-LANG-001`). Best-fit selection is MANDATORY (PRD `WTT-LANG-002`); each manifest MUST record `runtime.language` + rationale pointer (PRD `WTT-LANG-004`).

WTT-TOL-LNG-002: Selection factors (evaluate per tool, §7-rule): runtime ecosystem · native libraries · browser integration · AI/ML needs · computer vision · data processing · CPU/memory profile · concurrency/throughput · startup latency · long-running behavior · distribution · cross-platform support · deployment complexity · maintainability · existing WTT integration. Category dogma (`browser=TS`, `AI=Python`, `load=Java`) is FORBIDDEN as a decision rule.

WTT-TOL-LNG-003: Sourced preferences — preferences, NOT rigid rules (PRD `WTT-LANG-003`, decision status `RECOMMENDED`): browser/Playwright-facing runtime favors TypeScript · AI/ML/computer-vision analysis favors Python · high-throughput long-running distributed processing favors Java where justified. A capability MAY combine languages (e.g., TS Playwright runtime + Python vision + Java distributed execution) behind the unified contract.

WTT-TOL-LNG-004: Baselines (decision status: control-plane TS/Node `RECOMMENDED ARCHITECTURE` per ARCH §78; `APPROVED BY PRD` where noted): control plane + CLI + dashboard backend = TypeScript/Node · AI/data workers = Python + FastAPI + Pydantic + pytest (PRD §73 Proposed) · Java workers = opt-in JAR/container for justified heavy jobs only (ARCH §65/§66). Do NOT force Java/Python microservices where a TypeScript process suffices (PRD `WTT-LANG-005`); Java for lightweight jobs is explicitly NOT V1 (ARCH line 1451).

WTT-TOL-LNG-005: NO THREE-LANGUAGE DUPLICATION (RULES invariant 13): do NOT create TS + Python + Java versions of each tool. Multiple implementations are allowed ONLY for genuinely different runtime needs (e.g., `performance.http`: lightweight TS runner + Python analytics processor + distributed Java worker — only if real requirements justify all three). Unjustified duplication is a review failure (§130).

## 11. Runtime Types

WTT-TOL-RTE-001: Every tool MUST declare its runtime model (one or more):

```text
NODE_IN_PROCESS · NODE_WORKER_THREAD · NODE_CHILD_PROCESS ·
PYTHON_SUBPROCESS · PYTHON_WORKER · PYTHON_SERVICE ·
JAVA_PROCESS · JAVA_WORKER · JAVA_SERVICE ·
NATIVE_BINARY · DOCKER_CONTAINER · KUBERNETES_JOB ·
REMOTE_HTTP · REMOTE_GRPC · REMOTE_WEBSOCKET · MCP_SERVER ·
BROWSER_RUNTIME · CLOUD_SERVICE
```

WTT-TOL-RTE-002: Placement rules: control-plane hot path favors `NODE_IN_PROCESS/WORKER_THREAD` (single-language hot path, ARCH §78) · browser automation runs in isolated browser worker processes (never in-process with the control plane) · short-lived analysis favors subprocess (`PYTHON_SUBPROCESS`, JSONL) · stateful/long-lived favors services (`PYTHON_SERVICE` FastAPI / `JAVA_SERVICE` gRPC) · distribution favors `KUBERNETES_JOB`/remote workers only at measured scale (ARCH-021: no microservice sprawl before proven need). Do NOT turn every tool into a microservice.

WTT-TOL-RTE-003: `MCP_SERVER` is a transport/runtime binding, not a trust level: MCP-backed tools still require capability mapping, permissions, risk, scope validation, manifest, and audit (§42). MCP server is explicitly NOT V1-mandatory (ARCH line 1451) and ENTERPRISE-gated (PRD `WTT-V1-005`).

## 12. Inter-Language Communication

WTT-TOL-COM-001: Standard integration (PRD `WTT-TOOL-020`, `APPROVED`): local subprocess via **stdin/stdout JSON / JSON Lines + structured exit codes** · service processes via **HTTP / WebSocket / gRPC** · distributed workloads via **Redis / NATS / RabbitMQ / Kafka / Temporal** (as configured). Strong schemas REQUIRED: JSON Schema / OpenAPI / Protocol Buffers / gRPC IDL. Cross-language contracts are typed/versioned (RULES invariant 21); shared `contracts/` package + generated TS/Python/Java bindings prevent drift (ARCH evolution §75).

WTT-TOL-COM-002: Local short-lived tools: prefer `stdin/stdout JSONL + structured stderr + exit code` (PRD `WTT-TOOL-020`; ARCH §78 "Python comms: JSONL subprocess → FastAPI svc" `RECOMMENDED`). Persistent local services: `HTTP localhost / Unix socket / named pipe / gRPC`. Distributed execution: `gRPC / Redis-BullMQ / NATS / RabbitMQ / Kafka / Temporal` per §109 progression. Never pass large binaries through queue/event JSON — artifacts by reference (RULES invariant 20; §36).

WTT-TOL-COM-003: Sourced comms decisions (ARCH §78, `RECOMMENDED ARCHITECTURE` unless noted): Python `JSONL subprocess → FastAPI svc` · Java `gRPC/service/container` · Queue `BullMQ-class on Redis` (PRD OD-002 open for evolution) · Event transport `in-proc + PG + Redis Streams` · Realtime dashboard `WebSocket + SSE + cursors` · AI gateway `in-CP routed gateway + adapters` · Observability `OTel + exporters` (`APPROVED BY PRD`).

## 13. Tool Manifest

WTT-TOL-MAN-001: Conceptual manifest (ILLUSTRATIVE — exact schema finalized in `TOOL_SDK.md` per PRD `WTT-TOOL-010/011`; this document defines the REQUIRED contract, not final serialization):

```yaml
# CONCEPTUAL — field names illustrative, requirements normative (§13.2)
id: browser.playwright
displayName: Playwright Browser Engine
version: 1.0.0
implementationType: WTT_ADAPTER
tier: TIER_1_DEFAULT
runtime: { type: NODE_CHILD_PROCESS, language: typescript }
capabilities: [browser.launch, browser.navigate, browser.click, browser.fill, browser.screenshot]
platforms: [windows, macos, linux]
permissions: [browser.control, network.target, filesystem.artifacts.write]
risk: { level: SAFE_TEST }
execution: { timeoutMs: 300000, cancellable: true }
evidence: [screenshot, trace, har]
```

WTT-TOL-MAN-002: Required manifest fields — document per tool whether each is `REQUIRED / OPTIONAL / NOT_APPLICABLE`:

| Field | Requirement | Notes |
|---|---|---|
| `id` | REQUIRED | Stable `domain.tool`, no versions (§14) |
| `displayName · description · vendor` | REQUIRED | UX metadata (§134-rule: + short description, category); never invent vendor claims |
| `version` (tool + adapter) | REQUIRED | Pinned/known versions recorded; no invented numbers (§25) |
| `implementationType · tier` | REQUIRED | §§8–9, exactly one each |
| `capabilities[]` | REQUIRED | ≥1 capability ID (§15); infrastructure-only needs `CAPABILITY_GAP` decision |
| `runtime · language · entrypoint` | REQUIRED | §11 + rationale pointer (`WTT-LANG-004`) |
| `inputSchema · outputSchema` | REQUIRED | Strongly typed; gateway-validated, fail-fast (PRD `WTT-TOOL-012`) |
| `supportedOS · supportedArchitectures · supportedEnvironments` | REQUIRED | Evidence-graded (§128); never assume Bash/Linux |
| `permissions[] · riskLevel` | REQUIRED | Least privilege (§§17–18) |
| `dependencies[] · installation` | REQUIRED | Detectable graph, no loops (§26); mode from §22 |
| `healthCheck` | REQUIRED (executables) | Method + required-for-run? (§24) |
| `timeout · retryPolicy · cancellable` | REQUIRED | Bounded, no unsupervised infinity (§§31–32) |
| `resourceRequirements` | REQUIRED (MEDIUM+) / OPTIONAL (LIGHT) | Class LIGHT…VERY_HEAVY (§33) |
| `evidenceTypes[] · eventTypes[]` | REQUIRED | §§36–37; undeclared side effects prohibited |
| `costMetadata` | OPTIONAL (REQUIRED for metered/commercial) | No invented prices (§34) |
| `configurationSchema` | OPTIONAL | Namespaced `tools.<id>.*`; MUST NOT bypass policy (§144-rule) |
| `secretRequirements` | OPTIONAL | References only, never raw values (§145-rule; RULES invariant 6) |
| `networkRequirements` | OPTIONAL | Egress needs; default least-egress (§17) |
| `phase` (`introducedPhase` + `enhancedPhases`) | REQUIRED | `WTT-P00–P48`; never `PHASE_UNMAPPED` (§§45/122) |
| `status` | REQUIRED | `PLANNED` (repo inspected, §25-rule) until verified otherwise |

WTT-TOL-MAN-003: Configuration example (CONCEPTUAL — syntax not locked):

```yaml
# CONCEPTUAL
tools:
  browser.playwright: { enabled: true }
  accessibility.axe: { enabled: true }
  security.zap: { enabled: false }
```

WTT-TOL-MAN-004: UX metadata (§134-rule): manifests carry `displayName · shortDescription · category · status · health · risk · runtime · version` for DESIGN §42 surfaces. UI layout rules live in DESIGN.md, never here.

---

## 14. Tool IDs

WTT-TOL-TID-001: Stable ID format `domain.tool` (no versions in IDs; versions in metadata). Canonical tool IDs for sourced tools (normative here; MATRIX must use exactly):

```text
browser.playwright · browser.selenium · browser.webdriverio · browser.cypress · browser.puppeteer ·
browser.nightwatch · browser.testcafe · browser.selenide ·
devtools.cdp · devtools.bidi ·
crawler.playwright · crawler.crawlee · crawler.katana · crawler.scrapy ·
parser.cheerio · parser.beautifulsoup ·
fingerprint.wappalyzer · fingerprint.whatweb · fingerprint.wtt ·
accessibility.axe · accessibility.pa11y ·
performance.lighthouse · performance.lhci · performance.webpagetest · performance.sitespeed ·
visual.playwright · visual.pixelmatch · visual.opencv · visual.percy · visual.applitools · visual.chromatic · visual.backstop ·
load.k6 · load.jmeter · load.gatling · load.locust · load.artillery · load.vegeta · load.wrk · load.hey · load.autocannon ·
net.curl · net.httpie · net.ping · net.traceroute · net.mtr · net.tcpdump · net.tshark · net.netcat · net.iperf ·
proxy.mitmproxy · proxy.fiddler · proxy.charles · proxy.proxyman ·
dns.dig · dns.nslookup · dns.dnsviz ·
tls.openssl · tls.sslyze · tls.testssl ·
security.zap · security.burp · security.nuclei · security.wapiti · security.nikto · security.httpx · security.nmap ·
sast.semgrep · sast.codeql · sast.sonarqube · sast.bandit · sast.spotbugs ·
sca.snyk · sca.trivy · sca.grype · sca.osv · sca.renovate ·
secret.gitleaks · secret.trufflehog · sbom.syft ·
iac.checkov · iac.tfsec · iac.terrascan · iac.kics ·
k8s.kubebench · k8s.kubescape · k8s.polaris ·
db.postgres · db.mysql · db.mariadb · db.mssql · db.oracle · db.mongo · db.redis · db.elastic ·
api.newman · api.bruno · api.insomnia · api.restassured · api.supertest · api.karate · api.tavern · api.hurl ·
contract.pact · contract.scc · contract.openapiDiff · contract.schemathesis · contract.ajv · contract.pydantic · contract.zod · contract.joi ·
mock.wiremock · mock.mockserver · mock.msw · mock.prism · mock.mountebank · mock.hoverfly · mock.mockoon ·
msg.kafka · msg.rabbitmq · msg.nats · msg.redisstreams · msg.mqtt ·
test.vitest · test.jest · test.testinglibrary · test.cypressct · test.pytest · test.hypothesis · test.junit · test.testng ·
email.mailpit · email.mailhog · email.mailtrap · email.smtp4dev · email.greenmail ·
build.npm · build.pnpm · build.yarn · build.bun · build.maven · build.gradle · build.pip · build.poetry · build.uv ·
quality.eslint · quality.biome · quality.tsc · quality.prettier · quality.ruff · quality.pylint · quality.mypy · quality.pyright ·
quality.checkstyle · quality.pmd · quality.spotbugs · quality.errorprone ·
coverage.istanbul · coverage.c8 · coverage.py · coverage.jacoco ·
mutation.stryker · mutation.mutmut · mutation.cosmicray · mutation.pit ·
vcs.git · ci.github · ci.gitlab · ci.jenkins · ci.azure · ci.circle · ci.buildkite · ci.teamcity · ci.bitbucket ·
obs.otel · obs.prometheus · obs.grafana · obs.loki · obs.tempo · obs.jaeger · obs.elastic · obs.sentry · obs.datadog · obs.newrelic ·
queue.bullmq · queue.nats · queue.rabbitmq · queue.kafka · workflow.temporal ·
store.fs · store.minio · store.s3 · store.azureblob · store.gcs ·
secrets.vault · secrets.awssm · secrets.azurekv · secrets.gcp · secrets.k8s · secrets.docker ·
notify.slack · notify.teams · notify.email · notify.webhook ·
mgmt.jira · mgmt.linear · mgmt.azureboards · mgmt.testrail · mgmt.zephyr · mgmt.xray ·
mobile.appium · mobile.maestro · mobile.detox · mobile.espresso · mobile.uiautomator · mobile.xcuitest ·
desktop.electron · desktop.appium · desktop.winappdriver ·
chaos.mesh · data.greatexp · data.soda · data.deequ · data.dbt ·
ml.scikit · ml.tf · ml.torch ·
term.npm · term.node · term.python · term.java · term.curl · term.git · term.docker · term.kubectl · term.terraform · term.aws · term.az · term.gcloud · term.grpcurl · term.psql · term.mysql · term.redismcli · term.mongosh
```

WTT-TOL-TID-002: IDs for prompt-only (unsourced) tools are NOT minted here; they enter via `DECISION_REQUIRED` (§133) and get IDs only after approval. MATRIX `CAPABILITY_GAP`/`UNRESOLVED_MAPPING` rules apply.

## 15. Capability Naming

WTT-TOL-CNM-001: Hierarchical IDs: `domain.action` or `domain.subdomain.action`. Namespaces MUST start from PRD `WTT-TOOL-002` (normative): `target.* · authorization.* · browser.* · devtools.* · crawler.* · discovery.* · technology.* · ui.* · functional.* · visual.* · accessibility.* · api.* · graphql.* · grpc.* · soap.* · websocket.* · messaging.* · contract.* · mock.* · performance.* · load.* · network.* · dns.* · tls.* · security.* · sast.* · sca.* · secret.* · container.* · iac.* · kubernetes.* · database.* · data.* · etl.* · bi.* · email.* · file.* · localization.* · mobile.* · desktop.* · git.* · build.* · cicd.* · deployment.* · cloud.* · logs.* · metrics.* · traces.* · monitoring.* · chaos.* · recovery.* · ai.* · llm.* · rag.* · agent.* · healing.* · rootcause.* · test.* · execution.* · worker.* · artifact.* · finding.* · quality.* · release.* · report.* · dashboard.* · notification.* · integration.* · admin.* · audit.*` — extensible without core changes (ARCH-270).

WTT-TOL-CNM-002: Canonical capability registry by catalog domain (TOOLS-normative IDs; phases from §45/§122; `*` = individually specified in §§46–115):

| Dom | IDs | Namespace(s) | Key capability IDs | Primary tool / strategy | Phase |
|---|---|---|---|---|---|
| A | 1–6 | `target.* · authorization.*` | `target.resolve · target.health · authorization.check · scope.evaluate · env.detect` | NATIVE (Target/Scope managers) | P01/P02 |
| B | 7–24 | `ai.*` | `ai.plan · ai.route · ai.select · ai.explain · ai.budget` | NATIVE orchestrator + provider adapters | P13 |
| C | 25–38 | `tool.*` | `tool.register · tool.resolve · tool.invoke · tool.health` | NATIVE registry/gateway | P08 |
| D | 39–49 | `tool.*` | `tool.protocol.bind (stdio/jsonl · http · grpc · mcp)` | NATIVE bindings | P08 |
| E | 50–72 | `discovery.* · crawler.*` | `discovery.crawl · discovery.routes · discovery.forms · discovery.params` | Playwright/Crawlee/Katana/Scrapy by fit | P09 |
| F | 73–86 | `discovery.*` | `discovery.assets (js/css/media/fonts)` | NATIVE + crawler adapters | P09 |
| G | 87–106 | `technology.*` | `technology.fingerprint · technology.version` | Wappalyzer/WhatWeb-style + WTT DB | P09 |
| H | 107–122 | `graph.*` | `graph.build · graph.query · graph.impact · graph.coverage` | NATIVE graph | P10 |
| I | 123–156 | `browser.*` | `browser.launch · browser.navigate · browser.click · browser.fill · browser.screenshot` | `browser.playwright` (APPROVED) | P06 |
| J | 157–183 | `devtools.*` | `browser.devtools.console.read · browser.devtools.network.read · devtools.trace` | CDP/BiDi/Playwright instrumentation | P07 |
| K | 184–201 | `evidence.*` | `evidence.capture · evidence.correlate · evidence.hash` | NATIVE + browser adapters | P07 |
| L | 202–232 | `functional.* · test.*` | `functional.execute · test.assert · test.rerun` | NATIVE engine + framework adapters | P11 |
| M | 233–241 | `functional.*` | `e2e.execute (driver share P06 / execution P11)` | Playwright-first + project frameworks | P06/P11 |
| N | 242–256 | `test.*` | `test.unit.execute · test.component.execute` | Vitest/Jest/Testing-Library/Cypress-CT | P12 |
| O | 257–269 | `test.*` | `test.python.execute (pytest/hypothesis-class)` | pytest/Hypothesis adapters | P12 |
| P | 270–284 | `test.*` | `test.java.execute (junit/testng-class)` | JUnit/TestNG adapters | P12 |
| Q | 285–307 | `auth.*` | `auth.login.test · auth.session.test · auth.mfa.test · auth.sso.test` | NATIVE flows + browser/API adapters | P16 |
| R | 308–322 | `authz.*` | `authz.matrix.probe · authz.idor.probe (fixture-gated)` | NATIVE probes | P16 |
| S | 323–335 | `api.*` | `api.rest.request · api.rest.schema.validate` | NATIVE HTTP + harness adapters | P17 |
| T | 336–346 | `graphql.*` | `graphql.execute · graphql.schema.validate` | NATIVE + adapters (discovery-gated) | P18 |
| U | 347–363 | `grpc.* · soap.* · websocket.*` | `grpc.invoke · soap.invoke · websocket.test` | grpcurl-class + adapters (gated) | P18 |
| V | 364–373 | `messaging.*` | `messaging.publish · messaging.consume · messaging.dlq` | Broker adapters (POST_V1 depth) | P18 |
| W | 374–388 | `contract.*` | `api.contract.validate · contract.diff · contract.fuzz` | OpenAPI-Diff/Schemathesis/Pact-class | P19 |
| X | 389–393 | `test.*` | `test.property.check` | Hypothesis/Pydantic-class + native | P12/P19 |
| Y | 394–400 | `mock.*` | `mock.serve · mock.fault.inject` | WireMock/MSW/Prism-class | P12/P19 |
| Z | 401–410 | `visual.*` | `visual.capture · visual.compare · visual.baseline` | Playwright capture + pixelmatch-class | P20 |
| AA | 411–430 | `ui.*` | `ui.heuristic.check · ui.friction.analyze` | NATIVE heuristics + vision (P33) | P20 |
| AB | 431–448 | `responsive.*` | `responsive.matrix.test · responsive.issue.locate` | NATIVE + browser matrix | P20 |
| AC | 449–471 | `accessibility.*` | `accessibility.scan · accessibility.node.inspect` | `accessibility.axe` (RECOMMENDED) | P21 |
| AD | 472–479 | `performance.*` | `performance.audit · performance.vitals · performance.budget` | `performance.lighthouse` (RECOMMENDED) | P22 |
| AE–AF | 480–498 | `load.*` | `load.execute · load.distributed.execute` | `load.k6` (RECOMMENDED; P34 POST_V1) | P34 |
| AG | 499–511 | `network.*` | `network.diagnose · network.capture (gated)` | curl/HTTPie/ping/traceroute/mtr/tcpdump-class | P23 |
| AH | 512–518 | `network.*` | `network.proxy.inspect (cert-explicit)` | mitmproxy-class | P23 |
| AI | 519–524 | `dns.*` | `dns.resolve · dns.dnssec.validate` | dig/nslookup/DNSViz-class | P23 |
| AJ | 525–528 | `tls.*` | `tls.chain.validate · tls.config.audit` | OpenSSL/SSLyze/testssl-class | P23 |
| AK | 529–536 | `security.*` | `security.active.dast.scan` | `security.zap` (RECOMMENDED; auth-gated) | P25 |
| AL | 537–551 | `security.*` | `security.passive.headers.scan · security.config.validate` | NATIVE validators + passive adapters | P24 |
| AM–AQ | 552–600 | `sast.* · sca.* · secret.* · sbom.* · container.*` | `sast.scan · sca.scan · secret.scan · sbom.generate · container.scan` | Semgrep/Trivy/Gitleaks/Syft/Trivy (REC.) | P26 |
| AR–AS | 601–627 | `kubernetes.* · cloud.*` | `kubernetes.config.audit · cloud.config.audit (read-first)` | kube-bench/Kubescape/Polaris + cloud validators | P26 |
| AT–AU | 628–639 | `data.*` | `data.deliver.test (webhook/sse) · data.manage (faker-class TBD)` | NATIVE + adapters; generators DECISION_REQUIRED | P28 |
| AV–AX | 640–661 | `localization.*` | `localization.voice.test · consent.validate · persona.apply` | NATIVE validators | P29 |
| AY | 662–667 | `rootcause.*` | `rootcause.hotspot.score` | NATIVE (P31) | P31 |
| AZ–BA | 668–698 | `cms.* · content.*` | `cms.validate · content.assert` | NATIVE packs + adapters | P29 |
| BB | 699–709 | `seo.*` | `seo.signals.check · seo.crawl.validate` | NATIVE + Lighthouse-SEO-class | P29 |
| BI–CB | 710–758 | `data.* · etl.* · bi.*` | `data.quality.check · etl.validate · bi.assert` | Great-Expectations/Soda/deequ/dbt-class | P28 |
| CC–CD | 759–789 | `file.* · payment.*` | `file.assert · payment.sandbox.test (TEST-ONLY)` | NATIVE + sandbox SDKs; vendors DECISION_REQUIRED | P28/P29 |
| CE–CF | 790–821 | `ecommerce.* · privacy.*` | `ecommerce.flow.test · privacy.rights.verify (evidence-only)` | NATIVE packs | P29 |
| CG–CQ | 822–837 | `llm.*` | `llm.app.test · llm.eval.score · llm.output.guard` | Eval harnesses; vendors DECISION_REQUIRED | P41 |
| CH–CR | 838–853 | `agent.* · safety.*` | `agent.trajectory.test · safety.redteam.probe (Exp-gated)` | NATIVE + harnesses; vendors DECISION_REQUIRED | P42 |
| CX | 854–869 | `mobile.* · desktop.*` | `mobile.automate · desktop.automate` | Appium-core + per-OS adapters | P44 |
| BC–BD | 870–900 | `integration.* · email.*` | `integration.connector.invoke · email.capture.assert` | Connector registry + Mailpit-class | P28 |
| BP | 901–908 | `git.*` | `git.diff.read · git.blame.read · git.checkpoint` | NATIVE + git CLI/library | P39 |
| BE–BF | 909–925 | `database.* · storage.*` | `database.query.read · database.schema.inspect` | Native drivers + CLI fallback | P27 |
| BG–BH | 926–939 | `localization.* · feeds.* · trends.*` | `localization.i18n.check · feeds.validate · trends.compute · history.compare` | NATIVE | P29/P31/P36 |
| BS–CM | 940–958 | `secrets.* · notification.* · artifact.* · integration.*` | `secrets.lease · notification.send · artifact.store · mgmt.sync` | Vault/Slack/S3/TestRail-class adapters | P40 |
| BK | 959–970 | `finding.* · rootcause.*` | `finding.normalize · finding.dedup · ai.rootcause.analyze` | NATIVE intelligence | P30 |
| BL | 971–985 | `coverage.*` | `coverage.collect · coverage.aggregate` | Istanbul/c8/pytest-cov/JaCoCo + native | P31/P38 |
| BM | 986–1001 | `verification.* · fix.*` | `verification.execute · fix.patch.generate/apply (P32 rows)` | NATIVE pipeline | P30/P32 |
| BN/BO | 1002–1021 | `healing.*` | `healing.selector.repair · flake.score · test.quarantine` | NATIVE + browser AI | P33 |
| CY | 1022–1027 | `quality.*` | `quality.readiness.check (P48 gates)` | NATIVE | P48 |
| CI–CJ | 1028–1046 | `ai.*` | `ai.select.tests · ai.test.generate` | NATIVE orchestration + providers | P14 |
| CK | 1047–1053 | `ml.*` | `ml.model.eval · ml.drift.check (read/eval-only)` | scikit-learn/TF/PyTorch BYO | P43 |
| BQ–BR | 1054–1078 | `chaos.* · recovery.*` | `chaos.experiment.run (gated) · recovery.drill` | chaos-mesh-class + native blast control | P37 |
| CN | 1079–1089 | `ai.*` | `ai.strategy.learn (governed loops)` | NATIVE (research-bounded) | P32 |
| CO | 1090–1098 | `monitoring.*` | `monitoring.synthetic.run · monitoring.schedule` | Playwright/k6 synthetic workers | P46 |
| BT | 1099–1111 | `logs.* · metrics.* · traces.*` | `obs.collect · obs.query · obs.alert` | OTel + exporter adapters | P36 |
| BU | 1112–1127 | `worker.* · execution.*` | `worker.dispatch · worker.scale · queue.manage` | NATIVE scheduler + BullMQ-class | P35 |
| CP | 1128–1135 | `admin.*` | `admin.org.manage · admin.fleet.view · admin.audit.export` | NATIVE control plane | P47 |
| CS | 1136–1164 | `dashboard.*` | `dashboard.render · dashboard.stream` | NATIVE backend + static app | P05 |
| CT | 1165–1185 | `events.*` | `events.publish · events.replay · events.backfill` | In-proc + PG + Redis Streams | P04 |
| CV/CW | 1186–1206 | `terminal.*` | `terminal.exec · terminal.policy.check` | NATIVE runtime + CLI adapters | P03 |
| CU | 1190–1194 | `cicd.* · release.*` | `cicd.gate.eval · release.verify` | NATIVE gates + CI provider adapters | P39 |
| BW–BZ | 1207–1225 | `build.* · quality.*` | `build.detect · build.execute · quality.gate` | npm/Maven/ESLint/Ruff/Stryker-class | P38 |
| CZ | 1226–1235 | `cost.*` | `cost.meter · cost.route · cost.report` | NATIVE ledger + provider meters | P13/P36 |

WTT-TOL-CNM-003: IDs in §15.2 are TOOLS-normative: `TOOL-MATRIX.md` MUST use them exactly. New namespaces require registry amendment (versioned) + §133 review if they imply new permissions/risk.

## 16. Capability Ownership

WTT-TOL-OWN-001: Owner domains (architecture ownership, never human names): `Platform · Browser · Discovery · Testing · API · Quality (visual/a11y/perf) · Security · Data · AI · RootCause · Remediation · Workers · Observability · Reporting · Integrations · Enterprise`. Each capability row in §15 maps to exactly one owner (§16.2); cross-domain capabilities (e.g., `graph.impact`) designate a primary + consulting owners in the manifest.

WTT-TOL-OWN-002: Ownership map: A→Platform · B/C/D→Platform+AI · E/F/G→Discovery · H→Discovery · I/J/K→Browser · L/M/N/O/P/X→Testing · Q/R→Security+Testing · S/T/U/V/W/Y→API · Z/AA/AB→Quality · AC→Quality · AD→Quality · AE/AF→Quality(load-gated) · AG/AH/AI/AJ→Platform(net) · AK/AL/AM/AN/AO/AP/AQ/AR/AS→Security · AT/AU→Data · AV/AX/BG→Quality(i18n) · AW/CF→Security(privacy) · AY→RootCause · AZ/BA→Testing · BB→Quality · BI/BJ/CB→Data · CC→Testing · CD/CE→Testing(pay-gated) · CG/CQ→AI · CH/CR→AI(safety-gated) · CX→Testing · BC/BD→Data+API · BP→Platform · BE/BF→Data · BH→Observability · BS→Security · BV→Integrations · CL→Platform · CM→Integrations · BK→RootCause · BL→Testing · BM→Remediation · BN/BO→Testing · CY→Platform · CI/CJ→AI · CK→AI · BQ/BR→Testing(chaos-gated) · CN→AI · CO→Observability · BT→Observability · BU→Workers · CP→Enterprise · CS→Platform · CT→Platform · CV/CW→Platform · CU→Reporting · BW/BX/BY/BZ→Testing · CZ→Platform.

---

## 17. Permission Model

WTT-TOL-PRM-001: Tool permission namespace (least-privilege; every tool gets ONLY required permissions):

```text
browser.read · browser.control ·
network.none · network.target · network.target_dependencies · network.external ·
filesystem.project.read · filesystem.project.write · filesystem.artifacts.write · filesystem.temp.write ·
process.execute ·
git.read · git.write ·
database.read · database.write ·
secrets.request ·
cloud.read · cloud.write ·
security.passive · security.active ·
load.execute ·
system.change
```

WTT-TOL-PRM-002: Permission rules: defaults deny (`network.none`, no FS/process/db/secrets unless declared) · `browser.control` implies controlled-context confinement (no host browser profile access) · `network.target` is scope-bound (target + declared deps only; external needs `network.external` + allowlist) · `filesystem.project.write` requires workspace trust (PRD `WTT-AUTHZ-012`) · `git.write` is checkpoint-scoped (remediation only, never push — RULES invariant 18) · `database.write` is fixture-scoped (`SAFE_WRITE` only, §76-rule) · `secrets.request` delivers scoped refs via broker, never values (§112) · `security.active/load.execute/system.change` require authorization + environment eligibility (§§19–21).

WTT-TOL-PRM-003: MATRIX-permission vocabulary maps 1:1: `Network: NONE/TARGET_ONLY/TARGET_AND_DECLARED_DEPENDENCIES/APPROVED_EXTERNAL/…` ← network.* · `Filesystem: NONE/PROJECT_READ/PROJECT_WRITE/ARTIFACT_WRITE/TEMP_WRITE` ← filesystem.* · `Process: NONE/SPAWN_APPROVED/SPAWN_TOOL_ONLY/…` ← process.execute (+ terminal policy §12-source) · `DB: NONE/READ/WRITE_TEST_DATA/…` ← database.* · `Secrets: NONE/SCOPED_SECRET_REF/CREDENTIAL_BROKER` ← secrets.request.

## 18. Risk Model

WTT-TOL-RSK-001: Canonical 9-class risk set (ARCH §53.2, "mapped 1:1 to PRD §13 operation classes"; refined by DESIGN §3.2 — TOOLS adopts exactly):

| Risk class | Meaning | PRD §13 map | Terminal (§62) map | Examples |
|---|---|---|---|---|
| `READ_ONLY` | Observe/inspect; zero mutation | `PASSIVE_INSPECTION` | `READ_ONLY` | fingerprint, headers scan, axe scan, LH audit, TLS check, DB read |
| `SAFE_TEST` | Normal user-equivalent test interactions + safe fixture writes | `FUNCTIONAL_NORMAL` (+ `SAFE_WRITE`-sandboxed) | `SAFE_WRITE` (fixture scope) | navigate/click/fill, API test calls, seeded checkout flows |
| `PROJECT_WRITE` | Local workspace/code/config changes, checkpointed + reversible | `PROJECT_MODIFICATION` | `PROJECT_WRITE` | patch apply, baseline adopt, quarantine, config edit |
| `ACTIVE_NETWORK` | Active network probing below security/load thresholds | (network-active aspect of `FUNCTIONAL_NORMAL` diagnostics) | `ACTIVE_TEST` (net aspect) | port/service probing,websocat-class checks, proxy interception with certs |
| `SECURITY_ACTIVE` | Probing/fuzzing/scanner payloads/auth-bypass attempts | `ACTIVE_SECURITY` | `SECURITY_ACTIVE` | ZAP/Nuclei scans, SAST/SCA reads are NOT here (they are `READ_ONLY`) |
| `LOAD_ACTIVE` | Load/stress/spike/soak beyond smoke thresholds | `LOAD_STRESS` | `ACTIVE_TEST` (load aspect) | k6/JMeter runs above smoke; smoke = `SAFE_TEST` |
| `SYSTEM_CHANGE` | Host/container/cluster/cloud/network/system config change | `SYSTEM_CHANGE` | `SYSTEM_CHANGE` | runner provisioning, K8s job submit, cloud config write |
| `DESTRUCTIVE` | Deletion/destruction/irreversible state/infra mutation | `DESTRUCTIVE` | `DESTRUCTIVE` | DB drop, artifact purge, chaos kill, real-money capture |
| `BLOCKED` | Categorically prohibited in this context | `BLOCKED` | `BLOCKED` | non-scope targets, prod destructive, undeclared class (unknown → `BLOCKED` until declared, ARCH §53.2) |

WTT-TOL-RSK-002: Classification drives: auto-execution eligibility (§19), approval requirements (§19), environment restrictions (§20), audit depth (§38), UX confirmations (DESIGN §71). Denylists beat allowlists. SAST/SCA/secret-scan/SBOM/IaC/K8s-config reads are `READ_ONLY` (source/config reads, not target probing) unless they execute payloads — then `SECURITY_ACTIVE`.

WTT-TOL-RSK-003: Prompt-§17 variance disposition: the 10-item list (`SAFE_TEST` + `SAFE_WRITE` as siblings) is task text; sources define `SAFE_WRITE` as a PRD §13 operation class absorbed into `SAFE_TEST` (fixture scope) + terminal `SAFE_WRITE`. No semantic loss: fixture-scoped writes remain expressible and enforced. NOT a source conflict.

## 19. Automation Policy

WTT-TOL-ATP-001: Every tool MUST declare exactly one automation level:

| Level | Meaning | Typical risk binding |
|---|---|---|
| `AUTO_ALLOWED` | AI/scheduler may invoke freely | `READ_ONLY` (in-scope) |
| `AUTO_ALLOWED_WITH_POLICY` | Auto-invoke iff policy artifact + scope + budget allow | `SAFE_TEST`, `PROJECT_WRITE` (localhost+trust), standing grants |
| `USER_APPROVAL_REQUIRED` | Named human approval per execution (or bounded standing grant) | `ACTIVE_NETWORK`, `SECURITY_ACTIVE` (non-prod), `LOAD_ACTIVE` (non-prod), `PROJECT_WRITE` (shared env) |
| `ADMIN_APPROVAL_REQUIRED` | Elevated/org approval, reasoned + time-boxed | `SECURITY_ACTIVE` (staging), `LOAD_ACTIVE` (staging), `SYSTEM_CHANGE`, `DESTRUCTIVE` (sandboxed) |
| `PROHIBITED` | Default-deny; exceptional break-glass only (Enterprise, audited) | `DESTRUCTIVE` (prod), unscoped active, real-money, prod DB writes |

WTT-TOL-ATP-002: Examples: `browser.screenshot → AUTO_ALLOWED` · project patch → `AUTO_ALLOWED_WITH_POLICY` or `USER_APPROVAL_REQUIRED` (env-dependent) · production stress test → `ADMIN_APPROVAL_REQUIRED` (default-deny; staging needs explicit scope) · destructive system operation → `PROHIBITED` by default. AI CANNOT override authorization (RULES invariant 3); the Policy Engine + scope artifacts dispose (ARCH-460).

## 20. Environment Policy

WTT-TOL-ENV-001: Execution policy MUST distinguish `LOCAL · DEVELOPMENT · QA · STAGING · PRODUCTION` (+ `UNKNOWN_REMOTE` = deny-by-default). Defaults (PRD `WTT-AUTHZ-012`, ARCH-020): production denies `ACTIVE_SECURITY`/`LOAD_STRESS` (beyond passive/smoke)/`DESTRUCTIVE`/`SYSTEM_CHANGE` by default · staging requires explicit scope for the same · localhost still requires workspace trust for `PROJECT_WRITE`.

WTT-TOL-ENV-002: Worked example — ZAP active scan: `LOCAL: possible with policy · STAGING: possible with authorization + scope + caps · PRODUCTION: restricted/explicit-approval (default deny) · UNKNOWN_REMOTE: blocked`. Every `SECURITY_ACTIVE/LOAD_ACTIVE/DESTRUCTIVE/SYSTEM_CHANGE` capability MUST carry this 5-environment row in the MATRIX; missing rows are validation failures.

WTT-TOL-ENV-003: Production-safe reads: `READ_ONLY` capabilities (passive scans, config validation, DB reads, log reads) are `ALLOWED`/`ALLOWED_WITH_POLICY` on production unless the tool exfiltrates data (then §44 governs) or hammers the target (rate-capped as `SAFE_TEST`). No tool is assumed safe everywhere (§19-rule).

## 21. Authorization

WTT-TOL-ATH-001: Tools performing active security, load, stress, write, mutation, or destructive testing MUST declare `requiresAuthorizedTarget: true` (or equivalent manifest flag). Authorization is checked DETERMINISTICALLY by the gateway (`classification × target × scope × environment × policy → allow | approve | deny`, PRD `WTT-AUTHZ-011`); AI cannot override it (RULES invariant 3).

WTT-TOL-ATH-002: Every allow/approve/deny decision MUST be logged with principal, target, classification, scope rule matched, policy version, and evidence pointer (PRD `WTT-AUTHZ-013`). Security-sensitive executions record full audit (§38). Scope artifacts + environment defaults are the enforcement inputs (ARCH-460).

## 22. Installation Model

WTT-TOL-INS-001: Every tool MUST declare exactly one installation mode: `BUILT_IN · MANAGED_INSTALL · PROJECT_DEPENDENCY · SYSTEM_DEPENDENCY · USER_PROVIDED · DOCKER_MANAGED · REMOTE_SERVICE · CLOUD_SERVICE · ENTERPRISE_MANAGED`. (Maps PHASES line-165 tiers: Built-in → `BUILT_IN`; Managed adapter → `MANAGED_INSTALL`; Bring-your-own → `USER_PROVIDED`/`PROJECT_DEPENDENCY`; Remote SaaS → `REMOTE_SERVICE`/`CLOUD_SERVICE`; Enterprise → `ENTERPRISE_MANAGED`.)

WTT-TOL-INS-002: NO SILENT SYSTEM INSTALLATION (PHASES line 165; §185-rule): WTT MUST NOT silently install system packages, Docker, Java, Python, browsers, scanners, or cloud CLIs. Auto-install is permitted ONLY for explicitly safe managed dependencies; NEVER assume `sudo/Administrator/brew/apt/choco` may execute silently. Missing dependency → `TOOL_UNAVAILABLE` with remediation guidance (§32), not a fatal session crash (unless REQUIRED_CORE, §118-rule).

WTT-TOL-INS-003: Mode guidance: `BUILT_IN` = critical lightweight native (CLI, registry, validators) · `MANAGED_INSTALL` = WTT installs/manages pinned versions (Playwright browsers, axe-core, LHCI — with approval policy) · `PROJECT_DEPENDENCY` = detected from target workspace (Vitest/Jest/pytest/JUnit, ESLint/Ruff — never force-installed globally) · `SYSTEM_DEPENDENCY` = pre-existing system tool, detected not installed (git, curl, OpenSSL, psql) · `USER_PROVIDED` = BYO commercial/licensed (Burp, device farms) · `DOCKER_MANAGED` = container fallback ONLY if Docker available/approved (§140-rule: Docker MUST NOT be mandatory for simple local operation) · `REMOTE/CLOUD/ENTERPRISE` = credentialed integrations.

WTT-TOL-INS-004: Updates (§186-rule): consider compatibility, adapter tests, security fixes, breaking changes; NEVER auto-update production toolchains to unknown majors. Locking (§187-rule): projects support `tool lock metadata` (tool + adapter + config fingerprint) for reproducibility where architecture justifies; session records preserve versions regardless (§38).

---

## 23. Discovery

WTT-TOL-DSC-001: Detection mechanisms (manifest-declared, ≥1): `PATH lookup · package metadata · project dependency · configured path · Docker image · service endpoint · MCP registry · plugin registry · cloud configuration`. Discovery MUST NOT imply readiness: `DISCOVERED ≠ READY` — health + version + dependency checks gate `AVAILABLE` (§24/§41-registration).

## 24. Health Model

WTT-TOL-HLT-001: Health states: `UNKNOWN · CHECKING · READY · DEGRADED · UNAVAILABLE · MISCONFIGURED · INCOMPATIBLE · DISABLED`. Checks MAY validate: binary exists · version · dependencies · credentials · network · browser · configuration · licenses. Health MAY be cached briefly; cache MUST carry TTL + source timestamp and MUST NEVER be treated as permanent truth (§150-rule).

WTT-TOL-HLT-002: `wtt tools doctor` workflow (§25-rule; PRD `WTT-CLI-001/009`): probe each registry tool (runtime → binary → version → deps → config → credentials → permissions → network); report `READY/DEGRADED/UNAVAILABLE/...` with remediation hints; exit codes per CLI contract. Missing OPTIONAL tools MUST NOT report as fatal — they report `NOT INSTALLED (optional)` with install guidance. Example shape: `Playwright READY · axe-core READY · Lighthouse READY · ZAP NOT INSTALLED (optional) · k6 NOT INSTALLED (optional) · Python worker READY · Java runtime NOT REQUIRED`.

## 25. Versioning

WTT-TOL-VER-001: Each adapter MUST declare `minimumVersion · maximumTestedVersion · preferredVersion · compatibilityStatus`. Statuses: `SUPPORTED · COMPATIBLE_UNVERIFIED · OUTDATED · TOO_NEW · INCOMPATIBLE · UNKNOWN`. NEVER silently run incompatible tools: `INCOMPATIBLE` → blocked with reason; `COMPATIBLE_UNVERIFIED/OUTDATED/TOO_NEW` → warn + policy decision (allow-with-warning | pin | block). No version numbers invented here — pins land in manifests at implementation (§129-rule).

WTT-TOL-VER-002: Compatibility is tracked against: WTT version · OS · architecture · runtime · browser · external tool version (§138-rule). Tool↔contract compatibility matrix ships with releases (ARCH §64 update discipline).

WTT-TOL-VER-003: Deprecation lifecycle (§137-rule): `ACTIVE → DEPRECATED → REMOVED`. Deprecation MUST specify replacement + reason + removal version/phase if known. Breaking capability changes require major version + migration note (PRD `WTT-TOOL-005`). Replacement design (§136-rule): swapping implementations behind a capability (e.g., `performance.audit`: Lighthouse → future alternative) MUST NOT require rewriting AI orchestration — adapters + normalized outputs absorb the change.

## 26. Dependencies

WTT-TOL-DEP-001: A tool MAY depend on: `runtime · binary · package · browser · database · service · env var · secret · network access · another capability`. Dependencies MUST form a detectable, acyclic graph; loops are registration failures (§41). `dependsOn` uses capability/tool IDs, never prose alone.

WTT-TOL-DEP-002: Capability dependencies (resolver-enforced): `visual.compare` requires `browser.screenshot + artifact.read + baseline.read` · `fix.verify` requires `test.execute + evidence.capture` · `security.active.dast.scan` requires `authorization.check + scope.evaluate` · `load.distributed.execute` requires `worker.dispatch + env.approval`. Unmet REQUIRED deps → `BLOCKED` with reason; unmet OPTIONAL deps → degraded mode with explicit exclusions (§32).

## 27. Tool Selection

WTT-TOL-SEL-001: Selection pipeline (normative; ARCH-270 factors binding):

```text
Capability Request → Available Implementations → Health → Authorization → Permissions
→ Environment → Target Compatibility → Cost → Performance → Preference → Selected Implementation
```

Resolution factors (ARCH-270): capability match → scope/policy eligibility → platform support → health → cost/budget → historical reliability → priority → stable tie-break. Ties break DETERMINISTICALLY and are explainable in plan output (PRD `WTT-TOOL-004`).

WTT-TOL-SEL-002: Selection criteria (ranked inputs): required capability · environment compatibility · health · security policy · project technology (detected stack wins over defaults for project-native runners, §110-rule) · runtime availability · execution cost · historical reliability · execution latency · user preference · organization policy. AI MAY recommend; the deterministic resolver finalizes permitted selection (§30-rule).

WTT-TOL-SEL-003: Routing overlays: **cost-aware** — for equivalent capabilities consider local/free vs licensed vs remote-cost vs latency vs privacy; security + correctness OUTRANK cost (§153-rule) · **privacy-aware** — prefer local processing when external transfer exposes sensitive data unless policy allows (§154-rule) · **AI-aware** — e.g., screenshot semantic analysis may route to local vision model vs remote multimodal vs OpenCV deterministic analysis per capability need (§155-rule).

WTT-TOL-SEL-004: Explainability (§194-rule): retain concise structured rationale per important selection (capability requested → selected + reason → skipped + reasons). NO hidden chain-of-thought stored. Analytics feed future selection: execution count, success/failure/timeout rates, durations, resource use (§151-rule); any reliability score MUST show transparent calculation (§152-rule).

WTT-TOL-SEL-005: Resolution example (normative shape):

```text
Request: performance.audit
Candidates: Lighthouse READY · WebPageTest UNCONFIGURED · SpeedCurve UNCONFIGURED
Policy: LOCAL / STANDARD profile
Result: Lighthouse (default healthy local implementation)
Skipped: WebPageTest — unconfigured · SpeedCurve — commercial not enabled
```

## 28. Fallback

WTT-TOL-FLB-001: Fallback allowed ONLY if: same capability · compatible semantics · allowed permissions · supported environment · healthy. Example: `accessibility.scan`: axe-core unavailable → Pa11y available → fallback allowed. Fallback MUST be visible in session records + plan output + reports (§149 coverage: which implementation executed).

WTT-TOL-FLB-002: Degraded example (normative):

```text
Accessibility: axe-core SUCCEEDED · Pa11y UNAVAILABLE
Capability: SUCCESS · Coverage: PARTIAL / DEFAULT IMPLEMENTATION EXECUTED (profile-dependent)
```

WTT-TOL-FLB-003: No-fallback behavior by criticality: `REQUIRED_CORE` → `BLOCK_RUN` (fail fast with reason) · `REQUIRED_FOR_PROFILE` → `BLOCK_CAPABILITY` · `OPTIONAL` → `DEGRADED_COVERAGE` (§32). Fallback chains MUST be acyclic and policy-checked at each hop (a fallback that needs new authorization re-enters §21, never inherits it).

## 29. Execution Contract

WTT-TOL-EXC-001: Every execution conceptually receives: `executionId · sessionId · capability · toolId · target · environment · input · permissions · timeout · correlationId (+ idempotency key, policy token, budget — ARCH worker contract §15)` and returns: `status · output · evidence · findings · metrics · logs · duration · error`.

WTT-TOL-EXC-002: Execution statuses: `QUEUED · PREPARING · RUNNING · SUCCEEDED · FAILED · CANCELLED · TIMED_OUT · BLOCKED · DEGRADED`. No ambiguous names. `BLOCKED` (policy) is NOT a runtime failure (§32-example); `DEGRADED` carries exclusion lists (§32).

## 30. Execution Lifecycle

WTT-TOL-LIF-001: Lifecycle = §6 states × §29 statuses × §37 events. Every execution is traceable via `sessionId · toolExecutionId · workerId · traceId` (OTel-correlated, PRD `WTT-OBS-001`; §199-rule). Scheduler enforces worker affinity: OS · browser · workspace · Docker · Java · Python · GPU · network · credentials (§200-rule); source-code scanners stay workspace-local (data locality, §201-rule); secrets go ONLY to the execution requiring them (credential locality, §202-rule).

WTT-TOL-LIF-002: Queues support priority, dependencies, parallelism caps, sharding keys, retry/timeout/cancel/resume/checkpoint, DLQ with replay (ARCH §35). Job negotiation is declarative (`capability + requirements`); the scheduler resolves an environment or queues with a visible reason.

## 31. Cancellation

WTT-TOL-CAN-001: Every long-running tool MUST declare `cancellable: true/false`. If cancellable, define: graceful cancellation (drain window + checkpoint) · forced termination (escalation path) · cleanup (temp/process/port release) · artifact preservation (partials salvaged + marked partial). Session cancellation cancels tools where safe; security/load tools MUST stop promptly (§203-rule).

WTT-TOL-CAN-002: CLI signals (PRD `WTT-CLI-050`, ARCH-102): first SIGINT/SIGTERM → graceful shutdown (stop scheduling, drain with timeout, persist, flush evidence); second SIGINT → force-abort with best-effort persistence. Orphan detection after crashes: WTT MUST NOT leave browser processes, load generators, or scanners running unintentionally (§204-rule); WTT may terminate ONLY processes it started — never unrelated user processes (§205-rule). Ports: request/reserve, detect conflicts, NEVER kill unrelated services (§206-rule). Temp: WTT-approved roots only, no boundary traversal, safe cleanup (§207-rule).

## 32. Retry

WTT-TOL-RET-001: Timeouts (§35-rule): every automated execution MUST have default + maximum + configurable-timeout-policy. No infinite execution without supervision. Timeout → `TIMED_OUT` + partials salvaged + retry-per-policy or DLQ.

WTT-TOL-RET-002: Retry policies: `NEVER · TRANSIENT_ONLY · SAFE_IDEMPOTENT · CUSTOM · NOT_APPLICABLE`. NEVER blindly retry: destructive actions · active-security mutations · real payments · DB writes (§36-rule). Retry uses idempotency keys + backoff caps; DLQ replays are explicit + audited.

WTT-TOL-RET-003: Failure taxonomy (TOOLS-defined, decision status `RECOMMENDED` — no `WTT-E-*` taxonomy exists in sources; ARCH errors = §60, resilience = §61):

```text
TOOL_NOT_INSTALLED · TOOL_UNHEALTHY · TOOL_MISCONFIGURED · TOOL_VERSION_UNSUPPORTED ·
TOOL_TIMEOUT · TOOL_CANCELLED · TOOL_RUNTIME_ERROR · TOOL_PERMISSION_DENIED ·
TOOL_SCOPE_BLOCKED · TOOL_RESOURCE_EXHAUSTED · TOOL_POLICY_BLOCKED · TOOL_AUTHZ_MISSING
```

Each maps to: session impact (§28.3) · retry eligibility · UX rendering (DESIGN §68: code + cause + scope + action) · CLI exit-code contribution (infra/tool failure = exit 2; config/scope = 3; auth = 4; partial = 6).

WTT-TOL-RET-004: Partial failure (§148-rule): a single tool failure MUST NOT necessarily fail the session. Example: `Functional PASS · Lighthouse FAILED TO EXECUTE · Accessibility PASS` → overall `DEGRADED COVERAGE`, not false total failure. Reports MUST distinguish per capability: `EXECUTED · NOT_SELECTED · UNAVAILABLE · BLOCKED · UNSUPPORTED · FAILED` (§149-rule); verdicts carry caveats (DESIGN §§45–46); CI exits 6 on partial (PRD §11/ARCH §11).

WTT-TOL-RET-005: Policy-block example (normative — NOT a runtime failure):

```text
Request: security.active.dast.scan · Tool: ZAP · Target: Production
Policy: active security not authorized → Result: BLOCKED_BY_POLICY
```

Tool readiness NEVER overrides authorization (§139-rule).

---

## 33. Resources

WTT-TOL-RES-001: Heavy tools MUST declare approximate needs: CPU · RAM · disk · network · GPU · browser slots. Use classes where exact numbers are premature: `LIGHT · MEDIUM · HEAVY · VERY_HEAVY` (+ `VARIABLE · REMOTE` for MATRIX). Sourced anchors: browser workers are memory/CPU-heavy per context (ARCH §75 bottlenecks); DevTools event volume, artifact bandwidth, model rate limits are instrumented with quotas + backpressure.

WTT-TOL-RES-002: Scheduler affinity (§200-rule): jobs declare requirements (OS, browser, workspace, Docker, Java, Python, GPU, network, credentials); the scheduler MUST enforce compatibility or queue with a visible reason. Workspace-local tools (source scanners, remediation) MUST NOT dispatch to workers without the workspace (§201-rule).

## 34. Cost

WTT-TOL-CST-001: Cost classes: `FREE_LOCAL · OPEN_SOURCE (compute-only) · COMPUTE_COST · API_COST · LICENSED · COMMERCIAL_SAAS · ENTERPRISE_LICENSE` (+ MATRIX `VARIABLE/UNKNOWN`). Track cost metadata where possible (tokens, calls, license seats, metered units); NEVER invent prices. Domain CZ (Cost/Resource Intelligence, P13/P36) owns metering/routing/reporting.

WTT-TOL-CST-002: Cost-aware routing (§153-rule): for equivalent capabilities the resolver MAY consider local/free vs licensed vs remote-cost vs latency vs privacy — security + correctness OUTRANK cost. Budgets are policy inputs (§27); spend-so-far is surfaced (DESIGN §§15–16, §41).

## 35. Output Normalization

WTT-TOL-NRM-001: External output MUST transform into canonical WTT structures; vendor formats are NEVER authoritative internal state (§39-rule). Pipeline: `Vendor Result → Adapter → WTT Raw* → Normalizer → Canonical (Finding/Metric/Result)`. Canonical output types: `TestResult · RawFinding · Metric · Evidence · Artifact · DiscoveryResult · TechnologyFingerprint · PerformanceResult · AccessibilityResult · SecurityResult · APIResult · DatabaseResult · ToolDiagnostic` (+ `PatchResult · VerificationResult · ReportResult` for MATRIX completeness). Schema ownership stays with ARCH/contracts; TOOLS defines producer mapping obligations.

WTT-TOL-NRM-002: Confidence semantics (§195-rule): `rule certainty` (deterministic check outcome) ≠ `tool confidence` (engine-reported reliability) ≠ `AI confidence` (model judgment 0–1 + rationale). Adapters MUST preserve the distinction; normalization MUST NOT launder AI guesses as measurements. Severity mapping (§196-rule): `vendor severity → adapter mapper → WTT severity (critical/high/medium/low/info, PRD WTT-FND-004 Proposed)` with transparent inputs; incompatible vendor scales are NEVER exposed directly.

WTT-TOL-NRM-003: External reports are ARTIFACTS, never canonical truth (§197-rule). WTT canonical report (PRD `WTT-REP-001` formats) is generated from the canonical result model; tool-native reports attach as evidence (ARCH §51.3).

## 36. Evidence

WTT-TOL-EVD-001: Canonical evidence types (every tool lists what it can create): `SCREENSHOT · ELEMENT_SCREENSHOT · VIDEO · HAR · TRACE · DOM · ACCESSIBILITY_TREE · CONSOLE · NETWORK · REQUEST · RESPONSE · LOG · METRIC · DATABASE_QUERY · DATABASE_RESULT · SOURCE_REFERENCE · GIT_DIFF · FILE · REPORT`.

WTT-TOL-EVD-002: Evidence metadata MUST include: `artifactId · sessionId · executionId · testId? · findingId? · toolId · timestamp · URL/target · hash · storageReference`. Large outputs (HAR, video, trace, heap snapshots, large reports) MUST be written as artifacts with REFERENCES returned — never passed through queue/event JSON (§146-rule; RULES invariant 20). Retention is governed by WTT policy, not external-tool defaults (§208-rule).

## 37. Events

WTT-TOL-EVT-001: Standard tool lifecycle events: `tool.queued · tool.preparing · tool.started · tool.progress · tool.completed · tool.failed · tool.cancelled · tool.timeout · tool.health.changed`. Tool-specific extensions MUST be namespaced (`tool.<id>.<event>`). Events are versioned, redacted, idempotent (ARCH §10); envelope + consumer contracts MUST NOT change across transports (ARCH-350).

## 38. Audit

WTT-TOL-ADT-001: Security-sensitive executions MUST record: requestor (who/what) · tool · capability · target · environment · scope · permissions · authorization decision · start · end · result (§44-rule; PRD `WTT-AUTHZ-013` fields). Session records preserve `tool ID · tool version · adapter version · configuration fingerprint` for historical reproducibility (§161-rule); unregistration MUST NOT destroy historical execution records — past sessions stay readable (§160-rule).

## 39. Logging

WTT-TOL-LOG-001: Tool output routes into structured logging (OTel-correlated). NEVER expose secrets; auto-redact: `Authorization · Cookie · Set-Cookie · API keys · passwords · tokens · private keys · DB connection strings` (§45-rule; RULES invariant 6). Redaction is explicit (`••••`/`[REDACTED:<class>]`, DESIGN §76), never silent gaps.

## 40. Sandboxing

WTT-TOL-SBX-001: Risky/external tools run with appropriate isolation: `process boundary · filesystem sandbox · network boundary · container · remote worker` — selected by risk class (§46-rule): `READ_ONLY/SAFE_TEST` → process + FS/network boundaries · `ACTIVE_NETWORK/SECURITY_ACTIVE/LOAD_ACTIVE` → hardened boundaries + caps + prompt kill · `SYSTEM_CHANGE/DESTRUCTIVE` → strongest isolation + approvals (§19). Terminal controls (allowlists, denylists-win, workspace/FS/network boundaries, resource limits, timeouts, process isolation, env filtering, audit — PRD `WTT-TSEC-002`) apply to terminal-mediated tools.

## 41. Plugin Security

WTT-TOL-PLG-001: Plugins are executable code. Require where appropriate: `publisher/source · version · checksum · signature · permissions · risk · supported WTT version · health` (PRD `WTT-TOOL-015`: provenance recorded; unsigned/untrusted installable ONLY under explicit policy with warnings). Support `disable · quarantine · remove` at runtime without core rewrites.

WTT-TOL-PLG-002: Registry source (§157-rule, `RECOMMENDED`): HYBRID — code-defined core manifests + manifest-defined built-ins (version-controlled, §158-rule) + database-backed runtime state + plugin-discovered externals. NEVER an unversioned mutable registry: every registration is versioned, validated, and auditable.

WTT-TOL-PLG-003: Registration flow (normative): `Manifest Loaded → Schema Validated → Compatibility Checked → Permissions Registered → Capabilities Indexed → Health Check → AVAILABLE`. External plugin manifests MUST validate before registration (§158-rule). Dependency loops, permission overreach, and risk/phase gaps fail registration with reasons.

WTT-TOL-PLG-004: Security review triggers (§141-rule): explicit review REQUIRED when adding a tool that can execute shell · write files · read source code · access secrets · actively scan · load test · write databases · modify Git · access cloud infra · send external data. Supply-chain review (§142-rule): maintainer · release activity · license · known vulns · install mechanism · checksum/signature · dependency tree · distribution rights. License classes (§143-rule): `OPEN_SOURCE · COMMERCIAL · DUAL_LICENSE · ENTERPRISE · UNKNOWN` — NEVER assume redistributability from downloadability.

## 42. MCP

WTT-TOL-MCP-001: MCP flow: `WTT Capability → MCP Adapter → MCP Server`. MCP server ≠ trusted: MCP tools still require capability mapping, permissions, risk, scope validation, manifest, audit (§48-rule). MCP transport is one `tool.protocol.bind` option (domain D), NOT a bypass around the registry/resolver/policy.

WTT-TOL-MCP-002: Release status: MCP server is explicitly NOT V1-mandatory (ARCH line 1451) and ENTERPRISE-gated (PRD `WTT-V1-005`, partner adapters). V1 MCP scope = none (`APPROVED` exclusion). Enterprise MCP scope (which servers, which capabilities, signing/attestation) = `DECISION_REQUIRED` (`TOL-OD-003`).

## 43. Remote Services

WTT-TOL-REM-001: For SaaS/cloud tools record: provider · endpoint · authentication · data sent externally · data retained externally (if known/configured) · rate limits · cost · availability · fallback (§49-rule). Commercial-integration DoD (§168-rule): authentication · rate limits · cost handling · privacy handling · network-failure handling · API-version handling · permission mapping (§130).

WTT-TOL-REM-002: Cloud policy (§214-rule): cloud write operations separately authorized; assessment defaults read-first (`cloud.read` before `cloud.write`; `CLOUD_WRITE` capabilities need `ADMIN_APPROVAL_REQUIRED` by default). Local-first operation MUST remain possible without any cloud tool (RULES invariant 22; ARCH §65).

## 44. Data Privacy

WTT-TOL-PRV-001: Every external tool MUST specify data that may leave WTT: `NONE · METADATA_ONLY · URLS · SOURCE_CODE · SCREENSHOTS · NETWORK_DATA · USER_DATA · SECRETS_PROHIBITED · CUSTOM`. AI/provider integrations need special attention (§215-rule): record capabilities · privacy · model limits · structured output · tool calling · vision · cost · latency. NEVER hard-code to one provider (ARCH: ≥2 model routes incl. local-compatible, §65).

WTT-TOL-PRV-002: Secrets are `PROHIBITED` from general external transfer; privacy-aware routing prefers local processing for sensitive data unless policy explicitly allows external processing (§154-rule). MATRIX data-externalization rows are mandatory for every `REMOTE_SERVICE/COMMERCIAL/ENTERPRISE` tool.

---

## 45. Global Catalog

WTT-TOL-CAT-001: The authoritative catalog structure is `PHASES.md` §70: **104 domains (A–CZ), capability IDs 1–1235 contiguous**. Normalized below with primary phase + implementation strategy. Capability detail within each range is owned by the listed phase; row-level (1–1235) verification awaits the standalone catalog (`PHZ-OD-010` → `TOL-OD-001`).

### 45.1 Catalog variance note (prompt §51 vs actual source)

WTT-TOL-CAT-002: This prompt's §51 domain sketch (e.g., `AT=Database`, `BB=Mobile`, `CL=Orchestration`) DOES NOT match the actual catalog (actual: `BE=Database Testing`, `CX=Mobile & Desktop`, `CL=Artifact Storage`, etc.). Per the prompt's own rule ("If the actual catalog contains different identifiers or additional domains: use the source"), this document normalizes the ACTUAL catalog below. NOT a source conflict — task text defers to source by its own terms.

### 45.2 Domain registry (actual, from PHASES §70)

| Dom | IDs | Domain | Primary phase | Strategy |
|---|---|---|---|---|
| A | 1–6 | WTT Core Runtime | P01/P02 | NATIVE |
| B | 7–24 | AI Orchestration | P13 | NATIVE + provider adapters |
| C–D | 25–49 | Tool Platform + Integration Protocols | P08 | NATIVE |
| E–G | 50–106 | Website/Asset Discovery + Fingerprinting | P09 | NATIVE + crawler/fingerprint adapters |
| H | 107–122 | Application Intelligence Graphs | P10 | NATIVE |
| I | 123–156 | Browser Automation | P06 | NATIVE ports + Playwright-first adapters |
| J–K | 157–201 | Browser DevTools + Evidence | P07 | NATIVE + CDP/BiDi bindings |
| L–M | 202–241 | Functional + E2E Testing | P11 (M shares P06/P11) | NATIVE engine + framework adapters |
| N–P | 242–284 | Unit/Component + Python + Java Testing | P12 | Project-native adapters + native normalization |
| Q–R | 285–322 | Authentication + Authorization | P16 | NATIVE probes + flow adapters |
| S–V | 323–373 | REST + GraphQL + gRPC/SOAP/Realtime + Messaging | P17/P18 | NATIVE HTTP + harness adapters |
| W–Y | 374–400 | Contracts/Schemas + Property + Mocking | P19 (X/Y foundations P12) | Adapter-class + native orchestration |
| Z–AB | 401–448 | Visual + UI/UX + Responsive | P20 | NATIVE + capture/diff adapters |
| AC | 449–471 | Accessibility | P21 | axe-class adapters + native AX-tree |
| AD | 472–479 | Web Performance | P22 | Lighthouse-class adapters + native budgets |
| AE–AF | 480–498 | Load & Stress + HTTP Load | P34 | k6-class adapters, gated |
| AG–AJ | 499–528 | Network + Proxy + DNS + TLS | P23 | CLI-class adapters + native enforcement |
| AK | 529–536 | Defensive Security (DAST) | P25 | ZAP-class adapters, auth-gated |
| AL | 537–551 | Security Configuration | P24 | NATIVE validators + passive adapters |
| AM–AQ | 552–600 | SAST + SCA + Secrets + SBOM + Container/Infra | P26 | Semgrep/Trivy/Gitleaks/Syft-class |
| AR–AS | 601–627 | Kubernetes + Cloud Security | P26 | kube-bench/Kubescape/Polaris + validators |
| AT–AU | 628–639 | Webhook/SSE Delivery + Test Data Mgmt | P28 | NATIVE + adapters; generators TBD |
| AV–AX | 640–661 | Localization Voice + Consent + Personas | P29 | NATIVE validators |
| AY | 662–667 | Risk Hotspots | P31 | NATIVE |
| AZ–BA | 668–698 | CMS + Content Testing | P29 | NATIVE packs + adapters |
| BB | 699–709 | SEO | P29 (basics V1-selected) | NATIVE + LH-SEO-class |
| BI–CB | 710–758 | Data Quality + ETL + BI | P28 | GE/Soda/deequ/dbt/BI-client-class |
| CC–CD | 759–789 | File/Media + Payment Testing | P28/P29 | NATIVE + sandbox SDKs (TEST-ONLY pay) |
| CE–CF | 790–821 | E-Commerce + Privacy/Rights | P29 | NATIVE packs (evidence-only privacy) |
| CG–CQ | 822–837 | LLM App Testing + Eval/Output Safety | P41 | NATIVE + eval harnesses (vendors TBD) |
| CH–CR | 838–853 | AI Agent/Trajectory + AI Safety | P42 | NATIVE + harnesses (red-team Exp-gated) |
| CX | 854–869 | Mobile & Desktop Extension | P44 | Appium-core + per-OS adapters |
| BC–BD | 870–900 | Integration Connectors + Email | P28 | Connector registry + Mailpit-class |
| BP | 901–908 | Git & Version Control | P39 | NATIVE + git CLI/library |
| BE–BF | 909–925 | Database + Storage Testing | P27 | Native drivers + CLI fallback |
| BG–BH | 926–939 | i18n + Feeds + Trends + History | P29/P31/P36 | NATIVE |
| BS–CM | 940–958 | Secrets Mgmt + Notifications + Artifact Store + Work Mgmt | P40 | Vault/Slack/S3/TestRail-class |
| BK | 959–970 | Root-Cause & Finding Intelligence | P30 | NATIVE |
| BL | 971–985 | Code Coverage | P31 (collect P38) | Adapters + native aggregation |
| BM | 986–1001 | Fix Verification | P30 verify / P32 gen-apply | NATIVE pipeline |
| BN/BO | 1002–1021 | Self-Healing + Resilience/Flake | P33 | NATIVE + browser AI |
| CY | 1022–1027 | Hardening & GA Readiness | P48 | NATIVE gates |
| CI–CJ | 1028–1046 | Test Selection + AI Generation | P14 | NATIVE + providers |
| CK | 1047–1053 | Machine Learning Testing | P43 | scikit/TF/Torch BYO (eval-only) |
| BQ–BR | 1054–1078 | Chaos/Resilience + Envs/DR | P37 | chaos-mesh-class + native blast control |
| CN | 1079–1089 | Learning & Strategy Improvement | P32 | NATIVE (research-bounded) |
| CO | 1090–1098 | Continuous/Synthetic Monitoring | P46 | Playwright/k6 synthetic workers |
| BT | 1099–1111 | Monitoring & Observability | P36 | OTel + exporter adapters |
| BU | 1112–1127 | Distributed Execution | P35 | NATIVE scheduler + BullMQ-class |
| CP | 1128–1135 | Enterprise Control Plane | P47 | NATIVE |
| CS | 1136–1164 | WTT Live Dashboard | P05 | NATIVE |
| CT | 1165–1185 | Real-Time Event System | P04 | In-proc + PG + Redis Streams |
| CV/CW | 1186–1206 | Terminal Runtime + Safety | P03 | NATIVE + CLI adapters |
| CU | 1190–1194 | CI / Release Core | P39 | NATIVE gates + CI adapters |
| BW–BZ | 1207–1225 | Build + Code Quality + Deps + Supply Ops | P38 | npm/ESLint/Stryker/renovate-class |
| CZ | 1226–1235 | Cost / Resource Intelligence | P13/P36 | NATIVE ledger + meters |

WTT-TOL-CAT-003: Coverage accounting: every ID in 1–1235 falls in exactly one row above (ranges verified contiguous against PHASES §70: 1–6, 7–24, 25–49, 50–106, 107–122, 123–201, 202–241, 242–284, 285–322, 323–373, 374–400, 401–448, 449–471, 472–479, 480–498, 499–528, 529–536, 537–551, 552–600, 601–627, 628–639, 640–661, 662–667, 668–698, 699–709, 710–758, 759–789, 790–821, 822–837, 838–853, 854–869, 870–900, 901–908, 909–925, 926–939, 940–958, 959–970, 971–985, 986–1001, 1002–1021, 1022–1027, 1028–1046, 1047–1053, 1054–1078, 1079–1089, 1090–1098, 1099–1111, 1112–1127, 1128–1135, 1136–1164, 1165–1185, 1186–1206, 1207–1225, 1226–1235). Mapped = 1235 · Unmapped = 0 (§132). Individually-specified rows (unique security/runtime behavior) are marked `*` in §§46–115.

## 46. Native WTT Systems

WTT-TOL-NAT-001: Systems WTT owns directly (evaluated against ARCH module ownership — all confirmed native; no blind declarations):

| System | Capabilities | Phase | Runtime (REC.) | Risk | Status |
|---|---|---|---|---|---|
| WTT CLI | `terminal.*` surface, `wtt <URL>`, machine output | P03 | TS/Node `NATIVE_BINARY` (npm pkg) | Varies (gated) | PLANNED |
| Target Manager | `target.resolve/health`, env detect | P01/P02 | NODE_IN_PROCESS | READ_ONLY | PLANNED |
| Authorization & Scope Manager | `authorization.check`, `scope.evaluate` | P02 | NODE_IN_PROCESS | READ_ONLY (decides for all) | PLANNED |
| Session Manager | session lifecycle, checkpoints, resume | P04 (model P01) | NODE + PG/Redis | SAFE_TEST | PLANNED |
| Environment Detector | env classification + trust | P02 | NODE_IN_PROCESS | READ_ONLY | PLANNED |
| AI Orchestrator | `ai.plan/route/explain/budget` | P13 | NODE + provider adapters | READ_ONLY (plans; execution gated) | PLANNED |
| Capability Router / Execution Planner | plan → jobs, dry-run | P13 | NODE_IN_PROCESS | READ_ONLY | PLANNED |
| Capability Registry + Tool Registry + Resolver | `tool.register/resolve/invoke` | P08 | NODE + PG | READ_ONLY | PLANNED |
| Tool Health Manager + Permission Manager + Audit | health, grants, audit trail | P08/P04 | NODE + PG | READ_ONLY | PLANNED |
| Application Graph | `graph.build/query/impact/coverage` | P10 | NODE + PG/JSONB | READ_ONLY | PLANNED |
| Finding Normalizer + Deduplicator | `finding.normalize/dedup` | P30 | NODE_WORKER | READ_ONLY | PLANNED |
| Evidence Correlator + Integrity | `evidence.correlate/hash/verify` | P07/P30 | NODE + artifact store | READ_ONLY | PLANNED |
| Root Cause Coordinator | `ai.rootcause.analyze`, hypothesis rank | P30/P31 | NODE + PYTHON_WORKER (analysis) | READ_ONLY | PLANNED |
| Code Context Resolver + Change Impact Engine | targeted context, impact sets | P31 | NODE + lang analyzers | READ_ONLY (+git.read) | PLANNED |
| Remediation Controller | `fix.patch.*`, checkpoint/apply/rollback | P32 | NODE_CHILD_PROCESS + git | PROJECT_WRITE (gated) | PLANNED |
| Verification Controller | `verification.execute` | P30/P32 | Orchestrates re-executions | Varies (re-runs) | PLANNED |
| Quality Gate Engine | `cicd.gate.eval`, deterministic verdicts | P39 (display P30) | NODE_IN_PROCESS | READ_ONLY | PLANNED |
| Event System | `events.publish/replay/backfill` | P04 | In-proc + PG + Redis Streams | READ_ONLY | PLANNED |
| Dashboard Backend | `dashboard.render/stream`, WS/SSE | P05 | TS (Fastify-class TBD `TOL-OD-004`) | READ_ONLY | PLANNED |

WTT-TOL-NAT-002: Native DoD per §130; native systems are `TIER_0_NATIVE_CORE`, `BUILT_IN`, cross-platform by construction (ARCH-020), `STATUS_NOT_VERIFIED`→`PLANNED` (repo inspected, no code).

---

## 47. Browser Tools

WTT-TOL-BRS-001: Default engine: **Playwright** — `APPROVED` (PRD `WTT-BRW-001` MUST Playwright-first; ARCH-160 V1 implementation; ADR-005; ARCH §78 `RECOMMENDED`). All automation flows through `BrowserDriver` ports; no orchestrator/agent imports engine SDKs (ARCH-160, RULES `WTT-RULE-BRW-001`).

| Tool | Type / Tier | Capabilities | Lang · Runtime (decision) | Install | Phase · Release | Risk · Auth · Prod | Notes |
|---|---|---|---|---|---|---|---|
| Playwright* | ADAPTER / T1 | `browser.*` (launch/navigate/act/observe/evidence) | TS · NODE_CHILD_PROCESS (REC.) | MANAGED_INSTALL (browsers pinned) | P06 · V1_CORE | SAFE_TEST · COND · POLICY | Default; per-capability choice, not dogma |
| Selenium | ADAPTER / T2 | `browser.*` subset | TS/Java · CHILD/GRID (REC.) | USER_PROVIDED | P06+ · POST_V1 | SAFE_TEST · COND · POLICY | Grid/enterprise seam |
| WebdriverIO | ADAPTER / T2 | `browser.*` subset | TS · NODE_CHILD_PROCESS (REC.) | PROJECT_DEPENDENCY | P06+ · POST_V1 | SAFE_TEST · COND · POLICY | WDIO projects |
| Cypress | ADAPTER / T2 | `browser.*` + component (P12) | TS · NATIVE_BINARY (REC.) | PROJECT_DEPENDENCY | P11/P12 · V1_OPT | SAFE_TEST · COND · POLICY | Project-native execution |
| Puppeteer | ADAPTER / T2 | `browser.*` Chromium-depth | TS · NODE_CHILD_PROCESS (REC.) | MANAGED/PROJECT | P06+ · POST_V1 | SAFE_TEST · COND · POLICY | CDP-depth alternate |
| Nightwatch/TestCafe/Selenide | ADAPTER / T2–T3 seams | `browser.*` (seam only) | Per-ecosystem (DEC_REQ) | USER_PROVIDED | P06+ · POST_V1 | SAFE_TEST · COND · POLICY | Seams per PHASES P06, not V1 |
| Remote grids (Stack/Sauce/Lambda) | COMMERCIAL / T3 | `browser.*` remote | N/A (REC.) | REMOTE_SERVICE | Post-P06 · POST_V1/ENT | SAFE_TEST · YES · POLICY | Proposed (PRD `WTT-WRK-005`) |

## 48. DevTools

WTT-TOL-DVT-001: Protocol-vs-executable: CDP / WebDriver BiDi are PROTOCOLS (contracts, §7); executables are browser binaries + `DevToolsBridge` (ARCH: CDP/BiDi/Playwright-instrumentation → WTT events). Capabilities: `browser.devtools.console.read · browser.devtools.network.read · devtools.trace · devtools.coverage`.

| Binding | Type / Tier | Lang · Runtime | Phase · Release | Notes |
|---|---|---|---|---|
| CDP binding* | NATIVE (bridge) / T0 | TS · NODE (REC.) | P07 · V1_CORE | Primary depth (Playwright + CDP) |
| WebDriver BiDi binding | NATIVE (bridge) / T0 | TS · NODE (REC.) | P07 · V1_CORE | Standards-track; Firefox/WebKit path |
| Playwright instrumentation | ADAPTER / T1 | TS · NODE_CHILD_PROCESS (REC.) | P06/P07 · V1_CORE | Tracing/video/HAR/console capture |
| Browser-native telemetry | ADAPTER / T2 | TS · BROWSER_RUNTIME (REC.) | P07 · V1_OPT | Perf APIs, Web Vitals lib |

## 49. Discovery

WTT-TOL-DCV-001: Engines MAY include Playwright, Crawlee, Katana, Puppeteer, Selenium, Scrapy, Cheerio, BS4 — selected by fit: JS rendering vs raw fetch vs scale (PRD `WTT-DSC-003`, `OPTIONAL` candidates). Discovery MUST deduplicate across engines into one map. Primary-crawler combination = `DECISION_REQUIRED` (`TOL-OD-005`); no single default approved.

| Tool | Type / Tier | Fit (non-equivalent) | Lang · Runtime | Install | Phase · Release | Risk |
|---|---|---|---|---|---|---|
| Playwright discovery* | ADAPTER / T1 | JS-rendered SPA crawl (shares browser pool) | TS · NODE_CHILD_PROCESS (REC.) | MANAGED_INSTALL | P09 · V1_CORE | READ_ONLY (+SAFE_TEST nav) |
| Crawlee | ADAPTER / T2 | High-scale programmable crawl | TS · NODE (REC.) | MANAGED/PROJECT | P09 · V1_OPT/POST_V1 | READ_ONLY |
| Katana | ADAPTER / T2 | High-speed raw crawl | N/A binary · NATIVE_BINARY (REC.) | MANAGED/USER | P09 · V1_OPT/POST_V1 | READ_ONLY (rate-capped) |
| Scrapy | ADAPTER / T2 | Python crawl ecosystem | Python · PYTHON_SUBPROCESS (REC.) | MANAGED/PROJECT | P09 · POST_V1 | READ_ONLY |
| Cheerio / BS4 | ADAPTER / T2 | HTML parsing (not crawlers) | TS / Python (REC.) | PROJECT_DEPENDENCY | P09 · V1_CORE(support) | READ_ONLY |
| Wappalyzer/WhatWeb-style + HTTP fingerprint + WTT DB | ADAPTER+NATIVE / T1–T2 | Fingerprinting (PRD `WTT-FPR-002`) | TS · NODE (REC.) | BUILT_IN/MANAGED | P09 · V1_CORE | READ_ONLY (passive first) |

## 50. Functional/E2E

WTT-TOL-E2E-001: WTT MUST NOT execute every framework; support project-detection + adapters (§56-rule). Native functional engine (P11) + E2E driver share (P06) + project-framework adapters.

| Tool | Type / Tier | Role | Install | Phase · Release | Notes |
|---|---|---|---|---|---|
| WTT functional engine* | NATIVE / T0 | Default `functional.execute` | BUILT_IN | P11 · V1_CORE | Steps/assertions/oracles/evidence |
| Playwright Test | ADAPTER / T1 | Project-native E2E | PROJECT_DEPENDENCY | P11 · V1_CORE(support) | Detected, not forced |
| Cypress/Selenium/WebdriverIO | ADAPTER / T2 | Project-native E2E | PROJECT_DEPENDENCY | P11 · V1_OPT/POST_V1 | Detected per project |
| Cucumber/Robot/Serenity/Karate-UI | — | UNSOURCED | — | — | `DECISION_REQUIRED` (`TOL-OD-006`); no PRD/ARCH/PHASES mention |
| Gherkin/BDD runners (generic) | ADAPTER (class) / T2 | `test.bdd.execute` (P12 scope) | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | Class-level; vendors TBD |

## 51. Unit/Component

WTT-TOL-UNT-001: Project-native, adapter-executed, NOT globally installed (§57-rule): detect from target workspace; normalize results + verdict mapping natively (PHASES P12).

| Tool | Type / Tier | Install | Phase · Release | Notes |
|---|---|---|---|---|
| Vitest / Jest* | ADAPTER / T1 | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | PHASES TIER-1 + P00 toolchain |
| Testing Library / Cypress-CT | ADAPTER / T2 | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | PHASES P12 |
| Mocha/Jasmine/AVA/Node-runner/RTL/Vue/Angular/Storybook | — | — | — | UNSOURCED → `DECISION_REQUIRED` (`TOL-OD-006`) |

## 52. Python Testing

WTT-TOL-PYT-001: Target-project/testing-ecosystem integrations, NOT necessarily WTT internal deps (§58-rule). WTT internal Python = FastAPI+Pydantic+pytest workers (PRD §73 Proposed).

| Tool | Type / Tier | Install | Phase · Release | Notes |
|---|---|---|---|---|
| pytest* | ADAPTER / T1 | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | TIER-1; also WTT worker tests |
| Hypothesis* | ADAPTER / T2 | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | Property tests (domain X foundations) |
| unittest/tox/nox/Behave/HTTPX/Requests/pytest-plugins | — | — | — | UNSOURCED → `DECISION_REQUIRED` (`TOL-OD-006`) |

## 53. Java Testing

WTT-TOL-JVT-001: Java enters ONLY where justified (ARCH: opt-in JAR/container; NOT V1 for lightweight jobs).

| Tool | Type / Tier | Install | Phase · Release | Notes |
|---|---|---|---|---|
| JUnit / TestNG* | ADAPTER / T2 | PROJECT_DEPENDENCY | P12 · V1_CORE(support) | PHASES P00/P12 |
| REST Assured / Karate / WireMock / Testcontainers / Gatling | (see §§54/58/62) | Per family | Per family | Cross-listed, not duplicated |
| AssertJ/Hamcrest/Mockito/Selenide-java/Cucumber-JVM/Serenity/Awaitility | — | — | — | UNSOURCED (Selenide: seam only, P06) → `TOL-OD-006` |

## 54. API

WTT-TOL-API-001: WTT-native HTTP capability + adapters; GUI API clients are NEVER runtime requirements (§60-rule). Adapters MAY include Postman/Newman, Bruno, Insomnia, REST Assured, SuperTest, Karate, Tavern, Hurl, curl, HTTPie (PRD `WTT-API-003`).

| Tool | Type / Tier | Role | Lang · Runtime (REC.) | Install | Phase · Release | Risk |
|---|---|---|---|---|---|---|
| WTT native HTTP* | NATIVE / T0 | Default `api.rest.request` | TS · NODE (REC.) | BUILT_IN | P17 · V1_CORE | SAFE_TEST (reads RO) |
| curl / HTTPie* | ADAPTER / T1–T2 | CLI fallback + diagnostics | N/A · NATIVE_BINARY (REC.) | SYSTEM/MANAGED | P17/P23 · V1_CORE | SAFE_TEST |
| Newman/Bruno/SuperTest/Karate/Hurl* | ADAPTER / T2 | Harness adapters (Karate/Hurl V1_OPT per `WTT-V1-003`) | Per-harness (REC.) | PROJECT/MANAGED | P17 · V1_OPT/POST_V1 | SAFE_TEST |
| REST Assured / Tavern | ADAPTER / T2 | JVM/Python harness | Java/Python (REC.) | PROJECT_DEPENDENCY | P17 · POST_V1 | SAFE_TEST |
| Postman GUI / Insomnia GUI | — | NOT runtime integrations | N/A | N/A | — | Collections import only (DEC_REQ format scope) |
| Hoppscotch | — | UNSOURCED | — | — | — | `TOL-OD-006` |

## 55. GraphQL

WTT-TOL-GQL-001: NATIVE GraphQL execution where justified + adapters; depth is V1_OPTIONAL (PRD `WTT-V1-003`: WebSocket/GraphQL depth) and discovery-gated.

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| WTT GraphQL executor* | NATIVE / T0 | P18 · V1_OPT | `graphql.execute/schema.validate`, TS (REC.) |
| GraphQL Inspector / Apollo / GraphiQL | — | — | UNSOURCED → `TOL-OD-006` |

## 56. gRPC/SOAP

WTT-TOL-GRP-001: Discovery-gated (P18); SOAP/gRPC depth POST_V1 except where discovered + V1_OPT.

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| grpcurl* | ADAPTER / T2 | P18 · V1_OPT/POST_V1 | Sourced: PRD terminal list |
| Kreya/Evans/grpcio/SoapUI/ReadyAPI/WSDL-validators | — | — | UNSOURCED → `TOL-OD-006` (WSDL/XSD validation NATIVE via `contract.*`, P19) |

## 57. Messaging

WTT-TOL-MSG-001: MUST support (when applicable): Kafka, RabbitMQ, AMQP, MQTT, NATS, Redis Streams, SQS/SNS, Pub/Sub, Azure Service Bus — publish/consume/ordering/redelivery/DLQ/schema-conformance (PRD `WTT-API-005`). Messaging/event DEPTH is POST_V1 (PRD `WTT-V1-004`).

| Tool | Type / Tier | Phase · Release | Risk · Auth | Notes |
|---|---|---|---|---|
| Broker adapters (protocol set)* | ADAPTER / T2 | P18 · POST_V1 | SAFE_TEST · COND | Scoped secret refs for brokers (ARCH §messaging) |
| wscat/websocat/k6-WS/Artillery-WS | ADAPTER / T2 (k6-WS via load.k6) | P18/P34 · POST_V1 | SAFE_TEST · COND | wscat/websocat UNSOURCED → `TOL-OD-006` |

## 58. Contracts

WTT-TOL-CON-001: MUST include OpenAPI, JSON Schema, GraphQL schema, Protobuf, XML Schema — with OpenAPI Diff, Schemathesis-style fuzz-conformance, Prism-style mock-conformance, Ajv/Pydantic/Zod/Joi validators; Pact/SCC/Dredd MAY back consumer-driven flows (PRD `WTT-API-004`). Mocking MAY use WireMock, MockServer, MSW, Prism, Mountebank, Hoverfly, Mockoon (PRD `WTT-API-006`).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| OpenAPI Diff / Schemathesis / Prism / Ajv / Pydantic / Zod / Joi / Protobuf* | ADAPTER / T2 | P19 · V1_CORE | "Style/class" latitude; exact pins at implementation |
| Pact / Spring Cloud Contract / Dredd* | ADAPTER / T2 | P19 · V1_OPT/POST_V1 | Consumer-driven where configured |
| WireMock / MockServer / MSW / Mountebank / Hoverfly / Mockoon* | ADAPTER / T2 | P19 (found. P12) · V1_CORE(support) | Fault scenarios REQUIRED (PRD `WTT-API-006`) |

## 59. Visual

WTT-TOL-VIS-001: Separate capture vs comparison vs AI analysis vs commercial hosting (§65-rule). Tooling MAY include Playwright screenshots, pixelmatch, OpenCV, Percy, Applitools, Chromatic, BackstopJS (PRD `WTT-VSL-002`). Primary visual-diff stack = `DECISION_REQUIRED` (`TOL-OD-007`); pixelmatch RECOMMENDED default comparator.

| Tool | Type / Tier | Role | Phase · Release | Notes |
|---|---|---|---|---|
| Playwright screenshots* | ADAPTER / T1 | Capture default | P20 · V1_CORE | Normalized diff artifacts REQUIRED |
| pixelmatch* | ADAPTER / T2 | Deterministic compare (REC. default) | P20 · V1_CORE | TS (REC.); exact pin at implementation |
| OpenCV* | ADAPTER / T2 | CV/advanced analysis | P20 · V1_OPT/POST_V1 | Python worker (REC.) |
| Percy/Applitools/Chromatic* | COMMERCIAL / T3 | Hosted platforms (opt-in) | P20 · POST_V1 | Never V1-required |
| BackstopJS* | ADAPTER / T2 | Alternate runner | P20 · POST_V1 | Scenario-config interop |
| Loki/Happo/resemble.js | — | UNSOURCED | — | `TOL-OD-006` |

## 60. Accessibility

WTT-TOL-A11Y-001: Tooling MUST include axe-core-class static analysis + browser AX-tree inspection; MAY include Pa11y, Lighthouse, Accessibility Insights, WAVE (PRD `WTT-A11Y-002`). AT integrations (NVDA/JAWS/VoiceOver/TalkBack/Narrator) are Future/enterprise-adjacent, pluggable, NOT V1 (PRD; ARCH `FUTURE`).

| Tool | Type / Tier | Role | Phase · Release | Notes |
|---|---|---|---|---|
| axe-core* | ADAPTER / T1 | Default `accessibility.scan` (REC.) | P21 · V1_CORE | Class-mandatory; findings→WCAG normalized |
| Pa11y* | ADAPTER / T2 | Fallback/secondary | P21 · V1_OPT/POST_V1 | Fallback for axe (§28) |
| Lighthouse-a11y / Accessibility Insights / WAVE* | ADAPTER / T2 | Complementary signals | P21 · V1_OPT/POST_V1 | Collapse to canonical finding (FND-002) |
| NVDA/JAWS/VoiceOver/TalkBack/Narrator | FUTURE_EXTENSION | Assisted/manual AT | Post-V1 · FUTURE/ENT | Pluggable seams only |
| ARC Toolkit | — | UNSOURCED | — | `TOL-OD-006` |

## 61. Performance

WTT-TOL-PRF-001: MUST use where appropriate: Lighthouse, LHCI, WebPageTest, Sitespeed.io, Web Vitals, Chrome perf APIs behind `performance.*` with normalized metrics (PRD `WTT-PERF-001`).

| Tool | Type / Tier | Role | Phase · Release | Notes |
|---|---|---|---|---|
| Lighthouse* | ADAPTER / T1 | Default `performance.audit` (REC.) | P22 · V1_CORE (smoke) | V1 = smoke scope; depth P22-full |
| LHCI* | ADAPTER / T1 | CI budgets/regressions | P22/P39 · V1_OPT/POST_V1 | Budget enforcement |
| WebPageTest / Sitespeed.io* | ADAPTER / T2 | Depth/field-corroboration | P22 · POST_V1 | WPT = remote-capable; privacy-classified |
| Web Vitals lib / Chrome perf APIs* | ADAPTER / T1–T2 | RUM-lab + trace metrics | P22 · V1_CORE(support) | Time-series + budgets (ARCH) |
| SpeedCurve / Calibre | COMMERCIAL (class) | UNSOURCED vendors | — | `TOL-OD-006`; class = T3 if approved |

## 62. Load

WTT-TOL-LOD-001: Tooling MAY include k6, JMeter, Gatling, Locust, Artillery, Vegeta, wrk/wrk2, hey, autocannon behind `load.*` (PRD `WTT-LOAD-001`). Default: **k6** `RECOMMENDED` (listed first; PHASES TIER-1; ARCH `K6Adapter` exemplar). Load Workers isolated, never sharing interactive browser processes (ARCH). Aggressive load NEVER unauthorized; prod beyond passive/smoke denied by default; staging needs scope + caps + monitoring + abort plan (PRD `WTT-LOAD-003`).

| Tool | Type / Tier | Lang · Runtime (REC.) | Distrib? | Phase · Release | Risk · Auth · Prod |
|---|---|---|---|---|---|
| k6* | ADAPTER / T1 | Go-binary · NATIVE_BINARY | Operator/cluster Post-V1 | P34 · POST_V1 | LOAD_ACTIVE · YES · DENY-default |
| JMeter / Gatling | ADAPTER / T2 | Java · JAVA_PROCESS | Distributed modes | P34 · POST_V1 | LOAD_ACTIVE · YES · DENY-default |
| Locust | ADAPTER / T2 | Python · PYTHON_WORKER | Distributed | P34 · POST_V1 | LOAD_ACTIVE · YES · DENY-default |
| Artillery / Vegeta / wrk / hey / autocannon | ADAPTER / T2 | Per-tool · NATIVE_BINARY | Single-node | P34 · POST_V1 | LOAD_ACTIVE · YES · DENY-default |
| Tsung / Siege / k6-Operator / AWS-DLT | — / T3-class | UNSOURCED | — | — | `TOL-OD-006`; operators = scale fabric (PRD `WTT-FUT-004`) |

WTT-TOL-LOD-002: Abort policy (§210-rule): latency threshold · error threshold · target health · resource exhaustion · user cancellation — MANDATORY stop conditions on every load run; every run audited (profile, peak RPS/concurrency, duration, observed impact).

---

## 63. Network

WTT-TOL-NET-001: Diagnostics MAY use curl, HTTPie, ping, traceroute, mtr, tcpdump/tshark/Wireshark (capture-gated), netcat, iperf — scoped to target + configured infra (PRD `WTT-NET-001`). Platform differences MUST be declared (ping/traceroute flags, capture privileges, Win/macOS/Linux availability).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| curl / HTTPie* | ADAPTER / T1–T2 | P23 · V1_CORE | READ_ONLY/SAFE_TEST | Also API fallback (§54) |
| ping / traceroute / mtr* | ADAPTER / T2 | P23 · V1_CORE | READ_ONLY (rate-capped) | Platform flag matrices in MATRIX |
| tcpdump / tshark / Wireshark* | ADAPTER / T2 | P23 · V1_CORE(gated) | ACTIVE_NETWORK · COND | Capture-gated (privilege + scope + redaction) |
| netcat / iperf* | ADAPTER / T2 | P23 · V1_OPT/POST_V1 | ACTIVE_NETWORK · COND | Connectivity/throughput probes |

## 64. Proxy

WTT-TOL-PRX-001: MAY use mitmproxy, Fiddler, Charles, Proxyman, ZAP/Burp proxy modes — with explicit certificate handling, scope confinement, redaction (PRD `WTT-NET-002`). HTTPS interception REQUIRES trusted-cert installation in the CONTROLLED context only, explicit consent/approval, and full redaction — never on operator host traffic outside session scope.

| Tool | Type / Tier | Phase · Release | Risk · Auth | Notes |
|---|---|---|---|---|
| mitmproxy* | ADAPTER / T2 | P23 · V1_OPT/POST_V1 | ACTIVE_NETWORK · YES | Scriptable; default-intercept OFF |
| Fiddler / Charles / Proxyman* | ADAPTER (BYO) / T2–T3 | P23 · POST_V1 | ACTIVE_NETWORK · YES | Operator-driven; WTT imports captures |
| ZAP / Burp proxy modes* | ADAPTER / T2–T3 | P23/P25 · POST_V1 | ACTIVE_NETWORK · YES | Via security adapters |
| Playwright interception* | ADAPTER / T1 | P07 · V1_CORE | SAFE_TEST · POLICY | Route/fulfill/abort in controlled contexts |

## 65. DNS

WTT-TOL-DNS-001: DNS validation MUST cover resolution, DNSSEC (where applicable), DNSViz-class checks (PRD `WTT-NET-003`).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| dig / nslookup* | ADAPTER / T2 | P23 · V1_CORE | Sourced PHASES P23; system/user-provided |
| DNSViz-class* | ADAPTER / T2 | P23 · V1_OPT/POST_V1 | "Class" latitude; exact tool DEC_REQ if pinned |
| dnspython / dnsperf / DNSSEC-validators | — | — | UNSOURCED → `TOL-OD-006` (dnspython plausible impl detail, not approved) |

## 66. TLS

WTT-TOL-TLS-001: TLS validation MUST cover certificates, chain, expiration, hostnames, versions, cipher config, HSTS, OCSP — via OpenSSL/SSLyze/testssl.sh-class adapters (PRD `WTT-NET-003`). Differentiate local CLI (default) vs remote service (SSL Labs-class: privacy-classified, `OPTIONAL`).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| OpenSSL* | ADAPTER / T1–T2 | P23 · V1_CORE | System dependency; s_client-class checks |
| SSLyze / testssl.sh* | ADAPTER / T2 | P23 · V1_OPT/POST_V1 | Deep config audit; Python/Bash realities declared |
| Qualys SSL Labs-class | REMOTE_SERVICE / T3 | P23 · POST_V1 | `DECISION_REQUIRED` vendor; METADATA+URL privacy class |

## 67. DAST

WTT-TOL-DST-001: AUTHORIZED TARGETS ONLY. Engines MAY include ZAP, Burp (licensed/configured), Nuclei, Wapiti, Nikto, custom WTT scanners behind `security.*` with safe profiles first (PRD `WTT-SEC-002`); PHASES P25 adds httpx/nmap-class. Default: **ZAP** `RECOMMENDED` (listed first; ARCH `ZapAdapter` exemplar). NEVER unleash all scanners: selection is risk + fingerprint + scope-driven (ARCH-460).

| Tool | Type / Tier | Class (non-equivalent) | Phase · Release | Risk · Auth · Approval · Prod |
|---|---|---|---|---|
| OWASP ZAP* | ADAPTER / T2 | Full DAST + proxy | P25 · POST_V1 (passive-safe V1_OPT per `WTT-V1-003`) | SECURITY_ACTIVE · YES · USER/ADMIN · DENY-default |
| Nuclei* | ADAPTER / T2 | Template scanner | P25 · POST_V1 (passive-safe V1_OPT) | SECURITY_ACTIVE · YES · USER/ADMIN · DENY-default |
| Wapiti / Nikto* | ADAPTER / T2 | DAST / server checks | P25 · POST_V1 | SECURITY_ACTIVE · YES · USER/ADMIN · DENY-default |
| httpx / nmap-class* | ADAPTER / T2 | HTTP probing / network scan | P25 · POST_V1 | ACTIVE_NETWORK–SECURITY_ACTIVE · YES · USER+ · DENY-default |
| Burp Suite* | COMMERCIAL / T3 | DAST + proxy (licensed) | P25 · POST_V1/ENT | SECURITY_ACTIVE · YES · ADMIN · DENY-default |
| WTT custom scanners* | NATIVE / T0 | Safe-profile probes | P24/P25 · V1_SEL/POST_V1 | Per-profile risk (passive→active) |

WTT-TOL-DST-002: Each DAST execution MUST declare: risk class · authorization artifact · production policy · rate/concurrency controls · timeout · abort conditions. NEVER auto-execute proof-of-exploit follow-ups because a scanner suggests them — active follow-up requires fresh policy (§209-rule). Findings use defensive wording + SARIF export (ARCH-460).

## 68. Security Configuration

WTT-TOL-SCF-001: Prefer WTT-native lightweight validators for headers/CSP/CORS/HSTS/clickjacking/Referrer/Permissions-Policy/mixed-content/cookies/JWT/OAuth-OIDC/sessions — NEVER launch heavyweight scanners for basic config validation (§75-rule). Session/HTTP hardening checks run as configuration validation (ARCH-460).

| Capability set | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| Header/cookie/TLS-config validators* | NATIVE / T0 | P24 · V1_SELECTED | READ_ONLY | Default for `security.passive.*` |
| Session/token lifecycle validators* | NATIVE / T0 | P24/P16 · V1 | READ_ONLY–SAFE_TEST | JWT/OAuth/OIDC/session/token/CSRF |
| Passive-safe Nuclei/ZAP profiles* | ADAPTER / T2 | P24 · V1_OPTIONAL | READ_ONLY (profile-constrained) | PRD `WTT-V1-003`; active modules OFF |

## 69. SAST

WTT-TOL-SST-001: Integrations MAY include Semgrep, CodeQL, SonarQube, Bandit, SpotBugs (PRD `WTT-SSC-002`). Selection depends on source language/project (per-project detection wins). Default: **Semgrep** `RECOMMENDED` (listed first; ARCH exemplar; PHASES TIER-1). SAST reads are `READ_ONLY` (workspace-local, §201).

| Tool | Type / Tier | Lang fit | Phase · Release | Notes |
|---|---|---|---|---|
| Semgrep* | ADAPTER / T1 | Multi-lang | P26 · POST_V1 (subset V1_OPT per `WTT-V1-003`) | Default SAST |
| CodeQL* | ADAPTER / T2 | Compiled langs (DB-build cost) | P26 · POST_V1 | Heavy; workspace-local |
| SonarQube* | ADAPTER / T2 (commercial T3) | Multi-lang + server | P26 · POST_V1/ENT | Self-host vs commercial split |
| Bandit / SpotBugs* | ADAPTER / T2 | Python / Java | P26 · POST_V1 | Ecosystem-specific |
| SonarCloud / FindSecBugs / PMD-sec / ESLint-sec | ADAPTER (class) / T2–T3 | Per-ecosystem | P26/P38 · POST_V1 | PMD/ESLint via §83; Cloud = T3; FindSecBugs UNSOURCED → `TOL-OD-006` |

## 70. SCA

WTT-TOL-SCA-001: MAY include Snyk, Trivy, Grype, OSV-Scanner (PRD `WTT-SSC-002`). Distinguish runtime scanner vs CI integration vs dependency updater (§77-rule). Default scanner: **Trivy** `RECOMMENDED` (ARCH exemplar; PHASES TIER-1); updater: **Renovate-class** `RECOMMENDED` (PHASES P38).

| Tool | Type / Tier | Role | Phase · Release | Notes |
|---|---|---|---|---|
| Trivy* | ADAPTER / T1 | Scanner default (deps+image+config) | P26 · POST_V1 (subset V1_OPT) | Multi-target; version-pinned |
| Grype / OSV-Scanner* | ADAPTER / T2 | Alternate scanners | P26 · POST_V1 | Vulnerability DB freshness tracked |
| Snyk* | COMMERCIAL / T3 | Scanner + CI (licensed) | P26 · POST_V1/ENT | License + data-externalization rows |
| Renovate-class* | ADAPTER / T2 | Dependency updater | P38 · POST_V1 | PR-creating → PROJECT_WRITE + approval |
| OWASP Dependency-Check / npm-pnpm-yarn-audit / pip-audit / Dependabot | — | UNSOURCED | — | `TOL-OD-006` (ecosystem-audit interop plausible, not approved) |

## 71. Secret Scanning

WTT-TOL-SCR-001: MAY include Gitleaks, TruffleHog (PRD `WTT-SSC-002`). Default: **Gitleaks** `RECOMMENDED` (listed first). Findings MUST redact secret VALUES (evidence = location + type + redacted match + rotation guidance, never the secret).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Gitleaks* | ADAPTER / T2 | P26 · POST_V1 (subset V1_OPT) | Default; git-history + filesystem |
| TruffleHog* | ADAPTER / T2 | P26 · POST_V1 | Verified-secret depth |
| detect-secrets / GH / GitLab scanning | — | — | UNSOURCED → `TOL-OD-006` |

## 72. Supply Chain

WTT-TOL-SCH-001: MAY include Syft, CycloneDX, SPDX (PRD `WTT-SSC-002`); packaging MUST include SBOM (Proposed) + signed artifacts where infra allows (PRD `WTT-DEP-003`). Default generator: **Syft** `RECOMMENDED`.

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Syft* | ADAPTER / T2 | P26 · POST_V1 | SBOM default; CycloneDX/SPDX outputs |
| CycloneDX / SPDX* | NATIVE (formats) / T0 | P26 · POST_V1 | Format support, not executables |
| Dependency-Track / Cosign / Sigstore / SLSA | — | — | UNSOURCED → `TOL-OD-006` (signing strategy TBD, §227) |

## 73. Container/IaC

WTT-TOL-CNI-001: IaC MAY include Checkov, tfsec, Terrascan, KICS (PRD `WTT-SSC-002`); container/Infra security is domain AQ (P26). Default IaC: **Checkov** `RECOMMENDED` (listed first).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| Checkov / tfsec / Terrascan / KICS* | ADAPTER / T2 | P26 · POST_V1 | READ_ONLY | Terraform/Compose/CloudFormation-class coverage |
| Docker / Compose* | ADAPTER (platform) / T2 | P37/P03 · POST_V1 | SYSTEM_CHANGE (ops) | P37 adapters; terminal allowlist (P03) |
| Trivy / Grype (image)* | ADAPTER / T1–T2 | P26 · POST_V1 | READ_ONLY | Image/layer evidence |
| Podman / BuildKit / Scout / Dockle / Conftest / OPA | — | — | — | UNSOURCED → `TOL-OD-006` |
| Testcontainers | — | UNSOURCED | — | `TOL-OD-006` (likely P27/P38 fixture role, not approved) |

## 74. Kubernetes

WTT-TOL-K8S-001: K8s security MAY include kube-bench, Kubescape, Polaris (PRD `WTT-SSC-002`). Most K8s integrations are enterprise/post-V1 (§81-rule); K8s is scale fabric, explicitly NOT V1-mandatory (ARCH-021).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| kube-bench / Kubescape / Polaris* | ADAPTER / T2 | P26 · POST_V1/ENT | READ_ONLY (audit) | CIS/policy/posture |
| kubectl / Helm* | ADAPTER (CLI) / T2 | P03(term)/P37 · POST_V1 | SYSTEM_CHANGE · ADMIN | Terminal-gated; Helm charts FUTURE (ARCH) |
| Kustomize/Testkube/Sonobuoy/KUTTL/Kind/Minikube/k3d/Kyverno/Gatekeeper/kube-linter | — | — | — | UNSOURCED → `TOL-OD-006` |

## 75. Cloud

WTT-TOL-CLD-001: AWS/Azure/GCP tooling (aws/az/gcloud CLIs in terminal allowlist, PRD §62-context). Classify: cloud CLI · security config · logging · policy · identity. NEVER require cloud tooling for local WTT (§82-rule; RULES invariant 22). Assessment defaults read-first; writes separately authorized (§214-rule).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| aws / az / gcloud CLIs* | ADAPTER / T2 | P03(term)/P26 · POST_V1 | READ_ONLY→SYSTEM_CHANGE | Terminal-gated; scoped creds |
| Cloud config validators* | NATIVE+ADAPTER / T0–T2 | P26 (AS) · POST_V1/ENT | READ_ONLY (audit) | CIS-class posture per cloud |
| Terraform / OpenTofu* | ADAPTER / T2 | P37 · POST_V1 | SYSTEM_CHANGE · ADMIN | IaC ops, never auto-apply |

## 76. Database

WTT-TOL-DAT-001: Adapters MUST support (where configured): PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, MongoDB, Redis, Elasticsearch/OpenSearch — via credentialed, scope-gated access only (PRD `WTT-DATA-001`). Prefer native drivers for structured reads over shelling out (§83-rule). WTT's OWN persistence baseline (Postgres + Redis, `APPROVED BY PRD`) is infrastructure, not a test adapter — tracked separately (same drivers, different policies).

| Engine | Access (default → fallback) | Phase · Release | Risk · Prod | Notes |
|---|---|---|---|---|
| PostgreSQL / MySQL / MariaDB / SQL Server / Oracle / MongoDB / Redis / Elastic* | Native driver → CLI (psql/mysql/mongosh/redis-cli) → container fixture | P27 · POST_V1 | READ_WRITE-split · READ-default | CLIs in terminal allowlist |
| Migrations (Flyway/Liquibase/Prisma/Alembic/Sequelize/TypeORM/Knex) | Project-native invocation | P27 · POST_V1 | PROJECT_WRITE · approval | Inspect/invoke project systems; NEVER replace (§84-rule) |

WTT-TOL-DAT-002: DB write policy (§211-rule): validation defaults read-only; writes require explicit capability (`database.write.*`) + environment policy + fixture scope (`SAFE_WRITE`) + cleanup. Production default: `READ` when permitted at all.

## 77. Data

WTT-TOL-DTA-001: Data Quality/ETL/BI (domains BI/BJ/CB, P28): NATIVE rule engines/validators + adapters (Great-Expectations/Soda/deequ-class, dbt-test harnesses, BI clients — PHASES P28).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Great Expectations / Soda Core / deequ-class* | ADAPTER / T2 | P28 · POST_V1 | Quality suites; "class" latitude |
| dbt-test harnesses* | ADAPTER / T2 | P28 · POST_V1 | Project-detected |
| BI clients (PowerBI/Tableau/Looker-class)* | ADAPTER / T3–T4 | P28 · POST_V1/ENT | Usually optional/enterprise (§86-rule); vendors UNSOURCED → `TOL-OD-006` |
| Pandera / Airflow / Dagster / Prefect / Spark | — | — | UNSOURCED → `TOL-OD-006` (Pydantic grounded as validator, §58) |

## 78. Files

WTT-TOL-FIL-001: File/media testing (domain CC, P28): CSV/XLSX/PDF/JSON/XML/YAML/ZIP/images/MIME/checksums/encoding. Select language/tool by file type + technical requirement (§87-rule). No file-library vendors sourced → all `DECISION_REQUIRED` (`TOL-OD-008`); pandas/openpyxl/POI/PyMuPDF/Tika/csvkit/xmllint are CANDIDATES (task-text), not approved.

| Capability | Strategy | Phase · Release | Notes |
|---|---|---|---|
| Tabular (CSV/XLSX) / docs (PDF) / structured (JSON/XML/YAML) / archives / images* | NATIVE validators + shortlisted libs (TBD) | P28 · POST_V1 (depth V1_OPT per `WTT-V1-003`) | Email/file DEPTH is V1_OPT; core assertions engineer per format |

## 79. Email

WTT-TOL-EML-001: Capture MAY use Mailpit, MailHog, Mailtrap, smtp4dev, GreenMail (PRD `WTT-DATA-030`). Separate local capture vs remote testing service vs Java test server (§88-rule). Email assertions: delivery, template, HTML+text, links, OTP/codes, attachments, SPF/DKIM/DMARC signals.

| Tool | Type / Tier | Role | Phase · Release | Notes |
|---|---|---|---|---|
| Mailpit / MailHog-class* | ADAPTER / T1–T2 | Local capture default (TIER-1 per PHASES §72) | P28 · POST_V1 (depth V1_OPT) | Container or binary |
| smtp4dev / GreenMail* | ADAPTER / T2 | .NET-local / Java test server | P28 · POST_V1 | GreenMail = JVM fixture |
| Mailtrap* | REMOTE_SERVICE / T3 | Hosted capture | P28 · POST_V1 | Privacy-classified |
| Ethereal | — | UNSOURCED | — | `TOL-OD-006` |

## 80. Mobile

WTT-TOL-MOB-001: SHOULD be architecturally allowed via `mobile.*` (Appium, Maestro, Detox, Espresso, UIAutomator2, XCUITest) WITHOUT mandating V1 (PRD `WTT-FUT-001`). Post-V1 unless PRD says otherwise (§89-rule) → POST_V1 confirmed. PHASES P44: NATIVE driver ports + adapters (Appium/Espresso/XCUITest/WinAppDriver/Electron-CDP-class; device-farm seams TIER-3); Appium is TIER-1 "P44 core".

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Appium* | ADAPTER / T1(P44) | P44 · POST_V1 | Core driver; WDA/UIA2 under it |
| Maestro / Detox / Espresso / UIAutomator2 / XCUITest* | ADAPTER / T2 | P44 · POST_V1 | Per-OS depth |
| BrowserStack / Sauce / AWS Device Farm / Firebase Lab / Kobiton / LambdaTest | COMMERCIAL / T3 | P44 · POST_V1/ENT | BS/Sauce/LambdaTest sourced (ARCH-160/PHASES T3); AWS-Farm/Firebase/Kobiton UNSOURCED → `TOL-OD-006` |
| EarlGrey | — | — | UNSOURCED → `TOL-OD-006` |

## 81. Desktop

WTT-TOL-DSK-001: SHOULD be allowed via `desktop.*` (Playwright Electron, Appium Desktop, Windows/macOS automation) without mandating V1 (PRD `WTT-FUT-002`).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Playwright Electron* | ADAPTER / T2 | P44 · POST_V1 | Electron-CDP (PHASES P44) |
| Appium Desktop / WinAppDriver* | ADAPTER / T2 | P44 · POST_V1 | Win/mac automation |
| WebdriverIO-Electron / Mac2 / pywinauto / SikuliX | — | — | UNSOURCED → `TOL-OD-006` |

## 82. Build

WTT-TOL-BLD-001: Build adapters MAY include npm/pnpm/yarn/bun, Maven, Gradle, pip/uv/Poetry (PRD `WTT-WS-004`; PHASES P38). Detected from target workspace (§91-rule); executed as gated `build.*` with normalized reports.

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| npm / pnpm / yarn / bun / pip / uv / Poetry / Maven / Gradle* | ADAPTER / T2 | P38 · POST_V1 | PROJECT_WRITE (install/build) · POLICY | Detection > enforcement; lockfiles honored |

## 83. Static Quality

WTT-TOL-QLT-001: MAY include ESLint/Biome/tsc/Prettier; Ruff/Pylint/mypy/Pyright; Checkstyle/PMD/SpotBugs/Error Prone (PRD `WTT-WS-004`); P00 toolchains: TS (ESLint-Biome/tsc), Python (Ruff/Pyright-mypy), Java (dormant until Java modules).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| ESLint / Biome / tsc / Prettier* | ADAPTER / T2 | P38 · POST_V1 | JS/TS; project-config honored |
| Ruff / Pylint / mypy / Pyright / Black* | ADAPTER / T2 | P38 · POST_V1 | Python (Black via P38 adapter list) |
| Checkstyle / PMD / SpotBugs / Error Prone* | ADAPTER / T2 | P38 · POST_V1 | Java; JVM-gated |

## 84. Coverage

WTT-TOL-COV-001: Coverage via Istanbul/c8/Vitest/Jest/coverage.py/pytest-cov/JaCoCo (PRD `WTT-WS-004`). Collection/instrumentation in P38; aggregation/intelligence in P31 (BL) — split ownership, one MATRIX row each.

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Istanbul / c8 / Vitest / Jest* | ADAPTER / T1–T2 | P38 collect · V1-adjacent | JS/TS; V8 coverage preferred |
| coverage.py / pytest-cov* | ADAPTER / T1–T2 | P38 collect · POST_V1 | Python |
| JaCoCo* | ADAPTER / T2 | P38 collect · POST_V1 | Java; JVM-gated |
| Coverage aggregation/intelligence* | NATIVE / T0 | P31 (BL) · POST_V1 | Union graphs, risk-weighted |

## 85. Mutation

WTT-TOL-MUT-001: Mutation via Stryker/mutmut/Cosmic Ray/PIT (PRD `WTT-WS-004`). Optional advanced capability (§94-rule).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Stryker / mutmut / Cosmic Ray / PIT* | ADAPTER / T2 | P38 · POST_V1 | Per-language; budget-capped (VERY_HEAVY) |

## 86. CI/CD

WTT-TOL-CIC-001: Integrations MUST include (adapters, progressive): GitHub Actions, GitLab CI, Jenkins, Azure Pipelines, CircleCI, Buildkite, TeamCity, Bitbucket (PRD `WTT-INT-001`). WTT focus: headless execution, exit codes, reports, quality gates (§95-rule).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| GitHub Actions (+ Checks)* | ADAPTER / T1–T2 | P39 · POST_V1 | GitHub Checks in TIER-1 (§72) |
| GitLab / Jenkins / Azure / CircleCI / Buildkite / TeamCity / Bitbucket* | ADAPTER / T2 | P39 · POST_V1 | Progressive provider matrix |
| Tekton / Argo Workflows | — | — | UNSOURCED → `TOL-OD-006` |

## 87. Git

WTT-TOL-GIT-001: Native Git CLI/library support MAY provide core workspace intelligence (§96-rule). GitHub/GitLab/Bitbucket = hosting integrations (API-gated, PR-scoped).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| git CLI / library* | ADAPTER+NATIVE / T1 | P39 (BP) · POST_V1 (read depth earlier via P31) | READ (diff/blame) · PROJECT_WRITE (checkpoint) | NEVER push (RULES invariant 18) |
| GitHub / GitLab / Bitbucket APIs* | ADAPTER / T2 | P39 · POST_V1 | Per-scope tokens | Checks/PR annotations; secret refs |

## 88. Deployment

WTT-TOL-DPL-001: Capabilities: health/readiness/liveness/smoke/canary/blue-green/rolling/rollback/version + artifact validation (§97-rule). NATIVE orchestration over project-declared deployment descriptors; WTT NEVER owns production deploys (verify, don't release).

| Capability | Type / Tier | Phase · Release | Risk · Approval | Notes |
|---|---|---|---|---|
| Deploy verification pack* | NATIVE / T0 | P39 · POST_V1 | READ_ONLY–SAFE_TEST · POLICY | Smoke + version/artifact checks |
| Progressive-rollout observers* | NATIVE / T0 | P39/P46 · POST_V1 | READ_ONLY | Canary/blue-green signal reads |

## 89. Observability

WTT-TOL-OBS-001: WTT MUST instrument itself via OpenTelemetry — metrics, logs, traces, correlated CLI→runtime→agents→tools→workers→browsers→models (PRD `WTT-OBS-001`, `APPROVED BY PRD` per ARCH §78). Integrations MAY include Prometheus, Grafana, Loki, Tempo, Jaeger, Elastic, Sentry, Datadog, New Relic via OTel exporters + documented dashboards/alerts (Proposed) (PRD `WTT-OBS-002`).

| Tool | Type / Tier | Role (non-equivalent) | Phase · Release | Notes |
|---|---|---|---|---|
| OpenTelemetry* | NATIVE (instrumentation) / T0 | Metrics/logs/traces SDK + Collector | P36 (+P04 events) · V1_CORE | `APPROVED`; vendor-neutral |
| Prometheus / Grafana / Loki / Tempo / Jaeger / Elastic* | ADAPTER / T1–T2 | Metrics/viz/logs/traces/search backends | P36 · POST_V1 (clients TIER-1) | OTel exporters; self-hostable |
| Sentry / Datadog / New Relic* | COMMERCIAL / T3 | APM/RUM/error SaaS | P36 · POST_V1/ENT | Privacy + cost rows required |
| Fluent Bit / Vector / Zipkin | — | UNSOURCED shippers/tracers | — | `TOL-OD-006` (OTel-native preferred) |

## 90. Monitoring

WTT-TOL-MON-001: Synthetic/continuous monitoring (domain CO, P46): Playwright/k6 synthetic workers + schedules + verifications. External synthetic vendors are OPTIONAL T3.

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Playwright synthetic worker / k6 synthetic worker* | ADAPTER / T1–T2 | P46 · POST_V1 | Reuse browser/load engines |
| Checkly / UptimeRobot / Grafana-Synthetic / Datadog-Synthetics / New-Relic-Synthetics | COMMERCIAL (class) | P46 · POST_V1/ENT | Vendors UNSOURCED → `TOL-OD-006`; Grafana/Datadog/New-Relic as vendors via §89 |

## 91. Chaos

WTT-TOL-CHS-001: Chaos/recovery automation beyond smoke is RESEARCH, no V1 commitment (PRD `WTT-V1-006`). P37: NATIVE lifecycle/blast-radius controller/DR drills + adapters (Docker/Compose/Terraform/K8s/chaos-mesh/backup-class). High-risk ops need strict policy (§101-rule); prod chaos = `EXPERIMENTAL`-gated (DESIGN §78).

| Tool | Type / Tier | Phase · Release | Risk · Approval | Notes |
|---|---|---|---|---|
| chaos-mesh-class* | ADAPTER / T2 | P37 · POST_V1/EXP(prod) | DESTRUCTIVE · ADMIN | K8s-chaos; blast-radius controller gates |
| Docker/Compose/Terraform/K8s (ops)* | ADAPTER / T2 | P37 · POST_V1 | SYSTEM_CHANGE · ADMIN | Env lifecycle, never auto-prod |
| Litmus / Chaos Toolkit / Gremlin / Toxiproxy / Pumba / tc-netem / AWS FIS / Azure Chaos | — | — | — | UNSOURCED → `TOL-OD-006` |

## 92. Test Data

WTT-TOL-TDD-001: Prefer WTT orchestration over building another data-generation framework (§102-rule): NATIVE data manager (fixtures/seeders/masking/anonymization/synthetic tenants) + generator adapters. Faker-class generators UNSOURCED → `DECISION_REQUIRED` (`TOL-OD-009`).

| Capability | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| Fixtures / seeders / masking / anonymization* | NATIVE / T0 | P28 (AU) · POST_V1 | SAFE_WRITE (fixtures) | Synthetic tenants; PII-safe by construction |
| Faker / Faker.js / Python-Faker / Factory-Boy / Fishery | ADAPTER (candidate) / T2 | P28 · POST_V1 | SAFE_WRITE | CANDIDATES (task-text), not approved |

---

## 93. Payments

WTT-TOL-PAY-001: Payment tools default to sandbox/test environments; real-money endpoints BLOCKED unless exceptional policy explicitly allows (§212-rule). No payment vendors sourced → all `DECISION_REQUIRED` (`TOL-OD-010`); Stripe/PayPal/Razorpay/Adyen are CANDIDATES (task-text), not approved.

| Capability | Type / Tier | Phase · Release | Risk · Approval · Prod | Notes |
|---|---|---|---|---|
| payment.sandbox.test (provider TBD)* | ADAPTER / T2–T3 | P29 (CD) · POST_V1 | SAFE_TEST · USER · BLOCKED(real) | Webhook verification + sandbox SDKs |
| Real-money capture | PROHIBITED (default) | — | DESTRUCTIVE · ADMIN+ · PROHIBITED | Exceptional policy only, audited |

## 94. E-Commerce

WTT-TOL-ECO-001: Domain test PACK, not third-party tools (§104-rule): catalog/products/variants/pricing/discounts/cart/wishlist/checkout/shipping/tax/inventory/orders/returns/refunds/subscriptions. NATIVE pack orchestrating browser/API/data capabilities over sandbox fixtures.

| Capability | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| ecommerce.flow.test (pack)* | NATIVE / T0 | P29 (CE) · POST_V1 | SAFE_TEST (sandbox) | Composes L/S/AB/AA/CC/CD capabilities |

## 95. SEO

WTT-TOL-SEO-001: WTT-native checks + Lighthouse-SEO-class; V1-selected basics (meta/headings/canonical/robots-sitemap + i18n basics per PHASES P29/DESIGN §33). No rank promises; sourced versioned rule sets only (RULES §34).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| WTT SEO validators* | NATIVE / T0 | P29 (BB) · V1_SELECTED(basics) | Crawl-evidence, not rank |
| Lighthouse-SEO / schema validators* | ADAPTER / T1–T2 | P29 · V1_SEL/POST_V1 | Structured-data validation |
| Screaming Frog / Search Console | — | — | UNSOURCED → `TOL-OD-006` |

## 96. Privacy

WTT-TOL-PVC-001: Capabilities: consent/trackers/PII-exposure/data-export/deletion/retention/audit-evidence. WTT provides TECHNICAL EVIDENCE ONLY — it MUST NOT certify legal compliance (§106-rule). Consent ops (AW) + privacy/rights (CF) both P29.

| Capability | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| consent.validate / tracker.inventory / pii.exposure.scan / rights.verify* | NATIVE / T0 | P29 · POST_V1 | READ_ONLY–SAFE_TEST | Evidence packs for DPO/legal handoff |

## 97. AI/LLM

WTT-TOL-AIL-001: Target-side LLM app testing (CG/CQ, P41): NATIVE orchestration + eval-harness-class adapters. NO eval vendors sourced → all `DECISION_REQUIRED` (`TOL-OD-011`); Promptfoo/DeepEval/Ragas/Phoenix/LangSmith/TruLens/MLflow-Eval/Giskard are CANDIDATES (task-text). AI providers (WTT's own models) need their own abstraction: capabilities · privacy · model limits · structured output · tool calling · vision · cost · latency — NEVER hard-code one provider (§215-rule; ARCH ≥2 routes incl. local).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| llm.app.test / llm.eval.score / llm.output.guard* | NATIVE+harness / T0–T2 | P41 · POST_V1 | Prompt/regression/safety evals of TARGET LLMs |
| Provider abstraction (WTT models)* | NATIVE gateway / T0 | P13 · V1_CORE | In-CP routed gateway + adapters (ARCH §78 REC.) |

## 98. Prompt/RAG

WTT-TOL-PRR-001: Capabilities (§§108–109): prompt regression/versioning/model-compare/structured-output/semantic-assertions/instruction-following; retrieval recall/precision/context-relevance/faithfulness/hallucination/citations/grounding/retriever-regression/reranking. NATIVE oracles + harness adapters (vendors TBD, `TOL-OD-011`).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| prompt.* / rag.* suites* | NATIVE+harness / T0–T2 | P41 · POST_V1 | Deterministic oracles preferred over vibe-assertions (PRD `WTT-GEN-003`) |

## 99. Agent Testing

WTT-TOL-AGT-001: Capabilities (§110): planning/tool-selection/arguments/ordering/recovery/memory/context/delegation/browser+API-actions/goal-completion/authorization/safety. NATIVE trajectory harness (P42) + target-agent adapters.

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| agent.trajectory.test (plan→act→verify)* | NATIVE / T0 | P42 (CH) · POST_V1 | Tests TARGET agents; WTT's own agents tested via §129 |

## 100. AI Safety

WTT-TOL-AIS-001: Capabilities: prompt-injection (direct/indirect), jailbreak resistance, sensitive-data leakage, unauthorized tool access, excessive agency, tool abuse, exfiltration resistance. Vendors UNSOURCED (Promptfoo/Giskard/Garak/PyRIT/DeepEval are CANDIDATES) → `TOL-OD-011`. Red-team probes = `EXPERIMENTAL`-gated; safety findings defensive-worded.

| Capability | Type / Tier | Phase · Release | Risk · Approval | Notes |
|---|---|---|---|---|
| safety.redteam.probe (target-side)* | NATIVE+harness / T0–T5 | P42 (CR) · POST_V1/EXP | SECURITY_ACTIVE · ADMIN | Auth-gated; no weaponization detail |

## 101. ML

WTT-TOL-MLL-001: ML testing (CK, P43): NATIVE eval orchestration/drift checkers/verdict mapping + BYO stacks (scikit-learn/TF/PyTorch/eval-harness-class — read/eval ONLY, never training-by-default — PHASES P43).

| Tool | Type / Tier | Phase · Release | Risk | Notes |
|---|---|---|---|---|
| scikit-learn / TF / PyTorch (BYO)* | ADAPTER / T2 | P43 · POST_V1 | READ_ONLY (eval) | Project-provided stacks |
| MLflow / Evidently / Giskard | — | — | — | UNSOURCED → `TOL-OD-006` |

## 102. Browser Vision

WTT-TOL-BVI-001: Capabilities: screenshot understanding, semantic UI, element detection, layout understanding, visual anomaly detection, DOM+vision fusion. Implementations: AI vision models (provider-gated) · OpenCV (Python worker) · Pillow-class (UNSOURCED, candidate) · Playwright AX-tree (grounded). Python favored for CV ecosystem (PRD `WTT-LANG-003`).

| Tool | Type / Tier | Lang · Runtime (REC.) | Phase · Release | Notes |
|---|---|---|---|---|
| Playwright AX-tree + screenshots* | ADAPTER / T1 | TS · NODE (REC.) | P06/P20 · V1_CORE | Deterministic substrate |
| OpenCV worker* | ADAPTER / T2 | Python · PYTHON_WORKER (REC.) | P20/P33 · V1_OPT/POST_V1 | Classical CV |
| AI vision models* | REMOTE/prov-gated / T1–T3 | Via AI gateway (REC.) | P33 · POST_V1 | Confidence + region + rationale REQUIRED |
| Pillow-class | — | — | — | UNSOURCED candidate → `TOL-OD-006` |

## 103. Self-Healing

WTT-TOL-SLF-001: Capabilities: selector/locator/text/AX-locator recovery, DOM similarity, visual locator, wait/timing repair, retry optimization. EVERY healing action MUST be logged, confidence-scored, versioned, reversible, verified (§114-rule). Basic healing is V1-conditional (PRD V1 CORE vs P33 POST_V1 — `DES-OD-001` inherited).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| healing.* (locator+wait repair)* | NATIVE / T0 | P33 (BN/BO) · V1_COND/POST_V1 | Heal events are first-class evidence (DESIGN §23) |

## 104. Flakiness

WTT-TOL-FLK-001: WTT-native intelligence over pass/fail history, reruns, timing, browser, environment, network, selector stability, failure clustering (§115-rule). Basic flake score V1-conditional (same `DES-OD-001`).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| flake.score / test.quarantine / flake.cluster* | NATIVE / T0 | P33 (BO) · V1_COND/POST_V1 | Quarantine = policy + expiry + reason |

## 105. Root Cause

WTT-TOL-RCA-001: WTT-native orchestration over evidence tools (§116-rule): screenshot/DOM/console/network/API/database/logs/metrics/traces/code/deployment/history correlation. Output: root cause + confidence + evidence + component + impact + recommended fix; symptom vs contributing-factor vs root-cause explicit (PRD `WTT-RCA-002/004`).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| ai.rootcause.analyze / rootcause.correlate* | NATIVE / T0 | P30 (BK) · V1_SELECTED(basic) | Dashboard-visible, replayable, regression-reusable |

## 106. Code Intelligence

WTT-TOL-CDE-001: Capabilities: Git diff, AST, dependency/route/API/component-impact analysis, coverage union, historical risk (§117-rule). Tools/libraries selected BY PROJECT LANGUAGE — NEVER one AST engine for all languages. Change Impact Engine consumes Git diff + AST + graphs + coverage + history (PRD `WTT-IMP-001/002`).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| code.context.resolve / impact.analyze / coverage.union / hotspot.score* | NATIVE / T0 | P31 (BL/CA/AY) · POST_V1 | Per-language analyzers; read-only collectors |

## 107. Test Generation

WTT-TOL-GEN-001: Capabilities: DOM/route/AX-tree/OpenAPI/GraphQL/source/DB-schema/requirements/history/telemetry-driven generation (§118-rule). Primarily NATIVE orchestration using AI providers; MUST respect scope/policy + prefer deterministic oracles (PRD `WTT-GEN-003`).

| Capability | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| ai.test.generate / ai.select.tests* | NATIVE / T0 | P14 (CI/CJ) · V1_CORE | Provider-abstracted; selection explainable |

## 108. Auto Remediation

WTT-TOL-REM-001: NATIVE controlled pipeline (§119-rule): failure reproduction → evidence → RCA → affected-file resolver → change impact → patch generation → Git checkpoint → diff validation → apply → lint → typecheck → unit/API/browser re-test → regression → rollback. The coding-model provider is NOT the remediation system — the pipeline is. Auto-fixes REQUIRE checkpoint + validation + verification + rollback path (RULES invariant 17); NEVER auto-push/deploy (invariant 18).

| Capability | Type / Tier | Phase · Release | Risk · Approval | Notes |
|---|---|---|---|---|
| fix.patch.propose/apply/rollback* | NATIVE / T0 | P32 (BM/CN) · V1_COND(localhost-min)/POST_V1 | PROJECT_WRITE · USER+ | Localhost minimal pipeline in PRD V1 CORE; full P32 POST_V1 |
| verification.execute* | NATIVE / T0 | P30/P32 · V1_SEL/POST_V1 | Varies (re-runs) | Independent verifier ≠ proposer (DESIGN §40) |

## 109. Orchestration

WTT-TOL-ORC-001: Distinguish queue vs event vs workflow/orchestration vs worker-execution technologies — NEVER list as equivalent substitutes (§120-rule). Sourced progression (PRD `WTT-WRK-002`): local process pool → Redis/BullMQ → NATS/RabbitMQ/Kafka/Temporal → Kubernetes Jobs, by scale profile. V1 MUST prove local + Redis/BullMQ-class; K8s/Temporal post-V1.

| Tool | Purpose (non-equivalent) | Phase · Release | Decision |
|---|---|---|---|
| BullMQ-class on Redis* | Job queue (priority/dep/retry/DLQ/rate-limit) | P35 (BU) · V1_CORE (local+queue) | `RECOMMENDED` (ARCH ADR-003; PRD OD-002 open for evolution) |
| Redis Streams* | Event fanout | P04 (CT) · V1_CORE | `RECOMMENDED` (ARCH ADR-002; Streams-vs-Pub/Sub `ARCH-OD-015`) |
| NATS / RabbitMQ / Kafka* | Distributed events/queues at scale | Post-P35 · POST_V1 | Migration triggers only (ARCH-350, `ARCH-OD-020`) |
| Temporal* | Durable workflows/sagas | Post-P35 · POST_V1 | Trigger-gated; never V1-default |
| Kubernetes Jobs* | Container-orchestrated workers | P35/P37 · POST_V1/ENT | Scale fabric (PRD `WTT-FUT-004`) |

## 110. Workers

WTT-TOL-WRK-001: Worker capability classes (§121): browser · discovery · API · visual · accessibility · performance · load · security · database · file · email · mobile · AI · analysis · reporting. V1 REQUIRED: local pool + Redis queue (ARCH worker contract). Remote browsers (Grid/cloud/K8s pools) Proposed, schedulable with affinity + evidence shipping (PRD `WTT-WRK-005`).

| Class | Runtime (REC.) | Phase · Release | Notes |
|---|---|---|---|
| browser/discovery/api/visual/a11y/perf/analysis/reporting* | TS NODE_CHILD_PROCESS | P11+ · V1_CORE | Local pool V1 |
| AI/data workers* | Python (FastAPI) (REC.) | P13/P14 · V1_CORE | PRD §73 Proposed |
| load workers* | Isolated (k6/JMeter/Gatling/Locust) | P34 · POST_V1 | Never share browser procs |
| security workers* | Sandboxed scanners | P25/P26 · POST_V1 | Prompt-kill, audit depth |
| java workers* | Java JAR/container (opt-in) | Justified phases · POST_V1 | Framework = `DECISION_REQUIRED` (`TOL-OD-012`) |
| mobile workers* | Appium + per-OS | P44 · POST_V1 | Device/cloud affinity |

## 111. Artifact Storage

WTT-TOL-ART-001: MUST support local filesystem (default), S3-compatible, MinIO, AWS S3, Azure Blob, GCS — with retention/compression/dedup/encryption/access-control/cleanup/archival (PRD `WTT-EVD-003`). V1: local FS rooted at scoped dirs (`RECOMMENDED`); team/enterprise: S3-port (ARCH §artifact). Metadata in PG; bytes NEVER in PG. Default-backend matrix per tier = PRD OD-008 (open).

| Backend | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Local filesystem* | NATIVE / T0 | P40 (CL) store depth; P07 capture · V1_CORE | Default; scoped roots |
| MinIO / AWS S3 / Azure Blob / GCS* | ADAPTER / T2–T4 | P40 · POST_V1/ENT | One `ArtifactStore` port |

## 112. Secrets

WTT-TOL-SEC-001: Secrets MUST be references resolved at use-time from adapters: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, Google Secret Manager, Kubernetes Secrets, Docker Secrets, env refs (Proposed set; file-based dev vault for localhost with warnings) (PRD `WTT-SCR-001`). NEVER stored/logged in plaintext (RULES invariant 6). Local OS keychains evaluable (ARCH diagram "OS store").

| Store | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Vault / AWSSM / AzureKV / GCPSM / K8s / Docker / env* | ADAPTER / T2–T4 | P40 (BS) · POST_V1/ENT (localhost dev-vault earlier) | Lease broker; scoped delivery (§30) |

## 113. Notifications

WTT-TOL-NTF-001: Integrations (Proposed): Slack, Teams, email, webhooks — for verdicts, gate failures, approvals, fix proposals; payloads redacted + deep-linked (PRD `WTT-INT-002`). These are adapters (§124-rule). Automated tests use safe test endpoints/accounts; NEVER spam real users (§213-rule).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Slack / Teams / email / webhooks* | ADAPTER / T2 | P40 (BV) · POST_V1 | Router + redaction; V1 in-app only (DESIGN `DES-OD-009`) |
| Discord / PagerDuty / Opsgenie / SMS / push | — | — | UNSOURCED → `TOL-OD-006` |

## 114. Test Management

WTT-TOL-TMM-001: (Proposed/Future): Jira, Linear, Azure Boards, TestRail, Zephyr, Xray — finding sync with dedup keys + state mapping (PRD `WTT-INT-003`). V1_OPTIONAL: TestRail/Jira export minimal (PRD `WTT-V1-003`).

| Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| Jira / Linear / Azure Boards / TestRail / Zephyr / Xray* | ADAPTER / T2–T4 | P40 (CM) · V1_OPT(min)/POST_V1/ENT | Sync engine; dedup-key stable |
| GitHub/GitLab Issues / YouTrack / qTest / Allure TestOps | — | — | UNSOURCED → `TOL-OD-006` |

## 115. Reporting

WTT-TOL-REP-001: Canonical formats (PRD `WTT-REP-001`, from ONE canonical result model): HTML, PDF, JSON, CSV, XLSX, JUnit XML, SARIF, Markdown. External reporting (Allure/ReportPortal/Extent/Playwright-HTML/Mochawesome) = artifacts; WTT canonical report REMAINS authoritative (§126-rule; ARCH §51.3). Deterministic JUnit/SARIF ordering REQUIRED for CI.

| Format/Tool | Type / Tier | Phase · Release | Notes |
|---|---|---|---|
| HTML / JSON / Markdown + JUnit (+SARIF)* | NATIVE / T0 | P30 · V1_CORE | V1 report set (ARCH V1) |
| PDF / CSV / XLSX* | NATIVE / T0 | P30 · V1_CORE | Same model renderers |
| Allure / ReportPortal / Extent / Mochawesome / PW-HTML | — | — | UNSOURCED → `TOL-OD-006` (interchange TBD) |

---

## 116. Tool SDK

WTT-TOL-SDK-001: Planned SDKs (names PROPOSED unless ARCH approves): `@wtt/tool-sdk` (TS) · `wtt-tool-sdk` (Python) · `wtt-tool-sdk-java` (Java). Responsibilities: manifest validation · schema handling · structured logging · events · health checks · cancellation · evidence creation · finding creation · permissions · configuration · testing harness (§162-rule). SDK ships with phase P45 (Tool SDK & Extension Ecosystem); pre-P45 adapters hand-roll against `contracts/` + this spec.

WTT-TOL-SDK-002: Scaffolding (PRD §LANG-context `wtt tools create --language …`, `RECOMMENDED`, P45): `wtt tools create --language typescript|python|java` — approved templates ONLY (§163-rule). Catalog DB entities (logical, NOT SQL — schema belongs to `DATABASE.md`, §156-rule): `CapabilityDefinition · ToolDefinition · ToolImplementation · ToolVersion · ToolInstallation · ToolHealth · ToolPermission · ToolExecution · ToolDependency · ToolConfiguration · ToolSecretReference · ToolMetric`.

## 117. Tool CLI

WTT-TOL-CLI-001: Commands permitted by PRD `WTT-CLI-001` (verbatim set): `wtt tools · wtt tools list · wtt tools info <tool> · wtt tools doctor · wtt tools install · wtt tools update` + `wtt doctor`. PROPOSED (future, NOT in PRD — §181-rule): `wtt tools health · wtt tools enable <id> · wtt tools disable <id>`.

WTT-TOL-CLI-002: `wtt tools list` shows: Tool · Capability · Version · Tier · Status · Health · Runtime (§182-rule). `wtt tools info` shows: ID · Description · Capabilities · Runtime · Version · Installation · Permissions · Risk · Dependencies · Health · Configuration · Phase (§183-rule). `wtt tools doctor` checks: runtime · binary · version · dependencies · configuration · credentials · permissions · network (§184-rule; §24 workflow).

## 118. Tool Profiles

WTT-TOL-PRO-001: Profiles select CAPABILITY sets, never hard-code vendor names (§188-rule): `QUICK · STANDARD · DEEP · FULL · CUSTOM`.

| Profile | Capability scope | Release |
|---|---|---|
| QUICK | browser smoke, console, network errors, basic functional (§189) | V1 |
| STANDARD | + discovery, functional, API, accessibility, performance, visual (§190) | V1 |
| DEEP | + broader workflows, contracts, source checks, security config, DB correlation (§191) | V1–POST_V1 (phase-gated) |
| FULL | + authorized security, load, advanced code, AI evaluation where policy permits (§192) | POST_V1 (gated) |
| CUSTOM | explicit capability list | Any (policy-checked) |

WTT-TOL-PRO-002: Enablement (§193-rule): `GLOBAL_ENABLED · PROJECT_ENABLED · SESSION_ENABLED · PROFILE_SELECTED · AI_SELECTED · USER_SELECTED · DISABLED` — enablement NEVER implies execution permission; policy still gates every run (§19–§21).

## 119. V1 Toolset

WTT-TOL-V1S-001: Minimal strong V1 (candidate categories per §176-rule, reconciled with PRD §74 + PHASES §16 + ARCH V1): WTT Core Runtime · CLI · Authorization/Scope · Session · Event System · Dashboard · Playwright browser · DevTools · Evidence · Tool Registry · Discovery · Fingerprinting · Functional Testing · AI Orchestrator · AI Test Generation · REST API · Auth/RBAC · Visual · Accessibility · Performance · Network diagnostics · Finding Intelligence · Root Cause (basic) · Reporting.

WTT-TOL-V1S-002: Concrete V1 default adapters (sourced): **Playwright** (APPROVED) · **axe-core** (RECOMMENDED) · **Lighthouse-class smoke** (RECOMMENDED) · **curl/OpenSSL-class** network/TLS (RECOMMENDED) · **selected discovery adapters** (Playwright-discovery + parser support; crawler breadth V1_OPT) · **project-native test runners** (detected Vitest/Jest/pytest/JUnit — support, not bundled). V1 OPTIONAL (PRD `WTT-V1-003`, ship-if-ready, MUST NOT block): additional crawlers, Karate/Hurl, WS/GraphQL depth, email/file depth, SAST/SCA/secret subset, Nuclei/ZAP passive-safe, TestRail/Jira minimal export. NEVER the entire catalog (§176-rule).

## 120. Post-V1 Toolsets

WTT-TOL-PVS-001: Packs by release (§177-rule): **Security Pack** (P25/P26: DAST breadth, SAST/SCA/secrets/SBOM/IaC/K8s/cloud) · **Performance/Load Pack** (P22-depth/P34: budgets at scale, distributed load) · **Source Security Pack** (≡ Security Pack P26 slice) · **Database/Data Pack** (P27/P28: engines, quality/ETL/BI, files, email, connectors) · **AI Application Testing Pack** (P41/P42/P43: LLM/RAG/agent/safety/ML) · **Mobile Pack** (P44 + desktop) · **Enterprise Infrastructure Pack** (P35/P37/P40/P47: distribution, chaos/DR, store/secrets/notify/mgmt, control plane) · **Cloud Pack** (P26-AS/P37: CLIs, validators, IaC ops) · **Observability Pack** (P36/P46: OTel backends, synthetics). Research-bounded (PRD `WTT-V1-006`): autonomous learning loops, spec-to-suite at scale, self-evolving oracles, chaos/recovery beyond smoke.

## 121. Tool Packs

WTT-TOL-PAK-001: Logical install/enable groups (CONCEPTUAL names — `wtt-core · wtt-browser · wtt-api · wtt-quality · wtt-security · wtt-load · wtt-data · wtt-ai-testing · wtt-enterprise`; package names NOT finalized without ARCH approval, §178-rule).

WTT-TOL-PAK-002: Pack rule (§179): packs are CONVENIENCE groupings; the capability registry REMAINS authoritative; one tool MAY serve multiple packs (e.g., Playwright ∈ browser+quality+discovery).

## 122. Catalog-to-Phase Matrix

WTT-TOL-CPH-001: Every A–CZ domain mapped (condensed from §45.2; full per-domain detail in §§46–115):

| Catalog | Range | Domain | WTT Native | Default Adapter | Alternatives | Phase |
|---|---|---|---|---|---|---|
| A | 1–6 | Core Runtime | Managers | — | — | P01/P02 |
| B | 7–24 | AI Orchestration | Orchestrator/router | Provider adapters | Multi-provider | P13 |
| C–D | 25–49 | Tool Platform + Protocols | Registry/gateway/bindings | — | — | P08 |
| E–G | 50–106 | Discovery + Fingerprinting | Map/fingerprint DB | PW-discovery; Crawlee/Katana (fit) | Scrapy/parsers | P09 |
| H | 107–122 | App Intelligence Graphs | Graph store + queries | — | — | P10 |
| I | 123–156 | Browser Automation | Driver ports | Playwright (APPR.) | Selenium/WDIO/Cypress/Puppeteer | P06 |
| J–K | 157–201 | DevTools + Evidence | Bridge/correlator | CDP/BiDi/PW-instrumentation | Native telemetry | P07 |
| L–M | 202–241 | Functional + E2E | Test engine | PW-Test (project) | Cypress/Selenium/WDIO | P11 |
| N–P | 242–284 | Unit/Comp + Python + Java | Discovery + normalization | Vitest/Jest/pytest/Hypothesis/JUnit/TestNG | TBD (`TOL-OD-006`) | P12 |
| Q–R | 285–322 | AuthN + AuthZ | Probe engines | Browser/API adapters | — | P16 |
| S–V | 323–373 | REST/GQL/gRPC/Realtime/Msg | Native HTTP/GQL exec | curl/HTTPie; harnesses; brokers | Tavern/REST-Assured | P17/P18 |
| W–Y | 374–400 | Contracts + Property + Mocking | Orchestration | ODiff/Schemathesis/Prism/validators; WireMock/MSW | Pact/SCC/Dredd; MockServer/Mountebank | P19 |
| Z–AB | 401–448 | Visual/UI/Responsive | Heuristics/matrix/baselines | PW-capture; pixelmatch (REC.) | OpenCV; Backstop; T3-hosted | P20 |
| AC | 449–471 | Accessibility | AX-tree inspection | axe-core (REC.) | Pa11y; LH/AI/WAVE signals | P21 |
| AD | 472–479 | Web Performance | Budgets/time-series | Lighthouse (REC.) | LHCI; WPT/Sitespeed; Vitals APIs | P22 |
| AE–AF | 480–498 | Load/Stress | Scenarios/reports (norm.) | k6 (REC.) | JMeter/Gatling/Locust/Artillery/Vegeta/wrk/hey/auto | P34 |
| AG–AJ | 499–528 | Network/Proxy/DNS/TLS | Scope enforcement + mapping | curl/HTTPie/ping/mtr/tcpdump; mitmproxy; dig; OpenSSL/SSLyze/testssl | Fiddler/Charles/Proxyman (BYO) | P23 |
| AK | 529–536 | DAST | Tier enforcement/selection/audit | ZAP (REC.) | Nuclei/Wapiti/Nikto/httpx/nmap; Burp(T3) | P25 |
| AL | 537–551 | Security Config | Validators (default) | Passive-safe profiles | — | P24 |
| AM–AQ | 552–600 | SAST/SCA/Secrets/SBOM/Container | Selection + normalization | Semgrep/Trivy/Gitleaks/Syft (REC.) | CodeQL/Sonar/Bandit/SpotBugs; Grype/OSV; TruffleHog | P26 |
| AR–AS | 601–627 | K8s + Cloud Security | Validators | kube-bench/Kubescape/Polaris; cloud CLIs | — | P26 |
| AT–AU | 628–639 | Delivery + Test Data | Manager/fixtures/masking | Webhook harnesses | Faker-class (TBD) | P28 |
| AV–AX | 640–661 | Voice + Consent + Personas | Validators | — | — | P29 |
| AY | 662–667 | Risk Hotspots | Scorer | — | — | P31 |
| AZ–BA | 668–698 | CMS + Content | Packs | Project adapters | — | P29 |
| BB | 699–709 | SEO | Validators | LH-SEO/schema validators | — | P29 |
| BI–CB | 710–758 | Data/ETL/BI | Rule engines | GE/Soda/deequ/dbt-class | BI clients (T3–T4) | P28 |
| CC–CD | 759–789 | Files + Payments | Validators + sandbox pack | Format libs (TBD) | Pay vendors (TBD) | P28/P29 |
| CE–CF | 790–821 | E-Commerce + Privacy | Packs | Sandbox SDKs | — | P29 |
| CG–CQ | 822–837 | LLM App + Eval/Safety | Orchestration | Eval harnesses (TBD) | — | P41 |
| CH–CR | 838–853 | Agent/Trajectory + AI Safety | Trajectory harness | Safety harnesses (TBD) | — | P42 |
| CX | 854–869 | Mobile + Desktop | Driver ports | Appium (P44 core) | Maestro/Detox/Espresso/UIA2/XCUITest; Electron/WinApp | P44 |
| BC–BD | 870–900 | Connectors + Email | Registry + inbox | Mailpit-class | Mailtrap(T3); smtp4dev/GreenMail | P28 |
| BP | 901–908 | Git & VCS | Intelligence | git CLI/library | Hosting APIs | P39 |
| BE–BF | 909–925 | Database + Storage | Drivers (native-first) | CLI fallback; project migrations | — | P27 |
| BG–BH | 926–939 | i18n + Feeds + Trends/History | Validators + analytics | — | — | P29/P31/P36 |
| BS–CM | 940–958 | Secrets + Notify + Store + Mgmt | Lease/router/store/sync | Vault/Slack/S3/TestRail-class | Cloud/alt vendors | P40 |
| BK | 959–970 | RCA + Finding Intel | Normalizer/dedup/RCA | — | — | P30 |
| BL | 971–985 | Coverage | Aggregation (P31) | Istanbul/c8/pytest-cov/JaCoCo (P38) | — | P31/P38 |
| BM | 986–1001 | Fix Verification | Pipeline | — | — | P30/P32 |
| BN/BO | 1002–1021 | Healing + Flake | Engines | Browser-AI vision | — | P33 |
| CY | 1022–1027 | Hardening & GA | Gate checks | — | — | P48 |
| CI–CJ | 1028–1046 | Selection + Generation | Engines | Provider adapters | — | P14 |
| CK | 1047–1053 | ML Testing | Eval orchestration | scikit/TF/Torch BYO | — | P43 |
| BQ–BR | 1054–1078 | Chaos + Envs/DR | Blast control/drills | chaos-mesh-class; Docker/K8s/TF | — | P37 |
| CN | 1079–1089 | Learning & Strategy | Governed loops | — | — | P32 |
| CO | 1090–1098 | Continuous/Synthetic | Scheduler | PW/k6 synthetic workers | T3 synthetics | P46 |
| BT | 1099–1111 | Observability | OTel instrumentation | Prometheus/Grafana/Loki/Tempo/Jaeger/Elastic | Sentry/Datadog/NR (T3) | P36 |
| BU | 1112–1127 | Distributed Execution | Scheduler/queues | BullMQ-class (REC.) | NATS/Kafka/Temporal (triggered) | P35 |
| CP | 1128–1135 | Enterprise Control Plane | Org/fleet/audit | SSO/RBAC IdPs | — | P47 |
| CS | 1136–1164 | Live Dashboard | Backend + app | — | — | P05 |
| CT | 1165–1185 | Real-Time Events | Bus + relay | Redis Streams (REC.) | NATS/Kafka (triggered) | P04 |
| CV/CW | 1186–1206 | Terminal Runtime + Safety | Parser/policy/supervisor | CLI adapters (allowlist) | — | P03 |
| CU | 1190–1194 | CI / Release Core | Gate evaluator | CI provider adapters | — | P39 |
| BW–BZ | 1207–1225 | Build + Quality + Deps + Supply | Runners/normalization | npm/Maven/ESLint/Ruff/Stryker/renovate-class | — | P38 |
| CZ | 1226–1235 | Cost/Resource Intel | Ledger/router | Provider meters | — | P13/P36 |

---

## 123. Default Tool Matrix

WTT-TOL-DFL-001: Recommended default stack — ONLY source-justified defaults (§130-rule). Status key: `A`=APPROVED, `R`=RECOMMENDED, `D`=DECISION_REQUIRED.

| Capability | Default | Alternatives | Reason | St |
|---|---|---|---|---|
| Browser automation | Playwright | Selenium/WebdriverIO/Cypress/Puppeteer | PRD MUST Playwright-first; ARCH-160 V1 impl; CDP/BiDi depth | A |
| Discovery crawl | (fit-based; no single default) | Playwright/Crawlee/Katana/Scrapy | PRD "selected by fit" | D |
| Accessibility scan | axe-core | Pa11y (+LH/AI/WAVE signals) | PRD MUST axe-core-class + AX-tree | R |
| Performance audit | Lighthouse | LHCI/WPT/Sitespeed/Vitals APIs | PRD MUST-where-appropriate; V1 smoke | R |
| Visual capture / compare | Playwright / pixelmatch | OpenCV; Backstop; T3-hosted | Capture=engine; compare deterministic-first | A/R |
| REST/API test | WTT native HTTP | curl/HTTPie; Newman/Bruno/SuperTest/Karate/Hurl | Native default; harnesses project-fit | R |
| Contract validate | OpenAPI-Diff + validators (Ajv/Pydantic/Zod/Joi) | Schemathesis/Pact/SCC/Dredd | PRD MUST formats; consumer-driven optional | R |
| Load execute | k6 | JMeter/Gatling/Locust/Artillery/Vegeta/wrk/hey/auto | Listed first; TIER-1; K6Adapter exemplar | R |
| DAST scan | OWASP ZAP | Nuclei/Wapiti/Nikto/httpx/nmap; Burp(T3) | Listed first; ZapAdapter exemplar; safe-profiles-first | R |
| Security config | WTT native validators | Passive-safe profiles | Never heavyweight for basic config | R |
| SAST scan | Semgrep | CodeQL/SonarQube/Bandit/SpotBugs | Listed first; exemplar; TIER-1; per-language fit | R |
| SCA scan | Trivy | Grype/OSV-Scanner; Snyk(T3) | Exemplar; TIER-1; multi-target | R |
| Secret scan | Gitleaks | TruffleHog | Listed first | R |
| SBOM generate | Syft | (formats: CycloneDX/SPDX native) | Listed first | R |
| IaC audit | Checkov | tfsec/Terrascan/KICS | Listed first | R |
| K8s audit | kube-bench (+Kubescape/Polaris) | (per-cluster fit) | Listed set | R |
| DB query/read | Native drivers | CLI fallback (psql/…) | Structured reads over shell-out | R |
| Email capture | Mailpit/MailHog-class | smtp4dev/GreenMail; Mailtrap(T3) | TIER-1 class; local-first | R |
| TLS audit / DNS checks | OpenSSL / dig-class | SSLyze/testssl; DNSViz-class | PRD MUST coverage | R |
| Unit/Component | (project-detected: Vitest/Jest/pytest/JUnit…) | Ecosystem fit | Project-native, never forced | R |
| Build/Quality/Coverage/Mutation | (project-detected per stack) | §82–§85 sets | Detection > enforcement | R |
| Queue / Event transport | BullMQ-class / Redis Streams | NATS/Kafka/Temporal (triggered) | ARCH ADR-002/003 REC.; OD-002 evolution | R |
| Artifact store | Local filesystem | MinIO/S3/Blob/GCS (port) | ARCH REC.; OD-008 matrix | R |
| Secrets store | (env-fit: Vault/AWS/Azure/GCP/K8s/Docker) | OS store (evaluated) | Proposed set; localhost dev-vault | R |
| Observability | OpenTelemetry (+exporters) | Prometheus/Grafana/…; T3 APM | PRD MUST OTel; MAY backends | A/R |
| CI provider | (project-detected: GH/GL/Jenkins/…) | Progressive matrix | PRD MUST set, progressive | R |
| Notifications | (project-fit: Slack/Teams/email/webhook) | — | Proposed set | R |
| Test management | (org-fit: Jira/Linear/Boards/TestRail/Zephyr/Xray) | — | Proposed/Future; min-export V1_OPT | R |
| Mobile automate | Appium | Maestro/Detox/Espresso/UIA2/XCUITest | P44 core; per-OS depth | R |
| AI eval / safety harnesses | (TBD harnesses) | Vendor candidates | NO sourced vendors | D |
| File libs / data generators / pay vendors | (TBD) | Candidates (task-text) | NO sourced vendors | D |

## 124. Tool Tier Matrix

WTT-TOL-TTR-001: Priority matrix for important concrete engines (Tool | Tier | Phase | Default? | Installation | Risk):

| Tool | Tier | Phase | Default? | Installation | Risk |
|---|---|---|---|---|---|
| Playwright | T1 | P06 | YES (browser) | MANAGED_INSTALL | SAFE_TEST |
| axe-core | T1 | P21 | YES (a11y scan) | MANAGED_INSTALL | READ_ONLY |
| Lighthouse/LHCI | T1 | P22 | YES (perf audit) | MANAGED_INSTALL | READ_ONLY |
| k6 | T1 | P34 | YES (load) | MANAGED/USER | LOAD_ACTIVE |
| Semgrep | T1 | P26 | YES (SAST) | MANAGED/USER | READ_ONLY |
| Trivy | T1 | P26 | YES (SCA) | MANAGED/USER | READ_ONLY |
| ZAP | T2 | P25 | YES (DAST) | MANAGED/USER | SECURITY_ACTIVE |
| Nuclei | T2 | P25 | ALT (template scan) | MANAGED/USER | SECURITY_ACTIVE |
| Pa11y | T2 | P21 | FALLBACK (a11y) | MANAGED/PROJECT | READ_ONLY |
| WebPageTest/Sitespeed | T2 | P22 | ALT (perf depth) | REMOTE/USER | READ_ONLY |
| Selenium/WebdriverIO/Cypress/Puppeteer | T2 | P06+ | ALT (browser) | USER/PROJECT | SAFE_TEST |
| Crawlee/Katana/Scrapy | T2 | P09 | FIT-BASED | MANAGED/PROJECT | READ_ONLY |
| Newman/Bruno/SuperTest/Karate/Hurl | T2 | P17 | ALT (harness) | PROJECT/MANAGED | SAFE_TEST |
| Pact/Schemathesis/WireMock/MSW/Prism | T2 | P19 | ALT (contract/mock) | PROJECT/MANAGED | SAFE_TEST |
| pixelmatch/OpenCV | T2 | P20 | YES (compare)/ENRICH | MANAGED/PROJECT | READ_ONLY |
| Gitleaks/TruffleHog/Syft/Grype/OSV | T2 | P26 | YES(Gitleaks/Syft)/ALT | MANAGED/USER | READ_ONLY |
| Checkov/tfsec/Terrascan/KICS/kube-bench/Kubescape/Polaris | T2 | P26 | YES(Checkov/k-bench)/ALT | MANAGED/USER | READ_ONLY |
| mitmproxy/dig/OpenSSL/SSLyze/testssl/curl/HTTPie | T1–T2 | P23 | YES (net/dns/tls) | SYSTEM/MANAGED/USER | READ_ONLY–ACTIVE_NETWORK |
| Postgres/Redis drivers | T1 | P27/infra | YES (DB access) | PROJECT/SYSTEM | READ/WRITE-split |
| Mailpit/MailHog-class | T1 | P28 | YES (email capture) | MANAGED/DOCKER | SAFE_TEST |
| OTel SDK/Collector | T0 | P36 | YES (instrumentation) | BUILT_IN/MANAGED | READ_ONLY |
| BullMQ/Redis Streams | T1 | P04/P35 | YES (queue/events) | MANAGED (infra) | SYSTEM (infra) |
| Vitest/Jest/pytest/JUnit/TestNG/Hypothesis | T1–T2 | P12 | PROJECT-FIT | PROJECT_DEPENDENCY | SAFE_TEST |
| Appium | T1(P44) | P44 | YES (mobile) | MANAGED/USER | SAFE_TEST |
| BrowserStack/Sauce/LambdaTest | T3 | Post-P06 | OPT-IN (remote browser) | REMOTE_SERVICE | SAFE_TEST |
| Applitools/Percy/Chromatic | T3 | P20 | OPT-IN (hosted visual) | CLOUD_SERVICE | READ_ONLY (+privacy) |
| Burp (licensed) | T3 | P25 | OPT-IN (DAST) | USER_PROVIDED | SECURITY_ACTIVE |
| Snyk/Sonar-commercial | T3 | P26 | OPT-IN (SCA/SAST) | CLOUD/USER | READ_ONLY (+privacy) |
| Datadog/RUM/APM vendors | T3 | P36 | OPT-IN (APM) | CLOUD_SERVICE | READ_ONLY (+privacy) |
| TestRail/Zephyr (+Jira/Linear) | T2–T4 | P40 | ORG-FIT (mgmt sync) | CLOUD/ENTERPRISE | PROJECT_WRITE (sync) |
| Vault/AWS/Azure/GCP secrets | T2–T4 | P40 | ENV-FIT | ENTERPRISE_MANAGED | SCOPED (broker) |
| S3/MinIO/Blob/GCS | T2–T4 | P40 | ENV-FIT (artifacts) | ENTERPRISE_MANAGED | ARTIFACT_WRITE |

## 125. Language Matrix

WTT-TOL-LMX-001: Tool/Capability | Likely Language | Reason | Decision Status (`APPROVED/RECOMMENDED/DECISION_REQUIRED/NOT_APPLICABLE`):

| Tool/Capability | Likely Language | Reason | Decision |
|---|---|---|---|
| Control plane / CLI / gateway / registries | TypeScript/Node | Browser/npm/IO fit; single-language hot path (ARCH §78) | RECOMMENDED (ARCH) |
| Playwright adapters / browser workers | TypeScript | Direct browser/runtime ecosystem integration | RECOMMENDED (LANG-003) |
| axe-core / Lighthouse adapters | TypeScript | Node-native engines; in-process/child-process fit | RECOMMENDED |
| Discovery (PW/Crawlee/Cheerio) | TypeScript | Crawl + JS-render ecosystem | RECOMMENDED |
| Katana / k6 / wrk-class binaries | N/A (external binary) + TS harness | Engine language is upstream fact; WTT harness TS | REC. (harness) / N/A (engine) |
| Python test adapters (pytest/Hypothesis) | Python (project) + TS/JSONL bridge | Project-native execution; JSONL subprocess bridge | RECOMMENDED |
| Java test adapters (JUnit/TestNG) | Java (project) + TS bridge | Project-native; JVM-gated | RECOMMENDED |
| AI/vision analysis (OpenCV/RCA/vision) | Python | AI/ML/CV ecosystem | RECOMMENDED (LANG-003) |
| AI/data workers (FastAPI/Pydantic) | Python | PRD §73 Proposed stack | RECOMMENDED |
| Load workers (JMeter/Gatling Java; Locust Python) | Java / Python (engine) + TS orchestration | Engine-native; WTT orchestrates | REC. (orch.) / N/A (engine) |
| Distributed heavy workers | Java (only if justified) | Throughput + long-lived fit; opt-in | DECISION_REQUIRED per use (framework `TOL-OD-012`) |
| SAST/SCA/secret/SBOM/IaC adapters | TypeScript harness + engine-native | CLI/JSON-output engines; thin TS adapters | RECOMMENDED |
| DB drivers | TypeScript-first + engine CLIs | Structured reads; CLI fallback | RECOMMENDED |
| Dashboard backend | TypeScript (Fastify-class or NestJS) | Schema-first perf | DECISION_REQUIRED (`TOL-OD-004`, ARCH ADR-014/PRD OD-001) |
| Contracts package + bindings | TS source + generated PY/Java | Single-source schema truth | RECOMMENDED (ARCH) |
| Commercial SaaS / remote services | N/A | No WTT-side language; API integration TS | NOT_APPLICABLE |

## 126. Security Matrix

WTT-TOL-SMX-001: Tool | Risk | Authorization | Production | Approval (high-risk focus per §173-rule):

| Tool | Risk | Authorization | Production | Approval |
|---|---|---|---|---|
| ZAP (active) | SECURITY_ACTIVE | YES (artifact) | BLOCKED_BY_DEFAULT (explicit-approval escape) | USER→ADMIN (env-scaled) |
| Nuclei (active templates) | SECURITY_ACTIVE | YES | BLOCKED_BY_DEFAULT | USER→ADMIN |
| nmap-class / httpx-active | ACTIVE_NETWORK–SECURITY_ACTIVE | YES | BLOCKED_BY_DEFAULT | USER→ADMIN |
| k6 / JMeter / Gatling / Locust+ | LOAD_ACTIVE | YES (scope+caps+abort) | DENY beyond passive/smoke | USER→ADMIN |
| DB write tools | PROJECT_WRITE/SAFE_WRITE | YES (fixture scope) | PROHIBITED (writes) / READ-only | USER+ |
| Git write (checkpoint) | PROJECT_WRITE | POLICY (workspace trust) | N/A (local) | AUTO_WITH_POLICY |
| Git push / deploy | PROHIBITED | N/A | PROHIBITED | PROHIBITED (invariant 18) |
| Auto remediation apply | PROJECT_WRITE | YES (policy+approver) | PROHIBITED (local-only) | USER+ (dual-control optional) |
| Cloud write tools | SYSTEM_CHANGE | YES (separate auth) | ADMIN-gated | ADMIN_APPROVAL_REQUIRED |
| System commands (terminal) | Per-class mapping | Per-class | Per-class (deny-wins) | Per-class (TSEC-001/002) |
| Chaos/prod-chaos; red-team probes | DESTRUCTIVE / SECURITY_ACTIVE | YES (exceptional) | PROHIBITED-default (EXP-gated) | ADMIN (+ break-glass audit) |
| Real-money payment ops | DESTRUCTIVE | EXCEPTIONAL policy | PROHIBITED | PROHIBITED-default |
| SAST/SCA/secret/SBOM readers | READ_ONLY | NO (workspace trust) | N/A (source reads) | AUTO_ALLOWED |

## 127. Installation Matrix

WTT-TOL-IMX-001: Tool | Built-in | Managed | BYO | Container | Remote (✓ = applicable mode):

| Tool | Built-in | Managed | BYO/Project | Container | Remote |
|---|---|---|---|---|---|
| Native systems (§46) | ✓ | — | — | — | — |
| Playwright (+browsers) | — | ✓ | — | Opt-in | Grid=remote |
| axe-core / Lighthouse | — | ✓ | Project ok | — | — |
| k6 / ZAP / Semgrep / Trivy / Nuclei | — | ✓ | ✓ (BYO/license) | ✓ (fallback) | — |
| T2 CLI-class (curl/dig/OpenSSL/psql/git…) | — | — | ✓ (system) | — | — |
| Project runners (Vitest/Jest/pytest/JUnit…) | — | — | ✓ (project) | — | — |
| Mailpit-class | — | ✓ | — | ✓ | Mailtrap=remote |
| Burp / commercial SAST/SaaS | — | — | ✓ (licensed) | — | ✓ |
| Vault/S3/TestRail-class | — | — | — | — | ✓ (enterprise) |
| Browsers (grids) / device farms | — | — | — | — | ✓ |

## 128. OS Compatibility Matrix

WTT-TOL-OMX-001: Statuses `SUPPORTED/EXPECTED/UNKNOWN/UNSUPPORTED` — evidence-graded (§175-rule). NOTHING is `SUPPORTED` (repo has no code; WTT-side verification pending): cross-platform-portable tools are `EXPECTED` (rationale: upstream documents all-OS and/or ARCH-020 hard constraint + P00 all-OS pipeline); uncertain = `UNKNOWN`. No silent Bash/Linux assumptions.

| Tool | Windows | macOS | Linux | Notes |
|---|---|---|---|---|
| WTT native (TS/Node) | EXPECTED | EXPECTED | EXPECTED | ARCH-020; P00 pipeline |
| Playwright (+browsers) | EXPECTED | EXPECTED | EXPECTED | Upstream all-OS; verify at P06 |
| axe-core / Lighthouse / pixelmatch | EXPECTED | EXPECTED | EXPECTED | Node-based; verify at phase |
| Python workers/adapters | EXPECTED | EXPECTED | EXPECTED | Requires Python runtime (doctor-gated) |
| Java workers/adapters | EXPECTED | EXPECTED | EXPECTED | Requires JVM (opt-in, doctor-gated) |
| k6 / ZAP / Semgrep / Trivy / Nuclei / Gitleaks / Syft | EXPECTED | EXPECTED | EXPECTED | Upstream multi-OS binaries; verify at phase |
| curl / git / OpenSSL / dig | EXPECTED | EXPECTED | EXPECTED | System/user-provided; flag differences declared |
| ping / traceroute / netcat | EXPECTED* | EXPECTED* | EXPECTED* | *Flag/behavior differences per OS (declare in MATRIX) |
| tcpdump/tshark / iperf / mtr | UNKNOWN | EXPECTED | EXPECTED | Windows capture/divergence TBD at P23 |
| testssl.sh (Bash) | UNKNOWN | EXPECTED | EXPECTED | Bash dependency; Windows path TBD |
| mitmproxy / Fiddler / Charles / Proxyman | Per-vendor | Per-vendor | Per-vendor | Vendor OS realities; cert handling per OS |
| Mobile toolchains (adb/Xcode/WinApp) | Per-OS | Per-OS | Per-OS | OS-native by definition (P44) |
| Commercial SaaS / remote | NOT_APPLICABLE (remote) | — | — | Client needs only egress + creds |

---

## 129. Tool Testing Requirements

WTT-TOL-TST-001: Every adapter MUST have: unit tests · contract tests (schema/gateway validation) · fixture tests · failure-path tests (each §32 failure class reachable) · version-compatibility tests (min/preferred/max-tested) (§164-rule).

WTT-TOL-TST-002: High-risk tools (`SECURITY_ACTIVE/LOAD_ACTIVE/DESTRUCTIVE/SYSTEM_CHANGE/PROJECT_WRITE`) additionally REQUIRE: security-policy tests (deny/approve paths) · scope tests (in/out/fixture boundaries) · cancellation tests (graceful + forced + orphan-free). Auto-remediation additionally requires checkpoint/rollback tests; payment tools require sandbox-only tests with real-endpoint blocks asserted.

WTT-TOL-TST-003: Fixture strategy (§165-rule): SAFE fixtures only; NEVER run dangerous scanners/load against arbitrary public targets in CI — use controlled local targets/containers (e.g., localhost fixtures, Mailpit-class capture, fixture DBs, sandbox payment endpoints, P37-drill sandboxes). Fixture inventory is versioned with adapter tests.

## 130. Tool Definitions of Done

WTT-TOL-DOD-001: Adapter DoD (§166-rule) — an adapter is NOT done when invocation works:

```text
[ ] Manifest exists (§13, all REQUIRED fields).        [ ] Cancellation handled where relevant.
[ ] Capabilities mapped (§15).                         [ ] Health check works (§24).
[ ] Inputs validated (§13/§35).                        [ ] Errors normalized (§32).
[ ] Outputs normalized (§35).                          [ ] Evidence integrated (§36).
[ ] Permissions defined (§17).                         [ ] Events emitted (§37).
[ ] Risk defined (§18).                                [ ] Secrets redacted (§39).
[ ] Timeout implemented (§32).                         [ ] Tests pass (§129).
[ ] Phase acceptance criteria pass (PHASES gate).
```

WTT-TOL-DOD-002: Native-tool DoD (§167-rule):

```text
[ ] Requirement traced (PRD ID).  [ ] Capability registered (§15).  [ ] Architecture boundary respected.
[ ] Input/output contract implemented.  [ ] Policy enforced (§§19–21).  [ ] Tests pass.
[ ] Observability implemented (§37–§39).  [ ] Failure handling implemented (§32).  [ ] Documentation complete.
```

WTT-TOL-DOD-003: Commercial-integration DoD (§168-rule): authentication · rate limits · cost handling · privacy handling · network-failure handling · API-version handling · permission mapping — plus data-externalization row (§44) and fallback documented (§28).

## 131. Tool Registry Invariants

WTT-TOL-INV-001..025 — non-negotiable (§220-rule; violation = release-blocking defect):

1. AI requests capabilities, not unrestricted binaries.
2. Every tool must be registered (§41).
3. Every tool must declare capabilities (§13).
4. Every tool must declare permissions (§17).
5. Every tool must have risk classification (§18).
6. Tool execution must pass policy (§§19–21).
7. Active testing must pass authorization (§21).
8. Tool outputs are normalized (§35).
9. External reports are artifacts, not canonical truth (§35).
10. Tool failures are isolated (§§6/32).
11. Tools are selected according to need (§27).
12. Programming language is chosen according to technical requirement (§10).
13. Do not implement every tool in TypeScript + Python + Java (§10).
14. No silent system-level installation (§22).
15. No unrestricted shell execution (§§21/40 + terminal policy).
16. Secrets are referenced/redacted (§§39/44/112).
17. Large outputs become artifacts (§36).
18. Tool versions are traceable (§§25/38).
19. Tool executions are auditable (§38).
20. Every catalog capability is phase-mapped (§§45/122).
21. Optional tools do not block basic WTT (§32).
22. Local-first operation remains possible (RULES invariant 22).
23. Production policies are stricter (§20).
24. Tool selection must be explainable (§27).
25. Catalog complexity does not become product-navigation complexity (DESIGN §9; §134-rule).

## 132. Catalog Completeness Report

WTT-TOL-CCR-001: Computed from actual sources + this document's tables (method stated; nothing fabricated):

```text
Catalog domains (PHASES §70, unique A–CZ): ............ 104
Catalog capabilities (IDs 1–1235 contiguous): ......... 1235
Mapped domains: ........................................ 104
Mapped capabilities (range coverage §45.3): ............ 1235
Unmapped domains: ...................................... 0
Unmapped capabilities: ................................. 0
Native systems (§46 rows): ............................. 19
Concrete tool IDs minted (§14): ........................ 244
§123 default-matrix rows: .............................. 31  (26 named defaults + 3 fit/project-based + 2 TBD)
TIER_0 native core: .................................... 19 systems
TIER_1 default (PHASES §72 list): ...................... 19 members
TIER_2 optional open/BYO (derived: IDs minus T1/T3): ... ~200 identities (project-native + infra CLIs incl.)
TIER_3 commercial (derived from §124): ................ 16 members
TIER_4 enterprise classes (§120/§47): .................. 7 classes (SSO, fleets, Vault-prod, legal-hold, mgmt-sync, MCP-server, partners)
TIER_5 experimental classes (§120): ................... 5 classes (red-team depth, prod chaos, 3 research loops)
V1 toolings (§119: core + project-detected families): .. ~30 toolings (NEVER the full catalog)
V1_OPTIONAL adapter groups (PRD WTT-V1-003): .......... 7 groups
POST_V1: ............................................... remainder by phase (§122)
ENTERPRISE groups (PRD WTT-V1-005): ................... 9 groups
```

WTT-TOL-CCR-002: Coverage method (§170-rule): every capability preserved through structured range/subgroup mappings (§45); individually specified where unique security/runtime behavior applies (`*` rows in §§46–115); full ID-level registry deferred to the standalone catalog + future machine-readable companion (not created here). `Mapped = 1235 = total ⟹ Unmapped = 0`. Any future row-level gap MUST surface as `UNRESOLVED_MAPPING` in `TOOL-MATRIX.md`, never silently.

## 133. Open Tool Decisions

| ID | Decision | Status | Disposition |
|---|---|---|---|
| TOL-OD-001 | Standalone catalog row-level (1–1235) verification | DECISION_REQUIRED | Inherits `PHZ-OD-010`; §45 covers structure; row pass when catalog file lands |
| TOL-OD-002 | DESIGN.md "ARCH §64" error-taxonomy citations (should be §60/§61) | DECISION_REQUIRED (editorial) | Fix in DESIGN.md; non-semantic; TOOLS cites correctly |
| TOL-OD-003 | Enterprise MCP scope (servers/capabilities/attestation) | DECISION_REQUIRED | V1 scope = none (APPROVED exclusion); enterprise TBD |
| TOL-OD-004 | Dashboard backend framework (Fastify-class vs NestJS) | DECISION_REQUIRED | Inherits ARCH ADR-014 / PRD OD-001 |
| TOL-OD-005 | Primary crawler combination | DECISION_REQUIRED | PRD "selected by fit"; no single default approved (§49) |
| TOL-OD-006 | Unsourced-vendor omnibus (all tools below are CANDIDATES, not approved) | DECISION_REQUIRED | Cucumber/Robot/Serenity/AVA/Behave/HTTPX/AssertJ/Awaitility/Mockito/Hamcrest/Mocha/Jasmine/RTL/Vue/Angular/Storybook/Node-runner/unittest/tox/nox/pytest-plugins/Requests/Hoppscotch/GQL-Inspector/Apollo/GraphiQL/Kreya/Evans/grpcio/SoapUI/ReadyAPI/wscat/websocat/Tsung/Siege/Loki/Happo/resemble/ARC-Toolkit/Calibre/SpeedCurve/Testkube/Sonobuoy/KUTTL/Kind/Minikube/k3d/Kustomize/Kyverno/Gatekeeper/kube-linter/Conftest/OPA/Dockle/Scout/Podman/BuildKit/Testcontainers/Dependabot/Dep-Check/npm-pnpm-yarn-audit/pip-audit/detect-secrets/GH-GL-scanning/Dep-Track/Cosign/Sigstore/SLSA/FindSecBugs/SonarCloud/Checkly/UptimeRobot/FluentBit/Vector/Zipkin/Litmus/Chaos-TK/Gremlin/Toxiproxy/Pumba/FIS/Azure-Chaos/Pandera/Airflow/Dagster/Prefect/Spark/BI-vendors/pandas/openpyxl/POI/PyMuPDF/Tika/csvkit/xmllint/Ethereal/Screaming-Frog/Search-Console/Discord/PagerDuty/Opsgenie/SMS/push/GH-GL-Issues/YouTrack/qTest/TestOps/Allure/ReportPortal/Extent/Mochawesome/EarlGrey/pywinauto/SikuliX/WDIO-Electron/Mac2/Kobiton/AWS-Farm/Firebase-Lab/Pillow/k6-Operator/AWS-DLT/MLflow/Evidently/Argo/Tekton. Approve individually with fit rationale — never bulk. |
| TOL-OD-007 | Primary visual-diff stack (pixelmatch RECOMMENDED) | DECISION_REQUIRED | §59; confirm comparator + hosting posture |
| TOL-OD-008 | File-format libraries (per-format shortlist) | DECISION_REQUIRED | §78; select by format + tech requirement |
| TOL-OD-009 | Test-data generators (Faker-class candidates) | DECISION_REQUIRED | §92; orchestration-first per §102-rule |
| TOL-OD-010 | Payment vendors (sandbox SDKs) | DECISION_REQUIRED | §93; TEST-ONLY invariant regardless of vendor |
| TOL-OD-011 | AI eval/safety vendors (Promptfoo/DeepEval/Ragas/Giskard/Garak/PyRIT-class) | DECISION_REQUIRED | §§97–100; harness-first, vendors second |
| TOL-OD-012 | Java worker framework (only where Java justified) | DECISION_REQUIRED | §110; no framework named in sources |
| TOL-OD-013 | Managed-install allowlist + plugin signing strategy | DECISION_REQUIRED | Silent-install deny APPROVED; allowlist + sig policy TBD |
| TOL-OD-014 | Commercial adapter priorities (which T3 first) | DEFERRED | Post-V1; TIER-3 never blocks core |
| (inherited) | Queue evolution (NATS/Kafka/Temporal triggers) | DECISION_REQUIRED | PRD OD-002 / ARCH-350 / ARCH-OD-020; BullMQ-class REC. for V1 |
| (inherited) | Artifact backend matrix per tier | DECISION_REQUIRED | PRD OD-008; local-FS default APPROVED |

## 134. Appendices

### Appendix A — Tool chain example (cross-tool correlation, §132-prompt)

```text
Browser Agent → Playwright → Network Evidence → API Analyzer → Finding
→ Root Cause Engine → Code Intelligence → Patch → Verification
```

Tools MUST NOT operate as silos: every execution relates to session/target/environment/test/scenario/step/finding/artifact/agent/worker where applicable (§133-prompt correlation rule).

### Appendix B — Target-stack selection scenario (§131-prompt)

Target: React SPA + REST API + PostgreSQL + auth + responsive UI. Selected: browser→Playwright · a11y→axe-core · perf→Lighthouse · API→WTT native HTTP · visual-capture→Playwright (+pixelmatch compare) · DB→PostgreSQL native adapter · AI→configured provider route · discovery→Playwright-discovery + parsers. NOT selected: SOAP/gRPC/K8s-scanners/mobile (no evidence of need — discovery-gated, §27).

### Appendix C — Requirement traceability sample (§225-rule; full trace in MATRIX)

```text
PRD WTT-A11Y-002 (MUST axe-core-class) → accessibility.scan → accessibility.axe (REC. default)
→ P21 → Validation: contract + fixture + WCAG-mapping tests (§129) + axe self-check acceptance (DESIGN §82)
PRD WTT-BRW-001 (MUST Playwright-first) → browser.* → browser.playwright (APPR.)
→ P06 → Validation: port-conformance + replaceability tests (ARCH-160)
PRD WTT-TOOL-020 (MUST JSONL/HTTP/gRPC integration) → tool.protocol.bind → native bindings
→ P08 → Validation: cross-language contract tests (RULES invariant 21)
```

### Appendix D — Consolidated toolsets (required end-matter, §230)

**WTT DEFAULT TOOL STACK** (§123, 26 named defaults): Playwright · axe-core · Lighthouse · pixelmatch-compare · WTT-native-HTTP · OpenAPI-Diff+validators · k6 · ZAP · native-sec-validators · Semgrep · Trivy · Gitleaks · Syft · Checkov · kube-bench-set · native-DB-drivers · Mailpit-class · OpenSSL/dig-class · OTel · BullMQ/Redis-Streams · local-FS store · env-fit secret stores · project-fit CI/notify/mgmt · Appium. Fit-based: crawlers · unit/build runners. TBD: AI-eval/file/pay vendors.

**WTT NATIVE TOOL SYSTEMS** (§46, 19 systems): CLI · Target · AuthZ/Scope · Session · Env-Detector · AI-Orchestrator · Router/Planner · Registries+Resolver · Health/Perm/Audit · Graph · Finding-Norm/Dedup · Evidence · RCA-Coordinator · CodeCtx/Impact · Remediation · Verification · Gates · Events · Dashboard-Backend.

**V1 TOOLSET** (§119): §119.1 categories + §119.2 concrete adapters + 7 V1_OPTIONAL groups (PRD `WTT-V1-003`).

**OPTIONAL TOOLSET** (TIER-2, POST_V1 unless V1_OPT): all §124 T2 rows — Selenium-set, Pa11y, WPT/Sitespeed, Gatling/Locust/JMeter/Wrk, CodeQL/Bandit/Grype/OSV, Newman/Bruno/SuperTest/Karate/Hurl, Pact/Schemathesis/WireMock/MSW/Prism, Crawlee/Katana/Scrapy, Nuclei/Wapiti/Nikto/httpx/nmap, Terraform/Compose, alt-CI providers, alt-notifiers, Espresso/XCUITest/WinAppDriver, eval harnesses, + project-native runners (detected).

**ENTERPRISE TOOLSET** (TIER-4 + PRD `WTT-V1-005`): orgs/SSO-RBAC · cloud artifact backends · Vault-class secrets · retention/legal-hold · fleet dashboards + grids · ticket/test-mgmt sync (prod) · MCP server · partner adapters · commercial-security prod depth.

**EXPERIMENTAL TOOLSET** (TIER-5): P42 red-team depth · P37 production chaos · research loops (learning/spec-to-suite/evolving oracles per `WTT-V1-006`) · advanced AI visual agents (as approved).

**Pointers (all required end-matter present):** CATALOG-TO-PHASE §122 · TOOL TIER §124 · LANGUAGE §125 · SECURITY §126 · INSTALLATION §127 · OS-COMPAT §128 (+§175-rule) · COMPLETENESS §132 · OPEN DECISIONS §133 · INVARIANTS §131.

### Appendix E — Version history

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-09-07 | Initial canonical registry. 104 domains / 1235 capabilities mapped, 0 unmapped; 244 tool IDs; 19 native systems; 31-row default matrix. Sources: PRD/ARCH/RULES v0.1.0, PHASES v0.2.0, DESIGN v0.1.0, catalog via PHASES §70. |

*End of TOOLS.md v0.1.0 — Canonical Draft for Review.*
PHASES §70. |

*End of TOOLS.md v0.1.0 — Canonical Draft for Review.*
