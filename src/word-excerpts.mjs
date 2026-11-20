export const wordExcerpts = [
  {id:'word-tournament-excerpt',title:'锦标赛：拼词、收集蝴蝶与赛季领奖',file:'championship-annotated.png',width:1908,height:1120,sha256:'519bfebb074f430254bb281845e93d1267e353d2727a02ccf99aa3b21c335b24',alt:'锦标赛界面流程，包含活动预热、排行榜、关卡、奖励、兑换和赛季展示',text:'玩家进入独立拼词关卡收集蝴蝶，关卡结算展示本局收集反馈，阶段奖励为继续挑战提供目标。赛季结束后，领奖台集中展示获胜者，排名奖励与荣誉兑换仍可查看。'},
  {id:'word-story-excerpt',title:'分支剧情：章节详情、开始与重玩',file:'story-detail-annotated.png',width:822,height:717,sha256:'2cf5bda0c6c5a3533b5f28ef939710dd0e54daedb1d87e4254ecaa936a7c5d0c',alt:'故事详情界面旁注，解释返回、目录标题、章节上限、简介、开始与重玩',text:'角色目录汇总各条故事线。玩家在详情页查看章节与简介，选择开始或重玩，进入场景后通过对白选项推进故事。章节锁定、待更新和可重玩各有明确的状态。'},
  {id:'word-activity-excerpt',title:'活动线框：从参赛选择到阶段目标',file:'event-wireframes-annotated.png',width:908,height:1048,sha256:'bc6a877b4921773fe7f63f12d9330f888a187c9aceb3b752583baea44987272a',alt:'活动相关线框，展示达阵开启前后、活动通知、收集和主题关卡的界面布局',text:'开启前用选择面板确认参与，开启后把倒计时、阶段目标和进入关卡的按钮放在同一个面板。'},
  {id:'word-dice-excerpt',title:'投骰子玩法：从活动主界面到反馈',file:'word-dice-interaction.jpg',width:545,height:580,sha256:'ff54ce5436b6244447ef330e1ce8134e5e87b54325da22f0dd702b4643eef240',alt:'投骰子玩法交互稿，主界面连接兑换、领奖、帮助、遥控骰子与购买入口',text:'围绕棋盘推进组织投骰子、兑换、奖励和道具入口，使活动主界面、规则说明及操作反馈形成闭环；原图保留旧版示例，不作为当前经济配置。'},
];

export function renderWordExcerpts(e,base='../../') {
  return `<section class="matchmaking-design" id="word-design-excerpts" aria-labelledby="word-excerpts-title"><header><p class="eyebrow">DESIGN TO DELIVERY / Wordvillas</p><h2 id="word-excerpts-title">锦标赛与分支剧情</h2><p class="matchmaking-intro">把拼词做成可反复挑战的赛季活动，把角色故事做成可按章节游玩和重玩的体验。我负责系统与交互设计，并跟进开发测试至上线。</p></header><p class="matchmaking-boundary">资料来自 Moqups 历史设计稿，展示界面原型与团队美术。配图保留界面布局与交互旁注，最终界面以发布版本为准。</p><nav class="idiom-jumps" aria-label="Wordvillas 设计案例">${wordExcerpts.map(a=>`<a href="#${a.id}">${e(a.title.split('：')[0])} ↓</a>`).join('')}</nav>${wordExcerpts.map(a=>{
    const path=`${base}assets/project-design/word-villas/${a.file}`;
    const img=`<img src="${path}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}">`;
    return `<article class="matchmaking-map word-excerpt" id="${a.id}" aria-labelledby="${a.id}-title"><h3 id="${a.id}-title">${e(a.title)}</h3><figure><a href="${path}" aria-label="放大${e(a.title)}配图">${img}</a><figcaption>Moqups · 历史设计稿</figcaption></figure><p>${e(a.text)}</p><a class="design-original" href="${path}">查看配图（可缩放）<span aria-hidden="true">↗</span></a><details class="matchmaking-inspect"><summary>在页面内阅读${e(a.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(a.title)}大图阅读区域">${img}</div></details></article>`;
  }).join('')}</section>`;
}
