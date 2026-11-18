import { renderAiGameCard } from './ai-game-card.mjs';
import { readFileSync } from 'node:fs';
import { caseDetails } from './hub-case-details.mjs';

const snapshot = JSON.parse(readFileSync(new URL('./hub-catalog.json', import.meta.url), 'utf8'));
export const hubProjects = snapshot.projects;
export const featuredHubIds = snapshot.featured;

export const hubGameEditions = {
  'icecream-master': 'icecream',
  'lunar-freight': 'lunar-freight',
};

// The Hub index already has a navigation link. The remaining entries fall
// outside the portfolio's publication scope for project data and prototypes.
export const excludedHubIds = [
  'hub', 'clickflow', 'brick-character-copy-preview', 'trinket-market',
  'v-curve-tool', 'holiday-gifts', 'announcement-center',
];

const standaloneProjects = hubProjects.filter(project =>
  !featuredHubIds.includes(project.id)
  && !Object.values(hubGameEditions).includes(project.id)
  && !excludedHubIds.includes(project.id)
);
export const hubApps = standaloneProjects.filter(project => project.status !== 'game');
export const hubGames = standaloneProjects.filter(project => project.status === 'game');

const byId = new Map(hubProjects.map(project => [project.id, project]));
export function hubEditionForGame(slug) {
  return byId.get(hubGameEditions[slug]);
}

const escape = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
);

const featuredCopy = {
  'gamespec-relay': {
    category: '需求与交付', caseId: 'case-gamespec',
    summary: '整理群聊和策划文档，拆成六职能任务、验收标准与改动影响。',
    note: '完整示例可离线体验，模型连接可选。',
  },
  planmap: {
    category: '思考与结构',
    summary: '用对话重组脑图，切换树状、鱼骨或横向结构，自动整理节点。',
    note: '项目演示展示对话改图和结构切换。',
  },
  'codex-multi-thread-workbench': {
    category: '多任务协作', caseId: 'case-workbench',
    summary: '并排查看任务和对话，直接输入消息、查看状态并调整卡片位置。',
    note: '网页演示使用示例任务。',
  },
};

function renderCase(caseId) {
  return caseId ? '\n    '+`<details class="hub-case-detail" id="${caseId}">
    <summary>查看案例拆解</summary>
    ${caseDetails[caseId]}
  </details>` : '';
}

function renderActions(project) {
  const video = project.video ? `<a href="${escape(project.video)}">演示视频 ↗</a>` : '';
  const downloads = project.downloads.map(({ platform, url }) => {
    const label = { windows: 'Windows', mac: 'Mac' }[platform] ?? platform;
    return `<a href="${escape(url)}">${escape(label)} 下载 ↗</a>`;
  });
  return `<div class="hub-tool-actions"><a href="${escape(project.entry)}">打开项目 ↗</a>${video}${downloads.join('')}</div>`;
}

function renderFeatured(project) {
  const { image } = project;
  const { category, summary, note, caseId } = featuredCopy[project.id];
  return `<article class="hub-tool-feature" id="hub-${escape(project.id)}">
    <figure>
      <a href="${escape(image.src)}" aria-label="放大${escape(project.name)}界面"><img src="${escape(image.src)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" alt="${escape(image.alt)}"></a>
      <figcaption>公开演示界面 · <a href="${escape(image.src)}">查看大图 ↗</a></figcaption>
    </figure>
    <div class="hub-tool-copy">
      <p class="eyebrow">${escape(category)}</p>
      <h4>${escape(project.name)}</h4>
      <p>${escape(summary)}</p>
      <p class="record-source">${escape(note)}</p>
      ${renderActions(project)}${renderCase(caseId)}
    </div>
  </article>`;
}

function renderCatalogCard(project) {
  const caseId = project.id === 'lighthouse-rescue' ? 'case-lighthouse' : '';
  return `<article class="hub-catalog-item" id="hub-${escape(project.id)}">
    <p class="eyebrow">${escape(project.category)}</p>
    <h5><a href="${escape(project.entry)}">${escape(project.name)} <span aria-hidden="true">↗</span></a></h5>
    <p>${escape(project.brief)}</p>${renderCase(caseId)}
  </article>`;
}

const gameLabels = {
  'zhuanglege-sha': { tags: ['行李安检', 'X 光视图', '闯关判断'], status: 'Unity 网页试玩' },
  'fill-what': { tags: ['成语填字', '诗意来信', '过关结算'], status: 'Unity 小游戏原型' },
  'xiang-le-ge-xiang': { tags: ['推箱解谜', '地图探索', '两关挑战'], status: '网页试玩原型' },
  'nang-keng-pai-pai-xiang': { tags: ['火候与温区', '订单顺序', '十关解谜'], status: 'Unity 网页试玩' },
  'lighthouse-rescue': { tags: ['合作救援', '风暴航行', '修船照明'], status: 'WebGL 本地模拟' },
};

export function renderHubGames() {
  return hubGames.map(game => renderAiGameCard({
    id: 'hub-'+game.id, coverKey: game.id, title: game.name, description: game.brief,
    tags: gameLabels[game.id].tags, status: gameLabels[game.id].status,
    href: game.entry, detailLabel: '项目与试玩',
    secondaryLink: {href: game.video, label: '玩法视频'},
    supplement: game.id === 'lighthouse-rescue' ? renderCase('case-lighthouse') : '',
  })).join('\n');
}

export function renderHubTools(personalApp = '') {
  return `<section class="hub-tool-collection" id="ai-tools" aria-labelledby="ai-tools-title">
    <header class="hub-tool-heading">
      <h3 id="ai-tools-title">AI 应用</h3>
      <a class="text-link" id="hub-hub" href="${escape(snapshot.source)}">完整 Hub ↗</a>
    </header>
    <div class="hub-featured-grid">${featuredHubIds.map(id => renderFeatured(byId.get(id))).join('\n')}</div>
    ${personalApp}
    <section class="hub-catalog" aria-labelledby="hub-apps-title">
      <h4 id="hub-apps-title">更多应用</h4>
      <div class="hub-catalog-list" id="hub-more">${hubApps.map(renderCatalogCard).join('\n')}</div>
    </section>
  </section>`;
}
