import test from 'node:test';
import assert from 'node:assert/strict';
import {languageOptions,languageHref} from '../src/lib/language-navigation.mjs';
import {supportedLocales} from '../src/lib/languages.mjs';
import {coreAlternates} from '../src/lib/site-config.mjs';

test('language choices use real counterparts with different English and localized slugs',()=>{
 const options=languageOptions({locale:'fr',pathname:'/fr/equipment/',alternates:coreAlternates('product')});
 assert.equal(options.find(o=>o.lang==='en').path,'/products/light-pole-jack/');
 assert.equal(options.find(o=>o.lang==='es').path,'/es/equipment/');
 assert.equal(options.filter(o=>o.current).length,1);
 assert.equal(options.filter(o=>o.current)[0].lang,'fr');
 const quote=languageOptions({alternates:coreAlternates('quote')});
 assert.equal(quote.find(o=>o.lang==='en').path,'/quote/');assert.equal(quote.find(o=>o.lang==='id').path,'/id/pricing-plan/');
});
test('an untranslated article keeps its current URL and offers actual language homepages',()=>{
 const options=languageOptions({locale:'en',pathname:'/guides/article/',alternates:[{lang:'en',path:'/guides/article/'}]});
 assert.equal(options.find(o=>o.lang==='en').path,'/guides/article/');
 assert.deepEqual(options.filter(o=>o.lang!=='en').map(o=>[o.path,o.fallback]),supportedLocales.filter(l=>l!=='en').map(l=>[`/${l}/`,true]));
 assert.equal(languageOptions({alternates:[]}).find(o=>o.lang==='en').path,'/');
});
test('same-page switches retain query parameters and hash without putting origin or locale in the query',()=>{
 assert.equal(languageHref('/es/equipment/','https://preview.test/products/light-pole-jack/?utm_source=qa&quantity=12#specifications'),'/es/equipment/?utm_source=qa&quantity=12#specifications');
 assert.equal(languageHref('/quote/','http://127.0.0.1/fr/pricing-plan/?application=solar-lighting#main'),'/quote/?application=solar-lighting#main');
 assert.equal(languageHref('/fr/','http://preview.test/es/'),'/fr/');
});
test('homepage fallback removes page-only parameters and anchors, preserving campaign attribution',()=>{
 assert.equal(languageHref('/th/','https://preview.test/guides/article/?context=roi&quantity=12&utm_source=guide&utm_campaign=test#section',false),'/th/?utm_source=guide&utm_campaign=test');
});
test('destinations never accept external, protocol-relative or malformed paths',()=>{
 for(const path of ['https://other.test/','//other.test/','/es/?x=1','/fr/#main'])assert.throws(()=>languageHref(path,'https://preview.test/'));
 assert.throws(()=>languageOptions({alternates:[{lang:'fr',path:'//other.test/'}]}));
});
