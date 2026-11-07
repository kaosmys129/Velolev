# WordPress Theme Retirement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Track completion below.

**Goal:** Remove the old WordPress theme, resources and authoring pipeline while retaining the seven-language industrial site and reviewed content/inquiry contracts.
**Architecture:** Keep ProcurementLayout and core route configuration. Migrate genuine media out of wp-content; terminal aliases replace five old English pages, and a standalone error shell uses the shared layout. Archive the retired pipeline before removal; assess the final build for legacy requests.
**Tech Stack:** Astro 5, Node 22, parse5, SQLite inquiry service, existing browser tests.
**Spec:** docs/content-strategy/wordpress-theme-removal-assessment.md and user approval to execute its sequence.

## Global Constraints
- Preserve source S4, original factual boundaries, seven-language core content, reviewed-snapshot publication and inquiry persistence.
- No deployment, push, credential changes or email delivery.
- Keep local recoverable tar archive with per-file hashes and a deletion manifest; preserve original asset bytes when relocating.
- Current dirty tree is the source of truth; no git reset, clean or replacement checkout.

## Review Focus
- A renamed poster/font must resolve through CSS, preload, OG, gallery and offline tooling.
- Every old alias reaches a final current-language page in one HTTP redirect and preserves queries.
- Unknown URLs return real 404 with modern Header/Footer and no canonical/hreflang advertising the homepage.
- Retiring fragments must not break inventory, publication checks, source fingerprints or private inquiry tools.
- Public build contains no legacy assets and no old browser tests silently ignore their missing requests.

## Tasks
- [x] 1. Capture pre-change inventory; archive retired sources, all legacy assets, mirrors and old editing tools, verify archive hashes.
- [x] 2. Move two current product images, font and two design-export product assets; update all live code/tool references and asset fingerprints.
- [x] 3. Add final English aliases matching existing localized thematic mappings; replace 404 with shared industrial layout and explicit error metadata; retire disabled GEOFlow public article route branches.
- [x] 4. Archive/remove old layouts, fragments, editor, generation scripts and mirror tools; replace fragment inventory with current built-page inventory; keep policy tests and reviewed publication adapter.
- [x] 5. Remove public wp-content/wp-includes, simplify root package dependencies/lockfile, update startup docs and QA scripts; add a build/output retirement guard.
- [x] 6. Run build, full existing suite, locale/static/HTTP retirement checks, configured-domain checks and available browser checks. Record environment blockers exactly and final size delta.

## Validation
Meaningful regression test `scripts/wordpress-retirement.test.mjs`: all old English aliases map to registered terminal destinations; archive/restoration data retains removed assets; 404, media and source policy contracts remain intact. Built-output/HTTP check verifies every HTML/asset reference, real 404, all aliases, CSV downloads and modern shells. Existing `npm test`, `locales:check` and browser suites cover core behavior.

## Progress and decisions
- Approved execution comes from the user's instruction to complete the assessed sequence; no additional approval gate.
- Work in current directory because the active refactor is predominantly uncommitted; isolate via archive and an explicit removal manifest.
- Existing `legacyPageKeys` already maps the five unretired English topics to solar/resources/ROI. Reuse those reviewed destinations rather than invent maintenance procedures.

- Tasks 1–5 complete: archives verified; 1,748 retired files recorded; 3 regression tests observed failing before changes and passing afterward. First clean build: 120 modern public HTML documents (119 core + 404), zero WordPress resources.
- Inventory smoke run exposed absent canonical metadata in preview mode; fixed optional attribute access rather than creating a false canonical.

- Independent review: no Critical/Important blockers. Inventory coverage of future reviewed articles was identified as Minor; regraded as a maintenance regression because this task replaces the old inventory. Added a focused fixture test (observed RED) and a shared built-page inventory parser; excludes redirects/admin/404 and retains reviewed guide articles.

- Complete: 49 tests, 533 locale checks, 631 static retirement checks, 1,172 real HTTP checks, configured D30/D60 metadata fixtures and offline reviewed-article fixture passed. Native browser verified 42 responsive render combinations plus relevant interactions; no remaining review findings.
- Final artifacts: docs/content-strategy/wordpress-retirement-completion.md and .json; source fingerprint ad798f5033c1de7e090d566e2cb7893db47f39527fc61e885a75947b40391d77.
- Integration: retain changes in the user’s current working directory; no commit/push/deployment requested or performed.
