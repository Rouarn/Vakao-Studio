<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types'

const props = defineProps<{
  project: Project
  index: number
}>()

const onPointer = (event: PointerEvent) => {
  const el = event.currentTarget as HTMLElement | null
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

const statusTone = computed(() => {
  if (props.project.status === 'active') return 'bg-emerald-500'
  if (props.project.status === 'maintained') return 'bg-[var(--proj)]'
  return 'bg-faint'
})
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group card spotlight flex flex-col border border-line bg-raised transition-colors duration-200 hover:border-line-strong"
    :class="`accent-${project.accent}`"
    @pointermove="onPointer"
  >
    <span class="card-accent" aria-hidden="true" />

    <div class="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
      <div class="flex items-center gap-3">
        <span class="hud text-faint">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="hud text-muted">{{ project.categoryLabel }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full" :class="statusTone" />
        <span class="hud text-faint">{{ project.statusLabel }}</span>
      </div>
    </div>

    <ProjectVisual :slug="project.slug" :accent="project.accent" />

    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="display text-2xl text-strong transition-colors group-hover:text-[var(--proj-ink)] sm:text-[1.75rem]">
            {{ project.title }}
          </h3>
          <p v-if="project.titleEn" class="hud mt-2 text-faint">{{ project.titleEn }}</p>
        </div>
        <ArrowUpRight
          :size="20"
          :stroke-width="1.5"
          class="mt-1 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--proj-ink)]"
        />
      </div>

      <p class="mt-3 text-sm leading-6 text-muted">{{ project.tagline }}</p>

      <div class="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <span
          v-for="tag in project.stack.slice(0, 3)"
          :key="tag"
          class="border border-line px-2 py-1 font-mono text-[10px] tracking-wide text-faint"
        >
          {{ tag }}
        </span>
        <span class="ml-auto font-mono text-[10px] tracking-wide text-faint">{{ project.year }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
}

.card-accent {
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 2;
  height: 2px;
  background: var(--proj);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card-accent,
.card:focus-within .card-accent {
  transform: scaleX(1);
}
</style>
