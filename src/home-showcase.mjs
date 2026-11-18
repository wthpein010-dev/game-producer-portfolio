const skillBranches = [
  { title: '策划设计', skills: [
    { title: '系统策划与文档', summary: '规则 · 流程 · 配置', href: 'projects/matchmaking-inc/#matchmaking-design' },
    { title: '数值设计与调优', summary: '资源产消 · 奖励 · 成长', href: 'projects/my-town/#town-economy' },
  ] },
  { title: '玩家体验', skills: [
    { title: 'UE/UI 设计', summary: '界面原型 · HUD', href: 'projects/crisis-dawn/design-summary/' },
    { title: '交互体验与细节', summary: '新手引导 · 操作反馈', href: 'projects/my-town/#town-onboarding' },
  ] },
  { title: '研发交付', skills: [
    { title: 'AI 应用', summary: '文档 · 原型 · 验证', href: 'skills/ai-collaboration/' },
    { title: '项目管理与工具', summary: '任务拆分 · 排期 · 验收', href: 'skills/ai-collaboration/#ownership' },
  ] },
];

const featuredCases = [
  {
    title: '成语小秀才', href: 'projects/idiom-scholar/', role: '唯一策划 · 休闲小游戏',
    summary: '主导成语填字、科举题材包装与养成线。',
    image: 'assets/project-design/idiom-scholar/promotional-cover.png', width: 960, height: 334,
    alt: '成语填字棋盘和科举题材人物的推广图',
  },
  {
    title: 'Wordvillas', href: 'projects/word-villas/', role: '高级系统策划 · 海外休闲手游',
    summary: '推进分支剧情、锦标赛、多类型活动与投骰子玩法上线。',
    image: 'wordvillas', alt: 'App Store 页面上的房间改造和填词玩法',
  },
  {
    title: '中国式相亲', href: 'projects/matchmaking-inc/', role: '主策划 / 执行制作人 · 模拟经营',
    summary: '负责系统框架到落地、剧情大纲与后续验收。',
    image: 'matchmaking', alt: 'Steam 展示的会所经营场景与顾客状态',
  },
];

const galleryProjects = [
  { title: '羊了个羊：对对碰', href: 'projects/sheep-match/', image: 'sheep-match', alt: '正式版的配对牌面和入槽栏' },
  { title: '我的小镇', href: 'projects/my-town/', image: 'my-town', alt: '小镇街景、顾客选择和新手引导的界面效果' },
  { title: '作妖计', href: 'projects/zuoyaoji-x/', image: 'zuoyao', alt: '官方手游宣传图中的游戏标识和角色' },
  { title: '名利游戏', href: 'projects/vanity-fair/', image: 'vanity', alt: '真人互动剧画面与两个剧情选项' },
  { title: '舌尖上的魔术师', href: '#indie-magicar', image: 'magicar', alt: '魔法战车与塔防战斗的实机画面' },
  { title: '除灵事务所', href: '#indie-exorcism', image: 'exorcism', alt: '鬼怪图鉴、养成属性与角色界面' },
  { title: '危机曙光', href: 'projects/crisis-dawn/', image: 'crisis', alt: '生存探索中放置建筑的实机画面' },
];

function cover(project, escape) {
  const source = project.image.startsWith('assets/') ? project.image : 'assets/project-design/home-showcase/'+project.image+'.webp';
  return '<img src="'+escape(source)+'" width="'+(project.width ?? 960)+'" height="'+(project.height ?? 540)+'" loading="lazy" decoding="async" alt="'+escape(project.alt)+'">';
}

export function renderProducerSkills(escape) {
  return '<section class="producer-skills" id="producer-skills" aria-labelledby="producer-skills-title">\n'+
    '  <h2 id="producer-skills-title">策划技能点</h2>\n'+
    '  <ul class="producer-branches" role="list">'+skillBranches.map(branch=>
      '\n    <li class="producer-branch"><h3>'+escape(branch.title)+'</h3><ul class="producer-skill-links" role="list">'+
      branch.skills.map(skill=>'\n      <li><a href="'+escape(skill.href)+'"><strong>'+escape(skill.title)+'</strong><span>'+escape(skill.summary)+'</span></a></li>').join('')+
      '\n    </ul></li>'
    ).join('')+'\n  </ul>\n</section>';
}

export function renderCareerCases(escape) {
  return '<section class="career-cases wrap" id="career-cases" aria-labelledby="career-cases-title">\n'+
    '  <header class="section-head"><h2 id="career-cases-title">代表项目</h2></header>\n'+
    '  <div class="career-case-grid">'+featuredCases.map(project=>
      '\n    <article class="career-case"><a class="career-case-link" href="'+escape(project.href)+'" aria-label="查看《'+escape(project.title)+'》项目详情">'+
      '<div class="career-case-image">'+cover(project,escape)+'</div><div class="career-case-copy">'+
      '<p class="eyebrow">'+escape(project.role)+'</p><h3>'+escape(project.title)+'</h3><p>'+escape(project.summary)+'</p>'+
      '<span class="career-case-arrow" aria-hidden="true">↗</span></div></a></article>'
    ).join('')+'\n  </div>\n</section>';
}

export function renderProjectGallery(escape) {
  return '<section class="project-gallery wrap" id="project-gallery" aria-labelledby="project-gallery-title">\n'+
    '  <h2 id="project-gallery-title">更多项目</h2>\n'+
    '  <ul class="project-gallery-grid" role="list">'+galleryProjects.map(project=>
      '\n    <li><a href="'+escape(project.href)+'" aria-label="查看《'+escape(project.title)+'》项目">'+cover(project,escape)+
      '<span class="project-gallery-label" aria-hidden="true">'+escape(project.title)+' <span>↗</span></span></a></li>'
    ).join('')+'\n  </ul>\n</section>';
}
