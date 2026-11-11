# SEO 优化行动方案与优先级路线图 (Action Plan)

**审计目标**：`https://www.velolev.org`  
**站点业务**：B2B 便携式液压路灯立杆机制造与出口外贸站 (Portable Hydraulic Light Pole Lifter)  
**审计日期**：2026-11-11  
**全站 SEO 综合健康得分**：**84 / 100 (B+)**

---

## 阶段一：Phase 1 紧急修复与路由基建 (第 1 周 / P0)

| 编号 | 任务分类 | 问题描述与实据 | 预期收益 | 负责人员 | 修复指引与代码建议 |
|------|----------|----------------|----------|----------|-------------------|
| **P0-1** | 技术 SEO | `https://www.velolev.org/sitemap.xml` 直接返回 HTTP 404；全站仅有 `/sitemap-index.xml`，且未配置别名重定向 | 修复标准搜索引擎（Google、Bing、Baidu）与第三方审计工具的默认地图嗅探失败 | 后端/运维 | 在 `vercel.json` 根级增加 `redirects`：<br>`{"source": "/sitemap.xml", "destination": "/sitemap-index.xml", "permanent": true}` |
| **P0-2** | 技术 SEO | 历史旧路径 `/equipment/` 与 `/pricing-plan/` 返回 HTTP 200 + Meta-Refresh 软跳转，而非服务端 HTTP 308 | 消除爬虫软跳转惩罚，直接且即时传递历史页面权重，释放抓取配额 | 前端/运维 | 在 `vercel.json` 中配置服务端 308 重定向：<br>`{"source": "/equipment/", "destination": "/products/light-pole-jack/", "permanent": true}`,<br>`{"source": "/pricing-plan/", "destination": "/quote/", "permanent": true}` |
| **P0-3** | 技术 SEO | 裸域 HTTP 双跳链路：`http://velolev.org` -> 308 -> `https://velolev.org/` -> 308 -> `https://www.velolev.org/` | 消除双重 308 跳转链，降低 200ms+ 首包延迟，避免外链权重稀释 | 运维/域名 | 在 Vercel 域名路由或边缘代理中优化裸域规则，强制 `http://velolev.org` 单跳直达目标地址 `https://www.velolev.org/` |
| **P0-4** | E-E-A-T / GEO | 品牌实体与域名割裂：全站 Title、Logo、正文、Schema 均为 `volvet`，但域名为 `velolev.org`，全站无任何实体关联解释 | 建立 Google Knowledge Graph 对品牌词 `volvet` 的权威归属，降低 AI 搜索幻觉 | 运营/产品 | 在 `/about-us/` 中明确阐述：`volvet` 是依托 `velolev.org` 运营的便携路灯立杆机官方设备品牌；并在 `Organization` Schema 增加 `alternateName: ["velolev", "volvet equipment"]` |
| **P0-5** | 安全标头 | 缺少 `Content-Security-Policy` (CSP) 响应头 | 提升 HTTP 安全等级并消除安全审计 Low 级别告警 | 运维 | 在 `vercel.json` 的 `headers` 中为 `/(.*)` 增加 `Content-Security-Policy` 策略配置 |

---

## 阶段二：Phase 2 高收益性能与元数据优化 (第 2-3 周 / P1)

| 编号 | 任务分类 | 问题描述与实据 | 预期收益 | 负责人员 | 修复指引与代码建议 |
|------|----------|----------------|----------|----------|-------------------|
| **P1-1** | 核心性能 | 首页案例区 3 张缩略图为未压缩的原始 JPEG，单图高达 896.6 KB，3 张图总计 **2.55 MB**！ | 首页图片负载暴降 **94% (~2.4 MB)**，大幅提升移动端 LCP 与加载速度 | 前端/设计 | 将 `/images/evidence/jobsite-*.jpg` 等图片以 680x380 规格批量转换为 WebP/AVIF 格式（质量 80%），单张体积控制在 35-50 KB 之间 |
| **P1-2** | 核心性能 | 首屏 Hero 透明底设备图为 195.7 KB 原生 PNG (`portable-pole-lifter-hero-cutout.png`) | 进一步减少首屏 LCP 渲染关键路径阻塞资源体积 | 前端 | 将 Hero 图转换为带 Alpha 透明通道的 WebP 格式，文件大小预期缩减至 45 KB 以内 |
| **P1-3** | 站内 SEO | 全站 37 个页面标题超过 65 字符 (最长达 82 字符，如 `M16–M22 4-Bolt...`) | 防止在 Google 移动与桌面端 SERP 中被生硬截断，提升展示 CTR | SEO/内容 | 精简长标题至 55-60 字符，核心高价值搜索词前置（例：`M16–M22 Pole Lifter Configuration (180–260mm) \| volvet`） |
| **P1-4** | 站内 SEO | 全站 47 个页面元描述超过 160 字符 (最长达 225 字符，如 `/es/equipment/`) | 解决搜索结果元描述句末被 `...` 截断问题，确保 B2B 行动号召完整展示 | SEO/内容 | 压缩元描述至 140-155 字符，明确标注文档核心参数（12m / 300kg / 24V）与询价引导 |
| **P1-5** | 页面排版 | 首页及多个工具页 H1 存在英文句号后缺失空格排版错误（`lifting.Made`、`scenario.Keep`） | 消除专业度硬伤，提升分词可读性与美感 | 前端/文案 | 修复模版文案：`Light pole lifting. Made portable.`、`Calculate a scenario. Keep the assumptions.` |

---

## 阶段三：Phase 3 结构化数据丰富与多语言扩展 (第 2 个月 / P2)

| 编号 | 任务分类 | 问题描述与实据 | 预期收益 | 负责人员 | 修复指引与代码建议 |
|------|----------|----------------|----------|----------|-------------------|
| **P2-1** | 结构化数据 | Product Schema 缺少 `offers` 属性与产品唯一标识符 (`sku`/`mpn`) | 消除 Google Search Console 针对电商与产品富媒体结果的 Warning | 开发 | 在 Product Schema 中增补 `offers: {"@type": "Offer", "availability": "https://schema.org/InStock", "priceSpecification": {"@type": "PriceSpecification", "description": "Custom B2B quotation upon review"}}` 并配置 `mpn: "VOLV-12M-300KG"` |
| **P2-2** | 结构化数据 | Organization Schema 缺少 `sameAs` 权威社交/注册外链与物理地址 | 强化实体权威性与 Google 知识图谱对实体物理真实性的认定 | 运营/开发 | 在 Organization Schema 注入官方 LinkedIn 主页、Twitter、工商企业编号及 `address: {"@type": "PostalAddress", ...}` |
| **P2-3** | 国际化架构 | 多语言核心路径分歧：英文使用 `/products/light-pole-jack/`，其他语种仍沿用 `/{lang}/equipment/`；询价页英文 `/quote/` vs 其他 `/{lang}/pricing-plan/` | 规范全站 URL 路由架构，降低维护复杂度与多语言对齐风险 | 架构/开发 | 统一语言路径规范，使所有语言的 slug 保持一致（或通过统一定义的映射表实现平滑重定向） |
| **P2-4** | 内容建设 | 17 篇技术指南与配置文章仅有英文版，小语种各仅有 18 页 | 覆盖西班牙语、法语、葡萄牙语等拉美及非洲庞大的市政照明基建采购搜索市场 | 本地化/翻译 | 优先本地化 5 个核心配置页 (`/configurations/*`) 与吊车对比指南至 6 个非英语种 |
| **P2-5** | 国际化 | 泰语 (`/th/`) 部分页面词数提取不足 250 词，存在潜在薄内容 (Thin Content) 风险 | 提高泰语页面在东南亚目标市场的收录率与排名稳定性 | 本地化团队 | 优化泰语分词断句与文案丰富度，补充详细的当地工况与应用背景说明 |

---

## 阶段四：Phase 4 持续监测与 AI 搜索能力演进 (持续推进 / P3)

| 编号 | 任务分类 | 问题描述与实据 | 预期收益 | 负责人员 | 修复指引与代码建议 |
|------|----------|----------------|----------|----------|-------------------|
| **P3-1** | 监测体系 | 缺少 Google Search Console 与 GA4 真实字段指标监控联动 | 获取真实用户端 Core Web Vitals (CrUX) 数据与高价值搜索词转化漏斗 | 增长/数据 | 配置 GSC 属性并关联 GA4，设立每周排名与收录看板 |
| **P3-2** | AI / GEO | `llms.txt` 的 H2 章节内包含非链接规格条目，产生 11 个 `item-without-link` 解析提示 | 严格遵从 llmstxt.org v2 标准协议规范，保障各类自主 AI Agent 的精准引用 | 技术写作 | 重构 `llms.txt`：将核心物理事实置于首个 H2 之前的引言摘要，H2 章节纯粹用于罗列各公开文档的 `[文档名](URL)` 链接列表 |
| **P3-3** | 动态 Sitemap | Sitemap 的 `lastmod` 字段全站统一硬编码为 `2026-10-28` 静态时间戳 | 协助搜索引擎爬虫快速识别增量更新内容，提升重爬抓取效率 | 前端/构建 | 在 `astro.config.mjs` 的 sitemap 插件 `serialize()` 中读取 Markdown 文件的 Git commit 或文件时间动态输出 `lastmod` |
