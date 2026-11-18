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
    description: '我用 AI 做出了一款圆环解谜游戏。转动圆环对齐开口，解开连接，挑战特别关并为海狸换装。',
    tags: ['旋转解扣', '两类特别关', '每日挑战'], status: 'Unity 原型 · Editor 演示',
    href: 'projects/ring-haven/', detailLabel: '查看游戏与 AI 创作过程',
  });
}

export function renderRingHavenBody(e=escaped) {
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#ring-haven">返回首页个人作品</a><span aria-hidden="true">/</span><span>环环小憩</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">AI GAME DEVELOPMENT / 个人作品</p>
      <h1>环环小憩<span class="title-dot">.</span></h1>
      <p class="detail-lede">我用 AI 把旋转解扣做成了一款休闲解谜游戏。</p>
      <p>我确定玩法、反馈和关卡节奏，用 AI 将设计做进 Unity。作品包含 30 个炸弹关、30 个奖励关，以及从每日挑战到海狸换装的奖励流程。</p>
      <nav class="collaboration-nav" aria-label="游戏案例目录">
        <a href="#ring-haven-ownership">我是怎么做的 ↓</a>
        <a href="#ring-haven-loop">核心玩法 ↓</a>
        <a href="#ring-haven-modes">特别关 ↓</a>
        <a href="#ring-haven-daily">每日挑战 ↓</a>
        <a href="#ring-haven-goals">换装与结算 ↓</a>
      </nav>
    </header>

    <section class="ring-haven-section" id="ring-haven-ownership" aria-labelledby="ring-haven-ownership-title">
      <div class="ring-haven-workflow">
        <div>
          <h2 id="ring-haven-ownership-title">我怎么用 AI 做这个项目</h2>
          <p>我先拆解玩家在每一步需要知道什么。拖动时要看清选中的环，解扣时要确认连接已经打开，清场后要知道拿到了什么。</p>
          <p>我用 AI 把需求做成可操作的棋盘、关卡和界面，再按这些场景逐项检查。比如旋转时，我用绿边指出正在操作的环，保留环的原色来区分周围的连接。</p>
          <p>在每日挑战里，我把「难度要高」转成 AI 可以落实和检验的规则。我给出解锁门槛、挑战次数、道具要求和皮肤奖励，再用关卡解题回放核对关键步骤，用界面演示检查奖励怎样回到主页。</p>
        </div>
        ${figure('home',e)}
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-loop" aria-labelledby="ring-haven-loop-title">
      <h2 id="ring-haven-loop-title">能看懂的旋转与解扣反馈</h2>
      <ol class="ring-haven-path">
        <li>观察圆环开口与连接的位置。</li>
        <li>旋转圆环，对齐开口，找到能先解开的连接。</li>
        <li>解开连接、移除圆环，处理剩余结构，直到清场。</li>
      </ol>
      <div class="ring-haven-pair">
        <article><h3>开口和连接决定解题顺序</h3><p>玩家可以从外围先拆，逐步腾出空间，再处理分叉和闭环。</p>${figure('normal',e)}</article>
        <article><h3>绿边提示操作，同色碎裂确认解扣</h3><p>接受拖动的圆环显示绿色细描边。解扣时出现同色碎裂，清场庆祝和奖励结算分开呈现。</p>${figure('rotate',e)}</article>
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-modes" aria-labelledby="ring-haven-modes-title">
      <h2 id="ring-haven-modes-title">60 个特别关改变闯关节奏</h2>
      <p>我将 30 个炸弹关和 30 个奖励关穿插进普通关卡。玩家沿用已经学会的旋转解扣操作，每种关卡都有清楚的目标。</p>
      <div class="ring-haven-pair">
        <article><h3>炸弹关考验回合规划</h3><p>炸弹由有效操作回合推进。玩家要先看连接关系，再决定哪一步值得消耗回合。</p>${figure('bomb',e)}</article>
        <article><h3>奖励关提供轻松收集</h3><p>玩家可以按自己的节奏收集，关卡允许部分结算。</p>${figure('reward',e)}</article>
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-daily" aria-labelledby="ring-haven-daily-title">
      <h2 id="ring-haven-daily-title">每天一次的 24 环高难挑战</h2>
      <div class="ring-haven-workflow">
        <div>
          <p>完成 10 个普通关后解锁，每天一次，退出后可续玩同一局。首题有 24 环、29 扣，用大环保留开口和连接处的辨认空间。</p>
          <p>我设定了至少用两次木槌才可过关的目标，AI 协助把它落实为两处需要清除的封闭结构。棋盘配有专用木槌，玩家还要判断关键连接的先后顺序。</p>
        </div>
        ${figure('daily',e)}
      </div>
    </section>

    <section class="ring-haven-section" id="ring-haven-goals" aria-labelledby="ring-haven-goals-title">
      <h2 id="ring-haven-goals-title">挑战奖励可以带回主页换装</h2>
      <div class="ring-haven-pair">
        <article><h3>通关获得 Night Keeper</h3><p>赢下每日挑战后，玩家获得新海狸外观 Night Keeper，可以在主页衣柜预览和穿戴。</p>${figure('wardrobe',e)}</article>
        <article><h3>普通关结算展示下一步</h3><p>清场后展示本局积分与奖励，再提供继续闯关的入口。图中是使用演示存档完成的一局。</p>${figure('result',e)}</article>
      </div>
      <p><a class="text-link" href="../../index.html#ring-haven">返回首页个人作品 ↑</a></p>
    </section>
  </main>`;
}
