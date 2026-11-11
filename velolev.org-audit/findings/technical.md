# 技术 SEO 专项审计 (Technical SEO Findings)

## 1. 基础设施与传输安全
- **托管平台**：Vercel Global Edge Network
- **协议与证书**：TLS 1.3，Let's Encrypt 证书有效（CN: `www.velolev.org`），剩余有效期 88 天。
- **HSTS 标头**：`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`（满足 Chrome HSTS 预加载清单全部标准）。
- **安全响应头**：
  - `X-Content-Type-Options: nosniff` (正常)
  - `X-Frame-Options: SAMEORIGIN` (正常)
  - `Referrer-Policy: strict-origin-when-cross-origin` (正常)
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (正常)
  - `Content-Security-Policy`: 缺失 (Low 严重度)

## 2. 规范化与跳转排查 (Redirect Chains)
- **正常单跳**：
  - `http://www.velolev.org/` -> 308 -> `https://www.velolev.org/` (1跳)
  - `https://velolev.org/` -> 308 -> `https://www.velolev.org/` (1跳)
- **缺陷 1：裸域 HTTP 双跳**：
  - `http://velolev.org/` -> 308 -> `https://velolev.org/` -> 308 -> `https://www.velolev.org/` (2跳，High 严重度)
- **缺陷 2：客户端 Meta Refresh 软重定向**：
  - `/equipment/` 与 `/pricing-plan/` 返回 HTTP 200，内含 `<meta http-equiv="refresh">` 与 `<meta name="robots" content="noindex">`。
  - 应在 `vercel.json` 改写为服务器端 HTTP 308 状态码。

## 3. 爬虫协议与地图 (Robots & Sitemaps)
- **Robots.txt**：
  - 合规，放行所有通用爬虫与主流 AI 爬虫。
  - 声明指向 `https://www.velolev.org/sitemap-index.xml`。
- **缺陷 3：标准 `/sitemap.xml` 返回 404**：
  - 许多搜索引擎默认探查 `/sitemap.xml`，直接报错 404，需在 `vercel.json` 配置 308 跳转至 `/sitemap-index.xml`。
- **Sitemap 覆盖率**：
  - `sitemap-0.xml` 包含 143 个 URL，实测 100% 均为 HTTP 200。
  - `<lastmod>` 统一固定为 `2026-10-28` 静态时间戳，建议接入文件时间戳动态输出。
