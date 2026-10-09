export const muyouAssets = [
 {path:'my-town/system-framework.png',width:1710,height:1467,sha256:'a81484b36b803923a54ed028beea82801287e607e3a5cb55387f037fc3f9df1a',source:'《系统框架》PDF 第 1 页忠实渲染',alt:'我的小镇系统导图：店铺、顾客、玩家、货币、宣传单和宝箱任务之间的关系'},
 {path:'zuoyaoji-x/shield-ui.png',width:814,height:754,sha256:'548eaf00aa9e1103a3eed9157d73a2a782e4efe48f04e80eb0de0073297cfc3d',source:'《魔罩系统文档》原始嵌入图 5',alt:'魔罩界面标注：阵位切换、当前与下级属性、材料、进阶及返回'},
 {path:'zuoyaoji-x/pet-growth.png',width:941,height:703,sha256:'60cf5fc82cd14062f8b540e1235debc18fefc435190058cffd9e828fdb2bcac2',source:'《魔宠系统文档（第2版）》原始嵌入图 1',alt:'魔宠培养界面标注：列表、上阵、属性对比、技能、等级条件及升级升星'},
 {path:'zuoyaoji-x/pet-formation.png',width:599,height:648,sha256:'60c6245622d60810b6fac32f4f8eee109bbc27421364f293655dbd91e5b9d659',source:'《魔宠系统文档（第2版）》原始嵌入图 13',alt:'魔宠上阵调整界面：当前阵容、数量限制、已添加及未获得状态'},
];

export const townSupplementCases = [
 {id:'town-framework',title:'系统框架：从经营到成长',asset:0,intro:'让店铺、顾客和成长资源形成相互支撑的系统，而非堆叠功能。',points:['店铺承接建造、货物与效率功能，顾客需求连接消耗和收益。','知名度连接玩家成长，成长再影响店铺与顾客的开放范围。','任务与宝箱提供阶段目标，宣传单连接顾客招募。'],output:'经营系统关系与资源产消框架；原图为历史方案，示例数量和档位不代表最终版本。'},
 {id:'town-economy',title:'数值配置：成本、收益与等级曲线',intro:'把经营投入和成长回报整理为可对照的配置口径。',points:['按建筑组织货物，拆分售价、造价、数量与盈利。','对照等级售价、基础与满级收益，保留旧版和新版方案。','按组汇总成本、盈利与均值系数，支持横向检查。'],output:'《物品数值》表包含货物、升级售价及转置视图；本页只重组字段关系，不公开数值、公式参数或完整配置。',rows:[['货物基础','售价 · 造价 · 数量','统一经营收益口径'],['成长配置','等级 · 售价 · 收益','对照投入与成长回报'],['分组检查','成本 · 盈利 · 均值','比较不同建筑的配置结构']]},
 {id:'town-delivery',title:'策划交付：任务拆分与版本计划',intro:'从玩法和系统方案进入文档、资源需求与研发衔接。',points:['负责人记录支持任务与宝箱、图鉴、新手、文案和角色美需分工。','数值工作覆盖产出消耗、建筑与货物价格及增益效果。','按筹备、实施和验收组织任务，区分历史完成、进行中与待启动。'],output:'《项目甘特图》明确记录本人策划工作项；工程验收行当时为待启动且无具体任务，不据此声称已完成验收、实际工期或正式上线。',rows:[['基础与方向','基础文档 · 主题','文档完成，主题进行中'],['功能与体验','任务宝箱 · 图鉴 · 新手','历史记录为完成'],['内容与资源','文案 · 角色美需','历史记录为完成'],['数值设计','产消 · 价格 · 增益','历史记录为进行中']]},
];

export const zuoyaoCases = [
 {id:'zuoyao-shield',title:'魔罩：成长条件与交互反馈',asset:1,intro:'新增生存向培养线，并把提升条件转为可理解的界面反馈。',points:['区分未解锁、可提升、材料不足和满级等状态。','对照当前与下级属性，材料入口连接获取途径。','红点从功能向阵容入口传递，并补齐引导、资源和埋点需求。'],output:'署名文档创建及材料途径修订记录支持本人方案产出；材料产出仍含待定项，不宣称最终投放或商业结果。'},
 {id:'zuoyao-pet-growth',title:'魔宠：培养规则与战斗作用',asset:2,intro:'把收集、培养和战斗作用连接为长期目标。',points:['区分升级与升星：属性、品质和技能承担不同成长作用。','材料、队伍等级和星级共同约束升级，条件不足有明确反馈。','以图鉴、获取途径和属性预览支持选择，红点和引导提示可操作内容。'],output:'正文署名及第 2 版修订记录支持品质、战力与培养材料设计工作；不公开战力公式、技能参数或商业配置。'},
 {id:'zuoyao-pet-formation',title:'阵容：选择顺序与状态边界',asset:3,intro:'让培养成果进入阵容选择和战斗释放次序。',points:['阵容达到上限后进入调整弹窗，区分已添加、可添加与未获得。','展示顺序与战斗技能释放顺序对应，明确伙伴和魔宠的行动衔接。','图鉴、帮助和升星预览补充解释层，避免主界面承载全部信息。'],output:'交付上阵调整规则、界面标注与战斗顺序说明；团队美术为历史参考，不归为本人绘制。'},
];

export function renderMuyouCase(item,e,base) {
 const asset=item.asset===undefined?null:muyouAssets[item.asset];
 const image=asset?`${base}assets/project-design/${asset.path}`:null;
 const img=asset?`<img src="${image}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async" alt="${e(asset.alt)}">`:'';
 return `<article class="matchmaking-map" id="${item.id}" aria-labelledby="${item.id}-title"><h3 id="${item.id}-title">${e(item.title)}</h3><p>${e(item.intro)}</p>${asset?`<figure><a href="${image}" aria-label="查看${e(item.title)}原图">${img}</a><figcaption>${e(asset.source)} · 历史设计参考</figcaption></figure>`:`<div class="muyou-evidence-table"><table><caption>依据原表整理的阅读摘要 · 非原始表格截图</caption><thead><tr><th scope="col">设计分区</th><th scope="col">工作内容</th><th scope="col">${item.id==='town-delivery'?'历史记录':'设计用途'}</th></tr></thead><tbody>${item.rows.map(row=>`<tr><th scope="row">${e(row[0])}</th><td>${e(row[1])}</td><td>${e(row[2])}</td></tr>`).join('')}</tbody></table></div>`}<div class="matchmaking-map-notes"><div><h4>设计工作</h4><p>${e(item.intro)}</p><h4>文档产出</h4><p>${e(item.output)}</p></div><div><h4>关键取舍</h4><ul>${item.points.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div></div>${asset?`<a class="design-original" href="${image}">查看原图（可缩放） ↗</a><details class="matchmaking-inspect"><summary>在页面内阅读${e(item.title)}大图</summary><div class="matchmaking-scroll" tabindex="0" role="region" aria-label="${e(item.title)}大图">${img}</div></details>`:''}</article>`;
}

export function renderZuoyaoDesign(e,base='../../') {
 return `<section class="matchmaking-design" id="zuoyao-design" aria-labelledby="zuoyao-design-title"><header><p class="eyebrow">GROWTH / BATTLE / UI·UE</p><h2 id="zuoyao-design-title">作妖计 · 成长系统设计</h2><p class="matchmaking-intro">从培养规则到战斗与界面交付，展示魔罩、魔宠的具体策划工作。</p></header><p class="matchmaking-boundary">主策划任期：2021.05—2022.07。两份文档正文均署名“文档撰写人：吴天昊”，并有本人创建和修订记录。项目按用户确认名称展示；资料目录保留“作妖记x”等历史命名，不据此推定正式版本更名。文档证明方案产出，不单独证明最终上线或商业效果；团队美术为原文历史界面参考，不归为个人绘制。</p><nav class="idiom-jumps" aria-label="作妖计资料">${zuoyaoCases.map(c=>`<a href="#${c.id}">${e(c.title)} ↓</a>`).join('')}<a href="${base}projects/zuoyaoji-x/design-summary/">设计摘要 ↗</a></nav>${zuoyaoCases.map(c=>renderMuyouCase(c,e,base)).join('')}<p class="matchmaking-boundary">资料来源：《魔罩系统文档》《魔宠系统文档（第2版）》。仅展示审核后的界面图与规则摘要，不公开完整原件、配置及内部数据。</p></section>`;
}

export function renderZuoyaoCompanyEntry(){
 return `<section class="idiom-company-entry" aria-labelledby="zuoyao-company-title"><div><p class="eyebrow">AUTHORED DESIGN / 作妖计</p><h2 id="zuoyao-company-title">署名成长系统与 UI/UE</h2><p>魔罩培养、魔宠成长及阵容选择，从规则细化到界面与资源需求。</p></div><a class="text-link" href="../../projects/zuoyaoji-x/#zuoyao-design">查看作妖计策划资料 ↗</a></section>`;
}
