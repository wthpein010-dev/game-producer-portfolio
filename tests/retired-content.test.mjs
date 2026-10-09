import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir,readFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const retired=/quwan|party-planet|tt-design|xingqi|toby-adventure|趣丸|星奇|派对星球|派对总动员|托比大冒险/iu;
async function files(dir){
 const result=[];
 for(const item of await readdir(new URL(dir+'/',root),{withFileTypes:true})){
  const path=dir+'/'+item.name;
  if(item.isDirectory())result.push(...await files(path));else result.push(path);
 }
 return result;
}
test('retired companies have no remaining pages, design assets, modules or source records',async()=>{
 for(const dir of ['assets','src','docs','experience','projects']){
  for(const path of await files(dir)){
   assert.doesNotMatch(path,retired,`Retired material filename: ${path}`);
   if(/\.(?:html|mjs|md|svg)$/u.test(path))assert.doesNotMatch(await readFile(new URL(path,root),'utf8'),retired,`Retired material contents: ${path}`);
  }
 }
 for(const path of ['index.html','DESIGN.md','README.md','tests/browser-smoke.mjs'])assert.doesNotMatch(await readFile(new URL(path,root),'utf8'),retired,path);
});
