#!/usr/bin/env node

/**
 * 事实编号与站内内链自动提取工具
 * 用法: node scripts/extract_evidence_and_links.mjs path/to/article.md
 */

import { readFileSync, existsSync } from "node:fs";

const file = process.argv[2];
if (!file || !existsSync(file)) {
  console.error("Usage: node scripts/extract_evidence_and_links.mjs <article.md|article.html>");
  process.exit(1);
}

const content = readFileSync(file, "utf8");

const ALLOWED_CORE_PATHS = [
  "/tools/roi-calculator/",
  "/guides/pole-jack-compatibility/",
  "/compare/pole-jack-vs-crane/",
  "/products/light-pole-jack/",
  "/quote/",
  "/resources/",
  "/guides/install-light-pole-without-crane/"
];

function extractEvidenceRefs(text) {
  const refs = new Set();
  if (/\b300\s*kg\b/i.test(text)) refs.add("F002");
  if (/\b12\s*m(?:eters?)?\b/i.test(text)) refs.add("F003");
  if (/\b24\s*V\b/i.test(text)) refs.add("F004");
  if (/\b85\s*kg\b/i.test(text)) refs.add("F008");
  if (/(?:180\s*(?:mm)?\s*(?:[-–—]|to)\s*260\s*mm|\bp\.?c\.?d\.?)/i.test(text)) refs.add("F015");
  if (/\bM16|M18|M20|M22|M24\b/i.test(text)) refs.add("F016");
  if (/\b(?:two-module|split module|two-person|two workers)\b/i.test(text)) refs.add("F001");
  if (/\b(?:vertical test rig|pre-shipment|hydraulic pressure hold)\b/i.test(text)) refs.add("F020");
  if (/\b(?:crane access permits?|overhead power|narrow access)\b/i.test(text)) refs.add("F010");
  return Array.from(refs).sort();
}

function extractRelatedPaths(text) {
  const paths = new Set();
  for (const p of ALLOWED_CORE_PATHS) {
    if (text.includes(p)) paths.add(p);
  }
  if (paths.size === 0) paths.add("/guides/pole-jack-compatibility/");
  return Array.from(paths);
}

const evidenceRefs = extractEvidenceRefs(content);
const relatedPaths = extractRelatedPaths(content);

console.log(JSON.stringify({
  file,
  evidenceRefs,
  relatedPaths,
  evidenceCount: evidenceRefs.length,
  internalLinksCount: relatedPaths.length
}, null, 2));
