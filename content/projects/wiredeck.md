---
title: WireDeck
titleEn: WIREDECK
slug: wiredeck
tagline: 在电脑上无线管理安卓手机，开箱即用。
summary: 一个把无线 ADB 包进图形界面的桌面工具：扫码配对、应用管理、APK 安装、文件传输、实时日志与 Shell。内置 adb、aapt2 与 scrcpy，不需要 Android SDK。
category: desktop
categoryLabel: 桌面
status: paused
statusLabel: 维护暂停
year: "2026"
role: 产品 / 桌面端 / 发布
platforms:
  - macOS
  - Windows
stack:
  - Wails
  - Go
  - Vue 3
  - adb
  - scrcpy
accent: yellow
featured: true
order: 4
links:
  site: https://wiredeck.woyuxiaji.cn
  github: https://github.com/Rouarn/WireDeck
  download: https://github.com/Rouarn/WireDeck/releases
metrics:
  - label: 正式版
    value: "v1.0.1"
  - label: 平台
    value: "macOS / Windows"
  - label: 内置工具
    value: "adb / aapt2 / scrcpy"
features:
  - title: 扫码配对
    description: 手机扫一下电脑上的二维码就能连上，也可以手动输入配对码。
  - title: 应用管理
    description: 应用列表、卸载、启动、强停、清数据、导出 APK，文件名优先中文名。
  - title: 文件传输
    description: 双栏管理、拖放添加、批量推送与拉取，截图可以直接保存到电脑。
  - title: 日志与 Shell
    description: 按应用过滤 logcat，自动识别崩溃与 ANR；常用命令有快捷入口。
  - title: 投屏控制
    description: 内置 scrcpy，一键在电脑上操作手机，窗口标题带设备名。
  - title: 开箱即用
    description: 不要求安装 Android Studio；adb、aapt2、scrcpy 都随应用打包。
related:
  - dianmo
  - static-hub
---

## 为什么做 WireDeck

Android 自带的“无线调试”很好用，但门槛不低：找 IP、记端口、输入配对码，再敲一堆 `adb` 命令。WireDeck 把这些步骤收进一个窗口：扫码连接，然后安装、卸载、传文件、看日志都不需要命令行。

技术上是 Wails v2 + Go + Vue 3：Go 负责 adb、进程、文件与 scrcpy 编排，Vue 负责界面。选择 Wails 而不是 Electron，是为了更小的包体和更直接的系统调用；代价是跨平台细节要自己填。

## 两个真实的坑

- **Windows 子进程必须隐藏窗口**：GUI 程序调用 adb 会反复弹 CMD，所有子进程都要加 `HideWindow + CREATE_NO_WINDOW`。
- **`/releases/latest` 会忽略 prerelease**：下载链接使用显式 tag，避免 404。

## 现状

v1.0.1 已发布，目前进入维护暂停；有问题提交 Issue，看到后会恢复维护。macOS 为 ad-hoc 签名、未公证，首次打开需要右键 → 打开。
