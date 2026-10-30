import assert from "node:assert/strict";
import {mkdtempSync,mkdirSync,rmSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {once} from "node:events";
import {randomBytes} from "node:crypto";
import {chromium} from "playwright";
import {createInquiryServer} from "../server/inquiry-server.mjs";
import {verifyBuiltVersion} from "./lib/source-fingerprint.mjs";

const root=fileURLToPath(new URL("../",import.meta.url));
const out=join(root,"../output/playwright/media");
const directory=mkdtempSync(join(tmpdir(),"volvet-media-browser-"));
mkdirSync(out,{recursive:true});
verifyBuiltVersion(root);
const {server}=createInquiryServer({directory,adminToken:randomBytes(36).toString("base64url"),testMode:true});
server.listen(0,"127.0.0.1");await once(server,"listening");
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:"reduce"});
await context.route("**/*",route=>route.request().url().startsWith(base)?route.continue():route.abort());
const page=await context.newPage(),checks=[],pageErrors=[],httpErrors=[];
page.on("pageerror",error=>pageErrors.push(error.message));
page.on("response",response=>{if(response.status()>=400)httpErrors.push({url:response.url(),status:response.status()});});
function check(value,label){assert.ok(value,label);checks.push(label);}
const pages=[
  ["home","/"],["product","/products/light-pole-jack/"],
  ["solar","/solutions/solar-street-light-installation/"],
  ["parking","/solutions/parking-lot-lighting/"],
  ["method","/guides/install-light-pole-without-crane/"],
  ["resources","/resources/"],["about","/about-us/"]
];
let failure;
try{
  let videoRequests=0;page.on("request",request=>{if(request.url().endsWith("equipment-overview.mp4"))videoRequests++;});
  await page.goto(base+"/",{waitUntil:"networkidle"});
  check(videoRequests===0,"Film does not request video bytes before interaction");
  check(await page.locator("video").evaluate(video=>video.paused&&video.preload==="none"&&!video.autoplay),"Film starts paused and never autoplays");
  await page.getByRole("button",{name:"Play the 24-second equipment overview"}).click();
  await page.waitForFunction(()=>{const video=document.querySelector("video");return video.currentTime>.1&&!video.paused;});
  check(await page.locator("video").evaluate(video=>video.controls&&Math.abs(video.duration-24)<.1),"Native H.264 playback starts and exposes controls");
  await page.locator('[data-film-chapter="18"]').click();
  await page.waitForFunction(()=>document.querySelector("video").currentTime>=18);
  await page.waitForFunction(()=>document.querySelector('[data-film-chapter="18"]').getAttribute("aria-current")==="true");
  check(await page.locator('[data-film-chapter="18"]').getAttribute("aria-current")==="true","Chapter selection seeks to packing and updates the active chapter");
  check(await page.locator("video").evaluate(video=>video.textTracks[0].cues?.length===4),"All four caption cues load with the correct VTT content type");
  await page.waitForFunction(()=>document.querySelector("video").currentTime>18.8);
  await page.locator("video").evaluate(video=>{video.pause();});
  await page.locator("[data-equipment-film]").screenshot({path:join(out,"film-playing.png")});
  await page.locator("video").evaluate(video=>{video.currentTime=23.9;void video.play();});
  await page.locator("[data-film-play]").waitFor({state:"visible"});
  check(await page.locator("video").evaluate(video=>video.ended),"Film returns to its play cover after ending");
  await page.locator("[data-film-play]").click();
  await page.waitForFunction(()=>{const video=document.querySelector("video");return video.currentTime<3&&!video.paused;});
  check(true,"Finished film can replay from the start");
  await page.locator("video").evaluate(video=>video.pause());

  const imageLink=page.locator("[data-media-image]").first();
  await imageLink.click();
  check(await page.locator("dialog").evaluate(dialog=>dialog.open),"Reference image opens in a native modal dialog");
  check(await page.locator("[data-lightbox-image]").getAttribute("src")===await imageLink.evaluate(link=>link.href),"Enlarged image uses the selected original source");
  check(await page.evaluate(()=>getComputedStyle(document.body).overflow==="hidden"),"Background scrolling locks while the image is open");
  await page.locator("dialog").screenshot({path:join(out,"image-lightbox.png")});
  await page.keyboard.press("Escape");
  check(await page.locator("dialog").evaluate(dialog=>!dialog.open),"Escape closes the image");
  check(await imageLink.evaluate(link=>document.activeElement===link),"Image dialog returns keyboard focus to the trigger");
  check(await page.evaluate(()=>getComputedStyle(document.body).overflow!=="hidden"),"Closing the image restores page scrolling");

  await page.goto(base+"/products/light-pole-jack/");
  await page.getByRole("tab").first().focus();await page.keyboard.press("End");
  await page.waitForFunction(()=>document.querySelector("#gallery-main-img").src.includes("factory-crating-export-package"));
  await page.locator("[data-stage-container]").click();
  check((await page.locator("[data-lightbox-image]").getAttribute("src")).includes("factory-crating-export-package"),"Product gallery enlargement follows the selected thumbnail");
  await page.getByRole("button",{name:"Close image"}).click();
  await page.getByRole("tab").last().focus();await page.keyboard.press("Home");
  await page.waitForFunction(()=>document.querySelector("#gallery-main-img").src.includes("hero-cutout"));
  check(await page.getByRole("tab").first().getAttribute("aria-selected")==="true","Product gallery retains Home/End keyboard navigation");

  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:width<760?844:1000});
    for(const [name,path] of pages){
      const response=await page.goto(base+path,{waitUntil:"networkidle"});
      check(response.status()===200,`${name}: ${width}px page available`);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${name}: ${width}px no horizontal overflow`);
      check(await page.locator("h1").count()===1,`${name}: ${width}px one main heading`);
      if([390,1440].includes(width)){
        for(const image of await page.locator("main img").all()){
          await image.scrollIntoViewIfNeeded();
          await page.waitForFunction(image=>image.complete&&image.naturalWidth>0,await image.elementHandle());
          await image.evaluate(async image=>{try{await image.decode();}catch{throw new Error(`Image could not be decoded: ${image.currentSrc||image.src}`);}});
        }
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.screenshot({path:join(out,`${name}-${width}.png`),fullPage:true});
      }
    }
  }
  await page.goto(base+"/fr/about-us/");await page.locator(".card-media[data-media-image]").first().click();
  check(await page.locator("dialog").evaluate(dialog=>dialog.open),"Localized about-page gallery shares image enlargement");
  await page.keyboard.press("Escape");

  const noScript=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await noScript.newPage();await fallback.goto(base+"/");
  check(await fallback.locator("video").getAttribute("controls")!==null,"Without JavaScript the film exposes native controls");
  check(await fallback.locator("[data-film-play]").isHidden(),"Without JavaScript the custom play cover does not block native video");
  check((await fallback.locator("[data-media-image]").first().getAttribute("href")).endsWith(".jpg"),"Without JavaScript image links still open the original file");
  await noScript.close();

  const errorContext=await browser.newContext();
  await errorContext.route("**/media/equipment-overview.mp4",route=>route.abort());
  const errorPage=await errorContext.newPage();await errorPage.goto(base+"/resources/");
  await errorPage.locator("[data-film-play]").click();
  await errorPage.locator("[data-film-error]").waitFor({state:"visible"});
  check((await errorPage.locator("[data-film-error] a").getAttribute("href")).endsWith(".mp4"),"Playback failure displays a usable file fallback");
  await errorContext.close();
  check(pageErrors.length===0,"No browser JavaScript errors");
  check(httpErrors.length===0,"No missing local images, video, captions or page assets");
  verifyBuiltVersion(root);
}catch(error){failure=error.stack??String(error);process.exitCode=1;}
finally{
  await context.close();await browser.close();server.close();await once(server,"close");rmSync(directory,{recursive:true,force:true});
  const report={passed:!failure,checks,pageErrors,httpErrors,...(failure?{failure}:{})};
  writeFileSync(join(out,"verification.json"),JSON.stringify(report,null,2)+"\n");
  console.log(JSON.stringify({passed:report.passed,checks:checks.length,pageErrors,httpErrors,failure},null,2));
}
