#!/usr/bin/env python3
"""
Parse a Lighthouse JSON report and extract accessibility failures.
Focuses on color-contrast issues and other a11y audit failures.

Usage:
  python3 scripts/parse_lighthouse_report.py <report.json> [--json]

Output: Human-readable summary or JSON (with --json flag)
"""

import json
import sys
from pathlib import Path


def parse_report(report_path: str, output_json: bool = False) -> dict:
    with open(report_path) as f:
        data = json.load(f)

    audits = data.get("audits", {})
    categories = data.get("categories", {})

    # Get all a11y audit IDs
    a11y_refs = categories.get("accessibility", {}).get("auditRefs", [])
    a11y_ids = {ref["id"] for ref in a11y_refs}

    # Overall score
    a11y_score = categories.get("accessibility", {}).get("score")
    if a11y_score is not None:
        a11y_score = round(a11y_score * 100)

    # Collect failures
    failures = []
    for key, audit in audits.items():
        if key not in a11y_ids:
            continue
        if audit.get("score") != 0:
            continue

        title = audit.get("title", key)
        description = audit.get("description", "")
        details = audit.get("details", {})
        items = details.get("items", [])

        elements = []
        for item in items[:10]:
            node = item.get("node", {})
            elements.append({
                "snippet": node.get("snippet", "")[:150],
                "selector": node.get("selector", ""),
                "explanation": node.get("explanation", item.get("explanation", ""))[:200],
            })

        failures.append({
            "audit_id": key,
            "title": title,
            "description": description[:150],
            "elements": elements,
        })

    # Special handling for color-contrast
    cc = audits.get("color-contrast", {})
    contrast_issues = []
    if cc.get("score") == 0:
        for item in cc.get("details", {}).get("items", [])[:15]:
            node = item.get("node", {})
            contrast_issues.append({
                "snippet": node.get("snippet", "")[:150],
                "selector": node.get("selector", ""),
                "explanation": node.get("explanation", "")[:200],
            })

    result = {
        "score": a11y_score,
        "failures": failures,
        "contrast_issues": contrast_issues,
        "contrast_pass": cc.get("score") == 1,
    }

    if output_json:
        return result

    # Human-readable output
    print(f"A11y Score: {a11y_score}%")
    print(f"Failures: {len(failures)}")
    print(f"Contrast: {'PASS' if result['contrast_pass'] else f'FAIL ({len(contrast_issues)} elements)'}")
    print()

    for fail in failures:
        print(f"  FAIL: {fail['title']}")
        for el in fail["elements"][:3]:
            if el["snippet"]:
                print(f"    snippet: {el['snippet']}")
            if el["explanation"]:
                print(f"    reason: {el['explanation']}")
        print()

    if contrast_issues:
        print("  COLOR CONTRAST ISSUES:")
        for issue in contrast_issues:
            print(f"    - {issue['snippet']}")
            if issue["explanation"]:
                print(f"      {issue['explanation']}")

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/parse_lighthouse_report.py <report.json> [--json]")
        sys.exit(1)

    report_path = sys.argv[1]
    output_json = "--json" in sys.argv

    if not Path(report_path).exists():
        print(f"Error: {report_path} not found")
        sys.exit(1)

    result = parse_report(report_path, output_json)

    if output_json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
