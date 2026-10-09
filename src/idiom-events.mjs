export const idiomEventAssets = [
  {file:'judgement-flow.png',width:981,height:665,sha256:'48800df69bf13a698f91002c2768121909f112366b31aa1f1dcc5f02f8822983',source:'《App每日断案玩法说明》原始流程图',alt:'每日断案历史流程图，连接入口、答题、错误续答、超时、完成领奖与不可用状态'},
  {file:'qixi-team-flow.png',width:935,height:780,sha256:'c022706086193761555d613484473abea0236f78ed623c5ad4d1ebd5412b850f',source:'《七夕活动策划案》组队阶段原始交互图',alt:'七夕组队活动历史交互图，展示邀请、匹配、共同答题、领奖、解除关系及组队排行'},
  {file:'qingming-entry.png',width:354,height:605,sha256:'9299e3db7f2a94bffb4c3163dde33fcafe64053524ef3952a97f4e319e92880b',source:'《清明节活动说明》原始入口界面参考',alt:'清明节活动历史入口界面，展示活动时间、限时完成目标、小红花反馈和开始按钮'},
  {file:'dragon-boat-flow.png',width:1753,height:1724,sha256:'f6c23698fbd139921615d086dfbddf5030de100cfe05c884c0d9e42da3b2affe',source:'《App龙舟赛玩法说明》原始操作流程图',alt:'App龙舟赛历史流程图，展示接龙答题、休赛、视频续玩、结算、累计排行和单次最佳排行'},
];

export const idiomEventCases = [
  {id:'idiom-judgement',title:'每日断案：常驻内容与错误恢复',file:'judgement-flow.png',value:'常驻玩法与状态设计',lead:'把易混淆字选择包装为公堂断案，用阶段晋升连接答题与成长反馈。',points:[
    '区分未解锁、非开放时段、次数耗尽和已完成，让入口状态与玩家进度一致。',
    '答错后暂停计时，展示成语信息；视频续答回到原题，超时与重开走不同路径。',
    '兼顾离线题库、重启后的进度恢复，并定义入口、完成与视频续答的验证事件。'
  ],output:'交付玩法规则、异常分支、UI 与音效需求；体现常驻内容如何从题材包装落到可实现的状态流程。',note:'正文与原图的倒计时不一致，图中计时视为历史方案，不认定最终版本。视频播放量提升是设计目标，不是已验证结果。'},
  {id:'idiom-qixi',title:'七夕活动：组队关系与共同目标',file:'qixi-team-flow.png',value:'社交活动与协作交互',lead:'将收集解锁、好友配对与共同答题串成节日活动路径。',points:[
    '预热收集与正式组队分阶段，配对后让关卡、结算和排行共同展示伙伴进度。',
    '处理未解锁、已有队友、重复点击邀请和活动结束后的分享链接，避免关系状态冲突。',
    '解绑需确认并清除共同进度与排行；已解锁资格保留，双方界面同步回到未组队状态。'
  ],output:'交付活动流程、邀请规则、共同目标、解绑反馈、界面与版本安排，支持策划、程序和 UI 对齐。',note:'文档记录的是历史活动安排与方案；组队传播和视频播放量均为目标，不由排期推定全部上线。'},
  {id:'idiom-qingming',title:'清明活动：限时内容与体验衔接',file:'qingming-entry.png',value:'活动调度与内容包装',lead:'复用每日挑战入口，用主题关卡、诗词展示和小红花形成节日反馈。',points:[
    '定义活动开启与结束时的入口切换，结束后恢复每日挑战，兼顾版本审核与定时开关。',
    '按未开始、进行中、已完成恢复到开始、原关卡或结算，明确跨日刷新和红点消失。',
    '小红花作为限时完成标记，不改变排行规则；诗词展示结束后再进入结算并播放完成音效。'
  ],output:'交付限时内容切换、状态恢复、主题资源与反馈时序；展示活动不只换皮，还要衔接原有入口和规则。',note:'含真人头像的排行原图未公开，选用无身份信息的入口参考；图中日期、奖励目标均是历史方案示例。'},
  {id:'idiom-dragon',title:'龙舟赛：接龙规则与周期竞争',file:'dragon-boat-flow.png',value:'规则完整性与平台适配',lead:'将成语接龙转为划行反馈，连接单局挑战、周累计成长与两类排行。',points:[
    '排除已用成语与首尾相同的候选，检查后续可接性；无法接续时尝试同音字，再判定结束。',
    '区分单次最佳与周累计成绩，定义休赛展示、周期重置、阶段领奖和渐进式入门题面。',
    '从小程序迁到 App 时调整视频续玩与提示，分别说明离开关卡、看视频和放弃时的计时行为。'
  ],output:'交付生成规则、引导关、周期状态与完整操作流程，体现玩法规则、UI/UE 和平台差异的联合设计。',note:'原图保留早期端午主题与旧版示例，不代表最终 App 界面；文档中的内部活跃基线及完整配置不公开。'},
];

export function renderIdiomEvents(e,base='../../') {
  const path=file=>`${base}assets/project-design/idiom-scholar/${file}`;
  const image=a=>`<img src="${path(a.file)}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}">`;
  return `<section class="idiom-chapter" id="idiom-events" aria-labelledby="idiom-events-title"><p class="eyebrow">LIVE CONTENT / 玩法与活动</p><h2 id="idiom-events-title">常驻玩法与节日活动</h2><p class="idiom-chapter-lead">从成语核心玩法延伸内容、社交与周期目标，重点看规则和交互如何完整交付。</p><p class="idiom-boundary">本人项目唯一策划身份已确认。这四份资料未发现正文明确署名，不据修改用户名认定每份文档独立作者；历史方案不等同于最终上线版本，目标不作为已达成业绩。界面美术属于团队产出。</p><section class="matchmaking-design" id="idiom-activity-cases" aria-label="成语玩法与活动案例">${idiomEventCases.map(c=>{
    const a=idiomEventAssets.find(a=>a.file===c.file);
    return `<article class="matchmaking-map" id="${c.id}" aria-labelledby="${c.id}-title"><p class="eyebrow">${e(c.value)}</p><h3 id="${c.id}-title">${e(c.title)}</h3><figure><a href="${path(a.file)}" aria-label="查看${e(c.title)}原图">${image(a)}</a><figcaption>${e(a.source)} · 历史方案参考</figcaption></figure><div class="matchmaking-map-notes"><div><h4>设计工作</h4><p>${e(c.lead)}</p><h4>文档产出</h4><p>${e(c.output)}</p></div><div><h4>关键取舍</h4><ul>${c.points.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div></div><p class="matchmaking-boundary">${e(c.note)}</p><a class="design-original" href="${path(a.file)}">查看原图（可缩放） ↗</a><details class="matchmaking-inspect"><summary>在页面内阅读${e(c.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(c.title)}大图阅读区域">${image(a)}</div></details></article>`;
  }).join('')}</section></section>`;
}
