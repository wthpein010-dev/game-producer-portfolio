import assert from 'node:assert/strict';
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { once } from 'node:events';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifacts = join(root, 'artifacts', 'acceptance');
const companySlugs = ['jianyou', 'hero-games', 'bolang', 'quwan', 'muyou', 'beta', 'xingqi', 'haoteng', 'iceshi'];
const homeViewports = [
  { width: 360, height: 800 }, { width: 390, height: 844 },
  { width: 768, height: 1024 }, { width: 1440, height: 1000 },
  { width: 844, height: 390 },
];
const cases = [];
const runtimeErrors = [];
const accessibility = [];
let server;
let browser;
let baseURL;

async function importDependency(names, fallback) {
  const configured = names.map(name => process.env[name]).find(Boolean);
  const module = configured || fallback;
  try {
    return await import(/^(?:[A-Z]:[\\/]|\/)/iu.test(module) ? pathToFileURL(module).href : module);
  } catch (error) {
    throw new Error(`Unable to import ${module}. Set ${names.join(' or ')} to an installed module path. ${error.message}`);
  }
}

async function run(name, action) {
  const started = Date.now();
  try {
    const evidence = await action();
    cases.push({ name, status: 'passed', milliseconds: Date.now() - started, evidence });
    console.log(`PASS ${name}`);
  } catch (error) {
    cases.push({ name, status: 'failed', milliseconds: Date.now() - started, error: error.stack || String(error) });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

function observe(page) {
  page.on('pageerror', error => runtimeErrors.push({ url: page.url(), kind: 'pageerror', message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') runtimeErrors.push({ url: page.url(), kind: 'console', message: message.text() });
  });
  page.on('requestfailed', request => {
    const error = request.failure()?.errorText;
    if (!error?.includes('ERR_ABORTED')) runtimeErrors.push({ url: request.url(), kind: 'requestfailed', message: error });
  });
}

async function navigate(page, route) {
  const target = new URL(route, baseURL);
  const navigation = await page.goto(target.href, { waitUntil: 'networkidle', timeout: 30_000 });
  // A same-document hash navigation has no navigation response. Verify the
  // underlying route without changing its browser history or scroll position.
  target.hash = '';
  const response = navigation || await page.request.get(target.href);
  assert.equal(response?.status(), 200, `${route} must be a real directly addressable page`);
  await page.locator('main').waitFor({ state: 'visible' });
  return response;
}

async function imagesDecode(page) {
  const images = await page.locator('img').evaluateAll(async images => {
    return Promise.all(images.map(async image => {
      image.loading = 'eager';
      let error;
      try {
        await Promise.race([
          image.decode(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('image decode timed out')), 10_000)),
        ]);
      } catch (failure) { error = failure.message; }
      return { src: image.getAttribute('src'), alt: image.getAttribute('alt'), complete: image.complete, width: image.naturalWidth, height: image.naturalHeight, error };
    }));
  });
  assert.ok(images.length > 0, `${page.url()} contains its actual illustrations`);
  assert.deepEqual(images.filter(image => image.error || !image.complete || !image.width || !image.height || image.alt === null), [], `${page.url()} images decode and declare alternatives`);
  return images;
}

async function noOverflow(page) {
  const measurement = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')].flatMap(element => {
      if (!element.checkVisibility() || !element.getClientRects().length) return [];
      const bounds = element.getBoundingClientRect();
      return bounds.width && (bounds.left < -1 || bounds.right > viewport + 1)
        ? [{ tag: element.tagName, id: element.id, class: element.className?.baseVal ?? element.className, left: Math.round(bounds.left), right: Math.round(bounds.right) }]
        : [];
    });
    return { viewport, document: document.documentElement.scrollWidth, body: document.body.scrollWidth, offenders: offenders.slice(0, 12) };
  });
  assert.ok(measurement.document <= measurement.viewport + 1 && measurement.body <= measurement.viewport + 1,
    `${page.url()} horizontal overflow: ${JSON.stringify(measurement)}`);
  assert.deepEqual(measurement.offenders, [], `${page.url()} visible elements remain inside the viewport`);
  return measurement;
}

async function screenshot(page, name) {
  const file = `${name}.png`;
  await page.screenshot({ path: join(artifacts, file), fullPage: true, animations: 'disabled' });
  return `artifacts/acceptance/${file}`;
}

async function audit(page, AxeBuilder, name) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  const summary = {
    name, url: page.url(), passes: result.passes.length,
    incomplete: result.incomplete.map(rule => ({ id: rule.id, nodes: rule.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })),
    violations: result.violations.map(rule => ({ id: rule.id, impact: rule.impact, help: rule.help, helpUrl: rule.helpUrl, nodes: rule.nodes.map(node => ({ target: node.target, html: node.html, summary: node.failureSummary })) })),
  };
  accessibility.push(summary);
  assert.ok(result.passes.length >= 10, `${name}: audit must inspect meaningful rendered content`);
  assert.equal(summary.violations.length, 0, `${name} WCAG A/AA violations: ${JSON.stringify(summary.violations)}`);
  return { passedRules: summary.passes, incompleteRules: summary.incomplete.length };
}

async function restoredCompany(page, slug, expectedY) {
  await page.locator('body[data-page="home"]').waitFor();
  await page.waitForFunction(() => document.readyState === 'complete');
  await page.waitForTimeout(180);
  const placement = await page.locator(`#company-${slug}`).evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return { hash: location.hash, top: bounds.top, bottom: bounds.bottom, viewport: innerHeight, scrollY };
  });
  assert.equal(placement.hash, `#company-${slug}`);
  assert.ok(placement.top < placement.viewport && placement.bottom > 0, `Return reaches ${slug}: ${JSON.stringify(placement)}`);
  assert.ok(Math.abs(placement.scrollY - expectedY) <= 96, `Return restores ${slug} position: expected ${expectedY}, got ${placement.scrollY}`);
  return placement;
}

async function keyboardFocus(page, locator) {
  await locator.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  assert.ok(await locator.evaluate(element => element === document.activeElement), 'Keyboard focus reaches the expected node');
  const focus = await locator.evaluate(element => {
    const style = getComputedStyle(element);
    return { visible: element.matches(':focus-visible'), outline: style.outlineStyle, width: parseFloat(style.outlineWidth), shadow: style.boxShadow };
  });
  assert.ok(focus.visible && ((focus.outline !== 'none' && focus.width > 0) || focus.shadow !== 'none'), `Keyboard focus is visible: ${JSON.stringify(focus)}`);
}

try {
  await mkdir(artifacts, { recursive: true });
  const [playwright, axe, content] = await Promise.all([
    importDependency(['PLAYWRIGHT_MODULE', 'PORTFOLIO_PLAYWRIGHT_MODULE'], 'playwright'),
    importDependency(['AXE_MODULE', 'PORTFOLIO_AXE_MODULE'], '@axe-core/playwright'),
    import(pathToFileURL(join(root, 'src', 'content.mjs')).href),
  ]);
  const AxeBuilder = axe.default ?? axe.AxeBuilder;
  assert.equal(typeof AxeBuilder, 'function', 'AxeBuilder must be available for real accessibility auditing');
  if (process.env.PORTFOLIO_BASE_URL) {
    baseURL = process.env.PORTFOLIO_BASE_URL.replace(/\/?$/u, '/');
  } else {
    const { createSiteServer } = await import(pathToFileURL(join(root, 'scripts', 'serve.mjs')).href);
    server = createSiteServer({ root });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    baseURL = `http://127.0.0.1:${server.address().port}/`;
  }
  const executablePath = process.env.PORTFOLIO_CHROME_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (executablePath) await access(executablePath);
  browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const projectRecords = content.jobs.flatMap(job => job.projects.map(project => ({ ...project, companySlug: job.slug })));
  assert.equal(projectRecords.length, 15);
  const routes = [
    ...companySlugs.map(slug => ({ route: `experience/${slug}/index.html`, slug, type: 'company' })),
    ...projectRecords.map(project => ({ route: `projects/${project.slug}/index.html`, slug: project.companySlug, type: 'project', title: project.title })),
  ];
  const context = await browser.newContext();
  const page = await context.newPage();
  observe(page);

  for (const viewport of homeViewports) {
    await run(`home ${viewport.width}x${viewport.height}: timeline, images, no overflow`, async () => {
      await page.setViewportSize(viewport);
      await navigate(page, 'index.html');
      assert.deepEqual(await page.locator('.company-entry').evaluateAll(entries => entries.map(entry => entry.dataset.company)), companySlugs);
      const geometry = await noOverflow(page);
      const images = await imagesDecode(page);
      const picture = await screenshot(page, `home-${viewport.width}x${viewport.height}`);
      return { geometry, imageCount: images.length, screenshot: picture };
    });
  }

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const detail of routes) {
      await run(`${detail.route} at ${width}: direct route, imagery, no overflow`, async () => {
        await navigate(page, detail.route);
        assert.equal(await page.locator('body').getAttribute('data-page'), detail.type);
        assert.equal(await page.locator('body').getAttribute('data-company'), detail.slug);
        assert.equal(await page.locator('h1').count(), 1);
        if (detail.title) assert.ok((await page.locator('h1').innerText()).includes(detail.title));
        assert.equal(await page.locator('figure.illustration figcaption').count(), 1);
        assert.match(await page.locator('figure.illustration figcaption').innerText(), /原创职责结构示意.*非游戏实机画面/u);
        const geometry = await noOverflow(page);
        const images = await imagesDecode(page);
        const picture = await screenshot(page, `${detail.type}-${detail.route.split('/')[1]}-${width}`);
        return { geometry, imageCount: images.length, screenshot: picture };
      });
    }
  }

  for (const width of [1440, 390]) {
    await run(`home ${width}: WCAG A/AA with every branch expanded`, async () => {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await navigate(page, 'index.html');
      await page.locator('details.branch-group').evaluateAll(groups => groups.forEach(group => { group.open = true; }));
      await noOverflow(page);
      return audit(page, AxeBuilder, `home-${width}-expanded`);
    });
  }
  for (const slug of companySlugs) {
    await run(`${slug} detail family: WCAG A/AA at 390`, async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await navigate(page, `experience/${slug}/index.html`);
      return audit(page, AxeBuilder, `company-${slug}-390`);
    });
  }
  for (const slug of companySlugs) {
    const project = projectRecords.find(record => record.companySlug === slug);
    await run(`${slug} representative project: WCAG A/AA at 390`, async () => {
      await navigate(page, `projects/${project.slug}/index.html`);
      return audit(page, AxeBuilder, `project-${project.slug}-390`);
    });
  }

  await run('phone branches expand and collapse using native summary controls', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await navigate(page, 'index.html');
    for (const kind of ['projects', 'scope']) {
      const branch = page.locator(`#branch-hero-games-${kind}`);
      if (await branch.getAttribute('open') !== null) await branch.locator('summary').click();
      assert.equal(await branch.getAttribute('open'), null);
      await branch.locator('summary').click();
      assert.notEqual(await branch.getAttribute('open'), null);
      assert.ok(await branch.locator('a.mindmap-node').first().isVisible());
      await noOverflow(page);
      await branch.locator('summary').click();
      assert.equal(await branch.getAttribute('open'), null);
      assert.equal(await branch.locator('a.mindmap-node').first().isVisible(), false);
    }
    return { screenshot: await screenshot(page, 'phone-disclosures-collapsed') };
  });

  await run('company navigation restores company hash and position through back, forward, and return link', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await navigate(page, 'index.html#company-quwan');
    const entry = page.locator('#company-quwan');
    await entry.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    const expectedY = await page.evaluate(() => scrollY);
    await entry.locator('.company-title').click();
    await page.locator('body[data-page="company"][data-company="quwan"]').waitFor();
    await page.goBack({ waitUntil: 'networkidle' });
    await restoredCompany(page, 'quwan', expectedY);
    await page.goForward({ waitUntil: 'networkidle' });
    await page.locator('body[data-page="company"][data-company="quwan"]').waitFor();
    await page.locator('.detail-footer [data-return-home]').click();
    await restoredCompany(page, 'quwan', expectedY);
    await page.goBack({ waitUntil: 'networkidle' });
    await page.locator('body[data-page="company"][data-company="quwan"]').waitFor();
    await page.goForward({ waitUntil: 'networkidle' });
    return restoredCompany(page, 'quwan', expectedY);
  });

  await run('project nodes reach real project pages and return to their source company', async () => {
    await navigate(page, 'index.html#company-jianyou');
    const branch = page.locator('#branch-jianyou-projects');
    if (await branch.getAttribute('open') === null) await branch.locator('summary').click();
    const node = branch.locator('a[data-kind="project"]').first();
    const title = (await node.innerText()).replace(/^PROJECT\s*/u, '').replace(/\s*↗$/u, '').trim();
    await node.click();
    await page.locator('body[data-page="project"][data-company="jianyou"]').waitFor();
    assert.ok((await page.locator('h1').innerText()).includes(title.trim()));
    await page.locator('.detail-footer [data-return-home]').click();
    assert.equal(new URL(page.url()).hash, '#company-jianyou');
    return { title, screenshot: await screenshot(page, 'project-return-home') };
  });

  await run('role and scope nodes address their company sections', async () => {
    for (const section of ['role', 'scope']) {
      await navigate(page, 'index.html#company-jianyou');
      const link = section === 'role' ? page.locator('#company-jianyou .role-node') : page.locator('#branch-jianyou-scope a[data-kind="scope"]').first();
      if (section === 'scope' && await page.locator('#branch-jianyou-scope').getAttribute('open') === null) await page.locator('#branch-jianyou-scope summary').click();
      await link.click();
      await page.locator('body[data-page="company"][data-company="jianyou"]').waitFor();
      assert.equal(new URL(page.url()).searchParams.get('section'), section);
      await page.waitForTimeout(180);
      const bounds = await page.locator(`#${section}`).evaluate(element => ({ top: element.getBoundingClientRect().top, height: innerHeight }));
      assert.ok(bounds.top >= -1 && bounds.top < bounds.height, `${section} is reached: ${JSON.stringify(bounds)}`);
    }
  });

  await run('keyboard focus, Enter disclosure, and Enter project navigation', async () => {
    await navigate(page, 'index.html');
    const branch = page.locator('#branch-jianyou-projects');
    if (await branch.getAttribute('open') !== null) await branch.locator('summary').click();
    const summary = branch.locator('summary');
    await keyboardFocus(page, summary);
    await page.keyboard.press('Enter');
    assert.notEqual(await branch.getAttribute('open'), null);
    const project = branch.locator('a[data-kind="project"]').first();
    await keyboardFocus(page, project);
    const picture = await screenshot(page, 'keyboard-project-focus');
    await page.keyboard.press('Enter');
    await page.locator('body[data-page="project"]').waitFor();
    return { screenshot: picture, destination: page.url() };
  });

  await run('reduced motion disables long transitions and preserves navigation', async () => {
    const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const reducedPage = await reduced.newPage();
    observe(reducedPage);
    try {
      await navigate(reducedPage, 'index.html');
      const motion = await reducedPage.evaluate(() => {
        const seconds = value => value.split(',').map(item => item.trim().endsWith('ms') ? parseFloat(item) / 1000 : parseFloat(item));
        const moving = [...document.querySelectorAll('*')].flatMap(element => {
          const style = getComputedStyle(element);
          const durations = [...seconds(style.animationDuration), ...seconds(style.transitionDuration)];
          return durations.some(duration => duration > 0.05) ? [{ tag: element.tagName, class: element.className, durations }] : [];
        });
        return { reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, moving };
      });
      assert.equal(motion.reduced, true);
      assert.equal(motion.scrollBehavior, 'auto');
      assert.deepEqual(motion.moving, []);
      await reducedPage.locator('#company-jianyou .company-title').click();
      await reducedPage.locator('body[data-page="company"]').waitFor();
      return motion;
    } finally { await reduced.close(); }
  });

  await run('without JavaScript, timeline branches and all detail families remain usable', async () => {
    const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const plainPage = await plain.newPage();
    observe(plainPage);
    try {
      await navigate(plainPage, 'index.html');
      assert.equal(await plainPage.locator('.company-entry .company-title').count(), 9);
      await noOverflow(plainPage);
      const branch = plainPage.locator('#branch-jianyou-projects');
      if (await branch.getAttribute('open') === null) await branch.locator('summary').click();
      await branch.locator('a[data-kind="project"]').first().click();
      await plainPage.locator('body[data-page="project"]').waitFor();
      await imagesDecode(plainPage);
      await plainPage.locator('.detail-footer [data-return-home]').click();
      assert.equal(new URL(plainPage.url()).hash, '#company-jianyou');
      for (const slug of companySlugs) {
        await navigate(plainPage, `experience/${slug}/index.html`);
        assert.equal(await plainPage.locator('#role, #scope, #projects').count(), 3);
        await noOverflow(plainPage);
        await imagesDecode(plainPage);
      }
      return { families: companySlugs.length, screenshot: await screenshot(plainPage, 'no-js-lab-detail') };
    } finally { await plain.close(); }
  });

  await run('long Chinese titles and responsibility text wrap at 360 without clipping', async () => {
    const longText = '复杂玩法系统与跨职能项目协作的完整职责说明'.repeat(10);
    await page.setViewportSize({ width: 360, height: 800 });
    await navigate(page, 'index.html');
    await page.locator('h1').evaluate((element, value) => { element.textContent = value; }, longText);
    await page.locator('.company-title').first().evaluate((element, value) => { element.textContent = value; }, longText);
    await page.locator('#branch-jianyou-projects').evaluate(element => { element.open = true; });
    await page.locator('#branch-jianyou-projects a').first().evaluate((element, value) => { element.textContent = value; }, longText);
    await noOverflow(page);
    const homePicture = await screenshot(page, 'long-chinese-home-360');
    await navigate(page, 'experience/jianyou/index.html');
    await page.locator('h1').evaluate((element, value) => { element.textContent = value; }, longText);
    await page.locator('.scope-list li').first().evaluate((element, value) => { element.textContent = value; }, longText);
    await noOverflow(page);
    return { screenshots: [homePicture, await screenshot(page, 'long-chinese-detail-360')] };
  });

  await run('browser has no uncaught JavaScript, console, or failed resource requests', async () => {
    assert.deepEqual(runtimeErrors, []);
  });
  await context.close();
} catch (error) {
  cases.push({ name: 'acceptance setup', status: 'failed', error: error.stack || String(error) });
  console.error(error.stack || String(error));
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((done, reject) => server.close(error => error ? reject(error) : done()));
  await mkdir(artifacts, { recursive: true });
  const report = { timestamp: new Date().toISOString(), baseURL, summary: { total: cases.length, passed: cases.filter(result => result.status === 'passed').length, failed: cases.filter(result => result.status === 'failed').length }, cases, runtimeErrors, accessibility };
  await writeFile(join(artifacts, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(join(artifacts, 'axe.json'), `${JSON.stringify(accessibility, null, 2)}\n`, 'utf8');
  console.log(`Acceptance: ${report.summary.passed}/${report.summary.total} passed; private report: artifacts/acceptance/report.json`);
  if (report.summary.failed) process.exitCode = 1;
}
