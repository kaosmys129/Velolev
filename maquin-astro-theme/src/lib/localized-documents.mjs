import {specificationSummary} from './specification-downloads.mjs';
import {translateText} from './industrial-localization.mjs';
import {industrialLocales} from './site-config.mjs';

export const documentNames=['velolev-specifications.csv','velolev-specifications.json','volvet-specifications.csv','volvet-specifications.json','project-information-worksheet.csv'];
export function localizedDocumentPath(name,locale='en'){
 if(!documentNames.includes(name))throw new Error('Unknown document.');
 return `${industrialLocales.includes(locale)?`/${locale}`:''}/resources/${name}`;
}
const specLabels={applicablePoleHeightM:'Applicable light pole height',ratedLoadKg:'Rated load',batteryVoltageV:'Battery voltage',hydraulicModuleWeightKg:'Hydraulic module weight',electricalCabinetWeightKg:'Electrical cabinet weight',totalWeightKg:'Total equipment weight',hydraulicModuleDimensionsMm:'Hydraulic module',electricalCabinetDimensionsMm:'Electrical cabinet',packagingDimensionsMm:'Packaging dimensions',operators:'Operators listed in the sheet',listedAnchorBoltSizes:'Anchor bolt sizes listed',flangeHoleSpanMm:'Flange hole span shown'};
const units={applicablePoleHeightM:'m',ratedLoadKg:'kg',batteryVoltageV:'V',hydraulicModuleWeightKg:'kg',electricalCabinetWeightKg:'kg',totalWeightKg:'kg',hydraulicModuleDimensionsMm:'mm',electricalCabinetDimensionsMm:'mm',packagingDimensionsMm:'mm',flangeHoleSpanMm:'mm'};
const configurationLabels={equipmentSets:'Equipment',anchorBoltSizesIncluded:'Included bolt sizes',anchorBoltSetsPerSize:'Bolt sets per size',groundStakeSets:'Ground stakes'};
const performanceLabels={liftTimeSeconds:'Reported lift time',liftsPerFullCharge:'Reported lifts per full charge',usageCycles:'Reported usage cycles'};
export function localizedSpecification(locale){
 if(!industrialLocales.includes(locale))throw new Error('Unsupported document locale.');
 const t=value=>translateText(value,locale),source=specificationSummary();
 return {...source,locale,translationReview:'pending_native_review',source:t(source.source),purpose:t(source.purpose),limitations:source.limitations.map(t),
  labels:Object.fromEntries(Object.entries({...specLabels,...configurationLabels,...performanceLabels}).map(([key,label])=>[key,t(label)])),units,
  fieldValidationLabel:t('Field validation pending.'),manufacturerReportedPerformanceLabel:t('Manufacturer-reported.')};
}
const cell=value=>'"'+String(value).replaceAll('"','""')+'"';
const csv=rows=>'\ufeff'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
const valueText=value=>Array.isArray(value)?value.join(' × '):value;
export function localizedSpecificationCsv(locale){
 const s=localizedSpecification(locale),t=value=>translateText(value,locale);
 const rows=[[t('Field'),t('Value')],['velolev',s.brand],[t('Source'),s.source],[t('Version'),s.baselineVersion],[t('Purpose'),s.purpose],
 ...Object.entries(s.specifications).map(([key,value])=>[s.labels[key],`${valueText(value)}${units[key]?` ${units[key]}`:''}`]),
 ...Object.entries(s.standardConfiguration).map(([key,value])=>[s.labels[key],Array.isArray(value)?value.join(' / '):value]),
 ...Object.keys(performanceLabels).map(key=>[`${s.manufacturerReportedPerformanceLabel} · ${s.labels[key]}`,`${s.manufacturerReportedPerformance[key]}${key==='liftTimeSeconds'?' s':''}`]),
 [t('Field validation pending.'),s.fieldValidationLabel],...s.limitations.map(value=>[t('Information policy'),value])];
 return csv(rows);
}
export function localizedProjectWorksheet(locale){
 if(!industrialLocales.includes(locale))throw new Error('Unsupported document locale.');
 const t=value=>translateText(value,locale);
 return csv([[t('Field'),t('Your project')],...['Destination','Application','Number of poles','Pole height and assembled weight','Luminaire and attached components','Pole drawing reference','Flange and anchor-bolt drawing reference','Foundation drawing reference','Site plan and access notes','Comparable work scope','Open questions for review'].map(label=>[t(label),''])]);
}
