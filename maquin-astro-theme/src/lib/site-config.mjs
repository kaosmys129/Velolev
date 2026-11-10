import {supportedLocales as languages} from "./languages.mjs";
import baseline from "../data/content-baseline.json" with {type:"json"};
import englishAliases from "../data/route-aliases.json" with {type:"json"};
import publishedSnapshot from "../data/published-content.json" with {type:"json"};
import localizedArticles from "../data/published-content-locales.json" with {type:"json"};
// 仅对快照中实际存在的英文指南及各自语言已翻译的文章放行多语言路由
const englishArticleSlugs = new Set((publishedSnapshot.articles ?? []).map(a => a.slug));
export function publicOrigin(value = process.env.PUBLIC_SITE_URL !== undefined ? process.env.PUBLIC_SITE_URL : baseline.deployment.publicOrigin) {
  if(!value)return null;
  const raw = String(value).trim();
  const normalized = raw ? raw.replace(/\/+$/, '') : '';
  if(!normalized)return null;
  const url=new URL(normalized);
  if(url.protocol!=="https:"||url.username||url.password||url.pathname!=="/"||url.search||url.hash)throw new Error("Configure an HTTPS origin without credentials, path, query or hash.");
  return url.origin;
}
export function canonicalUrl(path,origin=publicOrigin()) {
  if(!origin)return null;
  if(!path.startsWith("/")||path.startsWith("//")||/[?#]/.test(path))throw new Error("Canonical paths must be local absolute paths.");
  return new URL(path,origin).href;
}
export const corePages={
  solar:{path:"/solutions/solar-street-light-installation/",title:"Solar Street Light Pole Installation Planning | volvet",description:"Prepare solar pole assembly, flange, foundation and project information for an equipment review. Complete solar assemblies require project-specific validation."},
  parking:{path:"/solutions/parking-lot-lighting/",title:"Parking Lot & Campus Pole Installation Planning | volvet",description:"Review pole, foundation, access and work-area information for parking lot and campus lighting projects before selecting lifting equipment."},
  compare:{path:"/compare/pole-jack-vs-crane/",title:"Pole Lifter vs Crane: Project Selection Guide | volvet",description:"Compare scope, compatibility, mobilisation and project cost inputs for a portable pole lifter and a crane without assumed savings."},
  roi:{path:"/tools/roi-calculator/",title:"Pole Installation Cost Scenario Calculator | volvet",description:"Compare project costs using your own inputs. Review transparent formulas, annual costs and conditional payback without a public equipment price."},
  method:{path:"/guides/install-light-pole-without-crane/",title:"Installing Light Poles Without a Crane: Methods & Limits | volvet",description:"A planning guide to equipment selection, complete work scope and engineering review. It is not a field operating procedure."},
  resources:{path:"/resources/",title:"Product Specifications & Project Documents | volvet",description:"Download a source-derived product specification summary and a project information worksheet. Request reviewed project documents through the inquiry form."},
  faq:{path:"/faq/",title:"Portable Light Pole Lifter Questions | volvet",description:"Answers about rated load, pole height, standard configuration, compatibility, reported performance and the private quotation process."},
  about:{path:"/about-us/",title:"About volvet: Equipment & Information | volvet",description:"Review volvet's portable light pole lifter focus, specification sources, 300 kg rated load, and private B2B project review workflow."},
  guides:{path:"/guides/",title:"Pole Installation Guides & Planning Tools | volvet",description:"Find pole compatibility guidance, application planning, equipment comparison, cost scenarios and source-derived specifications."},
  home:{path:"/",title:"Portable Light Pole Lifter for Street Lighting | volvet",description:"Plan street light pole installation with volvet. Review the 12 m pole class, 300 kg rated load, foundation requirements and project quotation process."},
  product:{path:"/products/light-pole-jack/",title:"Portable Light Pole Lifter: Specifications & Configuration | volvet",description:"Review volvet portable light pole lifter specifications, two-module dimensions, included anchor bolts and compatibility requirements. Request a B2B project quotation."},
  compatibility:{path:"/guides/pole-jack-compatibility/",title:"Pole Lifter Compatibility: Pole, Flange & Foundation | volvet",description:"Check the information needed to review pole lifter compatibility: pole weight and height, flange drawing, anchor bolts, foundation and site conditions."},
  quote:{path:"/quote/",title:"Request a Project Quotation | volvet",description:"Send your pole specifications, project quantity and destination for a private B2B configuration review and quotation."},
  contact:{path:"/contact-us/",title:"Contact volvet: Project, Distributor & Support Inquiries",description:"Send a project, distributor, support or privacy request to volvet. Provide an email address or phone number so your inquiry can be reviewed."},
  privacy:{path:"/privacy/",title:"Privacy Notice | volvet",description:"How volvet handles contact details, project specifications and optional attachments submitted through the inquiry service."},
  terms:{path:"/terms/",title:"Website & Project Inquiry Terms | volvet",description:"Understand the purpose of volvet product information, project review and private quotation requests."},
  editorial:{path:"/editorial-policy/",title:"Product Information & Editorial Policy | volvet",description:"How volvet distinguishes specification-sheet facts, manufacturer-reported performance, engineering review and field evidence."}
};
export const industrialLocales=["es","fr","pt","vi","th","id"];
const originalLocalizedPages={home:"/",product:"/equipment/",contact:"/contact-us/",quote:"/pricing-plan/",faq:"/faq/",about:"/about-us/",guides:"/blog/"};
export const legacyPageKeys={
  "equipment":"product","equipment-detail":"product","pricing-plan":"quote","blog":"guides","team":"about","project":"solar",
  "eco-friendly-heavy-equipment-maintaining-machines-in-a-sustainable-way":"compare",
  "flexible-project-management-how-renting-equipment-boosts-productivity":"method",
  "essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency":"resources",
  "essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2":"solar",
  "maximizing-roi-through-proper-care-and-rental-management-of-heavy-machines":"roi",
  "the-importance-of-regular-inspections-for-heavy-machinery":"resources"
};
export function localizedPagePath(key,locale="en") {
  const page=corePages[key];
  if(!page)throw new Error("Unknown core page.");
  if(locale==="en"||!languages.includes(locale))return page.path;
  const path=originalLocalizedPages[key]??(industrialLocales.includes(locale)?page.path:null);
  return path===null?null:`/${locale}${path}`;
}
export function pageKeyForPath(path) {
  const neutral=path.replace(/^\/(?:en|es|fr|pt|vi|th|id)(?=\/|$)/,"")||"/";
  const normalized=neutral.endsWith("/")?neutral:`${neutral}/`;
  return Object.keys(corePages).find(key=>corePages[key].path===normalized||originalLocalizedPages[key]===normalized)??legacyPageKeys[normalized.slice(1,-1)]??null;
}
// Only registered HTML pages change language. Assets, downloads, endpoints,
// external links and unknown reviewed-article URLs retain their original URL.
export function localizePath(href,locale="en") {
  if(typeof href!=="string"||!href.startsWith("/")||href.startsWith("//"))return href;
  const match=href.match(/^([^?#]*)([\s\S]*)$/),key=pageKeyForPath(match[1]);
  if(key)return (localizedPagePath(key,locale)??corePages[key].path)+match[2];
  const articleMatch=match[1].match(/^\/(?:(?:es|fr|pt|vi|th|id)\/)?guides\/([a-z0-9-]+)\/?$/);
  const slug=articleMatch?.[1];
  if(slug&&!["pole-jack-compatibility","install-light-pole-without-crane"].includes(slug)){
    if(locale==="en"&&englishArticleSlugs.has(slug))return `/guides/${slug}/`+match[2];
    if(industrialLocales.includes(locale)&&Boolean(localizedArticles[locale]?.[slug]))return `/${locale}/guides/${slug}/`+match[2];
  }
  return href;
}
/**
 * 返回指定指南文章实际已发布的语言版本路径列表，避免为未翻译语种生成 404 hreflang 链接。
 */
export function articleAlternates(slug,{articles=publishedSnapshot.articles,localesMap=localizedArticles}={}) {
  const alts=[];
  if((articles??[]).some(a=>a.slug===slug))alts.push({lang:"en",path:`/guides/${slug}/`});
  for(const lang of industrialLocales){
    if(localesMap?.[lang]?.[slug])alts.push({lang,path:`/${lang}/guides/${slug}/`});
  }
  return alts;
}
export function coreAlternates(key) {
  return languages.map(lang=>({lang,path:localizedPagePath(key,lang)})).filter(a=>a.path!==null);
}
export function industrialStaticPaths(locale,{includeAliases=false}={}) {
  if(!industrialLocales.includes(locale))throw new Error("Unsupported industrial locale.");
  const slugs=[...new Set([
    ...Object.keys(corePages).filter(key=>key!=="home").flatMap(key=>[localizedPagePath(key,locale).slice(locale.length+2,-1),...(includeAliases?[corePages[key].path.slice(1,-1)]:[])]),
    ...(includeAliases?Object.keys(legacyPageKeys):[])
  ])];
  return slugs.map(slug=>({params:{slug},props:{page:pageKeyForPath(`/${slug}/`)}}));
}
export const localizedAliases=Object.fromEntries(industrialLocales.flatMap(locale=>industrialStaticPaths(locale,{includeAliases:true}).map(({params:{slug},props:{page}})=>[`/${locale}/${slug}/`,localizedPagePath(page,locale)]).filter(([from,to])=>from!==to)));
export const siteRedirects={...englishAliases,...localizedAliases};
