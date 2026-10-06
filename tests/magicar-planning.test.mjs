import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

test('magicar planning evidence is scoped and distinguishes schedule from delivery', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const section = html.match(/<details class="indie-planning"[\s\S]*?<\/details>/u)?.[0];
  assert.ok(section, 'Expandable planning record exists');
  assert.match(section, /策划工作细项/u);
  for (const term of ['第四章', 'Boss', '奖励投放', '车身技能', 'UI\/UE', '新手引导', '摆摊', '居民文案', '多语言', '测试调优']) assert.ok(section.includes(term), term);
  assert.match(section, /17 项/u);
  assert.match(section, /前三项.*进行中.*其余.*待启动/u);
  assert.match(section, /不作为全部完成或上线的证明/u);
  assert.doesNotMatch(section, /docs\.qq\.com|pein|Magick|坚果|已全部完成|美术制作/u);
  assert.ok(html.indexOf(section) > html.indexOf('<h4>舌尖上的魔术师</h4>'));
  assert.ok(html.indexOf(section) < html.indexOf('<h4>除灵事务所</h4>'));
});
