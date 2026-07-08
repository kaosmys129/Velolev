# Design QA

source visual truth path: https://digital.creativemox.com/maquin/
implementation screenshot path: /Users/peterpc/Documents/liftpolemachine-web/qa-home-desktop.png, /Users/peterpc/Documents/liftpolemachine-web/qa-home-mobile.png, /Users/peterpc/Documents/liftpolemachine-web/qa-blog-mobile.png
viewport: desktop 1280x720, mobile 390x844
state: initial page load, homepage and blog archive
full-view comparison evidence: source pages were mirrored from the live WordPress/Elementor output; local screenshots confirm hero, navigation, typography, colors, imagery, and responsive layout render in the expected structure.
focused region comparison evidence: checked desktop homepage hero, mobile homepage hero, and mobile blog archive cards. No focused mismatch requiring a code patch was visible after path cleanup.

**Findings**
- No P0/P1/P2 fidelity issues found in the checked surfaces.

**Checked Surfaces**
- Fonts and typography: local Geologica and Inter font files are present and referenced from local CSS.
- Spacing and layout rhythm: Elementor layout structure, responsive containers, hero spacing, and card rhythm are preserved.
- Colors and visual tokens: yellow/black industrial palette and dark footer/card surfaces are preserved from source CSS.
- Image quality and asset fidelity: source raster images, logos, icons, and font assets are copied locally.
- Copy and content: public pages, blog archive, 404 template, and 6 public posts were included.

**Patches Made Since QA Start**
- Added clean `/blog/` and `/404/` routes for Elementor library template URLs.
- Rewrote remaining target-domain links to local static paths.
- Rewrote moved template asset paths to root-relative local resources.
- Added local `favicon.ico` and a local WordPress emoji stub to remove 404s.

**Residual Notes**
- WordPress form submissions, comments, admin AJAX, and dynamic search/archive behavior remain static-only.
- Contact map depends on the external map provider.

final result: passed
