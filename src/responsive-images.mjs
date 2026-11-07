import {readFileSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';

const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const escaped=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;');
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1].toLowerCase(),m[2]??m[3]]));
const hasClass=(nodes,name)=>nodes.some(node=>(node.attrs.class||'').split(/\s+/).includes(name));

function imageSizes(nodes,entry) {
  if(hasClass(nodes,'taptap-cover')) {
    const landscape=nodes.some(node=>node.attrs['data-shot-format']==='landscape');
    return `(max-width: 620px) calc(100vw - 85px), ${landscape?'366px':'240px'}`;
  }
  if(hasClass(nodes,'taptap-hero-shot'))return '(max-width: 620px) calc(100vw - 109px), 400px';
  if(hasClass(nodes,'taptap-shot-grid')) {
    if(entry.width>entry.height&&nodes.some(node=>node.attrs['data-shot-count']==='1'))return '(max-width: 620px) calc(100vw - 85px), (max-width: 940px) calc(100vw - 97px), 854px';
    if(entry.width>entry.height)return '(max-width: 620px) calc(100vw - 85px), (max-width: 760px) calc(100vw - 97px), 560px';
    return '(max-width: 620px) calc(100vw - 85px), 480px';
  }
  if(hasClass(nodes,'career-case-image'))return '(max-width: 620px) calc(100vw - 57px), 382px';
  if(hasClass(nodes,'project-visual-overview'))return '(max-width: 700px) calc(100vw - 57px), 550px';
  if(hasClass(nodes,'indie-project'))return '(max-width: 700px) calc(100vw - 57px), (max-width: 1200px) calc(50vw - 40px), 562px';
  return '(max-width: 700px) calc(100vw - 55px), (max-width: 1240px) calc(100vw - 48px), 1200px';
}

/** Enrich generated markup only; original anchors and full-size inspection images remain intact. */
export function decorateImageMarkup(html,manifest) {
  const nodes=[];
  return html.replace(/<\/?[a-z][\w:-]*\b[^>]*>/gi,tag=>{
    const name=tag.match(/^<\/?([\w:-]+)/)[1].toLowerCase();
    if(tag.startsWith('</')) {
      const index=nodes.findLastIndex(node=>node.name===name);
      if(index>=0)nodes.length=index;
      return tag;
    }
    const attrs=attributes(tag);
    if(name!=='img') {
      if(!voidTags.has(name)&&!tag.endsWith('/>'))nodes.push({name,attrs});
      return tag;
    }
    if(!attrs.src||attrs.srcset||attrs['data-original-src'])return tag;
    const local=attrs.src.match(/^((?:\.\.\/)*)((?:assets\/).+)$/);
    if(!local)return tag;
    const entry=manifest.images?.[local[2]];
    if(!entry?.variants?.length)return tag;
    if(nodes.some(node=>node.name==='details'&&/\binspect\b/.test(node.attrs.class||''))) {
      return tag.replace(/\s*\/?>(?=$)/,`${attrs.decoding?'':' decoding="async"'} data-full-resolution="true">`);
    }
    const candidates=entry.variants.toSorted((a,b)=>a.width-b.width);
    const fallback=candidates.findLast(candidate=>candidate.width<=960)||candidates[0];
    const prefix=local[1];
    const srcset=candidates.map(candidate=>`${prefix}${candidate.src} ${candidate.width}w`).join(', ');
    return tag.replace(/\bsrc\s*=\s*(?:"[^"]*"|'[^']*')/i,`src="${escaped(prefix+fallback.src)}"`)
      .replace(/\s*\/?>(?=$)/,` srcset="${escaped(srcset)}" sizes="${escaped(imageSizes(nodes,entry))}" data-original-src="${escaped(attrs.src)}"${attrs.decoding?'':' decoding="async"'}>`);
  });
}

/** Catch stale previews after an original changes; CI never needs an image codec. */
export function validateImageManifest(root,manifest) {
  if(manifest.version!==1||!manifest.images)throw new Error('Unsupported responsive image manifest');
  const assetRoot=path.resolve(root,'assets')+path.sep;
  const localFile=src=>{
    const resolved=path.resolve(root,src);
    if(!resolved.startsWith(assetRoot))throw new Error(`Image path outside public assets: ${src}`);
    return resolved;
  };
  for(const [src,entry] of Object.entries(manifest.images)) {
    const bytes=readFileSync(localFile(src));
    if(createHash('sha256').update(bytes).digest('hex')!==entry.sourceSha256)throw new Error(`Stale image previews: ${src}; regenerate variants`);
    for(const variant of entry.variants) {
      if(!variant.src.startsWith('assets/optimized/')||!variant.src.endsWith('.webp')||variant.width>entry.width||variant.width<=0||variant.height<=0||statSync(localFile(variant.src)).size!==variant.bytes)throw new Error(`Invalid image preview: ${variant.src}`);
    }
  }
}
