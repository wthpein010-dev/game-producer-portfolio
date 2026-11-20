export const trainUiViews=[
  {file:'ui-main.webp',width:640,height:1332,title:'主界面与车站',alt:'火车槽位、双环轨道、车站与商店的主界面效果稿',caption:'空槽与同级车辆相邻，便于拖拽合成。车站和轨道分别提示上轨操作和工作状态。',source:'主界面效果图.png',sha256:'fb74314af26c6e34268415a76fd3808eb89b700c7bfffeb3a3f754c9a6ed66a3'},
  {file:'ui-onboarding.webp',width:640,height:1332,title:'新手操作引导',alt:'老列车长的购买教学对话与空闲火车槽位',caption:'用列车长的对话给出当前任务，再让玩家在场景里完成购买、合并或上轨。',source:'新手引导.png',sha256:'acb51e2ea7894ef6877a1c169479ad3c05d90e8dba15896320db1cf89b69409b'},
  {file:'ui-map.webp',width:640,height:1138,title:'地点推进地图',alt:'显示地标、虚线线路和地点锁定状态的地图界面',caption:'地标与虚线标出经营路线，地点用亮点和锁形区分可进入与待解锁状态。',source:'map.png',sha256:'38c2f1a57713d44b9dcb312e1bd736ccf3090cd718a3fe069734c7a357dbb068'},
  {file:'ui-puzzle.webp',width:640,height:1385,title:'铁轨拼图棋盘',alt:'由弯轨和直轨构成的拼图棋盘及下方零件、宝箱和求助入口',caption:'棋盘上方接轨，下方管理弯轨和直轨。宝箱和求助入口放在手边，方便补齐所需零件。',source:'活动UI.png',sha256:'04e80c75174d56423bd3ce2aeb3e7a0b0f49f46fc811cfc1e21f0330b904bc3c'},
];

export const trainCases=[
  {id:'train-core',title:'合成经营：规则与界面一起交付',asset:'core',question:'怎样将合成、工作收益和商店购买组织成可操作的成长循环？',points:['同级车辆合并，异级车辆交换。拖到车站可上轨工作，轨道占满时车辆退回原槽并提示原因。','工作中的车辆显示为阴影，限制直接拖动。若拖来同级闲置车与它合并，合并后的车辆回到空槽。','空槽是购买与下架共用的容量。槽位满时关闭购买操作，让商店状态随主场景同步。'],output:'核心 UE 图将槽位、轨道、车站和商店标在同一场景，规则明确每次跨区拖拽会改变什么状态。',source:'《核心功能文档》。后续《新项目策划文档》增加材料阶段并调整购买入口。'},
  {id:'train-track',title:'轨道控制：把玩法拆成状态与路径',asset:'track',question:'交叉轨道和多个方向开关怎样形成程序可实现、测试可验证的规则？',points:['将外环与上下内环的运动路径分别定义，并列出方向开关切换与中央节点的联动。','反向箭头置灰、可用方向点亮，玩家能在列车到来前看出可调的岔口。','首个轨道礼盒放在中央。玩家错过提示的岔口时，根据列车进入的下一段路线重新提示可操作开关。'],output:'轨道节点图覆盖相邻开关联动，新手任务分镜补充了错过开关、提前切换和已拾取礼盒的情况。正文与列表的路线分类数存在差异。',source:'《核心功能文档》中的火车跑圈逻辑与《新手任务设计》。'},
  {id:'train-onboarding',title:'新手引导：随学习阶段开放功能',asset:'unlock',question:'怎样安排合成、收益和路线控制的学习顺序？',points:['早期引导从拆盒开始，依次引入购买、合并和上轨。上轨后，玩家能看到车辆开始工作，理解合成怎样转化为收益。','改版先让玩家合并材料，再逐步解锁火车和轨道开关。在教学用到某个按钮时才放出来，操作完成后再进入下一步。','引导结束后用新手任务承接，让玩家在日常经营中重复刚学到的操作。'],output:'《新手引导》分镜标注了对话、按钮指向和拖拽教学。《新项目策划文档》补充材料阶段的开放条件和教学完成判定。解锁图为较早的界面参考。',source:'《新手引导》《新手任务设计》《新项目策划文档》与核心功能文档。'},
  {id:'train-location',title:'地点推进与中断恢复',asset:'location',question:'解锁、动画、地点切换与离线收益怎样衔接，退出后又应从哪里恢复？',points:['将解锁提示、地图解锁、火车移动与进入新地点串联；分别定义提示中断和动画中断后的恢复位置。','区分未解锁与未开放地点，规定默认页、返回原地点及动画期间的输入限制；不同地点独立计算资源。'],output:'用流程图与状态说明覆盖正常路径和退出恢复，降低前后端、UI 与测试对跳转结果的理解偏差。',source:'地点相关功能系统文档。后续新项目文档暂锁部分国家，不据旧图宣称所有地点开放。'},
  {id:'train-puzzle',title:'铁轨拼图活动：从拾取零件到接通线路',asset:'puzzle',question:'怎样把主场景收集到的铁轨接进一条能通车的路线？',points:['把列车沿途拾到的礼物盒接入零件收集，弯轨与直轨分开管理。缺少某种铁轨时，可以从该零件进入指定求助。','零件进入正确位置时显示可放置轮廓。松手放对才消耗库存，放错会飞回零件栏。','关卡用不同地形和障碍改变拼接顺序。完成通路后宝箱可领取，领奖再进入下一关。'],output:'方案覆盖棋盘、库存反馈、关卡配置和求助入口。文档中对关卡总量的描述存在差异，留存与分享是设计目标。',source:'《（活动）铁轨拼图玩法说明》。'},
  {id:'train-tasks',title:'常驻任务与分享奖励的状态衔接',question:'地点成长和多种触发入口变化时，如何保持任务进度与奖励操作连贯？',points:['每日任务随最高解锁地点迁移，保留未完成、进行中和待领奖状态；区分不可领取、可领取与已领取按钮。','免费升级分享区分购买、合并和箱子来源，规定触发限制、动画顺序与取消后返回商店，避免打断原操作后无处返回。'],output:'将跨地点进度、领奖与分享触发写成可讨论的状态规则；历史分享方案不作为当前平台合规建议或实际增长证明。',source:'每日任务系统文档、（分享4）免费升级火车功能文档说明。'},
];

export const trainAssets=[
  {key:'core',file:'core-ue.png',width:579,height:464,alt:'核心界面 UE 图，标记火车槽位、轨道、上轨区、资产、地图、商店、删除和排行'},
  {key:'track',file:'track-control.png',width:1165,height:832,alt:'双环轨道与五个控制开关的节点示意图'},
  {key:'unlock',file:'unlock-reference.png',width:469,height:834,alt:'历史解锁新火车界面参考，展示新火车、槽位及等级奖励'},
  {key:'location',file:'location-flow.png',width:396,height:547,alt:'新地点解锁、提示、地图动画与退出恢复位置的流程图'},
  {key:'puzzle',file:'puzzle-system.png',width:903,height:665,alt:'铁轨拼图收集系统结构，连接获取、操作、关卡、奖励和帮助模块'},
];

export function renderTrainDesign(e,base='../../'){
  const image=a=>`<img src="${base}assets/project-design/train-king/${a.file}" width="${a.width}" height="${a.height}" loading="lazy" alt="${e(a.alt)}">`;
  return `<section class="matchmaking-design" id="train-design" aria-labelledby="train-design-title"><header><p class="eyebrow">GAMEPLAY / SYSTEM / UI·UE</p><h2 id="train-design-title">合成经营、交互与活动设计</h2><p class="matchmaking-intro">从玩法规则到界面状态、阶段引导和活动交付，阅读主策划岗位的具体工作依据。</p></header><p class="matchmaking-boundary">本页按用户最新确认采用 Train 项目资料，已撤下此前误关联的 Goose 养成方案。个人岗位沿用已确认履历；选中文档未发现明确个人署名，不据目录归属认定独立作者，团队美术与程序不归为个人执行。</p><nav class="idiom-jumps" aria-label="火车项目设计案例">${trainCases.map(c=>`<a href="#${c.id}">${e(c.title)} ↓</a>`).join('')}<a href="${base}projects/train-king/design-summary/">设计摘要 ↗</a></nav>${trainCases.map(c=>{const a=trainAssets.find(a=>a.key===c.asset),url=a?`${base}assets/project-design/train-king/${a.file}`:'';return `<article class="matchmaking-map" id="${c.id}" aria-labelledby="${c.id}-title"><h3 id="${c.id}-title">${e(c.title)}</h3>${a?`<figure><a href="${url}" aria-label="查看${e(c.title)}原图">${image(a)}</a><figcaption>项目文档原图 · 历史设计参考 · 非上线证明</figcaption></figure><a class="design-original" href="${url}">查看原图（可缩放） ↗</a><details class="matchmaking-inspect"><summary>展开原尺寸图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(c.title)}大图">${image(a)}</div></details>`:''}<div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(c.question)}</p><h4>产出与工作价值</h4><p>${e(c.output)}</p></div><div><h4>关键方案</h4><ul>${c.points.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div></div><p class="record-source">来源：${e(c.source)}</p></article>`;}).join('')}<p class="design-source">来源范围：用户指定 Train 目录的六份功能文档。完整原件、经济与概率配置、统计、程序工程及含真人头像和第三方竞品参考图片未公开；设计目标与文档方案不直接认定为上线成果。</p></section>`;
}
