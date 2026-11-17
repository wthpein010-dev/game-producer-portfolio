export const sheepPlaytestAssets=[
  {file:'slot-board-redacted.png',width:1080,height:2250,sha256:'fb05137ccdecfe80cb8716f361a3ef95dcab046d2ce9f6aee77cd3ad379a2434'},
  {file:'slot-frame-45.jpg',width:720,height:1350,sha256:'10ff7f8f13bab32d398bb4c6b272cb864dabb0820949d5b916886ffd8e00e094'},
  {file:'slot-frame-75.jpg',width:720,height:1350,sha256:'6c368020f5324dfa738068a025387c9dfdd5e2ef7ad9ef1c1ef29c5204d74023'},
  {file:'slot-frame-105.jpg',width:720,height:1350,sha256:'cd018b81ce59f044c03102eeac1c5ebac025b3e0f48b0100400d8aeb220627d6'},
  {file:'slot-frame-160.jpg',width:720,height:1350,sha256:'3ef4cfab7dfae2f6475db060bec2403e098ceda4a99e063bfcca432c91169b3d'},
  {file:'slot-frame-205.jpg',width:720,height:1350,sha256:'bd9461aff6af8da7c8de25542cb0fe9a78976dfa525f4c3e8a61db7954f82ef6'},
  {file:'slot-playback-redacted.mp4',width:720,height:1350,duration:60,sha256:'56fdd746bf7d7fa9069619414b0c91fd7b52509ba3ec3921505db612b4505ac2'},
  {file:'legacy-playback-poster.jpg',width:496,height:1024,sha256:'a77081063349cca3691a2362d34a27635a16699529d8cb15331afafc54a8ab39'},
  {file:'legacy-playback-redacted.mp4',width:496,height:1024,duration:8.85,sha256:'0ac788145ed1b68499d5bc7bd5c5f73ab9194893c796c7ee559c7e1c02575104'},
  {file:'vita-metrics-reference.jpg',width:1220,height:1170,sha256:'826f769120227ba2eabca35f3c23b38a6c69b43883c97c3047f99b9b15aa66ff'},
  {file:'level-v-curve.png',width:954,height:579,sha256:'fe6fb3a73b94ed48aeb7cc4b1119a32e6502cd716fe92b9c01c1ceab1afcd68b'},
];
const base='../../assets/project-design/sheep-match/';
function image(file,title,caption,e){
  const asset=sheepPlaytestAssets.find(a=>a.file===file);
  return `<figure class="sheep-playtest-image"><a href="${base+file}" aria-label="放大${e(title)}"><img src="${base+file}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async" alt="${e(title)}"></a><figcaption><strong>${e(title)}</strong><p>${e(caption)}</p><a class="text-link" href="${base+file}">查看大图 ↗</a></figcaption></figure>`;
}
export function renderSheepPlaytest(e){
  return `<section class="sheep-playtest" id="sheep-playtest" aria-labelledby="sheep-playtest-title"><header class="section-head"><div><p class="eyebrow">GAMEPLAY / 运行画面</p><h2 id="sheep-playtest-title">从入槽选择，到配对反馈</h2></div><p>本人提供的截图与录屏 · 不是流程效果稿</p></header><p>棋盘的层级与遮挡决定当前可操作范围；先把砖块放入槽位，再完成配对。保留空间与释放后续选择，成为玩家可以直接感知的风险。</p><div class="sheep-current-media">${image('slot-board-redacted.png','入槽玩法：布局与操作范围','槽位、叠层棋盘和移出／洗牌／配对入口在同一画面中呈现。',e)}<div class="sheep-video-block" id="sheep-playback"><video controls playsinline preload="metadata" width="720" height="1350" poster="${base}slot-frame-75.jpg" aria-label="入槽玩法连续操作节选"><source src="${base}slot-playback-redacted.mp4" type="video/mp4">当前浏览器不支持视频，<a href="${base}slot-playback-redacted.mp4">打开操作片段</a>。</video><h3>实际操作：入槽、配对与连续反馈</h3><p>原录屏第 35–95 秒的连续片段，60 秒、静音；未拼接成虚构流程。</p><a class="text-link" href="${base}slot-playback-redacted.mp4">打开操作视频 ↗</a></div></div><p class="record-source">素材的具体构建号与发布渠道未标注，不据此认定为当前全量线上版本。截图裁去顶部账号条，录屏节选与截帧裁去顶部账号及通知区，保留完整槽位、棋盘和底部道具；原片中的聊天分享与广告未公开。</p><details class="sheep-media-more"><summary>更多操作截帧 · 5 张</summary><div class="sheep-frame-grid">${[
    ['slot-frame-45.jpg','连续消除与表现反馈','录屏第 45 秒；查看操作结果如何通过粒子与连击提示反馈。'],
    ['slot-frame-75.jpg','槽位占用与剩余选择','录屏第 75 秒；将槽位中的待配对物与棋盘剩余可选项一起阅读。'],
    ['slot-frame-105.jpg','叠层显露与问号砖状态','录屏第 105 秒；观察上层移走后操作范围的变化，不从截图推断全部特殊砖规则。'],
    ['slot-frame-160.jpg','中后段：槽位与棋盘联动','录屏第 160 秒；结构减少后，仍需兼顾当前配对与后续可操作砖。'],
    ['slot-frame-205.jpg','少量剩余砖块的收尾选择','录屏第 205 秒；是操作过程，不作为最终通关截图。'],
  ].map(([file,title,caption])=>image(file,title,caption,e)).join('')}</div></details><details class="sheep-media-more" id="sheep-legacy-comparison"><summary>旧版对照 · 炸弹为预设方案，尚未上线</summary><div class="sheep-legacy-row"><video controls playsinline preload="metadata" width="496" height="1024" poster="${base}legacy-playback-poster.jpg" aria-label="旧版玩法动图对照，炸弹效果尚未上线"><source src="${base}legacy-playback-redacted.mp4" type="video/mp4"></video><div><h3>旧版：棋盘内直接配对</h3><p>与入槽玩法分开对照，重点看操作位置和风险呈现的变化；不将旧版动画当作新版已上线表现。</p><p><strong>炸弹效果是预设方案，尚未上线。</strong>画面中的按钮和特效不作为正式功能交付证明。</p><p class="record-source">用户于 2026-11-17 明确补充版本与炸弹状态。视频由用户提供 GIF 转码，原动图带有调速处理，不宣称是原速连续录屏；顶部标识已遮盖。</p></div></div></details></section>`;
}

export function renderSheepLevelEvaluation(e){
  return `<section class="sheep-level-evaluation" id="sheep-level-evaluation" aria-labelledby="sheep-level-evaluation-title"><header class="section-head"><div><p class="eyebrow">LEVEL DESIGN / 验收与分析</p><h2 id="sheep-level-evaluation-title">把结构、模拟和人工体验放到一起判断</h2></div></header><p>不只看砖块数量或一个通关率：先检查关卡的可操作空间与变化，再结合人工挑战、反馈和验收状态，确定哪些位置需要调整与复验。</p><div class="sheep-review-fields"><div><h3>结构与投放</h3><p>记录类型数量、层数、砖块量、最大连击数及投放顺序，关联关卡截图，避免只凭规模比较难度。</p></div><div><h3>人工体验与验收</h3><p>将挑战次数、是否通关、通过时长和理由反馈与“可上线／需要调整／已调整待验收”等状态关联，保留修改依据。</p></div><div><h3>模拟与分组对照</h3><p>AB 表并列关卡图、V 曲线、不同道具条件的测算与卡点预测，并预留微信／抖音通关率和人均广告次数；待更新项不写成已有测试结果。</p></div></div><p class="record-source">依据本次指定《关卡难度》表的“关卡验收”与“ABTest关卡”工作表整理；不公开成员姓名、完整配置及原始渠道报表。表内“可上线”是验收状态，不等同已全量发布。</p>${image('level-v-curve.png','关卡 V 曲线：定位可操作空间的收窄','横轴为离场进度（含暂存），纵轴为可操作砖数 V。曲线用于定位阶段变化与人工复核位置；各颜色算法定义未随本图提供，不补写图例。',e)}<p class="record-source">“MC 有效样本止于 87%”表示图中模拟有效样本的覆盖边界，不是 87% 胜率；不将样本外曲线视为已验证结果，也不据此保证关卡可解。用户所给 AB 表可见该类曲线与对应关卡图的关联。</p>${image('vita-metrics-reference.jpg','Vita Mahjong：竞品与分析方法研究','将点亮牌数、棋盘可组合对数、卡点步骤占比、未匹配槽牌与策略卡死分开观察，辅助理解不同阶段的选择空间与风险。',e)}<p class="record-source">此图标题明确为 Vita Mahjong，不标为《对对碰》的线上数据。成功路径与失败策略分支使用不同样本口径；策略曲线不等于玩家真实失败率，未解决样本也不能直接归为无解。本轮未重新运行或独立审计图中统计。</p></section>`;
}
