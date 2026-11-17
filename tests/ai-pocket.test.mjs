import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {renderHome} from '../src/render.mjs';
import {createSiteServer} from '../scripts/serve.mjs';

test('Home introduces the product case without replacing the three featured Hub tools',async()=>{
  const ai=await readFile(new URL('../src/ai.html',import.meta.url),'utf8');
  const home=renderHome(ai);
  assert.match(home,/id="ai-pocket"/u);
  assert.match(home,/href="projects\/ai-pocket\/"/u);
  assert.ok(home.indexOf('id="ai-pocket"')>home.indexOf('id="ai-collaboration"'));
  assert.ok(home.indexOf('id="ai-pocket"')<home.indexOf('id="selected"'));
  assert.equal((home.match(/class="hub-tool-feature"/gu)||[]).length,3);
  assert.match(home,/<details class="hub-more" id="hub-more">/u);
  assert.match(home,/查看其余 32 个应用与小游戏/u);
});

test('The standalone case explains design, human ownership and verified delivery boundaries',async()=>{
  const {renderAiPocketPage}=await import('../src/render.mjs');
  assert.equal(typeof renderAiPocketPage,'function');
  const html=renderAiPocketPage();
  for(const term of ['AI 随身舱','6 类任务','16 个子类','54 个任务入口','CSV','Wan2.1','24 页','Codex','4090D','不上传账号','自有账号或 API','另一台 Windows','Mac','选择工具','提示词','产物检查'])assert.ok(html.includes(term),term);
  assert.doesNotMatch(html,/0\.36\.0-usb\.1|六类任务直接进入，免登录/u);
  assert.doesNotMatch(html,/U\s*盘|USB\s*交付|便携交付/iu);
  assert.match(html,/href="\.\.\/\.\.\/index.html#ai-pocket"/u);
  for(const id of ['problem','office','scenarios','video','ownership','delivery'])assert.ok(html.includes(`id="${id}"`),id);
  assert.doesNotMatch(html,/自研大模型|商业化成功|全设备即插即用|效率提升\s*\d|service_role|localhost|file:\/\/|[A-F]:[\\/]/u);
  assert.doesNotMatch(html,/<a[^>]+(?:download|href="[^"]+\.(?:zip|exe))/u);
});

test('Six distinct reviewed images preserve real dimensions, original access and honest captions',async()=>{
  const {aiPocketMedia,renderAiPocketBody}=await import('../src/ai-pocket.mjs');
  assert.equal(aiPocketMedia.length,6);
  assert.deepEqual(aiPocketMedia.map(image=>image.file),['home.webp','office.webp','commerce.webp','novel.webp','video.webp','result.webp']);
  assert.deepEqual(aiPocketMedia.map(image=>[image.width,image.height]),[[1384,835],[752,314],[1384,835],[1384,835],[1540,920],[608,352]]);
  const html=renderAiPocketBody(value=>String(value));
  for(const image of aiPocketMedia){
    assert.ok(image.alt.length>12);
    if(image.key!=='home')assert.ok(image.caption.length>10);
    assert.match(html,new RegExp(`href="\\.\\./\\.\\./assets/ai-pocket/${image.file}"`));
    assert.ok(html.includes(`width="${image.width}" height="${image.height}"`));
  }
  assert.match(html,/教学样例/u);
  assert.match(html,/成片帧/u);
  assert.match(html,/本轮未重新实跑/u);
});

test('The build and CI explicitly include the new product route and scoped regression',async()=>{
  const build=await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8');
  const ci=await readFile(new URL('../.github/workflows/verify.yml',import.meta.url),'utf8');
  const routes=await readFile(new URL('../tests/site.test.mjs',import.meta.url),'utf8');
  assert.match(build,/renderAiPocketPage/u);
  assert.match(build,/'projects','ai-pocket'/u);
  assert.match(ci,/tests\/ai-pocket.test.mjs/u);
  assert.match(routes,/projects\/ai-pocket\/index.html/u);
});

test('Public media matches its reviewed manifest, original dimensions and metadata-free WebP export',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../assets/ai-pocket/media.json',import.meta.url),'utf8'));
  const {aiPocketMedia}=await import('../src/ai-pocket.mjs');
  assert.equal(manifest.images.length,6);
  assert.equal(new Set(manifest.images.map(image=>image.id)).size,6);
  for(const image of manifest.images){
    const expected=aiPocketMedia.find(item=>item.key===image.id);
    assert.ok(expected,image.id);
    assert.equal(image.src,'assets/ai-pocket/'+expected.file);
    assert.deepEqual([image.width,image.height],[expected.width,expected.height]);
    const bytes=await readFile(new URL('../'+image.src,import.meta.url));
    assert.equal(bytes.length,image.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),image.sha256);
    assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');
    let dimensions;
    for(let offset=12;offset<bytes.length;){
      const type=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4),data=offset+8;
      assert.ok(data+size<=bytes.length,image.id);
      assert.ok(!['EXIF','XMP ','ICCP'].includes(type),`${image.id}: private metadata chunk ${type}`);
      if(type==='VP8L'){
        assert.equal(bytes[data],0x2f);const bits=bytes.readUInt32LE(data+1);
        dimensions=[(bits&0x3fff)+1,((bits>>>14)&0x3fff)+1];
      }
      offset=data+size+(size%2);
    }
    assert.deepEqual(dimensions,[image.width,image.height],image.id);
    assert.equal(image.version,undefined);assert.ok(image.sourceType&&image.caption);
  }
  assert.doesNotMatch(JSON.stringify(manifest),/[A-F]:[\\/]|Users[\\/]|localhost|service_role/u);
});

test('The generated product case and its public assets can be served through the actual local router',async()=>{
  const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
  try{
    const base=`http://127.0.0.1:${server.address().port}`;
    const response=await fetch(base+'/projects/ai-pocket/');
    assert.equal(response.status,200);
    const html=await response.text();assert.match(html,/AI 随身舱/u);
    for(const file of ['home.webp','office.webp','commerce.webp','novel.webp','video.webp','result.webp']){
      const asset=await fetch(base+'/assets/ai-pocket/'+file);
      assert.equal(asset.status,200,file);assert.match(asset.headers.get('content-type'),/image\/webp/u);
      assert.ok((await asset.arrayBuffer()).byteLength>100,file);
    }
  }finally{await new Promise(resolve=>server.close(resolve));}
});
