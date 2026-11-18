import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../assets/ai-game-covers/manifest.json', import.meta.url), 'utf8'));
export const aiGameCovers = manifest.covers;

const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
);

export function renderAiGameCard({
  id, coverKey = id, title, description, tags, status, href,
  detailLabel = '项目详情', secondaryLink, supplement = '', legacyAnchor, taptap = false,
}) {
  const cover = aiGameCovers[coverKey];
  if (!cover) throw new Error('Missing homepage cover for '+coverKey);
  const headingAnchor = legacyAnchor ? ` id="${escape(legacyAnchor)}"` : '';
  const coverClass = taptap ? 'ai-game-cover taptap-cover' : 'ai-game-cover';
  const cardClass = taptap ? 'ai-game-card taptap-card' : 'ai-game-card';
  const link = secondaryLink ? `<a class="text-link" href="${escape(secondaryLink.href)}">${escape(secondaryLink.label)} <span aria-hidden="true">↗</span></a>` : '';
  const arrow = href.startsWith('https:') ? '↗' : '→';

  return `<article class="${cardClass}" id="${escape(id)}" aria-labelledby="${escape(id)}-title">
    <header class="ai-game-heading"${headingAnchor}><h4 id="${escape(id)}-title">${escape(title)}</h4></header>
    <figure class="${coverClass}">
      <a href="${escape(cover.src)}" aria-label="放大《${escape(title)}》封面"><img src="${escape(cover.src)}" width="${cover.width}" height="${cover.height}" loading="lazy" decoding="async" alt="${escape(cover.alt)}"></a>
    </figure>
    <p class="ai-game-description">${escape(description)}</p>
    <ul class="ai-game-tags" aria-label="玩法特点">${tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>
    <p class="ai-game-status">${escape(status)}</p>
    <footer class="ai-game-actions">
      <div><a class="text-link" href="${escape(href)}">${escape(detailLabel)} <span aria-hidden="true">${arrow}</span></a>${link}</div>${supplement}
    </footer>
  </article>`;
}
