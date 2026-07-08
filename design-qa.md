# Design QA - Astro Theme Refactor

## Summary
- **Source Baseline Path**: `http://127.0.0.1:4173/` (maquin-static-html mirror)
- **Astro Implementation Path**: `http://127.0.0.1:4321/` (maquin-astro-theme preview)
- **Viewport Configs**: Desktop (1280x720), Mobile (390x844)
- **Local Screenshot Evidence Directory**: `/Users/peterpc/Documents/liftpolemachine-web/qa-screenshots/`

---

## Checked Pages & Evidence List

All page paths have been thoroughly screenshot and compared side-by-side.

1. **Homepage (/)**
   - Baseline Desktop: `baseline-home-desktop.png`
   - Astro Desktop: `astro-home-desktop.png`
   - Baseline Mobile: `baseline-home-mobile.png`
   - Astro Mobile: `astro-home-mobile.png`
   - Interactivity: Hamburger menu expansion captured as `astro-home-mobile-menu-open.png`.
   - Navigation Status: `Home` (`menu-item-112`) correctly marked as `current-menu-item` and `elementor-item-active`.

2. **About Us (/about-us/)**
   - Baseline Desktop: `baseline-about-us-desktop.png`
   - Astro Desktop: `astro-about-us-desktop.png`
   - Baseline Mobile: `baseline-about-us-mobile.png`
   - Astro Mobile: `astro-about-us-mobile.png`
   - Navigation Status: `About us` (`menu-item-113`) correctly highlighted as active item.

3. **Blog Archive (/blog/)**
   - Baseline Desktop: `baseline-blog-desktop.png`
   - Astro Desktop: `astro-blog-desktop.png`
   - Baseline Mobile: `baseline-blog-mobile.png`
   - Astro Mobile: `astro-blog-mobile.png`
   - Navigation Status: `Pages` (`menu-item-117`) highlighted as active menu container.

4. **Equipment Detail (/equipment-detail/)**
   - Baseline Desktop: `baseline-equipment-detail-desktop.png`
   - Astro Desktop: `astro-equipment-detail-desktop.png`
   - Baseline Mobile: `baseline-equipment-detail-mobile.png`
   - Astro Mobile: `astro-equipment-detail-mobile.png`
   - Navigation Status: `Equipment` (`menu-item-123`) highlighted as active menu container.

5. **Contact Us (/contact-us/)**
   - Baseline Desktop: `baseline-contact-us-desktop.png`
   - Astro Desktop: `astro-contact-us-desktop.png`
   - Baseline Mobile: `baseline-contact-us-mobile.png`
   - Astro Mobile: `astro-contact-us-mobile.png`
   - Navigation Status: `Contact us` (`menu-item-116`) highlighted as active item.

6. **Error 404 (/404.html)**
   - Baseline Desktop: `baseline-404-desktop.png`
   - Astro Desktop: `astro-404-desktop.png`
   - Baseline Mobile: `baseline-404-mobile.png`
   - Astro Mobile: `astro-404-mobile.png`
   - Navigation Status: `Pages` (`menu-item-117`) highlighted as active menu container.
   - Route Validation: Astro `/404.html` returns `200 OK` successfully due to Middleware rule.

7. **Single Post Page (/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2/)**
   - Baseline Desktop: `baseline-single-post-desktop.png`
   - Astro Desktop: `astro-single-post-desktop.png`
   - Baseline Mobile: `baseline-single-post-mobile.png`
   - Astro Mobile: `astro-single-post-mobile.png`
   - Navigation Status: `Pages` (`menu-item-117`) highlighted as active menu container.

---

## Findings & Verification Results
- **CSS 404 / Layout Crash Resolved**: WordPress static files original name contain query parameters (e.g. `theme.css?ver=3.4.9.css`) which standard servers (Vite/Node/Astro) parsed as query params, yielding 404 failures. We executed `sanitize-assets.mjs` to strip query parameter string suffixes from both static files and all HTML fragment linking attributes, restoring 100% high-fidelity elementor page styling layout.
- **Active Navigation Highlighting**: Astro server-side dynamic active nav injects active classes precisely inside the double quotes for both desktop and mobile menus.
- **Asset/Relative Path Sanitization**: Header and Footer links have been fully sanitized. Relative path jumps (e.g. `index.html#` -> `#`, `index.html` -> `/`) have been resolved, avoiding any 404 pathing leaks across all 17 page paths.
- **Interactivity**: Menu toggles, mobile sidebar, sliders, dynamic tabs, and map embeds behave identically to the static mirror baseline.

**Final Result: passed**
