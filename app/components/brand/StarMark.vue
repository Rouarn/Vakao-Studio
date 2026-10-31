<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'mono' | 'four'
    size?: number | string
    spin?: boolean
    label?: string
  }>(),
  {
    variant: 'mono',
    size: 24,
    spin: false,
    label: ''
  }
)

const petal =
  'M 1024.000 1024.000 C 1024.000 1024.000 718.150 718.150 718.150 718.150 C 855.936 508.605 957.886 282.875 1024.000 40.960 C 1090.114 282.875 1192.064 508.605 1329.850 718.150 C 1329.850 718.150 1024.000 1024.000 1024.000 1024.000 Z'
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 2048 2048"
    class="star-mark"
    :class="{ 'star-slow': spin }"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <g v-if="variant === 'mono'" fill="currentColor">
      <path :d="petal" />
      <path :d="petal" transform="rotate(90 1024 1024)" />
      <path :d="petal" transform="rotate(180 1024 1024)" />
      <path :d="petal" transform="rotate(270 1024 1024)" />
    </g>
    <g v-else stroke-width="3">
      <path :d="petal" fill="#F0995F" stroke="#F0995F" />
      <path :d="petal" transform="rotate(90 1024 1024)" fill="#5FBEDC" stroke="#5FBEDC" />
      <path :d="petal" transform="rotate(180 1024 1024)" fill="#A27FC2" stroke="#A27FC2" />
      <path :d="petal" transform="rotate(270 1024 1024)" fill="#EDDF55" stroke="#EDDF55" />
    </g>
  </svg>
</template>
