import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {decorateImageMarkup,validateImageManifest} from '../src/responsive-images.mjs';

const manifest={version:1,images:{'assets/screens/screenshot.png':{width:1800,height:900,sourceSha256:'source',bytes:1800000,variants:[
  {src:'assets/optimized/screens/screenshot-480.webp',width:480,height:240,bytes:14000},
  {src:'assets/optimized/screens/screenshot-960.webp',width:960,height:480,bytes:40000},
  {src:'assets/optimized/screens/screenshot-1440.webp',width:1440,height:720,bytes:90000},
]}}};

test('preview uses responsive lighter files while preserving original link and geometry',()=>{
  const out=decorateImageMarkup('<figure class="taptap-cover"><a href="assets/screens/screenshot.png"><img src="assets/screens/screenshot.png" width="1800" height="900" loading="lazy" alt="原图 &amp; 项目"></a></figure>',manifest);
  assert.match(out,/href="assets\/screens\/screenshot\.png"/);
  assert.match(out,/src="assets\/optimized\/screens\/screenshot-960\.webp"/);
  assert.match(out,/srcset="assets\/optimized\/screens\/screenshot-480\.webp 480w, assets\/optimized\/screens\/screenshot-960\.webp 960w, assets\/optimized\/screens\/screenshot-1440\.webp 1440w"/);
  assert.match(out,/data-original-src="assets\/screens\/screenshot\.png"/);
  assert.match(out,/width="1800" height="900" loading="lazy" alt="原图 &amp; 项目"/);
  assert.match(out,/sizes="[^"]*240px"/);
  assert.match(out,/decoding="async"/);
});
test('deep pages keep relative prefixes on every preview candidate',()=>{
  const out=decorateImageMarkup('<img src="../../../assets/screens/screenshot.png" width="1800" height="900" alt="设计图">',manifest);
  assert.match(out,/src="\.\.\/\.\.\/\.\.\/assets\/optimized\/screens\/screenshot-960.webp"/);
  assert.match(out,/srcset="\.\.\/\.\.\/\.\.\/assets\/optimized\/screens\/screenshot-480.webp 480w/);
});
test('singleton landscape gallery advertises its wide readable slot instead of a card width',()=>{
  const out=decorateImageMarkup('<div class="taptap-shot-grid" data-shot-count="1"><figure><img src="assets/screens/screenshot.png" width="1800" height="900" alt="对话截图"></figure></div>',manifest);
  assert.match(out,/sizes="[^"]*854px"/);
});
test('multi-image landscape gallery follows its single-column breakpoint and desktop column width',()=>{
  const out=decorateImageMarkup('<div class="taptap-shot-grid" data-shot-count="2"><figure><img src="assets/screens/screenshot.png" width="1800" height="900" alt="作品截图"></figure></div>',manifest);
  assert.match(out,/sizes="[^"]*max-width: 760px[^\"]*560px"/);
});
test('native full resolution details retain originals while nested previews outside are optimized',()=>{
  const img='<img src="assets/screens/screenshot.png" loading="lazy" width="1800" height="900" alt="完整流程">';
  const out=decorateImageMarkup('<details class="matchmaking-inspect"><summary>原图</summary><div>'+img+'</div></details><figure>'+img+'</figure>',manifest);
  assert.match(out,/<div><img src="assets\/screens\/screenshot\.png"[^>]*data-full-resolution="true"/);
  assert.equal((out.match(/srcset=/g)||[]).length,1);
});
test('efficient originals, SVG and external images stay usable without invented variants',()=>{
  const html='<img src="assets/small.webp" alt="小图"><img src="assets/diagram.svg" alt="矢量图"><img src="https://example.com/image.png" alt="外链">';
  assert.equal(decorateImageMarkup(html,manifest),html);
});
test('responsive enrichment is idempotent and preserves existing encoded alternative text',()=>{
  const once=decorateImageMarkup('<img src="assets/screens/screenshot.png" alt="A &amp; B &quot;图片&quot;">',manifest);
  assert.equal(decorateImageMarkup(once,manifest),once);
  assert.match(once,/alt="A &amp; B &quot;图片&quot;"/);
});

test('build rejects stale original bytes rather than silently showing an old preview',()=>{
  const root=mkdtempSync(join(tmpdir(),'portfolio-stale-image-'));
  try {
    mkdirSync(join(root,'assets/optimized'),{recursive:true});
    writeFileSync(join(root,'assets/source.png'),'hello');
    writeFileSync(join(root,'assets/optimized/preview.webp'),'preview');
    const fixture={version:1,images:{'assets/source.png':{width:960,height:480,sourceSha256:'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',variants:[{src:'assets/optimized/preview.webp',width:480,height:240,bytes:7}]}}};
    validateImageManifest(root,fixture);
    writeFileSync(join(root,'assets/source.png'),'changed original');
    assert.throws(()=>validateImageManifest(root,fixture),/Stale image previews/);
  } finally {rmSync(root,{recursive:true,force:true});}
});
