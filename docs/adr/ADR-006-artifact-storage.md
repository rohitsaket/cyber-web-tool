# ADR-006 — Artifact storage

**Status:** ACCEPTED baseline (ratified WTT-P00; evidence pipeline WTT-P07; managed storage WTT-P40) · **Trace:** ARCHITECTURE §36–37, §50, §78 (Artifact storage row "APPROVED BY PRD (baseline)"); PRD WTT-EVD-*/WTT-ART-* (§55/§56 areas); RULES §25–26; PRD OD-008 (backends matrix, due per §80).

## Context

Evidence (HARs, traces, screenshots, videos, tool outputs) is large, sensitive, and must never
live in event payloads or DB rows (ARCH §79 invariant 11; RULES §26 "stored by reference").

## Decision

- **Filesystem layout is V1** under a workspace root with content-addressed names
  (`sha256`-keyed objects + metadata index in PostgreSQL; Artifact Service is the single owner of
  artifact metadata — RULES §17 authority rule).
- Events and findings carry **references only** (artifact id + hash + media type + size);
  retrieval via versioned read APIs.
- **S3-compatible backend is the first pluggable alternative** through one `ArtifactStore` port
  (RULES WTT-RULE-DPD-003 no lock-in); per-tier defaults = PRD OD-008, decided with P40.
- Retention/encryption/GC policies are owned by P07 (evidence integrity) and P40 (management);
  this ADR fixes the shape, not the schedules.

## Consequences

- ✅ Local-first: zero external services required for evidence.
- ⚠️ FS limits (quota, no cross-node sharing) are the measured trigger for P40 backends —
  scheduler headroom rules (WTT-RULE-RES-002 §45) already bound growth.
