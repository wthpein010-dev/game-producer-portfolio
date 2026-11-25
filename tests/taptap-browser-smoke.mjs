import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {once} from 'node:events';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {createSiteServer} from '../scripts/serve.mjs';
import {taptapGames} from '../src/taptap-games.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const artifacts=path.join(root,'artifacts','taptap-layout-20261025');
await mkdir(artifacts,{recursive:true});
const dependency=process.env.PLAYWRIGHT_MODULE || 'playwright';
const {chromium}=await import(/^[A-Z]:[\\/]/i.test(dependency)?pathToFileURL(dependency).href:dependency);
const server=createSiteServer({root});
server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH});
const errors=[],checks=[];
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',error=>errors.push(error.message));
page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
const fit=async()=>{
  const width=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(width.scroll<=width.client+1,JSON.stringify(width));
};
const decode=async()=>{
  const dimensions=await page.locator('.taptap-cover img, .taptap-detail .taptap-screenshot').evaluateAll(async images=>{
    return Promise.all(images.map(async img=>{img.loading='eager';await img.decode();return {width:img.naturalWidth,height:img.naturalHeight,declaredWidth:img.getAttribute('width'),declaredHeight:img.getAttribute('height'),src:img.currentSrc};}));
  });
  for(const size of dimensions){assert.ok(size.width>0&&size.height>0);assert.ok(Math.abs(size.height-size.width*Number(size.declaredHeight)/Number(size.declaredWidth))<=2+Number(size.declaredHeight)/Number(size.declaredWidth),'Responsive screenshot preserves aspect within density-adjusted pixel rounding: '+JSON.stringify(size));}
};
try {
  for(const width of [320,360,390,620,700,701,760,761,768,820,821,1024,1100,1101,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(base+`index.html?viewport=${width}#mobile-games`,{waitUntil:'networkidle'});
    await page.locator('#hub-games > details > summary').press('Enter');
    await page.locator('#mobile-games > details > summary').click();
    await page.locator('#mobile-games > details[open] .ai-game-card').first().waitFor({state:'visible'});
    await fit();await decode();
    const columns=await page.locator('#mobile-games .ai-game-grid').first().evaluate(grid=>getComputedStyle(grid).gridTemplateColumns.split(' ').length);
    assert.equal(columns,width<=620?1:width<=1000?2:3);
    assert.equal(await page.locator('#mobile-games article.taptap-card').count(),taptapGames.length);
    const expandedCards=page.locator('#mobile-games > details > .ai-game-grid > .ai-game-card:visible');
    assert.equal(await expandedCards.count(),17);
    assert.equal(await expandedCards.locator('figure img:visible').count(),17);
    assert.equal(await expandedCards.locator('.ai-game-description:visible').count(),17);
    assert.equal(await page.locator('#mobile-games > details > nav').count(),0);
    const rows=await page.locator('#ai-games .ai-game-card').evaluateAll(cards=>cards.map(card=>{
      const rect=selector=>card.querySelector(selector).getBoundingClientRect();
      return {top:card.getBoundingClientRect().top, heading:rect('h4').top,
        image:rect('.ai-game-cover').top, aspect:rect('.ai-game-cover').width/rect('.ai-game-cover').height,
        description:rect('.ai-game-description').top,tags:rect('.ai-game-tags').top,
        status:rect('.ai-game-status').top,actions:rect('.ai-game-actions').top};
    }));
    assert.equal(rows.length,taptapGames.length+14);
    for(const row of rows){
      assert.ok(Math.abs(row.aspect-16/9)<.02,'Landscape cover must use a 16:9 frame');
      assert.ok(row.heading<row.image&&row.image<row.description&&row.description<row.tags&&row.tags<row.actions);
      for(const sibling of rows.filter(other=>other.top===row.top)){
        for(const key of ['heading','image','description','tags','status','actions'])
          assert.ok(Math.abs(sibling[key]-row[key])<1,'Same-row '+key+' must align');
      }
    }
    await page.locator('#mobile-games').scrollIntoViewIfNeeded();
    if(width===390||width===1440) await page.screenshot({path:path.join(artifacts,`collection-${width}.png`)});
    checks.push(`home ${width}: all current projects, images decoded, no horizontal overflow`);
  }
  await page.goto(base+'index.html',{waitUntil:'networkidle'});
  const destinations=['career-cases','ai-games','ai-tools'];
  assert.equal(await page.locator('.intro-reading-links a').count(),destinations.length);
  for(const id of destinations) {
    const shortcut=page.locator(`.intro-reading-links a[href="#${id}"]`);await shortcut.focus();await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash,'#'+id);
  }
  const chapterLinks=page.locator('#experience .chapter-rail a');
  assert.equal(await chapterLinks.count(),await page.locator('#experience .company-entry').count());
  for(const link of await chapterLinks.all()) {
    const target=await link.getAttribute('href');
    await link.press('Enter');
    assert.equal(new URL(page.url()).hash,target);
    assert.ok(await page.locator(target).isVisible());
  }
  const skills=page.locator('.skill-evidence');assert.equal(await skills.count(),6);
  for(const skill of await skills.all()) {
    assert.equal(await skill.getAttribute('open'),null);
    await skill.locator('summary').click();assert.ok(await skill.locator('a').first().isVisible());
    await skill.locator('summary').click();assert.equal(await skill.locator('a').first().isVisible(),false);
  }
  checks.push('Three first-screen shortcuts and six native skill disclosures work with keyboard and pointer');
  const supporting=page.locator('#ai-supporting');
  const tabs=supporting.locator('[data-tabs] [role="tab"]');
  assert.equal(await tabs.count(),4);
  await supporting.locator(':scope > summary').press('Enter');
  for(const tab of await tabs.all()) {
    await tab.click();assert.equal(await tab.getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#'+await tab.getAttribute('aria-controls')).isVisible(),true);
  }
  checks.push('All career chapter links and the four tabs inside the AI workflow disclosure remain operational');
  for(const game of taptapGames) for(const width of [390,1440]) {
    await page.setViewportSize({width,height:1000});
    const response=await page.goto(base+`projects/taptap-${game.slug}/`,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);await fit();await decode();
    assert.equal(await page.locator('h1').textContent(),game.title+'.');
    assert.equal(await page.locator('.taptap-hero-shot img').count(),1);
    const sources=await page.locator('#design img, #screenshots img').evaluateAll(images=>images.map(img=>img.dataset.originalSrc||img.getAttribute('src')));
    for(const shot of game.shots.slice(1))assert.ok(sources.includes('../../'+shot.src),shot.src);
    const playLinks=await page.locator('.taptap-play a[href^="https:"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
    assert.deepEqual(playLinks,game.tapUrl?[game.tapUrl]:[]);
    const hero=await page.locator('.taptap-hero-shot img').boundingBox();
    assert.ok(hero.y<(width===390?1000:500),'First game image appears early in the page');
    await page.screenshot({path:path.join(artifacts,`${game.slug}-${width}.png`)});
    const shot=page.locator('.taptap-hero-shot a');
    await shot.focus();await page.keyboard.press('Enter');
    await page.locator('dialog.reading-lightbox[open]').waitFor();
    assert.equal(await page.locator('dialog[open] img').getAttribute('alt'),game.shots[0].alt);
    await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await shot.evaluate(el=>document.activeElement===el),true,'Image dialog restores keyboard focus');
    for(const link of await page.locator('.taptap-section-nav a').all()) {
      await link.click();const id=(await link.getAttribute('href')).slice(1);
      assert.equal(new URL(page.url()).hash,'#'+id);
      const top=await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top);
      assert.ok(top>=-1&&top<page.viewportSize().height-120,`${game.slug}/${width}/${id}: section heading is in the viewport (top=${top})`);
    }
    if(width===390&&await page.locator('.taptap-scroll-gallery').count()) {
      const gallery=page.locator('#screenshots .taptap-scroll-gallery');
      await gallery.focus();await page.keyboard.press('ArrowRight');
      await page.waitForFunction(()=>document.querySelector('#screenshots .taptap-scroll-gallery').scrollLeft>0);
    }
    await page.locator('.taptap-next [data-return-home]').click();
    await page.waitForURL(`**/index.html#work-${game.slug}`);await fit();
    checks.push(`${game.slug} ${width}: direct route, media, keyboard image dialog and return anchor`);
  }
  const noScript=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce'});
  const plain=await noScript.newPage();
  await plain.goto(base+'projects/taptap-after-hours-stall/');
  assert.equal(await plain.locator('h1').textContent(),'下班收摊.');
  assert.equal(await plain.locator('.taptap-detail .taptap-image-link').count(),3);
  assert.equal(await plain.locator('.taptap-play a').getAttribute('href'),taptapGames.find(g=>g.slug==='after-hours-stall').tapUrl);
  await plain.goto(base+'projects/taptap-jigmeme/');
  const plainGallery=plain.locator('#screenshots .taptap-scroll-gallery');await plainGallery.scrollIntoViewIfNeeded();await plainGallery.focus();
  assert.ok(await plainGallery.evaluate(el=>el===document.activeElement&&el.scrollWidth>el.clientWidth));
  await plain.keyboard.press('ArrowRight');
  // Poll from the test process: disabled page scripts also disable page-owned timers.
  for(let attempt=0;attempt<20&&await plainGallery.evaluate(el=>el.scrollLeft)===0;attempt++)await new Promise(resolve=>setTimeout(resolve,50));
  assert.ok(await plainGallery.evaluate(el=>el.scrollLeft>0),'No-script gallery responds to native arrow keys');
  await plain.goto(base+'projects/taptap-food-car/');
  const foodCar=taptapGames.find(game=>game.slug==='food-car');
  assert.equal(await plain.locator('#screenshots .taptap-screenshot, #design .taptap-screenshot').count(),foodCar.shots.length-1);
  assert.equal(await plain.locator('#production-art .taptap-screenshot').count(),foodCar.artwork.length);
  await noScript.close();checks.push('No-script details preserve all images, native gallery scrolling and TapTap links');
  assert.equal(errors.length,0,JSON.stringify(errors));
  await writeFile(path.join(artifacts,'report.json'),JSON.stringify({checks,errors,passed:checks.length},null,2));
  console.log(`PASS ${checks.length} headless checks; runtime errors: ${errors.length}`);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
