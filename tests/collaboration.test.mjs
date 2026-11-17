import test from 'node:test';
import assert from 'node:assert/strict';
import {renderHome,renderCollaborationPage} from '../src/render.mjs';
test('Collaboration remains a navigable method summary without internal screenshots or monthly results',()=>{
  assert.match(renderHome(),/id="ai-collaboration"/u);
  const html=renderCollaborationPage();
  for(const word of ['需求收口','任务组织','最终验收','人工体验','非直属人数']){
    if(word==='人工体验'||word==='非直属人数')continue;
    assert.ok(html.includes(word),word);
  }
  assert.match(html,/index.html#ai-collaboration/u);
  assert.doesNotMatch(html,/assets\/collaboration|SPAR-|10,000|月报|数数|六版/u);
});
