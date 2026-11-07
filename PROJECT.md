# Project: volvet About Us Factory & Engineering Endorsement System

## Architecture
- **Framework**: Astro 5 (Static Site Generation / SSG)
- **Design System**: Procurement Industrial Design System (`src/styles/procurement.css`)
  - Tokens: Warm Sand (`--paper: #f3f2ec`), Industrial Yellow (`--yellow: #f4cc3d`), Carbon Ink (`--ink: #1d201e`), Blueprint Green (`--green: #c6ceba`), Line Gray (`--line: #d5d8cd`)
  - Typography: Geologica 100-900 (Self-hosted WOFF2) + Courier New for engineering data
  - Geometry: 2px micro-radii, 1240px max container, 48px/30px/18px responsive gutters
- **Page Layout**: `ProcurementLayout.astro`
  - Header: Micro-typography wordmark, procurement navigation, Request Quote CTA
  - Main slot: Dedicated page content
  - Footer: Deep background (`--dark: #202622`), links, 7-language selector drawer
- **Routing & i18n Architecture**:
  - English Master: `src/pages/about-us.astro` -> `<ProcurementLayout page="about" locale="en"><AboutUsPage locale="en"/></ProcurementLayout>`
  - 6 Localized Routes: `src/pages/[lang]/[...slug].astro` -> Explicit branch for `route.slug === "about-us"` rendering `<ProcurementLayout page="about" locale={locale}><AboutUsPage locale={locale}/></ProcurementLayout>`
  - Languages: `en` (English), `es` (Spanish), `fr` (French), `pt` (Portuguese), `id` (Indonesian), `th` (Thai), `vi` (Vietnamese)
- **Data & Policy Contracts**:
  - Truth Baseline: `src/data/content-baseline.json` (300kg capacity, 12m pole height, 24V DC, 85kg split two-module, 650x350x500mm crate)
  - Dictionary: `src/data/about-copy.json` (structured 7-language copy for all 5 endorsement modules)
  - Content Policy: `src/utils/contentPolicy.mjs` & `scripts/verify-content-baseline.mjs` (strictly zero fake CE/ISO certifications, zero public prices, zero inventory claims, zero unregistered logistics claims like ISPM-15/fumigated)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | 7-Language About Copy Dictionary | Structured JSON copy for 7 languages (en, es, fr, pt, id, th, vi) covering all 5 endorsement sections with 100% content policy compliance | M1 | spec_miner |
| 2 | Layout Title & Meta Expansion | Enable ProcurementLayout to render localized titles and descriptions for about-us without falling back to inquiry form title | M1 | architect |
| 3 | FactoryTourGallery Component | Real workshop gallery with CNC machining, clean hydraulic assembly, testing bay, and heavy crating views with evidence assets | M2 | designer |
| 4 | QualityTestingStrip Component | Four-stage pre-shipment inspection cards (weld integrity, 24h hydraulic pressure hold, 300kg vertical test rig, steel-strapped wooden crate packaging) | M2 | designer |
| 5 | MilestoneTimeline Component | Engineering timeline tracking municipal lighting constraint solving, two-module split, 300kg test rig, and global supply | M2 | designer |
| 6 | TeamGrid Component | Mechanical structural engineers, hydraulic transmission specialists, and non-standard project customization support cards | M2 | designer |
| 7 | AboutUsPage Component Assembly | Aggregate Header, Key Stats Strip, 5 endorsement modules, Global Logistics & Port Hubs, and B2B Private Quotation & Confidentiality CTA | M3 | architect |
| 8 | English Route Migration | Wire `src/pages/about-us.astro` to render ProcurementLayout + AboutUsPage | M3 | architect |
| 9 | 6 Localized Subpaths Migration | Wire `src/pages/[lang]/[...slug].astro` to intercept `about-us` and render ProcurementLayout + AboutUsPage, eliminating legacy Elementor fragments | M3 | architect |
| 10 | Zero Horizontal Overflow Enforcement | CSS constraints (`min-width: 0`, `max-width: 100%`, `overflow-wrap: anywhere`, fluid margins) ensuring 0 overflow on 1440px, 768px, 390px | M3 | designer |
| 11 | Design System Export Update | Inject `/about-us/` into desktop (1440px), tablet (768px), mobile (390px), and multilingual queues in `scripts/export-design-system.mjs` | M4 | designer |
| 12 | Gallery Refresh & 2x Artboards | Generate 2x Retina artboards via `npm run design:export` and verify `design-exports/index.html` displays About Us artboards with full-screen preview | M4 | designer |
| 13 | Build & Quality Gates Validation | Execute `npm run build`, `npm run content:check`, `npm run d30:check`, `npm run d60:check` to ensure 100% pass | M5 | spec_miner |
| 14 | Multi-Role QA Review & Audit | Reviewers, Challenger (responsive & asset checks), Forensic Auditor (integrity & content compliance) gate checks | M5 | orchestrator |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Data & Dictionary Infrastructure | Create `about-copy.json`, update `public-copy.json` and `inquiry-copy.json`, enhance `ProcurementLayout.astro` | none | DONE |
| 2 | M2: Core Astro Endorsement Components | Develop `FactoryTourGallery.astro`, `QualityTestingStrip.astro`, `MilestoneTimeline.astro`, `TeamGrid.astro` | M1 | DONE |
| 3 | M3: Page Assembly & 7-Language Routing | Build `AboutUsPage.astro`, wire `src/pages/about-us.astro` and `src/pages/[lang]/[...slug].astro`, enforce zero overflow | M2 | DONE |
| 4 | M4: Design System Artboard Export | Update `scripts/export-design-system.mjs`, run `npm run design:export`, verify `design-exports/index.html` | M3 | DONE |
| 5 | M5: Quality Verification & Audit Gate | Run builds, content/d30/d60 checks, Reviewers, Challenger, Forensic Auditor | M4 | DONE |

## Interface Contracts
### `AboutUsPage.astro`
- Props: `interface Props { locale?: string; }` (supports 'en', 'es', 'fr', 'pt', 'id', 'th', 'vi')
- Internal consumption: Reads `src/data/about-copy.json` by `locale` with fallback to `en`

### `FactoryTourGallery.astro`
- Props: `interface Props { locale?: string; }`
- Assets: `/images/evidence/equipment-engineering-drawing-raw.jpg`, `/images/evidence/equipment-trolley-side-detail.jpg`, `/images/evidence/field-installation-flange-erect.jpg`, `/images/evidence/factory-crating-export-package.jpg`

### `QualityTestingStrip.astro`
- Props: `interface Props { locale?: string; }`
- 4 Steps: 01 Weld & Material, 02 Hydraulic 24h Pressure Hold, 03 300kg Vertical Load Test Rig, 04 Heavy Crate & Steel Strapping Packaging

### `MilestoneTimeline.astro`
- Props: `interface Props { locale?: string; }`
- 4 Phases: Municipal Constraint & Problem, Two-Module Separation (45kg+40kg), 300kg Rig & Flange Standardization (180-260mm), Global Logistics & EPC Supply

### `TeamGrid.astro`
- Props: `interface Props { locale?: string; }`
- 3 Roles: Lead Structural Engineer, Hydraulic & Control Specialist, Application & Customization Support

## Code Layout
- `src/components/procurement/`: Component source code (`AboutUsPage.astro`, `FactoryTourGallery.astro`, `QualityTestingStrip.astro`, `MilestoneTimeline.astro`, `TeamGrid.astro`)
- `src/data/about-copy.json`: Multi-language dictionary for About Us
- `src/layouts/ProcurementLayout.astro`: Shell layout with optional title/description override
- `src/pages/about-us.astro`: English route
- `src/pages/[lang]/[...slug].astro`: 6 Localized routes
- `scripts/export-design-system.mjs`: Playwright screenshot exporter
- `design-exports/`: Exported artboards and interactive gallery
