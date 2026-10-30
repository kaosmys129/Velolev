// Current authored-page inventory. Historical WP inventories remain in docs/evidence.
import {writeFileSync,mkdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {join,resolve} from "node:path";
import baseline from "../src/data/content-baseline.json" with {type:"json"};
import {siteRedirects,pageKeyForPath} from "../src/lib/site-config.mjs";
import {supportedLocales} from "../src/lib/languages.mjs";
import {inventoryBuiltPages} from "./lib/current-page-inventory.mjs";
import {verifyBuiltVersion} from "./lib/source-fingerprint.mjs";
const siteRoot=fileURLToPath(new URL("../",import.meta.url)),docs=resolve(siteRoot,"../docs/content-strategy");
mkdirSync(docs,{recursive:true});verifyBuiltVersion(siteRoot);
const csvCell=x=>'"'+String(x??"").replaceAll('"','""')+'"';
const csv=(name,fields,rows)=>writeFileSync(join(docs,name),"\ufeff"+[fields.map(csvCell).join(","),...rows.map(r=>fields.map(k=>csvCell(r[k])).join(","))].join("\n")+"\n");
const rendered=inventoryBuiltPages(join(siteRoot,"dist")).map(row=>({...row,baseline:baseline.version,review_status:"native_copy_and_project_evidence_review_as_registered"}));
csv("page-inventory-current.csv",Object.keys(rendered[0]),rendered);
const migration=Object.entries(siteRedirects).map(([from,to])=>({current_url:from,target_url:to,topic:pageKeyForPath(to),redirect:301,status:"terminal_alias_implemented",production_http:"not_verified",rollback:"restore_archive_and_previous_redirect_registry"}));
csv("url-migration-map-current.csv",Object.keys(migration[0]),migration);
const s = baseline.product.specifications;
const factRows = [
  ["F001","brand",baseline.brand.name,"","用户确认","confirmed","publish"],
  ["F002","applicable_pole_height",s.applicablePoleHeightM,"m","S4 §3.4 / §5.1","source_confirmed","publish_with_compatibility_review"],
  ["F003","rated_load",s.ratedLoadKg,"kg","S4 §3.5","source_confirmed","publish"],
  ["F004","battery_voltage",s.batteryVoltageV,"V","S4 §2.1","source_confirmed","publish"],
  ["F005","total_weight",s.totalWeightKg,"kg","S4 §3.3","source_confirmed","publish"],
  ["F006","hydraulic_weight",s.hydraulicModuleWeightKg,"kg","S4 §3.3","source_confirmed","publish"],
  ["F007","cabinet_weight",s.electricalCabinetWeightKg,"kg","S4 §3.3","source_confirmed","publish"],
  ["F008","hydraulic_dimensions",s.hydraulicModuleDimensionsMm.join("×"),"mm","S4 §3.1","source_confirmed","publish"],
  ["F009","cabinet_dimensions",s.electricalCabinetDimensionsMm.join("×"),"mm","S4 §3.1","source_confirmed","publish"],
  ["F010","packaging_dimensions",s.packagingDimensionsMm.join("×"),"mm","S4 §3.2","source_confirmed","publish"],
  ["F011","operators",s.operators,"persons","S4 §3.8","source_confirmed","not_unconditional_one_person_claim"],
  ["F012","listed_bolts",s.listedAnchorBoltSizes.join("/"),"","S4 §5 table","source_confirmed","list_only_compatibility_review_required"],
  ["F013","included_bolts",baseline.product.standardConfiguration.anchorBoltSizesIncluded.join("/"),"4 sets per size","S4 §4.2","source_confirmed","do_not_include_M24_by_default"],
  ["F014","flange_hole_span",s.flangeHoleSpanMm.join("–"),"mm","S4 diagram","source_confirmed","project_review_required"],
  ["F015","equipment_sets",1,"set","S4 §4.1","source_confirmed","publish"],
  ["F016","ground_stakes",1,"set","S4 §4.3","source_confirmed","publish"],
  ["F017","reported_lift_time",20,"s","S4 §3.6","field_test_pending","specification_label_only"],
  ["F018","reported_lifts_per_charge",">50","lifts","S4 §3.6","field_test_pending","specification_label_only"],
  ["F019","reported_usage",">3000","cycles","S4 §3.7","field_test_pending","not_verified_lifespan_guarantee"],
  ["F020","flange_dimensions_and_terminology","source diagram preserved","","S4 §5","engineering_review_pending","no_unreviewed_interpretation"],
  ["F021","site_operating_procedures","source statements preserved internally","","S4 §6–7","engineering_review_pending","not_published_as_SOP"],
  ["F022","public_prices","hidden","","用户确认","confirmed","no_amounts_or_Offer_schema"],
  ["F023","public_inventory","hidden","","用户确认","confirmed","no_availability_schema_or_stock_status"],
  ...["official_domain","contact_email","contact_phone","contact_address","inquiry_endpoint","certifications","customer_cases","warranty"].map((k,i)=>[`F${String(i+24).padStart(3,"0")}`,k,"pending","",i<5?"用户确认待配置":"S4未提供","pending","do_not_invent"])
 ].map(([claim_id,claim,value,unit,source,status,publication])=>({claim_id,claim,value:claim==="inquiry_endpoint"?baseline.contact.inquiryEndpoint:value,unit,source:claim==="inquiry_endpoint"?"D30 first-party inquiry service; browser-d30-verification.json":source,status:claim==="inquiry_endpoint"?baseline.contact.inquiryServiceStatus:status,publication:claim==="inquiry_endpoint"?"first_party_form_private_inbox":publication,approved_on:"2026-10-28",review_owner:claim.startsWith("public_")||claim==="brand"?"business_owner":"product_or_business_owner",source_version:baseline.version,affected_content:"core_pages_all_locales_metadata_schema_and_GEOFlow"}));
csv("fact-register.csv",Object.keys(factRows[0]),factRows);

const snapshot={capturedOn:"2026-10-29",basis:"current_authored_source_and_built_output_not_live_crawl",fragmentRecords:0,renderedCorePages:rendered.filter(r=>r.role==="authored_core_page").length,reviewedArticlePages:rendered.filter(r=>r.role==="reviewed_article").length,locales:supportedLocales.length,migrationRecords:migration.length,sourceEvidenceSha256:baseline.evidence[0].sha256,productionDomain:baseline.deployment.publicOrigin??"pending_configuration",inquiryEndpoint:baseline.contact.inquiryEndpoint,inferredMetrics:false};
writeFileSync(join(docs,"inventory-summary.json"),JSON.stringify(snapshot,null,2)+"\n");console.log(JSON.stringify(snapshot,null,2));
