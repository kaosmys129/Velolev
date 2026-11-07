# 07 · GEOFlow B2B 工业品出海文章配图与瑞士卡片视觉规范

> 依据标准：`guizang-social-card-skill` 视觉排版美学与企业级原子物理事实治理网 (F001–F031)  
> 适用场景：便携式路灯立杆机（volvet / portable light pole lifter）及工业装备出海独立站、GEO 生成式引擎优化与全渠道社媒营销  
> 版本：2026-11-02 · V1.0

---

## 一、 为什么 B2B 工业长文必须具备“瑞士工商业视觉配图体系”？

1. **破除 AI 水文感与视觉疲劳**：
   传统批量生成的出海博客通篇文字，极度缺乏视觉针点。引入瑞士国际主义（Swiss International Style）与工商业信息图，以严谨网格、高对比度安全警示色、清晰排版与真实产品抠图，瞬间树立“德国/瑞士高端装备制造商”的专业信任感；
2. **满足 Google EEAT 与 GEO 实体收录**：
   Google Helpful Content 与多模态生成式搜索引擎（Perplexity、ChatGPT Search、Google Gemini）高度青睐具备高信息密度信息图、带参数图表与结构化标注的独立站页面。具备原创图注（Captions）与实体描述的图片能显著拉升知识实体召回率；
3. **出海多渠道分发（Content Atomization）**：
   一篇高质量长文不仅服务于独立站 On-Page SEO，其配图卡片能够一键适配 LinkedIn 轮播文档（Carousels）、Twitter/X 专业推文配图、小红书（Rednote）出海笔记以及客户技术方案沟通材料。

---

## 二、 核心规格与输出规范 (Aspect Ratios & Dimensions)

统一采用 2x/3x 高清矢量与位图渲染导出，杜绝任何模糊毛刺：

| 规格类型 | 像素尺寸 | 比例 | 用途与交付场景 | 设计核心要素 |
|---|---|---|---|---|
| **16:9 篇首全景头图** | `1920 × 1080` | 16:9 | 博客 H1 下方 Hero 图、OpenGraph `og:image`、官网横幅 | 品牌标识、主标陈述、4项核心 KPI、真实产品立姿抠图、合规引证标 |
| **16:9 篇内技术图表** | `1920 × 1080` | 16:9 | 嵌入各 H2 章节内（分体架构、法兰适配、SOP 流程、吊车对比） | 双分体模组对比、P.C.D. 180–260mm 径向槽图、3阶段两人工序流 |
| **3:4 移动社媒轮播卡** | `1080 × 1440` | 3:4 | LinkedIn 文档卡、Rednote/小红书出海图文、移动端竖屏 | 垂直高密度卡片、封面钩子、结论摘要、规格透视、选型决策指南 |
| **1:1 方形缩略图** | `1080 × 1080` | 1:1 | 独立站文章列表配图、微信公众号方图、社媒方形头像卡 | 极简高辨识度居中大字、核心参数药丸徽章、单图视觉聚焦 |

---

## 三、 视觉配色与设计 Token (Swiss Style Tokens)

以瑞士国际主义排版为基准，提供 **Safety Orange (安全工业橙)** 与 **IKB Blue (克莱因工业蓝)** 两种预设风格。便携式路灯立杆机推荐默认使用 **Safety Orange**，呼应高危施工与工业重装备的安全防护文化：

```css
/* Safety Orange 工业高定色盘 (Default) */
[data-accent="safety-orange"] {
  --paper: #fafaf8;            /* 纯净暖白工业画报底色 */
  --ink: #0a0a0a;              /* 墨黑高对比字色 */
  --grey-1: #f3f3f1;           /* 模块底层浅灰 */
  --grey-2: #d8d8d5;           /* 极细分割线 hairline (1px) */
  --grey-3: #6e6e6e;           /* 次级说明与技术参数字色 */
  --accent: #FF6B35;           /* 国际安全施工橙色 (Safety Orange) */
  --accent-on: #ffffff;        /* 强调色前景纯白 */
  --accent-soft: rgba(255, 107, 53, 0.08); /* 柔和浅橙底纹 */
  --dark-plate: #131518;       /* 沉浸式暗色技术底板 */
  --dark-plate-2: #1c1f24;     /* 暗色次级容器 */
}

/* Typography 字体栈 */
:root {
  --sans: "Inter", -apple-system, "Noto Sans SC", "Helvetica Neue", sans-serif;
  --mono: "IBM Plex Mono", "SF Mono", Consolas, ui-monospace, monospace;
}
```

### 设计铁律 (Guizang Style Constraints)
1. **严禁无理由加粗**：瑞士风格的大标题 (`.h-statement`, `.h-hero`) 必须保持 `font-weight: 400` 至 `500` 的轻盈与理性感，严禁使用 800+ 粗壮字体造成视觉压迫；
2. **Mono 技术遥测标签**：所有阶段序号、版本号、标准代号（如 `OSHA 1926`、`F002`）、尺寸数据必须采用 `IBM Plex Mono`，并保持 `letter-spacing: 0.12em` 大写字距；
3. **真实物理比例**：参数指示条（如 P.C.D. 180–260mm、载荷 300kg）必须通过真实 CSS 宽度与高度（`--w: NN%`, `--h: NNpx`）量化表达，杜绝抽象无意义图表；
4. **留白与密度门禁**：3:4 竖版卡片内容覆盖率 $\ge 75\%$，杜绝上下大面积空白的“残缺 PPT”视觉感。

---

## 四、 真实工程资产嵌入规范 (Evidence-First Visuals)

配图必须优先挂载本项目已核验的真实物理资产，严禁直接生成荒谬的“AI 想象机械”（如三个轮子的吊车、违背力学的液压杆）：

1. **主机抠图资产**：
   * `maquin-astro-theme/public/images/product/portable-pole-lifter-hero-cutout.png`（主机透明正视透视抠图，用于 16:9 封面与 3:4 封面）；
   * `maquin-astro-theme/public/images/product/portable-pole-lifter-side-cutout.png`（主机侧向结构抠图，用于模组拆解图）；
2. **工厂与质检验资资产**：
   * `maquin-astro-theme/public/images/evidence/equipment-engineering-drawing-raw.jpg`（出厂工程蓝图，用于底板法兰适配图背景）；
   * `maquin-astro-theme/public/images/quality/vertical-proof-load-test-rig.jpg`（垂直试验台 300kg 验证图）；
   * `maquin-astro-theme/public/images/quality/hydraulic-pressure-test-bench.jpg`（液压保压质检测试台）；
3. **施工工况实景资产**：
   * `maquin-astro-theme/public/images/evidence/field-installation-flange-erect.jpg`（狭窄非机动车道实地升立）；
   * `maquin-astro-theme/public/images/evidence/jobsite-parking-lot-tight-space.jpg`（停车场绿化带作业场景）。

---

## 五、 多语言支持与 Markdown 正文挂载语法

### 1. 覆盖全站 7+1 语言的图表字典
配图引擎原生支持整站全部语言（`en`, `es`, `fr`, `pt`, `vi`, `th`, `id` + `zh`）：
- **全语种卡片字典**：7 张卡片的标题、分类标签、技术参数与引证说明均根据语言动态注入；
- **专属语言图注**：自动为各语言正文生成符合工程语境的 `*Figure N: ...*` 图注（例如法语 `*Figure 1: Architecture modulaire...*`，泰语 `*ภาพที่ 1: สถาปัตยกรรมกำลังของไหลแบบโมดูลาร์...*`）。

### 2. Markdown 正文挂载与路径规范
在文章 Markdown 中，配图紧随对应 H2 章节之后，且路径统一规范为 `/images/<slug>/...`：

```markdown
## 1. Mechanical Architecture & Split Two-Module Engineering

![Portable light pole lifter two-module engineering architecture: 45kg hydraulic column rig and 40kg 24V power control unit](/images/portable-light-pole-lifter-explainer-en/02-two-module-architecture-16x9.png)
*Figure 1: Modular fluid power architecture separating the 85kg package into two transportable units (<45kg each) compliant with manual handling regulations.*
```

### 3. Docker 容器静态资源直通服务
配图文件输出至 `geo-drafts/articles/images/<slug>/`，通过 `ops/geoflow/compose.yaml` 的数据卷挂载：
```yaml
- ../../geo-drafts/articles/images:/var/www/html/public/images:ro
```
使得 GEOFlow 本地管理后台（`http://127.0.0.1:18082`）与前端文章能直接通过 HTTP `200 OK` 访问所有高清配图。

---

## 六、 Astro 独立站前端配图同步与模板挂载标准 (Astro Frontend Integration & MediaFigure Mounting)

### 1. 静态资源双写与自动同步规范 (Public Asset Sync)
Astro 开发服务器与生产静态构建只服务 `maquin-astro-theme/public/` 目录下的静态资产。因此配图引擎必须支持**双写同步机制**：
1. **存储路径**：
   - 草稿归档路径：`geo-drafts/articles/images/<slug>/`
   - Astro 公共路径：`maquin-astro-theme/public/images/<slug>/`（如存在历史或发布别名，须同时建立软链接或同步目录）
2. **严防构建断言污染（Critical）**：
   - 配图渲染临时模板 `deck.html` **严禁**复制到 `maquin-astro-theme/public/` 目录下；
   - 站点生产门禁 `verify-wordpress-retirement.mjs` 会深度扫描 `dist/` 下的每一个 `.html` 文件，断言其必须包含 `<header class="site-header">`，裸露的卡组 HTML 会导致整站构建熔断失败；
   - 同步规则：**仅同步 `.png`, `.jpg`, `.svg`, `.webp` 等纯图片资产**。

### 2. Astro 动态文章页模板 (`src/pages/guides/[slug].astro`) 挂载实现
文章详情模板必须按如下架构挂载全套瑞士工商业卡片：

```astro
---
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Layout from "../../layouts/ProcurementLayout.astro";
import MediaFigure from "../../components/procurement/MediaFigure.astro";
import { loadPublishedSnapshot } from "../../lib/reviewed-snapshot.mjs";

export function getStaticPaths() {
  return loadPublishedSnapshot().articles.map(article => ({
    params: { slug: article.slug },
    props: { article }
  }));
}

const { article } = Astro.props;
const meta = { path: `/guides/${article.slug}/`, title: `${article.title} | volvet`, description: article.description };

// 1. 自动定位该文章在 public/images 中的配图目录
const publicBase = fileURLToPath(new URL("../../../public/images", import.meta.url));
const candidates = [
  article.slug,
  `volvet-lifter-${article.slug}`,
  article.slug.replace(/^(?:install-12m-street-light-poles-without-crane)$/, "volvet-lifter-task-based-deepseek-article"),
  "volvet-lifter-task-based-deepseek-article"
];

let imageFolder = null;
for (const c of candidates) {
  if (fs.existsSync(path.join(publicBase, c, "01-feature-hero-cover-16x9.png"))) {
    imageFolder = c;
    break;
  }
}

// 2. 章节与 4 处技术图表唯一确定映射（全篇防重）
const renderedCards = new Set();
function getSectionFigure(heading, folder) {
  if (!folder) return null;
  const h = heading.trim();
  // 对比矩阵 (Section 1)
  if (!renderedCards.has("05") && (h.startsWith("1.") || /engineering challenge.*crane|comparison/i.test(h))) {
    renderedCards.add("05");
    return {
      src: `/images/${folder}/05-crane-vs-lifter-comparison-16x9.png`,
      alt: "Jobsite feasibility comparison: 16-ton mobile crane vs volvet portable hydraulic pole lifter",
      label: "02 / FEASIBILITY & COMPARISON",
      caption: "Figure 5: Operational feasibility and jobsite access comparison: traditional 16-ton mobile crane versus volvet portable pole lifter across narrow access, crew size, and powerline clearances."
    };
  }
  // 双模组分体架构 (Section 2)
  if (!renderedCards.has("02") && (h.startsWith("2.") || /hydraulic mechanics.*300kg|architecture/i.test(h))) {
    renderedCards.add("02");
    return {
      src: `/images/${folder}/02-two-module-architecture-16x9.png`,
      alt: "Portable light pole lifter two-module mechanical engineering architecture",
      label: "03 / MECHANICAL ARCHITECTURE",
      caption: "Figure 2: Two-module hydraulic architecture comprising 45kg lifting cylinder mast and 40kg 24V electric power cabinet designed for two-worker field maneuverability."
    };
  }
  // 底板法兰 P.C.D. 适配 (Section 3)
  if (!renderedCards.has("03") && (h.startsWith("3.") || /foundation anchorage.*p\.?c\.?d|flange/i.test(h))) {
    renderedCards.add("03");
    return {
      src: `/images/${folder}/03-flange-pcd-compatibility-16x9.png`,
      alt: "Base flange compatibility and P.C.D. 180mm to 260mm radial slotted geometry",
      label: "04 / BASE & FLANGE COMPATIBILITY",
      caption: "Figure 3: Universal base plate geometry accommodating 180mm to 260mm bolt circle diameters (P.C.D.) and M16-M24 anchor studs with ASTM F1554 compliance."
    };
  }
  // 三阶段双人 SOP 工序 (Section 4)
  if (!renderedCards.has("04") && (h.startsWith("4.") || /standard sop erection sequence|sop workflow/i.test(h))) {
    renderedCards.add("04");
    return {
      src: `/images/${folder}/04-sop-field-workflow-16x9.png`,
      alt: "Standard two-worker ground-level erection SOP workflow",
      label: "05 / FIELD EXECUTION SOP",
      caption: "Figure 4: Standard three-stage SOP workflow: Stage 1 ground preparation, Stage 2 hydraulic erection stroke, and Stage 3 foundation leveling and torque lock."
    };
  }
  return null;
}

function formatText(p) {
  return p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
---
<Layout page="guides" article={meta}>
  <main id="main">
    <div class="wrap">
      <p class="breadcrumb"><a href="/guides/">Guides</a> / Reviewed article</p>
      <header class="page-intro">
        <p class="eyebrow">Source-based content / {article.review.reviewedAt}</p>
        <h1>{article.title}</h1>
        <p class="lead muted">{article.description}</p>
      </header>

      {/* 篇首 16:9 全景头图挂载 */}
      {imageFolder && (
        <div class="hero-figure-wrapper">
          <MediaFigure
            src={`/images/${imageFolder}/01-feature-hero-cover-16x9.png`}
            alt={`${article.title} - Overview Engineering Diagram`}
            label="01 / ENGINEERING SPECIFICATION"
            caption="Figure 1: volvet portable hydraulic pole lifter engineering selection guide. Verified 300kg proof load and 85kg split transport architecture eliminating 16-ton boom truck dependency."
            eager
            class="article-infographic"
          />
        </div>
      )}

      {/* 正文各小节图文精准挂载 */}
      <article class="policy-body snapshot-article">
        {article.sections.map(s => {
          const fig = getSectionFigure(s.heading, imageFolder);
          return (
            <section>
              <h2>{s.heading}</h2>
              {fig && (
                <MediaFigure
                  src={fig.src}
                  alt={fig.alt}
                  label={fig.label}
                  caption={fig.caption}
                  class="article-infographic"
                />
              )}
              {s.paragraphs.map(p => (
                <p set:html={formatText(p)}></p>
              ))}
            </section>
          );
        })}
        <p class="note">Reviewed by: {article.review.reviewer}. Fact register references: {article.evidenceRefs.join(", ")}. Baseline: {article.review.baselineVersion}.</p>
        <div class="related-links">{article.relatedPaths.map(path=><a href={path}>{path} ↗</a>)}</div>
      </article>
    </div>
  </main>
</Layout>

<style>
  .hero-figure-wrapper { margin: 28px 0 48px; max-width: 960px; }
  .article-infographic { margin: 28px 0 36px; }
  .article-infographic :global(.media-figure-image) {
    aspect-ratio: 16 / 9;
    background: #171d18;
    border: 1px solid var(--line);
  }
  .article-infographic :global(.media-figure-image img) { object-fit: contain; }
  .snapshot-article section { margin-bottom: 48px; }
  .snapshot-article h2 { font-size: 28px; line-height: 1.25; margin-bottom: 20px; }
</style>
```

### 3. 全量自动化校验与回归门禁
修改或同步配图后，必须运行全量回归命令验证构建一致性：
```bash
npm test
```
必须确保：
1. `npm run build` 成功且无任何 `deck.html` 泄露至 `dist/`；
2. `verify-wordpress-retirement.mjs` 全部 636 项检查通过；
3. `decision:test` 与不可变快照哈希校验 100% 通过。

---

## 七、 自动化工具与矩阵流水线命令

```bash
# 1. 单主题全语种矩阵生成流水线（一键执行配图、回写、校验与入库）
npm run matrix:generate -- --topic portable-light-pole-lifter-explainer

# 2. 单篇 Markdown 文章一键渲染配图并自动挂载至正文
npm run visuals:generate -- --article geo-drafts/articles/portable-light-pole-lifter-explainer-en.md --insert-markdown

# 3. 全量草稿自动批量渲染与回写
npm run visuals:all

# 4. 一键同步草稿文章至 GEOFlow 数据库后台
npm run geoflow:sync -- --all

# 5. 复核文章合规防线门禁
node geoflow-b2b-seo-blog-pipeline/scripts/verify_compliance_guardrails.mjs \
  geo-drafts/articles/portable-light-pole-lifter-explainer-en.md
```
