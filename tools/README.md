# tools/ — governance & adapter tooling

## Present (WTT-P00)
- `audits/` — TypeScript governance audits: contract-ownership registry validation + cross-document terminology audit. Run via root scripts `npm run audit:ownership` / `npm run audit:terminology`.
- `catalog-audit/` — Python structural audit of the Global Tool Catalog (PHASES §92 method): 104 domains, capability IDs 1–1235 contiguous/unique, phase catalog-line cross-check.

These are **build/governance tools**, not product runtime — they never run in a WTT session and touch the repo read-only.

## Planned (later phases)
- `tools/adapters/…` — external tool adapters behind the Tool Contract, introduced by WTT-P08+ per `TOOL-MATRIX.md`. Never silently installed; every adapter registers through the Tool Gateway (RULES WTT-RULE-TOOL-001).
