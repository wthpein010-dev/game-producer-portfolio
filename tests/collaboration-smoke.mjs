import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({executablePath:process.env.PORTFOLIO_CHROME_PATH});
const errors=[],results=[];
await mkdir('artifacts/collaboration',{recursive:true});
try{
  for(const width of [360,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
    await page.goto(base+'index.html#ai-collaboration',{waitUntil:'networkidle'});
    const entry=page.locator('#ai-collaboration');
    await entry.screenshot({path:`artifacts/collaboration/home-${width}.png`});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await entry.getByRole('link',{name:'查看协作方法与实际案例'}).click();
    await page.waitForURL('**/skills/ai-collaboration/');
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('.collaboration-steps li').count(),6);
    for(const image of await page.locator('main img').all())await image.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Evidence image is blank');if(el.naturalWidth!==Number(el.getAttribute('width'))||el.naturalHeight!==Number(el.getAttribute('height')))throw Error('Source dimensions differ');});
    for(const id of ['method','delivery','ownership','validation']){
      await page.locator(`.collaboration-nav a[href="#${id}"]`).click();
      assert.ok(await page.locator('#'+id).isVisible());
    }
    await page.locator('#delivery figure a').first().click();
    assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    for(const id of ['method','ownership','validation'])await page.locator('#'+id).screenshot({path:`artifacts/collaboration/${id}-${width}.png`});
    const internal=await page.locator('main a[href]').evaluateAll(els=>els.map(a=>a.href).filter(href=>!href.match(/\.(jpg|png)(#.*)?$/)));
    for(const href of [...new Set(internal)]){const response=await page.request.get(href);assert.equal(response.status(),200,href);}
    results.push({width,passed:true});console.log('PASS collaboration '+width);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(base+'skills/ai-collaboration/');
  assert.equal(await page.locator('main figure > a').count(),3);
  assert.ok((await page.locator('main').innerText()).includes('最终验收'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-script collaboration reading');
}finally{
  await writeFile('artifacts/collaboration/report.json',JSON.stringify({base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
