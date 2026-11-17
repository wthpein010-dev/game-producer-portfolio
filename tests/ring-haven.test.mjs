import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ringHavenMedia,renderRingHavenEntry,renderRingHavenBody} from '../src/ring-haven.mjs';

test('The homepage offers a short game design entry with three planning themes and a detail link',()=>{
  const html=renderRingHavenEntry();
  assert.match(html,/<section[^>]+id="ring-haven"/u);
  assert.match(html,/环环小憩/u);
  assert.match(html,/href="projects\/ring-haven\/"/u);
  const tags=html.match(/<ul class="collaboration-tags">([\s\S]*?)<\/ul>/u)?.[1];
  assert.ok(tags,'planning themes remain visible on the homepage');
  assert.equal((tags.match(/<li>/gu)||[]).length,3);
  assert.match(html,/用 AI 做出了一款圆环解谜游戏/u);
  assert.doesNotMatch(html,/试玩包|安卓未实测|code14/u);
  assert.equal((html.match(/<figure\b/gu)||[]).length,1);
  assert.match(html,/src="assets\/ring-haven\/home.webp"/u);
});

test('The case explains the core loop, feedback, mode rhythm and bounded daily challenge',()=>{
  const html=renderRingHavenBody();
  for(const term of ['旋转圆环','对齐开口','解开连接','绿色细描边','同色碎裂','30 个炸弹关','30 个奖励关','有效操作回合','允许部分结算','10 个普通关','每天一次','24 环、29 扣','大环','先后顺序'])assert.ok(html.includes(term),term);
  assert.match(html,/<ol class="ring-haven-path">[\s\S]*?<li>[\s\S]*?<li>[\s\S]*?<li>/u);
  assert.match(html,/至少用两次木槌/u);
  assert.match(html,/配有专用木槌/u);
  assert.match(html,/退出后可续玩同一局/u);
});

test('The reward loop and human contribution stay distinct from AI assisted implementation',()=>{
  const html=renderRingHavenBody();
  for(const term of ['Night Keeper','新海狸外观','主页换装','我怎么用 AI 做这个项目','我确定','用 AI 把需求做成'])assert.ok(html.includes(term),term);
  assert.doesNotMatch(html,/全部独立手写|独立完成全部|手机 FPS 提升|零 GC|留存提升\s*\d|收入增长\s*\d/u);
});

test('Eight complete portrait figures reserve geometry and keep same-image original links and honest sources',()=>{
  const html=renderRingHavenBody();
  const keys=['home','normal','rotate','bomb','reward','daily','wardrobe','result'];
  assert.deepEqual(ringHavenMedia.map(item=>item.key),keys);
  assert.equal(new Set(ringHavenMedia.map(item=>item.file)).size,8);
  assert.equal((html.match(/<figure\b/gu)||[]).length,8);
  for(const key of keys){
    const media=ringHavenMedia.find(item=>item.key===key);
    assert.equal(media.file,`${key}.webp`);
    assert.deepEqual([media.width,media.height],[640,1138]);
    assert.ok(media.alt.length>12,key);
    assert.match(media.caption,/Unity Editor/u);
    assert.match(media.caption,/演示/u);
    const figure=html.match(new RegExp(`<figure[^>]+data-ring-haven-image="${key}"[\\s\\S]*?<\\/figure>`,'u'))?.[0];
    assert.ok(figure,key);
    assert.ok(figure.includes(`src="../../assets/ring-haven/${key}.webp"`),key);
    assert.ok(figure.includes('width="640" height="1138"'),key);
    assert.equal((figure.match(new RegExp(`href="\\.\\./\\.\\./assets/ring-haven/${key}\\.webp"`,'gu'))||[]).length,2,key);
    assert.match(figure,/查看原图/u);
  }
});

test('The case reads as a personal portfolio and omits the package delivery report',()=>{
  const html=renderRingHavenBody();
  const hero=html.match(/<header class="detail-hero">([\s\S]*?)<\/header>/u)?.[1];
  assert.ok(hero);
  for(const term of ['AI','30 个炸弹关','30 个奖励关','海狸换装'])assert.ok(hero.includes(term),term);
  assert.doesNotMatch(html,/ring-haven-delivery|试玩包|静态校验|code14|安卓未实测/u);
  assert.doesNotMatch(html,/<a[^>]+(?:download|href="[^"]+\.(?:apk|zip|unitypackage|cs)(?:[?#"]))/u);
  assert.doesNotMatch(html,/已正式发布|正式上线成功|手机性能提升|增长验证|service_role|localhost|file:\/\/|[A-F]:[\\/]/u);
});

test('The detail reading path uses native navigation and a stable return anchor',()=>{
  const html=renderRingHavenBody();
  assert.match(html,/<main id="main"/u);
  assert.match(html,/href="\.\.\/\.\.\/index.html#ring-haven"/u);
  for(const match of html.matchAll(/href="#(ring-haven-[^"]+)"/gu))assert.ok(html.includes(`id="${match[1]}"`),match[1]);
  assert.doesNotMatch(html,/<(?:iframe|video|canvas)\b|onclick=|role="button"/u);
});

test('Reviewed public media preserves exact source pixels, declared portrait dimensions and metadata-free files',async()=>{
 const {createHash}=await import('node:crypto');
 const manifest=JSON.parse(await readFile(new URL('../assets/ring-haven/media.json',import.meta.url),'utf8'));
 const {ringHavenMedia}=await import('../src/ring-haven.mjs');
 assert.equal(manifest.images.length,8);
 for(const image of manifest.images){
  const media=ringHavenMedia.find(x=>x.key===image.id);assert.ok(media);
  assert.deepEqual([image.width,image.height],[media.width,media.height]);assert.equal(image.src,'assets/ring-haven/'+media.file);
  const bytes=await readFile(new URL('../'+image.src,import.meta.url));assert.equal(bytes.length,image.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),image.sha256);
  assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');let dimensions;
  for(let offset=12;offset<bytes.length;){const kind=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4),data=offset+8;assert.ok(data+size<=bytes.length);assert.ok(!['EXIF','XMP ','ICCP'].includes(kind));if(kind==='VP8L'){assert.equal(bytes[data],0x2f);const bits=bytes.readUInt32LE(data+1);dimensions=[(bits&0x3fff)+1,((bits>>>14)&0x3fff)+1];}offset=data+size+(size%2);}
  assert.deepEqual(dimensions,[640,1138]);assert.equal(image.privacyReviewed,true);assert.match(image.sourceType,/Editor/u);
 }
 assert.doesNotMatch(JSON.stringify(manifest),/file:\/\/|[A-F]:[\\/]|wxid_|Cookie|Token|localhost/u);
});

test('The actual public router serves the generated case and all eight reviewed assets',async()=>{
 const {once}=await import('node:events');const {createSiteServer}=await import('../scripts/serve.mjs');
 const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
 try{const base=`http://127.0.0.1:${server.address().port}`;const response=await fetch(base+'/projects/ring-haven/');assert.equal(response.status,200);assert.match(await response.text(),/环环小憩/u);const {ringHavenMedia}=await import('../src/ring-haven.mjs');for(const image of ringHavenMedia){const r=await fetch(base+'/assets/ring-haven/'+image.file);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/image\/webp/u);assert.ok((await r.arrayBuffer()).byteLength>100);}}
 finally{await new Promise(resolve=>server.close(resolve));}
});
