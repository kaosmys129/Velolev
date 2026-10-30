import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {siteRedirects,legacyPageKeys,corePages,localizedPagePath,industrialLocales} from '../src/lib/site-config.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));

test('every retired route is a terminal topic-preserving alias in all seven languages',()=>{
 for(const [slug,key] of Object.entries(legacyPageKeys))for(const lang of ['en',...industrialLocales]){
  const from=`${lang==='en'?'':`/${lang}`}/${slug}/`,target=localizedPagePath(key,lang);
  if(from===target)continue;
  assert.equal(siteRedirects[from],target,from);
  assert.equal(siteRedirects[target],undefined,`redirect chain: ${from}`);
 }
 for(const target of Object.values(siteRedirects))assert.ok(Object.keys(corePages).some(key=>['en',...industrialLocales].some(l=>localizedPagePath(key,l)===target)),target);
});

test('relocated product references and font preserve original bytes',()=>{
 const manifest=JSON.parse(readFileSync(join(root,'../archives/wordpress-retirement-manifest.json')));
 for(const [old,next] of [
 ['2025/01/portable-pole-lifter-hero-cutout.png','images/product/portable-pole-lifter-hero-cutout.png'],
 ['2025/01/portable-pole-lifter-hero-cutout-300x211.png','images/product/portable-pole-lifter-hero-cutout-300x211.png'],
 ['2025/01/portable-pole-lifter-side-cutout.png','images/product/portable-pole-lifter-side-cutout.png'],
 ['2025/01/portable-light-pole-lifter-specification-sheet.png','images/product/portable-light-pole-lifter-specification-sheet.png'],
 ['elementor/google-fonts/fonts/geologica-oy1l8evir7j9p3tn9ywnadyjzuydkkkdagojh1ulcduihaidhczon1flsig7jfvccphzckuwe1le.woff2','fonts/geologica-latin.woff2']]){
  const source=manifest.files.find(f=>f.path===`maquin-astro-theme/public/wp-content/uploads/sites/3/${old}`);
  assert.ok(source);const target=join(root,'public',next);assert.ok(existsSync(target),next);
  assert.equal(createHash('sha256').update(readFileSync(target)).digest('hex'),source.sha256,next);
 }
});

test('retired runtime and content editor cannot be re-enabled by the active build',()=>{
 for(const p of ['public/wp-content','public/wp-includes','src/fragments','src/layouts/BaseLayout.astro','src/pages/admin/content.astro','src/pages/blog/[slug].astro','src/pages/[lang]/blog/[slug].astro','scripts/content-admin-plugin.mjs'])assert.equal(existsSync(join(root,p)),false,p);
 assert.doesNotMatch(readFileSync(join(root,'astro.config.mjs'),'utf8'),/contentAdminPlugin/);
 assert.equal(JSON.parse(readFileSync(join(root,'package.json'))).scripts.generate,undefined);
});

test('the replacement inventory includes reviewed guide articles and excludes admin, redirects and error pages',async t=>{
 const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs');
 const {tmpdir}=await import('node:os');
 const directory=mkdtempSync(join(tmpdir(),'volvet-inventory-test-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
 for(const [path,html] of [
  ['index.html','<title>Home</title><h1>Home</h1>'],
  ['guides/reviewed-example/index.html','<title>Reviewed example</title><h1>Reviewed guide</h1>'],
  ['es/contact-us/index.html','<title>Contacto</title><h1>Contacto</h1>'],
  ['admin/inquiries/index.html','<h1>Inbox</h1>'],
  ['404.html','<h1>Missing</h1>'],
  ['equipment/index.html','<meta http-equiv="refresh" content="0;url=/products/light-pole-jack/">']]){
  const target=join(directory,path);mkdirSync(join(target,'..'),{recursive:true});writeFileSync(target,html);
 }
 const {inventoryBuiltPages}=await import('./lib/current-page-inventory.mjs');
 const rows=inventoryBuiltPages(directory);assert.equal(rows.length,3);
 assert.equal(rows.find(r=>r.url==='/guides/reviewed-example/').role,'reviewed_article');
 assert.equal(rows.find(r=>r.url==='/es/contact-us/').locale,'es');
 assert.equal(rows.find(r=>r.url==='/').h1_count,1);
});
