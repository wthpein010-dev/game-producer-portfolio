import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {taptapGames} from '../src/taptap-games.mjs';
test('TapTap catalog matches eleven verified studio entries and current project names',async()=>{
 assert.equal(taptapGames.length,11);
 for(const [id,title] of [['984529','你的孩子'],['984008','封神对决'],['984393','我的一生'],['974262','造景贴纸：贴了不烧心']]){
  assert.equal(taptapGames.find(g=>new URL(g.tapUrl).pathname==='/app/'+id)?.title,title);
 }
 assert.equal(new Set(taptapGames.map(g=>g.tapUrl)).size,11);
 for(const game of taptapGames){
  assert.equal(game.updatedAt,'2026-10-25');
  assert.equal(game.shots.length,3);
  assert.match(game.captureNote,/TapTap.*展示图/u);
  const html=await readFile(new URL(`../projects/taptap-${game.slug}/index.html`,import.meta.url),'utf8');
  assert.ok(html.includes('datetime="2026-10-25"'));
  assert.ok(html.includes(game.title));
 }
});
test('refreshed TapTap images retain original bytes and public provenance',async()=>{
 const provenance=JSON.parse(await readFile(new URL('../src/taptap-public-refresh.json',import.meta.url),'utf8'));
 assert.equal(provenance.length,11);
 for(const entry of provenance){
  assert.equal(entry.verifiedOn,'2026-10-25');
  assert.equal(entry.developerUrl,'https://www.taptap.cn/developer/486853');
  for(const shot of entry.shots){
   const bytes=await readFile(new URL('../'+shot.src,import.meta.url));
   assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256);
   assert.ok(shot.source.startsWith('https://img-tc.tapimg.com/'));
   assert.ok((await stat(new URL('../'+shot.src,import.meta.url))).size>1000);
  }
 }
});
