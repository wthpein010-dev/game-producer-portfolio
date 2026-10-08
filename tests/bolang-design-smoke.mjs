import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=p=>/^[A-Z]:[\\/]/iu.test(p)?pathToFileURL(p).href:p;
const {chromium}=await import(dependency(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(dependency(process.env.AXE_MODULE||'@axe-core/playwright'));
const artifacts=new URL('../artifacts/bolang-design/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=process.env.PORTFOLIO_URL||`http://127.0.0.1:${server.address().port}/`;
const routes=['projects/matchmaking-inc/','projects/matchmaking-inc/design-summary/','projects/vanity-fair/','projects/vanity-fair/design-summary/','experience/bolang/'];
try {
  for(const width of [360,768,1440])for(const route of routes){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
    const ids=route.includes('matchmaking-inc')?['matchmaking-supplement']:route.includes('vanity-fair')?['vanity-design']:['matchmaking-supplement','vanity-design'];
    for(const id of ids){
      const section=page.locator('#'+id);
      assert.equal(await section.locator('article').count(),4);
      for(const img of await section.locator('figure img').all()){
        await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
        const ratio=await img.evaluate(el=>({rendered:el.clientWidth/el.clientHeight,original:el.naturalWidth/el.naturalHeight}));
        assert.ok(Math.abs(ratio.rendered-ratio.original)<0.02);
      }
      for(const link of await section.locator('.design-original').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),page.url()).href)).status(),200);
      const details=section.locator('details').first();await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
      const scroll=details.locator('.matchmaking-scroll');await scroll.locator('img').evaluate(el=>el.decode());assert.ok(await scroll.evaluate(el=>el.scrollWidth>=el.clientWidth));
      await details.locator('summary').click();assert.equal(await details.getAttribute('open'),null);
      if(route==='projects/vanity-fair/'||route==='projects/matchmaking-inc/'){
        await section.locator('article').first().screenshot({path:fileURLToPath(new URL(`${id}-${width}.png`,artifacts))});
        await section.locator('article').last().screenshot({path:fileURLToPath(new URL(`${id}-last-${width}.png`,artifacts))});
      }
    }
    if(route.includes('matchmaking-inc')||route.includes('bolang'))assert.equal(await page.locator('#matchmaking-design article').count(),2);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
    console.log(`PASS ${width} ${route}`);results.push({width,route});await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/vanity-fair/');await page.locator('#vanity-design nav a').nth(1).click();assert.equal(new URL(page.url()).hash,'#vanity-flow');await page.locator('#vanity-flow summary').click();assert.notEqual(await page.locator('#vanity-flow details').getAttribute('open'),null);await context.close();
  results.push({scenario:'no-JavaScript links and disclosure'});assert.deepEqual(errors,[]);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));}
console.log(`Bolang acceptance: ${results.length}/16 passed`);
