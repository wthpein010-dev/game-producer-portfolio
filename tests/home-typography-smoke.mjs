import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,readdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=process.env.PORTFOLIO_TEST_BASE||`http://127.0.0.1:${server.address().port}/`;
const output=process.env.TYPOGRAPHY_REPORT_DIR||'artifacts/typography/local';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const results=[],detailRoutes=[],errors=[];let status='failed';
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
 const routes=[];
 for(const directory of ['experience','projects','skills']){
  const files=await readdir(new URL('../'+directory+'/',import.meta.url),{recursive:true});
  routes.push(...files.filter(file=>/(^|[\\/])index\.html$/u.test(file)).map(file=>directory+'/'+file.replaceAll('\\','/')));
 }
 const detail=await browser.newPage({viewport:{width:360,height:900}});
 detail.on('pageerror',error=>errors.push(error.message));
 const reviewRoutes=new Set(['projects/nanjie-repair-shop/index.html','experience/jianyou/index.html','projects/sheep-match/gameplay/index.html']);
 for(const route of routes.sort()){
  assert.equal((await detail.goto(base+route)).status(),200,route);
  await detail.evaluate(()=>document.fonts.ready);
  const headings=await detail.locator('h1, main .section-head h2').evaluateAll(nodes=>nodes.map(node=>{
   const style=getComputedStyle(node);return {text:node.textContent,font:style.fontFamily,style:style.fontStyle};
  }));
  assert.ok(headings.length>0,route);
  for(const heading of headings){
   assert.ok(heading.font.startsWith('"Microsoft YaHei"'),`${route}: ${heading.text} uses ${heading.font}`);
   assert.equal(heading.style,'normal',`${route}: ${heading.text}`);
  }
  assert.equal(await detail.locator('h1').evaluate(node=>node.scrollWidth>node.clientWidth+1),false,route);
  if(reviewRoutes.has(route)){
   await detail.locator('h1').screenshot({path:`${output}/${route.replaceAll('/','-')}-360.png`});
  }
  detailRoutes.push(route);
 }
 await detail.close();
 assert.deepEqual(errors,[]);status='passed';
 console.log(JSON.stringify({status,widths:results.map(result=>result.width),detailPages:detailRoutes.length,errors}));
}catch(error){errors.push(error.stack||String(error));throw error;}
finally{await writeFile(output+'/report.json',JSON.stringify({status,base,results,detailRoutes,errors},null,2));await browser.close();await new Promise(resolve=>server.close(resolve));}
