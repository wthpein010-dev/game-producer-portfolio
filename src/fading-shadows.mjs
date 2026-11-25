import {readFileSync} from 'node:fs';
import {renderAiGameCard} from './ai-game-card.mjs';

const {images}=JSON.parse(readFileSync(new URL('../assets/fading-shadows/media.json',import.meta.url),'utf8'));
const title='影逝之境';
const home='../../index.html#fading-shadows';
export const fadingShadowsSummary='读招、换线，用第三击决定追上去还是退半步。这款横版武侠动作游戏既能与朋友同屏对招，也能结伴闯过主线。';

export function renderFadingShadowsEntry(){
  return renderAiGameCard({id:'fading-shadows',title,description:fadingShadowsSummary,
    tags:['武侠动作','同屏对战','合作闯关'],status:'Godot · Windows 可玩开发版',
    href:'projects/fading-shadows/',detailLabel:'查看策划与实机画面'});
}

function screenshot(id,e,{hero=false}={}){
  const image=images.find(item=>item.id===id);
  const href='../../assets/fading-shadows/'+image.file;
  return `<figure${hero?' class="taptap-hero-shot"':''} data-shot-format="landscape">
    <a class="taptap-image-link" href="${href}" aria-label="放大：${e(image.alt)}"><img class="taptap-screenshot" src="${href}" width="${image.width}" height="${image.height}" loading="${hero?'eager':'lazy'}" decoding="async" alt="${e(image.alt)}"></a>
    <figcaption>${e(image.caption)} <small>${e(image.source)}</small></figcaption>
  </figure>`;
}

export function renderFadingShadowsBody(e){
  const shot=id=>screenshot(id,e);
  return `<main id="main" class="detail-main wrap taptap-detail fading-shadows-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${home}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="eyebrow">横版武侠动作 · Godot</p>
        <h1>${title}<span class="title-dot">.</span></h1>
        <p class="detail-lede">${e(fadingShadowsSummary)}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#fading-combat">看三种收尾 <span aria-hidden="true">↓</span></a><a class="text-link" href="#fading-campaign">看七章十四关 <span aria-hidden="true">↓</span></a></div>
      </header>
      ${screenshot('coop',e,{hero:true})}
      <div class="taptap-hero-context"><p class="taptap-hero-status">Windows 可玩开发版 · Steam 发行筹备</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#fading-combat">普攻与连段</a><a href="#fading-techniques">招式与反制</a><a href="#fading-campaign">主线关卡</a><a href="#fading-input">对战与练习</a></nav>

    <section class="taptap-gallery" id="fading-combat" aria-labelledby="fading-combat-title">
      <header><h2 id="fading-combat-title">前两刀探路，第三刀决定进退</h2>
        <p>风格参考《影之刃》系列的暗黑江湖，动作参考聚焦兵器的重量、相邻动作的衔接，以及打完一套后的收势。白风的轻剑强调点刺和回锋，赤砧的重锤先沉肩蓄势，锤落下去后还得收住重心。<a href="https://store.steampowered.com/app/4115450/Phantom_Blade_Zero/?l=schinese">《影之刃零》官方参考</a></p>
        <p>12 名角色各有 7 种普攻动作，使用同一套操作理解不同兵器。地面两击起手后，第三击可按前追击、按后退击，或直接完成常规收尾。跑中攻击和空中攻击各有独立动作。</p>
      </header>
      <div class="fading-finish-grid">
        <article><h3>直接按攻击</h3>${shot('finish')}</article>
        <article><h3>向前 ＋ 攻击</h3>${shot('advance')}</article>
        <article><h3>向后 ＋ 攻击</h3>${shot('withdraw')}</article>
      </div>
      <p>连击允许提前输入，角色打完当前动作才接下一击。较长的进身收势让对手有机会反打，退身收尾则给双方留出重新站位的空间。</p>
    </section>

    <section class="taptap-gallery" id="fading-techniques" aria-labelledby="fading-techniques-title">
      <header><h2 id="fading-techniques-title">贴身、封线、腾空，各有出招时机</h2>
        <p>进攻前先看距离和场地纵深。玩家可以侧闪换线避开直线压力，再利用对手收招的时机切回近身。</p>
      </header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>贴身起势，挑灯斩把人挑空</h3><p>白风的挑灯斩是沿面向挑刺，打中后让对手离地。普攻或挑刺都要先站到交手纵深，刀光扫过与命中判定各有范围。</p></div>${shot('melee')}</article>
        <article><div class="game-design-copy"><h3>跑攻拦路，跳攻看高度</h3><p>赤砧的横锤撞阵借跑动缩短距离，出手后要收势。白风跃起后可接燕落斜削，命中要同时看横向距离和双方高度，跳过对手头顶也可能挥空。</p></div><div class="fading-move-pair">${shot('rush')}${shot('air')}</div></article>
        <article><div class="game-design-copy"><h3>逐线飞芒封正面，红光逼走位</h3><p>逐线飞芒沿面向送出细窄剑气，适合堵住一条进路。千线寂灭蓄势后绕身重斩，红光提示不可格挡。蓝光可防的提示与红光一起，让防守方判断该接招还是离开攻击范围。</p></div>${shot('ranged')}</article>
        <article><div class="game-design-copy"><h3>箱子和落地兵器也能抢节奏</h3><p>拾取要花站位和出手的机会。拉开半步捡兵器，能用新攻击方式再进场。场边的箱子也能抛出，逼对手从当前线路让开。</p></div>${shot('throw')}</article>
      </div>
    </section>

    <section class="taptap-gallery" id="fading-campaign" aria-labelledby="fading-campaign-title">
      <header><h2 id="fading-campaign-title">七章十四关：路牌、机关与首领战</h2></header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>清敌之后，把路线选择交给玩家</h3><p>清完当前敌人后，路牌提示接下来的支路。场景移镜让玩家看清新位置与对手，再开下一波战斗。章节选择页把关卡预览、阵容和解锁进度放在一起，方便朋友选好同一趟行程。</p></div>${shot('campaign')}</article>
        <article><div class="game-design-copy"><h3>后段关卡让场景道具影响走位</h3><p>盐签作证把药品藏进可破坏物，玩家要决定何时清出安全空间拿补给。截闸反潮把闸坠放进战斗场景，击落时可砸到下方敌人，让玩家根据站位决定先触发机关还是继续进攻。</p></div><div class="fading-move-pair">${shot('salt-cache')}${shot('sluice-weight')}</div></article>
        <article><div class="game-design-copy"><h3>首领战把空间压力交给两个人分担</h3><p>队友可以分走不同纵深，一人牵制正面的威胁，另一人换线找出手机会。章节末把剧情、增益选择和解锁接回下一轮闯关。</p></div>${shot('boss')}</article>
        <article><div class="game-design-copy"><h3>通关第十二关，才把对手变成可选角色</h3><p>截潮监使作为首领登场，顺序通关后解锁。贴地水浪压住一条纵深，折返刃要求再判断一次回程，红光终结技则靠分段预警提示走位。第十一关燧盐师的三束火砂可格挡或换线躲开，两场战斗各自给防守方不同选择。</p></div>${shot('tide-warden')}</article>
      </div>
      <p class="record-source">新增关卡和招式的画面来自 Godot 开发验证。11 月 24 日的 Windows 开发包已完成导出验收，Steam 发行仍处于筹备阶段。</p>
    </section>

    <section class="taptap-gallery" id="fading-input" aria-labelledby="fading-input-title">
      <header><h2 id="fading-input-title">先练一套，朋友到场就能对招</h2></header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>从一局快速对战开始</h3><p>「江湖恩怨」把阵容、胜负规则和快速开局放在一起。多人键盘和手柄可以分别调整按键，同一套招式逻辑适用于不同输入。</p></div><div class="fading-move-pair">${shot('rivalries')}${shot('roster')}</div></article>
        <article><div class="game-design-copy"><h3>把连段拆成能验证的小目标</h3><p>训练先练命中，再接连击、防守和侧闪。提示紧跟着输入和完成结果，玩家能看出问题出在距离、按键顺序还是时机。</p></div>${shot('training')}</article>
      </div>
      <details class="fading-menu-preview"><summary>查看游戏入口画面</summary>${shot('title')}</details>
    </section>

    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${home}" data-return-home>返回个人作品 ↑</a></nav>
  </main>`;
}
