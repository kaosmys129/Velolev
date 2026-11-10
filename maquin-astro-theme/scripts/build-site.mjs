import {spawnSync} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {sourceFingerprint,referenceAssetFingerprint} from './lib/source-fingerprint.mjs';
import {publicOrigin} from '../src/lib/site-config.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),args=process.argv.slice(2),at=args.indexOf('--outDir');
const out=resolve(root,at>=0?args[at+1]:args.find(x=>x.startsWith('--outDir='))?.slice(9)??'dist');
const sourceDigest=sourceFingerprint(root),assetDigest=referenceAssetFingerprint(root);
const snapshotDigest=process.env.CONTENT_SNAPSHOT_FILE?createHash('sha256').update(readFileSync(process.env.CONTENT_SNAPSHOT_FILE)).digest('hex'):null;
const result=spawnSync(process.execPath,[join(root,'node_modules/astro/astro.js'),'build',...args],{cwd:root,stdio:'inherit',env:process.env});
if(result.status!==0){
 process.exitCode=result.status??1;
}else if(sourceDigest!==sourceFingerprint(root)||assetDigest!==referenceAssetFingerprint(root)){
 console.error('Source or reference media changed during build; this output must be rebuilt.');process.exitCode=1;
}else{
 writeFileSync(join(out,'.volvet-build.json'),JSON.stringify({sourceDigest,assetDigest,snapshotDigest,origin:publicOrigin()??null},null,2)+'\n');
 // A build with untranslated page copy or display attributes must not succeed.
 for(const script of ['verify-wordpress-retirement.mjs','verify-industrial-locales.mjs']){
  const check=spawnSync(process.execPath,[join(root,'scripts',script),'--dist='+out],{cwd:root,stdio:'inherit',env:process.env});
  if(check.status!==0){process.exitCode=check.status??1;break;}
 }
}
