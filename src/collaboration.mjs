export const collaborationSteps=[
  ['需求收口','澄清目标、范围与待确认项，整理成可讨论的问题清单。','结论与问题清单'],
  ['任务组织','补齐背景、规则、边界与验收要求，把变更更新到对应任务。','可执行任务'],
  ['原型交付','通过原型验证交互，再整理设计说明与交接资料。','原型与交接说明'],
  ['人机分工','AI 辅助准备材料，由人确认方向、优先级、分工和最终口径。','责任与状态'],
  ['测试验证','结合人工体验与测试用例核对功能和异常，记录需要修改的问题。','验证与修改记录'],
  ['复盘沉淀','整理调整原因、验收口径与后续工作，支持下一轮迭代。','复盘与后续任务']
];
export function renderCollaborationEntry(){
  return `<section class="collaboration-entry wrap section" id="ai-collaboration" aria-labelledby="collaboration-entry-title"><div class="section-head"><div><p class="eyebrow">CAPABILITY / 方法与协作</p><h2 id="collaboration-entry-title">AI 辅助研发与团队协作<span class="title-dot">.</span></h2></div></div><p class="collaboration-thesis">我负责产品判断、任务组织与验收，<br>让 AI 产出进入团队的实际研发流程。</p><p>从需求收口、原型验证到任务跟进与测试复盘，连接策划、程序与美术的协作。</p><a class="text-link" href="skills/ai-collaboration/">查看协作方法与职责 ↗</a></section>`;
}
export function renderCollaborationBody(e){
  return `<main id="main" class="detail-main wrap collaboration-page"><nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#ai-collaboration">返回首页能力介绍</a><span aria-hidden="true">/</span><span>方法与团队协作</span></nav><header class="detail-hero"><p class="eyebrow">PERSONAL CAPABILITY / 制作与推进</p><h1>AI 辅助研发<br>与团队协作<span class="title-dot">.</span></h1><p class="detail-lede">以产品判断组织工作，把讨论变成任务，把反馈变成下一轮迭代。</p><p>使用 Codex、飞书与 Tower 等工具辅助整理需求和交付资料；方向、分工和最终验收由人负责。</p></header><section class="collaboration-section" id="method"><h2>从需求到反馈</h2><ol class="collaboration-steps">${collaborationSteps.map(([title,text,result])=>`<li><h3>${e(title)}</h3><p>${e(text)}</p><span>产出 · ${e(result)}</span></li>`).join('')}</ol></section><section class="collaboration-section" id="delivery"><h2>交付与变更</h2><p>把原型、设计说明与验收要求关联到任务，追加讨论同步回对应记录，让协作者能找到当前范围与调整依据。</p></section><section class="collaboration-section" id="ownership"><h2>分工与推进</h2><p>承担需求梳理、任务拆分、排期协调及组内验收。团队的程序与美术成果由对应岗位完成，跨组协作规模不等于直属人数。</p><a class="text-link" href="../../experience/beta/#work-value">查看跨组协作经历 ↗</a></section><section class="collaboration-section" id="validation"><h2>验证与复盘</h2><p>结合人工试玩、测试用例与反馈检查体验。任务状态、工具运行结果与实际交付验收分别确认。</p></section><p class="record-source">本页为个人职责与通用工作方法摘要。</p><a class="text-link" href="../../index.html#ai-collaboration">返回首页能力介绍 ↑</a></main>`;
}
