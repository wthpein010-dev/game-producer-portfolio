const title = '竹隐江湖2D';
const summary = '竖屏武侠 RPG 原型。在竹林营地辨认路线与目标，把地图探索、武器装备和武学熟练度串成一套可上手的成长体验。';
const images = [
  ['home', '竹林营地', '用虚拟摇杆移动，靠近人物可对话。武器、武学和补给放在主界面，探索时可直接查看。'],
  ['map', '江湖地图', '地图标出精英、敌人和资源。打开大图可以查看点位和设置导航。'],
  ['bag', '装备与属性', '背包将已装备的栏位与属性面板放在同一屏，可以对照伤害、气血与恢复。'],
  ['world', '江湖成长入口', '进化、宝箱、试炼等系统集中在江湖菜单，部分入口显示解锁条件。'],
];

function figure([key, label, caption], base) {
  const src = base + 'assets/zhuyin-jianghu/' + key + '.webp';
  return `<figure class="ring-haven-figure" data-shot-format="portrait"><a class="taptap-image-link" href="${src}"><img src="${src}" width="810" height="1440" alt="${label}实机截图" loading="lazy" decoding="async"></a><figcaption><strong>${label}</strong>　${caption}</figcaption></figure>`;
}

export function renderZhuyinEntry() {
  return `<section class="taptap-collection" id="zhuyin-jianghu" aria-labelledby="zhuyin-title">
    <div class="taptap-hero"><header class="detail-hero"><p class="taptap-genre">Unity / 安卓 / 竖屏武侠 RPG</p>
    <h3 id="zhuyin-title" class="ring-haven-thesis">${title}</h3><p class="detail-lede">${summary}</p>
    <a class="button primary" href="projects/zhuyin-jianghu/">查看实机与 AI 制作方法</a></header>
    ${figure(images[0], '')}</div></section>`;
}

export function renderZhuyinBody() {
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <header class="detail-hero"><p class="taptap-genre">个人 AI 游戏实践 / 安卓原型</p><h1>${title}<span class="title-dot">.</span></h1><p class="detail-lede">${summary}</p></header>
    <section class="section"><h2>实机截图</h2><div class="ring-haven-pair">${images.map(image => figure(image, '../../')).join('')}</div>
    <p>截图采自 MuMu 安卓模拟器运行的 Unity APK。包内版本 0.11.13（构建号 15），原文件名标记为 0.2.13。</p></section>
    <section class="section"><h2>怎样用 AI 推进这类游戏原型</h2>
    <ol>
      <li><strong>把玩法拆成可试玩的任务。</strong>从营地出发，先让玩家能移动、辨认地图目标，再接入装备栏与属性反馈。给 AI 的需求写清输入、状态变化和界面反馈，每次交付一段能检查的流程。</li>
      <li><strong>把内容和规则一起描述。</strong>用点位、装备属性、武学熟练度和解锁条件组织设计，让 AI 辅助梳理配置字段、生成初稿与查找遗漏。由策划确认数值和玩家看到的反馈。</li>
      <li><strong>用安卓包回验。</strong>在竖屏设备逐个打开地图、背包和成长菜单，检查信息是否可读、入口是否可达，再用实际画面给下一轮修改提供依据。</li>
    </ol>
    <p>以上是结合原型说明的 AI 协作方法。现有 APK 可验证交互与界面，历史工具和具体素材的生成过程缺少制作记录。</p></section>
    <p><a href="../../#ai-games">返回 AI 游戏作品</a></p>
  </main>`;
}
