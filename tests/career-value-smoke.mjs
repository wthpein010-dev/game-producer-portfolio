import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createSiteServer} from '../scripts/serve.mjs';
import {jobs,projectWork} from '../src/content.mjs';

const modulePath=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/iu.test(modulePath)?pathToFileURL(modulePath).href:modulePath);
const artifacts=new URL('../artifacts/career-value/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch(),results=[],errors=[];
const base=process.env.PORTFOLIO_URL||`http://127.0.0.1:${server.address().port}/`;
const routes=jobs.flatMap(job=>[
  {route:`experience/${job.slug}/`},
  ...job.projects.map(project=>({route:`projects/${project.slug}/`,shared:!projectWork[project.slug]})),
]);
try {
  for(const width of [360,768,1440]) {
    const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    for(const {route,shared} of routes) {
      assert.equal((await page.goto(base+route,{waitUntil:'load'})).status(),200);
      const section=page.locator('#work-value');
      assert.equal(await section.count(),1);
      const count=await section.locator('.work-value-item').count();
      assert.ok(count>=1&&count<=3);
      if(shared)assert.match(await section.innerText(),/公司任职共同职责/u);
      const issues=await section.evaluate(section=>{
        const problems=[],viewport=document.documentElement.clientWidth;
        const leaves=[...section.querySelectorAll('h2,h3,dt,dd,a,p')];
        for(const el of leaves) {
          const b=el.getBoundingClientRect();
          if(b.left<0||b.right>viewport+1||el.scrollWidth>el.clientWidth+1)problems.push('overflow:'+el.tagName);
        }
        for(const row of section.querySelectorAll('.work-value-item')) {
          const blocks=[row.querySelector('.work-value-label'),...row.querySelectorAll('dl > div'),row.querySelector('a')];
          for(let i=0;i<blocks.length;i++)for(let j=i+1;j<blocks.length;j++) {
            const a=blocks[i].getBoundingClientRect(),b=blocks[j].getBoundingClientRect();
            if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)problems.push('overlap');
          }
        }
        if(section.previousElementSibling?.classList.contains('detail-hero')!==true)problems.push('wrong-order');
        return problems;
      });
      assert.deepEqual(issues,[],`${width} ${route}`);
      for(const link of await section.locator('a').all()) {
        const target=new URL(await link.getAttribute('href'),page.url());
        assert.equal((await page.request.get(target.href)).status(),200);
      }
      if(['projects/matchmaking-inc/','projects/word-villas/','projects/words-with-colors/'].includes(route)) {
        await section.screenshot({path:fileURLToPath(new URL(`${route.split('/')[1]}-${width}.png`,artifacts))});
      }
      results.push({width,route});
    }
    await context.close();console.log(`PASS ${width}: ${routes.length} career pages`);
  }
  assert.deepEqual(errors,[]);
} finally {
  await browser.close();await new Promise(resolve=>server.close(resolve));
  await writeFile(new URL('report.json',artifacts),JSON.stringify({results,errors},null,2));
}
console.log(`Career value acceptance: ${results.length}/72 passed`);
