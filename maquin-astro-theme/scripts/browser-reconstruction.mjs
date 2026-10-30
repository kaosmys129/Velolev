import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {once} from 'node:events';
import {randomBytes} from 'node:crypto';
import {chromium} from 'playwright';
import {createInquiryServer} from '../server/inquiry-server.mjs';
import {localizedPagePath} from '../src/lib/site-config.mjs';
import {translateText} from '../src/lib/industrial-localization.mjs';
import {checkFlange} from '../src/lib/flange-checker.mjs';
import {REGIONAL_PRESETS} from '../src/lib/roi.mjs';
import {verifyBuiltVersion} from './lib/source-fingerprint.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),version=verifyBuiltVersion(root);
const out=join(root,'../docs/content-strategy/qa-reconstruction');mkdirSync(out,{recursive:true});
const directory=mkdtempSync(join(tmpdir(),'volvet-reconstruction-'));
const {server}=createInquiryServer({directory,adminToken:randomBytes(36).toString('base64url'),testMode:true,logger:{error(){}}});
server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}`;
let browser;
const checks=[],errors=[],failures=[];
const check=(ok,label)=>{assert.ok(ok,label);checks.push(label);};
try{
 browser=await chromium.launch({headless:true});
 for(const locale of ['en','es','fr','pt','vi','th','id']){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',locale});
  await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const page=await context.newPage();page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(`${locale}: ${e.message}`));
  const path=key=>localizedPagePath(key,locale),t=key=>translateText(key,locale);
  const goto=async key=>{await page.goto(base+path(key));await page.evaluate(()=>document.fonts.ready);};
  try{
   for(const width of [1440,820,390,320]){
    await page.setViewportSize({width,height:1000});
    for(const key of ['home','product','compatibility','compare','roi','about']){
     await goto(key);
     check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${locale}/${key}/${width}: no page overflow`);
     if(key==='compare')check(await page.locator('.decision-table tbody tr').count()===4,`${locale}/${width}: four comparison dimensions`);
     if(key==='home')check((await page.locator('.procurement-path a').first().getAttribute('href')).startsWith(locale==='en'?'/resources/':`/${locale}/resources/`),`${locale}/${width}: localized direct download`);
    }
   }
   await goto('compatibility');
   const verdict=page.locator('[data-verdict]'),span=page.locator('[data-span-input]');
   const want=values=>t(checkFlange(values).title);
   check(await verdict.innerText()===want({span:220,bolt:'M20',holes:4}),`${locale}: translated initial flange state`);
   await page.locator('.checker-preset[data-bolt="M24"]').click();
   check(await verdict.innerText()===want({span:240,bolt:'M24',holes:4}),`${locale}: translated M24 state`);
   await page.locator('.checker-preset[data-bolt="M30"]').click();
   check(await verdict.innerText()===want({span:300,bolt:'M30',holes:4}),`${locale}: translated drawing-review state`);
   await page.locator('.checker-preset[data-bolt="M20"]').click();await page.locator('[data-hole-pattern]').selectOption('6');
   check(await verdict.innerText()===t('Drawing review needed'),`${locale}: changing hole count recalculates`);
   await span.fill('220.5');
   check((await page.locator('[data-span-result]').innerText()).includes((220.5).toLocaleString(locale)),`${locale}: decimal measurement retained`);
   await span.fill('');check(await verdict.innerText()===t('Check your measurement'),`${locale}: blank is invalid in local language`);
   check(await span.getAttribute('aria-invalid')==='true',`${locale}: invalid state accessible`);
   await page.locator('.checker-preset[data-bolt="M24"]').click();
   await page.locator('[data-flange-inquiry]').click();await page.waitForURL(base+path('quote')+'?context=flange&span=240&bolt=M24&holes=4');
   check((await page.locator('[name="foundation"]').inputValue())===t('Flange check: {span} mm / {bolt} / {holes} holes. Please review the base connection.').replace('{span}','240').replace('{bolt}','M24').replace('{holes}','4'),`${locale}: flange dimensions carried in local language`);
   check(await page.locator('.inquiry-details').evaluate(d=>d.open),`${locale}: carried details visible for editing`);

   await goto('roi');
   for(const [key,preset] of Object.entries(REGIONAL_PRESETS)){
    await page.locator(`[data-preset-key="${key}"]`).click();await page.locator('#roi-results').waitFor({state:'visible'});
    const poles=await page.locator('[data-highlight="breakEvenPoles"]').innerText();
    check(!/\bPoles\b/.test(poles)||locale==='en',`${locale}/${key}: translated payback unit`);
    check((await page.locator('[data-highlight="paybackMonths"]').innerText()).includes(t('{value} months').replace('{value}','').trim()),`${locale}/${key}: translated months`);
    check(!/Project Cost Reduction/.test(await page.locator('[data-highlight="savingPercent"]').innerText()),`${locale}/${key}: translated percentage label`);
    check(await page.locator(`[data-preset-key="${key}"]`).getAttribute('aria-pressed')==='true',`${locale}/${key}: preset selected accessibly`);
   }
   await page.locator('[name="annualFixed"]').fill('1000000');await page.locator('#roi-form [type="submit"]').click();
   check(await page.locator('#roi-verdict').innerText()===t('No positive saving.'),`${locale}: negative result translated`);
   await page.locator('[type="reset"]').click();check(await page.locator('#roi-results').isHidden(),`${locale}: reset clears stale results`);
   await page.locator('[data-preset-key="sea"]').click();await page.locator('#roi-to-inquiry').click();await page.waitForURL(base+path('quote')+'?context=roi');
   check((await page.locator('[name="message"]').inputValue()).startsWith(t('Visitor-entered scenario; not a quotation or suitability approval.')),`${locale}: ROI notes remain localized`);

   await goto('faq');
   const json=JSON.parse(await page.locator('script[type="application/ld+json"]').last().textContent());
   check(json.mainEntity[0].name===t('What pole height and load are listed?'),`${locale}: FAQ schema uses page language`);
   if(['en','fr'].includes(locale)){
    for(const [key,selector] of [['home','.procurement-cta-tier'],['compatibility','.flange-checker'],['compare','.comparison-matrix-wrapper'],['roi','.calculator-layout'],['about','.quality-testing-section']]){
     for(const width of [1440,390]){
      await page.setViewportSize({width,height:1000});await goto(key);
      if(key==='roi')await page.locator('[data-preset-key="sea"]').click();
      await page.locator(selector).screenshot({path:join(out,`${locale}-${key}-${width}.png`)});
     }
    }
   }
   console.log(JSON.stringify({locale,passed:true,checks:checks.length}));
  }catch(error){failures.push({locale,message:error.stack??String(error)});console.log(JSON.stringify({locale,passed:false,message:error.message}));}
  finally{await context.close();}
 }
 check(errors.length===0,'No browser JavaScript errors');verifyBuiltVersion(root);
}catch(error){failures.push({message:error.stack??String(error)});}
finally{
 await browser?.close();server.close();await once(server,'close');rmSync(directory,{recursive:true,force:true});
 const report={...version,date:'2026-10-30',passed:!failures.length,checks,errors,failures};
 writeFileSync(join(root,'qa-reports/reconstruction-browser.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({passed:report.passed,checks:checks.length,errors,failures},null,2));if(!report.passed)process.exitCode=1;
}
