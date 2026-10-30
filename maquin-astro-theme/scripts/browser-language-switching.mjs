import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {once} from 'node:events';
import {randomBytes} from 'node:crypto';
import {chromium} from 'playwright';
import {createInquiryServer} from '../server/inquiry-server.mjs';
import {corePages,localizedPagePath} from '../src/lib/site-config.mjs';
import {supportedLocales,languageNames} from '../src/lib/languages.mjs';
import {verifyBuiltVersion} from './lib/source-fingerprint.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),version=verifyBuiltVersion(root);
const out=join(root,'../docs/content-strategy/qa-language-switching');mkdirSync(out,{recursive:true});
const directory=mkdtempSync(join(tmpdir(),'volvet-language-switch-'));
const {server,store}=createInquiryServer({directory,adminToken:randomBytes(36).toString('base64url'),testMode:true,logger:{error(){}}});
server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
await context.addInitScript(()=>{window.__documentIdentity=crypto.randomUUID();});
const page=await context.newPage(),checks=[],failures=[],errors=[],httpErrors=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('response',response=>{if(response.status()>=400)httpErrors.push({path:new URL(response.url()).pathname,status:response.status()});});
const check=(value,label)=>{assert.ok(value,label);checks.push(label);};
const goto=async(path)=>{await page.goto(base+path,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);};
const selector=placement=>`[data-language-switcher][data-placement="${placement}"]`;
const choose=async(placement,lang)=>{await page.locator(`${selector(placement)}>summary`).click();await page.locator(`${selector(placement)} a[hreflang="${lang}"]`).click();await page.waitForLoadState('load');};
try{
 for(const locale of supportedLocales)for(const key of Object.keys(corePages)){
  await goto(localizedPagePath(key,locale)+'?utm_source=language-qa&application=solar-lighting#main');
  check(await page.locator('[data-language-switcher]').count()===2,`${locale}/${key}: header and footer selectors`);
  check(await page.locator('header [data-language-switcher]').count()===1&&await page.locator('footer [data-language-switcher]').count()===1,`${locale}/${key}: selectors inside page landmarks`);
  const ids=await page.locator('[id$="-language-options"]').evaluateAll(nodes=>nodes.map(node=>node.id));
  check(ids.length===2&&new Set(ids).size===2,`${locale}/${key}: unique selector IDs`);
  for(const placement of ['header','footer']){
   check(await page.locator(`${selector(placement)} a`).count()===7,`${locale}/${key}/${placement}: all seven languages`);
   check(await page.locator(`${selector(placement)} [aria-current="true"]`).getAttribute('hreflang')===locale,`${locale}/${key}/${placement}: URL language active`);
   for(const lang of supportedLocales){const href=await page.locator(`${selector(placement)} a[hreflang="${lang}"]`).getAttribute('href');check(href===localizedPagePath(key,lang)+'?utm_source=language-qa&application=solar-lighting#main',`${locale}/${key}/${placement}: ${lang} exact counterpart and context`);}
  }
 }
 for(const width of [1440,1280,1100,768,390,320]){
  await page.setViewportSize({width,height:900});
  for(const locale of supportedLocales){
   await goto(localizedPagePath('home',locale));const header=page.locator(`${selector('header')}>summary`);
   check(await header.isVisible(),`${locale}/${width}: header language visible without opening navigation`);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${locale}/${width}: header fits viewport`);
   await header.click();check(await page.locator(`${selector('header')} a`).first().isVisible(),`${locale}/${width}: menu opens`);
   check(await page.locator(`${selector('header')} .locale-options`).evaluate(node=>{const r=node.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1;}),`${locale}/${width}: dropdown fits viewport`);
   await page.keyboard.press('Escape');check(await header.evaluate(node=>document.activeElement===node),`${locale}/${width}: Escape returns focus`);
   if(locale==='en'&&[1440,390,320].includes(width)){await header.click();await page.screenshot({path:join(out,`header-${width}.png`)});await page.keyboard.press('Escape');}
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 // Actual cross-document switches in every source/target pair, from both entry points.
 for(const placement of ['header','footer'])for(const source of supportedLocales)for(const target of supportedLocales.filter(lang=>lang!==source)){
  await goto(localizedPagePath('product',source)+'?utm_campaign=switch&quantity=12#specifications');
  const identity=await page.evaluate(()=>window.__documentIdentity);
  await choose(placement,target);await page.waitForURL(base+localizedPagePath('product',target)+'?utm_campaign=switch&quantity=12#specifications');
  check(await page.evaluate(()=>window.__documentIdentity)!==identity,`${placement}/${source}→${target}: full document navigation`);
  check(await page.locator('html').getAttribute('lang')===target&&await page.locator(`${selector('header')} [aria-current="true"]`).getAttribute('hreflang')===target&&await page.locator(`${selector('footer')} [aria-current="true"]`).getAttribute('hreflang')===target,`${placement}/${source}→${target}: body and both controls agree`);
  check((await page.locator('h1').innerText()).length>0&&(await page.title()).length>0,`${placement}/${source}→${target}: complete translated page loads`);
 }
 await goto('/products/light-pole-jack/?quantity=8#specifications');await choose('header','fr');await page.waitForURL(base+'/fr/equipment/?quantity=8#specifications');
 const frenchTitle=await page.title();await page.evaluate(()=>localStorage.setItem('pll-locale','th'));await page.reload({waitUntil:'load'});
 check(await page.locator('html').getAttribute('lang')==='fr'&&await page.title()===frenchTitle, 'Refresh honors the explicit French URL over a saved Thai preference');
 await page.goBack({waitUntil:'load'});check(new URL(page.url()).pathname==='/products/light-pole-jack/'&&await page.locator('html').getAttribute('lang')==='en','Back restores English URL and document');
 await page.goForward({waitUntil:'load'});check(new URL(page.url()).pathname==='/fr/equipment/'&&await page.locator('html').getAttribute('lang')==='fr','Forward restores French URL and document');
 await goto('/tools/roi-calculator/');await page.evaluate(()=>{history.replaceState(null,'','?utm_source=updated&quantity=19#formulas');});await choose('header','pt');await page.waitForURL(base+'/pt/tools/roi-calculator/?utm_source=updated&quantity=19#formulas');
 check(true,'Click uses the latest URL query and hash after history changes');
 await goto('/es/pricing-plan/?application=solar-lighting&quantity=12#main');await choose('footer','vi');await page.waitForURL(base+'/vi/pricing-plan/?application=solar-lighting&quantity=12#main');
 check(await page.locator('[name="application"]').inputValue()==='solar-lighting'&&await page.locator('[name="quantity"]').inputValue()==='12','Language switch preserves valid inquiry query inputs');
 await page.setViewportSize({width:320,height:900});await goto('/');await page.locator('.nav-toggle').click();await page.locator(`${selector('header')}>summary`).click();await page.keyboard.press('Escape');
 check(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true','First Escape closes only language menu');await page.keyboard.press('Escape');check(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='false','Second Escape closes mobile main menu');
 const footer=page.locator(`${selector('footer')}>summary`);await footer.click();check(await page.locator(`${selector('footer')} .locale-options`).evaluate(node=>{const r=node.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1;}),'Footer dropdown fits 320px');await page.screenshot({path:join(out,'footer-320.png')});await page.keyboard.press('Escape');
 const noStorage=await browser.newContext();await noStorage.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Blocked','SecurityError');};});const fallback=await noStorage.newPage();await fallback.goto(base+'/fr/equipment/');await fallback.locator(`${selector('header')}>summary`).click();await fallback.locator(`${selector('header')} a[hreflang="id"]`).click();await fallback.waitForURL(base+'/id/equipment/');check(await fallback.locator('html').getAttribute('lang')==='id','Disabled storage does not block switching');await noStorage.close();
 const noJS=await browser.newContext({javaScriptEnabled:false});const plain=await noJS.newPage();await plain.goto(base+'/es/equipment/');await plain.locator(`${selector('header')}>summary`).click();await plain.locator(`${selector('header')} a[hreflang="en"]`).click();await plain.waitForURL(base+'/products/light-pole-jack/');check(await plain.locator('html').getAttribute('lang')==='en','Native links and disclosure work without JavaScript');await noJS.close();
 const legacyPaths=['/404.html','/project/','/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency/','/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2/','/maximizing-roi-through-proper-care-and-rental-management-of-heavy-machines/','/the-importance-of-regular-inspections-for-heavy-machinery/'];
 const legacyErrors=[];for(const path of legacyPaths){const legacy=await context.newPage();legacy.on('pageerror',error=>legacyErrors.push(error.message));await legacy.goto(base+path+'?context=roi&utm_source=legacy#unused');check(await legacy.locator('header [data-language-switcher]').count()===1&&await legacy.locator('footer [data-language-switcher]').count()===1,`${path}: both legacy landmarks have language selection`);await legacy.locator(`${selector('header')}>summary`).click();check(await legacy.locator(`${selector('header')} a[hreflang="es"]`).getAttribute('href')==='/es/?utm_source=legacy',`${path}: untranslated content falls back to real homepage without page state`);await legacy.locator(`${selector('header')} a[hreflang="es"]`).click();await legacy.waitForURL(base+'/es/?utm_source=legacy');check(await legacy.locator('html').getAttribute('lang')==='es',`${path}: homepage fallback loads correctly`);await legacy.close();}
 check(store.list({includeTests:true}).total===0,'Switching languages never submits forms');check(errors.length===0,'No JavaScript errors in core language-switching flows');check(httpErrors.length===0,'No missing core documents or assets');verifyBuiltVersion(root);
}catch(error){failures.push(error.stack??String(error));process.exitCode=1;}
finally{await context.close();await browser.close();server.close();await once(server,'close');rmSync(directory,{recursive:true,force:true});const report={date:'2026-10-29',...version,passed:!failures.length,checks,failures,errors,httpErrors,scope:'119 core pages, both page landmarks, 84 actual source/target switches, reload/history/query/hash/storage/no-JS and six legacy entries',externalEmailSent:false};writeFileSync(join(root,'qa-reports/language-switching-browser.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:report.passed,checks:checks.length,failures,errors,httpErrors},null,2));}
