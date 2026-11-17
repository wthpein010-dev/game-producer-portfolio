import test from 'node:test';
import assert from 'node:assert/strict';
import {jobs} from '../src/content.mjs';
import {renderDetail} from '../src/render.mjs';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('Supplied slot gameplay precedes historical visual drafts and preserves version boundaries',()=>{
  const j=jobs.find(j=>j.slug==='jianyou'),html=renderDetail(j,j.projects[0]);
  assert.ok(html.includes('id="sheep-playtest"'));
  assert.ok(html.indexOf('id="sheep-playtest"')<html.indexOf('id="sheep-visuals"'));
  for(const term of ['旧版','炸弹','预设方案','尚未上线','Vita Mahjong','不等于玩家','87%','未标注'])assert.ok(html.includes(term),term);
  assert.match(html,/<video[^>]*controls[^>]*playsinline/u);
  assert.doesNotMatch(html,/<video[^>]*autoplay/u);
  assert.ok(html.includes('id="sheep-level-evaluation"'));
});

test('Published gameplay assets are traceable, redacted and do not ship full private recording',async()=>{
  const {sheepPlaytestAssets}=await import('../src/sheep-playtest.mjs');
  assert.ok(sheepPlaytestAssets.length>=8);
  for(const asset of sheepPlaytestAssets){
    const bytes=await readFile(new URL('../assets/project-design/sheep-match/'+asset.file,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
  }
  const html=await readFile(new URL('../projects/sheep-match/index.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/20261117-154048|clipboard-|C:\\Users|rpv4d9p6q2/u);
});
