import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sheepPlaytestAssets,sheepPlaytestMedia,renderSheepPlaytest} from '../src/sheep-playtest.mjs';
test('Confirmed live-game screenshots and recording retain inspected source bytes',async()=>{
  assert.equal(sheepPlaytestAssets.length,13);
  for(const a of sheepPlaytestAssets){
    assert.equal(a.sourceType,'live-game-screenshot');
    assert.equal(a.releaseConfirmedAt,'2026-11-18');
    const b=await readFile(new URL('../assets/project-design/sheep-match/'+a.file,import.meta.url));
    assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);
    assert.ok(a.width>0&&a.height>0&&a.alt.length>6);
  }
  const html=renderSheepPlaytest(String);
  assert.doesNotMatch(html,/线上游戏画面|legacy-playback|预设|未标注/u);
  assert.match(html,/<video[^>]*controls[^>]*playsinline/u);
  assert.match(html,/slot-playback-redacted\.mp4/u);
  assert.doesNotMatch(html,/<video[^>]*autoplay/u);
  assert.ok(sheepPlaytestAssets.filter(a=>a.group==='systems').length>=6);
  for(const a of sheepPlaytestMedia){
    assert.equal(a.sourceType,'live-game-recording');
    assert.equal(a.duration,60);
    const b=await readFile(new URL('../assets/project-design/sheep-match/'+a.file,import.meta.url));
    assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);
  }
});
