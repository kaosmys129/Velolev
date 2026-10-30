import test from "node:test";
import assert from "node:assert/strict";
import * as site from "../src/lib/site-config.mjs";
import {parseFragment, serialize} from "parse5";

test("localized navigation retains the language, query and section across current and old routes",()=>{
  assert.equal(typeof site.localizePath,"function","localized link resolution must be available");
  for(const [input,locale,want] of [
    ["/products/light-pole-jack/#specifications","es","/es/equipment/#specifications"],
    ["/quote/?application=solar-lighting","fr","/fr/pricing-plan/?application=solar-lighting"],
    ["/guides/pole-jack-compatibility/","pt","/pt/guides/pole-jack-compatibility/"],
    ["/es/equipment/","fr","/fr/equipment/"],
    ["/es/blog/","en","/guides/"],
    ["/resources/volvet-specifications.csv","pt","/resources/volvet-specifications.csv"],
    ["https://example.com/quote/","es","https://example.com/quote/"],
    ["//example.com/quote/","es","//example.com/quote/"],
    ["#specifications","es","#specifications"],
    ["/api/inquiries","fr","/api/inquiries"],
    ["/guides/new-reviewed-article/","pt","/guides/new-reviewed-article/"],
  ])assert.equal(site.localizePath(input,locale),want);
});

test("alternate metadata only advertises real localized pages",()=>{
  assert.deepEqual(site.coreAlternates("compatibility"),[
    {lang:"en",path:"/guides/pole-jack-compatibility/"},
    {lang:"es",path:"/es/guides/pole-jack-compatibility/"},
    {lang:"fr",path:"/fr/guides/pole-jack-compatibility/"},
    {lang:"pt",path:"/pt/guides/pole-jack-compatibility/"},
    {lang:"vi",path:"/vi/guides/pole-jack-compatibility/"},
    {lang:"th",path:"/th/guides/pole-jack-compatibility/"},
    {lang:"id",path:"/id/guides/pole-jack-compatibility/"},
  ]);
  assert.equal(site.localizedPagePath("home","en"),"/");
  assert.equal(site.localizedPagePath("product","th"),"/th/equipment/");
});

test("all six core language packages have terminal canonical aliases and local documents",async()=>{
 const {localizedSpecification,localizedSpecificationCsv,localizedProjectWorksheet}=await import('../src/lib/localized-documents.mjs');
 const {translateText,roiErrorMessages,inquiryFieldMessages}=await import('../src/lib/industrial-localization.mjs');
 for(const lang of ['es','fr','pt','vi','th','id']){
  assert.equal(site.industrialStaticPaths(lang).length,16);
  assert.equal(site.siteRedirects[`/${lang}/equipment-detail/`],`/${lang}/equipment/`);
  for(const [from,to] of Object.entries(site.siteRedirects).filter(([from])=>from.startsWith(`/${lang}/`))){assert.notEqual(from,to);assert.equal(site.siteRedirects[to],undefined);}
  const spec=localizedSpecification(lang);assert.equal(spec.specifications.ratedLoadKg,300);assert.equal(spec.specifications.totalWeightKg,85);assert.equal(spec.fieldValidation,'pending');assert.equal(spec.translationReview,'pending_native_review');assert.equal(spec.standardConfiguration.anchorBoltSizesIncluded.includes('M24'),false);
  assert.notEqual(spec.source,'User-confirmed specification sheet S4');
  assert.ok(localizedSpecificationCsv(lang).startsWith('\ufeff'));assert.ok(localizedSpecificationCsv(lang).includes('300 kg'));
  assert.ok(!localizedProjectWorksheet(lang).includes('Open questions for review'));
  for(const text of [...roiErrorMessages,...inquiryFieldMessages])assert.notEqual(translateText(text,lang),text,`${lang}: ${text}`);
 }
});

// Removing text/attribute translation must break this test. Hidden form values,
// scripts and URLs must survive untouched; they are behavior, not display copy.
test("build-time translation preserves markup, interactive data and form contracts",async()=>{
  const module=await import("../src/lib/industrial-localization.mjs").catch(()=>({}));
  assert.equal(typeof module.localizeMarkup,"function","static copy localization must be available");
  const {localizeMarkup}=module;
  const source='<main id="main"><h1>Light pole lifting.<br>Made portable.</h1><a href="/quote/?application=solar-lighting#main">Request a project quote</a><button data-caption="Hydraulic detail" data-alt="Hydraulic module" aria-label="Close image">Close</button><input name="application" value="Street lighting"><script>const text="Close";</script><style>.x{content:"Close"}</style></main>';
  const out=localizeMarkup(source,"es");
  assert.match(out,/<h1>[^<]+<br>[^<]+<\/h1>/);
  assert.doesNotMatch(out,/Light pole lifting\.|Made portable\./);
  assert.match(out,/href="\/es\/pricing-plan\/\?application=solar-lighting#main"/);
  assert.doesNotMatch(out,/data-caption="Hydraulic detail"/);
  assert.doesNotMatch(out,/aria-label="Close image"/);
  assert.match(out,/name="application" value="Street lighting"/);
  assert.match(out,/<script>const text="Close";<\/script>/);
  assert.match(out,/<style>\.x\{content:"Close"\}<\/style>/);
  assert.equal(localizeMarkup(source,"en"),source);
  assert.equal(serialize(parseFragment(out)).includes('id="main"'),true);
});
