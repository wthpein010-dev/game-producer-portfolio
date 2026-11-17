const image = (file,label,caption) => ({
  src: `assets/my-life/${file}.webp`,
  width: 1920,
  height: 1080,
  label,
  caption,
  alt: `《我的一生》Windows 试玩画面：${label}`
});

export const myLifeCover = image('title-screen','一家人的晚饭','Windows 试玩版标题画面');

export const myLifePcShots = [
  myLifeCover,
  image('family-tree','家谱与人物详情','从家谱选择家人，查看当前状态与人物履历。'),
  image('school-choice','升学选择','在同一窗口比较学校、费用与成长收益。'),
  image('monthly-ledger','家庭月度账本','按收入、支出和净额核对家庭预算。'),
  image('property-inheritance','房产与传承','按房产查看产权，指定继承人或确认赠与。'),
  image('farewell-result','告别结算','确认实际支出和对家人的影响，再继续推进。')
];
