<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

type SectionDef = { id: string; label: string };
type Phase = "queued" | "riding" | "top";
type Label = SectionDef & {
  phase: Phase;
  y: number;
  active: boolean;
  index: number;
};

const sections: SectionDef[] = [
  { id: "work", label: "SELECTED WORK" },
  { id: "capabilities", label: "CAPABILITIES" },
  { id: "method", label: "METHOD" },
  { id: "open-source", label: "OPEN SOURCE" },
  { id: "about", label: "TEAM" },
  { id: "contact-cta", label: "GET STARTED" },
];

const NAV_H = 48;
const TOP_PAD = 30;
const QUEUE_PAD = 40;
const QUEUE_CLEAR = 150;
const QUEUE_SLOT = 22;
const CURRENT_GAP = 26;

const rail = ref<HTMLElement | null>(null);
const ready = ref(false);
const visible = ref(false);
const hovered = ref(false);
const progress = ref(0);
const maxScroll = ref(1);
const labels = ref<Label[]>([]);
const ticks = Array.from({ length: 101 }, (_, i) => i);
const tickLabel = (v: number) => v % 5 === 0;
const progressLabel = `${0}%`;
const pctLabel = ref("0%");

let frame = 0;
let hideTimer = 0;
let heights = new Map<string, number>();
let offsets = new Map<string, number>();

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measure() {
  heights = new Map();
  offsets = new Map();
  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (el) {
      heights.set(section.id, el.offsetHeight);
      offsets.set(section.id, el.offsetTop);
    }
  }
}

function update() {
  frame = 0;
  const vh = window.innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  maxScroll.value = max;
  const y = window.scrollY;
  progress.value = Math.min(1, Math.max(0, y / max));
  pctLabel.value = `${Math.round(progress.value * 100)}%`;

  const threshold = vh * 0.12;
  const marker = y + vh * 0.32;
  let active = -1;
  const records = sections.map((section, index) => {
    const anchor = offsets.get(section.id) ?? 0;
    const v = anchor - y;
    if (anchor <= marker) active = index;
    let phase: Phase;
    if (y < 120) phase = "queued";
    else if (v <= threshold) phase = "top";
    else if (v < vh - QUEUE_PAD - QUEUE_CLEAR) phase = "riding";
    else phase = "queued";
    return { section, index, anchor, v, phase, active: false, y: 0 };
  });

  // Top pile: oldest first, current section gets extra gap before its heading.
  const top = records.filter((r) => r.phase === "top");
  for (let i = 0; i < top.length; i += 1) {
    const item = top[i]!;
    item.y = NAV_H + TOP_PAD + i * QUEUE_SLOT + (item.index === active ? CURRENT_GAP : 0);
    item.active = item.index === active;
  }

  // Bottom queue: earliest heading nearest the bottom, later ones above it.
  const queued = records.filter((r) => r.phase === "queued");
  for (let i = 0; i < queued.length; i += 1) {
    const item = queued[i]!;
    item.y = vh - QUEUE_PAD - (queued.length - 1 - i) * QUEUE_SLOT;
    item.active = item.index === active;
  }

  // Riding: pinned to the section anchor, clamped inside the rail.
  const riding = records.filter((r) => r.phase === "riding");
  for (const item of riding) {
    item.y = Math.max(threshold + 8, Math.min(vh - QUEUE_PAD - 8, item.v));
    item.active = item.index === active;
  }

  labels.value = records.map((r) => ({
    ...r.section,
    phase: r.phase,
    y: r.y,
    active: r.active,
    index: r.index,
  }));
}

function schedule() {
  if (!frame) frame = window.requestAnimationFrame(update);
}

function showRuler() {
  window.clearTimeout(hideTimer);
  visible.value = true;
}

function hideRulerSoon() {
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    visible.value = false;
    hovered.value = false;
  }, 260);
}

function goPercent(value: number) {
  const target = Math.max(0, Math.min(1, value));
  window.scrollTo({
    top: target * maxScroll.value,
    behavior: reduced() ? "auto" : "smooth",
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
    top: Math.max(0, el.offsetTop - NAV_H - 8),
    behavior: reduced() ? "auto" : "smooth",
  });
}

onMounted(async () => {
  await nextTick();
  measure();
  update();
  ready.value = true;
  document.documentElement.classList.add("has-custom-ruler");
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    schedule();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) window.cancelAnimationFrame(frame);
  window.clearTimeout(hideTimer);
  document.documentElement.classList.remove("has-custom-ruler");
});
</script>

<template>
  <template v-if="ready">
    <!-- Always-present edge sensor; ruler only appears when pointer enters. -->
    <div
      class="ruler-hotzone"
      aria-hidden="true"
      @mouseenter="showRuler"
      @mouseleave="hideRulerSoon"
    />

    <!-- Moving chapter headings: bottom queue -> vertical ride -> top pile. -->
    <div class="ruler-labels">
      <button
        v-for="item in labels"
        :key="item.id"
        type="button"
        class="ruler-label"
        :class="[`is-${item.phase}`, { 'is-active': item.active }]"
        :style="{ top: `${item.y}px` }"
        :aria-label="`跳转到 ${item.label}`"
        @click="goSection(item.id)"
        @mouseenter="showRuler"
        @mouseleave="hideRulerSoon"
      >
        <span class="ruler-label__text">{{ item.label }}</span>
      </button>
    </div>

    <!-- Ruler is hidden until the pointer approaches the right edge. -->
    <nav
      class="ruler-rail"
      :class="{ 'is-visible': visible }"
      aria-label="页面进度"
      @mouseenter="showRuler"
      @mouseleave="hideRulerSoon"
    >
      <div class="ruler-glass" aria-hidden="true" />
      <div
        ref="rail"
        class="ruler-hit"
        role="slider"
        tabindex="0"
        aria-orientation="vertical"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(progress * 100)"
        aria-label="滚动页面进度"
        @click="onRailClick"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @keydown="onRailKey"
      >
        <span class="ruler-line" aria-hidden="true" />
        <span class="ruler-fill" :style="{ height: `${progress * 100}%` }" aria-hidden="true" />
        <span class="ruler-needle" :style="{ top: `${progress * 100}%` }" aria-hidden="true">
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
          {{ pctLabel }}
        </span>
      </div>
    </nav>
  </template>
</template>

<style scoped>
.ruler-hotzone {
  position: fixed;
  z-index: 41;
  top: 3rem;
  right: 0;
  bottom: 0;
  width: 72px;
  pointer-events: auto;
}

.ruler-labels {
  position: fixed;
  z-index: 43;
  top: 0;
  right: 86px;
  bottom: 0;
  width: min(320px, 28vw);
  pointer-events: none;
  background: linear-gradient(to right, transparent 0%, color-mix(in srgb, var(--color-paper) 92%, transparent) 52%, var(--color-paper) 100%);
}

.ruler-label {
  position: absolute;
  right: 0;
  display: block;
  transform: translateY(-50%) rotate(0deg);
  transform-origin: 100% 50%;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-faint);
  text-align: right;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0.58;
  transition:
    top 280ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    font-size 220ms ease,
    color 220ms ease,
    opacity 220ms ease;
}

.ruler-label:hover {
  color: var(--color-ink);
  opacity: 1;
}

.ruler-label.is-riding {
  color: var(--color-muted);
  font-size: 20px;
  letter-spacing: 0.01em;
  transform: translateY(-50%) rotate(-90deg);
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    font-size 220ms ease,
    color 220ms ease,
    opacity 220ms ease;
}

.ruler-label.is-top {
  color: var(--color-muted);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-transform: none;
}

.ruler-label.is-active {
  color: var(--color-ink);
  opacity: 1;
}

.ruler-label.is-active.is-top {
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.04em;
}

.ruler-label.is-active.is-riding {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: none;
}

.ruler-label.is-queued {
  opacity: 0.42;
}

.ruler-rail {
  position: fixed;
  z-index: 42;
  top: 3rem;
  right: 0;
  bottom: 0;
  width: 78px;
  opacity: 0;
  transform: translateX(18px);
  pointer-events: none;
  transition: opacity 260ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.ruler-rail.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.ruler-glass {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-paper) 58%, transparent);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  mask-image: linear-gradient(to bottom, transparent, #000 4%, #000 96%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 4%, #000 96%, transparent);
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
  transition: width 180ms ease;
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
  color: var(--color-faint);
  font-family: var(--font-mono);
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.08em;
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

@media (max-width: 1023px) {
  .ruler-hotzone,
  .ruler-labels,
  .ruler-rail {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ruler-label,
  .ruler-rail,
  .ruler-tick,
  .ruler-percent {
    transition: none;
  }
}
</style>
