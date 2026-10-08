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

test('magicar supplied documents support specific cases while retaining version status boundaries', async () => {
  const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const section=html.match(/<details class="indie-planning" id="magicar-planning">[\s\S]*?<\/details>/u)?.[0];
  assert.ok(section);
  for(const term of ['长关卡','路线选择','攻击方式','弱点','自动售卖','基础售价','甘特图','19 行','状态空白','文档标注已完成','文档标注进行中'])assert.ok(section.includes(term),term);
  for(const source of ['关卡战斗规划','5月版本修改','项目甘特图','关卡设计'])assert.ok(section.includes(source),source);
  assert.match(section,/2024 年 5 月 21 日.*吴天昊/u);
  assert.match(section,/不将.*预期.*实测/u);
  assert.doesNotMatch(section,/已全部上线|留存提升\s*\d|assetstore\.unity\.com|已完成率|自动售卖.*效率提升\d/u);
});

test('magicar management evidence connects recipes, customer preferences and stall growth without exposing economy values', async () => {
  const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const section=html.match(/<details class="indie-planning" id="magicar-planning">[\s\S]*?<\/details>/u)?.[0];
  assert.ok(section);
  for(const term of ['摆摊经营规划','菜谱解锁','材料消耗','顾客偏好','菜系','口味','营救奖励','菜肴位','专长加成','旧版定价'])assert.ok(section.includes(term),term);
  assert.match(section,/不.*最终成交算法.*上线状态/u);
  assert.doesNotMatch(section,/售卖成功率\s*\+?\d|定价已验证|全部经营系统已上线|NPC.*_BuyNpc/u);
});
