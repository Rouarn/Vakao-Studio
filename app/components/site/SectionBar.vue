<script setup lang="ts">
defineProps<{
  index: string;
  label: string;
  meta?: string;
}>();
</script>

<template>
  <div class="section-bar">
    <div class="frame section-bar__inner">
      <p class="hud text-muted">
        <span class="text-faint">{{ index }}</span>
        <span class="mx-2 text-faint">/</span>{{ label }}
      </p>
      <p v-if="meta" class="hud hidden text-faint sm:block">{{ meta }}</p>
    </div>
  </div>
</template>
