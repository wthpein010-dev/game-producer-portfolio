(() => {
  const section = document.getElementById('selected');
  const toggle = document.getElementById('work-search-toggle');
  const panel = document.getElementById('work-search');
  const input = document.getElementById('work-search-input');
  const clear = document.getElementById('work-search-clear');
  const status = document.getElementById('work-search-status');
  const normalize = value => value.normalize('NFKC').toLowerCase();
  const cardSelector = '.ai-game-card, .indie-project, .hub-tool-feature, .hub-catalog-item, #ai-pocket';
  const fieldSelector = [
    'h4', 'h5', '.ai-game-description', '.ai-game-tags', '.project-meta',
    '.secondary-copy > p:not(.record-source, .indie-contribution)',
    '.hub-tool-copy > p:not(.record-source)', '.hub-app-description', '.hub-app-category',
    '.ai-pocket-entry-grid p', '.ai-pocket-entry-grid .collaboration-tags', 'figure img[alt]',
  ].join(', ');
  const cards = [...section.querySelectorAll(cardSelector)].map(card => {
    const fields = [...card.querySelectorAll(fieldSelector)].map(node =>
      normalize(node.getAttribute('alt') ?? node.textContent).replace(/\s+/gu, ''));
    return {card, fields};
  });
  const folds = [...section.querySelectorAll('.work-catalog-toggle')];
  const groups = [...section.querySelectorAll([
    '.ai-game-works', '#mobile-games', '#steam-games', '.indie-games', '.ai-game-section', '.ai-game-grid',
    '#ai-tools', '.hub-featured-grid', '.hub-catalog', '.work-catalog-toggle',
  ].join(', '))].map(group => ({group, children: [...group.querySelectorAll(cardSelector)]}));
  let savedFolds;

  function filter() {
    const terms = normalize(input.value).trim().split(/\s+/u).filter(Boolean);
    const filtering = terms.length > 0;
    if (filtering && !savedFolds) savedFolds = folds.map(fold => fold.open);
    if (!filtering && savedFolds) {
      folds.forEach((fold, index) => { fold.open = savedFolds[index]; });
      savedFolds = undefined;
    }
    const matched = new Set();
    for (const {card, fields} of cards) {
      const visible = terms.every(term => fields.some(field => field.includes(term)));
      card.hidden = !visible;
      if (visible) matched.add(card);
    }
    for (const {group, children} of groups) {
      group.hidden = filtering && !children.some(card => matched.has(card));
    }
    if (filtering) {
      for (const fold of folds) fold.open = !fold.hidden;
    }
    section.toggleAttribute('data-work-filtering', filtering);
    clear.disabled = !input.value;
    status.textContent = filtering
      ? (matched.size ? `找到 ${matched.size} 个作品` : '没有找到匹配的作品。试试更短的关键词。')
      : `可查找 ${cards.length} 个作品`;
    section.dispatchEvent(new Event('work-filter-change', {bubbles: true}));
  }

  function showPanel(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      filter();
      input.focus();
    } else {
      input.value = '';
      filter();
      toggle.focus();
    }
  }

  toggle.hidden = false;
  toggle.addEventListener('click', () => showPanel(panel.hidden));
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.isComposing) showPanel(false);
  });
  input.addEventListener('input', event => { if (!event.isComposing) filter(); });
  input.addEventListener('compositionend', filter);
  clear.addEventListener('click', () => {
    input.value = '';
    filter();
    input.focus();
  });

  function revealLinkedWork(hash) {
    if (!savedFolds || !hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    if (!target || !section.contains(target) || !target.closest('[hidden]')) return;
    input.value = '';
    filter();
    for (let parent = target; parent && parent !== section; parent = parent.parentElement) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
    }
  }
  addEventListener('hashchange', () => revealLinkedWork(location.hash));
  document.addEventListener('click', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link) revealLinkedWork(link.hash);
  });
})();
