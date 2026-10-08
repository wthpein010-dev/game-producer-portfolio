export const hubBase = 'https://wthpein010-dev.github.io/ai-application-hub/';
export const sourceSha = '3ad59bf1f24dcd99dcbb660e4a9186a8353cdb06';
export const profile = {
  name: '吴天昊', role: '游戏制作人',
  description: '游戏制作人 / 项目负责人，兼具主策划与系统策划经验。连接玩法设计、跨职能协作与研发交付，以职业项目、独立游戏和 AI 实践呈现工作价值。',
  experience: '9 年以上', projectExperience: '10 款以上',
  education: '北京联合大学 · 计算机科学与技术 · 本科 · 2015.09—2017.07'
};
export const jobs = [
  {slug:'jianyou', employer:'北京简游科技有限公司', role:'游戏制作人', period:'2026.07.27—至今', start:'2026-07-27', layout:'producer', teamSize:6,
    projects:[{slug:'sheep-match',title:'羊了个羊：对对碰',description:'负责整体方向、玩法与系统、团队排期和数据迭代，把设计决策与研发推进放在同一条工作线上。'}],
    scope:['整体方向','玩法与系统','团队与排期','数据迭代'],
    lead:'在共 6 人的项目团队中，统筹游戏方向、玩法系统、团队排期与数据迭代，承担设计与研发推进的衔接职责。',
    note:'项目团队共 6 人，不等同于 6 名直接下属。职责不包含美术表现、发行运营。'},
  {slug:'hero-games', employer:'英雄游戏科技股份有限公司', role:'高级系统策划', period:'2025.07—2026.07.23', start:'2025-07', end:'2026-07-23', layout:'workbench',
    projects:[{slug:'crisis-dawn',title:'危机曙光',description:'承担 SOC 项目 PC 移植中的 UI/UE、HUD 与操作逻辑调整，创建和修订跨界面数值显示规范，并推进家园、公会调优与跨岗位问题处理。'}],
    scope:['SOC 项目 PC 端移植','UI/UE 重构','HUD 与操作逻辑','家园及公会调优','问题整理与跨岗位推进'],
    lead:'围绕 SOC 项目 PC 移植重构界面与操作体验，创建数值显示规范，并结合家园、公会调优推进跨岗位调整；在约 10 人系统组中协作交付。'},
  {slug:'bolang',employer:'北京波浪科技有限公司',role:'主策划 / 执行制作人',period:'2022.07—2025.07',start:'2022-07',end:'2025-07',layout:'duology',
    projects:[{slug:'matchmaking-inc',title:'中国式相亲',description:'负责所有系统从框架到落地，以及剧情大纲和后续剧情验收；以会所经营连接会员招募、相亲匹配、角色成长与恋爱养成。',publicSource:'https://store.steampowered.com/app/2103130/?l=schinese',productContext:'现代都市背景的恋爱养成与模拟经营游戏。玩家接手相亲会所，招募会员、按需求撮合关系，并在城市探索与情感选择中推进故事。'},
      {slug:'vanity-fair',title:'名利游戏',description:'负责游戏内全部系统界面功能、线路图绘制与摆放；参与分支剧情的线路设计及数值奖励设计与配置，重点是非剧情向的系统和交互工作。',publicSource:'https://store.steampowered.com/app/2758000/?l=schinese',productContext:'以娱乐圈与导演人生为背景的真人互动叙事游戏。玩家跟随陆远，在权力、金钱与情感之间作出选择，推动多条故事线并走向不同结局。'}],
    scope:[],lead:'以主策划 / 执行制作人角色连接系统设计与项目推进：负责《中国式相亲》系统框架到落地、剧情大纲与验收；在《名利游戏》负责全部系统界面功能和线路图绘制摆放，参与分支线路与数值奖励设计配置，不含剧本创作。'},
  {slug:'quwan',employer:'北京趣丸科技有限公司',role:'高级系统策划',period:'2021.12—2022.07',start:'2021-12',end:'2022-07',layout:'quest',
    projects:[{slug:'party-planet',title:'派对星球',description:'创建和修订关卡地图、家装评分、主线与每日任务、新手引导文档，把成长目标、任务判定和 UI/UE 状态连接成完整路径。'}],
    scope:['核心关卡','主线任务','系统逻辑','UI/UE'],lead:'通过关卡、评分、任务与引导方案，细化成长目标、计数条件和界面状态，让系统设计能落到具体操作与交付文档。'},
  {slug:'muyou',employer:'北京牧游科技有限公司',role:'主策划',period:'2021.05—2021.12',start:'2021-05',end:'2021-12',layout:'blueprint',
    projects:[{slug:'my-town',title:'我的小镇',description:'以主策划身份参与，工作介绍重点放在从 0 到 1 的系统设计；小镇项目资料进一步展开经营循环、新手流程与任务状态的设计思路。'}, {slug:'zuoyaoji-x',title:'作妖计x',description:'以主策划身份参与；牧游阶段承担从 0 到 1 的玩法、系统与数值，以及任务、好感度和宠物设计，具体项目分工按已确认范围呈现。'}],
    scope:['从 0 到 1 的玩法、系统与数值','任务系统','好感度系统','宠物系统'],lead:'承担从 0 到 1 的玩法、系统与数值设计，围绕任务、好感度和宠物组织成长目标；小镇资料补充经营流程与交互状态的设计表达。'},
  {slug:'beta',employer:'北京贝塔科技股份有限公司',role:'高级系统策划',period:'2020.03—2021.02',start:'2020-03',end:'2021-02',layout:'board',
    projects:[{slug:'word-villas',title:'Word Villas',description:'将分支剧情、锦标赛、多类型活动和投骰子玩法从 0 到 1 推进至上线，完成方案与 UI/UE 设计、跨组对齐和开发测试跟进。'}, {slug:'words-with-colors',title:'Words with Colors',description:'以高级系统策划身份参与；贝塔阶段重点承担系统调优、新手留存分析、活动与项目推进，具体贡献与 Word Villas 署名资料分开说明。'}],
    scope:['系统调优','新手留存分析','锦标赛与分支剧情','运营活动','立项及项目进度管理'],lead:'在约百人规模项目中协作程序、美术与剧情组，推进 Word Villas 分支剧情、锦标赛、活动及投骰子玩法上线，承接排期、任务拆分、组内验收与项目文档等部分 PM 工作。'},
  {slug:'xingqi',employer:'北京星奇畅想科技有限公司',role:'主策划',period:'2019.11—2020.03',start:'2019-11',end:'2020-03',layout:'storyboard',
    projects:[{slug:'toby-adventure',title:'托比大冒险',description:'承担难度曲线、新手流程与系统调优，并开展付费点、广告变现设计，兼顾首次理解、持续挑战和商业化入口。'}],
    scope:['难度曲线','新手流程','系统调优','付费点与广告变现'],lead:'将难度曲线、新手流程和系统调优放在同一体验路径中，同时开展付费点与广告变现设计，兼顾游玩节奏与商业化。'},
  {slug:'haoteng',employer:'北京豪腾嘉科科技有限公司（疯狂游戏）',role:'主策划',period:'2018.02—2019.08',start:'2018-02',end:'2019-08',layout:'archive',
    projects:[{slug:'idiom-scholar',title:'成语小秀才',description:'作为项目唯一策划，主导成语答题玩法、科举升官题材包装与养成线，将文字关卡和角色成长连接为持续参与的目标。'}, {slug:'train-king',title:'谁是火车王',description:'以主策划身份参与；通过 Train 项目的合成经营、轨道控制、阶段引导与拼图活动资料，展示规则、界面状态和交付表达。'}, {slug:'versatile-dog',title:'百变汪星人',description:'以主策划身份参与；Goose 署名立项资料展示养成经营的系统结构、资源循环、社交操作和 UI/UE 交付，历史方案与最终版本分开阅读。'}],
    scope:[],lead:'作为《成语小秀才》项目唯一策划，主导玩法、科举题材包装与养成线；同时保留《谁是火车王》《百变汪星人》的主策划项目经历。'},
  {slug:'iceshi',employer:'北京冰狮科技有限公司',role:'QA 经理 / 游戏策划',period:'2017.03—2018.01',start:'2017-03',end:'2018-01',layout:'lab',
    projects:[{slug:'paper-girl',title:'纸片少女',description:'以 QA 经理 / 游戏策划身份参与；冰狮阶段承担测试管理、关卡调优、资源整理及任务文案工作，连接质量检查与内容设计。'}, {slug:'creation-factory',title:'造物梦工厂',description:'以 QA 经理 / 游戏策划身份参与；从同阶段的测试、关卡、资源和任务职责说明工作价值，具体项目分工不作未经确认的拆分。'}],
    scope:['测试管理','关卡调优','资源整理','文案与主支线任务'],lead:'结合 QA 管理与游戏策划，承担测试管理、关卡调优、资源整理及主支线任务文案，形成从质量检查到内容设计的工作基础。'}
];
export const skills = [
  {title:'玩法与系统',text:'从关卡、任务到系统规则，用职业项目串联设计经验。',links:[['当前制作职责','experience/jianyou/?section=scope'],['从 0 到 1 的系统','experience/muyou/?section=scope'],['关卡与任务','experience/quwan/?section=scope']]},
  {title:'制作与推进',text:'项目排期、任务拆分、组内验收与文档交付，连接策划、程序、美术和剧情。',links:[['6 人项目团队','experience/jianyou/'],['跨组协作与 PM','experience/beta/#work-value']]},
  {title:'交互与体验',text:'PC 端操作、UI/UE 与新手流程，沿着问题调整体验。',links:[['PC 端移植与重构','experience/hero-games/'],['新手留存分析','experience/beta/?section=scope']]},
  {title:'测试与质量',text:'职业测试管理经历，以及个人工具中的验收与一致性检查。',links:[['QA 与游戏策划','experience/iceshi/'],['需求验收实践','#case-gamespec']]},
  {title:'AI 协作与原型',text:'用于文档撰写与检验、表格与数值工具、项目管理，以及个人工具和小游戏开发；独立游戏中也探索 UI、角色、配音与音乐音效制作。',links:[['小团队完整策划','#indie-games'],['多线程工作台','#case-workbench'],['本地模拟玩法','#case-lighthouse']]},
  {title:'结构表达与工具',text:'把想法、关卡和任务变成可编辑、可交接的结构。',links:[['思维导图快捷工作流',hubBase+'projects/planmap/index.html'],['关卡编辑工具',hubBase+'projects/paws-level-editor/index.html']]}
];

// Value statements describe why the work matters, not measured business results.
export const companyWork = {
  jianyou:{items:[
    {title:'统筹方向与玩法系统',action:'负责整体方向、玩法与系统；项目资料将首关上手、第二关挑战、城市包装与阶段范围连接，并补充关卡、编辑器和奖励系统的交付规则。',value:'把产品方向转为具体规则、优先级和验收依据；资料中的历史方案与最终版本分开阅读。',link:['设计与交付案例','projects/sheep-match/#sheep-product-case']},
    {title:'连接团队协作与研发节奏',action:'在共 6 人的项目团队中承担团队与排期职责，负责项目推进节奏；不包含美术表现和发行运营。',value:'把设计目标与研发协作连接起来，体现制作人对项目整体推进的责任，而非只交付方案。',link:['团队与排期职责','projects/sheep-match/team/']},
    {title:'连接版本记录与体验迭代',action:'承担数据迭代职责；版本资料区分提测、内部、测试服和全量记录，并关联功能调整与点击拖拽、层级、恢复等缺陷修复。',value:'用交付记录和验收重点支持持续迭代，不把任务归档或埋点接入写成增长业绩。',link:['版本与迭代证据','projects/sheep-match/#sheep-release-case']},
  ],note:'依据已确认任职与职责；项目团队共 6 人，不等同于 6 名直接下属。'},
  'hero-games':{items:[
    {title:'PC 移植中的交互重构',action:'承担 SOC 项目 PC 端移植、UI/UE 重构及 HUD 与操作逻辑调整。',value:'将界面信息、操作提示与系统入口一起考虑，体现跨端体验设计能力，而非单纯调整画面尺寸。',link:['PC 交互职责摘要','projects/crisis-dawn/design-summary/']},
    {title:'将局部问题转为通用规范',action:'创建和修订系统数值显示规范，区分中英文单位、精确数字与紧凑物品格缩写，并列出 QA 检查点。',value:'把显示一致性、量级辨识与布局约束整理为可复用交付规则；以更新表记录支持个人产出，而非用团队截图代替作者依据。',link:['本人记录与规范摘要','projects/crisis-dawn/#hero-numbers']},
    {title:'系统调优与跨岗位推进',action:'开展家园、公会系统调优，整理体验问题并推进跨岗位调整。',value:'把体验问题转为具体协作事项，让系统设计与研发推进相互衔接。',link:['项目工作记录','projects/crisis-dawn/#scope']},
  ],note:'数值规范有本人创建及修订记录，其余职责依据已确认履历；活动方案和团队背景在资料区分别标注，不宣称全部上线或量化改善。'},
  bolang:{items:[
    {title:'系统规则与界面交互细化',action:'在《中国式相亲》中创建、重构和修订技能、情感、装修及相亲节目方案，明确条件、状态与反馈。',value:'把跨系统成长目标细化为玩家可理解、团队可讨论的操作规则，体现系统与 UI/UE 的结合。',link:['个人修订记录与原图','projects/matchmaking-inc/#matchmaking-supplement']},
    {title:'非剧情系统与线路图交付',action:'《名利游戏》负责全部系统界面功能和线路图绘制与摆放，参与分支线路、数值奖励的设计与配置；不包含剧本撰写或剧情创作。',value:'将分支关系转为玩家可浏览、可回看的界面与功能，连接系统交互和配置交付。',link:['系统界面与线路设计','projects/vanity-fair/#vanity-design']},
  ],note:'名利个人职责由本人明确确认，文档未署名不否定职责，但不据此认定全部文档独立作者；不扩大为剧本创作、程序实现或美术制作。'},
  quwan:{items:[
    {title:'关卡与评分的成长表达',action:'创建和修订关卡玩法与家装评分文档，更新地图 UE、横向布局、评分规则及主客态展示。',value:'让成长进度、解锁条件和当前可操作内容有明确表达，连接玩法目标与界面反馈。',link:['关卡与家装设计资料','projects/party-planet/#tt-levels']},
    {title:'任务判定与领奖闭环',action:'创建主线、每日任务文档，区分行为和收集判定、计数起点、任务排序、奖励状态与跳转。',value:'补足常规流程之外的判定和状态细节，让目标引导与奖励反馈具备清晰的交付依据。',link:['任务系统设计资料','projects/party-planet/#tt-main']},
    {title:'分阶段引导与流程说明',action:'创建并补充分阶段引导文档，细化需求概述、图例说明，并记录中断处理的备选方案。',value:'按学习顺序组织复杂功能，同时保留方案讨论与最终实现之间的区别。',link:['CB4 引导资料','projects/party-planet/#tt-onboarding']},
  ],note:'具体贡献依据修订表负责人及本人修订行；团队开发和美术不归为个人独立执行。'},
  muyou:{items:[
    {title:'从 0 到 1 的系统设计',action:'在主策划岗位承担从 0 到 1 的玩法、系统与数值设计，涉及《我的小镇》《作妖计x》两款项目。',value:'体现早期系统搭建与玩法结构设计的职责广度，具体分工不从同公司任职范围自动推定。',link:['牧游任职职责','experience/muyou/#scope']},
    {title:'围绕成长目标组织系统',action:'承担任务、好感度与宠物系统相关工作；小镇资料另展示经营、新手和任务交互的设计背景。',value:'把目标、培养与功能入口作为相互关联的设计问题，而不是孤立罗列系统名称。',link:['小镇流程与交互资料','projects/my-town/#town-design']},
  ],note:'前述为公司任职共同职责；小镇原图说明项目设计，未把每项方案或全部系统逐项归为某一项目个人独立成果。'},
  beta:{items:[
    {title:'竞技活动的完整生命周期',action:'撰写 Word Villas 锦标赛策划案，覆盖独立参与路径、预热开启、排行结算、休赛展示与未领奖补发。',value:'设计考虑活动前中后及异常分支，不只给出一个排行榜面板，体现规则完整性与长期目标组织。',link:['署名锦标赛设计','projects/word-villas/#beta-tournament']},
    {title:'剧情与任务的交互交付',action:'撰写分支剧情、限时任务文档，明确入口、锁定、重玩、任务返回、领奖状态和埋点需求。',value:'把内容入口、操作反馈与验证事件一起交付，为程序、UI 和后续分析提供一致的规则。',link:['署名剧情与活动设计','projects/word-villas/#beta-story']},
    {title:'跨组协作与部分 PM 工作',action:'在约百人规模项目中协作程序、美术与剧情组，并配合运营和 UI；承接项目排期、任务拆分、组内工作验收与项目文档。',value:'将需求变成可排期、可交接、可验收的交付；项目协作规模不代表直属人数。',link:['上线设计与交互资料','projects/word-villas/#word-design-excerpts']},
  ],note:'署名文档归于 Word Villas；约百人为项目协作规模，不是直接下属人数。其他项目专属成果不自动推定。'},
  xingqi:{items:[
    {title:'新手理解与难度节奏',action:'在《托比大冒险》中开展新手流程、难度曲线与系统调优工作。',value:'同时关注第一次理解和后续挑战，体现将单点玩法放回完整体验路径的设计能力。',link:['项目工作范围','projects/toby-adventure/#scope']},
    {title:'兼顾体验与商业化入口',action:'承担付费点和广告变现相关设计，与系统调整及游玩节奏共同构成主策划工作范围。',value:'体现玩法与商业化设计的结合；没有公开收入或转化数据，不作量化收益承诺。',link:['公司任职记录','experience/xingqi/#role']},
  ],note:'依据已确认履历职责；这里只说明工作范围及设计价值，不新增具体方案和商业数据。'},
  haoteng:{items:[
    {title:'多款轻游戏的主策划经历',action:'以主策划身份参与《成语小秀才》《谁是火车王》《百变汪星人》，保留三款项目的任职关联。',value:'说明主策划岗位的多项目经验；项目名单本身不被当作每款游戏全部方案或业绩的证明。',link:['该段任职与项目','experience/haoteng/#projects']},
    {title:'用具体规则展开设计讨论',action:'以成语项目资料展开成长循环、填字判定、每日挑战、玩家创建关卡及生词本交互的设计讨论。',value:'让面试交流落到状态转换、异常分支和交互取舍，而不是只展示产品截图；资料未逐项确认独立作者。',link:['成语系统与交互资料','projects/idiom-scholar/#idiom-design']},
    {title:'火车项目的玩法与交互方案',action:'Train 资料覆盖合成经营、轨道控制、阶段引导、地点推进与铁轨拼图，提供核心 UE、节点和解锁流程图。',value:'以规则和操作状态呈现主策划岗位的交付依据；方案版本、个人职责与团队执行分别说明。',link:['火车项目设计案例','projects/train-king/#train-design']},
  ],note:'任职角色已确认；成语资料与用户指定立项资料分开呈现。立项案有页眉策划署名，不仅依据元数据；团队美术不认定本人独立执行。'},
  iceshi:{items:[
    {title:'QA 管理与关卡体验结合',action:'以 QA 经理 / 游戏策划身份承担测试管理和关卡调优，参与《纸片少女》《造物梦工厂》。',value:'形成质量检查与玩法体验相结合的工作基础，能够从问题定位进入设计调整。',link:['测试与关卡职责','experience/iceshi/#scope']},
    {title:'内容与资源的策划工作',action:'承担资源整理、文案和主支线任务相关工作，兼顾内容与质量两个方向。',value:'说明从测试岗位向策划工作延伸的经历，以及对内容、资源和任务结构的关注。',link:['QA 与游戏策划经历','experience/iceshi/#role']},
  ],note:'以上为公司任职共同职责，未逐项确认在两款项目中的专属分工；不新增测试效率或质量提升数字。'},
};

export const sharedCompanyWork = {
  muyou:{items:[
    {title:'从 0 到 1 的设计职责',action:'在牧游主策划岗位承担从 0 到 1 的玩法、系统与数值设计；本项目参与记录已确认，具体分工尚未拆分。',value:'体现系统搭建与玩法结构设计的任职经验，后续面试可围绕设计取舍展开，不借用其他项目的具体方案。',link:['公司设计职责','experience/muyou/#scope']},
    {title:'成长与培养系统职责',action:'公司任职职责包含任务、好感度和宠物相关设计，未逐项确认在两款项目中的专属分工。',value:'呈现目标组织与培养系统的工作范围，区分已确认的岗位经验和需要进一步核实的项目细节。',link:['公司工作范围','experience/muyou/#role']},
  ],note:'依据公司任职共同职责，不移用小镇项目图表作为本项目成果。'},
  beta:{items:[
    {title:'系统调优与新手体验分析',action:'贝塔任职职责包含系统调优、新手留存分析与运营活动；具体到本项目的方案分工尚未逐项确认。',value:'呈现从体验问题进入设计调整的岗位经验，不用其他项目的署名方案代替本项目产出。',link:['公司设计与分析职责','experience/beta/#scope']},
    {title:'立项与研发节奏推进',action:'在公司阶段承担立项及项目进度管理，具体项目专属交付与业务效果未在本页新增主张。',value:'体现设计之外的项目组织职责，说明可以连接方案设计与研发推进，而不把职责等同于已验证业绩。',link:['公司任职记录','experience/beta/#role']},
  ],note:'只使用共同任职职责；Word Villas 署名文档不作为本项目贡献。'},
  haoteng:{items:[
    {title:'主策划岗位的项目经历',action:'以主策划身份参与本项目，任职及项目关联已有履历记录；具体负责的系统、方案与交付尚未单独核实。',value:'保留真实的职业项目经验，为面试交流提供岗位背景；不借用同公司其他游戏的设计资料补写个人成果。',link:['公司任职与项目记录','experience/haoteng/#projects']},
  ],note:'当前仅确认任职与项目参与，不将成语方案或团队成果归入本项目。'},
  iceshi:companyWork.iceshi,
};

export const projectWork = {
  'versatile-dog':{basis:'document',items:[
    {title:'系统结构与成长循环的方案表达',action:'署名立项案将产出、培养、容量与收集目标连接，以系统结构图和经济循环图说明各模块作用。',value:'把功能清单转为团队可讨论的系统关系与成长投入方向，不以设计方案代替实测业绩。',link:['系统与循环原图','projects/versatile-dog/#goose-systems']},
    {title:'社交流程与 UI/UE 状态设计',action:'立项案提供邀请、派遣、等待和收取流程，明确常用入口调整、在场与库存操作及成就状态反馈。',value:'用条件、操作和反馈降低研发理解偏差；原图说明策划交付，不认定团队美术由本人绘制。',link:['交互与界面方案','projects/versatile-dog/#goose-social']},
  ],note:'用户最新确认 Goose 资料对应百变汪星人；立项案保留《超级铲屎官》历史名称与本人策划署名，不推定全部功能独立作者、完整更名时间线或最终上线范围。'},
  'train-king':{basis:'document',items:[
    {title:'合成经营与轨道玩法的规则表达',action:'核心功能资料定义火车合并、交换、上轨与下架的状态，并通过轨道节点和路线切换规则说明玩法联动。',value:'将玩法拆为可实现、可讨论的规则与反馈，为程序和测试提供共同依据。',link:['核心玩法与 UE','projects/train-king/#train-core']},
    {title:'引导、成长与活动的交付表达',action:'分阶段教学连接合成和经营；地点流程覆盖中断恢复，铁轨拼图连接收集、关卡与奖励，并列出交互与美术需求。',value:'体现从体验路径到界面状态、资源需求和异常分支的策划交付；不把历史设计目标写成业绩。',link:['活动与交互案例','projects/train-king/#train-puzzle']},
  ],note:'采用用户最新确认的 Train 项目资料，替换此前误关联的 Goose 方案；个人岗位已确认，选中文档未发现明确个人署名，不认定全部独立作者或最终上线状态。'},
  'sheep-match':{basis:'role',...companyWork.jianyou},
  'crisis-dawn':{basis:'role',...companyWork['hero-games']},
  'party-planet':{basis:'document',...companyWork.quwan},
  'toby-adventure':{basis:'role',...companyWork.xingqi},
  'matchmaking-inc':{basis:'document',items:[
    {title:'系统框架到落地的统筹',action:'负责所有系统从框架到落地，以及剧情大纲和后续剧情验收，连接会所经营、角色成长与恋爱养成。',value:'用统一循环组织系统和内容交付；本人确认循环图与上线版本基本一致，不等于个人完成全部程序、美术或剧情写作。',link:['系统框架与资源循环','projects/matchmaking-inc/#matchmaking-design']},
    {title:'重构成长与关系系统',action:'创建技能文档并调整技能树、解锁逻辑和界面状态；补充好感度逻辑，并参与情感系统重构。',value:'把成长条件、阶段目标和可操作状态连接起来，帮助玩家理解下一步，并给团队提供规则与交互依据。',link:['技能与情感修订资料','projects/matchmaking-inc/#match-skills']},
    {title:'细化会所经营交互',action:'在装修文档中修订界面、空间页签、评分及购买后自动应用逻辑，明确家具解锁、购买和使用状态。',value:'将场景变化与经营投入对应起来，补齐预览、条件提示和购买反馈的操作链路。',link:['装修交互与修订记录','projects/matchmaking-inc/#match-decor']},
  ],note:'个人贡献依据更新表；情感与装修初始创建有其他成员贡献，美术由团队承担，历史方案不等于全部上线。'},
  'vanity-fair':{basis:'role',items:[
    {title:'全部系统界面功能的设计',action:'负责游戏内全部系统界面功能，围绕菜单、设置、章节选择、分支线路、选项及图鉴等页面组织功能、跳转和状态反馈。',value:'把玩家从进入、游玩到回看的路径落实为界面与规则交付，不以产品题材代替个人工作。',link:['系统功能与操作流程','projects/vanity-fair/#vanity-modules']},
    {title:'线路图绘制、摆放与分支线路设计',action:'负责线路图绘制与摆放，参与分支剧情的线路设计；工作重点是节点关系、线路组织和展示，不包含剧本撰写或剧情创作。',value:'将复杂分支整理为可浏览、可定位与可回看的结构，让玩家理解探索路径，让团队对齐分支连接。',link:['线路图与交互表达','projects/vanity-fair/#vanity-storyline']},
    {title:'数值奖励的设计与配置参与',action:'参与数值奖励设计与配置，结合文档中的选择数值、章节探索进度奖励及配置关系，说明系统规则与数据交付的连接。',value:'体现规则与配置之间的协作能力；不公开具体参数，不将参与配置扩大为全部经济系统独立主导。',link:['数值奖励与配置关系','projects/vanity-fair/#vanity-rewards']},
  ],note:'上述个人职责由本人明确确认，重点为非剧情向内容。文档未署名，不据此认定全部文档独立作者；待定功能、历史方案及团队贴图不作为最终上线或量化业绩证明。'},
  'my-town':{basis:'project-material',items:[
    {title:'从系统框架进入经营流程',action:'以主策划身份参与项目；结合小镇系统框架与流程图，展开建造、补货、顾客、收益和成长的设计讨论。',value:'让系统设计的讨论落到入口关系与经营闭环；图示证明项目方案存在，不单独证明全部由本人完成。',link:['经营界面与流程图','projects/my-town/#town-navigation']},
    {title:'关注首次体验与状态恢复',action:'项目资料进一步呈现分步引导、中断恢复，以及任务、宝藏的开始、倒计时、领奖和确认分支。',value:'以常规流程和边界状态说明 UI/UE 设计深度；公司共同职责与项目图示分开归属。',link:['新手和任务交互资料','projects/my-town/#town-onboarding']},
  ],note:'任职角色已确认，具体图表为历史项目资料；未将任务、好感度和宠物等公司共同职责逐项认定为本项目个人独立成果。'},
  'word-villas':{basis:'document',items:[
    {title:'四类功能从 0 到 1 上线',action:'负责分支剧情、锦标赛、多类型活动和投骰子玩法，从方案设计、策划文档与 UI/UE 到开发测试跟进，完成上线。',value:'将规则、状态和界面路径一起交付，覆盖活动参与、奖励反馈和异常流程，形成完整落地能力。',link:['设计原型与交互截图','projects/word-villas/#word-design-excerpts']},
    {title:'剧情与竞技的业务价值',action:'撰写署名策划案并协调剧情线路、系统界面及活动实现。分支剧情收入有明显提升；锦标赛对核心用户留存和道具付费有明显提升。',value:'以上为本人确认的定性成果，未公开提升幅度、指标口径或验证方法，不将原型截图视为数据证明。',link:['署名方案与规则','projects/word-villas/#beta-design']},
    companyWork.beta.items[2],
  ],note:'个人职责与上线范围由本人确认，三份策划文档另有正文署名支持；程序、剧情内容与美术为团队协作。'},
  'idiom-scholar':{basis:'project-material',items:[
    {title:'主导玩法、题材包装与养成',action:'作为项目唯一策划，主导成语答题玩法、穷秀才科举升官的题材包装及养成线，将文字答题与升官发财的成长目标连接。',value:'设计判断是利用成语玩法的长期参与潜力，使养成目标和包装贴合受众及当时市场预期；不将该判断冒充实测长留或爆款因果。',link:['成长循环与玩法资料','projects/idiom-scholar/#idiom-systems']},
    {title:'扩展内容与交互路径',action:'以每日挑战、玩家创建关卡、新手引导和生词本资料，展开发布、返回、收藏与重复阅读等交互取舍。',value:'让面试官看到内容扩展和 UI/UE 思路，而非单纯产品介绍；原图与团队美术不归为本人独立执行。',link:['挑战与交互资料','projects/idiom-scholar/#idiom-interaction']},
  ],note:'唯一策划与整体主导范围由本人确认；项目原图补充方案证据，团队美术和程序实现不归为个人执行。'},
};
