export const gooseAssets=[
  {file:'system-map.png',width:1131,height:734,sha256:'953aadfa59428e82b7a8cb86d8d0f1f5d9f0a1e90022a98ba2bc94af34c9686e',source:'《超级铲屎官》立项策划案 5.2 系统结构图',alt:'主界面连接成长、资源收取、好友、图鉴、成就和商店的系统结构图'},
  {file:'economy-cycle.png',width:1179,height:717,sha256:'1f5d120ce0d19ba11b5cbe35b9aaf3a5b8ea2652cc10a7a072335e7905e2d805',source:'《超级铲屎官》立项策划案 5.3 经济系统循环图',alt:'资源生产、培养升级、社交收取与容量扩展之间的经济循环图'},
  {file:'social-flow-reviewed.webp',width:960,height:912,sha256:'41ea22f6035b8fa264c968676daa7b8a7cc3b59c3dcad28b4f54cae75617b008',source:'《超级铲屎官》立项策划案 6.3 社交玩法系统设计流程图',alt:'好友邀请、派遣选择、等待产出、收取与小游戏成功失败的操作流程',review:'遮盖示例姓名与数值，末端结果改用文字标注'},
  {file:'home-proposal-reviewed.webp',width:359,height:579,sha256:'dd539fae857c1b28858858dc586aa43642d5dd852b988c27aad12db8e959f582',source:'《超级铲屎官》立项策划案 6.1 主界面设计',alt:'历史主界面方案的经营场地、金桶、下方常用入口与侧边功能菜单',review:'裁去顶部示例资料栏，遮盖场景中的示例姓名'},
];
export const gooseUiViews=[
  {
    file:'historical-main-ui.webp',
    width:1080,
    height:1920,
    alt:'狗场界面中有待扩展地块、在场的狗、收取金桶和底部操作入口',
    title:'狗场主界面',
    caption:'场地、金桶和底部操作集中在同一画面，先收取，再培养或扩地。',
    source:'test/MainUI2.png',
    sha256:'b5043ec15c314234e06efc073cf964ffc559a18940a8e0f10ce7b48e6f726cfb',
  },
  {
    file:'historical-dog-info.webp',
    width:1080,
    height:1920,
    alt:'选中狗后弹出的属性面板，含等级、卖出、放入仓库和升级按钮',
    title:'狗狗信息面板',
    caption:'点选场景中的狗，可查看等级，并进行升级、卖出或移入仓库。',
    source:'test/MainUI_dogInfo.png',
    sha256:'998580f8abc42543f5a098405a4db7f7c433a32de970a38b162bf7bec4578a67',
  },
  {
    file:'historical-kennel.webp',
    width:1080,
    height:1920,
    alt:'狗舍和场景分页，派遣中的狗显示召回和拜访，库内的狗显示卖出和放入场地',
    title:'狗舍与派遣状态',
    caption:'派遣中的狗可召回或拜访，库内的狗可放入场地。',
    source:'test/MainUI_inventory.png',
    sha256:'a825d0ba62cf93ffdb76ffc046fa761519e71e071ea59363cd612f7e62079a78',
  },
  {
    file:'historical-handbook.webp',
    width:1080,
    height:1920,
    alt:'狗狗图鉴的套组进度、徽章、角色卡片和灰色领取按钮',
    title:'图鉴与套组进度',
    caption:'同组狗狗集中陈列，收集进度和奖励领取状态并排显示。',
    source:'test/MainUI_handbook.png',
    sha256:'e45a8fb72c0458a901031ab8a7895bb2c4ca67574cdbe33af1aa8a32152c4139',
  },
];
export const gooseCases=[
  {
    id:'goose-systems',
    title:'从经营目标拆解系统结构',
    file:'system-map.png',
    question:'怎样把放置产出、养成和收集串进同一个经营场景？',
    output:'立项案第 5.2 节梳理系统关系。《图鉴功能策划案》补充了单只点亮与套组进度的反馈规则。',
    points:[
      '以主场景连接资源收取、培养、社交和收集。图鉴与成就为养成提供阶段目标。',
      '单只狗满级时提示点亮图鉴。玩家可点击领取单只奖励，点亮后同步更新套组进度。',
      '集齐整套后播放完成动画并开放领取。领完后以完成标记替换奖励显示。',
    ],
  },
  {
    id:'goose-economy',
    title:'把产出与成长投入连接成循环',
    file:'economy-cycle.png',
    question:'怎样让放置收益有持续的投入方向，并让容量与培养形成不同的成长目标？',
    output:'立项案第 5.3 节画出生产、收取、培养、购入与升级的循环。《主界面功能策划案》补充了金桶与地块的操作规则。',
    points:[
      '金币先累积在金桶。金桶显示已存比例，装满时播放动画，点击后将金币转入资源栏。',
      '玩家按顺序扩展地块，只有已解锁的格子可以放狗。扩展提供更多在场位置，培养影响产出属性。',
      '社交收取补充资源来源。购入和升级为收益设置新的投入方向。',
    ],
  },
  {
    id:'goose-social',
    title:'将社交规则落到操作与反馈',
    file:'social-flow-reviewed.webp',
    question:'邀请与派遣涉及多名玩家，如何说明可操作条件、等待状态和结果反馈？',
    output:'立项案第 6.3 节画出邀请、选狗、派遣、等待和收取。《好友功能策划案》补充申请状态，《主界面功能策划案》补充从好友场景返回的规则。',
    points:[
      '好友申请发出后，添加按钮置灰。对方同意后建立游戏好友关系，忽略后移除申请并更新角标。',
      '区分主动拜访与接受派遣邀请。已占用的位置不能再派遣，进度提示何时可收取，并设有撤回、结束与消息反馈。',
      '从好友列表或排行榜拜访，返回原列表或原分页。从派遣邀请进入，返回自己的主界面。',
      '资源收取和小游戏分开判断，按成功或失败给出不同结果。',
    ],
  },
  {
    id:'goose-interface',
    title:'让高频入口服务核心体验',
    file:'home-proposal-reviewed.webp',
    question:'如何缩短日常操作路径，同时让升级和收集功能易于找到？',
    output:'立项更新说明记录了常用入口下移及金桶、加速按钮的调整。《主界面功能策划案》《背包功能策划案》和《成就功能策划案》进一步细化入口和状态。',
    points:[
      '底部安排狗舍、商店、加速、好友和菜单。单独的场景升级状态隐藏狗狗及其状态，集中展示地块和设施升级。',
      '独立背包方案用格子存放狗并提供属性查看。产出属性随等级变化，满级后隐藏升级按钮。',
      '成就区分未完成、可领取与已领取。可领取项置顶，领取后重新排序。角标提示待领取奖励。',
    ],
  },
];
export function renderGooseDesign(e,base='../../'){
  const image=(a)=>`<img src="${base}assets/project-design/versatile-dog/${a.file}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}">`;
  return `<section class="matchmaking-design" id="goose-design" aria-labelledby="goose-design-title"><header><p class="eyebrow">SYSTEM DESIGN / ECONOMY / UI·UE</p><h2 id="goose-design-title">养成经营：系统、循环与交互</h2><p class="matchmaking-intro">从系统关系到资源循环，再到界面状态与操作流程，展示策划方案如何落到可讨论的交付内容。</p></header><p class="matchmaking-boundary">按用户最新确认，Goose 资料对应《百变汪星人》，不再归入《谁是火车王》。立项原文标题为《超级铲屎官》，正文称其基于《疯狂鹅场》后续开发；保留历史名称，不把方案标题直接认作最终上线名称。立项案页眉署名“策划：吴天昊”；封面另有笔名，未据此推定身份。图中美术由团队承担，历史方案不代表全部已上线。</p><nav class="idiom-jumps" aria-label="养成设计资料">${gooseCases.map(c=>`<a href="#${c.id}">${e(c.title)} ↓</a>`).join('')}<a href="${base}projects/versatile-dog/design-summary/">设计摘要 ↗</a></nav>${gooseCases.map(c=>{const a=gooseAssets.find(a=>a.file===c.file),url=`${base}assets/project-design/versatile-dog/${a.file}`,view=a.review?'公开版':'原图';return `<article class="matchmaking-map" id="${c.id}" aria-labelledby="${c.id}-title"><h3 id="${c.id}-title">${e(c.title)}</h3><figure><a href="${url}" aria-label="查看${e(c.title)}${view}">${image(a)}</a><figcaption>${e(a.source)} · ${a.review?`公开版 · ${e(a.review)}`:'文档提取原图'} · 历史需求</figcaption></figure><div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(c.question)}</p><h4>文档产出与来源</h4><p>${e(c.output)}</p></div><div><h4>关键方案与工作价值</h4><ul>${c.points.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div></div><a class="design-original" href="${url}">查看${view}（可缩放） ↗</a><details class="matchmaking-inspect"><summary>在页面内阅读${e(c.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(c.title)}大图阅读区域">${image(a)}</div></details></article>`;}).join('')}<p class="design-source">《超级铲屎官》立项策划案_20180629.doc 的封面日期为 2018/6/14，文件名记录 20180629 版本。另核对主界面、背包、好友、成就和图鉴功能文档。立项案写在场／库存分页，独立背包案写狗窝按格存放，历史美术稿显示狗舍／场景分页。各图文分别呈现对应版本的设计。</p></section>`;
}
