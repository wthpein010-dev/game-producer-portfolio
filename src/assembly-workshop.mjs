import {renderAiGameCard} from './ai-game-card.mjs';

const title = '装配工坊';
const play = 'https://wthpein010-dev.github.io/assembly-workshop/';
export const assemblySummary = '走进可探索的 3D 电子工坊，在七种工作台练习装配、质检和校准。回收零件、完成委托，再把进度带到下一班。';

export function renderAssemblyWorkshopEntry() {
  return renderAiGameCard({
    id:'assembly-workshop', title, description:assemblySummary,
    tags:['3D 厂区','工位操作','协作训练'], status:'浏览器公开试玩 · 电脑与手机',
    href:'projects/assembly-workshop/', detailLabel:'查看工位设计',
    secondaryLink:{href:play,label:'在线试玩'},
  });
}

function figure(file, caption) {
  const image = `../../assets/assembly-workshop/${file}.webp`;
  return `<figure class="ring-haven-figure" data-shot-format="landscape">
    <a href="${image}" aria-label="放大${caption}"><img src="${image}" width="1600" height="900" alt="${caption}" loading="lazy" decoding="async"></a>
    <figcaption>${caption} · 浏览器实机</figcaption>
  </figure>`;
}

export function renderAssemblyWorkshopBody() {
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#assembly-workshop" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">3D 岗位训练 / 网页游戏</p>
      <h1>${title}<span class="title-dot">.</span></h1>
      <p class="detail-lede">${assemblySummary}</p>
      <a class="button primary" href="${play}">在线试玩 <span aria-hidden="true">↗</span></a>
      <nav class="collaboration-nav" aria-label="玩法设计目录">
        <a href="#workshop-map">厂区与工位 ↓</a><a href="#workshop-practice">工序操作 ↓</a><a href="#workshop-progress">收集与协作 ↓</a>
      </nav>
    </header>
    <section class="ring-haven-section" id="workshop-map" aria-labelledby="workshop-map-title">
      <h2 id="workshop-map-title">把训练入口放在厂区里</h2>
      <p>总览显示七个编号工位，玩家可以直接选点，也可以切换第一人称走到工作台。仓储、装配、质检、封箱和校准各有自己的操作，地图上的区域与工位面板保持对应。</p>
      ${figure('factory','工坊地图的三维总览与七张工作台')}
    </section>
    <section class="ring-haven-section" id="workshop-practice" aria-labelledby="workshop-practice-title">
      <h2 id="workshop-practice-title">把装配拆成能操作、能纠错的步骤</h2>
      <p>主板练习先选内存条，再放入相应插槽。电脑可拖放，键盘与触屏可以先选物料再选槽位。工单提示当前步骤，错装可就地重试，结算反馈准确率、返工和用时。</p>
      ${figure('bench','主板装配工作台的第一人称视角与工序面板')}
    </section>
    <section class="ring-haven-section" id="workshop-progress" aria-labelledby="workshop-progress-title">
      <h2 id="workshop-progress-title">给每次回到工坊一个目标</h2>
      <div class="ring-haven-pair">
        <article><h3>从回收到组装</h3><p>沿厂区寻找零件，回到对应工位安装，装满后设备亮起指示灯。日程在已有练习中选出当日委托，把进度与游戏内奖励接回工坊。</p></article>
        <article><h3>从单人练习到双人训练</h3><p>联机大厅可以邀请工友一起完成质检，世界频道、赠礼和排行榜提供场外交流。工位认证与兑换流程属于游戏内模拟。</p></article>
      </div>
    </section>
  </main>`;
}
