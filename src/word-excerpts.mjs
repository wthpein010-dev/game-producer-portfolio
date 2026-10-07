export const wordExcerpts = [
  {id:'word-tournament-excerpt',title:'锦标赛：入口、排行与奖励闭环',file:'word-tournament-ui-flow.jpg',width:1204,height:530,sha256:'f88f4338e14596abe32ff6887c30f3535b06e9940c5515eb1eb763ec450c9a90',alt:'锦标赛原型截图，活动通知与入口连接排行、奖励、兑换及关卡流程',text:'将活动入口、排行榜、奖励预览与关卡推进组织成一条完整路径。右侧流程补充参与和结算状态，保留历史迭代版本。'},
  {id:'word-story-excerpt',title:'分支剧情：把章节内容变成操作路径',file:'word-story-interface-detail.jpg',width:430,height:360,sha256:'1d2ae330d1b70517b7fd28a83857daec53393ed8ff59c54d7713f1191ba10cec',alt:'分支剧情详情页交互标注，包含返回、故事目录、章节进度、开始与重玩',text:'协调剧情组并设计剧情线路与系统界面；这一局部展示返回、目录、进度、开始和重玩的交互交付，不把触发推送逻辑误写为叙事分支树。'},
  {id:'word-activity-excerpt',title:'多类型活动：同一套清晰的状态表达',file:'word-activity-wireframes.jpg',width:925,height:780,sha256:'41cb1d212df8451c1d83c23072c0008e3026adf14b0aaf97b980e709350f5167',alt:'多类型活动线框稿，展示限时礼包、达阵开启前后、排行榜、收集与主题活动',text:'配合运营和 UI 完成多种活动，分别表达开启前后、活动通知、收集兑换、阶段目标和排行榜。规则与状态先行，再对齐主题包装和界面资源。'},
  {id:'word-dice-excerpt',title:'投骰子玩法：从活动主界面到反馈',file:'word-dice-interaction.jpg',width:545,height:580,sha256:'ff54ce5436b6244447ef330e1ce8134e5e87b54325da22f0dd702b4643eef240',alt:'投骰子玩法交互稿，主界面连接兑换、领奖、帮助、遥控骰子与购买入口',text:'围绕棋盘推进组织投骰子、兑换、奖励和道具入口，使活动主界面、规则说明及操作反馈形成闭环；原图保留旧版示例，不作为当前经济配置。'},
];

export function renderWordExcerpts(e,base='../../') {
  return `<section class="matchmaking-design" id="word-design-excerpts" aria-labelledby="word-excerpts-title"><header><p class="eyebrow">DESIGN TO DELIVERY / Word Villas</p><h2 id="word-excerpts-title">从设计到上线</h2><p class="matchmaking-intro">分支剧情、锦标赛、多类型活动与投骰子玩法，由我完成设计并跟进开发测试至上线。下方选取四张设计工作局部，展示规则如何落到界面和交互。</p></header><p class="matchmaking-boundary">来源：Moqups 历史设计画布精选截图。原型与迭代稿不等于最终实机截图；团队美术用于呈现交互，不认定为本人绘制。完整画布、竞品参考、内部链接及配置不公开。</p><nav class="idiom-jumps" aria-label="Word Villas 上线设计案例">${wordExcerpts.map(a=>`<a href="#${a.id}">${e(a.title.split('：')[0])} ↓</a>`).join('')}</nav>${wordExcerpts.map(a=>{
    const path=`${base}assets/project-design/word-villas/${a.file}`;
    const img=`<img src="${path}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}">`;
    return `<article class="matchmaking-map word-excerpt" id="${a.id}" aria-labelledby="${a.id}-title"><h3 id="${a.id}-title">${e(a.title)}</h3><figure><a href="${path}" aria-label="查看${e(a.title)}原图">${img}</a><figcaption>Moqups · 历史设计稿局部</figcaption></figure><p>${e(a.text)}</p><a class="design-original" href="${path}">查看原图（可缩放）<span aria-hidden="true">↗</span></a><details class="matchmaking-inspect"><summary>在页面内阅读${e(a.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(a.title)}大图阅读区域">${img}</div></details></article>`;
  }).join('')}</section>`;
}
