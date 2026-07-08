# Maquin Astro Theme

Astro static theme rebuilt from `../maquin-static-html` with the original Elementor markup and assets preserved for visual fidelity.

## Commands

```bash
npm install
npm run generate
npm run dev -- --host 127.0.0.1 --port 4321
npm run build
```

## Notes

- `../maquin-static-html` remains the visual baseline.
- `public/wp-content`, `public/wp-includes`, and `public/favicon.ico` are copied from the static mirror.
- WordPress forms, comment posting, and admin AJAX remain static-only. External map and YouTube embeds keep their original behavior.
