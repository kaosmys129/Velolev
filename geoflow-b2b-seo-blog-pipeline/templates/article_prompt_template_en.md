# GEOFlow B2B High-Quality Article Prompt Template (English Master)

> **Instructions**: Use this prompt template for generating Google & GEO-ready B2B articles. It enforces Outline compliance, Key Takeaways, Three-Tier Funnel CTAs, FAQ Schema, and strict physical parameter guardrails.

---

```markdown
Write an authoritative, technically rigorous B2B engineering article for Google search and generative AI engines based on:
- Title: {{title}}
- Primary Keyword: {{keyword}}

{{#if outline}}
【Mandatory Article Outline & Engineering Fact Governance】
{{outline}}
{{/if}}

{{#if citations}}
【Authoritative Industry Standards & EEAT Citations】
{{citations}}
{{/if}}

{{#if knowledge}}
【Reference Verified Engineering Knowledge】
{{knowledge}}
{{/if}}

【On-Page SEO & B2B Conversion Architecture (QuickCreator Methodology)】
1. Key Takeaways Component:
   Immediately after the H1 title and introduction, include a structured callout block:
   > ### 📌 Key Takeaways for Project Engineers
   > - [Core engineering advantage for municipal installation]
   > - [Physical load and safety verification: 300kg rated capacity]
   > - [Two-person modular transport without heavy crane logistics]

2. Three-Tier Conversion Bridges (Embed contextual CTAs inside the narrative):
   - Top-Funnel (Exploration): In the installation workflow section, mention the engineering manual and PDF specification download: `📄 [Download 12m Lifter Engineering Specs & Field Operation Manual (PDF)](/resources/)`.
   - Mid-Funnel (Evaluation): In the crane rental or operational cost comparison section, embed an interactive ROI calculator prompt: `💡 [Tired of High Crane Rental Bills? Calculate Your Project Savings with the Crane ROI Calculator](/tools/roi-calculator/)`.
   - Bottom-Funnel (Procurement Decision): In the base flange and bolt pattern section, embed the free drawing audit prompt: `📐 [Verify Your Flange Bolt Circle: Request Free 24h Factory Engineering Drawing Audit](/quote/)`.

3. Practical FAQ Section:
   At the end of the article, provide a dedicated H2 section titled "Frequently Asked Questions (FAQ)" with 3 to 4 technical questions directly answering common jobsite concerns (crew size, load rating, bolt compatibility). Follow it with a Schema.org JSON-LD FAQPage script block.

【Strict Physical Baseline & Content Policy Guardrails】
- Verified Parameters: Rated load is strictly 300kg; maximum pole height is 12m; operating power is 24V DC battery; split weight is 85kg; base plate P.C.D. is 180mm to 260mm with M16-M24 anchor bolts.
- Strictly Banned Claims: NEVER use or imply fake certifications (NO "CE certified", NO "ISO certified"); NEVER claim "guaranteed payback" or "one-person operation"; NEVER output raw currency signs ($ € £ ¥).
- No Hallucinated Emails: Do not invent contact emails or phone numbers. Guide users to verified on-site forms.

Citation marker constraint: The final article must not contain internal evidence IDs, citation placeholders, or numbered citation markers, including [K1], [K2][K3], 【K1】, （K1）, or equivalent forms. When attribution is needed, use natural phrases such as “the materials show,” “the client confirmed,” or “according to the technical datasheets,” without K-number labels.

Please output only the final article body in Markdown. Do not repeat the prompt or output placeholders.
```
