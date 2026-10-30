# Equipment overview film

`equipment-overview.mp4` is a 24-second, silent motion montage of four reference images already present in this repository. It is an equipment introduction, not recorded lifting footage, an operating sequence, a customer case or evidence of factory ownership or field validation. This distinction is visible alongside every player.

- 00:00: `public/wp-content/uploads/sites/3/2025/01/portable-pole-lifter-hero-cutout.png`
- 00:06: `public/images/evidence/equipment-trolley-side-detail.jpg`
- 00:12: `public/images/evidence/field-installation-flange-erect.jpg`
- 00:18: `public/images/evidence/factory-crating-export-package.jpg`

Regenerate locally with `node scripts/generate-equipment-film.mjs` (FFmpeg required). The checked-in H.264 MP4 uses 1280×720, 24fps, `yuv420p` and fast-start metadata. Normal builds do not require FFmpeg. Scene descriptions are supplied in `equipment-overview.en.vtt`; the web player includes native controls and chapter selection, and does not autoplay or preload the video.

When reviewed field footage becomes available, update the source, poster, track, duration, chapters and surrounding evidence wording together in `EquipmentFilm.astro`.
