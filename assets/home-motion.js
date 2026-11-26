(() => {
  const updateNavs = [...document.querySelectorAll('.chapter-rail, .personal-work-nav')].map(nav => {
    const links = [...nav.querySelectorAll('a[href^="#"]')].map(link => ({
      link,
      target: document.getElementById(link.hash.slice(1)),
    })).filter(({target}) => target);
    const scope = nav.closest('section');
    let active;
    return readingLine => {
      const withinScope = scope.getBoundingClientRect().bottom > readingLine;
      const next = withinScope
        ? links.findLast(({target}) => target.getBoundingClientRect().top <= readingLine)?.link
        : undefined;
      if (next === active) return;
      active?.removeAttribute('aria-current');
      next?.setAttribute('aria-current', 'location');
      active = next;
    };
  });

  let frame;
  const refreshNavs = () => {
    if (frame !== undefined) return;
    frame = requestAnimationFrame(() => {
      const readingLine = innerHeight * .42;
      updateNavs.forEach(update => update(readingLine));
      frame = undefined;
    });
  };
  addEventListener('scroll', refreshNavs, {passive: true});
  addEventListener('resize', refreshNavs);
  addEventListener('hashchange', refreshNavs);
  addEventListener('pageshow', refreshNavs);
  document.addEventListener('toggle', refreshNavs, true);
  refreshNavs();

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      target.classList.add('home-motion-in-view');
      observer.unobserve(target);
    }
  }, {threshold: .12});
  document.querySelectorAll('.producer-skills, .project-gallery-grid li, #selected :is(.ai-game-card, .hub-tool-feature, .hub-catalog-item, #ai-pocket)')
    .forEach(target => observer.observe(target));
})();
