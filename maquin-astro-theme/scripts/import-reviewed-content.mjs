import {importReviewedSnapshot} from "../src/lib/reviewed-snapshot.mjs";
const input=process.argv.find(a=>a.startsWith("--input="))?.slice(8);
if(!input){console.error("Usage: npm run content:import -- --input=/private/path/reviewed-export.json [--apply]. Default validates only; no network or external publication.");process.exitCode=1;}else{try{console.log(JSON.stringify(importReviewedSnapshot(input,{apply:process.argv.includes("--apply")}),null,2));}catch(error){console.error("Import rejected: "+error.message);process.exitCode=1;}}
