# PoleLift 全站页面 GEO 技术审计报告

**技能版本**：yao-geo-page-audit v1.0  
**诊断日期**：2026-07-10  
**诊断范围**：全站 19 个 HTML 页面（首页、8 个一级页、6 篇博客、2 个重定向页、404、管理后台）  
**报告语言**：中文简体  
**证据来源**：页面 HTML 源码、HTTP Header 等价分析、DOM 结构、CSS/JS 静态资源清单

---

## 执行摘要

PoleLift 官网为 **Elementor + Template Kit Export 插件导出的 WordPress 静态站点**，全站共 19 个 HTML 页面。本次技术审计从 **五段链路**（发现→检索候选→主内容抽取→证据质量→生成引用）对每页执行 16 项技术指标检查。

### 核心发现

| # | 关键发现 | 严重程度 | 影响范围 |
|---|---------|---------|---------|
| 1 | **全站无 Schema JSON-LD** | P0 | 19/19 页 |
| 2 | **14 个表单 `action` 属性缺失** | P0 | 14 个表单 |
| 3 | **首页 title 仅 "PoleLift"** 与全站格式不统一 | P1 | 1/19 页 |
| 4 | **6 篇博客 meta description 使用模板** `"Read PoleLift information about {title}."` | P1 | 6/19 页 |
| 5 | **sitemap.xml 缺失** | P1 | 全局 |
| 6 | **32 张图片 alt 为空**（全站 23% 缺陷率） | P1 | 7/19 页 |
| 7 | **17 个页面对 `<main>` 语义标签缺失** | P2 | 17/19 页 |
| 8 | **CSS/JS 冗余**：每页加载 23-31 个 CSS + 23-28 个 JS | P2 | 15/19 页 |
| 9 | **全部页面 `<noscript>` 缺失** | P3 | 19/19 页 |
| 10 | **无可见更新时间标注** | P1 | 15/19 页 |

### P0 优先动作

1. 为 FAQ 页添加 JSON-LD `FAQPage` Schema
2. 为首页/产品页添加 `Organization` + `Product` Schema
3. 修复全部 14 个 Elementor 表单的 `action` 属性
4. 博客页添加 `Article` Schema

---

## 1. 输入与范围

| 维度 | 内容 |
|------|------|
| 品牌名 | PoleLift |
| 目标网站 | 本地静态站点 (`dist/` 目录) |
| 页面总数 | 19 个 HTML 文件 |
| 首页 | `/index.html` |
| 代表性一级页 | `/equipment/`（产品页）、`/faq/`（FAQ 页）、`/pricing-plan/`（价格页）、`/project/`（应用页）、`/about-us/`、`/team/`、`/contact-us/`、`/blog/` |
| 代表性二级页 | 6 篇博客文章 |
| 重定向/特殊页 | `/en/`, `/equipment-detail/`, `/404.html`, `/admin/content/` |
| 技术栈 | Astro 构建 + Elementor HTML 碎片、WordPress 静态导出 |

### 页面组合选择依据

本次审计覆盖全站 **全部 19 个页面**，以确保技术层面的完整性诊断。特殊性在于站点是 **Elementor 静态导出**，所有内容页面共享相同的模板结构和资源加载模式。

---

## 2. 五段链路诊断模型

本次审计按照 `yao-geo-page-audit` 的核心模型，将页面 GEO 表现拆成五段链路：

| 阶段 | 含义 | 本次审计对应检查项 |
|------|------|------------------|
| 1. 发现入口 | 页面是否可通过链接、sitemap、搜索引擎被发现 | robots.txt、sitemap、内链结构、canonical |
| 2. 检索候选 | 页面是否具备成为搜索/AI 检索候选的技术条件 | meta robots、状态码、JS 渲染、初始 HTML |
| 3. 主内容抽取 | 系统能否从 HTML 抽取正文而非导航/页脚/空容器 | `<main>`, `<article>`, 标题层级、表格 |
| 4. 证据质量 | 被抽取片段是否相关、准确、可追责 | meta description、alt、更新时间、作者标注 |
| 5. 生成引用 | 生成式引擎能否把内容用于回答/引用/推荐 | Schema、事实原子性、chunk 引用准备度 |

---

## 3. 权威证据台账

| 结论 | 来源层级 | 页面或材料 | 影响 | 可信度 |
|------|---------|-----------|------|--------|
| 站点为 Elementor 静态导出 | 观察 | 15 页 body class 含 `elementor-kit-10`、`wp-theme-hello-elementor` | 低代码复用但有冗余资源 | 高 |
| 全站无 Schema JSON-LD | 观察 | 全部 19 页源码审计 | 无富媒体搜索结果、降低 AI 可引用性 | 高 |
| FAQ 页缺少 FAQPage Schema | 观察+标准 | `/faq/` 源码 + Schema.org 规范 | 错失 FAQ 富媒体搜索 | 高 |
| 博客描述为模板格式 | 观察 | 6 篇博客 meta description | 搜索引擎可能判定低质量/重复 | 高 |
| sitemap.xml 缺失 | 观察+标准 | dist/ 无 sitemap 文件 + Google Search Central | 影响爬虫发现效率 | 高 |
| robots.txt 无 Sitemap 引用 | 观察+标准 | robots.txt 内容 | 爬虫需自行推测 sitemap 位置 | 中 |
| 表单 action 缺失 | 观察 | 全部 14 个 `<form action="">` 为空 | 表单无法正常工作 | 高 |
| 32 张图片 alt 为空 | 观察+标准 | 全站 `<img>` 扫描 + W3C WCAG | 无障碍违规、降低图片搜索 | 高 |
| 每页 50+ CSS/JS 文件 | 观察 | 资源加载计数 | 影响加载性能 | 中 |
| `<noscript>` 全站缺失 | 观察 | 全部 19 页 | JS 禁用时无降级 | 低 |
| 仅有 `/equipment/` 和 `/admin/content/` 有 `<main>` 标签 | 观察 | 逐页 HTML 扫描 | 语义结构不完整 | 中 |
| 更新时间不可见 | 观察 | 仅博客页含 `datePublished`；产品/FAQ 无 | 缺乏内容新鲜度信号 | 中 |

---

## 4. 抓取与渲染诊断

### 4.1 robots.txt

- **内容**：`User-agent: *` / `Allow: /`
- **评估**：过于简单。未引用 Sitemap、未定义 Crawl-delay、未屏蔽低价值路径。

### 4.2 sitemap.xml

- **状态**：❌ **不存在**
- **影响**：搜索引擎需要依靠内链和外部链接发现页面，影响抓取覆盖率和速度。

### 4.3 状态码与重定向

| 路径 | 状态码等效 | 重定向方式 |
|------|-----------|-----------|
| 全部普通页面 | 200 | 直接 HTML |
| `/en/` | 200 + meta refresh | `<meta http-equiv="refresh" content="2;url=/" />` (2 秒延迟) |
| `/equipment-detail/` | 200 + meta refresh | `<meta http-equiv="refresh" content="0;url=/equipment/" />` |
| `/404.html` | 200 (应为 404) | 无 HTTP 404 状态码 |

**⚠️ 重要**：`/404.html` 返回 HTTP 200。搜索引擎可能将其视为正常页面而非 404。`/en/` 使用 2 秒延迟重定向，用户体验不佳且搜索引擎处理方式不明。

### 4.4 Canonical URL

全部 17 条路由均正确设置了 `<link rel="canonical">`，指向对应的目录路径（含尾部斜杠）。管理后台页面缺少 canonical。

### 4.5 JS 渲染依赖

**全站为静态导出**，主内容在初始 HTML 中可见。但每页依赖 23-28 个 JS 文件用于 Elementor 交互动效、表单验证、导航响应等。JS 禁用时：导航可能不工作、表单验证无效、动效消失。无 `<noscript>` 降级提示。

### 4.6 移动端

- 所有页面包含 `<meta name="viewport" content="width=device-width, initial-scale=1"` ✅
- 使用 Elementor 响应式断点 (768px / 1024px / 桌面)
- 无法从静态文件判断实际移动渲染表现

---

## 5. 结构规范性诊断

### 5.1 标题层级

| 页面 | H1 | H2 | H3 | 是否层级正确 |
|------|----|----|-----|------------|
| 首页 | 1 | 7 | 1 | ⚠️ H2 过多，部分层次不清 |
| 关于我们 | 1 | 3 | 1 | ✅ |
| 博客列表 | 1 | 8 | 0 | ⚠️ 缺少 H3 |
| 联系我们 | 1 | 3 | 1 | ✅ |
| 产品页 | 1 | 8 | 14 | ⚠️ H3 过多 |
| FAQ | 1 | 3 | 1 | ✅ |
| 价格页 | 1 | 3 | 1 | ✅ |
| 应用页 | 1 | 3 | 1 | ✅ |
| 团队页 | 1 | 3 | 1 | ✅ |
| 404 | 1 | 1 | 0 | ✅ |
| 博客文章 (×6) | 1 | 1 | 1 | ⚠️ 层级过浅 |

### 5.2 语义标签

| 标签 | 存在页面数 / 总数 | 缺失率 |
|------|------------------|--------|
| `<main>` | 2/19 | **89%** |
| `<article>` | 3/19 | **84%** |
| `<nav>` | 17/19 | 11% |
| `<header>` | 0/19 | **100%** |
| `<footer>` | 0/19 | **100%** |
| `<section>` | 0/19 | **100%** |

**严重问题**：全站 16 个内容页无 `<main>` 标签，无 `<header>`/`<footer>` 语义容器。Elementor 使用 `<div data-elementor-type="header">` 等自定义属性代替了标准 HTML5 语义标签。

### 5.3 表格使用

仅 `/equipment/` 页面使用了 3 个 `<table>`（规格表、电气参数表、法兰标准表）。其他页面均未使用表格来呈现可结构化抽取的数据。

### 5.4 面包屑导航

**全站无面包屑**。无 `<nav aria-label="breadcrumb">`，无 BreadcrumbList Schema。

### 5.5 内链与锚文本

- 全站内链充足（每页 56-84 个 `<a>`）
- 锚文本使用 Elementor widget 渲染，文本可见性良好
- 无 broken link（本地文件可确认）
- 外部链接集中在 about-us 和 team 页（27 个 `target="_blank"`）

---

## 6. 内容证据诊断

### 6.1 Meta Description 质量

| 页面 | 长度 | 质量评价 |
|------|------|---------|
| 首页 | 269 字符 | ✅ 良好，关键词覆盖全 |
| 关于/产品/FAQ/价格/应用/联系/团队 | 100-170 字符 | ✅ 适当 |
| 博客列表 | 169 字符 | ✅ 适当 |
| 6 篇博客 | 模板化 | ❌ 全部使用 `"Read PoleLift information about {title}."` |
| 管理后台 | 缺失 | ❌ |
| 重定向页 | 缺失 | ✅（重定向页不需要） |

### 6.2 更新时间标注

- **仅博客文章**包含 `itemprop="datePublished"` 内联日期元素
- 产品页、FAQ 页、价格页、关于页 **均无可见的更新时间**
- **影响**：搜索引擎和 AI 系统无法判断内容新鲜度

### 6.3 作者/来源标注

- 无作者 `<meta name="author">` 标签
- 博客文章作者信息存在于 HTML 中但嵌入 Elementor 容器内
- 产品/FAQ 页无责任归属标注

### 6.4 实体与来源完整性

- 品牌实体：`PoleLift` 贯穿全站 ✅
- 公司主体全称：**未在任何 meta/页面中体现** ❌
- sameAs 链接（社媒）：**无** ❌
- 价格标注：`/pricing-plan/` 有 `$1,500/Unit` ✅
- 服务边界：FAQ 页覆盖了产品参数边界 ✅

---

## 7. AI 可抽取性诊断

### 7.1 关键发现

| 维度 | 评估 |
|------|------|
| 原子事实 | FAQ 页 10 条 Q&A 可抽取 ✅ |
| 键值对 | 无规格表 Schema，无键值对标记 ❌ |
| 对比表 | `/equipment/` 页有参数表，但无对比维度 |
| 步骤/HowTo | 无 HowTo Schema，无操作步骤结构化 |
| 段落独立性 | Elementor 容器嵌套深，段落独立性差 |
| 上下文无关摘要 | 无 `abstract` 或摘要 Schema |
| Chunk 引用准备度 | 低——FAQ Q&A 可被 chunk，其余内容嵌入复杂容器 |

### 7.2 公开答案素材覆盖

| 用户意图 | 代表问题 | 官网素材状态 |
|---------|---------|-------------|
| 产品参数 | "PoleLift 能举多重的杆" | ✅ FAQ 页有明确答案 |
| 价格 | "PoleLift 多少钱" | ✅ 价格页 $1,500/Unit |
| 兼容性 | "支持哪些螺栓" | ✅ FAQ 有 M16-M24 清单 |
| 认证 | "PoleLift 有 CE 吗" | ⚠️ 关于页声明，无证书文件 |
| 安装教程 | "怎么安装 PoleLift" | ❌ 无 HowTo 页面 |
| 对比 | "PoleLift vs 起重机" | ⚠️ 仅 1 篇博文 |
| 运输 | "能运到我的国家吗" | ⚠️ 价格页 FAQ 提及但无详细运费 |

---

## 8. Schema 一致性诊断

### 8.1 全站 Schema 覆盖率：0%

| Schema 类型 | 推荐页面 | 状态 |
|------------|---------|------|
| Organization | 首页、关于页 | ❌ 缺失 |
| Product | `/equipment/` | ❌ 缺失 |
| FAQPage | `/faq/` | ❌ 缺失 |
| BreadcrumbList | 全部内容页 | ❌ 缺失 |
| Article / BlogPosting | 6 篇博客 | ❌ 缺失 |
| WebPage | 全部页面 | ❌ 缺失 |

### 8.2 Schema 建议示例

**Organization (首页):**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PoleLift",
  "url": "https://polelift.com",
  "logo": "https://polelift.com/logo.png",
  "description": "PoleLift provides portable pole lifting equipment for faster, safer installation of street lights, 5G monopoles, CCTV poles, solar trackers, and power distribution poles.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Shanghai",
    "addressCountry": "CN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "sales@polelift.com",
    "contactType": "sales"
  }
}
```

**FAQPage (/faq/):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the PoleLift and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The PoleLift is a portable, modular pole lifting system weighing just 85kg..."
      }
    }
  ]
}
```

**Product (/equipment/):**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PoleLift Portable Pole Lifter",
  "description": "Portable pole lifting equipment for street lights, 5G monopoles, CCTV, solar trackers, and power distribution poles.",
  "offers": {
    "@type": "Offer",
    "price": "1500.00",
    "priceCurrency": "USD"
  }
}
```

---

## 9. 移动端与性能诊断

### 9.1 静态资源加载量

| 指标 | 平均值 |
|------|--------|
| CSS 文件 | 23-31 个/页 |
| JS 文件 | 23-28 个/页 |
| 最大页面 | 首页 168KB |
| 最小页面 | 管理后台 2.7KB |

**问题**：每页加载 Wordpress/Elementor/ElementsKit 全套 CSS/JS，即使页面不需要某些组件（如 Swiper 轮播、视频播放器、评分组件）。

### 9.2 移动端适配

- ✅ `<meta name="viewport">` 存在
- ✅ Elementor 响应式容器 (e-con, e-flex)
- ⚠️ 无法从静态文件判断实际 CLS、LCP 和移动端渲染效果

---

## 10. 代码层修复清单

### P0 — 立即修复

| # | 问题 | 证据 | 影响 | 修复动作 | 成本 |
|---|------|------|------|---------|------|
| P0-1 | 全站无 Schema | 19 页源码审计 | 无富媒体搜索、AI 可引用性低 | 首页添加 Organization；产品页添加 Product；FAQ 页添加 FAQPage；博客添加 Article；全局添加 BreadcrumbList + WebPage | S (1天) |
| P0-2 | 表单 action 缺失 | 14 个 `<form action="">` | 表单无法提交 | 将 action 指向表单处理端点或设为 `#` 并添加 JS 处理 | S (0.5天) |
| P0-3 | 首页 title 不完整 | `<title>PoleLift</title>` | 与全站 `- PoleLift` 格式不统一 | 改为 `PoleLift - Portable Pole Lifting Equipment for Street Lights & 5G` | S (0.1天) |
| P0-4 | `/404.html` 返回 200 | 文件存在但无 404 状态 | 被当正常页面索引 | 服务器层配置 404 状态码，或 Astro 中间件处理 | S (0.2天) |
| P0-5 | `/en/` 重定向 2 秒延迟 | meta refresh `content="2;url=/"` | 用户体验差 | 改为 0 秒立即重定向，或服务器层 301 | S (0.1天) |

### P1 — 短期修复

| # | 问题 | 证据 | 影响 | 修复动作 | 成本 |
|---|------|------|------|---------|------|
| P1-1 | 博客 meta 描述模板化 | 6 篇 `"Read PoleLift information about {title}."` | SEO 低质量信号 | 每篇写 120-160 字符原创描述 | S (0.5天) |
| P1-2 | sitemap.xml 缺失 | dist/ 无文件 | 搜索引擎发现缓慢 | 生成含全部 17 条路由的 sitemap | S (0.2天) |
| P1-3 | robots.txt 无 Sitemap 引用 | 文件内容审计 | 爬虫不主动发现 sitemap | 添加 `Sitemap: https://polelift.com/sitemap.xml` | S (0.05天) |
| P1-4 | 团队页 10 张图片 alt 为空 | `/team/` 83% alt 缺陷率 | 严重无障碍违规 | 每张团队照片添加描述性 alt | S (0.3天) |
| P1-5 | 首页/应用/价格页 alt 为空 | 共 17 张装饰图 alt="" | 无障碍+图片搜索 | 为信息性图片添加描述性 alt；纯装饰图用 `role="presentation"` | S (0.3天) |
| P1-6 | 无可见更新时间 | 15 页缺少时间标注 | 新鲜度信号缺失 | 产品/FAQ/关于页添加 `lastModified` 或可见日期 | S (0.3天) |
| P1-7 | 博客文章无 author meta | 6 篇博客 | 权威信号弱 | 添加 `<meta name="author">` | S (0.1天) |
| P1-8 | 博客 URL slug 与标题不一致 | slug 含 heavy-machinery 等无关词 | 语义 URL 信号不匹配 | 更新为与文章标题匹配的 slug | M (1天) |

### P2 — 中期改进

| # | 问题 | 证据 | 影响 | 修复动作 | 成本 |
|---|------|------|------|---------|------|
| P2-1 | `<main>` 标签缺失 | 17/19 页 | 语义结构不完整 | 为内容区包裹 `<main>` | M (2天) |
| P2-2 | 无面包屑导航 | 全站 | 内链结构+用户体验 | 添加面包屑 + BreadcrumbList Schema | M (2天) |
| P2-3 | CSS/JS 冗余 | 每页 50+ 文件 | 加载性能 | 按需加载，去除未使用的 widget CSS/JS | M (3天) |
| P2-4 | `<noscript>` 缺失 | 19/19 页 | JS 禁用无降级 | 添加基础 `<noscript>` 提示 | S (0.3天) |
| P2-5 | 无 RSS / JSON Feed | 无发现 | 内容分发渠道缺失 | 生成 RSS feed | S (0.5天) |
| P2-6 | `/project/` URL 与标题不匹配 | URL 是 project，标题是 Applications | 语义 URL 不一致 | 将 /project/ 重命名为 /applications/ 或更新标题 | S (0.3天) |

---

## 11. 逐页技术评分卡

| 页面 | title | meta desc | 标题层级 | 语义标签 | Schema | alt | canonical | 表单 | 评分 |
|------|-------|-----------|---------|---------|--------|-----|-----------|------|------|
| 首页 `/` | ⚠️ 太短 | ✅ | ⚠️ | ❌ | ❌ | ⚠️ 42% | ✅ | ❌ action | 3.5/10 |
| 关于我们 | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ 27% | ✅ | ❌ action | 4.5/10 |
| 博客列表 | ✅ | ✅ | ⚠️ 缺H3 | ❌ | ❌ | ✅ | ✅ | ❌ action | 5.0/10 |
| 联系我们 | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ action ×2 | 4.5/10 |
| 产品页 | ✅ | ✅ | ⚠️ H3过多 | ⚠️ 有main | ❌ | ✅ | ✅ | ❌ action | 5.5/10 |
| FAQ | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ 33% | ✅ | ❌ action | 4.5/10 |
| 价格页 | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ 67% | ✅ | ❌ action | 4.0/10 |
| 应用页 | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ 50% | ✅ | ❌ action | 4.0/10 |
| 团队页 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ 83% | ✅ | ❌ action | 3.0/10 |
| 404 | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ action | 5.5/10 |
| 博客文章×6 | ✅ | ❌ 模板 | ⚠️ 过浅 | ❌ | ❌ | ✅ | ✅ | ❌ action | 3.5/10 |
| 重定向页 | ✅ | N/A | N/A | N/A | ❌ | N/A | ✅ | N/A | 7.0/10 |

**全站加权平均：4.2/10**

---

## 12. Schema 类型推荐清单

| Schema 类型 | 推荐页面 | 优先級 | 示例代码 |
|------------|---------|--------|---------|
| Organization | 首页 | P0 | 见 §8.2 |
| Product | /equipment/ | P0 | 见 §8.2 |
| FAQPage | /faq/ | P0 | 见 §8.2 |
| BreadcrumbList | 全部内容页 | P0 | 每个页面模板 |
| Article | 6 篇博客 | P1 | 含 headline、datePublished、author |
| WebPage | 全部页面 | P1 | 含 name、description、isPartOf |
| Offer | /pricing-plan/ | P1 | 嵌入 Product Schema 或独立 |

---

## 13. 公开答案素材问题集

以下为应补全的高意图问题与对应素材位置建议：

| # | 问题 | 意图 | 推荐素材位置 | 当前覆盖 |
|---|------|------|-------------|---------|
| Q1 | What is a PoleLift | 认知 | 首页 H1 区域 + FAQ | ⚠️ 首页首屏 "Introducing PoleLift" |
| Q2 | How much does PoleLift cost | 价格 | /pricing-plan/ | ✅ $1,500/Unit |
| Q3 | What certifications does PoleLift have | 信任 | /about-us/ + 证书PDF | ⚠️ 声明有 CE/ISO 但无文件 |
| Q4 | How to install PoleLift | 教程 | /how-to-install/ (新建) | ❌ |
| Q5 | PoleLift vs crane comparison | 比较 | /compare/ (新建) | ⚠️ 1 篇博文 |
| Q6 | Does PoleLift ship to [country] | 物流 | /faq/ shipping section | ⚠️ FAQ 提及但无明细 |
| Q7 | PoleLift specifications | 参数 | /equipment/ | ⚠️ 有参数但无 Schema |
| Q8 | PoleLift maintenance tips | 维护 | 1 篇博文 | ⚠️ 博文存在但模板化描述 |
| Q9 | Who makes PoleLift | 实体 | /about-us/ + /team/ | ❌ 团队信息冲突 |
| Q10 | PoleLift customer reviews | 社会证明 | /case-studies/ (新建) | ❌ 证言为假 |

---

## 14. 风险、假设与待确认项

| # | 风险项 | 类型 | 说明 |
|---|--------|------|------|
| R1 | 表单无法工作 | 功能风险 | 14 个表单 action 缺失，联系表单和报价请求表单不可用 |
| R2 | 团队页无障碍违规 | 合规风险 | 83% 图片 alt 为空，违反 WCAG 2.2 标准 |
| R3 | 搜索引擎索引 404 为正常页面 | SEO 风险 | /404.html 返回 HTTP 200 |
| R4 | 博客描述被搜索引擎判定低质量 | SEO 风险 | 6 篇博客使用相同模板文本 |
| R5 | 静态资源冗余影响加载 | 性能风险 | 每页加载 Elementor 全套依赖 |
| R6 | `/en/` 2 秒重定向影响用户 | 用户体验 | 应使用 0 秒或 301 |
| H1 | 站点域名未确认 | 假设 | 诊断基于 polelift.com；实际域名待用户确认 |
| H2 | 服务器配置未知 | 假设 | 404 处理、301 重定向、Gzip 等依赖服务器层 |
| G1 | CSS/JS 按需加载能力 | 输入缺口 | 需检查 CMS/构建系统能力 |
| G2 | 实际页面加载性能 | 输入缺口 | 需用户提供 Lighthouse 或 Web Vitals 数据 |

---

## 15. 执行路线图

| 阶段 | 时长 | 任务 |
|------|------|------|
| **第 1 周** | P0 | Schema 部署 (Organization+Product+FAQPage+BreadcrumbList)；表单 action 修复；首页 title 修复；404 状态码；/en/ 重定向优化 |
| **第 2 周** | P1 | Sitemap 生成；博客描述去模板化；图片 alt 补全；更新时间标注；博客 author meta |
| **3-4 周** | P1 | 博客 URL slug 修正 |
| **2-3 月** | P2 | `<main>` 语义化；面包屑导航；CSS/JS 按需加载；RSS feed；URL 语义统一 |

---

## 附录

### 附录A：全站页面技术审计总表

| # | URL | title | meta desc | robots | canonical | H1/H2/H3 | 语义标签 | Schema | alt 缺陷 | 表单 action |
|---|-----|-------|-----------|--------|-----------|----------|---------|--------|---------|------------|
| 1 | / | ⚠️ | ✅ | ❌ | ✅ | 1/7/1 | ❌ main,article,header,footer | ❌ | 8/19 | ❌ |
| 2 | /about-us/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 4/15 | ❌ |
| 3 | /blog/ | ✅ | ✅ | ❌ | ✅ | 1/8/0 | ✅ article×6 | ❌ | 0/8 | ❌ |
| 4 | /contact-us/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 0/2 | ❌ ×2 |
| 5 | /equipment/ | ✅ | ✅ | ❌ | ✅ | 1/8/14 | ✅ main,article×15 | ❌ | 0/3 | ❌ |
| 6 | /faq/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 1/3 | ❌ |
| 7 | /pricing-plan/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 4/6 | ❌ |
| 8 | /project/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 5/10 | ❌ |
| 9 | /team/ | ✅ | ✅ | ❌ | ✅ | 1/3/1 | ❌ | ❌ | 10/12 | ❌ |
| 10 | /404.html | ✅ | ✅ | ✅ | ✅ | 1/1/0 | ❌ | ❌ | 0/2 | ❌ |
| 11-16 | /blog/* ×6 | ✅ | ❌ 模板 | ❌ | ✅ | 1/1/1 | ✅ article×6 | ❌ | 0/60 | ❌ ×6 |
| 17 | /en/ | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A |
| 18 | /equipment-detail/ | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A |
| 19 | /admin/content/ | ✅ | ❌ | ✅ | ❌ | 1/2/0 | ✅ main×1 | ❌ | N/A | N/A |

---

**报告生成时间**：2026-07-10  
**技能版本**：yao-geo-page-audit  
**数据有效期**：诊断日期起 3 个月内有效
