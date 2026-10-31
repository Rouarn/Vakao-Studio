<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const projects = await useProjects()
const route = useRoute()
const router = useRouter()

const filters = [
  { value: 'all', label: '全部' },
  { value: 'platform', label: '平台' },
  { value: 'desktop', label: '桌面' },
  { value: 'mobile', label: '移动' },
  { value: 'extension', label: '扩展' },
  { value: 'library', label: '开源库' }
]

const active = computed(() => {
  const type = route.query.type
  return typeof type === 'string' && filters.some((item) => item.value === type) ? type : 'all'
})

const filtered = computed(() => {
  if (active.value === 'all') return projects.value
  return projects.value.filter((project) => project.category === active.value)
})

const setType = (type: string) => {
  router.push({ query: type === 'all' ? {} : { type } })
}

useSeoMeta({
  title: '项目 — VaKao',
  description: 'VaKao 的作品档案：兰台、静态资源中心、点墨、WireDeck，以及浏览器扩展与内部开源库。',
  ogTitle: '项目 — VaKao',
  ogDescription: '平台、桌面、移动、扩展与开源库。',
  ogImage: '/og/projects.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <section class="border-b border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <Reveal>
            <p class="hud text-faint">PROJECTS / ARCHIVE</p>
            <h1 class="display mt-6 max-w-3xl text-[clamp(2.8rem,6vw,4.8rem)] text-strong">
              作品档案<span class="serif-accent text-accent-ink">.</span>
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-8 text-muted">
              平台、工具、移动、桌面与扩展。每一个都从一个具体问题开始，而不是从“做一个官网”开始。
            </p>
          </Reveal>

          <Reveal :delay="100">
            <div class="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-5">
              <button
                v-for="filter in filters"
                :key="filter.value"
                type="button"
                class="hud border px-3 py-2 transition-colors"
                :class="
                  active === filter.value
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink'
                "
                :aria-pressed="active === filter.value"
                @click="setType(filter.value)"
              >
                {{ filter.label }}
              </button>
              <span class="hud ml-auto text-faint">{{ String(filtered.length).padStart(2, '0') }} ITEMS</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section>
      <div class="frame">
        <div class="px-6 py-12 md:px-10 md:py-16">
          <div v-if="filtered.length" class="grid gap-4 md:grid-cols-2">
            <Reveal v-for="(project, index) in filtered" :key="project.slug" :delay="index * 50">
              <ProjectCard :project="project" :index="index" />
            </Reveal>

            <Reveal :delay="filtered.length * 50" class="md:col-span-2">
              <NuxtLink
                to="/contact"
                class="group flex h-full flex-col justify-between gap-8 border border-line bg-raised p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <div class="flex items-center justify-between gap-4">
                  <span class="hud text-faint">MORE / INTERNAL</span>
                  <StarMark variant="four" :size="30" />
                </div>
                <div>
                  <h2 class="display max-w-xl text-3xl text-strong sm:text-4xl">
                    还有更多在内部使用。
                  </h2>
                  <p class="mt-4 max-w-xl text-sm leading-7 text-muted">
                    兰台与静态资源中心是内部平台，演示需要单独沟通。也有几个还没到公开阶段的实验。
                  </p>
                </div>
                <span class="hud inline-flex items-center gap-1.5 text-ink">
                  聊聊
                  <ArrowUpRight :size="13" :stroke-width="1.8" />
                </span>
              </NuxtLink>
            </Reveal>
          </div>

          <div v-else class="border border-line px-6 py-16 text-center">
            <p class="display text-2xl text-strong">这个分类还没有项目。</p>
            <button type="button" class="btn btn-ghost mt-6" @click="setType('all')">
              查看全部
              <ArrowUpRight :size="15" :stroke-width="1.8" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="frame">
        <div class="flex flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p class="text-sm text-muted">想聊某个项目的实现细节，或者一起做点新的？</p>
          <a href="mailto:robot01@woyuxiaji.cn" class="hud link-underline inline-flex items-center gap-1.5 text-ink">
            写邮件
            <ArrowUpRight :size="13" :stroke-width="1.8" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
