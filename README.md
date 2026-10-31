# VaKao 官网

> 把想法做成每天都在用的工具。

VaKao 团队官网：首页、项目档案、项目详情、关于与联系。纯静态站点，无后端、无数据库。

线上地址：<https://woyuxiaji.cn>

## 技术栈

- Nuxt 4.6.3（`nuxt generate` 静态生成）
- Vue 3.5.44 / Vue Router 5.4
- TypeScript 6.0.3
- Tailwind CSS 4.3.3（CSS-first `@theme` token）
- `@nuxt/content` 3.16.2（项目 Markdown）
- `@nuxtjs/seo` 6.0.1（sitemap / robots / schema）
- Three.js 0.187.0（仅首屏粒子星芒，桌面端懒加载）
- Node 24 LTS / pnpm 12

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # vue-tsc --noEmit
pnpm generate     # 输出 .output/public
pnpm preview
```

首次安装时，pnpm 12 可能要求批准构建脚本：

```bash
pnpm approve-builds --all
```

`pnpm-workspace.yaml` 已声明 `esbuild` 与 `better-sqlite3` 的构建许可；如果依赖升级触发发布年龄策略，按提示把对应版本加入 `minimumReleaseAgeExclude`。

## 目录结构

```text
app/
├── assets/css/main.css      # 设计 token 与全局样式
├── components/
│   ├── brand/StarMark.vue   # 四芒星 SVG
│   ├── hero/HeroStarfield.vue
│   ├── project/             # 项目卡片与视觉
│   └── site/                # 导航、页脚、章节条、主题
├── composables/useProjects.ts
├── layouts/default.vue
└── pages/
    ├── index.vue
    ├── projects/index.vue
    ├── projects/[slug].vue
    ├── about.vue
    ├── contact.vue
    └── 404.vue
content/projects/*.md        # 每个项目一个 Markdown
public/brand/                # favicon / PWA / 星芒
public/og/                   # 社交分享图
public/img/projects/         # 项目截图
```

## 内容维护

新增项目：在 `content/projects/` 新建 Markdown，frontmatter 至少包含：

```yaml
title: 项目名
slug: project-slug
tagline: 一句话
summary: 80–120 字
category: platform | desktop | mobile | extension | library
categoryLabel: 平台
status: active | maintained | paused | archived
statusLabel: 维护中
year: "2026"
accent: blue | orange | purple | yellow
featured: false
order: 8
```

页面会自动出现在 `/projects`；`featured: true` 且 `order` 前四的项目会出现在首页。

## 设计与资产

- 视觉：暖纸底、1px 栅格、编号章节、HUD 等宽小标签；四芒星四色作为项目强调色。
- 品牌图标：来自 `~/Pictures/favicon/四芒星-图标设计`（不随仓库分发原始 PSD）。
- 功能图标：Lucide（ISC）。
- 字体：Archivo / Inter / Instrument Serif（OFL），通过 Fontsource 自托管。
- 分享图：1200×630 PNG，位于 `public/og/`。

## 部署

站点是纯静态产物，可部署到任意静态托管或 Nginx：

```bash
pnpm generate
# 将 .output/public/ 上传到站点根目录
```

Nginx 需要：

- `index index.html;`
- 静态资源长缓存（`_nuxt/*` 带 hash，可 `max-age=31536000, immutable`）
- HTML 短缓存
- 自定义 `404.html`

生产环境的域名、证书、CDN 与服务器信息不包含在本仓库中。

## 许可证

代码以 MIT 许可证开源，见 [LICENSE](./LICENSE)。品牌名称、四芒星标志与项目截图归 VaKao 所有，不在 MIT 授权范围内。
