import {specificationSummary} from "../../lib/specification-downloads.mjs";
export const GET=()=>new Response(JSON.stringify(specificationSummary(),null,2),{headers:{"Content-Type":"application/json; charset=utf-8","Content-Disposition":"attachment; filename=volvet-specifications.json"}});
