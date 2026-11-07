import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { existsSync, readFileSync, writeFileSync, mkdirSync, chmodSync, lstatSync, realpathSync, createReadStream } from "node:fs";
import { resolve, join, extname, sep, dirname, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { InquiryStore } from "./inquiry-store.mjs";
import { InquiryError, MAX_BODY_BYTES, validateInquiry, validateAttachment, validateIdempotencyKey, validateSubscription } from "./inquiry-validation.mjs";
import { EmailService } from "./email-service.mjs";
import { SubscriptionStore } from "./subscription-store.mjs";
import {publicOrigin as resolvePublicOrigin,siteRedirects as aliases} from "../src/lib/site-config.mjs";

// 如果存在 .env 文件，尝试自动加载环境变量
try {
  if (typeof process.loadEnvFile === "function") {
    const envPath = resolve(root, ".env");
    if (existsSync(envPath)) process.loadEnvFile(envPath);
    const parentEnv = resolve(root, "../.env");
    if (existsSync(parentEnv)) process.loadEnvFile(parentEnv);
  }
} catch {}

const root=fileURLToPath(new URL("../",import.meta.url));
const mime={".csv":"text/csv; charset=utf-8",".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2",".woff":"font/woff",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8",".xml":"application/xml; charset=utf-8"};
const sharedHeaders={
  "X-Content-Type-Options":"nosniff",
  "X-Frame-Options":"DENY",
  "Referrer-Policy":"strict-origin-when-cross-origin",
  "Permissions-Policy":"camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'"
};
Object.assign(mime,{".mp4":"video/mp4",".webm":"video/webm",".vtt":"text/vtt; charset=utf-8"});

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

// Native video seeking needs byte ranges, including on the local production server.
async function serveVideo(req,res,file,secHeaders=sharedHeaders){
  const {size}=await stat(file);
  const headers={...secHeaders,"Content-Type":mime[extname(file)],"Accept-Ranges":"bytes","Cache-Control":"public, max-age=3600"};
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
function json(res,status,data,headers=sharedHeaders) { res.writeHead(status,{...headers,"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(data)); }
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

export function createInquiryServer({
  directory=join(root,".local/inquiries"),
  dist=join(root,"dist"),
  adminToken,
  testMode=false,
  publicOrigin=null,
  rateLimit=15,
  rateWindowMs=10*60*1000,
  logger=console,
  emailService=null,
  subscriptionStore=null
}={}) {
  if(typeof adminToken!=="string"||adminToken.length<32)throw new Error("A private admin token of at least 32 characters is required.");
  directory=resolve(directory);dist=resolve(dist);
  if(existsSync(dist))dist=realpathSync(dist);
  assertPrivateDirectory(directory,dist);

  emailService = emailService ?? new EmailService({
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
    adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    replyTo: process.env.RESEND_REPLY_TO,
    publicOrigin,
    logger,
    testMode
  });
  subscriptionStore = subscriptionStore ?? new SubscriptionStore(join(directory, "subscriptions"));
  const isEmailConfigured = emailService.getStatus().configured;

  const store=new InquiryStore(directory,{testMode,emailNotificationStatus:isEmailConfigured?"resend":"not_configured"}),rates=new Map();
  const securityHeaders = {
    ...sharedHeaders,
    ...(publicOrigin?.startsWith("https://") ? { "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload" } : {})
  };
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
      
      // 1. 询盘系统状态
      if(url.pathname==="/api/inquiry-status"&&req.method==="GET") {
        return json(res,200,{receiving:true,delivery:"private_inbox",emailNotification:isEmailConfigured?"resend":"not_configured",testMode});
      }

      // 2. 询盘提交
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
        if(!receipt.duplicate){
          emailService.sendInquiryNotifications(data,{attachment:file})
            .catch(err=>logger.error?.("inquiry_email_error",err));
        }
        return json(res,receipt.duplicate?200:201,{receipt});
      }

      // 3. 邮件订阅提交
      if(url.pathname==="/api/subscribe"&&req.method==="POST") {
        const incoming=await body(req);
        const subData=validateSubscription(incoming.input);
        const now=Date.now(),ip=req.socket.remoteAddress??"unknown";
        for(const [k,v]of rates)if(v.until<=now)rates.delete(k);
        if(rates.size>10000)throw new InquiryError(429,"rate_limited","Please try again later.");
        const meter=rates.get(ip)??{count:0,until:now+rateWindowMs};
        if(meter.count>=rateLimit){res.setHeader("Retry-After",Math.ceil((meter.until-now)/1000));throw new InquiryError(429,"rate_limited","Please wait before sending another request.");}
        meter.count++;rates.set(ip,meter);

        const subResult=subscriptionStore.subscribe(subData);
        if(subResult.isNew||subResult.status==="resubscribed"){
          emailService.sendSubscriptionWelcome(subData)
            .catch(err=>logger.error?.("subscription_email_error",err));
        }
        return json(res,200,{status:"subscribed",email:subData.email,message:"Subscription confirmed."});
      }

      // 4. 邮件退订处理 (支持浏览器 GET 与 API POST)
      if(url.pathname==="/api/unsubscribe") {
        let email=null;
        if(req.method==="GET"){email=url.searchParams.get("email");}
        else if(req.method==="POST"){const incoming=await body(req);email=incoming.input?.email;}
        else{throw new InquiryError(405,"method_not_allowed","Method not allowed.");}
        if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new InquiryError(400,"invalid_email","Invalid email address.");
        subscriptionStore.unsubscribe(email);
        if(req.method==="GET"&&(req.headers.accept?.includes("text/html")||!req.headers.accept?.includes("application/json"))){
          res.writeHead(200,{...sharedHeaders,"Content-Type":"text/html; charset=utf-8"});
          return res.end(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed | volvet</title><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f4f3ef;color:#1d201e;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}.box{background:#fff;padding:40px;border:1px solid #dcdfd5;border-top:4px solid #f4cc3d;max-width:480px;text-align:center;}h1{font-size:22px;margin:0 0 12px 0;}p{font-size:14px;color:#454e46;line-height:1.6;}a{color:#1d201e;font-weight:700;}</style></head><body><div class="box"><h1>Unsubscribed Successfully</h1><p>The email <strong>${escapeHtml(email)}</strong> has been removed from the volvet technical digest list.</p><p style="margin-top:24px;"><a href="/">← Return to volvet</a></p></div></body></html>`);
        }
        return json(res,200,{status:"unsubscribed",email});
      }

      // 5. 管理端点 (受 Admin Token 保护)
      if(url.pathname.startsWith("/api/admin/")) {
        if(!authorized(req,adminToken))throw new InquiryError(401,"unauthorized","Inbox access requires the private admin key.");
        const includeTests=url.searchParams.get("includeTests")==="1";
        
        // 5.1 询盘列表与导出
        if(url.pathname==="/api/admin/inquiries"&&req.method==="GET")return json(res,200,store.list({offset:Math.max(0,Number(url.searchParams.get("offset"))||0),limit:30,includeTests}));
        if(url.pathname==="/api/admin/inquiries.csv"&&req.method==="GET") {
          res.writeHead(200,{...sharedHeaders,"Cache-Control":"no-store","Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=volvet-inquiries.csv"});return res.end(store.exportCsv({includeTests}));
        }

        // 5.2 订阅者列表与导出
        if(url.pathname==="/api/admin/subscribers"&&req.method==="GET"){
          return json(res,200,subscriptionStore.listActive({
            offset:Math.max(0,Number(url.searchParams.get("offset"))||0),
            limit:Math.min(Math.max(1,Number(url.searchParams.get("limit"))||50),200)
          }));
        }
        if(url.pathname==="/api/admin/subscribers.csv"&&req.method==="GET"){
          const subs=subscriptionStore.listActive({limit:10000});
          const fields=["email","locale","country","source_page","created_at"];
          const cell=(v)=>{let s=String(v??"");if(/^[=+@\-\t\r\n]|^\s+[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
          const csv="\ufeff"+[fields.map(cell).join(","),...subs.items.map(row=>fields.map(k=>cell(row[k])).join(","))].join("\r\n");
          res.writeHead(200,{...sharedHeaders,"Cache-Control":"no-store","Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=volvet-subscribers.csv"});
          return res.end(csv);
        }

        // 5.3 EDM 群发 API
        if(url.pathname==="/api/admin/send-edm"&&req.method==="POST"){
          const incoming=await body(req);
          const {campaign,dryRun=false,testEmail=null}=incoming.input??{};
          if(!campaign||!campaign.title||!campaign.bodyHtml){
            throw new InquiryError(400,"invalid_campaign","Campaign must include title and bodyHtml.");
          }
          let recipients=[];
          if(testEmail){recipients=[{email:testEmail}];}
          else{recipients=subscriptionStore.listActive({limit:10000}).items;}
          const result=await emailService.sendEdmCampaign({campaign,recipients,dryRun});
          return json(res,200,{summary:result});
        }

        // 5.4 单个询盘操作
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
      if(aliases[pathname]){res.writeHead(301,{...securityHeaders,Location:aliases[pathname]+url.search});return res.end();}
      let decoded;try{decoded=decodeURIComponent(url.pathname);}catch{throw new InquiryError(400,"invalid_path","Invalid path.");}
      if(decoded.includes("\\")||decoded.includes("\0")||decoded.split("/").some(x=>x.startsWith(".")))throw new InquiryError(404,"not_found","Page not found.");
      let file=resolve(dist,"."+decoded);
      if(!file.startsWith(dist+sep)&&file!==dist)throw new InquiryError(404,"not_found","Page not found.");
      let info;try{info=await stat(file);if(info.isDirectory()){if(!decoded.endsWith("/")){res.writeHead(308,{...securityHeaders,Location:decoded+"/"+url.search});return res.end();}file=join(file,"index.html");}const actual=await realpath(file);if(!actual.startsWith(dist+sep))throw new Error("outside");file=actual;}catch{file=join(dist,"404.html");res.statusCode=404;}
      if(res.statusCode!==404&&[".mp4",".webm"].includes(extname(file)))return await serveVideo(req,res,file,securityHeaders);
      let content;try{content=await readFile(file);}catch{throw new InquiryError(404,"not_found","Page not found. Build the site before starting the server.");}
      const ext=extname(file);
      let cacheControl=ext===".html"?"no-cache":"public, max-age=3600";
      if(decoded.startsWith("/_astro/")||decoded.startsWith("/fonts/")||ext===".woff2"){
        cacheControl="public, max-age=31536000, immutable";
      }
      const compressable=new Set([".html",".css",".js",".json",".svg",".xml",".txt",".csv"]);
      let outContent=content;
      const fileHeaders={
        ...securityHeaders,
        "Content-Type":mime[ext]??"application/octet-stream",
        "Cache-Control":cacheControl
      };
      if(req.method!=="HEAD"&&compressable.has(ext)&&content.length>=256){
        const acceptEncoding=req.headers["accept-encoding"]??"";
        if(acceptEncoding.includes("br")){
          fileHeaders["Content-Encoding"]="br";
          fileHeaders["Vary"]="Accept-Encoding";
          outContent=brotliCompressSync(content);
        }else if(acceptEncoding.includes("gzip")){
          fileHeaders["Content-Encoding"]="gzip";
          fileHeaders["Vary"]="Accept-Encoding";
          outContent=gzipSync(content);
        }
      }
      res.writeHead(res.statusCode??200,fileHeaders);
      res.end(req.method==="HEAD"?undefined:outContent);
    }catch(error){
      if(res.headersSent){res.destroy();return;}
      if(!(error instanceof InquiryError))logger.error?.("inquiry_server_error",error.code??error.name);
      json(res,error.status??503,{error:{code:error instanceof InquiryError?error.code:"storage_unavailable",message:error instanceof InquiryError?error.message:"We could not confirm receipt. Please try again.",fields:error instanceof InquiryError?error.fields:{}}},securityHeaders);
    }
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  server.on("close",()=>{
    store.close();
    subscriptionStore.close();
  });
  return {server,store,emailService,subscriptionStore};
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
  const {server,emailService}=createInquiryServer({directory,adminToken:token,testMode:process.env.INQUIRY_TEST_MODE==="true",publicOrigin});
  const emailStatus=emailService.getStatus();
  server.listen(port,host,()=>console.log(`volvet site and inquiry inbox: http://${host}:${port}/\nPrivate inbox: /admin/inquiries/\nAdmin key file (keep private): ${keyPath}\nResend Email Service: ${emailStatus.configured ? "CONFIGURED (" + emailStatus.fromEmail + ")" : "MOCK/NOT CONFIGURED"}`));
  for(const signal of ["SIGTERM","SIGINT"])process.on(signal,()=>server.close(()=>process.exit(0)));
}
