import { renderAiGameCard } from './ai-game-card.mjs';

import {readFileSync} from 'node:fs';

const media=JSON.parse(readFileSync(new URL('../assets/yujiang-coffee/media.json',import.meta.url),'utf8'));
const mediaDir='assets/yujiang-coffee/';
const base='../../';
const summary='玩家在甲板打捞物资和漂流瓶，回船舱冲泡咖啡，再用营业收入与材料改造渔船。';

function screenshot(id, e, {prefix=base, className='', eager=false}={}) {
  const shot=media.images.find(image=>image.id===id);
  const src=prefix+mediaDir+shot.file;
  return `<figure class="${className}" data-shot-format="landscape"><a class="taptap-image-link" href="${src}" aria-label="放大：${e(shot.alt)}"><img class="taptap-screenshot" src="${src}" width="${shot.width}" height="${shot.height}" loading="${eager?'eager':'lazy'}" decoding="async" alt="${e(shot.alt)}"></a><figcaption>${e(shot.caption)}</figcaption></figure>`;
}

export function renderYujiangCoffeeEntry() {
  return renderAiGameCard({id: 'yujiang-coffee', title: '渔江咖啡', description: summary,
    tags: ['海上打捞', '冲泡咖啡', '渔船改造'], status: 'Unity · Windows 开发版',
    href: 'projects/yujiang-coffee/', detailLabel: '查看玩法与实机画面',
  });
}

export function renderYujiangCoffeeBody(e) {
  const shot=(id, options)=>screenshot(id,e,options);
  const video=media.video;
  const poster=media.images.find(image=>image.id==='pour');
  const videoUrl=base+mediaDir+video.file;
  return `
  <main id="main" class="detail-main wrap taptap-detail">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#yujiang-coffee">返回个人作品</a><span aria-hidden="true">/</span><span>渔江咖啡</span></nav>
    <div class="taptap-hero">
      <header class="detail-hero">
        <p class="eyebrow">海上经营 · Unity / Windows</p>
        <h1>渔江咖啡<span class="title-dot">.</span></h1>
        <p class="detail-lede">开一间在海上漂流的咖啡馆。</p>
        <p>${e(summary)}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#coffee-video">看冲泡实录 <span aria-hidden="true">↓</span></a></div>
      </header>
      ${shot('home',{className:'taptap-hero-shot',eager:true})}
      <div class="taptap-hero-context"><p class="taptap-hero-status">Windows 0.16.0 · 可玩开发版</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容">
      <a href="#coffee-loop">经营循环</a><a href="#coffee-video">冲泡实录</a><a href="#coffee-stories">来客与来信</a><a href="#coffee-cabin">船舱氛围</a><a href="#coffee-practice">我的工作</a>
    </nav>

    <section class="taptap-gallery" id="coffee-loop" aria-labelledby="coffee-loop-title">
      <header><h2 id="coffee-loop-title">捞到的东西，最后用在船上</h2>
        <p>漂到船边的常见物资可以顺手收。稀有物资要预判漂移、等它进入工具范围。升级鱼竿和网兜后，打捞范围和可收集的物品等级随之改变。</p>
      </header>
      <ol class="taptap-loop">
        <li>在甲板上收集咖啡原料、船材和漂流瓶。</li>
        <li>回船舱按配方冲泡，给来客递杯，结算营业收入。</li>
        <li>用收入和材料升级工具或船上设施，解锁新的打捞目标与来访条件。</li>
      </ol>
      <div class="taptap-shot-grid">${shot('deck')}${shot('salvage')}${shot('tools')}</div>
    </section>

    <section class="taptap-gallery" id="coffee-video" aria-labelledby="coffee-video-title">
      <header><h2 id="coffee-video-title">冲泡可以随时停下，做错了也能重来</h2>
        <p>选器具、按住倾倒、松手停止，再加料或搅拌。做错可以弃杯重来。经营配方在完成出杯时扣料，递给来客后结算收入。</p>
      </header>
      <figure>
        <video controls playsinline preload="none" width="${video.width}" height="${video.height}" poster="${base+mediaDir+poster.file}" aria-label="渔江咖啡冲泡实录" aria-describedby="coffee-video-caption"><source src="${videoUrl}" type="video/mp4"></video>
        <figcaption id="coffee-video-caption">约 39 秒静音实录。画面依次展示放置滤杯、拿壶注水、归还器具和搅拌。<a href="${videoUrl}">打开原视频 <span aria-hidden="true">↗</span></a></figcaption>
      </figure>
      <div class="taptap-shot-grid" data-shot-count="1">${shot('pour')}</div>
    </section>

    <section class="taptap-gallery" id="coffee-stories" aria-labelledby="coffee-stories-title">
      <header><h2 id="coffee-stories-title">一杯咖啡，让来客的故事往下走</h2>
        <p>我用来客的订单和船上的设施串起人物任务。主线分五章，有八位人物和 44 个任务节点。人物故事完成后，打捞、来访和日常营业还能继续。</p>
        <p>另一条故事入口是漂流瓶。120 封系统来信可以阅读、收藏、归档或放回海上。玩家短笺的投递和抽取已完成本机联调，当前默认离线收系统信。</p>
      </header>
      <div class="taptap-shot-grid">${shot('visitor')}${shot('letter')}</div>
    </section>

    <section class="taptap-gallery" id="coffee-cabin" aria-labelledby="coffee-cabin-title">
      <header><h2 id="coffee-cabin-title">回船舱可以暂时放下经营</h2>
        <p>从甲板点「回船舱」，就能听唱片、看海，也可以练习冲泡。舱内以分层插画保留暖木与灯光，桌上的器具是可单独操作的 3D 物件。窗外随本地昼夜变换，海面有缓慢的波光，偶尔会飞过一只海鸟。</p>
      </header>
      <div class="taptap-shot-grid">${shot('sunset')}${shot('rain')}</div>
    </section>

    <section class="taptap-practice" id="coffee-practice" aria-labelledby="coffee-practice-title">
      <div><h2 id="coffee-practice-title">我的策划与版本推进</h2>
        <p>我从「玩家可以只听海，也可以做一杯咖啡推进故事」出发，提出核心玩法、甲板与船舱的切换、来信与成长系统，并确定船舱画面和操作反馈的方向。AI 协助整理策划和界面流程、实现玩法和验证版本。</p>
        <p>为了让冲泡时更容易看清杯口和液流，我在动作开始后收起器具用途提示，后续去掉桌前手臂和操作线，保留实际器具动作和配方进度。</p>
      </div>
      <aside class="taptap-version"><h3>画面来源</h3><p>截图与录屏来自 Windows 0.16.0 开发版的运行验收，使用隔离测试存档。玩家来信服务处于本机验证阶段。</p></aside>
    </section>
    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="../../index.html#yujiang-coffee">返回个人作品 ↑</a></nav>
  </main>`;
}
