const hub = 'https://wthpein010-dev.github.io/ai-application-hub/projects';
const library = 'https://wthpein010-dev.github.io/game-design-library/';
const hubCode = 'https://github.com/wthpein010-dev/ai-application-hub';
const hubRevision = '3ad59bf1f24dcd99dcbb660e4a9186a8353cdb06';

const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
);

function formatCase({ sections, imageSize: [width, height], shots, links }) {
  const fields = sections.map(([label, copy]) =>
    `<div><span class="field-label">${escape(label)}</span><p>${escape(copy)}</p></div>`
  ).join('\n');
  const gallery = shots.map(([file, label, alt, copy]) => {
    const src = `assets/hub-app-cases/${file}.webp`;
    return `<figure class="project-reference-image">
      <a class="taptap-image-link" href="${src}" aria-label="放大${escape(label)}"><img src="${src}" width="${width}" height="${height}" alt="${escape(alt)}" loading="lazy" decoding="async"></a>
      <figcaption><div><strong>${escape(label)}</strong>${escape(copy)}</div></figcaption>
    </figure>`;
  }).join('\n');
  const evidence = links.map(([label, href]) => `<a href="${escape(href)}">${escape(label)} ↗</a>`).join('\n');

  return `<div class="case-body">
    <div class="case-grid">${fields}</div>
    <div class="taptap-shot-grid">${gallery}</div>
    <div class="evidence-links"><span>查看原项目</span>${evidence}</div>
  </div>`;
}

export const caseDetails = {
  'case-planmap': formatCase({
    sections: [
      ['从哪里开始', '策划框架常在讨论中多次改写。工作区并排放置对话与画布，让使用者边提出修改，边检查受影响的节点。公开演示从一张「新品发布会策划」示例图起步。'],
      ['通过对话修改现有内容', '输入「把核心目标改成品牌破圈」，演示会在整张图中查找原文。唯一匹配时就地替换，其他分支保留。命中多处时会提示选中具体节点，让使用者决定改哪一处。'],
      ['让结构服务于阅读', '输入「切换成鱼骨图」，保留同一批节点与层级，重新计算排布。左右脑图便于看全局，大纲便于逐项核对，演示视图可逐个聚焦主要分支。自动整理能把图适配到当前画布。'],
      ['结果怎样带走', '可以导出 PNG、PDF、Markdown 或 XMind 文件。演示模式按内置规则运行，项目也提供单独配置模型的入口。截图展示的是离线演示中的操作。'],
    ],
    imageSize: [1440, 920],
    shots: [
      ['planmap-replace', '对话定位与原文替换', '左右脑图中的核心目标已改成品牌破圈，左侧显示修改指令与确认', '公开演示截图。「品牌破圈」出现在原节点位置，目标、受众、内容和传播四条分支仍可见。'],
      ['planmap-fishbone', '同一份策划切换为鱼骨图', '鱼骨布局呈现相同主题和分支，左侧保留切换结构的对话', '公开演示截图。切换结构后可自动整理，查看节点在新布局中的位置。'],
    ],
    links: [
      ['体验脑图工作区', `${hub}/planmap/app/`],
      ['观看操作视频', `${hub}/planmap/video/index.html`],
    ],
  }),
  'case-game-design-library': formatCase({
    sections: [
      ['从策划问题找入口', '以「同样的平均返还，为什么玩家感受差别很大？」为例。使用者可以在资料列表按分类、类型和语言筛选，也可以直接从「奖表与随机奖励」专题进入，沿术语、误区和练习定位资料。'],
      ['把阅读变成可检验的练习', '专题区分平均返还、命中频率和波动，再引导制作一张教学奖表。关联的「期望与平均」一课可继续看讲解、知识结构、练习和视频。不同材料围绕同一个策划判断展开。'],
      ['留下能继续使用的记录', '把课程收藏并标为「在读」，写下想验证的假设。例如给两套同均值的教学奖励分别记录空奖占比和连续低回报。学习记录保存在当前浏览器，可在「我的学习」回看，也能导出备份。'],
      ['保留资料出处', '知识库汇集游戏设计 50 课、公开文章和视频，各条目保留来源，自动收录的资料可查看核对状态。图中笔记为独立添加的演示样例。'],
    ],
    imageSize: [1440, 920],
    shots: [
      ['library-topic', '专题页把问题拆成可核对的概念', '游戏策划知识库的奖表与随机奖励专题，显示教学例子与分项解释', '公开知识库截图。专题用教学筹码案例说明平均返还、中奖频率和波动各自回答的问题。'],
      ['library-record', '课程资料与本地阅读记录', '期望与平均课程底部的关联视频、在读状态和示例笔记', '公开知识库截图。写入示例笔记并刷新页面后，仍能看到记录和「在读」状态。'],
    ],
    links: [
      ['打开知识库', library],
      ['查看奖表与随机奖励专题', `${library}?view=topics&topic=T04`],
      ['查看期望与平均课程', `${library}?view=topics&id=L16`],
    ],
  }),
  'case-gamespec': formatCase({
    sections: [
      ['输入与范围', '以内置的「首领二阶段压迫感增强」为例，载入一份模拟讨论和一份体验目标文档。目标是让阶段切换和大招蓄力容易识别，范围涉及红屏、地面预警、音效及低端机表现。'],
      ['原文决定与待确认问题', '分析后为已确认决定附上原文依据。前摇音用旧版本还是新版本、红屏是否排除战斗界面等问题保留为待确认项，由人核对口径和范围后再填写结论。'],
      ['把决定变成可验收任务', '按策划、客户端、特效、音频、动画、测试六种职能拆分，提供验收条件、产物、依赖和风险。客户端任务可据此检查阶段切换、暂停恢复与按钮可读性。'],
      ['定位改动与回归范围', '保存第一版并载入内置评审变更，再生成第二版。改动面板列出受影响任务和需要重验的用例，交付结果可导出为文档、数据备份和任务表。截图来自本地分析示例，展示流程和产物。'],
    ],
    imageSize: [1008, 664],
    shots: [
      ['gamespec-decisions', '有依据的决定与待确认问题', '开工台的决定面板展示二阶段阈值、红屏时长和前摇等条目，并列出待确认问题', '内置示例截图。决定卡保留来源片段，前摇音和界面排除规则留待确认。'],
      ['gamespec-delivery', '可按职能分派的交付任务', '开工任务看板展示六种职能及各自的验收内容', '内置示例截图。客户端验收覆盖阶段触发、暂停恢复和战斗按钮可读性。'],
      ['gamespec-revision', '评审变更后的回归用例', '版本影响面板列出六项修改和三个受影响测试', '内置示例截图。红屏、音效和状态规则调整后，面板列出需要重验的血量阈值触发、暂停恢复和界面可读性。'],
    ],
    links: [
      ['体验内置首领示例', `${hub}/gamespec-relay/app/`],
      ['观看操作视频', `${hub}/gamespec-relay/video/index.html`],
      ['查看核心逻辑', `${hubCode}/tree/${hubRevision}/projects/gamespec-relay/app/core`],
    ],
  }),
  'case-workbench': formatCase({
    sections: [
      ['在同一视野里判断先做什么', '并行任务各自有上下文和进度。将任务标题、状态、对话和输入框放在同一张卡片上，方便先扫视全局，再决定要打开哪一项继续处理。'],
      ['从等待任务继续操作', '从三个公开示例任务开始。「验证 macOS 构建」处于等待，补一条「请补充安装和首次启动的验收结果」，演示会把消息追加到该卡片，并显示「进行中」。'],
      ['状态与排序各自反馈', '刷新状态后，示例中的「发布 Windows 包」标为完成。拖动标题栏把仍需关注的任务换到左侧，底部提示会显示交换结果，卡片内的上下文与输入仍然保留。'],
      ['网页演示与桌面使用', '网页工作台用示例数据验证输入、状态和拖拽，不读取访问者的 Codex，也不会发送真实任务消息。桌面版面向本机 Codex 任务，由使用者判断优先级和下一条指令。'],
    ],
    imageSize: [1220, 669],
    shots: [
      ['workbench-board', '三个任务并排查看', '工作台初始并排显示 Windows 发布、演示网站和 macOS 构建三个示例任务', '公开网页演示截图。三个卡片分别处于进行中、已完成和等待中，均可直接在当前界面输入。'],
      ['workbench-changed', '追加消息、更新状态与交换位置', 'macOS 示例任务切到左侧且处于进行中，Windows 发布位于右侧且已完成', '公开网页演示截图。左侧保留演示输入，右侧反映刷新后的示例状态，底部确认位置已交换。'],
    ],
    links: [
      ['打开网页交互演示', `${hub}/codex-multi-thread-workbench/index.html#demo`],
      ['观看操作视频', `${hub}/codex-multi-thread-workbench/video/index.html`],
      ['查看网页交互代码', `${hubCode}/blob/main/projects/codex-multi-thread-workbench/app.js`],
    ],
  }),
  "case-lighthouse": "<div class=\"case-body\"><div class=\"case-grid\"><div><span class=\"field-label\">问题</span><p>在竖屏场景中，让观众快速理解上船、选路、修理和照明，并看到操作对短局救援的影响。</p></div><div><span class=\"field-label\">设计取舍</span><p>用本地模拟观众事件验证规则，保留免费行动的有效反馈。规则事件与直播接入边界分开处理。</p></div><div><span class=\"field-label\">AI 参与 / 可检查逻辑</span><p>公开资料记录了规则状态机、模拟事件与可恢复客户端的协作构建；消息转换与有界队列的代码可检查。</p></div><div><span class=\"field-label\">产物与边界</span><p>1.4.13 的 Windows / WebGL 仍为本地模拟。SDK 无关的消息转换、队列与主线程处理已接入控制器；官方 LiveOpenSDK、真实直播间与官方 ACK 未完成验证。</p></div></div><div class=\"evidence-links\"><span>查看证据</span><a href=\"https://wthpein010-dev.github.io/ai-application-hub/projects/lighthouse-rescue/index.html\">模拟试玩 ↗</a><a href=\"https://wthpein010-dev.github.io/ai-application-hub/projects/lighthouse-rescue/video/index.html\">玩法视频 ↗</a><a href=\"https://github.com/wthpein010-dev/ai-application-hub/blob/3ad59bf1f24dcd99dcbb660e4a9186a8353cdb06/docs/lighthouse-rescue-live-sdk-readiness.md\">接入与验证记录 ↗</a></div></div>"
};
