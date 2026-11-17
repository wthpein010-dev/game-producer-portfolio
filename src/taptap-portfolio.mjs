import {taptapGames} from './taptap-games.mjs';
import {myLifeCover,myLifePcShots} from './my-life.mjs';

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

const myLifeGame = taptapGames.find(game => game.slug === 'my-life');

export function renderMyLifeShowcase() {
  return `<section class="taptap-collection" id="my-life-showcase" aria-labelledby="my-life-showcase-title">
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="eyebrow">人生模拟 / 个人 AI 游戏实践</p>
        <h3 id="my-life-showcase-title">我的一生<span class="title-dot">.</span></h3>
        <p class="detail-lede">从十八岁出发，用一次次月度决定，写下几代家人的故事。</p>
        <p>我把升学、就业与家庭经营纳入同一套月度循环，并用 AI 辅助迭代事件选项、家谱和长线存档。</p>
        <div class="taptap-hero-actions">
          <a class="button primary" href="projects/taptap-my-life/">查看玩法与设计 <span aria-hidden="true">→</span></a>
          <a class="text-link" href="${e(myLifeGame.tapUrl)}">TapTap 游戏页 <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      ${screenshot(myLifeCover,'','taptap-hero-shot')}
      <div class="taptap-hero-context">${tags(myLifeGame)}</div>
    </div>
  </section>`;
}

function renderMyLifePcGallery(base) {
  return `<section class="taptap-gallery" id="my-life-pc" aria-labelledby="my-life-pc-title">
    <header><h2 id="my-life-pc-title">Windows 试玩版</h2><p>0.19 版测试流程截图。画面中的人物和家庭数据均为虚构。点图可查看完整细节。</p></header>
    <div class="taptap-shot-grid" data-shot-count="${myLifePcShots.length}">
      ${myLifePcShots.map(shot => screenshot(shot,base)).join('')}
    </div>
  </section>`;
}

function tapLink(game, label, className) {
  return game.tapUrl ? `<a class="${className}" href="${e(game.tapUrl)}">${e(game.tapLabel || label)} <span aria-hidden="true">↗</span></a>` : '';
}

function playSection(game, base) {
  const video = game.video;
  const action = video
    ? `<video controls playsinline preload="none" width="360" height="640" poster="${base}${e(video.poster)}" aria-label="竖屏战斗录制"><source src="${base}${e(video.src)}" type="video/mp4"><a href="${base}${e(video.src)}">打开战斗录制</a></video>`
    : tapLink(game, '打开 TapTap 游戏页', 'button primary');
  return `<section class="taptap-play" id="play" aria-labelledby="play-title"><div><p class="eyebrow">${video?'GAMEPLAY / 运行录制':'TAPTAP / 游戏入口'}</p><h2 id="play-title">${video?'一回合战斗录制':'去 TapTap 看看'}</h2><p>${e(game.linkNote)}</p></div>${action}</section>`;
}

function card(game) {
  return `<article class="taptap-card" id="work-${game.slug}" data-shot-format="${format(game.shots[0])}">
    <header class="taptap-card-heading"><p class="eyebrow">${e(game.genre)}</p><h4><a href="projects/taptap-${e(game.slug)}/">${e(game.title)}</a></h4></header>
    <figure class="taptap-cover"><a href="${e(game.shots[0].src)}" aria-label="放大${e(game.title)}：${e(game.shots[0].label)}">${image(game.shots[0])}</a><figcaption>${e(game.shots[0].label)}</figcaption></figure>
    <div class="taptap-card-copy"><p>${e(game.summary)}</p>${tags(game)}<p class="taptap-card-state">${e(game.shortStatus)}</p></div>
    <footer class="taptap-actions"><a class="text-link" href="projects/taptap-${e(game.slug)}/">玩法与设计详情 <span aria-hidden="true">→</span></a>${tapLink(game, 'TapTap 游戏页', 'text-link')}</footer>
  </article>`;
}

export function renderTapTapCollection() {
  const count = taptapGames.reduce((sum,game)=>sum+game.shots.length,0);
  return `<section class="taptap-collection" id="taptap-games" aria-labelledby="taptap-title">
    <header class="taptap-intro"><div><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h3 id="taptap-title">TapTap 游戏实践<span class="title-dot">.</span></h3><p>从玩法策划、关卡与数值设计，到界面、美术整合和版本迭代。每款作品附展示图与玩法说明。已开放的作品提供 TapTap 入口。</p></div><p class="taptap-collection-meta">${taptapGames.length} 款游戏<span aria-hidden="true"> / </span>${count} 张公开展示图</p></header>
    <nav class="taptap-project-index" aria-label="快速查看游戏"><span>快速查看</span><ul>${taptapGames.map(game=>`<li><a href="#work-${e(game.slug)}">${e(game.title)}</a></li>`).join('')}</ul></nav>
    <div class="taptap-grid">${taptapGames.map(card).join('')}</div>
  </section>`;
}

export function renderTapTapBody(game) {
  const base='../../';
  const index=taptapGames.indexOf(game);
  const remaining=game.shots.slice(1);
  const scrollGallery=game.galleryScroll!==false&&remaining.length>1&&new Set(remaining.map(format)).size===1;
  const sections=[['gameplay','玩法循环'],['screenshots','更多画面'],['design','设计取舍'],['practice','我的实践']];
  if (game.windowsPreview) sections.push(['windows-preview','Windows 开发实录']);
  sections.push(['play',game.video?'战斗录制':'游戏入口']);
  return `<main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#work-${e(game.slug)}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><a href="${base}index.html#taptap-games">TapTap 游戏实践</a></nav>
    <div class="taptap-hero">
      <header class="detail-hero"><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h1>${e(game.title)}<span class="title-dot">.</span></h1><p class="taptap-genre">${e(game.genre)}</p><p class="detail-lede">${e(game.summary)}</p><div class="taptap-hero-actions"><a class="button primary" href="#gameplay">了解核心玩法 <span aria-hidden="true">↓</span></a>${game.video?'<a class="text-link" href="#play">看战斗录制 <span aria-hidden="true">↓</span></a>':game.tapUrl?`<a class="text-link" href="${e(game.tapUrl)}">TapTap 游戏页 <span aria-hidden="true">↗</span></a>`:''}</div></header>
      ${screenshot(game.shots[0],base,'taptap-hero-shot',true)}
      <div class="taptap-hero-context">${tags(game)}<p class="taptap-hero-status">${e(game.shortStatus)}</p><time class="taptap-updated" datetime="${e(game.updatedAt)}">${game===myLifeGame||game.windowsPreview?'TapTap 展示图收录于':'项目资料更新于'} ${e(game.updatedAt.replaceAll('-','.'))}</time></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容">${sections.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>
    <section class="taptap-overview" id="gameplay" aria-labelledby="gameplay-title"><div><p class="eyebrow">GAMEPLAY / 核心体验</p><h2 id="gameplay-title">怎么玩</h2><p>${e(game.gameplay)}</p></div><ol class="taptap-loop">${game.loop.map(step=>`<li>${e(step)}</li>`).join('')}</ol></section>
    <section class="taptap-gallery" id="screenshots" aria-labelledby="screenshots-title"><header><p class="eyebrow">TAPTAP GALLERY / 游戏展示图</p><h2 id="screenshots-title">更多游戏画面</h2><p>${e(game.captureNote)}</p><p class="taptap-image-tip">${game.video?'点击任意图片可查看大图。':'点击任意截图可查看原图。'}${scrollGallery?'<span class="gallery-scroll-help"> 多张画面可左右滑动，也可聚焦图库后使用方向键浏览。</span>':''}</p>${game===myLifeGame?'<p><a class="text-link" href="#my-life-pc">查看 Windows 试玩画面 ↓</a></p>':''}</header><div class="taptap-shot-grid${scrollGallery?' taptap-scroll-gallery':''}" data-shot-count="${remaining.length}" ${scrollGallery?'tabindex="0" role="region" aria-label="更多游戏画面"':''}>${remaining.map(shot=>screenshot(shot,base)).join('')}</div></section>
    ${game===myLifeGame?renderMyLifePcGallery(base)+'\n    ':''}<section class="taptap-design" id="design" aria-labelledby="design-title"><header><p class="eyebrow">DESIGN / 规则与取舍</p><h2 id="design-title">设计与迭代</h2></header><div class="taptap-design-grid">${game.design.map(item=>`<article><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('')}</div></section>
    <section class="taptap-practice" id="practice" aria-labelledby="practice-title"><div><p class="eyebrow">MY PRACTICE / 项目推进</p><h2 id="practice-title">这款游戏中的实践</h2><p>${e(game.practice)}</p></div><aside class="taptap-version"><h3>当前版本</h3><p>${e(game.status)}</p></aside></section>
    ${game.windowsPreview ? `<section class="taptap-gallery" id="windows-preview" aria-labelledby="windows-preview-title">
      <header><h2 id="windows-preview-title">Windows 3D 开发实录</h2><p>以下画面采自 Windows 试验版 ${e(game.windowsPreview.version)} 的运行验收，展示照护、家装和成长界面。点击可放大查看。</p></header>
      <div class="taptap-shot-grid" data-shot-count="${game.windowsPreview.shots.length}">
      ${game.windowsPreview.shots.map(shot=>screenshot(shot,base)).join('')}
      </div>
    </section>\n    ` : ''}${playSection(game,base)}
    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="${base}index.html#work-${e(game.slug)}" data-return-home>返回个人作品 ↑</a>${index>0?`<a class="text-link" href="../taptap-${e(taptapGames[index-1].slug)}/">← ${e(taptapGames[index-1].title)}</a>`:''}${index<taptapGames.length-1?`<a class="text-link" href="../taptap-${e(taptapGames[index+1].slug)}/">${e(taptapGames[index+1].title)} →</a>`:''}</nav>
  </main>`;
}
