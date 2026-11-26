import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
import {hubApps,hubGames} from '../src/hub-tools.mjs';
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
    assert.equal(await page.locator('#ai-tools .hub-catalog-item:visible').count(),0);
    assert.equal(await page.locator('#hub-games .ai-game-card:visible').count(),4);
    assert.equal(await page.locator('#mobile-games .ai-game-card:visible').count(),9);
    if(width===390){
      await page.locator('#work-search-toggle').press('Enter');
      const search=page.locator('#work-search-input');
      assert.equal(await search.evaluate(input=>document.activeElement===input),true);
      await search.fill('冰激凌大师');
      assert.ok(await page.locator('#work-icecream-master .ai-game-cover img').isVisible());
      assert.equal(await page.locator('#mobile-games > details').getAttribute('open'),'');
      await search.fill('小游戏每日排行');
      assert.ok(await page.locator('#hub-gamepulse-mini-radar .hub-app-banner img').isVisible());
      await search.press('Escape');
      assert.equal(await page.locator('#work-search').isVisible(),false);
      assert.equal(await page.locator('#mobile-games > details').getAttribute('open'),null);
      assert.equal(await page.locator('#hub-apps-title').getAttribute('open'),null);
      assert.equal(await page.locator('#mobile-games .ai-game-card:visible').count(),9);
    }
    await page.locator('.hub-catalog > details > summary').press('Enter');
    assert.equal(await page.locator('#ai-tools .hub-catalog-item:visible').count(),hubApps.length);
    const appCards=page.locator('#hub-more .hub-catalog-item');
    const banners=await appCards.locator('img').evaluateAll(async images=>{
      images.forEach(image=>image.loading='eager');
      return Promise.all(images.map(async image=>{await image.decode();return [image.naturalWidth,image.naturalHeight];}));
    });
    assert.equal(banners.length,hubApps.length);
    assert.ok(banners.every(([w,h])=>w*9===h*16));
    const appRows=await appCards.evaluateAll(cards=>cards.map(card=>[card,...[
      '.hub-app-heading','.hub-app-banner','.hub-app-description','.hub-app-category','.hub-app-links'
    ].map(selector=>card.querySelector(selector))].map(element=>element.getBoundingClientRect().top)));
    for(const row of appRows)for(const sibling of appRows.filter(card=>card[0]===row[0]))assert.deepEqual(sibling,row);
    await page.locator('#mobile-games > details > summary').press('Enter');
    assert.equal(await page.locator('#ai-games .ai-game-card[id^="hub-"]:visible').count(),hubGames.length);
    assert.equal(await page.locator('#ai-games .ai-game-card:visible').count(),29);
    assert.equal(await page.locator('#ai-pocket').locator('xpath=ancestor::section[@id="ai-tools"]').count(),1);
    assert.equal(await page.locator('.taptap-card[id="work-lunar-freight"]').count(),1);
    assert.equal(await page.locator('.taptap-card[id="work-my-life"]').count(),1);
    assert.equal(await page.locator('#ai-supporting').getAttribute('open'),null);
    for(const image of await page.locator('.hub-tool-feature img').all())await image.evaluate(async el=>{el.loading='eager';await el.decode();if(!el.naturalWidth)throw Error('Blank image');if(el.naturalWidth!==Number(el.getAttribute('width'))||el.naturalHeight!==Number(el.getAttribute('height')))throw Error('Source geometry mismatch');const box=el.getBoundingClientRect();if(box.height<100||box.width<200)throw Error('Preview too small');});
    await page.locator('.hub-featured-grid').screenshot({path:`artifacts/hub-tools/default-${width}.png`});
    await page.locator('.hub-tool-feature figure > a').first().click();assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(),0);
    await page.goto(base+'index.html#hub-loop-bgm-lab');
    assert.ok(await page.locator('#hub-loop-bgm-lab').isVisible());
    await page.goto(base+'index.html#case-workbench');
    assert.equal(await page.locator('#ai-supporting').getAttribute('open'),null);
    assert.notEqual(await page.locator('#case-workbench').getAttribute('open'),null);
    await page.goto(base+'index.html#case-lighthouse');
    assert.ok(await page.locator('#case-lighthouse').isVisible());
    await page.locator('#hub-lighthouse-rescue a[href="projects/hub-lighthouse-rescue/"]').click();
    assert.ok(await page.locator('#design').isVisible());
    await page.goto(base+'index.html#workflow');
    assert.notEqual(await page.locator('#ai-supporting').getAttribute('open'),null);
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
  assert.equal(await page.locator('#work-search-toggle').isVisible(),false);
  await page.locator('.hub-catalog > details > summary').press('Enter');
  assert.equal(await page.locator('#ai-tools .hub-catalog-item:visible').count(),hubApps.length);
  assert.equal(await page.locator('#hub-games .ai-game-card:visible').count(),4);
  await page.locator('#mobile-games > details > summary').press('Enter');
  assert.equal(await page.locator('#ai-games .ai-game-card[id^="hub-"]:visible').count(),hubGames.length);
  assert.ok(await page.evaluate(()=>document.querySelector('#career-cases').getBoundingClientRect().top < document.querySelector('#producer-skills').getBoundingClientRect().top));
  const caseDetails=page.locator('#case-gamespec');
  assert.equal(await caseDetails.getAttribute('open'),null);
  await caseDetails.locator('summary').press('Enter');
  assert.notEqual(await caseDetails.getAttribute('open'),null);
  assert.equal(await page.locator('.hub-tool-feature figure > a').count(),3);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await context.close();assert.deepEqual(errors,[]);console.log('PASS no-script hub catalog');
}finally{
  await writeFile('artifacts/hub-tools/report.json',JSON.stringify({base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
