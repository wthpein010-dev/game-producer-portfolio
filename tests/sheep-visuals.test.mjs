import test from 'node:test';
import assert from 'node:assert/strict';
import {jobs} from '../src/content.mjs';
import {renderDetail} from '../src/render.mjs';
test('Historical design images and draft galleries cannot be reached from project page',()=>{
  const job=jobs.find(j=>j.slug==='jianyou'),html=renderDetail(job,job.projects[0]);
  assert.doesNotMatch(html,/sheep-history|sheep-flow-gallery|daily-entry-ui|board-prop|collection-interface-flow|lucky-items-flow/u);
  assert.match(html,/线上游戏画面/u);
});
