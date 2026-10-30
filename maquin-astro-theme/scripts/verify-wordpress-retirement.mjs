// Enforces the retirement boundary on every build; optional HTTP handler verification.
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,statSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {join,resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {tmpdir} from 'node:os';
import {once} from 'node:events';
import {parse} from 'parse5';
import {siteRedirects,corePages,coreAlternates} from '../src/lib/site-config.mjs';
import {verifyBuiltVersion} from './lib/source-fingerprint.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),args=process.argv.slice(2);
const target=args.find(s=>s.startsWith('--dist='))?.slice(7),dist=target?resolve(target):join(root,'dist'),version=verifyBuiltVersion(root,dist);
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
const all=n=>[n,...(n.childNodes??[]).flatMap(all)],attr=(n,k)=>n?.attrs?.find(a=>a.name===k)?.value??'';
const failures=[],checks=[];const check=(name,run)=>{try{run();checks.push(name);}catch(e){failures.push(`${name}: ${e.message}`);}};
const files=walk(dist),html=files.filter(p=>p.endsWith('.html')),assets=new Set();let coreCount=0;
for(const p of ['wp-content','wp-includes'])check(`no retired directory: ${p}`,()=>assert.equal(existsSync(join(dist,p)),false));
function asset(raw,base){if(!raw||raw.startsWith('#')||/^(data:|mailto:|tel:)/.test(raw))return;const u=new URL(raw,'https://local.test'+base);if(u.origin!=='https://local.test')return;const path=decodeURIComponent(u.pathname);assets.add(path);assert.ok(existsSync(join(dist,path))||existsSync(join(dist,path,'index.html')),`missing ${path}`);}
const cssAssets=(css,base)=>{for(const m of css.matchAll(/url\(\s*["']?([^\s)'";]+)["']?\s*\)/g))asset(m[1],base);};
for(const file of files.filter(p=>/\.(html|css|js)$/.test(p))){const raw=readFileSync(file,'utf8'),path='/'+relative(dist,file);
 check(`${path}: no old resource paths`,()=>assert.doesNotMatch(raw,/\/(?:wp-content|wp-includes|wp-admin)\/|elementorFrontend|jquery-migrate/));
 if(file.endsWith('.css'))check(`${path}: CSS assets exist`,()=>cssAssets(raw,path));
 if(!file.endsWith('.html'))continue;const nodes=all(parse(raw));
 check(`${path}: local references exist`,()=>{for(const n of nodes){for(const a of ['href','src','poster'])asset(attr(n,a),path);for(const part of attr(n,'srcset').split(','))asset(part.trim().split(/\s+/)[0],path);cssAssets(attr(n,'style'),path);if(n.tagName==='style')cssAssets((n.childNodes??[]).map(x=>x.value??'').join(''),path);}});
 if(nodes.some(n=>n.tagName==='meta'&&attr(n,'http-equiv').toLowerCase()==='refresh')||path.startsWith('/admin/'))continue;
 coreCount++;check(`${path}: common modern shell`,()=>{assert.ok(nodes.some(n=>n.tagName==='header'&&attr(n,'class')==='site-header'));assert.ok(nodes.some(n=>n.tagName==='footer'&&attr(n,'class')==='site-footer'));assert.equal(nodes.filter(n=>n.tagName==='h1').length,1);});
}
const error=all(parse(readFileSync(join(dist,'404.html'),'utf8')));
check('404 has no canonical, alternate or homepage active state',()=>{assert.equal(error.filter(n=>n.tagName==='link'&&['canonical','alternate'].includes(attr(n,'rel'))).length,0);assert.ok(error.some(n=>n.tagName==='meta'&&attr(n,'name')==='robots'&&attr(n,'content').includes('noindex')));});
for(const [from,to] of Object.entries(siteRedirects))check(`terminal alias: ${from}`,()=>{assert.equal(siteRedirects[to],undefined);assert.ok(existsSync(join(dist,to,'index.html')));});
let transport='static';
if(args.includes('--http')){
 const {createInquiryServer}=await import('../server/inquiry-server.mjs');
 const dir=mkdtempSync(join(tmpdir(),'volvet-retirement-qa-'));
 const {server,store}=createInquiryServer({dist,directory:dir,adminToken:'controlled-retirement-test-only-0123456789',testMode:true,logger:{error(){}}});
 let request;
 try{
  server.listen(0,'127.0.0.1');await once(server,'listening');
  const base=`http://127.0.0.1:${server.address().port}`;transport='local HTTP';
  request=(url,method='GET')=>fetch(base+url,{method,redirect:'manual'});
  for(const [from,to] of Object.entries(siteRedirects)){for(const p of [from,from.replace(/\/$/,'')]){const r=await request(p+'?utm_source=retirement');check(`HTTP one-hop query preserved: ${p}`,()=>{assert.equal(r.status,301);assert.equal(r.headers.get('location'),to+'?utm_source=retirement');});}const r=await request(to);check(`HTTP final 200: ${to}`,()=>assert.equal(r.status,200));}
  for(const key of Object.keys(corePages))for(const {path}of coreAlternates(key)){const r=await request(path);check(`HTTP core page: ${path}`,()=>assert.equal(r.status,200));}
  for(const p of ['/unregistered-page/','/es/unregistered-page/','/wp-content/missing.css']){const r=await request(p),body=await r.text();check(`real modern 404: ${p}`,()=>{assert.equal(r.status,404);assert.match(body,/class="site-header"/);assert.doesNotMatch(body,/\/wp-content\//);});}
  for(const p of assets){if(Object.hasOwn(siteRedirects,p)||p.startsWith('/admin/'))continue;const r=await request(p,'HEAD');check(`HTTP asset/link: ${p}`,()=>assert.equal(r.status,200));}
 }finally{if(server.listening){server.close();await once(server,'close');}else store.close();rmSync(dir,{recursive:true,force:true});}
}
const report={date:'2026-10-29',...version,passed:!failures.length,transport,modernPublicHtml:coreCount,redirects:Object.keys(siteRedirects).length,wordpressFiles:files.filter(p=>/\/wp-(content|includes)\//.test(p)).length,buildBytes:files.reduce((s,p)=>s+statSync(p).size,0),checks:checks.length,failures};
writeFileSync(join(root,`../docs/content-strategy/wordpress-retirement-${version.origin?'configured-':''}${transport==='static'?'static':'http'}-verification.json`),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
