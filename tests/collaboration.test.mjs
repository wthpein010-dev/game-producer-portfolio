import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {renderHome} from '../src/render.mjs';

test('Home introduces collaboration as personal capability outside the career project',()=>{
  const home=renderHome();
  assert.match(home,/id="ai-collaboration"/u);
  assert.match(home,/href="skills\/ai-collaboration\/"/u);
  assert.ok(home.indexOf('id="ai-collaboration"')>home.indexOf('id="skills"'));
});

test('Game research appears on the homepage and links to the public evidence summary',async()=>{
  const home=renderHome();
  const href='skills/ai-collaboration/#happy-family-research';
  const section=home.match(/<section[^>]*id="happy-family-research-overview"[\s\S]*?<\/section>/u)?.[0];
  assert.ok(section);
  assert.ok(section.includes('《快乐方块屋》竞品研究'));
  assert.ok(section.includes(href));
  assert.match(section,/1,658 张试玩截图、531 个数值案例和 39 项系统记录/u);
  assert.ok(home.indexOf('id="happy-family-research-overview"')>home.indexOf('id="ai-collaboration"'));

  const {renderCollaborationPage}=await import('../src/render.mjs');
  const detail=renderCollaborationPage().match(/<section[^>]*id="happy-family-research"[\s\S]*?<\/section>/u)?.[0];
  assert.ok(detail);
  assert.match(detail,/691\/s 升至 712\/s/u);
  assert.match(detail,/7 卷、66 页/u);
  assert.match(detail,/待验证/u);
  assert.doesNotMatch(detail,/<img|[A-Z]:[\\/]|\.zip|\.xlsx|\.docx/u);
});

test('Standalone collaboration page preserves ownership, evidence and operational boundaries',async()=>{
  const {renderCollaborationPage}=await import('../src/render.mjs');
  assert.equal(typeof renderCollaborationPage,'function');
  const html=renderCollaborationPage();
  for(const term of ['Multica','Tower','Codex','需求收口','最终验收','10,000','人工试玩','Wordvillas','非直属人数','不等于玩家真实通关率','未验证'])assert.ok(html.includes(term),term);
  for(const file of ['task-conversation-redacted.png','shared-board-redacted.png','analyst-role.jpg'])assert.ok(html.includes(file),file);
  assert.doesNotMatch(html,/task-conversation\.jpg|shared-board\.jpg/u);
  assert.match(html,/人员标识已遮盖/u);
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

test('Public evidence contains only reviewed redacted personnel images',async()=>{
  const expected={
    'task-conversation-redacted.png':'007124604337e0a1825a7cfb74cc49032cdd86f8908e8f98e7a1275581062713',
    'shared-board-redacted.png':'264c95c96fb17155a21ad6d50b0600383ef76438d3b7127fd08a1cde0c7e4800',
  };
  for(const [file,hash] of Object.entries(expected))assert.equal(createHash('sha256').update(await readFile(new URL('../assets/collaboration/'+file,import.meta.url))).digest('hex'),hash);
  for(const file of ['task-conversation.jpg','shared-board.jpg'])await assert.rejects(readFile(new URL('../assets/collaboration/'+file,import.meta.url)),{code:'ENOENT'});
});
