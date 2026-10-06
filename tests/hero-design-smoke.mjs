import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=p=>/^[A-Z]:[\\/]/iu.test(p)?pathToFileURL(p).href:p;
const {chromium}=await import(dependency(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(dependency(process.env.AXE_MODULE||'@axe-core/playwright'));
const artifacts=new URL('../artifacts/hero-design/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=process.env.PORTFOLIO_URL||`http://127.0.0.1:${server.address().port}/`;
const routes=['experience/hero-games/','projects/crisis-dawn/','projects/crisis-dawn/design-summary/'];
try {
  for(const width of [360,768,1440])for(const route of routes){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
    const section=page.locator('#hero-design');assert.equal(await section.locator('article').count(),6);
    assert.equal(await section.locator('[data-evidence-basis="team-context"]').count(),3);
    assert.equal(await section.locator('[data-evidence-basis="record-date-pending"]').count(),2);
    for(const image of await section.locator('figure img').all()){
      await image.scrollIntoViewIfNeeded();await image.evaluate(el=>el.decode());
      assert.ok(await image.evaluate(el=>Math.abs(el.clientWidth/el.clientHeight-el.naturalWidth/el.naturalHeight)<0.02));
    }
    for(const link of await section.locator('.design-original').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),page.url()).href)).status(),200);
    for(const link of await section.locator('nav a').all()){
      await link.click();assert.equal(await page.locator(new URL(page.url()).hash).count(),1);
    }
    const details=section.locator('details').first();await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
    await details.locator('.matchmaking-scroll img').evaluate(el=>el.decode());
    await details.locator('summary').click();assert.equal(await details.getAttribute('open'),null);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const overlaps=await section.evaluate(section=>{
      const issues=[];
      for(const grid of section.querySelectorAll('.matchmaking-map-notes')){
        const [a,b]=[...grid.children].map(el=>el.getBoundingClientRect());
        if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)issues.push('text-overlap');
      }
      return issues;
    });assert.deepEqual(overlaps,[]);
    assert.deepEqual((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
    if(route==='projects/crisis-dawn/')for(const id of ['hero-numbers','hero-challenge','hero-generator'])await page.locator('#'+id).screenshot({path:fileURLToPath(new URL(`${id}-${width}.png`,artifacts))});
    results.push({width,route});console.log(`PASS ${width} ${route}`);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/crisis-dawn/');await page.locator('#hero-design nav a').nth(1).click();assert.equal(new URL(page.url()).hash,'#hero-challenge');
  await page.locator('#hero-challenge details').first().locator('summary').click();assert.notEqual(await page.locator('#hero-challenge details').first().getAttribute('open'),null);await context.close();
  results.push({scenario:'no JavaScript links and disclosure'});assert.deepEqual(errors,[]);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));}
console.log(`Hero acceptance: ${results.length}/10 passed`);
