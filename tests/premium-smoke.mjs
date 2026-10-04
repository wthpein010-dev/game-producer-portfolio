import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {once} from 'node:events';
import path from 'node:path';
import {createSiteServer} from '../scripts/serve.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const artifacts=path.join(root,'artifacts','premium-design-20261004');
const moduleURL=value=>/^[a-z]:[\\/]/i.test(value)?pathToFileURL(value).href:value;
const {chromium}=await import(moduleURL(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(moduleURL(process.env.AXE_MODULE||'@axe-core/playwright'));
const results=[],errors=[],audits=[];
await mkdir(artifacts,{recursive:true});
const server=createSiteServer({root});
server.listen(0,'127.0.0.1');
await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const desktopContext=await browser.newContext();
const page=await desktopContext.newPage();
page.on('pageerror',error=>errors.push(error.message));
page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
const check=async(name,action)=>{try{await action();results.push({name,status:'passed'});console.log(`PASS ${name}`);}catch(error){results.push({name,status:'failed',error:String(error.stack||error)});console.error(`FAIL ${name}: ${error.message}`);}};
async function go(route){const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);}
async function fit(){const size=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));}
try {
  await check('self-hosted title and utility fonts load without fallback-only rendering',async()=>{
    await page.setViewportSize({width:1440,height:1100});await go('index.html');
    const fonts=await page.evaluate(()=>({display:document.fonts.check('48px "Producer Display"','吴天昊'),utility:document.fonts.check('16px "IBM Plex Sans"','CAREER'),face:[...document.fonts].map(face=>({family:face.family,status:face.status}))}));
    assert.equal(fonts.display,true);assert.equal(fonts.utility,true);
    assert.ok(fonts.face.some(face=>face.family==='Producer Display'&&face.status==='loaded'));
    await page.screenshot({path:path.join(artifacts,'portfolio-premium-PC.png')});
  });
  await check('chapter index follows real career anchors through keyboard activation',async()=>{
    const link=page.locator('.chapter-rail a').nth(2);await link.focus();await page.keyboard.press('Enter');
    assert.ok(page.url().endsWith('#company-bolang'));
    assert.ok(await page.locator('#company-bolang').isVisible());
  });
  await check('four AI tabs have real click and keyboard actions',async()=>{
    await go('index.html');const tabs=page.locator('[data-tabs] [role="tab"]');assert.equal(await tabs.count(),4);
    for(let i=0;i<4;i++){const tab=tabs.nth(i);await tab.click();assert.equal(await tab.getAttribute('aria-selected'),'true');const panel=await tab.getAttribute('aria-controls');assert.ok(await page.locator(`#${panel}`).isVisible());assert.equal(await page.locator('[data-tabs] [role="tab"][aria-selected="true"]').count(),1);}
    await tabs.nth(3).focus();await page.keyboard.press('ArrowRight');assert.equal(await tabs.nth(0).getAttribute('aria-selected'),'true');assert.ok(await tabs.nth(0).evaluate(el=>el===document.activeElement));
  });
  await check('four AI filters apply actual category visibility and count feedback',async()=>{
    const buttons=page.locator('[data-filter]');assert.equal(await buttons.count(),4);
    for(let i=0;i<4;i++){const button=buttons.nth(i);const value=await button.getAttribute('data-filter');await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');const cards=await page.locator('[data-category]').evaluateAll(nodes=>nodes.map(node=>({category:node.dataset.category,hidden:node.hidden})));assert.ok(cards.every(card=>card.hidden===(value!=='all'&&card.category!==value)));assert.equal(await page.locator('#archive-count').textContent(),`${cards.filter(card=>!card.hidden).length} 个精选项目`);}
  });
  for(const width of [360,390,768,1440]) {
    await check(`project public reading at ${width}: three real document links`,async()=>{
      await page.setViewportSize({width,height:1000});await go('projects/sheep-match/');await fit();
      assert.equal(await page.locator('#project-reading .note-link').count(),3);
      await page.locator('#project-reading').scrollIntoViewIfNeeded();
      if(width===1440||width===390)await page.screenshot({path:path.join(artifacts,`sheep-reading-${width}.png`)});
    });
  }
  for(const slug of ['gameplay','team','data'])for(const width of [390,1440]){
    await check(`${slug} public summary at ${width}: reading, source, return, accessibility`,async()=>{
      await page.setViewportSize({width,height:1000});await go(`projects/sheep-match/${slug}/`);await fit();
      assert.equal(await page.locator('h1').count(),1);
      assert.ok((await page.locator('.note-provenance').textContent()).includes('已确认'));
      await page.locator('.note-figure img').evaluate(image=>image.decode());
      const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      audits.push({slug,width,violations:audit.violations,incomplete:audit.incomplete.map(item=>item.id)});assert.equal(audit.violations.length,0,JSON.stringify(audit.violations));
      if(slug==='gameplay')await page.screenshot({path:path.join(artifacts,`sheep-gameplay-${width}.png`),fullPage:true});
      await page.locator('.note-return').click();assert.ok(page.url().endsWith('/projects/sheep-match/#project-reading'));
    });
  }
  await check('touch phone reading and narrow landscape keep actions reachable',async()=>{
    const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const phone=await context.newPage();
    await phone.goto(base+'index.html',{waitUntil:'networkidle'});await phone.evaluate(()=>document.fonts.ready);await phone.screenshot({path:path.join(artifacts,'portfolio-premium-mobile.png')});
    await phone.goto(base+'projects/sheep-match/');await Promise.all([phone.waitForURL('**/gameplay/'),phone.locator('.note-link').first().tap()]);assert.ok(phone.url().includes('/gameplay/'));await Promise.all([phone.waitForURL('**/sheep-match/#project-reading'),phone.locator('.note-return').tap()]);
    await context.close();await page.setViewportSize({width:844,height:390});await go('projects/sheep-match/team/');await fit();assert.ok(await page.locator('.note-return').isVisible());
  });
  await check('long Chinese, 200% text, reduced motion and no-script summaries remain readable',async()=>{
    await page.setViewportSize({width:390,height:1000});await go('projects/sheep-match/data/');
    await page.locator('h1').evaluate(el=>el.textContent+='：面向长中文内容与完整职责说明的阅读检验');
    await page.addStyleTag({content:'body{font-size:32px}.note-body p{font-size:32px}'});await fit();
    await page.emulateMedia({reducedMotion:'reduce'});await go('index.html');const motion=await page.locator('.chapter-rail').evaluate(el=>getComputedStyle(el,'::before').animationName);assert.equal(motion,'none');
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800}});const plain=await context.newPage();await plain.goto(base+'projects/sheep-match/team/');assert.ok(await plain.locator('.note-provenance').isVisible());await plain.locator('.note-return').click();assert.equal(await plain.locator('.note-link').count(),3);await context.close();
  });
  assert.deepEqual(errors,[]);
} finally {
  await writeFile(path.join(artifacts,'report.json'),JSON.stringify({results,errors,audits},null,2));
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
console.log(`Premium verification: ${results.filter(item=>item.status==='passed').length}/${results.length}`);
if(results.some(item=>item.status!=='passed'))process.exitCode=1;
