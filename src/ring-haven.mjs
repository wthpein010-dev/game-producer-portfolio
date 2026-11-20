import { renderAiGameCard } from './ai-game-card.mjs';

export const ringHavenMedia = [
  {key:'home',file:'home.webp',width:640,height:1138,alt:'环环小憩完整竖屏主页，海狸角色与普通关、挑战和换装入口',caption:'Unity Editor 演示画面 · 主页上的挑战与换装入口。'},
  {key:'normal',file:'normal.webp',width:640,height:1138,alt:'环环小憩普通关完整棋盘，多枚彩色圆环通过开口与连接关系形成解谜目标',caption:'Unity Editor 原生渲染 · 普通棋盘演示，观察开口与连接关系。'},
  {key:'rotate',file:'rotate.webp',width:640,height:1138,alt:'环环小憩圆环旋转过程，当前接受拖动的圆环带有绿色细描边',caption:'Unity Editor 原生渲染 · 旋转反馈演示，绿边标明当前接受拖动的环。'},
  {key:'bomb',file:'bomb.webp',width:640,height:1138,alt:'环环小憩炸弹特别关的完整竖屏界面，展示棋盘与回合压力目标',caption:'Unity Editor 原生渲染 · 炸弹关演示，以有效操作回合形成压力。'},
  {key:'reward',file:'reward.webp',width:640,height:1138,alt:'环环小憩奖励关入场说明，说明收集目标和本关结算规则',caption:'Unity Editor 演示画面 · 奖励关入场说明。'},
  {key:'daily',file:'daily.webp',width:640,height:1138,alt:'环环小憩每日高难挑战完整棋盘，二十四枚圆环与二十九处连接构成复杂结构',caption:'Unity Editor 原生渲染 · 24 环日题演示，解锁进度为验证存档设置。'},
  {key:'wardrobe',file:'wardrobe.webp',width:640,height:1138,alt:'环环小憩主页衣柜，预览并选择海狸外观以承接每日挑战奖励',caption:'Unity Editor 演示画面 · 存档预置 Night Keeper，当前穿戴默认款。'},
  {key:'result',file:'result.webp',width:640,height:1138,alt:'环环小憩普通关结果界面，展示本局结算与继续游戏的入口',caption:'Unity Editor 演示画面 · 使用演示存档完成一局后的结算。'},
];

const escaped=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

function figure(key,e,base='../../') {
  const image=ringHavenMedia.find(item=>item.key===key),href=base+'assets/ring-haven/'+image.file;
  return `<figure class="ring-haven-figure" data-ring-haven-image="${key}"><a href="${href}" aria-label="放大${e(image.alt)}"><img src="${href}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" alt="${e(image.alt)}"></a><figcaption>${e(image.caption)} <a href="${href}">查看原图 ↗</a></figcaption></figure>`;
}

export function renderRingHavenEntry() {
  return renderAiGameCard({id: 'ring-haven', title: '环环小憩',
    description: '转动圆环对齐开口，把扣在一起的环一枚枚解开。主线穿插炸弹关和奖励关，赢下每日挑战还能给海狸换装。',
    tags: ['旋转解扣', '两类特别关', '每日挑战'], status: 'Unity 原型 · Editor 演示',
    href: 'projects/ring-haven/', detailLabel: '查看解扣、特别关与每日挑战',
  });
}

export function renderRingHavenBody(e=escaped) {
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#ring-haven">返回首页个人作品</a><span aria-hidden="true">/</span><span>环环小憩</span></nav>
    <header class="detail-hero">
      <div class="ring-haven-workflow">
        <div>
          <p class="eyebrow">AI 游戏作品 / 休闲解谜</p>
          <h1>环环小憩<span class="title-dot">.</span></h1>
          <p class="detail-lede">转一转，把扣在一起的圆环解开。</p>
          <p>沿着彩环的开口找解法，清空棋盘。主线穿插 30 个炸弹关和 30 个奖励关，每日挑战还会送出海狸换装奖励。</p>
          <p class="record-source">Unity 原型 · 编辑器演示</p>
          <nav class="collaboration-nav" aria-label="游戏玩法目录">
            <a href="#ring-haven-loop">旋转解扣 ↓</a>
            <a href="#ring-haven-modes">特别关 ↓</a>
            <a href="#ring-haven-daily">每日挑战 ↓</a>
            <a href="#ring-haven-goals">换装与结算 ↓</a>
          </nav>
        </div>
        ${figure('home',e)}
      </div>
    </header>

    <section class="ring-haven-section" id="ring-haven-loop" aria-labelledby="ring-haven-loop-title">
      <h2 id="ring-haven-loop-title">找到开口，顺着连接一环一环解</h2>
      <ol class="ring-haven-path">
        <li>观察圆环开口与连接的位置。</li>
        <li>旋转圆环，对齐开口，找到能先解开的连接。</li>
        <li>解开连接、移除圆环，处理剩余结构，直到清场。</li>
      </ol>
      <div class="ring-haven-pair">
        <article><h3>先拆外围，再处理中间</h3><p>遇到分叉或闭环时，先从外围找能对齐的开口。拆掉一枚环，再沿着剩下的连接找下一步。</p>${figure('normal',e)}</article>
        <article><h3>拖动看绿边，解扣看碎片</h3><p>绿色细描边跟着正在拖动的圆环，环体保留原来的颜色。看到同色碎裂，就知道这处连接已经解开。</p>${figure('rotate',e)}</article>
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-modes" aria-labelledby="ring-haven-modes-title">
      <h2 id="ring-haven-modes-title">60 个特别关改变闯关节奏</h2>
      <p>普通关靠清场推进。遇到特别关，旋转解扣的操作一样，目标变成控制回合或尽量多收集。</p>
      <div class="ring-haven-pair">
        <article><h3>炸弹关要想好再动手</h3><p>炸弹随有效操作回合推进。先看一眼剩下的连接，再决定先解哪一扣，把回合留给能推动局面的操作。</p>${figure('bomb',e)}</article>
        <article><h3>奖励关能收多少算多少</h3><p>按自己的节奏解环和收集。关卡允许部分结算，没收齐也能带走已经拿到的奖励。</p>${figure('reward',e)}</article>
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-daily" aria-labelledby="ring-haven-daily-title">
      <h2 id="ring-haven-daily-title">每天一次的 24 环高难挑战</h2>
      <div class="ring-haven-workflow">
        <div>
          <p>完成 10 个普通关后解锁，每天一次，退出后可续玩同一局。首题有 24 环、29 扣，大环让开口和连接处看得更清楚。</p>
          <p>棋盘上有两处封闭结构，至少用两次木槌才能解开。关卡配有专用木槌，可以留给靠旋转解不开的地方，再判断关键连接的先后顺序。</p>
        </div>
        ${figure('daily',e)}
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-goals" aria-labelledby="ring-haven-goals-title">
      <h2 id="ring-haven-goals-title">挑战奖励可以带回主页换装</h2>
      <div class="ring-haven-pair">
        <article><h3>通关穿上 Night Keeper</h3><p>赢下每日挑战，领取新海狸外观 Night Keeper。回主页打开衣柜，就能预览和换装。</p>${figure('wardrobe',e)}</article>
        <article><h3>清场后接着闯关</h3><p>最后一枚环移除后先庆祝清场，再看本局积分与奖励。领完奖励，从结算页继续下一关。</p>${figure('result',e)}</article>
      </div>
      <p><a class="text-link" href="../../index.html#ring-haven">返回首页个人作品 ↑</a></p>
    </section>
  </main>`;
}
