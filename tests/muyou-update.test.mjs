import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {jobs} from '../src/content.mjs';
const read = file => readFile(new URL('../'+file,import.meta.url),'utf8');

test('confirmed May departure and entry dates remain consistent across resume routes',async()=>{
 const hero=jobs.find(j=>j.slug==='hero-games');
 const jianyou=jobs.find(j=>j.slug==='jianyou');
 assert.equal(hero.end,'2026-05-15');
 assert.equal(hero.period,'2025.07—2026.05.15');
 assert.equal(jianyou.start,'2026-05-18');
 assert.equal(jianyou.period,'2026.05.18—至今');
 for(const file of ['index.html','experience/jianyou/index.html','experience/hero-games/index.html','projects/sheep-match/index.html','projects/crisis-dawn/index.html']){
  const html=await read(file);
  assert.doesNotMatch(html,/2026[.-]07[.-](?:23|27)/u);
  assert.match(html,file.includes('hero-games')||file.includes('crisis-dawn')?/2026\.05\.15/u:/2026\.05\.18/u);
 }
 assert.match(await read('index.html'),/游戏制作人 · 2026\.05\.18 起/u);
});

test('corrected Muyou tenure removes Quwan and retains two separately sourced projects',async()=>{
 const job=jobs.find(j=>j.slug==='muyou');
 assert.equal(job.end,'2022-07');
 assert.equal(job.period,'2021.05—2022.07');
 assert.equal(jobs.length,7);
 assert.ok(!jobs.some(j=>j.slug==='quwan'));
 assert.equal(job.projects.find(p=>p.slug==='zuoyaoji-x').title,'作妖计');
 for(const file of ['index.html','experience/muyou/index.html','projects/my-town/index.html','projects/zuoyaoji-x/index.html']){
  const html=await read(file);
  assert.doesNotMatch(html,/2021\.05—2021\.12|北京趣丸科技|experience\/quwan|projects\/party-planet/u);
 }
 for(const file of ['experience/quwan/index.html','projects/party-planet/index.html','projects/party-planet/design-summary/index.html']){
  await assert.rejects(stat(new URL('../'+file,import.meta.url)),{code:'ENOENT'});
 }
});

test('Haoteng tenure extends to March 2020 without retaining Xingqi resume routes',async()=>{
 const job=jobs.find(j=>j.slug==='haoteng');
 assert.equal(job.end,'2020-03');
 assert.equal(job.period,'2018.02—2020.03');
 assert.ok(!jobs.some(j=>j.slug==='xingqi'));
 assert.deepEqual(job.projects.map(p=>p.slug),['idiom-scholar','train-king','versatile-dog']);
 for(const file of ['index.html','experience/haoteng/index.html','projects/idiom-scholar/index.html','projects/train-king/index.html','projects/versatile-dog/index.html']){
  const html=await read(file);
  assert.match(html,/2018\.02—2020\.03/u);
  assert.doesNotMatch(html,/2018\.02—2019\.08|星奇畅想|experience\/xingqi|projects\/toby-adventure/u);
 }
 for(const file of ['experience/xingqi/index.html','projects/toby-adventure/index.html'])await assert.rejects(stat(new URL('../'+file,import.meta.url)),{code:'ENOENT'});
});

test('Muyou evidence distinguishes signed growth design, town configuration and planned delivery',async()=>{
 const town=await read('projects/my-town/index.html');
 const pet=await read('projects/zuoyaoji-x/index.html');
 const company=await read('experience/muyou/index.html');
 for(const html of [town,await read('projects/my-town/design-summary/index.html')]){
  for(const id of ['town-framework','town-economy','town-delivery'])assert.ok(html.includes(`id="${id}"`));
  assert.match(html,/任务.*宝箱/u);
  assert.match(html,/甘特图/u);
  assert.match(html,/未开始|待启动/u);
  assert.doesNotMatch(html,/mozhao_break|pet3_attr|曹博钧|陈伶俐/u);
 }
 for(const html of [pet,await read('projects/zuoyaoji-x/design-summary/index.html')]){
  for(const id of ['zuoyao-shield','zuoyao-pet-growth','zuoyao-pet-formation'])assert.ok(html.includes(`id="${id}"`));
  assert.match(html,/文档撰写人：吴天昊/u);
  assert.match(html,/红点/u);
  assert.match(html,/历史/u);
  assert.match(html,/团队美术/u);
  assert.doesNotMatch(html,/id="town-design"|pet3_attr|mozhao_break|收入提升/u);
 }
 assert.doesNotMatch(town,/id="zuoyao-design"/u);
 assert.match(company,/projects\/zuoyaoji-x\/#zuoyao-design/u);
 const {muyouAssets}=await import('../src/muyou-evidence.mjs');
 assert.equal(muyouAssets.length,4);
 for(const item of muyouAssets){
  const bytes=await readFile(new URL('../assets/project-design/'+item.path,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
  assert.equal(bytes.readUInt32BE(16),item.width);
  assert.equal(bytes.readUInt32BE(20),item.height);
 }
});
