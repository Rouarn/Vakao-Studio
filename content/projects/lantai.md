---
title: 兰台
titleEn: LANTAI / VAKAO PLATFORM
slug: lantai
tagline: 一套后端，三端前台，单文件交付。
summary: 兰台是 VaKao 的全栈单仓实践：GoFrame 主服务、独立更新分发、管理端、云阁 Web 与 uni-app 移动端。三端产物嵌入二进制，部署只需要一个文件与一份配置。
category: platform
categoryLabel: 平台
status: active
statusLabel: 维护中
year: "持续迭代"
role: 架构 / 全栈 / 设计
platforms:
  - Web
  - Android
  - iOS
stack:
  - Go
  - GoFrame
  - Vue 3
  - uni-app
  - MySQL
  - Redis
accent: blue
featured: true
order: 1
links: {}
metrics:
  - label: 前台形态
    value: "3 端"
  - label: 交付物
    value: "1 个二进制"
  - label: 服务拆分
    value: "2 个服务"
features:
  - title: 单仓多端
    description: 后端、管理端、云阁 Web 与移动端放在同一个仓库，共享类型、请求层与构建约定。
  - title: 双域认证
    description: 管理端与业务端使用独立的 JWT 受众，令牌不能跨域使用，避免权限越界。
  - title: 三段式权限
    description: 用“域:资源:操作”描述权限点，在线授权后实时生效，不需要重新登录。
  - title: 独立更新分发
    description: APK 与 wgt 的检测、灰度、签名下载与事件回收拆成独立服务，不占用业务 API。
  - title: 可观测性
    description: 结构化日志、Prometheus 指标、操作审计与按日滚动日志，排障时能还原链路。
  - title: 单文件部署
    description: 三端静态产物嵌入 Go 二进制，生产环境只需要二进制与一份配置文件。
related:
  - static-hub
  - wiredeck
---

## 为什么做兰台

大多数“全栈模板”把前后端放在两个仓库里：类型各写一份、请求层各封一套、部署要维护 Node 与 Go 两套运行时。兰台反过来做——**一个仓库、一个二进制、一份配置**，把多端交付的固定成本压到最低。

后端是 GoFrame 主服务与独立的更新分发服务；前台包括 Element Plus 管理端、Naive UI 云阁 Web、uni-app 移动端。三端构建产物先组装到 `resource/public`，再由 `gf build --ps` 嵌入二进制。改动前端需要重新构建，这是单文件交付的代价，也是它最简单的地方。

## 几个关键取舍

- **双域 JWT 隔离**：`/api/v1/admin/*` 与 `/api/v1/app/*` 使用不同的受众，管理端令牌不能打业务接口。
- **goose 迁移而不是自动同步**：生产 DDL 必须可审计、可回滚；开发期才允许自动同步。
- **更新服务独立部署**：APK 下载是长带宽、发布节奏独立，拆开后不影响业务 API。
- **内嵌资源优先**：改了 `resource/public` 却没有重新构建，运行时会继续读旧资源——这是最容易踩的坑之一。

## 现状

兰台仍在持续迭代，主要精力放在移动端更新链路、权限模型与部署体验上。它是一个内部平台型项目，演示与接入需要单独沟通。
