import baseline from '../data/content-baseline.json' with {type:'json'};

export const flangeMessages = [
  'Within the listed range', 'Confirm M24 hardware', 'Drawing review needed', 'Check your measurement',
  'Enter a span from 100 to 400 mm.',
  'The span and bolt size match the listed specifications. Send the base drawing to confirm the connection.',
  'M24 is listed for compatibility but is not included in the standard set. Include the hardware requirement in your inquiry.',
  'This span, bolt size or hole pattern needs a drawing review before a configuration can be selected.',
  'Included in the standard set', 'Confirm separately', 'Base drawing required', '{value} mm',
];

export function checkFlange({span,bolt,holes}) {
  const value=typeof span==='string'&&span.trim()===''?NaN:Number(span);
  const validBolts=[...baseline.product.specifications.listedAnchorBoltSizes,'M27','M30','Other'];
  if(!Number.isFinite(value)||value<100||value>400||!validBolts.includes(bolt)||!['4','6','8'].includes(String(holes)))
    return {status:'invalid',title:flangeMessages[3],description:flangeMessages[4],hardware:flangeMessages[10]};
  const [min,max]=baseline.product.specifications.flangeHoleSpanMm;
  if(value<min||value>max||!baseline.product.specifications.listedAnchorBoltSizes.includes(bolt)||String(holes)!=='4')
    return {status:'review',title:flangeMessages[2],description:flangeMessages[7],hardware:flangeMessages[9]};
  if(!baseline.product.standardConfiguration.anchorBoltSizesIncluded.includes(bolt))
    return {status:'hardware',title:flangeMessages[1],description:flangeMessages[6],hardware:flangeMessages[9]};
  return {status:'listed',title:flangeMessages[0],description:flangeMessages[5],hardware:flangeMessages[8]};
}
