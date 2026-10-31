<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-line">
    <div class="frame">
      <div class="grid gap-12 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <StarMark variant="four" :size="26" />
            <span class="display-en text-3xl font-medium text-strong">VaKao</span>
          </div>
          <p class="mt-6 max-w-sm text-sm leading-7 text-muted">
            把想法做成每天都在用的工具。一个小团队，做 Web 平台、桌面工具、移动应用与开源库。
          </p>
          <a
            class="link-underline mt-6 inline-block text-sm text-ink"
            href="mailto:robot01@woyuxiaji.cn"
          >
            robot01@woyuxiaji.cn
          </a>
        </div>

        <div class="md:col-span-2">
          <p class="hud text-faint">项目</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <NuxtLink class="text-muted hover:text-ink" to="/projects/lantai">兰台</NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-muted hover:text-ink" to="/projects/static-hub"
                >静态资源中心</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="text-muted hover:text-ink" to="/projects/dianmo">点墨</NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-muted hover:text-ink" to="/projects/wiredeck"
                >WireDeck</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <p class="hud text-faint">更多</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink class="text-muted hover:text-ink" to="/projects">全部项目</NuxtLink></li>
            <li><NuxtLink class="text-muted hover:text-ink" to="/about">关于团队</NuxtLink></li>
            <li><NuxtLink class="text-muted hover:text-ink" to="/contact">联系</NuxtLink></li>
            <li>
              <a
                class="text-muted hover:text-ink"
                href="https://github.com/Rouarn"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-3">
          <p class="hud text-faint">说明</p>
          <p class="mt-5 text-sm leading-7 text-muted">
            本站为静态站点，内容与代码公开。项目截图中的账号、地址与令牌均已打码。
          </p>
          <a
            class="link-underline mt-4 inline-flex items-center gap-1 text-sm text-ink"
            href="https://github.com/Rouarn/Vakao-Studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看本站源码
          </a>
        </div>
      </div>

      <div
        class="flex flex-col gap-3 border-t border-line px-6 py-5 text-faint sm:flex-row sm:items-center sm:justify-between md:px-10"
      >
        <p class="hud">© {{ year }} VaKao · 把想法做成工具</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            class="hud hover:text-ink"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            豫ICP备2026046995号-1
          </a>
          <NuxtLink class="hud hover:text-ink" to="/about">关于</NuxtLink>
          <a
            class="hud hover:text-ink"
            href="https://github.com/Rouarn/Vakao-Studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN SOURCE
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
