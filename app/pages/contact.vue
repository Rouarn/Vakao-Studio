<script setup lang="ts">
import { ArrowUpRight, Check, Copy, Github, Mail } from "lucide-vue-next";

const email = "robot01@woyuxiaji.cn";
const copied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email);
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    // clipboard unavailable; the mailto link still works
  }
};

useSeoMeta({
  title: "联系 — VaKao",
  description: "联系 VaKao：项目合作、技术交流、演示申请。邮箱 robot01@woyuxiaji.cn。",
  ogTitle: "联系 VaKao",
  ogDescription: "项目合作、技术交流、演示申请。",
  ogImage: "/og/contact.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <section data-ruler-label="CONTACT" class="border-b border-line">
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-24">
          <Reveal>
            <p class="hud text-faint">CONTACT / SAY HELLO</p>
            <h1 class="display mt-6 max-w-3xl text-[clamp(2.8rem,6.5vw,5.2rem)] text-strong">
              一起做点<br />能用的东西。
            </h1>
            <p class="mt-7 max-w-xl text-base leading-8 text-muted">
              项目合作、技术交流、想看某个项目的演示，都可以直接写邮件。说明背景和目标，比一句“在吗”更有用。
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <section data-ruler-label="EMAIL">
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-7">
            <Reveal>
              <p class="hud text-faint">EMAIL</p>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <a
                  :href="`mailto:${email}`"
                  class="display text-[clamp(1.5rem,4vw,2.6rem)] text-strong underline decoration-line-strong decoration-1 underline-offset-8 hover:decoration-ink"
                >
                  {{ email }}
                </a>
                <button
                  type="button"
                  class="flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                  :aria-label="copied ? '已复制邮箱' : '复制邮箱'"
                  @click="copyEmail"
                >
                  <Check v-if="copied" :size="16" :stroke-width="1.6" />
                  <Copy v-else :size="16" :stroke-width="1.5" />
                </button>
              </div>
              <p class="mt-4 text-sm text-muted">也可以直接在 GitHub 上开 Issue 或 Discussion。</p>

              <div class="mt-10 border-t border-line pt-6">
                <p class="hud text-faint">写邮件时，最好带上</p>
                <ul class="mt-4 space-y-3 text-sm leading-7 text-muted">
                  <li class="flex gap-3">
                    <span class="text-faint">01</span>你想解决的问题，以及现在是怎么解决的。
                  </li>
                  <li class="flex gap-3">
                    <span class="text-faint">02</span>预期的时间、预算或交付形态（如果有）。
                  </li>
                  <li class="flex gap-3">
                    <span class="text-faint">03</span>相关链接：现有产品、仓库、设计稿或参考。
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div class="md:col-span-5">
            <Reveal :delay="100" class="border border-line bg-raised p-6">
              <p class="hud text-faint">ELSEWHERE</p>
              <a
                href="https://github.com/Rouarn"
                target="_blank"
                rel="noopener noreferrer"
                class="group mt-5 flex items-center justify-between gap-4 border-b border-line pb-4"
              >
                <span class="flex items-center gap-3">
                  <Github :size="18" :stroke-width="1.5" class="text-muted" />
                  <span>
                    <span class="block text-sm text-ink">GitHub</span>
                    <span class="block font-mono text-[11px] text-faint">github.com/Rouarn</span>
                  </span>
                </span>
                <ArrowUpRight
                  :size="16"
                  :stroke-width="1.5"
                  class="text-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                :href="`mailto:${email}`"
                class="group mt-4 flex items-center justify-between gap-4"
              >
                <span class="flex items-center gap-3">
                  <Mail :size="18" :stroke-width="1.5" class="text-muted" />
                  <span>
                    <span class="block text-sm text-ink">Email</span>
                    <span class="block font-mono text-[11px] text-faint">{{ email }}</span>
                  </span>
                </span>
                <ArrowUpRight
                  :size="16"
                  :stroke-width="1.5"
                  class="text-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <div class="mt-8 border-t border-line pt-5">
                <p class="hud text-faint">响应时间</p>
                <p class="mt-2 text-sm leading-7 text-muted">
                  通常会在几个工作日内回复。如果只是闲聊，也可以直接说。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
