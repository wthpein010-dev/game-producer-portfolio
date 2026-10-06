// Public summaries use confirmed portfolio facts only. Internal project material
// and local asset catalogs are deliberately outside this module and repository.
export const sheepNotes = [
  {
    slug: 'gameplay', number: '01', label: 'DIRECTION / SYSTEMS', title: '玩法与系统',
    short: '负责整体方向、玩法与系统。把制作人的工作位置和设计关注点放在一起阅读。',
    lead: '在《羊了个羊：对对碰》中，我的职责范围包含整体方向、玩法与系统。',
    heading: '玩法与系统职责',
    text: '这两项职责共同描述了我的设计工作范围：整体方向提供项目背景，玩法与系统是进一步展开设计讨论的入口。',
    readingTitle: '面试讨论',
    questions: ['一个玩法问题为什么值得优先解决？', '设计方案有哪些取舍，判断依据是什么？', '个人决策与团队协作分别承担什么？'],
    boundary: '本页确认工作范围，不把职责描述直接视为某个具体方案的成果证明。',
    alt: '职责图示：整体方向与玩法系统连接在同一项游戏制作职责中',
  },
  {
    slug: 'team', number: '02', label: 'TEAM / SCHEDULE', title: '团队与排期',
    short: '项目团队共 6 人，工作范围包含团队与排期。团队背景与个人职责分开说明。',
    lead: '项目团队共 6 人。我的职责范围包含团队与排期，以及项目的推进节奏。',
    heading: '团队协作职责',
    text: '项目团队共 6 人，不等同于 6 名直接下属。团队规模说明协作背景；制作人角色与团队、排期职责说明我的工作位置。',
    readingTitle: '面试讨论',
    questions: ['怎样识别当前阶段最需要解决的问题？', '跨岗位协作与排期发生冲突时，如何做取舍？', '怎样区分个人推动的部分与团队共同完成的部分？'],
    boundary: '这份摘要不披露成员信息、内部任务清单或真实版本排期。',
    alt: '职责图示：六个等大的圆点表示项目团队共六人，标注团队与排期职责',
  },
  {
    slug: 'data', number: '03', label: 'DATA / ITERATION', title: '数据迭代',
    short: '数据迭代属于已确认的工作范围。阅读时区分职责记录与可核验的结果。',
    lead: '数据迭代属于我在《羊了个羊：对对碰》中的已确认职责。',
    heading: '数据迭代职责',
    text: '这个节点说明我承担的数据迭代职责。具体成果需要结合问题、判断、调整和可核验的结果来阅读，不能由任职或职责范围直接推出。',
    readingTitle: '面试讨论',
    questions: ['数据帮助识别了什么问题？', '如何把观察转化为需要验证的设计判断？', '调整前后有哪些可核验的对照？'],
    boundary: '本页不列出未获准公开的指标、经营数据或增长结论。',
    alt: '职责图示：数据迭代的工作范围与成果证据分成两个层次阅读',
  },
];

export function renderSheepReading(e) {
  return `<section class="project-reading" id="project-reading" aria-labelledby="project-reading-title">
    <div class="section-head"><div><p class="eyebrow">PROJECT NOTES / 公开职责摘要</p><h2 id="project-reading-title">我的工作范围<span class="title-dot">.</span></h2></div><p>围绕已确认的职责整理。<br>每篇都有图示与独立阅读页面。</p></div>
    <div class="note-cards">${sheepNotes.map(note => `<article class="note-card">
      <figure><img src="../../assets/diagrams/sheep-match-${note.slug}.svg" width="960" height="600" loading="lazy" alt="${e(note.alt)}"><figcaption>原创职责图示 · 非游戏实机画面</figcaption></figure>
      <div class="note-card-copy"><span class="panel-label">${note.number} / ${note.label}</span><h3>${e(note.title)}</h3><p>${e(note.short)}</p><a class="note-link" href="${note.slug}/">阅读公开摘要 <span aria-hidden="true">↗</span></a></div>
    </article>`).join('')}</div>
  </section>`;
}

export function renderSheepNoteBody(note, job, e) {
  return `<main id="main" class="note-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../../../index.html#company-jianyou" data-return-home>职业时间轴</a><span aria-hidden="true">/</span><a href="../">羊了个羊：对对碰</a><span aria-hidden="true">/</span><span>${e(note.title)}</span></nav>
    <article class="public-note"><header class="note-heading"><p class="eyebrow">${note.number} / ${note.label}</p><span class="note-type">公开职责摘要</span><h1>${e(note.title)}<span class="title-dot">.</span></h1><p class="note-lead">${e(note.lead)}</p></header>
      <figure class="note-figure"><img src="../../../assets/diagrams/sheep-match-${note.slug}.svg" width="960" height="600" alt="${e(note.alt)}"><figcaption>原创职责图示 · 用于说明工作范围 · 非游戏实机画面</figcaption></figure>
      <div class="note-body"><section aria-labelledby="note-focus"><h2 id="note-focus">${e(note.heading)}</h2><p>${e(note.text)}</p></section>
        <section class="note-questions" aria-labelledby="note-questions-title"><span class="panel-label">DISCUSSION / 交流线索</span><h2 id="note-questions-title">${e(note.readingTitle)}</h2><ol>${note.questions.map(question => `<li>${e(question)}</li>`).join('')}</ol><p class="note-context">这些是面试交流的问题线索，用于展开讨论。</p></section>
        <aside class="note-record" aria-labelledby="note-record-title"><h2 id="note-record-title">项目记录</h2><dl><div><dt>任职公司</dt><dd>${e(job.employer)}</dd></div><div><dt>角色</dt><dd>${e(job.role)}</dd></div><div><dt>时间</dt><dd>${e(job.period)}</dd></div><div><dt>工作范围</dt><dd>${e(job.scope.join('、'))}</dd></div></dl><p class="note-provenance">本公开摘要依据本人已确认的任职与职责整理。${e(note.boundary)}</p></aside>
      </div><nav class="note-navigation" aria-label="摘要阅读导航"><a class="note-return" href="../#project-reading">← 返回项目阅读入口</a>${sheepNotes.filter(item => item !== note).map(item => `<a href="../${item.slug}/">${e(item.title)} ↗</a>`).join('')}</nav>
    </article></main>`;
}

export function renderSheepNoteDiagram(note) {
  const start = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600" role="img" aria-labelledby="title desc"><title id="title">${note.title}职责图示</title><desc id="desc">${note.alt}</desc><style>text{font-family:'Microsoft YaHei','PingFang SC',sans-serif;fill:#382f48}.label{font:18px 'Segoe UI',sans-serif;letter-spacing:3px}.title{font-size:48px;font-weight:700}.body{font-size:28px}.small{font-size:22px;fill:#625e6c}.inverse{fill:#fff}</style>`;
  const label = `<text x="64" y="72" class="label">${note.number} / ${note.label}</text>`;
  let drawing;
  if (note.slug === 'gameplay') {
    drawing = `<rect width="960" height="600" fill="#eeeaf3"/>${label}<text x="64" y="143" class="title">从方向，进入设计</text><path d="M260 345 H700" stroke="#7e718d" stroke-width="3"/><rect x="64" y="257" width="370" height="185" rx="28" fill="#382f48"/><text x="110" y="332" class="label inverse">DIRECTION</text><text x="110" y="389" class="title inverse">整体方向</text><rect x="526" y="257" width="370" height="185" rx="28" fill="#d7ed92"/><text x="572" y="332" class="label">SYSTEMS</text><text x="572" y="389" class="title">玩法与系统</text><circle cx="480" cy="345" r="14" fill="#382f48"/><text x="64" y="531" class="small">游戏制作人 · 已确认职责</text>`;
  } else if (note.slug === 'team') {
    const circles = [[564,270],[674,270],[784,270],[564,390],[674,390],[784,390]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="42" fill="#d7ed92" stroke="#382f48" stroke-width="2"/>`).join('');
    drawing = `<rect width="960" height="600" fill="#eceee9"/>${label}<text x="64" y="143" class="title">团队与排期</text><text x="64" y="366" style="font-size:176px;font-weight:700">6</text><text x="204" y="292" class="body">项目团队</text><text x="204" y="337" class="body">共 6 人</text>${circles}<path d="M64 465 H896" stroke="#babdb5"/><text x="64" y="531" class="small">团队背景与个人职责，分开说明</text>`;
  } else {
    drawing = `<rect width="960" height="600" fill="#382f48"/>${label.replace('class="label"','class="label inverse"')}<text x="64" y="143" class="title inverse">数据迭代</text><rect x="64" y="233" width="832" height="118" rx="20" fill="#eeeaf3"/><text x="102" y="282" class="label">SCOPE</text><text x="102" y="325" class="body">已确认的职责范围</text><rect x="64" y="378" width="832" height="118" rx="20" fill="#d7ed92"/><text x="102" y="427" class="label">EVIDENCE</text><text x="102" y="470" class="body">成果结合可核验证据阅读</text><text x="64" y="554" style="font-size:22px;fill:#d4ccdf">工作范围与具体成果，分层阅读</text>`;
  }
  return `${start}${drawing}</svg>\n`;
}
