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
await mkdir('artifacts/sheep-visuals',{recursive:true});
try{
  for(const width of [360,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
    assert.equal((await page.goto(base+'projects/sheep-match/',{waitUntil:'networkidle'})).status(),200);
    assert.equal(await page.locator('#design-tile-patterns-title').count(),0);
    assert.equal(await page.getByText('砖块图案搭配',{exact:true}).count(),0);
    assert.equal(await page.getByText('第二关存档恢复',{exact:true}).count(),0);
    assert.equal(await page.locator('a[href*="save-recovery"],img[src*="save-recovery"]').count(),0);
    const level=page.locator('.design-reference').filter({has:page.locator('#design-level-gameplay-title')});
    assert.ok((await level.innerText()).includes('第一关承担教学'));
    const levelImage=level.locator('figure img');await levelImage.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Level logic image is blank');});
    await level.screenshot({path:`artifacts/sheep-visuals/level-gameplay-${width}.png`});
    assert.equal(await page.locator('#sheep-visuals figure').count(),3);
    assert.equal(await page.locator('#sheep-flow-gallery article').count(),2);
    for(const image of await page.locator('#sheep-visuals img,#sheep-flow-gallery img').all()){
      await image.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Image is blank');});
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    const strip=page.locator('.sheep-screen-strip');
    assert.ok(await strip.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
    for(const section of ['sheep-visuals','sheep-flow-gallery'])await page.locator('#'+section).screenshot({path:`artifacts/sheep-visuals/${section}-${width}.png`});
    const link=page.locator('#sheep-flow-gallery figure a').first();await link.click();
    assert.ok(await page.locator('dialog[open]').count());await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
    results.push({width,passed:true});console.log('PASS visual layout '+width);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'projects/sheep-match/');
  assert.equal(await page.locator('#sheep-flow-gallery img').count(),2);
  assert.equal(await page.locator('#sheep-visuals figure a').count(),3);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-script visual reading');
}finally{
  await writeFile('artifacts/sheep-visuals/report.json',JSON.stringify({base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
