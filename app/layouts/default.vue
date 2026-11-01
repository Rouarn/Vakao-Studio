<script setup lang="ts">
const { theme, toggle, ready } = useTheme();

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });
  (window as any).__vakaoLenis = lenis;
  let id = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    id = window.requestAnimationFrame(raf);
  };
  id = window.requestAnimationFrame(raf);

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(id);
    lenis.destroy();
    delete (window as any).__vakaoLenis;
  });
});
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
    <SiteRuler />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
