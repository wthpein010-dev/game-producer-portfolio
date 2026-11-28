const assetRoot = '../../assets/project-design/indie/';

export const indieCaseStudies = [
  {
    slug: 'magicar',
    title: '舌尖上的魔术师',
    genre: '移动塔防 · 策略经营',
    store: '2904420',
    coverAlt: '魔法战车从弯道驶过，车身携带多座魔塔',
    lead: '驾驶魔法战车守住行进路线，把探索得到的资源带回营地做料理，再挑选菜单摆摊。从战斗到交易，同一份资源会在不同阶段发挥作用。',
    groups: [
      {
        id: 'battle',
        title: '让路线决定战斗节奏',
        text: '战车沿道路前进，车身上的魔塔构成移动防线。关卡方案把资源房间、战斗分支、补给和长关卡放进连续地图。玩家推进时要考虑当前防线是否适合继续战斗，设计上也能用补给点与奖励节点调节紧张和休整的间隔。',
        figures: [
          ['magicar-battle', '魔法战车沿弯道行进，车身带着多座塔，HUD 显示战斗资源', '移动塔防', '战车、道路和沿途战斗目标同屏，能同时读到防线位置和下一段路线。'],
        ],
      },
      {
        id: 'cook',
        title: '把探索所得变成可以备货的料理',
        text: '回到营地后，玩家按已解锁的配方投入材料。经营方案按品质、材料消耗和解锁途径区分菜谱。制作界面因此需要让玩家在消耗材料前比较投入和菜品价值，基础售价的展示也列在历史版本调整记录中。',
        figures: [
          ['magicar-cooking', '营地的料理锅、底部可选食材和右侧配方面板', '查看配方并投入材料', '把配方与可用食材放在同一制作画面，方便备货时逐项核对。'],
        ],
      },
      {
        id: 'stall',
        title: '先定菜单，再应对顾客偏好',
        text: '开摊前把菜放进有限的菜肴位。接客时，界面把对方偏好的菜系、菜品特征和当前交易并列展示。这样备货阶段的选择会落到具体顾客身上，也给不同摊位的菜肴位与专长安排留下空间。',
        figures: [
          ['magicar-stall', '今日菜单显示摊位能力、待出售菜肴和有限的菜肴位', '开摊前备货', '菜单槽和摊位能力同时可见，玩家能在开摊前比较不同的备货组合。'],
          ['magicar-customers', '交易窗口并排显示顾客偏好、当前菜品特征、价格和交易按钮', '到店后的交易反馈', '同一笔交易里可以看到菜系与食物特征的匹配差异，再决定是否出售。'],
        ],
      },
    ],
    evidence: '我负责关卡、数值、策划文档与 UI/UE。连续路线、菜谱与摊位结构来自关卡和经营方案，配图来自 Steam 商店的公开展示。历史版本记录将自动售卖和资源结算列为已完成，将弱点、难度与车身分化列为进行中。',
  },
  {
    slug: 'exorcism',
    title: '除灵事务所',
    genre: '轨道连消 · 卡牌构筑',
    store: '3408380',
    coverAlt: '鬼怪图鉴、养成属性和角色界面',
    lead: '用手牌清理轨道上迫近的恶灵，在战斗中积累赏金，再考虑怎样强化牌组。眼前的落点和之后的构筑都影响下一场战斗。',
    groups: [
      {
        id: 'track',
        title: '先读轨道，再决定出哪张牌',
        text: '一轮开始时，玩家需要一起看轨道上的恶灵、自己的手牌和剩余资源。出牌能消除轨道上的恶灵，连消还会获得赏金。设计上的取舍是现在先解掉威胁，还是找机会做连消，为之后的强化积累资源。',
        figures: [
          ['exorcism-track', '战斗画面中的折线轨道、底部手牌和中间的玩家状态', '出牌前的战场信息', '轨道状态、手牌和剩余资源同时可读，便于判断这轮先处理哪一段。'],
        ],
      },
      {
        id: 'boss',
        title: '把清轨压力和首领进度放在一起',
        text: 'Boss 战同时保留轨道、手牌和首领血量，玩家要在处理场上危险与推动战斗进度之间取舍。开发回顾另记录过攻击部位与本体的设计，用可选择的攻击目标增加决策。配图展示公开版本的战斗界面，部位方案的具体判定见策划复盘。',
        figures: [
          ['exorcism-boss', '首领战中血条位于顶部，轨道格绕过居中的首领，底部保留手牌', '首领血条与轨道状态', '首领进度和场上的威胁在一屏内呈现，方便对照出牌前后的战斗变化。'],
        ],
      },
      {
        id: 'deck',
        title: '用战斗收益补牌组的短板',
        text: '连消获取的赏金可以用于强化卡牌。复盘可以从刚才一轮着手。若问题是轨道威胁来不及清，先考虑补这个应对手段，再评估是否继续强化针对单个危险恶灵的牌。图鉴把牌的消耗、类别和效果放在同一处，便于比较各张牌在牌组里的用途。',
        figures: [
          ['exorcism-cards', '档案百科显示不同类别的卡牌和右侧选中卡牌的消耗与说明', '比较牌的定位', '图鉴可以按类别查看卡牌，选中后展开消耗、牌型和效果。'],
        ],
      },
    ],
    evidence: '我负责关卡、数值、策划文档与 UI/UE，程序由合作者负责。早期试玩和问卷反馈包括单局偏长、流派区分不足和 Boss 阶段感偏弱，开发回顾记录了这些调优方向及后续方案。',
  },
];

function renderFigure([file, alt, title, caption], e) {
  const src = assetRoot + file + '.jpg';
  return `<figure class="project-reference-image"><a href="${src}" aria-label="查看${e(title)}原图"><img src="${src}" width="1920" height="1080" loading="lazy" decoding="async" alt="${e(alt)}"></a><figcaption><div><strong>${e(title)}</strong><p>${e(caption)}</p><small>Steam 官方商店截图</small></div></figcaption></figure>`;
}

export function renderIndieCaseStudyBody(project, e) {
  const { slug, title, genre, store, lead, groups, evidence, coverAlt } = project;
  const home = '../../index.html#indie-' + slug;
  const steam = `https://store.steampowered.com/app/${store}/?l=schinese`;
  const cover = '../../assets/project-design/home-showcase/' + slug + '.webp';
  return `<main id="main" class="detail-main wrap">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${home}">返回个人作品</a><span aria-hidden="true">/</span><span>${e(title)}</span></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="eyebrow">${e(genre)}</p>
        <h1>${e(title)}<span class="title-dot">.</span></h1>
        <p class="detail-lede">${e(lead)}</p>
        <a class="text-link" href="${steam}">Steam 商店 <span aria-hidden="true">↗</span></a>
      </header>
      <figure class="taptap-hero-shot" data-shot-format="landscape">
        <a class="taptap-image-link" href="${cover}" aria-label="查看${e(title)}画面原图"><img src="${cover}" width="960" height="540" alt="${e(coverAlt)}"></a>
      </figure>
    </div>
    <nav class="idiom-jumps" aria-label="玩法案例索引">${groups.map(group=>`<a href="#${group.id}">${e(group.title)} <span aria-hidden="true">↓</span></a>`).join('')}</nav>
    ${groups.map(group=>`<section class="section taptap-gallery" id="${group.id}" aria-labelledby="${group.id}-title">
      <header><h2 id="${group.id}-title">${e(group.title)}</h2><p>${e(group.text)}</p></header>
      ${group.figures.length > 1 ? `<div class="taptap-shot-grid" data-shot-count="${group.figures.length}">${group.figures.map(figure=>renderFigure(figure,e)).join('')}</div>` : renderFigure(group.figures[0],e)}
    </section>`).join('')}
    <section class="document-boundary"><h2>我的分工与案例依据</h2><p>${e(evidence)}</p></section>
    <nav class="detail-footer" aria-label="继续浏览"><a class="button primary" href="${home}">返回个人作品</a><a class="text-link" href="${steam}">查看 Steam 商店 ↗</a></nav>
  </main>`;
}
