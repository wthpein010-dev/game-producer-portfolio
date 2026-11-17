import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderHome} from '../src/render.mjs';

test('Home introduces collaboration as personal capability outside the career project',()=>{
  const home=renderHome();
  assert.match(home,/id="ai-collaboration"/u);
  assert.match(home,/href="skills\/ai-collaboration\/"/u);
  assert.ok(home.indexOf('id="ai-collaboration"')>home.indexOf('id="skills"'));
});

test('Standalone collaboration page preserves ownership, evidence and operational boundaries',async()=>{
  const {renderCollaborationPage}=await import('../src/render.mjs');
  assert.equal(typeof renderCollaborationPage,'function');
  const html=renderCollaborationPage();
  for(const term of ['Multica','Tower','Codex','需求收口','最终验收','10,000','人工试玩','Wordvillas','非直属人数','不等于玩家真实通关率','未验证'])assert.ok(html.includes(term),term);
  for(const file of ['task-conversation.jpg','shared-board.jpg','analyst-role.jpg'])assert.ok(html.includes(file),file);
  assert.match(html,/href="\.\.\/\.\.\/index.html#ai-collaboration"/u);
  assert.match(html,/href="\.\.\/\.\.\/projects\/sheep-match\//u);
  assert.doesNotMatch(html,/80%|效率提升\s*\d|全自动管理|localhost|bg_test_tag/u);
});

test('Build emits independent skill route and CI includes its regression test',async()=>{
  const build=await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8');
  const ci=await readFile(new URL('../.github/workflows/verify.yml',import.meta.url),'utf8');
  assert.match(build,/renderCollaborationPage/u);
  assert.match(ci,/tests\/collaboration.test.mjs/u);
});
