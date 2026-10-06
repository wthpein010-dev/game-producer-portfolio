// Curated project references. Originals and complete internal documents stay private.
export const idiomAssets = [
  {file:'challenge-board.png',width:514,height:914,sha256:'5be7c5e0946ac5fc9cfd036984179720cb57babeb5ef73def666ecf8a63baa9a',source:'《每日挑战系统设计》嵌入界面参考',alt:'每日挑战文档中的填字界面参考：上方交叉字块、下方候选字与提示入口'},
  {file:'growth-flow.png',width:472,height:768,sha256:'4e2cb1608ee4e8d7339946ce5e20b053603eec3967f689df2d48f5dde0831c23',source:'《养成玩法系统设计》嵌入流程图',alt:'养成系统原始流程示意：主界面、体力不足提示、答题与结算之间的跳转关系'},
  {file:'creator-flow.png',width:1351,height:758,sha256:'9d1e39cce951104c8277296ebba9407f4ab68b224343b2e44921f3a2337acd1f',source:'《每日挑战系统设计》创建关卡流程图',alt:'玩家创建挑战关卡原始流程图：选择成语、上一步、退出确认、发布、邀请好友与查看排行'},
  {file:'collection-flow.png',width:1259,height:718,sha256:'1b67a30bda11573e6847b49a79692d74a6804af027af4df47877c8c4e4a07f66',source:'《成语生词本设计》嵌入交互图',alt:'生词本原始交互图：结算查看释义、添加收藏、已加入状态、菜单红点与字母分类列表'},
  {file:'home-reference.png',width:323,height:575,sha256:'27f3025d074723d9aa145cb6b85d176ee2fa93927690aec7f2476211d058eff3',source:'《每日挑战系统设计》嵌入主界面参考',alt:'项目文档中的主界面参考：成长场景、角色形象、答题按钮及每日挑战入口'},
  {file:'definition-ui.png',width:1280,height:2800,sha256:'2aa642f3c3661629627cc511e6908bf2d2307b707dd4f11a5e03b75db429a6eb',source:'项目 UI 美术资源中的释义界面',alt:'项目释义界面美术资源：成语标题、拼音、释义、出处及分享按钮的竖屏信息层级'},
];
const asset = file => idiomAssets.find(item=>item.file===file);
const imagePath = (base,file) => `${base}assets/project-design/idiom-scholar/${file}`;
function imageMarkup(file,e,base) {
  const item=asset(file);
  return `<img src="${imagePath(base,file)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${e(item.alt)}">`;
}
function reference(file,title,e,base) {
  const item=asset(file),path=imagePath(base,file);
  return `<figure class="idiom-reference"><a href="${path}" aria-label="查看${e(title)}原图">${imageMarkup(file,e,base)}</a><figcaption><span>${e(item.source)}</span><a href="${path}">查看原图 ↗</a></figcaption></figure>`;
}
function inspect(file,title,e,base) {
  return `<details class="idiom-inspect"><summary>展开${e(title)}大图</summary><div class="idiom-image-scroll" tabindex="0" role="region" aria-label="${e(title)}大图阅读区域">${imageMarkup(file,e,base)}</div></details>`;
}
function evidence({id,title,file,problem,decisions,output},e,base) {
  return `<article class="idiom-evidence" aria-labelledby="${id}-title">${reference(file,title,e,base)}<div class="idiom-evidence-copy"><h3 id="${id}-title">${e(title)}</h3><h4>设计问题</h4><p>${e(problem)}</p><h4>关键方案</h4><ul>${decisions.map(text=>`<li>${e(text)}</li>`).join('')}</ul><h4>文档产出</h4><p>${e(output)}</p></div>${inspect(file,title,e,base)}</article>`;
}
export function renderIdiomOverview(e,base='../../') {
  return `<section class="idiom-overview" aria-labelledby="idiom-overview-title"><div><p class="eyebrow">PROJECT BRIEF / 成语填字与成长</p><h2 id="idiom-overview-title">从填字规则到成长反馈</h2><p>以选字填空为核心，通过角色与房屋成长连接持续闯关，再以每日挑战、玩家创建关卡和生词本扩展内容与复习路径。</p><p>我的任职角色：主策划，2018.02—2019.08。以下以项目资料展开系统、玩法和交互设计讨论。</p><nav class="idiom-jumps" aria-label="成语小秀才设计资料"><a href="#idiom-systems">系统策划 ↓</a><a href="#idiom-gameplay">玩法设计 ↓</a><a href="#idiom-interaction">UI/UE 交互 ↓</a><a href="${base}projects/idiom-scholar/design-summary/">文档摘要 ↗</a></nav></div>${reference('challenge-board.png','填字界面',e,base)}</section>`;
}
export function renderIdiomCompanyEntry() {
  return `<section class="idiom-company-entry" aria-labelledby="idiom-company-title"><div><p class="eyebrow">PROJECT EVIDENCE / 成语小秀才</p><h2 id="idiom-company-title">系统、玩法与交互资料</h2><p>从成长循环、玩家创建关卡，到字块判定、新手引导与生词本，阅读具体的设计规则与界面流程。</p></div><a class="text-link" href="../../projects/idiom-scholar/#idiom-design">查看成语项目资料 ↗</a></section>`;
}
export function renderIdiomDesign(e,base='../../') {
  return `<section class="idiom-design" id="idiom-design" aria-labelledby="idiom-design-title">
    <div class="section-head"><div><p class="eyebrow">DESIGN EVIDENCE / 项目资料</p><h2 id="idiom-design-title">成语项目设计资料<span class="title-dot">.</span></h2></div><p>系统规则、玩法状态与界面流程。</p></div>
    <p class="idiom-boundary">任职与项目参与依据本人已确认履历。以下为项目文档摘要和界面参考，文档元数据不能单独证明具体作者；不将全部方案归为个人独立完成。美术执行由团队相应岗位承担。方案图不代表所有功能最终上线，图中的示例排名、奖励与时间不作为经营成果。</p>
    <nav class="idiom-jumps" aria-label="设计资料分类"><a href="#idiom-systems">系统策划</a><a href="#idiom-gameplay">玩法设计</a><a href="#idiom-interaction">UI/UE 交互</a><a href="#idiom-assets">界面资源</a></nav>
    <section class="idiom-chapter" id="idiom-systems" aria-labelledby="idiom-systems-title"><p class="eyebrow">SYSTEM DESIGN</p><h2 id="idiom-systems-title">系统策划</h2><p class="idiom-chapter-lead">不只列出功能，还要说明进度如何记录、状态如何转换，以及失败或中断后怎样继续。</p>
      ${evidence({id:'idiom-growth',title:'答题与成长循环',file:'growth-flow.png',problem:'如何让短关卡的完成形成可感知的成长，并保持入口、体力和进度逻辑一致？',decisions:['将关卡区分为已完成、未完成和未解锁；已经解锁的未完成关卡保留填字状态，再次进入不重复扣除解锁消耗。','通关后判断成长事件，在返回入口显示红点；回到主界面后点亮升级按钮，并显示距离下一次成长的目标。','多个成长事件按顺序处理；升级动画被切换界面或退出打断时，下次直接展示升级后的资源。'],output:'《养成玩法系统设计》包含关卡状态、进入条件、成长事件顺序、红点规则，以及界面和动画需求。示意图是方案参考，不是实际成绩报告。'},e,base)}
      ${evidence({id:'idiom-creator',title:'每日挑战与玩家创建关卡',file:'creator-flow.png',problem:'如何在核心填字之外组织每日内容，并让玩家可创建、发布和分享挑战？',decisions:['每日挑战说明入口解锁、计时、结算与排行榜；区分有数据和空榜，处理每日刷新时仍处于旧挑战的情况。','创建关卡按成语共用字连接，检查相邻限制与答题区边界；无候选项时提示回到上一步，未完成退出时确认是否放弃。','发布后连接好友挑战与本关排行；将新手未完成、功能未解锁、已经完成和未授权等分支分别说明。'],output:'《每日挑战系统设计》交付常规流程、创建与撤回路径、授权分支、空榜状态、难度约束及 UI/音效需求；概率和后端配置不在此公开。'},e,base)}
    </section>
    <section class="idiom-chapter" id="idiom-gameplay" aria-labelledby="idiom-gameplay-title"><p class="eyebrow">GAMEPLAY RULES</p><h2 id="idiom-gameplay-title">玩法设计</h2><p class="idiom-chapter-lead">把“选字填空”写成可实现、可检查的操作与判定规则。</p>
      <div class="idiom-rules"><div><h3>字块状态与反馈</h3><p>上方为答题区，下方为待填区。玩家先选择目标格，再选择汉字；组成成语后触发判定。</p><table><caption>《填字核心玩法文档说明》规则摘要</caption><thead><tr><th scope="col">字块状态</th><th scope="col">操作与反馈</th></tr></thead><tbody><tr><th scope="row">空白</th><td>可选择，显示当前目标。</td></tr><tr><th scope="row">固定</th><td>由关卡给定，不可选择或撤回。</td></tr><tr><th scope="row">已填</th><td>点击撤回到待填区，重新选择。</td></tr><tr><th scope="row">判定正确</th><td>整组成语变为绿色固定状态。</td></tr><tr><th scope="row">判定错误</th><td>变红并晃动，保留撤回机会。</td></tr></tbody></table><p>文档还区分选择、填入、正确、错误与提示音效；判定音覆盖普通点击音，多个判定同时触发时避免重复播放。</p></div><aside><h3>从规则到交付</h3><dl><div><dt>输入</dt><dd>关卡布局、固定字与候选字。</dd></div><div><dt>操作</dt><dd>选择目标、填入、撤回、使用提示。</dd></div><div><dt>判定</dt><dd>普通关逐组成语判断；每日挑战全部填满后整体判断。</dd></div><div><dt>反馈</dt><dd>字块状态、颜色、动画和音效共同表达结果。</dd></div></dl><p class="idiom-source">资料依据：《填字核心玩法文档说明》《每日挑战系统设计》。规则摘要由本站整理，并非新的游戏演示。</p></aside></div>
    </section>
    <section class="idiom-chapter" id="idiom-interaction" aria-labelledby="idiom-interaction-title"><p class="eyebrow">UI / USER EXPERIENCE</p><h2 id="idiom-interaction-title">UI/UE 交互设计</h2><p class="idiom-chapter-lead">兼顾界面密度、第一次操作、错误后的恢复，以及完成后的学习路径。</p>
      ${evidence({id:'idiom-collection',title:'从结算到收藏复习',file:'collection-flow.png',problem:'如何让玩家看完答案后继续查看释义，并保存不熟悉的成语？',decisions:['结算中的成语可进入释义，再添加到生词本；添加成功后按钮切换为已加入状态。','从主界面折叠菜单进入生词本，按首字母分组；点选词条复用释义界面，不另造一套详情。','补充删除与还原状态；收藏变化通过入口红点反馈，并明确查看后红点消失的时机。'],output:'《成语生词本设计》包含双入口路径、收藏/删除状态、字母分组、详情复用和红点迭代说明。'},e,base)}
      <div class="idiom-ux-pair"><article><h3>根据内容密度调整字块</h3><p>《适配答题界面字块布局》按题面占用与候选字数量切换布局，让稀疏题面使用更大的字块。</p><table><caption>文档中的布局组合</caption><thead><tr><th scope="col">答题区</th><th scope="col">候选字区</th></tr></thead><tbody><tr><td>7 × 7</td><td>6 × 2</td></tr><tr><td>8 × 8</td><td>7 × 3</td></tr><tr><td>9 × 9</td><td>8 × 4</td></tr></tbody></table><p>说明中明确上方横纵尺寸的判断条件，以及候选字较少时的放大方式；不是单纯按屏幕比例缩放。</p></article><article><h3>强引导之后，留出自主操作</h3><p>《新手引导说明》先指定一次选字，再让玩家自由填完；随后连接返回、晋升和继续答题，完整展示一次成长反馈。</p><ol><li>第一次选字：强引导演示填入。</li><li>完成关卡：弱提示下自主操作。</li><li>返回与晋升：连接答题和成长。</li><li>首次填错：提示点击错字撤回。</li><li>首次停滞：提示可用的帮助入口。</li></ol><p>补充提示出现、关闭和不再重复的条件，避免引导持续遮挡操作。</p></article></div>
    </section>
    <section class="idiom-chapter" id="idiom-assets" aria-labelledby="idiom-assets-title"><p class="eyebrow">INTERFACE REFERENCES</p><h2 id="idiom-assets-title">界面与美术资源</h2><p class="idiom-chapter-lead">主界面承载成长目标和功能入口，释义界面组织标题、拼音、解释与出处。两张图用于对照信息层级，不用于认定个人美术制作。</p><div class="idiom-assets-grid">${reference('home-reference.png','主界面参考',e,base)}${reference('definition-ui.png','释义界面资源',e,base)}</div></section>
    <details class="idiom-document-index"><summary>资料来源与公开范围</summary><ul><li>系统：养成玩法系统设计、每日挑战系统设计。</li><li>玩法：填字核心玩法文档说明。</li><li>交互：适配答题界面字块布局、新手引导说明、成语生词本设计。</li><li>资源：上述文档的精选嵌入图片，以及项目 UI 释义界面资源。</li></ul><p>本文展示经筛选的图文与重新整理的规则摘要，不提供完整内部文档、配置表、统计报表或第三方素材库。历史方案中的目标不作为已达成指标，迭代设想不等于最终上线内容。</p></details>
  </section>`;
}
