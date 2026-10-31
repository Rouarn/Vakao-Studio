<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

defineProps<{
  theme: "light" | "dark";
  ready: boolean;
}>();

defineEmits<{
  (e: "toggle-theme"): void;
}>();
</script>

<template>
  <button
    type="button"
    class="flex h-12 w-12 items-center justify-center border-l border-line text-muted transition-colors hover:bg-sunken hover:text-ink"
    :aria-label="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
    :title="theme === 'dark' ? '浅色主题' : '深色主题'"
    @click="$emit('toggle-theme')"
  >
    <ClientOnly>
      <Moon v-if="ready && theme === 'dark'" :size="16" :stroke-width="1.5" />
      <Sun v-else :size="16" :stroke-width="1.5" />
      <template #fallback>
        <Sun :size="16" :stroke-width="1.5" />
      </template>
    </ClientOnly>
  </button>
</template>
