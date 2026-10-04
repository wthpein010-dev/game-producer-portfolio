import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const companySlugs = ['jianyou', 'hero-games', 'bolang', 'quwan', 'muyou', 'beta', 'xingqi', 'haoteng', 'iceshi'];
const layouts = ['producer', 'workbench', 'duology', 'quest', 'blueprint', 'board', 'storyboard', 'archive', 'lab'];
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
    return { content, home, companies, projects, projectRecords, pages: [home, ...companies, ...projects] };
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
