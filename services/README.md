# services/ — non-TypeScript runtime services (dormant)

Per ADR-010, ARCHITECTURE §30–31, PHASES §74 (language matrix).

| Planned service | Language | Introduced by | State |
|---|---|---|---|
| `services/python-ai` | Python | WTT-P13 (AI orchestration) | DORMANT — no scaffolding before its phase |
| `services/java-worker` | Java | WTT-P12+ / WTT-P35 (throughput-justified workers) | DORMANT — Java toolchain documented, not stubbed (PHASES §19) |

Rules: services communicate only through typed, versioned contracts generated from `contracts/` (RULES WTT-RULE-LANG-004; ARCH-310). Language choice is re-evaluated per capability (RULES §12) — directories here are defaults, never dogma.
