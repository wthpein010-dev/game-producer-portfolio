import test from 'node:test';
import assert from 'node:assert/strict';
import {jobs} from '../src/content.mjs';
import {sheepNotes} from '../src/sheep-notes.mjs';
test('Career and all responsibility summaries retain roles without disclosing test outcomes',()=>{
  const job=jobs.find(j=>j.slug==='jianyou');
  assert.equal(job.role,'游戏制作人');
  assert.equal(job.teamSize,6);
  assert.deepEqual(sheepNotes.map(n=>n.slug),['gameplay','team','data']);
  assert.doesNotMatch(JSON.stringify([job,sheepNotes]),/次日留存|人均挑战次数|一周|9 月初|2 名策划|vita-mahjong/u);
});
