import {projectWorksheet} from "../../lib/specification-downloads.mjs";
export const GET=()=>new Response(projectWorksheet(),{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=project-information-worksheet.csv"}});
