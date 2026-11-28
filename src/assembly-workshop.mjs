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
        <a href="#workshop-map">厂区与工位 ↓</a><a href="#workshop-practice">主板工单 ↓</a><a href="#workshop-progress">收集与协作 ↓</a>
      </nav>
    </header>
    <section class="ring-haven-section" id="workshop-map" aria-labelledby="workshop-map-title">
      <h2 id="workshop-map-title">把训练入口放在厂区里</h2>
      <p>总览显示七个编号工位，玩家可以直接选点，也可以切换第一人称走到工作台。仓储、装配、质检、封箱和校准各有自己的操作，地图上的区域与工位面板保持对应。</p>
      ${figure('factory','工坊地图的三维总览与七张工作台')}
    </section>
    <section class="ring-haven-section" id="workshop-practice" aria-labelledby="workshop-practice-title">
      <h2 id="workshop-practice-title">从领到主板工单，到完成一轮装配</h2>
      <p>以「装配底板 A12」为例，工单先让玩家从托盘选 B16 内存条，核对 DIMM 插槽。内存入位后，再装固态硬盘，最后固定螺丝。鼠标可直接拖放，键盘和触屏可以先选物料，再选槽位。</p>
      ${figure('case-start','工单第一步提示当前物料和目标插槽')}
      <h3>放错时重试当前工序</h3>
      <p>把 B16 放到硬盘位，工位会标出错处并提示查看 DIMM 丝印。重试只回到当前工序，已完成的步骤仍然保留。三道工序结束后，结算同时显示得分、返工次数和用时，方便下一轮对照。</p>
      <div class="ring-haven-pair">
        ${figure('case-retry','错放到硬盘位时，面板提示查看 DIMM 丝印并重试')}
        ${figure('case-result','同一轮纠错后完成装配，结算记录 1 次返工')}
      </div>
    </section>
    <section class="ring-haven-section" id="workshop-progress" aria-labelledby="workshop-progress-title">
      <h2 id="workshop-progress-title">给每次回到工坊一个目标</h2>
      <div class="ring-haven-pair">
        <article><h3>回收物有明确的去处</h3><p>在厂区找到的零件，可拿到主板装配台或校准台的「零件组装」页安装。装满后，设备在场景中亮起指示灯。日程从已有练习中挑出当天委托，完成后可回到工坊查看进度和奖励。</p></article>
        <article><h3>把单人技法用到双人交接</h3><p>两位玩家可从联机大厅进入交接工位。工单、质检记录和当前进度构成交接内容，让合作围绕双方可核对的信息展开。工位认证与兑换流程属于游戏内模拟。</p></article>
      </div>
    </section>
  </main>`;
}
