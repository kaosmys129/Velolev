import assert from "node:assert/strict";
import {readFileSync,existsSync,statSync,writeFileSync} from "node:fs";
import {join,resolve} from "node:path";
import {verifyBuiltVersion} from "./lib/source-fingerprint.mjs";
import {languageNames,languageLabels} from "../src/lib/languages.mjs";
import aboutCopy from "../src/data/about-copy.json" with {type:"json"};
import reconstructionRows from "../src/data/reconstruction-copy.json" with {type:"json"};
import extra from "../src/data/industrial-extra-copy.json" with {type:"json"};
import {fileURLToPath} from "node:url";
import {parse} from "parse5";
import {corePages,industrialLocales,localizedPagePath,coreAlternates} from "../src/lib/site-config.mjs";
import {translateText} from "../src/lib/industrial-localization.mjs";

const root=fileURLToPath(new URL("../",import.meta.url));
const target=process.argv.find(arg=>arg.startsWith("--dist="))?.slice(7),dist=target?resolve(target):join(root,"dist");
const version=verifyBuiltVersion(root,dist);
const source=JSON.parse(readFileSync(join(root,"src/data/industrial-copy/en.json"),"utf8"));
const attrs=n=>Object.fromEntries((n.attrs??[]).map(a=>[a.name,a.value]));
const all=n=>[n,...(n.childNodes??[]).flatMap(all)];
const document=path=>parse(readFileSync(join(dist,path,"index.html"),"utf8"),{scriptingEnabled:false});
const signature=n=>["script","style","#text","#comment"].includes(n.nodeName)?"":`${n.tagName??""}:${attrs(n).class??""}[${(n.childNodes??[]).map(signature).join("")}]`;
const stylePaths=doc=>all(doc).filter(n=>n.tagName==="link"&&attrs(n).rel==="stylesheet").map(n=>attrs(n).href).sort();
const englishText=new Set(Object.values(corePages).flatMap(page=>all(document(page.path)).filter(n=>n.nodeName==="#text"&&!["script","style"].includes(n.parentNode?.tagName)).map(n=>n.value.trim().replace(/\s+/g," "))));
const failures=[],checks=[];
function check(name,run){try{run();checks.push(name);}catch(e){failures.push(`${name}: ${e.message}`);}}
for(const locale of industrialLocales){
  const copy=JSON.parse(readFileSync(join(root,`src/data/industrial-copy/${locale}.json`),"utf8"));
  const values=value=>typeof value==="string"?[value]:value&&typeof value==="object"?Object.values(value).flatMap(values):[];
  const authoredNative=new Set(values(aboutCopy[locale]));
  const intentionalSame=new Set(reconstructionRows.filter(row=>row[industrialLocales.indexOf(locale)+1]===row[0]).map(row=>row[0]));
  check(`${locale}: catalog coverage and placeholders`,()=>{
    assert.deepEqual(Object.keys(copy).sort(),[...source].sort());
    const seen=new Set();
    for(const row of reconstructionRows){
      assert.equal(row.length,industrialLocales.length+1,row[0]);assert.ok(!seen.has(row[0]),`Duplicate reconstruction key: ${row[0]}`);seen.add(row[0]);
      const translated=row[industrialLocales.indexOf(locale)+1];
      assert.ok(typeof translated==='string'&&translated.trim(),`Missing reconstruction translation: ${row[0]}`);
      assert.deepEqual(translated.match(/\{\w+\}/g)??[],row[0].match(/\{\w+\}/g)??[],row[0]);
    }

    for(const key of source){assert.ok(typeof copy[key]==="string"&&copy[key].trim());assert.deepEqual(copy[key].match(/\{\w+\}/g)??[],key.match(/\{\w+\}/g)??[],key);}
  });
  for(const [key,meta] of Object.entries(corePages)){
    const path=localizedPagePath(key,locale),doc=document(path),nodes=all(doc),main=nodes.find(n=>n.tagName==="main"),english=document(meta.path);
    check(`${path}: shared page structure`,()=>assert.equal(signature(main),signature(all(english).find(n=>n.tagName==="main"))));
    check(`${path}: shared shell and locale`,()=>{
      assert.equal(attrs(nodes.find(n=>n.tagName==="html")).lang,locale);
      for(const tag of ["header","footer"])assert.equal(signature(nodes.find(n=>n.tagName===tag)),signature(all(english).find(n=>n.tagName===tag)));
      assert.equal(nodes.filter(n=>n.tagName==="h1").length,1);
    });
    check(`${path}: local pages and assets exist`,()=>{
      for(const n of nodes){const a=attrs(n);for(const url of [a.href,a.src,a.poster].filter(Boolean)){
        if(!url.startsWith("/")||url.startsWith("//"))continue;
        const clean=url.split(/[?#]/)[0];
        assert.ok(existsSync(join(dist,clean))||existsSync(join(dist,clean,"index.html")),`Missing ${url}`);
      }}
    });
    check(`${path}: translated display attributes`,()=>{
      const englishNodes=all(english);
      for(const name of ['alt','aria-label','title','placeholder','data-caption','data-label','data-alt','data-enlarge-template','data-ready-template']){
        const englishValues=new Set(englishNodes.map(n=>attrs(n)[name]).filter(Boolean));
        for(const n of nodes){const value=attrs(n)[name];if(!value||!/[A-Za-z]{3}/.test(value)||!englishValues.has(value)||authoredNative.has(value)||value==='velolev'||value==='volvet')continue;
          if(copy[value]!==value&&extra[locale][value]!==value&&!intentionalSame.has(value)&&![...Object.values(languageNames),...Object.values(languageLabels[locale])].includes(value))assert.fail(`Untranslated ${name}: ${value}`);
          // Language picker names are explicitly authored in the language UI.
          if(name==='aria-label'&&/^(Choose language|Choose language:)/.test(value))assert.fail(`English language picker: ${value}`);
        }
      }
    });
    check(`${path}: lightweight local assets`,()=>{
      const assets=nodes.flatMap(n=>{const a=attrs(n);return n.tagName==="script"&&a.src?[a.src]:n.tagName==="link"&&a.rel==="stylesheet"?[a.href]:[];});
      assert.ok(assets.every(url=>url.startsWith("/_astro/")),"External runtime dependency");
      assert.ok(!assets.some(url=>/jquery|elementor|translate|localization/i.test(url)),"Legacy or translation runtime");
      assert.ok(stylePaths(doc).reduce((sum,path)=>sum+statSync(join(dist,path)).size,0)<65000,"CSS exceeds 65 kB budget");
      if(key==="home")assert.deepEqual(stylePaths(doc),stylePaths(english),"Homepage must load the same styles as English");
      for(const video of nodes.filter(n=>n.tagName==="video"))assert.equal(attrs(video).preload,"none");
    });
    check(`${path}: localized content and metadata`,()=>{
      const title=nodes.find(n=>n.tagName==="title")?.childNodes?.[0]?.value;
      assert.ok(title&&!/Project inquiry|Project Quotation/.test(title));
      for(const n of nodes){if(n.nodeName!=="#text"||["script","style"].includes(n.parentNode?.tagName))continue;const value=n.value.trim().replace(/\s+/g," ");if([...Object.values(languageNames),...Object.values(languageLabels[locale]),"velolev","© 2026 velolev","volvet","© 2026 volvet"].includes(value))continue;
        if(englishText.has(value)&&/[A-Za-z]{3}/.test(value)&&copy[value]!==value&&extra[locale][value]!==value&&!authoredNative.has(value))assert.fail(`Untranslated text: ${value}`);}
      if(key==="product"){const visible=nodes.filter(n=>n.nodeName==="#text"&&!["script","style"].includes(n.parentNode?.tagName)).map(n=>n.value).join(" ");for(const token of ["300 kg","24 V","85 kg","M24",">50",">3000"])assert.ok(visible.includes(token),token);}
    });
  }
}
for(const key of Object.keys(corePages))check(`${key}: alternates resolve`,()=>{for(const a of coreAlternates(key))assert.ok(existsSync(join(dist,a.path,"index.html")),a.path);});
const report={sourceDigest:version.sourceDigest,assetDigest:version.assetDigest,origin:version.origin,locales:industrialLocales,passed:failures.length===0,pages:Object.keys(corePages).length*industrialLocales.length,checks:checks.length,failures};
writeFileSync(join(root,`qa-reports/industrial-locales${version.origin?"-configured":target&&resolve(target)!==join(root,"dist")?"-custom":""}.json`),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exitCode=1;
