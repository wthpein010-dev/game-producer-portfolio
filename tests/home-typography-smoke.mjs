import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const output=process.env.TYPOGRAPHY_REPORT_DIR||'artifacts/typography/local';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const results=[],errors=[];let status='failed';
try{
 for(const width of [360,768,1440]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  const type=await page.locator('.intro-main h1, .section-head h2').evaluateAll(nodes=>nodes.map(node=>{
   const style=getComputedStyle(node);return {text:node.textContent,font:style.fontFamily,style:style.fontStyle,weight:style.fontWeight,size:parseFloat(style.fontSize)};
  }));
  assert.ok(type.length>=6);
  for(const item of type){assert.ok(item.font.startsWith('"Microsoft YaHei"'));assert.equal(item.style,'normal');assert.equal(item.weight,'700');assert.ok(item.size>=28&&item.size<=80);}
  const labels=await page.locator('.section-head .eyebrow').evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).fontFamily));
  assert.ok(labels.every(font=>font.startsWith('"Microsoft YaHei"')));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert.equal(await page.locator('.hub-tool-feature:visible').count(),3);
  assert.equal(await page.locator('#hub-more').getAttribute('open'),null);
  await page.locator('.home-intro').screenshot({path:`${output}/intro-${width}.png`});
  await page.locator('#ai-pocket').scrollIntoViewIfNeeded();
  await page.locator('#ai-pocket img').evaluate(async image=>{image.loading='eager';await image.decode();});
  await page.locator('#ai-pocket').screenshot({path:`${output}/pocket-${width}.png`});
  results.push({width,headings:type,passed:true});await page.close();
 }
 assert.deepEqual(errors,[]);status='passed';
 console.log(JSON.stringify({status,widths:results.map(result=>result.width),errors}));
}catch(error){errors.push(error.stack||String(error));throw error;}
finally{await writeFile(output+'/report.json',JSON.stringify({status,base,results,errors},null,2));await browser.close();await new Promise(resolve=>server.close(resolve));}
