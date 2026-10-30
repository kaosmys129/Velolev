import {industrialLocales} from '../../../lib/site-config.mjs';
import {documentNames,localizedSpecification,localizedSpecificationCsv,localizedProjectWorksheet} from '../../../lib/localized-documents.mjs';
export function getStaticPaths(){return industrialLocales.flatMap(lang=>documentNames.map(document=>({params:{lang,document}})));}
export function GET({params}){
 const {lang,document}=params;
 const json=document==='volvet-specifications.json';
 const body=json?JSON.stringify(localizedSpecification(lang),null,2)+'\n':document==='volvet-specifications.csv'?localizedSpecificationCsv(lang):localizedProjectWorksheet(lang);
 return new Response(body,{headers:{'Content-Type':json?'application/json; charset=utf-8':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="${lang}-${document}"`}});
}
