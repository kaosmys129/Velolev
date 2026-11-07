import {readFileSync,writeFileSync} from "node:fs";
import {parseFragment} from "parse5";
import baseline from "../src/data/content-baseline.json" with {type:"json"};
import {articleContentHash} from "../src/lib/reviewed-snapshot.mjs";
import {corePages} from "../src/lib/site-config.mjs";

const input=process.argv.find(a=>a.startsWith("--input="))?.slice(8),output=process.argv.find(a=>a.startsWith("--output="))?.slice(9);
if(!input||!output){console.error("Usage: npm run content:prepare -- --input=/private/geoflow-export.json --output=/private/review-candidates.json. Never approves or publishes.");process.exitCode=1;}else try{
 const data=JSON.parse(readFileSync(input,"utf8")),items=Array.isArray(data)?data:(data.data??data.articles);
 if(!Array.isArray(items))throw new Error("Expected an exported GEOFlow article array or a data array.");
 const text=n=>["script","style","iframe"].includes(n.tagName)?"":n.nodeName==="#text"?n.value:(n.childNodes??[]).map(text).join(" ");
 const allowedPaths=new Set(Object.values(corePages).map(p=>p.path));

 function extractEvidenceRefs(rawText) {
  const refs=new Set();
  if(/\b300\s*kg\b/i.test(rawText)) refs.add("F002");
  if(/\b12\s*m(?:eters?)?\b/i.test(rawText)) refs.add("F003");
  if(/\b24\s*V\b/i.test(rawText)) refs.add("F004");
  if(/\b85\s*kg\b/i.test(rawText)) refs.add("F008");
  if(/(?:180\s*(?:mm)?\s*(?:[-–—]|to)\s*260\s*mm|\bp\.?c\.?d\.?)/i.test(rawText)) refs.add("F015");
  if(/\bM16|M18|M20|M22|M24\b/i.test(rawText)) refs.add("F016");
  if(/\b(?:two-module|split module|two-person|two workers)\b/i.test(rawText)) refs.add("F001");
  if(/\b(?:vertical test rig|pre-shipment|hydraulic pressure hold)\b/i.test(rawText)) refs.add("F020");
  if(/\b(?:crane access permits?|overhead power|narrow access)\b/i.test(rawText)) refs.add("F010");
  return Array.from(refs).sort();
 }

 function extractRelatedPaths(rawText) {
  const paths=new Set();
  for(const p of allowedPaths){
   if(rawText.includes(p)) paths.add(p);
  }
  if(paths.size===0) paths.add("/guides/pole-jack-compatibility/");
  return Array.from(paths);
 }

 const articles=items.map(item=>{
  if(typeof item.slug!=="string"||!item.slug||!item.title||!(item.content_html||item.content))throw new Error("Every candidate needs a source slug, title and body; no fallback slug is generated.");
  const htmlContent = item.content_html || item.content;
  const dom=parseFragment(htmlContent);
  let sections=[];
  let current=null;
  for(const n of dom.childNodes??[]){
   if(["h2","h3"].includes(n.tagName)){
    current={heading:text(n).trim(),paragraphs:[]};
    sections.push(current);
   }else{
    const p=text(n).replace(/\s+/g," ").trim();
    if(p){
     if(!current){current={heading:"Project context",paragraphs:[]};sections.push(current);}
     current.paragraphs.push(p);
    }
   }
  }

  if (sections.length <= 1 && (/^##\s+/m.test(htmlContent) || /^###\s+/m.test(htmlContent))) {
   sections = [];
   current = null;
   let curPara = [];
   const flushPara = () => {
    if (curPara.length > 0) {
     const isList = curPara.some(l => /^([-*+]|\d+\.)\s+/.test(l.trim()));
     const p = (isList ? curPara.join("\n") : curPara.join(" "))
      .replace(/[<>\u0000-\u0008]/g, "")
      .trim();
     if (p.length >= 30) {
      if (!current) current = { heading: "Overview", paragraphs: [] };
      current.paragraphs.push(p);
     }
     curPara = [];
    }
   };
   const flushSection = () => {
    flushPara();
    if (current && current.paragraphs.length > 0) {
     sections.push(current);
    }
    current = null;
   };

   const cleanContent = htmlContent.replace(/<script[\s\S]*?<\/script>/gi, "");
   for (const rawLine of cleanContent.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("---") || line.startsWith("```") || line.startsWith("|")) {
     flushPara();
     continue;
    }
    if (line.startsWith("## ") || line.startsWith("### ")) {
     flushSection();
     const heading = line.replace(/^#+\s*/, "").replace(/[<>\u0000-\u0008]/g, "").trim();
     current = { heading, paragraphs: [] };
     continue;
    }
    if (line.startsWith("# ")) {
     continue;
    }
    if (line.startsWith(">")) {
     const bq = line.replace(/^>\s*#*\s*/, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[<>\u0000-\u0008]/g, "")
      .trim();
     if (bq.length >= 30) {
      if (!current) current = { heading: "Key Takeaways", paragraphs: [] };
      current.paragraphs.push(bq);
     }
     continue;
    }
    curPara.push(line);
   }
   flushSection();
  }

  const fullText = [item.title, item.meta_description ?? "", htmlContent].join(" ");
  const relatedPaths = extractRelatedPaths(fullText);
  const evidenceRefs = extractEvidenceRefs(fullText);

  const a={
   slug:item.slug,
   locale:item.locale ?? (item.slug.match(/-([a-z]{2})$/)?.[1] ?? "en"),
   status:"draft",
   title:item.title,
   description:item.meta_description??item.excerpt??"",
   sections,
   relatedPaths,
   evidenceRefs,
   review:{
    status:"pending",
    reviewer:null,
    reviewedAt:null,
    baselineVersion:baseline.version,
    contentSha256:""
   },
   source:{
    system:"GEOFlow",
    originalStatus:item.status??null,
    originalReviewStatus:item.review_status??null
   }
  };
  a.review.contentSha256=articleContentHash(a);
  return a;
 });

 writeFileSync(output,JSON.stringify({schemaVersion:1,baselineVersion:baseline.version,articles},null,2)+"\n",{flag:"wx",mode:0o600});
 console.log(JSON.stringify({candidates:articles.length,reviewStatus:"pending",published:false}));
}catch(error){console.error("Preparation rejected: "+error.message);process.exitCode=1;}
