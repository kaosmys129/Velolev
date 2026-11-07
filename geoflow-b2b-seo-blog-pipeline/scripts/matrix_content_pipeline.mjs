#!/usr/bin/env node
/**
 * matrix_content_pipeline.mjs
 * 
 * GEOFlow B2B 多语言矩阵化内容与工商业配图全流程生产引擎
 * 
 * 功能：
 *   1. 单主题输入 -> 自动化生产全站 7 种语言矩阵文章（en/es/fr/pt/vi/th/id，可选 zh）；
 *      遵循: English First -> 物理事实基线硬锁定 (F001-F031) -> 7+1 语种多语言保真生成；
 *   2. 深度集成 geoflow-article-illustration 配图 SOP（7 张瑞士工商业卡片高清渲染 + 5 张大图与图注自动回写）；
 *   3. 自动执行物理事实 (F001-F031) 与合规门禁校验 (verify_compliance_guardrails)；
 *   4. 一键同步入库到 GEOFlow 数据库后台 (status='draft', review_status='pending')；
 *   5. 输出统一审核指引，供管理员在 http://127.0.0.1:18082/geo_admin/articles 进行人工审核。
 * 
 * 用法:
 *   node scripts/matrix_content_pipeline.mjs --topic portable-light-pole-lifter-explainer
 *   node scripts/matrix_content_pipeline.mjs --topic portable-light-pole-lifter-explainer --skip-render
 *   node scripts/matrix_content_pipeline.mjs --topic new-highway-lighting-lifter --skip-render
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fork } from 'node:child_process';
import { ensureArticleMatrix } from './matrix_article_generator.mjs';
import { syncArticles } from './sync_articles_to_geoflow.mjs';

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

// 目标语言列表 (全站 7 种语言)
const DEFAULT_LOCALES = ['en', 'es', 'fr', 'pt', 'vi', 'th', 'id'];

// 运行子脚本并返回 Promise
function runScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const child = fork(scriptPath, args, { stdio: 'inherit' });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Script exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function main() {
  const args = process.argv.slice(2);
  let topic = 'portable-light-pole-lifter-explainer';
  let skipRender = false;
  let skipVisuals = false;
  let skipFlowCover = false;
  let skipSync = false;
  let includeZh = true;
  let force = false;
  let theme = 'safety-orange';
  let targetLangs = null;
  let categoryId = null;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if ((a === '--topic' || a === '-t') && args[i + 1]) {
      topic = args[++i];
    } else if (a.startsWith('--topic=')) {
      topic = a.slice(8);
    } else if (a === '--skip-render') {
      skipRender = true;
    } else if (a === '--skip-visuals') {
      skipVisuals = true;
    } else if (a === '--skip-flow-cover') {
      skipFlowCover = true;
    } else if (a === '--skip-sync') {
      skipSync = true;
    } else if (a === '--force' || a === '-f') {
      force = true;
    } else if (a === '--theme' && args[i + 1]) {
      theme = args[++i];
    } else if (a === '--no-zh') {
      includeZh = false;
    } else if (a === '--category-id' && args[i + 1]) {
      categoryId = Number(args[++i]);
    } else if (a === '--locales' && args[i + 1]) {
      targetLangs = args[++i].split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  if (!targetLangs) {
    targetLangs = [...DEFAULT_LOCALES];
    if (includeZh) targetLangs.push('zh');
  }

  console.log(`\n============================================================`);
  console.log(`🏭 GEOFlow B2B 多语言矩阵化内容与工商业视觉流水线`);
  console.log(`📌 核心主题: ${topic}`);
  console.log(`🌐 目标语种 (${targetLangs.length} 种): ${targetLangs.join(', ')}`);
  console.log(`🎨 视觉主题: ${theme}`);
  console.log(`⚙️ 模式参数: ${skipRender ? '[跳过位图渲染] ' : ''}${skipVisuals ? '[跳过配图] ' : ''}${skipSync ? '[跳过入库] ' : ''}${force ? '[强制重成] ' : ''}`);
  console.log(`============================================================\n`);

  // ==========================================
  // Phase 1: 扫描并核验/生成全语种文章草稿
  // ==========================================
  console.log(`📋 [Phase 1/4] 检索并挂载多语言矩阵文章草稿 (English First -> 事实冻结 -> 矩阵多语种生成)...`);
  const generatedArticles = await ensureArticleMatrix(topic, {
    projectRoot,
    force,
    targetLangs
  });

  if (generatedArticles.length === 0) {
    throw new Error(`主题 ${topic} 生成多语言草稿失败！`);
  }

  console.log(`\n🎯 本次流水线将处理 ${generatedArticles.length} 篇矩阵文章。\n`);

  // ==========================================
  // Phase 2: 深度集成 geoflow-article-illustration 配图流程
  // ==========================================
  if (!skipVisuals) {
    console.log(`📸 [Phase 2/4] 深度集成配图引擎：生成各语种瑞士工商业卡片与 Google Flow 封面大图并回写正文...`);
    const visualsScript = path.resolve(__dirname, 'generate_article_visuals.mjs');
    const flowCoverScript = path.resolve(__dirname, 'generate_flow_cover.mjs');

    for (const item of generatedArticles) {
      console.log(`\n🎨 正在为 [${item.lang}] 语种文章执行配图与回写 (${item.fileName})...`);
      const vArgs = ['--article', item.filePath, '--insert-markdown', '--theme', theme];
      if (skipRender) vArgs.push('--skip-render');
      await runScript(visualsScript, vArgs);

      // Google Flow 封面大图生成与回写
      if (!skipFlowCover) {
        console.log(`  🖼️ 正在生成 [${item.lang}] 语种 Google Flow 真实感工程封面大图...`);
        const cArgs = ['--article', item.filePath, '--insert-markdown'];
        if (skipRender) cArgs.push('--dry-run');
        await runScript(flowCoverScript, cArgs);
      }
    }
    console.log(`\n✅ 全部语种配图渲染、封面大图构建与 Markdown 自动挂载已完成！\n`);
  } else {
    console.log(`⏩ [Phase 2/4] 跳过配图生成 (--skip-visuals)\n`);
  }

  // ==========================================
  // Phase 3: 合规红线与物理事实门禁自动化复核
  // ==========================================
  console.log(`🛡️ [Phase 3/4] 执行合规红线与物理基准 (300kg/12m/85kg/24V) 自动化门禁...`);
  const complianceScript = path.resolve(__dirname, 'verify_compliance_guardrails.mjs');
  for (const item of generatedArticles) {
    try {
      await runScript(complianceScript, [item.filePath]);
      console.log(`  ✓ [${item.lang}] 合规门禁 100% 通过`);
    } catch (err) {
      console.error(`  ❌ [${item.lang}] 合规校验未通过: ${err.message}`);
      throw err;
    }
  }
  console.log(`\n✅ 全语种文章合规门禁全部顺利通过！\n`);

  // ==========================================
  // Phase 4: 同步至 GEOFlow 后台数据库供人工审核
  // ==========================================
  if (!skipSync) {
    console.log(`🚀 [Phase 4/4] 一键持久化同步至 GEOFlow 后台数据库 (status='draft', review_status='pending')...`);
    for (const item of generatedArticles) {
      await syncArticles({ file: item.filePath, categoryId });
    }
  } else {
    console.log(`⏩ [Phase 4/4] 跳过后台同步 (--skip-sync)\n`);
  }

  console.log(`\n============================================================`);
  console.log(`🏆 多语言矩阵化内容流水线全流程成功完成！`);
  console.log(`📊 产出矩阵清单:`);
  generatedArticles.forEach(a => console.log(`   - [${a.lang.toUpperCase()}] ${a.fileName} (${a.isNew ? '新建' : '现有'})`));
  console.log(`\n🔗 请访问 GEOFlow 后台审核中心集中人工复核:`);
  console.log(`   👉 http://127.0.0.1:18082/geo_admin/articles`);
  console.log(`============================================================\n`);
}

main().catch(err => {
  console.error(`\n❌ 流水线执行失败:`, err);
  process.exit(1);
});
