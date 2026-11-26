import {renderZhuyinEntry,renderZhuyinBody} from './zhuyin-jianghu.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {decorateImageMarkup} from './responsive-images.mjs';
import {renderCareerCases,renderProjectGallery,renderProducerSkills} from './home-showcase.mjs';
const imageManifest=JSON.parse(readFileSync(new URL('../assets/optimized/manifest.json',import.meta.url),'utf8'));
import {renderTapTapBody,renderTapTapCard} from './taptap-portfolio.mjs';
import {taptapGames} from './taptap-games.mjs';
import {renderZuoyaoDesign,renderZuoyaoCompanyEntry} from './muyou-evidence.mjs';
import {renderBetaDesign} from './beta-design.mjs';
import {renderWordExcerpts} from './word-excerpts.mjs';
import {renderTownDesign,renderTownCompanyEntry} from './town-design.mjs';
import {renderIdiomOverview,renderIdiomDesign,renderIdiomCompanyEntry} from './idiom-design.mjs';
import {materialCases,renderMaterialCases} from './material-cases.mjs';
import {jobs,profile,skills,hubBase,sourceSha,companyWork,sharedCompanyWork,projectWork} from './content.mjs';
import {renderSheepReading,renderSheepNoteBody} from './sheep-notes.mjs';
import {renderSheepDesign} from './sheep-design.mjs';
import {renderSheepScreens} from './sheep-visuals.mjs';
import {renderSheepPlaytest} from './sheep-playtest.mjs';
import {renderCollaborationEntry,renderCollaborationBody} from './collaboration.mjs';
import {hubGames,renderHubGames,renderHubTools} from './hub-tools.mjs';
import {renderCrisisGallery} from './hero-design.mjs';
import {trainUiViews} from './train-design.mjs';
import {gooseUiViews} from './goose-design.mjs';
import {renderAiPocketEntry,renderAiPocketBody} from './ai-pocket.mjs';
import {renderRingHavenEntry,renderRingHavenBody} from './ring-haven.mjs';
import {renderTokenGameEntry,renderTokenGameBody} from './token-game.mjs';
import {recentGames,renderRecentGameEntry,renderRecentGameBody} from './portfolio-recent-games.mjs';
import {renderNanjieEntry,renderNanjieBody} from './nanjie-repair-shop.mjs';
import {renderYujiangCoffeeEntry,renderYujiangCoffeeBody} from './yujiang-coffee.mjs';
import {renderFadingShadowsEntry,renderFadingShadowsBody,fadingShadowsSummary} from './fading-shadows.mjs';
import {renderHubGameBody,hubGameSummary} from './hub-game-stories.mjs';
export const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sharedAssetVersion = ['legacy.css','site.css','app.js','reading.js']
  .reduce((hash,name)=>hash.update(readFileSync(new URL('../assets/'+name,import.meta.url))),createHash('sha256'))
  .digest('hex').slice(0,12);
export function renderIdiomSummary() {
  return shell({title:'成语小秀才 · 设计资料摘要',description:'成语小秀才的成长循环、填字规则、每日挑战与界面交互资料。',base:'../../../',page:'document',attrs:'data-company="haoteng"',body:`<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../">返回成语小秀才项目</a><span aria-hidden="true">/</span><a href="../../../experience/haoteng/">豪腾嘉科经历</a></nav><header class="detail-hero"><p class="eyebrow">PROJECT JOURNAL / 设计资料摘要</p><h1>成语小秀才<span class="title-dot">.</span></h1><p class="detail-lede">从项目文档与界面资源阅读系统规则、玩法判定和交互路径。</p></header>${renderIdiomDesign(escapeHtml,'../../../')}</main>`});
}
const e = escapeHtml;
const tokenGameStyles = 'assets/token-game/portfolio.css';
const homeStyles = 'assets/home.css';
const homeScripts = ['assets/home-motion.js','assets/home-search.js'];
const homeAssetVersion = [homeStyles,...homeScripts]
  .reduce((hash,name)=>hash.update(readFileSync(new URL('../'+name,import.meta.url))),createHash('sha256'))
  .digest('hex').slice(0,12);
export function renderZuoyaoSummary() {
  return shell({title:'作妖计 · 设计资料摘要',description:'署名魔罩、魔宠成长与阵容交互设计资料。',base:'../../../',page:'document',attrs:'data-company="muyou"',body:`<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../">返回作妖计项目</a><span aria-hidden="true">/</span><a href="../../../experience/muyou/">牧游科技经历</a></nav><header class="detail-hero"><p class="eyebrow">AUTHORED DESIGN / 策划资料摘要</p><h1>作妖计<span class="title-dot">.</span></h1><p class="detail-lede">成长规则、战斗作用与界面交付。</p></header>${renderZuoyaoDesign(e,'../../../')}</main>`});
}
export function renderBetaSummary() {
  return shell({title:'Wordvillas · 策划资料摘要',description:'吴天昊署名的锦标赛、分支剧情、限时任务策划与团队界面参考。',base:'../../../',page:'document',attrs:'data-company="beta"',body:`<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../">返回 Wordvillas 项目</a><span aria-hidden="true">/</span><a href="../../../experience/beta/">贝塔科技经历</a></nav><header class="detail-hero"><p class="eyebrow">AUTHORED DESIGN / 策划资料摘要</p><h1>Wordvillas<span class="title-dot">.</span></h1><p class="detail-lede">锦标赛、分支剧情、活动与投骰子的设计交付。</p></header>${renderWordExcerpts(e,'../../../')}${renderBetaDesign(e,'../../../')}</main>`});
}
export function renderTownSummary() {
  return shell({title:'我的小镇 · 设计资料摘要',description:'我的小镇经营循环、新手引导与任务交互设计资料。',base:'../../../',page:'document',attrs:'data-company="muyou"',body:`<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../">返回我的小镇项目</a><span aria-hidden="true">/</span><a href="../../../experience/muyou/">牧游科技经历</a></nav><header class="detail-hero"><p class="eyebrow">PROJECT JOURNAL / 设计资料摘要</p><h1>我的小镇<span class="title-dot">.</span></h1><p class="detail-lede">经营流程、新手体验与任务状态。</p></header>${renderTownDesign(e,'../../../')}</main>`});
}
const counter = n => String(n).padStart(2,'0');
export function renderCollaborationPage() {
  return shell({title:'AI 辅助研发与团队协作',description:'需求收口、任务组织、原型交付与验证复盘：吴天昊的人机协同研发方法。',body:renderCollaborationBody(e),base:'../../',page:'document'});
}
export function renderAiPocketPage() {
  return shell({title:'AI 随身舱 · AI 工具工作台',description:'从办公整理、电商图片、写作到视频生成，按任务选择工具，组织输入并检查产物。',body:renderAiPocketBody(e),base:'../../',page:'document'});
}
export function renderRingHavenPage() {
  return shell({title:'环环小憩 · 圆环解谜',description:'转动圆环，对准开口，逐个解开连接。挑战炸弹关、奖励关和每日谜题，为海狸解锁新装。',body:renderRingHavenBody(e),base:'../../',page:'document'});
}
export function renderTokenGamePage() {
  return shell({title:'又没Token了！ · AI 工作室经营',description:'用有限 Token 经营 AI 工作室。接单、排进制作队列，再判断返工、重跑或保留素材哪条路最划算。',body:renderTokenGameBody(),base:'../../',page:'document',stylesheet:tokenGameStyles});
}
export function renderRecentGamePage(game) {
  return shell({title:game.title, description:game.summary,body:renderRecentGameBody(game,e),base:'../../',page:'document'});
}
export function renderZhuyinPage() {
  return shell({title:'竹隐江湖2D · 竖屏武侠 RPG',description:'穿过竹林与村镇，在竖屏里体验探索、交锋和侠客成长。',body:renderZhuyinBody(),base:'../../',page:'document'});
}

export function renderNanjiePage() {
  return shell({title:'南街修物志 · 旧物修复经营',description:'给街坊修收音机，从诊断到试机，把手上的旧物修好，也把巷口的小店经营起来。',body:renderNanjieBody(),base:'../../',page:'document'});
}
export function renderYujiangCoffeePage() {
  return shell({title:'渔江咖啡 · 海上经营',description:'白天出海打捞，回船冲一杯咖啡，听来客把故事讲下去。',body:renderYujiangCoffeeBody(e),base:'../../',page:'document'});
}
export function renderFadingShadowsPage() {
  return shell({title:'影逝之境 · 同屏武侠动作',description:fadingShadowsSummary,body:renderFadingShadowsBody(e),base:'../../',page:'document',stylesheet:'assets/fading-shadows/portfolio.css'});
}
export function renderHubGameDetail(game) {
  return shell({title:game.name+' · 玩法与设计',description:hubGameSummary(game),body:renderHubGameBody(game),base:'../../',page:'document'});
}
function chapterRail() {
  const labels = {
    jianyou: '简游', 'hero-games': '英雄游戏', bolang: '波浪', muyou: '牧游',
    beta: '贝塔', haoteng: '豪腾嘉科', iceshi: '冰狮',
  };
  return `<nav class="chapter-rail" aria-label="职业章节快捷导航"><span>经历索引</span><ol>${jobs.map((job,index)=>`
    <li><a href="#company-${job.slug}" aria-label="第 ${counter(index+1)} 章：${e(job.employer)}，${e(job.period)}" ${!job.end?'class="current-chapter"':''}>${counter(index+1)}<span class="chapter-name" aria-hidden="true">${e(labels[job.slug] ?? job.employer)}</span></a></li>`).join('')}</ol></nav>`;
}
export function renderPublicNote(note) {
  return shell({title:`${note.title} · 公开职责摘要`,description:note.lead,
    body:renderSheepNoteBody(note,jobs.find(job=>job.slug==='jianyou'),e),
    base:'../../../',page:'document',attrs:'data-company="jianyou"'});
}
function header(base, page) {return `<a class="skip-link" href="#main">跳到主要内容</a><header class="site-header wrap"><a class="brand" href="${base}index.html"><span class="brand-symbol" aria-hidden="true">↗</span><span>${profile.name}<small>GAME PRODUCER / PROJECT JOURNAL</small></span></a><nav aria-label="主要导航"><a href="${base}index.html#experience">职业时间轴</a><a href="${base}index.html#producer-skills">策划技能点</a><a href="${base}index.html#selected">个人作品</a>${page==='home'?'':`<a href="${base}index.html#taptap-games">TapTap</a>`}</nav><a class="hub-link" href="${hubBase}">公开 Hub ↗</a></header>`;}
function footer(base='') {return `<footer class="site-footer wrap"><div><span class="footer-mark" aria-hidden="true">↗</span><p>工作经历<br><strong>与个人作品</strong></p></div><div class="footer-evidence"><span>职业信息来自本人履历与确认；项目介绍另附公开来源。</span><a href="https://github.com/wthpein010-dev/ai-application-hub/tree/${sourceSha}">个人实践公开证据 ↗</a><span>不展示电话、邮箱或原始简历附件。</span></div><a class="back-top" href="${base}index.html#top">回到首页 ↑</a></footer>`;}
function shell({title,description,body,base='',page='home',attrs='',stylesheet}) {
  const extraStyle = (stylesheet ? `<link rel="stylesheet" href="${base}${e(stylesheet)}">` : '')
    + (page==='home' ? `<link rel="stylesheet" href="${homeStyles}?v=${homeAssetVersion}">` : '');
  const extraScript = page==='home' ? homeScripts.map(src=>`<script src="${src}?v=${homeAssetVersion}" defer></script>`).join('') : '';
  return `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${e(description)}"><meta name="color-scheme" content="light"><title>${e(title)} · ${profile.name}</title><link rel="icon" href="${base}assets/app-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}assets/legacy.css?v=${sharedAssetVersion}"><link rel="stylesheet" href="${base}assets/site.css?v=${sharedAssetVersion}">${extraStyle}<script src="${base}assets/app.js?v=${sharedAssetVersion}" defer></script><script src="${base}assets/reading.js?v=${sharedAssetVersion}" defer></script>${extraScript}</head><body data-page="${page}" ${attrs}>${header(base,page)}${decorateImageMarkup(body,imageManifest)}${footer(base)}</body></html>\n`;
}
function timeline(job,i) {const companyHref=`experience/${job.slug}/`;return `<article class="company-entry" id="company-${job.slug}" data-company="${job.slug}"><div class="timeline-date"><time datetime="${job.start}">${e(job.period)}</time><span class="entry-count">${counter(i+1)} / ${!job.end?'CURRENT CHAPTER':'CAREER CHAPTER'}</span></div><div class="company-map"><div class="company-root"><span class="role-label">${e(job.role)}</span><h3><a class="company-title" href="${companyHref}">${e(job.employer)} <span aria-hidden="true">↗</span></a></h3><p class="company-projects">${job.projects.map(p=>e(p.title)).join(' · ')}</p><p class="entry-lede">${e(job.lead)}</p><a class="role-node" href="${companyHref}?section=role">查看我的角色 ↗</a></div><div class="map-branches"><details class="branch-group" id="branch-${job.slug}-projects" open ${!job.end?'data-priority="true"':''}><summary>项目节点 <span>${counter(job.projects.length)}</span></summary><ul class="branch-nodes">${job.projects.map(p=>`<li><a class="mindmap-node" data-kind="project" href="projects/${p.slug}/"><span>PROJECT</span>${e(p.title)} <b aria-hidden="true">↗</b></a></li>`).join('')}</ul></details><details class="branch-group" id="branch-${job.slug}-scope" open><summary>${job.scope.length?'职责节点':'经历节点'} <span>${counter(job.scope.length||1)}</span></summary><ul class="branch-nodes">${(job.scope.length?job.scope:['项目与任职记录']).map(s=>`<li><a class="mindmap-node" data-kind="scope" href="${companyHref}?section=scope"><span>${job.scope.length?'SCOPE':'RECORD'}</span>${e(s)} <b aria-hidden="true">↗</b></a></li>`).join('')}</ul></details></div></div></article>`;}
function renderHomeIntro() {
  return `<section class="home-intro" id="top" aria-labelledby="intro-title">
    <div class="intro-main">
      <p class="eyebrow">游戏研发 · 职业简历</p>
      <h1 id="intro-title">${e(profile.name)}<span>${e(profile.role)}</span></h1>
      <p class="intro-summary">兼具主策划与系统策划经验，负责玩法与系统设计、跨岗位协作和版本交付。</p>
      <div class="intro-facts">
        <span><strong>${e(profile.experience)}</strong>游戏研发经验</span>
        <span><strong>${e(profile.projectExperience)}</strong>完整项目经验</span>
      </div>
      <nav class="intro-reading-links" aria-label="作品直达">
        <a class="button primary" href="#career-cases">代表项目 <span aria-hidden="true">↓</span></a>
        <a href="#ai-games">AI 游戏 <span aria-hidden="true">↓</span></a>
        <a href="#ai-tools">AI 应用 <span aria-hidden="true">↓</span></a>
      </nav>
    </div>
  </section>`;
}
export function renderHome(aiHtml='') {
  const recent = slug => recentGames.find(game => game.slug === slug);
  const mobile = new Map([
    ...taptapGames.map(game => [game.slug,renderTapTapCard(game)]),
    ...hubGames.map(game => [game.id,renderHubGames([game])]),
    ['ring-haven',renderRingHavenEntry()],
    ['poetry-letters',renderRecentGameEntry(recent('poetry-letters'))],
    ['nanjie-repair-shop',renderNanjieEntry()],
    ['zhuyin-jianghu',renderZhuyinEntry()],
  ]);
  const mobileOrder = [
    'jigmeme','sticker-scenery','ring-haven','after-hours-stall','fill-what','poetry-letters',
    'xiang-le-ge-xiang','zhuanglege-sha','nang-keng-pai-pai-xiang','icecream-master','food-car',
    'wangwang-stack','coin-forge','nanjie-repair-shop','repair-day','your-child','my-life',
    'lunar-freight','throne-war','daynight-fate','fengshen-duel','tiankeng','zhuyin-jianghu',
  ].map(slug => mobile.get(slug));
  const visibleMobileCount = 9;
  const mobileMarkup = `<section class="taptap-collection" id="mobile-games" aria-labelledby="mobile-games-title">
    <span id="taptap-games" aria-hidden="true"></span>
    <header class="section-head"><h3 id="mobile-games-title">手游</h3><p>从拼图、收纳与填字，到模拟经营、策略和角色扮演。</p></header>
    <div class="ai-game-grid">${mobileOrder.slice(0,visibleMobileCount).join('')}</div>
    <details class="work-catalog-toggle">
      <summary><span>查看全部 ${mobileOrder.length} 款</span><span>收起手游列表</span></summary>
      <div class="ai-game-grid">${mobileOrder.slice(visibleMobileCount).join('')}</div>
    </details>
  </section>`;
  const steamDemos = `<section class="ai-game-section" aria-labelledby="steam-dev-title">
    <h4 id="steam-dev-title">Steam 发行筹备</h4><div class="ai-game-grid">${renderTokenGameEntry()}${renderFadingShadowsEntry()}</div>
  </section>
  <section class="ai-game-section" id="hub-games" aria-labelledby="hub-games-title">
    <details class="work-catalog-toggle" open><summary id="hub-games-title">其他电脑与网页试玩</summary>
      <div class="ai-game-grid">${renderYujiangCoffeeEntry()}${renderRecentGameEntry(recent('monster-workshop'))}${renderHubGames(hubGames.filter(game=>game.id==='lighthouse-rescue'))}${renderRecentGameEntry(recent('laurel-arena'))}</div>
    </details>
  </section>`;
  aiHtml=aiHtml.replace('<!-- MOBILE_GAMES -->',mobileMarkup).replace('<!-- STEAM_DEMOS -->',steamDemos);
  aiHtml=aiHtml.replace('<!-- HUB_TOOLS -->',renderHubTools(renderAiPocketEntry(e)));
  return shell({title:'职业时间轴与项目实践',description:profile.description,stylesheet:tokenGameStyles,body:`<main id="main">
    <div class="home-front wrap">
      ${renderHomeIntro()}
      ${renderCareerCases(e)}
      ${renderProducerSkills(e)}
    </div>
    ${renderProjectGallery(e)}
    <section class="timeline-section wrap" id="experience" aria-labelledby="timeline-title">
      <header class="section-head"><h2 id="timeline-title">工作经历</h2></header>
      ${chapterRail()}
      <div class="career-timeline">${jobs.map(timeline).join('')}</div>
      <div class="education-row"><span>教育背景</span><strong>北京联合大学</strong><p>计算机科学与技术 · 本科 · 2015.09—2017.07</p></div>
    </section>
    <section class="skills-section wrap section" id="skills" aria-labelledby="skills-title">
      <header class="section-head"><h2 id="skills-title">项目技能</h2></header>
      <div class="skill-tree">${skills.map(s=>`<article class="skill-card"><h3>${e(s.title)}</h3><p>${e(s.text)}</p><details class="skill-evidence"><summary>查看项目依据 <span>${s.links.length} 项</span></summary><ul>${s.links.map(([t,h])=>`<li><a href="${h}">${e(t)} ↗</a></li>`).join('')}</ul></details></article>`).join('')}</div>
    </section>
    <div class="home-practice wrap">${renderCollaborationEntry()}</div>
    ${aiHtml}</main>`});
}
export function renderTapTapDetail(game) {
  return shell({title:game.title+' · 手游作品',description:game.summary,body:renderTapTapBody(game),base:'../../',page:'document'});
}
const layoutNames={producer:'制作任务档案',workbench:'PC 体验工作台',duology:'双项目记录',quest:'关卡与任务地图',blueprint:'系统设计蓝图',board:'系统与推进看板',storyboard:'体验路径分镜',archive:'项目卡带档案',lab:'质量与内容实验室'};
function scopeMarkup(job){if(!job.scope.length)return `<p>以${e(job.role)}身份参与${job.projects.map(p=>`《${e(p.title)}》`).join('、')}。</p><p>这里保留任职角色与项目记录。</p>`;return `<ol class="scope-list">${job.scope.map((s,i)=>`<li><span>${counter(i+1)}</span><strong>${e(s)}</strong></li>`).join('')}</ol>`;}
function recordMarkup(job,project){return `<span class="panel-label">RECORD / 可追溯记录</span><h2>${project?'项目记录':'任职记录'}</h2><p>${project?`《${e(project.title)}》列于这段任职经历中。`:e(job.lead)}</p>${project?.publicSource?`<div class="official-product-context">${project.productContext?`<h3>官方产品背景</h3><p>${e(project.productContext)}</p>`:''}<p class="record-source">玩法简介依据官方 Steam 页面；个人贡献见上方工作与资料记录。</p><a class="text-link" href="${e(project.publicSource)}">查看官方项目介绍 ↗</a></div>`:''}<dl><div><dt>任职公司</dt><dd>${e(job.employer)}</dd></div><div><dt>角色</dt><dd>${e(job.role)}</dd></div><div><dt>时间</dt><dd>${e(job.period)}</dd></div></dl><p class="record-source">任职、角色与职责依据本人履历及确认。图示是本站原创的职责结构表达。</p>`;}
function renderWorkValue(job,project){
  const specific=project&&projectWork[project.slug];
  const shared=project&&!specific;
  const work=specific||(shared?sharedCompanyWork[job.slug]:companyWork[job.slug]);
  const basis=shared?'company':specific?.basis||'company';
  const note=shared?`本项目参与记录已确认，以下是公司任职共同职责，未逐项确认本项目专属分工。${work.note}`:work.note;
  return `<section class="work-value" id="work-value" data-work-basis="${basis}" aria-labelledby="work-value-title"><header><p class="eyebrow">MY WORK / DESIGN VALUE</p><h2 id="work-value-title">${shared?'这段任职的工作与价值':'我的工作与价值'}</h2><p class="work-value-basis">${e(note)}</p></header><ol class="work-value-list">${work.items.map((item,n)=>`<li class="work-value-item"><div class="work-value-label"><span>${counter(n+1)}</span><h3>${e(item.title)}</h3></div><dl><div><dt>具体工作</dt><dd>${e(item.action)}</dd></div><div><dt>工作价值</dt><dd>${e(item.value)}</dd></div></dl><a class="text-link" href="../../${item.link[1]}">${e(item.link[0])} ↗</a></li>`).join('')}</ol><p class="work-value-boundary">职责依据本人履历与确认；原图补充设计证据，经营结果另行说明来源与口径。</p>${shared?`<a class="text-link" href="../../experience/${job.slug}/#work-value">查看完整公司经历 ↗</a>`:''}</section>${project?.slug==='word-villas'?renderWordExcerpts(e):''}`;
}
function renderSheepContributionBrief() {
  const entries = projectWork['sheep-match'].items;
  return `<section class="project-contributions" id="project-contributions" aria-labelledby="project-contributions-title">
    <h2 id="project-contributions-title">我的分工</h2>
    <ul>${entries.map(({title,action})=>`<li><strong>${e(title)}</strong><span>${e(action)}</span></li>`).join('')}</ul>
    <a class="text-link" href="#work-value">查看完整职责 <span aria-hidden="true">↓</span></a>
  </section>`;
}
function renderProjectCover(project) {
  if(project?.slug==='sheep-match')return renderSheepPlaytest(e);
  const covers={
    'idiom-scholar':['idiom-scholar/promotional-cover.png',960,334,'成语小秀才 · 项目推广素材'],
    'word-villas':['word-villas/promotional-cover.jpg',1280,720,'Wordvillas · 宣传视频封面'],
    'matchmaking-inc':['matchmaking-inc/promotional-cover.jpg',460,215,'中国式相亲 · Steam 官方宣传图'],
  };
  const cover=covers[project?.slug];
  return cover?`<figure class="project-visual-overview"><img src="../../assets/project-design/${cover[0]}" width="${cover[1]}" height="${cover[2]}" loading="eager" decoding="async" alt="${e(cover[3])}"><figcaption>${e(cover[3])}</figcaption></figure>`:'';
}
const careerUiGalleries = {
  'train-king': {id:'train-ui', design:'train-design', views:trainUiViews, description:'从车辆槽位和双环轨道，到上手引导、地点推进与铁轨拼图。'},
  'versatile-dog': {id:'goose-ui', design:'goose-design', views:gooseUiViews, description:'以经营场地为起点，查看犬只状态、管理在场与库存，再用图鉴追踪收集进度。'},
};

function renderCareerUiGallery(slug, {id,views,description}) {
  return `<section class="career-ui-gallery" id="${id}" aria-labelledby="${id}-title">
    <header><h2 id="${id}-title">项目界面设计</h2><p>${description} 历史界面设计稿保留全幅画面，头像、部分示例数值与参考小图已遮盖。点击画面可放大。</p></header>
    <div class="career-ui-grid">${views.map(view=>{
      const src = '../../assets/project-design/'+slug+'/'+e(view.file);
      return `<figure>
        <a href="${src}" aria-label="放大${e(view.title)}"><img src="${src}" width="${view.width}" height="${view.height}" loading="lazy" decoding="async" alt="${e(view.alt)}"></a>
        <figcaption><strong>${e(view.title)}</strong><p>${e(view.caption)}</p><small>${e(view.source)}</small></figcaption>
      </figure>`;
    }).join('')}</div>
  </section>`;
}
export function renderDetail(job,project=null){const i=jobs.indexOf(job),pIndex=project?job.projects.indexOf(project):0;const title=project?project.title:job.employer;const description=project?project.description:job.lead;const ui=careerUiGalleries[project?.slug];const body=`<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#company-${job.slug}" data-return-home>职业时间轴</a><span aria-hidden="true">/</span>${project?`<a href="../../experience/${job.slug}/">${e(job.employer)}</a><span aria-hidden="true">/</span>`:''}<span>${e(title)}</span></nav><header class="detail-hero"><p class="eyebrow">${counter(i+1)} / ${layoutNames[job.layout]} ${project?`· PROJECT ${counter(pIndex+1)}`:''}</p><h1>${e(title)}<span class="title-dot">.</span></h1><div class="detail-meta"><span>${e(job.role)}</span><time datetime="${job.start}">${e(job.period)}</time>${job.teamSize?`<span>项目团队共 ${job.teamSize} 人</span>`:''}</div><p class="detail-lede ${project?'project-context':''}">${e(description)}</p>${project?.slug==='sheep-match'?renderSheepContributionBrief():''}${ui?`<nav class="career-ui-jumps" aria-label="项目资料"><a class="button primary" href="#${ui.id}">看界面 <span aria-hidden="true">↓</span></a><a class="text-link" href="#${ui.design}">看核心方案 <span aria-hidden="true">↓</span></a></nav>`:''}${project?.slug==='crisis-dawn'?`<a class="text-link" href="#crisis-gallery">查看游戏截图 <span aria-hidden="true">↓</span></a>`:''}${project?`<p class="company-level-note">任职角色沿用履历记录；具体贡献按项目资料区分，共同职责不逐项归为单个项目的独立成果。</p>`:''}</header>${renderProjectCover(project)}${renderWorkValue(job,project)}${ui?renderCareerUiGallery(project.slug,ui):''}${project?.slug==='crisis-dawn'?renderCrisisGallery(e):''}${project?.slug==='idiom-scholar'?renderIdiomOverview(e):''}${project?.slug==='my-town'?renderTownDesign(e):''}${project?.slug==='word-villas'||(!project&&job.slug==='beta')?renderBetaDesign(e):''}${project?.slug==='zuoyaoji-x'?renderZuoyaoDesign(e):''}<div class="detail-grid"><figure class="illustration"><img src="../../assets/diagrams/${project?project.slug:job.slug}.svg" width="960" height="600" alt="${e(title)}的原创职责结构示意，包含${e((job.scope.length?job.scope:job.projects.map(p=>p.title)).join('、'))}"><figcaption>原创职责结构示意 · 非游戏实机画面</figcaption></figure><section id="role" class="role-panel"><span class="panel-label">ROLE / 我的角色</span><h2>${e(job.role)}</h2><p>${e(project?project.description:job.lead)}</p>${job.note?`<p class="team-boundary">${e(job.note)}</p>`:''}</section><section id="scope" class="scope-panel"><span class="panel-label">${job.scope.length?'SCOPE / 工作范围':'CAREER / 项目记录'}</span><h2>${job.scope.length?'工作职责':'任职记录'}</h2>${scopeMarkup(job)}</section><section id="projects" class="project-panel"><span class="panel-label">PROJECTS / 项目入口</span><h2>${job.projects.length>1?'参与项目':'项目详情'}</h2><div class="project-links">${job.projects.map((p,n)=>`<a href="../../projects/${p.slug}/" ${p===project?'aria-current="page"':''}><span>${counter(n+1)} / PROJECT</span><strong>${e(p.title)}</strong><p>${e(p.description)}</p><b aria-hidden="true">↗</b></a>`).join('')}</div></section><section class="record-panel">${recordMarkup(job,project)}</section></div>${materialCases.some(c=>project?c.project===project.slug:c.company===job.slug)?renderMaterialCases(materialCases.filter(c=>project?c.project===project.slug:c.company===job.slug),e):''}${project?.slug==='idiom-scholar'?renderIdiomDesign(e):(!project&&job.slug==='haoteng'?renderIdiomCompanyEntry():'')}${!project&&job.slug==='muyou'?renderTownCompanyEntry()+renderZuoyaoCompanyEntry():''}${project?.slug==='sheep-match'?renderSheepDesign(e)+renderSheepReading(e):''}<nav class="detail-footer" aria-label="继续浏览"><a class="button primary" data-return-home href="../../index.html#company-${job.slug}">返回这一段时间轴 ↑</a>${i>0?`<a href="../../experience/${jobs[i-1].slug}/">← 更近一章</a>`:''}${i<jobs.length-1?`<a href="../../experience/${jobs[i+1].slug}/">更早一章 →</a>`:''}</nav></main>`;return shell({title,description,body,base:'../../',page:project?'project':'company',attrs:`data-layout="${job.layout}" data-company="${job.slug}" class="${project?'project-variant-'+(pIndex%3):'company-detail'}"`});}
export function renderMaterialNote(c){return shell({title:c.title+' · 文档摘要',description:c.background,base:'../../../',page:'document',body:'<main id="main" class="detail-main wrap"><nav class="breadcrumbs" aria-label="面包屑"><a href="../">返回项目</a></nav><header class="detail-hero"><h1>'+e(c.title)+'</h1></header>'+renderMaterialCases([c],e,'../../../',true)+'</main>'});}
function textLines(text,max=19){if(text.length<=max)return[text];const out=[];for(let i=0;i<text.length;i+=max)out.push(text.slice(i,i+max));return out;}
function svgText(text,x,y,cls,max=19){return `<text x="${x}" y="${y}" class="${cls}">${textLines(text,max).map((line,i)=>`<tspan x="${x}" dy="${i?28:0}">${e(line)}</tspan>`).join('')}</text>`;}
export function renderDiagram(job,project=null){const labels=job.scope.length?job.scope:job.projects.map(p=>p.title);const title=project?project.title:layoutNames[job.layout];const layouts={producer:[[88,230],[508,230],[88,382],[508,382]],workbench:[[70,202],[350,202],[630,202],[208,370],[488,370]],duology:[[110,230],[510,230]],quest:[[70,176],[260,258],[450,340],[640,422]],blueprint:[[110,220],[510,220],[110,370],[510,370]],board:[[55,208],[350,208],[645,208],[200,368],[500,368]],storyboard:[[70,202],[290,272],[510,342],[700,412]],archive:[[65,246],[355,246],[645,246]],lab:[[110,212],[510,212],[110,370],[510,370]]};const positions=layouts[job.layout];const colors=['#cadac6','#f3da9c','#d3cae8','#efc9b0','#bfdae1'];const nodes=labels.map((s,i)=>{const [x,y]=positions[i%positions.length],width=['workbench','board','storyboard','archive','quest'].includes(job.layout)?245:330;return `<g><rect x="${x}" y="${y}" width="${width}" height="108" rx="${job.layout==='blueprint'?0:12}" fill="${colors[i%colors.length]}" stroke="#28372e" stroke-width="2"/><text x="${x+20}" y="${y+27}" class="number">${counter(i+1)}</text>${svgText(s,x+20,y+57,'node',width===245?11:16)}</g>`;}).join('');const grid=job.layout==='blueprint'?`<defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#c6d2c4" stroke-width="1"/></pattern></defs><rect width="960" height="600" fill="url(#grid)"/>`:'';const team=job.teamSize?`<g transform="translate(642 74)">${Array.from({length:6},(_,i)=>`<circle cx="${i*31}" cy="0" r="10" fill="#2d4f3d"/>`).join('')}<text x="0" y="32" class="number">PROJECT TEAM / 6 人</text></g>`:'';return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600"><style>text{font-family:system-ui,-apple-system,'Microsoft YaHei',sans-serif;fill:#26362c}.title{font-size:32px;font-weight:700}.node{font-size:21px;font-weight:600}.number{font-size:13px;letter-spacing:1px}.caption{font-size:15px}</style><rect width="960" height="600" fill="#f6f3e9"/>${grid}<path d="M40 145H920M40 550H920" stroke="#304b37" stroke-width="2"/><text x="50" y="58" class="number">${job.layout.toUpperCase()} / RESPONSIBILITY STRUCTURE</text>${svgText(title,50,110,'title',22)}${team}${job.layout==='quest'||job.layout==='storyboard'?'<path d="M170 240L780 475" fill="none" stroke="#385a43" stroke-width="3" stroke-dasharray="7 8"/>':''}${nodes}<text x="50" y="579" class="caption">原创职责结构示意 · 非游戏实机画面</text></svg>\n`;}
