import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const read=async file=>readFile(new URL('../'+file,import.meta.url));
const homePath='index.html';
const casePath='projects/yujiang-coffee/index.html';
const assets='assets/yujiang-coffee/';
const matches=(html,pattern)=>[...html.matchAll(pattern)];

test('Yujiang Coffee is listed once under Personal Works, after the two original collaborations',async()=>{
  const home=(await read(homePath)).toString('utf8');
  const content=home.slice(home.indexOf('id="selected"'));
  assert.equal(matches(home,/\bid="yujiang-coffee"/gu).length,1);
  assert.match(content,/<article[^>]+id="yujiang-coffee"[\s\S]*?渔江咖啡[\s\S]*?href="projects\/yujiang-coffee\/"/u);
  assert.ok(content.indexOf('除灵事务所')<content.indexOf('id="yujiang-coffee"'));
  assert.ok(content.indexOf('id="yujiang-coffee"')<content.indexOf('id="ai-tools"'));
  assert.equal(matches(home,/class="hub-tool-feature"/gu).length,3);
  assert.match(home,/<div class="hub-catalog-list" id="hub-more">/u);
});

test('Yujiang Coffee case explains a concrete design loop and offers truthful, accessible media',async()=>{
  const html=(await read(casePath)).toString('utf8');
  for(const phrase of ['渔江咖啡','策划','打捞','冲泡','来信','升级','44 个任务节点','120 封系统来信','Windows 0.16.0','Windows 0.26.0','本机联调']){
    assert.ok(html.includes(phrase),phrase);
  }
  assert.match(html,/href="\.\.\/\.\.\/index\.html#yujiang-coffee"/u);
  assert.match(html,/<video\b[^>]*\bcontrols\b[^>]*\bpreload="none"/u);
  assert.doesNotMatch(html,/<video\b[^>]*\bautoplay\b|localhost|file:\/\/|\.exe["']|\.zip["']/u);
  const manifest=JSON.parse(await read(assets+'media.json'));
  assert.ok(manifest.images.length>=8);
  for(const {file,width,height,sha256} of manifest.images){
    const bytes=await read(assets+file);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),sha256,file);
    assert.equal(bytes.toString('ascii',8,12),'WEBP',file);
    const offset=20; // Pillow's lossless, metadata-free WebP starts with VP8L.
    assert.equal(bytes.toString('ascii',12,16),'VP8L',file);
    assert.equal(bytes[offset],0x2f,file);
    const geometry=bytes.readUInt32LE(offset+1);
    assert.deepEqual([(geometry&0x3fff)+1,((geometry>>>14)&0x3fff)+1],[width,height],file);
    const asset='../../'+assets+file;
    const figure=matches(html,/<figure\b[\s\S]*?<\/figure>/gu).find(([item])=>item.includes('href="'+asset+'"'))?.[0];
    assert.ok(figure?.includes('width="'+width+'" height="'+height+'"'),file);
    assert.equal(bytes.readUInt32LE(offset-4)+offset+(bytes.readUInt32LE(offset-4)%2),bytes.length,'image must contain no extra metadata chunks');
  }
  const video=await read(assets+manifest.video.file);
  assert.ok(html.includes('src="../../'+assets+manifest.video.file+'"'));
  assert.equal(video.toString('ascii',4,8),'ftyp');
  assert.equal(createHash('sha256').update(video).digest('hex'),manifest.video.sha256);
  assert.doesNotMatch(JSON.stringify(manifest),/file:\/\/|[A-F]:[\\/]|wxid_|localhost/u);
});
