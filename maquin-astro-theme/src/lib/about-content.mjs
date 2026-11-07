import copies from "../data/about-copy.json" with {type:"json"};
import baseline from "../data/content-baseline.json" with {type:"json"};
const images=[
  "/images/factory/cnc-machining-center.jpg",
  "/images/factory/hydraulic-cylinder-assembly.jpg",
  "/images/factory/welding-robot-rig.jpg",
  "/images/factory/flange-base-machining.jpg",
  "/images/factory/electrical-cabinet-assembly.jpg"
];
const metrologyImages=[
  "/images/quality/metal-hardness-tester.jpg",
  "/images/quality/digital-calipers-alignment.jpg",
  "/images/quality/coating-thickness-gauge.jpg",
  "/images/quality/battery-charge-discharge-tester.jpg",
  "/images/quality/electrical-safety-test-station.jpg",
  "/images/packaging/industrial-vacuum-sealer.jpg",
  "/images/packaging/strapping-tensioner-rig.jpg",
  "/images/packaging/eva-foam-cnc-router.jpg"
];
export function aboutFor(locale="en"){
 const lang=Object.hasOwn(copies,locale)?locale:"en",c=copies[lang],s=baseline.product.specifications;
 const group=(values)=>({eyebrow:values[0],title:values[1],lead:values[2]});
 return {locale:lang,sourceId:"S4",baselineVersion:baseline.version,fieldValidation:baseline.product.fieldValidation,corporateEvidence:"pending",translationReview:"pending_native_review",
  hero:{eyebrow:c.hero[0],title:c.hero[1],subtitle:c.hero[2],stats:[s.applicablePoleHeightM,s.ratedLoadKg,s.batteryVoltageV,s.totalWeightKg].map((value,i)=>({value,unit:["m","kg","V","kg"][i],label:c.facts[i]}))},
  facility:{...group(c.library),items:c.images.map(([title,description,tag],i)=>({title,description,tag,image:images[i],evidenceRole:"product_reference"})),metrics:[s.hydraulicModuleWeightKg,s.electricalCabinetWeightKg,s.totalWeightKg].map((value,i)=>({value,label:c.massLabels[i]}))},
  timeline:{...group(c.evidence),milestones:c.levels.map(([stage,title,desc],i)=>({stage,period:i===0?"S4":String(i+1).padStart(2,"0"),title,desc}))},
  quality:{...group(c.review),note:{tag:c.review[3],text:c.review[4]},stagePrefix:c.review[5],steps:c.checks.map(([title,desc,badge],i)=>({step:String(i+1).padStart(2,"0"),title,desc,badge})),metrologyHead:c.metrologyHead,metrologyItems:(c.metrology||[]).map(([title,desc,tag],i)=>({title,desc,tag,image:metrologyImages[i]}))},
  engineering:{...group(c.brief),reviewStatus:c.brief[3],footerNote:c.brief[4],members:c.cards.map(([role,scope,skills],i)=>({role,scope,skills,code:`0${i+1}`}))},
  global:{...group(c.global),ports:c.destinations.map(([name,desc])=>({name,desc})),terms:c.terms,ecosystem:c.global[8]},
  ui:{portsTag:c.global[3],portsTitle:c.global[4],termsTag:c.global[5],termsTitle:c.global[6],ecosystemTitle:c.global[7],ctaEyebrow:c.cta[0]},
  cta:{title:c.cta[1],lead:c.cta[2],button:c.cta[3],note:c.cta[4]}
 };
}
