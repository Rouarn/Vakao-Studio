---
title: VaKao UI
titleEn: VAKAO UI / INTERNAL LIBS
slug: vakao-ui
tagline: 四个小库，把团队项目里重复的脏活收掉。
summary: 团队内部的前端基础设施：@vakao/axios 统一请求与 401 刷新，@vakao/socket-system 提供类型安全的 Socket 协议，@vakao/scripts-utils 收敛构建脚本的终端输出，vakao-ui 提供 Vue 3 组件。
category: library
categoryLabel: 开源库
status: active
statusLabel: 维护中
year: "持续维护"
role: 库设计与维护
platforms:
  - Web
  - Node
stack:
  - TypeScript
  - axios
  - Socket.IO
  - CLI
accent: blue
featured: false
order: 7
links:
  github: https://github.com/Rouarn/VakaoUI
metrics:
  - label: 包数量
    value: "4 个"
  - label: 请求层
    value: "0.0.2"
  - label: 框架绑定
    value: "无"
features:
  - title: createClient
    description: 统一信封解包、401 单飞刷新、重复请求取消与全局 loading 计数。
  - title: 类型安全 Socket
    description: 连接管理、自动重连、房间恢复、标准化消息与统一错误出口。
  - title: 脚本工具
    description: 终端颜色、图标、ASCII 横幅、日志与常用工具函数，供各项目构建脚本复用。
related:
  - lantai
  - static-hub
---

## 为什么自己写

团队项目多了之后，每个仓库都会复制一份 axios 封装：有的处理 401，有的不处理；有的解信封，有的不解。`@vakao/*` 把这些约定收进三个小包，项目只依赖接口，不依赖实现细节。

- **`@vakao/axios`**：`createClient` 一次性配置 baseURL、超时、鉴权头、刷新与错误出口；401 只刷新一次，失败的请求排队重放。
- **`@vakao/socket-system`**：把连接、重连、房间恢复、消息编解码与错误处理收进一个无框架的客户端，测试用假传输与虚拟时钟。
- **`@vakao/scripts-utils`**：统一终端颜色、图标、横幅与日志，让不同项目的构建输出看起来像一家人。
- **`vakao-ui`**：Vue 3 + TypeScript 组件库，承接团队页面里反复出现的交互与视觉约定。

## 现状

内部使用为主，API 仍在收敛。它们不追求成为通用框架，只解决 VaKao 项目里反复出现的那几个问题。
