import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile(new URL(`../${path}`, import.meta.url));

test('Token game links from Personal Projects and returns to the same entry', async () => {
  const home = (await read('index.html')).toString();
  const detail = (await read('projects/token-game/index.html')).toString();
  const section = home.slice(home.indexOf('id="selected"'), home.indexOf('id="ai-tools"'));
  assert.match(section, /id="indie-games"[\s\S]*id="token-game"[\s\S]*id="taptap-games"/u);
  assert.match(section, /href="projects\/token-game\/"/u);
  assert.match(detail, /href="\.\.\/\.\.\/index\.html#token-game"/u);
  assert.match(detail, /Windows 可玩原型 0\.11\.8 · 画面取自同版本导出包的测试场景/u);
  assert.match(detail, /用 Codex 协助/u);
  assert.doesNotMatch(detail, /已上线 Steam|Steam 商店|<a[^>]+ download|file:\/\/|localhost|[A-F]:[\\/]/u);
});

test('Seven reviewed screenshots keep their declared dimensions and public original links', async () => {
  const {images} = JSON.parse(await read('assets/token-game/media.json'));
  const detail = (await read('projects/token-game/index.html')).toString();
  assert.equal(new Set(images.map(image => image.id)).size, 7);
  assert.equal((detail.match(/<figure class="token-game-figure">/gu) || []).length, 7);
  for (const {id, width, height, bytes, sha256} of images) {
    const path = `assets/token-game/${id}.webp`;
    const source = await read(path);
    assert.equal(source.length, bytes, id);
    assert.equal(createHash('sha256').update(source).digest('hex'), sha256, id);
    assert.equal(source.toString('ascii', 8, 16), 'WEBPVP8L', id);
    const size = source.readUInt32LE(21);
    assert.deepEqual([(size & 0x3fff) + 1, ((size >>> 14) & 0x3fff) + 1], [width, height], id);
    assert.ok(detail.includes(`href="../../${path}"`), id);
    assert.ok(detail.includes(`src="../../${path}" width="${width}" height="${height}" alt="`), id);
  }
});
