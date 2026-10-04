# ADR-001 — Control-plane shape

**Status:** ACCEPTED (ratified WTT-P00) · **Trace:** ARCHITECTURE §8 (architectural style), §14/§14.1 (module map), §74 (V1), §75 (evolution); RULES WTT-RULE-ARC-001/003/009; PRD WTT-GOAL-020.

## Context

WTT must stay one command (`wtt <URL>`) and local-first while ~49 phases add modules. Options
were modular monolith, microservices, or plugin-everything. RULES WTT-RULE-ARC-008 forbids
premise-free distribution; ARCHITECTURE §74 fixes V1 as a modular monolith with extraction seams.

## Decision

V1 control plane is a **TypeScript modular monolith**: one process owning the §14.1 module map
(Session Manager, Config, Target/Scope, Policy Engine, Tool Registry+Resolver, Event Router,
Scheduler, Artifact metadata, Finding Engine, Verification, Gate Evaluator, Report Builder,
Credential Broker, Audit Sink, Dashboard API, OTel harness). Each module is a `packages/*` or
control-plane module with: public interface (ports), internal implementation, its own tests.
Extraction to a service later requires: measured scale/reliability trigger + ADR + versioned
contract + auth boundary (API WTT-API-INT-003). WTT-P01 places domain logic in `packages/core`
(never in `apps/*`), so the CLI (P03) and API (P05) stay thin shells over the same services.

## Consequences

- ✅ Single deployment story for local-first; contracts-first seams keep future splits possible.
- ✅ Dependency direction (`Domain ← Application ← Infrastructure`) is unit-testable and CI-checkable per package from P01 on.
- ⚠️ Boundary erosion risk — mitigated by package-level import rules + ownership registry + dependency-direction checks (ARCH §77 monorepo note; enforced from P01's plan).
