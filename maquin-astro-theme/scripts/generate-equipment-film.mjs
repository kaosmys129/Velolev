// Local, silent reference-image film. This is not field-operation footage.
// Run manually with FFmpeg installed; normal site builds use the checked-in MP4.
import {spawnSync} from "node:child_process";
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("../",import.meta.url));
const output=join(root,"public/media");
const temporary=mkdtempSync(join(tmpdir(),"volvet-equipment-film-"));
const scenes=[
  "images/product/portable-pole-lifter-hero-cutout.png",
  "images/evidence/equipment-trolley-side-detail.jpg",
  "images/evidence/field-installation-flange-erect.jpg",
  "images/evidence/factory-crating-export-package.jpg"
];
function ffmpeg(args){
  const result=spawnSync("ffmpeg",["-hide_banner","-loglevel","error","-y",...args],{stdio:"inherit"});
  if(result.error)throw result.error;
  if(result.status!==0)throw new Error(`FFmpeg exited with status ${result.status}`);
}
try{
  mkdirSync(output,{recursive:true});
  for(const [index,source] of scenes.entries()){
    const background=index===0?"0xc6ceba":"0x202622";
    const filter=`color=c=${background}:s=1280x720:r=24:d=6[background];[0:v]scale=1152:624:force_original_aspect_ratio=decrease[photo];[background][photo]overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuv420p,zoompan=z='1+0.018*on/143':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=24,fade=t=in:st=0:d=0.25:color=${background},fade=t=out:st=5.75:d=0.25:color=${background}[scene]`;
    ffmpeg(["-loop","1","-framerate","24","-t","6","-i",join(root,"public",source),"-filter_complex",filter,"-map","[scene]","-t","6","-an","-c:v","libx264","-preset","slow","-crf","24","-pix_fmt","yuv420p",join(temporary,`${index}.mp4`)]);
  }
  const playlist=join(temporary,"scenes.txt");
  writeFileSync(playlist,scenes.map((_,index)=>`file '${index}.mp4'`).join("\n"));
  ffmpeg(["-f","concat","-safe","0","-i",playlist,"-c","copy","-movflags","+faststart",join(output,"equipment-overview.mp4")]);
  console.log("Created public/media/equipment-overview.mp4 (24s, 1280×720, silent reference-image animation).");
}finally{rmSync(temporary,{recursive:true,force:true});}
