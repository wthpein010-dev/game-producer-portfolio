import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const errors=[],results=[];await mkdir('artifacts/sheep-privacy',{recursive:true});
try{
 for(const width of [390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['projects/sheep-match/','experience/jianyou/','projects/sheep-match/gameplay/','projects/sheep-match/team/','projects/sheep-match/data/','skills/ai-collaboration/']){
   assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
   assert.equal(await page.locator('h1').count(),1);
   for(const image of await page.locator('img').all())await image.evaluate(async el=>{el.loading='eager';await el.decode();});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow');
   const text=await page.locator('main').innerText();
   assert.doesNotMatch(text,/次日留存|人均挑战次数|交易市场|SPAR-|10,000/u);
   assert.equal(await page.locator('video').count(),0);
   if(route==='projects/sheep-match/'){
    assert.equal(await page.locator('#sheep-playtest img').count(),6);
    await page.locator('#sheep-playtest').screenshot({path:`artifacts/sheep-privacy/gallery-${width}.png`});
    await page.locator('#sheep-playtest a').first().focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
   }
   results.push({width,route,status:'passed'});
  }
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});
 const page=await context.newPage();await page.goto(base+'projects/sheep-match/');
 assert.equal(await page.locator('#sheep-playtest img').count(),6);await context.close();
 assert.deepEqual(errors,[]);await writeFile('artifacts/sheep-privacy/report.json',JSON.stringify({results,noScript:'passed',errors},null,2));console.log('18 route/viewport checks, six screenshots, keyboard lightbox and no-script reading passed.');
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
