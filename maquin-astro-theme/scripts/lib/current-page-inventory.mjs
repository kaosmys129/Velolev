import {readFileSync,readdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from 'parse5';
import {supportedLocales} from '../../src/lib/languages.mjs';
import {corePages,localizedPagePath} from '../../src/lib/site-config.mjs';
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
const all=n=>[n,...(n.childNodes??[]).flatMap(all)],attr=(n,k)=>n?.attrs?.find(a=>a.name===k)?.value??'';
const text=n=>!n?'':['style','script'].includes(n.tagName)?'':n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join(' ');
export function inventoryBuiltPages(dist){
 return walk(dist).filter(file=>file.endsWith('.html')).flatMap(file=>{
  const relativePath=relative(dist,file).split('\\').join('/');
  if(relativePath==='404.html'||relativePath.startsWith('admin/'))return [];
  const raw=readFileSync(file,'utf8'),nodes=all(parse(raw));
  if(nodes.some(n=>n.tagName==='meta'&&attr(n,'http-equiv').toLowerCase()==='refresh'))return [];
  const url='/'+relativePath.replace(/index\.html$/,''),locale=supportedLocales.find(l=>l!=='en'&&url.startsWith(`/${l}/`))??'en';
  const page=Object.keys(corePages).find(key=>localizedPagePath(key,locale)===url);
  return [{url,locale,page:page??'',role:page?'authored_core_page':/^\/(?:[a-z]{2}\/)?guides\/.+\/$/.test(url)?'reviewed_article':'authored_page',title:text(nodes.find(n=>n.tagName==='title')),h1_count:nodes.filter(n=>n.tagName==='h1').length,canonical:attr(nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),source_sha256:createHash('sha256').update(raw).digest('hex')}];
 }).sort((a,b)=>a.url.localeCompare(b.url));
}
