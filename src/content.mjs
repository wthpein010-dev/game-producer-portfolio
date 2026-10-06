export const hubBase = 'https://wthpein010-dev.github.io/ai-application-hub/';
export const sourceSha = '3ad59bf1f24dcd99dcbb660e4a9186a8353cdb06';
export const profile = {
  name: '吴天昊', role: '游戏制作人',
  description: '从 QA、系统策划到主策划与制作。关注玩法系统、交互体验，以及把项目向前推进的具体工作。',
  experience: '9 年以上', projectExperience: '10 款以上',
  education: '北京联合大学 · 计算机科学与技术 · 本科 · 2015.09—2017.07'
};
export const jobs = [
  {slug:'jianyou', employer:'北京简游科技有限公司', role:'游戏制作人', period:'2026.07.27—至今', start:'2026-07-27', layout:'producer', teamSize:6,
    projects:[{slug:'sheep-match',title:'羊了个羊：对对碰',description:'当前负责的游戏项目。工作范围覆盖整体方向、玩法与系统、团队与排期、数据迭代。'}],
    scope:['整体方向','玩法与系统','团队与排期','数据迭代'],
    lead:'在一个共 6 人的项目团队中，负责游戏方向、玩法系统与推进节奏。',
    note:'项目团队共 6 人，不等同于 6 名直接下属。职责不包含美术表现、发行运营。'},
  {slug:'hero-games', employer:'英雄游戏科技股份有限公司', role:'高级系统策划', period:'2025.07—2026.07.23', start:'2025-07', end:'2026-07-23', layout:'workbench',
    projects:[{slug:'crisis-dawn',title:'危机曙光',description:'SOC 项目的 PC 端移植与体验调整。围绕 UI/UE、HUD、操作逻辑，以及家园与公会系统开展工作。'}],
    scope:['SOC 项目 PC 端移植','UI/UE 重构','HUD 与操作逻辑','家园及公会调优','问题整理与跨岗位推进'],
    lead:'把 PC 端的界面、操作与系统体验放在一起看，再沿着问题清单推进调整。'},
  {slug:'bolang',employer:'北京波浪科技有限公司',role:'主策划 / 执行制作人',period:'2022.07—2025.07',start:'2022-07',end:'2025-07',layout:'duology',
    projects:[{slug:'matchmaking-inc',title:'中国式相亲',description:'以现代都市为背景，结合恋爱养成与相亲会所经营的游戏。',publicSource:'https://store.steampowered.com/app/2103130/?l=schinese'},
      {slug:'vanity-fair',title:'名利游戏',description:'围绕人生选择与娱乐圈生存展开的真人互动叙事游戏。选择推动不同的剧情分支与结局。',publicSource:'https://store.steampowered.com/app/2758000/?l=schinese'}],
    scope:[],lead:'在这段经历中，以主策划 / 执行制作人角色参与《中国式相亲》《名利游戏》。'},
  {slug:'quwan',employer:'北京趣丸科技有限公司',role:'高级系统策划',period:'2021.12—2022.07',start:'2021-12',end:'2022-07',layout:'quest',
    projects:[{slug:'party-planet',title:'派对星球',description:'这段项目经历涉及核心关卡、主线任务、系统逻辑与 UI/UE。'}],
    scope:['核心关卡','主线任务','系统逻辑','UI/UE'],lead:'在关卡、任务与系统界面之间，把玩家的游玩路径串联起来。'},
  {slug:'muyou',employer:'北京牧游科技有限公司',role:'主策划',period:'2021.05—2021.12',start:'2021-05',end:'2021-12',layout:'blueprint',
    projects:[{slug:'my-town',title:'我的小镇',description:'北京牧游科技任职期间参与的项目之一。'}, {slug:'zuoyaoji-x',title:'作妖计x',description:'北京牧游科技任职期间参与的项目之一。'}],
    scope:['从 0 到 1 的玩法、系统与数值','任务系统','好感度系统','宠物系统'],lead:'围绕从 0 到 1 的玩法系统设计，以及任务、好感度、宠物等系统开展主策划工作。'},
  {slug:'beta',employer:'北京贝塔科技股份有限公司',role:'高级系统策划',period:'2020.03—2021.02',start:'2020-03',end:'2021-02',layout:'board',
    projects:[{slug:'word-villas',title:'Word Villas',description:'北京贝塔科技任职期间参与的项目之一。'}, {slug:'words-with-colors',title:'Words with Colors',description:'北京贝塔科技任职期间参与的项目之一。'}],
    scope:['系统调优','新手留存分析','锦标赛与分支剧情','运营活动','立项及项目进度管理'],lead:'从系统调优、新手留存分析，到活动、剧情与项目进度管理。'},
  {slug:'xingqi',employer:'北京星奇畅想科技有限公司',role:'主策划',period:'2019.11—2020.03',start:'2019-11',end:'2020-03',layout:'storyboard',
    projects:[{slug:'toby-adventure',title:'托比大冒险',description:'这段经历涵盖难度曲线、新手流程、系统调优、付费点与广告变现。'}],
    scope:['难度曲线','新手流程','系统调优','付费点与广告变现'],lead:'从新手进入游戏的第一步，到难度节奏、系统调整与变现设计。'},
  {slug:'haoteng',employer:'北京豪腾嘉科科技有限公司（疯狂游戏）',role:'主策划',period:'2018.02—2019.08',start:'2018-02',end:'2019-08',layout:'archive',
    projects:[{slug:'idiom-scholar',title:'成语小秀才',description:'成语填字与角色成长相结合的轻游戏。项目资料涵盖成长循环、每日挑战、玩家创建关卡、新手引导与生词本交互。'}, {slug:'train-king',title:'谁是火车王',description:'疯狂游戏任职期间参与的项目之一。'}, {slug:'versatile-dog',title:'百变汪星人',description:'疯狂游戏任职期间参与的项目之一。'}],
    scope:[],lead:'在这段主策划经历中，参与《成语小秀才》《谁是火车王》《百变汪星人》。'},
  {slug:'iceshi',employer:'北京冰狮科技有限公司',role:'QA 经理 / 游戏策划',period:'2017.03—2018.01',start:'2017-03',end:'2018-01',layout:'lab',
    projects:[{slug:'paper-girl',title:'纸片少女',description:'北京冰狮科技任职期间参与的项目之一。'}, {slug:'creation-factory',title:'造物梦工厂',description:'北京冰狮科技任职期间参与的项目之一。'}],
    scope:['测试管理','关卡调优','资源整理','文案与主支线任务'],lead:'以测试管理和策划工作为起点，兼顾质量、关卡、资源与任务内容。'}
];
export const skills = [
  {title:'玩法与系统',text:'从关卡、任务到系统规则，用职业项目串联设计经验。',links:[['当前制作职责','experience/jianyou/?section=scope'],['从 0 到 1 的系统','experience/muyou/?section=scope'],['关卡与任务','experience/quwan/?section=scope']]},
  {title:'制作与推进',text:'方向、团队、排期，以及主策划 / 执行制作人的项目经历。',links:[['6 人项目团队','experience/jianyou/'],['两款职业项目','experience/bolang/']]},
  {title:'交互与体验',text:'PC 端操作、UI/UE 与新手流程，沿着问题调整体验。',links:[['PC 端移植与重构','experience/hero-games/'],['新手留存分析','experience/beta/?section=scope']]},
  {title:'测试与质量',text:'职业测试管理经历，以及个人工具中的验收与一致性检查。',links:[['QA 与游戏策划','experience/iceshi/'],['需求验收实践','#case-gamespec']]},
  {title:'AI 协作与原型',text:'用可检查的过程、原型与边界说明，展示个人实践。',links:[['需求交付流程','#workflow'],['多线程工作台','#case-workbench'],['本地模拟玩法','#case-lighthouse']]},
  {title:'结构表达与工具',text:'把想法、关卡和任务变成可编辑、可交接的结构。',links:[['思维导图快捷工作流',hubBase+'projects/planmap/index.html'],['关卡编辑工具',hubBase+'projects/paws-level-editor/index.html']]}
];
