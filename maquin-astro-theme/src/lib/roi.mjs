export const ROI_FIELDS=["polesPerProject","projectsPerYear","craneFixed","craneDaily","craneDays","craneCrew","craneHours","lifterFixed","lifterCrew","lifterHours","hourlyRate","lifterVariable","annualFixed"];

// 东南亚、中东、欧美三大区域工程基准预设
export const REGIONAL_PRESETS = {
  sea: {
    id: "sea",
    name: "Southeast Asia (SEA)",
    currency: "USD",
    polesPerProject: 50,
    projectsPerYear: 6,
    hourlyRate: 15,
    craneFixed: 200,
    craneDaily: 350,
    craneDays: 4,
    craneCrew: 4,
    craneHours: 32,
    lifterFixed: 50,
    lifterCrew: 2,
    lifterHours: 24,
    lifterVariable: 30,
    annualFixed: 100,
    investment: 4500,
    suitability: true
  },
  mea: {
    id: "mea",
    name: "Middle East (MEA)",
    currency: "USD",
    polesPerProject: 60,
    projectsPerYear: 8,
    hourlyRate: 25,
    craneFixed: 350,
    craneDaily: 550,
    craneDays: 4,
    craneCrew: 4,
    craneHours: 32,
    lifterFixed: 80,
    lifterCrew: 2,
    lifterHours: 24,
    lifterVariable: 40,
    annualFixed: 150,
    investment: 4800,
    suitability: true
  },
  na_eu: {
    id: "na_eu",
    name: "Europe / NA",
    currency: "USD",
    polesPerProject: 40,
    projectsPerYear: 10,
    hourlyRate: 45,
    craneFixed: 500,
    craneDaily: 850,
    craneDays: 3,
    craneCrew: 4,
    craneHours: 24,
    lifterFixed: 100,
    lifterCrew: 2,
    lifterHours: 18,
    lifterVariable: 50,
    annualFixed: 200,
    investment: 5200,
    suitability: true
  }
};
export function calculateRoi(input){
 const errors={};const x={};
 for(const key of ROI_FIELDS){const raw=input[key];const value=typeof raw==="number"?raw:typeof raw==="string"&&raw.trim()!==""?Number(raw):NaN;if(!Number.isFinite(value)||value<0||value>1e9)errors[key]="Enter a number from zero to one billion.";x[key]=value;}
 for(const key of ["polesPerProject","projectsPerYear"]){if(Number.isFinite(x[key])&&(!Number.isInteger(x[key])||x[key]>1e6))errors[key]="Use a whole number up to one million.";}
 if(!/^[A-Z]{3}$/.test(String(input.currency??"").trim().toUpperCase()))errors.currency="Enter one three-letter currency code for all costs.";
 const investment=String(input.investment??"").trim()===""?null:Number(input.investment);if(investment!==null&&(!Number.isFinite(investment)||investment<=0||investment>1e9))errors.investment="Use a positive investment or leave this blank.";
 if(input.suitability!==true&&input.suitability!=="true")errors.suitability="Confirm that both methods are suitable for comparison before estimating.";
 if(Object.keys(errors).length)return {status:"invalid",errors};
 if(x.polesPerProject===0||x.projectsPerYear===0)return {status:"no_volume",errors:{},message:"A positive project volume is needed. No annual saving or payback is calculated."};
 const craneProject=x.craneFixed+x.craneDaily*x.craneDays+x.craneCrew*x.craneHours*x.hourlyRate;
 const lifterProject=x.lifterFixed+x.lifterCrew*x.lifterHours*x.hourlyRate+x.lifterVariable;
 const projectGrossSaving=craneProject-lifterProject;
 const annualNetSaving=projectGrossSaving*x.projectsPerYear-x.annualFixed;
 const annualPoles=x.polesPerProject*x.projectsPerYear;
 const netSavingPerPole=annualNetSaving/annualPoles;
 const values={craneProject,lifterProject,projectGrossSaving,annualNetSaving,annualPoles,netSavingPerPole,cranePerPole:craneProject/x.polesPerProject,lifterPerPole:(lifterProject+x.annualFixed/x.projectsPerYear)/x.polesPerProject,investment,breakEvenPoles:investment!==null&&netSavingPerPole>0?Math.ceil(investment/netSavingPerPole):null,paybackMonths:investment!==null&&annualNetSaving>0?investment/annualNetSaving*12:null};
 if(Object.values(values).some(v=>v!==null&&(!Number.isFinite(v)||Math.abs(v)>Number.MAX_SAFE_INTEGER/100)))return {status:"invalid",errors:{volume:"These values exceed the reliable calculation range."}};
 return {status:annualNetSaving>0?"positive":"non_positive",currency:String(input.currency).trim().toUpperCase(),...values};
}
export function roiInquiryNotes(input,result,copy=null){
 if(!["positive","non_positive"].includes(result.status))throw new Error("Calculate a valid scenario first.");
 if(copy){
  const fmt=v=>Number(v).toLocaleString(copy.locale,{maximumFractionDigits:2});
  const cost=v=>`${Number(v).toLocaleString(copy.locale,{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:false})} ${result.currency}`;
  return [copy.intro,copy.scope,`${copy.currency}: ${result.currency}`,
   ...ROI_FIELDS.map(key=>`${copy.labels[key]}: ${fmt(input[key])}`),
   `${copy.crane}: ${cost(result.craneProject)}`,`${copy.lifter}: ${cost(result.lifterProject)}`,
   `${copy.annual}: ${cost(result.annualNetSaving)}`,`${copy.perPole}: ${cost(result.netSavingPerPole)}`,
   `${copy.investment}: ${result.investment===null?copy.notCalculated:cost(result.investment)}`,
   `${copy.payback}: ${result.paybackMonths===null?copy.notCalculated:copy.months.replace('{value}',fmt(result.paybackMonths))}`,
   `${copy.breakEven}: ${result.breakEvenPoles===null?copy.notCalculated:fmt(result.breakEvenPoles)}`].join('\n');
 }
 const fmt=v=>Number(v).toFixed(2);const c=result.currency;
 return ["Visitor-entered planning scenario — not a supplier quotation or suitability approval.","Same currency and full work scope assumed; taxes, finance, residual value and future rate changes excluded.",`Currency: ${c}; poles/project: ${Number(input.polesPerProject)}; projects/year: ${Number(input.projectsPerYear)}.`,...ROI_FIELDS.filter(k=>!["polesPerProject","projectsPerYear"].includes(k)).map(k=>`${k}: ${Number(input[k])}`),`Crane recurring/project: ${fmt(result.craneProject)} ${c}; lifter recurring/project before annual allocation: ${fmt(result.lifterProject)} ${c}.`,`Annual net saving after annual fixed cost: ${fmt(result.annualNetSaving)} ${c}; net saving/pole: ${fmt(result.netSavingPerPole)} ${c}.`,result.investment===null?"Investment not entered; payback not calculated.":`Visitor investment: ${fmt(result.investment)} ${c}; `+(result.paybackMonths===null?"no positive saving, no payback.":`conditional payback: ${fmt(result.paybackMonths)} months / ${result.breakEvenPoles} poles at the entered volume.`)].join("\n");
}
