import {readFileSync,existsSync,writeFileSync} from "node:fs";
import {join,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {parse} from "parse5";
import {corePages,coreAlternates} from "../src/lib/site-config.mjs";
import aliases from "../src/data/route-aliases.json" with {type:"json"};
const root=fileURLToPath(new URL("../",import.meta.url));
const configuredArg = process.argv.find(x => x.startsWith("--configured=") || x.startsWith("--production="));
const argVal = configuredArg ? configuredArg.split("=")[1] : null;
const buildMetaPath = join(root, "dist", ".volvet-build.json");
const buildMeta = existsSync(buildMetaPath) ? JSON.parse(readFileSync(buildMetaPath, "utf8")) : null;

let isFixture = false;
let origin = null;
let dist = join(root, "dist");

function sanitizeOrigin(raw) {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim().replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : null;
}

if (argVal && (existsSync(argVal) || argVal.startsWith("/") || argVal.startsWith("."))) {
  dist = resolve(argVal);
  origin = "https://example.test";
  isFixture = true;
} else {
  const rawOrigin = process.env.PUBLIC_SITE_URL ||
    (argVal && /^https?:\/\//.test(argVal) ? argVal : null) ||
    (process.argv.includes("--configured") || process.argv.includes("--production") ? (buildMeta?.origin || "https://www.velolev.org") : null) ||
    (buildMeta?.origin && !/\.invalid$/.test(buildMeta.origin) ? buildMeta.origin : null);
  origin = sanitizeOrigin(rawOrigin);
}

const isConfigured = Boolean(origin);
const checks = [], failures = [];
const find=(n,tag)=>[...(n.tagName===tag?[n]:[]),...(n.childNodes??[]).flatMap(c=>find(c,tag))];
const every=(n)=>[n,...(n.childNodes??[]).flatMap(every)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value??"";
const text=n=>["script","style"].includes(n.tagName)?"":n.nodeName==="#text"?n.value:(n.childNodes??[]).map(text).join(" ");
const fileFor=path=>join(dist,path,"index.html");
const check=(ok,name)=>{checks.push({name,passed:Boolean(ok)});if(!ok)failures.push(name);};
const legacyKeys=["home","product","compatibility","quote","contact","privacy","terms","editorial"];
const selectedPages=Object.fromEntries(Object.entries(corePages).filter(([key])=>legacyKeys.includes(key)));
const titles=new Set();
for(const [key,page]of Object.entries(selectedPages)){
 const file=fileFor(page.path);check(existsSync(file),`${key}: built page exists`);if(!existsSync(file))continue;
 const raw=readFileSync(file,"utf8"),dom=parse(raw),title=find(dom,"title").map(text).join("");
 check(title===page.title,`${key}: exact page metadata title`);titles.add(title);check(find(dom,"h1").length===1,`${key}: unique main heading`);
 check(text(dom).trim().length>400,`${key}: substantive authored content`);
 const canonical=find(dom,"link").filter(n=>attr(n,"rel")==="canonical");
 check(isConfigured?canonical.length===1&&attr(canonical[0],"href")===`${origin}${page.path}`:canonical.length===0,`${key}: canonical configuration`);
 check(!/"(?:offers|price|availability|aggregateRating)"\s*:/.test(raw),`${key}: no public commercial or invented evidence schema`);
 for(const a of find(dom,"a")){
  const href=attr(a,"href");if(!href||!href.startsWith("/")||href.startsWith("//"))continue;
  const path=new URL(href,"http://local.test").pathname;
  check(Boolean(aliases[path])||existsSync(fileFor(path))||existsSync(join(dist,path)),`${key}: local link ${path}`);
 }
}
check(titles.size===8,"eight distinct core titles");
if(isConfigured){
 const sitemap=readFileSync(join(dist,"sitemap-0.xml"),"utf8");
 for(const [key]of Object.entries(selectedPages)){
  for(const variant of coreAlternates(key)){
   const doc=parse(readFileSync(fileFor(variant.path),"utf8"));const canon=find(doc,"link").find(n=>attr(n,"rel")==="canonical");
   check(attr(canon,"href")===`${origin}${variant.path}`,`${key}/${variant.lang}: self canonical`);
   const links=find(doc,"link").filter(n=>attr(n,"hreflang"));
   for(const other of coreAlternates(key))check(links.some(n=>attr(n,"hreflang")===other.lang&&attr(n,"href")===`${origin}${other.path}`),`${key}/${variant.lang}: reciprocal ${other.lang}`);
   check(!links.some(n=>Object.keys(aliases).some(alias=>attr(n,"href")===`${origin}${alias}`)),`${key}/${variant.lang}: no alias hreflang`);
   check(sitemap.includes(`${origin}${variant.path}`),`${key}/${variant.lang}: sitemap has canonical page`);
  }
 }
 for(const alias of Object.keys(aliases))check(!sitemap.includes(`<loc>${origin}${alias}</loc>`),`${alias}: alias excluded from sitemap`);
}
const report={date:"2026-10-28",stage:"D15-D30",mode:isConfigured?(isFixture?"configured-origin-fixture":"configured-origin-production"):"pending-domain-preview",checks,failures,passed:failures.length===0};
writeFileSync(join(root,`../docs/content-strategy/${isConfigured?"configured-metadata-d30":"content-d30"}-verification.json`),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({mode:report.mode,checks:checks.length,passed:report.passed,failures},null,2));if(failures.length)process.exitCode=1;
