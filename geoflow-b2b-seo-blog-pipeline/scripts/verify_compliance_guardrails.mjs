#!/usr/bin/env node

/**
 * 物理事实与合规红线门禁校验工具
 * 用法: node scripts/verify_compliance_guardrails.mjs path/to/article.md
 */

import { readFileSync, existsSync } from "node:fs";

const file = process.argv[2];
if (!file || !existsSync(file)) {
  console.error("Usage: node scripts/verify_compliance_guardrails.mjs <article.md|article.html>");
  process.exit(1);
}

const content = readFileSync(file, "utf8");
const violations = [];

// 1. 违规认证检查
if (/\b(?:CE certified|ISO certified|CE certification|ISO 9001)\b/i.test(content)) {
  violations.push("Banned claim detected: unverified CE or ISO certification.");
}

// 2. 虚假商业承诺检查
if (/\b(?:guaranteed payback|100% risk-free|guaranteed ROI)\b/i.test(content)) {
  violations.push("Banned claim detected: guaranteed payback or risk-free promise.");
}

// 3. 错误人员编制宣称
if (/\b(?:one-person operation|one man operation|single person installation)\b/i.test(content)) {
  violations.push("Banned claim detected: equipment strictly requires two-person operation (F001).");
}

// 4. 原始货币符号
if (/[$€£¥]/.test(content)) {
  violations.push("Banned raw currency symbol detected ($ € £ ¥). Use descriptive B2B commercial terms.");
}

// 5. 旧品牌名称
if (/\b(?:Velolev|PoleLift)\b/i.test(content)) {
  violations.push("Deprecated brand name detected (Velolev / PoleLift).");
}

// 6. 虚构邮箱
if (/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(content)) {
  violations.push("Unreviewed contact email detected. Direct users to verified website inquiry forms.");
}

// 7. 物理基准校验
const hasRatedLoad = /\b300\s*kg\b/i.test(content);
const hasMaxHeight = /\b12\s*m(?:eters?)?\b/i.test(content);

if (!hasRatedLoad) {
  violations.push("Missing core physical baseline: 300kg rated capacity (F002).");
}
if (!hasMaxHeight) {
  violations.push("Missing core physical baseline: 12m maximum pole height (F003).");
}

if (violations.length > 0) {
  console.error("❌ Compliance check failed with " + violations.length + " violations:");
  violations.forEach(v => console.error("  - " + v));
  process.exit(1);
} else {
  console.log("✅ All compliance guardrails passed. Article is safe for B2B export review.");
  process.exit(0);
}
