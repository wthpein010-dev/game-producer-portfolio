import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=p=>/^[A-Z]:[\\/]/iu.test(p)?pathToFileURL(p).href:p;
const {chromium}=await import(dependency(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(dependency(process.env.AXE_MODULE||'@axe-core/playwright'));
const artifacts=new URL('../artifacts/steam-context/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=process.env.PORTFOLIO_URL||`http://127.0.0.1:${server.address().port}/`;
try {
  for(const width of [360,768,1440])for(const route of ['','projects/matchmaking-inc/','projects/vanity-fair/']){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
    const section=page.locator(route?'.official-product-context':'#indie-games');
    await section.scrollIntoViewIfNeeded();
    assert.equal(await section.locator('a[href*="store.steampowered.com/app/"]').count(),route?1:2);
    if(!route){
      for(const card of await section.locator('article').all()){
        await card.locator('img').evaluate(el=>el.decode());
        const links=await card.locator('.indie-actions a').all();
        const boxes=await Promise.all(links.map(link=>link.boundingBox()));
        for(const b of boxes)assert.ok(b.x>=0&&b.x+b.width<=width+1&&b.height>=44);
        const [a,b]=boxes;
        assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,'Action links do not overlap');
      }
    }else{
      assert.ok(await page.locator('#work-value').count());
      assert.ok((await section.innerText()).includes('官方产品背景'));
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const violations=(await new AxeBuilder({page}).include(route?'.record-panel':'#indie-games').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>v.id),[]);
    await section.screenshot({path:fileURLToPath(new URL(`${route?route.split('/')[1]:'indie'}-${width}.png`,artifacts))});
    results.push({width,route});console.log(`PASS ${width} ${route||'indie-games'}`);await context.close();
  }
  assert.deepEqual(errors,[]);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));}
console.log(`Steam context acceptance: ${results.length}/9 passed`);
