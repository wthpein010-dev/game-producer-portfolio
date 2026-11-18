import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
import {featuredHubIds,hubProjects} from '../src/hub-tools.mjs';
const catalogCount=hubProjects.length-featuredHubIds.length;
const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({executablePath:process.env.PORTFOLIO_CHROME_PATH});
const results=[],errors=[];
await mkdir('artifacts/hub-tools',{recursive:true});
try{
  for(const width of [360,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
    assert.equal((await page.goto(base+'index.html#ai-tools',{waitUntil:'networkidle'})).status(),200);
    assert.equal(await page.locator('.hub-tool-feature:visible').count(),3);
    const more=page.locator('#hub-more');assert.equal(await more.getAttribute('open'),null);
    assert.equal(await page.locator('.hub-catalog-item:visible').count(),0);
    assert.equal(await page.locator('#ai-supporting').getAttribute('open'),null);
    for(const image of await page.locator('.hub-tool-feature img').all())await image.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Blank image');if(el.naturalWidth!==Number(el.getAttribute('width'))||el.naturalHeight!==Number(el.getAttribute('height')))throw Error('Source geometry mismatch');const box=el.getBoundingClientRect();if(box.height<100||box.width<200)throw Error('Preview too small');});
    await page.locator('#ai-tools').screenshot({path:`artifacts/hub-tools/default-${width}.png`});
    await page.locator('.hub-tool-feature figure > a').first().click();assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
    await more.locator(':scope > summary').focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('.hub-catalog-item:visible').count(),catalogCount);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await more.locator(':scope > summary').press('Enter');assert.equal(await more.getAttribute('open'),null);
    await page.goto(base+'index.html#hub-loop-bgm-lab');
    assert.notEqual(await more.getAttribute('open'),null);assert.ok(await page.locator('#hub-loop-bgm-lab').isVisible());
    await page.goto(base+'index.html#case-workbench');
    assert.notEqual(await page.locator('#ai-supporting').getAttribute('open'),null);
    assert.notEqual(await page.locator('#case-workbench').getAttribute('open'),null);
    const steps=page.locator('.step-tabs [role="tab"]');
    await steps.first().click();await page.keyboard.press('ArrowRight');
    assert.equal(await steps.nth(1).getAttribute('aria-selected'),'true');
    await page.keyboard.press('End');assert.equal(await steps.nth(3).getAttribute('aria-selected'),'true');
    await page.keyboard.press('Home');assert.equal(await steps.first().getAttribute('aria-selected'),'true');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    results.push({width,passed:true});console.log('PASS hub tools '+width);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage();
  await page.goto(base+'index.html#ai-tools');
  await page.locator('#hub-more > summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.hub-catalog-item:visible').count(),catalogCount);
  assert.equal(await page.locator('.hub-tool-feature figure > a').count(),3);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-script hub catalog');
}finally{
  await writeFile('artifacts/hub-tools/report.json',JSON.stringify({base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
