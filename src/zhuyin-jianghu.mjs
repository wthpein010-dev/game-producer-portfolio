import { renderAiGameCard } from './ai-game-card.mjs';

const title = '竹隐江湖2D';
const summary = '从竹林营地整备武学，找灵木、寻装备，再进入十四关首领连战。读预警、绕地形、打断冲锋，逐关打开新的成长与战斗选择。';
const images = {
  home: ['竹林营地', '从营地出发，武器和武学槽在画面下方。'],
  map: ['江湖地图', '竹林营地的全图，标出灵木、敌人与精英。'],
  bag: ['装备与属性', '背包与属性同屏，底部可滑动查看已装备栏位。'],
  world: ['江湖成长入口', '江湖菜单列出可进入的系统与解锁条件。'],
  stele: ['鸣沙碑庭', '石碑两侧可绕行，直线冲锋撞到石碑会被截停。', 720, 1280],
  pine: ['松门驿院', '注意无伤侧步后的攻击线路，低气血阶段还会重新标记落点。', 720, 1280],
  projectile: ['首领投掷物', '陶壶抛起后还有离开落点的时间，伤害在真正落地时结算。', 720, 1280],
  reinforcements: ['援兵进场', '首领先以地面墨印预告援兵，入场后可用原有攻击转火。', 720, 1280],
};

function figure(key, base) {
  const [label, caption, width=810, height=1440] = images[key];
  const src = base + 'assets/zhuyin-jianghu/' + key + '.webp';
  return `<figure class="ring-haven-figure" data-shot-format="portrait"><a class="taptap-image-link" href="${src}"><img src="${src}" width="${width}" height="${height}" alt="${label}实机截图" loading="lazy" decoding="async"></a><figcaption><strong>${label}</strong>　${caption}</figcaption></figure>`;
}

export function renderZhuyinEntry() {
  return renderAiGameCard({id: 'zhuyin-jianghu', title, description: summary,
    tags: ['竹林探索', '武学成长', '十四关首领连战'], status: 'Unity · Windows 开发试玩',
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
      <p class="record-source">营地与成长图来自早期安卓原型。竹阵新增内容以 Windows 实跑画面为准，0.4.9 安卓包已完成签名校验。</p>
      <nav class="collaboration-nav" aria-label="游戏玩法目录">
        <a href="#zhuyin-exploration">竹林探索 ↓</a><a href="#zhuyin-progression">装备与成长 ↓</a><a href="#zhuyin-bamboo-rush">竹阵首领连战 ↓</a>
      </nav>
    </header>
    <section class="ring-haven-section" id="zhuyin-exploration" aria-labelledby="zhuyin-exploration-title">
      <h2 id="zhuyin-exploration-title">从竹林营地走出第一条路</h2>
      <div class="ring-haven-pair">
        <article><h3>在营地打理行装</h3><p>用摇杆移动，靠近营地人物可以对话。出门前看看药品还剩几瓶，底部的武学栏会显示「吐纳」等已装备武学和熟练度。</p>${figure('home', base)}</article>
        <article><h3>先寻灵木，还是直奔黑风寨主</h3><p>打开江湖地图，辨认精英、普通敌人和灵木。灵木点标出攻击、气血或身法，选定点位可标记导航，地图也会记录营地遗藏的收集进度。</p>${figure('map', base)}</article>
      </div>
    </section>
    <section class="ring-haven-section" id="zhuyin-progression" aria-labelledby="zhuyin-progression-title">
      <h2 id="zhuyin-progression-title">看装备养成，也看下一仗打谁</h2>
      <div class="ring-haven-pair">
        <article><h3>打开背包，看当前配装</h3><p>装备栏上方同时显示输出、气血、恢复、防御等属性。点击可查看已装备物品，左右滑动切换栏位，看看现在的武器、防具和心法搭配。</p>${figure('bag', base)}</article>
        <article><h3>打过黑风寨主，再开新入口</h3><p>营地阶段可查看进化和宝箱。江湖菜单上写着，经脉、试炼和铁匠需要击败黑风寨主才会开放，晶石则要等击败铁衣护法。</p>${figure('world', base)}</article>
      </div>
    </section>
    <section class="ring-haven-section" id="zhuyin-bamboo-rush" aria-labelledby="zhuyin-bamboo-rush-title">
      <h2 id="zhuyin-bamboo-rush-title">竹阵连战：十四关逐步改变走位</h2>
      <p>营地承担整备和败退后的恢复，竹阵用连续的首领战考验武学搭配。在后段关卡，熟悉的红区规则会与地形、投射物和援兵组合。</p>
      <div class="ring-haven-pair">
        <article><h3>松门驿院先试探再封路</h3><p>镖客以淡金色提示无伤侧步，随后用交错索线切断路线。低气血时，最后一段调整落点，玩家要读完整的出招次序。</p>${figure('pine', base)}</article>
        <article><h3>鸣沙碑庭让掩体参与判定</h3><p>石碑挡住刀客的直冲和部分投射物，攻击预警也扣掉被遮挡的区域。截停后出现反击窗口，绕碑与贴身各有机会。</p>${figure('stele', base)}</article>
        <article><h3>预警和实际命中分开</h3><p>陶壶按落点结算，水弹和飞刃按弹道命中。玩家看到方向提示后可以横移，再根据飞行速度决定何时切回攻击线。</p>${figure('projectile', base)}</article>
        <article><h3>援兵可以打断首领战的惯性</h3><p>墨印提示援兵将入场，同场至多两名。玩家可转火近卫或游兵，首领倒下、转关和败退都清除遗留的援兵与投射物。</p>${figure('reinforcements', base)}</article>
      </div>
    </section>
    <p><a class="text-link" href="${base}#ai-games">返回 AI 游戏作品 ↑</a></p>
  </main>`;
}
