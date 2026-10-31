<script setup lang="ts">
import { ArrowLeft, ArrowUpRight } from "lucide-vue-next";

useSeoMeta({
  title: "页面不存在 — VaKao",
  description: "这个页面没有找到。",
});
</script>

<template>
  <section class="border-b border-line">
    <div class="frame">
      <div class="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
        <StarMark
          variant="four"
          :size="420"
          class="pointer-events-none absolute -right-20 -top-20 opacity-20"
        />
        <Reveal>
          <p class="hud text-faint">404 / NOT FOUND</p>
          <h1 class="display mt-6 max-w-3xl text-[clamp(2.8rem,7vw,5.4rem)] text-strong">
            这一页<br />没有找到。
          </h1>
          <p class="mt-6 max-w-xl text-base leading-8 text-muted">
            链接可能已经变了，或者这个项目还没有公开页面。可以回到项目列表，或者直接写邮件。
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <NuxtLink to="/projects" class="btn btn-primary">
              <ArrowLeft :size="15" :stroke-width="1.8" />
              项目列表
            </NuxtLink>
            <NuxtLink to="/" class="btn btn-ghost">
              回到首页
              <ArrowUpRight :size="15" :stroke-width="1.8" />
            </NuxtLink>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
