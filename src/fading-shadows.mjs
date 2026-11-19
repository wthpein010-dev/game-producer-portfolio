import {readFileSync} from 'node:fs';
import {renderAiGameCard} from './ai-game-card.mjs';

const {images}=JSON.parse(readFileSync(new URL('../assets/fading-shadows/media.json',import.meta.url),'utf8'));
const title='影逝之境';
const home='../../index.html#fading-shadows';
const summary='选一名侠客，在有纵深的场地里换线、交锋和拾取兵器。既能与朋友同屏对战，也能并肩闯过主线章节。';

export function renderFadingShadowsEntry(){
  return renderAiGameCard({id:'fading-shadows',title,description:summary,
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
  return `<main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${home}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="eyebrow">横版武侠动作 · Godot</p>
        <h1>${title}<span class="title-dot">.</span></h1>
        <p class="detail-lede">同屏对招，也能结伴闯关。</p>
        <p>${e(summary)}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#fading-combat">看战斗设计 <span aria-hidden="true">↓</span></a></div>
      </header>
      ${screenshot('title',e,{hero:true})}
      <div class="taptap-hero-context"><p class="taptap-hero-status">Windows 可玩开发版 · Steam 发行筹备</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容"><a href="#fading-combat">战斗手感</a><a href="#fading-campaign">主线关卡</a><a href="#fading-input">对战与练习</a><a href="#fading-role">我的工作</a></nav>

    <section class="taptap-gallery" id="fading-combat" aria-labelledby="fading-combat-title">
      <header><h2 id="fading-combat-title">让玩家看得清何时出手</h2>
        <p>场地有纵深，角色要对齐时机、距离和所在位置才能打中。近战靠贴身连击，远程招式沿主要交手方向展开，玩家可以换线找空当。</p>
        <p>我根据试玩反馈延长普攻的起势和收招，保留提前输入连击，让下一击在当前动作完成后接上。兵器和箱子也能参与攻防，玩家需要在接近对手与拾取道具之间做取舍。</p>
      </header>
      <div class="taptap-shot-grid">${shot('melee')}${shot('ranged')}${shot('throw')}</div>
    </section>

    <section class="taptap-gallery" id="fading-campaign" aria-labelledby="fading-campaign-title">
      <header><h2 id="fading-campaign-title">用路线与敌人组合安排闯关节奏</h2>
        <p>主线按章节推进。清完当前敌人后，玩家通过场景里的路牌了解支路，再继续前进。小段之间有移镜过场，章节末把剧情、选择增益和角色解锁接到下一轮挑战。</p>
      </header>
      <div class="taptap-shot-grid">${shot('campaign')}${shot('boss')}</div>
    </section>

    <section class="taptap-gallery" id="fading-input" aria-labelledby="fading-input-title">
      <header><h2 id="fading-input-title">朋友到场就能开打，也能先练一遍</h2>
        <p>「江湖恩怨」集中快速对战、自定义规则和招式练习。练习让玩家逐步试出普攻、连击、防守与侧闪；设置里可以分别调整多人键盘和手柄按键。</p>
      </header>
      <div class="taptap-shot-grid">${shot('rivalries')}${shot('training')}</div>
    </section>

    <section class="taptap-practice" id="fading-role" aria-labelledby="fading-role-title">
      <div><h2 id="fading-role-title">我的工作</h2>
        <p>我确定同屏对战与合作闯关的方向，提出打击感、章节节奏和多人操作的验收要求，并根据版本反馈调整优先级。开发中用 AI 协助实现和跑测，再把问题拆成可复测的动作、命中判定和界面流程。</p>
      </div>
      <aside class="taptap-version"><h3>画面与版本</h3><p>Windows 0.23.0 开发版通过打包和解压启动验证。图册来自受控实机验收，首领图取自关卡检查点。Steam 版处于发行筹备阶段。</p></aside>
    </section>
    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${home}" data-return-home>返回个人作品 ↑</a></nav>
  </main>`;
}
