import test from 'node:test';
import assert from 'node:assert/strict';
import {jobs} from '../src/content.mjs';
import {renderDetail} from '../src/render.mjs';
import {sheepDesigns} from '../src/sheep-design.mjs';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const job=jobs.find(item=>item.slug==='jianyou');
const html=()=>renderDetail(job,job.projects[0]);
test('Sheep project removes tile-pattern section and keeps other reviewed references',()=>{
  assert.equal(sheepDesigns.some(item=>item.id==='tile-patterns'),false);
  assert.doesNotMatch(html(),/砖块图案搭配|tile-patterns\.png/u);
  assert.equal(sheepDesigns.some(item=>item.id==='save-recovery'),false);
  assert.ok(sheepDesigns.some(item=>item.id==='lucky-items'));
});
test('Level document explanation and logic replace the removed recovery case',()=>{
  const page=html();
  assert.doesNotMatch(page,/第二关存档恢复|save-recovery\.png|design-save-recovery/u);
  const level=sheepDesigns.find(item=>item.id==='level-gameplay');
  assert.ok(level);
  assert.match(level.title,/关卡玩法/u);
  assert.match(level.file,/board-no-pair-decision-detail\.jpg/u);
  const copy=JSON.stringify(level);
  for(const term of ['教学','第二关','配对','结算'])assert.ok(copy.includes(term),term);
  assert.match(copy,/历史/u);
});
test('Real interface excerpts precede role copy and three readable board details have original links',()=>{
  const page=html();
  assert.ok(page.includes('id="sheep-visuals"'));
  assert.ok(page.indexOf('id="sheep-visuals"')<page.indexOf('id="work-value"'));
  for(const file of ['daily-entry-ui.jpg','daily-reward-ui.jpg','daily-result-ui.jpg','board-no-pair-decision-detail.jpg','board-prop-guidance-detail.jpg','board-revival-results-detail.jpg'])assert.ok(page.includes(file),file);
  assert.ok(page.includes('id="sheep-flow-gallery"'));
  assert.match(page,/历史.*流程/u);
  assert.match(page,/早期.*方案/u);
});
test('Selected interface and board crops retain reviewed bytes',async()=>{
  const hashes={
    'daily-entry-ui.jpg':'aa6935a397491a8df01d457da6b0cca766e7cb1228b9cbe2a501687ed6d0c9ed',
    'daily-reward-ui.jpg':'d19b1bd8c476be15192c5ba097f106cb384b40339a02f46d343dae3f729ca0bb',
    'daily-result-ui.jpg':'860cf465e354d2aca6bcfb8ad9a397c0a3bae0e873dc61cefa8036e328207eee',
    'board-prop-guidance-detail.jpg':'b78b87fd48862d4da9cdcd4cbe8960432cbf2dfbc8a6467397bb0b6cd5b8ca4e',
    'board-revival-results-detail.jpg':'a19fb85d9d6300fbf746a9226478f44816450ef7bd4755a94d07238edea2fb43',
  };
  for(const [file,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(await readFile(new URL('../assets/project-design/sheep-match/'+file,import.meta.url))).digest('hex'),hash);
});
