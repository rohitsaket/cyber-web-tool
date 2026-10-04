"""Command-line entry point for the WTT catalog structural audit."""

from __future__ import annotations

import argparse
import json
import sys
from collections.abc import Sequence
from pathlib import Path

from catalog_audit.audit import audit_catalog


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="wtt-catalog-audit",
        description=(
            "Structural audit of the Global Tool Catalog (PHASES.md §70/§92): "
            "IDs 1–1235 covered exactly once, 104 domains, phase Catalog-line cross-check."
        ),
    )
    parser.add_argument(
        "--phases",
        default="PHASES.md",
        help="Path to PHASES.md (default: PHASES.md in the current directory)",
    )
    parser.add_argument("--json", action="store_true", help="Emit machine-readable JSON result")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    """Run the audit; returns a process exit code (0 ok · 1 violations · 2 usage/IO)."""
    parser = _build_parser()
    try:
        args = parser.parse_args(argv)
    except SystemExit as exit_error:  # argparse already printed a message
        code = exit_error.code
        return 2 if code in (None, 0) else int(code)

    path = Path(args.phases)
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as io_error:
        print(f"error: cannot read {path}: {io_error}", file=sys.stderr)
        return 2

    outcome = audit_catalog(text)
    if args.json:
        print(
            json.dumps(
                {"ok": outcome.ok, "summary": outcome.summary(), "issues": outcome.issues},
                indent=2,
            )
        )
    else:
        print(f"catalog-audit: {'PASS' if outcome.ok else 'FAIL'} — {outcome.summary()}")
        for line in outcome.issues:
            print(f"  {line}")
    return 0 if outcome.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
