import {specificationCsv} from "../../lib/specification-downloads.mjs";
export const GET=()=>new Response(specificationCsv(),{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=volvet-specifications.csv"}});
