import { renderAiGameCard } from './ai-game-card.mjs';
import {taptapGames} from './taptap-games.mjs';
import {myLifePcShots} from './my-life.mjs';
import {hubEditionForGame} from './hub-tools.mjs';

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
  const title = video ? video.title || '一回合战斗录制' : game.tapUrl ? '去 TapTap 看看' : '体验状态';
  const eyebrow = video ? 'GAMEPLAY / 运行录制' : game.tapUrl ? 'TAPTAP / 游戏入口' : 'TAPTAP / 体验状态';
  const action = video
    ? `<video controls playsinline preload="none" width="360" height="640" poster="${base}${e(video.poster)}" aria-label="${e(video.title || '竖屏战斗录制')}"><source src="${base}${e(video.src)}" type="video/mp4"><a href="${base}${e(video.src)}">${video.title ? '打开玩法实录' : '打开战斗录制'}</a></video>`
    : tapLink(game, '打开 TapTap 游戏页', 'button primary');
  return `<section class="taptap-play" id="play" aria-labelledby="play-title"><div><p class="eyebrow">${eyebrow}</p><h2 id="play-title">${e(title)}</h2><p>${e(game.linkNote)}</p>${video ? tapLink(game, '打开 TapTap 游戏页', 'text-link') : ''}</div>${action}</section>`;
}

function card(game) {
  const edition = hubEditionForGame(game.slug);
  const legacyAnchor = edition ? 'hub-'+edition.id : game === myLifeGame ? 'my-life-showcase' : '';
  const detail = 'projects/taptap-'+game.slug+'/'+(game.slug === 'jigmeme' ? '#android-preview' : '');
  return renderAiGameCard({
    id: 'work-'+game.slug, coverKey: game.slug, title: game.title,
    description: game.summary, tags: game.tags, status: game.shortStatus,
    href: detail, detailLabel: '玩法与设计详情', taptap: true, legacyAnchor,
    secondaryLink: game.tapUrl ? {href: game.tapUrl, label: game.tapLabel || 'TapTap 游戏页'} : undefined,
  });
}

export function renderTapTapCollection() {
  const count = taptapGames.reduce((sum,game)=>sum+game.shots.length,0);
  return `<section class="taptap-collection" id="taptap-games" aria-labelledby="taptap-title">
    <header class="taptap-intro"><div><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h3 id="taptap-title">TapTap 游戏实践<span class="title-dot">.</span></h3><p>从玩法策划、关卡与数值设计，到界面、美术整合和版本迭代。每款作品附展示图与玩法说明。已开放的作品提供 TapTap 入口。</p></div><p class="taptap-collection-meta">${taptapGames.length} 款游戏<span aria-hidden="true"> / </span>${count} 张公开展示图</p></header>
    <nav class="taptap-project-index" aria-label="快速查看游戏"><span>快速查看</span><ul>${taptapGames.map(game=>`<li><a href="#work-${e(game.slug)}">${e(game.title)}</a></li>`).join('')}</ul></nav>
    <div class="taptap-grid ai-game-grid">${taptapGames.map(card).join('')}</div>
  </section>`;
}

export function renderTapTapBody(game) {
  const base='../../';
  const index=taptapGames.indexOf(game);
  const edition=hubEditionForGame(game.slug);
  const editionLink=edition ? `<p><a class="text-link" href="${e(edition.entry)}">${edition.id==='icecream' ? '《吃了个冰》Unity 试玩' : '网页试玩版'} <span aria-hidden="true">↗</span></a></p>` : '';
  const remaining=game.shots.slice(1);
  const scrollGallery=game.galleryScroll!==false&&remaining.length>1&&new Set(remaining.map(format)).size===1;
  const sections=[['gameplay','玩法循环'],['screenshots','更多画面'],['design','设计取舍'],['practice','我的实践']];
  if (game.artwork?.length) sections.splice(2,0,['production-art','游戏美术']);
  if (game.windowsPreview) sections.push(['windows-preview','Windows 开发实录']);
  const videoLabel=game.video?.title?'玩法实录':'战斗录制';
  sections.push(['play',game.video?videoLabel:game.tapUrl?'游戏入口':'体验状态']);
  return `<main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#work-${e(game.slug)}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><a href="${base}index.html#taptap-games">TapTap 游戏实践</a></nav>
    <div class="taptap-hero">
      <header class="detail-hero"><p class="eyebrow">TAPTAP MAKER / 个人 AI 游戏实践</p><h1>${e(game.title)}<span class="title-dot">.</span></h1><p class="taptap-genre">${e(game.genre)}</p><p class="detail-lede">${e(game.summary)}</p><div class="taptap-hero-actions"><a class="button primary" href="#gameplay">了解核心玩法 <span aria-hidden="true">↓</span></a>${game.video?`<a class="text-link" href="#play">看${videoLabel} <span aria-hidden="true">↓</span></a>`:game.tapUrl?`<a class="text-link" href="${e(game.tapUrl)}">TapTap 游戏页 <span aria-hidden="true">↗</span></a>`:''}</div></header>
      ${screenshot(game.shots[0],base,'taptap-hero-shot',true)}
      <div class="taptap-hero-context">${tags(game)}<p class="taptap-hero-status">${e(game.shortStatus)}</p><time class="taptap-updated" datetime="${e(game.updatedAt)}">${game===myLifeGame||game.windowsPreview?'TapTap 展示图收录于':'项目资料更新于'} ${e(game.updatedAt.replaceAll('-','.'))}</time></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容">${sections.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>
    <section class="taptap-overview" id="gameplay" aria-labelledby="gameplay-title"><div><p class="eyebrow">GAMEPLAY / 核心体验</p><h2 id="gameplay-title">怎么玩</h2><p>${e(game.gameplay)}</p>${editionLink}</div><ol class="taptap-loop">${game.loop.map(step=>`<li>${e(step)}</li>`).join('')}</ol></section>
    <section class="taptap-gallery" id="screenshots" aria-labelledby="screenshots-title"><header${game.previewVersion?' id="android-preview"':''}><p class="eyebrow">${game.previewVersion?'ANDROID / 游戏实跑':'TAPTAP GALLERY / 游戏展示图'}</p><h2 id="screenshots-title">${game.previewVersion?`Android 试玩版 ${e(game.previewVersion)}`:'更多游戏画面'}</h2><p>${e(game.captureNote)}</p><p class="taptap-image-tip">${game.video?'点击任意图片可查看大图。':'点击任意截图可查看原图。'}${scrollGallery?'<span class="gallery-scroll-help"> 多张画面可左右滑动，也可聚焦图库后使用方向键浏览。</span>':''}</p>${game===myLifeGame?'<p><a class="text-link" href="#my-life-pc">查看 Windows 试玩画面 ↓</a></p>':''}</header><div class="taptap-shot-grid${scrollGallery?' taptap-scroll-gallery':''}" data-shot-count="${remaining.length}" ${scrollGallery?'tabindex="0" role="region" aria-label="更多游戏画面"':''}>${remaining.map(shot=>screenshot(shot,base)).join('')}</div></section>
    ${game.artwork?.length ? `<section class="taptap-gallery" id="production-art" aria-labelledby="production-art-title">
      <header><h2 id="production-art-title">游戏美术资产</h2><p>${e(game.artworkNote)}</p></header>
      <div class="taptap-shot-grid" data-shot-count="${game.artwork.length}">${game.artwork.map(shot=>screenshot(shot,base)).join('')}</div>
    </section>\n    ` : ''}${game===myLifeGame?renderMyLifePcGallery(base)+'\n    ':''}<section class="taptap-design" id="design" aria-labelledby="design-title"><header><p class="eyebrow">DESIGN / 规则与取舍</p><h2 id="design-title">设计与迭代</h2></header><div class="taptap-design-grid">${game.design.map(item=>`<article><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('')}</div></section>
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
