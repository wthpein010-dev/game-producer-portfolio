import {renderAiGameCard} from './ai-game-card.mjs';
import media from './portfolio-recent-media.json' with {type:'json'};

export const recentGames = [
  {
    slug:'poetry-letters', title:'为你赋诗', genre:'竖屏文字解谜 / 书信叙事',
    summary:'用候选字补完来信，跟随四幕主线和配乐读完两位主角的一生，再翻开十个独立主题。',
    tags:['书信填字','1,100 关','四幕配乐'], status:'Unity · 微信小游戏测试包 0.4.2',
    sections:[
      ['一百封主线来信，四段人生','校园、青春、中年和晚年各用二十五封信推进。目录把来信每十封分组，方便继续或回读。四幕分别有一首原创循环曲，换幕时平滑过渡。',['home-042','directory-042']],
      ['先读一封信，再决定去哪个主题','前十封介绍选字、纠错和提示，第十封完成后开放主题集。主线 100 关与十个百关主题共 1,100 关，后期题目增加候选字。0.4.2 已完成本地题库和微信测试包核验，手机真机验证待完成。',['later-letter-042','shelf-042']],
    ],
  },
  {
    slug:'laurel-arena', title:'沙与桂冠', genre:'竞技模拟 / 对局观战',
    summary:'从六位角斗士的赛前情报做出三场预测，再跟着场上动作、比分与回放验证自己的判断。',
    tags:['六人阵容','赛前预测','赛后回放'], status:'Unity · Windows 试玩版 0.4.0',
    sections:[
      ['六位选手，一轮三场','每轮三场覆盖六位不同的选手，新一轮避开上轮对阵。赛前可查看双方资料，在肖像与 3D 展台间切换。展台会轮播待机与专属招牌动作，帮助玩家在开赛前建立识别。',['roster-040','showcase-040']],
      ['观战反馈能回到比赛证据','比赛保留固定比分和双方动作反馈，近身时靠步、碰盾与回稳都有清楚的节奏。赛后可查看比分走势、重看关键一分，或拖动整场回放进度。',['match-040','replay-040']],
    ],
  },
  {
    slug:'monster-workshop', title:'怪物拼装工坊', genre:'直播互动原型 / 部件拼装',
    summary:'观众投票选出怪物部件，主播负责开单、装配和验收。评论、点赞和礼物各自显示是否已上屏。',
    tags:['弹幕投票','部件拼装','出画回执'], status:'Windows 1.1.26 · 本机联调',
    sections:[
      ['观众提议，主播决定装配节奏','主播选择工单并发起部件投票。观众在截票前可以改票，主播可以安装获票部件，也可继续征集意见。装配完成后，两路观众画面同步展示成品。',['vote','reveal']],
      ['三类互动分开核对出画','1.1.26 的主播台分别显示评论、点赞和礼物从接收、等待到已上屏的状态，测试礼物单独标识。Windows 包已完成本机联调，真实私密房试播仍待完成。',['queued-1126','receipts-1126']],
    ],
  },
];

export function renderRecentGameEntry(game) {
  return renderAiGameCard({id:game.slug,title:game.title,description:game.summary,
    tags:game.tags,status:game.status,href:`projects/${game.slug}/`});
}

export function renderRecentGameBody(game,e) {
  const figure=id=>{
    const {src,width,height,alt,caption=alt}=media[game.slug].find(image=>image.id===id);
    return `<figure class="ring-haven-figure" data-shot-format="${width>height?'landscape':'portrait'}"><a href="../../${e(src)}" aria-label="放大${e(alt)}"><img src="../../${e(src)}" width="${width}" height="${height}" alt="${e(alt)}" loading="lazy" decoding="async"></a><figcaption>${e(caption)}</figcaption></figure>`;
  };
  return `<main id="main" class="detail-main wrap ring-haven-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#${e(game.slug)}" data-return-home>返回个人作品</a><span aria-hidden="true">/</span><span>${e(game.title)}</span></nav>
    <header class="detail-hero"><p class="eyebrow">${e(game.genre)}</p><h1>${e(game.title)}<span class="title-dot">.</span></h1><p class="detail-lede">${e(game.summary)}</p><p class="record-source">${e(game.status)}</p></header>
    ${game.sections.map(([title,description,shots],index)=>`<section class="ring-haven-section" id="case-${index+1}" aria-labelledby="case-title-${index+1}"><h2 id="case-title-${index+1}">${e(title)}</h2><p>${e(description)}</p><div class="ring-haven-pair">${shots.map(figure).join('')}</div></section>`).join('')}
  </main>`;
}
