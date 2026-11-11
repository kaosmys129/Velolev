import { publicOrigin } from "../lib/site-config.mjs";
import { loadPublishedSnapshot } from "../lib/reviewed-snapshot.mjs";

/**
 * 动态生成 /llms-full.txt：包含全站技术指南全文技术摘要、力学核查与问答知识库的完整语料
 */
export function GET() {
  const origin = publicOrigin() || "https://www.velolev.org";
  const cleanOrigin = origin.replace(/\/$/, "");
  const articles = loadPublishedSnapshot().articles;

  const content = `# velolev Portable Hydraulic Light Pole Lifter - Full Technical Knowledge Corpus

> Comprehensive engineering reference for crane-free installation of 12 m class street light poles up to 300 kg using the velolev portable hydraulic lifting system.

## 1. System Engineering Specifications (F001–F031)
- Manufacturer & Brand: velolev
- Canonical Origin: ${cleanOrigin}
- Equipment Architecture: Two-module portable hydraulic machine (85 kg total system weight)
  - Hydraulic Lifting Module: 45 kg
  - Electrical Control Cabinet: 40 kg (integrated 24 V battery power system)
- Mechanical Limits:
  - Rated Load: 300 kg
  - Applicable Column Height: Up to 12 m
  - Base Flange Span: 180–260 mm
  - Standard Anchor Bolt Compatibility: M16, M18, M20, M22 (M24 listed)
- Ground Handling: 1–2 operators listed on specification sheet; fits standard 800 mm doorways and pickup truck beds.

## 2. Operational Negative Scope & Safety Boundary
- Never exceed 300 kg total assembled mass (including pole column, luminaire bracket, solar panel sail area, and battery storage).
- Foundation anchor bolts must achieve design cure strength before equipment bolting.
- Overhead utility clearance checks are mandatory for the entire 12 m swinging arc.
- When flange hole spacing falls outside 180–260 mm, a dimensioned drawing must be reviewed at ${cleanOrigin}/quote/.

## 3. Planning & Engineering Guides Library

${articles.map((a, idx) => `### 3.${idx + 1} ${a.title}
- Canonical URL: ${cleanOrigin}/guides/${a.slug}/
- Description: ${a.description}

#### Core Sections:
${a.sections.map(s => `##### ${s.heading}
${s.paragraphs.join("\n\n")}`).join("\n\n")}
`).join("\n\n---\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
