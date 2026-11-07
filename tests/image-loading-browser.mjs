import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createSiteServer } from '../scripts/serve.mjs';

// Run this file explicitly. Never run an unfiltered Node test discovery on this machine.
// PLAYWRIGHT_MODULE and PORTFOLIO_CHROME_PATH use the same overrides as browser-smoke.mjs.
const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = path.join(root, 'artifacts', 'image-speed-20261107');
const dependency = process.env.PLAYWRIGHT_MODULE || process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright';
const moduleURL = /^(?:[A-Z]:[\\/]|\/)/iu.test(dependency) ? pathToFileURL(dependency).href : dependency;
const cases = [];
const runtimeErrors = [];
const resourceErrors = [];
const viewports = [{ width: 390, height: 844 }, { width: 1440, height: 1000 }];
const driving = 'assets/taptap/lunar-freight/driving.webp';
const dialogue = 'assets/taptap/lunar-freight/dialogue.webp';
const workflow = 'assets/project-design/sheep-match/editor-workflow.jpeg';
const fixtures = [
  { name: 'home card', route: 'index.html', selector: '#work-lunar-freight .taptap-cover img' },
  { name: 'game detail', route: 'projects/taptap-lunar-freight/', selector: '.taptap-hero-shot img' },
];
let server;
let browser;
let baseURL;
let errorFixture;

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

function observe(page, { expectedFailures = new Set() } = {}) {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  page.on('pageerror', error => runtimeErrors.push({ url: page.url(), message: error.message }));
  page.on('requestfailed', request => {
    if (!expectedFailures.has(request.url()) && !request.failure()?.errorText?.includes('ERR_ABORTED')) {
      resourceErrors.push({ url: request.url(), error: request.failure()?.errorText });
    }
  });
  page.on('response', response => {
    if (response.status() >= 400 && !response.url().endsWith('/favicon.ico') && !expectedFailures.has(response.url())) {
      resourceErrors.push({ url: response.url(), status: response.status() });
    }
  });
  return requests;
}

async function navigate(page, route) {
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle', timeout: 30_000 });
  assert.equal(response?.status(), 200, `${route} is directly addressable`);
  await page.locator('main').waitFor({ state: 'visible' });
}

async function imageState(locator) {
  return locator.evaluate(image => ({
    src: image.getAttribute('src'), currentSrc: image.currentSrc, srcset: image.getAttribute('srcset'),
    sizes: image.getAttribute('sizes'), original: image.getAttribute('data-original-src'), alt: image.alt,
    declaredWidth: Number(image.getAttribute('width')), declaredHeight: Number(image.getAttribute('height')),
    naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight,
    renderedWidth: image.getBoundingClientRect().width, renderedHeight: image.getBoundingClientRect().height,
    objectFit: getComputedStyle(image).objectFit,
    previewFallback: image.dataset.previewFallback,
    complete: image.complete, dpr: devicePixelRatio,
  }));
}

function candidates(state, pageURL) {
  return (state.srcset || '').split(',').filter(Boolean).map(value => {
    const [url, width] = value.trim().split(/\s+/u);
    assert.match(width || '', /^\d+w$/u, 'Responsive sources declare physical widths');
    return { url: new URL(url, pageURL).href, width: Number(width.slice(0, -1)) };
  }).sort((a, b) => a.width - b.width);
}

function assertRatio(width, height, expectedWidth, expectedHeight, message) {
  assert.ok(width > 0 && height > 0, `${message}: positive dimensions`);
  // Width variants may round their height to a whole pixel.
  assert.ok(Math.abs(width / height - expectedWidth / expectedHeight) <= Math.max(0.015, expectedWidth / expectedHeight * 0.01),
    `${message}: ${width}x${height} preserves ${expectedWidth}x${expectedHeight}`);
}

async function decodeOptimized(page, selector) {
  const image = page.locator(selector);
  assert.equal(await image.count(), 1, `${selector} identifies a real page image`);
  let state = await imageState(image);
  assert.ok(state.srcset, `${selector} offers responsive thumbnails rather than the full original`);
  assert.ok(state.sizes, `${selector} declares its rendered slot size`);
  assert.ok(state.original, `${selector} preserves its original source separately`);
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(async image => { image.loading = 'eager'; await image.decode(); });
  state = await imageState(image);
  const sources = candidates(state, page.url());
  assert.ok(sources.length >= 2, `${selector} has a real responsive choice`);
  const selected = sources.find(source => source.url === state.currentSrc);
  assert.ok(selected, `${state.currentSrc} is a declared responsive source`);
  assert.match(new URL(state.currentSrc).pathname, /\.webp$/iu, 'Thumbnails use WebP');
  assert.notEqual(state.currentSrc, new URL(state.original, page.url()).href, 'The thumbnail is distinct from the original');
  assert.ok(state.complete && state.alt.trim(), 'A decoded image retains a descriptive alternative');
  assertRatio(state.naturalWidth, state.naturalHeight, state.declaredWidth, state.declaredHeight, 'Thumbnail intrinsic ratio');
  const intrinsicRatio = state.declaredWidth / state.declaredHeight;
  const contained = state.objectFit === 'contain';
  const paintedWidth = contained ? Math.min(state.renderedWidth, state.renderedHeight * intrinsicRatio) : state.renderedWidth;
  const paintedHeight = contained ? Math.min(state.renderedHeight, state.renderedWidth / intrinsicRatio) : state.renderedHeight;
  assertRatio(paintedWidth, paintedHeight, state.declaredWidth, state.declaredHeight, 'Displayed image ratio');
  state.paintedWidth = paintedWidth;
  state.paintedHeight = paintedHeight;
  const required = Math.min(paintedWidth * state.dpr, sources.at(-1).width);
  const adequate = sources.find(source => source.width >= required * 0.95) || sources.at(-1);
  assert.ok(selected.width >= required * 0.85, `Selected ${selected.width}w supplies the ${Math.round(required)}px slot`);
  assert.ok(selected.width <= adequate.width, `Selected ${selected.width}w avoids a larger-than-needed image for the ${Math.round(required)}px slot`);
  return { image, state, sources, selectedWidth: selected.width };
}

async function optimizedOriginals(page) {
  return page.locator('img[srcset][data-original-src]').evaluateAll(images => [...new Set(images.map(image => new URL(image.dataset.originalSrc, location.href).href))]);
}

function assertNotRequested(requests, originals, message) {
  const requested = new Set(requests);
  assert.deepEqual(originals.filter(url => requested.has(url)), [], message);
}

async function noOverflow(page) {
  const size = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, width: document.documentElement.scrollWidth }));
  assert.ok(size.width <= size.viewport + 1, `Page has no horizontal overflow: ${JSON.stringify(size)}`);
  return size;
}

async function verifyOriginalImage(page, locator, original, width, height) {
  await locator.evaluate(image => image.decode());
  const state = await imageState(locator);
  assert.equal(state.currentSrc, new URL(original, baseURL).href, 'Reader uses the original URL');
  assert.equal(state.naturalWidth, width, 'Reader retains full original width');
  assert.equal(state.naturalHeight, height, 'Reader retains full original height');
  const response = await page.request.get(state.currentSrc);
  assert.equal(response.status(), 200);
  const digest = bytes => createHash('sha256').update(bytes).digest('hex');
  assert.equal(digest(await response.body()), digest(await readFile(path.join(root, original))), 'HTTP original bytes match the preserved source file');
  return { url: state.currentSrc, width: state.naturalWidth, height: state.naturalHeight };
}

try {
  await mkdir(artifacts, { recursive: true });
  const { chromium } = await import(moduleURL);
  if (process.env.PORTFOLIO_BASE_URL) baseURL = process.env.PORTFOLIO_BASE_URL.replace(/\/?$/u, '/');
  else {
    server = createSiteServer({ root });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    baseURL = `http://127.0.0.1:${server.address().port}/`;
  }
  const executablePath = process.env.PORTFOLIO_CHROME_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });

  for (const viewport of viewports) for (const fixture of fixtures) {
    await run(`${fixture.name} ${viewport.width}: responsive decode, original deferred, full-resolution lightbox`, async () => {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const requests = observe(page);
      try {
        await navigate(page, fixture.route);
        const originals = await optimizedOriginals(page);
        const decoded = await decodeOptimized(page, fixture.selector);
        assert.equal(new URL(decoded.state.original, page.url()).pathname, `/${driving}`);
        assert.equal(decoded.state.declaredWidth, 1688);
        assert.equal(decoded.state.declaredHeight, 780);
        // Load every currently visible thumbnail, including below-fold cards, without opening readers.
        await page.locator('img[srcset][data-original-src]').evaluateAll(async images => {
          await Promise.all(images.filter(image => !image.closest('details:not([open])')).map(async image => { image.loading = 'eager'; await image.decode(); }));
        });
        assertNotRequested(requests, originals, 'Neither navigation nor thumbnail decoding fetches eligible originals');
        await noOverflow(page);
        if (fixture.name === 'game detail') errorFixture = { sources: decoded.sources.map(source => source.url), original: new URL(driving, baseURL).href, alt: decoded.state.alt };
        const link = decoded.image.locator('..');
        assert.equal(await link.evaluate(element => element.tagName), 'A');
        assert.equal(new URL(await link.getAttribute('href'), page.url()).href, new URL(driving, baseURL).href, 'The original link remains a native href');
        await link.focus();
        await page.keyboard.press('Enter');
        const dialog = page.locator('dialog.reading-lightbox[open]');
        await dialog.waitFor();
        const original = await verifyOriginalImage(page, dialog.locator('img'), driving, 1688, 780);
        assert.equal(await dialog.locator('img').getAttribute('alt'), decoded.state.alt);
        assert.ok(requests.includes(new URL(driving, baseURL).href), 'Opening the lightbox requests the actual original');
        assert.equal(await dialog.locator(`a[href="${new URL(driving, baseURL).href}"]`).count(), 1, 'The lightbox also exposes the original link');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog[open]').count(), 0);
        assert.ok(await link.evaluate(element => element === document.activeElement), 'Escape restores focus to the invoking image link');
        return { route: fixture.route, viewport, selectedWidth: decoded.selectedWidth, currentSrc: decoded.state.currentSrc, slot: decoded.state.renderedWidth, candidates: decoded.sources, original, originalRequestsBeforeOpening: 0 };
      } finally { await context.close(); }
    });
  }

  for (const display of [{ width: 700, dpr: 1 }, { width: 1440, dpr: 1 }, { width: 1440, dpr: 2 }]) {
    await run(`single landscape gallery ${display.width} DPR${display.dpr}: source matches its full-width painted slot`, async () => {
      const context = await browser.newContext({ viewport: { width: display.width, height: 1000 }, deviceScaleFactor: display.dpr, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const requests = observe(page);
      try {
        await navigate(page, 'projects/taptap-lunar-freight/');
        assert.equal(await page.locator('.taptap-shot-grid img').count(), 1, 'The gallery has a single full-width landscape image');
        const decoded = await decodeOptimized(page, '.taptap-shot-grid img');
        assert.equal(new URL(decoded.state.original, page.url()).pathname, `/${dialogue}`);
        assert.equal(decoded.state.declaredWidth, 2560);
        assert.equal(decoded.state.declaredHeight, 1440);
        assert.match(decoded.state.alt, /月面货运/u);
        assert.equal(decoded.state.dpr, display.dpr);
        const required = Math.min(decoded.state.paintedWidth * display.dpr, 2560);
        const adequate = decoded.sources.find(source => source.width >= required - 1);
        assert.ok(adequate, `Responsive candidates cover the ${Math.round(required)}px painted slot up to the original's width`);
        assert.equal(decoded.selectedWidth, adequate.width,
          `Single landscape image selects the smallest adequate width for its ${Math.round(required)}px painted slot`);
        assertNotRequested(requests, [new URL(dialogue, baseURL).href], 'A larger responsive gallery thumbnail still defers its original');
        await noOverflow(page);
        return { viewport: display.width, dpr: display.dpr, paintedWidth: decoded.state.paintedWidth, requiredWidth: required, selectedWidth: decoded.selectedWidth, currentSrc: decoded.state.currentSrc, alt: decoded.state.alt };
      } finally { await context.close(); }
    });
  }

  for (const width of [700, 1440]) await run(`multiple landscape gallery ${width} DPR1: both images match their painted slots`, async () => {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const requests = observe(page);
    try {
      await navigate(page, 'projects/taptap-sticker-scenery/');
      assert.equal(await page.locator('.taptap-shot-grid img').count(), 2, 'The gallery contains two landscape screenshots');
      const pictures = [
        { source: 'assets/taptap/sticker-scenery/guided.webp', width: 1920, height: 1080 },
        { source: 'assets/taptap/sticker-scenery/free.webp', width: 1282, height: 720 },
      ];
      const evidence = [];
      for (const [index, picture] of pictures.entries()) {
        const decoded = await decodeOptimized(page, `.taptap-shot-grid > figure:nth-child(${index + 1}) img`);
        assert.equal(new URL(decoded.state.original, page.url()).pathname, `/${picture.source}`);
        assert.equal(decoded.state.declaredWidth, picture.width);
        assert.equal(decoded.state.declaredHeight, picture.height);
        assert.match(decoded.state.alt, /贴纸造景/u);
        const required = Math.min(decoded.state.paintedWidth, picture.width);
        const adequate = decoded.sources.find(source => source.width >= required - 1);
        assert.ok(adequate, `Responsive candidates cover the ${Math.round(required)}px painted slot up to the original's width`);
        assert.equal(decoded.selectedWidth, adequate.width, `Gallery image ${index + 1} selects the smallest adequate source`);
        evidence.push({ original: picture.source, paintedWidth: decoded.state.paintedWidth, requiredWidth: required, selectedWidth: decoded.selectedWidth, currentSrc: decoded.state.currentSrc, alt: decoded.state.alt });
      }
      assertNotRequested(requests, pictures.map(picture => new URL(picture.source, baseURL).href), 'Responsive gallery previews defer both originals');
      await noOverflow(page);
      return { viewport: width, dpr: 1, images: evidence };
    } finally { await context.close(); }
  });

  for (const viewport of viewports) await run(`text-dense workflow ${viewport.width}: thumbnail and explicit original reader`, async () => {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const requests = observe(page);
    try {
      await navigate(page, 'projects/sheep-match/#sheep-editor-case');
      const article = page.locator('#sheep-editor-case');
      const decoded = await decodeOptimized(page, '#sheep-editor-case figure img');
      assert.equal(decoded.state.declaredWidth, 2560);
      assert.equal(decoded.state.declaredHeight, 176);
      const originalURL = new URL(workflow, baseURL).href;
      assertNotRequested(requests, [originalURL], 'A closed original-size diagram reader does not fetch its original');
      const details = article.locator('details');
      assert.equal(await details.getAttribute('open'), null);
      await details.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.notEqual(await details.getAttribute('open'), null);
      const original = await verifyOriginalImage(page, details.locator('img:visible').first(), workflow, 2560, 176);
      const region = details.locator('[role="region"]');
      await region.focus();
      assert.ok(await region.evaluate(element => element.scrollWidth > element.clientWidth), 'Full-width text diagram remains readable by native horizontal scrolling');
      await page.keyboard.press('ArrowRight');
      await page.waitForFunction(() => document.querySelector('#sheep-editor-case details [role="region"]').scrollLeft > 0);
      await noOverflow(page);
      await article.screenshot({ path: path.join(artifacts, `workflow-${viewport.width}.png`), animations: 'disabled' });
      await details.locator('summary').click();
      assert.equal(await details.getAttribute('open'), null);
      return { viewport, selectedWidth: decoded.selectedWidth, currentSrc: decoded.state.currentSrc, original };
    } finally { await context.close(); }
  });

  for (const fixture of fixtures) await run(`${fixture.name}: no-JavaScript thumbnails and native original link`, async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: viewports[0] });
    const page = await context.newPage();
    const requests = observe(page);
    try {
      await navigate(page, fixture.route);
      const decoded = await decodeOptimized(page, fixture.selector);
      assertNotRequested(requests, [new URL(driving, baseURL).href], 'No-script navigation still displays a lightweight thumbnail');
      const link = decoded.image.locator('..');
      assert.ok(await link.isVisible());
      assert.equal(new URL(await link.getAttribute('href'), page.url()).href, new URL(driving, baseURL).href);
      await link.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(new URL(driving, baseURL).href);
      const original = await verifyOriginalImage(page, page.locator('img'), driving, 1688, 780);
      return { currentSrc: decoded.state.currentSrc, original };
    } finally { await context.close(); }
  });

  await run('text-dense workflow: no-JavaScript original remains reachable through native disclosure', async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: viewports[0] });
    const page = await context.newPage();
    observe(page);
    try {
      await navigate(page, 'projects/sheep-match/');
      const article = page.locator('#sheep-editor-case');
      await article.locator('details summary').click();
      assert.notEqual(await article.locator('details').getAttribute('open'), null);
      const link = article.locator('a').filter({ hasText: /原图/u }).first();
      assert.ok(await link.isVisible(), 'The original text link is visible without JavaScript');
      assert.equal(new URL(await link.getAttribute('href'), page.url()).href, new URL(workflow, baseURL).href);
      await link.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(new URL(workflow, baseURL).href);
      return await verifyOriginalImage(page, page.locator('img'), workflow, 2560, 176);
    } finally { await context.close(); }
  });

  await run('failed thumbnail keeps an accessible alternative and working original link', async () => {
    assert.ok(errorFixture, 'A responsive detail fixture was verified first');
    const expectedFailures = new Set(errorFixture.sources);
    const blockedPaths = new Set(errorFixture.sources.map(url => new URL(url).pathname));
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const requests = observe(page, { expectedFailures });
    const blocked = [];
    await context.route('**/*', async route => {
      if (route.request().resourceType() === 'image' && blockedPaths.has(new URL(route.request().url()).pathname)) {
        blocked.push(route.request().url());
        await route.fulfill({ status: 404, contentType: 'text/plain', body: 'Expected thumbnail failure for regression test' });
      } else await route.continue();
    });
    try {
      await navigate(page, 'projects/taptap-lunar-freight/');
      const image = page.locator('.taptap-hero-shot img');
      await image.scrollIntoViewIfNeeded();
      assert.ok(blocked.length, 'The real thumbnail request exercised the error path');
      await image.evaluate(image => image.decode());
      const state = await imageState(image);
      assert.equal(state.currentSrc, errorFixture.original, 'A failed optimized preview automatically decodes its original before interaction');
      assert.equal(state.srcset, null, 'The fallback removes failed responsive candidates');
      assert.equal(state.sizes, null, 'The fallback removes the responsive size hint');
      assert.equal(state.previewFallback, 'true', 'The fallback records the handled error and prevents repeated recovery');
      assert.equal(state.alt, errorFixture.alt);
      assert.ok(await page.getByRole('img', { name: errorFixture.alt, exact: true }).isVisible(), 'A failed image remains exposed with a descriptive alternative');
      const link = image.locator('..');
      assert.ok(await link.isVisible());
      assert.equal(new URL(await link.getAttribute('href'), page.url()).href, errorFixture.original);
      await link.click();
      await page.locator('dialog.reading-lightbox[open]').waitFor();
      const original = await verifyOriginalImage(page, page.locator('dialog[open] img'), driving, 1688, 780);
      assert.ok(requests.includes(errorFixture.original));
      return { blocked, accessibleAlt: state.alt, original };
    } finally { await context.close(); }
  });

  await run('image-loading scenarios have no missing resources or uncaught script errors', async () => {
    assert.deepEqual(resourceErrors, []);
    assert.deepEqual(runtimeErrors, []);
    return { resourceErrors, runtimeErrors };
  });
} catch (error) {
  cases.push({ name: 'headless image harness setup', status: 'failed', error: error.stack || String(error) });
  console.error(error.stack || String(error));
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((done, reject) => server.close(error => error ? reject(error) : done()));
  await mkdir(artifacts, { recursive: true });
  const summary = { total: cases.length, passed: cases.filter(result => result.status === 'passed').length, failed: cases.filter(result => result.status === 'failed').length };
  const report = { timestamp: new Date().toISOString(), baseURL, summary, cases, resourceErrors, runtimeErrors };
  await writeFile(path.join(artifacts, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Headless image loading: ${summary.passed}/${summary.total}; report artifacts/image-speed-20261107/report.json`);
  if (summary.failed) process.exitCode = 1;
}
