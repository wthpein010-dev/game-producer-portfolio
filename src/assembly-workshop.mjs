import {renderAiGameCard} from './ai-game-card.mjs';

const title = '装配工坊';
const play = 'https://wthpein010-dev.github.io/assembly-workshop/';
const hostedPlay = 'https://zhuangpei-workshop.polite-chord-7994.chatgpt.site/';
export const assemblySummary = '走进可探索的 3D 电子工坊，在七种工作台练习装配、质检和校准。回收零件、完成委托，再把进度带到下一班。';

export function renderAssemblyWorkshopEntry() {
  return renderAiGameCard({
    id:'assembly-workshop', title, description:assemblySummary,
    tags:['3D 厂区','工位操作','协作训练'], status:'浏览器公开试玩 · 电脑与手机',
    href:'projects/assembly-workshop/', detailLabel:'查看工位设计',
    secondaryLink:{href:play,label:'在线试玩'},
  });
}

function figure(file, caption, width = 1600, height = 900) {
  const image = `../../assets/assembly-workshop/${file}.webp`;
  return `<figure class="project-reference-image" data-shot-format="landscape">
    <a class="taptap-image-link" href="${image}" aria-label="放大${caption}"><img src="${image}" width="${width}" height="${height}" alt="${caption}" loading="lazy" decoding="async"></a>
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
      <a class="text-link" href="${hostedPlay}">ChatGPT Sites 试玩 <span aria-hidden="true">↗</span></a>
      <nav class="collaboration-nav" aria-label="玩法设计目录">
        <a href="#workshop-map">厂区与工位 ↓</a><a href="#workshop-pc">电脑操作 ↓</a><a href="#workshop-practice">主板工单 ↓</a><a href="#workshop-routine">创角与日程 ↓</a><a href="#workshop-progress">收集与协作 ↓</a>
      </nav>
    </header>
    <section class="ring-haven-section" id="workshop-map" aria-labelledby="workshop-map-title">
      <h2 id="workshop-map-title">把训练入口放在厂区里</h2>
      <p>总览显示七个编号工位，玩家可以直接选点，也可以切换第一人称走到工作台。仓储、装配、质检、封箱和校准各有自己的操作，地图上的区域与工位面板保持对应。</p>
      ${figure('factory','工坊地图的三维总览与七张工作台')}
    </section>
    <section class="ring-haven-section" id="workshop-pc" aria-labelledby="workshop-pc-title">
      <h2 id="workshop-pc-title">把第一人称场景和操作面板放在一起</h2>
      <p>新版电脑界面保留左侧 3D 视野和右侧导航。进入工位后，镜头转向台面，右侧切换成当前工单、物料、目标位置和按键提示，方便一边观察设备，一边确认手上的工序。</p>
      <p>在总览和步行间按 V 切换，步行用 WASD 移动，靠近工位按 E 开始。装配时用 1–3 选料，按 Z、X 或 C 选槽位，R 重试当前步骤。机械臂校准用方向键调整、回车检测。H 打开操作指南，Esc 离开工作台。</p>
      ${figure('pc-hud-station','新版电脑界面左侧保留主板装配台，右侧显示已选的 B16 内存、目标槽位和快捷键')}
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
    <section class="ring-haven-section" id="workshop-routine" aria-labelledby="workshop-routine-title">
      <h2 id="workshop-routine-title">从创建角色到安排下一班</h2>
      <div class="ring-haven-pair">
        <article>
          <h3>创建角色时能看见每次改动</h3>
          <p>创角依次选择体验班组、定制外观和设置昵称。脸型、发型、肤色各自独立，修改其中一项时会在同一个预览里立即更新。角色外观和社交头像都能回到「角色与存档」重新选择。</p>
          ${figure('pc-creator','创角演示界面并排展示角色预览、外观设置和头像工坊',1440,910)}
        </article>
        <article>
          <h3>把签到和日常委托接回工位</h3>
          <p>日程按加州厂区时间显示每天签到及当前开放的委托。白班对应训练，晚间对应厂区工位。时段内完成指定练习后，奖励自动计入存档，返回日程即可检查当天进度。</p>
          ${figure('pc-activities','演示存档的工坊日程，显示已签到、当日时间和开放中的晚间工坊委托',1440,910)}
        </article>
      </div>
    </section>
    <section class="ring-haven-section" id="workshop-progress" aria-labelledby="workshop-progress-title">
      <h2 id="workshop-progress-title">给每次回到工坊一个目标</h2>
      <div class="ring-haven-pair">
        <article><h3>回收物有明确的去处</h3><p>在厂区找到的零件，可拿到主板装配台或校准台的「零件组装」页安装。装满后，设备在场景中亮起指示灯，进度记录在存档里。</p></article>
        <article><h3>把单人技法用到双人交接</h3><p>两位玩家可从联机大厅进入交接工位。工单、质检记录和当前进度构成交接内容，让合作围绕双方可核对的信息展开。工位认证与兑换流程属于游戏内模拟。</p></article>
      </div>
    </section>
  </main>`;
}
