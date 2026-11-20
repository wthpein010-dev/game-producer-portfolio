import { renderAiGameCard } from './ai-game-card.mjs';

import {readFileSync} from 'node:fs';

const title = '又没Token了！';
const media = JSON.parse(readFileSync(new URL('../assets/token-game/media.json', import.meta.url), 'utf8'));
const illustrations = {
  'main-menu': ['《又没Token了！》主菜单，重置之神按住按钮，右侧显示开始游戏等入口', 'Windows 原型主菜单。'],
  workbench: ['工作台显示存款、欠款、Token 与三镜头漫剧预览', '第一天的工作台，预览三镜头漫剧试片。'],
  threads: ['工作台同时运行三个制作线程，各自显示剩余时间和已扣额度', '三个线程同时制作，进度和已扣额度列在预览下方。'],
  revision: ['漫剧返工回执显示已花额度、三格分镜和处理选项', '这份漫剧回执显示已花 116 Token。'],
  commission: ['委托详情并排展示普通与加急两种选项及各自的额度区间', '同一份短句委托的普通与加急预计消耗。'],
  settlement: ['日结账单显示实际到账金额与计算过程', '结束当天才揭晓到账金额，玩家可以核对存款变化。'],
  collection: ['成就界面显示分类、解锁状态和本局进度', '里程碑记录本局尝试，为下一局提供不同的目标。'],
  ending: ['工作室关停结算显示本局记录和新解锁项', '工作室关停后结算本局履历，将已达成的奖励收进收藏。'],
};

function figure(id, base) {
  const {width, height} = id === media.cover.id ? media.cover : media.images.find(image => image.id === id);
  const [alt, caption] = illustrations[id];
  const src = `${base}assets/token-game/${id}.webp`;
  return `<figure class="token-game-figure"><a href="${src}" aria-label="放大查看${alt}"><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"></a><figcaption>${caption} <a href="${src}">查看原图 ↗</a></figcaption></figure>`;
}

export function renderTokenGameEntry() {
  return renderAiGameCard({id: 'token-game', title,
    description: '靠 AI 接活养活工作室。玩家接单、分配 Token，决定遇到返工时继续修还是及时止损。',
    tags: ['接单经营', 'Token 预算', '返工取舍'], status: 'Windows 可玩原型',
    href: 'projects/token-game/', detailLabel: '查看玩法设计',
  });
}

export function renderTokenGameBody() {
  const base = '../../';
  return `<main id="main" class="detail-main wrap token-game-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="${base}index.html#token-game">返回首页个人作品</a><span aria-hidden="true">/</span><span>${title}</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">个人作品 / 模拟经营</p>
      <h1>${title}</h1>
      <p class="detail-lede">开工作室的第一天，存款只有 12 美元，会员费已经欠了 200 美元。</p>
      <p>从漫剧试片、宣传短句到提示词模板，每件活都要花 Token。今天能做几单、要留多少给返工，都得在看到到账金额之前决定。</p>
      <p class="token-game-source">Godot / GDScript · Windows 可玩原型 ${media.version} · 画面取自同版本导出包的测试场景</p>
      <nav class="collaboration-nav" aria-label="游戏玩法目录"><a href="#token-game-production">委托与制作 ↓</a><a href="#token-game-day">返工与日结 ↓</a><a href="#token-game-progression">成就与收藏 ↓</a></nav>
    </header>
    ${figure('workbench', base)}
    <section class="token-game-section" id="token-game-production" aria-labelledby="token-game-design-title">
      <h2 id="token-game-design-title">接什么单，留多少 Token</h2>
      <div class="token-game-pair">
        <article><h3>普通委托还是加急</h3><p>接了委托就得当天交。以阿林的促销短句为例，普通单预计花 70–120 Token，加急单预计花 88–150 Token，验收也更难。两边收入都要到日结才揭晓。</p>${figure('commission', base)}</article>
        <article><h3>最多三单同时开工</h3><p>选好项目，点执行才扣 Token。工作台并排显示线程倒计时、已花额度和作品预览。可以把三个线程开满，也可以留一笔额度，给意外返工用。</p>${figure('threads', base)}</article>
      </div>
    </section>
    <section class="token-game-section" id="token-game-day" aria-labelledby="token-game-day-title">
      <h2 id="token-game-day-title">收工前的最后一次取舍</h2>
      <div class="token-game-pair">
        <article><h3>角色变脸了，这版还救不救</h3><p>返工回执列出出错的分镜、实际支出和修复报价。挑一处补救、整份重跑，或者止损，把还能用的片段存成图像素材。</p>${figure('revision', base)}</article>
        <article><h3>收入要等日结才知道</h3><p>委托验收和自营销售在日结入账。结束当天后只向前推进。「重置之神」有机会补满额度，手动重置则可以留到急需开工时再用。</p>${figure('settlement', base)}</article>
      </div>
    </section>
    <section class="token-game-section" id="token-game-progression" aria-labelledby="token-game-progression-title">
      <h2 id="token-game-progression-title">工作室关门，收藏还在</h2>
      <p>第 31 天要续费。能不能撑到那天看账本，这一局做过什么则会留下记录。</p>
      <div class="token-game-pair">
        <article><h3>用里程碑定下一局目标</h3><p>里程碑按类别显示解锁条件和本局进度。开下一局前，可以找一项还没做过的事试试。</p>${figure('collection', base)}</article>
        <article><h3>把这一局的纪念品带走</h3><p>关停结算会回顾开工、翻车、Token 消耗和到账金额。本局解锁的纪念品会永久留在收藏里。</p>${figure('ending', base)}</article>
      </div>
    </section>
    <p><a class="text-link" href="${base}index.html#token-game">返回首页个人作品 ↑</a></p>
  </main>`;
}
