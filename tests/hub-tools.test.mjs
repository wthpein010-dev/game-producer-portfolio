import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('Hub snapshot partitions into visible apps, games, merged editions and entries outside the resume',async()=>{
  const {hubProjects,featuredHubIds,hubApps,hubGames,hubGameEditions,excludedHubIds,renderHubTools,renderHubGames}=await import('../src/hub-tools.mjs');
  assert.equal(hubProjects.length,35);
  assert.deepEqual(featuredHubIds,['gamespec-relay','planmap','codex-multi-thread-workbench']);
  assert.equal(hubApps.length,18);
  assert.equal(hubGames.length,5);
  assert.ok(hubApps.every(project=>project.status!=='game'));
  assert.ok(hubGames.every(project=>project.status==='game'));
  const partition=[...featuredHubIds,...hubApps.map(p=>p.id),...hubGames.map(p=>p.id),...Object.values(hubGameEditions),...excludedHubIds];
  assert.deepEqual(partition.sort(),hubProjects.map(project=>project.id).sort());
  const apps=renderHubTools(),games=renderHubGames();
  assert.equal((apps.match(/class="hub-tool-feature"/gu)||[]).length,3);
  assert.equal((apps.match(/class="hub-catalog-item"/gu)||[]).length,18);
  assert.equal((games.match(/class="ai-game-card"/gu)||[]).length,5);
  for(const id of excludedHubIds.filter(id=>id!=='hub'))assert.ok(!apps.includes('id="hub-'+id+'"')&&!games.includes('id="hub-'+id+'"'),id);
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

test('Home groups AI works and preserves case and prototype links',async()=>{
  const {renderHome}=await import('../src/render.mjs');
  const ai=await readFile(new URL('../src/ai.html',import.meta.url),'utf8');
  const html=renderHome(ai);
  assert.ok(html.includes('id="hub-more"'));
  assert.match(html,/<details class="ai-supporting" id="ai-supporting">/u);
  assert.doesNotMatch(html,/workbench-illustration|class="archive-toolbar"/u);
  assert.equal((html.match(/id="ai-tools"/gu)||[]).length,1);
  for(const id of ['workflow','case-gamespec','case-workbench','case-lighthouse'])assert.ok(html.includes(`id="${id}"`));
});
