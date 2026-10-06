import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createSiteServer } from '../scripts/serve.mjs';

const dependency = path => /^(?:[A-Z]:[\\/]|\/)/iu.test(path) ? pathToFileURL(path).href : path;
const { chromium } = await import(dependency(process.env.PLAYWRIGHT_MODULE || 'playwright'));
const { default: AxeBuilder } = await import(dependency(process.env.AXE_MODULE || '@axe-core/playwright'));
const artifacts = new URL('../artifacts/idiom-design/', import.meta.url);
await mkdir(artifacts, { recursive: true });
const server = createSiteServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
const results = [];
const errors = [];
try {
  for (const width of [360, 768, 1440]) {
    for (const route of ['projects/idiom-scholar/', 'projects/idiom-scholar/design-summary/', 'experience/haoteng/']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 } });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', request => {
        const reason=request.failure()?.errorText;
        if (!reason?.includes('ERR_ABORTED')) errors.push({ url:request.url(),reason });
      });
      assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' })).status(), 200);
      const project = route.startsWith('projects/');
      if (project) {
        for (const image of await page.locator('.idiom-reference img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(element => element.decode());
          const natural = await image.evaluate(element => ({ width: element.naturalWidth, height: element.naturalHeight }));
          assert.ok(natural.width > 0 && natural.height > 0);
        }
        const inspect = page.locator('.idiom-inspect').nth(1);
        await inspect.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.notEqual(await inspect.getAttribute('open'), null);
        const scroll = inspect.locator('.idiom-image-scroll');
        await scroll.locator('img').evaluate(element => element.decode());
        if (width === 360) assert.ok(await scroll.evaluate(element => element.scrollWidth > element.clientWidth));
        await scroll.focus();
        await page.keyboard.press('ArrowRight');
        await inspect.locator('summary').click();
        assert.equal(await inspect.getAttribute('open'), null);
        for (const anchor of await page.locator('.idiom-reference figcaption a').all()) {
          const url = new URL(await anchor.getAttribute('href'), page.url());
          assert.equal((await page.request.get(url.href)).status(), 200);
        }
        if (route === 'projects/idiom-scholar/') {
          await page.locator('.idiom-overview').screenshot({ path: new URL(`overview-${width}.png`, artifacts).pathname.replace(/^\/([A-Z]:)/u, '$1') });
          await page.locator('#idiom-interaction').screenshot({ path: new URL(`interaction-${width}.png`, artifacts).pathname.replace(/^\/([A-Z]:)/u, '$1') });
        }
      } else {
        await page.locator('.idiom-company-entry a').click();
        await page.waitForLoadState('networkidle');
        assert.equal(new URL(page.url()).hash, '#idiom-design');
        await page.goBack({waitUntil:'networkidle'});
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No page-level horizontal overflow');
      const violations = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations;
      assert.deepEqual(violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), []);
      results.push({ width, route, status: 'passed' });
      console.log(`PASS ${width} ${route}: imagery, navigation, disclosures, overflow and WCAG`);
      await context.close();
    }
  }
  const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await plain.newPage();
  await page.goto(base + 'projects/idiom-scholar/');
  await page.locator('.idiom-overview a[href="#idiom-systems"]').click();
  assert.equal(new URL(page.url()).hash, '#idiom-systems');
  await page.locator('.idiom-inspect summary').first().click();
  assert.notEqual(await page.locator('.idiom-inspect').first().getAttribute('open'), null);
  results.push({ scenario: 'no-JavaScript navigation and native disclosure', status: 'passed' });
  await plain.close();
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await writeFile(new URL('report.json', artifacts), JSON.stringify({ results, errors }, null, 2));
}
console.log(`Idiom design acceptance: ${results.length}/10 passed`);
