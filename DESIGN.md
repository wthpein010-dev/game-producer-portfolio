---
version: alpha
name: "游戏制作人项目档案"
description: "以职业章节、项目分支和职责记录呈现制作人的个人作品集。"
colors:
  background: "#e9f0f6"
  surface: "#f8fbfe"
  surface-soft: "#dbe7ef"
  primary: "#174b55"
  primary-soft: "#ddecee"
  foreground: "#153b45"
  muted: "#4b6570"
  border: "#b8cbd5"
  accent: "#c04926"
  accent-soft: "#ffdfbf"
  accent-foreground: "#803c16"
  on-primary: "#ffffff"
  on-primary-muted: "#d9e9ee"
typography:
  display:
    fontFamily: "Producer Display, Microsoft YaHei, sans-serif"
  body:
    fontFamily: "IBM Plex Sans, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: "1.75"
  utility:
    fontFamily: "IBM Plex Sans, Cascadia Code, Consolas, monospace"
rounded:
  DEFAULT: "14px"
  sm: "7px"
  dossier: "2px"
spacing:
  page-max: "1200px"
  section-gap: "64px"
components:
  chapter-rail: {}
  company-map: {}
  disclosure: {}
  project-dossier: {}
  public-note: {}
---

# 游戏制作人项目档案

## Overview

这是面向中文 HR 与面试官的内容型个人作品集。首页的任务是快速说明定位和最近项目；时间轴、职责分支与项目子页供深入阅读。桌面使用展开的关系图，手机保留原生折叠和直接链接。

审美来自游戏制作过程中的项目档案与阶段标记。最有辨识度的元素是把真实的九段任职经历做成可点击的章节索引，并用同一条时间轴继续展开公司、项目与职责。它表示阅读顺序，不表示游戏等级、工作进度或能力评分。

大标题使用窄斜的中文展示字，带出游戏行业的速度感；信息区保持安静。配色采用冷蓝纸面、深墨绿文字与橙色当前节点。不使用任意技能百分比、无关装饰性图表、公司内部素材或人物头像猜测。

此任务为用户明确要求的全站视觉更新。已确认履历与项目文案保留于 `src/content.mjs`；个人实践内容保留于 `src/ai.html`。这些文件是内容事实来源。现有路由、原生 details、职责 query、返回位置恢复、AI 标签与过滤行为由 `assets/app.js` 和项目验收测试维持。

运行时 CSS 是规范值来源（Model B）。`assets/site.css` 的 `:root` 定义所有共享颜色、字体、形状和滚动条。此文件镜像这些值；生成图示从同一 CSS 读取颜色后映射，避免自行创建第二套调色板。

## Colors

背景与表面形成冷蓝层次。primary 对应 `--plum`，foreground 对应 `--ink`，border 对应 `--line`；保留这些旧变量名称以兼容各页面布局。primary-soft 对应 `--plum-soft`，accent-soft 对应 `--lime`，accent-foreground 对应 `--lime-ink`。accent 对应 `--accent`，仅强调当前章节和导航反馈。橙色不表示成绩或风险，当前状态同时有文字说明。

正文与链接使用深墨绿，辅助说明使用 muted。主色面上的正文使用 on-primary / on-primary-muted。原生强制色模式保留系统色与可见边框。

## Typography

Producer Display 是本站对开源得意黑的网页子集使用名；仅用于姓名、职业标题和页面主标题。得意黑不用于长正文、导航标签或小字号。IBM Plex Sans 用于拉丁文字、数字与日期；中文正文由平台中文无衬线字体承接。日期使用等宽数字特性。

正文为 16px / 1.75，长摘要行宽约 40em。中文允许换行，不通过截断或悬浮才能获得完整内容。字体自托管并保留许可；标题分行由结构控制，避免字体加载改变主要按钮位置。

## Layout

页面最大宽度 1200px。首屏是大标题与当前项目档案，底部的九章索引是时间轴入口。时间轴在桌面呈日期、公司根节点、项目/职责分支；700px 以下保持内容顺序并转为单列，章节索引分两行。

公司与项目继续保留既有九种内容布局。不同布局来自实际内容数量与职责类型，字体、颜色、导航和来源说明保持一致。详情中的公开摘要位于项目记录之后，使用三个职责入口和可直接打开的阅读页面。

图片声明尺寸，内容采用自然文档滚动。无全屏固定容器、强制滚动或光标接管。

## Elevation & Depth

公司根节点通过表面色、细边框和轻阴影区分；当前公司使用主色面。分支与正文保持平面。图示是职责结构说明，不能冒充游戏实机或实际结果。

## Shapes

常规容器为 14px 圆角，链接节点为 7px。当前项目与职责摘要采用 2px 档案边角，指示其记录属性。连接线仅存在于有关系的时间轴和分支之间。

## Components

链接、按钮与 summary 保留原生语义。悬浮与键盘焦点都显示可见边框；点击反馈不移动文档布局。触屏不依赖悬浮才能发现入口。

章节索引的编号来自真实的任职顺序。details 展开表示正在阅读的分支。项目详情沿用公司记录，不能将共同职责归为单个项目的独立成果。公开职责摘要只依据已确认的任职与职责，不发布内部原件或数据。

动效集中于首屏章节线出现，以及节点的悬浮/焦点路径反馈。入场只画连接线，不隐藏正文；180–360ms，无循环动画。减少动效设置关闭入场和位移，保留即时状态变化。打印时隐藏交互导航，保留摘要与来源。

全局滚动条由 `--scrollbar-thumb`、`--scrollbar-track`、`--scrollbar-hover` 定义，在新滚动区域中继承；强制色模式恢复系统色。

## Do's and Don'ts

- 以真实任职、项目和职责决定结构与标记。
- 在窄屏、键盘、减少动效及无脚本状态下保持可读内容与可打开链接。
- 不把职责摘要当作成果证明，不推测指标或个人独立完成范围。
- 不添加与内容无关的粒子、工具图标墙、技能分数或自动播放视频。
