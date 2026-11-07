#!/usr/bin/env node
/**
 * volvet 工业机械 - EDM 邮件营销与技术简报群发脚本
 * 
 * 使用方式:
 *   node scripts/send-edm.mjs --dry-run
 *   node scripts/send-edm.mjs --test-email=engineer@example.com
 *   node scripts/send-edm.mjs --campaign=path/to/campaign.json
 *   node scripts/send-edm.mjs --limit=50
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EmailService } from "../server/email-service.mjs";
import { SubscriptionStore } from "../server/subscription-store.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

// 自动加载 .env
try {
  if (typeof process.loadEnvFile === "function") {
    const envPath = resolve(root, ".env");
    if (existsSync(envPath)) process.loadEnvFile(envPath);
    const parentEnv = resolve(root, "../.env");
    if (existsSync(parentEnv)) process.loadEnvFile(parentEnv);
  }
} catch {}

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const testEmailArg = args.find(a => a.startsWith("--test-email="))?.split("=")[1]?.trim();
const campaignArg = args.find(a => a.startsWith("--campaign="))?.split("=")[1]?.trim();
const limitArg = Number(args.find(a => a.startsWith("--limit="))?.split("=")[1] || 0);
const subjectArg = args.find(a => a.startsWith("--subject="))?.split("=")[1]?.trim();

// 默认技术通报样例 (工程严谨风格)
const defaultCampaign = {
  id: "tech-brief-zero-crane-2026",
  title: "Field Engineering Report: Zero-Crane Light Pole Installation",
  headline: "Evaluating Two-Man Crew Mobilization for 6m–12m Municipal Poles",
  lead: "A comparative technical assessment on foundation bolt shear, 24V hydraulic pressure retention, and crane rental substitution.",
  bodyHtml: `
    <p>Dear Engineering Partner,</p>
    <p>Crane availability and transit permits frequently introduce unpredictable delays and substantial expense into municipal lighting and solar installation schedules. Our engineering department has published the updated <strong>Technical Field Assessment: Portable Hydraulic Lifters vs. Mobile Boom Cranes</strong>.</p>
    <div style="background-color:#f6f8f2;border:1px solid #dbe1d4;padding:16px 20px;border-radius:2px;margin:20px 0;">
      <h3 style="margin:0 0 10px 0;font-size:15px;color:#1d201e;">Report Highlights:</h3>
      <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;">• <strong>Base Flange Bolt Circle Analysis</strong>: Standardized compatibility for 180mm to 260mm bolt patterns, M16–M24 anchor bolts.</p>
      <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;">• <strong>Transport Logistics</strong>: Split two-module configuration (45kg + 40kg) fitting inside utility vans without commercial transport licenses.</p>
      <p style="margin:0;font-size:13px;line-height:1.6;">• <strong>Hydraulic Holding Capacity</strong>: 300kg rated vertical lift with 24-hour hydraulic lock safety valves.</p>
    </div>
    <p>The full technical paper and interactive ROI scenario builder are available on the volvet procurement engineering portal.</p>
  `,
  ctaText: "Open Interactive ROI Scenario Builder →",
  ctaUrl: `${process.env.PUBLIC_ORIGIN || "https://volvet.com"}/tools/roi-calculator/`,
  secondaryHighlights: [
    "Eliminate \$800–\$1,500 daily crane dispatch minimum charges on sub-50 pole deployments",
    "Single-operator hydraulic valve positioning with mechanical fall-arrest latch",
    "Full compatibility with round, octagonal, and solar-integrated steel poles"
  ]
};

async function main() {
  console.log("====================================================");
  console.log("volvet Industrial EDM Campaign Dispatch Tool");
  console.log("====================================================");

  let campaign = defaultCampaign;
  if (campaignArg) {
    const file = resolve(process.cwd(), campaignArg);
    if (!existsSync(file)) {
      console.error(`Error: Campaign file not found at ${file}`);
      process.exit(1);
    }
    campaign = JSON.parse(readFileSync(file, "utf8"));
  }

  if (subjectArg) {
    campaign.title = subjectArg;
  }

  const emailService = new EmailService({
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
    publicOrigin: process.env.PUBLIC_ORIGIN || "https://volvet.com",
    testMode: isDryRun
  });

  const status = emailService.getStatus();
  console.log(`Service Provider : ${status.provider.toUpperCase()} (${status.configured ? "API Key Present" : "Mock/Simulation Mode"})`);
  console.log(`Sender Address   : ${status.fromEmail}`);
  console.log(`Campaign ID      : ${campaign.id || "unspecified"}`);
  console.log(`Subject Line     : "${campaign.title}"`);
  console.log(`Execution Mode   : ${isDryRun ? "DRY-RUN (No emails will actually be dispatched)" : testEmailArg ? "TEST-EMAIL (" + testEmailArg + ")" : "PRODUCTION BROADCAST"}`);
  console.log("----------------------------------------------------");

  let recipients = [];

  if (testEmailArg) {
    recipients = [{ email: testEmailArg, locale: "en", country: "Test" }];
  } else {
    const dataDir = resolve(process.env.INQUIRY_DATA_DIR ?? join(root, ".local/inquiries"));
    const store = new SubscriptionStore(join(dataDir, "subscriptions"));
    const list = store.listActive({ limit: limitArg > 0 ? limitArg : 10000 });
    recipients = list.items;
    store.close();

    console.log(`Active Subscribers Found: ${recipients.length}`);
    if (recipients.length === 0 && !isDryRun) {
      console.log("No active subscribers in database. Dispatch skipped.");
      return;
    }
  }

  console.log(`Preparing to send to ${recipients.length} recipient(s)...`);

  const startTime = Date.now();
  const summary = await emailService.sendEdmCampaign({
    campaign,
    recipients,
    dryRun: isDryRun,
    batchSize: 20,
    delayBetweenBatchesMs: 800
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("----------------------------------------------------");
  console.log(`Dispatch Summary:`);
  console.log(`  Total Targets : ${summary.total}`);
  console.log(`  Successfully  : ${summary.sent}`);
  console.log(`  Failed        : ${summary.failed}`);
  console.log(`  Time Elapsed  : ${durationSec}s`);

  if (summary.errors.length > 0) {
    console.log("  Errors Encountered:");
    summary.errors.slice(0, 5).forEach((e, i) => console.log(`    [${i+1}] ${e.email}: ${e.error?.message || e.error}`));
    if (summary.errors.length > 5) console.log(`    ... and ${summary.errors.length - 5} more.`);
  }

  console.log("====================================================");
}

main().catch(err => {
  console.error("Fatal EDM script execution error:", err);
  process.exit(1);
});
