import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir,readFile} from 'node:fs/promises';
import {jobs} from '../src/content.mjs';
import {renderDetail,renderHome,renderCollaborationPage,renderPublicNote} from '../src/render.mjs';
import {sheepNotes} from '../src/sheep-notes.mjs';

test('Career pages disclose responsibilities without internal results, plans or prototype links',()=>{
  const job=jobs.find(j=>j.slug==='jianyou');
  const pages=[renderHome(),renderDetail(job),renderDetail(job,job.projects[0]),renderCollaborationPage(),...sheepNotes.map(renderPublicNote)];
  for(const html of pages){
    assert.doesNotMatch(html,/次日留存|人均挑战次数|明显提升|二级交易|哈希|差异化投放|1\.0\.539|10,000|SPAR-\d|level-v-curve|vita-metrics|task-conversation|shared-board|analyst-role|lucky-items-flow|board-no-pair|collection-system-map|login-flow|legacy-playback|slot-playback|projects\/(?:vita-mahjong|paws-home-client|paws-level-editor)\//u);
  }
});

test('Published project media contains only verified live-game screenshots',async()=>{
  const {sheepPlaytestAssets}=await import('../src/sheep-playtest.mjs');
  for(const asset of sheepPlaytestAssets){
    assert.equal(asset.sourceType,'live-game-screenshot');
    assert.ok(asset.releaseConfirmedAt);
    assert.match(asset.file,/\.(?:jpg|png|webp)$/u);
  }
  const files=await readdir(new URL('../assets/project-design/sheep-match/',import.meta.url));
  assert.deepEqual(files.filter(f=>!f.startsWith('.')).sort(),sheepPlaytestAssets.map(a=>a.file).sort());
  const manifest=JSON.parse(await readFile(new URL('../assets/optimized/manifest.json',import.meta.url),'utf8'));
  assert.ok(!Object.keys(manifest.images).some(f=>f==='assets/project-design/lucky-items-flow.jpg'||f.startsWith('assets/collaboration/')||f.startsWith('assets/project-design/sheep-match/')&&!sheepPlaytestAssets.some(a=>f.endsWith('/'+a.file))));
});
