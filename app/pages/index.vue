<script setup lang="ts">
import { ArrowUpRight, Boxes, Github, Globe2, Monitor, Smartphone } from "lucide-vue-next";

import { foundations, products } from "~/utils/openSource";

const projects = await useProjects();
const featured = computed(() => projects.value.filter((project) => project.featured).slice(0, 4));

const capabilities = [
  {
    icon: Globe2,
    title: "Web 平台",
    copy: "后台、内容站与工具型产品。重视权限、可观测性与部署成本。",
    tags: ["Vue 3", "NestJS", "GoFrame"],
  },
  {
    icon: Monitor,
    title: "桌面工具",
    copy: "把命令行能力包成可用的桌面应用，覆盖 macOS 与 Windows。",
    tags: ["Wails", "Go", "Tauri"],
  },
  {
    icon: Smartphone,
    title: "移动应用",
    copy: "uni-app 与原生 Android，关注弱网、更新链路与真实设备上的手感。",
    tags: ["uni-app", "Kotlin", "Android"],
  },
  {
    icon: Boxes,
    title: "基础设施与开源库",
    copy: "请求层、Socket 协议、脚本工具与静态资源系统，收掉重复的脏活。",
    tags: ["TypeScript", "NestJS", "CI"],
  },
];

const steps = [
  { title: "定义", copy: "先确认谁会用、在什么场景用、哪些事不做。" },
  { title: "原型", copy: "用最小的可运行版本验证交互与数据流，不先堆页面。" },
  { title: "实现", copy: "把边界、错误与部署一起做完，而不是留到最后。" },
  { title: "交付与维护", copy: "写清楚怎么跑、怎么发、怎么回滚，再交给下一个人。" },
];

const libraries = [
  {
    name: "@vakao-ui/axios",
    copy: "统一信封、401 单飞刷新、重复请求取消与全局 loading。",
    meta: "0.0.2",
  },
  {
    name: "@vakao-ui/socket-system",
    copy: "连接管理、自动重连、房间恢复、标准化消息与错误出口。",
    meta: "TypeScript",
  },
  {
    name: "@vakao-ui/scripts-utils",
    copy: "终端颜色、图标、ASCII 横幅与构建脚本的常用工具。",
    meta: "CLI",
  },
  {
    name: "vakao-ui",
    copy: "Vue 3 + TypeScript 组件库，承接团队页面里反复出现的交互与视觉约定。",
    meta: "Vue 3",
  },
];

useSeoMeta({
  title: "VaKao — 把想法做成每天都在用的工具",
  description: "VaKao 是一个做 Web 平台、桌面工具、移动应用、浏览器扩展与开源库的小团队。",
  ogTitle: "VaKao — 把想法做成每天都在用的工具",
  ogDescription: "一个小团队，做 Web 平台、桌面工具、移动应用、浏览器扩展与开源库。",
  ogImage: "/og/home.png",
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <!-- Hero -->
    <section id="top" data-ruler-ignore class="relative overflow-hidden border-b border-line">
      <div class="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div class="frame relative">
        <div class="grid min-h-[620px] md:grid-cols-12">
          <div
            class="relative z-10 flex flex-col justify-center px-6 py-16 md:col-span-7 md:px-10 md:py-24"
          >
            <Reveal>
              <p class="hud flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
                <span class="text-faint">VAKAO / INDEPENDENT STUDIO</span>
                <span class="hidden h-px w-10 bg-line-strong sm:block" />
                <span class="text-faint">REMOTE · CHINA</span>
              </p>
            </Reveal>

            <Reveal :delay="80">
              <h1 class="hero-title display mt-8 text-[clamp(2.1rem,5.4vw,4.4rem)] text-strong">
                把想法做成
                <br />
                每天都在用的工具。
              </h1>
            </Reveal>

            <Reveal :delay="160">
              <p class="serif-accent mt-6 text-2xl text-accent-ink sm:text-3xl">
                Tools we actually use.
              </p>
              <p class="mt-6 max-w-xl text-base leading-8 text-muted">
                VaKao 是一个做 Web
                平台、桌面工具、移动应用、浏览器扩展与开源库的小团队。我们关心实现细节，也关心它是否真的有人用。
              </p>
            </Reveal>

            <Reveal :delay="240">
              <div class="mt-9 flex flex-wrap items-center gap-3">
                <NuxtLink to="/projects" class="btn btn-primary">
                  查看项目
                  <ArrowUpRight :size="15" :stroke-width="1.8" />
                </NuxtLink>
                <a
                  href="https://github.com/Rouarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ghost"
                >
                  <Github :size="15" :stroke-width="1.5" />
                  GitHub
                </a>
              </div>
            </Reveal>

            <Reveal :delay="320">
              <dl class="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <dt class="hud text-faint">项目</dt>
                  <dd class="mt-2 font-display text-2xl font-medium text-strong">07</dd>
                </div>
                <div>
                  <dt class="hud text-faint">公开仓库</dt>
                  <dd class="mt-2 font-display text-2xl font-medium text-strong">28</dd>
                </div>
                <div>
                  <dt class="hud text-faint">工作方式</dt>
                  <dd class="mt-2 font-display text-2xl font-medium text-strong">Remote</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div class="relative min-h-[420px] md:col-span-5 md:min-h-0">
            <div class="hero-art absolute inset-0">
              <div class="hero-glow" aria-hidden="true" />
              <div class="hero-orbit hero-orbit--one" aria-hidden="true" />
              <div class="hero-orbit hero-orbit--two" aria-hidden="true" />
              <HeroStarfield />
              <div class="hero-star-wrap">
                <StarMark
                  variant="four"
                  :size="260"
                  spin
                  class="hero-star"
                  label="VaKao 四色星芒"
                />
              </div>
              <div class="hero-caption lg:hidden">
                <span class="hud text-faint">FOUR PETALS / FOUR DIRECTIONS</span>
                <span class="hud text-accent-ink">VAKAO MARK</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 md:px-10"
        >
          <p class="hud text-faint">SCROLL TO EXPLORE</p>
          <p class="hud text-faint lg:hidden">兰台 · 静态资源中心 · 点墨 · WireDeck</p>
        </div>
      </div>
    </section>

    <!-- Selected work -->
    <section id="work" data-ruler-label="SELECTED WORK">
      <SectionBar index="01" label="SELECTED WORK" meta="4 个核心项目" />
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 class="display max-w-2xl text-[clamp(2.2rem,4.5vw,3.5rem)] text-strong">
                四个方向，一种做法。
              </h2>
              <p class="mt-5 max-w-xl text-base leading-7 text-muted">
                平台、工具、移动与桌面。形态不同，但都遵循同一套标准：能部署、能维护、能交给下一个人。
              </p>
            </Reveal>
            <Reveal :delay="100">
              <NuxtLink
                to="/projects"
                class="hud link-underline inline-flex items-center gap-1.5 text-muted hover:text-ink"
              >
                全部项目
                <ArrowUpRight :size="13" :stroke-width="1.8" />
              </NuxtLink>
            </Reveal>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal v-for="(project, index) in featured" :key="project.slug" :delay="index * 70">
              <ProjectCard :project="project" :index="index" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section id="capabilities" data-ruler-label="CAPABILITIES">
      <SectionBar index="02" label="CAPABILITIES" meta="WHAT WE DO" />
      <div class="frame">
        <div class="px-6 py-14 md:px-10 md:py-20">
          <Reveal>
            <h2 class="display max-w-2xl text-[clamp(2.2rem,4.5vw,3.5rem)] text-strong">
              从界面到部署，<span class="serif-accent text-accent-ink">一整条</span>都自己做。
            </h2>
          </Reveal>

          <div class="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            <Reveal
              v-for="(item, index) in capabilities"
              :key="item.title"
              :delay="index * 60"
              class="border-b border-line py-7 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0"
            >
              <component :is="item.icon" :size="22" :stroke-width="1.4" class="text-accent-ink" />
              <p class="hud mt-6 text-faint">0{{ index + 1 }}</p>
              <h3 class="mt-3 font-display text-xl font-semibold text-strong">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-muted">{{ item.copy }}</p>
              <ul class="mt-5 flex flex-wrap gap-2">
                <li
                  v-for="tag in item.tags"
                  :key="tag"
                  class="border border-line px-2 py-1 font-mono text-[10px] tracking-wide text-faint"
                >
                  {{ tag }}
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <!-- Method -->
    <section id="method" data-ruler-label="METHOD">
      <SectionBar index="03" label="HOW WE WORK" meta="定义 → 交付" />
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-4">
            <Reveal>
              <h2 class="display text-[clamp(2.2rem,4.5vw,3.5rem)] text-strong">
                先把问题<br />说清楚。
              </h2>
              <p class="mt-5 max-w-sm text-sm leading-7 text-muted">
                我们不从“要做几个页面”开始，而是先确认使用场景、边界与不做什么。原型跑通再写正式代码。
              </p>
            </Reveal>
          </div>

          <div class="md:col-span-8">
            <div class="border-t border-line">
              <Reveal
                v-for="(step, index) in steps"
                :key="step.title"
                :delay="index * 60"
                class="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[5rem_10rem_1fr] sm:items-baseline"
              >
                <span class="font-display text-2xl font-medium text-faint">0{{ index + 1 }}</span>
                <h3 class="font-display text-xl font-semibold text-strong">{{ step.title }}</h3>
                <p class="col-start-2 text-sm leading-7 text-muted sm:col-start-3">
                  {{ step.copy }}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Open source -->
    <section id="open-source" data-ruler-label="OPEN SOURCE">
      <SectionBar
        index="04"
        label="OPEN SOURCE"
        :meta="`${libraries.length} 个内部库 · ${products.length + foundations.length} 个公开仓库`"
      />
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-5">
            <Reveal>
              <p class="hud text-accent-ink">BUILD SMALL, SHARE THE PARTS</p>
              <h2 class="display mt-5 text-[clamp(2.2rem,4.5vw,3.5rem)] text-strong">
                把重复的脏活，<br />收进四个小库。
              </h2>
              <p class="mt-5 max-w-md text-sm leading-7 text-muted">
                请求层、Socket
                协议、构建脚本与组件。它们不追求成为通用框架，只解决团队项目里反复出现的那几个问题。
              </p>
              <div class="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Rouarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ghost"
                >
                  <Github :size="15" :stroke-width="1.5" />
                  在 GitHub 查看
                </a>
                <NuxtLink to="/open-source" class="btn btn-ghost">
                  全部开源项目
                  <ArrowUpRight :size="15" :stroke-width="1.8" />
                </NuxtLink>
              </div>
            </Reveal>
          </div>

          <div class="md:col-span-7">
            <div class="border-t border-line">
              <Reveal
                v-for="(lib, index) in libraries"
                :key="lib.name"
                :delay="index * 60"
                class="group flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3
                    class="font-mono text-sm text-strong transition-colors group-hover:text-accent-ink"
                  >
                    {{ lib.name }}
                  </h3>
                  <p class="mt-2 max-w-lg text-sm leading-6 text-muted">{{ lib.copy }}</p>
                </div>
                <span class="hud shrink-0 text-faint">{{ lib.meta }}</span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About teaser -->
    <section id="about" data-ruler-label="TEAM">
      <SectionBar index="05" label="THE TEAM" meta="SMALL TEAM, SERIOUS CRAFT" />
      <div class="frame">
        <div class="grid gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div class="md:col-span-7">
            <Reveal>
              <h2 class="display max-w-2xl text-[clamp(2.2rem,4.5vw,3.5rem)] text-strong">
                小团队，<br />但不做小东西。
              </h2>
              <p class="mt-6 max-w-xl text-base leading-8 text-muted">
                VaKao
                是一个远程协作的小团队。我们做产品，也做支撑产品的工具：需要平台就写后端，需要效率就写扩展，需要发布就写更新服务。
              </p>
              <NuxtLink
                to="/about"
                class="hud link-underline mt-7 inline-flex items-center gap-1.5 text-muted hover:text-ink"
              >
                关于团队
                <ArrowUpRight :size="13" :stroke-width="1.8" />
              </NuxtLink>
            </Reveal>
          </div>

          <div class="md:col-span-5">
            <Reveal :delay="100" class="border-t border-line">
              <div
                v-for="(value, index) in [
                  '先能跑，再好看',
                  '边界写进代码，不写进口号',
                  '部署与回滚是功能的一部分',
                ]"
                :key="value"
                class="flex gap-4 border-b border-line py-5"
              >
                <span class="hud shrink-0 text-faint">0{{ index + 1 }}</span>
                <p class="text-sm leading-7 text-ink">{{ value }}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      id="contact-cta"
      data-ruler-label="GET STARTED"
      class="cta-section border-t border-line"
    >
      <div class="frame">
        <div class="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
          <StarMark
            variant="four"
            :size="280"
            class="cta-star pointer-events-none absolute right-6 bottom-6 hidden opacity-20 md:block"
          />
          <Reveal>
            <p class="hud opacity-50">START A CONVERSATION</p>
            <h2 class="display mt-6 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)]">
              一起做点<br />能用的东西。
            </h2>
            <p class="mt-6 max-w-xl text-sm leading-7 opacity-[.65]">
              有想做的工具、需要补的技术债，或者只是想聊聊实现细节，都欢迎写邮件。
            </p>
            <div class="mt-9 flex flex-wrap gap-3">
              <a href="mailto:robot01@woyuxiaji.cn" class="btn btn-cta-primary">
                写邮件
                <ArrowUpRight :size="15" :stroke-width="1.8" />
              </a>
              <a
                href="https://github.com/Rouarn"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-cta-ghost"
              >
                <Github :size="15" :stroke-width="1.5" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-art {
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  inset: 8% 4% 8% 4%;
  background: radial-gradient(
    50% 50% at 50% 48%,
    color-mix(in srgb, var(--color-accent) 18%, transparent),
    transparent 72%
  );
}

.hero-orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  transform: translate(-50%, -50%);
}

.hero-orbit--one {
  width: 58%;
  aspect-ratio: 1;
}

.hero-orbit--two {
  width: 82%;
  aspect-ratio: 1;
  border-style: dashed;
  opacity: 0.7;
}

.hero-star-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(52%, 260px);
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.18));
}

.hero-star {
  width: 100%;
  height: auto;
}

.hero-caption {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 8%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--color-line);
  padding-top: 0.75rem;
}

.cta-star {
  transform: rotate(18deg);
}

@media (max-width: 767px) {
  .hero-art {
    min-height: 360px;
  }
  .hero-star-wrap {
    width: 46%;
  }
}
@media (min-width: 1024px) {
  .hero-caption {
    display: none;
  }
}
</style>
