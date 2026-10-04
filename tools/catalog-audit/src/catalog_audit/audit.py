"""Structural audit of the Global Tool Catalog in PHASES.md.

Implements the method recorded in PHASES.md §92:
(1) parse the §70 Catalog-to-Phase matrix rows; assert capability IDs 1–1235 are each
    covered exactly once (zero gaps, zero overlaps);
(2) assert all 104 domains A–CZ are present;
(3) assert every phase section's ``- **Catalog:**`` line (domains §§19–67) references a
    §70 row whose range contains it and whose primary-phase cell names that phase.

The module is pure over markdown text so it can be unit-tested with fixtures; the CLI
layer reads files. Inputs are repository-controlled documents: parsing is linear, with
no eval/exec/network access (WTT-P00 security review, plan §6).
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Final

MIN_ID: Final = 1
MAX_ID: Final = 1235
EXPECTED_DOMAIN_COUNT: Final = 104

# §70 row: | A | 1–6 | name | P01 (foundation rows) / P02 (auth/scope rows) |
_ROW_RE: Final = re.compile(
    r"^\|\s*([A-Z]{1,2})\s*\|\s*(\d+)\s*[–-]\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$",
    re.MULTILINE,
)
# Phase section heading, e.g. "## 20. WTT-P01 — Core Domain Model & Control Plane Foundation"
_PHASE_HEADING_RE: Final = re.compile(r"^## \d+\. (WTT-P\d+) — ", re.MULTILINE)
# Domain/range reference inside a phase "Catalog:" line, e.g. "A 1–6" / "CT 1165–1185".
_REF_RE: Final = re.compile(r"\b([A-Z]{1,2}) (\d+)[–-](\d+)\b")
_EN_DASH_IDENTITY_RE: Final = re.compile(r"[–—]")


@dataclass(frozen=True)
class CatalogRow:
    """One §70 matrix row: a domain's ID range and its primary-phase cell."""

    domain: str
    start: int
    end: int
    name: str
    primary: str


@dataclass(frozen=True)
class AuditOutcome:
    """Result of one audit run: violation lines + machine-readable stats."""

    ok: bool
    issues: list[str]
    stats: dict[str, int]

    def summary(self) -> str:
        return (
            f"domains: {self.stats['domains']}/{EXPECTED_DOMAIN_COUNT} | "
            f"covered: {self.stats['covered']}/{MAX_ID - MIN_ID + 1} | "
            f"missing: {self.stats['missing']} | overlaps: {self.stats['overlaps']} | "
            f"phase-check violations: {self.stats['phase_violations']}"
        )


def _section(text: str, start_needle: str, end_needle: str) -> str:
    """Return the text between two heading needles (end-exclusive). Empty if absent."""
    start = text.find(start_needle)
    if start == -1:
        return ""
    end = text.find(end_needle, start + len(start_needle))
    return text[start:] if end == -1 else text[start:end]


def parse_catalog_rows(section_text: str) -> list[CatalogRow]:
    """Parse all §70 matrix rows from the given section text."""
    rows: list[CatalogRow] = []
    for match in _ROW_RE.finditer(section_text):
        domain, start, end, name, primary = match.groups()
        rows.append(
            CatalogRow(
                domain=domain,
                start=int(start),
                end=int(end),
                name=_EN_DASH_IDENTITY_RE.sub("-", name),
                primary=primary,
            )
        )
    return rows


def expected_domains() -> set[str]:
    """A–Z plus AA–AZ, BA–BZ, CA–CZ (the canonical 104-domain universe)."""
    singles = {chr(letter) for letter in range(ord("A"), ord("Z") + 1)}
    pairs = {
        f"{first}{second}"
        for first in "ABC"
        for second in (chr(letter) for letter in range(ord("A"), ord("Z") + 1))
    }
    return singles | pairs


def id_coverage(rows: list[CatalogRow]) -> tuple[list[int], list[str]]:
    """Return (missing ids, overlap descriptions) across [MIN_ID, MAX_ID]."""
    seen: dict[int, str] = {}
    overlaps: list[str] = []
    for row in rows:
        if row.start > row.end:
            overlaps.append(f"{row.domain}: inverted range {row.start}>{row.end}")
            continue
        for capability_id in range(row.start, row.end + 1):
            if capability_id in seen:
                overlaps.append(
                    f"OVERLAP at {capability_id}: {seen[capability_id]} vs {row.domain}"
                )
            else:
                seen[capability_id] = row.domain
    missing = [i for i in range(MIN_ID, MAX_ID + 1) if i not in seen]
    return missing, overlaps


def _phase_sections(text: str) -> list[tuple[str, str]]:
    """Split the document into (phase id, section body) pairs for §§19–67 style phases."""
    headings = list(_PHASE_HEADING_RE.finditer(text))
    sections: list[tuple[str, str]] = []
    for index, heading in enumerate(headings):
        start = heading.start()
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        sections.append((heading.group(1), text[start:end]))
    return sections


def check_phase_catalog_lines(rows: list[CatalogRow], text: str) -> list[str]:
    """Assert each phase 'Catalog:' domain/range reference matches the §70 matrix."""
    issues: list[str] = []
    for phase_id, body in _phase_sections(text):
        catalog_match = re.search(r"^- \*\*Catalog:\*\* (.*)$", body, re.MULTILINE)
        if catalog_match is None:
            continue
        line = catalog_match.group(1)
        phase_token = phase_id.removeprefix("WTT-")
        for domain, start_s, end_s in _REF_RE.findall(line):
            start, end = int(start_s), int(end_s)
            covering = [
                row
                for row in rows
                if row.domain == domain and row.start <= start and end <= row.end
            ]
            if not covering:
                issues.append(
                    f"{phase_id}: Catalog line references {domain} {start}-{end} "
                    "which no §70 row covers"
                )
                continue
            if not any(re.search(rf"\b{phase_token}\b", row.primary) for row in covering):
                primaries = " / ".join(row.primary for row in covering)
                issues.append(
                    f"{phase_id}: {domain} {start}-{end} not assigned to {phase_token} "
                    f"in §70 (primary: {primaries})"
                )
    return issues


def audit_catalog(text: str) -> AuditOutcome:
    """Run the full §92 audit over one PHASES.md document text."""
    issues: list[str] = []
    section = _section(text, "## 70. Catalog-to-Phase Matrix", "## 71.")
    rows = parse_catalog_rows(section)
    if not rows:
        return AuditOutcome(
            ok=False,
            issues=["no §70 Catalog-to-Phase matrix rows found"],
            stats={
                "domains": 0,
                "covered": 0,
                "missing": MAX_ID - MIN_ID + 1,
                "overlaps": 0,
                "phase_violations": 0,
            },
        )

    domains = {row.domain for row in rows}
    missing_ids, overlaps = id_coverage(rows)
    if missing_ids:
        head = ", ".join(str(i) for i in missing_ids[:10])
        issues.append(f"GAPS: {len(missing_ids)} ids not covered ({head})")
    issues.extend(overlaps)

    missing_domains = sorted(expected_domains() - domains)
    extra_domains = sorted(domains - expected_domains())
    if missing_domains:
        issues.append(f"MISSING DOMAINS: {', '.join(missing_domains)}")
    if extra_domains:
        issues.append(f"UNKNOWN DOMAINS: {', '.join(extra_domains)}")

    for row in rows:
        if not re.search(r"\bP\d{2}\b", row.primary):
            issues.append(f"UNOWNED ROW: {row.domain} {row.start}-{row.end} has no Pnn owner")

    phase_issues = check_phase_catalog_lines(rows, text)
    issues.extend(phase_issues)

    covered = MAX_ID - MIN_ID + 1 - len(missing_ids)
    stats = {
        "domains": len(domains),
        "covered": min(covered, MAX_ID),
        "missing": len(missing_ids),
        "overlaps": len(overlaps),
        "phase_violations": len(phase_issues),
    }
    return AuditOutcome(ok=not issues, issues=issues, stats=stats)
