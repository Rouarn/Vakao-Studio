<script setup lang="ts">
import { ArrowUpRight, Github } from "lucide-vue-next";

const values = [
  {
    title: "先能跑，再好看",
    copy: "一个能部署、能回滚的版本，比一张漂亮的静态图更重要。视觉是在可用的基础上做加法。",
  },
  {
    title: "边界写进代码",
    copy: "权限、错误、限流、降级，应该在实现里被处理，而不是写在文档里等下一个人的自觉。",
  },
  {
    title: "部署是功能的一部分",
    copy: "从第一天就考虑构建、配置、回滚与日志。能不能发出去，和能不能写出来同样重要。",
  },
];

const stack = [
  { group: "前端", items: ["Vue 3", "Nuxt", "TypeScript", "Tailwind CSS", "uni-app"] },
  { group: "后端", items: ["GoFrame", "NestJS", "Node.js", "MySQL", "Redis", "SQLite"] },
  { group: "桌面与移动", items: ["Wails", "Go", "Kotlin", "Android", "C++"] },
  { group: "工程", items: ["pnpm", "Vite", "Docker", "Nginx", "GitHub Actions"] },
];

useSeoMeta({
  title: "关于 — VaKao",
  description: "VaKao 是一个远程协作的小团队，做 Web 平台、桌面工具、移动应用与开源库。",
  ogTitle: "关于 VaKao",
  ogDescription: "小团队，但不做小东西。",
  ogImage: "/og/about.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <section class="border-b border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-24">
          <Reveal>
            <p class="hud text-faint">ABOUT / THE TEAM</p>
            <h1 class="display mt-6 max-w-4xl text-[clamp(2.8rem,6.5vw,5.4rem)] text-strong">
              小团队，<br />但不做小东西。
            </h1>
            <p class="mt-7 max-w-2xl text-lg leading-8 text-ink">
              VaKao 是一个远程协作的小团队。我们做产品，也做支撑产品的工具。
            </p>
            <p class="mt-4 max-w-2xl text-base leading-8 text-muted">
              需要平台就写后端，需要效率就写扩展，需要发布就写更新服务。大多数项目不是从“接一个需求”开始，而是从“这件事每天在烦我们”开始。
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <section>
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-4">
            <Reveal>
              <p class="hud text-faint">01 / PRINCIPLES</p>
              <h2 class="display mt-5 text-[clamp(2rem,4vw,3rem)] text-strong">三条原则。</h2>
            </Reveal>
          </div>
          <div class="md:col-span-8">
            <div class="border-t border-line">
              <Reveal
                v-for="(value, index) in values"
                :key="value.title"
                :delay="index * 60"
                class="grid gap-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr]"
              >
                <span class="hud text-faint">0{{ index + 1 }}</span>
                <div>
                  <h3 class="font-display text-xl font-semibold text-strong">{{ value.title }}</h3>
                  <p class="mt-2 max-w-2xl text-sm leading-7 text-muted">{{ value.copy }}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <Reveal>
            <p class="hud text-faint">02 / STACK</p>
            <h2 class="display mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)] text-strong">
              工具会换，<span class="serif-accent text-accent-ink">标准</span>不换。
            </h2>
          </Reveal>

          <div class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <Reveal
              v-for="(group, index) in stack"
              :key="group.group"
              :delay="index * 50"
              class="bg-raised p-6"
            >
              <p class="hud text-faint">{{ group.group }}</p>
              <ul class="mt-4 space-y-2">
                <li v-for="item in group.items" :key="item" class="font-mono text-xs text-muted">
                  {{ item }}
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-7">
            <Reveal>
              <p class="hud text-faint">03 / THIS SITE</p>
              <h2 class="display mt-5 text-[clamp(2rem,4vw,3rem)] text-strong">
                这个站点也是作品。
              </h2>
              <p class="mt-5 max-w-xl text-sm leading-7 text-muted">
                官网用 Nuxt 4 静态生成，Tailwind CSS 负责设计系统，Three.js
                只用在首屏粒子星芒上。没有后端，没有数据库，部署是一组静态文件。
              </p>
              <p class="mt-3 max-w-xl text-sm leading-7 text-muted">
                它和团队的其他项目一样：结构公开、构建可复现、内容用 Markdown 维护。
              </p>
            </Reveal>
          </div>
          <div class="md:col-span-5">
            <Reveal :delay="100" class="border border-line bg-raised p-6">
              <div class="flex items-center justify-between gap-4">
                <StarMark variant="four" :size="34" />
                <span class="hud text-faint">OPEN SOURCE</span>
              </div>
              <p class="mt-6 text-sm leading-7 text-muted">
                站点源码公开在 GitHub，包含设计 token、页面模板与构建配置。
              </p>
              <a
                href="https://github.com/Rouarn/vakao-website"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ghost mt-6 w-full"
              >
                <Github :size="15" :stroke-width="1.5" />
                查看源码
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="frame">
        <div
          class="flex flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-10"
        >
          <p class="text-sm text-muted">想聊聊某个项目，或者一起做点新的？</p>
          <NuxtLink
            to="/contact"
            class="hud link-underline inline-flex items-center gap-1.5 text-ink"
          >
            联系团队
            <ArrowUpRight :size="13" :stroke-width="1.8" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
