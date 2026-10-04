(() => {
  document.documentElement.classList.add('is-enhanced');
  const storageKey = 'career-reading-state-v1';
  const companyIds = [...document.querySelectorAll('.company-entry')].map(el => el.id);
  const branches = [...document.querySelectorAll('.company-entry .branch-group')];
  let state = null;
  try { state = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); } catch {}
  const isHome = document.body.dataset.page === 'home';
  if (isHome) {
    const validState = state && Array.isArray(state.open) && Number.isFinite(state.scrollY);
    const returning = location.hash.startsWith('#company-') && state?.companyId === location.hash.slice(1);
    for (const branch of branches) {
      if (validState && returning) branch.open = state.open.includes(branch.id);
      else if (matchMedia('(max-width: 700px)').matches) branch.open = branch.dataset.priority === 'true';
    }
    const save = companyId => {
      const record = { companyId: companyIds.includes(companyId) ? companyId : state?.companyId, scrollY: scrollY, open: branches.filter(el => el.open).map(el => el.id) };
      try { sessionStorage.setItem(storageKey, JSON.stringify(record)); } catch {}
      state = record;
    };
    document.addEventListener('click', event => {
      const link = event.target.closest('a');
      const entry = link?.closest('.company-entry');
      if (entry && new URL(link.href).origin === location.origin) save(entry.id);
    });
    addEventListener('pagehide', () => save(state?.companyId));
    if (validState && returning) requestAnimationFrame(() => requestAnimationFrame(() => scrollTo({top:state.scrollY,behavior:'instant'})));
  } else {
    const section = new URLSearchParams(location.search).get('section');
    if (['role','scope'].includes(section)) {
      const target = document.getElementById(section);
      if (target) requestAnimationFrame(() => { target.tabIndex = -1; target.focus({preventScroll:true}); target.scrollIntoView({behavior:'instant',block:'start'}); });
    }
  }
  const tabs = [...document.querySelectorAll('[data-tabs] [role="tab"]')];
  const activate = (tab, focus = false) => {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }
    if (focus) tab.focus();
  };
  for (const tab of tabs) {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const index = tabs.indexOf(tab);
      const targets = {ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
      if (event.key in targets) { event.preventDefault(); activate(tabs[targets[event.key]],true); }
    });
  }
  if (tabs.length) activate(tabs[0]);
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  for (const filter of filters) filter.addEventListener('click', () => {
    for (const button of filters) button.setAttribute('aria-pressed', String(button === filter));
    for (const card of cards) card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
    document.getElementById('archive-count').textContent = `${cards.filter(card => !card.hidden).length} 个精选项目`;
  });
  const revealCase = hash => {
    if (!hash?.startsWith('#case-')) return;
    const detail = document.getElementById(hash.slice(1));
    if (detail instanceof HTMLDetailsElement) detail.open = true;
  };
  document.addEventListener('click', event => { const link=event.target.closest('a[href^="#case-"]');if(link)revealCase(link.getAttribute('href')); });
  addEventListener('hashchange', () => revealCase(location.hash));
  revealCase(location.hash);
})();
