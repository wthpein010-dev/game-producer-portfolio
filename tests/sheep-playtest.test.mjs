import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sheepPlaytestAssets,renderSheepPlaytest} from '../src/sheep-playtest.mjs';
test('Six confirmed live-game screenshots preserve inspected source bytes and declared geometry',async()=>{
  assert.equal(sheepPlaytestAssets.length,6);
  for(const a of sheepPlaytestAssets){
    assert.equal(a.sourceType,'live-game-screenshot');
    assert.equal(a.releaseConfirmedAt,'2026-11-18');
    const b=await readFile(new URL('../assets/project-design/sheep-match/'+a.file,import.meta.url));
    assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);
    assert.ok(a.width>0&&a.height>0&&a.alt.length>6);
  }
  assert.doesNotMatch(renderSheepPlaytest(String),/<video|\.mp4|预设|未标注/u);
});
