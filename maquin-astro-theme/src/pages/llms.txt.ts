import baseline from "../data/content-baseline.json" with { type: "json" };
import { publicOrigin, corePages } from "../lib/site-config.mjs";
import { loadPublishedSnapshot } from "../lib/reviewed-snapshot.mjs";

/**
 * 基于已确认的 S4 规格基线与已审核指南快照动态生成 llms.txt，杜绝超出 S4 的未验证工程与商业承诺。
 */
export function GET() {
  const origin = publicOrigin() ? publicOrigin().replace(/\/$/, "") : "";
  const urlFor = (path) => (origin ? `${origin}${path}` : path);

  const p = baseline.product;
  const s = p.specifications;
  const c = p.standardConfiguration;
  const m = p.manufacturerReportedPerformance;
  const snapshot = loadPublishedSnapshot();
  const guidesList = (snapshot.articles ?? [])
    .map((a) => `- [${a.title}](${urlFor(`/guides/${a.slug}/`)}): ${a.description}`)
    .join("\n");

  const content = `# ${baseline.brand.name} / ${p.name}

> ${baseline.brand.name} publishes source-derived specification summaries and private B2B project review tools for its portable battery-powered light pole lifter. No public pricing, stock availability, warranties, certifications, or completed third-party field validation records are published on this site.

## Core Technical Specifications (Source: ${p.sourceId} v${baseline.version})

- **Applicable Pole Height**: Up to ${s.applicablePoleHeightM} m (project-specific pole, flange, foundation, and site conditions require review).
- **Rated Load**: ${s.ratedLoadKg} kg.
- **Battery Voltage**: ${s.batteryVoltageV} V battery-powered hydraulic system.
- **Two-Module Weight**: ${s.totalWeightKg} kg total (${s.hydraulicModuleWeightKg} kg hydraulic module + ${s.electricalCabinetWeightKg} kg electrical cabinet).
- **Dimensions**: Hydraulic module ${s.hydraulicModuleDimensionsMm.join(" × ")} mm; electrical cabinet ${s.electricalCabinetDimensionsMm.join(" × ")} mm; packaging ${s.packagingDimensionsMm.join(" × ")} mm.
- **Operators (Specification Table)**: ${s.operators} operators (single-person operation in the introductory summary is conditional; detailed field operating procedures remain pending engineering review).
- **Listed Anchor Bolt Compatibility**: ${s.listedAnchorBoltSizes.join(", ")}.
- **Standard Configuration Included**: ${c.equipmentSets} equipment set, ${c.groundStakeSets} ground stake set, and ${c.anchorBoltSizesIncluded.join(", ")} anchor bolts (${c.anchorBoltSetsPerSize} sets per size). M24 is listed on the compatibility table but is not included in the standard anchor bolt set.
- **Flange Hole Span**: ${s.flangeHoleSpanMm[0]}–${s.flangeHoleSpanMm[1]} mm listed span. Non-standard bases require a dimensioned drawing review.

## Manufacturer-Reported Figures (Field Validation Pending)

- **Field Validation Status**: ${p.fieldValidation} (${m.evidenceStatus}).
- **Lift Time**: ${m.liftTimeSeconds} s (manufacturer-reported).
- **Lifts per Full Charge**: ${m.liftsPerFullCharge} (manufacturer-reported).
- **Usage Cycles**: ${m.usageCycles} (manufacturer-reported).
- **Disclosures Not Published**: No public unit price, rental benchmark, stock count, warranty period, laboratory/certification report, or customer field case study is currently published.

## Key Decision & Specification Pages

- [${corePages.product.title}](${urlFor(corePages.product.path)}): Full specification table, standard configuration, flange span limits, and Product FAQ.
- [${corePages.compatibility.title}](${urlFor(corePages.compatibility.path)}): Bolt compatibility checker (${s.flangeHoleSpanMm[0]}–${s.flangeHoleSpanMm[1]} mm span, M16–M24 studs) and drawing-review checklist.
- [${corePages.compare.title}](${urlFor(corePages.compare.path)}): Scope comparison framework between portable lifting equipment and crane mobilization.
- [${corePages.roi.title}](${urlFor(corePages.roi.path)}): Neutral cost-scenario calculator using user-supplied project and local rate inputs.
- [${corePages.resources.title}](${urlFor(corePages.resources.path)}): Machine-readable specification downloads (JSON/CSV) and project worksheet.
- [${corePages.faq.title}](${urlFor(corePages.faq.path)}): Grounded answers on limits, included hardware, compatibility, and private B2B quotation.
- [${corePages.quote.title}](${urlFor(corePages.quote.path)}): Submit pole parameters and flange drawings for a private B2B review.
${guidesList ? `\n## Published Planning Guides\n\n${guidesList}\n` : ""}
## Frequently Asked Questions

### What are the rated pole height and load limits?
Source ${p.sourceId} lists up to ${s.applicablePoleHeightM} m applicable pole height and ${s.ratedLoadKg} kg rated load. Compatibility also depends on foundation, base flange geometry, and complete assembled load including arms and luminaires.

### How many operators are required?
The ${p.sourceId} specification table lists ${s.operators} operators. Any single-person reference is conditional, and site-specific safety and handling procedures remain subject to project review.

### Which anchor bolt sizes and flange spans are supported?
Listed anchor bolt sizes are ${s.listedAnchorBoltSizes.join(", ")} across a listed flange hole span of ${s.flangeHoleSpanMm[0]}–${s.flangeHoleSpanMm[1]} mm. The standard configuration includes ${c.anchorBoltSizesIncluded.join(", ")} (${c.anchorBoltSetsPerSize} sets per size), while M24 is not included by default. Non-standard bases require a dimensioned drawing review.

### Are prices, lead times, or field test reports published online?
No. Equipment pricing, freight, and configuration quotations are handled privately through the B2B inquiry workflow (${urlFor(corePages.quote.path)}). Performance metrics (${m.liftTimeSeconds} s lift time, ${m.liftsPerFullCharge} lifts per charge, ${m.usageCycles} cycles) are manufacturer-reported only, with independent field validation marked pending.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
