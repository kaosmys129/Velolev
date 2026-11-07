#!/usr/bin/env node
/**
 * sync_articles_to_geoflow.mjs
 * 
 * GEOFlow 多语言文章自动化入库与审核同步工具
 * 将本地生成的 Markdown 长文（含 16:9/3:4/1:1 瑞士工商业配图）一键同步至 GEOFlow 后台，
 * 强制以 status='draft' 与 review_status='pending' 状态入库，供管理员在 http://127.0.0.1:18082/geo_admin/articles 统一集中人工审核。
 * 同时支持将审核通过 (review_status='approved') 的文章导出为 review-export.json，无缝供给 Astro 静态发布流水线。
 * 
 * 用法:
 *   node scripts/sync_articles_to_geoflow.mjs --all
 *   node scripts/sync_articles_to_geoflow.mjs --file geo-drafts/articles/portable-light-pole-lifter-explainer-fr.md
 *   node scripts/sync_articles_to_geoflow.mjs --topic portable-light-pole-lifter-explainer
 *   node scripts/sync_articles_to_geoflow.mjs --export --output review-export.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态定位工程根目录
let projectRoot = '/Users/peterpc/Documents/liftpolemachine-web';
const candidates = [process.cwd(), path.resolve(__dirname, '../../..'), '/Users/peterpc/Documents/liftpolemachine-web'];
for (const c of candidates) {
  try {
    const s = await fs.stat(path.join(c, 'content/geoflow-project.json'));
    if (s.isFile()) {
      projectRoot = c;
      break;
    }
  } catch {}
}

// 读取项目配置与认证 Token
async function loadCredentials() {
  const projectConfigPath = path.resolve(projectRoot, 'content/geoflow-project.json');
  const tokenPath = path.resolve(projectRoot, 'ops/geoflow/private/api-token.json');

  const profile = JSON.parse(await fs.readFile(projectConfigPath, 'utf8'));
  const credential = JSON.parse(await fs.readFile(tokenPath, 'utf8'));

  return { profile, credential };
}

// 解析文章元数据与 Frontmatter
export function parseArticleMarkdown(content, filePath) {
  const baseName = path.basename(filePath, path.extname(filePath));
  let slug = baseName
    .replace(/polelift/gi, 'volvet-lifter')
    .replace(/velolev/gi, 'volvet');

  let title = '';
  let excerpt = '';
  let metaDescription = '';
  let frontmatterCategoryId = null;

  // 1. 尝试解析 YAML Frontmatter
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  let bodyContent = content;
  if (fmMatch) {
    const fmLines = fmMatch[1].split('\n');
    bodyContent = content.slice(fmMatch[0].length);
    for (const line of fmLines) {
      const kv = line.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
      if (kv) {
        const key = kv[1].trim().toLowerCase();
        let val = kv[2].trim().replace(/^["']|["']$/g, '');
        if (key === 'title') title = val;
        if (key === 'slug') slug = val;
        if (key === 'description' || key === 'meta_description') metaDescription = val;
        if (key === 'category_id' || key === 'category') frontmatterCategoryId = Number(val);
      }
    }
  }

  // 2. 提取 H1 标题
  if (!title) {
    const titleMatch = bodyContent.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1].trim() : slug;
  }

  // 3. 提取摘要 (优先 Key Takeaways 或第一段文字)
  if (!excerpt) {
    const ktMatch = bodyContent.match(/^> ### [^\n]+\n((?:> [^\n]+\n)+)/m);
    if (ktMatch) {
      excerpt = ktMatch[1].replace(/^> [-*]?\s*/gm, '').replace(/\n+/g, ' ').slice(0, 280).trim();
    } else {
      const pMatch = bodyContent.match(/^# [^\n]+\n\n([^#>\n][^\n]+)/m);
      if (pMatch) {
        excerpt = pMatch[1].replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').slice(0, 280).trim();
      }
    }
  }

  // 4. Meta Description
  if (!metaDescription) {
    const metaDescMatch = bodyContent.match(/meta_description:\s*["']?([^"'\n]+)["']?/i);
    metaDescription = metaDescMatch ? metaDescMatch[1].trim() : excerpt;
  }

  // 5. 智能分类判定 (优先级: frontmatter > slug/title特征 > 内容关键词)
  let categoryId = 1; // 默认：设备与采购选型
  if (frontmatterCategoryId && Number.isInteger(frontmatterCategoryId)) {
    categoryId = frontmatterCategoryId;
  } else {
    const lowerSlug = slug.toLowerCase();
    const lowerTitle = title.toLowerCase();

    if (lowerSlug.includes('flange') || lowerSlug.includes('pcd') || lowerSlug.includes('compatibility') ||
        lowerTitle.includes('flange') || lowerTitle.includes('p.c.d.') || lowerTitle.includes('法兰') || lowerTitle.includes('mặt bích') || lowerTitle.includes('หน้าแปลน') || lowerTitle.includes('bridas')) {
      categoryId = 2; // 工况与法兰适配
    } else if (lowerSlug.includes('roi') || lowerSlug.includes('cost') || lowerSlug.includes('compare') || lowerSlug.includes('crane') ||
               lowerTitle.includes('roi') || lowerTitle.includes('cost') || lowerTitle.includes('vs crane') || lowerTitle.includes('吊车对比')) {
      categoryId = 3; // 项目规划与成本评估
    } else if (lowerSlug.includes('audit') || lowerSlug.includes('verification') || lowerSlug.includes('quality') ||
               lowerTitle.includes('audit') || lowerTitle.includes('verification') || lowerTitle.includes('质检')) {
      categoryId = 4; // 证据核验与交付准备
    } else if (lowerSlug.includes('selection') || lowerSlug.includes('explainer') || lowerSlug.includes('guide') ||
               lowerTitle.includes('selection') || lowerTitle.includes('guide') || lowerTitle.includes('选型')) {
      categoryId = 1; // 设备与采购选型
    }
  }

  // 统计配图数
  const imageMatches = bodyContent.match(/!\[[^\]]*\]\(([^)]+)\)/g) || [];

  return {
    title,
    slug,
    content: bodyContent,
    excerpt,
    metaDescription,
    categoryId,
    imageCount: imageMatches.length
  };
}

// API 调用助手
export async function makeApiCall(baseUrl, token, endpoint, method = 'GET', body = null) {
  const url = `${baseUrl.replace(/\/$/, '')}/api/v1/${endpoint.replace(/^\//, '')}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    redirect: 'error',
    signal: AbortSignal.timeout(20000)
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const errorMsg = json?.error?.message || `HTTP ${response.status}`;
    throw new Error(`API 请求失败 [${method} ${endpoint}]: ${errorMsg}`);
  }

  return json?.data;
}

// 主同步逻辑
export async function syncArticles(options = {}) {
  const { profile, credential } = await loadCredentials();
  const baseUrl = profile.baseUrl || 'http://127.0.0.1:18082';
  const token = credential.token;

  console.log(`\n============================================================`);
  console.log(`🔄 GEOFlow 文章同步入库引擎启动 (Review Inbox Synchronizer)`);
  console.log(`🎯 目标服务器: ${baseUrl}`);
  console.log(`👤 默认发稿作者: ID ${profile.authorId || 1} (${profile.brand} 内容团队)`);
  console.log(`============================================================\n`);

  // 获取 GEOFlow 当前已有文章列表
  console.log(`📡 正在拉取 GEOFlow 后台已有文章台账...`);
  const listResult = await makeApiCall(baseUrl, token, 'articles?per_page=100');
  const existingArticles = listResult?.items || listResult?.data || [];
  const existingBySlug = new Map();
  const existingByTitle = new Map();

  for (const art of existingArticles) {
    if (art.slug) existingBySlug.set(art.slug.toLowerCase(), art);
    if (art.title) existingByTitle.set(art.title.toLowerCase().trim(), art);
  }
  console.log(`✓ 已检索到后台现有 ${existingArticles.length} 篇文章\n`);

  // 搜集待同步的 Markdown 文件
  const articlesDir = path.resolve(projectRoot, 'geo-drafts/articles');
  let targetFiles = [];

  if (options.file) {
    targetFiles = [path.resolve(options.file)];
  } else {
    const dirEntries = await fs.readdir(articlesDir);
    let mdFiles = dirEntries.filter(f => f.endsWith('.md'));
    if (options.topic) {
      mdFiles = mdFiles.filter(f => f.startsWith(options.topic));
    }
    targetFiles = mdFiles.map(f => path.join(articlesDir, f));
  }

  if (targetFiles.length === 0) {
    console.log(`⚠️ 未发现待同步的 Markdown 文件。`);
    return [];
  }

  console.log(`📦 待同步文章总数: ${targetFiles.length} 篇\n`);

  const results = [];

  for (const filePath of targetFiles) {
    const rawContent = await fs.readFile(filePath, 'utf8');
    const parsed = parseArticleMarkdown(rawContent, filePath);

    // 匹配已有记录（依据数据库唯一约束 slug 比对）
    let existing = existingBySlug.get(parsed.slug.toLowerCase());

    const payload = {
      title: parsed.title,
      slug: parsed.slug,
      content: parsed.content,
      excerpt: parsed.excerpt,
      meta_description: parsed.metaDescription,
      category_id: options.categoryId || parsed.categoryId,
      author_id: profile.authorId || 1,
      status: 'draft',
      review_status: 'pending'
    };

    let syncAction = '';
    let articleId = null;

    try {
      if (existing) {
        // 更新现有文章
        syncAction = 'UPDATE';
        const updateData = await makeApiCall(baseUrl, token, `articles/${existing.id}`, 'PATCH', payload);
        articleId = updateData?.id || existing.id;
        console.log(`  🔄 [${syncAction}] ID ${articleId}: ${parsed.title.slice(0, 40)}... (分类: ${payload.category_id}, 配图: ${parsed.imageCount} 张)`);
      } else {
        // 创建新文章草稿
        syncAction = 'CREATE';
        const createData = await makeApiCall(baseUrl, token, 'articles', 'POST', payload);
        articleId = createData?.id;
        console.log(`  ✨ [${syncAction}] ID ${articleId}: ${parsed.title.slice(0, 40)}... (分类: ${payload.category_id}, 配图: ${parsed.imageCount} 张)`);
      }

      results.push({
        filePath,
        slug: parsed.slug,
        title: parsed.title,
        id: articleId,
        action: syncAction,
        imageCount: parsed.imageCount,
        status: 'draft',
        reviewStatus: 'pending',
        success: true
      });
    } catch (err) {
      console.error(`  ❌ 同步失败 [${path.basename(filePath)}]: ${err.message}`);
      results.push({
        filePath,
        slug: parsed.slug,
        title: parsed.title,
        id: null,
        action: syncAction,
        success: false,
        error: err.message
      });
    }
  }

  console.log(`\n============================================================`);
  console.log(`🎉 同步入库全部完成！成功: ${results.filter(r => r.success).length}/${results.length}`);
  console.log(`🔗 人工审核直达后台: ${baseUrl}/geo_admin/articles`);
  console.log(`============================================================\n`);

  return results;
}

// 导出审定内容供 Astro 发布准备流水线
export async function exportReviewedArticles(options = {}) {
  const { profile, credential } = await loadCredentials();
  const baseUrl = profile.baseUrl || 'http://127.0.0.1:18082';
  const token = credential.token;

  console.log(`📡 正在从 GEOFlow (${baseUrl}) 导出审定文章...`);
  const listResult = await makeApiCall(baseUrl, token, 'articles?per_page=100');
  const items = listResult?.items || listResult?.data || [];

  const matchedItems = items.filter(a => options.allStatus || a.review_status === 'approved' || a.status === 'draft');
  console.log(`✓ 匹配到 ${matchedItems.length} 篇待导出文章，正在拉取完整正文...`);

  const candidates = [];
  for (const item of matchedItems) {
    try {
      const detail = await makeApiCall(baseUrl, token, `articles/${item.id}`);
      if (!detail || !detail.content) {
        console.warn(`  ⚠️ 文章 ID ${item.id} (${item.slug}) 缺少正文，跳过`);
        continue;
      }

      // 提取语种
      const langMatch = detail.slug.match(/-([a-z]{2})$/);
      let locale = langMatch ? langMatch[1] : 'en';
      if (locale === 'en' && (/[\u4e00-\u9fa5]/.test(detail.title) || /[\u4e00-\u9fa5]/.test(detail.content.slice(0, 1000)))) {
        locale = 'zh';
      }

      candidates.push({
        id: detail.id,
        slug: detail.slug,
        locale,
        title: detail.title,
        meta_description: detail.meta_description || detail.excerpt || '',
        content_html: detail.content || '',
        status: detail.status || 'draft',
        review_status: detail.review_status || 'pending'
      });
      console.log(`  ✓ 已拉取 ID ${detail.id}: ${detail.slug} (${locale})`);
    } catch (err) {
      console.error(`  ❌ 拉取文章 ID ${item.id} 失败: ${err.message}`);
    }
  }

  const outputPayload = JSON.stringify(candidates, null, 2);

  if (options.output) {
    const outPath = path.resolve(options.output);
    await fs.writeFile(outPath, outputPayload, 'utf8');
    console.log(`✅ 已导出 ${candidates.length} 篇审核候选稿至: ${path.relative(projectRoot, outPath)}`);
  } else {
    console.log(outputPayload);
  }

  return candidates;
}

// 命令行直接运行支持
if (process.argv[1] && process.argv[1].endsWith('sync_articles_to_geoflow.mjs')) {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--file' && args[i + 1]) {
      options.file = args[++i];
    } else if (a.startsWith('--file=')) {
      options.file = a.slice(7);
    } else if (a === '--topic' && args[i + 1]) {
      options.topic = args[++i];
    } else if (a.startsWith('--topic=')) {
      options.topic = a.slice(8);
    } else if (a === '--all') {
      options.all = true;
    } else if (a === '--export') {
      options.export = true;
    } else if (a === '--output' && args[i + 1]) {
      options.output = args[++i];
    } else if (a.startsWith('--output=')) {
      options.output = a.slice(9);
    } else if (a === '--category-id' && args[i + 1]) {
      options.categoryId = Number(args[++i]);
    }
  }

  if (options.export) {
    exportReviewedArticles(options).catch(err => {
      console.error(`❌ 导出发生异常:`, err);
      process.exit(1);
    });
  } else {
    syncArticles(options).catch(err => {
      console.error(`❌ 同步发生异常:`, err);
      process.exit(1);
    });
  }
}
