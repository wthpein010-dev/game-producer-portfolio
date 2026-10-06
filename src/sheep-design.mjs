// Selected project design images, reviewed and authorized for public display.
// These are project references, not individual artwork or a release report.
export const sheepDesigns = [
  {
    id: 'save-recovery', number: '01', label: 'STATE / RECOVERY',
    title: '第二关存档恢复', file: 'save-recovery.png', width: 3936, height: 2936,
    preview: 'flow', caption: '项目设计资料 · 状态与异常分支',
    alt: '第二关存档恢复流程图：主页检测有效存档，恢复成功进入原对局，恢复或放弃失败时保留存档与弹窗供重试',
    lead: '一条恢复路径，需要同时处理成功、放弃和失败。',
    points: ['主页先检测有效存档，再决定是否展示继续对局弹窗。', '恢复读取最近一次成功保存的进度；失败时保留存档，允许重试。', '放弃需要服务端确认成功后，才作废旧存档。'],
  },
  {
    id: 'tile-patterns', number: '02', label: 'SYSTEM / RULES',
    title: '砖块图案搭配', file: 'tile-patterns.png', width: 1550, height: 5527,
    preview: 'map', caption: '项目设计资料 · 系统规则脑图',
    alt: '砖块图案与搭配功能脑图：主题浏览、自定义方案、生效规则、首发与后续范围，以及保存失败回退和界面状态',
    lead: '个性化外观的同时，明确哪些规则保持稳定。',
    points: ['仅调整普通砖块正面图案，类型、配对、布局与难度规则保持不变。', '区分主题浏览、整套使用与自定义搭配，并规定方案的生效时机。', '保存成功后生效；失败保留旧方案。图中 P0、P1 表示设计范围分层。'],
  },
  {
    id: 'lucky-items', number: '03', label: 'PLAYER / FLOW',
    title: '小物好运局流程', file: 'lucky-items-flow.jpg', width: 2560, height: 2560,
    preview: 'screens', caption: '项目设计资料 · 界面流程示意',
    alt: '小物好运局界面流程图：从主界面入口查看奖池、开始挑战、胜利结算到自动揭晓小物，另列挑战失败和重试路径',
    lead: '把入口、挑战、结算和奖励反馈连成一条可读的路径。',
    points: ['从主界面入口进入奖池，再开始活动关卡。', '胜利后结算奖励，返回活动页自动揭晓小物。', '失败不占资格，可重新挑战；失败回路与成功路径分开标出。'],
  },
];

export function renderSheepDesign(e) {
  return `<section class="project-design" id="project-design" aria-labelledby="project-design-title">
    <div class="section-head"><div><p class="eyebrow">PROJECT DESIGN / 项目设计资料</p><h2 id="project-design-title">项目设计资料<span class="title-dot">.</span></h2></div><p>三份项目资料，<br>阅读状态、系统与操作流程。</p></div>
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
