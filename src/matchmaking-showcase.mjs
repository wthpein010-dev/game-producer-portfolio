const source = {
  steam: 'Steam 官方商店截图',
  ui: '团队界面效果图 · 设计阶段',
  scene: '团队场景效果图',
};

export const matchmakingShowcase = [
  {
    id: 'matchmaking-club-visuals',
    title: '从招募会员到安排相亲',
    text: '先在城里结识潜在会员，通过交谈把对方邀请进会所。回到会所，玩家比较双方资料和诉求，再安排席位观察结果。招募扩充候选，匹配将候选转成实际经营活动。',
    images: [
      ['club-live', 1920, 1080, '会所大厅与席位', '多桌客人的配对与进程集中呈现在同一个场景，玩家能在巡视时看到各桌状态。', source.steam, '相亲会所实机，多个相亲桌旁显示客人和状态气泡'],
      ['invite-live', 1920, 1080, '以卡牌承载招募交谈', '玩家在场景里发起互动，选择手牌后从人物表现和界面数值看到本次行动的反馈。', source.steam, '室内场景中的人物互动、行动反馈与底部手牌'],
      ['invite-success', 1920, 1080, '成功入会的结果反馈', '在原场景中直接提示「成功入会」，把这次交谈的结果和后续会所经营联系起来。', source.ui, '公园场景中弹出成功入会的结算文字效果'],
      ['match-state', 1980, 1904, '从待选到可安排', '同图对照空槽与选定双方的状态。选定后呈现双方条件、已满足的诉求和可执行操作。', source.ui, '双人匹配界面上下对照，展示候选列表、条件勾选和安排按钮的可用与置灰状态'],
    ],
  },
  {
    id: 'matchmaking-city-visuals',
    title: '鹊桥市的昼夜与会所空间',
    text: '公园、街道和室内空间承载不同的拜访与活动。中心公园的昼夜图保留同一构图，便于对照照明变化。会所空间则把经营席位和装饰融进场景，让玩家能直接看到经营设施。',
    images: [
      ['park-day', 2400, 1661, '中心公园 · 白天', '河岸、步道和长椅构成稳定的场景参照。', source.scene, '中心公园日间像素场景，河岸旁有步道、长椅、树木与街区'],
      ['park-night', 2400, 1661, '中心公园 · 夜晚', '同一取景下的路灯、店面与树荫呈现夜间的城市氛围。', source.scene, '中心公园同构图的夜间场景，路灯和建筑照亮河岸街道'],
      ['club-scene', 2400, 975, '会所装修场景', '对照上方会所实机，室内效果图能更清楚地看出出入口、走道和桌位的空间安排。', source.scene, '会所较大装修阶段的室内场景，展示出入口、楼梯和成组排列的桌椅', true],
    ],
  },
  {
    id: 'matchmaking-story-visuals',
    title: '对话、任务与日程',
    text: '主线给出当下目标，场景中的人物把目标落实到拜访、对话和下一步行动。早期 NPC 设计按用途分工，由路人营造氛围，可招募角色服务会所，主要人物推进关系，功能与委托角色承接任务或活动入口。',
    images: [
      ['street-dialogue', 1920, 1080, '在街区遇见角色', '场景行走与角色对话使用同一套城市背景，帮助玩家把人物和相遇地点联系起来。', source.steam, '喷泉旁的城市街区与人物对话立绘'],
      ['city-calendar', 1920, 1080, '查看日程与事件', '效果图用日期、图标和悬停说明区分节日与待办，让玩家能提前计划城市行动。', source.ui, '游戏内日历设计图，显示日期、节日和事件的图标与说明'],
    ],
  },
  {
    id: 'matchmaking-relationship-visuals',
    title: '情感阶段与约会选择',
    text: '关系面板集中展示阶段、进度和后续条件，赠礼、约会与支线提供具体的推进方式。人物关系大纲则把相识的背景、角色动机与后续选择串起来，给不同的人物线各自的推进理由。',
    images: [
      ['affinity-live', 1920, 1054, '读懂关系进度', '阶段节点和条件面板同时出现，玩家可以把当前关系和下一个目标对应起来。', source.steam, '角色关系实机界面，左侧为情感阶段节点，右侧为进度和条件'],
      ['date-dialogue', 1671, 936, '在约会里做选择', '餐桌场景中直接提供回应选项，把关系推进落到本次会面与对话。', source.steam, '餐厅约会中的角色立绘、对话和右侧选项'],
    ],
  },
];

function renderVisual([file, width, height, title, description, credit, alt, wide], e, base) {
  const href = `${base}assets/project-design/matchmaking-inc/${file}.webp`;
  return `<figure class="project-reference-image${wide ? ' matchmaking-visual-wide' : ''}">
    <a href="${href}" aria-label="放大${e(title)}"><img src="${href}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="${e(alt)}"></a>
    <figcaption><div><strong>${e(title)}</strong><p>${e(description)}</p><small>${e(credit)}</small></div></figcaption>
  </figure>`;
}

export function renderMatchmakingShowcase(e, base = '../../') {
  return `<section class="matchmaking-showcase" id="matchmaking-showcase" aria-labelledby="matchmaking-showcase-title">
    <header>
      <h2 id="matchmaking-showcase-title">核心界面与场景</h2>
      <p>按早期项目说明中的经营、城市探索、主线和情感玩法展开。商店截图与团队效果图逐张标注来源，点击画面可放大。</p>
    </header>
    <nav class="idiom-jumps" aria-label="核心界面与场景索引">
      ${matchmakingShowcase.map(group => `<a href="#${group.id}">${e(group.title)} <span aria-hidden="true">↓</span></a>`).join('')}
      <a href="#matchmaking-design">系统结构与玩法循环 <span aria-hidden="true">↓</span></a>
    </nav>
    ${matchmakingShowcase.map(group => `<section class="matchmaking-visual-group" id="${group.id}" aria-labelledby="${group.id}-title">
      <h3 id="${group.id}-title">${e(group.title)}</h3>
      <p>${e(group.text)}</p>
      <div class="matchmaking-visual-grid">${group.images.map(image => renderVisual(image, e, base)).join('')}</div>
    </section>`).join('')}
    <p class="matchmaking-boundary">项目说明与 NPC 分类属于设计阶段资料，场景和界面效果图由团队制作。正式产品信息与公开截图见 <a href="https://store.steampowered.com/app/2103130/?l=schinese">Steam 商店页 ↗</a>。</p>
  </section>`;
}
