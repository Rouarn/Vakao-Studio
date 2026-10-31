---
title: 请求拦截与调试器
titleEn: REQUEST INTERCEPTOR
slug: request-interceptor
tagline: 在侧边栏里看清、改掉、重放每一个请求。
summary: 一个 Manifest V3 侧边栏扩展：Monkey Patch 页面 fetch/XHR，做请求捕获、过滤、Mock、改包、重定向与规则导入导出。
category: extension
categoryLabel: 扩展
status: maintained
statusLabel: 可用
year: "持续维护"
role: 扩展开发
platforms:
  - Chrome
stack:
  - Manifest V3
  - Monkey Patch
  - JavaScript
accent: purple
featured: false
order: 6
links: {}
metrics:
  - label: 捕获对象
    value: "fetch / XHR"
  - label: 规则能力
    value: "Mock / 改包 / 重定向"
  - label: 数据位置
    value: "本地"
features:
  - title: 请求捕获
    description: 在页面上下文里替换 fetch 与 XMLHttpRequest，记录请求、响应与耗时。
  - title: 过滤与搜索
    description: 按 URL、方法、状态码筛选，长列表里快速定位目标请求。
  - title: Mock 与改包
    description: 命中规则时直接返回本地响应，或修改请求头、请求体后再放行。
  - title: 重定向
    description: 把请求转发到另一个地址，用于本地联调与环境切换。
  - title: 规则导入导出
    description: 规则以 JSON 保存，可以在团队之间共享，也可以纳入版本管理。
related:
  - video-speed
  - vakao-ui
---

## 为什么不用 DevTools

Chrome DevTools 已经能看请求，但“改一个响应再刷新”并不顺手：要么用本地代理，要么在代码里加断点。这个扩展把常用动作放进侧边栏：捕获、过滤、Mock、改包、重定向，规则可以保存和导入。

实现方式是在页面上下文里 Monkey Patch `fetch` 与 `XMLHttpRequest`，扩展侧边栏通过消息通道读取记录。所有数据留在本地，不上传服务器。

## 边界

- 只处理页面 JS 发起的请求，Service Worker、WebSocket 与部分跨域场景需要单独处理。
- 改包可能破坏签名或业务校验，规则默认关闭，命中时在列表里明确标记。
- 仅用于自己有权调试的页面与接口。
