import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {taptapGames} from '../src/taptap-games.mjs';
test('TapTap catalog matches verified studio entries and current project names',async()=>{
 const published = taptapGames.filter(game=>game.tapUrl);
 assert.equal(published.length,12);
 for(const [id,title] of [['1005408','拼拼不烧心'],['984529','你的孩子'],['984008','封神对决'],['984393','我的一生'],['974262','造景贴纸：贴了不烧心']]){
  assert.equal(published.find(g=>new URL(g.tapUrl).pathname==='/app/'+id)?.title,title);
 }
 assert.equal(new Set(published.map(g=>g.tapUrl)).size,published.length);
 for(const game of published){
  assert.match(game.captureNote,/TapTap.*展示图/u);
  const html=await readFile(new URL(`../projects/taptap-${game.slug}/index.html`,import.meta.url),'utf8');
  assert.ok(html.includes(`datetime="${game.updatedAt}"`));
  assert.ok(html.includes(game.title));
 }
});
test('refreshed TapTap images retain original bytes and public provenance',async()=>{
 const provenance=JSON.parse(await readFile(new URL('../src/taptap-public-refresh.json',import.meta.url),'utf8'));
 const published = taptapGames.filter(game=>game.tapUrl);
 assert.equal(provenance.length,published.length);
 assert.equal(new Set(provenance.map(entry=>entry.appUrl)).size,published.length);
 for(const entry of provenance){
  const game=published.find(item=>item.tapUrl===entry.appUrl);
  assert.ok(game,entry.appUrl);
  assert.equal(entry.verifiedOn,game.updatedAt);
  assert.equal(entry.developerUrl,'https://www.taptap.cn/developer/486853');
  assert.deepEqual(entry.shots.map(({src,width,height})=>({src,width,height})),
   game.shots.map(({src,width,height})=>({src,width,height})));
  for(const shot of entry.shots){
   const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
   assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
   assert.ok(shot.source.startsWith('https://img-tc.tapimg.com/'));
   assert.ok((await stat(new URL('../'+shot.src,import.meta.url))).size>1000);
  }
 }
});

test('My Life has a featured entry inside Personal Projects and reuses its existing case URL',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const selected=html.indexOf('id="selected"');
 const indie=html.indexOf('id="indie-games"',selected);
 const myLife=html.indexOf('id="my-life-showcase"',indie);
 const catalog=html.indexOf('id="taptap-games"',myLife);
 assert.ok(selected>=0&&indie>selected&&myLife>indie&&catalog>myLife);
 const entry=html.slice(myLife,catalog);
 assert.match(entry,/我的一生/u);
 assert.match(entry,/href="projects\/taptap-my-life\/"[^>]*>查看玩法与设计/u);
 assert.match(entry,/src="assets\/my-life\/title-screen\.webp"/u);
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
