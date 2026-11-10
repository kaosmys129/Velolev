import {sourceFingerprint,referenceAssetFingerprint,verifyBuiltVersion} from "./lib/source-fingerprint.mjs";
import {readFileSync,writeFileSync,existsSync,readdirSync} from "node:fs";import {join,resolve} from "node:path";import {fileURLToPath} from "node:url";import {parse} from "parse5";
import {corePages,coreAlternates} from "../src/lib/site-config.mjs";import aliases from "../src/data/route-aliases.json" with {type:"json"};import baseline from "../src/data/content-baseline.json" with {type:"json"};
const root=fileURLToPath(new URL("../",import.meta.url));
const configuredArg=process.argv.find(a=>a.startsWith("--configured=")||a.startsWith("--production="));
const argVal=configuredArg?configuredArg.split("=")[1]:null;
const fixture=process.argv.find(a=>a.startsWith("--snapshot="))?.slice(11);
const buildMetaPath=join(root,"dist",".volvet-build.json");
const buildMeta=existsSync(buildMetaPath)?JSON.parse(readFileSync(buildMetaPath,"utf8")):null;

let isFixture=false;
let origin=null;
let dist=resolve(fixture||join(root,"dist"));

function sanitizeOrigin(raw){
  if(!raw||typeof raw!=="string")return null;
  const trimmed=raw.trim().replace(/\/+$/, "");
  return trimmed.length>0?trimmed:null;
}

if(argVal&&(existsSync(argVal)||argVal.startsWith("/")||argVal.startsWith("."))){
  dist=resolve(argVal);
  origin="https://example.test";
  isFixture=true;
}else{
  const rawOrigin=process.env.PUBLIC_SITE_URL||
    (argVal&&/^https?:\/\//.test(argVal)?argVal:null)||
    (process.argv.includes("--configured")||process.argv.includes("--production")?(buildMeta?.origin||"https://volvet.com"):null)||
    (buildMeta?.origin&&!/\.invalid$/.test(buildMeta.origin)?buildMeta.origin:null);
  origin=sanitizeOrigin(rawOrigin);
}

const isConfigured=Boolean(origin);
const failures=[],checks=[];
const all=(n,tag)=>[...(n.tagName===tag?[n]:[]),...(n.childNodes??[]).flatMap(c=>all(c,tag))];const attr=(n,k)=>n?.attrs?.find(a=>a.name===k)?.value??"";const text=n=>["script","style"].includes(n.tagName)?"":n.nodeName==="#text"?n.value:(n.childNodes??[]).map(text).join(" ");const check=(v,name)=>{checks.push({name,passed:Boolean(v)});if(!v)failures.push(name);};const fileFor=p=>join(dist,p,"index.html");
const builtVersion=verifyBuiltVersion(root,dist);
const titles=[];
for(const [key,page] of Object.entries(corePages)){
 check(existsSync(fileFor(page.path)),`${key}: implemented`);if(!existsSync(fileFor(page.path)))continue;const raw=readFileSync(fileFor(page.path),"utf8"),dom=parse(raw);const title=all(dom,"title").map(text).join("");titles.push(title);check(title===page.title,`${key}: own title`);check(all(dom,"h1").length===1,`${key}: unique heading`);check(text(dom).length>600,`${key}: meaningful authored body`);
 for(const n of all(dom,"a")){const href=attr(n,"href");if(href.startsWith("/")&&!href.startsWith("//")){const p=new URL(href,"http://local.test").pathname;check(Boolean(aliases[p])||existsSync(fileFor(p))||existsSync(join(dist,p)),`${key}: linked resource ${p}`);}}
 const can=all(dom,"link").filter(n=>attr(n,"rel")==="canonical");check(isConfigured?can.length===1&&attr(can[0],"href")===`${origin}${page.path}`:can.length===0,`${key}: canonical mode`);
 check(!/"(?:offers|price|availability|aggregateRating|review)"\s*:/.test(raw),`${key}: commercial and evidence schema boundary`);
 if(isConfigured){for(const v of coreAlternates(key)){const d=parse(readFileSync(fileFor(v.path),"utf8"));for(const o of coreAlternates(key))check(all(d,"link").some(n=>attr(n,"hreflang")===o.lang&&attr(n,"href")===`${origin}${o.path}`),`${key}/${v.lang}: reciprocal ${o.lang}`);}}
}
check(new Set(titles).size===17,"seventeen distinct core titles");
const s=JSON.parse(readFileSync(join(dist,"resources/volvet-specifications.json"),"utf8"));check(s.baselineVersion===baseline.version&&s.specifications.ratedLoadKg===300,"download: actual current source data");check(s.fieldValidation==="pending"&&!s.standardConfiguration.anchorBoltSizesIncluded.includes("M24"),"download: evidence and included configuration boundaries");
for(const name of ["volvet-specifications.csv","project-information-worksheet.csv"])check(readFileSync(join(dist,"resources",name),"utf8").length>200,`download: ${name} exists and substantive`);
for(const lang of ["en","es","fr","pt","vi","th","id"]){const path=lang==="en"?"/about-us/":`/${lang}/about-us/`;const raw=readFileSync(fileFor(path),"utf8"),doc=parse(raw),body=text(doc);check(raw.includes('data-about-source="S4"')&&raw.includes('data-corporate-evidence="pending"')&&raw.includes('data-field-validation="pending"'),`${lang}: about source and pending evidence explicit`);check(!/500\s*\+|2015|2018|±\s*0[.,]5|24h|100%/.test(body),`${lang}: no unverified capacity, history or test claims`);check(!/equipment-engineering-drawing-raw|manufacturer-spec-sheet-raw/.test(raw),`${lang}: reference images are not used as factory or testing proof`);}
const roi=readFileSync(fileFor(corePages.roi.path),"utf8");check(!/<input[^>]+name="(?:investment|craneDaily|craneFixed)"[^>]+value="[^"]+"/.test(roi),"calculator: no default public price");check(!roi.includes("preset-strip")&&!roi.includes("REGIONAL_PRESETS"),"calculator: regional currency/amount presets removed");check(roi.includes("No resale value")&&roi.includes("Zero project volume"),"calculator: scope and edge conditions visible");
if(isConfigured){const sitemap=readFileSync(join(dist,"sitemap-0.xml"),"utf8");for(const p of Object.values(corePages))check(sitemap.includes(`<loc>${origin}${p.path}</loc>`),`sitemap: ${p.path}`);for(const alias of Object.keys(aliases))check(!sitemap.includes(`<loc>${origin}${alias}</loc>`),`sitemap: exclude ${alias}`);}
if(fixture){const path="/guides/controlled-review-fixture/",raw=readFileSync(fileFor(path),"utf8");check(raw.includes("Prepare the project record")&&raw.includes("Keep the evidence separate"),"snapshot: reviewed body statically rendered offline");check(!raw.includes("Loading article")&&!raw.includes("18080/api"),"snapshot: no live GEOFlow dependency or placeholder");check(readFileSync(fileFor("/guides/"),"utf8").includes(path),"snapshot: article discoverable from index");}
check(sourceFingerprint(root)===builtVersion.sourceDigest&&referenceAssetFingerprint(root)===builtVersion.assetDigest,"source and media unchanged during verification");
const mode=isConfigured?(isFixture?"configured-origin-fixture":"configured-origin-production"):(fixture?"offline-snapshot-fixture":"pending-domain-preview");
const report={sourceDigest:builtVersion.sourceDigest,assetDigest:builtVersion.assetDigest,date:"2026-10-28",stage:"D31-D60",mode,passed:!failures.length,checks,failures};
const filename=isConfigured?"configured-metadata-d60-verification.json":(fixture?"snapshot-d60-verification.json":"content-d60-verification.json");
writeFileSync(join(root,"../docs/content-strategy",filename),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({mode:report.mode,passed:report.passed,checks:checks.length,failures},null,2));
if(failures.length)process.exitCode=1;
