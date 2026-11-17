import {readFileSync} from 'node:fs';
const snapshot=JSON.parse(readFileSync(new URL('./hub-catalog.json',import.meta.url),'utf8'));
export const hubProjects=snapshot.projects;
export const featuredHubIds=snapshot.featured;
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const featuredCopy={
  'gamespec-relay':{type:'需求与交付',hook:'从讨论，到可以开工的任务。',brief:'整理群聊与策划文档，核对决定和疑问，拆成六职能任务、验收标准与改动影响。',note:'完整示例可离线体验；模型连接可选。'},
  planmap:{type:'思考与结构',hook:'说出想法，让结构跟上思路。',brief:'通过对话修改文字、重组内容，在树状、鱼骨和横向结构间切换，自动整理脑图排版。',note:'项目演示展示对话改图与结构切换。'},
  'codex-multi-thread-workbench':{type:'多任务协作',hook:'多个上下文，同一个工作台。',brief:'并排查看任务与对话，直接输入消息、辨认运行状态，并拖拽调整卡片位置。',note:'网页为安全演示，不读取访问者的 Codex。'},
};
const actions=p=>`<div class="hub-tool-actions"><a href="${e(p.entry)}">打开项目 ↗</a>${p.video?`<a href="${e(p.video)}">演示视频 ↗</a>`:''}${p.downloads.map(d=>`<a href="${e(d.url)}">${e(d.platform==='windows'?'Windows 下载':d.platform==='mac'?'Mac 下载':d.platform+' 下载')} ↗</a>`).join('')}</div>`;
export function renderHubTools(){
  const remaining=hubProjects.filter(p=>!featuredHubIds.includes(p.id));
  return `<section class="hub-tool-collection" id="ai-tools" aria-labelledby="ai-tools-title"><header class="hub-tool-heading"><div><p class="eyebrow">AI &amp; TOOLS / 个人工具实践</p><h3 id="ai-tools-title">AI 工具与交互实践<span class="title-dot">.</span></h3><p>将需求整理、结构表达和多任务协作，做成可以直接体验的工具。</p></div><a class="text-link" href="${e(snapshot.source)}">完整应用集合 ↗</a></header><div class="hub-featured-grid">${featuredHubIds.map(id=>{const p=hubProjects.find(p=>p.id===id),copy=featuredCopy[id],image=p.image;return `<article class="hub-tool-feature" id="hub-${e(id)}"><figure><a href="${e(image.src)}" aria-label="放大${e(p.name)}界面"><img src="${e(image.src)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" alt="${e(image.alt)}"></a><figcaption>公开演示界面 · <a href="${e(image.src)}">查看大图 ↗</a></figcaption></figure><div class="hub-tool-copy"><p class="eyebrow">${e(copy.type)}</p><h4>${e(p.name)}</h4><p class="hub-tool-hook">${e(copy.hook)}</p><p>${e(copy.brief)}</p><p class="record-source">${e(copy.note)}</p>${actions(p)}</div></article>`;}).join('')}</div><details class="hub-more" id="hub-more"><summary><span>查看其余 ${remaining.length} 个应用与小游戏</span><span class="hub-count">共 ${hubProjects.length} 项</span></summary><div class="hub-catalog-list">${remaining.map(p=>`<article class="hub-catalog-item" id="hub-${e(p.id)}"><p class="eyebrow">${e(p.category)}</p><h4>${e(p.name)}</h4><p>${e(p.brief)}</p><p class="hub-ai-use">${e(p.aiUse)}</p>${actions(p)}</article>`).join('')}</div><p class="record-source">目录核对：${e(snapshot.checkedAt.slice(0,10))} · 根据公开 Hub 整理。各项目的演示、下载及适用范围以项目页说明为准；不将全部工具称为在线模型服务。</p></details></section>`;
}
