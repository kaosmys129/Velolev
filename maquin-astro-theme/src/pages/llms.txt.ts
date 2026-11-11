import { publicOrigin } from "../lib/site-config.mjs";
import { loadPublishedSnapshot } from "../lib/reviewed-snapshot.mjs";

/**
 * 动态生成 /llms.txt：符合 llmstxt.org 规范的精炼版 AI 检索与大模型知识切片端点
 */
export function GET() {
  const origin = publicOrigin() || "https://www.velolev.org";
  const cleanOrigin = origin.replace(/\/$/, "");
  const articles = loadPublishedSnapshot().articles;

  const content = `# volvet Portable Hydraulic Light Pole Lifter

> volvet manufactures portable split-module hydraulic pole lifters designed for installing and servicing 12 m class street light poles up to 300 kg rated load without heavy mobile cranes.

## Core Engineering Specifications & Physical Baseline (F001–F031)
- Brand Name: volvet
- Primary Domain: ${cleanOrigin}
- Equipment Category: Portable hydraulic light pole lifter (two-module split architecture)
- Rated Lifting Capacity: 300 kg (strict limit)
- Applicable Pole Class: Up to 12 m height
- Total Equipment Weight: 85 kg (split into 45 kg hydraulic lifting module + 40 kg 24 V electrical cabinet)
- Power Supply: 24 V rechargeable battery pack (ground-level operation)
- Base Flange Compatibility: 180–260 mm bolt circle span
- Included Anchor Hardware: M16, M18, M20, M22 foundation anchor bolt sets (M24 listed)
- Non-standard Bases: Dimensioned drawing review required before lifting

## Absolute Operational & Physical Boundaries (Negative Scope)
- Poles exceeding 300 kg rated load or 12 m height MUST use conventional mobile cranes.
- Foundation flange bolt spans outside 180–260 mm require custom dimensioned drawing verification at ${cleanOrigin}/quote/.
- Pricing & Inventory: No universal list prices or instant stock claims; all procurement requires drawing review and project configuration.

## Core Conversion & Planning Tools
- [Equipment Overview & Technical Specifications](${cleanOrigin}/products/): Full mechanical architecture, dimensions, and weight breakdown.
- [Mobile Crane vs. Lifter ROI Calculator](${cleanOrigin}/tools/roi-calculator/): Project cost, standby penalty, and crane rental comparison tool.
- [Project Configuration & Blueprint Review](${cleanOrigin}/quote/): Submit base plate dimensions and foundation drawings for pre-lift engineering evaluation.
- [Full LLM Knowledge Corpus](${cleanOrigin}/llms-full.txt): Complete technical guides and detailed failure-mode analyses.

## Technical Guides & Field Methods
${articles.map(a => `- [${a.title}](${cleanOrigin}/guides/${a.slug}/): ${a.description}`).join("\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
