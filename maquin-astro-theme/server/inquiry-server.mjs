import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { existsSync, readFileSync, writeFileSync, mkdirSync, chmodSync, lstatSync, realpathSync, createReadStream } from "node:fs";
import { resolve, join, extname, sep, dirname, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { InquiryStore } from "./inquiry-store.mjs";
import { InquiryError, MAX_BODY_BYTES, validateInquiry, validateAttachment, validateIdempotencyKey } from "./inquiry-validation.mjs";
import {publicOrigin as resolvePublicOrigin,siteRedirects as aliases} from "../src/lib/site-config.mjs";

const root=fileURLToPath(new URL("../",import.meta.url));
const mime={".csv":"text/csv; charset=utf-8",".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2",".woff":"font/woff",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8",".xml":"application/xml; charset=utf-8"};
const sharedHeaders={"X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"strict-origin-when-cross-origin","Permissions-Policy":"camera=(), microphone=(), geolocation=()"};
Object.assign(mime,{".mp4":"video/mp4",".webm":"video/webm",".vtt":"text/vtt; charset=utf-8"});

// Native video seeking needs byte ranges, including on the local production server.
async function serveVideo(req,res,file){
  const {size}=await stat(file);
  const headers={...sharedHeaders,"Content-Type":mime[extname(file)],"Accept-Ranges":"bytes","Cache-Control":"public, max-age=3600"};
  let start=0,end=size-1,partial=false;
  if(req.method==="GET"&&req.headers.range){
    const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range.trim());
    let valid=Boolean(match&&(match[1]||match[2]));
    if(valid){
      if(!match[1]){const suffix=Number(match[2]);valid=Number.isSafeInteger(suffix)&&suffix>0;start=Math.max(0,size-suffix);}
      else{start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),size-1):size-1;valid=Number.isSafeInteger(start)&&Number.isSafeInteger(end);}
      valid=valid&&start<size&&start<=end;
    }
    if(!valid){res.writeHead(416,{...headers,"Content-Range":`bytes */${size}`,"Content-Length":0});res.end();return;}
    partial=true;
  }
  res.writeHead(partial?206:200,{...headers,"Content-Length":Math.max(0,end-start+1),...(partial?{"Content-Range":`bytes ${start}-${end}/${size}`}:{})});
  if(req.method==="HEAD"||!size){res.end();return;}
  const stream=createReadStream(file,{start,end});
  stream.on("error",()=>res.destroy());res.on("close",()=>stream.destroy());stream.pipe(res);
}
export function assertPrivateDirectory(directory,dist=join(root,"dist")) {
  const physical=(input)=>{let current=resolve(input);const tail=[];while(!existsSync(current)){tail.unshift(basename(current));current=dirname(current);}return resolve(realpathSync(current),...tail);};
  const target=physical(directory);
  for(const forbidden of [physical(dist),physical(join(root,"public"))])if(target===forbidden||target.startsWith(forbidden+sep))throw new Error("Inquiry data must be outside the public site directory.");
}
function json(res,status,data) { res.writeHead(status,{...sharedHeaders,"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(data)); }
function authorized(req,token) {
  const candidate=req.headers.authorization?.replace(/^Bearer /,"")??"";
  const a=Buffer.from(candidate),b=Buffer.from(token);
  return a.length===b.length && timingSafeEqual(a,b);
}
async function body(req) {
  const declared=Number(req.headers["content-length"]??0);
  if(declared>MAX_BODY_BYTES)throw new InquiryError(413,"request_too_large","The request is too large.");
  const chunks=[];let size=0;
  for await(const chunk of req){size+=chunk.length;if(size>MAX_BODY_BYTES)throw new InquiryError(413,"request_too_large","The request is too large.");chunks.push(chunk);}
  const bytes=Buffer.concat(chunks),type=req.headers["content-type"]??"";
  if(type.startsWith("application/json")) {
    try{return {input:JSON.parse(bytes.toString("utf8")),file:null};}catch{throw new InquiryError(400,"invalid_json","Invalid request data.");}
  }
  if(type.startsWith("multipart/form-data")) {
    let form;try{form=await new Request("http://localhost/",{method:"POST",headers:{"content-type":type},body:bytes}).formData();}catch{throw new InquiryError(400,"invalid_form","Invalid form data.");}
    const input={};for(const [key,value]of form)if(typeof value==="string")input[key]=value;
    try{input.attribution=JSON.parse(input.attribution??"{}");}catch{input.attribution={};}
    const file=form.get("attachment");
    return {input,file:file&&typeof file!=="string"&&file.size?{name:file.name,type:file.type,bytes:Buffer.from(await file.arrayBuffer())}:null};
  }
  throw new InquiryError(415,"unsupported_type","Use the inquiry form or JSON.");
}

export function createInquiryServer({directory=join(root,".local/inquiries"),dist=join(root,"dist"),adminToken,testMode=false,publicOrigin=null,rateLimit=15,rateWindowMs=10*60*1000,logger=console}={}) {
  if(typeof adminToken!=="string"||adminToken.length<32)throw new Error("A private admin token of at least 32 characters is required.");
  directory=resolve(directory);dist=resolve(dist);
  if(existsSync(dist))dist=realpathSync(dist);
  assertPrivateDirectory(directory,dist);
  const store=new InquiryStore(directory,{testMode}),rates=new Map();
  const server=createServer(async(req,res)=>{
    try{
      const port=server.address()?.port;
      const hosts=new Set([`127.0.0.1:${port}`,`localhost:${port}`,`[::1]:${port}`]);
      if(publicOrigin)hosts.add(new URL(publicOrigin).host);
      if(!hosts.has(req.headers.host))throw new InquiryError(400,"invalid_host","Invalid host.");
      const origin=publicOrigin??`http://${req.headers.host}`;
      const url=new URL(req.url,origin);
      const allowedOrigins=new Set([origin,`http://127.0.0.1:${port}`,`http://localhost:${port}`]);
      if(req.headers.origin&&!allowedOrigins.has(req.headers.origin))throw new InquiryError(403,"origin_rejected","This request origin is not allowed.");
      if(req.headers["sec-fetch-site"]==="cross-site")throw new InquiryError(403,"origin_rejected","Cross-site submission is not allowed.");
      if(url.pathname==="/api/inquiry-status"&&req.method==="GET")return json(res,200,{receiving:true,delivery:"private_inbox",emailNotification:"not_configured",testMode});
      if(url.pathname==="/api/inquiries"&&req.method==="POST") {
        const key=validateIdempotencyKey(req.headers["idempotency-key"]);
        const incoming=await body(req),data=validateInquiry(incoming.input),file=validateAttachment(incoming.file);
        const previous=store.existing(key);
        if(!previous){
          const now=Date.now(),ip=req.socket.remoteAddress??"unknown";
          for(const [k,v]of rates)if(v.until<=now)rates.delete(k);
          if(rates.size>10000)throw new InquiryError(429,"rate_limited","Please try again later.");
          const meter=rates.get(ip)??{count:0,until:now+rateWindowMs};
          if(meter.count>=rateLimit){res.setHeader("Retry-After",Math.ceil((meter.until-now)/1000));throw new InquiryError(429,"rate_limited","Please wait before sending another request.");}
          meter.count++;rates.set(ip,meter);
        }
        const receipt=store.save(data,file,key);
        return json(res,receipt.duplicate?200:201,{receipt});
      }
      if(url.pathname.startsWith("/api/admin/")) {
        if(!authorized(req,adminToken))throw new InquiryError(401,"unauthorized","Inbox access requires the private admin key.");
        const includeTests=url.searchParams.get("includeTests")==="1";
        if(url.pathname==="/api/admin/inquiries"&&req.method==="GET")return json(res,200,store.list({offset:Math.max(0,Number(url.searchParams.get("offset"))||0),limit:30,includeTests}));
        if(url.pathname==="/api/admin/inquiries.csv"&&req.method==="GET") {
          res.writeHead(200,{...sharedHeaders,"Cache-Control":"no-store","Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=volvet-inquiries.csv"});return res.end(store.exportCsv({includeTests}));
        }
        const match=url.pathname.match(/^\/api\/admin\/inquiries\/([a-f0-9-]{36})(\/attachment)?$/);
        if(match){
          const id=match[1];
          if(match[2]&&req.method==="GET") {
            const file=store.attachment(id);if(!file)throw new InquiryError(404,"not_found","Attachment not found.");
            res.writeHead(200,{...sharedHeaders,"Cache-Control":"no-store","Content-Type":file.attachment_type,"Content-Security-Policy":"sandbox","Content-Disposition":`attachment; filename*=UTF-8''${encodeURIComponent(file.attachment_name)}`});return res.end(Buffer.from(file.attachment));
          }
          if(req.method==="GET"){const item=store.get(id);if(!item)throw new InquiryError(404,"not_found","Inquiry not found.");return json(res,200,{item});}
          if(req.method==="PATCH"){const {input}=await body(req);return json(res,200,{item:store.update(id,input.status)});}
        }
        throw new InquiryError(404,"not_found","Inbox resource not found.");
      }
      if(url.pathname.startsWith("/api/"))throw new InquiryError(404,"not_found","Resource not found.");
      if(url.pathname.startsWith("/admin/")&&url.pathname!=="/admin/inquiries/")throw new InquiryError(404,"not_found","Page not found.");
      if(!["GET","HEAD"].includes(req.method))throw new InquiryError(405,"method_not_allowed","Method not allowed.");
      const pathname=url.pathname.endsWith("/")?url.pathname:url.pathname+"/";
      if(aliases[pathname]){res.writeHead(301,{...sharedHeaders,Location:aliases[pathname]+url.search});return res.end();}
      let decoded;try{decoded=decodeURIComponent(url.pathname);}catch{throw new InquiryError(400,"invalid_path","Invalid path.");}
      if(decoded.includes("\\")||decoded.includes("\0")||decoded.split("/").some(x=>x.startsWith(".")))throw new InquiryError(404,"not_found","Page not found.");
      let file=resolve(dist,"."+decoded);
      if(!file.startsWith(dist+sep)&&file!==dist)throw new InquiryError(404,"not_found","Page not found.");
      let info;try{info=await stat(file);if(info.isDirectory()){if(!decoded.endsWith("/")){res.writeHead(308,{...sharedHeaders,Location:decoded+"/"+url.search});return res.end();}file=join(file,"index.html");}const actual=await realpath(file);if(!actual.startsWith(dist+sep))throw new Error("outside");file=actual;}catch{file=join(dist,"404.html");res.statusCode=404;}
      if(res.statusCode!==404&&[".mp4",".webm"].includes(extname(file)))return await serveVideo(req,res,file);
      let content;try{content=await readFile(file);}catch{throw new InquiryError(404,"not_found","Page not found. Build the site before starting the server.");}
      res.writeHead(res.statusCode??200,{...sharedHeaders,"Content-Type":mime[extname(file)]??"application/octet-stream","Cache-Control":extname(file)===".html"?"no-cache":"public, max-age=3600"});
      res.end(req.method==="HEAD"?undefined:content);
    }catch(error){
      if(res.headersSent){res.destroy();return;}
      if(!(error instanceof InquiryError))logger.error?.("inquiry_server_error",error.code??error.name);
      json(res,error.status??503,{error:{code:error instanceof InquiryError?error.code:"storage_unavailable",message:error instanceof InquiryError?error.message:"We could not confirm receipt. Please try again.",fields:error instanceof InquiryError?error.fields:{}}});
    }
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  server.on("close",()=>store.close());
  return {server,store};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const directory=resolve(process.env.INQUIRY_DATA_DIR??join(root,".local/inquiries"));
  assertPrivateDirectory(directory);
  mkdirSync(directory,{recursive:true,mode:0o700});
  const keyPath=join(directory,"admin-token");
  let token=process.env.INQUIRY_ADMIN_TOKEN;
  if(!token){if(existsSync(keyPath)&&lstatSync(keyPath).isSymbolicLink())throw new Error("The admin key file must not be a symbolic link.");if(!existsSync(keyPath))writeFileSync(keyPath,randomBytes(36).toString("base64url"),{mode:0o600,flag:"wx"});token=readFileSync(keyPath,"utf8").trim();chmodSync(keyPath,0o600);}
  const host=process.env.INQUIRY_HOST??"127.0.0.1",port=Number(process.env.INQUIRY_PORT??8787),publicOrigin=resolvePublicOrigin();
  if(!["127.0.0.1","localhost","::1"].includes(host)&&(!publicOrigin||!process.env.INQUIRY_ADMIN_TOKEN||process.env.INQUIRY_TEST_MODE==="true"))throw new Error("External binding requires a public origin, explicit private admin token and non-test mode.");
  const {server}=createInquiryServer({directory,adminToken:token,testMode:process.env.INQUIRY_TEST_MODE==="true",publicOrigin});
  server.listen(port,host,()=>console.log(`volvet site and inquiry inbox: http://${host}:${port}/\nPrivate inbox: /admin/inquiries/\nAdmin key file (keep private): ${keyPath}`));
  for(const signal of ["SIGTERM","SIGINT"])process.on(signal,()=>server.close(()=>process.exit(0)));
}
