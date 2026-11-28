import {renderAiGameCard} from './ai-game-card.mjs';
import media from './portfolio-recent-media.json' with {type:'json'};

export const recentGames = [
  {
    slug:'poetry-letters', title:'为你赋诗', genre:'竖屏文字解谜 / 书信叙事',
    summary:'用候选字补完来信，跟随四幕主线和配乐读完两位主角的一生，再翻开十个独立主题。',
    tags:['书信填字','1,100 关','四幕配乐'], status:'Unity · 微信测试包 0.5.0 / Windows 开发版',
    sections:[
      ['填完整封信，再读下一段故事','拿起一封来信，按上下文从字盘补字。0.5.0 把当前段落显示清楚，前后文保留虚焦字迹。填对一段后，答案随落笔音效写回正文，阅读焦点移到下一段。整篇完成后盖上邮戳，记录通关和首次奖励。',['home-050','first-letter-050']],
      ['错在哪里，就改哪里','段落填满后判定。已确认的字保留在信纸上，错字标红，点按即可退回原来的候选位置。剩下一个难字时，可以先定位空格再用提示。0.4.2 的本地验证画面保留了纠错与定点提示，便于对照两种操作。',['letter-correction-042','target-hint-042']],
      ['邮戳把解题接回阅读','通关画面把零散的字补回原文，玩家可以先读完这封再翻页。前期用短句练习操作，后期如第七十一封把候选盘扩为三行，保留相同的填字规则，让难度来自上下文和备选字。',['answer-reveal-042','later-letter-042']],
      ['书信目录保留回读的线索','校园、青春、中年和晚年各由二十五封信推进。目录每十封分组，每一幕配一首原创循环曲，换幕时平滑过渡。前十封陆续交代选字、纠错和提示，第十封完成后开放主题集。主线 100 关与十个百关主题共 1,100 关。图为 0.4.2 的目录与主题集，0.5.0 首页和答题画面来自 Unity 本地运行。',['directory-042','shelf-042']],
      ['翻动信笺，找回上一章','11 月 28 日 Windows 开发验收中，江南首页的主线信笺可切换已解锁章节。每张信笺都标明该章的阅读进度，还可以回到旧章从头读。主题集集中展示封面与进度，打开详情再返回会保留排在眼前的位置。',['chapter-home-win','theme-preview-win']],
      ['写完一段，纸角轻翻','同日 Windows 开发构建将竖屏插画延伸到纸面和候选字盘下方。填完一段后，正文墨迹落定，纸角伴随翻纸声轻翻，阅读焦点移到下一段。页面上的这些画面来自本地电脑开发构建。',['letter-scene-win','letter-turn-win']],
    ],
  },
  {
    slug:'laurel-arena', title:'沙与桂冠', genre:'竞技模拟 / 对局观战',
    summary:'从六位角斗士的赛前情报做出三场预测，再跟着场上动作、比分与回放验证自己的判断。',
    tags:['六人阵容','赛前预测','赛后回放'], status:'Unity · Windows 试玩版 0.4.0',
    sections:[
      ['先读懂选手，再预测三场胜负','每轮三场覆盖六位不同的选手，新一轮避开上轮对阵。赛前情报提示选手偏向主动推进、稳定防守或等待先手。肖像方便快速辨认，3D 展台让玩家先看到各自的待机和招牌动作，再决定押哪一侧。',['roster-040','showcase-040']],
      ['同一场近身交锋，比分从 2:2 到 2:3','右方选手先踏步贴近，进攻动作在盾缘发生可见接触，比分随之更新。看回放时，先看双方怎么接近，再看接触时刻。把动作与比分放在同一屏，是为了让观众有依据回看这一分。',['approach-040','shield-score-040']],
      ['控场得分与近身交手分开呈现','本场较早还有一次未发生武器接触的控场得分。观战反馈用「控场得分」与「交手得分」区分两种来源。终场比分为 3:4，可在比分走势上找转折，从关键一分入口回看，或自行拖动全场回放。',['control-score-040','result-040']],
      ['一场结束后，还要看整轮的预测','赛中固定呈现双方比分和状态，赛后将三场结果与预测合看。玩家可以用比分走势和关键回放检查之前的判断，再回去看下一轮的不同对阵。',['match-040','replay-040']],
    ],
  },
  {
    slug:'monster-workshop', title:'怪物拼装工坊', genre:'直播互动原型 / 部件拼装',
    summary:'观众投票选出怪物部件，主播负责开单、装配和验收。评论、点赞和礼物各自显示是否已上屏。',
    tags:['弹幕投票','部件拼装','出画回执'], status:'Windows 1.1.26 · 本机联调',
    sections:[
      ['弹幕选部件，主播负责最后一装','以「赤龙」的头部投票为例。主播开工后选定部位，观众发「投潮鳞」可把票投给对应头部，截止前能改投。主播可选择有票的部件，也可以用点赞累积的公共补给安装尚未得票的部件。验收时同步亮相，并保留各部位票数和补给标记，刚进场的观众也能看懂成品的来历。',['vote','reveal']],
      ['一条互动进入工坊，怎样确认观众看得到','1.1.26 本机联调用模拟评论、点赞和礼物分别验证。评论改变票面，点赞更新补给，礼物进入队列等待动效。采集窗隐藏时，待处理互动仍可接收。恢复画面后，主播台等采集画面确认呈现再显示「已出画」，测试礼物有单独标识。私密房实际试播仍待完成。',['queued-1126','receipts-1126']],
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
