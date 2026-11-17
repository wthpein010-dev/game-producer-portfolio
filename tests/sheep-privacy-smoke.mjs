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
   assert.equal(await page.locator('video').count(),route==='projects/sheep-match/'?1:0);
   if(route==='projects/sheep-match/'){
    assert.equal(await page.locator('#sheep-playtest img').count(),13);
    assert.equal(await page.locator('#sheep-system-screens img').count(),7);
    assert.doesNotMatch(text,/线上游戏画面/u);
    const video=page.locator('#sheep-playback video');
    await video.evaluate(async el=>{el.muted=true;await el.play();});
    await page.waitForFunction(()=>document.querySelector('#sheep-playback video').currentTime>.5);
    const media=await video.evaluate(el=>{el.pause();return {width:el.videoWidth,height:el.videoHeight,duration:el.duration};});
    assert.equal(media.width,720);assert.equal(media.height,1350);assert.equal(media.duration,60);
    for(const time of [1,30,58]){
      await video.evaluate((el,time)=>new Promise(resolve=>{el.addEventListener('seeked',resolve,{once:true});el.currentTime=time;}),time);
      assert.ok(Math.abs(await video.evaluate(el=>el.currentTime)-time)<.25);
    }
    await page.locator('.sheep-current-media').screenshot({path:`artifacts/sheep-privacy/media-${width}.png`});
    await page.locator('#sheep-system-screens').screenshot({path:`artifacts/sheep-privacy/systems-${width}.png`});
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
 assert.equal(await page.locator('#sheep-playtest img').count(),13);assert.equal(await page.locator('video[controls]').count(),1);await context.close();
 assert.deepEqual(errors,[]);await writeFile('artifacts/sheep-privacy/report.json',JSON.stringify({results,screenshots:13,systemScreenshots:7,video:'playback and seeking passed',noScript:'passed',errors},null,2));console.log('18 route/viewport checks, 13 screenshots, video playback/seek, keyboard lightbox and no-script reading passed.');
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
