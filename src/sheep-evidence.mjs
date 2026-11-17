export const sheepEvidenceAssets = [
  {file:'editor-workflow.jpeg',width:2560,height:176,sha256:'16686eb18f5cfb4607cf36cf63755138db5be56e1fc0e40195b86ac79491aa96',alt:'关卡编辑器流程：新建与摆放、层级调整、校验、保存编辑器数据、导出运行时数据、试玩及返回修改'},
  {file:'login-flow.jpeg',width:2560,height:2032,sha256:'32bbe355d052c54ce22a919db33ea6a23754cb48517a00a5eafc54ee5b984cad',alt:'登录授权设计原图：新用户先进入关卡，新老用户分流、结算返回与主动点击入口后触发微信授权'},
  {file:'board-no-pair-decision-detail.jpg',width:805,height:505,sha256:'04ed2112914458334241b057d836ca3a00489ff7be5ef99bdea1d6c6c28d39d5',caption:'旧版玩法画板局部 · 无配对与槽位道具判断 · 非第二版实机',alt:'旧版判定流程局部：先检查可配对砖块，再检查临时槽位与槽位道具，说明系统如何提示无牌可消并引导解困'},
  {file:'collection-system-map.png',width:2560,height:1830,sha256:'a9484774673f8853c5c9b79025957d1c0390b2b669c1b40bea6a4808d2b65b57',caption:'图鉴功能文档 · 系统导图原图（仅裁去底部空白）· 交易市场不在该版本范围',alt:'图鉴系统导图：长期收集与个性展示、砖块小人与随身小物、入口与页面恢复、草稿与正式资产、赠送及研发支撑'},
  {file:'collection-interface-flow.png',width:2560,height:1940,sha256:'ea353e4e791f105eb6a2ead0c631417b5dfcda8e717d3f5667552c07afa64413',caption:'图鉴功能文档 · 系统流程与界面串联原图（仅裁去底部空白）· 团队 UI 设计，非交易市场实机',alt:'换装系统界面流程：主界面入口至角色列表、详情、随身小物搭配、仓库与赠送弹窗，以及未保存时的保存确认'},
];

export const sheepEvidenceCases = [
  {id:'sheep-product-case',title:'产品方向与核心体验收口',
    question:'怎样在有限研发资源下，确定优先做好的体验，而不是持续扩充功能？',
    points:['以双牌配对消除降低理解成本，用首关上手、第二关挑战和城市搬砖包装组织核心体验。','立项资料以核心关卡、主界面、反馈和稳定性作为阶段重点；关卡文档细化点击拖拽、遮挡、道具、复活和结算状态。'],
    output:'把产品方向落为阶段范围、优先级与验收要求。不同日期的道具方案有变化，保留版本差异，不将早期规则当成当前最终规则。',
    source:'《羊了个羊：对对碰》立项策划案、关卡玩法。立项案包含 AI 辅助整理，范围按其对应阶段阅读。'},
  {id:'sheep-revision-case',title:'玩法改版：让失败风险看得见',asset:2,
    question:'棋盘直接配对的失败判定，为什么与玩家感受到的节奏和难度不匹配？',
    points:['第一版在棋盘中直接配对；无牌可消时，玩家被动接受系统按规则给出的失败处理。上图保留旧版无解与临时槽位道具判断的局部，说明调整前的判定链路。','我将第二版改为先入槽、再配对消除，槽位满时失败，让压力随选牌与占位逐步累积，使玩家能预判风险并在配对和保留空间之间取舍。第二关难度飞升为既定模式，不归为我的决策。'],
    output:'本人确认：第二版测试后，次日留存和人均挑战次数明显提升。该结果为定性反馈，未提供对照周期和具体提升比例，不将同期其他变化排除后作单一因果结论。',
    source:'本人于 2026-11-16 确认改版决策及测试反馈；关卡玩法画板局部截图经本人授权展示。画板记录旧版与道具流程演进，不是第二版实机或统计报表。'},
  {id:'sheep-editor-case',title:'关卡编辑器与策划生产闭环',asset:0,
    question:'怎样让策划可调整关卡，同时避免编辑器和游戏运行结果不一致？',
    points:['分离编辑器保存数据和运行时导出数据；明确坐标、层级、遮挡、特殊砖块与数量校验。','要求手动摆放不被保存、导出或试玩随机改写；通过可点击预览、类型统计和试玩回到调整环节。'],
    output:'交付编辑流程、数据约束与游戏内一致性验收清单。偶数校验是基础检查，不等于保证可解；文档仍有待验收项，不宣称所有编辑器能力均已完成。',
    source:'麻将关卡编辑器系统策划需求文档。原图为设计流程，不是工具实机截图。'},
  {id:'sheep-daily-case',title:'每日小物：常驻挑战与奖励承接',
    question:'怎样在主玩法之外增加每日目标，同时让挑战进度和奖励消费互不干扰？',
    points:['独立两关挑战通关后获得兑换券，余额跨天累计；挑战完成与主动抽奖是两个独立操作。','失败保留对应进度，换批只调整候选池；覆盖跨日、广告未知结果、断网恢复和重复回调，分享重置周期保留待核实状态。'],
    output:'把资格、余额、候选池和发奖分别定义为状态，并提供前后端分工、配置与异常验收。通关率属于设计目标，不写成实测结果。',
    source:'【常驻玩法】每日小物。新版规则与下方早期“小物好运局”图分开阅读。'},
  {id:'sheep-collection-case',title:'图鉴与换装：资产、草稿和正式状态',assets:[3,4],
    question:'如何将关卡奖励接成长线目标，让重复获得的小物也有社交价值？',
    points:['长期收集：在关卡之外提供持续补齐的目标，以收集进度和获取方式承接回流。个性展示：用砖块小人与随身小物搭配，提供 DIY 和展示乐趣。','社交互动：让符合条件的多余小物可赠送好友，为后续交换与交易预留资产规则，而非只增加库存数量。','区分完整角色与按槽位佩戴的小物；浏览、试穿及批量收藏先进入草稿，服务端保存成功才改变正式状态。覆盖未保存确认、返回恢复、断网与赠送去重。'],
    output:'把收集动机、界面操作、资产边界与前后端验收串成完整系统；同时通过入口、浏览、装扮保存和赠送等埋点观察实际使用，不以设计目标代替留存成果。',
    market:{title:'二级交易市场设计思路',status:'设计预留 · 未确认上线',steps:[
      ['稳定分群','按用户 ID 的哈希结果将玩家稳定分为四类（A / B / C / D）。哈希用于分组，不直接决定抽奖结果；具体掉落仍由服务端按配置权重抽取。'],
      ['差异化投放','为四类配置不同的小物掉落权重，形成“本组相对多、其他组相对少”的供给互补。借鉴集五福的集齐动机，让重复物成为可交换供给，缺失物形成需求。'],
      ['稀缺与流通','区分群体间的相对稀缺与全市场总量稀缺；结合活跃人数、获得频次、奖励池、投放周期及回收规则调节供需，避免把四类差异做成永久绝版或无法补齐。'],
      ['验证与边界','保留基础获取或保底补齐路径；设计赠送／交易资格、次数限制、库存校验与订单去重，防止多账号刷取。观察重复率、缺口、成交与收集完成率，再调整权重。']
    ],note:'以上为本人补充的市场设计方向，不代表交易功能已开发或上线；具体概率、交易媒介、定价与回收规则尚未披露，也不作真实货币收益承诺。'},
    source:'《图鉴功能文档》设计目的、系统导图、系统流程与埋点章节；市场方向由本人补充。资料有多位修订者，界面美术为团队成果；不据文档归档认定个人独立完成全部设计，也不将各子功能一概写成上线成果。'},
  {id:'sheep-auth-case',title:'新用户上手与微信授权流程',asset:1,
    question:'怎样先让玩家体验玩法，再在需要的入口请求授权，并处理拒绝后的去向？',
    points:['以首次关卡结算划分新老用户；首次先进入关卡，不在体验前强制申请昵称头像。','按隐私、个人信息两步组织入口状态，区分未请求、已拒绝和仅缺个人信息；结算页再次挑战及返回主页不因授权结果被阻断。'],
    output:'将授权成功、拒绝、设置引导与原操作恢复落实为入口矩阵和验收场景。图中的阶段奖励有其他系统依赖，不据流程图宣称已经全部接入。',
    source:'游戏登录与微信授权流程。展示的是该版本设计，不作为当前微信平台合规结论。'},
  {id:'sheep-festival-case',title:'双节活动：从玩法规则到跨岗位验收',
    question:'怎样把活动玩法、收集结算和兑换做成团队可以分工交付的完整链路？',
    points:['三态月饼以碰撞推进状态，仅完全消除计入收集；成功、失败和放弃分别明确结算，存档恢复不重复累计。','分开活动开放与结束展示，覆盖余额、限兑与可重复奖励、并发兑换、断网查询和订单去重；将交付拆为美术、关卡配置、前端、后端及联调验收。'],
    output:'提供状态规则、异常用例、资源接入与依赖顺序。体现跨职能交付设计，不把团队美术、代码或所有配置归为个人执行。',
    source:'【双节活动】好事成双月饼兑换策划开发案。版本表提供活动发布记录，具体方案细节仍需对应版本验收。'},
  {id:'sheep-release-case',title:'版本管理与迭代证据',
    question:'怎样将需求、缺陷和发布范围关联起来，避免“提测”被写成“上线”？',
    points:['版本表区分内部、测试服和全量渠道，同时记录版本状态、更新内容和任务关联；测试服已发布不等于全量发布。','例如 1.0.539 在表中标为已发布、全量，发布日期 2026-09-24，包含双节活动、限定外观和埋点。另有提测被退回及预计发布日期记录，不能一概作为上线证明。'],
    output:'用版本记录支撑交付和问题迭代，结合点击拖拽、资源刷新、层级、前后台恢复等修复案例说明验收重点。发布记录不证明经营增长或本人独立完成全部任务。',
    source:'羊了个羊对对碰版本更新记录。上述为用户提供表内记载，未现场核验生产服务器。'},
];

export function renderSheepEvidence(e) {
  const figure=item=>{
    if(item.assets)return item.assets.map(asset=>figure({...item,assets:undefined,asset})).join('');
    if(item.asset===undefined)return '';
    const asset=sheepEvidenceAssets[item.asset],url=`../../assets/project-design/sheep-match/${asset.file}`;
    const attrs=`src="${url}" width="${asset.width}" height="${asset.height}" loading="lazy" alt="${e(asset.alt)}"`;
    return `<figure><a href="${url}" aria-label="查看${e(item.title)}原图"><img ${attrs}></a><figcaption>${e(asset.caption||'项目文档原始流程图 · 非实机画面')}</figcaption></figure><a class="design-original" href="${url}">查看原图（可缩放） ↗</a><details class="matchmaking-inspect"><summary>展开流程图原尺寸</summary><div class="matchmaking-scroll" role="region" tabindex="0" aria-label="${e(item.title)}大图"><img ${attrs}></div></details>`;
  };
  const market=item=>item.market?`<section aria-labelledby="${item.id}-market"><h4 id="${item.id}-market">${e(item.market.title)}</h4><p class="record-source">${e(item.market.status)}</p><div class="matchmaking-map-notes">${item.market.steps.map(([title,copy])=>`<div><h4>${e(title)}</h4><p>${e(copy)}</p></div>`).join('')}</div><p class="record-source">${e(item.market.note)}</p></section>`:'';
  return `<section class="matchmaking-design" id="sheep-evidence" aria-labelledby="sheep-evidence-title"><header><p class="eyebrow">DESIGN / DELIVERY</p><h2 id="sheep-evidence-title">设计与研发推进案例</h2><p class="matchmaking-intro">围绕本人已确认的制作人职责，阅读产品取舍、系统规则、关卡工具与版本交付的具体依据。</p></header><p class="matchmaking-boundary">以下是项目资料支持的设计与交付案例，不将团队工作认定为个人独立成果。历史方案、待验收能力与版本表内发布记录分别说明，不以设计目标代替实测业绩。</p><nav class="idiom-jumps" aria-label="设计案例目录">${sheepEvidenceCases.map(item=>`<a href="#${item.id}">${e(item.title)} ↓</a>`).join('')}</nav>${sheepEvidenceCases.map(item=>`<article class="matchmaking-map" id="${item.id}" aria-labelledby="${item.id}-title"><h3 id="${item.id}-title">${e(item.title)}</h3>${figure(item)}<div class="matchmaking-map-notes"><div><h4>设计问题</h4><p>${e(item.question)}</p><h4>交付与价值</h4><p>${e(item.output)}</p></div><div><h4>关键方案</h4><ul>${item.points.map(point=>`<li>${e(point)}</li>`).join('')}</ul></div></div>${market(item)}<p class="record-source">来源：${e(item.source)}</p></article>`).join('')}<p class="matchmaking-boundary">完整原件、内部任务编号、成员信息、精确概率与经济配置不公开；流程图保留原始像素，团队美术与程序实现不扩大为个人职责。</p></section>`;
}
