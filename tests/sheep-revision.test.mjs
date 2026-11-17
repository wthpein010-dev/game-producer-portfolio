import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {jobs} from '../src/content.mjs';
import {sheepEvidenceCases,sheepEvidenceAssets,renderSheepEvidence} from '../src/sheep-evidence.mjs';
import {sheepNotes} from '../src/sheep-notes.mjs';

test('Sheep revision records owner-confirmed mechanism and qualitative outcomes',()=>{
  const revision=sheepEvidenceCases.find(item=>item.id==='sheep-revision-case');
  assert.ok(revision,'Revision case exists');
  const text=JSON.stringify(revision);
  for(const term of ['棋盘','入槽','槽位','次日留存','人均挑战次数','本人确认','第二关难度飞升'])assert.ok(text.includes(term),term);
  assert.match(text,/未提供.*比例/u);
  assert.match(text,/旧版/u);
  assert.doesNotMatch(text,/提升\s*\d+(?:\.\d+)?\s*%/u);
  const html=renderSheepEvidence(value=>String(value));
  assert.match(html,/id="sheep-revision-case"/u);
  assert.match(html,/board-no-pair-decision-detail\.jpg/u);
});

test('Sheep role distinguishes one-week prototype, team delivery and six-person composition',()=>{
  const job=jobs.find(item=>item.slug==='jianyou');
  const role=JSON.stringify(job);
  for(const term of ['从零','Codex','一周','2 名策划','1 名美术','2 名程序'])assert.ok(role.includes(term),term);
  assert.equal(job.teamSize,6);
  assert.match(JSON.stringify(sheepNotes.find(item=>item.slug==='gameplay')),/vita-mahjong/u);
  assert.match(JSON.stringify(sheepNotes.find(item=>item.slug==='data')),/次日留存/u);
});

test('Selected board detail is a traceable cropped source, not a claimed second-version screenshot',async()=>{
  const asset=sheepEvidenceAssets.find(item=>item.file==='board-no-pair-decision-detail.jpg');
  assert.ok(asset);
  assert.equal(asset.width,805);assert.equal(asset.height,505);
  assert.match(asset.caption,/旧版/u);
  const bytes=await readFile(new URL('../assets/project-design/sheep-match/'+asset.file,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
});
