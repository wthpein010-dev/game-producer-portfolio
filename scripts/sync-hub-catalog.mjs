import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Script,createContext} from 'node:vm';
import {pathToFileURL} from 'node:url';

const base='https://wthpein010-dev.github.io/ai-application-hub/';
const featured=['gamespec-relay','planmap','codex-multi-thread-workbench'];
// Excluded from the resume's public catalog after publication-boundary review.
const excludedIds=new Set(['vita-mahjong','paws-home-client','paws-level-editor']);
const featuredImages={
  'gamespec-relay':'projects/gamespec-relay/og.png',
  planmap:'projects/planmap/video/poster.jpg',
  'codex-multi-thread-workbench':'projects/codex-multi-thread-workbench/video/poster.jpg',
};
async function download(path){const response=await fetch(new URL(path,base));if(!response.ok)throw Error(`${response.status} ${path}`);return Buffer.from(await response.arrayBuffer());}
const appBytes=await download('app-20260706-restore-games.js');
const mediaBytes=await download('hub-project-media.js');
const app=appBytes.toString('utf8'),mediaSource=mediaBytes.toString('utf8');
const start=app.indexOf('const defaultApps = '),end=app.indexOf('\n];',start);
if(start<0||end<0)throw Error('Hub catalog boundary changed; review source before syncing.');
// Only evaluate the public data expression, never the app bootstrap, storage or network logic.
const context=()=>createContext({HUB_BRIEF:'集中汇总全部应用、小游戏和工程体验，统一查看演示、视频与适用的平台版本。'},{codeGeneration:{strings:false,wasm:false}});
const raw=new Script('('+app.slice(start+'const defaultApps = '.length,end+2)+')').runInContext(context(),{timeout:500});
const mediaContext=context();new Script(mediaSource).runInContext(mediaContext,{timeout:500});
const media=mediaContext.HUB_PROJECT_MEDIA;
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const href=value=>{const url=new URL(typeof value==='object'?value.href:value,base);if(url.protocol!=='https:')throw Error('Non-public URL');return url.href;};
const projects=JSON.parse(JSON.stringify(raw)).filter(p=>!excludedIds.has(p.id)).map(p=>({id:p.id,name:p.name,category:p.category,status:p.status,brief:p.brief,aiUse:p.aiUse,entry:href(p.entry),video:p.video?href(p.video):null,tags:p.tags||[],downloads:Object.entries(p.platforms||{}).filter(([key,value])=>key!=='web'&&value).map(([platform,value])=>({platform,url:href(value)}))}));
if(projects.length<30||new Set(projects.map(p=>p.id)).size!==projects.length)throw Error('Unexpected catalog count or duplicates');
await mkdir('assets/hub-tools',{recursive:true});
const dependency=process.env.SHARP_MODULE||'sharp';
const {default:sharp}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
for(const id of featured){
  const p=projects.find(p=>p.id===id),m=media[id];if(!p||!m)throw Error(`Missing featured project ${id}`);
  const source=featuredImages[id]||m.src;
  const bytes=await download(source),metadata=await sharp(bytes).metadata();
  const src=`assets/hub-tools/${id}.${metadata.format==='jpeg'?'jpg':metadata.format}`;
  await writeFile(src,bytes);
  p.image={src,width:metadata.width,height:metadata.height,alt:m.alt,source:href(source),sha256:hash(bytes)};
}
await writeFile('src/hub-catalog.json',JSON.stringify({source:base,checkedAt:new Date().toISOString(),sourceSha256:hash(appBytes),mediaSha256:hash(mediaBytes),featured,projects},null,2)+'\n');
console.log(`Synced ${projects.length} public projects, ${featured.length} unchanged original images.`);
