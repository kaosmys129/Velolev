import { chromium } from "playwright";
import { createInquiryServer } from "../server/inquiry-server.mjs";
import { once } from "node:events";
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = resolve(root, "..");
const exportDir = join(repoRoot, "design-exports");

// 创建导出目录树
const dirs = {
  root: exportDir,
  desktop: join(exportDir, "artboards/desktop"),
  tablet: join(exportDir, "artboards/tablet"),
  mobile: join(exportDir, "artboards/mobile"),
  states: join(exportDir, "artboards/states"),
  multilingual: join(exportDir, "artboards/multilingual"),
  tokens: join(exportDir, "tokens"),
  assets: join(exportDir, "assets"),
};

for (const dir of Object.values(dirs)) {
  mkdirSync(dir, { recursive: true });
}

// 拷贝核心设计资产
const assetSources = [
  { from: join(root, "public/brand/volvet-wordmark.svg"), to: join(dirs.assets, "volvet-wordmark.svg") },
  { from: join(root, "public/images/product/portable-pole-lifter-hero-cutout.png"), to: join(dirs.assets, "portable-pole-lifter-hero-cutout.png") },
  { from: join(root, "public/images/product/portable-pole-lifter-side-cutout.png"), to: join(dirs.assets, "portable-pole-lifter-side-cutout.png") },
  { from: join(root, "public/images/product/portable-light-pole-lifter-specification-sheet.png"), to: join(dirs.assets, "portable-light-pole-lifter-specification-sheet.png") },
];

for (const { from, to } of assetSources) {
  if (existsSync(from)) {
    copyFileSync(from, to);
    console.log(`[Asset] Copied ${from} -> ${to}`);
  }
}

// 启动私有服务
const adminToken = "volvet-design-export-session-key-20261028-abcdef";
const inboxDir = join(root, ".local/design-export-inbox");
mkdirSync(inboxDir, { recursive: true });

const { server, store } = createInquiryServer({
  directory: inboxDir,
  adminToken,
  testMode: true,
  rateLimit: 500,
  logger: { error() {} },
});

server.listen(0, "127.0.0.1");
await once(server, "listening");
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
console.log(`[Server] Embedded Inquiry & Static server listening on ${base}`);

// 预置一条完整的多字段带附件测试询盘，供后台设计稿捕获
const sampleInquiry = store.save(
  {
    name: "Alex Thorne (Lead EPC Contractor)",
    company: "Nordic Infrastructure & Lighting AB",
    email: "alex.thorne@nordic-lighting.example",
    phone: "+46 8 123 4567",
    country: "Sweden / Gothenburg",
    inquiryType: "project",
    application: "street-lighting",
    quantity: "4",
    poleHeight: "12",
    poleWeight: "280",
    foundation: "M20 anchor bolts, square flange 220mm bolt circle, concrete pier",
    message: "Requesting quotation for 4 units of volvet 12m pole lifters with M20 adapters for municipal roadway lighting replacement program. Tight sidewalks with bike lanes.",
    sourcePage: "/quote/",
    locale: "en",
    consent: true,
    attribution: { utm_source: "google_search", utm_medium: "cpc", utm_campaign: "street_lighting_tools" },
  },
  {
    name: "gothenburg-flange-spec-sample.pdf",
    type: "application/pdf",
    size: 4820,
    bytes: Buffer.from("%PDF-1.4\n%volvet sample drawing attachment\n1 0 obj\n<<>>\nendobj\n%%EOF"),
  },
  "idempotency-key-design-seed-record-001"
);
console.log(`[Seed] Seeded demonstration inquiry: ${sampleInquiry.reference}`);

const browser = await chromium.launch({ headless: true });

async function scrollPage(page) {
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < scrollHeight; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

const manifest = {
  exportDate: new Date().toISOString(),
  brand: "volvet",
  scaleFactor: 2,
  artboards: [],
};

// 1. 桌面端设计画板 (1440 x 900, 2x Retina)
console.log("\n=== Exporting Desktop Artboards (1440px @ 2x) ===");
const desktopPages = [
  { path: "/", filename: "01-home.png", title: "Homepage (Core Landing)", category: "Core Procurement" },
  { path: "/products/light-pole-jack/", filename: "02-product-detail.png", title: "Product Detail (Specifications & Modularity)", category: "Core Procurement" },
  { path: "/guides/pole-jack-compatibility/", filename: "03-compatibility-guide.png", title: "Compatibility Guide (Flange & Foundation)", category: "Engineering Guide" },
  { path: "/about-us/", filename: "03b-about-us.png", title: "About Us (Factory & Engineering Verification)", category: "Core Procurement" },
  { path: "/quote/", filename: "04-quote-inquiry.png", title: "Project Quotation & RFQ Form", category: "Conversion Flow" },
  { path: "/contact-us/", filename: "05-contact-us.png", title: "Contact Us & Business Inquiries", category: "Conversion Flow" },
  { path: "/privacy/", filename: "06-privacy-policy.png", title: "Privacy Notice", category: "Policy & Trust" },
  { path: "/terms/", filename: "07-terms-of-service.png", title: "Terms of Service", category: "Policy & Trust" },
  { path: "/editorial-policy/", filename: "08-editorial-policy.png", title: "Editorial & Fact Policy", category: "Policy & Trust" },
  { path: "/blog/", filename: "09-blog-archive.png", title: "Blog & Knowledge Archive", category: "Content Hub" },
  { path: "/the-importance-of-regular-inspections-for-heavy-machinery/", filename: "10-article-detail.png", title: "Technical Article Detail", category: "Content Hub" },
  { path: "/admin/inquiries/", filename: "11-admin-inquiries-login.png", title: "Private Inbox (Login State)", category: "Operations & Admin" },
  { path: "/404.html", filename: "12-404-error.png", title: "404 Error Fallback", category: "System States" },
];

{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await context.newPage();

  for (const item of desktopPages) {
    console.log(`- [Desktop] ${item.title}: ${item.path}`);
    await page.goto(`${base}${item.path}`, { waitUntil: "networkidle" });
    await scrollPage(page);
    const savePath = join(dirs.desktop, item.filename);
    await page.screenshot({ path: savePath, fullPage: true });
    manifest.artboards.push({
      device: "Desktop",
      width: 1440,
      scale: 2,
      category: item.category,
      title: item.title,
      route: item.path,
      file: `artboards/desktop/${item.filename}`,
    });
  }
  await context.close();
}

// 2. 平板端设计画板 (768 x 1024, 2x Retina)
console.log("\n=== Exporting Tablet Artboards (768px @ 2x) ===");
const tabletPages = [
  { path: "/", filename: "01-home.png", title: "Homepage (Tablet)", category: "Core Procurement" },
  { path: "/products/light-pole-jack/", filename: "02-product-detail.png", title: "Product Detail (Tablet)", category: "Core Procurement" },
  { path: "/guides/pole-jack-compatibility/", filename: "03-compatibility-guide.png", title: "Compatibility Guide (Tablet)", category: "Engineering Guide" },
  { path: "/about-us/", filename: "03b-about-us.png", title: "About Us (Tablet)", category: "Core Procurement" },
  { path: "/quote/", filename: "04-quote-inquiry.png", title: "Project Quotation (Tablet)", category: "Conversion Flow" },
  { path: "/contact-us/", filename: "05-contact-us.png", title: "Contact Us (Tablet)", category: "Conversion Flow" },
];

{
  const context = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await context.newPage();

  for (const item of tabletPages) {
    console.log(`- [Tablet] ${item.title}: ${item.path}`);
    await page.goto(`${base}${item.path}`, { waitUntil: "networkidle" });
    await scrollPage(page);
    const savePath = join(dirs.tablet, item.filename);
    await page.screenshot({ path: savePath, fullPage: true });
    manifest.artboards.push({
      device: "Tablet",
      width: 768,
      scale: 2,
      category: item.category,
      title: item.title,
      route: item.path,
      file: `artboards/tablet/${item.filename}`,
    });
  }
  await context.close();
}

// 3. 移动端设计画板 (390 x 844, 2x Retina)
console.log("\n=== Exporting Mobile Artboards (390px @ 2x) ===");
const mobilePages = [
  { path: "/", filename: "01-home.png", title: "Homepage (Mobile)", category: "Core Procurement" },
  { path: "/products/light-pole-jack/", filename: "02-product-detail.png", title: "Product Detail (Mobile)", category: "Core Procurement" },
  { path: "/guides/pole-jack-compatibility/", filename: "03-compatibility-guide.png", title: "Compatibility Guide (Mobile)", category: "Engineering Guide" },
  { path: "/about-us/", filename: "03b-about-us.png", title: "About Us (Mobile)", category: "Core Procurement" },
  { path: "/quote/", filename: "04-quote-inquiry.png", title: "Project Quotation (Mobile)", category: "Conversion Flow" },
  { path: "/contact-us/", filename: "05-contact-us.png", title: "Contact Us (Mobile)", category: "Conversion Flow" },
  { path: "/privacy/", filename: "06-privacy-policy.png", title: "Privacy Notice (Mobile)", category: "Policy & Trust" },
  { path: "/blog/", filename: "07-blog-archive.png", title: "Blog Archive (Mobile)", category: "Content Hub" },
];

{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await context.newPage();

  for (const item of mobilePages) {
    console.log(`- [Mobile] ${item.title}: ${item.path}`);
    await page.goto(`${base}${item.path}`, { waitUntil: "networkidle" });
    await scrollPage(page);
    const savePath = join(dirs.mobile, item.filename);
    await page.screenshot({ path: savePath, fullPage: true });
    manifest.artboards.push({
      device: "Mobile",
      width: 390,
      scale: 2,
      category: item.category,
      title: item.title,
      route: item.path,
      file: `artboards/mobile/${item.filename}`,
    });
  }
  await context.close();
}

// 4. 关键交互与动态状态设计稿 (States)
console.log("\n=== Exporting Interactive State Artboards ===");

// 4.1 移动端汉堡导航展开态
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.locator(".nav-toggle").click();
  await page.waitForTimeout(300);
  const savePath = join(dirs.states, "01-mobile-menu-open.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Mobile (State)",
    width: 390,
    scale: 2,
    category: "Interactive States",
    title: "Mobile Navigation Drawer Open",
    route: "/ [menu-open]",
    file: "artboards/states/01-mobile-menu-open.png",
  });
  await context.close();
}

// 4.2 语言切换选择器展开态
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  await page.locator(".language-picker summary").click();
  await page.waitForTimeout(200);
  const savePath = join(dirs.states, "02-language-switcher-expanded.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Interactive States",
    title: "Multilingual Dropdown Expanded",
    route: "/ [lang-open]",
    file: "artboards/states/02-language-switcher-expanded.png",
  });
  await context.close();
}

// 4.3 适配性检查清单交互态
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/guides/pole-jack-compatibility/`, { waitUntil: "networkidle" });
  const checkboxes = page.locator("#preparation-checklist input[type='checkbox']");
  if ((await checkboxes.count()) >= 3) {
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();
  }
  await page.locator("#preparation-status").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const savePath = join(dirs.states, "03-compatibility-checklist-active.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Interactive States",
    title: "Compatibility Checklist Interaction (3 of 5 confirmed)",
    route: "/guides/pole-jack-compatibility/ [active]",
    file: "artboards/states/03-compatibility-checklist-active.png",
  });
  await context.close();
}

// 4.4 询盘表单高级参数折叠展开态
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/quote/`, { waitUntil: "networkidle" });
  await page.locator(".inquiry-details summary").click();
  await page.waitForTimeout(200);
  await page.locator(".inquiry-details").scrollIntoViewIfNeeded();
  const savePath = join(dirs.states, "04-quote-form-expanded-params.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Interactive States",
    title: "Inquiry Form Technical Details Drawer Open",
    route: "/quote/ [details-open]",
    file: "artboards/states/04-quote-form-expanded-params.png",
  });
  await context.close();
}

// 4.5 询盘表单校验错误高亮态
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/quote/`, { waitUntil: "networkidle" });
  await page.locator('.project-inquiry button[type="submit"]').click();
  await page.waitForTimeout(300);
  const savePath = join(dirs.states, "05-quote-form-validation-error.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Interactive States",
    title: "Inquiry Form Inline Validation Errors",
    route: "/quote/ [validation-failed]",
    file: "artboards/states/05-quote-form-validation-error.png",
  });
  await context.close();
}

// 4.6 询盘提交成功官方凭证卡片态
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/quote/`, { waitUntil: "networkidle" });
  await page.locator('input[name="name"]').fill("Thomas Berg (Project Director)");
  await page.locator('input[name="company"]').fill("Nordic Solar & Lighting EPC");
  await page.locator('input[name="email"]').fill("thomas.berg@nordic-example.com");
  await page.locator('input[name="country"]').fill("Sweden");
  await page.locator('input[name="consent"]').check();
  await page.locator('.project-inquiry button[type="submit"]').click();
  await page.locator("[data-inquiry-success]").waitFor({ state: "visible" });
  const savePath = join(dirs.states, "06-quote-form-success-receipt.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Interactive States",
    title: "Inquiry Official Reference Confirmation Receipt",
    route: "/quote/ [success-receipt]",
    file: "artboards/states/06-quote-form-success-receipt.png",
  });
  await context.close();
}

// 4.7 管理员私有收件箱工作区（登录态与详情查看）
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/admin/inquiries/`, { waitUntil: "networkidle" });
  await page.locator("#admin-key").fill(adminToken);
  await page.locator('#login-form button[type="submit"]').click();
  await page.locator("#inbox").waitFor({ state: "visible" });
  await page.locator("#include-tests").check();
  await page.waitForTimeout(300);
  const firstRowBtn = page.locator("#rows button").first();
  if (await firstRowBtn.isVisible()) {
    await firstRowBtn.click();
    await page.waitForTimeout(300);
  }
  const savePath = join(dirs.states, "07-admin-inquiry-detail-expanded.png");
  await page.screenshot({ path: savePath });
  manifest.artboards.push({
    device: "Desktop (State)",
    width: 1440,
    scale: 2,
    category: "Operations & Admin",
    title: "Operator Private Inbox & Inquiry Detail Drawer",
    route: "/admin/inquiries/ [authenticated]",
    file: "artboards/states/07-admin-inquiry-detail-expanded.png",
  });
  await context.close();
}

// 5. 多语言本地化代表设计画板 (Multilingual)
console.log("\n=== Exporting Multilingual Artboards ===");
const multilingualPages = [
  { path: "/es/", filename: "es-home.png", title: "Spanish (Español) - Homepage", lang: "es" },
  { path: "/es/about-us/", filename: "es-about-us.png", title: "Spanish (Español) - About Us", lang: "es" },
  { path: "/fr/equipment/", filename: "fr-equipment.png", title: "French (Français) - Equipment Page", lang: "fr" },
  { path: "/pt/contact-us/", filename: "pt-contact.png", title: "Portuguese (Português) - Contact Page", lang: "pt" },
  { path: "/id/", filename: "id-home.png", title: "Indonesian (Bahasa) - Homepage", lang: "id" },
  { path: "/th/", filename: "th-home.png", title: "Thai (ภาษาไทย) - Homepage", lang: "th" },
  { path: "/vi/equipment/", filename: "vi-equipment.png", title: "Vietnamese (Tiếng Việt) - Equipment Page", lang: "vi" },
];

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  for (const item of multilingualPages) {
    console.log(`- [i18n] ${item.title}: ${item.path}`);
    await page.goto(`${base}${item.path}`, { waitUntil: "networkidle" });
    await scrollPage(page);
    const savePath = join(dirs.multilingual, item.filename);
    await page.screenshot({ path: savePath, fullPage: true });
    manifest.artboards.push({
      device: `Desktop (${item.lang.toUpperCase()})`,
      width: 1440,
      scale: 2,
      category: "Multilingual Matrix",
      title: item.title,
      route: item.path,
      file: `artboards/multilingual/${item.filename}`,
    });
  }
  await context.close();
}

await browser.close();
server.close();
await once(server, "close");

// 保存设计稿清册清单
writeFileSync(join(exportDir, "design-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n[Manifest] Saved ${manifest.artboards.length} artboards to design-manifest.json`);

// 6. 生成 Design Tokens JSON 与 规格文档
const designTokens = {
  version: "1.0.0",
  date: "2026-10-28",
  brand: "volvet",
  colors: {
    primary: {
      yellow: { value: "#f4cc3d", hex: "#f4cc3d", role: "Primary Accent & CTA Button", usage: "Main action buttons, brand badge accent, highlighted borders" },
      yellowHover: { value: "#ffdc57", hex: "#ffdc57", role: "CTA Hover State" },
      yellowDeep: { value: "#a08216", hex: "#a08216", role: "Focus Outline Accent" },
    },
    neutral: {
      ink: { value: "#1d201e", hex: "#1d201e", role: "Primary Body & Headings Text" },
      dark: { value: "#202622", hex: "#202622", role: "Footer Background & Dark Badges" },
      muted: { value: "#626a63", hex: "#626a63", role: "Secondary & Helper Text" },
      line: { value: "#d5d8cd", hex: "#d5d8cd", role: "Dividers, Borders & Table Lines" },
      paper: { value: "#f3f2ec", hex: "#f3f2ec", role: "Page Main Background (Warm Sand/Off-white)" },
      white: { value: "#ffffff", hex: "#ffffff", role: "Card Panels & Form Inputs Background" },
      greenBackdrop: { value: "#c6ceba", hex: "#c6ceba", role: "Hero Visual Blueprint Canvas" },
      panelLight: { value: "#e6e9de", hex: "#e6e9de", role: "Evidence Strip & Note Panels" },
    },
    semantic: {
      error: { value: "#a52a20", hex: "#a52a20", role: "Validation Error & Warning Borders" },
      success: { value: "#2e683a", hex: "#2e683a", role: "Receipt Confirmation Green" },
      focusRing: { value: "#947500", hex: "#947500", role: "Keyboard Focus-Visible Ring" },
    },
  },
  typography: {
    fontFamilies: {
      primary: "Geologica, 'Trebuchet MS', system-ui, sans-serif",
      monospace: "'Courier New', SFMono-Regular, monospace",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 650,
      extraBold: 800,
    },
    typeScale: {
      heroTitle: { size: "clamp(40px, 5.7vw, 82px)", lineHeight: "1.08", letterSpacing: "-0.045em", weight: 650 },
      h1: { size: "clamp(36px, 5vw, 64px)", lineHeight: "1.12", letterSpacing: "-0.035em", weight: 650 },
      h2: { size: "clamp(30px, 3.6vw, 50px)", lineHeight: "1.15", letterSpacing: "-0.03em", weight: 650 },
      h3: { size: "23px", lineHeight: "1.25", letterSpacing: "-0.025em", weight: 650 },
      lead: { size: "18px", lineHeight: "1.7", weight: 400 },
      body: { size: "15px", lineHeight: "1.65", weight: 400 },
      small: { size: "13px", lineHeight: "1.5", weight: 400 },
      caption: { size: "11px", lineHeight: "1.4", letterSpacing: "0.16em", weight: 650, textTransform: "uppercase" },
      specNumber: { size: "36px", lineHeight: "1.2", letterSpacing: "-0.05em", weight: 650 },
    },
  },
  layout: {
    maxWidth: "1240px",
    headerMaxWidth: "1440px",
    gutterDesktop: "48px",
    gutterMobile: "18px",
    sectionPaddingDesktop: "90px 0",
    sectionPaddingMobile: "55px 0",
    breakpoints: {
      desktopLarge: "1440px",
      desktop: "1050px",
      tablet: "768px",
      mobile: "390px",
    },
  },
  components: {
    buttons: {
      primary: { background: "#f4cc3d", color: "#1d201e", padding: "17px 23px", radius: "2px", fontWeight: 600 },
      small: { padding: "12px 17px", fontSize: "13px" },
      outline: { border: "1px solid currentColor", background: "transparent" },
    },
    inputs: {
      height: "48px",
      padding: "13px 14px",
      border: "1px solid #c8cec3",
      background: "#ffffff",
      borderRadius: "2px",
    },
  },
};

writeFileSync(join(dirs.tokens, "design-tokens.json"), JSON.stringify(designTokens, null, 2) + "\n");

// 生成设计规范 Markdown
const designSpecMd = `# volvet 全站设计系统与 UI 规范说明书 (Design System Specification)

> **版本**：v1.0.0 (2026-10-28)  
> **适用范围**：volvet 便携式立杆机全球独立站 (Desktop / Tablet / Mobile)  
> **设计基调**：**精密工业美学 (Precision Industrial Aesthetic)**。以工程参数严谨性为主导，米灰纸质感底色融合工业明黄，兼顾高可读性与专业感。

---

## 一、 色彩体系 (Color Palette)

### 1. 核心品牌与强调色
| 语义名称 | 色值 | RGB | 用途说明 |
|---|---|---|---|
| **Brand Yellow (主黄色)** | \`#f4cc3d\` | rgb(244, 204, 61) | 主操作按钮 (CTA)、品牌首字母徽章背景、高亮色块、重点横幅 |
| **Yellow Hover (悬浮亮黄)** | \`#ffdc57\` | rgb(255, 220, 87) | 按钮悬停与交互高亮状态 |
| **Focus Ring (聚焦金黄)** | \`#947500\` | rgb(148, 117, 0) | 全局键盘无障碍 (Focus-Visible) 焦点外轮廓 |

### 2. 界面中性色与背景体系
| 语义名称 | 色值 | RGB | 用途说明 |
|---|---|---|---|
| **Ink (碳墨黑)** | \`#1d201e\` | rgb(29, 32, 30) | 正文主要文字、所有大标题、重要图标 |
| **Dark Industrial (工业深黑)** | \`#202622\` | rgb(32, 38, 34) | 页脚背景、深色对比度区块、工业标签背景 |
| **Muted Slate (次要灰绿)** | \`#626a63\` | rgb(98, 106, 99) | 辅助说明文案、表单帮助说明、版权信息 |
| **Paper Canvas (暖米底色)** | \`#f3f2ec\` | rgb(243, 242, 236) | 全站主页面底色，营造专业工程纸质图纸质感 |
| **Grid Line (结构分割线)** | \`#d5d8cd\` | rgb(213, 216, 205) | 规格栏边框、表格分割线、表单卡片边界 |
| **Blueprint Green (展台背板绿)** | \`#c6ceba\` | rgb(198, 206, 186) | 首页 Hero 机械展示画板背景（内嵌 52px 网格线） |
| **Panel Light (事实便签浅灰)** | \`#e6e9de\` | rgb(230, 233, 222) | 证据台账面板、工程说明卡片背景色 |

### 3. 交互与校验语义色
| 语义名称 | 色值 | 用途说明 |
|---|---|---|
| **Error / Alert (警告与错误)** | \`#a52a20\` | 校验错误文字、错误输入框双像素边框 |
| **Success (成功绿)** | \`#2e683a\` | 询盘凭证成功确认卡片状态标头 |

---

## 二、 排版与字阶系统 (Typography System)

全站字体以现代几何工业无衬线字体 **Geologica** 为核心，辅以等宽字体 **Courier New** 强化机械工程与数据编号属性。

- **主要字体族**：\`Geologica, 'Trebuchet MS', system-ui, sans-serif\`
- **工程等宽字体**：\`'Courier New', SFMono-Regular, monospace\`（用于编号、尺寸参数、凭证号）

### 字阶标准 (Type Scale Hierarchy)
| 级别 | 尺寸 (Desktop / Fluid) | 行高 | 字重 | 字母间距 | 典型应用 |
|---|---|---|---|---|---|
| **Hero Title** | \`clamp(40px, 5.7vw, 82px)\` | 1.08 | 650 (Bold) | -0.045em | 首页 Hero 主标语 |
| **Page H1** | \`clamp(36px, 5vw, 64px)\` | 1.12 | 650 (Bold) | -0.035em | 产品页、指南页主标题 |
| **Section H2** | \`clamp(30px, 3.6vw, 50px)\` | 1.15 | 650 (Bold) | -0.03em | 模块二级大标题 |
| **Card H3** | \`23px\` | 1.25 | 650 (Bold) | -0.025em | 特性卡片标题、步骤说明标题 |
| **Spec Big Num**| \`36px\` | 1.2 | 650 (Bold) | -0.05em | 规格栏大数字 (12m / 300kg) |
| **Lead Paragraph** | \`18px\` | 1.7 | 400 (Regular) | 0 | 页面导语与引言段落 |
| **Body (正文)** | \`15px\` | 1.65 | 400 (Regular) | 0 | 通用正文、参数表格 |
| **UI Small** | \`13px / 12px\` | 1.5 | 500 / 600 | 0 | 导航菜单、表单标签、错误提示 |
| **Eyebrow / Kicker** | \`11px\` | 1.4 | 650 | 0.16em | 全大写前导标签（带 24px 实线标识） |

---

## 三、 间距与网格规范 (Layout & Spacing)

- **最大内容宽度 (Max Container Width)**：\`1240px\`（页面居中，两端自适应）
- **页头最大宽度 (Header Max Width)**：\`1440px\`
- **桌面内边距 (Desktop Gutter)**：两侧各 \`48px\`（页面边缘与内容留白）
- **移动端内边距 (Mobile Gutter)**：两侧各 \`18px\`
- **模块垂直内边距 (Section Spacing)**：
  - 桌面端：\`90px 0\`
  - 移动端：\`55px 0\`
- **响应式断点 (Breakpoints)**：
  - \`1440px\`：超宽屏标准视口
  - \`1050px\`：导航与双列内容紧凑过渡断点
  - \`760px\`：移动端汉堡菜单折叠与单列流断点
  - \`390px\`：移动设备基准测试视口

---

## 四、 核心 UI 组件规范 (Component Specification)

### 1. 按钮系统 (Button Styles)
- **Primary CTA (主行动按钮)**：
  - 高度：\`54px\`（\`padding: 17px 23px\`），圆角：\`2px\`，字重：\`600\`。
  - 采用 Flex 布局两端对齐，右侧包含指向箭头 \`↗\`。
  - 悬停动效：\`background: #ffdc57; transform: translateY(-2px);\`。
- **Small Button (导航与操作小按钮)**：
  - \`padding: 12px 17px\`，字号 \`13px\`。
- **Dark Inverted Button (深色反差按钮)**：
  - 背景为碳墨黑 \`#1d201e\`，文字纯白，用于黄色 CTA 横幅中。

### 2. 表单与输入框 (Form Elements)
- **输入框与下拉选择框**：
  - 最小点击高度：\`48px\`（保障移动端良好触控体验）。
  - 背景纯白，边框 \`1px solid #c8cec3\`，微圆角 \`2px\`。
  - 获得焦点状态：\`outline: 2px solid #a08216; outline-offset: 2px;\`。
  - 校验失败状态：\`border: 2px solid #a52a20;\`。
- **附件上传区域 (Dropzone)**：
  - 虚线边框 \`1px dashed #a8b29e\`，底色 \`#e8ebdf\`，支持 PDF / PNG / JPG 格式限制说明。

### 3. 参数规格带 (Spec Strip)
- 4 列等分（移动端自适应为 2×2 网格），上下边框贯穿，展示关键硬指标（高度、荷载、动力、操作工数）。

### 4. 品牌标识 (Wordmark)
- 紧凑微排版，首字母 \`v\` 嵌入明黄色 \`32px × 34px\` 矩形徽章，字体字重 \`800\`，字间距 \`-2px\`。
`;

writeFileSync(join(dirs.tokens, "design-system-spec.md"), designSpecMd);

// 7. 生成单页交付画廊 HTML (Interactive Showcase)
const showcaseHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>volvet 全站设计稿导出画廊 & UI 设计规范交付看板</title>
  <style>
    :root {
      --bg: #141715;
      --card-bg: #1d221f;
      --card-border: #2c332e;
      --text: #e7ece5;
      --text-muted: #8e9b8f;
      --yellow: #f4cc3d;
      --yellow-hover: #ffdc57;
      --font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 14px;
      line-height: 1.6;
      padding-bottom: 80px;
    }
    header.top-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(20, 23, 21, 0.92);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--card-border);
      padding: 18px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo-badge {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      background: var(--yellow);
      color: #141715;
      font-weight: 800;
      font-size: 20px;
      border-radius: 3px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      color: var(--text-muted);
      font-size: 12px;
    }
    .meta-badges {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .pill {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 99px;
      background: #252d27;
      color: var(--yellow);
      border: 1px solid #3d4a40;
      font-weight: 600;
    }
    .container {
      max-width: 1560px;
      margin: 0 auto;
      padding: 30px 36px;
    }
    .nav-tabs {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 14px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    .tab-btn {
      background: #1d221f;
      color: var(--text-muted);
      border: 1px solid var(--card-border);
      padding: 9px 18px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all .2s;
    }
    .tab-btn:hover {
      color: #fff;
      background: #272f2a;
    }
    .tab-btn.active {
      background: var(--yellow);
      color: #141715;
      border-color: var(--yellow);
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin: 30px 0 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-title::before {
      content: '';
      width: 4px;
      height: 18px;
      background: var(--yellow);
      border-radius: 2px;
    }
    .artboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 26px;
      margin-bottom: 45px;
    }
    .artboard-grid.mobile-grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
    .artboard-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform .2s, border-color .2s;
    }
    .artboard-card:hover {
      transform: translateY(-4px);
      border-color: #4a574e;
    }
    .artboard-preview {
      background: #0f1210;
      height: 290px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
    .artboard-grid.mobile-grid .artboard-preview {
      height: 400px;
    }
    .artboard-preview img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform .3s ease;
    }
    .artboard-card:hover .artboard-preview img {
      transform: scale(1.02);
    }
    .artboard-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity .2s;
      color: #fff;
      font-weight: 600;
      gap: 8px;
    }
    .artboard-preview:hover .artboard-overlay {
      opacity: 1;
    }
    .artboard-info {
      padding: 16px;
      border-top: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .artboard-title {
      font-weight: 600;
      font-size: 14px;
      color: #fff;
    }
    .artboard-meta {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 3px;
    }
    .artboard-actions a {
      display: inline-block;
      padding: 6px 12px;
      background: #28332b;
      color: var(--yellow);
      border: 1px solid #3d4a40;
      font-size: 12px;
      font-weight: 600;
      border-radius: 3px;
      text-decoration: none;
    }
    .artboard-actions a:hover {
      background: var(--yellow);
      color: #141715;
    }
    .tokens-panel {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 28px;
      margin-bottom: 40px;
    }
    .swatches-row {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .swatch-card {
      background: #141715;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      overflow: hidden;
    }
    .swatch-color {
      height: 70px;
    }
    .swatch-details {
      padding: 12px;
      font-size: 12px;
    }
    .swatch-name {
      font-weight: 700;
      color: #fff;
    }
    .swatch-hex {
      font-family: monospace;
      color: var(--yellow);
      margin: 2px 0;
    }
    .swatch-role {
      font-size: 11px;
      color: var(--text-muted);
    }
    .modal {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .modal.open {
      display: flex;
    }
    .modal-content {
      max-width: 92vw;
      max-height: 92vh;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
    .modal-header {
      padding: 16px 24px;
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #171b18;
    }
    .modal-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
    .modal-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    .modal-img-container {
      padding: 24px;
      text-align: center;
      background: #0d0f0e;
      overflow: auto;
    }
    .modal-img-container img {
      max-width: 100%;
      height: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6);
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="brand-group">
      <span class="logo-badge">v</span>
      <div>
        <div class="brand-title">volvet · 全站设计稿导出与设计系统规范</div>
        <div class="brand-sub">Portable Light Pole Lifter Global Independent Site · High-Fidelity Design Review</div>
      </div>
    </div>
    <div class="meta-badges">
      <span class="pill">2x Retina High-DPI</span>
      <span class="pill">1440px / 768px / 390px</span>
      <span class="pill">Tokens v1.0</span>
      <span class="pill">${manifest.artboards.length} Artboards</span>
    </div>
  </header>

  <main class="container">
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="filterCategory('all')">全部画板 (${manifest.artboards.length})</button>
      <button class="tab-btn" onclick="filterCategory('Core Procurement')">核心采购链路</button>
      <button class="tab-btn" onclick="filterCategory('Interactive States')">核心交互与状态</button>
      <button class="tab-btn" onclick="filterCategory('Tablet')">平板端画板</button>
      <button class="tab-btn" onclick="filterCategory('Mobile')">移动端画板</button>
      <button class="tab-btn" onclick="filterCategory('Multilingual Matrix')">多语言矩阵</button>
      <button class="tab-btn" onclick="filterCategory('tokens')">设计规范 Tokens</button>
    </div>

    <!-- Design Tokens Panel -->
    <section id="tokens-section" class="tokens-panel">
      <div class="section-title">核心色彩设计规范 (Design Color Tokens)</div>
      <p style="color:var(--text-muted); margin-bottom:15px">提取自生产级 CSS 系统规范，专为严谨工业美学定制的主色、辅色与对比度配置。</p>
      <div class="swatches-row">
        <div class="swatch-card"><div class="swatch-color" style="background:#f4cc3d"></div><div class="swatch-details"><div class="swatch-name">Brand Yellow</div><div class="swatch-hex">#f4cc3d</div><div class="swatch-role">Primary Action / CTA</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#ffdc57"></div><div class="swatch-details"><div class="swatch-name">Yellow Hover</div><div class="swatch-hex">#ffdc57</div><div class="swatch-role">Interactive Hover</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#1d201e"></div><div class="swatch-details"><div class="swatch-name">Carbon Ink</div><div class="swatch-hex">#1d201e</div><div class="swatch-role">Headings & Primary Text</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#202622"></div><div class="swatch-details"><div class="swatch-name">Industrial Dark</div><div class="swatch-hex">#202622</div><div class="swatch-role">Footer & Contrast Blocks</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#f3f2ec"></div><div class="swatch-details"><div class="swatch-name">Paper Canvas</div><div class="swatch-hex">#f3f2ec</div><div class="swatch-role">Warm Sand Page Canvas</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#c6ceba"></div><div class="swatch-details"><div class="swatch-name">Blueprint Green</div><div class="swatch-hex">#c6ceba</div><div class="swatch-role">Hero Visual Blueprint</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#d5d8cd"></div><div class="swatch-details"><div class="swatch-name">Grid Border Line</div><div class="swatch-hex">#d5d8cd</div><div class="swatch-role">Borders & Table Lines</div></div></div>
        <div class="swatch-card"><div class="swatch-color" style="background:#a52a20"></div><div class="swatch-details"><div class="swatch-name">Semantic Alert</div><div class="swatch-hex">#a52a20</div><div class="swatch-role">Validation Error State</div></div></div>
      </div>
    </section>

    <!-- Artboards Showcase Grid -->
    <div id="artboard-container">
      <div class="section-title" id="grid-header">设计画板精选清单</div>
      <div class="artboard-grid" id="main-grid">
        ${manifest.artboards
          .map(
            (item, index) => `
          <div class="artboard-card" data-category="${item.category}" data-device="${item.device}">
            <div class="artboard-preview" onclick="openModal('${item.file}', '${item.title} (${item.device})')">
              <img src="${item.file}" alt="${item.title}" loading="lazy"/>
              <div class="artboard-overlay">
                <span>🔍 查看高清设计图</span>
              </div>
            </div>
            <div class="artboard-info">
              <div>
                <div class="artboard-title">${item.title}</div>
                <div class="artboard-meta">${item.device} · ${item.width}px @ ${item.scale}x · ${item.route}</div>
              </div>
              <div class="artboard-actions">
                <a href="${item.file}" target="_blank" download>原图下载</a>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </main>

  <!-- Modal Preview -->
  <div class="modal" id="image-modal" onclick="closeModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title" id="modal-title">设计稿预览</div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-img-container">
        <img id="modal-img" src="" alt="Design Preview"/>
      </div>
    </div>
  </div>

  <script>
    function openModal(src, title) {
      document.getElementById('modal-img').src = src;
      document.getElementById('modal-title').textContent = title;
      document.getElementById('image-modal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(event) {
      document.getElementById('image-modal').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    function filterCategory(cat) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');

      const cards = document.querySelectorAll('.artboard-card');
      const tokensSection = document.getElementById('tokens-section');
      const mainGrid = document.getElementById('main-grid');

      if (cat === 'tokens') {
        tokensSection.style.display = 'block';
        document.getElementById('artboard-container').style.display = 'none';
        return;
      }
      tokensSection.style.display = 'block';
      document.getElementById('artboard-container').style.display = 'block';

      if (cat === 'Mobile') {
        mainGrid.classList.add('mobile-grid');
      } else {
        mainGrid.classList.remove('mobile-grid');
      }

      cards.forEach(card => {
        const itemCat = card.dataset.category;
        const itemDev = card.dataset.device;
        if (cat === 'all') {
          card.style.display = 'flex';
        } else if (cat === 'Mobile' && itemDev.includes('Mobile')) {
          card.style.display = 'flex';
        } else if (cat === 'Tablet' && itemDev.includes('Tablet')) {
          card.style.display = 'flex';
        } else if (itemCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
`;

writeFileSync(join(exportDir, "index.html"), showcaseHtml);

// 生成 README.md
const readmeMd = `# volvet 全站设计稿导出交付包 (Design Exports Package)

本目录由自动化设计系统导出引擎于 ${new Date().toISOString()} 自动生成，收录了 volvet 便携式立杆机全球独立站的全部高保真设计稿、交互状态画板、多语言版本截图及设计系统 Tokens 规范。

---

## 目录结构
- **\`index.html\`**：**交互式全站设计稿交付画廊**（直接在浏览器双击打开即可进行全屏大图预览、多端视图切换与颜色字阶查看）。
- **\`tokens/\`**：
  - \`design-tokens.json\`：结构化 Design Tokens 数据（含颜色、排版、间距、圆角与断点）。
  - \`design-system-spec.md\`：详尽的设计系统与 UI 组件规范说明书。
- **\`assets/\`**：导出的核心矢量 Logo（SVG）与设备高清抠图主图。
- **\`artboards/\`**（全量 2x Retina 超清画板，总计 ${manifest.artboards.length} 个）：
  - \`desktop/\`：桌面端基准画板（1440px 视口，涵盖全站核心采购、政策、文章与管理页面）。
  - \`tablet/\`：平板端响应式画板（768px 视口）。
  - \`mobile/\`：移动端响应式画板（390px 视口，iPhone 14/15 规格）。
  - \`states/\`：7 大核心交互与业务状态画板（汉堡菜单展开、语言选择器、适配检查勾选、参数折叠、表单错误拦截、成功凭证号卡片、管理员收件箱工作区）。
  - \`multilingual/\`：多语言本地化代表页面（西语、法语、葡语、印尼语、泰语、越南语）。

---

## 快速使用
- 在浏览器中直接打开本目录下的 \`index.html\` 即可开始审查。
`;

writeFileSync(join(exportDir, "README.md"), readmeMd);
console.log(`\n[Complete] Design system exports successfully created at: ${exportDir}`);
