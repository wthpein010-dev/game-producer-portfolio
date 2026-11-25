import {renderAiGameCard} from './ai-game-card.mjs';
import media from './portfolio-recent-media.json' with {type:'json'};

export const recentGames = [
  {
    slug:'poetry-letters', title:'为你赋诗', genre:'竖屏文字解谜 / 书信叙事',
    summary:'从候选字里补完一封信。答对后读回完整句子、收下邮戳，再打开下一封来信。',
    tags:['选字填空','定点提示','书信故事'], status:'Unity · Windows 试玩版',
    sections:[
      ['第一封信只教一个动作','先高亮候选字盘，等遇到多字题才引导切换字格。答错时保留当前焦点，提示只补选中的一格，已经填对的字继续保留。',['overview','letter']],
      ['解谜结束，把注意力还给信纸','候选字盘收起，把空间留给完整句子、结语和邮戳。序章结尾从雨夜过渡到天亮，主题书架继续呈现可读内容和解锁进度。',['solution','dawn','shelf']],
    ],
  },
  {
    slug:'laurel-arena', title:'沙与桂冠', genre:'竞技模拟 / 对局观战',
    summary:'在罗马竞技场看两名角斗士争夺优势。走位、盾面和命中反馈共同解释比分是怎么来的。',
    tags:['角斗模拟','比分反馈','赛后回放'], status:'Unity · Windows 试玩版 0.3.8',
    sections:[
      ['从靠近、接战到退开','连续走位让两人间距的变化可见。部分回合在一次交锋后接短回击，发力、受击和回稳各有清楚的动作节奏。',['exchange']],
      ['让盾牌接触与比分对上','盾面朝向对手，兵器碰盾时在接触处给出声光反馈。远距离优势用「控场得分」说明，回放可重新观察交手过程。',['shield']],
    ],
  },
  {
    slug:'monster-workshop', title:'怪物拼装工坊', genre:'直播互动原型 / 部件拼装',
    summary:'观众为怪物部件投票，主播推动开工、装配和验收。横屏与竖屏观众画面同步展示同一份成品。',
    tags:['观众投票','部件拼装','横竖屏采集'], status:'Windows 调试版 · 本地互动验证',
    sections:[
      ['让投票立刻影响工坊','投票结果接到部件选择，装配后的怪物在两路观众画面中同步出现。竖屏把当前工序和投票反馈放在前景，横屏给成品亮相留出空间。',['vote','reveal']],
      ['主播能看清互动卡在哪一步','主播台区分互动已接收、等待出画与已出画，测试互动单独标识。图为本地联调画面，真实直播间表现仍待试播验证。',['receipts']],
    ],
  },
];

export function renderRecentGameEntry(game) {
  return renderAiGameCard({id:game.slug,title:game.title,description:game.summary,
    tags:game.tags,status:game.status,href:`projects/${game.slug}/`});
}

export function renderRecentGameBody(game,e) {
  const figure=id=>{
    const {src,width,height,alt}=media[game.slug].find(image=>image.id===id);
    return `<figure class="ring-haven-figure" data-shot-format="${width>height?'landscape':'portrait'}"><a href="../../${e(src)}" aria-label="放大${e(alt)}"><img src="../../${e(src)}" width="${width}" height="${height}" alt="${e(alt)}" loading="lazy" decoding="async"></a><figcaption>${e(alt)}</figcaption></figure>`;
  };
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#${e(game.slug)}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${e(game.title)}</span></nav>
    <header class="detail-hero"><p class="eyebrow">${e(game.genre)}</p><h1>${e(game.title)}<span class="title-dot">.</span></h1><p class="detail-lede">${e(game.summary)}</p><p class="record-source">${e(game.status)}</p></header>
    ${game.sections.map(([title,description,shots],index)=>`<section class="ring-haven-section" id="case-${index+1}" aria-labelledby="case-title-${index+1}"><h2 id="case-title-${index+1}">${e(title)}</h2><p>${e(description)}</p><div class="ring-haven-pair">${shots.map(figure).join('')}</div></section>`).join('')}
  </main>`;
}
