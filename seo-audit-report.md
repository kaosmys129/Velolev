# Velolev 全站 SEO 审计报告

> 审计对象：`maquin-astro-theme`（Astro 静态站，构建产物 `dist/`，21 个 HTML 页面）
> 审计视角：已部署产物 `dist/`（而非原始 WordPress 碎片 —— 构建步骤 `src/utils/htmlCleanup.ts` 已修正大量问题，见下文"重要更正"）
> 审计日期：2026-07-14
> 方法论说明：技术/站内指标基于本地构建产物实测；站外指标（外链/域名权重/社媒）**无法本地测量**，已给出测量方案与建议。

---

## 一、重要更正（避免误判）

本审计最初检查了 `src/fragments/en/**/head.html` 原始碎片，发现 canonical 写成 `index.html`、无任何 meta description、满是 WordPress 垃圾标签。但**这些是中间产物**，并非线上真实输出。

构建步骤 `src/utils/htmlCleanup.ts → cleanHeadHtml()` 在编译期已做以下处理（已在 `dist/` 中实测确认）：

- ✅ **重写 canonical**：删除 WP 的 `index.html` canonical，改为正确绝对路径（`/`、`/about-us/`、`/equipment/`、`/blog/`、文章 slug 等）。
- ✅ **注入 meta description**：来自 `metaDescriptions` 映射表，质量良好、含关键词；文章页有兜底模板。
- ✅ **清除 WordPress 残留**：oEmbed 链接、`api.w.org`、`/wp-json/`、RSS、`EditURI`、`shortlink`、`generator` 元标签全部剥离。
- ✅ **404 页加 `noindex, follow`**。

**结论：站点基础健康度远比碎片看起来好。** 以下报告只列 *真实存在* 的问题。

---

## 二、整体健康评分

| 维度 | 评级 | 说明 |
|------|------|------|
| 技术 SEO（基础） | 🟡 中等 | canonical/描述/alt 良好，但缺 robots/sitemap 与结构化数据 |
| 技术 SEO（GEOFlow 集成） | 🔴 差 | 文章页 JS 渲染、canonical 重复、orphan |
| 站内 SEO | 🟡 中等 | 标题偏弱、contact-us 缺 H1、内容有冗余页 |
| 站外 SEO | ⚪ 未知 | 需外部工具；当前无 OG 标签，社媒传播弱 |
| 用户体验/CWV | 🟡 中等偏下 | 27MB/82 个 CSS-JS，渲染阻塞风险 |
| **综合** | **🟡 中等（有清晰的高杠杆修复点）** | 修完 P0/P1 可从"及格"跃升到"良好" |

**最致命的 3 个问题**：
1. 无 `robots.txt` 与 `sitemap.xml`（抓取与收录的基础设施缺失）
2. GEOFlow 文章页对搜索引擎**不可见**（canonical 指向 /blog/、内容 JS 渲染、未入 sitemap、静态 HTML 无入口链接）
3. 全站零结构化数据（JSON-LD）与零社交元标签（OG/Twitter）

---

## 三、技术 SEO

### T1. ❌ robots.txt 与 XML sitemap 缺失 — **P0**
- **证据**：`dist/` 下无 `robots.txt`、无 `sitemap*.xml`；`astro.config.mjs` 无 sitemap 集成；`output:"static"` 但未生成任何 sitemap。
- **影响**：
  - 爬虫无抓取指令，无法声明 sitemap、无法屏蔽 `/admin/content/`、`/404.html` 等。
  - 21 个页面 + 未来 GEOFlow 文章**无法被系统化发现**，新文章上线后收录延迟高甚至漏收。
  - 无法向 GSC 提交 sitemap → 失去收录诊断能力。
- **建议**：
  - 安装 `@astrojs/sitemap`，在 `astro.config.mjs` 设 `site`（见附录代码）。
  - 手写 `public/robots.txt`，指向 sitemap 并屏蔽后台。
  - 把 GEOFlow 文章 slug 纳入 sitemap（见 T5）。
- **预期效果**：收录覆盖率从"依赖内链发现"提升到"100% 可提交"；新文章收录时间从数天降至小时级；GSC 可监控索引覆盖率。

### T2. ❌ GEOFlow 文章页对搜索引擎不可见 — **P0/P1（最高杠杆）**
- **证据**（`dist/blog/a874y2ak/index.html`、`dist/blog/eytcgki8/index.html`）：
  - `<title>Blog - Velolev</title>`、description 与 blog 首页**完全相同**、`<link rel="canonical" href="/blog/">` —— 即两篇（及未来所有）GEOFlow 文章都自认是 /blog/ 的副本。
  - 文章正文由客户端 JS 注入 `#geo-article-body`，**静态 HTML 中无正文**。
  - `dist/blog/index.html` 静态 HTML 中**不存在** `blog/a874y2ak` 入口链接（卡片是 JS 注入的）→ 文章页是**孤儿页**。
- **影响**：Google 极可能把这些页判为 /blog/ 的重复内容而**不单独收录**；即使收录，标题/描述无差异化也无法参与目标词排名。这等于 GEOFlow 投入的内容**完全无 SEO 回报**。
- **建议**（按优先级）：
  1. **服务端渲染正文**：在 `blog/[slug].astro` 的 `getStaticPaths()` 中，除 fallback slug 外，调用 GEOFlow 列表接口拿到全部已发布 slug，并在渲染时 `fetchGeoArticle()` 把标题/正文/描述**写入静态 HTML**（而非仅留 `#geo-article-body` 空壳）。
  2. **每篇文章独立 meta**：根据 slug 取该文章的 `title`/`meta_description` 作为 `<title>` 与 description；canonical 改为 `/blog/{slug}/`。
  3. **静态入口链接**：在 `blog/index.html` 把 GEOFlow 卡片的 `<a href>` **直接输出到静态 HTML**（JS 仅作状态徽章刷新），消除 orphan。
  4. 上述 slug 自动进入 sitemap（T1）。
- **预期效果**：GEOFlow 文章从"0 收录"变为"可收录、可排名"；长尾关键词页面数增长；内容营销 ROI 兑现。这是整站 SEO 价值最大的一块。

### T3. ⚠️ Core Web Vitals / 性能风险 — **P1**
- **证据**：`dist/` 共 27MB、291 文件、82 个 CSS/JS；加载 jQuery + Elementor frontend JS + 约 15 个 widget CSS + elementskit 等。大量**渲染阻塞资源**。
- **影响**：移动端 LCP/INP 大概率超标（目标 LCP<2.5s、INP<200ms、CLS<0.1）；慢加载 → 跳出率上升、排名下降。
- **建议**：
  - 静态站不需要 jQuery/Elementor 编辑器 JS：评估用 `defer`/`async` 或移除（`cleanHeadHtml` 已处理部分，但 `elementor-frontend.min.js`、`jquery` 仍在）。
  - 关键 CSS 内联、非关键 CSS 异步；图片转 WebP/AVIF 并 `loading="lazy"`。
  - 用 Lighthouse CI 量化后再定向优化（见测量方案）。
- **预期效果**：CWV 达标后，移动端排名与跳出率同步改善（Google 明确将 CWV 列为排名因素）。

### T4. ⚠️ 冗余/矛盾的 `equipment-detail` 页 — **P2**
- **证据**：`astro.config.mjs` 有 `"/equipment-detail": "/equipment"` 重定向，但 `dist/equipment-detail/index.html` 仍被构建为独立页，且其 canonical 为 `/equipment-detail/`（与重定向目标矛盾），标题与 equipment 几乎重复（"Portable Light Pole Lifter Specifications - Velolev"）。
- **影响**：自 canonical 的重定向页 → 信号混乱；内容重复浪费抓取预算。
- **建议**：不再把 `equipment-detail` 作为独立 route 构建，仅保留重定向（或直接在 `routes.ts` 删除该项，重定向由 `astro.config` 生成纯跳转页）。
- **预期效果**：消除重复内容、集中权重到 /equipment/。

### T5. ⚠️ `site` 未配置 — **P2**
- **证据**：`astro.config.mjs` 无 `site` 字段。
- **影响**：sitemap 集成与绝对 URL 生成依赖 `site`；当前 canonical 靠 `cleanHeadHtml` 硬编码相对路径勉强可用，但 OG/Twitter 绝对 URL 与 sitemap 位置需要它。
- **建议**：设 `site: "https://www.velolev.com"`（替换为真实域名）。

### T6. ✅ URL 规范 / 移动适配 / 视口 — 良好
- canonical 路径正确；`viewport` 存在（`width=device-width, initial-scale=1`）；`/en` 已 `noindex`+canonical `/`+meta-refresh 重定向（建议上线后改为服务器 301）。

---

## 四、站内 SEO

### O1. ⚠️ 标题标签（Title）偏弱 + GEOFlow 重复 — **P1/P2**
- **证据**：
  - 首页 `<title>Velolev</title>` —— 纯品牌词，缺核心关键词（"portable light pole lifter"）。
  - Blog `<title>Blog - Velolev</title>` —— 缺目标关键词。
  - GEOFlow 详情页 `<title>Blog - Velolev</title>` —— 与 blog 首页**完全重复**（见 T2）。
  - 文章页标题良好（含关键词）。
- **建议**：首页改 `"Portable Light Pole Lifter Manufacturer | Velolev"`；Blog 改 `"Pole Installation Insights & Guides | Velolev Blog"`；在 `routes.ts` 调整。GEOFlow 详情页由 T2 修复为文章真实标题。
- **预期效果**：首页可竞争核心词；消除标题重复。

### O2. ✅ Meta Description — 良好（除 GEOFlow）
- 17 个路由均有描述，质量合格、含关键词；仅 GEOFlow 页复用 blog 描述（随 T2 修复）。文章兜底描述 `"Read Velolev information about X"` 偏模板化，建议后续为重要文章补专属描述。

### O3. ❌ contact-us 页面无 H1 — **P2**
- **证据**：`dist/contact-us/index.html` h1=0，仅有 3 个 H2。每個可收录页应有且仅有 1 个 H1。
- **建议**：在 contact-us 内容碎片加一个 `<h1>`（如 "Contact Velolev"）。
- **预期效果**：结构更清晰，辅助主题相关性。

### O4. ✅ 图片 alt 覆盖 — 优势
- 抽样：home 17/17、blog 6/6、文章 8/8、about-us 13/13 均带 alt。保持。

### O5. ✅ 内链策略 — 良好（除 GEOFlow orphan）
- 导航 + blog 卡片形成合理内链网；修复 T2 的 GEOFlow 静态入口后即可无 orphan。

### O6. ⚠️ 内容质量 / 薄页 — **P2**
- 建议：复核各页独特正文 ≥ 300–500 词；`equipment-detail` 合并进 equipment（T4）；确保每页有唯一价值主张与 CTA。

---

## 五、站外 SEO（需外部工具测量）

> 以下指标**无法从本地构建产物得出**，给出"测量方式 + 行动建议"，不编造数字。

### X1. 外链 / 域名权重（DA/DR）— **未知**
- **测量**：Google Search Console「链接」报告、Ahrefs/Semrush/ Majestic。
- **建议**：
  - GEOFlow 产出的原创行业内容（5G 部署、成本对比、安全实践）天然是**可链接资产（linkable assets）**，应配数字公关/客座文章/行业媒体投稿获取优质外链。
  - 转化未链接的品牌提及为链接；清理毒链（如 >5% 则 disavow）。
- **预期效果**：DA 稳步提升 → 整站排名天花板提高。

### X2. 社交媒体表现 — **P2（因缺 OG 标签而受限）**
- **证据**：全站 0 个 `og:`/`twitter:` 标签 → 社媒分享卡片丑、点击率低。
- **建议**：加 OG/Twitter 基础标签（见附录），让每次分享自带标题/描述/图。
- **预期效果**：社媒分享 CTR 通常可提升 30–150%，间接受益于品牌信号。

### X3. 品牌词搜索量
- 用 GSC「查询」+ Google Trends 监测品牌词趋势，作为线下/口碑投放效果 proxy。

---

## 六、用户体验（需分析工具测量）

### U1. 跳出率 / 停留时间 — **未知，需埋点**
- **测量**：部署 GA4（或 Plausible）+ GSC；热图用 Microsoft Clarity。
- **推测风险**：T3 的重资源加载会拉高跳出；contact 表单是"死端"（提交后仅提示"请联系 Velolev"，**不真正发送**，见 U3）。

### U2. Core Web Vitals（详见 T3）
- 用 PageSpeed Insights / Lighthouse / CrUX 建立基线，纳入 CI。

### U3. ⚠️ 联系表单为死端 — **P2（转化问题）**
- **证据**：`BaseLayout.astro` 拦截 `elementor-form`/`commentform` 提交，仅显示"请联系 Velolev 直接完成咨询"，**不发送任何数据**。
- **影响**：线索流失，且无转化追踪 → 无法衡量 SEO 带来的商业价值。
- **建议**：接入真实表单后端（或 GEOFlow/CRM webhook），并加 GA4 转化事件。
- **预期效果**：把 SEO 流量转化为可追踪线索，闭环 ROI。

---

## 七、优先级行动清单

| 优先级 | 问题 | 工作量 | 预期影响 |
|--------|------|--------|----------|
| **P0** | robots.txt + sitemap（`@astrojs/sitemap` + `site`） | 低 | 收录基础设施就位，新内容小时级收录 |
| **P0** | GEOFlow 文章 SSR + 独立 title/desc/canonical + 静态入口链接 | 中 | GEOFlow 内容从 0 收录→可排名（最高杠杆） |
| **P1** | JSON-LD 结构化数据（Organization/WebSite/Article/Product/Breadcrumb） | 中 | 富媒体结果（面包屑、文章、FAQ），CTR 提升 |
| **P1** | 性能优化（defer JS、关键 CSS、图片 WebP/lazy） | 中 | CWV 达标→移动排名+跳出率改善 |
| **P2** | OG/Twitter 社交标签 | 低 | 社媒分享 CTR +30–150% |
| **P2** | 标题优化（首页/Blog/GEOFlow） | 低 | 核心词竞争力 |
| **P2** | contact-us 补 H1 | 低 | 页面结构规范 |
| **P2** | 合并/删除 equipment-detail 冗余页 | 低 | 消除重复内容 |
| **P2** | 联系表单接后端 + GA4 转化追踪 | 中 | 线索转化闭环 |
| **P2** | GSC + GA4 + Ahrefs 监测体系搭建 | 低 | 数据驱动迭代 |

---

## 八、附录：可直接落地的代码片段

### A. `astro.config.mjs` —— 启用 sitemap + 设 site
```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { contentAdminPlugin } from "./scripts/content-admin-plugin.mjs";

export default defineConfig({
  output: "static",
  site: "https://www.velolev.com",          // 替换为真实域名
  trailingSlash: "always",
  redirects: { "/en": "/", "/equipment-detail": "/equipment" },
  integrations: [sitemap()],                // 自动生成 sitemap-index.xml
  server: { host: "0.0.0.0" },
  vite: { plugins: [contentAdminPlugin()] },
});
```

### B. `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /404.html

Sitemap: https://www.velolev.com/sitemap-index.xml
```

### C. `cleanHeadHtml()` 增加 OG + JSON-LD（示意）
在 `src/utils/htmlCleanup.ts` 的 `cleanHeadHtml` 末尾、canonical 之后追加：
```ts
const og = `
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeAttribute(route?.title ?? "Velolev")}" />
<meta property="og:description" content="${escapeAttribute(description)}" />
<meta property="og:url" content="${site}${currentPath}" />
<meta name="twitter:card" content="summary_large_image" />`;
// 并注入 Organization / WebSite JSON-LD（含 logo、sameAs 社媒）
```
> 更稳健做法：在 `BaseLayout.astro` 的 `<head>` 内用 Astro 组件统一输出 OG/JSON-LD，而非拼接字符串。

### D. GEOFlow 详情页 SSR（核心修复方向）
`src/pages/blog/[slug].astro` 的 `getStaticPaths()`：
```ts
export async function getStaticPaths() {
  const API_BASE = "http://127.0.0.1:18080/api/v1";
  const FALLBACK = ["a874y2ak","eytcgki8"];
  let slugs = [...FALLBACK];
  try {
    const res = await fetch(`${API_BASE}/public/articles`);
    const { data } = await res.json();
    slugs = Array.from(new Set([...slugs, ...data.map(a => a.slug)]));
  } catch {}
  return slugs.map((slug) => ({ params: { slug } }));
}
// 渲染时 await fetchGeoArticle(slug) 把 title/excerpt/body 写入静态 HTML，
// 并据此设置 <title>/description/canonical=/blog/{slug}/
```

---

## 九、测量与迭代计划
1. **上线即接**：GSC（提交 sitemap）、GA4（含转化事件）、Bing Webmaster。
2. **基线**：Lighthouse CI 跑移动/桌面 CWV；Ahrefs 拉外链与 DA 基线。
3. **双周复盘**：索引覆盖率、非品牌自然流量、核心词排名、CWV、跳出率。
4. **内容节奏**：以 GEOFlow 周更为牵引，每篇配套内部链接与专属 meta。

---
*本报告基于 `dist/` 实测；站外/UX 量化需接入上述工具后补充。建议优先执行 P0 两项，预计 1–2 周内可观察到收录与可见性改善。*
