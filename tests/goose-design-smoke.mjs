import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=p=>/^[A-Z]:[\\/]/iu.test(p)?pathToFileURL(p).href:p;
const {chromium}=await import(dependency(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(dependency(process.env.AXE_MODULE||'@axe-core/playwright'));
const artifacts=new URL('../artifacts/goose-design/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=process.env.PORTFOLIO_URL||`http://127.0.0.1:${server.address().port}/`;
try {
  for(const width of [360,768,1440])for(const route of ['projects/train-king/','projects/train-king/design-summary/','experience/haoteng/']){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
    const section=page.locator('#goose-design');assert.equal(await section.locator('article').count(),4);
    assert.match(await section.innerText(),/策划：吴天昊/u);assert.match(await section.innerText(),/最终上线名称/u);
    for(const img of await section.locator('figure img').all()){
      await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
      const ratio=await img.evaluate(el=>({rendered:el.clientWidth/el.clientHeight,original:el.naturalWidth/el.naturalHeight}));
      assert.ok(Math.abs(ratio.rendered-ratio.original)<0.02);
    }
    for(const link of await section.locator('.design-original').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),page.url()).href)).status(),200);
    const details=section.locator('details').first();await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
    await details.locator('img').evaluate(el=>el.decode());assert.ok(await details.locator('.matchmaking-scroll').evaluate(el=>el.scrollWidth>=el.clientWidth));
    await details.locator('summary').click();assert.equal(await details.getAttribute('open'),null);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
    if(route==='projects/train-king/')for(const id of ['goose-systems','goose-interface'])await page.locator('#'+id).screenshot({path:fileURLToPath(new URL(`${id}-${width}.png`,artifacts))});
    results.push({width,route});console.log(`PASS ${width} ${route}`);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/train-king/');await page.locator('#goose-design nav a').nth(1).click();assert.equal(new URL(page.url()).hash,'#goose-economy');await page.locator('#goose-economy summary').click();assert.notEqual(await page.locator('#goose-economy details').getAttribute('open'),null);await context.close();
  results.push({scenario:'No-JavaScript navigation and reading'});assert.deepEqual(errors,[]);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));}
console.log(`Goose acceptance: ${results.length}/10 passed`);
