import {renderAiGameCard} from './ai-game-card.mjs';

const slug = 'before-sign-off';
const title = '停播之前';
const status = 'Unity · Windows 0.5.5 本地试玩';
export const beforeSignOffSummary = '雨夜的电台里，接听来电、核对线索，在播出的影片中做出选择。沿线路图回到关键节点，看看另一种决定会改变什么。';

const scenes = [
  {
    id: 'opening', title: '让雨夜开场先建立悬疑',
    description: '序章用雨声、车站和末班车交代故事的时间与环境。对白使用底部单行字幕，长句在原有配音时段内分页，画面中仍保留人物反应和环境线索。',
    alt: '雨夜末班车驶向站亭，一名穿黄色雨衣的人站在灯下，底部有正片字幕',
  },
  {
    id: 'choice', title: '让第一道选择继续留在影片里',
    description: '遇到来电等抉择点，影片会进入该场景专属的等待片。玩家读选项时，环境和人物仍在画面里。确认后保留等待画面，直至对应分支的首帧可播放，以减少从选择回到演出时的跳切。',
    alt: '穿黄色雨衣的人拿着电话，两个剧情选项叠在雨夜的影片画面下方',
  },
  {
    id: 'story-map', title: '通过线路图回看关键节点',
    description: '线路图让节点、连线和已探索进度同时可见。选中已解锁节点，可以先看到场景信息，再从该处重返剧情。重玩由此围绕一次具体选择展开。',
    alt: '第一章线路图显示多个剧情节点、连接关系及进入当前节点的按钮',
  },
  {
    id: 'chapters', title: '用章节目录承接继续游玩',
    description: '目录把序章、已解锁内容和后续章节放进同一套入口。Windows 0.5.5 本地试玩覆盖序章与第一章《回声登记处》，其余章节以目录中的锁定状态呈现。',
    alt: '章节目录展示序章和第一章的入口，以及尚未开放的后续章节',
  },
];

export function renderBeforeSignOffEntry() {
  return renderAiGameCard({id:slug,title,description:beforeSignOffSummary,
    tags:['互动电影','悬疑分支','线路回看'],status,href:'projects/before-sign-off/',detailLabel:'查看剧情与交互设计'});
}

export function renderBeforeSignOffBody() {
  return `<main id="main" class="detail-main wrap">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#${slug}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">互动电影 · 悬疑叙事</p>
      <h1>${title}<span class="title-dot">.</span></h1>
      <p class="detail-lede">${beforeSignOffSummary}</p>
      <p class="record-source">${status}</p>
    </header>
    <nav class="taptap-section-nav" aria-label="本页内容">${scenes.map(scene=>`<a href="#${scene.id}">${scene.title}</a>`).join('')}</nav>
    <div class="game-design-stories">
      ${scenes.map(scene=>{
        const src=`../../assets/${slug}/${scene.id}.webp`;
        return `<article id="${scene.id}" aria-labelledby="${scene.id}-title">
          <div class="game-design-copy"><h2 id="${scene.id}-title">${scene.title}</h2><p>${scene.description}</p></div>
          <figure class="project-reference-image">
            <a href="${src}" aria-label="查看${scene.title}原图"><img src="${src}" width="1920" height="1080" loading="lazy" decoding="async" alt="${scene.alt}"></a>
            <figcaption>Windows 0.5.5 本地试玩实机</figcaption>
          </figure>
        </article>`;
      }).join('')}
    </div>
    <section class="ring-haven-section" aria-labelledby="film-edit-title">
      <h2 id="film-edit-title">把生成镜头接进同一场戏</h2>
      <p>生成素材用于补人物反应、手部动作和转场景别。剪辑时对照前后姿态、光线与原台词时码，再用 Windows 包检查正片和选择等待的衔接。0.5.5 把 39 条正片与 5 条等待片统一输出为 1920 × 1080、24 fps。</p>
    </section>
    <nav class="detail-footer" aria-label="继续浏览"><a class="button primary" href="../../index.html#${slug}">返回个人作品</a></nav>
  </main>`;
}
