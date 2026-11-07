import { publicOrigin } from "../lib/site-config.mjs";

export function GET() {
  const origin = publicOrigin() ? publicOrigin().replace(/\/$/, "") : "";

  const content = `# volvet / Portable Light Pole Lifter

> volvet is an industrial equipment manufacturer specializing in ground-level mechanical rigging equipment, notably the portable hydraulic light pole lifter engineered to erect 6m to 12m municipal street light columns without mobile cranes.

## Core Technical Specifications & Engineering Boundaries

- **Rated Vertical Lifting Capacity**: Strictly 300kg rated load capacity (field validation pending).
- **Maximum Erection Pole Height**: Strictly 12m, covering 6m, 8m, 10m, and 12m standard roadway and solar lighting shafts.
- **Modular Packaging Architecture**: Split two-module transport package totaling 85kg (45kg hydraulic lifter assembly + 40kg 24V DC battery power unit).
- **Transport Crate Outer Dimensions**: 650 × 350 × 500 mm in heavy-duty export packaging.
- **Power System**: Integrated 24V DC rechargeable battery system; operates off-grid without utility power or gasoline generators; >50 lifting cycles per charge.
- **Universal Base Plate Compatibility**: Heavy-duty slotted base plate accommodating Pitch Circle Diameters (P.C.D.) between 180mm and 260mm.
- **Foundation Anchor Stud Sizing**: Accommodates M16, M18, M20, M22, and M24 anchor studs; standard package includes hardened clamping hardware for M16–M22.
- **Jobsite Crew Requirement**: Strictly mandates a 2-person operation crew for alignment guidance and hydraulic control (never single-person operation).
- **Governing Engineering Standards**:
  - Electrical overhead line clearances: OSHA 1926 Subpart CC & IEEE 516 live-line working envelopes.
  - Structural overturning & wind moment resistance: EN 40-3.
  - Structural foundation anchor bolts: ASTM F1554 (Grades 36, 55, and 105).
  - Roadway photometric alignment: ANSI/IES RP-8-18.

## Essential Product & Decision Guides

- [Portable Light Pole Lifter Product Specifications](${origin}/products/light-pole-jack/): Complete dimensional drawings, hydraulic stroke specs, and load curves.
- [Crane Alternative for Tight Spaces](${origin}/compare/pole-jack-vs-crane/): Engineering and jobsite analysis comparing portable hydraulic lifters against 16-ton mobile cranes.
- [Crane ROI Calculator](${origin}/tools/roi-calculator/): Project-specific savings calculator comparing crane rental logistics against self-owned ground rigging.
- [Flange & Anchor Bolt Compatibility Guide](${origin}/guides/pole-jack-compatibility/): Engineering clearance charts for P.C.D. 180mm–260mm and M16–M24 foundation cages.
- [Engineering Resources & CAD Drawings](${origin}/resources/): Technical specification sheets, dimensional tables, and field SOP documentation.
- [Factory Engineering Drawing Review & Quote](${origin}/quote/): Submit pole base drawings for free 24-hour factory engineering audit.

## Frequently Asked Questions

### Can the portable pole lifter be operated by a single technician?
No. Jobsite safety protocols strictly mandate a two-person operation crew. One technician operates the 24V hydraulic controls while the second technician guides base plate alignment onto foundation anchor studs.

### What is the maximum pole height and load limit?
The machine is strictly rated for 300kg maximum vertical load and 12m maximum pole height. Columns exceeding 300kg or 12m require mobile crane dispatch.

### Does the base plate support diverse foundation bolt circle diameters?
Yes. The heavy-duty universal slotted plate accommodates Pitch Circle Diameters (P.C.D.) between 180mm and 260mm across M16, M18, M20, M22, and M24 anchor studs.

### How is the lifter powered on off-grid jobsites?
The unit operates entirely on an integrated 24V DC rechargeable battery pack, requiring no external fuel generators or three-phase utility electricity.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
