---
title: 静态资源中心
titleEn: VAKAO STATIC HUB
slug: static-hub
tagline: 把文件、分享与更新包放进一个可检索的控制台。
summary: 一个面向小团队的静态资源管理系统：多根目录文件管理、分片上传、图片处理、分享链接、随机图与占位图，以及 App 在线更新中心。
category: platform
categoryLabel: 工具
status: active
statusLabel: 可用
year: "持续迭代"
role: 全栈 / 运维
platforms:
  - Web
  - API
stack:
  - NestJS
  - SQLite
  - Vue 3
  - Sharp
  - TypeScript
accent: purple
featured: true
order: 2
links:
  github: https://github.com/Rouarn/VakaoStaticHub
metrics:
  - label: 上传方式
    value: "5MB 分片"
  - label: 内容校验
    value: "SHA-256"
  - label: 更新状态
    value: "4 态"
features:
  - title: 多根目录
    description: 一个后台管理多个资源根目录，按分类浏览、搜索、排序，文件系统仍是最终事实。
  - title: 分片上传
    description: 大文件切 5MB 分片，支持断点续传与合并校验，弱网下不用整包重来。
  - title: 分享链接
    description: 单文件或多文件聚合分享，支持有效期、访问次数与访问密码，链接不暴露真实路径。
  - title: 图片处理
    description: 基于 Sharp 的缩放、格式转换与磁盘缩略图缓存，避免每次请求都重新解码。
  - title: 更新中心
    description: APK 上传、四态发布、灰度分桶、强更与回滚，客户端按设备稳定命中。
  - title: 审计与指标
    description: 登录、上传、删除、发布、分享等关键动作落审计日志，指标页看 QPS 与存储量。
related:
  - lantai
  - vakao-ui
---

## 它解决什么问题

小团队经常把图片、APK、安装包、临时文件散落在服务器目录、网盘和聊天记录里。静态资源中心把这些东西收进一个可检索的控制台：文件有分类、有缩略图、有分享链接，App 更新包也有独立的发布状态。

后端是 NestJS + SQLite，前端是 Vue 3 + Naive UI。SQLite 的选择很务实：单机静态资源站，零外部依赖，拷一个库文件就能备份；代价是并发写和大数据量受限。

## 值得说的细节

- **文件系统是真相，数据库是索引**：启动全量扫描、定时增量、根目录变更触发刷新，避免“库里有、盘上没有”。
- **分片上传 + SHA-256 合并校验**：APK 与视频动辄数百 MB，整包上传容易断；分片让失败只影响一个块。
- **分享用 HMAC 短期令牌**：链接本身不暴露真实路径，密码不落明文。
- **更新中心是独立模块**：与兰台的更新服务功能重叠，长期需要收敛；当前保留两套实现是历史包袱。

## 现状

作为内部工具持续使用中。后台涉及真实文件与账号信息，官网只展示结构与能力，不公开管理入口。
