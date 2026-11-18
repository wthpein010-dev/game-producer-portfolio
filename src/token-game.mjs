import {readFileSync} from 'node:fs';

const title = '又没Token了！';
const media = JSON.parse(readFileSync(new URL('../assets/token-game/media.json', import.meta.url), 'utf8'));
const illustrations = {
  'main-menu': ['《又没Token了！》主菜单，重置之神按住按钮，右侧显示开始游戏等入口', 'Windows 原型主菜单。'],
  workbench: ['工作台显示存款、欠款、Token 与三镜头漫剧预览', '工作台把手头的额度、今天能接的工作和预计消耗放在同一屏。'],
  threads: ['工作台同时运行三个制作线程，各自显示剩余时间和已扣额度', '三个线程可以同时开工，正在做什么、还要等多久一眼可见。'],
  revision: ['漫剧返工回执显示已花额度、三格分镜和处理选项', '失败回执保留三格分镜和实际支出，方便判断要不要继续修。'],
  commission: ['委托详情并排展示普通与加急两种选项及各自的额度区间', '接单前可比较普通与加急，看到交付条件和消耗区间。'],
  settlement: ['日结账单显示实际到账金额与计算过程', '结束当天才揭晓到账金额，玩家可以核对存款变化。'],
  collection: ['成就界面显示分类、解锁状态和本局进度', '里程碑记录本局尝试，为下一局提供不同的目标。'],
  ending: ['工作室关停结算显示本局记录和新解锁项', '工作室关停后结算本局履历，将已达成的奖励收进收藏。'],
};

function figure(id, base) {
  const {width, height} = id === media.cover.id ? media.cover : media.images.find(image => image.id === id);
  const [alt, caption] = illustrations[id];
  const src = `${base}assets/token-game/${id}.webp`;
  return `<figure class="token-game-figure"><a href="${src}" aria-label="放大查看${alt}"><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"></a><figcaption>${caption} <a href="${src}">查看原图 ↗</a></figcaption></figure>`;
}

export function renderTokenGameEntry() {
  return `<section class="token-game-entry" id="token-game" aria-labelledby="token-game-title">
    <div class="section-head"><div><h3 id="token-game-title">${title}</h3></div><p>模拟经营 · Windows 可玩原型</p></div>
    <div class="token-game-entry-grid">
      <div>
        <p class="token-game-thesis">开局先欠 200 美元，靠 AI 接活养活工作室。</p>
        <p>我把 AI 制作中常见的超耗与返工做成经营选择。玩家每天接单、分配 Token、判断该修还是该停，晚上才知道赚了多少。</p>
        <a class="text-link" href="projects/token-game/">查看玩法设计与游戏画面 ↗</a>
      </div>
      ${figure(media.cover.id, '')}
    </div>
  </section>`;
}

export function renderTokenGameBody() {
  const base = '../../';
  return `<main id="main" class="detail-main wrap token-game-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#token-game">返回首页个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">个人作品 / 模拟经营</p>
      <h1>${title}</h1>
      <p class="detail-lede">玩家开局已订阅 AI 会员，欠下第一笔会员费。要撑到下一次续费，就得在有限额度里接活、返工或及时止损。</p>
      <p class="token-game-source">Godot / GDScript · Windows 可玩原型 ${media.version} · 画面取自同版本导出包的测试场景</p>
    </header>
    ${figure('workbench', base)}
    <section class="token-game-section" aria-labelledby="token-game-design-title">
      <h2 id="token-game-design-title">我如何把 AI 返工做成经营决策</h2>
      <p>我确定了现金与 Token 两套资源、不可回退的日结，以及「只在日结揭晓收入」的规则。我用 Codex 协助把规则、工作台和结算做进 Godot 原型，再根据运行画面迭代预览、线程队列与委托排版。</p>
      <div class="token-game-pair">
        <article><h3>先看消耗，把额度给值得做的单</h3><p>漫剧、工具、文案等工作都用卡片呈现。委托给出消耗区间和交付风险，运行时最多并行三单，开工就先扣 Token。</p>${figure('commission', base)}</article>
        <article><h3>把并行制作放进同一个工作台</h3><p>放大中间的作品预览，把倒计时和已扣额度压到下方。几项工作并行时，玩家仍能追踪状态并为下一单留出额度。</p>${figure('threads', base)}</article>
        <article><h3>做坏了，还要决定值不值得修</h3><p>失败时显示实际支出和产物问题。玩家可以修局部、整份重跑，或保留能拆成素材的片段。</p>${figure('revision', base)}</article>
        <article><h3>收工才对账，重置可能救急</h3><p>委托验收和自营销售在日结入账，当天结束后只向前推进。日终的「重置之神」有机会补满后续可用额度，手动重置道具则交给玩家择机使用。</p>${figure('settlement', base)}</article>
      </div>
    </section>
    <section class="token-game-section" aria-labelledby="token-game-progression-title">
      <h2 id="token-game-progression-title">工作室关停后，还能带走什么</h2>
      <p>续费留出明确的经营压力。本局经历会在结算后写进成就与收藏，让一次没赚回会员费的尝试也能留下可见的进展。</p>
      <div class="token-game-pair">
        ${figure('collection', base)}
        ${figure('ending', base)}
      </div>
    </section>
    <p><a class="text-link" href="${base}index.html#token-game">返回首页个人作品 ↑</a></p>
  </main>`;
}
