import {townSupplementCases,renderMuyouCase} from './muyou-evidence.mjs';
// Reviewed historical references, not performance or individual authorship claims.
export const townMaps = [
  {id:'town-navigation',title:'从小镇地图到建店与招募',file:'town-navigation-annotated.png',width:1307,height:1085,sha256:'43156a576de93f318a9aa05108d8c4be66ab88fd6cacdbfb0fdbc949fadb4d4c',alt:'八张小镇历史界面与跳转箭头，包括地图、店铺选择和详情、图鉴、任务、顾客、升级与离线收益',question:'怎样让玩家在小镇主场景里知道下一步可以做什么？',points:['点击空地进入店铺选择，点击已建店铺查看经营详情。','店铺列表展示建筑外观与占用状态，方便比较可选建筑。','招募面板以角色卡片呈现候选顾客，确认后回到经营场景。'],output:'界面总览保留各功能的标题和地图至店铺、任务、招募的跳转箭头。'},
  {id:'town-shop-supply',title:'店铺供货、工厂生产与货物升级',file:'town-supply-annotated.png',width:2459,height:615,sha256:'fb19b0c7728aca22c7780fa12fbe46fb4654f444f7940075b9a6644ea3ac34b7',alt:'带箭头和旁注的店铺供应设计稿，说明在售和待上架、工厂材料与货物升级状态',question:'如何把店铺销售和加工厂生产的不同流程做成容易理解的操作？',points:['店铺区分在售与待上架商品，补货和等待上架各有对应的界面反馈。','工厂分别展示待加工材料和已生产的产出，方便检查生产状态。','升级面板突出当前选中的货物，并通过灰度与锁定标记传达可操作状态。'],output:'从左到右对照已建店铺、加工厂、材料生产和货物升级，并用箭头标注各项操作。'},
  {id:'town-onboarding',title:'新手引导与经营循环',file:'onboarding.jpg',width:1492,height:967,sha256:'ce9929c29be6491f2a68d3a8ecb4b065ae9c5735306a4fb9dbde4b52244b8ecf',alt:'我的小镇游戏流程：启动加载、首次CG、未完成引导检查、建造商店、生产商品、招募顾客、加工厂、员工与经营成长循环',question:'首次进入如何逐步建立经营认知，中断后又怎样回到尚未完成的步骤？',points:['从启动和加载进入首次体验判定，将世界介绍、建造商店、商品生产与顾客招募按顺序连接。','图中保留未完成引导的检查和中断后恢复分支，避免首次体验只考虑理想路径。','常规循环由建造、补货、顾客和收益连接升级；更高等级的商店、顾客、任务、宝藏、故事与图鉴成为扩展目标。','退出流程区分确认和取消返回，说明入口之外的结束路径。'],output:'流程图覆盖首次进入、引导步骤、恢复分支、常规经营及退出，可作为策划、程序和测试对齐流程的讨论依据。'},
  {id:'town-task-states',title:'任务宝箱与重置确认',file:'town-tasks-annotated.png',width:1550,height:1505,sha256:'178f92a2b55114569c90a41e9945d9c882eccf674613bd0ca5b274e8b22144d9',alt:'任务界面、各类宝箱状态及更换任务、任务重置和宝箱已满的确认弹窗',question:'怎样让玩家看清宝箱当前可做什么，以及重置任务会影响什么？',points:['待开启时提供开启按钮，开启中显示进度与加速入口，完成后切换为领取。','任务按新手、主线、限时和日常组织，进度条与开始或重试按钮说明当前进度。','重置前明确提示计时和进度都会受影响，玩家可确认或取消。'],output:'上图标注任务与宝箱各状态，下图对照更换、重置、立即开箱和宝箱已满时的确认界面。'},
];

export function renderTownCompanyEntry() {
  return `<section class="idiom-company-entry" aria-labelledby="town-company-title"><div><p class="eyebrow">PROJECT EVIDENCE / 我的小镇</p><h2 id="town-company-title">经营循环与交互资料</h2><p>从新手进入、经营成长到任务与宝藏状态，阅读具体的流程图与界面线框。</p></div><a class="text-link" href="../../projects/my-town/#town-design">查看小镇项目资料 ↗</a></section>`;
}

export function renderTownDesign(e,base='../../') {
  return `<section class="matchmaking-design" id="town-design" aria-labelledby="town-design-title"><header><p class="eyebrow">SYSTEM / GAMEPLAY / UI·UE</p><h2 id="town-design-title">我的小镇 · 设计资料</h2><p class="matchmaking-intro">从小镇地图选址开店，安排货物生产与上架，再通过顾客招募和任务奖励推动经营。下面用历史界面稿展示各环节的操作。</p></header><p class="matchmaking-boundary">我的任职角色：主策划，2021.05—2022.07。资料来自用户指定的牧游科技项目目录与提供的历史截图；下方为本站整理的阅读摘要，不认定全部方案由个人独立完成，团队美术产出不归为个人美术执行。历史设计图不代表全部功能最终上线，示例数值不是经营成果。</p><nav class="idiom-jumps" aria-label="小镇设计资料">${[...townMaps,...townSupplementCases].map(item=>`<a href="#${item.id}">${e(item.title)} ↓</a>`).join('')}<a href="${base}projects/my-town/design-summary/">设计摘要 ↗</a></nav>
  <section class="idiom-chapter" id="town-player-path" aria-labelledby="town-player-path-title">
    <h3 id="town-player-path-title">从开第一家店到领任务奖励</h3>
    <p class="idiom-chapter-lead">第一轮经营依次让玩家认识地图入口、商品状态和任务回报。下列步骤可与各阶段的历史标注图对照阅读。</p>
    <ol>
      <li><a href="#town-navigation">从地图建店</a>。点空地挑选店铺，建成后点回同一位置查看店铺、顾客容量和在售货物，让地图成为后续操作入口。</li>
      <li><a href="#town-shop-supply">制作并上货</a>。加工界面区分待加工材料和已产出货物，店铺则把待上架与正在出售分开。玩家能判断下一步是生产、补货还是等待。</li>
      <li><a href="#town-task-states">完成任务并处理奖励</a>。任务面板显示进度，完成后进入领奖。宝箱依次显示待开启、倒计时和可领取，位置已满时先提示奖励取舍再让玩家确认。</li>
    </ol>
    <p class="matchmaking-boundary">以上按《游戏流程》及团队历史界面稿整理。本人的策划分工包含新手引导、任务与宝箱，以及配套数值。</p>
  </section>
  ${townMaps.map(item=>{
    const image=`${base}assets/project-design/my-town/${item.file}`;
    const attrs=`src="${image}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${e(item.alt)}"`;
    return `<article class="matchmaking-map" id="${item.id}" aria-labelledby="${item.id}-title"><h3 id="${item.id}-title">${e(item.title)}</h3><figure><a href="${image}" aria-label="放大${e(item.title)}配图"><img ${attrs}></a><figcaption>我的小镇 · 项目历史设计截图</figcaption></figure><div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(item.question)}</p><h4>图示产出</h4><p>${e(item.output)}</p></div><div><h4>关键方案</h4><ul>${item.points.map(point=>`<li>${e(point)}</li>`).join('')}</ul></div></div><a class="design-original" href="${image}">查看配图（可缩放）<span aria-hidden="true">↗</span></a><details class="matchmaking-inspect"><summary>在页面内阅读${e(item.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(item.title)}大图阅读区域"><img ${attrs}></div></details></article>`;
  }).join('')}${townSupplementCases.map(item=>renderMuyouCase(item,e,base)).join('')}<p class="matchmaking-boundary">项目目录包含系统框架、游戏流程与美术资源需求。界面配图保留线框、跳转箭头和操作说明，部分示例数值已遮盖。系统框架、物品数值与交付计划依据历史资料整理。</p></section>`;
}
