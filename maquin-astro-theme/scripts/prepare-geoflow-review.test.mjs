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

    // Check automatic extraction of evidenceRefs against docs/content-strategy/fact-register.csv
    assert.ok(article.evidenceRefs.includes("F003"), "Should extract 300kg fact F003");
    assert.ok(article.evidenceRefs.includes("F002"), "Should extract 12m fact F002");
    assert.ok(article.evidenceRefs.includes("F004"), "Should extract 24V fact F004");
    assert.ok(article.evidenceRefs.includes("F005"), "Should extract 85kg fact F005");
    assert.ok(article.evidenceRefs.includes("F014"), "Should extract 180-260mm fact F014");
    assert.ok(article.evidenceRefs.includes("F012"), "Should extract M24 listed fact F012");
    assert.ok(article.evidenceRefs.includes("F011"), "Should extract two workers split fact F011");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("prepare-geoflow-review preserves Markdown tables and inter-article guide links", () => {
  const dir = mkdtempSync(join(tmpdir(), "prepare-review-md-test-"));
  try {
    const inputFile = join(dir, "geoflow-md.json");
    const outputFile = join(dir, "review-md-candidates.json");

    const sampleExport = [
      {
        slug: "hydraulic-pole-lifter-flange-bolt-sizing",
        title: "Flange Bolt Sizing and Non-Standard Base Review",
        meta_description: "Check M16-M22 included sets, M24 listing, and dimensioned drawing review requirements.",
        content: [
          "## Standard Flange Coverage",
          "",
          "See our overview at /guides/install-12m-street-light-poles-without-crane/ and /guides/pole-jack-compatibility/ for compatibility details.",
          "",
          "| Parameter | Listed Specification | Review Note |",
          "|---|---|---|",
          "| Bolt Span | 180–260 mm | Match measured base hole span before ordering |",
          "| Bolts Listed | M16–M24 | M16–M22 included; non-standard bases require a dimensioned drawing review |"
        ].join("\n"),
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
    const article = result.articles[0];
    assert.equal(article.sections.length, 1);
    assert.ok(article.sections[0].paragraphs.some((p) => p.includes("| Parameter | Listed Specification | Review Note |")));
    assert.ok(article.relatedPaths.includes("/guides/install-12m-street-light-poles-without-crane/"));
    assert.ok(article.evidenceRefs.includes("F020"), "Should extract dimensioned drawing review fact F020");
    assert.ok(article.evidenceRefs.includes("F013"), "Should extract M16-M22 fact F013");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
