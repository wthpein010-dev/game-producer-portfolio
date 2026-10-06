import {materialCases,materialDiagram} from '../src/material-cases.mjs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {jobs} from '../src/content.mjs';
import {renderHome,renderDetail,renderDiagram,renderPublicNote,renderMaterialNote} from '../src/render.mjs';
import {sheepNotes,renderSheepNoteDiagram} from '../src/sheep-notes.mjs';
import {renderIdiomSummary} from '../src/render.mjs';
export const siteRoot=fileURLToPath(new URL('../',import.meta.url));

function graphicTheme(css) {
  const value = name => {
    const color=css.match(new RegExp(`${name}:\\s*(#[a-f\\d]{6});`,'i'))?.[1];
    if(!color)throw new Error(`Missing canonical graphic color ${name}`);
    return color;
  };
  const groups = {
    '--paper':['#f6f3e9','#eceee9'],
    '--surface':['#cadac6','#f3da9c','#d3cae8','#efc9b0','#bfdae1'],
    '--plum':['#382f48','#28372e','#304b37','#385a43','#2d4f3d'],
    '--ink':['#26362c'], '--line':['#c6d2c4','#7e718d','#babdb5'],
    '--plum-soft':['#eeeaf3'], '--lime':['#d7ed92'],
    '--muted':['#625e6c'], '--on-primary-muted':['#d4ccdf'],
  };
  const map = new Map(Object.entries(groups).flatMap(([name,colors])=>colors.map(color=>[color,value(name)])));
  return svg=>svg.replace(/#[a-f\d]{6}\b/gi,color=>map.get(color.toLowerCase())||color);
}
export async function build() {
  const ai=await readFile(path.join(siteRoot,'src/ai.html'),'utf8');
  const theme=graphicTheme(await readFile(path.join(siteRoot,'assets/site.css'),'utf8'));
  await mkdir(path.join(siteRoot,'assets/diagrams'),{recursive:true});
  await writeFile(path.join(siteRoot,'index.html'),renderHome(ai));
  for(const job of jobs) {
    const dir=path.join(siteRoot,'experience',job.slug);
    await mkdir(dir,{recursive:true});
    await writeFile(path.join(dir,'index.html'),renderDetail(job));
    await writeFile(path.join(siteRoot,'assets/diagrams',job.slug+'.svg'),theme(renderDiagram(job)));
    for(const p of job.projects) {
      const pdir=path.join(siteRoot,'projects',p.slug);
      await mkdir(pdir,{recursive:true});
      await writeFile(path.join(pdir,'index.html'),renderDetail(job,p));
      await writeFile(path.join(siteRoot,'assets/diagrams',p.slug+'.svg'),theme(renderDiagram(job,p)));
    }
  }
  for(const note of sheepNotes) {
    const dir=path.join(siteRoot,'projects','sheep-match',note.slug);
    await mkdir(dir,{recursive:true});
    await writeFile(path.join(dir,'index.html'),renderPublicNote(note));
    await writeFile(path.join(siteRoot,'assets/diagrams',`sheep-match-${note.slug}.svg`),theme(renderSheepNoteDiagram(note)));
  }
  for(const c of materialCases){const dir=path.join(siteRoot,'projects',c.project,'design-summary');await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),renderMaterialNote(c));await writeFile(path.join(siteRoot,'assets/diagrams','material-'+c.project+'.svg'),theme(materialDiagram(c)));}
  const idiomSummary=path.join(siteRoot,'projects','idiom-scholar','design-summary');
  await mkdir(idiomSummary,{recursive:true});
  await writeFile(path.join(idiomSummary,'index.html'),renderIdiomSummary());
  await writeFile(path.join(siteRoot,'.nojekyll'),'');
  console.log(`Built home, ${jobs.length} company pages, ${jobs.reduce((n,j)=>n+j.projects.length,0)} project pages and ${sheepNotes.length} public responsibility notes.`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
