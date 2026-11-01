<script setup lang="ts">
import { ArrowUpRight, Github } from "lucide-vue-next";

const products = [
  {
    name: "Vakao-Studio",
    desc: "VaKao 团队官网：Nuxt 4 + Tailwind CSS + Three.js，静态生成。",
    tag: "官网",
    url: "https://github.com/Rouarn/Vakao-Studio",
  },
  {
    name: "WireDeck",
    desc: "在电脑上无线管理安卓手机：扫码配对、应用管理、APK 安装、文件传输、实时日志与 Shell。",
    tag: "桌面工具",
    url: "https://github.com/Rouarn/WireDeck",
  },
  {
    name: "DianMo",
    desc: "点墨：Android 单机离线场景的内存扫描与修改工具。Kotlin 悬浮窗 + C++ native 扫描器。",
    tag: "Android",
    url: "https://github.com/Rouarn/DianMo",
  },
  {
    name: "OnmyojiTools",
    desc: "阴阳师 Windows 工具：多开、窗口网格排列、声音跟随聚焦与一键关闭。",
    tag: "Windows",
    url: "https://github.com/Rouarn/OnmyojiTools",
  },
  {
    name: "SimpleBookkeeping",
    desc: "小绿记账 App：uni-app（Vue 3 + Pinia）前端，含深色模式、持久化与 App 在线更新。",
    tag: "移动应用",
    url: "https://github.com/Rouarn/SimpleBookkeeping",
  },
  {
    name: "SimpleBookkeepingService",
    desc: "小绿记账服务端：NestJS + MySQL + Redis，认证、账本、账单、分类统计与文件访问。",
    tag: "后端",
    url: "https://github.com/Rouarn/SimpleBookkeepingService",
  },
  {
    name: "TextChat",
    desc: "实时文本聊天：Vue 3 前端 + Express/Socket.IO 后端，支持昵称、在线列表与输入状态。",
    tag: "Web",
    url: "https://github.com/Rouarn/TextChat",
  },
  {
    name: "ImageCrawling",
    desc: "图片批量抓取工具：NestJS 后端 + React/AntD 前端，支持静态解析、无头浏览器、分页与并发下载。",
    tag: "工具",
    url: "https://github.com/Rouarn/ImageCrawling",
  },
  {
    name: "VakaoStaticHub",
    desc: "静态资源管理系统：多根目录文件、分片上传、分享、图片处理与 App 更新中心。",
    tag: "平台",
    url: "https://github.com/Rouarn/VakaoStaticHub",
  },
  {
    name: "VideoSpeedControl",
    desc: "浏览器扩展：为全网 HTML5 视频提供统一倍速控制与快捷键。",
    tag: "扩展",
    url: "https://github.com/Rouarn/VideoSpeedControl",
  },
  {
    name: "RequestInterceptorDebugger",
    desc: "浏览器扩展：请求捕获、过滤、Mock、改包、重定向与规则导入导出。",
    tag: "扩展",
    url: "https://github.com/Rouarn/RequestInterceptorDebugger",
  },
  {
    name: "RouarnIsle",
    desc: "我屿闲记：配置驱动的纯静态个人主页，Vue 3 + UnoCSS + animal-island-vue。",
    tag: "个人站",
    url: "https://github.com/Rouarn/RouarnIsle",
  },
  {
    name: "WoyuxiajiMsClient",
    desc: "我与夏季：Vue 3 + Vite + Pinia + GSAP 的个人主页。",
    tag: "个人站",
    url: "https://github.com/Rouarn/WoyuxiajiMsClient",
  },
  {
    name: "Woyuxiaji",
    desc: "我与夏季：个人主页的早期版本。",
    tag: "个人站",
    url: "https://github.com/Rouarn/Woyuxiaji",
  },
  {
    name: "WallpaperTool",
    desc: "壁纸工具：壁纸抓取与管理的个人项目。",
    tag: "工具",
    url: "https://github.com/Rouarn/WallpaperTool",
  },
  {
    name: "LocalSend",
    desc: "LocalSend 相关的个人项目。",
    tag: "实验",
    url: "https://github.com/Rouarn/LocalSend",
  },
  {
    name: "LocalSendWS",
    desc: "LocalSend WebSocket 相关的个人实验。",
    tag: "实验",
    url: "https://github.com/Rouarn/LocalSendWS",
  },
  {
    name: "HtmlCssDemo",
    desc: "HTML / CSS / JavaScript / jQuery / Vue 前端实例合集。",
    tag: "示例",
    url: "https://github.com/Rouarn/HtmlCssDemo",
  },
  {
    name: "SpecialGitHubIoAgPages",
    desc: "GitHub Pages 个人页面实验。",
    tag: "实验",
    url: "https://github.com/Rouarn/SpecialGitHubIoAgPages",
  },
];

const foundations = [
  {
    name: "FrontendTemplate",
    desc: "Vue 3 + Vite + TypeScript 前端模板，内置路由、权限、i18n 与主题。",
    tag: "模板",
    url: "https://github.com/Rouarn/FrontendTemplate",
  },
  {
    name: "NestjsTemplate",
    desc: "NestJS 企业级后端 API 模板，含认证、RBAC、文件服务与统一响应。",
    tag: "模板",
    url: "https://github.com/Rouarn/NestjsTemplate",
  },
  {
    name: "ElectronTemplate",
    desc: "基于 Vue 3 + Vite 的 Electron 开发模板。",
    tag: "模板",
    url: "https://github.com/Rouarn/ElectronTemplate",
  },
  {
    name: "BlogResetServer",
    desc: "博客重置版后端：认证、用户、文章、分类、文件、缓存与导入导出。",
    tag: "后端",
    url: "https://github.com/Rouarn/BlogResetServer",
  },
  {
    name: "BlogResetVersion",
    desc: "博客重置版前端：Vue 3 + Naive UI + md-editor-v3，含文章、归档、标签与用户中心。",
    tag: "前端",
    url: "https://github.com/Rouarn/BlogResetVersion",
  },
  {
    name: "VakaoAxios",
    desc: "VaKao axios 二次封装：统一信封、401 单飞刷新、重复请求取消与全局 loading。",
    tag: "库",
    url: "https://github.com/Rouarn/VakaoAxios",
  },
  {
    name: "VakaoScriptsUtils",
    desc: "VaKao 脚本工具库：终端颜色、图标、横幅、日志与常用工具函数。",
    tag: "库",
    url: "https://github.com/Rouarn/VakaoScriptsUtils",
  },
  {
    name: "VakaoSocketSystem",
    desc: "VaKao Socket 客户端：连接管理、自动重连、房间恢复、类型安全消息与错误出口。",
    tag: "库",
    url: "https://github.com/Rouarn/VakaoSocketSystem",
  },
  {
    name: "VakaoUI",
    desc: "基于 Vue 3 与 TypeScript 的现代化组件库。",
    tag: "库",
    url: "https://github.com/Rouarn/VakaoUI",
  },
];

useSeoMeta({
  title: "开源项目 — VaKao",
  description: "VaKao 的公开仓库：产品、工具、模板与前端基础设施。",
  ogTitle: "开源项目 — VaKao",
  ogDescription: "产品、工具、模板与前端基础设施。",
  ogImage: "/og/home.png",
  ogType: "website",
});
</script>

<template>
  <div>
    <section class="border-b border-line">
      <div class="frame px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <p class="hud text-accent-ink">OPEN SOURCE / 28 PUBLIC REPOS</p>
          <h1 class="display mt-6 text-[clamp(2.4rem,6vw,5rem)] text-strong">
            能用的东西，<br />也值得被看见。
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-muted">
            VaKao 的产品、工具、模板与内部基础设施现已公开。
            <span class="font-mono text-ink">Vakao-Platform</span>
            与少数含个人内容的仓库保持私有，其余仓库都可以在 GitHub 上直接查看、提 Issue 或 Fork。
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Rouarn"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              <Github :size="15" :stroke-width="1.5" />
              浏览 GitHub
            </a>
            <NuxtLink to="/projects" class="btn btn-ghost">
              查看项目档案
              <ArrowUpRight :size="15" :stroke-width="1.8" />
            </NuxtLink>
          </div>
        </Reveal>
      </div>
    </section>

    <section v-for="(group, groupIndex) in [
      { title: '产品与工具', label: 'PRODUCTS & TOOLS', items: products },
      { title: '模板与基础设施', label: 'FOUNDATIONS', items: foundations },
    ]" :key="group.title" :id="groupIndex === 0 ? 'products' : 'foundations'">
      <SectionBar
        :index="String(groupIndex + 1).padStart(2, '0')"
        :label="group.label"
        :meta="`${group.items.length} 个仓库`"
      />
      <div class="frame">
        <div class="border-t border-line">
          <Reveal
            v-for="(repo, index) in group.items"
            :key="repo.name"
            :delay="index * 30"
            class="group grid gap-3 border-b border-line px-6 py-6 md:grid-cols-12 md:items-baseline md:px-10"
          >
            <div class="md:col-span-4">
              <a
                :href="repo.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 font-mono text-sm text-strong transition-colors group-hover:text-accent-ink"
              >
                {{ repo.name }}
                <ArrowUpRight :size="13" :stroke-width="1.8" />
              </a>
              <p class="hud mt-2 text-faint">{{ repo.tag }}</p>
            </div>
            <p class="text-sm leading-7 text-muted md:col-span-8">{{ repo.desc }}</p>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="frame px-6 py-14 md:px-10 md:py-20">
        <p class="hud text-faint">A SMALL NOTE</p>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-muted">
          公开不等于没有边界。涉及真实账号、生产配置或个人资料的部分会留在私有仓库；公开仓库里的密钥、
          环境变量与设备信息在发布前已经清理。发现问题欢迎直接开 Issue。
        </p>
      </div>
    </section>
  </div>
</template>
