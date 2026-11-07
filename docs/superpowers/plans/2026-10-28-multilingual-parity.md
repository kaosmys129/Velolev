# Multilingual Parity Implementation Plan

**Goal:** Make es/fr/pt share the English industrial site structure, performance and navigation.

**Architecture:** Reuse procurement Astro components. A build-only translation module transforms text and registered links while preserving interactive data and code. A single route registry drives localized pages, links and alternates.

**Tech Stack:** Astro 5, static HTML, parse5, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-28-multilingual-parity-design.md`

## Constraints and review focus

Preserve existing user changes and technical facts. Keep old localized core URLs working. Do not load Elementor, jQuery or client translation libraries. Verify query/hash retention, form hidden values, accessible dynamic media copy, narrow screens and page-preserving language switching.

- [ ] Add behavioral route/markup tests and confirm failures against the current site.
- [ ] Create complete independent es/fr/pt catalogs from the English rendered-copy inventory; validate key coverage and placeholders.
- [ ] Add route registry and build-time localizer; integrate shared layout and localized page dispatcher.
- [ ] Remove legacy-only inquiry styling and translate client-generated gallery/checklist/calculator labels using scoped data.
- [ ] Run the full suite, built-page parity/asset/link checks and responsive browser interaction/performance checks. Review the final diff.

Execution: direct changes in the user-provided existing working directory. Existing unrelated dirty files are preserved. No repository-wide commits or deployment are part of this task.
