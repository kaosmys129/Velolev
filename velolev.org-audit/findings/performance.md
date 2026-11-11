# 性能与 Core Web Vitals 专项审计 (Performance Findings)

## 1. 架构优势
- **纯静态输出 (Astro SSG)**：无客户端重型 JS 框架（React/Vue）的水合运行负载，页面首屏极速加载。
- **外部 CSS 极轻**：仅 2 个文件，打包体积总计 31.5 KB。
- **字体与关键大图预加载**：
  - `<link rel="preload" href="/fonts/geologica-latin.woff2" as="font" type="font/woff2" crossorigin>` (24.6 KB)
  - `<link rel="preload" as="image" href="/images/product/portable-pole-lifter-hero-cutout.png" fetchpriority="high">`
- **边缘 TTFB < 150ms**。

## 2. 首要瓶颈：图片体积严重超标 (Payload Bloat)
- **首页案例缩略图未压缩**：
  - `/images/evidence/jobsite-rural-solar-street-light.jpg`: 896.6 KB
  - `/images/evidence/jobsite-parking-lot-tight-space.jpg`: 834.2 KB
  - `/images/evidence/jobsite-sidewalk-municipal-road.jpg`: 818.9 KB
  - **总计 2.55 MB**，但在 CSS 中显示尺寸仅为 680x380 像素！
- **Hero 图片为 195.7 KB PNG**，未提供 WebP/AVIF 现代格式。
- **优化收益**：
  - 缩放到 680x380 并转换为 WebP/AVIF 格式，每张图片可从 850 KB 降至 30-45 KB；
  - 首页图片体积将从 2.75 MB 降至 160 KB，**直接瘦身 94% (~2.6 MB)**，移动端 LCP 预期大幅改善。
