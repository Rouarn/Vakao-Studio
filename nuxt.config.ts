import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-31',
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxtjs/seo'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  site: {
    url: 'https://woyuxiaji.cn',
    name: 'VaKao',
    description: 'VaKao 是一个做 Web 平台、桌面工具与移动应用的小团队。把想法做成每天都在用的工具。',
    defaultLocale: 'zh-CN'
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/brand/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/brand/favicon-32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/brand/favicon-light.ico', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/x-icon', href: '/brand/favicon-dark.ico', media: '(prefers-color-scheme: dark)' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/brand/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'theme-color', content: '#f3f1ec', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#121210', media: '(prefers-color-scheme: dark)' }
      ],
      script: [
        {
          tagPosition: 'head',
          tagPriority: 'critical',
          innerHTML: `(function(){try{var t=localStorage.getItem('vakao-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}try{if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('is-reveal-ready');}}catch(e){}})();`
        }
      ]
    }
  },
  content: {
    build: {
      markdown: {
        highlight: { theme: 'github-light' }
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/', '/projects', '/about', '/contact', '/404']
    }
  },
  routeRules: {
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  }
})
