import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {once} from 'node:events';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {createSiteServer} from '../scripts/serve.mjs';
import {taptapGames} from '../src/taptap-games.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const artifacts=path.join(root,'artifacts','taptap-20261016');
await mkdir(artifacts,{recursive:true});
const dependency=process.env.PLAYWRIGHT_MODULE || 'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/i.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer({root});
server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const errors=[],checks=[];
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',error=>errors.push(error.message));
page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
const fit=async()=>{
  const width=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(width.scroll<=width.client+1,JSON.stringify(width));
};
const decode=async()=>{
  const dimensions=await page.locator('.taptap-cover img, .taptap-shot-grid img').evaluateAll(async images=>{
    return Promise.all(images.map(async img=>{img.loading='eager';await img.decode();return {width:img.naturalWidth,height:img.naturalHeight,declaredWidth:img.getAttribute('width'),declaredHeight:img.getAttribute('height')};}));
  });
  for(const size of dimensions){assert.equal(size.width,Number(size.declaredWidth));assert.equal(size.height,Number(size.declaredHeight));}
};
try {
  for(const width of [360,390,768,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(base+'index.html#taptap-games',{waitUntil:'networkidle'});
    await fit();await decode();
    assert.equal(await page.locator('#taptap-games article').count(),8);
    await page.locator('#taptap-games').scrollIntoViewIfNeeded();
    if(width===390||width===1440) await page.screenshot({path:path.join(artifacts,`collection-${width}.png`)});
    checks.push(`home ${width}: eight projects, images decoded, no horizontal overflow`);
  }
  for(const tab of await page.locator('[data-tabs] [role="tab"]').all()) {
    await tab.click();assert.equal(await tab.getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#'+await tab.getAttribute('aria-controls')).isVisible(),true);
  }
  for(const filter of await page.locator('[data-filter]').all()) {
    await filter.click();const value=await filter.getAttribute('data-filter');
    const states=await page.locator('[data-category]').evaluateAll(nodes=>nodes.map(n=>({category:n.dataset.category,hidden:n.hidden})));
    assert.ok(states.every(n=>n.hidden===(value!=='all'&&n.category!==value)));
  }
  checks.push('Existing four workflow tabs and four archive filters remain operational');
  for(const game of taptapGames) for(const width of [390,1440]) {
    await page.setViewportSize({width,height:1000});
    const response=await page.goto(base+`projects/taptap-${game.slug}/`,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);await fit();await decode();
    assert.equal(await page.locator('h1').textContent(),game.title+'.');
    assert.equal(await page.locator('.taptap-shot-grid img').count(),game.shots.length);
    assert.equal(await page.locator('.taptap-play a').getAttribute('href'),game.tapUrl);
    const shot=page.locator('.taptap-shot-grid figure a').first();
    await shot.focus();await page.keyboard.press('Enter');
    await page.locator('dialog.reading-lightbox[open]').waitFor();
    assert.equal(await page.locator('dialog[open] img').getAttribute('alt'),game.shots[0].alt);
    await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await shot.evaluate(el=>document.activeElement===el),true,'Image dialog restores keyboard focus');
    await page.screenshot({path:path.join(artifacts,`${game.slug}-${width}.png`)});
    await page.locator('.taptap-next [data-return-home]').click();
    await page.waitForURL(`**/index.html#work-${game.slug}`);await fit();
    checks.push(`${game.slug} ${width}: direct route, media, keyboard image dialog and return anchor`);
  }
  const noScript=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const plain=await noScript.newPage();
  await plain.goto(base+'projects/taptap-after-hours-stall/');
  assert.equal(await plain.locator('h1').textContent(),'下班收摊.');
  assert.equal(await plain.locator('.taptap-shot-grid a').count(),2);
  assert.equal(await plain.locator('.taptap-play a').getAttribute('href'),taptapGames[0].tapUrl);
  await noScript.close();checks.push('No-script detail preserves content, screenshots and TapTap link');
  assert.equal(errors.length,0,JSON.stringify(errors));
  await writeFile(path.join(artifacts,'report.json'),JSON.stringify({checks,errors,passed:checks.length},null,2));
  console.log(`PASS ${checks.length} headless checks; runtime errors: ${errors.length}`);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
