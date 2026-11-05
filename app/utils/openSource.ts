export interface RepoEntry {
  name: string;
  desc: string;
  tag: string;
  url: string;
}

export const products: RepoEntry[] = [
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

export const foundations: RepoEntry[] = [
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
    name: "Wails3Template",
    desc: "基于 Wails v3 + Go + Vue 3 + Vite+ 的桌面应用模板，Go 契约直接生成前端类型。",
    tag: "模板",
    url: "https://github.com/Rouarn/Wails3Template",
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
