import { aiGameCovers } from './ai-game-card.mjs';

const mediaBase = 'assets/hub-game-stories/';

const stories = {
  'zhuanglege-sha': {
    genre: '行李安检 · 观察解谜',
    hook: '传送带又送来一只行李。换个角度看看，里面到底装了个啥？',
    gameplay: '你是值班安检员。同一只包可以用人工复核、X 光机和灰度片检查。对照本关规则，决定准予放行还是移交复检。',
    loop: ['接收行李，查看这一关的判定规则', '切换检查视图，核对可疑物品', '作出放行或复检的决定'],
    design: [
      ['同一只包，三种检查视图', '人工复核、X 光和灰度片都围绕同一件行李。遇到拿不准的物品，玩家可以来回切换，对照外观和轮廓再作决定。'],
      ['找到物品只是第一步', '刀具、火种和压力罐各有对应的关卡规则，液体还要核对 100 毫升限制。玩家既要看出装了什么，也要判断它是否符合当关条件。'],
    ],
    hero: {
      alt: '安检台上的行李、衣物和蓝色书本，右侧完整游戏界面显示三种检查工具',
      label: '行李检查台', caption: '工具和规则提示放在传送带下方，底部提供放行与复检两种判定。', credit: '公开网页试玩画面',
    },
  },
  'fill-what': {
    genre: '成语填字 · 书信叙事',
    hook: '一封没写完的信，缺了几个字。读懂写信人的心情，再把它补完整。',
    gameplay: '读完信笺上的短文，从下方选出合适的字，依次补进空格。答案核验通过后翻页，接着读下一封。',
    loop: ['读信，找出缺字的句子', '点选候选字，补全成语或词语', '核验答案，翻到下一封信'],
    design: [
      ['前后句也是提示', '题目把空格留在一段完整的话里。除了认出常用搭配，玩家还要联系上下句，判断哪个词更贴近写信人的语气。'],
      ['答对就翻页', '点字、核验、翻页的操作保持一致，变化来自每封信的插画、语境和缺字位置。过关的反馈落在读完这段话、继续往下读的瞬间。'],
    ],
    hero: { label: '两封待补完的来信', caption: '插画交代场景，信中标出空格，候选字集中在同一张信纸下方。', credit: '公开演示画面拼图' },
    detailShot: {
      src: mediaBase + 'fill-what-letter.webp', width: 304, height: 480,
      alt: '暖色窗边插画下方的信笺，句末有已填入的缓慢二字，下面排列着候选字',
      label: '让句子读得通', caption: '窗边翻书的几句描述，为句末的「缓慢」提供了语境。', credit: '公开玩法视频截帧 · 00:20',
    },
  },
  'xiang-le-ge-xiang': {
    genre: '推箱子 · 地图解谜',
    hook: '第一关只推一下。第二关拉开一整张地图，门后还有门。',
    gameplay: '移动角色，把箱子推到目标格。第二关开场先扫过大地图，再回到角色身边。用箱子压住星钮开门，逐段打通路线，最后填满三个目标格。',
    loop: ['用第一关的一次推动学会箱子归位', '沿第二关的房间推进，压住机关打开对应的门', '安排推箱和绕行顺序，让终点的三个箱子归位'],
    design: [
      ['先看全局，再解眼前', '第一关只摆一个箱子和一个落点。第二关开场扫过 38 × 24 格的地图，随后把视野拉回角色，让玩家知道终点在哪，也能专心处理面前的箱子。'],
      ['留箱开门，送箱归位', '机关箱留在星钮上，对应的门才会保持打开，终点则另有三个归位格。玩家需要先想清哪些箱子留在路上，哪些箱子送到终点。'],
    ],
    hero: {
      alt: '左边是有四扇机关门的第二关地图，右边是只摆一个箱子与一个目标的第一关',
      label: '一推入门，一图到底', caption: '右侧是第一关的单箱教学，左侧展示第二关相连的房间与机关门。', credit: '公开网页试玩画面拼图',
    },
    rules: { path: 'src/levels.mjs', label: '公开关卡配置' },
  },
  'nang-keng-pai-pai-xiang': {
    genre: '馕坑烘烤 · 回合解谜',
    hook: '一炉馕，几种火候。能不能按订单顺序，把每张馕都烤得刚刚好？',
    gameplay: '从托盘拖一张馕到烤位，用「等一回合」让它升温。读订单、选温区，等馕烤到刚好时拖进订单区，完成普通模式的十关挑战。',
    loop: ['看订单，确定先烤什么', '把馕拖进烤位，按回合推进火候', '在成熟时取出，按订单交付'],
    design: [
      ['火候按回合推进', '「等一回合」把升温变成玩家主动选择的步骤。放入薄馕后，可以先看烤位的状态，等到刚好再动手取出。'],
      ['烤位和订单一起安排', '同一炉有不同温区，订单又有交付先后。选烤位时要连同出炉顺序一起想，才能把烤好的馕及时送进订单区。'],
    ],
    hero: { label: '第一炉薄馕', caption: '上方是当前订单，中间是烤位，下方是待烤托盘和「等一回合」按钮。', credit: '公开演示画面拼图' },
    detailShot: {
      src: mediaBase + 'nang-keng-tutorial.webp', width: 590, height: 1280,
      alt: '薄馕教学关弹出提示，说明把馕拖进烤位、等待升温，再拖到订单区',
      label: '从托盘到订单', caption: '第一关用一张薄馕教会放入、升温和交付。', credit: '公开玩法视频截帧 · 00:12',
    },
  },
  'lighthouse-rescue': {
    genre: '风暴航行 · 合作救援',
    hook: '灯塔就在前方。先保住船，再照亮海面，把三个落难的人都带回家。',
    gameplay: '先上船、投票选路，再穿过三处险情。每段都可以修船、照明或点赞补光。船体撑得住、照明达标，就能救起这一段的落难者。网页用按钮模拟观众操作。',
    loop: ['集结上船，在礁石短路和迷雾长路之间选一条', '每段查看船体和灯光，协作修理与照明', '驶过三处险情后返航，结算救起人数和剩余船体'],
    design: [
      ['同一趟任务，两种压力', '礁石短路更快、也更伤船，队伍需要多分精力修船。迷雾长路船损较轻，救人却需要更多照明。选路决定整局要优先照顾哪项资源。'],
      ['每段都能看到自己的贡献', '修理决定船能承受多少损伤，照明决定能否在段末救起一人。点赞可以补光，有效操作会短时显示在画面上，礼物烟花只提供外观效果。'],
    ],
    hero: {
      src: mediaBase + 'lighthouse-rescue-deck.webp', width: 520, height: 904,
      alt: '船头探照灯照向浪中的待救者，下方显示船体、修理和照明进度',
      label: '船头救援', caption: '到达险情后切换到船头视角。修理与照明进度分别显示，方便队伍看清当前缺什么。', credit: '公开试玩回放 · 00:48',
    },
    detailShot: {
      src: mediaBase + 'lighthouse-rescue-route.webp', width: 520, height: 904,
      alt: '俯视画面中的救援船和灯塔，下方是礁石短路与迷雾长路投票按钮',
      label: '岔路口投票', caption: '救援船从俯视角出发，队伍在礁石短路与迷雾长路之间投票。', credit: '公开试玩回放 · 00:33',
    },
    rules: { path: 'rules.html', label: '公开玩法规则' },
  },
};

const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
);

export const hubGameSlug = game => `hub-${game.id}`;
export const hubGameSummary = game => stories[game.id].hook;

function renderShot(shot, source, base, hero = false) {
  const src = `${base}${escape(shot.src)}`;
  const format = shot.width >= shot.height ? 'landscape' : 'portrait';
  const alt = escape(shot.alt);
  return `<figure${hero ? ' class="taptap-hero-shot"' : ''} data-shot-format="${format}">
    <a class="taptap-image-link" href="${src}" aria-label="放大${alt}"><img class="taptap-screenshot" src="${src}" width="${shot.width}" height="${shot.height}" loading="${hero ? 'eager' : 'lazy'}" ${hero ? 'fetchpriority="high" ' : ''}decoding="async" alt="${alt}"></a>
    <figcaption><strong>${escape(shot.label)}</strong><span>${escape(shot.caption)} <a class="text-link" href="${escape(source)}">${escape(shot.credit)} <span aria-hidden="true">↗</span></a></span></figcaption>
  </figure>`;
}

export function renderHubGameBody(game, base = '../../') {
  const story = stories[game.id];
  const slug = hubGameSlug(game);
  const cover = aiGameCovers[game.id];
  const heroSource = story.hero.src ? game.video : cover.sources[0];
  const { detailShot } = story;
  const rules = story.rules ? `<p><a class="text-link" href="${escape(new URL(story.rules.path, game.entry).href)}">${escape(story.rules.label)} <span aria-hidden="true">↗</span></a></p>` : '';
  const video = game.video ? `<a class="text-link" href="${escape(game.video)}">玩法视频 <span aria-hidden="true">↗</span></a>` : '';
  const playLabel = game.id === 'lighthouse-rescue' ? '模拟试玩' : '网页试玩';
  const home = `${base}index.html#${escape(slug)}`;

  return `<main id="main" class="detail-main wrap taptap-detail hub-game-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${home}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><a href="${base}index.html#${game.id==='lighthouse-rescue'?'hub-games':'mobile-games'}">网页试玩作品</a></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <h1>${escape(game.name)}<span class="title-dot">.</span></h1><p class="taptap-genre">${escape(story.genre)}</p><p class="detail-lede">${escape(story.hook)}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="${escape(game.entry)}">${playLabel} <span aria-hidden="true">↗</span></a>${video}</div>
      </header>
      ${renderShot({ ...cover, ...story.hero }, heroSource, base, true)}
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#gameplay">怎么玩</a><a href="#design">玩法设计</a></nav>
    <section class="taptap-overview" id="gameplay" aria-labelledby="gameplay-title"><div><h2 id="gameplay-title">怎么玩</h2><p>${escape(story.gameplay)}</p>${rules}</div><ol class="taptap-loop">${story.loop.map(step => `<li>${escape(step)}</li>`).join('')}</ol></section>
    <section class="taptap-design" id="design" aria-labelledby="design-title"><header><h2 id="design-title">玩法设计</h2></header><div class="game-design-stories">${story.design.map(([title, copy], index) =>
      `<article><div class="game-design-copy"><h3>${escape(title)}</h3><p>${escape(copy)}</p></div>${index === 0 && detailShot ? renderShot(detailShot, game.video, base) : ''}</article>`
    ).join('')}</div></section>
    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${home}" data-return-home>返回个人作品 ↑</a></nav>
  </main>`;
}
