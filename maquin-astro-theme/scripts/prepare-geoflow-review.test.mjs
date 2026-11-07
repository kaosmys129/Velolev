import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {execSync} from "node:child_process";

test("prepare-geoflow-review automatically extracts relatedPaths and evidenceRefs from content", () => {
  const dir = mkdtempSync(join(tmpdir(), "prepare-review-test-"));
  try {
    const inputFile = join(dir, "geoflow-export.json");
    const outputFile = join(dir, "review-candidates.json");

    const sampleExport = [
      {
        slug: "portable-pole-jack-narrow-alley-erection",
        title: "Portable Pole Jack vs Crane: Narrow Alley Erection",
        meta_description: "Field comparison of 300kg portable pole jack and crane rentals in tight spaces.",
        content_html: `
          <h2>Jobsite Logistics in Tight Alleys</h2>
          <p>Contractors aiming for <a href="/tools/roi-calculator/">crane rental cost savings</a> face major obstacles with boom trucks.</p>
          <p>The equipment features a verified 300kg rated capacity on calibrated test rigs, reaching up to 12m pole heights with 24V battery power.</p>
          <h2>Base Plate Integration</h2>
          <p>The universal slotted base plate supports 180-260mm P.C.D. bolt circle patterns using M16 to M24 studs. Check our <a href="/guides/pole-jack-compatibility/">compatibility guide</a>.</p>
          <p>Two workers can easily transport the 85kg split package directly into pedestrian zones.</p>
        `,
        status: "draft",
        review_status: "pending"
      }
    ];

    writeFileSync(inputFile, JSON.stringify(sampleExport, null, 2));

    const scriptPath = join(process.cwd(), "scripts/prepare-geoflow-review.mjs");
    execSync(`node "${scriptPath}" --input="${inputFile}" --output="${outputFile}"`, {
      encoding: "utf8"
    });

    const result = JSON.parse(readFileSync(outputFile, "utf8"));
    assert.equal(result.schemaVersion, 1);
    assert.equal(result.articles.length, 1);

    const article = result.articles[0];
    assert.equal(article.slug, "portable-pole-jack-narrow-alley-erection");
    assert.equal(article.locale, "en");

    // Check automatic extraction of relatedPaths
    assert.ok(article.relatedPaths.includes("/tools/roi-calculator/"));
    assert.ok(article.relatedPaths.includes("/guides/pole-jack-compatibility/"));

    // Check automatic extraction of evidenceRefs
    assert.ok(article.evidenceRefs.includes("F002"), "Should extract 300kg fact F002");
    assert.ok(article.evidenceRefs.includes("F003"), "Should extract 12m fact F003");
    assert.ok(article.evidenceRefs.includes("F004"), "Should extract 24V fact F004");
    assert.ok(article.evidenceRefs.includes("F008"), "Should extract 85kg fact F008");
    assert.ok(article.evidenceRefs.includes("F015"), "Should extract 180-260mm fact F015");
    assert.ok(article.evidenceRefs.includes("F016"), "Should extract M16-M24 fact F016");
    assert.ok(article.evidenceRefs.includes("F001"), "Should extract two workers split fact F001");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
