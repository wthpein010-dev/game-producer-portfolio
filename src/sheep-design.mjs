// Selected project design images, reviewed and authorized for public display.
// These are project references, not individual artwork or a release report.
import {renderSheepEvidence} from './sheep-evidence.mjs';
import {renderSheepFlowGallery} from './sheep-visuals.mjs';
export const sheepDesigns = [
  {
    id: 'level-gameplay', number: '01', label: 'GAMEPLAY / LOGIC',
    title: '关卡玩法与胜负判定', file: 'sheep-match/board-no-pair-decision-detail.jpg', width: 805, height: 505,
    preview: 'flow', caption: '关卡玩法文档 · 历史判定流程局部',
    alt: '关卡玩法历史逻辑流程：进入第二关后检查可配对砖块、是否全部配对完成，以及临时槽位和道具的补救分支',
    lead: '把教学、核心挑战、配对规则与胜负结算组织为可执行的关卡流程。',
    points: ['第一关承担教学，完成后直接进入第二关难度飞升，第二关承担核心挑战。', '开局生成全部砖块，相同类型的可操作砖块两两配对；坐标、层级和遮挡关系共同决定操作范围。', '无可配对时分别定义临时槽位、道具补救、复活和放弃的处理路径；配对完成后进入通关结算。图中为文档历史版本，与第二版入槽玩法分开阅读。'],
  },
  {
    id: 'lucky-items', number: '02', label: 'PLAYER / FLOW',
    title: '小物好运局流程', file: 'lucky-items-flow.jpg', width: 2560, height: 2560,
    preview: 'screens', caption: '项目设计资料 · 小物好运局早期流程方案',
    alt: '小物好运局界面流程图：从主界面入口查看奖池、开始挑战、胜利结算到自动揭晓小物，另列挑战失败和重试路径',
    lead: '早期方案保留作迭代对照；新版每日小物采用通关得券、主动抽奖。',
    points: ['原图记录从入口、奖池到活动关卡的早期操作路径。', '图中胜利后自动揭晓属于早期方案；新版返回页面不自动抽奖，兑换券可以跨天累计。', '失败路径与成功路径分开阅读，具体进度与资格以新版每日小物规则为准。'],
  },
];

export function renderSheepDesign(e) {
  return `${renderSheepFlowGallery(e)}${renderSheepEvidence(e)}<section class="project-design" id="project-design" aria-labelledby="project-design-title">
    <div class="section-head"><div><p class="eyebrow">PROJECT DESIGN / 项目设计资料</p><h2 id="project-design-title">项目设计资料<span class="title-dot">.</span></h2></div><p>关卡规则、逻辑判定与早期界面流程。</p></div>
    <p class="design-role">我的角色是游戏制作人，工作范围包括整体方向、玩法与系统、团队与排期、数据迭代。下列资料用于展开项目设计讨论；美术执行由团队相应岗位承担。</p>
    <div class="design-references">${sheepDesigns.map(item => {
      const image = `../../assets/project-design/${item.file}`;
      const img = `src="${image}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${e(item.alt)}"`;
      return `<article class="design-reference" aria-labelledby="design-${item.id}-title">
        <figure class="design-overview design-overview-${item.preview}"><img ${img}><figcaption>${e(item.caption)}</figcaption></figure>
        <div class="design-copy"><span class="panel-label">${item.number} / ${item.label}</span><h3 id="design-${item.id}-title">${e(item.title)}</h3><p class="design-lead">${e(item.lead)}</p><ul>${item.points.map(point => `<li>${e(point)}</li>`).join('')}</ul><a class="design-original" href="${image}">查看原图（可缩放）<span aria-hidden="true">↗</span></a></div>
        <details class="design-inspect"><summary>在页面内阅读大图<span aria-hidden="true">＋</span></summary><p id="design-${item.id}-help">大图可横向与纵向滚动。键盘进入图区后可用方向键移动；手机可滑动，或打开原图缩放。</p><div class="design-scroll" tabindex="0" role="region" aria-label="${e(item.title)}大图阅读区域" aria-describedby="design-${item.id}-help"><img ${img}></div></details>
      </article>`;
    }).join('')}</div>
    <p class="design-source">资料类型：项目设计图。图中展示设计方案，不代表全部已上线，也不构成经营成果证明；资料不用于认定个人独立完成范围。</p>
  </section>`;
}
