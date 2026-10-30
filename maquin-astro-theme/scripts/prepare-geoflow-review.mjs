import {readFileSync,writeFileSync} from "node:fs";
import {parseFragment} from "parse5";
import baseline from "../src/data/content-baseline.json" with {type:"json"};
import {articleContentHash} from "../src/lib/reviewed-snapshot.mjs";
const input=process.argv.find(a=>a.startsWith("--input="))?.slice(8),output=process.argv.find(a=>a.startsWith("--output="))?.slice(9);
if(!input||!output){console.error("Usage: npm run content:prepare -- --input=/private/geoflow-export.json --output=/private/review-candidates.json. Never approves or publishes.");process.exitCode=1;}else try{
 const data=JSON.parse(readFileSync(input,"utf8")),items=Array.isArray(data)?data:data.data;
 if(!Array.isArray(items))throw new Error("Expected an exported GEOFlow article array or a data array.");
 const text=n=>["script","style","iframe"].includes(n.tagName)?"":n.nodeName==="#text"?n.value:(n.childNodes??[]).map(text).join(" ");
 const articles=items.map(item=>{if(typeof item.slug!=="string"||!item.slug||!item.title||!item.content_html)throw new Error("Every candidate needs a source slug, title and body; no fallback slug is generated.");const dom=parseFragment(item.content_html),sections=[];let current=null;for(const n of dom.childNodes??[]){if(["h2","h3"].includes(n.tagName)){current={heading:text(n).trim(),paragraphs:[]};sections.push(current);}else{const p=text(n).replace(/\s+/g," ").trim();if(p){if(!current){current={heading:"Project context",paragraphs:[]};sections.push(current);}current.paragraphs.push(p);}}}const a={slug:item.slug,locale:"en",status:"draft",title:item.title,description:item.meta_description??item.excerpt??"",sections,relatedPaths:["/guides/pole-jack-compatibility/"],evidenceRefs:[],review:{status:"pending",reviewer:null,reviewedAt:null,baselineVersion:baseline.version,contentSha256:""},source:{system:"GEOFlow",originalStatus:item.status??null,originalReviewStatus:item.review_status??null}};a.review.contentSha256=articleContentHash(a);return a;});
 writeFileSync(output,JSON.stringify({schemaVersion:1,baselineVersion:baseline.version,articles},null,2)+"\n",{flag:"wx",mode:0o600});console.log(JSON.stringify({candidates:articles.length,reviewStatus:"pending",published:false}));
}catch(error){console.error("Preparation rejected: "+error.message);process.exitCode=1;}
