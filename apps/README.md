# apps/ — executable applications (planned)

Per ADR-010 (`docs/adr/ADR-010-monorepo-strategy.md`) and ARCHITECTURE §77.
**P00 rule:** no code may appear here before its owning phase opens (PHASES §19 "MUST NOT create runtime services").

| Planned app | Introduced by | Purpose |
|---|---|---|
| `apps/cli` | WTT-P03 | `wtt` entrypoint — thin parser/exit-code shell over the control plane |
| `apps/control-plane` | WTT-P03 (process runtime) | modular monolith host; Dashboard API surface in WTT-P05 |
| `apps/dashboard` | WTT-P05 | React/Vite live dashboard (non-authoritative surface) |

Ownership of everything under this directory is recorded in `contracts/ownership.json`.
