import { renderAiGameCard } from './ai-game-card.mjs';

const title = '南街修物志';
const summary = '在南街开一家修复小店。跟着街坊的委托清理、装配和调试旧物，靠修复收入经营店铺，也慢慢拼起街坊们的故事。';

// Filenames and dimensions refer to the public copies used by both the
// inline gallery and the original-size viewer.
const images = {
  cover: [1920, 1080, '南街修物志宣传封面，修复师在临街工作台上修一盏旧灯', '项目宣传图'],
  home: [687, 1224, '南街修物志的竖屏小店首页与首位街坊的委托入口', '小店工作台旁的当前委托入口。'],
  commission: [564, 1224, '林姨的旧收音机工单，列出刻字保留要求、材料费和报酬', '林姨的收音机工单。'],
  clean: [688, 1224, '旧收音机表面有多处浮尘，界面显示清理进度', '清理中的收音机外壳。'],
  assembly: [688, 1224, '收音机装配台展示卡扣、旋钮和接点三个槽位', '装配台上的卡扣、旋钮和接点。'],
  tuning: [564, 1224, '收音机调试界面中，信号滑杆进入绿色区间并显示稳定进度', '绿色区间显示收音机调试的目标。'],
  delivery: [564, 1224, '交付收音机后收到八十金币，并看到旧物线索', '交付收音机后到账 80 金币。'],
  street: [688, 1224, '南街日常页面展示街景、旧物市场入口和街坊档案', '南街日常与旧物市场入口。'],
  'opening-day': [688, 1224, '共同营业日界面，三位街坊站在修复后的街区里', '共同营业日，使用展示存档。'],
};

function figure(key, base, className = 'ring-haven-figure') {
  const [width, height, alt, caption] = images[key];
  const src = `${base}assets/nanjie-repair-shop/${key}.webp`;
  return `<figure class="${className}" data-shot-format="${width > height ? 'landscape' : 'portrait'}">
    <a class="taptap-image-link" href="${src}" aria-label="放大：${alt}"><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"></a>
    <figcaption>${caption}</figcaption>
  </figure>`;
}

export function renderNanjieEntry() {
  return renderAiGameCard({id: 'nanjie-repair-shop', title, description: summary,
    tags: ['旧物修复', '小店经营', '街坊叙事'], status: 'TapTap 制造 · 竖屏实录',
    href: 'projects/nanjie-repair-shop/', detailLabel: '查看玩法与实录',
  });
}

export function renderNanjieBody() {
  const base = '../../';
  const media = `${base}assets/nanjie-repair-shop/`;
  return `<main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#nanjie-repair-shop" data-return-home>返回首页个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="taptap-genre">AI 游戏作品 / 竖屏模拟经营</p>
        <h1>${title}<span class="title-dot">.</span></h1>
        <p class="detail-lede">${summary}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#repair-video">看 34 秒修复实录 ↓</a></div>
      </header>
      ${figure('cover', base, 'taptap-hero-shot')}
      <div class="taptap-hero-context"><p class="taptap-hero-status">12 件旧物 · 9 份委托 · 3 位街坊</p><p class="record-source">游戏画面采自 TapTap 制造 Windows Runtime。</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#repair-video">收音机委托实录</a><a href="#repair-workbench">动手修复</a><a href="#repair-shop">开店与街坊</a></nav>
    <section id="repair-video" class="taptap-overview" aria-labelledby="repair-video-title">
      <div>
        <h2 id="repair-video-title">第一单，帮林姨修好收音机</h2>
        <p>林姨想重新听到熟悉的广播，也想留下收音机外壳上的刻字。接下工单，擦掉浮尘，装回零件，慢慢把信号调稳。把收音机还给林姨时，除了报酬，还会听到一段旧物往事。</p>
        <p class="record-source">约 34 秒竖屏实录，无声。</p>
      </div>
      <div class="sheep-playtest sheep-video-block"><video src="${media}radio-repair.mp4" poster="${media}commission.webp" width="564" height="1224" controls playsinline preload="none" aria-label="旧收音机委托从接单到交付的实机录屏"><a href="${media}radio-repair.mp4">打开实机录屏</a></video></div>
    </section>
    <section id="repair-workbench" aria-labelledby="repair-workbench-title">
      <h2 id="repair-workbench-title">从读工单到找回广播信号</h2>
      <div class="ring-haven-pair">
        <article><h3>接单前看清要求和成本</h3><p>工单写着要保留的细节、材料费和报酬。先看看哪些地方需要动手，哪些痕迹要留给原主人。</p>${figure('commission', base)}</article>
        <article><h3>擦去浮尘，留下使用痕迹</h3><p>沿着外壳逐处擦拭，清理进度会随操作推进。刻字和留下的使用痕迹也是物件的一部分。</p>${figure('clean', base)}</article>
        <article><h3>把零件装回对应的槽位</h3><p>看准卡扣、旋钮和接点的位置，按槽位提示装回零件。有些零件需要先转到正确朝向。</p>${figure('assembly', base)}</article>
        <article><h3>在绿区稳住信号</h3><p>滑动调试杆，找到绿色目标区间后保持稳定。等进度走完，收音机就可以交回街坊手中。</p>${figure('tuning', base)}</article>
      </div>
    </section>
    <section id="repair-shop" aria-labelledby="repair-shop-title">
      <h2 id="repair-shop-title">一件件修好，南街也渐渐热闹起来</h2>
      <div class="ring-haven-pair">
        <article><h3>添工位，请助手</h3><p>在工作台旁接下街坊的委托，用修复收入添置工位。请到助手后，清理可以交给助手，装配和调试仍由你完成。</p>${figure('home', base)}</article>
        <article><h3>交回旧物，记下一段往事</h3><p>修好的收音机交给林姨，报酬立即到账，同时记下物件背后的线索。之后可以在街坊档案里翻看。</p>${figure('delivery', base)}</article>
        <article><h3>逛市场，挑值得修的旧物</h3><p>对照收购价、材料费和预计收益挑旧物。修好后可以卖掉，也可以挑一件喜欢的留在店里陈列。</p>${figure('street', base)}</article>
        <article><h3>和街坊一起开门营业</h3><p>做完九份街坊委托，就迎来「共同营业日」。三位街坊聚在修复后的南街，一起开门营业。</p>${figure('opening-day', base)}</article>
      </div>
    </section>
  </main>`;
}
