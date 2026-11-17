// Only screenshots with a confirmed public release source may be listed here.
export const sheepPlaytestAssets=[
  {file:'slot-board-redacted.png',width:1080,height:2250,sha256:'fb05137ccdecfe80cb8716f361a3ef95dcab046d2ce9f6aee77cd3ad379a2434',alt:'入槽玩法的完整棋盘与槽位',caption:'棋盘布局与槽位',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'},
  {file:'slot-frame-45.jpg',width:720,height:1350,sha256:'10ff7f8f13bab32d398bb4c6b272cb864dabb0820949d5b916886ffd8e00e094',alt:'线上游戏的连续消除与操作反馈',caption:'连续消除与表现反馈',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'},
  {file:'slot-frame-75.jpg',width:720,height:1350,sha256:'6c368020f5324dfa738068a025387c9dfdd5e2ef7ad9ef1c1ef29c5204d74023',alt:'线上游戏的槽位占用与剩余棋盘',caption:'槽位与剩余选择',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'},
  {file:'slot-frame-105.jpg',width:720,height:1350,sha256:'cd018b81ce59f044c03102eeac1c5ebac025b3e0f48b0100400d8aeb220627d6',alt:'线上游戏的叠层棋盘与显露状态',caption:'叠层棋盘的操作过程',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'},
  {file:'slot-frame-160.jpg',width:720,height:1350,sha256:'3ef4cfab7dfae2f6475db060bec2403e098ceda4a99e063bfcca432c91169b3d',alt:'线上游戏中后段的棋盘与槽位状态',caption:'中后段操作状态',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'},
  {file:'slot-frame-205.jpg',width:720,height:1350,sha256:'bd9461aff6af8da7c8de25542cb0fe9a78976dfa525f4c3e8a61db7954f82ef6',alt:'线上游戏少量剩余砖块的操作画面',caption:'少量剩余砖块时的选择',sourceType:'live-game-screenshot',releaseConfirmedAt:'2026-11-18'}
];
export function renderSheepPlaytest(e){
  if(!sheepPlaytestAssets.length)return '';
  const base='../../assets/project-design/sheep-match/';
  return `<section class="sheep-playtest" id="sheep-playtest" aria-labelledby="sheep-playtest-title"><header class="section-head"><div><p class="eyebrow">GAMEPLAY / 游戏截图</p><h2 id="sheep-playtest-title">线上游戏画面</h2></div></header><div class="sheep-frame-grid">${sheepPlaytestAssets.map(a=>`<figure><a href="${base+a.file}" aria-label="查看${e(a.alt)}大图"><img src="${base+a.file}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" alt="${e(a.alt)}"></a><figcaption>${e(a.caption)}</figcaption></figure>`).join('')}</div><p class="record-source">来源：本人提供并确认的微信／抖音正式线上版本截图；画面已裁去账号与通知区域。</p></section>`;
}
export function renderSheepLevelEvaluation(){return '';}
