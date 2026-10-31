<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    delay?: number
    as?: string
  }>(),
  {
    delay: 0,
    as: 'div'
  }
)

const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  if (!el.value) return
  if (!('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true
          io.disconnect()
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  io.observe(el.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="{ '--reveal-delay': `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>
