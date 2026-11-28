const earlyCareerProjects = {
  'words-with-colors': {
    title: '拼出单词，完成颜色目标',
    intro: 'Words with Colors 在海外商店介绍中也称 Color Master。玩家在字母轮盘连出单词，把拼词与指定颜色目标一起完成。单词拼得对，盘面还要满足本关的颜色要求。',
    heading: '一局怎样解',
    steps: [
      '先看关卡要求：查看盘面空位与待收集的颜色，判断优先拼哪一组字母。',
      '从轮盘连字：用给出的字母组成英文单词，正确的词填入盘面，颜色目标随操作推进。',
      '卡住时换个解法：用提示找线索，或用橡皮擦调整盘面，继续寻找符合当前颜色目标的组合。'
    ],
    images: [
      {file:'build-a-word.png',width:576,height:768,sha256:'5c097b770a479d6eebc438b1bef1a2cd348628d3871e657c382a01380c7b10dc',alt:'Words with Colors 海外商店配图，手指在字母轮盘相连组成单词，棋盘同步显示拼词结果',caption:'从字母轮盘拼出单词'},
      {file:'collect-colors.png',width:576,height:768,sha256:'9b0ea412d4a275b8419eef8c232c9d8e6642eb014ea155b7507062079f2e3d61',alt:'Words with Colors 海外商店配图，顶部显示颜色目标和进度，中部是部分填好的拼词关卡',caption:'核对颜色目标与关卡进度'},
      {file:'color-puzzle.png',width:576,height:768,sha256:'f6e695c6d5af0d1b842008003f15d83bfff3bc7ffe1fcd576de5db29f8a09234',alt:'Words with Colors 海外商店配图，较复杂的彩色字格彼此交叉，底部显示字母轮盘',caption:'在更多相交字格里规划拼法'}
    ],
    imageSource: '海外 App Store 历史公开宣传图',
    sourceUrl: 'https://words-colors-word-game.appstor.io/',
    caseStudy: {
      title: '我负责的图鉴收集方案',
      intro: '我撰写《图鉴收集系统》，把主线关卡中的收集物变成跨关目标。玩家完成关卡收集后，可以在图鉴里看到离下一张主题照片还有多远。',
      points: [
        '让收集进度有去处：关卡中取得的收集物推进照片解锁，达成条件后揭开照片并反馈奖励。',
        '区分照片状态：已解锁可以查看大图，正在收集的照片可查看条件，尚未开放的照片提示先完成前一张。',
        '用动效说明发生了什么：新内容通过入口提示，进入图鉴后依次看到进度补满、照片解锁和获得奖励，让玩家能理解本次变化及接下来的目标。'
      ]
    },
    note: '个人工作依据《图鉴收集系统》正文署名。配图展示曾公开的拼词玩法，图鉴案例依据历史策划方案整理，对应的实际上线版本尚待确认。'
  },
  'paper-girl': {
    title: '拖动纸片，接出解谜路线',
    intro: '安妮穿梭于纸片童话。玩家用拖拽改动多层景物的位置，再操控安妮穿过新形成的路线、解决机关并推进故事。',
    heading: '一段解谜如何成立',
    steps: [
      '观察场景：从前后叠置的楼梯、平台和道具找线索，判断哪些图层可以移动。',
      '重组路线：拖动纸片改变景物相对位置，再点击控制安妮移动或与机关互动。',
      '验证结果：新路线可达时继续向出口推进，场景状态仍不满足时重新调整图层。不同童话还引入体型变化等机关。'
    ],
    images: [
      {file:'paper-world.jpg',width:800,height:480,sha256:'46a009387d376d0864520ff448299c6e9cc12fdd0ce14ecd522475338f8a478a',alt:'纸片少女宣传图，展示用分层纸片搭成的童话舞台和角色',caption:'多层纸片组成的童话世界'},
      {file:'story-levels.jpg',width:800,height:480,sha256:'8057ef892ec1685978bfd6bc083d8930144e255d47a0cc9665fffede94eccf0b',alt:'纸片少女宣传图，角色站在由钟楼、阶梯和平台构成的童话场景中',caption:'童话关卡中的平台与机关'}
    ],
    imageSource: '好游快爆历史商店宣传图',
    sourceUrl: 'https://m.3839.com/a/128108.htm',
    note: '我在这个项目主要参与关卡调优。配图呈现游戏的解谜方式，用于理解调优所面对的操作和关卡结构。'
  },
  'creation-factory': {
    title: '从收集部件到经营潮玩店',
    intro: '玩家在盲盒机收集玩偶部件，自行组合设计，再把作品生产并摆上货架。收集决定可设计的组合，设计则为生产和销售提供商品。',
    heading: '一款玩偶怎样上架',
    steps: [
      '收集与组合：获得部件后到 DIY 页面组合玩偶，所需部位齐全时可确认设计。',
      '安排生产：选中生产台与玩偶开始制作，生产进度决定何时可以安排上架。',
      '售卖与补货：成品摆进货架，玩家可吸引顾客加快售卖，也可启用补货助手接续陈列。'
    ],
    images: [
      {file:'diy-test.jpg',width:1080,height:2400,sha256:'18054638afd29f94cd0d1484e5e825524fd9da96c7cda2d9107e87107dbd07bd',alt:'造物梦工厂历史测试版 DIY 界面，顶部显示组装的玩偶，下方展示部件列表',caption:'把收集的部件组合成玩偶'},
      {file:'production-test.jpg',width:1080,height:2400,sha256:'322de568bc88de00064fb5aff640cb05a36ecd6591eb90f3f4e7dc20b648ec86',alt:'造物梦工厂历史测试版生产窗口，展示玩偶列表及制作相关状态',caption:'选择要生产的玩偶'},
      {file:'shelf-test.jpg',width:544,height:860,sha256:'fb10bef85376e98b5c3c806acae153b226a81a4d2b3afe8b48fda363b7c99a5e',alt:'造物梦工厂历史测试版货架界面，展示已上架的玩偶及可选商品',caption:'将生产的玩偶加入货架'}
    ],
    imageSource: '玉米游戏工作室「甜蜜测试季」公开配图',
    sourceUrl: 'https://www.taptap.cn/moment/144843023287585795?group_id=66338',
    caseStudy: {
      title: '把主线与支线任务放进店铺经营',
      intro: '我参与主线与支线任务设计。主线用人物和事件交代世界背景，支线给不同 NPC 留出成长空间。任务条件取自玩家已经在做的事，让剧情能接回接单、组装和经营。',
      points: [
        '主线可要求交材料、完成指定 NPC 订单、场景互动或达到经营目标。以指定订单为例，玩家在任务页核对要求和进度，再直接前往订单界面处理。',
        '支线可让 NPC 提出造物要求，再引导玩家进入 DIY 组合。任务把外观或部件条件写成可执行的目标，玩家在常用界面完成创作。',
        '人物信息随任务推进逐步出现。阶段回馈和来信承接玩家已完成的行动，也给下一次遇到同一个人留下线索。'
      ]
    },
    note: '个人分工依据本人确认。任务案例依据历史主支线界面与叙事方案整理；配图为开发商公开测试版的经营画面。'
  }
};

export function renderEarlyCareerDesign(project) {
  if (!project || !Object.hasOwn(earlyCareerProjects, project.slug)) return '';
  const {title, intro, heading, steps, images, imageSource, sourceUrl, caseStudy, note} = earlyCareerProjects[project.slug];
  const figures = images?.map(({file, width, height, alt, caption}) => {
    const src = `../../assets/project-design/${project.slug}/${file}`;
    return `<figure>
      <a href="${src}" aria-label="放大${caption}"><img src="${src}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="${alt}"></a>
      <figcaption><strong>${caption}</strong><small>${imageSource}</small></figcaption>
    </figure>`;
  }).join('');
  const example = caseStudy ? `<section class="idiom-chapter">
      <h3>${caseStudy.title}</h3>
      <p class="idiom-chapter-lead">${caseStudy.intro}</p>
      <ul>${caseStudy.points.map(point => `<li>${point}</li>`).join('')}</ul>
    </section>` : '';
  return `<section class="matchmaking-design idiom-chapter" id="career-project-detail" aria-labelledby="career-project-detail-title">
    <header><h2 id="career-project-detail-title">${title}</h2><p class="matchmaking-intro">${intro}</p></header>
    ${figures ? `<div class="career-ui-grid">${figures}</div>
    ` : ''}<div class="matchmaking-map-notes">
      <div><h3>${heading}</h3><ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol></div>
      <div><h3>职责与资料依据</h3><p>${note}</p>${sourceUrl ? `
        <a class="text-link" href="${sourceUrl}">查看公开来源 ↗</a>` : ''}
      </div>
    </div>${example ? `
    ${example}` : ''}
  </section>`;
}
