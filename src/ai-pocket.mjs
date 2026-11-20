export const aiPocketMedia = [
  {key:'home',file:'home.webp',width:1384,height:835,alt:'AI 随身舱首页：六类任务以插画卡片呈现，提供新手入口、教程和本地工具',caption:''},
  {key:'office',file:'office.webp',width:752,height:314,alt:'CSV 教学样例的真实分类计数结果：市场四项、运营三项、客服三项',caption:'CSV 教学样例结果 · 市场 4 项、运营 3 项、客服 3 项。'},
  {key:'commerce',file:'commerce.webp',width:1384,height:835,alt:'AI 随身舱电商图片任务分类，按商品主图、海报等用途提供工具与说明入口',caption:'应用截图 · 电商图片任务和工具入口。'},
  {key:'novel',file:'novel.webp',width:1384,height:835,alt:'AI 随身舱小说创作任务分类，以大纲和写作需求组织工具入口',caption:'应用截图 · 小说创作任务和工具入口。'},
  {key:'video',file:'video.webp',width:1540,height:920,alt:'本地视频助手的双栏界面，展示当前电脑的环境连接状态、推荐规格和生成入口',caption:'本地视频助手界面 · 显示连接状态与生成规格。'},
  {key:'result',file:'result.webp',width:608,height:352,alt:'本地视频助手经实际操作生成的狐狸雪地五秒样片中的一帧',caption:'真实生成的成片帧 · 608 × 352，81 帧、16fps，约 5 秒，无原生音频。'},
];

const escaped=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
function figure(key,e,base='../../') {
  const image=aiPocketMedia.find(item=>item.key===key),href=base+'assets/ai-pocket/'+image.file;
  return `<figure class="ai-pocket-figure" data-pocket-image="${key}"><a href="${href}" aria-label="放大${e(image.alt)}"><img src="${href}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" alt="${e(image.alt)}"></a>${image.caption?`<figcaption>${e(image.caption)} <a href="${href}">查看原图 ↗</a></figcaption>`:''}</figure>`;
}

export function renderAiPocketEntry(e=escaped) {
  return `<section class="ai-pocket-entry wrap section" id="ai-pocket" aria-labelledby="ai-pocket-title">
    <div class="section-head"><div><p class="eyebrow">AI 应用 / 任务工具箱</p><h4 id="ai-pocket-title">AI 随身舱<span class="title-dot">.</span></h4></div><p>Windows 桌面工具</p></div>
    <div class="ai-pocket-entry-grid">
      <div>
        <p class="ai-pocket-thesis">从手头的任务出发，找到能用的工具。</p>
        <p>整理一张 CSV、构思商品海报，或在本机生成一段短片。按任务找到工具，跟着示例准备输入，再检查结果。</p>
        <ul class="collaboration-tags"><li>本地办公</li><li>图文创作</li><li>本地视频</li></ul>
        <a class="text-link" href="projects/ai-pocket/">查看任务流程与示例结果 ↗</a>
      </div>
      ${figure('home',e,'')}
    </div>
  </section>`;
}

export function renderAiPocketBody(e=escaped) {
  return `<main id="main" class="detail-main wrap ai-pocket-page">
    <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html#ai-pocket">返回首页产品案例</a><span aria-hidden="true">/</span><span>AI 随身舱</span></nav>
    <header class="detail-hero">
      <p class="eyebrow">AI 应用 / Windows 桌面工具</p>
      <h1>AI 随身舱<span class="title-dot">.</span></h1>
      <p class="detail-lede">想整理表格、做张海报，还是先试一段短片？</p>
      <p>按任务选择工具，照着示例准备输入，完成后就能对照要求检查结果。</p>
      <ul class="ai-pocket-facts"><li>6 类任务</li><li>16 个子类</li><li>54 个任务入口</li></ul>
      <nav class="collaboration-nav" aria-label="产品功能目录">
        <a href="#problem">按任务找工具 ↓</a><a href="#office">整理表格 ↓</a><a href="#scenarios">电商与写作 ↓</a><a href="#video">本地视频 ↓</a><a href="#delivery">教程与练习 ↓</a>
      </nav>
    </header>

    <section class="collaboration-section" id="problem" aria-labelledby="pocket-problem-title">
      <h2 id="pocket-problem-title">打开首页就能选任务</h2>
      <div class="ai-pocket-workflow">
        <div>
          <p>从办公、图片、写作或视频分类进入，选到具体任务，就能看到操作说明和工具入口。经常用的本地工具也可以从首页直接打开。</p>
          <p>当前 Windows 应用免登录进入，不上传账号。需要第三方服务的任务会指向对应的官网和配置入口。</p>
        </div>
        ${figure('home',e)}
      </div>
    </section>

    <section class="collaboration-section" id="office" aria-labelledby="pocket-office-title">
      <h2 id="pocket-office-title">整理完一张表，先核对再保存</h2>
      <div class="ai-pocket-workflow">
        <div>
          <p>本地 CSV 工具能清理空行、去掉重复项，也能按字段分类计数。用教学文件试一遍，就能对照原表核对分类和数量。</p>
          <ol class="ai-pocket-path"><li>导入 CSV 教学样例。</li><li>选择清理、去重或分类计数。</li><li>预览处理结果，确认后保存。</li></ol>
        </div>
        ${figure('office',e)}
      </div>
    </section>

    <section class="collaboration-section" id="scenarios" aria-labelledby="pocket-scenarios-title">
      <h2 id="pocket-scenarios-title">做商品图、写小说，各自有入口</h2>
      <div class="ai-pocket-scenarios">
        <article>
          ${figure('commerce',e)}
          <h3>先选主图还是海报</h3>
          <p>从商品主图、海报等用途进入，对照任务说明选择图片工具。</p>
        </article>
        <article>
          ${figure('novel',e)}
          <h3>写大纲还是接着写</h3>
          <p>从小说任务里找大纲或写作入口，按当前要完成的一步选工具。</p>
        </article>
      </div>
      <p class="record-source">在线图片和文字工具需连接自有账号或 API。</p>
    </section>

    <section class="collaboration-section" id="video" aria-labelledby="pocket-video-title">
      <h2 id="pocket-video-title">先生成五秒，看看动作顺不顺</h2>
      <div class="ai-pocket-workflow">
        <div>
          <p>视频助手连接本地 ComfyUI 与 Wan2.1 T2V 1.3B。把主体、动作和场景写进提示词，再补上运镜、光线与画面要求。</p>
          <p>先用低分辨率生成短片，检查主体是否清楚、动作是否连贯，再调整提示词和生成规格。</p>
        </div>
        ${figure('video',e)}
      </div>
      <div class="ai-pocket-result">
        ${figure('result',e)}
        <div>
          <h3>雪地狐狸样片</h3>
          <p>样片由视频助手在 Windows 本机生成，使用 RTX 4090D 24GB。生成本地视频需要兼容的 NVIDIA 显卡及足够的存储空间。</p>
        </div>
      </div>
    </section>

    <section class="collaboration-section" id="delivery" aria-labelledby="pocket-delivery-title">
      <h2 id="pocket-delivery-title">从例题开始做一遍</h2>
      <p>24 页使用说明、中文配音教程和练习资料带着用户准备输入、选择工具和检查结果。遇到服务配置或输入问题，可以按常见问题查找操作步骤。</p>
      <a class="text-link" href="../../index.html#ai-pocket">返回首页产品案例 ↑</a>
    </section>
  </main>`;
}
