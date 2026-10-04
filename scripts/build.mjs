import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {jobs} from '../src/content.mjs';
import {renderHome,renderDetail,renderDiagram} from '../src/render.mjs';
export const siteRoot=fileURLToPath(new URL('../',import.meta.url));
export async function build(){const ai=await readFile(path.join(siteRoot,'src/ai.html'),'utf8');await mkdir(path.join(siteRoot,'assets/diagrams'),{recursive:true});await writeFile(path.join(siteRoot,'index.html'),renderHome(ai));for(const job of jobs){const dir=path.join(siteRoot,'experience',job.slug);await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),renderDetail(job));await writeFile(path.join(siteRoot,'assets/diagrams',job.slug+'.svg'),renderDiagram(job));for(const p of job.projects){const pdir=path.join(siteRoot,'projects',p.slug);await mkdir(pdir,{recursive:true});await writeFile(path.join(pdir,'index.html'),renderDetail(job,p));await writeFile(path.join(siteRoot,'assets/diagrams',p.slug+'.svg'),renderDiagram(job,p));}}await writeFile(path.join(siteRoot,'.nojekyll'),'');console.log(`Built home, ${jobs.length} company pages and ${jobs.reduce((n,j)=>n+j.projects.length,0)} project pages.`);}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
