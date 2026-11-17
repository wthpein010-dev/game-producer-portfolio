import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';

const dependency=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium,request}=await import(/^[A-Z]:[\\/]/iu.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const output=process.env.POCKET_REPORT_DIR||'artifacts/ai-pocket/local';
await mkdir(output,{recursive:true});
const images=JSON.parse(await readFile(new URL('../assets/ai-pocket/media.json',import.meta.url),'utf8')).images;
const results=[],errors=[];
let completed=false;
try{
  for(const width of [360,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
    assert.equal((await page.goto(base+'index.html#ai-pocket',{waitUntil:'networkidle'})).status(),200);
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('#ai-pocket').count(),1);
    assert.equal(await page.locator('.hub-tool-feature:visible').count(),3);
    assert.equal(await page.locator('#hub-more').getAttribute('open'),null);
    assert.equal(await page.locator('#ai-supporting').getAttribute('open'),null);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.locator('#ai-pocket').screenshot({path:`${output}/home-${width}.png`});
    await page.locator('#ai-pocket').getByRole('link',{name:'查看产品设计与真实成果'}).click();
    await page.waitForURL('**/projects/ai-pocket/');
    assert.equal(await page.locator('h1').innerText(),'AI 随身舱.');
    assert.equal(await page.locator('main .ai-pocket-figure').count(),6);
    for(const element of await page.locator('main .ai-pocket-figure img').all()){
      const geometry=await element.evaluate(async image=>{
        image.loading='eager';await image.decode();
        const box=image.getBoundingClientRect();
        return {source:image.src,width:image.naturalWidth,height:image.naturalHeight,
          declaredWidth:Number(image.getAttribute('width')),declaredHeight:Number(image.getAttribute('height')),
          displayedWidth:box.width,displayedHeight:box.height};
      });
      assert.equal(geometry.width,geometry.declaredWidth);
      assert.equal(geometry.height,geometry.declaredHeight);
      assert.ok(Math.abs(geometry.displayedWidth/geometry.displayedHeight-geometry.width/geometry.height)<0.015);
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.screenshot({path:`${output}/detail-${width}.png`,fullPage:true});
    const original=page.locator('main .ai-pocket-figure > a').first();
    await original.focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('dialog[open]').count(),1);
    await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await original.evaluate(element=>element===document.activeElement),true);
    const limits=page.locator('.ai-pocket-limits');
    await limits.locator('summary').focus();await page.keyboard.press('Enter');
    assert.notEqual(await limits.getAttribute('open'),null);
    assert.ok((await limits.innerText()).includes('实体 U 盘'));
    await page.locator('main a[href="../../index.html#ai-pocket"]').last().click();
    await page.waitForURL('**/index.html#ai-pocket');
    results.push({width,passed:true,images:6});await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();await page.goto(base+'projects/ai-pocket/');
  assert.equal(await page.locator('main .ai-pocket-figure > a').count(),6);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('.ai-pocket-limits > summary').press('Enter');
  assert.notEqual(await page.locator('.ai-pocket-limits').getAttribute('open'),null);
  results.push({javascript:false,passed:true});await context.close();
  for(const image of images){
    const response=await request.newContext();
    try{
      const received=await response.get(base+image.src);assert.equal(received.status(),200);
      assert.equal(createHash('sha256').update(await received.body()).digest('hex'),image.sha256);
    }finally{await response.dispose();}
  }
  assert.deepEqual(errors,[]);
  completed=true;
  console.log(JSON.stringify({status:'passed',base,results,publicImageHashes:images.length,errors}));
}catch(error){
  errors.push(error.stack||String(error));throw error;
}finally{
  await writeFile(output+'/report.json',JSON.stringify({status:completed?'passed':'failed',base,results,errors},null,2)+'\n');
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
