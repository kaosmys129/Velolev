# Multilingual industrial design parity

The Spanish, French and Portuguese sites must use the English site's Astro procurement components, shared Header/Footer, industrial tokens, media and responsive rules. Preserve existing locale URLs and add localized counterparts for the English planning, resource and policy pages. Known legacy URLs resolve to their current equivalents; no Elementor assets should load on these three sites.

Use a build-time text catalog and semantic HTML traversal to translate the rendered shared components. Translate visible copy, accessible labels and gallery caption data, preserve scripts/styles/form payloads, and localize only registered page links. Existing About and inquiry dictionaries remain authoritative. No client translation framework or external requests are required.

All language menus retain the current page when a translation exists and otherwise lead to the language homepage. Canonical and alternate metadata use the same route registry. Technical data and evidence qualifications remain unchanged. Validate responsive navigation, galleries, lightboxes, checklist, cost calculator, inquiry forms, local assets and cold-page performance. Local performance measurements cannot guarantee production network speed.

Approaches considered: independent translated templates would drift again; browser translation adds runtime work and a visible language flash. Shared components plus static translation best matches the requested fidelity and speed.
