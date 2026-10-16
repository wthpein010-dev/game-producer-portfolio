import {taptapGames} from './taptap-games.mjs';

const e = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const format = shot => shot.width >= shot.height ? 'landscape' : 'portrait';
const tags = game => `<ul class="case-keywords" aria-label="${e(game.title)}玩法特点">${game.tags.map(tag => `<li>${e(tag)}</li>`).join('')}</ul>`;
const image = (shot, base='', eager=false) => `<img class="taptap-screenshot" src="${base}${e(shot.src)}" width="${shot.width}" height="${shot.height}" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high" ':''}decoding="async" alt="${e(shot.alt)}">`;

function screenshot(shot, base, className='', eager=false) {
  return `<figure class="${className}" data-shot-format="${format(shot)}">
    <a class="taptap-image-link" href="${base}${e(shot.src)}" aria-label="放大：${e(shot.alt)}">${image(shot,base,eager)}</a>
    <figcaption><strong>${e(shot.label)}</strong><span>${e(shot.caption)}</span></figcaption>
  </figure>`;
}

function card(game) {
  return `<article class="taptap-card" id="work-${game.slug}" data-shot-format="${format(game.shots[0])}">
    <header class="taptap-card-heading"><p class="eyebrow">${e(game.genre)}</p><h4><a href="projects/taptap-${e(game.slug)}/">${e(game.title)}</a></h4></header>
    <figure class="taptap-cover"><a href="${e(game.shots[0].src)}" aria-label="放大${e(game.title)}游戏截图">${image(game.shots[0])}</a><figcaption>${e(game.shots[0].label)}</figcaption></figure>
    <div class="taptap-card-copy"><p>${e(game.summary)}</p>${tags(game)}<p class="taptap-card-state">${e(game.shortStatus)}</p></div>
    <footer class="taptap-actions"><a class="text-link" href="projects/taptap-${e(game.slug)}/">玩法与设计详情 <span aria-hidden="true">→</span></a><a class="text-link" href="${e(game.tapUrl)}">${e(game.tapLabel || 'TapTap 游戏页')} <span aria-hidden="true">↗</span></a></footer>
  </article>`;
}

export function renderTapTapCollection() {
  const count = taptapGames.reduce((sum,game)=>sum+game.shots.length,0);
  return `<section class="taptap-collection" id="taptap-games" aria-labelledby="taptap-title">
    <header class="taptap-intro"><div><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h3 id="taptap-title">TapTap 游戏实践<span class="title-dot">.</span></h3><p>从玩法策划、关卡与数值设计，到界面、美术整合和版本迭代。每款作品附游戏画面、设计说明和 TapTap 入口。</p></div><p class="taptap-collection-meta">${taptapGames.length} 款游戏<span aria-hidden="true"> / </span>${count} 张运行截图</p></header>
    <nav class="taptap-project-index" aria-label="快速查看游戏"><span>快速查看</span><ul>${taptapGames.map(game=>`<li><a href="#work-${e(game.slug)}">${e(game.title)}</a></li>`).join('')}</ul></nav>
    <div class="taptap-grid">${taptapGames.map(card).join('')}</div>
  </section>`;
}

export function renderTapTapBody(game) {
  const base='../../';
  const index=taptapGames.indexOf(game);
  const remaining=game.shots.slice(1);
  const scrollGallery=remaining.length>1&&new Set(remaining.map(format)).size===1;
  const sections=[['gameplay','玩法循环'],['screenshots','更多画面'],['design','设计取舍'],['practice','我的实践'],['play','游戏入口']];
  return `<main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#work-${e(game.slug)}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><a href="${base}index.html#taptap-games">TapTap 游戏实践</a></nav>
    <div class="taptap-hero">
      <header class="detail-hero"><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h1>${e(game.title)}<span class="title-dot">.</span></h1><p class="taptap-genre">${e(game.genre)}</p><p class="detail-lede">${e(game.summary)}</p><div class="taptap-hero-actions"><a class="button primary" href="#gameplay">了解核心玩法 <span aria-hidden="true">↓</span></a><a class="text-link" href="${e(game.tapUrl)}">TapTap 游戏页 <span aria-hidden="true">↗</span></a></div></header>
      ${screenshot(game.shots[0],base,'taptap-hero-shot',true)}
      <div class="taptap-hero-context">${tags(game)}<p class="taptap-hero-status">${e(game.shortStatus)}</p><time class="taptap-updated" datetime="2026-10-16">项目资料更新于 2026.10.16</time></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容">${sections.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>
    <section class="taptap-overview" id="gameplay" aria-labelledby="gameplay-title"><div><p class="eyebrow">GAMEPLAY / 核心体验</p><h2 id="gameplay-title">怎么玩</h2><p>${e(game.gameplay)}</p></div><ol class="taptap-loop">${game.loop.map(step=>`<li>${e(step)}</li>`).join('')}</ol></section>
    <section class="taptap-gallery" id="screenshots" aria-labelledby="screenshots-title"><header><p class="eyebrow">IN-GAME CAPTURES / 游戏画面</p><h2 id="screenshots-title">更多游戏画面</h2><p>${e(game.captureNote)}</p><p class="taptap-image-tip">点击任意截图可查看原图。${scrollGallery?'<span class="gallery-scroll-help"> 多张画面可左右滑动，也可聚焦图库后使用方向键浏览。</span>':''}</p></header><div class="taptap-shot-grid${scrollGallery?' taptap-scroll-gallery':''}" data-shot-count="${remaining.length}" ${scrollGallery?'tabindex="0" role="region" aria-label="更多游戏画面"':''}>${remaining.map(shot=>screenshot(shot,base)).join('')}</div></section>
    <section class="taptap-design" id="design" aria-labelledby="design-title"><header><p class="eyebrow">DESIGN / 规则与取舍</p><h2 id="design-title">设计与迭代</h2></header><div class="taptap-design-grid">${game.design.map(item=>`<article><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('')}</div></section>
    <section class="taptap-practice" id="practice" aria-labelledby="practice-title"><div><p class="eyebrow">MY PRACTICE / 项目推进</p><h2 id="practice-title">这款游戏中的实践</h2><p>${e(game.practice)}</p></div><aside class="taptap-version"><h3>当前版本</h3><p>${e(game.status)}</p></aside></section>
    <section class="taptap-play" id="play" aria-labelledby="play-title"><div><p class="eyebrow">TAPTAP / 游戏入口</p><h2 id="play-title">去 TapTap 看看</h2><p>${e(game.linkNote)}</p></div><a class="button primary" href="${e(game.tapUrl)}">${e(game.tapLabel || '打开 TapTap 游戏页')} <span aria-hidden="true">↗</span></a></section>
    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${base}index.html#work-${e(game.slug)}" data-return-home>返回个人作品 ↑</a>${index>0?`<a class="text-link" href="../taptap-${e(taptapGames[index-1].slug)}/">← ${e(taptapGames[index-1].title)}</a>`:''}${index<taptapGames.length-1?`<a class="text-link" href="../taptap-${e(taptapGames[index+1].slug)}/">${e(taptapGames[index+1].title)} →</a>`:''}</nav>
  </main>`;
}
