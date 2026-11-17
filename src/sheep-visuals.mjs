export const sheepScreens=[
  {file:'daily-entry-ui.jpg',width:289,height:627,title:'主界面与挑战入口',alt:'早期主界面效果稿，城市舞台、砖块角色与开始挑战入口',text:'将挑战、角色展示和活动入口放在同一条玩家路径中。'},
  {file:'daily-reward-ui.jpg',width:310,height:627,title:'每日小物与候选奖励',alt:'早期每日小物活动页效果稿，展示候选小物、轮播区域及挑战按钮',text:'用候选奖励建立短期目标，连接关卡挑战与外观收集。'},
  {file:'daily-result-ui.jpg',width:288,height:627,title:'获得小物与结果反馈',alt:'早期获得小物弹窗效果稿，展示小物形象、名称与确认按钮',text:'突出获得内容，区分挑战结算、奖励领取和回到活动的状态。'},
];
export const sheepFlowDetails=[
  {file:'board-prop-guidance-detail.jpg',width:560,height:470,title:'道具引导：时机、优先级与反馈',alt:'指定关卡玩法画板局部，按随机、炸弹与配对道具的使用状态触发提示并关闭提示气泡',text:'不只定义道具效果，也规定何时提示、提示持续多久、操作后如何退出提示。',points:['依次检查道具使用状态，避免多个引导同时抢占注意力。','把提示、点击、实际效果和气泡关闭连接为完整交互。'],caption:'历史玩法流程局部 · 来自指定关卡玩法画板'},
  {file:'board-revival-results-detail.jpg',width:770,height:375,title:'复活与退出：失败之后仍有明确去向',alt:'指定关卡玩法画板局部，确认结束、继续游戏、复活回调、失败结算与重新挑战分支',text:'将“卡住以后怎么办”拆成可开发、可验收的明确路径，而不是只设计一个失败弹窗。',points:['区分结束、继续、复活成功和失败结算。','复活结果与道具效果确认后，再恢复关卡交互。'],caption:'历史玩法流程局部 · 复活、结算与重试分支'},
];
const base='../../assets/project-design/sheep-match/';
export function renderSheepScreens(e){
  return `<section class="sheep-visuals" id="sheep-visuals" aria-labelledby="sheep-visuals-title"><header class="section-head"><div><p class="eyebrow">INTERFACE / PLAYER JOURNEY</p><h2 id="sheep-visuals-title">从挑战入口到奖励反馈</h2></div><p>早期界面方案 · 团队美术效果</p></header><div class="sheep-screen-strip" tabindex="0" role="region" aria-label="界面素材图"><div class="sheep-screen-grid">${sheepScreens.map(item=>`<figure><a href="${base+item.file}" aria-label="查看${e(item.title)}原图"><img src="${base+item.file}" width="${item.width}" height="${item.height}" decoding="async" alt="${e(item.alt)}"></a><figcaption><h3>${e(item.title)}</h3><p>${e(item.text)}</p></figcaption></figure>`).join('')}</div></div><p class="record-source">界面摘自已授权的小物好运局早期流程稿，不作为当前正式版实机；新版每日小物采用通关得券、主动抽奖。个人策划职责与团队美术执行分开说明。</p></section>`;
}
export function renderSheepFlowGallery(e){
  return `<section class="sheep-flow-gallery" id="sheep-flow-gallery" aria-labelledby="sheep-flow-title"><header class="section-head"><div><p class="eyebrow">RULES / FEEDBACK</p><h2 id="sheep-flow-title">把规则落到每一步反馈</h2></div><p>指定画板精选 · 按设计问题展开</p></header>${sheepFlowDetails.map((item,n)=>`<article class="sheep-flow-detail" id="sheep-flow-${n+1}"><figure><a href="${base+item.file}" aria-label="查看${e(item.title)}原图"><img src="${base+item.file}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${e(item.alt)}"></a><figcaption>${e(item.caption)}</figcaption></figure><div class="sheep-flow-copy"><h3>${e(item.title)}</h3><p>${e(item.text)}</p><ul>${item.points.map(point=>`<li>${e(point)}</li>`).join('')}</ul><a class="design-original" href="${base+item.file}">查看原图 ↗</a></div></article>`).join('')}<p class="record-source">保留画板对应的历史规则与分支，不将旧版道具流程标为第二版入槽配对的实机；改版判断与测试成果见下方案例。</p></section>`;
}
