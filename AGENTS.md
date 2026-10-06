# 在线简历维护入口

- 任职事实与职责：`src/content.mjs`。不得扩大未经确认的个人职责或业绩。
- 视觉规范与运行时 token：`DESIGN.md`、`assets/site.css`。
- 职业项目资料筛选、排版和发布：`docs/project-evidence-workflow.md`。
- 构建：`node scripts/build.mjs`；静态测试：`node --test tests/site.test.mjs`。
- 浏览器报告与截图放在被忽略的 `artifacts/` 中。内部原件、完整统计和秘密不得进入公开仓库。
- 手工修改源文件，生成 HTML 使用构建脚本。保留用户修改，不强制推送。
- 保留本机 ClickFlow 禁跑约束，不运行无过滤的 Node 测试。
