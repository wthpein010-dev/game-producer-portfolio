export const matchmakingMaps = [
  {
    id:'matchmaking-system-map',title:'整体系统结构',file:'system-map.png',width:1680,height:858,
    sha256:'1456339996541e7ea7209ae75992e648ae0e076449390366e1bf4d83a8711a19',
    alt:'中国式相亲整体系统结构图：会所经营连接场景探索、邀请入会、会员匹配和角色成长，任务与场景交互提供资源，成长连接恋爱与债务目标',
    question:'经营、探索、恋爱与角色成长，如何共同服务于一条持续推进的游戏主线？',
    points:['主线由经营相亲会所、场景探索、角色成长与债务目标连接，避免功能只作为孤立入口存在。','邀请入会串联交谈、回合战斗、意愿值和会员入库；会员再进入匹配计算，成功获得金币与声望，失败保留无法匹配分支。','会所提升解锁更多席位、线上相亲和布置；更多店铺与员工招募形成经营扩展路径。','主线、委托、支线、场景交互、突发事件和小游戏分别提供资源；角色培养与好感、约会及婚姻构成外围成长。'],
    output:'图示将玩法入口、资源来源、解锁依赖和成功/失败分支放到同一张结构图中，可用于讨论系统拆分与跨功能衔接。',
  },
  {
    id:'matchmaking-resource-loop',title:'玩法循环与资源产出',file:'resource-loop.png',width:1612,height:909,
    sha256:'4d609eb2f6cbd44014219e6302ef36aa400df39a539d0fd04de71aa3e2919439',
    alt:'中国式相亲玩法循环与资源产出流程图：邀请入会产生会员与金币，匹配产生声望，行动力连接核心玩法和小游戏，装备技能与好感反馈到角色和会所成长',
    question:'哪些行为产出资源，资源消耗在哪里，又如何反馈到下一轮玩法？',
    points:['邀请入会产出会员与金币，会员进入相亲匹配；匹配、主线和委托任务产出声望，声望反馈到会所等级。','行动力连接邀请入会、相亲匹配与小游戏；图中区分日常恢复与活力兑换，说明行动资源如何限制参与节奏。','金币进入道具、装备及经营投入；小游戏产出经验，经验进入技能，装备与技能再影响角色成长和玩法表现。','女主支线与约会产出好感度，好感阶段连接恋爱养成；会所装修、员工、活动及其他店铺形成经营分支。'],
    output:'图中用产出、消耗和影响区分连接关系，围绕资源闭环讨论节奏和成长；这里只展示关系，不公开具体概率、经济配置或运营统计。',
  },
];

export function renderMatchmakingDesign(e,base='../../') {
  return `<section class="matchmaking-design" id="matchmaking-design" aria-labelledby="matchmaking-design-title"><header><p class="eyebrow">SYSTEM DESIGN / 中国式相亲</p><h2 id="matchmaking-design-title">系统结构与玩法循环</h2><p class="matchmaking-intro">我的项目角色为主策划 / 执行制作人。两张项目设计图分别展示系统之间的关系，以及行为、资源与成长之间的循环。</p></header><p class="matchmaking-boundary">来源：用户提供的两张中国式相亲项目设计截图。下方文字为本站依据图中关系整理的阅读摘要，不认定全部系统均由个人独立完成；历史设计图不代表相关功能全部上线，也不是经营成果证明。</p><nav class="idiom-jumps" aria-label="相亲项目重点设计图">${matchmakingMaps.map(item=>`<a href="#${item.id}">${e(item.title)} ↓</a>`).join('')}</nav>${matchmakingMaps.map(item=>{
    const image=`${base}assets/project-design/matchmaking-inc/${item.file}`;
    const attributes=`src="${image}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${e(item.alt)}"`;
    return `<article class="matchmaking-map" aria-labelledby="${item.id}-title" id="${item.id}"><h3 id="${item.id}-title">${e(item.title)}</h3><figure><a href="${image}" aria-label="查看${e(item.title)}原图"><img ${attributes}></a><figcaption>中国式相亲 · 项目原始设计截图</figcaption></figure><div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(item.question)}</p><h4>图示产出</h4><p>${e(item.output)}</p></div><div><h4>关键关系</h4><ul>${item.points.map(point=>`<li>${e(point)}</li>`).join('')}</ul></div></div><a class="design-original" href="${image}">查看原图（可缩放）<span aria-hidden="true">↗</span></a><details class="matchmaking-inspect"><summary>在页面内阅读${e(item.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(item.title)}大图阅读区域"><img ${attributes}></div></details></article>`;
  }).join('')}<p class="matchmaking-boundary">项目目录中另有邀请入会、会员征婚、相亲匹配、任务与数值循环等设计材料。本次以两张指定截图为重点，不上传完整策划案、数值表、统计文件或美术源工程；原有相亲玩法署名摘要与 Steam 项目介绍保留在下方。</p></section>`;
}
