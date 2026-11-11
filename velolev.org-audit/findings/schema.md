# 结构化数据与 Schema 专项审计 (Schema Findings)

## 1. 现状概况
- **覆盖率**：全站 143 个页面 100% 部署 JSON-LD，无语法错误。
- **类型部署**：
  - `Organization` (全站通用)
  - `WebSite` (首页)
  - `BreadcrumbList` (内页三级面包屑)
  - `Product` (设备详情与配置页)
  - `TechArticle` (指南与技术说明)
  - `FAQPage` (FAQ 模块)

## 2. 改进缺漏
1. **Product Schema 缺失 `offers` 属性**：
   - 缺少 `offers` 会在 Google Search Console 中触发富媒体警告；
   - 建议补充 `offers: {"@type": "Offer", "availability": "https://schema.org/InStock", "priceSpecification": {"@type": "PriceSpecification", "description": "Commercial terms provided upon project review"}}`；
   - 补充 `mpn` (如 `VOLV-12M-300KG`) 与 `sku`。
2. **Organization Schema 缺失实体链接与地址**：
   - 补充 `sameAs`（LinkedIn、官方视频频道、行业协会链接）；
   - 补充 `address` (PostalAddress 物理公司实体地址)。
3. **TechArticle 缺少显式 `author` 实体**：
   - 建议挂载 `author: {"@type": "Organization", "name": "volvet Technical Engineering Team"}`。
