(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const page = document.body.dataset.page;
  const slug = location.pathname.match(/\/projects\/([^/]+)/)?.[1];
  const theme = slug === 'idiom-scholar' ? 'steps' : slug === 'word-villas' ? 'slide'
    : ['matchmaking-inc', 'vanity-fair'].includes(slug) ? 'route'
    : document.body.dataset.company === 'hero-games' ? 'blueprint' : 'journal';
  document.body.dataset.readingMotion = theme;
  const galleries = [];
  let sequence = 0;
  const animate = node => {
    if (reduced.matches || !node.animate) return;
    const from = theme === 'slide' ? {transform:'translateX(18px)',opacity:.65}
      : theme === 'steps' ? {transform:'translateY(8px)',opacity:.8} : {opacity:.6};
    node.animate([from,{transform:'none',opacity:1}], {duration:260,easing:'ease-out'});
  };

  if (page === 'home' && !location.hash.startsWith('#company-')) {
    document.querySelectorAll('.branch-group[id$="-scope"]').forEach(branch => {branch.open=false;});
  }
  if (page === 'project') {
    const covers = {
      'idiom-scholar':['idiom-scholar/promotional-cover.png',960,334,'成语小秀才 · 项目推广素材'],
      'word-villas':['word-villas/promotional-cover.jpg',1280,720,'Word Villas · 宣传视频封面'],
      'matchmaking-inc':['matchmaking-inc/promotional-cover.jpg',460,215,'中国式相亲 · Steam 官方宣传图']
    };
    const cover = covers[slug];
    if (cover) {
      const figure=document.createElement('figure');figure.className='project-visual-overview';
      const img=document.createElement('img');
      img.src=`../../assets/project-design/${cover[0]}`;img.width=cover[1];img.height=cover[2];img.alt=cover[3];
      const caption=document.createElement('figcaption');caption.textContent=cover[3];
      figure.append(img,caption);document.querySelector('.detail-hero').after(figure);
    }
  }

  // Keep the complete evidence in the document; scripts only change its reading state.
  const makeGallery = (section, panels) => {
    if (panels.length < 2) return;
    const id = `reading-gallery-${++sequence}`;
    const tabs = document.createElement('div');
    tabs.className = 'reading-gallery-tabs';
    tabs.setAttribute('role','tablist');
    tabs.setAttribute('aria-label',section.querySelector('h2')?.textContent || '项目资料');
    const buttons = panels.map((panel,index) => {
      panel.id ||= `${id}-panel-${index}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.id = `${id}-tab-${index}`;
      button.textContent = panel.querySelector('h3,h2')?.textContent || `资料 ${index+1}`;
      button.setAttribute('role','tab');
      button.setAttribute('aria-controls',panel.id);
      panel.setAttribute('role','tabpanel');
      panel.setAttribute('aria-labelledby',button.id);
      panel.tabIndex = 0;
      tabs.append(button);
      return button;
    });
    const select = (index, focus=false, motion=true) => {
      buttons.forEach((button,n) => {
        button.setAttribute('aria-selected',String(n===index));
        button.tabIndex = n===index ? 0 : -1;
        panels[n].hidden = n!==index;
      });
      if (focus) buttons[index].focus();
      if (motion) animate(panels[index]);
    };
    buttons.forEach((button,index) => {
      button.addEventListener('click',() => select(index));
      button.addEventListener('keydown',event => {
        const target = {ArrowRight:(index+1)%buttons.length,ArrowLeft:(index+buttons.length-1)%buttons.length,Home:0,End:buttons.length-1}[event.key];
        if (target !== undefined) {event.preventDefault();select(target,true);}
      });
    });
    section.classList.add('reading-gallery');
    panels[0].before(tabs);
    for (const nav of section.querySelectorAll(':scope > .idiom-jumps')) {
      for (const link of [...nav.querySelectorAll('a')]) {
        if (panels.some(panel => link.getAttribute('href') === `#${panel.id}`)) link.remove();
      }
      if (!nav.children.length) nav.remove();
    }
    galleries.push({panels,select});
    select(0,false,false);
  };

  if (page === 'company') {
    const main = document.querySelector('main');
    for (const section of main.querySelectorAll(':scope > .matchmaking-design, :scope > .project-design')) {
      const heading = section.querySelector('h2');
      if (!heading) continue;
      const fold = document.createElement('details');
      fold.className = 'company-evidence-fold';
      const summary = document.createElement('summary');
      const label = document.createElement('span');
      const titles=[...main.querySelectorAll('.project-links strong')].map(node=>node.textContent);
      label.textContent = section.id === 'materials' ? `${titles.join(' · ')} / 项目资料` : heading.textContent;
      const preview = document.createElement('span');
      preview.className = 'evidence-preview';
      const originals = [...section.querySelectorAll('figure img')].filter(img => img.getAttribute('src').includes('/project-design/'));
      const seen = new Set();
      for (const img of originals) {
        if (seen.has(img.src)) continue;
        seen.add(img.src);
        const thumb = img.cloneNode(false);
        thumb.alt = '';thumb.removeAttribute('id');thumb.loading = 'lazy';
        preview.append(thumb);
        if (seen.size === 3) break;
      }
      const indicator = document.createElement('span');
      indicator.className = 'fold-indicator';indicator.setAttribute('aria-hidden','true');indicator.textContent = '+';
      summary.append(label,preview,indicator);
      section.before(fold);fold.append(summary,section);
    }
  } else {
    for (const section of document.querySelectorAll('.matchmaking-design, .idiom-design')) {
      let panels = [...section.children].filter(node => node.matches('article.matchmaking-map'));
      if (section.id === 'idiom-design') panels = [...section.children].filter(node => node.matches('.idiom-chapter'));
      makeGallery(section,panels);
    }
  }

  for (const item of document.querySelectorAll('.work-value-item')) {
    const dl = item.querySelector('dl');
    const value = dl?.children[1];
    if (!value) continue;
    const fold = document.createElement('details');
    fold.className = 'work-value-more';
    const summary = document.createElement('summary');summary.textContent = '工作价值';
    const valueList = document.createElement('dl');
    valueList.append(value);fold.append(summary,valueList);dl.after(fold);
    item.classList.add('work-value-compact');
  }

  for (const note of document.querySelectorAll('section > .matchmaking-boundary, section > .idiom-boundary')) {
    const fold=document.createElement('details');fold.className='reading-source';
    const summary=document.createElement('summary');summary.textContent='资料来源与职责边界';
    note.before(fold);fold.append(summary,note);
  }
  for (const notes of document.querySelectorAll('.matchmaking-map-notes, .idiom-evidence-copy')) {
    for (const heading of notes.querySelectorAll('h4')) {
      if (heading.textContent !== '文档产出' || heading.nextElementSibling?.tagName !== 'P') continue;
      const text=heading.nextElementSibling;
      const fold=document.createElement('details');fold.className='reading-source';
      const summary=document.createElement('summary');summary.textContent='文档产出';
      heading.before(fold);fold.append(summary,text);heading.remove();
    }
    for (const list of notes.querySelectorAll('ul')) {
      if (list.children.length <= 3) continue;
      const fold=document.createElement('details');fold.className='reading-source';
      const summary=document.createElement('summary');summary.textContent='补充设计细节';
      const rest=document.createElement('ul');
      [...list.children].slice(3).forEach(item=>rest.append(item));
      list.after(fold);fold.append(summary,rest);
    }
  }
  for (const list of document.querySelectorAll('.indie-planning > ul')) {
    list.classList.add('reading-milestones');
    for (const item of [...list.children]) {
      const heading=item.querySelector('strong');
      if (!heading) continue;
      const fold=document.createElement('details');fold.className='indie-work-step';
      const summary=document.createElement('summary');summary.textContent=heading.textContent;
      const text=document.createElement('div');
      heading.remove();while(item.firstChild)text.append(item.firstChild);
      fold.append(summary,text);item.append(fold);
    }
  }

  const reveal = hash => {
    if (!hash || hash === '#') return;
    let target;
    try {target = document.getElementById(decodeURIComponent(hash.slice(1)));} catch {return;}
    if (!target) return;
    for (const {panels,select} of galleries) {
      const index = panels.findIndex(panel => panel === target || panel.contains(target));
      if (index >= 0) select(index,false,false);
    }
    for (let parent=target;parent;parent=parent.parentElement) {
      if (parent instanceof HTMLDetailsElement) parent.open=true;
    }
    requestAnimationFrame(() => target.scrollIntoView({block:'start',behavior:'instant'}));
  };
  addEventListener('hashchange',() => reveal(location.hash));
  document.addEventListener('click',event => {
    const link = event.target.closest('a');
    if (!link) return;
    const url = new URL(link.href,location.href);
    if (url.pathname === location.pathname && url.hash && url.origin === location.origin) reveal(url.hash);
  });
  if (location.hash && !(page==='home' && location.hash.startsWith('#company-'))) reveal(location.hash);

  const dialog = document.createElement('dialog');
  dialog.className = 'reading-lightbox';
  dialog.setAttribute('aria-label','项目原图');
  const close = document.createElement('button');
  close.type='button';close.className='lightbox-close';close.textContent='×';close.title='关闭';close.setAttribute('aria-label','关闭原图');
  const image = document.createElement('img');
  const caption = document.createElement('p');
  const original = document.createElement('a');original.textContent='打开原图 ↗';
  dialog.append(close,caption,original);document.body.append(dialog);
  dialog.addEventListener('close',() => image.remove());
  close.addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {if(event.target===dialog)dialog.close();});
  document.addEventListener('click',event => {
    const link = event.target.closest('figure a');
    const img = link?.querySelector('img');
    if (!img || !link.getAttribute('href')?.match(/\.(png|jpe?g|webp)$/i) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    image.src=link.href;image.alt=img.alt;
    caption.textContent=link.closest('figure').querySelector('figcaption')?.textContent || img.alt;
    original.href=link.href;close.after(image);dialog.showModal();
  });

  let printState=[];
  addEventListener('beforeprint',() => {
    printState=[...document.querySelectorAll('details')].map(node=>[node,node.open]);
    printState.forEach(([node])=>{node.open=true;});
  });
  addEventListener('afterprint',() => {printState.forEach(([node,open])=>{node.open=open;});});

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reading-in-view');
        if (page==='home') animate(entry.target);
        observer.unobserve(entry.target);
      }
    },{threshold:.12});
    document.querySelectorAll('.career-case, .company-entry, .scope-list li, .indie-project, .work-value-item').forEach(node => observer.observe(node));
  }
})();
