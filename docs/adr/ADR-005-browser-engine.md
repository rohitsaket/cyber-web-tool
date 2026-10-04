# ADR-005 — Browser engine

**Status:** ACCEPTED baseline (ratified WTT-P00; engine integration + ports locked WTT-P06) · **Trace:** PRD WTT-BRW-001 (MUST Playwright-first); ARCHITECTURE §16 (two surfaces), §78 (Browser engine row); TOOLS.md WTT-TOL-BRS-001 ("Playwright — APPROVED"); RULES §13.

## Context

Browser automation is the deepest dependency in the product. Selection is a PRD-level MUST
(Playwright-first), so P00's job is recording the decision + seams, not re-litigating tools
(RULES §11: capability-first; engine choice stays inside the capability phase).

## Decision

- **Playwright (Chromium-first) is the default engine**, reached only through WTT-owned
  `BrowserDriver` ports; nothing outside the browser-engine package imports engine SDKs
  (WTT-TOL-BRS-001, RULES WTT-RULE-BRW-001).
- CDP for Chromium depth + BiDi where available (ARCH §16); Selenium-class and grid vendors are
  adapter-plan territory (TIER-3 seams; no V1 obligation).
- Two-browser-surface architecture preserved (target browser vs automation contexts; origin/
  storage/token isolation; ARCH §16.1) — engine must supply context isolation; it does.
- Firefox/WebKit timing = PRD OD-005, due with the P06/V1 matrix; ADR-005 does not pre-decide it.
- Process-per-context vs shared low-RAM default = ARCH-OD-018, due P06 (recorded PENDING there).

## Consequences

- ✅ One pinned engine in V1 (managed-adapter install tier, PHASES §7: never silently
  system-installing) — availability checks belong to `wtt doctor` (P03).
- ⚠️ Engine version churn → per-pin compatibility declarations + conformance suite at P06/P08.
