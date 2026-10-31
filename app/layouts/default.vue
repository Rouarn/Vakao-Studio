<script setup lang="ts">
const { theme, toggle, ready } = useTheme();
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-line-strong focus:bg-raised focus:px-4 focus:py-2 focus:text-sm"
    >
      跳到主要内容
    </a>
    <SiteNav :theme="theme" :theme-ready="ready" @toggle-theme="toggle" />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
