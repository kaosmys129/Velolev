# 本地 SEO 优先修复行动计划 (ACTION-PLAN)

> **关联审计报告**：[FULL-AUDIT-REPORT.md](file:///Users/peterpc/Documents/liftpolemachine-web/FULL-AUDIT-REPORT.md)
> **执行状态**：**P0、P1 与关键 P2 优化项已 100% 修复完毕，自动化门禁与单测 100% 通过**
> **更新时间**：2026-11-05
> **排序原则**：按 **SEO 业务影响度 (Impact)** 与 **工程实施成本 (Effort)** 划分为四个阶段（**P0 上线前阻断项 → P1 快速赢取项 → P2 战略架构与性能项 → P3 上线门禁与持续维护**），并附带防门禁回归（`content:check`、`d60:check`、`locales:check`、`retirement:check`）的精确代码规范。

---

## 阶段一：上线前必须清零的阻断项 (P0 — Immediate Blockers)

### [P0-1 / 对应 F-01] 修复技术指南页构建期图片路径越界与 `en` 分支限制，并解耦 `Table 1` 对比表渲染
- **影响范围**：`/guides/install-12m-street-light-poles-without-crane/` 及其 6 个非英语本地化页面（共 7 页，恢复 35 张工程信息图、7 张 16:9 封面图与 7 张 HTML 工程对比数据表）
- **目标文件**：[maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L41-L63)
- **问题根因**：
  1. 第 41 行 `fileURLToPath(new URL("../../../public/images", import.meta.url))` 在 `astro build` 编译产物 `dist/chunks/` 下执行时解析到了仓库外目录，导致 `imageFolder` 与 `heroCoverImage` 恒为 `null`；
  2. 第 43 行 `locale !== "en" ? ... : null` 排除了英文版匹配 `portable-light-pole-lifter-explainer-en`（而 `public/images/install-12m-street-light-poles-without-crane/` 缺失 `cover-flow-hero-16x9.png`）；
  3. 第 681 行 `<table class="engineering-data-table">` 被包裹在 `{fig && ...}` 内，导致 `fig` 为空时对比表 `Table 1` 同步丢失。
- **代码修改规范**：
  1. 修改第 41–48 行的 `publicBase` 与 `candidates` 解析逻辑：
     ```javascript
     // 使用工作目录兼容解析，并允许所有语种（含 en）优先匹配完整的 explainer 語种图集
     const repoPublicImages = path.resolve(process.cwd(), "public/images");
     const publicBase = fs.existsSync(repoPublicImages)
       ? repoPublicImages
       : path.resolve(process.cwd(), "maquin-astro-theme/public/images");
     const candidates = [
       locArticle?.imageFolder,
       `portable-light-pole-lifter-explainer-${locale}`,
       article.slug,
       `volvet-lifter-${article.slug}`,
       "volvet-lifter-task-based-deepseek-article"
     ].filter(Boolean);
     ```
  2. 修改第 681 行的表格渲染条件，使其与 `fig` 是否存在解耦（在第 1 节 `idx === 0` 或存在 `05` 对比图时稳定渲染）：
     ```astro
     {(idx === 0 || (fig && (fig.id === "05" || fig.src.includes("05-crane-vs-lifter-comparison")))) && (
       <div class="editorial-table-wrapper">
         <table class="engineering-data-table">
     ```
  3. 清理 `maquin-astro-theme/public/images/` 下的 4 个重复/历史遗留图集目录（`install-12m-street-light-poles-without-crane`、`portable-light-pole-lifter-explainer`、`volvet-lifter-article-edited`、`volvet-lifter-task-based-deepseek-article`），仅保留 `product/` 与 7 个语种的 `portable-light-pole-lifter-explainer-{en,es,fr,pt,vi,th,id}/`，消除 78.4% 孤立图片冗余。

---

### [P0-2 / 对应 F-02] 清理违反 `content-baseline.json` 的未验证 E-E-A-T 声称、ISPM-15 与 70% 降本承诺
- **影响范围**：7 语种技术指南页、`/llms.txt`、7 语种首页
- **目标文件与精确行号**：
  1. [maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L286-L524)（第 286–289、325–328、364–367、403–406、442–445、481–484、520–523 行及第 728–736 行）：
     - 将 7 语种 `reviewerName` 从未核实的个人署名 `"Carlos Mendoza, PE (Lead Structural Systems Engineer)"` 统一替换为机构署名 `"volvet Engineering Review"`；
     - 将 `calibrationLabel` 从 `"ISO/IEC 17025 Calibration Protocol"` 替换为符合 [content-baseline.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/content-baseline.json#L27-L34) 的 `"Specification-Only Baseline (Field Validation Pending)"`；
     - 将 `fieldCaseBody` 中的未验证实测数字（`193kg/22s/3.2m/s/16MPa/375kg/52次循环`）替换为已确认的基线规格范围（300 kg WLL、85 kg 分体总重、65 kg 最重模块、200–450 mm 法兰跨距、现场实测数据待门禁解锁后发布）。
  2. [maquin-astro-theme/src/data/published-content-locales.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/published-content-locales.json#L15)：
     - 清理第 `15, 120, 225, 330, 435, 540` 行泄露的内部事实编码 `(F001, F002, F008, F015, F016, F020)` 及未核实的 24 小时保压声称；
     - 清理或改写第 `66-71` (`es`)、`171-176` (`fr`)、`276-281` (`pt`)、`381-386` (`vi`)、`486-491` (`th`)、`591-596` (`id`) 行中未核实的 `Carlos Mendoza` 与 `193 kg / 22 s / 375 kg` 现场实测章节。
  3. [maquin-astro-theme/src/pages/llms.txt.ts](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/pages/llms.txt.ts#L12-L19)（第 12–19 行）：
     - 移除第 15 行违反 `verify-content-baseline.mjs:31` 的 `complying with ISPM-15 phytosanitary export requirements (F010, F023)`；
     - 移除第 12 行未验证的 `100% calibrated and verified on factory vertical test rigs with 24-hour hydraulic pressure hold testing` 以及第 12–19 行的内部编码 `(F001..F023)`。
  4. [maquin-astro-theme/src/components/procurement/HomePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/HomePage.astro#L14)（第 14 行）与 [maquin-astro-theme/src/data/reconstruction-copy.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/reconstruction-copy.json#L588-L594)（第 588–594 行）：
     - 将违反 `commercialPolicy.publishPaybackPromises: false` 的 `"engineered to slash installation costs by up to 70%"` 改为符合基线的 `"engineered for crane-free street light pole installation"`；
     - **防门禁回归指令**：必须同步更新 `reconstruction-copy.json` 第 588–594 行的全部 7 语种对照数组，否则 `npm --prefix maquin-astro-theme run locales:check` 会因匹配不到英文原文键名而报错失败！

---

### [P0-3 / 对应 F-03] 修复英文旗舰指南 `published-content.json` 的列表坍塌、ASCII 乱码与无链接伪 CTA，并重算快照哈希
- **影响范围**：`/guides/install-12m-street-light-poles-without-crane/`
- **目标文件**：
  1. [maquin-astro-theme/scripts/prepare-geoflow-review.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/prepare-geoflow-review.mjs#L62-L63)（第 62–63 行）
  2. [maquin-astro-theme/src/data/published-content.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/published-content.json#L26-L134)
- **修改规范**：
  1. 在 `prepare-geoflow-review.mjs:62-63` 中保留列表项之间的 `\n` 换行符，不再将多行列表用空格合并为单行；
  2. 在 `published-content.json` 中：
     - 将第 26、35、46 行的无序列表（`- ...`）与第 61、67、73、81 行的有序列表（`1. ... \n2. ...`）恢复为 `\n` 分隔的多行字符串，使 [render-markdown.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/lib/render-markdown.mjs#L11-L34) 正确渲染出 `<ul><li>` 与 `<ol><li>`；
     - 移除第 55 行坍塌的 ASCII 字符框图（已由恢复后的 `04-sop-field-workflow-16x9.png` 视觉图替代）；
     - 移除第 38、48、74 行无链接的纯文本伪 CTA（特别是第 74 行承诺不存在的 PDF 手册的文案），统一由 `GuideArticlePage.astro` 组件渲染带真实 `<a href>` 的转化卡片；
     - 将第 130 行 `reviewer` 改为 `"volvet Engineering Review"`。
  3. **防门禁回归指令（关键）**：[src/lib/reviewed-snapshot.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/lib/reviewed-snapshot.mjs#L11-L24) 在构建时强制校验 `r.contentSha256 !== articleContentHash(a)`。修改 `published-content.json` 后，必须运行以下命令自动重算并写回第 133 行的 `contentSha256`：
     ```bash
     node -e '
       import fs from "node:fs";
       import { articleContentHash } from "./maquin-astro-theme/src/lib/reviewed-snapshot.mjs";
       const file = "./maquin-astro-theme/src/data/published-content.json";
       const data = JSON.parse(fs.readFileSync(file, "utf8"));
       for (const a of data.articles) {
         a.review.contentSha256 = articleContentHash(a);
       }
       fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
     '
     ```

---

### [P0-4 / 对应 F-04] 移除 14 个商业页面的受限 `FAQPage` JSON-LD 注入
- **影响范围**：7 语种 `/faq/` 与 7 语种技术指南页（共 14 页）
- **目标文件**：
  1. [maquin-astro-theme/src/layouts/ProcurementLayout.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/layouts/ProcurementLayout.astro#L46)（第 46 行）
  2. [maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L562-L578)（第 534–537、562–573、578 行）
- **代码修改规范**：
  - 在 `ProcurementLayout.astro:46` 中移除 `page==="faq"?faqSchema(faqs):null` 的注入（仅保留 `organizationSchema`、`productSchema` 与新增的 `breadcrumbSchema`/`websiteSchema`）；
  - 在 `GuideArticlePage.astro` 中移除 `faqSchema` 构建与第 578 行的 `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />`，保留页面可见的 HTML `<details class="editorial-faq-item">` 手风琴结构供用户阅读与 AI Overviews 抓取；
  - **防门禁回归指令**：**切勿删除** [src/utils/contentPolicy.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/utils/contentPolicy.mjs#L138-L151) 中的 `export function faqSchema` 定义，因为单元测试 [scripts/contentPolicy.test.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/contentPolicy.test.mjs#L65) 显式测试了该函数导出。

---

## 阶段二：高性价比快速赢取项 (P1 — Quick Wins)

### [P1-1 / 对应 F-08 & F-09] 修复 `/about-us/` 英文元数据与 6 语种报价 CTA 路由错误
- **目标文件**：
  1. [maquin-astro-theme/src/data/about-copy.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/about-copy.json#L3-L4)（第 3–4 行）
  2. [maquin-astro-theme/src/lib/site-config.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/lib/site-config.mjs#L25)（第 25 行）
  3. [maquin-astro-theme/src/pages/about-us.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/pages/about-us.astro#L1-L7)
  4. [maquin-astro-theme/src/components/procurement/AboutUsPage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/AboutUsPage.astro#L10)（第 10 行）
- **代码修改规范**：
  1. 将 `about-copy.json:4` 的 `en.metaDescription`（原 177 字符）精简至 150 字符以内（如 `"Learn volvet's confirmed portable hydraulic pole lifter focus, verified 300 kg WLL specifications, and transparent B2B engineering procurement workflow."`），并同步写入 `site-config.mjs:25` 的 `corePages.about.description` 与 `about-us.astro`（确保 [verify-d60.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/verify-d60.mjs#L9) 的 `title === page.title` 强校验通过）；
  2. 将 `AboutUsPage.astro:10` 从 `const quotePath=current==="en"?"/quote/":\`/\${current}/contact-us/\`;` 修改为：
     ```javascript
     const quotePath = localizedPagePath("quote", current);
     ```

---

### [P1-2 / 对应 F-10] 修复技术指南页底部 42 处（6 个链接 × 7 语种）裸露英文 URL Slug 锚文本
- **目标文件**：[maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L741-L745)（第 741–745 行）
- **代码修改规范**：
  导入 `corePages, pageKeyForPath, localizePath`（来自 `../../lib/site-config.mjs`）与 `translateText`（来自 `../../lib/industrial-localization.mjs`），将第 741–745 行替换为本地化可读标题：
  ```astro
  {article.relatedPaths.map((p) => {
    const key = pageKeyForPath(p);
    const baseLabel = key && corePages[key]
      ? corePages[key].title.replace(/\s*\|\s*volvet.*$/i, "")
      : p.replace(/^\/|\/$/g, "").replace(/-/g, " ");
    const label = locale === "en" ? baseLabel : translateText(baseLabel, locale);
    return (
      <a class="editorial-related-chip" href={localizePath(p, locale)}>
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  })}
  ```

---

### [P1-3 / 对应 F-05, F-06, F-07] 结构化数据升级（`TechArticle` 移入 `<head>`、`Product`/`Organization` 7 语种本地化、新增 `BreadcrumbList` 与 `WebSite`）
- **目标文件**：
  1. [maquin-astro-theme/src/utils/contentPolicy.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/utils/contentPolicy.mjs#L79-L185)
  2. [maquin-astro-theme/src/layouts/ProcurementLayout.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/layouts/ProcurementLayout.astro#L44-L47)
  3. [maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L539-L578)
- **代码修改规范**：
  1. **多语言本地化 `organizationSchema` 与 `productSchema`**：在 `contentPolicy.mjs` 中为 `organizationSchema(origin, locale = "en")` 与 `productSchema(origin, imageUrl, path = "/products/light-pole-jack/", locale = "en")` 增加 `locale` 参数，使用 `aboutCopy[locale]?.metaDescription` 本地化组织描述，并使用已导入的 [public-copy.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/public-copy.json#L12-L27) (`copyFor(locale).summary` 与 `copyFor(locale).labels[0..13]`) 本地化产品描述与 14 项 `PropertyValue.name`（避免 `translateText` 漏译 7 个属性名）。
  2. **修复 `TechArticle`**：在 `GuideArticlePage.astro:539-560` 中使用 `canonicalUrl(currentPath, origin)` 解析 `mainEntityOfPage.@id`，使用 `origin ? new URL(ogImage, origin).href : ogImage` 解析 `image`，补齐 `author.url`、`publisher.url` 与 `publisher.logo`，并通过 prop `extraSchemas={[techArticleSchema]}` 传入 `ProcurementLayout.astro` 的 `<head>` 中渲染。
  3. **新增 `BreadcrumbList` 与 `WebSite` Schema**：在 `ProcurementLayout.astro` 中，当 `page === "home"` 时注入 `WebSite` Schema；当 `page !== "home"` 时根据当前语言首页与当前页面标题生成 2–3 级 `BreadcrumbList` JSON-LD。

---

### [P1-4 / 对应 F-13, F-14, F-15] 全站 Title/Description 长度收敛、Twitter Card / OG 标签补齐与无障碍修复
- **目标文件**：
  1. [maquin-astro-theme/src/components/procurement/GuideArticlePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/GuideArticlePage.astro#L532)（第 532 行）
  2. [maquin-astro-theme/src/layouts/ProcurementLayout.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/layouts/ProcurementLayout.astro#L41-L105)
  3. [maquin-astro-theme/src/components/procurement/FaqPage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/FaqPage.astro#L4)（第 4 行）
  4. [maquin-astro-theme/src/components/procurement/MediaLightbox.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/MediaLightbox.astro#L11)（第 11 行）
- **代码修改规范**：
  1. 在 `GuideArticlePage.astro:532` 中避免重复追加品牌后缀：
     ```javascript
     const rawSeoTitle = locArticle?.seoTitle || article.seoTitle || article.title;
     const seoTitle = /\|\s*volvet/i.test(rawSeoTitle) ? rawSeoTitle : `${rawSeoTitle} | volvet`;
     ```
     并将英文版 `published-content.json:9` 的 `seoTitle` 收敛为 `"12m Light Pole Installation Without a Crane | volvet"`（53 字符）；同步收敛 `site-config.mjs:17-35` 与 `industrial-copy/*.json` 中超长/过短的 Title（控制在 50–60 字符）和 Description（控制在 120–158 字符）。
  2. 在 `ProcurementLayout.astro` `<head>` 中补齐社交元数据：
     ```astro
     <meta property="og:type" content={page === "guide-article" ? "article" : "website"} />
     <meta property="og:locale" content={locale} />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content={meta.title} />
     <meta name="twitter:description" content={meta.description} />
     <meta name="twitter:image" content={socialImageUrl} />
     ```
  3. 将 `FaqPage.astro:4` 的 `<h3>Ask with a drawing.</h3>` 改为 `<h2>Ask with a drawing.</h2>`，修复 `H1→H3` 标题跳级。
  4. 将 `MediaLightbox.astro:11` 的空 `<img data-lightbox-image alt="" />` 改为带 1×1 透明占位图的合法节点：
     ```astro
     <img data-lightbox-image src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1" alt="" />
     ```

---

### [P1-5 / 对应 F-12] 使用 `@astrojs/sitemap` 的 `serialize` 钩子注入 7 语种 + `x-default` `xhtml:link` 与 `<lastmod>`
- **目标文件**：[maquin-astro-theme/astro.config.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/astro.config.mjs#L23-L31)
- **代码修改规范**：
  由于存在非对称多语言路由（如 `/products/light-pole-jack/` 对应 `/<lang>/equipment/`），`@astrojs/sitemap` 默认的 `i18n` 无法跨异名 slug 关联。应在 `astro.config.mjs` 中通过 `serialize(item)` 调用 `pageKeyForPath` 与 `coreAlternates` 注入精确的 `links` 与 `lastmod`：
  ```javascript
  import { pageKeyForPath, coreAlternates, industrialLocales } from "./src/lib/site-config.mjs";

  sitemap({
    filter(page) {
      const pathname = new URL(page).pathname;
      return !excludedPaths.has(pathname) && !pathname.startsWith("/admin");
    },
    serialize(item) {
      const urlObj = new URL(item.url);
      const pathname = urlObj.pathname;
      const origin = urlObj.origin;
      const key = pageKeyForPath(pathname);
      let links = [];
      if (key) {
        const alts = coreAlternates(key);
        const enAlt = alts.find((a) => a.lang === "en");
        links = [
          ...alts.map((a) => ({ lang: a.lang, url: `${origin}${a.path}` })),
          ...(enAlt ? [{ lang: "x-default", url: `${origin}${enAlt.path}` }] : [])
        ];
      } else if (pathname.includes("/guides/")) {
        const slug = pathname.split("/guides/")[1]?.replace(/\/$/, "");
        if (slug) {
          links = [
            { lang: "en", url: `${origin}/guides/${slug}/` },
            ...industrialLocales.map((l) => ({ lang: l, url: `${origin}/${l}/guides/${slug}/` })),
            { lang: "x-default", url: `${origin}/guides/${slug}/` }
          ];
        }
      }
      return {
        ...item,
        lastmod: new Date("2026-10-28T00:00:00.000Z").toISOString(),
        ...(links.length ? { links } : {})
      };
    }
  })
  ```

---

## 阶段三：战略性能与架构优化 (P2 — Strategic Improvements)

### [P2-1 / 对应 F-16] 静态图像 WebP/AVIF 转换、37 张超重图瘦身与首屏 LCP 主图 Preload
- **目标文件**：
  - `maquin-astro-theme/public/images/product/portable-light-pole-lifter-specification-sheet.png` (1,655 KB)
  - `maquin-astro-theme/public/images/product/jobsite-*.jpg` (818–896 KB)
  - `maquin-astro-theme/public/images/portable-light-pole-lifter-explainer-*/cover-flow-hero-16x9.png` (768–854 KB)
  - [maquin-astro-theme/src/layouts/ProcurementLayout.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/layouts/ProcurementLayout.astro#L95-L99)
- **实施步骤**：
  1. 将 37 张 >200 KB 的 PNG/JPG 光栅图压缩或提供 `<picture><source type="image/webp">` 现代格式版本（单张体积控制在 <150 KB）；
  2. 在 `ProcurementLayout.astro` `<head>` 中为首页、产品页（`/images/product/portable-pole-lifter-hero-cutout.png`）与技术指南页（`heroCoverImage`）注入 `<link rel="preload" as="image" href={lcpImageHref} fetchpriority="high" />`。

### [P2-2 / 对应 F-17] Node 服务端 Brotli/Gzip 压缩、`immutable` 长效缓存与 HSTS/CSP 响应头加固
- **目标文件**：[maquin-astro-theme/server/inquiry-server.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/inquiry-server.mjs#L25-L34)（及第 253 行）
- **实施步骤**：
  1. 引入 `node:zlib` (`brotliCompressSync` / `gzipSync`)，根据请求头 `Accept-Encoding` 对 `.html/.css/.js/.json/.svg/.xml/.txt` 启用压缩；
  2. 对 `/_astro/*` 与 `/fonts/*.woff2` 等指纹静态资产设置 `Cache-Control: public, max-age=31536000, immutable`；
  3. 在 `sec` 安全头对象中补充 `Content-Security-Policy` 与（在 HTTPS 生产模式下的）`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`。

### [P2-3 / 对应 F-11 & F-18] 多语言语义化 URL 路由统一与 `/about-us/` 正文上下文内链增强
- **目标文件**：
  - [maquin-astro-theme/src/lib/site-config.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/lib/site-config.mjs#L37-L49)
  - [maquin-astro-theme/src/data/route-aliases.json](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/data/route-aliases.json)
  - [maquin-astro-theme/scripts/verify-wordpress-retirement.mjs](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/verify-wordpress-retirement.mjs)
  - [maquin-astro-theme/src/components/procurement/HomePage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/HomePage.astro) / [ProductPage.astro](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/ProductPage.astro)
- **实施步骤**：
  1. 评估在下一阶段迭代中将 6 个非英语语种的 `product`、`quote`、`guides` 规范路径从旧版 WordPress slug（`equipment`、`pricing-plan`、`blog`）统一为语义化路径（`products/light-pole-jack`、`quote`、`guides`），并将旧路径移入 `route-aliases.json` 进行 301 重定向；
  2. 在 `HomePage.astro` 与 `ProductPage.astro` 的制造商说明段落中添加指向 `/about-us/` 的正文上下文链接（同步更新 `reconstruction-copy.json` 以通过 `locales:check`）。

---

## 阶段四：修复后自动化门禁回归与正式发布核查清单 (P3 — Verification & Launch Gate)

每次执行上述修复后，必须在仓库根目录按顺序运行以下自动化校验脚本，确保 0 回归失败：

```bash
# 1. 重新构建静态产物并更新 .volvet-build.json 指纹
npm --prefix maquin-astro-theme run build

# 2. 运行全套内容基线、D30/D60、7 语种翻译完整性与 WordPress 退役重定向门禁
npm --prefix maquin-astro-theme run content:check
npm --prefix maquin-astro-theme run d30:check
npm --prefix maquin-astro-theme run d60:check
npm --prefix maquin-astro-theme run locales:check
npm --prefix maquin-astro-theme run retirement:check

# 3. 模拟正式生产域名构建并校验 Canonical / Hreflang / Sitemap
PUBLIC_SITE_URL="https://example.test" ./maquin-astro-theme/node_modules/.bin/astro build --root ./maquin-astro-theme --outDir /tmp/volvet-configured-check
node ./maquin-astro-theme/scripts/verify-d60.mjs --configured=/tmp/volvet-configured-check
rm -rf /tmp/volvet-configured-check
```
