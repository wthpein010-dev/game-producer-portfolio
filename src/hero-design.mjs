export const heroAssets=[
  {file:'challenge-map.jpeg',width:2560,height:2560,sha256:'d7349c6433a76c4a53fb959202ab4131ee0e8f810a294a11106dbf069e8a373e',source:'《【活动】限时挑战》三、思维导图',alt:'限时挑战原始导图：固定新手任务链、轮替任务池与采集、家园、战斗、探索等任务分类'},
  {file:'challenge-flow.jpeg',width:2560,height:2328,sha256:'14e0089290e74a8b909debc33bba07ab280d235facb68e5256eaa5e8f74d4af0',source:'《【活动】限时挑战》四、系统流程',alt:'限时挑战流程：活动开启后判断新手链完成状态，进入轮替任务池、抽取任务、完成领奖并配置下一期'},
  {file:'season-cycle.jpeg',width:2560,height:1496,sha256:'da46582a04ca2c5c09a2a2c9ccd4a4587c342e437ec560010e8eaf23744d707b',source:'《【活动】特殊节日设计 (1)》四、活动循环结构',alt:'特殊节日活动循环图：采集产出、生产制造、战斗消耗与建造恢复构成四类活动的循环'},
  {file:'guild-flow.jpeg',width:2560,height:2560,sha256:'bc259b24d728a1ab7fc42f20ea4b0ece63262fdb68a76ed10f00a25a67af34e9',source:'《【优化】公会装备架优化 (1)》四、系统流程，其他成员署名文档',alt:'公会装备架存入和领取流程：检查等级、权限、哨站、加入条件、领取次数以及装备是否被他人领取'},
  {file:'generator-proposal.png',width:1265,height:587,sha256:'15220733afed699e3fb67d9c02b54f85bc178eee92715420bbbe3abb6976ecf0',source:'《【优化】家园发电机》三、UI界面调整，新版效果图，界面作者待核对',alt:'家园发电机新版需求效果图：隐藏无关HUD，展示燃油与储电信息、容器选择和红色启动及液体操作按钮'},
];

export const heroCases=[
  {id:'hero-red-dots',basis:'authored',label:'本人创建与修订记录',title:'红点规范：提示何时亮、何时清',files:[],question:'玩家点进来之后，怎样知道还有哪条消息没看、哪份奖励没领？',output:'《红点规范》更新表记录吴天昊于 2025 年 12 月创建并补充细节和案例。',points:['用小点表示变化，数字角标表示待处理数量。主入口沿页签和条目逐层汇总，玩家可以找到提示对应的内容。','未读在有效查看后清除，可领取需要等待领取成功，可操作则在操作完成或条件失效时清除。','重连时可暂时保留上次已知状态，拉取成功后刷新；拉取失败时保留提示，避免奖励仍待领取却从入口消失。']},
  {id:'hero-map-ue',basis:'authored',label:'本人创建记录',title:'大地图 UE：标记、导航与队友分享',files:[],question:'玩家拖地图、想标一个点或想开始导航时，如何避免三种操作互相误触？',output:'《大地图界面交互及显示优化》记录吴天昊于 2025 年 10 月创建。另有 UE 规范版本记录列明共同发起及移动端、PC 规范工作项。',points:['将放置标记与确认导航拆成两条操作路径。导航确认后进入罗盘追踪，重复点选可查看标记详情。','PC 端用悬停查坐标，触屏端用按住触发。坐标和地点名可进入聊天输入框，便于队友沟通和协作。','二级与三级地图共用信息弹窗结构，长信息可滚动，点空白关闭。对扩展交互保留优先级。']},
  {id:'hero-ranking',basis:'authored',label:'本人创建记录',title:'活动排行榜：上榜前也要看得见自己的进度',files:[],question:'限时竞争如何让玩家在冲榜途中知道自己的成绩，以及下一步能争取什么？',output:'《排行榜》更新表记录吴天昊于 2026 年 4 月创建。文档描述活动中心、榜单与奖励结构。',points:['采集、狩猎等行为累积活动成绩，榜单更新让玩家看到竞争变化。个人成绩固定可见，区分上榜与未上榜状态。','把周期奖励与活动结束后的结算奖励分开，界面同时表达剩余时间、成绩和奖励条件。','活动中心用左侧页签、右侧内容承接多类活动。新增活动时优先扩展滚动或折叠，保持按钮好找、文字可读。']},
  {id:'hero-numbers',basis:'authored',label:'本人创建与修订记录',title:'把局部显示问题整理为通用数值规范',files:[],question:'公会升级、仓库与背包格子混用完整数字和缩写，怎样避免量级误读，又让多语言布局稳定？',output:'《游戏内系统数值显示统一规范文档》更新表记录吴天昊创建与修订（2025.12）。产出包括问题分类、中英文显示规则、按界面空间区分的通用模板及 QA 检查点。',points:['按语言分别约定英文 K / M / B 与中文“万”的表达，补充小数和末尾零的处理。','全屏或弹窗有足够空间时展示精确数字；紧凑物品格采用缩写，避免数字长度挤压布局。','将同一界面内的容量、持有量和消耗量放在一致的语义规则下检查，覆盖资源判断与容量辨识。','价值在于把单个界面问题转为可复用、可交接的系统级规则；尚无最终上线或误读减少幅度的验证。']},
  {id:'hero-challenge',basis:'authored',label:'本人创建与修订记录',title:'以新手链与轮替池组织持续挑战',files:['challenge-map.jpeg','challenge-flow.jpeg'],question:'如何让第一次参与容易理解，同时让重复参与仍有变化，而不重新制作一套核心玩法？',output:'《限时挑战》记录吴天昊于 2026 年 3 月创建，4 月补充 UE 效果图和逻辑说明。',points:['采用固定新手任务链建立活动认知，再进入轮替任务池；前置完成后，高阶任务才进入可抽范围。','按服务端行为事件匹配任务、更新计数，并区分进行中、完成未领取与已领取状态。','区分首次发现、新任务与可领奖提醒，定义入口、页签、条目的红点及清除规则。','补充活动关闭、断线重连、下期配置生效与重启恢复，并列出曝光、参与、完成和领奖的分析需求；这些是设计要求而非实测结果。']},
  {id:'hero-season',basis:'authored',label:'本人创建与修订记录',title:'用世界规则变化串联资源循环',files:['season-cycle.jpeg'],question:'怎样让采集、制造、战斗与建造轮流成为短期目标，而不是仅增加一层额外奖励？',output:'《区域增幅》记录吴天昊于 2026 年 3 月创建并补充活动循环，4 月收敛活动入口并补充 UE 参考。图为早期循环稿，后续增幅显示需求由团队继续补充。',points:['以限定时间和区域的规则变化引导行为，区分采集产出、制造、战斗消耗与建造恢复。','通过活动入口、地图热点和广播连接发现、理解规则、前往区域的体验路径。','后续修订取消预热与结束展示状态，收敛其他入口，以活动入口按钮进入；活动期间在地图里提供区域提示。','建立曝光到参与的分析路径；区域活跃、资源流动和参与提升在原文中是目标，不作为已达成业绩。']},
  {id:'hero-guild',basis:'team-context',label:'团队项目背景 · 不认定本人独立作者',title:'公会资源流转中的权限与异常分支',files:['guild-flow.jpeg'],question:'多人共享物资时，怎样处理使用权限、物品被他人领取和资源流转中的数据一致性？',output:'《公会装备架优化 (1)》和《公会悬赏系统》更新表均署名其他成员。本人已确认公会系统调优职责，但不能从岗位范围推定这些文档全部由本人设计；本组作为项目需求背景。',points:['装备架区分激活、调度与提取权限；领取流程处理未解锁、未授权、加入条件和次数不足。','物品已被其他成员领取时给出刷新提示，避免仍按旧界面状态执行。','征集方案涉及兑换选择、库存不足、物品状态保留、发布失败与过期通知，体现跨系统交互的边界问题。','保留历史原始流程图；图上的示例条件不是当前配置，也不是本人独立成果或最终上线证明。']},
  {id:'hero-generator',basis:'team-context',label:'本人补充问题记录 · 团队界面资源',title:'从 HUD 遮挡到可操作状态的界面调整',files:['generator-proposal.png'],question:'进入家园发电界面后，如何突出当前任务，并避免可点击按钮看起来不可用？',output:'《家园发电机》更新表记录吴天昊调整文档格式并补充问题及待建单记录。图为团队新版需求效果图，按图讨论 HUD 和按钮状态。',points:['进入操作界面时隐藏无关 HUD，处理任务按钮与图标重叠，聚焦发电机操作。','将启动、取出和倒入按钮的可操作常态与置灰不可用态区分，沿用同类界面的状态表达。','用燃油、储电、容器选择及操作说明连接资源判断和行动反馈。','图为历史需求效果，不是改造后验收截图；美术和程序实现归团队相应岗位。']},
  {id:'hero-feedback',basis:'team-context',label:'其他成员署名方案 · 项目背景',title:'批量操作与跨区域通知的反馈设计',files:[],question:'耗时操作能否离开面板继续执行？进入副本后，通知与跳转应该如何保持有效？',output:'《分解机优化》《消息聚合功能优化》的创建记录署名其他成员。本组提取规则和交互问题作为项目背景，排除含调试信息的截图、配置字段和未确认实施结论。',points:['分解方案筛选可操作道具，减少数量确认步骤，并定义一键放入的满格、无道具和待领取状态提示。','将面板关闭与分解执行区分，完成后通过通知反馈；同图标物品区分方案仍标注为待讨论。','消息聚合在副本或跨区域情况下讨论限制查看、屏蔽跳转与延后推送等备选路径，不能混写为一套已实施规则。','这些资料展示边界条件与状态反馈问题；具体采用哪种方案、本人参与环节及最终效果尚未逐项确认。']},
];

function figure(file,e,base){
  const a=heroAssets.find(item=>item.file===file),url=`${base}assets/project-design/crisis-dawn/${file}`;
  const img=`<img src="${url}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}">`;
  return `<figure><a href="${url}" aria-label="查看${e(a.alt)}原图">${img}</a><figcaption>${e(a.source)} · 原始历史资料</figcaption></figure><a class="design-original" href="${url}">查看原图（可缩放） ↗</a><details class="matchmaking-inspect"><summary>在页面内阅读大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(a.alt)}大图阅读区域">${img}</div></details>`;
}

export function renderHeroDesign(e,base='../../'){
  return `<section class="matchmaking-design" id="hero-design" aria-labelledby="hero-design-title"><header><p class="eyebrow">SYSTEM RULES / UI·UE / DELIVERY</p><h2 id="hero-design-title">危机曙光：规则、交互与交付</h2><p class="matchmaking-intro">从有署名记录的活动、红点与数值规范，以及大地图交互方案，看清触发、界面反馈和异常恢复如何衔接。</p></header><p class="matchmaking-boundary">个人贡献以正文更新表和已确认职责为依据。历史方案不代表全部已上线，团队方案单独标注。</p><nav class="idiom-jumps" aria-label="危机曙光设计资料">${heroCases.map(c=>`<a href="#${c.id}">${e(c.title)} ↓</a>`).join('')}<a href="#hero-delivery">交付结构参考 ↓</a></nav>${heroCases.map(c=>`<article class="matchmaking-map" id="${c.id}" data-evidence-basis="${c.basis}" aria-labelledby="${c.id}-title"><p class="eyebrow">${e(c.label)}</p><h3 id="${c.id}-title">${e(c.title)}</h3><div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(c.question)}</p><h4>产出与贡献依据</h4><p>${e(c.output)}</p></div><div><h4>关键方案与工作价值</h4><ul>${c.points.map(point=>`<li>${e(point)}</li>`).join('')}</ul></div></div>${c.files.map(file=>figure(file,e,base)).join('')}</article>`).join('')}<section class="hero-delivery" id="hero-delivery" aria-labelledby="hero-delivery-title"><h3 id="hero-delivery-title">交付结构：规则之外还需要说明什么</h3><p>三个《文档规范模版（流程1）》版本保留了占位署名，不能认定为本人创建的规范。这里仅摘录其团队交付结构，作为理解上述方案的参考。</p><ul><li>从设计目的、模块关系与系统流程，进入具体界面、条件和异常分支。</li><li>将配置、红点、行为记录、跨系统依赖、跨区域与 PC 交互差异一起纳入说明。</li><li>补充服务器重启后的恢复、暂停或清理规则，最后关联美术音效需求与文档版本。</li></ul><p class="design-source">筛选说明：活动榜单按当前可核对的界面与结算设计摘录。排除第三方游戏临时参考、带身份水印或调试信息的截图、完整内部原件和敏感经济配置。</p></section></section>`;
}
const crisisPublicShots = [
  { file: 'home-showcase/crisis.webp', width: 960, height: 540, label: '建造预览', alt: '角色在木质基地外预览待放置的建筑件，画面中显示红色轮廓' },
  { file: 'crisis-dawn/public-gathering.webp', width: 1280, height: 720, label: '野外采集', alt: '角色手持镐，在野外敲击岩石' },
  { file: 'crisis-dawn/public-off-road.webp', width: 1280, height: 720, label: '车辆探索', alt: '红色越野车驶过开阔草地' },
  { file: 'crisis-dawn/public-fortified-base.webp', width: 1280, height: 720, label: '基地外观', alt: '户外多层木质基地和一旁的风车' },
  { file: 'crisis-dawn/public-homestead.webp', width: 1280, height: 720, label: '家园与农田', alt: '围栏内的房屋、风车和种植区域' },
  { file: 'crisis-dawn/public-indoor-facility.webp', width: 1280, height: 720, label: '室内场景', alt: '通道、围栏和集装箱组成的设施内部' },
];

export function renderCrisisGallery(e) {
  return `<section class="taptap-gallery crisis-gallery" id="crisis-gallery" aria-labelledby="crisis-gallery-title">
    <header><h2 id="crisis-gallery-title">游戏截图</h2><p>画面来自 <a href="https://store.steampowered.com/app/2512880/">Steam 官方商店</a>，展示《危机曙光》（CrisisX）的建造、采集和探索场景。</p></header>
    <div class="taptap-shot-grid">${crisisPublicShots.map(({file,width,height,label,alt})=>{
      const src = '../../assets/project-design/'+file;
      return `<figure><a class="taptap-image-link" href="${src}" aria-label="放大${e(label)}截图"><img src="${src}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="${e(alt)}"></a><figcaption><strong>${e(label)}</strong></figcaption></figure>`;
    }).join('')}</div>
  </section>`;
}
