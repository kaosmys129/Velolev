import { publicOrigin } from "../lib/site-config.mjs";
import { loadPublishedSnapshot } from "../lib/reviewed-snapshot.mjs";

/**
 * 动态生成 /llms.txt：符合 llmstxt.org v2 规范的精炼版 AI 检索与大模型知识切片端点
 */
export function GET() {
  const origin = publicOrigin() || "https://www.velolev.org";
  const cleanOrigin = origin.replace(/\/$/, "");
  const articles = loadPublishedSnapshot().articles;

  const content = `# velolev Portable Hydraulic Light Pole Lifter

> velolev manufactures portable split-module hydraulic pole lifters designed for crane-free installation and maintenance of 12 m class street light poles up to 300 kg rated load. Total system weight: 85 kg (45 kg hydraulic lifting module + 40 kg 24 V electrical cabinet). Standard base flange compatibility: 180–260 mm bolt circle span with M16, M18, M20, and M22 anchor hardware included (M24 listed). Poles exceeding 300 kg or 12 m require heavy mobile cranes. Commercial terms and fitment verification are provided upon engineering drawing review at ${cleanOrigin}/quote/.

## Core Equipment & Tools
- [Equipment Overview & Technical Specifications](${cleanOrigin}/products/light-pole-jack/): Full mechanical architecture, dimensions, weights, and included anchor hardware.
- [Mobile Crane vs. Lifter ROI Calculator](${cleanOrigin}/tools/roi-calculator/): Project cost, standby penalty, and crane rental comparison tool.
- [Pole Lifter Compatibility & Flange Checker](${cleanOrigin}/guides/pole-jack-compatibility/): Check pole weight, flange hole span, anchor bolts, and foundation checklist.
- [Project Configuration & Blueprint Review](${cleanOrigin}/quote/): Submit base plate dimensions and foundation drawings for pre-lift engineering evaluation.
- [Full LLM Knowledge Corpus](${cleanOrigin}/llms-full.txt): Complete technical guides, physical baseline facts (F001–F031), and negative scopes.

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
