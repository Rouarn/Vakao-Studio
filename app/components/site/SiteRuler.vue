<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

type SectionDef = {
  id: string;
  number: string;
  label: string;
};

type SectionStat = SectionDef & {
  top: number;
  opacity: number;
  active: boolean;
};

const sections: SectionDef[] = [
  { id: "top", number: "00", label: "INDEX" },
  { id: "work", number: "01", label: "SELECTED WORK" },
  { id: "capabilities", number: "02", label: "CAPABILITIES" },
  { id: "method", number: "03", label: "METHOD" },
  { id: "open-source", number: "04", label: "OPEN SOURCE" },
  { id: "about", number: "05", label: "TEAM" },
  { id: "contact-cta", number: "06", label: "GET STARTED" },
];

const rail = ref<HTMLElement | null>(null);
const ready = ref(false);
const hovered = ref(false);
const progress = ref(0);
const maxScroll = ref(1);
const stats = ref<SectionStat[]>([]);
const ticks = Array.from({ length: 101 }, (_, i) => i);
const tickLabel = (v: number) => v % 5 === 0;
const progressLabel = computed(() => `${Math.round(progress.value * 100)}%`);
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let frame = 0;

function update() {
  if (typeof window === "undefined") return;
  frame = 0;
  const doc = document.documentElement;
  maxScroll.value = Math.max(1, doc.scrollHeight - window.innerHeight);
  progress.value = Math.min(1, Math.max(0, window.scrollY / maxScroll.value));

  const marker = window.scrollY + window.innerHeight * 0.32;
  let active = 0;
  const found = sections.map((section, index) => {
    const el = document.getElementById(section.id);
    const offset = el?.offsetTop ?? 0;
    if (offset <= marker) active = index;
    const top = el ? ((offset + 56 - window.scrollY) / window.innerHeight) * 100 : 0;
    return { ...section, top, opacity: top > -12 && top < 112 ? 1 : 0, active: false };
  });
  stats.value = found.map((item, index) => {
    if (index === active) {
      return { ...item, top: Math.min(92, Math.max(8, item.top)), opacity: 1, active: true };
    }
    return { ...item, active: false };
  });
}

function schedule() {
  if (!frame) frame = window.requestAnimationFrame(update);
}

function goPercent(value: number) {
  const target = Math.max(0, Math.min(1, value));
  window.scrollTo({
    top: target * maxScroll.value,
    behavior: reducedMotion() ? "auto" : "smooth",
  });
}

function onRailClick(event: MouseEvent) {
  const el = rail.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  goPercent((event.clientY - rect.top) / rect.height);
}

function onRailKey(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    goPercent(progress.value + 0.02);
  } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    goPercent(progress.value - 0.02);
  } else if (event.key === "Home") {
    event.preventDefault();
    goPercent(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goPercent(1);
  }
}

function goSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: Math.max(0, el.offsetTop - 58),
    behavior: reducedMotion() ? "auto" : "smooth",
  });
}

onMounted(async () => {
  await nextTick();
  update();
  ready.value = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) window.cancelAnimationFrame(frame);
});
</script>

<template>
  <template v-if="ready">
    <!-- Moving section labels, right-aligned to the left of the ruler. -->
    <div class="ruler-labels" aria-hidden="false">
      <button
        v-for="item in stats"
        :key="item.id"
        type="button"
        class="ruler-label"
        :class="{ 'is-active': item.active, 'is-ghost': !item.opacity }"
        :style="{ top: `${item.top}%` }"
        :aria-label="`跳转到 ${item.label}`"
        @click="goSection(item.id)"
      >
        <span class="ruler-label__num">{{ item.number }}</span>
        <span class="ruler-label__text">{{ item.label }}</span>
      </button>
    </div>

    <!-- Fixed ruler rail. -->
    <nav class="ruler-rail" aria-label="页面进度">
      <div
        ref="rail"
        class="ruler-hit"
        role="slider"
        tabindex="0"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(progress * 100)"
        aria-label="滚动页面进度"
        aria-orientation="vertical"
        @click="onRailClick"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @keydown="onRailKey"
      >
        <span class="ruler-line" aria-hidden="true" />
        <span
          class="ruler-fill"
          aria-hidden="true"
          :style="{ height: `${progress * 100}%` }"
        />
        <span class="ruler-needle" aria-hidden="true" :style="{ top: `${progress * 100}%` }">
          <span class="ruler-needle__dot" />
          <span class="ruler-needle__line" />
        </span>

        <span
          v-for="tick in ticks"
          :key="tick"
          class="ruler-tick"
          :class="{ 'is-major': tickLabel(tick) }"
          :style="{ top: `${tick}%` }"
          aria-hidden="true"
        />
        <span
          v-for="tick in ticks"
          v-show="tickLabel(tick)"
          :key="`n-${tick}`"
          class="ruler-num"
          :style="{ top: `${tick}%` }"
          aria-hidden="true"
        >
          {{ tick }}
        </span>
        <span class="ruler-percent" :class="{ 'is-hovered': hovered }" aria-hidden="true">
          {{ progressLabel }}
        </span>
      </div>
    </nav>
  </template>
</template>

<style scoped>
.ruler-rail {
  position: fixed;
  z-index: 42;
  top: 3rem;
  right: 0;
  bottom: 0;
  width: 78px;
  display: none;
  pointer-events: none;
}

.ruler-hit {
  position: absolute;
  inset: 0;
  pointer-events: auto;
  cursor: ns-resize;
  outline: none;
}

.ruler-hit:focus-visible {
  box-shadow: inset 0 0 0 1px var(--color-accent);
}

.ruler-line {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: var(--color-line-strong);
}

.ruler-fill {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-orange),
    var(--color-blue),
    var(--color-purple),
    var(--color-yellow)
  );
  opacity: 0.9;
}

.ruler-tick {
  position: absolute;
  right: 0;
  width: 6px;
  height: 1px;
  background: var(--color-line-strong);
  transition: width 180ms ease, opacity 180ms ease;
}

.ruler-tick.is-major {
  width: 13px;
  background: var(--color-muted);
}

.ruler-hit:hover .ruler-tick {
  width: 11px;
}

.ruler-hit:hover .ruler-tick.is-major {
  width: 20px;
}

.ruler-num {
  position: absolute;
  right: 22px;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 8px;
  line-height: 1;
  color: var(--color-faint);
  letter-spacing: 0.08em;
  transition: opacity 180ms ease;
}

.ruler-hit:hover .ruler-num {
  color: var(--color-muted);
}

.ruler-needle {
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: none;
}

.ruler-needle__dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-paper);
}

.ruler-needle__line {
  position: absolute;
  right: 7px;
  width: 22px;
  height: 1px;
  background: var(--color-accent);
}

.ruler-percent {
  position: absolute;
  right: 14px;
  bottom: 8px;
  color: var(--color-faint);
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: 0.06em;
  opacity: 0;
  transition: opacity 180ms ease, color 180ms ease;
}

.ruler-hit:hover .ruler-percent,
.ruler-percent.is-hovered {
  color: var(--color-accent-ink);
  opacity: 1;
}

.ruler-labels {
  position: fixed;
  z-index: 41;
  top: 0;
  right: 82px;
  bottom: 0;
  width: min(320px, 28vw);
  pointer-events: none;
  display: none;
}

.ruler-label {
  position: absolute;
  right: 0;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 0.45rem;
  max-width: 100%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-faint);
  text-align: right;
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  pointer-events: auto;
  white-space: nowrap;
  opacity: 0.48;
  transition: opacity 220ms ease, color 220ms ease;
}

.ruler-label:hover {
  color: var(--color-ink);
  opacity: 1;
}

.ruler-label.is-active {
  color: var(--color-ink);
  opacity: 1;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2vw, 1.85rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  text-transform: none;
}

.ruler-label.is-active .ruler-label__num {
  color: var(--color-accent-ink);
}

.ruler-label.is-ghost {
  opacity: 0;
  pointer-events: none;
}

.ruler-label__num {
  color: var(--color-faint);
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.ruler-label.is-active .ruler-label__num {
  font-size: 9px;
}

@media (min-width: 1024px) {
  .ruler-rail,
  .ruler-labels {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ruler-tick,
  .ruler-num,
  .ruler-label,
  .ruler-percent {
    transition: none;
  }
}
</style>
