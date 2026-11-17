import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({executablePath:process.env.PORTFOLIO_CHROME_PATH});
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const errors=[],results=[];
await mkdir('artifacts/sheep-playtest',{recursive:true});
try{
  for(const width of [360,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
    assert.equal((await page.goto(base+'projects/sheep-match/',{waitUntil:'networkidle'})).status(),200);
    assert.equal(await page.locator('#sheep-history').getAttribute('open'),null);
    assert.equal(await page.locator('#sheep-legacy-comparison').getAttribute('open'),null);
    assert.equal(await page.locator('#sheep-playtest figure').count(),6);
    assert.equal(await page.locator('#sheep-level-evaluation figure').count(),2);
    const video=page.locator('#sheep-playback video');
    await video.evaluate(async el=>{el.muted=true;await el.play();});
    await page.waitForFunction(()=>document.querySelector('#sheep-playback video').currentTime>.5);
    const media=await video.evaluate(el=>{el.pause();return {width:el.videoWidth,height:el.videoHeight,duration:el.duration,error:el.error?.message};});
    assert.equal(media.width,720);assert.equal(media.height,1350);assert.ok(Math.abs(media.duration-60)<.2);assert.equal(media.error,undefined);
    for(const time of [1,15,35,58]){
      await video.evaluate((el,time)=>new Promise((resolve,reject)=>{el.addEventListener('seeked',()=>resolve(),{once:true});el.addEventListener('error',()=>reject(Error('Seek failed')),{once:true});el.currentTime=time;}),time);
      const seek=await video.evaluate(el=>({time:el.currentTime,seekable:Array.from({length:el.seekable.length},(_,i)=>[el.seekable.start(i),el.seekable.end(i)]),buffered:Array.from({length:el.buffered.length},(_,i)=>[el.buffered.start(i),el.buffered.end(i)])}));
      assert.ok(Math.abs(seek.time-time)<.25,'Video seek reaches requested time '+JSON.stringify({requested:time,...seek}));
    }
    await page.locator('#sheep-playtest').screenshot({path:`artifacts/sheep-playtest/current-${width}.png`});
    const more=page.locator('#sheep-playtest > details').first();await more.locator(':scope > summary').focus();await page.keyboard.press('Enter');
    for(const img of await page.locator('#sheep-playtest img,#sheep-level-evaluation img').all())await img.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Image blank');});
    await more.locator(':scope > summary').press('Enter');
    await page.locator('#sheep-legacy-comparison > summary').focus();await page.keyboard.press('Enter');
    const legacy=page.locator('#sheep-legacy-comparison video');await legacy.evaluate(async el=>{el.muted=true;await el.play();});
    await page.waitForFunction(()=>document.querySelector('#sheep-legacy-comparison video').currentTime>.25);
    const old=await legacy.evaluate(el=>{el.pause();return {width:el.videoWidth,height:el.videoHeight,duration:el.duration};});
    assert.equal(old.width,496);assert.equal(old.height,1024);assert.ok(old.duration>8&&old.duration<10);
    assert.ok((await page.locator('#sheep-legacy-comparison').innerText()).includes('尚未上线'));
    await page.locator('#sheep-legacy-comparison').screenshot({path:`artifacts/sheep-playtest/legacy-${width}.png`});
    await page.locator('#sheep-level-evaluation figure a').first().click();assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.locator('#sheep-level-evaluation').screenshot({path:`artifacts/sheep-playtest/analysis-${width}.png`});
    results.push({width,media,old,passed:true});console.log('PASS playtest media '+width);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/sheep-match/');
  assert.equal(await page.locator('#sheep-playback video[controls]').count(),1);
  assert.equal(await page.locator('#sheep-level-evaluation figure').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-script media reading');
}finally{
  await writeFile('artifacts/sheep-playtest/report.json',JSON.stringify({base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
