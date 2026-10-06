import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const companySlugs = ['jianyou', 'hero-games', 'bolang', 'quwan', 'muyou', 'beta', 'xingqi', 'haoteng', 'iceshi'];
const layouts = ['producer', 'workbench', 'duology', 'quest', 'blueprint', 'board', 'storyboard', 'archive', 'lab'];
const publicNotes = ['gameplay', 'team', 'data'];
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const hasClass = (node, name) => (node.attrs.class || '').split(/\s+/u).includes(name);

function decode(value) {
  return value.replace(/&#(x[\da-f]+|\d+);/giu, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code)))
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/gu, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' })[entity]);
}

// The generated pages use ordinary HTML. This small structural reader keeps the
// static suite dependency-free, while checking relationships rather than substrings.
function parseHtml(html) {
  const document = { tag: '#document', attrs: {}, children: [] };
  const stack = [document];
  const tokens = html.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-z][^>]*>|[^<]+/giu);
  for (const match of tokens) {
    const token = match[0];
    if (token.startsWith('<!--') || token.startsWith('<!')) continue;
    if (token.startsWith('</')) {
      const tag = token.match(/^<\/([\w:-]+)/u)?.[1]?.toLowerCase();
      for (let index = stack.length - 1; index > 0; index--) {
        if (stack[index].tag === tag) { stack.length = index; break; }
      }
      continue;
    }
    if (!token.startsWith('<')) { stack.at(-1).children.push(decode(token)); continue; }
    const tag = token.match(/^<([\w:-]+)/u)?.[1]?.toLowerCase();
    if (!tag) continue;
    const attrs = {};
    const attributes = token.slice(tag.length + 1).replace(/\/?\s*>$/u, '');
    for (const attribute of attributes.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu)) {
      attrs[attribute[1].toLowerCase()] = decode(attribute[2] ?? attribute[3] ?? attribute[4] ?? '');
    }
    const node = { tag, attrs, children: [], parent: stack.at(-1) };
    stack.at(-1).children.push(node);
    if (!voidTags.has(tag) && !token.endsWith('/>')) stack.push(node);
  }
  return document;
}

function nodes(document, predicate) {
  const result = [];
  function visit(node) {
    if (typeof node === 'string') return;
    if (predicate(node)) result.push(node);
    node.children.forEach(visit);
  }
  visit(document);
  return result;
}

function textOf(node) {
  if (typeof node === 'string') return node;
  if (['script', 'style', 'template'].includes(node.tag)) return '';
  return node.children.map(textOf).join(' ').replace(/\s+/gu, ' ').trim();
}

function one(document, predicate, label) {
  const result = nodes(document, predicate);
  assert.equal(result.length, 1, `${label}: expected one element, found ${result.length}`);
  return result[0];
}

async function page(path) {
  const html = await readFile(join(root, path), 'utf8');
  return { path, html, document: parseHtml(html) };
}

let sitePromise;
function site() {
  sitePromise ||= (async () => {
    const content = await import(pathToFileURL(join(root, 'src', 'content.mjs')).href);
    const home = await page('index.html');
    const companies = await Promise.all(companySlugs.map(slug => page(`experience/${slug}/index.html`)));
    const projectRecords = content.jobs.flatMap(job => job.projects.map(project => ({ ...project, companySlug: job.slug })));
    const projects = await Promise.all(projectRecords.map(project => page(`projects/${project.slug}/index.html`)));
    const notes = (await Promise.all(publicNotes.map(slug => page(`projects/sheep-match/${slug}/index.html`).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    })))).filter(Boolean);
    return { content, home, companies, projects, notes, projectRecords, pages: [home, ...companies, ...projects, ...notes] };
  })();
  return sitePromise;
}

function routeFor(href, from) {
  const url = new URL(href, `https://site.invalid/${from}`);
  assert.equal(url.origin, 'https://site.invalid', `Unexpected origin in local reference ${href}`);
  const path = decodeURIComponent(url.pathname.slice(1));
  return { path: path.endsWith('/') ? `${path}index.html` : path, hash: decodeURIComponent(url.hash.slice(1)) };
}

test('confirmed job facts produce nine newest-first companies and fifteen unique projects', async () => {
  const { content, projectRecords } = await site();
  assert.deepEqual(content.jobs.map(job => job.slug), companySlugs);
  assert.equal(projectRecords.length, 15);
  assert.equal(new Set(projectRecords.map(project => project.slug)).size, 15);
  assert.equal(new Set(projectRecords.map(project => project.title)).size, 15);
  assert.ok(projectRecords.every(project => typeof project.title === 'string' && project.title.trim()), 'Every project has a real title');
  assert.equal(content.jobs[0].teamSize, 6, 'Jianyou project team contains six people in total');
  assert.ok(content.jobs.slice(1).every(job => job.teamSize !== 6), 'The six-person team belongs only to Jianyou');
  assert.equal(content.skills.length, 6);
});

test('home presents the full timeline and semantic company, role, project, and scope routes', async () => {
  const { home, projectRecords } = await site();
  one(home.document, node => node.tag === 'body' && node.attrs['data-page'] === 'home', 'Home body');
  one(home.document, node => node.tag === 'main' && node.attrs.id === 'main', 'Home main landmark');
  const entries = nodes(home.document, node => node.tag === 'article' && hasClass(node, 'company-entry'));
  assert.deepEqual(entries.map(node => node.attrs['data-company']), companySlugs);
  const allProjectRoutes = [];
  for (const [index, slug] of companySlugs.entries()) {
    const entry = entries[index];
    assert.equal(entry.attrs.id, `company-${slug}`);
    const companyLink = one(entry, node => node.tag === 'a' && hasClass(node, 'company-title'), `${slug} company root link`);
    assert.equal(routeFor(companyLink.attrs.href, home.path).path, `experience/${slug}/index.html`);
    assert.ok(textOf(companyLink).length > 1, `${slug} company root has a name`);
    const role = one(entry, node => node.tag === 'a' && hasClass(node, 'role-node'), `${slug} role node`);
    assert.equal(new URL(role.attrs.href, 'https://site.invalid/index.html').searchParams.get('section'), 'role');
    assert.equal(routeFor(role.attrs.href, home.path).path, `experience/${slug}/index.html`);
    for (const branch of ['projects', 'scope']) {
      const group = one(entry, node => node.tag === 'details' && node.attrs.id === `branch-${slug}-${branch}`, `${slug} ${branch} branch`);
      one(group, node => node.tag === 'summary', `${slug} ${branch} native disclosure`);
      const links = nodes(group, node => node.tag === 'a' && hasClass(node, 'mindmap-node'));
      assert.ok(links.length > 0, `${slug} ${branch} has meaningful nodes`);
      for (const link of links) {
        assert.ok(textOf(link), `${slug} ${branch} node has an accessible label`);
        assert.equal(link.attrs['data-kind'], branch === 'projects' ? 'project' : 'scope');
        if (branch === 'projects') allProjectRoutes.push(routeFor(link.attrs.href, home.path).path);
        else {
          assert.equal(routeFor(link.attrs.href, home.path).path, `experience/${slug}/index.html`);
          assert.equal(new URL(link.attrs.href, 'https://site.invalid/index.html').searchParams.get('section'), 'scope');
        }
      }
    }
  }
  assert.deepEqual(new Set(allProjectRoutes), new Set(projectRecords.map(project => `projects/${project.slug}/index.html`)));
  one(entries[0], node => node.tag === 'details' && node.attrs['data-priority'] === 'true', 'Latest project branch priority');
  const teamNote = one(home.document, node => hasClass(node, 'team-note'), 'Total-team note');
  assert.match(textOf(teamNote), /(?:6|六)\s*(?:人|位|名)/u);
  assert.match(textOf(teamNote), /团队/u);
  assert.match(textOf(entries[0]), /2026[.\-/]07[.\-/]27/u);
  assert.match(textOf(entries[0]), /至今|现在|present/iu);
  assert.match(textOf(entries[1]), /2026[.\-/]07[.\-/]23/u);
});

test('the introduction chapter rail navigates nine real career records in their timeline order', async () => {
  const { home, content } = await site();
  const rail = one(home.document, node => node.tag === 'nav' && hasClass(node, 'chapter-rail'), 'Career chapter navigation');
  const links = nodes(rail, node => node.tag === 'a');
  assert.equal(links.length, 9);
  for (const [index, link] of links.entries()) {
    assert.equal(routeFor(link.attrs.href, home.path).hash, `company-${companySlugs[index]}`);
    assert.ok(link.attrs['aria-label']?.includes(content.jobs[index].employer), 'Numbered chapter has its real company in the accessible label');
    assert.match(textOf(link), new RegExp(String(index + 1).padStart(2, '0'), 'u'));
  }
});

test('all detail routes retain independent layouts, factual panels, illustrations, and exact return hashes', async () => {
  const { companies, projects, projectRecords, content } = await site();
  const illustrationRoutes = [];
  for (const [index, detail] of companies.entries()) {
    const slug = companySlugs[index];
    const body = one(detail.document, node => node.tag === 'body', `${detail.path} body`);
    assert.equal(body.attrs['data-page'], 'company', detail.path);
    assert.equal(body.attrs['data-company'], slug, detail.path);
    assert.equal(body.attrs['data-layout'], layouts[index], detail.path);
  }
  for (const [index, detail] of projects.entries()) {
    const record = projectRecords[index];
    const body = one(detail.document, node => node.tag === 'body', `${detail.path} body`);
    assert.equal(body.attrs['data-page'], 'project', detail.path);
    assert.equal(body.attrs['data-company'], record.companySlug, detail.path);
    const projectIndex = content.jobs.find(job => job.slug === record.companySlug).projects.findIndex(project => project.slug === record.slug);
    assert.ok(hasClass(body, `project-variant-${projectIndex % 3}`), `${detail.path} has its project composition variant`);
    const title = one(detail.document, node => node.tag === 'h1', `${detail.path} title`);
    assert.ok(textOf(title).includes(record.title), `${detail.path} uses its own project title`);
    one(detail.document, node => hasClass(node, 'project-context'), `${detail.path} project context`);
    const sharedDuties = one(detail.document, node => hasClass(node, 'company-level-note'), `${detail.path} company-level duty note`);
    assert.match(textOf(sharedDuties), /公司|任职|岗位/u, `${detail.path} identifies the duty source`);
    assert.match(textOf(sharedDuties), /(?:不|非|不能|并非|未)[^。]{0,40}(?:专属|逐项|独立|单个|单一|全部|完整)|(?:公司|岗位|任职)[^。]{0,40}(?:共享|共同|层面|记录)/u, `${detail.path} avoids attributing every duty solely to this project`);
  }
  for (const detail of [...companies, ...projects]) {
    const body = one(detail.document, node => node.tag === 'body', `${detail.path} body`);
    one(detail.document, node => node.tag === 'main' && hasClass(node, 'detail-main'), `${detail.path} detail main`);
    one(detail.document, node => hasClass(node, 'detail-hero'), `${detail.path} hero`);
    one(detail.document, node => hasClass(node, 'detail-grid'), `${detail.path} composition`);
    one(detail.document, node => hasClass(node, 'breadcrumbs'), `${detail.path} breadcrumbs`);
    for (const id of ['role', 'scope', 'projects']) one(detail.document, node => node.attrs.id === id, `${detail.path} ${id} panel`);
    one(detail.document, node => hasClass(node, 'record-panel'), `${detail.path} verified record`);
    const figure = one(detail.document, node => node.tag === 'figure' && hasClass(node, 'illustration'), `${detail.path} illustration`);
    const caption = one(figure, node => node.tag === 'figcaption', `${detail.path} image caption`);
    assert.match(textOf(caption), /原创职责结构示意/u);
    assert.match(textOf(caption), /非游戏实机画面/u);
    const image = one(figure, node => node.tag === 'img', `${detail.path} illustrated image`);
    assert.match(image.attrs.src, /\.svg(?:[?#].*)?$/u, `${detail.path} original structure illustration`);
    illustrationRoutes.push(routeFor(image.attrs.src, detail.path).path);
    assert.ok(Number(image.attrs.width) > 0 && Number(image.attrs.height) > 0, `${detail.path} image declares dimensions`);
    assert.ok(image.attrs.alt?.trim().length > 4, `${detail.path} illustration has a useful alternative`);
    const footer = one(detail.document, node => hasClass(node, 'detail-footer'), `${detail.path} footer`);
    const returnLink = one(footer, node => node.tag === 'a' && 'data-return-home' in node.attrs, `${detail.path} footer return link`);
    const route = routeFor(returnLink.attrs.href, detail.path);
    assert.equal(route.path, 'index.html', detail.path);
    assert.equal(route.hash, `company-${body.attrs['data-company']}`, detail.path);
  }
  assert.equal(new Set(illustrationRoutes).size, 24, 'Each company and project has its own original illustration');
});

test('skills show six concrete evidence groups without empty or placeholder anchors', async () => {
  const { home } = await site();
  const cards = nodes(home.document, node => hasClass(node, 'skill-card'));
  assert.equal(cards.length, 6);
  for (const card of cards) {
    assert.ok(nodes(card, node => /^h[2-6]$/u.test(node.tag)).length, 'Each skill group has a heading');
    const evidence = nodes(card, node => node.tag === 'a');
    assert.ok(evidence.length > 0, `${textOf(card).slice(0, 30)} has evidence links`);
    assert.ok(evidence.every(node => node.attrs.href && node.attrs.href !== '#' && textOf(node)), 'Evidence links have destinations and names');
  }
});

test('Sheep Match offers three clearly sourced public responsibility notes without presenting internal material as evidence', async () => {
  const { projects, notes } = await site();
  const project = projects.find(value => value.path === 'projects/sheep-match/index.html');
  const reading = one(project.document, node => node.attrs.id === 'project-reading', 'Sheep Match public reading section');
  const links = nodes(reading, node => node.tag === 'a' && hasClass(node, 'note-link'));
  assert.deepEqual(links.map(node => routeFor(node.attrs.href, project.path).path), publicNotes.map(slug => `projects/sheep-match/${slug}/index.html`));
  assert.equal(notes.length, 3, 'All public notes are real directly addressable pages');
  for (const [index, note] of notes.entries()) {
    one(note.document, node => node.tag === 'body' && node.attrs['data-page'] === 'document', `${note.path} readable document`);
    one(note.document, node => node.tag === 'h1', `${note.path} title`);
    const provenance = one(note.document, node => hasClass(node, 'note-provenance'), `${note.path} source statement`);
    assert.match(textOf(provenance), /已确认/u);
    assert.match(textOf(provenance), /公开摘要/u);
    const figure = one(note.document, node => node.tag === 'figure' && hasClass(node, 'note-figure'), `${note.path} responsibility illustration`);
    assert.match(textOf(figure), /职责图示/u);
    const image = one(figure, node => node.tag === 'img', `${note.path} image`);
    assert.equal(routeFor(image.attrs.src, note.path).path, `assets/diagrams/sheep-match-${publicNotes[index]}.svg`);
    assert.ok(Number(image.attrs.width) && Number(image.attrs.height) && image.attrs.alt?.length > 4);
    const back = one(note.document, node => node.tag === 'a' && hasClass(node, 'note-return'), `${note.path} project return`);
    assert.equal(routeFor(back.attrs.href, note.path).path, project.path);
    assert.equal(routeFor(back.attrs.href, note.path).hash, 'project-reading');
    assert.doesNotMatch(note.html, /(?:Tower|飞书|VitaMahjongUnity|\.docx|\.xlsx|\.csv|原始报告下载|已实现增长|独立完成全部)/iu);
  }
  assert.match(textOf(notes[1].document), /项目团队共 6 人/u);
  assert.match(textOf(notes[1].document), /不等同于 6 名直接下属/u);
});

test('every local href, src, and fragment resolves inside the public site', async () => {
  const { pages } = await site();
  const parsedPages = new Map(pages.map(value => [value.path, value.document]));
  for (const current of pages) {
    const ids = nodes(current.document, node => node.attrs.id).map(node => node.attrs.id);
    assert.equal(new Set(ids).size, ids.length, `${current.path} has no duplicate IDs`);
    const references = nodes(current.document, node => node.attrs.href !== undefined || node.attrs.src !== undefined);
    for (const node of references) {
      for (const attribute of ['href', 'src']) {
        const value = node.attrs[attribute];
        if (value === undefined) continue;
        assert.ok(value.trim(), `${current.path} has no empty ${attribute}`);
        assert.ok(!/^\s*(?:javascript|mailto|tel|file):/iu.test(value), `${current.path} forbids executable, contact, or private references: ${value}`);
        if (/^(?:https?:|data:)/iu.test(value)) continue;
        assert.ok(!value.startsWith('/'), `${current.path}: ${value} must retain the GitHub Pages repository base`);
        const target = routeFor(value, current.path);
        let destination = join(root, target.path);
        const resolved = relative(root, destination);
        assert.ok(!resolved.startsWith('..'), `${current.path}: reference escapes the public root: ${value}`);
        let metadata;
        try { metadata = await stat(destination); } catch { assert.fail(`${current.path}: missing ${attribute} target ${value}`); }
        if (metadata.isDirectory()) destination = join(destination, 'index.html');
        await stat(destination);
        if (target.hash && destination.endsWith('.html')) {
          const destinationPath = relative(root, destination).replaceAll('\\', '/');
          if (!parsedPages.has(destinationPath)) parsedPages.set(destinationPath, parseHtml(await readFile(destination, 'utf8')));
          assert.ok(nodes(parsedPages.get(destinationPath), item => item.attrs.id === target.hash).length, `${current.path}: missing fragment ${value}`);
        }
      }
    }
  }
});

test('Sheep Match design references retain reviewed originals, readable alternatives, and clear role attribution', async () => {
  const { projects, companies, notes } = await site();
  const project = projects.find(value => value.path === 'projects/sheep-match/index.html');
  const gallery = one(project.document, node => node.attrs.id === 'project-design', 'Project design references');
  assert.match(textOf(gallery), /项目设计资料/u);
  assert.match(textOf(gallery), /游戏制作人/u);
  assert.match(textOf(gallery), /美术执行由团队相应岗位承担/u);
  assert.match(textOf(gallery), /设计方案[^。]*不代表[^。]*上线/u);
  const cards = nodes(gallery, node => node.tag === 'article' && hasClass(node, 'design-reference'));
  const originals = [
    ['save-recovery.png', 'ad51a365327490b0e6a0698afc61bb8fcb8395aab2462fc858b78039f918bce4'],
    ['tile-patterns.png', '095cee2f642884d15ecce6c9b44ca68c1b1479de969bc2ad8b7bd305e1fd5e75'],
    ['lucky-items-flow.jpg', 'c245367bc7c256c7d0b192e9aaf830e37fededce54815556fd745885342a4db4'],
  ];
  assert.equal(cards.length, originals.length);
  for (const [index, card] of cards.entries()) {
    const [filename, sha] = originals[index];
    const link = one(card, node => node.tag === 'a' && hasClass(node, 'design-original'), 'Full resolution reference');
    const target = routeFor(link.attrs.href, project.path).path;
    assert.equal(target, `assets/project-design/${filename}`);
    assert.equal(createHash('sha256').update(await readFile(join(root, target))).digest('hex'), sha, 'Reviewed original is copied without replacement or generated edits');
    const images = nodes(card, node => node.tag === 'img');
    assert.equal(images.length, 2, 'Overview and scrollable large image use the same original');
    for (const image of images) {
      assert.equal(routeFor(image.attrs.src, project.path).path, target);
      assert.ok(Number(image.attrs.width) > 0 && Number(image.attrs.height) > 0 && image.attrs.alt?.length > 12);
    }
    const reading = one(card, node => node.tag === 'details' && hasClass(node, 'design-inspect'), 'Native image disclosure');
    one(reading, node => node.tag === 'summary', 'Keyboard accessible image disclosure');
    const scroll = one(reading, node => hasClass(node, 'design-scroll'), 'Large image reading region');
    assert.equal(scroll.attrs.tabindex, '0');
    assert.equal(scroll.attrs.role, 'region');
    assert.ok(scroll.attrs['aria-label']?.includes('大图'));
    assert.ok(nodes(card, node => node.tag === 'li').length >= 2, 'Text explains the readable design decisions');
  }
  for (const other of [...companies, ...notes, ...projects.filter(value => value !== project)]) {
    assert.equal(nodes(other.document, node => node.attrs.id === 'project-design').length, 0, 'Project references stay with their actual project');
  }
});

test('public pages exclude contacts, private artifacts, local placeholders, and unsupported commercial claims', async () => {
  const { pages, companies, projects } = await site();
  const forbidden = [
    [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu, 'email address'],
    [/(?:^|\D)(?:\+?86[ -]?)?1[3-9]\d{9}(?:\D|$)/u, 'personal telephone number'],
    [/(?:mailto:|tel:|\.pdf(?:["'?#\s<]|$))/iu, 'contact or raw PDF reference'],
    [/(?:file:\/\/|(?<![a-z0-9])[A-Z]:[\\/]|sediment:\/\/|\.worktrees[\\/]|192\.168\.\d+\.\d+|127\.0\.0\.1|localhost)/iu, 'private path or local endpoint'],
    [/(?:TODO|TBD|lorem ipsum|本地专用|仅本地|本地可见|待补充|待上传|占位图|编辑占位)/iu, 'local-only or editorial placeholder'],
    [/(?:[¥￥]\s*\d|\d[\d,.]*\s*(?:亿元|万元|万人民币|元预算|元流水)|(?:DAU|日活|营收|流水|预算)\s*[:：=]?\s*\d)/iu, 'unverified monetary or audience metric'],
  ];
  for (const current of pages) {
    assert.match(current.html, /<html\b[^>]*lang=["']zh(?:-CN)?["']/iu, `${current.path} declares Chinese`);
    assert.equal(nodes(current.document, node => node.tag === 'h1').length, 1, `${current.path} has one page heading`);
    for (const [pattern, label] of forbidden) assert.equal(pattern.test(current.html), false, `${current.path} contains ${label}: ${current.html.match(pattern)?.[0] || ''}`);
    const directReports = textOf(current.document).split(/[。；]/u).filter(sentence => /(?:6|六)\s*(?:名|位|人)?\s*(?:直属|直接下属)|(?:直属|直接下属)[^。]{0,10}(?:6|六)/u.test(sentence));
    assert.ok(directReports.every(sentence => /不等同|不是|不代表|并非|不意味着/u.test(sentence)), `${current.path} makes no six-direct-reports claim`);
    for (const image of nodes(current.document, node => node.tag === 'img')) assert.ok('alt' in image.attrs, `${current.path} image declares its alternative`);
  }
  const jianyou = [companies[0], ...projects.filter(detail => nodes(detail.document, node => node.tag === 'body' && node.attrs['data-company'] === 'jianyou').length)];
  for (const current of jianyou) {
    assert.match(textOf(current.document), /2026[.\-/]07[.\-/]27/u, `${current.path} latest start date`);
    assert.match(textOf(current.document), /至今|现在|present/iu, `${current.path} latest position is current`);
    assert.doesNotMatch(textOf(current.document), /(?:负责|主导|统筹|管理|承担)[^。；]{0,25}(?:美术|投放|上线运营)|(?:美术|上线运营)[^。；]{0,25}(?:负责|主导|统筹)/u, `${current.path} makes no unsupported art or launch-duty claim`);
  }
  assert.match(textOf(companies[1].document), /2026[.\-/]07[.\-/]23/u, 'Hero Games corrected end date');
});

test('homepage independent games retain original screenshots and confirmed two-person attribution', async () => {
  const { home } = await site();
  const selected = one(home.document, node => node.attrs.id === 'selected', 'Personal works');
  const indie = one(selected, node => node.attrs.id === 'indie-games', 'Independent games');
  const contentBlocks = selected.children.filter(node => typeof node !== 'string');
  assert.equal(contentBlocks[1], indie, 'Independent games appear immediately after the personal works heading');
  assert.match(textOf(indie), /参与《中国式相亲》期间[^。]*闲暇时间[^。]*一位程序员[^。]*两人团队/u);
  assert.doesNotMatch(textOf(indie), /AI 协作|负责美术|独立完成/u);
  const games = nodes(indie, node => node.tag === 'article');
  assert.equal(games.length, 2);
  const originals = [
    ['舌尖上的魔术师', 'magicar-steam.png', '93a17192e69ff63bb1ddabdfa645d6a9447f16a7d45c01b9cbdceefab3b8db89'],
    ['除灵事务所', 'exorcism-office-steam.png', '846273ca66c5ed0d232756fe430b839da9e45c7d0682566dc3a2b06137b9c9fa'],
  ];
  for (const [index, game] of games.entries()) {
    const [title, filename, hash] = originals[index];
    assert.equal(textOf(one(game, node => node.tag === 'h4', 'Game title')), title);
    const image = one(game, node => node.tag === 'img', 'Actual game screenshot');
    const link = one(game, node => node.tag === 'a', 'Original image link');
    assert.equal(image.attrs.src, `assets/project-design/${filename}`);
    assert.equal(link.attrs.href, image.attrs.src);
    assert.ok(Number(image.attrs.width) > 0 && Number(image.attrs.height) > 0);
    assert.equal(createHash('sha256').update(await readFile(join(root, image.attrs.src))).digest('hex'), hash);
  }
});

test('Idiom Scholar exposes sourced systems, gameplay and interaction evidence without claiming individual artwork', async () => {
  const { projects, companies } = await site();
  const project = projects.find(value => value.path === 'projects/idiom-scholar/index.html');
  const design = one(project.document, node => node.attrs.id === 'idiom-design', 'Idiom design evidence');
  for (const id of ['idiom-systems', 'idiom-gameplay', 'idiom-interaction', 'idiom-assets']) {
    one(design, node => node.attrs.id === id, `Evidence category ${id}`);
  }
  assert.match(textOf(design), /美术执行由团队相应岗位承担/u);
  assert.match(textOf(design), /不能单独证明[^。]*作者/u);
  assert.match(textOf(design), /不代表[^。]*上线/u);
  assert.match(textOf(design), /填字核心玩法文档说明/u);
  assert.match(textOf(design), /每日挑战系统设计/u);
  assert.match(textOf(design), /新手引导说明/u);
  for (const other of projects.filter(value => value !== project)) {
    assert.equal(nodes(other.document, node => node.attrs.id === 'idiom-design').length, 0, 'Idiom evidence stays with the actual project');
  }
  const images = nodes(design, node => node.tag === 'img');
  assert.ok(images.length >= 6);
  for (const image of images) {
    assert.match(image.attrs.src, /assets\/project-design\/idiom-scholar\//u);
    assert.ok(Number(image.attrs.width) > 0 && Number(image.attrs.height) > 0);
    assert.ok(image.attrs.alt?.length > 12);
  }
  const company = companies.find(value => value.path === 'experience/haoteng/index.html');
  one(company.document, node => node.tag === 'a' && node.attrs.href === '../../projects/idiom-scholar/#idiom-design', 'Company evidence entry');
  const summary = await page('projects/idiom-scholar/design-summary/index.html');
  one(summary.document, node => node.attrs.id === 'idiom-design', 'Directly accessible design summary');
  assert.equal(nodes(summary.document, node => node.tag === 'h1').length, 1);
  assert.doesNotMatch(summary.html, /file:\/\/|(?<![a-z0-9])[A-Z]:[\\/]|mailto:|\.docx["']/iu);
  const { idiomAssets } = await import('../src/idiom-design.mjs');
  assert.equal(idiomAssets.length, 6);
  for (const item of idiomAssets) {
    const bytes = await readFile(join(root, 'assets/project-design/idiom-scholar', item.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256, 'Selected reference retains original pixels');
    assert.equal(bytes.readUInt32BE(16), item.width);
    assert.equal(bytes.readUInt32BE(20), item.height);
    assert.ok(item.source.length > 8);
  }
});

test('Matchmaking prioritizes two reviewed system maps across project, company and summary routes', async () => {
  const { projects, companies } = await site();
  const targets = [projects.find(p => p.path === 'projects/matchmaking-inc/index.html'), companies.find(c => c.path === 'experience/bolang/index.html'), await page('projects/matchmaking-inc/design-summary/index.html')];
  for (const target of targets) {
    const gallery = one(target.document, n => n.attrs.id === 'matchmaking-design', 'System design maps');
    const maps = nodes(gallery, n => n.tag === 'article');
    assert.equal(maps.length, 2);
    assert.match(textOf(gallery), /整体系统结构/u);
    assert.match(textOf(gallery), /玩法循环与资源产出/u);
    assert.match(textOf(gallery), /不代表[^。]*全部上线/u);
    for (const card of maps) {
      const originals = nodes(card, n => n.tag === 'a' && hasClass(n, 'design-original'));
      assert.equal(originals.length, 1);
      const image = nodes(card, n => n.tag === 'img')[0];
      assert.equal(originals[0].attrs.href, image.attrs.src);
      one(card, n => n.tag === 'details', 'Native large map disclosure');
    }
  }
  for (const other of projects.filter(p => p.path !== 'projects/matchmaking-inc/index.html')) assert.equal(nodes(other.document, n => n.attrs.id === 'matchmaking-design').length, 0);
  const { matchmakingMaps } = await import('../src/matchmaking-design.mjs');
  for (const item of matchmakingMaps) {
    const bytes = await readFile(join(root,'assets/project-design/matchmaking-inc',item.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
    assert.equal(bytes.readUInt32BE(16),item.width);
    assert.equal(bytes.readUInt32BE(20),item.height);
  }
});

test('My Town has curated evidence, summary and company entry without leaking shared duties or internal records', async () => {
  const {projects,companies}=await site();
  const project=projects.find(p=>p.path==='projects/my-town/index.html');
  const gallery=one(project.document,n=>n.attrs.id==='town-design','Town design evidence');
  assert.equal(nodes(gallery,n=>n.tag==='article').length,3);
  assert.match(textOf(gallery),/中断/u);
  assert.match(textOf(gallery),/不代表[^。]*上线/u);
  assert.match(textOf(gallery),/团队/u);
  assert.doesNotMatch(textOf(gallery),/张维|密码|独立完成所有/u);
  const summary=await page('projects/my-town/design-summary/index.html');
  one(summary.document,n=>n.attrs.id==='town-design','Town summary');
  const company=companies.find(c=>c.path==='experience/muyou/index.html');
  one(company.document,n=>n.tag==='a'&&n.attrs.href==='../../projects/my-town/#town-design','Town company entry');
  for(const other of projects.filter(p=>p!==project))assert.equal(nodes(other.document,n=>n.attrs.id==='town-design').length,0);
  const {townMaps}=await import('../src/town-design.mjs');
  assert.equal(townMaps.length,3);
  for(const item of townMaps){
    const bytes=await readFile(join(root,'assets/project-design/my-town',item.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
    const img=one(gallery,n=>n.tag==='img'&&n.attrs.src.endsWith(item.file)&&n.parent?.tag==='a','Town original image');
    assert.equal(Number(img.attrs.width),item.width);assert.equal(Number(img.attrs.height),item.height);
  }
});

test('Beta authored evidence connects Word Villas, company and summary with explicit document and art attribution', async()=>{
  const {projects,companies}=await site();
  const targets=[projects.find(p=>p.path==='projects/word-villas/index.html'),companies.find(c=>c.path==='experience/beta/index.html')];
  for(const target of targets){
    const design=one(target.document,n=>n.attrs.id==='beta-design','Beta design evidence');
    assert.equal(nodes(design,n=>n.tag==='article'&&hasClass(n,'matchmaking-map')).length,4);
    assert.match(textOf(design),/文档撰写人：吴天昊/u);
    assert.match(textOf(design),/未领奖/u);
    assert.match(textOf(design),/重玩/u);
    assert.match(textOf(design),/每日任务/u);
    assert.match(textOf(design),/美术[^。]*团队/u);
    assert.match(textOf(design),/设计目标[^。]*业绩/u);
    one(design,n=>n.tag==='a'&&n.attrs.href==='../../projects/word-villas/design-summary/','Beta summary entry');
  }
  const summary=await page('projects/word-villas/design-summary/index.html');
  one(summary.document,n=>n.attrs.id==='beta-design','Beta summary evidence');
  for(const other of projects.filter(p=>p.path!=='projects/word-villas/index.html'))assert.equal(nodes(other.document,n=>n.attrs.id==='beta-design').length,0);
  const {betaAssets,betaDocuments}=await import('../src/beta-design.mjs');
  assert.equal(betaAssets.length,6);assert.equal(betaDocuments.length,3);
  for(const doc of betaDocuments){assert.equal(doc.author,'吴天昊');assert.equal(doc.signature,'文档撰写人：吴天昊');}
  for(const item of betaAssets){const bytes=await readFile(join(root,'assets/project-design/word-villas',item.file));assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);assert.equal(bytes.readUInt32BE(16),item.width);assert.equal(bytes.readUInt32BE(20),item.height);assert.ok(item.source.length>10);}
});

test('TT curation retains documented responsibility, five design cases and reviewed reference art', async()=>{
  const {projects,companies}=await site();
  for(const target of [projects.find(p=>p.path==='projects/party-planet/index.html'),companies.find(c=>c.path==='experience/quwan/index.html'),await page('projects/party-planet/design-summary/index.html')]){
    const design=one(target.document,n=>n.attrs.id==='tt-design','TT curated design');
    assert.equal(nodes(design,n=>n.tag==='article'&&hasClass(n,'matchmaking-map')).length,5);
    assert.match(textOf(design),/负责人/u);assert.match(textOf(design),/吴天昊/u);
    assert.match(textOf(design),/行为[^。]*收集/u);assert.match(textOf(design),/中断/u);
    assert.match(textOf(design),/阶段性名称/u);assert.match(textOf(design),/数据目标[^。]*业绩/u);
    assert.match(textOf(design),/美术[^。]*团队/u);
    assert.doesNotMatch(textOf(design),/文档撰写人：吴天昊|60%|70%|80%|@/u);
  }
  for(const other of projects.filter(p=>p.path!=='projects/party-planet/index.html'))assert.equal(nodes(other.document,n=>n.attrs.id==='tt-design').length,0);
  const summary=await page('projects/party-planet/design-summary/index.html');
  one(summary.document,n=>n.attrs.id==='materials','Preserve existing TT authored summary');
  one(summary.document,n=>n.tag==='a'&&hasClass(n,'design-original')&&n.attrs.href==='../../../assets/diagrams/material-party-planet.svg','Preserve original summary diagram');
  const {ttAssets,ttDocuments}=await import('../src/tt-design.mjs');
  assert.equal(ttAssets.length,7);assert.equal(ttDocuments.length,5);
  for(const doc of ttDocuments)assert.match(doc.evidence,/负责人[^。]*吴天昊/u);
  for(const item of ttAssets){const b=await readFile(join(root,'assets/project-design/party-planet',item.file));assert.equal(createHash('sha256').update(b).digest('hex'),item.sha256);assert.equal(b.readUInt32BE(16),item.width);assert.equal(b.readUInt32BE(20),item.height);assert.ok(item.source.length>10);}
});

test('Bolang supplements connect both projects without replacing existing evidence or claiming team execution', async()=>{
  const {projects,companies}=await site();
  const company=companies.find(p=>p.path==='experience/bolang/index.html');
  for(const [slug,id,count] of [['matchmaking-inc','matchmaking-supplement',4],['vanity-fair','vanity-design',3]]){
    for(const target of [projects.find(p=>p.path===`projects/${slug}/index.html`),company,await page(`projects/${slug}/design-summary/index.html`)]){
      const section=one(target.document,n=>n.attrs.id===id,'Bolang curated evidence');
      assert.equal(nodes(section,n=>n.tag==='article'&&hasClass(n,'matchmaking-map')).length,count);
      assert.match(textOf(section),/团队/u);assert.match(textOf(section),/历史/u);
      assert.doesNotMatch(textOf(section),/独立完成所有|实际提升|@/u);
      for(const article of nodes(section,n=>n.tag==='article')){
        one(article,n=>n.tag==='details','Native enlarged reading');
        one(article,n=>n.tag==='a'&&hasClass(n,'design-original'),'Original image entry');
      }
    }
    for(const other of projects.filter(p=>p.path!==`projects/${slug}/index.html`))assert.equal(nodes(other.document,n=>n.attrs.id===id).length,0);
  }
  const match=projects.find(p=>p.path==='projects/matchmaking-inc/index.html');
  one(match.document,n=>n.attrs.id==='matchmaking-design','Preserve two system maps');
  const matchText=textOf(one(match.document,n=>n.attrs.id==='matchmaking-supplement','Match source and versions'));
  assert.match(matchText,/修改人[^。]*吴天昊/u);assert.match(matchText,/创建[^。]*其他/u);assert.match(matchText,/早期[^。]*版本/u);
  const vanityText=textOf(one(projects.find(p=>p.path==='projects/vanity-fair/index.html').document,n=>n.attrs.id==='vanity-design','Vanity source scope'));
  assert.match(vanityText,/未署名/u);assert.match(vanityText,/待定/u);assert.match(vanityText,/贴图[^。]*完整界面/u);
  const {bolangAssets}=await import('../src/bolang-design.mjs');assert.equal(bolangAssets.length,8);
  for(const a of bolangAssets){const b=await readFile(join(root,'assets/project-design',a.project,a.file));assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);assert.equal(b.readUInt32BE(16),a.width);assert.equal(b.readUInt32BE(20),a.height);assert.ok(a.source.length>10);}
});

test('browser artifacts stay private and the publish tree has no PDF files', async () => {
  const ignore = await readFile(join(root, '.gitignore'), 'utf8');
  assert.match(ignore, /(?:^|\n)\/?artifacts\/(?:\r?\n|$)/u, 'Screenshots and reports must be ignored');
  async function check(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (['.git', 'node_modules', 'artifacts'].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      assert.doesNotMatch(entry.name, /\.pdf$/iu, `Raw/private PDF in public tree: ${relative(root, path)}`);
      if (entry.isDirectory()) await check(path);
    }
  }
  await check(root);
});
