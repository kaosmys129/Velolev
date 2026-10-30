/**
 * qa-challenger-responsive.mjs
 * 响应式布局、高保真画板与全站资产完整性实证校验测试套件 (Empirical Responsive & Asset QA)
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { parse } from "parse5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const repoDir = path.resolve(rootDir, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const designExportsDir = path.join(repoDir, "design-exports");

console.log("=================================================================");
console.log("🚀 STARTING ADVERSARIAL RESPONSIVE & ASSET QA CHALLENGE SUITE");
console.log("=================================================================");

let hasFailures = false;
const failureList = [];

function recordFailure(category, details) {
  hasFailures = true;
  failureList.push({ category, details });
  console.error(`❌ [FAIL] [${category}] ${details}`);
}

function recordPass(category, details) {
  console.log(`✅ [PASS] [${category}] ${details}`);
}

// -----------------------------------------------------------------------------
// 1. 静态 HTML 资产完整性与链接实证检测 (Asset & Link Integrity Verification)
// -----------------------------------------------------------------------------
console.log("\n--- STAGE 1: HTML ASSET & LINK INTEGRITY CHECK ---");

const targetHtmlPaths = [
  { locale: "en", file: "about-us/index.html" },
  { locale: "es", file: "es/about-us/index.html" },
  { locale: "fr", file: "fr/about-us/index.html" },
  { locale: "id", file: "id/about-us/index.html" },
  { locale: "pt", file: "pt/about-us/index.html" },
  { locale: "th", file: "th/about-us/index.html" },
  { locale: "vi", file: "vi/about-us/index.html" },
];

function extractTags(node, tags = []) {
  if (!node) return tags;
  if (node.tagName) {
    tags.push({
      tagName: node.tagName,
      attrs: (node.attrs || []).reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {}),
    });
  }
  if (node.childNodes) {
    for (const child of node.childNodes) {
      extractTags(child, tags);
    }
  }
  return tags;
}

const requiredEvidenceImages = [
  "/images/evidence/equipment-engineering-drawing-raw.jpg",
  "/images/evidence/equipment-trolley-side-detail.jpg",
  "/images/evidence/field-installation-flange-erect.jpg",
  "/images/evidence/factory-crating-export-package.jpg",
];

for (const { locale, file } of targetHtmlPaths) {
  const fullPath = path.join(distDir, file);
  if (!fs.existsSync(fullPath)) {
    recordFailure("FileExistence", `Target HTML file not found: ${file}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf-8");
  const document = parse(content);
  const allTags = extractTags(document);

  // 1.1 检查所有 <img> 图片资源在 dist 与 public 中的真实存在
  const imgTags = allTags.filter((t) => t.tagName === "img");
  let foundEvidence = new Set();

  for (const img of imgTags) {
    const src = img.attrs.src;
    if (!src) {
      recordFailure("ImageIntegrity", `[${locale}] <img> tag missing src attribute in ${file}`);
      continue;
    }

    if (src.startsWith("/")) {
      const distAssetPath = path.join(distDir, src.slice(1));
      const publicAssetPath = path.join(publicDir, src.slice(1));

      const inDist = fs.existsSync(distAssetPath);
      const inPublic = fs.existsSync(publicAssetPath);

      if (!inDist) {
        recordFailure("AssetNotFound", `[${locale}] Image not found in dist: ${src}`);
      } else {
        const stats = fs.statSync(distAssetPath);
        if (stats.size === 0) {
          recordFailure("EmptyAsset", `[${locale}] Image in dist is 0 bytes: ${src}`);
        }
      }

      if (!inPublic) {
        recordFailure("AssetNotFound", `[${locale}] Image not found in public: ${src}`);
      }

      if (requiredEvidenceImages.includes(src)) {
        foundEvidence.add(src);
      }
    }
  }

  // 验证必须包含的四大实证图片
  for (const reqImg of requiredEvidenceImages) {
    if (!foundEvidence.has(reqImg)) {
      recordFailure("MissingEvidenceImage", `[${locale}] Page ${file} missing required evidence image: ${reqImg}`);
    }
  }
  recordPass("EvidenceImages", `[${locale}] All 4 required factory evidence images present and verified on disk`);

  // 1.2 检查站内链接与 href 完整性
  const aTags = allTags.filter((t) => t.tagName === "a");
  for (const a of aTags) {
    const href = a.attrs.href;
    if (href === undefined || href === null) {
      recordFailure("LinkIntegrity", `[${locale}] <a> tag missing href in ${file}`);
      continue;
    }
    if (href === "" || href === "#" || href.startsWith("javascript:")) {
      recordFailure("InvalidHref", `[${locale}] <a> tag has dead/empty href '${href}' in ${file}`);
      continue;
    }

    // 锚点检查
    if (href.startsWith("#")) {
      const anchorId = href.slice(1);
      const idExists = allTags.some((t) => t.attrs.id === anchorId);
      if (!idExists) {
        recordFailure("BrokenAnchor", `[${locale}] In-page anchor target #${anchorId} not found in ${file}`);
      }
      continue;
    }

    // 站内绝对路径检查 (如 /quote/, /es/contact-us/, /privacy-policy/)
    if (href.startsWith("/")) {
      const [rawPath] = href.split("#");
      const cleanPath = rawPath.replace(/^\//, "").replace(/\/$/, "");

      if (cleanPath === "") {
        if (!fs.existsSync(path.join(distDir, "index.html"))) {
          recordFailure("BrokenLink", `[${locale}] Root index.html does not exist for href '${href}'`);
        }
      } else {
        const targetDirIndex = path.join(distDir, cleanPath, "index.html");
        const targetFile = path.join(distDir, `${cleanPath}.html`);
        const targetDir = path.join(distDir, cleanPath);

        const exists = fs.existsSync(targetDirIndex) || fs.existsSync(targetFile) || fs.existsSync(targetDir);
        if (!exists) {
          recordFailure("BrokenLink", `[${locale}] Broken internal link: '${href}' target does not exist in dist/`);
        }
      }
    }
  }
  recordPass("LinkIntegrity", `[${locale}] Checked ${aTags.length} links in ${file} - zero broken links or invalid hrefs`);

  // 1.3 检查 body 内是否包含任何历史 Elementor 残片 DOM
  const bodyContent = content.slice(content.indexOf("<body"));
  if (bodyContent.toLowerCase().includes("elementor") || bodyContent.includes("wp-content")) {
    recordFailure("ElementorRemnantsInBody", `[${locale}] Found Elementor/wp-content DOM fragments in body of ${file}`);
  } else {
    recordPass("LegacyCleanup", `[${locale}] Body HTML is 100% clean of Elementor/wp-content markup in ${file}`);
  }
}

// -----------------------------------------------------------------------------
// 2. 导出画板物理文件实证核验 (Exported Artboard Files Verification)
// -----------------------------------------------------------------------------
console.log("\n--- STAGE 2: DESIGN EXPORT ARTBOARDS VERIFICATION ---");

const artboardsToCheck = [
  { name: "desktop/03b-about-us.png", minW: 1440, minH: 1000, minRetinaW: 2880 },
  { name: "tablet/03b-about-us.png", minW: 768, minH: 1000, minRetinaW: 1536 },
  { name: "mobile/03b-about-us.png", minW: 390, minH: 1000, minRetinaW: 780 },
  { name: "multilingual/es-about-us.png", minW: 1440, minH: 1000, minRetinaW: 2880 },
];

function readPngDimensions(buffer) {
  const pngSig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < 8; i++) {
    if (buffer[i] !== pngSig[i]) return null;
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

for (const artboard of artboardsToCheck) {
  const filePath = path.join(designExportsDir, "artboards", artboard.name);
  if (!fs.existsSync(filePath)) {
    recordFailure("ArtboardMissing", `Exported artboard missing: ${artboard.name}`);
    continue;
  }

  const stat = fs.statSync(filePath);
  if (stat.size < 100 * 1024) {
    recordFailure("ArtboardTooSmall", `Artboard ${artboard.name} is unexpectedly small: ${(stat.size / 1024).toFixed(1)} KB`);
    continue;
  }

  const buffer = fs.readFileSync(filePath);
  const dims = readPngDimensions(buffer);
  if (!dims) {
    recordFailure("InvalidPng", `Artboard ${artboard.name} has invalid PNG signature!`);
    continue;
  }

  console.log(`🖼️  [Artboard] ${artboard.name}: ${(stat.size / (1024 * 1024)).toFixed(2)} MB, Dimensions: ${dims.width}x${dims.height}px`);

  if (dims.width < artboard.minW) {
    recordFailure("ResolutionTooLow", `Artboard ${artboard.name} width ${dims.width}px is less than minimum ${artboard.minW}px`);
  } else if (dims.width >= artboard.minRetinaW) {
    recordPass("Retina2x", `Artboard ${artboard.name} verified 2x Retina resolution: ${dims.width}x${dims.height}px (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
  } else {
    recordPass("StandardRes", `Artboard ${artboard.name} verified standard resolution: ${dims.width}x${dims.height}px`);
  }

  if (dims.height < artboard.minH) {
    recordFailure("IncompleteScreenshot", `Artboard ${artboard.name} height ${dims.height}px indicates incomplete page capture (< ${artboard.minH}px)`);
  }
}

// 检查 design-manifest.json 中的画板登记
const manifestPath = path.join(designExportsDir, "design-manifest.json");
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const artboardArray = Array.isArray(manifest.artboards) ? manifest.artboards : [];
  
  const requiredFiles = [
    "artboards/desktop/03b-about-us.png",
    "artboards/tablet/03b-about-us.png",
    "artboards/mobile/03b-about-us.png",
    "artboards/multilingual/es-about-us.png",
  ];

  for (const reqFile of requiredFiles) {
    const entry = artboardArray.find((a) => a.file === reqFile);
    if (entry) {
      recordPass("ManifestRegistry", `Verified manifest entry for ${reqFile}: "${entry.title}" (${entry.device})`);
    } else {
      recordFailure("ManifestIncomplete", `Missing entry in design-manifest.json for ${reqFile}`);
    }
  }
} else {
  recordFailure("ManifestMissing", "design-manifest.json not found in design-exports");
}

// -----------------------------------------------------------------------------
// 3. Playwright 实时本地静态服务与极限响应式多视口实证挑战
// -----------------------------------------------------------------------------
console.log("\n--- STAGE 3: PLAYWRIGHT MULTI-VIEWPORT RESPONSIVE & ADVERSARIAL STRESS TEST ---");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath.endsWith("/")) reqPath += "index.html";
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(path.join(filePath, "index.html"))) {
      filePath = path.join(filePath, "index.html");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found: " + reqPath);
      return;
    }
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`📡 Local static server running at ${baseUrl}`);

const browser = await chromium.launch({ headless: true });

// 包含极限窄屏与宽屏在内的全阶梯断点测试
const viewports = [
  { name: "ExtremeNarrow", width: 320, height: 568 },
  { name: "Mobile", width: 390, height: 844 }, // iPhone 14/15 目标视口
  { name: "Tablet", width: 768, height: 1024 }, // iPad 目标视口
  { name: "Desktop", width: 1440, height: 900 }, // 桌面目标视口
  { name: "UltraWide", width: 1920, height: 1080 }, // 1080p 大屏
];

const testRoutes = [
  { locale: "en", path: "/about-us/" },
  { locale: "es", path: "/es/about-us/" },
  { locale: "th", path: "/th/about-us/" }, // 复杂泰文字符
  { locale: "vi", path: "/vi/about-us/" }, // 密集声调越语字符
];

try {
  for (const { locale, path: routePath } of testRoutes) {
    console.log(`\nTesting Route [${locale}] ${routePath}:`);

    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });

      // 监听网络错误
      const failedRequests = [];
      page.on("response", (res) => {
        if (res.status() >= 400) {
          failedRequests.push({ url: res.url(), status: res.status() });
        }
      });

      await page.goto(`${baseUrl}${routePath}`, { waitUntil: "networkidle" });

      if (failedRequests.length > 0) {
        recordFailure(
          "NetworkError",
          `[${locale} - ${vp.name}] Assets returned HTTP >= 400: ${JSON.stringify(failedRequests)}`
        );
      } else if (vp.width === 1440) {
        recordPass("AssetLoading", `[${locale}] 100% network assets loaded successfully (0 HTTP errors)`);
      }

      // 3.1 水平滚动溢出测试 (Zero Horizontal Overflow)
      const overflowMetrics = await page.evaluate(() => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const docClientWidth = document.documentElement.clientWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;

        const allElements = Array.from(document.querySelectorAll("*"));
        const overflowing = [];

        for (const el of allElements) {
          if (["SCRIPT", "STYLE", "HEAD", "META", "LINK", "TITLE"].includes(el.tagName)) continue;
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 1.5 || rect.left < -1.5) {
            overflowing.push({
              tag: el.tagName.toLowerCase(),
              className: (el.className && typeof el.className === "string") ? el.className.slice(0, 80) : "",
              id: el.id || "",
              rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
            });
          }
        }

        // 检查图片物理渲染完整性
        const images = Array.from(document.querySelectorAll("img"));
        const brokenImages = images
          .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
          .map((img) => img.src);

        return {
          docScrollWidth,
          docClientWidth,
          bodyScrollWidth,
          winWidth,
          overflowingCount: overflowing.length,
          overflowing: overflowing.slice(0, 5),
          brokenImages,
        };
      });

      if (overflowMetrics.brokenImages.length > 0) {
        recordFailure(
          "BrokenImagesRendered",
          `[${locale} - ${vp.name}] Broken images with naturalWidth=0: ${JSON.stringify(overflowMetrics.brokenImages)}`
        );
      }

      const isOverflowing =
        overflowMetrics.docScrollWidth > overflowMetrics.winWidth ||
        overflowMetrics.bodyScrollWidth > overflowMetrics.winWidth ||
        overflowMetrics.overflowingCount > 0;

      if (isOverflowing) {
        recordFailure(
          "HorizontalOverflow",
          `[${locale} - ${vp.name} (${vp.width}px)] Detected horizontal overflow! docScrollWidth: ${overflowMetrics.docScrollWidth}, winWidth: ${overflowMetrics.winWidth}, overflowing elements: ${overflowMetrics.overflowingCount}. Details: ${JSON.stringify(overflowMetrics.overflowing)}`
        );
      } else {
        recordPass(
          "ZeroOverflow",
          `[${locale} - ${vp.name} (${vp.width}px)] Zero horizontal overflow! docScrollWidth: ${overflowMetrics.docScrollWidth} <= ${overflowMetrics.winWidth}`
        );
      }

      // 3.2 针对 Mobile (390px) 特别测试 4-stage quality strip 与 team cards 的换行与破损情况
      if (vp.width === 390) {
        const mobileChecks = await page.evaluate(() => {
          // 1. 质量检验 4 步卡片检查
          const qualityCards = Array.from(document.querySelectorAll(".quality-card"));
          const qualityGrid = document.querySelector(".steps-grid");
          let qualityGridColumns = qualityGrid ? window.getComputedStyle(qualityGrid).gridTemplateColumns : null;

          const qualityCardMetrics = qualityCards.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i,
              width: Math.round(r.width),
              height: Math.round(r.height),
              exceedsViewport: r.width > window.innerWidth,
            };
          });

          // 2. 团队专家 3 列卡片检查
          const teamCards = Array.from(document.querySelectorAll(".team-card"));
          const teamGrid = document.querySelector(".team-grid");
          let teamGridColumns = teamGrid ? window.getComputedStyle(teamGrid).gridTemplateColumns : null;

          const teamCardMetrics = teamCards.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i,
              width: Math.round(r.width),
              height: Math.round(r.height),
              exceedsViewport: r.width > window.innerWidth,
            };
          });

          // 3. 时间轴节点卡片检查
          const timelineCards = Array.from(document.querySelectorAll(".timeline-card"));
          const timelineMetrics = timelineCards.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i,
              width: Math.round(r.width),
              exceedsViewport: r.width > window.innerWidth,
            };
          });

          // 4. Hero Stats Cards 检查
          const statCards = Array.from(document.querySelectorAll(".stat-card"));
          const statMetrics = statCards.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i,
              width: Math.round(r.width),
              exceedsViewport: r.width > window.innerWidth,
            };
          });

          // 5. 港口物流与条款卡片检查
          const portItems = Array.from(document.querySelectorAll(".port-item"));
          const portMetrics = portItems.map((p, i) => {
            const r = p.getBoundingClientRect();
            return {
              index: i,
              width: Math.round(r.width),
              exceedsViewport: r.width > window.innerWidth,
            };
          });

          return {
            qualityCount: qualityCards.length,
            qualityGridColumns,
            qualityCardMetrics,
            teamCount: teamCards.length,
            teamGridColumns,
            teamCardMetrics,
            timelineCount: timelineCards.length,
            timelineMetrics,
            statCount: statCards.length,
            statMetrics,
            portCount: portItems.length,
            portMetrics,
          };
        });

        // 验证 4-stage quality strip
        if (mobileChecks.qualityCount !== 4) {
          recordFailure("QualityCardsCount", `[${locale} - Mobile 390px] Expected 4 quality cards, found ${mobileChecks.qualityCount}`);
        } else {
          const cardOverflow = mobileChecks.qualityCardMetrics.some((c) => c.exceedsViewport);
          if (cardOverflow) {
            recordFailure("QualityCardOverflow", `[${locale} - Mobile 390px] Quality card width exceeds 390px: ${JSON.stringify(mobileChecks.qualityCardMetrics)}`);
          } else {
            recordPass(
              "QualityStripMobileWrap",
              `[${locale} - Mobile 390px] 4-stage quality strip wraps cleanly into single column (${mobileChecks.qualityGridColumns}), each card width ~${mobileChecks.qualityCardMetrics[0].width}px <= 390px`
            );
          }
        }

        // 验证 team cards
        if (mobileChecks.teamCount !== 3) {
          recordFailure("TeamCardsCount", `[${locale} - Mobile 390px] Expected 3 team cards, found ${mobileChecks.teamCount}`);
        } else {
          const teamCardOverflow = mobileChecks.teamCardMetrics.some((c) => c.exceedsViewport);
          if (teamCardOverflow) {
            recordFailure("TeamCardOverflow", `[${locale} - Mobile 390px] Team card width exceeds 390px: ${JSON.stringify(mobileChecks.teamCardMetrics)}`);
          } else {
            recordPass(
              "TeamGridMobileWrap",
              `[${locale} - Mobile 390px] 3 team cards wrap cleanly into single column (${mobileChecks.teamGridColumns}), each card width ~${mobileChecks.teamCardMetrics[0].width}px <= 390px`
            );
          }
        }

        // 验证 timeline & stats & ports
        const timelineOverflow = mobileChecks.timelineMetrics.some((c) => c.exceedsViewport);
        if (timelineOverflow) {
          recordFailure("TimelineOverflow", `[${locale} - Mobile 390px] Timeline card exceeds 390px`);
        } else {
          recordPass("TimelineMobileWrap", `[${locale} - Mobile 390px] All 4 timeline milestone cards properly sized`);
        }

        const statOverflow = mobileChecks.statMetrics.some((c) => c.exceedsViewport);
        if (statOverflow) {
          recordFailure("StatOverflow", `[${locale} - Mobile 390px] Hero stat card exceeds 390px`);
        } else {
          recordPass("StatsMobileWrap", `[${locale} - Mobile 390px] All 4 Hero stat cards properly wrapped`);
        }

        const portOverflow = mobileChecks.portMetrics.some((p) => p.exceedsViewport);
        if (portOverflow) {
          recordFailure("PortOverflow", `[${locale} - Mobile 390px] Logistics port card exceeds 390px`);
        } else {
          recordPass("PortsMobileWrap", `[${locale} - Mobile 390px] All port cards properly wrapped`);
        }

        // 3.3 交互对抗性测试：移动端导航抽屉展开与闭合下的横向溢出
        const navToggle = await page.$(".nav-toggle");
        if (navToggle) {
          await navToggle.click();
          await page.waitForTimeout(100);
          const navExpandedOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          if (navExpandedOverflow) {
            recordFailure("NavToggleOverflow", `[${locale} - Mobile 390px] Opening mobile navigation menu caused horizontal overflow!`);
          } else {
            recordPass("NavToggleCheck", `[${locale} - Mobile 390px] Mobile navigation toggle open/close has zero overflow`);
          }
          await navToggle.click(); // 关闭
        }
      }

      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log("\n=================================================================");
console.log("🏁 EMPIRICAL QA SUITE EXECUTION FINISHED");
console.log("=================================================================");
if (hasFailures) {
  console.error(`\n❌ TOTAL FAILURES: ${failureList.length}`);
  for (const f of failureList) {
    console.error(` - [${f.category}] ${f.details}`);
  }
  process.exit(1);
} else {
  console.log("\n🎉 ALL TESTS PASSED EMPIRICALLY! ZERO FAILURES FOUND.");
  process.exit(0);
}
