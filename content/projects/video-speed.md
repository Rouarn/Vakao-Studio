---
title: 视频速度控制器
titleEn: VIDEO SPEED CONTROL
slug: video-speed
tagline: 给全网 HTML5 视频一个统一的倍速键盘。
summary: 一个 Manifest V3 浏览器扩展：Z / X / C 快捷键、数字直输、预设面板与全屏浮层提示，把视频倍速从菜单里解放出来。
category: extension
categoryLabel: 扩展
status: maintained
statusLabel: 可用
year: "持续维护"
role: 扩展开发
platforms:
  - Chrome
  - Edge
stack:
  - Manifest V3
  - JavaScript
  - HTML/CSS
accent: blue
featured: false
order: 5
links:
  github: https://github.com/Rouarn/VideoSpeedControl
metrics:
  - label: 核心操作
    value: "键盘优先"
  - label: 覆盖范围
    value: "HTML5 视频"
  - label: 后端
    value: "无"
features:
  - title: 快捷键
    description: Z 减速、X 加速、C 复位，不离开画面就能调。
  - title: 数字直输
    description: 直接键入倍速数字，适合需要精确 1.25× / 1.75× 的场景。
  - title: 预设面板
    description: 弹窗里提供常用倍速，点一下即可应用。
  - title: 全屏浮层
    description: 全屏时在角落短暂显示当前倍速，不打断观看。
related:
  - request-interceptor
  - vakao-ui
---

## 一个小而完整的扩展

视频网站大多有倍速菜单，但操作路径长：点开菜单、选倍速、再关掉。这个扩展把最常用的动作变成键盘：Z 减速、X 加速、C 复位，数字键直接输入目标倍速。

实现上是 Manifest V3 + 内容脚本，监听页面里的 HTML5 `<video>`，不依赖任何后端。全屏时用一个轻量浮层提示当前倍速，几秒后自动消失。

## 设计取舍

- **不做站点适配清单**：优先操作标准 `video` 元素，站点自定义播放器需要单独处理。
- **不接管所有键盘**：只在视频获得焦点或用户主动触发时响应，避免和站点快捷键打架。
- **权限最小化**：只申请必要的站点访问权限，不读取页面内容上传。
