import {readFileSync} from 'node:fs';
import {renderAiGameCard} from './ai-game-card.mjs';

const {images}=JSON.parse(readFileSync(new URL('../assets/fading-shadows/media.json',import.meta.url),'utf8'));
const title='影逝之境';
const home='../../index.html#fading-shadows';
const gameplaySection='projects/fading-shadows/#fading-play';
export const fadingShadowsSummary='一封烧残的求援信，把你引到雨夜山门。选好同行侠客，从章前分镜启程，在交锋中读招、换线，决定是继续追击还是收招退身。可独闯七章十四关，也可和朋友同屏闯关或对招。';

function trailerVideo(base){
  const media=base+'assets/fading-shadows/';
  return `<video controls playsinline preload="none" width="1280" height="720" poster="${media}trailer-poster.webp" aria-label="${title}实机预告">
    <source src="${media}gameplay-trailer.mp4" type="video/mp4">
    <a href="${media}gameplay-trailer.mp4">打开实机预告</a>
  </video>`;
}

export function renderFadingShadowsEntry(){
  return renderAiGameCard({id:'fading-shadows',title,description:fadingShadowsSummary,
    tags:['武侠动作','同屏对战','合作闯关'],status:'Windows 可玩开发版 · 0.23.0',
    href:'projects/fading-shadows/',detailLabel:'看玩法设计',
    secondaryLink:{href:gameplaySection,label:'看实机'},
    supplement:`<template id="fading-shadows-preview">
      <dialog class="reading-lightbox gameplay-preview" aria-labelledby="fading-shadows-preview-title">
        <h2 id="fading-shadows-preview-title">${title} · 实机预告</h2>
        <form method="dialog"><button class="lightbox-close" type="submit" aria-label="关闭实机预告" autofocus>×</button></form>
        ${trailerVideo('')}
        <a class="text-link" href="${gameplaySection}">前往项目详情 <span aria-hidden="true">↗</span></a>
      </dialog>
    </template>`});
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
        <div class="taptap-hero-actions"><a class="button primary" href="#fading-play">看实机预告 <span aria-hidden="true">↓</span></a><a class="text-link" href="#fading-combat">看战斗设计 <span aria-hidden="true">↓</span></a></div>
      </header>
      ${screenshot('title',e,{hero:true})}
      <div class="taptap-hero-context"><p class="taptap-hero-status">Windows 可玩开发版 0.23.0 · Steam 发行筹备</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#fading-play">实机预告</a><a href="#fading-combat">普攻与连段</a><a href="#fading-techniques">招式与反制</a><a href="#fading-campaign">主线关卡</a><a href="#fading-input">对战与练习</a><a href="#fading-publishing">发行合作</a></nav>

    <section class="taptap-gallery" id="fading-play" aria-labelledby="fading-play-title">
      <header><h2 id="fading-play-title">看一场实机交锋</h2><p>先看玩家怎样在一条线上交手，再看侧闪、投掷和双人配合如何改变局面。</p></header>
      <div class="fading-trailer">
        ${trailerVideo('../../')}
      </div>
    </section>

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
      <p>前两击共用同一套起手，降低第一局的操作门槛。第三击才让玩家选择。常规收尾消耗最少的位移，向前追击能把退开的敌人留在压力里，也会因收势较长露出反打窗口。退身收尾能保住距离，却可能放弃继续压制的机会。连击可提前输入，角色会先打完当前动作。</p>
    </section>

    <section class="taptap-gallery" id="fading-techniques" aria-labelledby="fading-techniques-title">
      <header><h2 id="fading-techniques-title">贴身、封线、腾空，各有出招时机</h2>
        <p>进攻前先看距离和场地纵深。玩家可以侧闪换线避开直线压力，再利用对手收招的时机切回近身。</p>
      </header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>贴身起势，挑灯斩把人挑空</h3><p>白风的挑灯斩是沿面向挑刺，打中后让对手离地。普攻或挑刺都要先站到交手纵深，刀光扫过与命中判定各有范围。</p></div>${shot('melee')}</article>
        <article><div class="game-design-copy"><h3>跑攻拦路，跳攻看高度</h3><p>赤砧的横锤撞阵借跑动缩短距离，出手后要收势。白风跃起后可接燕落斜削，命中要同时看横向距离和双方高度，跳过对手头顶也可能挥空。</p></div><div class="fading-move-pair">${shot('rush')}${shot('air')}</div></article>
        <article><div class="game-design-copy"><h3>逐线飞芒封正面，红光逼走位</h3><p>逐线飞芒沿面向送出细窄剑气，适合堵住一条进路。千线寂灭蓄势后绕身重斩，红光提示不可格挡。蓝光可防的提示与红光一起，让防守方判断该接招还是离开攻击范围。</p></div>${shot('ranged')}</article>
        <article><div class="game-design-copy"><h3>箱子、酒瓶和落地兵器也能抢节奏</h3><p>拾取要花站位和出手的机会。拉开半步捡兵器，能用新攻击方式再进场。场边的箱子能抛出，酒瓶也能在地面或跳起后投掷，逼对手重新判断进路。</p></div><div class="fading-move-pair">${shot('throw')}${shot('bottle-toss')}</div></article>
      </div>
    </section>

    <section class="taptap-gallery" id="fading-campaign" aria-labelledby="fading-campaign-title">
      <header><h2 id="fading-campaign-title">七章十四关：路牌、机关与首领战</h2></header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>选好同行侠客，读完分镜再启程</h3><p>新版主线把同行侠客的选择和确认独立出来。已解锁角色可查看资料和招式，未解锁角色保留灰影。14 个关卡各有章前剧情分镜，用图文交代来路和目标，也允许跳过进入战斗。</p></div><div class="fading-move-pair">${shot('journey-roster')}${shot('journey-story')}</div></article>
        <article><div class="game-design-copy"><h3>清完一段，再选择下一条路</h3><p>清敌后用路牌给出支路，把赶路与交锋分开。移镜先交代新场景、站位与敌人，然后再开下一波战斗。章节选择把场景预览与解锁进度放在一起，方便队友知道今天要从哪一关继续。</p></div><div class="fading-move-pair">${shot('campaign')}${shot('stage-catalog')}</div></article>
        <article><div class="game-design-copy"><h3>后段关卡让场景道具影响走位</h3><p>盐签作证把药品藏进可破坏物，玩家要决定何时清出安全空间拿补给。截闸反潮把闸坠放进战斗场景，击落时可砸到下方敌人，让玩家根据站位决定先触发机关还是继续进攻。</p></div><div class="fading-move-pair">${shot('salt-cache')}${shot('sluice-weight')}</div></article>
        <article><div class="game-design-copy"><h3>双人闯关，把正面的压力分开</h3><p>一人留在正面接招，另一人换线打断追击；也可以先清掉杂兵，再对付首领。两个人共享场地，谁先去捡补给、谁继续牵制，都会改变这一波的节奏。章节末把剧情、增益选择和解锁接回下一次出发。</p></div><div class="fading-move-pair">${shot('boss')}${shot('coop')}</div></article>
        <article><div class="game-design-copy"><h3>通关第十二关，才把对手变成可选角色</h3><p>截潮监使作为首领登场，顺序通关后解锁。贴地水浪压住一条纵深，折返刃要求再判断一次回程，红光终结技则靠分段预警提示走位。第十一关燧盐师的三束火砂可格挡或换线躲开，两场战斗各自给防守方不同选择。</p></div>${shot('tide-warden')}</article>
      </div>
      <p class="record-source">11 月 27 日的 0.23.0 Windows 实包通过主线选人、剧情分镜与投掷验收。横屏 Web 构建已在本机验证，Steam 发行仍处于筹备阶段。</p>
    </section>

    <section class="taptap-gallery" id="fading-input" aria-labelledby="fading-input-title">
      <header><h2 id="fading-input-title">先练一套，朋友到场就能对招</h2></header>
      <div class="game-design-stories">
        <article><div class="game-design-copy"><h3>从一局快速对战开始</h3><p>「江湖恩怨」把阵容、胜负规则和快速开局放在一起。多人键盘和手柄可以分别调整按键，同一套招式逻辑适用于不同输入。</p></div><div class="fading-move-pair">${shot('rivalries')}${shot('roster')}</div></article>
        <article><div class="game-design-copy"><h3>把连段拆成能验证的小目标</h3><p>训练先练命中，再接连击、防守和侧闪。提示紧跟着输入和完成结果，玩家能看出问题出在距离、按键顺序还是时机。</p></div>${shot('training')}</article>
      </div>
      <details class="fading-menu-preview"><summary>查看山门主题主界面</summary>${shot('title-courtyard')}</details>
    </section>

    <section class="taptap-gallery" id="fading-publishing" aria-labelledby="fading-publishing-title">
      <header><h2 id="fading-publishing-title">发行合作</h2><p>面向横版动作和本地合作玩家，先用一场看得懂的交锋建立兴趣，再用分支连段和场景解法说明重玩价值。</p></header>
      <div class="fading-finish-grid">
        <article><h3>商店首屏先讲一个决策</h3><p>用追击、退身和换线的前后对照开场。再接一段双人牵制或机关打断，让短视频也能看清动作和结果。</p></article>
        <article><h3>试玩切片先验证上手</h3><p>建议串起一次短教学、一场能借地形取胜的战斗和一位有清晰预警的首领。试玩重点观察玩家能否说出自己为什么受击，以及何时开始主动切换路线或收尾。</p></article>
        <article><h3>当前可交付的物料</h3><p>Windows 开发版、实机预告、商店截图和中英文物料草案已备。与发行方协作时，优先对齐试玩范围、手柄与本地双人验收、测试反馈和宣发档期。Steam 商店与试玩仍在筹备。</p></article>
      </div>
    </section>

    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${home}" data-return-home>返回个人作品 ↑</a></nav>
  </main>`;
}
