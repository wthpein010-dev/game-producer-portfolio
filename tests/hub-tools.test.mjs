import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('Hub snapshot retains every current project and only three featured AI tools',async()=>{
  const {hubProjects,featuredHubIds,renderHubTools}=await import('../src/hub-tools.mjs');
  assert.equal(hubProjects.length,35);
  assert.equal(new Set(hubProjects.map(p=>p.id)).size,35);
  assert.deepEqual(featuredHubIds,['gamespec-relay','planmap','codex-multi-thread-workbench']);
  const html=renderHubTools();
  assert.equal((html.match(/class="hub-tool-feature"/gu)||[]).length,3);
  assert.match(html,/<details class="hub-more" id="hub-more">/u);
  assert.doesNotMatch(html,/<details[^>]*\bopen\b/u);
  for(const project of hubProjects){assert.ok(html.includes(project.id),project.id);assert.ok(project.entry.startsWith('https://'));}
  for(const id of ['lighthouse-rescue','game-design-textbook','codex-habit-tool','loop-bgm-lab'])assert.ok(hubProjects.some(p=>p.id===id));
});

test('Featured images keep reviewed source bytes and full aspect ratio',async()=>{
  const {hubProjects,featuredHubIds}=await import('../src/hub-tools.mjs');
  for(const id of featuredHubIds){
    const p=hubProjects.find(p=>p.id===id);
    const bytes=await readFile(new URL('../'+p.image.src,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),p.image.sha256);
    assert.ok(p.image.width>=1000);assert.ok(p.image.height>300);
  }
});

test('Home replaces old repeated projects and folds supporting case material',async()=>{
  const {renderHome}=await import('../src/render.mjs');
  const ai=await readFile(new URL('../src/ai.html',import.meta.url),'utf8');
  const html=renderHome(ai);
  assert.ok(html.includes('id="hub-more"'));
  assert.match(html,/<details class="ai-supporting" id="ai-supporting">/u);
  assert.doesNotMatch(html,/workbench-illustration|class="archive-toolbar"/u);
  assert.equal((html.match(/id="ai-tools"/gu)||[]).length,1);
  for(const id of ['workflow','case-gamespec','case-workbench','case-lighthouse'])assert.ok(html.includes(`id="${id}"`));
});
