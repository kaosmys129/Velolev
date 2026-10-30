import {supportedLocales,languageNames} from './languages.mjs';

// Page counterparts are supplied by the route registry or reviewed article.
// Never invent a localized URL by prefixing an arbitrary pathname.
export function languageOptions({locale='en',pathname='/',alternates=[]}={}){
 const current=supportedLocales.includes(locale)?locale:'en';
 return supportedLocales.map(lang=>{
  const counterpart=alternates.find(item=>item.lang===lang);
  const path=counterpart?.path??(lang==='en'?'/':`/${lang}/`);
  if(!path.startsWith('/')||path.startsWith('//')||/[?#\\\x00-\x1f]/.test(path))throw new Error('Language destinations must be local page paths.');
  return {lang,name:languageNames[lang],path,current:lang===current,samePage:Boolean(counterpart),fallback:!counterpart};
 });
}

export function languageHref(path,source,samePage=true){
 if(typeof path!=='string'||!path.startsWith('/')||path.startsWith('//')||/[?#\\\x00-\x1f]/.test(path))throw new Error('Invalid language destination.');
 const from=new URL(source),target=new URL(path,from.origin);
 if(samePage){target.search=from.search;target.hash=from.hash;}
 else for(const [key,value] of from.searchParams)if(/^utm_(source|medium|campaign|content|term)$/.test(key))target.searchParams.append(key,value);
 return target.pathname+target.search+target.hash;
}
