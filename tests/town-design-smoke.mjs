import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=path=>/^(?:[A-Z]:[\\/]|\/)/iu.test(path)?pathToFileURL(path).href:path;
const {chromium}=await import(dependency(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(dependency(process.env.AXE_MODULE||'@axe-core/playwright'));
const artifacts=new URL('../artifacts/town-design/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=`http://127.0.0.1:${server.address().port}/`;
try {
  for(const width of [360,768,1440]) for(const route of ['projects/my-town/','projects/my-town/design-summary/','experience/muyou/']) {
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('requestfailed',request=>{if(!request.failure()?.errorText.includes('ERR_ABORTED'))errors.push(request.url());});
    assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
    if(route==='experience/muyou/') { await page.locator('a[href="../../projects/my-town/#town-design"]').click(); assert.ok(page.url().includes('projects/my-town/')); }
    const gallery=page.locator('#town-design');assert.equal(await gallery.locator('article').count(),3);
    for(const image of await gallery.locator('figure img').all()) {
      await image.scrollIntoViewIfNeeded();await image.evaluate(el=>el.decode());
      const ratios=await image.evaluate(el=>({rendered:el.clientWidth/el.clientHeight,original:el.naturalWidth/el.naturalHeight}));
      assert.ok(Math.abs(ratios.rendered-ratios.original)<0.02,'Map retains original aspect ratio');
    }
    for(const link of await gallery.locator('.design-original').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),page.url()).href)).status(),200);
    const details=gallery.locator('details').first();await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
    const scroll=details.locator('.matchmaking-scroll');await scroll.locator('img').evaluate(el=>el.decode());
    assert.ok(await scroll.evaluate(el=>el.scrollWidth>el.clientWidth));await scroll.focus();await page.keyboard.press('ArrowRight');
    await details.locator('summary').click();assert.equal(await details.getAttribute('open'),null);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(item=>({id:item.id,targets:item.nodes.map(node=>node.target)})),[]);
    if(route==='projects/my-town/')await gallery.locator('article').first().screenshot({path:fileURLToPath(new URL(`system-map-${width}.png`,artifacts))});
    results.push({width,route,status:'passed'});console.log(`PASS ${width} ${route}: original maps, large reading, links, overflow and WCAG`);
    await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/my-town/');await page.locator('#town-design nav a').nth(2).click();assert.equal(new URL(page.url()).hash,'#town-task-states');
  await page.locator('.matchmaking-inspect summary').last().click();assert.notEqual(await page.locator('.matchmaking-inspect').last().getAttribute('open'),null);
  results.push({scenario:'no JavaScript anchors and native disclosure',status:'passed'});await context.close();assert.deepEqual(errors,[]);
} finally {
  await browser.close();await new Promise(resolve=>server.close(resolve));
  await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));
}
console.log(`Town design acceptance: ${results.length}/10 passed`);
