import {verifyBuiltVersion} from "./lib/source-fingerprint.mjs";
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import { createHash } from "node:crypto";
import { baseline, copyFor } from "../src/utils/contentPolicy.mjs";
import {industrialLocales} from "../src/lib/site-config.mjs";
import {translateText} from "../src/lib/industrial-localization.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist"), failures = [];
const all = (p) => readdirSync(p, { withFileTypes: true }).flatMap((x) => x.isDirectory() ? all(join(p, x.name)) : [join(p, x.name)]);
const find = (n, tag) => [ ...(n.tagName === tag ? [n] : []), ...(n.childNodes ?? []).flatMap((c) => find(c, tag)) ];
const attr = (n, k) => n.attrs?.find((a) => a.name === k)?.value ?? "";
const text = (n) => ["style", "script"].includes(n.tagName) ? "" : n.nodeName === "#text" ? n.value : (n.childNodes ?? []).map(text).join(" ");
const check = (ok, message) => { if (!ok) failures.push(message); };
if (!existsSync(dist)) throw new Error("Run npm run build first.");
const pages = all(dist).filter((p) => p.endsWith(".html") && !p.includes("/admin/"));
let checked = 0;
for (const file of pages) {
  const raw = readFileSync(file, "utf8"), dom = parse(raw), name = relative(dist, file);
  if (find(dom, "meta").some((n) => attr(n, "http-equiv").toLowerCase() === "refresh")) continue;
  checked++;
  const visible = text(dom);
  const metadata = find(dom,"meta").map((n)=>attr(n,"content")).join(" ");
  check(!/\b(?:Velolev|PoleLift)\b/i.test(visible + metadata), `${name}: legacy identity`);
  check(!/[$€£¥]|\b(?:USD|EUR|CNY|IDR|BRL)\b|ดอลลาร์|đô\s*la/i.test(visible + metadata), `${name}: public monetary amount`);
  check(!/\b(?:in stock|out of stock|inventory)\b|en stock|em estoque|tồn kho|stok tersedia|สินค้าคงคลัง/i.test(visible + metadata), `${name}: public stock status`);
  check(!/sales@(?:polelift|velolev)|\+86\s*21\s*1234|Shanghai Pilot Free Trade Zone/i.test(visible), `${name}: unconfigured legacy contact`);
  check(!/~?98\s*kg|ISPM[ -]?15|fumigated|Zero heavy crane permits|Zero pavement cracking|50\+ lifts per charge/i.test(visible), `${name}: unregistered logistics, permission or unqualified performance claim`);
  check(!/500\s*\+|2015\s*[–-]\s*2018|±\s*0[.,]5|24h\s*(?:Zero|Pressure)|100%\s*(?:Full Stroke|bench-tested)/i.test(visible), `${name}: unregistered corporate history, capacity or completed-testing claim`);
  check(find(dom,"meta").some((n)=>attr(n,"name")==="robots" && attr(n,"content").includes("noindex")),`${name}: missing preview noindex`);
  check(!find(dom,"link").some((n)=>attr(n,"rel")==="canonical"),`${name}: unapproved public domain canonical`);
  for (const n of find(dom, "script").filter((n)=>attr(n,"type")==="application/ld+json")) {
    try {
      const value = JSON.parse((n.childNodes ?? []).map((x)=>x.value ?? "").join(""));
      const serialized = JSON.stringify(value);
      check(!/"(?:offers|price|priceCurrency|availability|aggregateRating|review)"/.test(serialized), `${name}: forbidden commercial/evidence schema`);
      check(!/VideoObject|velolev\.com|polelift\.com/i.test(serialized),`${name}: unapproved media/domain schema`);
    } catch (e) { failures.push(`${name}: invalid JSON-LD: ${e.message}`); }
  }
}
for (const locale of ["en","es","fr","pt","vi","th","id"]) {
  const prefix = locale === "en" ? "" : locale;
  const product = readFileSync(join(dist,prefix,locale==="en"?"products/light-pole-jack/index.html":"equipment/index.html"),"utf8");
  const dom = parse(product);
  const sections = find(dom,"section").filter((n)=>attr(n,"data-source-id")==="S4");
  check(sections.length===1,`${locale}: missing source-derived product facts`);
  const unified=locale==="en"||industrialLocales.includes(locale);
  const facts = unified?text(dom):text(sections[0] ?? {childNodes:[]});
  for (const v of ["12 m","300 kg","24 V","85 kg","610 × 220 × 220 mm","500 × 300 × 250 mm","650 × 350 × 500 mm","M24","20 s",">50",">3000"]) check(facts.includes(v),`${locale}: missing source fact ${v}`);
  check(unified?facts.includes(translateText("Field validation pending.",locale))&&facts.includes(translateText("Manufacturer-reported.",locale)):facts.includes(copyFor(locale).performance),`${locale}: manufacturer/performance boundary absent`);
  const quoteHtml=readFileSync(join(dist,prefix,locale==="en"?"quote/index.html":"pricing-plan/index.html"),"utf8");
  const quote = text(parse(quoteHtml));
  check(unified?quoteHtml.includes("data-inquiry-form"):quote.includes(copyFor(locale).commercial),`${locale}: B2B quotation policy absent`);
  check(!existsSync(join(dist,prefix,"blog/a874y2ak/index.html")),`${locale}: public placeholder article exists`);
}
const builtVersion=verifyBuiltVersion(root,dist);
const robots = readFileSync(join(dist,"robots.txt"),"utf8");
check(robots.includes("Disallow: /") && !robots.includes("Sitemap:"),"preview robots/domain configuration");
check(!all(dist).some((f)=>/sitemap.*\.xml$/.test(f)),"unapproved sitemap exists");
const sourceFiles = [...all(join(root,"src")), ...all(join(root,"scripts")), ...all(join(root,"server")), join(root,"astro.config.mjs"), join(root,"package.json"), join(root,"package-lock.json")].sort();
const digest = createHash("sha256");
for (const file of sourceFiles) digest.update(relative(root,file)).update("\0").update(readFileSync(file)).update("\0");
const report = {assetDigest:builtVersion.assetDigest,date:"2026-10-28",baselineVersion:baseline.version,sourceDigest:digest.digest("hex"),sourceFiles:sourceFiles.length,publicHtmlChecked:checked,locales:7,failures,passed:failures.length===0,scope:"built HTML, metadata, JSON-LD, source-derived facts, B2B commercial policy, preview configuration"};
writeFileSync(join(root,"../docs/content-strategy/build-verification.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
if(failures.length) process.exitCode=1;
