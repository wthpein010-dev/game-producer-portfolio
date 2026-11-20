import { renderAiGameCard } from './ai-game-card.mjs';

const title = '竹隐江湖2D';
const summary = '带着一把木剑从竹林营地出发。标记资源和精英的位置，查看装备属性与武学熟练度，击败拦路的高手，打开新的成长途径。';
const images = {
  home: ['竹林营地', '从营地出发，武器和武学槽在画面下方。'],
  map: ['江湖地图', '竹林营地的全图，标出灵木、敌人与精英。'],
  bag: ['装备与属性', '背包与属性同屏，底部可滑动查看已装备栏位。'],
  world: ['江湖成长入口', '江湖菜单列出可进入的系统与解锁条件。'],
};

function figure(key, base) {
  const [label, caption] = images[key];
  const src = base + 'assets/zhuyin-jianghu/' + key + '.webp';
  return `<figure class="ring-haven-figure" data-shot-format="portrait"><a class="taptap-image-link" href="${src}"><img src="${src}" width="810" height="1440" alt="${label}实机截图" loading="lazy" decoding="async"></a><figcaption><strong>${label}</strong>　${caption}</figcaption></figure>`;
}

export function renderZhuyinEntry() {
  return renderAiGameCard({id: 'zhuyin-jianghu', title, description: summary,
    tags: ['竹林探索', '武器装备', '武学熟练度'], status: 'Unity · 安卓实机原型',
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
      <p class="record-source">Unity 安卓原型 0.11.13 · MuMu 安卓模拟器运行截图</p>
      <nav class="collaboration-nav" aria-label="游戏玩法目录">
        <a href="#zhuyin-exploration">竹林探索 ↓</a><a href="#zhuyin-progression">装备与成长 ↓</a>
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
    <p><a class="text-link" href="${base}#ai-games">返回 AI 游戏作品 ↑</a></p>
  </main>`;
}
