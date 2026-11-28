import { renderAiGameCard } from './ai-game-card.mjs';

const title = '竹隐江湖2D';
const summary = '从竹林营地整备武学，找灵木、寻装备，再进入十四关首领连战。读预警、绕地形、打断冲锋，逐关打开新的成长与战斗选择。序章也能提灯穿过夜雨竹道。';
const images = {
  home: ['竹林营地', '从营地出发，武器和武学槽在画面下方。', 720, 1280],
  map: ['江湖地图', '从地图查看营地区域与灵木、敌人、精英等标记。', 720, 1280],
  bag: ['背包与分类', '按全部、装备、秘籍、物资查看库存，下方可切换到装备或武学页。', 720, 1280],
  world: ['江湖成长入口', '江湖菜单分开展示竹阵挑战、成长、制作和江湖记录。', 720, 1280],
  'night-lantern': ['夜雨竹道', '角色提灯前行，暖光跟随行灯位置移动。', 720, 1280],
  'battle-pause': ['战中设置', '战斗暂停后仍可调整声音、画面与反馈。', 720, 1280],
  'low-health': ['探索战斗', '敌人的气血、动作与角色脚下站位在场景内呈现。', 720, 1280],
  stele: ['鸣沙碑庭', '石碑两侧可绕行，直线冲锋撞到石碑会被截停。', 720, 1280],
  pine: ['松门驿院', '注意无伤侧步后的攻击线路，低气血阶段还会重新标记落点。', 720, 1280],
  projectile: ['首领投掷物', '陶壶抛起后还有离开落点的时间，伤害在真正落地时结算。', 720, 1280],
  reinforcements: ['援兵进场', '首领先以地面墨印预告援兵，入场后可用原有攻击转火。', 720, 1280],
};

const rushShots = new Set(['stele', 'pine', 'projectile', 'reinforcements']);

function figure(key, base) {
  const [label, caption, width=810, height=1440] = images[key];
  const src = base + 'assets/zhuyin-jianghu/' + key + '.webp';
  const source = rushShots.has(key) ? '竹阵原 Windows 开发版实机' : '2026-11-28 Windows 0.4.30 实机';
  return `<figure class="ring-haven-figure" data-shot-format="portrait"><a class="taptap-image-link" href="${src}"><img src="${src}" width="${width}" height="${height}" alt="${label}实机截图" loading="lazy" decoding="async"></a><figcaption><strong>${label}</strong>　${caption} <small>${source}</small></figcaption></figure>`;
}

export function renderZhuyinEntry() {
  return renderAiGameCard({id: 'zhuyin-jianghu', title, description: summary,
    tags: ['竹林探索', '武学成长', '十四关首领连战'], status: 'Unity · Windows 开发试玩 0.4.30',
    href: 'projects/zhuyin-jianghu/', detailLabel: '查看探索、装备与成长',
  });
}

export function renderZhuyinBody() {
  const base = '../../';
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <header class="detail-hero">
      <p class="taptap-genre">AI 游戏作品 / 竖屏武侠 RPG</p>
      <h1>${title}<span class="title-dot">.</span></h1>
      <p class="detail-lede">${summary}</p>
      <p class="record-source">11 月 28 日的 Windows 0.4.30 已跑通夜雨序章、营地探索与十四关连战。营地、地图与成长截图来自这次 Windows 验收。</p>
      <nav class="collaboration-nav" aria-label="游戏玩法目录">
        <a href="#zhuyin-exploration">竹林探索 ↓</a><a href="#zhuyin-combat-feedback">动作与交互 ↓</a><a href="#zhuyin-progression">装备与成长 ↓</a><a href="#zhuyin-bamboo-rush">竹阵首领连战 ↓</a>
      </nav>
    </header>
    <section class="ring-haven-section" id="zhuyin-exploration" aria-labelledby="zhuyin-exploration-title">
      <h2 id="zhuyin-exploration-title">从竹林营地走出第一条路</h2>
      <div class="ring-haven-pair">
        <article><h3>在营地打理行装</h3><p>用摇杆移动，靠近营地人物可以对话。出门前检查药品和当前武学，底部技能槽和背包入口都留在探索界面。</p>${figure('home', base)}</article>
        <article><h3>先寻灵木，还是直奔黑风寨主</h3><p>打开江湖地图，辨认精英、普通敌人和灵木。灵木点标出攻击、气血或身法，选定点位可标记导航，再沿着营地道路选择探索方向。</p>${figure('map', base)}</article>
      </div>
    </section>
    <section class="ring-haven-section" id="zhuyin-progression" aria-labelledby="zhuyin-progression-title">
      <h2 id="zhuyin-progression-title">看装备养成，也看下一仗打谁</h2>
      <div class="ring-haven-pair">
        <article><h3>打开背包，看当前配装</h3><p>背包按装备、秘籍和物资组织道具。选中某件物品查看详情，关闭后焦点回到原物品。底部可以切换装备、武功和心法，接着调整本次出门的配装。</p>${figure('bag', base)}</article>
        <article><h3>打过黑风寨主，再开新入口</h3><p>江湖菜单把竹林挑战、日常、成长和制作入口放在一起。查看开放条件后，玩家可以在营地准备，也可以从挑战入口继续推进。</p>${figure('world', base)}</article>
      </div>
    </section>
    <section class="ring-haven-section" id="zhuyin-combat-feedback" aria-labelledby="zhuyin-combat-feedback-title">
      <h2 id="zhuyin-combat-feedback-title">夜雨提灯、受击与战中暂停</h2>
      <div class="ring-haven-pair">
        <article><h3>提灯走过夜雨竹道</h3><p>先随行灯的暖光辨认道路。主角左右换向时，灯仍挂在腰间的固定位置，走路和停步都用同一套脚步节奏。</p>${figure('night-lantern', base)}</article>
        <article><h3>奔跑与受击反馈放在同一场交锋里</h3><p>急转时只显示当前动作轮廓。挨打会有短促的后仰，仍能继续移动。敌方残血保留可见红线，气血归零后才收起血条。</p>${figure('low-health', base)}</article>
        <article><h3>在交战中也能读清设置</h3><p>打开设置会暂停战斗，声音、画面与反馈按组排列，可直接点选画质和帧率。键盘与手柄焦点在弹窗内操作，关闭后回到打开它的控件。</p>${figure('battle-pause', base)}</article>
      </div>
    </section>
    <section class="ring-haven-section" id="zhuyin-bamboo-rush" aria-labelledby="zhuyin-bamboo-rush-title">
      <h2 id="zhuyin-bamboo-rush-title">竹阵连战：十四关逐步改变走位</h2>
      <p>营地承担整备和败退后的恢复，竹阵用连续的首领战考验武学搭配。在后段关卡，熟悉的红区规则会与地形、投射物和援兵组合。</p>
      <div class="ring-haven-pair">
        <article><h3>松门驿院先试探再封路</h3><p>镖客以淡金色提示无伤侧步，随后用交错索线切断路线。低气血时，最后一段调整落点，玩家要读完整的出招次序。</p>${figure('pine', base)}</article>
        <article><h3>鸣沙碑庭让掩体参与判定</h3><p>石碑挡住刀客的直冲和部分投射物，攻击预警也扣掉被遮挡的区域。截停后出现反击窗口，绕碑与贴身各有机会。</p>${figure('stele', base)}</article>
        <article><h3>预警和实际命中分开</h3><p>陶壶按落点结算，水弹和飞刃沿实际弹道预警，遇到护栏或石碑会截断。玩家可以先离开预警路径，再根据飞行速度决定何时切回攻击线。</p>${figure('projectile', base)}</article>
        <article><h3>援兵可以打断首领战的惯性</h3><p>墨印提示援兵将入场，同场至多两名。玩家可转火近卫或游兵，击倒正蓄力的远程援兵会立即撤掉它的预警。首领倒下或转关后，场地会清除遗留的援兵与投射物。</p>${figure('reinforcements', base)}</article>
      </div>
    </section>
    <p><a class="text-link" href="${base}#ai-games">返回 AI 游戏作品 ↑</a></p>
  </main>`;
}
