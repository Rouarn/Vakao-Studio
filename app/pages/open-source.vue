<script setup lang="ts">
import { ArrowUpRight, Github } from "lucide-vue-next";

import { foundations, products } from "~/utils/openSource";

useSeoMeta({
  title: "开源项目 — VaKao",
  description: "VaKao 的公开仓库：产品、工具、模板与前端基础设施。",
  ogTitle: "开源项目 — VaKao",
  ogDescription: "产品、工具、模板与前端基础设施。",
  ogImage: "/og/open-source.png",
  ogType: "website",
});
</script>

<template>
  <div>
    <section class="border-b border-line">
      <div class="frame px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <p class="hud text-accent-ink">
            OPEN SOURCE / {{ products.length + foundations.length }} PUBLIC REPOS
          </p>
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

    <section
      v-for="(group, groupIndex) in [
        { title: '产品与工具', label: 'PRODUCTS & TOOLS', items: products },
        { title: '模板与基础设施', label: 'FOUNDATIONS', items: foundations },
      ]"
      :key="group.title"
      :id="groupIndex === 0 ? 'products' : 'foundations'"
    >
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
