---
title: Electron 桌面模板
titleEn: ELECTRON / DESKTOP TEMPLATE
slug: electron-template
tagline: 把安全基线与类型化 IPC 先定好，克隆下来直接写业务。
summary: 基于 Electron 45 + Vue 3.5 + Vite+ 的桌面应用模板：主进程、preload 与渲染进程共用同一份 IPC 契约，CSP、sandbox、导航拦截与更新校验逐项显式开启，electron-builder 覆盖 macOS、Windows 与 Linux 打包。
category: desktop
categoryLabel: 桌面
status: active
statusLabel: 维护中
year: "持续维护"
role: 模板设计与维护
platforms:
  - macOS
  - Windows
  - Linux
stack:
  - Electron
  - Vue 3
  - TypeScript
  - Vite+
  - electron-builder
accent: blue
featured: false
order: 8
links:
  github: https://github.com/Rouarn/ElectronTemplate
metrics:
  - label: 进程模型
    value: "三端共享契约"
  - label: 安全基线
    value: "逐项显式"
  - label: 打包目标
    value: "mac / win / linux"
features:
  - title: 类型化 IPC
    description: 通道常量、请求与响应映射、preload 白名单共用 shared/ipc，新增通道补一行映射，三端同时拿到类型约束。
  - title: 安全基线
    description: contextIsolation、sandbox 与 nodeIntegration 在 webPreferences 逐项声明，配套 CSP、导航拦截与 app:// 协议防路径穿越。
  - title: 自动更新
    description: electron-updater 仅在打包后启用，强制 HTTPS 并校验 sha512，缺少校验值的更新包直接拒绝。
  - title: 国内镜像安装
    description: install:cn 注入 npmmirror 后安装依赖并补装 Electron 二进制，绕开 electron 45 不再自带 postinstall 的问题。
  - title: 三平台打包
    description: electron-builder 单一声明式配置源，输出 dmg、NSIS 与 AppImage/deb，产物统一落在 release/ 且不进版本库。
  - title: 浏览器降级
    description: dev:renderer 脱离 Electron 启动渲染进程，bridge 自动切到 mock，同一份界面代码在浏览器里也能预览。
related:
  - wails3-template
  - wiredeck
---

## 为什么做这个模板

Electron 项目的重复劳动不在窗口本身，而在窗口之外：IPC 通道散落在各处、preload 越暴露越多、CSP 与导航拦截常常忘记加、更新链路只在真机上出问题。这个模板把这些约定提前落成目录结构和代码：主进程、preload、渲染进程各就各位，`shared/ipc` 是三者之间唯一的契约来源。

渲染层是 Vue 3.5 + Vite+，状态用 pinia，组件用 Naive UI，样式走 UnoCSS；构建、检查与格式化统一交给 `vp`。主进程与渲染进程各自维护 tsconfig，`pnpm typecheck` 一次跑完两侧。

## 值得说的细节

- **通道没有手写字符串**：`channels.ts` 定义常量表，主进程注册、preload 白名单与渲染层调用都引用常量；`contracts.ts` 用通道作键，补一行映射就能得到三端类型约束。
- **preload 只暴露六组方法**：`app / window / dialog / system / updater / menu`，不把 `ipcRenderer` 交给页面；事件订阅同样走白名单。
- **本地资源走 app:// 协议**：`protocol.ts` 校验协议与主机名并防路径穿越，命中不到的无扩展名路径回退 `index.html`，深链不白屏。
- **更新只信 HTTPS + sha512**：`updater.ts` 在未打包时直接降级，联调要用明文源必须显式设置 `ALLOW_INSECURE_UPDATE=1`。
- **镜像注入放在 Node 脚本里**：pnpm 12 不会把 `.npmrc` 导出给 `pnpm run`，所以 `install.mjs` 与 `dist.mjs` 自己拼环境变量，安装和打包都不依赖 shell 前缀。

## 现状

作为团队新桌面项目的起点在持续维护。当前验证覆盖构建、启动与三平台产物生成；窗口布局、主题切换与图标渲染还没有做逐像素的视觉走查，Windows 与 Linux 也只验证了包内元数据，未在实机安装运行。
