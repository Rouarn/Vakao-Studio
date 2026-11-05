---
title: Wails3 桌面模板
titleEn: WAILS3 / DESKTOP TEMPLATE
slug: wails3-template
tagline: Go 单进程承载 WebView，前端类型从 Go 契约直接生成。
summary: 基于 Wails v3 + Vite+ 的桌面应用模板：Go 单进程承载系统 WebView，internal/contract 是唯一模型来源，前端 bindings 由 wails3 generate 生成并入库，配合 CLI 版本门禁与前后端双门禁。
category: desktop
categoryLabel: 桌面
status: active
statusLabel: 维护中
year: "2026"
role: 模板设计与维护
platforms:
  - macOS
  - Windows
  - Linux
stack:
  - Go
  - Wails v3
  - Vue 3
  - TypeScript
  - Vite+
accent: orange
featured: false
order: 9
links:
  github: https://github.com/Rouarn/Wails3Template
metrics:
  - label: 运行时
    value: "Go 单进程"
  - label: 契约来源
    value: "internal/contract"
  - label: CLI 门禁
    value: "≥ v3.1.0"
features:
  - title: Go 单进程
    description: main.go 用 go:embed 打包前端产物，Wails v3 承载系统 WebView，不起额外的 Node 运行时。
  - title: 契约单一来源
    description: internal/contract 定义模型、事件与结构化错误，前端类型全部来自生成的 bindings，不手写 DTO。
  - title: bindings 防漂移
    description: frontend/bindings 入库，check:bindings 重新生成并比对，CI 用 git diff 拦住忘记提交的契约变更。
  - title: 托盘与窗口状态
    description: 关窗只收进托盘，托盘菜单提供显示主窗口、设置与退出；窗口位置尺寸写入 settings.json，拔掉外接屏后回落居中。
  - title: 可取消任务
    description: CapabilitiesService.RunDemoTask 用 context.Context 演示取消，前端取消会中断 Go 循环并收到 cancelled 事件。
  - title: 双门禁
    description: check:fe 串起类型检查、lint、格式化、图标校验与 bindings 漂移，check:go 跑 go vet、go test 与 golangci-lint。
related:
  - electron-template
  - wiredeck
---

## 为什么做这个模板

Wails v2 的项目里，Go 与前端的边界通常是手写 DTO 加口口相传的约定：字段改了前端不知道，事件名拼错只在运行时暴露。这个模板把边界收进代码：Go 侧的 `internal/contract` 是唯一模型来源，`wails3 generate bindings` 产出前端类型，`frontend/bindings` 提交进仓库，漂移由脚本和 CI 一起拦。

前端沿用团队熟悉的一套：Vue 3.5、Naive UI、UnoCSS 与 Vite+ 的 `vp` 工具链；桌面能力通过 `frontend/src/bridge` 单层封装，事件订阅与错误归一化都只在这一层出现。

## 值得说的细节

- **CLI 版本先过门禁**：`scripts/lib/wails.mjs` 校验 `wails3` 不低于 v3.1.0，低于直接中止，避免旧版生成的 bindings 与契约不兼容。
- **错误只有一种形状**：Go 侧统一返回 `*contract.AppError`，经 `MarshalError` 变成 `{code,message,details}`；前端加上 15s 超时与取消，再按 code 分支。
- **图标是构建期校验的**：图标类名集中在 `frontend/src/icons.ts`，UnoCSS safelist 由该表生成，`check-icons.mjs` 同时校验集合里存在、产物 CSS 里真有规则。
- **关窗不等于退出**：托盘保留进程，只有托盘菜单的“退出”才结束；窗口几何写入同一份 `settings.json`，显示器变化时做可见性校验。
- **任务取消走 context**：演示任务每步检查 `ctx.Err()`，取消后推送 `cancelled`，前端拿到的是事件而不是异常。

## 现状

模板刚落地，macOS 上已验证 `.app` 与 DMG 产出；Windows 与 Linux 打包只跑过 CI 配置，未在实机安装，代码签名与公证仍留着入口没接证书。自动更新尚未实现，代码里没有 updater 接入点。
