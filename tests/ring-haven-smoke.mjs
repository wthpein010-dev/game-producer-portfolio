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
const folder=process.env.RING_HAVEN_REPORT||'artifacts/ring-haven/local';await mkdir(folder,{recursive:true});
const errors=[],results=[];
try{
 for(const width of [360,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(base+'index.html#ring-haven',{waitUntil:'networkidle'})).status(),200);
  const entry=page.locator('#ring-haven');await entry.locator('img').evaluate(async el=>{el.loading='eager';await el.decode();});
  assert.equal(await entry.count(),1);assert.equal(await page.locator('.hub-tool-feature').count(),3);assert.equal(await page.locator('#hub-more').getAttribute('open'),null);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await entry.screenshot({path:`${folder}/home-${width}.png`});
  await entry.getByRole('link',{name:'查看玩法策划与迭代取舍 ↗'}).click();await page.waitForURL('**/projects/ring-haven/');
  assert.match(await page.title(),/环环小憩/u);
  const images=page.locator('main figure img');assert.equal(await images.count(),8);
  for(const img of await images.all())await img.evaluate(async el=>{el.loading='eager';await el.decode();if(el.naturalWidth!==640||el.naturalHeight!==1138)throw Error('Incorrect full portrait media');const r=el.getBoundingClientRect();if(Math.abs(r.width/r.height-640/1138)>.003)throw Error('Distorted portrait');});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('main > .detail-hero').screenshot({path:`${folder}/intro-${width}.png`});
  await page.locator('#ring-haven-modes').screenshot({path:`${folder}/modes-${width}.png`});
  const imageLink=page.locator('main figure > a').first();await imageLink.click();assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
  const summary=page.locator('.ring-haven-limits > summary');await summary.focus();await page.keyboard.press('Enter');assert.notEqual(await page.locator('.ring-haven-limits').getAttribute('open'),null);
  assert.ok((await page.locator('.ring-haven-limits').innerText()).includes('安卓'));
  results.push({width,passed:true});await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
 await page.goto(base+'projects/ring-haven/');assert.equal(await page.locator('figure a').count(),16);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await context.close();
 assert.deepEqual(errors,[]);
}finally{await writeFile(`${folder}/report.json`,JSON.stringify({base,results,errors,headless:true},null,2)+'\n');await browser.close();await new Promise(resolve=>server.close(resolve));}
console.log('PASS Ring Haven home/detail, portrait media, lightbox, keyboard and no-script reading');
