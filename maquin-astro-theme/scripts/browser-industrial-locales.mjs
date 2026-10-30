import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {once} from 'node:events';
import {randomBytes} from 'node:crypto';
import {chromium} from 'playwright';
import {createInquiryServer} from '../server/inquiry-server.mjs';
import {corePages,industrialLocales,localizedPagePath,localizedAliases} from '../src/lib/site-config.mjs';
import {translateText} from '../src/lib/industrial-localization.mjs';
import {calculateRoi} from '../src/lib/roi.mjs';
import {input} from './lib/decision-fixture.mjs';
import {verifyBuiltVersion} from './lib/source-fingerprint.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),version=verifyBuiltVersion(root);
const out=join(root,'../docs/content-strategy/qa-multilingual');mkdirSync(out,{recursive:true});
const directory=mkdtempSync(join(tmpdir(),'volvet-language-qa-'));
const {server,store}=createInquiryServer({directory,adminToken:randomBytes(36).toString('base64url'),testMode:true,rateLimit:200,logger:{error(){}}});
server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({headless:true});
const checks=[],failures=[],pageErrors=[],httpErrors=[],receipts=[];
const check=(value,name)=>{assert.ok(value,name);checks.push(name);};
const languages=['en',...industrialLocales];
const goto=async(page,path)=>{const response=await page.goto(base+path,{waitUntil:'load'});assert.equal(response.status(),200,path);await page.evaluate(()=>document.fonts.ready);};
try{
 for(const [index,locale] of languages.entries()){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',locale});
  await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const page=await context.newPage();page.setDefaultTimeout(10000);
  page.on('pageerror',error=>pageErrors.push({locale,message:error.message}));
  page.on('response',response=>{if(response.status()>=400&&!response.url().includes('/api/'))httpErrors.push({locale,url:response.url(),status:response.status()});});
  let posts=0;page.on('request',request=>{if(request.method()==='POST')posts++;});
  const path=key=>localizedPagePath(key,locale),t=value=>translateText(value,locale);
  try{
   for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:width<760?844:1000});
    for(const key of Object.keys(corePages)){
     await goto(page,path(key));
     check(await page.locator('html').getAttribute('lang')===locale,`${locale}/${key}/${width}: language`);
     check(await page.locator('h1').count()===1,`${locale}/${key}/${width}: one heading`);
     const fits=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);
     if(!fits)await page.screenshot({path:join(out,`${locale}-${key}-${width}-overflow.png`),fullPage:true});
     check(fits,`${locale}/${key}/${width}: no horizontal overflow`);
    }
   }
   await goto(page,path('roi'));
   await page.locator('.nav-toggle').click();await page.locator('[data-header-discovery]>summary').click();
   check(await page.locator('.discovery-link').count()===7,`${locale}: seven discovery links`);
   check(await page.locator('.discovery-link[aria-current="page"]').getAttribute('href')===path('roi'),`${locale}: current destination`);
   check(await page.locator('.discovery-language').count()===0,`${locale}: no untranslated destination badge`);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${locale}: expanded navigation fits 320px`);
   if(['vi','th','id'].includes(locale))await page.screenshot({path:join(out,`${locale}-navigation-mobile.png`),fullPage:true});
   await page.keyboard.press('Escape');check(!await page.locator('[data-header-discovery]').evaluate(d=>d.open),`${locale}: Escape closes discovery`);
   await page.locator('[data-header-discovery]>summary').focus();await page.keyboard.press('ArrowDown');
   check(await page.locator('.discovery-link').first().evaluate(a=>document.activeElement===a),`${locale}: keyboard enters first destination`);
   await page.locator(`.discovery-link[href="${path('resources')}"]`).click();await page.waitForURL(base+path('resources'));
   check(true,`${locale}: discovery opens local resource page`);

   await goto(page,path('product'));await page.getByRole('tab').first().focus();await page.keyboard.press('End');
   await page.waitForFunction(()=>document.querySelector('#gallery-main-img').src.includes('factory-crating-export-package'));
   await page.locator('[data-stage-container]').click();check(await page.locator('dialog').evaluate(d=>d.open),`${locale}: selected gallery image opens`);
   check(await page.locator('.lightbox-close').getAttribute('aria-label')===t('Close image'),`${locale}: localized image controls`);
   await page.keyboard.press('Escape');check(await page.locator('[data-stage-container]').evaluate(a=>document.activeElement===a),`${locale}: image focus returns`);
   await goto(page,path('compatibility'));
   for(const box of (await page.locator('#preparation-checklist input').all()).slice(0,2))await box.check();
   check(await page.locator('#preparation-status').innerText()===t('{count} of 5 information groups ready.').replace('{count}','2'),`${locale}: localized checklist updates`);

   let videoRequests=0;page.on('request',request=>{if(request.url().endsWith('.mp4'))videoRequests++;});
   await goto(page,path('home'));check(videoRequests===0,`${locale}: video not downloaded before interaction`);
   check(await page.locator('video track').getAttribute('srclang')===locale,`${locale}: matching captions selected`);
   await page.locator('[data-film-play]').click();
   await page.waitForFunction(()=>{const v=document.querySelector('video');return v.currentTime>.1&&!v.paused&&v.textTracks[0].cues?.length===4;});
   check(true,`${locale}: video plays with four caption cues`);
   check(await page.locator('video').evaluate(v=>v.textTracks[0].cues[0].text)===t('Equipment overview: reference image of the yellow lifting assembly and electrical cabinet.'),`${locale}: captions contain actual translation`);
   await page.locator('[data-film-chapter="18"]').click();await page.waitForFunction(()=>document.querySelector('video').currentTime>=18);
   check(true,`${locale}: video chapter seeking works`);
   await page.locator('video').evaluate(v=>v.pause());
   if(['vi','th','id'].includes(locale)){
    await page.setViewportSize({width:1440,height:1000});await goto(page,path('home'));await page.screenshot({path:join(out,`${locale}-home-desktop.png`),fullPage:true});
    await page.setViewportSize({width:390,height:844});await goto(page,path('product'));await page.screenshot({path:join(out,`${locale}-product-mobile.png`),fullPage:true});
   }

   await goto(page,path('roi'));
   for(const [name,value] of Object.entries(input)){if(name==='suitability')await page.locator(`#roi-form [name="${name}"]`).check();else await page.locator(`#roi-form [name="${name}"]`).fill(String(value));}
   await page.locator('#roi-form [type="submit"]').click();await page.locator('#roi-results').waitFor({state:'visible'});
   check(await page.locator('#roi-verdict').innerText()===t('A positive scenario.'),`${locale}: localized positive calculation`);
   const result=calculateRoi(input);
   check((await page.locator('[data-result="annualNetSaving"]').innerText()).includes(Number(result.annualNetSaving).toLocaleString(locale,{minimumFractionDigits:2,maximumFractionDigits:2})),`${locale}: calculation agrees with shared formulas`);
   check(posts===0,`${locale}: browsing and calculating send no inquiries`);
   await page.locator('#roi-to-inquiry').click();await page.waitForURL(base+path('quote')+'?context=roi');
   const notes=await page.locator('[name="message"]').inputValue();
   check(notes.startsWith(t('Visitor-entered scenario; not a quotation or suitability approval.')),`${locale}: translated scenario reaches quote form`);
   check(notes.length<=3000,`${locale}: scenario fits inquiry limit`);
   check(await page.evaluate(()=>sessionStorage.getItem('volvet-roi-inquiry')===null),`${locale}: consumed scenario removed`);
   await page.locator('[name="name"]').fill(`Controlled language QA ${locale}`);await page.locator('[name="email"]').fill(`language-${locale}@example.invalid`);await page.locator('[name="country"]').fill('Controlled QA destination');
   await page.locator('[name="consent"]').check();await page.locator('[data-inquiry-form] [type="submit"]').click();
   await page.locator('[data-inquiry-success]').waitFor({state:'visible'});
   const reference=await page.locator('[data-receipt-reference]').innerText(),saved=store.list({includeTests:true}).items.find(record=>record.reference===reference),record=store.get(saved.id);
   check(record.locale===locale&&record.message.replace(/\r\n/g,'\n')===notes&&record.sourcePage===path('quote'),`${locale}: exact scenario persisted with language and source`);
   check(record.isTest===true,`${locale}: controlled inquiry excluded from sales leads`);receipts.push({locale,reference});

   await goto(page,path('contact'));await page.locator('[name="name"]').fill('Controlled validation');await page.locator('[name="phone"]').fill('invalid-phone');await page.locator('[name="country"]').fill('QA');await page.locator('[name="consent"]').check();
   await page.locator('[data-inquiry-form] [type="submit"]').click();await page.locator('[data-error-for="phone"]').filter({hasText:t('Enter a valid phone number.')}).waitFor();
   check(true,`${locale}: real server field error shown in local language`);
   check(await page.locator('[name="phone"]').inputValue()==='invalid-phone',`${locale}: validation retains entered data`);
   await page.evaluate(locale=>sessionStorage.setItem('volvet-roi-inquiry',JSON.stringify({version:2,locale,createdAt:Date.now()-31*60000,notes:'Expired scenario must not be copied'})),locale);
   await goto(page,path('quote')+'?context=roi');check(await page.locator('[name="message"]').inputValue()==='',`${locale}: expired scenario rejected`);

   await goto(page,path('resources'));
   for(const link of await page.locator('[data-download]').all()){
    const href=await link.getAttribute('href');check(href.startsWith(`${locale==='en'?'':`/${locale}`}/resources/`),`${locale}: local download address`);
    const response=await fetch(base+href);check(response.status===200,`${locale}: download delivered`);
    if(href.endsWith('.json')){const data=await response.json();check(data.specifications.ratedLoadKg===300&&data.fieldValidation==='pending'&&data.standardConfiguration.anchorBoltSizesIncluded.length===4,`${locale}: download retains specification boundaries`);}
    else {const body=await response.text();check(body.includes(locale==='en'?(href.includes('worksheet')?'"information"':'"field"'):`"${t('Field')}"`),`${locale}: download uses language-specific fields`);}
   }
   const next=languages[(index+1)%languages.length];await goto(page,path('roi'));await page.locator('.language-picker summary').click();await page.locator(`.language-picker a[hreflang="${next}"]`).click();await page.waitForURL(base+localizedPagePath('roi',next));
   check(true,`${locale}: language switch preserves ROI topic`);
   console.log(JSON.stringify({locale,passed:true,checks:checks.length}));
  }catch(error){failures.push({locale,error:error.stack??String(error)});console.log(JSON.stringify({locale,passed:false,error:error.message}));}
  finally{await context.close();}
 }
 for(const [from,to] of Object.entries(localizedAliases)){
  const response=await fetch(base+from+'?qa=preserved',{redirect:'manual'});
  check(response.status===301&&response.headers.get('location')===to+'?qa=preserved',`${from}: terminal 301 keeps query`);
 }
 check(store.list().total===0,'Controlled inquiries never appear in default business counts');
 check(receipts.length===languages.length,'All seven languages persisted actual controlled inquiries');
 check(pageErrors.length===0,'No browser JavaScript errors');check(httpErrors.length===0,'No failed local page or asset requests');
 verifyBuiltVersion(root);
}catch(error){failures.push({error:error.stack??String(error)});}
finally{
 await browser.close();server.close();await once(server,'close');rmSync(directory,{recursive:true,force:true});
 const report={...version,date:'2026-10-29',passed:failures.length===0,languages,corePagesPerLanguage:Object.keys(corePages).length,checks,failures,pageErrors,httpErrors,controlledInquiries:receipts,testDataOnly:true,externalEmailSent:false};
 writeFileSync(join(root,'qa-reports/industrial-locales-browser.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({passed:report.passed,checks:checks.length,failures,pageErrors,httpErrors},null,2));if(!report.passed)process.exitCode=1;
}
