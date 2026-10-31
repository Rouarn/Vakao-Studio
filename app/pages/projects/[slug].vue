<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Github, Download, ExternalLink, FileText } from 'lucide-vue-next'
import type { Project } from '~/types'

const route = useRoute()
const all = await useProjects()

const { data: project } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects').path(route.path).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: '项目不存在', fatal: true })
}

const current = computed(() => project.value as unknown as Project)

const related = computed(() => {
  const slugs = current.value.related ?? []
  return slugs
    .map((slug) => all.value.find((item) => item.slug === slug))
    .filter((item): item is Project => Boolean(item))
})

const currentIndex = computed(() => all.value.findIndex((item) => item.slug === current.value.slug))
const next = computed(() => {
  if (all.value.length < 2) return null
  return all.value[(currentIndex.value + 1) % all.value.length]
})

const links = computed(() => {
  const entries: { label: string; href: string; icon: unknown }[] = []
  const value = current.value.links
  if (value.site) entries.push({ label: '访问站点', href: value.site, icon: ExternalLink })
  if (value.download) entries.push({ label: '下载', href: value.download, icon: Download })
  if (value.github) entries.push({ label: 'GitHub', href: value.github, icon: Github })
  if (value.docs) entries.push({ label: '文档', href: value.docs, icon: FileText })
  return entries
})

const statusTone = computed(() => {
  if (current.value.status === 'active') return 'bg-emerald-500'
  if (current.value.status === 'maintained') return 'bg-[var(--proj)]'
  if (current.value.status === 'paused') return 'bg-amber-500'
  return 'bg-faint'
})

useSeoMeta({
  title: `${current.value.title} — VaKao`,
  description: current.value.summary,
  ogTitle: `${current.value.title} — ${current.value.tagline}`,
  ogDescription: current.value.summary,
  ogImage: `/og/${current.value.slug}.png`,
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: current.value.title,
        applicationCategory: current.value.categoryLabel,
        operatingSystem: current.value.platforms.join(', '),
        description: current.value.summary,
        url: `https://woyuxiaji.cn/projects/${current.value.slug}`,
        author: { '@type': 'Organization', name: 'VaKao', url: 'https://woyuxiaji.cn' }
      })
    }
  ]
})
</script>

<template>
  <div :class="`accent-${current.accent}`">
    <section class="border-b border-line">
      <div class="frame">
        <div class="px-6 pt-8 md:px-10">
          <NuxtLink
            to="/projects"
            class="hud inline-flex items-center gap-2 text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft :size="13" :stroke-width="1.8" />
            项目 / 全部
          </NuxtLink>
        </div>

        <div class="grid gap-10 px-6 py-10 md:grid-cols-12 md:px-10 md:py-16">
          <div class="md:col-span-7">
            <Reveal>
              <div class="flex flex-wrap items-center gap-3">
                <span class="hud text-[var(--proj-ink)]">{{ current.categoryLabel }}</span>
                <span class="h-1 w-1 rounded-full bg-line-strong" />
                <span class="hud text-faint">{{ current.year }}</span>
                <span class="ml-auto flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full" :class="statusTone" />
                  <span class="hud text-faint">{{ current.statusLabel }}</span>
                </span>
              </div>

              <h1 class="display mt-6 text-[clamp(3rem,7vw,5.4rem)] text-strong">
                {{ current.title }}
              </h1>
              <p class="serif-accent mt-3 text-2xl text-[var(--proj-ink)] sm:text-3xl">
                {{ current.titleEn }}
              </p>
              <p class="mt-6 max-w-xl text-lg leading-8 text-ink">{{ current.tagline }}</p>
              <p class="mt-4 max-w-xl text-sm leading-7 text-muted">{{ current.summary }}</p>

              <div class="mt-8 flex flex-wrap gap-3">
                <a
                  v-for="link in links"
                  :key="link.label"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn"
                  :class="link.label === '访问站点' ? 'btn-primary' : 'btn-ghost'"
                >
                  <component :is="link.icon" :size="15" :stroke-width="1.6" />
                  {{ link.label }}
                </a>
                <a v-if="!links.length" href="mailto:robot01@woyuxiaji.cn" class="btn btn-ghost">
                  私有项目，联系演示
                  <ArrowUpRight :size="15" :stroke-width="1.8" />
                </a>
              </div>
            </Reveal>
          </div>

          <div class="md:col-span-5">
            <Reveal :delay="100" class="border border-line bg-raised p-3">
              <ProjectVisual :slug="current.slug" :accent="current.accent" />
            </Reveal>
          </div>
        </div>

        <div class="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          <div class="border-b border-line px-6 py-5 sm:border-r lg:border-b-0 md:px-10">
            <p class="hud text-faint">角色</p>
            <p class="mt-2 text-sm text-ink">{{ current.role || '—' }}</p>
          </div>
          <div class="border-b border-line px-6 py-5 sm:px-6 lg:border-b-0 lg:border-r">
            <p class="hud text-faint">平台</p>
            <p class="mt-2 text-sm text-ink">{{ current.platforms.join(' / ') || '—' }}</p>
          </div>
          <div class="border-b border-line px-6 py-5 sm:border-r lg:border-b-0 lg:px-6">
            <p class="hud text-faint">周期</p>
            <p class="mt-2 text-sm text-ink">{{ current.year }}</p>
          </div>
          <div class="px-6 py-5 md:px-10 lg:px-6">
            <p class="hud text-faint">技术栈</p>
            <p class="mt-2 truncate text-sm text-ink" :title="current.stack.join(' / ')">
              {{ current.stack.slice(0, 3).join(' / ') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="frame">
        <div class="grid gap-12 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-8">
            <ContentRenderer v-if="project" :value="project" class="prose-vakao" />
          </div>

          <aside class="md:col-span-3 md:col-start-10">
            <div class="border-t border-line pt-5">
              <p class="hud text-faint">SPEC / 档案</p>
              <dl class="mt-5 space-y-4 text-sm">
                <div>
                  <dt class="hud text-faint">状态</dt>
                  <dd class="mt-1 flex items-center gap-2 text-ink">
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusTone" />
                    {{ current.statusLabel }}
                  </dd>
                </div>
                <div>
                  <dt class="hud text-faint">平台</dt>
                  <dd class="mt-1 text-ink">{{ current.platforms.join(' / ') || '—' }}</dd>
                </div>
                <div>
                  <dt class="hud text-faint">周期</dt>
                  <dd class="mt-1 text-ink">{{ current.year }}</dd>
                </div>
                <div>
                  <dt class="hud text-faint">角色</dt>
                  <dd class="mt-1 text-ink">{{ current.role || '—' }}</dd>
                </div>
              </dl>

              <p class="hud mt-8 text-faint">STACK</p>
              <ul class="mt-3 flex flex-wrap gap-2">
                <li
                  v-for="tag in current.stack"
                  :key="tag"
                  class="border border-line px-2 py-1 font-mono text-[10px] tracking-wide text-muted"
                >
                  {{ tag }}
                </li>
              </ul>

              <div v-if="current.metrics.length" class="mt-8 border-t border-line pt-5">
                <p class="hud text-faint">QUICK FACTS</p>
                <dl class="mt-4 space-y-3">
                  <div v-for="metric in current.metrics" :key="metric.label" class="flex items-baseline justify-between gap-3">
                    <dt class="text-xs text-muted">{{ metric.label }}</dt>
                    <dd class="font-display text-lg font-semibold text-strong">{{ metric.value }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="current.features.length" class="border-t border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <Reveal>
            <p class="hud text-faint">02 / CAPABILITIES</p>
            <h2 class="display mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)] text-strong">它能做什么。</h2>
          </Reveal>
          <div class="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            <Reveal
              v-for="(feature, index) in current.features"
              :key="feature.title"
              :delay="index * 50"
              class="border-b border-line py-6 sm:border-r sm:px-6 lg:[&:nth-child(3n)]:border-r-0"
            >
              <p class="hud text-faint">0{{ index + 1 }}</p>
              <h3 class="mt-3 font-display text-lg font-semibold text-strong">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-muted">{{ feature.description }}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="border-t border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="hud text-faint">03 / RELATED</p>
              <h2 class="display mt-5 text-[clamp(2rem,4vw,3rem)] text-strong">相关的项目。</h2>
            </div>
            <NuxtLink to="/projects" class="hud link-underline hidden text-muted hover:text-ink sm:block">
              全部项目
            </NuxtLink>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <ProjectCard
              v-for="(item, index) in related"
              :key="item.slug"
              :project="item"
              :index="index"
            />
          </div>
        </div>
      </div>
    </section>

    <section v-if="next" class="border-t border-line">
      <div class="frame">
        <NuxtLink
          :to="`/projects/${next.slug}`"
          class="group flex flex-col gap-4 px-6 py-10 transition-colors hover:bg-sunken sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-14"
        >
          <div>
            <p class="hud text-faint">NEXT PROJECT</p>
            <p class="display mt-3 text-3xl text-strong transition-colors group-hover:text-[var(--proj-ink)] sm:text-4xl">
              {{ next.title }}
            </p>
          </div>
          <ArrowUpRight
            :size="28"
            :stroke-width="1.4"
            class="text-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
          />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
