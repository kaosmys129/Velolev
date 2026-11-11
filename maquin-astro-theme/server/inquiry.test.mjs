import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,rmSync,writeFileSync,statSync,mkdirSync,realpathSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {randomUUID} from "node:crypto";
import {once} from "node:events";
import {InquiryStore} from "./inquiry-store.mjs";
import {validateInquiry,validateAttachment} from "./inquiry-validation.mjs";
import {createInquiryServer,assertPrivateDirectory} from "./inquiry-server.mjs";
import {canonicalUrl,publicOrigin,coreAlternates} from "../src/lib/site-config.mjs";
const token="local-unit-tests-only-0123456789-0123456789";
const payload=()=>({name:"Controlled test",email:"test@example.test",phone:"",country:"Test destination",consent:true,quantity:"2",poleHeight:"12",poleWeight:"250",locale:"en",sourcePage:"/quote/",application:"street-lighting",message:"TEST ONLY — not a sales lead"});
const pdf=Buffer.from("%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF");
function workspace(t){const dir=mkdtempSync(join(tmpdir(),"velolev-inquiry-test-"));t.after(()=>rmSync(dir,{recursive:true,force:true}));return dir;}
async function app(t,options={}){const dir=workspace(t),dist=join(dir,"public");mkdirSync(dist);writeFileSync(join(dist,"index.html"),"public test page");writeFileSync(join(dist,"404.html"),"not found");const created=createInquiryServer({directory:join(dir,"private"),dist,adminToken:token,testMode:true,logger:{error(){}},...options});created.server.listen(0,"127.0.0.1");await once(created.server,"listening");t.after(async()=>{created.server.close();await once(created.server,"close");});return {...created,url:`http://127.0.0.1:${created.server.address().port}`};}
const post=(url,data=payload(),key=randomUUID(),headers={})=>fetch(url+"/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":key,...headers},body:JSON.stringify(data)});
const admin=(url,path,init={})=>fetch(url+path,{...init,headers:{Authorization:`Bearer ${token}`,...init.headers}});

test("video files support native seeking and caption tracks use their media content types",async t=>{
 const dist=realpathSync(workspace(t)),video=Buffer.from("0123456789abcdef");
 writeFileSync(join(dist,"overview.mp4"),video);writeFileSync(join(dist,"overview.vtt"),"WEBVTT\n\n00:00.000 --> 00:06.000\nEquipment reference\n");
 const {url}=await app(t,{dist});
 const full=await fetch(url+"/overview.mp4");assert.equal(full.headers.get("content-type"),"video/mp4");assert.equal(full.headers.get("accept-ranges"),"bytes");assert.deepEqual(Buffer.from(await full.arrayBuffer()),video);
 const partial=await fetch(url+"/overview.mp4",{headers:{Range:"bytes=2-5"}});assert.equal(partial.status,206);assert.equal(partial.headers.get("content-range"),"bytes 2-5/16");assert.equal(partial.headers.get("content-length"),"4");assert.equal(await partial.text(),"2345");
 const suffix=await fetch(url+"/overview.mp4",{headers:{Range:"bytes=-4"}});assert.equal(suffix.status,206);assert.equal(await suffix.text(),"cdef");
 const tail=await fetch(url+"/overview.mp4",{headers:{Range:"bytes=12-"}});assert.equal(tail.status,206);assert.equal(await tail.text(),"cdef");
 for(const range of ["bytes=99-100","bytes=7-2","bytes=-0","bytes=0-1,4-5","bytes=-"]){const invalid=await fetch(url+"/overview.mp4",{headers:{Range:range}});assert.equal(invalid.status,416);assert.equal(invalid.headers.get("content-range"),"bytes */16");assert.equal(await invalid.text(),"");}
 const head=await fetch(url+"/overview.mp4",{method:"HEAD"});assert.equal(head.headers.get("content-length"),"16");assert.equal(await head.text(),"");
 const captions=await fetch(url+"/overview.vtt");assert.match(captions.headers.get("content-type"),/^text\/vtt/);assert.match(await captions.text(),/^WEBVTT/);
});

test("required contact, consent and numeric fields are validated without inventing unknown dimensions",()=>{
 const p=payload();delete p.poleHeight;delete p.poleWeight;assert.equal(validateInquiry(p).poleHeight,"");
 assert.throws(()=>validateInquiry({...p,email:"",phone:""}),e=>e.status===422&&Boolean(e.fields.email));
 assert.throws(()=>validateInquiry({...p,consent:false}),e=>Boolean(e.fields.consent));
 assert.throws(()=>validateInquiry({...p,quantity:"-1"}),e=>Boolean(e.fields.quantity));
 assert.throws(()=>validateInquiry({...p,poleWeight:"NaN"}),e=>Boolean(e.fields.poleWeight));
 assert.throws(()=>validateInquiry({...p,website:"bot.example"}),e=>e.status===422);
 const phoneOnly=validateInquiry({...p,email:"",phone:"+1 555 010 9999"});assert.equal(phoneOnly.email,"");
});
test("attachment type, signature, size and original filename are checked",()=>{
 const file=validateAttachment({name:"../drawing.pdf",type:"application/pdf",bytes:pdf});assert.equal(file.name,".._drawing.pdf");
 assert.throws(()=>validateAttachment({name:"x.pdf",type:"application/pdf",bytes:Buffer.from("<html>bad</html>")}),e=>e.code==="invalid_file");
 assert.throws(()=>validateAttachment({name:"x.svg",type:"image/svg+xml",bytes:Buffer.from("<svg/>")}),e=>e.status===422);
 assert.throws(()=>validateAttachment({name:"x.pdf",type:"application/pdf",bytes:Buffer.alloc(5*1024*1024+1)}),e=>e.status===413);
});
test("SQLite records and attachments survive restart; idempotency returns the original receipt",t=>{
 const dir=workspace(t),key=randomUUID(),data=validateInquiry(payload()),attachment=validateAttachment({name:"drawing.pdf",type:"application/pdf",bytes:pdf});
 let store=new InquiryStore(dir,{testMode:true});const receipt=store.save(data,attachment,key);store.close();
 store=new InquiryStore(dir,{testMode:true});t.after(()=>store.close());
 assert.equal(store.get(receipt.id).email,data.email);assert.deepEqual(Buffer.from(store.attachment(receipt.id).attachment),pdf);
 const retry=store.save(data,attachment,key);assert.equal(retry.reference,receipt.reference);assert.equal(retry.duplicate,true);
 assert.throws(()=>store.save({...data,quantity:"8"},attachment,key),e=>e.status===409);
 assert.equal(store.list({includeTests:true}).total,1);assert.equal(store.list().total,0);
 assert.equal(statSync(dir).mode&0o777,0o700);assert.equal(statSync(join(dir,"inquiries.sqlite")).mode&0o777,0o600);
});
test("inbox status and CSV export are real database operations with spreadsheet escaping",t=>{
 const store=new InquiryStore(workspace(t));t.after(()=>store.close());const receipt=store.save(validateInquiry({...payload(),name:"=FORMULA()",phone:"+1 555 010 9999"}),null,randomUUID());
 store.update(receipt.id,"in_review");assert.equal(store.get(receipt.id).status,"in_review");
 assert.throws(()=>store.update(receipt.id,"delivered"),e=>e.status===422);
 const csv=store.exportCsv();assert.ok(csv.includes("'=FORMULA()"));assert.ok(csv.includes("'+1 555"));
});
test("HTTP receipt is only returned after a persisted record is available to authorized inbox access",async t=>{
 const {url,store}=await app(t);const response=await post(url);assert.equal(response.status,201);const {receipt}=await response.json();
 assert.equal(receipt.status,"received");assert.equal(receipt.isTest,true);assert.equal(receipt.emailNotification,"not_configured");assert.equal(receipt.email,undefined);
 assert.equal(store.get(receipt.id).quantity,"2");
 const detail=await admin(url,`/api/admin/inquiries/${receipt.id}`);assert.equal(detail.status,200);assert.equal((await detail.json()).item.reference,receipt.reference);
 const unauthorized=await fetch(url+"/api/admin/inquiries");assert.equal(unauthorized.status,401);
});
test("simultaneous retries create one record, and a changed payload cannot reuse the key",async t=>{
 const {url,store}=await app(t),key=randomUUID();const responses=await Promise.all(Array.from({length:5},()=>post(url,payload(),key)));
 assert.equal(responses.filter(r=>r.status===201).length,1);const receipts=await Promise.all(responses.map(r=>r.json()));assert.equal(new Set(receipts.map(r=>r.receipt.reference)).size,1);
 assert.equal(store.list({includeTests:true}).total,1);assert.equal((await post(url,{...payload(),quantity:"9"},key)).status,409);
});
test("multipart attachment is saved and cannot be downloaded through a public URL",async t=>{
 const {url}=await app(t),form=new FormData();for(const [k,v]of Object.entries(payload()))form.set(k,String(v));form.set("attachment",new File([pdf],"drawing.pdf",{type:"application/pdf"}));
 const response=await fetch(url+"/api/inquiries",{method:"POST",headers:{"Idempotency-Key":randomUUID()},body:form});assert.equal(response.status,201);const {receipt}=await response.json();
 const path=`/api/admin/inquiries/${receipt.id}/attachment`;assert.equal((await fetch(url+path)).status,401);
 const download=await admin(url,path);assert.equal(download.status,200);assert.match(download.headers.get("content-disposition"),/^attachment;/);assert.deepEqual(Buffer.from(await download.arrayBuffer()),pdf);
 assert.equal((await fetch(url+"/.local/inquiries/inquiries.sqlite")).status,404);
});
test("cross-site origins, missing identifiers, invalid content and excess requests are rejected",async t=>{
 const {url}=await app(t,{rateLimit:2});assert.equal((await post(url,payload(),randomUUID(),{Origin:"https://unrelated.example"})).status,403);
 assert.equal((await post(url,payload(),"short")).status,400);
 const key=randomUUID();assert.equal((await post(url,payload(),key)).status,201);assert.equal((await post(url)).status,201);
 const limited=await post(url);assert.equal(limited.status,429);assert.ok(Number(limited.headers.get("retry-after"))>0);
 assert.equal((await post(url,payload(),key)).status,200);
});
test("a storage failure returns an error and never claims receipt",async t=>{
 const {url,store}=await app(t);store.close();const response=await post(url);assert.equal(response.status,503);const result=await response.json();assert.equal(result.receipt,undefined);assert.equal(result.error.code,"storage_unavailable");
});
test("legacy aliases return one permanent redirect to the finished core page",async t=>{
 const {url}=await app(t);for(const path of ["/equipment/","/equipment-detail/"]){const r=await fetch(url+path+"?utm_source=test",{redirect:"manual"});assert.equal(r.status,301);assert.equal(r.headers.get("location"),"/products/light-pole-jack/?utm_source=test");}
 assert.equal((await fetch(url+"/admin/content/")).status,404);
});
test("canonical paths and locale mappings use page URLs, including article detail paths",()=>{
 assert.equal(publicOrigin(null),null);assert.equal(canonicalUrl("/products/light-pole-jack/",null),null);
 assert.equal(canonicalUrl("/fr/blog/detail/","https://example.test"),"https://example.test/fr/blog/detail/");
 assert.throws(()=>publicOrigin("https://example.test/path"));assert.throws(()=>canonicalUrl("//other.test/","https://example.test"));
 const variants=coreAlternates("product");assert.equal(variants.find(x=>x.lang==="en").path,"/products/light-pole-jack/");assert.equal(variants.find(x=>x.lang==="fr").path,"/fr/equipment/");
 assert.deepEqual(coreAlternates("compatibility").map(x=>x.lang),["en","es","fr","pt","vi","th","id"]);
});
test("inquiry data cannot be configured in either public assets or the built site",()=>{
 assert.throws(()=>assertPrivateDirectory(new URL("../public/private-test",import.meta.url).pathname),/outside the public/);
 assert.throws(()=>assertPrivateDirectory("/tmp/test-site/private","/tmp/test-site"),/outside the public/);
});
