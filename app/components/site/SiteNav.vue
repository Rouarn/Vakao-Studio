<script setup lang="ts">
import { ArrowUpRight, Github, Menu, X } from "lucide-vue-next";

defineProps<{
  theme: "light" | "dark";
  themeReady: boolean;
}>();

defineEmits<{
  (e: "toggle-theme"): void;
}>();

const route = useRoute();
const open = ref(false);

const links = [
  { label: "项目", to: "/projects" },
  { label: "开源", to: "/open-source" },
  { label: "团队", to: "/about" },
  { label: "联系", to: "/contact" },
];

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`);

const close = () => {
  open.value = false;
};

watch(
  () => route.path,
  () => close(),
);

watch(open, (value) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = value ? "hidden" : "";
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = "";
});

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
    <div class="frame flex h-12 items-stretch justify-between">
      <div class="flex min-w-0 items-stretch">
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 border-r border-line px-4 transition-opacity hover:opacity-70 sm:px-5"
          aria-label="VaKao 首页"
          @click="close"
        >
          <StarMark variant="four" :size="18" />
          <span class="display-en text-[19px] font-medium text-strong">VaKao</span>
        </NuxtLink>

        <nav aria-label="主导航" class="hidden items-stretch lg:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="hud group flex h-full items-center px-2.5 whitespace-nowrap"
            :class="isActive(link.to) ? 'text-ink' : 'text-muted hover:text-ink'"
          >
            <span
              class="px-2 py-1 transition-colors"
              :class="isActive(link.to) ? 'bg-ink text-paper' : 'group-hover:bg-sunken'"
            >
              {{ link.label }}
            </span>
          </NuxtLink>
        </nav>
      </div>

      <div class="flex shrink-0 items-stretch">
        <a
          href="https://github.com/Rouarn"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden items-center gap-2 border-l border-line px-4 text-muted transition-colors hover:bg-sunken hover:text-ink sm:flex"
          aria-label="VaKao GitHub"
        >
          <Github :size="15" :stroke-width="1.5" />
          <span class="hud hidden xl:inline">GitHub</span>
        </a>

        <ThemeToggle :theme="theme" :ready="themeReady" @toggle-theme="$emit('toggle-theme')" />

        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center border-l border-line text-ink lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="打开菜单"
          @click="open = !open"
        >
          <X v-if="open" :size="18" :stroke-width="1.5" />
          <Menu v-else :size="18" :stroke-width="1.5" />
        </button>
      </div>
    </div>
  </header>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="open"
      id="mobile-nav"
      class="fixed inset-x-0 top-12 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
    >
      <div class="frame flex min-h-full flex-col">
        <nav aria-label="移动端导航" class="flex flex-col border-b border-line">
          <NuxtLink
            v-for="(link, index) in links"
            :key="link.to"
            :to="link.to"
            class="group flex items-center justify-between border-b border-line px-6 py-6 last:border-b-0"
            @click="close"
          >
            <span class="flex items-baseline gap-4">
              <span class="hud text-faint">0{{ index + 1 }}</span>
              <span class="display text-3xl">{{ link.label }}</span>
            </span>
            <ArrowUpRight
              :size="20"
              :stroke-width="1.5"
              class="text-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
            />
          </NuxtLink>
        </nav>
        <div class="px-6 py-8">
          <p class="hud text-faint">CONTACT</p>
          <a class="link-underline mt-3 block text-lg" href="mailto:robot01@woyuxiaji.cn">
            robot01@woyuxiaji.cn
          </a>
          <a
            class="link-underline mt-2 block text-lg"
            href="https://github.com/Rouarn"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Rouarn
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>
