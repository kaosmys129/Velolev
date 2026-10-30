// Build-only localization: visitors receive complete translated static HTML.
// Never import this catalog/parser into a browser script.
import {parseFragment, serialize} from "parse5";
import es from "../data/industrial-copy/es.json" with {type:"json"};
import fr from "../data/industrial-copy/fr.json" with {type:"json"};
import pt from "../data/industrial-copy/pt.json" with {type:"json"};
import vi from "../data/industrial-copy/vi.json" with {type:"json"};
import th from "../data/industrial-copy/th.json" with {type:"json"};
import id from "../data/industrial-copy/id.json" with {type:"json"};
import extra from "../data/industrial-extra-copy.json" with {type:"json"};
import {industrialLocales, localizePath} from "./site-config.mjs";

const catalogs=Object.fromEntries(Object.entries({es,fr,pt,vi,th,id}).map(([lang,copy])=>[lang,{...copy,...extra[lang]}]));
const normalize=value=>value.replace(/\s+/g," ").trim();
const displayAttributes=new Set(["alt","aria-label","title","placeholder","data-caption","data-label","data-alt","data-enlarge-template","data-ready-template"]);
export const roiErrorMessages=["Enter a number from zero to one billion.","Use a whole number up to one million.","Enter one three-letter currency code for all costs.","Use a positive investment or leave this blank.","Confirm that both methods are suitable for comparison before estimating.","A positive project volume is needed. No annual saving or payback is calculated.","These values exceed the reliable calculation range."];
export const inquiryFieldMessages=["Enter your name (2–100 characters).","Keep the company name within 160 characters.","Provide an email address or phone number.","Enter a valid email address.","Enter a valid phone number.","Enter your country or delivery destination.","Use a positive whole number or leave this blank.","Use a positive number or leave this blank if unknown.","Keep foundation notes within 1,000 characters.","Keep project notes within 4,000 characters.","Confirm that we may use these details to handle your request.","Choose a file of 5 MB or less.","The file type or content is not supported."];


export function translateText(value,locale="en",params={}) {
  if(!catalogs[locale]||typeof value!=="string")return value;
  const key=normalize(value),catalog=catalogs[locale];
  let translated=catalog[key];
  if(!translated&&key.endsWith(" | volvet"))translated=translateText(key.slice(0,-9),locale)+" | volvet";
  if(!translated&&key.startsWith("Enlarge image: "))translated=translateText("Enlarge image: {title}",locale,{title:translateText(key.slice(15),locale)});
  if(!translated)return value;
  for(const [name,replacement] of Object.entries(params))translated=translated.replaceAll(`{${name}}`,String(replacement));
  return value.slice(0,value.length-value.trimStart().length)+translated+value.slice(value.trimEnd().length);
}

export function localizeMarkup(html,locale="en") {
  if(!industrialLocales.includes(locale))return html;
  const document=parseFragment(html,{scriptingEnabled:false});
  function visit(node){
    if(["script","style","svg"].includes(node.tagName))return;
    if(node.nodeName==="#text")node.value=translateText(node.value,locale);
    for(const attr of node.attrs??[]){
      if(displayAttributes.has(attr.name))attr.value=translateText(attr.value,locale);
      if(attr.name==="href")attr.value=localizePath(attr.value,locale);
    }
    for(const child of node.childNodes??[])visit(child);
    if(node.content)visit(node.content);
  }
  visit(document);
  return serialize(document);
}
