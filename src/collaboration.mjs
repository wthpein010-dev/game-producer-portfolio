export const collaborationSteps = [
  ['需求收口','从已授权的讨论、会议和文档中提取结论、待办与待确认项，先澄清目标和冲突。','结论与问题清单'],
  ['任务组织','将需求补成背景、目标、规则、边界、验收及来源；关联原任务，避免追加讨论变成重复建单。','可执行任务'],
  ['原型交付','用可运行网页验证交互，把源码、设计说明、效果图和接入说明放入对应需求附件。','可体验的交付包'],
  ['人机分工','按任务交给真人成员、项目助手或数据助手；由人确认负责人、优先级、工期与最终口径。','明确的责任与状态'],
  ['测试验证','AI 辅助整理测试用例、开展关卡模拟，结合人工试玩和数据反馈检查体验与异常。','验证记录与修改项'],
  ['复盘沉淀','将新增要求补回任务，记录完成项、阻塞、调整原因和验收口径，形成下一轮迭代依据。','版本记录与项目经验'],
];

const happyFamilyShots = [
  ['family-tree', '家庭成长', '家庭树展示多代成员及其状态'],
  ['city-map', '城市与产业', '城市地图展示住宅和可经营的商铺'],
  ['school-choice', '教育选择', '学龄阶段提供不同学校选项'],
  ['restaurant-staff', '餐厅经营', '餐厅面板展示业主和厨师的岗位配置'],
];

function renderHappyFamilyShots(shots, base) {
  const figures = shots.map(([file, title, alt]) => {
    const href = `${base}assets/happy-family-research/${file}.webp`;
    return `<figure class="collaboration-evidence" data-shot-format="portrait">
      <a class="taptap-image-link" href="${href}" aria-label="放大查看${title}截图">
        <img src="${href}" width="1440" height="2560" loading="lazy" decoding="async" alt="${alt}">
      </a>
      <figcaption>${title}</figcaption>
    </figure>`;
  }).join('');
  return `<div class="taptap-shot-grid taptap-scroll-gallery" role="group" aria-label="原游戏试玩截图">${figures}</div>`;
}

export function renderCollaborationEntry() {
  return `<section class="collaboration-entry wrap section" id="ai-collaboration" aria-labelledby="collaboration-entry-title"><div class="section-head"><div><p class="eyebrow">CAPABILITY / 方法与协作</p><h2 id="collaboration-entry-title">AI 辅助研发与团队协作<span class="title-dot">.</span></h2></div></div><div class="collaboration-entry-grid"><div><p class="collaboration-thesis">我负责产品判断、任务组织与验收，<br>让 AI 产出进入团队的实际研发流程。</p><p>从需求收口、可运行原型到任务跟进与测试复盘，连接真人成员和专项 AI 助手。以《对对碰》的使用记录呈现方法，以跨组协作经历补充管理实践。</p><ul class="collaboration-tags"><li>需求与变更管理</li><li>人机分工</li><li>验证与复盘</li></ul><a class="text-link" href="skills/ai-collaboration/">查看协作方法与实际案例 ↗</a></div><figure><a href="skills/ai-collaboration/#delivery"><img src="assets/collaboration/task-conversation-redacted.png" width="1710" height="790" loading="lazy" alt="Multica 使用记录：从自然语言需求创建任务，并将追加要求更新到原任务"></a><figcaption>实际使用记录 · 人员标识已遮盖</figcaption></figure></div>
    <section class="collaboration-section" id="happy-family-research-overview" aria-labelledby="happy-family-research-overview-title">
      <div class="collaboration-entry-grid">
        <div>
          <h3 id="happy-family-research-overview-title">《快乐方块屋》竞品研究</h3>
          <p>这是一款家庭模拟经营游戏。我通过持续试玩，梳理子女教育、就业、产业经营和生活事件如何串起几代人的成长。</p>
          <p class="record-source">原游戏试玩截图。<span class="gallery-scroll-help">左右滑动查看。</span></p>
          <a class="text-link" href="skills/ai-collaboration/#happy-family-research">查看玩法拆解与试玩图集 ↗</a>
        </div>
        ${renderHappyFamilyShots(happyFamilyShots.slice(0, 2), '')}
      </div>
    </section>
  </section>`;
}

export function renderCollaborationBody(e) {
  const figure=(file,width,height,alt,caption)=>`<figure class="collaboration-evidence"><a href="../../assets/collaboration/${file}" aria-label="查看${e(alt)}原图"><img src="../../assets/collaboration/${file}" width="${width}" height="${height}" loading="lazy" alt="${e(alt)}"></a><figcaption>${e(caption)} <a href="../../assets/collaboration/${file}">查看原图 ↗</a></figcaption></figure>`;
  return `<main id="main" class="detail-main wrap collaboration-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#ai-collaboration">返回首页能力介绍</a><span aria-hidden="true">/</span><span>方法与团队协作</span></nav>
    <header class="detail-hero"><p class="eyebrow">PERSONAL CAPABILITY / 制作与推进</p><h1>AI 辅助研发<br>与团队协作<span class="title-dot">.</span></h1><p class="detail-lede">以产品判断组织工作，把讨论变成任务，把原型变成交付，把反馈变成下一轮迭代。</p><p>Multica、Codex、飞书与 Tower 是实践工具；需求澄清、工作拆分、跨岗位协调和最终验收，是我持续承担的工作。</p><nav class="collaboration-nav" aria-label="能力专题目录"><a href="#method">工作方法 ↓</a><a href="#delivery">实际案例 ↓</a><a href="#ownership">分工与管理 ↓</a><a href="#validation">验证与复盘 ↓</a><a href="#happy-family-research">竞品研究 ↓</a></nav></header>
    <section class="collaboration-section" id="method" aria-labelledby="method-title"><p class="eyebrow">WORKFLOW / 从输入到反馈</p><h2 id="method-title">一套可追踪的协作方法</h2><ol class="collaboration-steps">${collaborationSteps.map(([title,copy,result])=>`<li><h3>${e(title)}</h3><p>${e(copy)}</p><span>产出 · ${e(result)}</span></li>`).join('')}</ol><p class="record-source">月报记录 Codex + 飞书／Tower 的协作方法；Multica 截图补充人机分工实践。不据此认定这些平台已全部自动打通。</p></section>
    <section class="collaboration-section" id="delivery" aria-labelledby="delivery-title"><p class="eyebrow">PRACTICE / 实际使用记录</p><h2 id="delivery-title">让需求、附件与变更留在同一条任务里</h2><p>在关卡编辑器需求中，我先明确资源复用、模组管理和放置预览，再追加混合类型保存与排序要求。助手将新要求更新至原任务，并关联已有需求，程序可沿同一条记录继续工作。</p>${figure('task-conversation-redacted.png',1710,790,'需求创建与追加更新对话','本人提供的 Multica 局部截图 · 人员标识已遮盖；任务回执不等于研发已完成。')}
    <div class="collaboration-columns"><div><h3>原型不是交付的终点</h3><p>可运行网页连同源码、设计说明、效果图和技术接入文档作为需求附件交接。先让团队体验规则，再对照说明实现；网页包交付与 Unity 开发、验收分别记录。</p></div><div><h3>变更不只留在聊天里</h3><p>新讨论补充到原任务，明确新增范围与替代旧规则的部分。保留任务关联及附件，让后来接手的人能找到当前口径和调整依据。</p></div></div></section>
    <section class="collaboration-section" id="ownership" aria-labelledby="ownership-title"><p class="eyebrow">OWNERSHIP / 责任与推进</p><h2 id="ownership-title">人做决定，AI 辅助执行，团队共同交付</h2><div class="collaboration-board-row"><div><div class="collaboration-columns"><div><h3>我负责</h3><ul><li>产品方向、体验判断与范围取舍</li><li>工作拆分、排期协调及负责人确认</li><li>冲突澄清、组内验收与最终口径</li></ul></div><div><h3>AI 辅助</h3><ul><li>上下文整理、建单与变更补充</li><li>原型、文档和测试用例准备</li><li>授权范围内的数据查询与记录汇总</li></ul></div></div><h3>任务状态服务于下一步行动</h3><p>用待规划、待办、进行中、审核中、阻塞及完成区分工作阶段。审核中不等于已上线，智能体运行成功也不等于任务通过验收。</p><h3>延续到跨岗位协作</h3><p>在 Wordvillas 约百人规模项目中，协作程序、美术与剧情组，承接排期、任务拆分、组内工作验收和项目文档等部分 PM 工作。协作规模非直属人数，不能写成直接管理百人团队。</p><a class="text-link" href="../../experience/beta/#work-value">查看 Wordvillas 跨组协作经历 ↗</a></div>${figure('shared-board-redacted.png',890,1125,'真人与项目助手共同使用的任务看板','Multica 看板局部 · 人员标识已遮盖 · 截图时的阶段状态，不代表当前实时进度。')}</div></section>
    <section class="collaboration-section" id="validation" aria-labelledby="validation-title"><p class="eyebrow">VALIDATION / 证据与判断</p><h2 id="validation-title">用模拟筛问题，用体验做判断</h2><div class="collaboration-columns"><div><h3>关卡模拟 + 人工试玩</h3><p>阶段月报记录每关进行 10,000 次 AI 模拟，用于筛查极端概率与潜在死局；再结合人工挑战次数、时长、连击、道具使用和主观感受，调整后重新验证。</p><p class="record-source">模拟通关率不等于玩家真实通关率，也不直接构成上线标准；本专题未重新运行或独立审计该批跑测。</p></div><div><h3>专项数据助手</h3><p>配置数数数据分析助手，使用已授权的网页查询、项目经验及相关技能，支持报表、看板和 AB 测试分析。分析问题与任务记录关联，不以“工具执行成功”替代结论审核。</p><p class="record-source">截图支持助手配置与运行实践，不证明特定分析带来了留存或收入增长。</p></div></div>${figure('analyst-role.jpg',1100,235,'数数数据分析助手的职责配置','本人提供的助手配置局部 · 不展示连接信息、运行成功率或账号设置。')}<h3>把调整原因沉淀为团队依据</h3><p>会议后整理决定、待办与待确认项；版本记录保留“改了什么、为什么改、按什么验收”。《对对碰》六版生命周期方案围绕提示、继续尝试、复活与失败时机收敛，是方法应用于具体体验问题的案例。</p><a class="text-link" href="../../projects/sheep-match/#sheep-evidence">查看《对对碰》设计与研发推进案例 ↗</a></section>
    <section class="collaboration-section" id="happy-family-research" aria-labelledby="happy-family-research-title">
      <h2 id="happy-family-research-title">《快乐方块屋》竞品研究</h2>
      <p>玩家为家庭成员选择学校和职业，也能在城市购置产业、安排岗位。生活事件会突然引入新的选择，改变家庭成员的状态或收支。</p>
      <p>我确定试玩路线，用 Codex 辅助把事件入口、选择和结果整理成玩法说明和截图索引，供策划查阅。</p>
      <p class="record-source">画面来自安卓模拟器中的原游戏。<span class="gallery-scroll-help">左右滑动查看。</span>点击截图可放大。</p>
      ${renderHappyFamilyShots(happyFamilyShots, '../../')}
      <a class="text-link" href="../../index.html#happy-family-research-overview">返回首页项目介绍 ↑</a>
    </section>
    <section class="collaboration-section" aria-labelledby="sources-title"><h2 id="sources-title">资料与说明</h2><p class="record-source">依据本人提供的三张 Multica 使用截图、《羊了个羊：对对碰》7–8 月度进展汇报及已确认的跨组协作职责整理。截图裁取相关区域并遮盖人员姓名、昵称与账号，非功能演示页面；不公开完整聊天、连接凭据或内部统计。效率提升幅度未验证，不补写节省工时、自动化比例或增长归因。</p><a class="text-link" href="../../index.html#ai-collaboration">返回首页能力介绍 ↑</a></section>
  </main>`;
}
