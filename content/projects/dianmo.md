---
title: 点墨
titleEn: DIANMO
slug: dianmo
tagline: 纸、墨、朱印，和一枚能读内存的悬浮窗。
summary: 点墨是一个面向 Android 单机离线场景的内存调试工具。App 本身不持有 root，通过 libsu 拉起独立 native 扫描器，再做首扫、过滤、指针链与地址簿。
category: mobile
categoryLabel: 移动
status: maintained
statusLabel: 维护中
year: "2026"
role: 设计 / Android / Native
platforms:
  - Android
stack:
  - Kotlin
  - C++
  - libsu
  - Material 3
accent: orange
featured: true
order: 3
links:
  github: https://github.com/Rouarn/DianMo
metrics:
  - label: 数值类型
    value: "4 种"
  - label: 结果上限
    value: "5000 条"
  - label: 扫描器
    value: "1 个 CLI"
features:
  - title: 首扫与过滤
    description: 按 Int32 / Int64 / Float / Double 扫描，再通过变大、变小、未变、变化逐步收敛。
  - title: 模糊搜索
    description: 先对内存段做快照，再按差值条件多轮过滤，适合不知道确切数值的场景。
  - title: 指针链
    description: 在指定范围内查找指针，用 BFS 追到模块基址，得到可复用的地址链。
  - title: 地址簿
    description: 把常用地址与备注存进本地，下次进入游戏可以直接读取或改写。
  - title: 变速
    description: 调整目标进程的时间倍率，用于单机场景下的节奏测试。
  - title: 和纸界面
    description: 纸、墨、朱印三色，四角朱线、衬线字体与自绘键盘，尽量不像一个“黑客工具”。
related:
  - wiredeck
  - lantai
---

## 一个学习项目

点墨最初叫 MemTool，是一个原生内存扫描 CLI 加简易悬浮窗。后来重做成完整的悬浮窗工具：大尺寸面板、自绘数字键盘、模糊搜索、指针链、地址簿与变速，并把视觉改成和纸风格。

**使用边界**：仅用于本人拥有的离线单机游戏；不用于联机游戏、内购绕过或任何商业作弊场景。官网保留这段说明，是为了避免被误用。

## 架构

App 进程本身没有 root。所有内存访问都由 `su` 拉起的独立 `memtool-scanner` 子进程完成：App 只负责参数、结果展示与安装。扫描器优先用 `process_vm_readv/writev`，失败回退 `/proc/<pid>/mem`；`maps` 解析只保留可读写的匿名段。

## 视觉

界面用 `#EFE7D6` 纸色、`#241F18` 墨色与 `#B23A2E` 朱红，四角是 L 形朱线，数字键盘自己画，字体用衬线。它不追求“酷”，而是让一个偏底层的工具看起来像一本摊开的册子。
