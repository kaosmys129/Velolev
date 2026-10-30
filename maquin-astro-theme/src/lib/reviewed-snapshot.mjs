import {readFileSync,writeFileSync,renameSync,unlinkSync} from "node:fs";
import {createHash,randomUUID} from "node:crypto";
import {fileURLToPath} from "node:url";
import baseline from "../data/content-baseline.json" with {type:"json"};
import publishedSnapshot from "../data/published-content.json" with {type:"json"};
import {corePages} from "./site-config.mjs";
const defaultFile=fileURLToPath(new URL("../data/published-content.json",import.meta.url));
const allowedPaths=new Set(Object.values(corePages).map(p=>p.path));
const reserved=new Set(["index","pole-jack-compatibility","install-light-pole-without-crane","admin","quote","resources"]);
const plain=(s,min,max)=>typeof s==="string"&&s.trim().length>=min&&s.length<=max&&!/[<>\u0000-\u0008]/.test(s);
export function articleContentHash(a){return createHash("sha256").update(JSON.stringify({slug:a.slug,title:a.title,description:a.description,sections:a.sections,relatedPaths:a.relatedPaths,evidenceRefs:a.evidenceRefs})).digest("hex");}
export function validateSnapshot(snapshot){
 if(!snapshot||snapshot.schemaVersion!==1||snapshot.baselineVersion!==baseline.version||!Array.isArray(snapshot.articles)||snapshot.articles.length>100)throw new Error("Snapshot schema, baseline version or article collection is invalid.");
 const seen=new Set();
 for(const a of snapshot.articles){
  if(a.locale!=="en"||a.status!=="published"||typeof a.slug!=="string"||a.slug.length>80||! /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)||!/[a-z]/.test(a.slug)||reserved.has(a.slug)||seen.has(a.slug))throw new Error("Article locale, status, slug or uniqueness is invalid.");seen.add(a.slug);
  if(!plain(a.title,10,180)||!plain(a.description,40,400)||!Array.isArray(a.sections)||a.sections.length<2||a.sections.length>30)throw new Error("Article title, description or sections are invalid.");
  for(const s of a.sections){if(!plain(s.heading,3,160)||!Array.isArray(s.paragraphs)||!s.paragraphs.length||s.paragraphs.length>20||!s.paragraphs.every(p=>plain(p,30,5000)))throw new Error("Only substantive plain-text sections are accepted; raw HTML is not supported.");}
  const body=[a.title,a.description,...a.sections.flatMap(s=>[s.heading,...s.paragraphs])].join(" ");
  if(body.length<500||/\b(?:Velolev|PoleLift)\b|[$€£¥]|\b(?:in stock|out of stock|CE certified|ISO certified|guaranteed payback|one-person operation)\b/i.test(body)||/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(body))throw new Error("Article violates the content baseline or contains unreviewed contact information.");
  if(!Array.isArray(a.relatedPaths)||!a.relatedPaths.length||!a.relatedPaths.every(p=>allowedPaths.has(p)))throw new Error("Related pages must be existing approved core routes.");
  if(!Array.isArray(a.evidenceRefs)||!a.evidenceRefs.length||!a.evidenceRefs.every(r=>/^F0(?:0[1-9]|[12][0-9]|3[01])$/.test(r)))throw new Error("Evidence references must use the current fact register.");
  const r=a.review;if(!r||r.status!=="approved"||r.baselineVersion!==baseline.version||!plain(r.reviewer,2,120)||!/^\d{4}-\d{2}-\d{2}$/.test(r.reviewedAt)||r.contentSha256!==articleContentHash(a))throw new Error("A current, named review with an unchanged content hash is required.");
 }
 return snapshot;
}
export function loadPublishedSnapshot(){const snapshot=validateSnapshot(process.env.CONTENT_SNAPSHOT_FILE?JSON.parse(readFileSync(process.env.CONTENT_SNAPSHOT_FILE,"utf8")):structuredClone(publishedSnapshot));if(snapshot.testOnly&&process.env.PUBLIC_SITE_URL)throw new Error("Test snapshots cannot be built with a public origin.");return snapshot;}
export function importReviewedSnapshot(inputFile,{apply=false,outputFile=defaultFile}={}){
 const snapshot=validateSnapshot(JSON.parse(readFileSync(inputFile,"utf8")));
 if(apply&&snapshot.testOnly&&outputFile===defaultFile)throw new Error("Test fixtures cannot replace the publication snapshot.");
 if(apply){const temporary=outputFile+"."+randomUUID()+".tmp";try{writeFileSync(temporary,JSON.stringify(snapshot,null,2)+"\n",{flag:"wx",mode:0o644});renameSync(temporary,outputFile);}finally{try{unlinkSync(temporary);}catch{}}}
 return {valid:true,applied:apply,articles:snapshot.articles.length,baselineVersion:snapshot.baselineVersion};
}
