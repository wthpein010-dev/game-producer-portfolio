import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {jobs} from '../src/content.mjs';
test('confirmed Wordvillas spelling is consistent while existing routes remain stable',async()=>{
 const p=jobs.find(j=>j.slug==='beta').projects.find(p=>p.slug==='word-villas');
 assert.equal(p.title,'Wordvillas');
 for(const file of ['index.html','experience/beta/index.html','projects/word-villas/index.html','projects/word-villas/design-summary/index.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');
  assert.match(html,/Wordvillas/u);
  assert.doesNotMatch(html,/Word Villas|WordVillas/u);
 }
});
