import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {once} from 'node:events';
import path from 'node:path';
import {createSiteServer} from '../scripts/serve.mjs';
import {sheepDesigns} from '../src/sheep-design.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const artifacts=path.join(root,'artifacts','project-design-20261004');
const moduleURL=value=>/^[a-z]:[\\/]/i.test(value)?pathToFileURL(value).href:value;
const {chromium}=await import(moduleURL(process.env.PLAYWRIGHT_MODULE||'playwright'));
const {default:AxeBuilder}=await import(moduleURL(process.env.AXE_MODULE||'@axe-core/playwright'));
const results=[],errors=[],audits=[];
await mkdir(artifacts,{recursive:true});
const server=createSiteServer({root});server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const context=await browser.newContext();const page=await context.newPage();
function monitor(target){target.on('pageerror',error=>errors.push(error.message));target.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});}
monitor(page);
const check=async(name,action)=>{try{await action();results.push({name,status:'passed'});console.log(`PASS ${name}`);}catch(error){results.push({name,status:'failed',error:String(error.stack||error)});console.error(`FAIL ${name}: ${error.message}`);}};
async function go(){assert.equal((await page.goto(base+'projects/sheep-match/',{waitUntil:'networkidle'})).status(),200);await page.evaluate(()=>document.fonts.ready);}
async function fit(target=page){const size=await target.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));}
async function decoded(target=page){return target.locator('.design-overview img').evaluateAll(async images=>Promise.all(images.map(async image=>{image.loading='eager';await image.decode();return {width:image.naturalWidth,height:image.naturalHeight};})));}
try{
  for(const width of [360,390,768,1440])await check(`design references at ${width}: readable text, original dimensions, no overflow`,async()=>{
    await page.setViewportSize({width,height:1000});await go();await fit();
    assert.deepEqual(await decoded(),sheepDesigns.map(item=>({width:item.width,height:item.height})));
    assert.equal(await page.locator('.design-reference').count(),3);
    for(const item of sheepDesigns){const response=await context.request.get(base+'assets/project-design/'+item.file);assert.equal(response.status(),200);assert.equal(response.headers()['content-type'],item.file.endsWith('.jpg')?'image/jpeg':'image/png');}
    await page.locator('#project-design').scrollIntoViewIfNeeded();
    if(width===1440||width===390){
      await page.locator('#project-design').screenshot({path:path.join(artifacts,`sheep-design-${width}.png`)});
      const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();audits.push({width,violations:audit.violations,incomplete:audit.incomplete.map(item=>item.id)});assert.equal(audit.violations.length,0,JSON.stringify(audit.violations));
    }
  });
  await check('all large images open with native disclosure and remain within their scroll region',async()=>{
    for(const width of [390,1440]){
      await page.setViewportSize({width,height:1000});await go();
      for(let i=0;i<3;i++){
        const disclosure=page.locator('.design-inspect').nth(i);await disclosure.locator('summary').click();assert.equal(await disclosure.getAttribute('open'),'');
        const region=disclosure.locator('.design-scroll');await region.locator('img').evaluate(image=>{image.loading='eager';return image.decode();});
        const dimensions=await region.evaluate(el=>({width:el.clientWidth,height:el.clientHeight,scrollWidth:el.scrollWidth,scrollHeight:el.scrollHeight,imageWidth:el.querySelector('img').getBoundingClientRect().width}));
        assert.ok(dimensions.height<=560);assert.ok(dimensions.scrollWidth>dimensions.width);assert.ok(dimensions.imageWidth>=1400,'Large reading surface avoids shrinking the entire chart into a phone thumbnail');await fit();
        if(width===1440&&i===0){await region.scrollIntoViewIfNeeded();await region.screenshot({path:path.join(artifacts,'sheep-design-large-reading-PC.png')});}
        await disclosure.locator('summary').click();
      }
    }
  });
  await check('keyboard can expand and pan a diagram, then open the exact original image',async()=>{
    const first=page.locator('.design-inspect').first();await first.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await first.getAttribute('open'),'');
    const region=first.locator('.design-scroll');await region.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.design-scroll').scrollLeft>0);await page.keyboard.press('ArrowDown');await page.waitForFunction(()=>document.querySelector('.design-scroll').scrollTop>0);
    const link=page.locator('.design-original').first();await link.focus();await Promise.all([page.waitForURL('**/save-recovery.png'),page.keyboard.press('Enter')]);assert.equal((await page.locator('img').evaluate(image=>image.decode().then(()=>image.naturalWidth))),3936);
  });
  await check('touch phone and landscape keep original-image links usable',async()=>{
    const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const phone=await touch.newPage();monitor(phone);
    await phone.goto(base+'projects/sheep-match/');await decoded(phone);await fit(phone);await phone.locator('.design-inspect summary').first().tap();assert.equal(await phone.locator('.design-inspect').first().getAttribute('open'),'');
    const box=await phone.locator('.design-scroll').first().boundingBox();assert.ok(box.width<=390);
    await Promise.all([phone.waitForURL('**/lucky-items-flow.jpg'),phone.locator('.design-original').nth(2).tap()]);assert.equal(await phone.locator('img').evaluate(image=>image.decode().then(()=>image.naturalWidth)),2560);await touch.close();
    await page.setViewportSize({width:844,height:390});await go();await fit();assert.equal(await page.locator('.design-original').count(),3);
  });
  await check('long Chinese and 200% text preserve content and image controls',async()=>{
    await page.setViewportSize({width:390,height:1000});await go();await page.locator('.design-copy h3').first().evaluate(el=>el.textContent+='：包含状态变化与失败分支的完整设计说明');
    await page.addStyleTag({content:'.project-design p,.project-design li,.project-design summary,.design-original{font-size:32px}.design-copy h3{font-size:48px}'});await fit();assert.equal(await page.locator('.design-original').count(),3);
  });
  await check('native image reading works with JavaScript disabled and reduced motion',async()=>{
    const plainContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800},reducedMotion:'reduce'});const plain=await plainContext.newPage();monitor(plain);await plain.goto(base+'projects/sheep-match/');await fit(plain);await plain.locator('.design-inspect summary').nth(1).click();assert.equal(await plain.locator('.design-inspect').nth(1).getAttribute('open'),'');await fit(plain);
    await Promise.all([plain.waitForURL('**/tile-patterns.png'),plain.locator('.design-original').nth(1).click()]);assert.ok(plain.url().endsWith('tile-patterns.png'));await plainContext.close();
  });
  assert.deepEqual(errors,[]);
}finally{await writeFile(path.join(artifacts,'report.json'),JSON.stringify({results,errors,audits},null,2));await browser.close();await new Promise(resolve=>server.close(resolve));}
console.log(`Project design verification: ${results.filter(item=>item.status==='passed').length}/${results.length}`);
if(results.some(item=>item.status!=='passed'))process.exitCode=1;
