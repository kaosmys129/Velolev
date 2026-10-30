# volvet industrial procurement site

Astro static pages share `src/layouts/ProcurementLayout.astro` and `src/styles/procurement.css` across English, Spanish, French, Portuguese, Vietnamese, Thai and Indonesian. No WordPress installation, Elementor runtime or HTML fragment generator is required.

```sh
npm run dev -- --host 127.0.0.1 --port 4322
npm test
npm run locales:check
npm run build
npm run serve
```

`dev` previews frontend changes. `serve` runs the built pages and actual inquiry API at http://127.0.0.1:8787/. Follow [INQUIRY_OPERATIONS.md](INQUIRY_OPERATIONS.md) for the private inbox and email configuration; static-only hosting cannot receive inquiries.

- Core routes and terminal aliases: `src/lib/site-config.mjs`, `src/data/route-aliases.json`.
- Seven-language copy: `src/data/industrial-copy/`, `about-copy.json`, `inquiry-copy.json`.
- Facts and publication rules: `content-baseline.json`, `publication-gates.json`, `published-content.json`.
- Product assets: `public/images/product/`; original evidence: `public/images/evidence/`; font: `public/fonts/`.
- Reviewed content: `npm run content:prepare`, `content:import`, `content:freeze`. Reviewed article content is built offline under `/guides/`; direct publication from the former GEOFlow live API is retired.
- `npm run content:inventory` inventories the current built routes and aliases without reading historical fragments.
- Every build checks the retirement boundary; `npm run retirement:check` repeats it, and `npm run retirement:http` checks real local HTTP responses.

The former fragment editor `/admin/content/`, image replacement server and generation commands are retired. Edit the component/data sources, then rebuild and validate; the private inquiry inbox remains at `/admin/inquiries/`.

Recovery bundle manifests and extraction instructions are in `../archives/README.md`. Historic assessment documents describe the pre-retirement site; consult the retirement completion report for current results.
