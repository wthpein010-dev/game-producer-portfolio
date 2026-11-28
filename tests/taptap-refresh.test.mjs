import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {taptapGames} from '../src/taptap-games.mjs';
import tiankengCaseMedia from '../assets/taptap/tiankeng/case-media.json' with {type:'json'};
import lunarCaseMedia from '../assets/taptap/lunar-freight/case-media.json' with {type:'json'};

const caseMedia = {tiankeng:tiankengCaseMedia, 'lunar-freight':lunarCaseMedia};

test('拼拼不烧心 uses only its Chinese Android 0.60.0 captures', async () => {
 const home=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const detail=await readFile(new URL('../projects/taptap-jigmeme/index.html',import.meta.url),'utf8');
 assert.equal((home.match(/id="work-jigmeme"/gu)||[]).length,1);
 assert.match(home,/href="projects\/taptap-jigmeme\/#android-preview"/u);
 const card=home.match(/<article[^>]+id="work-jigmeme"[\s\S]*?<\/article>/u)?.[0]||'';
 const gallery=detail.match(/<section[^>]+id="screenshots"[\s\S]*?<\/section>/u)?.[0]||'';
 assert.match(card,/拼拼不烧心/u);
 assert.match(gallery,/Android 试玩版 0\.60\.0/u);
 assert.match(gallery,/id="android-preview"/u);
 assert.doesNotMatch(card+detail,/Cozy Pieces|jigmeme\/[^/"\s]+\.jpg|TapTap 制造版 1\.0\.4/u);
 const game=taptapGames.find(entry=>entry.slug==='jigmeme');
 const manifest=JSON.parse(await readFile(new URL('../assets/taptap/jigmeme/android-060/media.json',import.meta.url),'utf8'));
 assert.equal(manifest.version,'0.60.0');
 assert.equal(manifest.versionCode,64);
 assert.equal(manifest.locale,'zh-CN');
 assert.deepEqual(manifest.shots,game.shots);
 assert.equal(manifest.shots.length,8);
 const covers=JSON.parse(await readFile(new URL('../assets/ai-game-covers/manifest.json',import.meta.url),'utf8'));
 const cover=covers.covers.jigmeme;
 assert.ok(card.includes(cover.src));
 assert.ok(cover.sources.length>=2&&cover.sources.every(src=>manifest.shots.some(shot=>shot.src===src)));
 assert.equal(cover.width*9,cover.height*16);
 assert.equal([...detail.matchAll(/<img[^>]+src="\.\.\/\.\.\/assets\/taptap\/jigmeme\//gu)].length,8);
 for(const shot of manifest.shots){
  const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256,shot.src);
  assert.ok(detail.includes(`src="../../${shot.src}" width="${shot.width}" height="${shot.height}"`),shot.src);
  assert.ok(detail.includes(`href="../../${shot.src}"`),shot.src);
 }
});
test('TapTap catalog matches verified studio entries and current project names',async()=>{
 const published = taptapGames.filter(game=>game.tapUrl);
 assert.equal(published.length,13);
 for(const [id,title] of [['989864','昼夜命运：塔罗之城'],['1005408','拼拼不烧心'],['984529','你的孩子'],['984008','封神对决'],['984393','我的一生'],['974262','造景贴纸：贴了不烧心']]){
  assert.equal(published.find(g=>new URL(g.tapUrl).pathname==='/app/'+id)?.title,title);
 }
 assert.equal(new Set(published.map(g=>g.tapUrl)).size,published.length);
 for(const game of published){
  const capturePattern = {
   'fengshen-duel': /0\.36.*竖屏运行画面/u,
   'daynight-fate': /TapTap Maker.*运行采集/u,
   'food-car': /竖屏开发版.*Windows 引擎采集/u,
   'jigmeme': /简体中文.*模拟器/u,
  }[game.slug] ?? /TapTap.*展示图/u;
  assert.match(game.captureNote,capturePattern);
  const html=await readFile(new URL(`../projects/taptap-${game.slug}/index.html`,import.meta.url),'utf8');
  assert.ok(html.includes(`datetime="${game.updatedAt}"`));
  assert.ok(html.includes(game.title));
 }
});
test('Fengshen Duel publishes the 0.36 release gallery and real gameplay clip on the existing route',async()=>{
 const game=taptapGames.find(entry=>entry.slug==='fengshen-duel');
 const root=new URL('../',import.meta.url);
 const manifest=JSON.parse(await readFile(new URL('assets/taptap/fengshen-duel/media-036.json',root),'utf8'));
 assert.equal(manifest.publicSource,game.tapUrl);
 assert.equal(manifest.version,'0.36');
 assert.deepEqual(manifest.assets.filter(asset=>asset.kind==='engine-screenshot').map(asset=>[asset.width,asset.height]),Array.from({length:8},()=>[720,1280]));
 assert.deepEqual(new Set(manifest.assets.map(asset=>asset.path)),new Set([...game.shots.map(shot=>shot.src),game.video.src]));
 for(const asset of manifest.assets) {
  const bytes=await readFile(new URL(asset.path,root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,asset.path);
 }
 const detail=await readFile(new URL('projects/taptap-fengshen-duel/index.html',root),'utf8');
 assert.ok(detail.includes(`<source src="../../${game.video.src}" type="video/mp4">`));
});
test('refreshed TapTap images retain original bytes and public provenance',async()=>{
 const provenance=JSON.parse(await readFile(new URL('../src/taptap-public-refresh.json',import.meta.url),'utf8'));
 // Engine captures are checked against their own media records.
 const published = taptapGames.filter(game=>game.tapUrl&&game.slug!=='daynight-fate'&&!game.previewVersion);
 assert.equal(provenance.length,published.length);
 assert.equal(new Set(provenance.map(entry=>entry.appUrl)).size,published.length);
 for(const entry of provenance){
  const game=published.find(item=>item.tapUrl===entry.appUrl);
  assert.ok(game,entry.appUrl);
  const hasNewGallery=['fengshen-duel','food-car'].includes(game.slug);
  assert.equal(entry.verifiedOn,hasNewGallery ? '2026-10-25' : game.updatedAt);
  assert.equal(entry.developerUrl,'https://www.taptap.cn/developer/486853');
  if(!hasNewGallery){
   const recordedCases=caseMedia[game.slug]?.shots??[];
   assert.deepEqual(game.shots.map(({src,width,height})=>({src,width,height})),
    [...entry.shots,...recordedCases].map(({src,width,height})=>({src,width,height})));
  }
  for(const shot of entry.shots){
   const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
   assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
   assert.ok(shot.source.startsWith('https://img-tc.tapimg.com/'));
   assert.ok((await stat(new URL('../'+shot.src,import.meta.url))).size>1000);
  }
 }
});

test('Tiankeng and Lunar Freight distinguish recorded cases from TapTap display images',async()=>{
 for(const [slug,sourceLabel] of [['tiankeng','V2 本地开发预览'],['lunar-freight','历史 Maker 网页实机验收']]){
  const detail=await readFile(new URL(`../projects/taptap-${slug}/index.html`,import.meta.url),'utf8');
  for(const shot of caseMedia[slug].shots){
   const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
   assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
   const figure=detail.match(/<figure\b[\s\S]*?<\/figure>/gu)?.find(item=>item.includes(`href="../../${shot.src}"`));
   assert.ok(figure?.includes(`width="${shot.width}" height="${shot.height}"`),shot.src);
   assert.ok(figure.includes(sourceLabel),shot.src);
  }
 }
});

test('My Life has one card and retains its former home anchor',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const homeCard=html.indexOf('id="work-my-life"');
 assert.ok(homeCard>html.indexOf('id="taptap-games"'));
 const entry=html.slice(homeCard,html.indexOf('</article>',homeCard));
 assert.match(entry,/我的一生/u);
 assert.match(entry,/href="projects\/taptap-my-life\/"/u);
 assert.match(entry,/id="my-life-showcase"/u);
 assert.equal((html.match(/href="projects\/taptap-my-life\/"/gu)||[]).length,1);
});

test('My Life shows documented Windows gameplay separately from TapTap images',async()=>{
 const route='projects/taptap-my-life/index.html';
 const html=await readFile(new URL('../'+route,import.meta.url),'utf8');
 assert.match(html,/id="my-life-pc"/u);
 assert.match(html,/Windows 试玩版/u);
 assert.match(html,/href="https:\/\/www\.taptap\.cn\/app\/984393"/u);
 assert.doesNotMatch(html,/happy-family-research|file:\/\/|[A-Z]:[\\/]|wxid_/u);
 const manifest=JSON.parse(await readFile(new URL('../assets/my-life/media.json',import.meta.url),'utf8'));
 assert.equal(manifest.sources.length,6);
 for (const shot of manifest.sources) {
  const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  let dimensions;
  for(let offset=12;offset<bytes.length;){
   const kind=bytes.toString('ascii',offset,offset+4);
   const size=bytes.readUInt32LE(offset+4);
   const data=offset+8;
   assert.ok(data+size<=bytes.length);
   assert.ok(!['EXIF','XMP ','ICCP'].includes(kind));
   if(kind==='VP8L'){
    const bits=bytes.readUInt32LE(data+1);
    dimensions=[(bits&0x3fff)+1,((bits>>>14)&0x3fff)+1];
   }
   offset=data+size+(size%2);
  }
  assert.deepEqual(dimensions,[1920,1080]);
  assert.ok(html.includes(`src="../../${shot.src}" width="1920" height="1080"`),shot.src);
  assert.ok(html.includes(`href="../../${shot.src}"`),shot.src);
 }
});

test('Your Child adds its Windows development evidence to the existing personal work',async()=>{
 const game=taptapGames.find(entry=>entry.slug==='your-child');
 const home=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const page=await readFile(new URL('../projects/taptap-your-child/index.html',import.meta.url),'utf8');
 assert.equal((home.match(/id="work-your-child"/gu)||[]).length,1);
 const card=home.match(/<article[^>]+id="work-your-child"[\s\S]*?<\/article>/u)?.[0]||'';
 assert.match(card,/照护任务链/gu);
 assert.match(card,/projects\/taptap-your-child\//u);
 const section=page.match(/<section[^>]+id="windows-preview"[\s\S]*?<\/section>/u)?.[0]||'';
 assert.match(section,/Windows 3D 开发实录/u);
 assert.match(section,/0\.34\.4/u);
 assert.match(page,/TapTap 2D 试玩/u);
 assert.equal(game.shots.length,3);
 assert.equal(game.windowsPreview.shots.length,5);
 for(const shot of game.windowsPreview.shots){
  const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
  assert.equal(bytes.subarray(1,4).toString(),'PNG');
  assert.equal(bytes.readUInt32BE(16),shot.width);
  assert.equal(bytes.readUInt32BE(20),shot.height);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
  assert.ok(section.includes(`src="../../${shot.src}"`));
  assert.ok(section.includes(`href="../../${shot.src}"`));
  assert.doesNotMatch(card,new RegExp(shot.src,'u'));
 }
});

test('Daynight Fate publishes reviewed images with accurate dimensions and separate platform captions',async()=>{
 const game=taptapGames.find(game=>game.slug==='daynight-fate');
 const {images}=JSON.parse(await readFile(new URL('../assets/taptap/daynight-fate/media.json',import.meta.url),'utf8'));
 const html=await readFile(new URL('../projects/taptap-daynight-fate/index.html',import.meta.url),'utf8');
 assert.equal(images.length,8);
 assert.equal(images.filter(image=>image.platform==='TapTap Maker').length,4);
 assert.equal(images.filter(image=>image.platform==='Windows').length,4);
 assert.deepEqual(game.shots.map(shot=>shot.src),images.map(image=>image.src));
 for(const [index,image] of images.entries()){
  const bytes=await readFile(new URL('../'+image.src,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),image.sha256);
  assert.equal(bytes.toString('ascii',8,16),'WEBPVP8 ');
  const [width,height]=[bytes.readUInt16LE(26)&0x3fff,bytes.readUInt16LE(28)&0x3fff];
  const shot=game.shots[index];
  assert.deepEqual([width,height],[image.width,image.height],image.src);
  assert.deepEqual([width,height],[shot.width,shot.height],image.src);
  assert.ok(shot.caption.includes(image.platform),image.src);
 }
 assert.match(html,/TapTap Maker 0\.1\.9/u);
 assert.match(html,/Windows 0\.41/u);
 assert.match(html,/2026 年 10 月 30 日开放 TapTap 试玩/u);
 assert.match(html,/白天省下来的一张牌，入夜有另一种用法/u);
});

test('Food Car shows its promotional art, real gameplay and production art on the existing route',async()=>{
 const game=taptapGames.find(entry=>entry.slug==='food-car');
 const root=new URL('../',import.meta.url);
 const home=await readFile(new URL('index.html',root),'utf8');
 const detail=await readFile(new URL('projects/taptap-food-car/index.html',root),'utf8');
 const card=home.match(/<article[^>]+id="work-food-car"[\s\S]*?<\/article>/u)?.[0]||'';
 assert.equal((home.match(/id="work-food-car"/gu)||[]).length,1);
 assert.match(card,/横版宣传插画/u);
 assert.match(card,/projects\/taptap-food-car\//u);
 assert.match(detail,/多一个空位，就多一份腾挪余地/u);
 assert.match(detail,/竖屏开发版/u);
 assert.match(detail,/id="production-art"/u);
 assert.match(detail,/href="#production-art"/u);
 assert.doesNotMatch(detail,/file:\/\/|[A-Z]:[\\/]|wxid_/u);
 const {assets}=JSON.parse(await readFile(new URL('assets/taptap/food-car/media.json',root),'utf8'));
 assert.deepEqual(assets.map(asset=>asset.kind),[
  'promotional-art','engine-screenshot','engine-screenshot','engine-screenshot','engine-screenshot',
  'production-art','production-art','engine-video'
 ]);
 const shots=[...game.shots,...game.artwork];
 assert.deepEqual(assets.map(asset=>asset.src),[...shots.map(shot=>shot.src),game.video.src]);
 for(const [index,asset] of assets.entries()){
  const bytes=await readFile(new URL(asset.src,root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,asset.src);
  if(index<shots.length){
   assert.deepEqual([asset.width,asset.height],[shots[index].width,shots[index].height]);
   assert.ok(detail.includes(`href="../../${asset.src}"`),asset.src);
  }
 }
 assert.ok(detail.includes(`<source src="../../${game.video.src}" type="video/mp4">`));
});
