// Public responsibilities only; project documents and internal records stay private.
export const sheepEvidenceAssets=[];
export const sheepEvidenceCases=[
  {id:'sheep-product-case',title:'玩法与系统设计',text:'负责玩法体验、系统需求与交互反馈设计，将设计目标整理为团队可执行、可验收的工作。'},
  {id:'sheep-revision-case',title:'体验迭代',text:'结合体验测试与反馈梳理问题，确定调整优先级，协调研发实现并复核操作体验。'},
  {id:'sheep-release-case',title:'研发与版本交付',text:'承担任务拆分、排期协调、跨岗位联调与组内验收，推进微信、抖音平台的研发交付。'}
];
export function renderSheepEvidence(e){
  return `<section class="matchmaking-design" id="sheep-evidence" aria-labelledby="sheep-evidence-title"><header><p class="eyebrow">DESIGN / DELIVERY</p><h2 id="sheep-evidence-title">设计与研发推进</h2><p>围绕玩法体验、团队协作与交付验收介绍个人职责。</p></header><div class="matchmaking-map-notes">${sheepEvidenceCases.map(item=>`<article id="${item.id}"><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('')}</div></section>`;
}
