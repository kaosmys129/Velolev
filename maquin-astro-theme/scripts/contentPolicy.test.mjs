import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { parseFragment } from "parse5";
import { baseline, enforceContentPolicy, productSchema, organizationSchema, faqSchema, publicText, copyFor } from "../src/utils/contentPolicy.mjs";

const visible = (html) => {
  const walk = (n) => ["style", "script"].includes(n.tagName) ? "" : n.nodeName === "#text" ? n.value : (n.childNodes ?? []).map(walk).join(" ");
  return walk(parseFragment(html));
};

test("source copy matches the user-confirmed evidence and preserves uncertainty", () => {
  const source = readFileSync(new URL("../../docs/content-strategy/evidence/product-specification-source.jpg", import.meta.url));
  assert.equal(createHash("sha256").update(source).digest("hex"), baseline.evidence[0].sha256);
  const s = baseline.product.specifications;
  assert.equal(s.hydraulicModuleWeightKg + s.electricalCabinetWeightKg, s.totalWeightKg);
  assert.ok(s.listedAnchorBoltSizes.includes("M24"));
  assert.ok(!baseline.product.standardConfiguration.anchorBoltSizesIncluded.includes("M24"));
  assert.equal(baseline.product.fieldValidation, "pending");
  assert.equal(baseline.product.manufacturerReportedPerformance.evidenceStatus, "specification_only_field_results_pending");
});

test("seven locales suppress split price cards, price paragraphs and stock statements", () => {
  for (const locale of ["en", "es", "fr", "pt", "vi", "th", "id"]) {
    const html = `<div class="elementor-price-table__price"><span>$</span><span>1,500</span><span>/unit</span></div><p>Starting at 2,500 USD. In stock.</p><p>1 500 $ USD</p>`;
    const output = visible(enforceContentPolicy(html, locale));
    assert.doesNotMatch(output, /\$|\bUSD\b|1[, ]500|2,500|in stock/i);
    assert.ok(output.includes(copyFor(locale).commercial));
  }
});

test("metadata, legacy contact links, logos and fragment schema cannot leak old identity or offers", () => {
  const html = `<meta name="description" content="Velolev at $1,500"><img src="/Velolev-logo.png" alt="Velolev"><a href="mailto:sales@polelift.com">sales@polelift.com</a><a href="https://www.velolev.com/equipment/">PoleLift</a><script type="application/ld+json">{"offers":{"price":1500,"availability":"InStock"}}</script>`;
  const output = enforceContentPolicy(html);
  assert.doesNotMatch(output, /Velolev|PoleLift|polelift\.com|velolev\.com|mailto:|"offers"|InStock|\$1,500/i);
  assert.match(output, /volvet-wordmark\.svg/);
  assert.match(output, /\/equipment\//);
});

test("promotional timing is suppressed while approved dimensions remain intact", () => {
  const output = enforceContentPolicy(`<p>Erect poles in 20 seconds and payback in 3 poles.</p><strong data-count="20" data-suffix="s">20s</strong><p>610mm × 220mm × 220mm; 300kg; 24V.</p>`);
  assert.doesNotMatch(visible(output), /20\s*(seconds|s)|payback/i);
  assert.doesNotMatch(output, /data-count="20"/);
  assert.match(output, /610mm × 220mm × 220mm; 300kg; 24V/);
  assert.doesNotMatch(publicText("Reduce labor by 70%."), /70%/);
});

test("Product schema has grounded specs and no commercial or invented evidence fields", () => {
  const schema = productSchema(null, "/product.png");
  assert.equal(schema.brand.name, "volvet");
  for (const k of ["offers", "price", "availability", "aggregateRating", "review", "sku"]) assert.equal(k in schema, false);
  assert.equal(schema.url, undefined);
  assert.equal(baseline.contact.email, null);
  assert.equal(baseline.deployment.publicOrigin, null);
});

test("Organization and FAQ schemas contain valid structured data without commercial traps", () => {
  const org = organizationSchema("https://example.com");
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "volvet");
  assert.equal(org.url, "https://example.com");
  for (const k of ["offers", "price", "availability", "aggregateRating", "review", "sku"]) assert.equal(k in org, false);

  const faq = faqSchema([["Sample Question?", "Sample Answer."]]);
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity.length, 1);
  const serialized = JSON.stringify(faq);
  assert.doesNotMatch(serialized, /"(?:offers|price|priceCurrency|availability|aggregateRating|review)"/);
});

test("new editorial copy cannot reintroduce an old price or pretend contact configuration exists", () => {
  assert.equal(publicText("The standard unit is $1,500 USD."), copyFor("en").commercial);
  assert.equal(publicText("+86 21 1234 5678"), copyFor("en").contactPending);
  assert.equal(publicText("300kg / 600 lbs"), "300kg / 300 kg");
});
