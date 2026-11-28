import { renderAiGameCard } from './ai-game-card.mjs';

import {readFileSync} from 'node:fs';

const media=JSON.parse(readFileSync(new URL('../assets/yujiang-coffee/media.json',import.meta.url),'utf8'));
const mediaDir='assets/yujiang-coffee/';
const base='../../';
const summary='玩家在甲板打捞物资和漂流瓶，回船舱冲泡咖啡，再用营业收入与材料改造渔船。';

function screenshot(id, e, {className='', eager=false, label, description}={}) {
  const shot=media.images.find(image=>image.id===id);
  const src=base+mediaDir+shot.file;
  return `<figure class="${className}" data-shot-format="landscape"><a class="taptap-image-link" href="${src}" aria-label="放大：${e(shot.alt)}"><img class="taptap-screenshot" src="${src}" width="${shot.width}" height="${shot.height}" loading="${eager?'eager':'lazy'}" decoding="async" alt="${e(shot.alt)}"></a><figcaption>${label?`<strong>${e(label)}</strong>`:''}${e(description??shot.caption)}</figcaption></figure>`;
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
        <p class="eyebrow">AI 游戏作品 / 海上经营</p>
        <h1>渔江咖啡<span class="title-dot">.</span></h1>
        <p class="detail-lede">开一间在海上漂流的咖啡馆。</p>
        <p>${e(summary)}</p>
        <div class="taptap-hero-actions"><a class="button primary" href="#coffee-video">看冲泡实录 <span aria-hidden="true">↓</span></a></div>
      </header>
      ${shot('home',{className:'taptap-hero-shot',eager:true})}
      <div class="taptap-hero-context"><p class="taptap-hero-status">Unity · Windows 可玩开发版 0.34.0</p><p class="record-source">开场、冲泡实录与常规玩法图来自 Windows 0.16.0。订单与备料案例来自 Windows 0.26.0。新版引导与倒豆采用 Windows 0.34.0 实机截图。均使用隔离测试存档。</p></div>
    </div>
    <nav class="taptap-section-nav" aria-label="本页内容">
      <a href="#coffee-loop">打捞与改船</a><a href="#coffee-video">冲泡实录</a><a href="#coffee-guidance">新手引导</a><a href="#coffee-order-case">订单与备料</a><a href="#coffee-stories">来客与来信</a><a href="#coffee-cabin">在船舱休息</a>
    </nav>

    <section class="taptap-gallery" id="coffee-loop" aria-labelledby="coffee-loop-title">
      <header><h2 id="coffee-loop-title">今天捞上来的东西，拿来煮咖啡、改船</h2>
        <p>常见物资漂到船边就能收。咖啡原料用来出杯，船材则和营业收入一起投入下一次升级。</p>
      </header>
      <div class="taptap-shot-grid">
        ${shot('salvage',{label:'看准漂移再下网',description:'稀有物资要预判漂移方向。先看圆形打捞范围，等物品漂进来再动手。'})}
        ${shot('tools',{label:'升级鱼竿和网兜',description:'工具面板列着等级、费用和打捞能力。升级会改变打捞范围和可收集的物品等级。'})}
        ${shot('deck',{label:'把渔船慢慢改成咖啡馆',description:'添置的长桌、雨棚和座位会出现在甲板上。新的设施也能满足更多来访条件。'})}
      </div>
    </section>

    <section class="taptap-gallery" id="coffee-video" aria-labelledby="coffee-video-title">
      <header><h2 id="coffee-video-title">按住倒水，松手停下</h2>
        <p>把滤杯放好，拿起水壶注水，再加料或搅拌。做错了可以弃杯重来。完成一杯才扣配方材料，把咖啡递给来客后结算收入。</p>
      </header>
      <figure>
        <video controls playsinline preload="none" width="${video.width}" height="${video.height}" poster="${base+mediaDir+poster.file}" aria-label="渔江咖啡冲泡实录" aria-describedby="coffee-video-caption"><source src="${videoUrl}" type="video/mp4"></video>
        <figcaption id="coffee-video-caption">约 39 秒静音实录。画面依次展示放置滤杯、拿壶注水、归还器具和搅拌。<a href="${videoUrl}">打开原视频 <span aria-hidden="true">↗</span></a></figcaption>
      </figure>
      <div class="taptap-shot-grid" data-shot-count="1">${shot('pour',{label:'给海风拿铁加奶',description:'倾倒时可以看到杯口和液流，左上角的配方进度告诉你还要做什么。'})}</div>
    </section>

    <section class="taptap-gallery" id="coffee-guidance" aria-labelledby="coffee-guidance-title">
      <header>
        <h2 id="coffee-guidance-title">把提示留在玩家接下来要做的动作旁</h2>
        <p>0.34.0 把从上船到冲泡的引导合为四段。甲板上只留一行当前操作，完整说明可以在航行指南里重看。工作台的黄铜箭头指向下一件器具，尽量避开按钮、提示和可点击区域。用量和重做说明到倒豆时再出现。</p>
        <p>普通豆与低因豆采用同一套抬起、侧倾与归位操作。倒豆时，豆粒从磨豆斗前侧落入，避开中心轴。玩家换用另一袋豆时可以沿用刚学会的动作。</p>
      </header>
      <div class="taptap-shot-grid">
        ${shot('deck-hint-v34',{label:'甲板保留一行下一步提示'})}
        ${shot('bean-arrow-v34',{label:'从文字提示找到对应豆袋'})}
        ${shot('bean-pour-v34',{label:'把低因咖啡豆倒进磨豆斗'})}
      </div>
    </section>

    <section class="taptap-gallery" id="coffee-order-case" aria-labelledby="coffee-order-case-title">
      <header>
        <h2 id="coffee-order-case-title">先完成手里的订单，再把收入投回渔船</h2>
        <p>以阿澄的奶咖任务为例。遇到一张未完成的订单，手记会引导玩家先找原来的客人。还没开做就回到原配方，成品已在手里就直接递杯。按原订单收款后，可以从回执继续找阿澄，亲手做完他想喝的海风拿铁。</p>
        <p>建造协作角时，面板会指出缺的是钱还是材料。少钱可以接日常订单，缺材料就上甲板打捞，也可以先听望仔的故事。装好设施并约好第一份活后，望仔能帮忙收普通海漂，玩家仍亲自处理稀有漂浮物和漂流瓶。</p>
        <p class="record-source">下方两张图来自 0.26.0 Windows 开发版隔离存档。</p>
      </header>
      <div class="taptap-shot-grid">
        ${shot('order-handoff-v26',{label:'从新任务返回已有订单',description:'来客页面先提供原订单的继续入口，交付之后再接着走阿澄的故事。'})}
        ${shot('cooperation-supplies-v26',{label:'根据所缺资源决定先做什么',description:'建设页列出材料差额，把订单、打捞和望仔的故事放在同一处。'})}
      </div>
    </section>

    <section class="taptap-gallery" id="coffee-stories" aria-labelledby="coffee-stories-title">
      <header><h2 id="coffee-stories-title">熟客会再来，海上也会漂来信</h2></header>
      <div class="taptap-shot-grid">
        ${shot('visitor',{label:'一杯咖啡接着一段故事',description:'来客的订单和船上的设施串起五章主线、八位人物与 44 个任务节点。人物故事讲完，仍可以打捞、接待来客和日常营业。'})}
        ${shot('letter',{label:'捞起一只漂流瓶',description:'120 封系统来信可以阅读、收藏、归档或放回海里。图中这封叫《多烤的一盘》。'})}
      </div>
      <p class="record-source">当前默认离线收系统信。玩家短笺投递和抽取已完成本机联调。</p>
    </section>

    <section class="taptap-gallery" id="coffee-cabin" aria-labelledby="coffee-cabin-title">
      <header><h2 id="coffee-cabin-title">回船舱听唱片，看天色慢慢变</h2>
        <p>从甲板回到船舱，可以看海、听唱片，也可以拿起桌上的器具练习冲泡。窗外随本地昼夜变换，偶尔有海鸟飞过。</p>
      </header>
      <div class="taptap-shot-grid">${shot('sunset')}${shot('rain')}</div>
    </section>

    <nav class="taptap-next" aria-label="继续浏览作品"><a class="text-link" href="../../index.html#yujiang-coffee">返回个人作品 ↑</a></nav>
  </main>`;
}
