import { renderAiGameCard } from './ai-game-card.mjs';

const title = '南街修物志';
const summary = '在南街开一家修复小店。跟着街坊的委托清理、装配和调试旧物，靠修复收入经营店铺，也慢慢拼起街坊们的故事。';

// Filenames and dimensions refer to the public copies used by both the
// inline gallery and the original-size viewer.
const images = {
  cover: [1920, 1080, '南街修物志宣传封面，修复师在临街工作台上修一盏旧灯', '项目宣传图'],
  home: [687, 1224, '南街修物志的竖屏小店首页与首位街坊的委托入口', '小店首页。把当前委托放在工作台旁，进入游戏就知道先做什么。'],
  commission: [564, 1224, '林姨的旧收音机工单，列出刻字保留要求、材料费和报酬', '接单前展示保留刻字的要求以及材料费与报酬。'],
  clean: [688, 1224, '旧收音机表面有多处浮尘，界面显示清理进度', '擦去浮尘，保留物件原来的使用痕迹。'],
  assembly: [688, 1224, '收音机装配台展示卡扣、旋钮和接点三个槽位', '对齐槽位再装配。部分零件需要先旋转。'],
  tuning: [564, 1224, '收音机调试界面中，信号滑杆进入绿色区间并显示稳定进度', '调到目标区间并保持稳定，才算调试完成。'],
  delivery: [564, 1224, '交付收音机后收到八十金币，并看到旧物线索', '交付同时给到账反馈和人物故事。'],
  street: [688, 1224, '南街日常页面展示街景、旧物市场入口和街坊档案', '从街区进入旧物市场，也能回看街坊与修过的物件。'],
  'opening-day': [688, 1224, '共同营业日界面，三位街坊站在修复后的街区里', '九份街坊委托完成后，可一起开门营业。'],
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
    tags: ['旧物修复', '小店经营', '街坊叙事'], status: 'TapTap 制造 · 手机实录',
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
        <p class="taptap-genre">竖屏模拟经营 · 个人 AI 游戏实践</p>
        <h1>${title}<span class="title-dot">.</span></h1>
        <p class="detail-lede">${summary}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#repair-video">看 34 秒修复实录 ↓</a></div>
      </header>
      ${figure('cover', base, 'taptap-hero-shot')}
      <div class="taptap-hero-context"><p class="taptap-hero-status">12 件旧物 · 9 份委托 · 3 位街坊</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#repair-video">实机录屏</a><a href="#repair-workbench">修复操作</a><a href="#repair-shop">店铺经营</a><a href="#repair-development">开发与验证</a></nav>
    <section id="repair-video" class="taptap-overview" aria-labelledby="repair-video-title">
      <div>
        <h2 id="repair-video-title">第一单，帮林姨修好收音机</h2>
        <p>林姨想找回熟悉的广播频道，也想保住收音机外壳的刻字。我用首单教会玩家清理、装配和调试。等到交付时，报酬进账，旧物也带出一段街坊往事。</p>
        <ol class="taptap-loop"><li>接下工单，确认客户要求和材料费</li><li>擦掉浮尘，装好零件，把信号调到稳定区间</li><li>确认交付，收下报酬并记录旧物线索</li></ol>
        <p class="record-source">TapTap 制造 Windows Runtime 实录，竖屏操作，约 34 秒，无声。</p>
      </div>
      <div class="sheep-playtest sheep-video-block"><video src="${media}radio-repair.mp4" poster="${media}commission.webp" width="564" height="1224" controls playsinline preload="none" aria-label="旧收音机委托从接单到交付的实机录屏"><a href="${media}radio-repair.mp4">打开实机录屏</a></video></div>
    </section>
    <section id="repair-workbench" aria-labelledby="repair-workbench-title">
      <h2 id="repair-workbench-title">把「修好」拆成看得懂的操作</h2>
      <p>首单用一件物品串起四个反馈。工单告诉玩家目标，清理进度确认手势生效，槽位和方向提示帮助找对零件，最后用稳定区间明确调试何时完成。</p>
      <div class="ring-haven-pair">${['commission', 'clean', 'assembly', 'tuning'].map(key => figure(key, base)).join('')}</div>
    </section>
    <section id="repair-shop" aria-labelledby="repair-shop-title">
      <h2 id="repair-shop-title">让每次修复都回到小店经营</h2>
      <p>街坊委托推进故事，市场收购给玩家经营选择。购买旧物前可以对照收购价、材料费和预计收益，修好后可销售或陈列。新工位和助手承接经营成长，助手分担清理，关键的装配和调试仍由玩家完成。</p>
      <div class="ring-haven-pair">${['home', 'delivery', 'street', 'opening-day'].map(key => figure(key, base)).join('')}</div>
    </section>
    <section id="repair-development" aria-labelledby="repair-development-title">
      <h2 id="repair-development-title">从玩法规则到可验证的手机版</h2>
      <p>我用 AI 辅助把已有玩法迁移到 TapTap 制造，按规则、存档和竖屏交互拆分工作。为了让玩家在碎片时间也能修完一件旧物，我把首单从接单到到账、中途退出后续修、保存失败后重试列为验收场景。</p>
      <p class="record-source">TapTap 制造版本已完成官方构建。页面展示该项目的原生运行截图与录屏，图中人物为游戏角色。</p>
    </section>
  </main>`;
}
