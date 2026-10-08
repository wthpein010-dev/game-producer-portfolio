import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
let browser;
const errors=[];
await mkdir('artifacts/sheep-evidence',{recursive:true});
try {
  browser=await chromium.launch(process.env.PORTFOLIO_BROWSER_CHANNEL?{channel:process.env.PORTFOLIO_BROWSER_CHANNEL}:{});
  for(const width of [360,768,1440])for(const route of ['', 'experience/jianyou/','projects/sheep-match/']){
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    assert.equal((await page.goto(`http://127.0.0.1:${server.address().port}/${route}`,{waitUntil:'networkidle'})).status(),200);
    if(route==='projects/sheep-match/'){
      const section=page.locator('#sheep-evidence');assert.equal(await section.locator('article').count(),7);
      for(const image of await section.locator('img').all())await image.evaluate(async el=>{el.loading='eager';await el.decode();if(el.naturalWidth!==Number(el.getAttribute('width'))||el.naturalHeight!==Number(el.getAttribute('height')))throw Error('Image dimensions differ');});
      for(const id of ['sheep-editor-case','sheep-auth-case']){
        const article=section.locator(`#${id}`),details=article.locator('details');
        await details.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await details.getAttribute('open'),null);
        const region=details.locator('[role="region"]');await region.focus();
        assert.ok(await region.evaluate(el=>el.scrollWidth>el.clientWidth),'Original image scrolls inside reader');
        await page.keyboard.press('ArrowRight');
        await article.screenshot({path:`artifacts/sheep-evidence/${id}-${width}.png`});
        await details.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await details.getAttribute('open'),null);
      }
      assert.ok((await page.locator('#project-design').innerText()).includes('早期方案'));
    }else if(route==='experience/jianyou/'){
      assert.ok(await page.locator('a[href$="projects/sheep-match/#sheep-product-case"]').count());
    }else{
      assert.ok(await page.locator('#company-jianyou a[href="projects/sheep-match/"]').count());
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    console.log(`PASS ${width} ${route||'home'}`);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/projects/sheep-match/`);
  assert.equal(await page.locator('#sheep-evidence article').count(),7);
  await page.locator('#sheep-editor-case summary').click();assert.notEqual(await page.locator('#sheep-editor-case details').getAttribute('open'),null);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-JavaScript reading');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
