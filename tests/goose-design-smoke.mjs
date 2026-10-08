import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
let browser;const errors=[];
await mkdir('artifacts/goose-design',{recursive:true});
try{
  browser=await chromium.launch(process.env.PORTFOLIO_BROWSER_CHANNEL?{channel:process.env.PORTFOLIO_BROWSER_CHANNEL}:{});
  for(const width of [360,768,1440])for(const route of ['projects/versatile-dog/','projects/versatile-dog/design-summary/','experience/haoteng/']){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    assert.equal((await page.goto(`http://127.0.0.1:${server.address().port}/${route}`,{waitUntil:'networkidle'})).status(),200);
    const section=page.locator('#goose-design');assert.equal(await section.locator('article').count(),4);
    assert.match(await section.innerText(),/百变汪星人/u);assert.match(await section.innerText(),/策划：吴天昊/u);
    for(const img of await section.locator('figure img').all()){
      await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
      assert.ok(await img.evaluate(el=>Math.abs(el.clientWidth/el.clientHeight-el.naturalWidth/el.naturalHeight)<0.02));
    }
    for(const link of await section.locator('.design-original').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),page.url()).href)).status(),200);
    const details=section.locator('details').first();await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
    await details.locator('img').evaluate(el=>el.decode());assert.ok(await details.locator('[role="region"]').evaluate(el=>el.scrollWidth>=el.clientWidth));
    if(width<768)assert.ok(await details.locator('[role="region"]').evaluate(el=>el.scrollWidth>el.clientWidth));
    await details.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await details.getAttribute('open'),null);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    if(route==='projects/versatile-dog/')for(const id of ['goose-systems','goose-interface'])await page.locator('#'+id).screenshot({path:`artifacts/goose-design/dog-${id}-${width}.png`});
    console.log(`PASS ${width} ${route}`);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce',viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/projects/versatile-dog/`);
  await page.locator('#goose-design nav a').nth(1).focus();await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#goose-economy');
  await page.locator('#goose-economy summary').focus();await page.keyboard.press('Enter');assert.notEqual(await page.locator('#goose-economy details').getAttribute('open'),null);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-JavaScript navigation and keyboard reading');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
