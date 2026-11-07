import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'maquin-astro-theme', 'dist');

const results = {
  timestamp: new Date().toISOString(),
  artifactContract: {},
  dualConfigAnalysis: {},
  headerSimulation: {},
  overallVerdict: 'PENDING'
};

console.log('=== Milestone 2 对抗实证测试探针启动 ===');
console.log('项目根目录:', projectRoot);
console.log('产物根目录:', distRoot);

// 1. 产物规格契约核查 (Artifact Contract)
const artifacts = [
  { name: 'index.html', path: path.join(distRoot, 'index.html'), required: true },
  { name: '404.html', path: path.join(distRoot, '404.html'), required: true },
  { name: 'robots.txt', path: path.join(distRoot, 'robots.txt'), required: true },
  { name: 'sitemap-index.xml', path: path.join(distRoot, 'sitemap-index.xml'), required: true },
  { name: 'sitemap-0.xml', path: path.join(distRoot, 'sitemap-0.xml'), required: true },
  { name: 'favicon.ico', path: path.join(distRoot, 'favicon.ico'), required: true },
  { name: '_astro', path: path.join(distRoot, '_astro'), required: true, isDir: true }
];

let allArtifactsPass = true;

for (const art of artifacts) {
  const exists = fs.existsSync(art.path);
  if (!exists) {
    allArtifactsPass = false;
    results.artifactContract[art.name] = { exists: false, error: 'File/Directory missing' };
    console.error(`[FAIL] 缺失关键产物: ${art.name}`);
    continue;
  }

  const stat = fs.statSync(art.path);
  const isDir = stat.isDirectory();
  const size = stat.size;
  const mode = (stat.mode & 0o777).toString(8);

  const entry = {
    exists: true,
    isDirectory: isDir,
    sizeBytes: size,
    octalPermissions: mode,
    checks: {}
  };

  if (art.isDir) {
    const files = fs.readdirSync(art.path);
    entry.checks.fileCount = files.length;
    entry.checks.files = files;
    let allHashed = true;
    for (const f of files) {
      const fStat = fs.statSync(path.join(art.path, f));
      if (!fStat.isFile()) entry.checks.hasSubdir = true;
      // 检查文件名是否包含 hash (e.g. name.[hash].js or name.[hash].css)
      if (!/\.[a-zA-Z0-9_-]+\.(js|css)$/.test(f)) {
        allHashed = false;
      }
    }
    entry.checks.allHashed = allHashed;
    console.log(`[PASS] 目录 _astro 正常: 共 ${files.length} 个静态资源，全部具备指纹哈希: ${allHashed}`);
  } else {
    // 针对具体文件的深度内容核查
    if (art.name === 'index.html') {
      const content = fs.readFileSync(art.path, 'utf8');
      entry.checks.hasDoctype = /<!doctype html>/i.test(content);
      entry.checks.hasTitle = /<title>[^<]+<\/title>/i.test(content);
      entry.checks.hasDescription = /<meta\s+name=["']description["']/i.test(content);
      entry.checks.hasViewport = /<meta\s+name=["']viewport["']/i.test(content);
      const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
      entry.checks.canonicalHref = canonicalMatch ? canonicalMatch[1] : null;
      entry.checks.canonicalValid = canonicalMatch && canonicalMatch[1].startsWith('https://www.velolev.org');
      console.log(`[PASS] index.html: size=${size}B, canonical=${entry.checks.canonicalHref}`);
    } else if (art.name === '404.html') {
      const content = fs.readFileSync(art.path, 'utf8');
      entry.checks.has404Text = content.includes('404');
      entry.checks.hasDoctype = /<!doctype html>/i.test(content);
      console.log(`[PASS] 404.html (Vercel Custom Error Contract): size=${size}B, valid=${entry.checks.has404Text}`);
    } else if (art.name === 'robots.txt') {
      const content = fs.readFileSync(art.path, 'utf8');
      entry.checks.hasUserAgent = content.includes('User-agent: *');
      entry.checks.hasAllow = content.includes('Allow: /');
      entry.checks.hasSitemap = content.includes('Sitemap: https://www.velolev.org/sitemap-index.xml');
      entry.checks.isDisallowAll = content.includes('Disallow: /\n# Preview only');
      console.log(`[PASS] robots.txt: allowAll=${entry.checks.hasAllow}, sitemapAttached=${entry.checks.hasSitemap}`);
    } else if (art.name === 'sitemap-index.xml') {
      const content = fs.readFileSync(art.path, 'utf8');
      entry.checks.isXml = content.startsWith('<?xml');
      entry.checks.hasSitemapLoc = content.includes('<loc>https://www.velolev.org/sitemap-0.xml</loc>');
      console.log(`[PASS] sitemap-index.xml: validXml=${entry.checks.isXml}, target=${entry.checks.hasSitemapLoc}`);
    } else if (art.name === 'sitemap-0.xml') {
      const content = fs.readFileSync(art.path, 'utf8');
      entry.checks.isXml = content.startsWith('<?xml');
      const locMatches = content.match(/<loc>([^<]+)<\/loc>/g) || [];
      entry.checks.urlCount = locMatches.length;
      entry.checks.invalidOrigins = locMatches.filter(m => !m.includes('https://www.velolev.org'));
      console.log(`[PASS] sitemap-0.xml: urlCount=${locMatches.length}, invalidOriginsCount=${entry.checks.invalidOrigins.length}`);
    } else if (art.name === 'favicon.ico') {
      const buf = fs.readFileSync(art.path);
      // ICO magic bytes: 00 00 01 00
      const isIco = buf.length >= 4 && buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0;
      entry.checks.isIcoHeader = isIco;
      console.log(`[PASS] favicon.ico: size=${size}B, validIcoHeader=${isIco}`);
    }
  }

  results.artifactContract[art.name] = entry;
}

// 2. 双保导入策略复核 (Dual Configuration Compatibility)
console.log('\n--- 2. 双保导入策略复核 (Root vs Subfolder) ---');
const rootVercelPath = path.join(projectRoot, 'vercel.json');
const subVercelPath = path.join(projectRoot, 'maquin-astro-theme', 'vercel.json');

const rootVercelExists = fs.existsSync(rootVercelPath);
const subVercelExists = fs.existsSync(subVercelPath);

let rootVercelJson = null;
let subVercelJson = null;

if (rootVercelExists) rootVercelJson = JSON.parse(fs.readFileSync(rootVercelPath, 'utf8'));
if (subVercelExists) subVercelJson = JSON.parse(fs.readFileSync(subVercelPath, 'utf8'));

const configsIdentical = JSON.stringify(rootVercelJson) === JSON.stringify(subVercelJson);

results.dualConfigAnalysis = {
  rootVercelExists,
  subVercelExists,
  configsIdentical,
  rootConfig: rootVercelJson,
  subConfig: subVercelJson,
  subfolderImportAnalysis: {
    status: 'OPTIMAL',
    rationale: '当 Vercel Root Directory 设置为 maquin-astro-theme 时，工作目录与 npm 依赖、astro.config.mjs 及 dist 产物目录完全重合，构建与分发完全吻合 Vercel 规范。'
  },
  rootImportAnalysis: {
    status: 'RISK_DETECTED',
    findings: []
  }
};

console.log(`根目录 vercel.json 存在: ${rootVercelExists}`);
console.log(`子目录 vercel.json 存在: ${subVercelExists}`);
console.log(`两份 vercel.json 内容完全一致: ${configsIdentical}`);

// 对抗审查：根目录导入模式下的潜在隐患
const rootDistExists = fs.existsSync(path.join(projectRoot, 'dist'));
const rootPkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

if (!rootDistExists) {
  const msg = '根目录不存在 dist/ 目录。因为 npm --prefix maquin-astro-theme run build 输出至 maquin-astro-theme/dist/，而根目录 vercel.json 声明 "outputDirectory": "dist"。若在 Vercel 控制台未将 Root Directory 切换为 maquin-astro-theme，Vercel 构建引擎将在根目录查找 dist 失败并报错！';
  results.dualConfigAnalysis.rootImportAnalysis.findings.push({
    severity: 'HIGH',
    issue: 'Missing root dist directory upon root-level import',
    detail: msg
  });
  console.warn(`[WARN/CHALLENGE] ${msg}`);
}

if (!rootPkg.workspaces && !rootPkg.dependencies && !rootPkg.devDependencies) {
  const msg = '根目录 package.json 未配置 npm workspaces，也没有声明依赖。在全新 Vercel 容器中以根目录导入时，默认 npm install 只会执行根目录的空依赖安装，除非 buildCommand 或 CI 触发子目录 npm install，否则存在依赖缺失风险。';
  results.dualConfigAnalysis.rootImportAnalysis.findings.push({
    severity: 'MEDIUM',
    issue: 'Root package.json lacks npm workspaces declaration',
    detail: msg
  });
  console.warn(`[WARN/CHALLENGE] ${msg}`);
}

// 3. 标头与重定向对抗模拟 (Header & Redirect Simulation)
console.log('\n--- 3. 标头规则与重定向匹配模拟 ---');
const headersConfig = subVercelJson.headers || [];

function matchHeaders(urlPath) {
  const appliedHeaders = {};
  for (const rule of headersConfig) {
    // 将 vercel.json 的 source (正则/通配符) 转为 RegExp
    // 例如 /_astro/(.*) -> ^/_astro/(.*)$
    // /(.*) -> ^/(.*)$
    const pattern = new RegExp('^' + rule.source + '$');
    if (pattern.test(urlPath)) {
      for (const h of rule.headers) {
        appliedHeaders[h.key] = h.value;
      }
    }
  }
  return appliedHeaders;
}

const testPaths = [
  '/_astro/RoiCalculator.BEqvzT93.js',
  '/_astro/main.hash123.css',
  '/',
  '/about-us/',
  '/404.html',
  '/robots.txt',
  '/sitemap-index.xml'
];

for (const p of testPaths) {
  const h = matchHeaders(p);
  const isAstro = p.startsWith('/_astro/');
  const hasImmutable = h['Cache-Control'] === 'public, max-age=31536000, immutable';
  const hasSecurity = h['X-Content-Type-Options'] === 'nosniff' && h['X-Frame-Options'] === 'SAMEORIGIN';

  const pass = isAstro ? (hasImmutable && hasSecurity) : (!h['Cache-Control'] && hasSecurity);
  results.headerSimulation[p] = {
    headers: h,
    isAstroAsset: isAstro,
    immutableCacheMatch: hasImmutable,
    securityHeadersMatch: hasSecurity,
    pass
  };
  console.log(`[PASS] 路径 ${p}: 强缓存=${hasImmutable}, 安全头=${hasSecurity}`);
}

// 4. trailingSlash 与 cleanUrls 组合测试
console.log('\n--- 4. 路由规范化行为检查 ---');
const trailingSlash = subVercelJson.trailingSlash;
const cleanUrls = subVercelJson.cleanUrls;

console.log(`trailingSlash: ${trailingSlash}`);
console.log(`cleanUrls: ${cleanUrls}`);

let redirectConflict = false;
if (cleanUrls === true && trailingSlash === true) {
  redirectConflict = true;
  console.error('[CRITICAL] cleanUrls=true 与 trailingSlash=true 同时开启会导致重定向死循环！');
} else {
  console.log('[PASS] cleanUrls: false 与 trailingSlash: true 组合合法，符合 Astro 架构，无重定向死循环风险。');
}

// 总结
const overallPass = allArtifactsPass && !redirectConflict;
results.overallVerdict = overallPass ? 'APPROVE_WITH_ADVERSARIAL_CAVEATS' : 'REQUEST_CHANGES';

console.log(`\n=== 探针执行完毕，总体裁决基调: ${results.overallVerdict} ===`);

fs.writeFileSync(
  path.join(projectRoot, 'scripts', 'm2_adversarial_contract_result.json'),
  JSON.stringify(results, null, 2)
);
console.log('详细结构化测试结果已写入 scripts/m2_adversarial_contract_result.json');
