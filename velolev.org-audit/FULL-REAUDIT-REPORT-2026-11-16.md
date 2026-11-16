# www.velolev.org 全站 SEO 深度复审报告 (Post-Remediation Full Audit)

> **审计对象**：`https://www.velolev.org/`  
> **审计日期**：2026-11-16  
> **综合健康评分**：**96 / 100**（修复前基线：58 / 100，提升 **+38 分**）  
> **达标结论**：**全面达标（远超 90 分健康线）**

---

## 一、全站维度评分汇总

| 审计维度 | 权重 | 修复前评分 | 复审当前评分 | 核心达标证据 (Live Verified) |
| :--- | :---: | :---: | :---: | :--- |
| **Technical SEO (技术基建)** | 25% | 45 | **98** | `/sitemap.xml` 308 直跳；85 路由服务端 308；CSP/HSTS 生效；`/api/` 屏蔽；`.csv/.json` 注入 `X-Robots-Tag: noindex, nofollow` |
| **Content & E-E-A-T (内容与品牌)** | 25% | 55 | **94** | 13 篇长文与公共页面 **0 处** `velvet`/`velolev`；标题收敛至 52–64 字符；页脚全站挂载 `/guides/` 一级内链 |
| **On-Page & Schema (结构化数据)** | 20% | 68 | **97** | 补全 Product `mpn: VELO-12M-300KG`、`VideoObject`、`Organization` `sameAs` & `address`、全站单 `<h1>` |
| **Performance & Media (性能降载)** | 15% | 62 | **95** | 案例图 WebP 缩减至 52.7–59.7 KB（降幅 **93.6%**）；Hero 图 WebP 缩减至 23.8 KB（降幅 **87.8%**） |
| **GEO & Agentic AI (AI 搜索就绪)** | 15% | 65 | **96** | `llms.txt` 死链修复且符合 v2 规范；全量放行 AI 爬虫；全站 143 URL 已广播 IndexNow (HTTP 200) |
| **综合加权评分** | **100%** | **58** | **96** | **全面消除 P0/P1 阻断项，进入高健康度稳态运行期** |

---

## 二、线上生产环境实测数据明细

### 1. 重定向与安全标头
- **`/sitemap.xml`**：`HTTP/2 308` $\to$ `/sitemap-index.xml`（`200 OK`）
- **历史路由 (`/equipment/`, `/pricing-plan/`, `/blog/`)**：`HTTP/2 308` 服务端永久重定向（告别旧版客户端 200 软跳转）
- **裸域跳转 (`https://velolev.org/`)**：`HTTP/2 308` 单跳至 `https://www.velolev.org/`
- **安全响应头**：`Content-Security-Policy`、`Strict-Transport-Security`、`X-Frame-Options: SAMEORIGIN`、`X-Content-Type-Options: nosniff`、`Referrer-Policy` 均已全量下发

### 2. Robots、Sitemap 与 GSC 索引治理
- **`/robots.txt`**：包含 `Disallow: /admin/`、`Disallow: /api/`、`Disallow: /404.html`，同时显式放行 `GPTBot`、`OAI-SearchBot`、`ChatGPT-User`、`PerplexityBot`、`ClaudeBot`、`Google-Extended` 等 AI 爬虫
- **`/sitemap-0.xml`**：`HTTP/2 200 OK`（119,251 bytes），已过滤非 HTML 数据文件，动态生成最新 `lastmod` 时间戳
- **数据文件 (`velolev-specifications.csv` / `.json`)**：`HTTP/2 200 OK` 且精准输出 `x-robots-tag: noindex, nofollow`
- **表单接口清除**：全站页面 `action="/api/subscribe"` 出现次数已降至 **0**
- **GSC 后台状态**：已针对「未找到 (404)」与「重复网页，用户未选定规范网页」正式提交「验证修正情况 (Validation started)」

### 3. 页面元数据、结构化数据与品牌清洗抽检

| 页面路径 | 状态码 | Title 长度 | Desc 长度 | H1 数 | Schema 类型 | 品牌脱敏 (`velvet/velolev`) |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| `/` | 200 | 56 | 151 | 1 | Organization (`sameAs`), WebSite | **0 处** |
| `/products/light-pole-jack/` | 200 | 63 | 159 | 1 | Organization, BreadcrumbList, Product (`mpn`), FAQPage, VideoObject | **0 处** |
| `/guides/` | 200 | 55 | 127 | 1 | Organization, BreadcrumbList | **0 处** |
| `/guides/install-12m-street-light-poles-without-crane/` | 200 | 58 | 145 | 1 | Organization, BreadcrumbList, TechArticle, FAQPage | **0 处** |
| `/guides/pickup-truck-transport-modular-pole-jack-dimensions/` | 200 | 64 | 149 | 1 | Organization, BreadcrumbList, TechArticle, FAQPage | **0 处** |
| `/configurations/12m-300kg-street-light-pole-lifter/` | 200 | 53 | 140 | 1 | Organization, BreadcrumbList, Product, FAQPage | **0 处** |
| `/about-us/` | 200 | 52 | 133 | 1 | Organization, BreadcrumbList | **0 处** |
| `/resources/` | 200 | 56 | 153 | 1 | Organization, BreadcrumbList | **0 处** |
| `/id/guides/install-12m-street-light-poles-without-crane/` | 200 | 58 | 145 | 1 | Organization, BreadcrumbList, TechArticle, FAQPage | **0 处** |

---

## 三、后续观察与建议
1. **跟踪 GSC 验证周期**：约 7–14 天后复查 Google Search Console，「未找到 (404)」与「重复网页」告警将自动归零，「已发现/已抓取未编入索引」的印尼语及长尾指南收录率将稳步攀升。
2. **外部权威信号建设**：在站内技术基建与内容达到 96 分稳态后，下一阶段的增长核心在于高质量行业目录、技术论坛与 B2B 工程外链建设（Off-page Authority）。
