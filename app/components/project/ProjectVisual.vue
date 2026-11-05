<script setup lang="ts">
defineProps<{
  slug: string;
  accent: "blue" | "orange" | "purple" | "yellow";
}>();
</script>

<template>
  <div class="visual" :class="`accent-${accent}`">
    <div class="visual-grid" aria-hidden="true" />

    <div v-if="slug === 'lantai'" class="scene scene-lantai">
      <div class="panel panel-admin">
        <div class="panel-top">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="hud ml-2 text-faint">ADMIN</span>
        </div>
        <div class="panel-body">
          <div class="row"><span class="line w-1/3" /><span class="line w-1/4" /></div>
          <div class="bars">
            <span v-for="h in [38, 62, 48, 78, 56, 88, 70]" :key="h" :style="{ height: `${h}%` }" />
          </div>
          <div class="row"><span class="line w-1/2" /><span class="line w-1/5" /></div>
          <div class="row"><span class="line w-2/3" /><span class="line w-1/4" /></div>
        </div>
      </div>

      <div class="panel panel-web">
        <div class="panel-top">
          <span class="hud text-faint">CLOUD</span>
          <span class="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--proj)]" />
        </div>
        <div class="panel-body">
          <div class="web-hero">
            <span class="line w-2/3 !h-2" />
            <span class="line w-1/2" />
            <span class="pill" />
          </div>
          <div class="web-cards">
            <span v-for="i in 3" :key="i" class="web-card" />
          </div>
        </div>
      </div>

      <div class="phone">
        <span class="phone-notch" />
        <div class="phone-screen">
          <span class="line w-1/2 !h-1.5" />
          <span class="line w-3/4" />
          <div class="phone-tile" />
          <div class="phone-tile !h-8" />
          <div class="phone-nav">
            <span v-for="i in 4" :key="i" class="dot !h-1.5 !w-1.5" />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="slug === 'static-hub'" class="scene scene-hub">
      <div class="panel panel-files">
        <div class="panel-top">
          <span class="hud text-faint">FILES / ROOT</span>
          <span class="hud text-[var(--proj-ink)]">UPLOAD</span>
        </div>
        <div class="panel-body">
          <div v-for="i in 5" :key="i" class="file-row">
            <span class="file-icon" />
            <span class="line" :class="['w-1/2', 'w-2/3', 'w-1/3', 'w-1/2', 'w-2/5'][i - 1]" />
            <span class="hud ml-auto text-faint">{{
              ["24 KB", "1.2 MB", "86 KB", "4.8 MB", "320 KB"][i - 1]
            }}</span>
          </div>
          <div class="progress"><span /></div>
          <p class="hud mt-2 text-faint">CHUNK 3 / 4 · SHA-256</p>
        </div>
      </div>

      <div class="share-card">
        <p class="hud text-faint">SHARE LINK</p>
        <div class="qr" aria-hidden="true">
          <span
            v-for="i in 49"
            :key="i"
            :class="{
              on: [
                1, 2, 4, 5, 7, 9, 10, 12, 14, 16, 17, 19, 21, 23, 25, 26, 28, 30, 32, 33, 35, 37,
                39, 41, 43, 44, 46, 48,
              ].includes(i),
            }"
          />
        </div>
        <div class="share-meta">
          <span class="line w-2/3" />
          <span class="hud text-[var(--proj-ink)]">7 DAYS</span>
        </div>
      </div>
    </div>

    <div v-else-if="slug === 'dianmo'" class="scene scene-dianmo">
      <div class="washi-phone">
        <span class="washi-notch" />
        <div class="washi-screen">
          <div class="washi-head">
            <span class="washi-seal">墨</span>
            <span class="hud text-[#6b6154]">DIANMO</span>
          </div>
          <div class="washi-field">
            <span class="washi-line w-1/2" />
            <span class="washi-btn">搜索</span>
          </div>
          <div class="washi-tabs">
            <span class="on">整数</span><span>小数</span><span>长整数</span><span>模糊</span>
          </div>
          <div class="washi-list">
            <div v-for="i in 4" :key="i" class="washi-row">
              <span class="washi-line" :class="['w-1/3', 'w-1/2', 'w-2/5', 'w-1/3'][i - 1]" />
              <span class="washi-value">{{ ["539", "24", "539", "24"][i - 1] }}</span>
              <span class="washi-edit">改</span>
            </div>
          </div>
          <div class="washi-foot">
            <span class="washi-cta">继续搜索</span>
            <span class="washi-mini">地址簿</span>
          </div>
        </div>
      </div>
      <span class="scene-label">界面示意 · 和纸 / 墨 / 朱印</span>
    </div>

    <div v-else-if="slug === 'wiredeck'" class="scene scene-wiredeck">
      <div class="desktop-window">
        <div class="desktop-bar">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="hud ml-3 text-faint">WIREDECK · DEVICES</span>
          <span class="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <img
          src="/img/projects/wiredeck/devices.webp"
          alt="WireDeck 设备管理界面"
          class="desktop-shot"
          loading="lazy"
          width="1600"
          height="1000"
        />
      </div>
      <span class="scene-label">真实界面 · WireDeck 1.0.1</span>
    </div>

    <div v-else-if="slug === 'video-speed'" class="scene scene-extension">
      <div class="browser">
        <div class="browser-bar">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="browser-url" />
        </div>
        <div class="video-stage">
          <span class="play" />
          <span class="speed-chip">2.0×</span>
          <span class="video-progress"><span /></span>
          <span class="hud video-tip">Z 减速 · X 加速 · C 复位</span>
        </div>
      </div>
    </div>

    <div v-else-if="slug === 'request-interceptor'" class="scene scene-devtools">
      <div class="devtools">
        <div class="devtools-head">
          <span class="hud">NETWORK</span>
          <span class="hud text-[var(--proj-ink)]">INTERCEPT</span>
        </div>
        <div v-for="i in 5" :key="i" class="req-row" :class="{ active: i === 3 }">
          <span class="method" :class="i % 2 ? 'get' : 'post'">{{ i % 2 ? "GET" : "POST" }}</span>
          <span class="line" :class="['w-1/2', 'w-2/3', 'w-1/3', 'w-1/2', 'w-2/5'][i - 1]" />
          <span class="hud ml-auto text-faint">{{ [200, 200, 304, 200, 500][i - 1] }}</span>
        </div>
        <div class="mock-box">
          <span class="hud text-faint">MOCK RULE</span>
          <span class="line w-2/3" />
          <span class="mock-badge">ON</span>
        </div>
      </div>
    </div>

    <div v-else-if="slug === 'electron-template'" class="scene scene-template">
      <div class="tpl-window">
        <div class="panel-top">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="hud ml-2 text-faint">ELECTRON · IPC</span>
          <span class="hud ml-auto text-[var(--proj-ink)]">SANDBOX</span>
        </div>
        <div class="panel-body">
          <div v-for="lane in ['MAIN', 'PRELOAD', 'RENDERER']" :key="lane" class="file-row">
            <span class="file-icon" />
            <span class="hud text-muted">{{ lane }}</span>
            <span class="line ml-auto w-1/3" />
          </div>
          <div class="tpl-contract">
            <span class="hud text-[var(--proj-ink)]">SHARED / IPC</span>
            <span class="line w-1/2" />
          </div>
        </div>
      </div>
      <div class="lib-chips">
        <span>macOS</span><span>Windows</span><span>Linux</span>
      </div>
      <span class="scene-label">工程示意 · 类型化 IPC 契约</span>
    </div>

    <div v-else-if="slug === 'wails3-template'" class="scene scene-template">
      <div class="tpl-window">
        <div class="panel-top">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="hud ml-2 text-faint">WAILS3 · CONTRACT</span>
          <span class="hud ml-auto text-[var(--proj-ink)]">BINDINGS</span>
        </div>
        <div class="panel-body">
          <div class="file-row">
            <span class="file-icon" />
            <span class="hud text-muted">internal / contract</span>
            <span class="line ml-auto w-1/4" />
          </div>
          <p class="hud mt-2 text-faint">↓ wails3 generate bindings</p>
          <div class="file-row">
            <span class="file-icon" />
            <span class="hud text-muted">frontend / bindings</span>
            <span class="line ml-auto w-1/4" />
          </div>
          <div class="tpl-contract">
            <span class="hud text-[var(--proj-ink)]">CHECK / NO DRIFT</span>
            <span class="line w-1/3" />
          </div>
        </div>
      </div>
      <div class="lib-chips">
        <span>Go</span><span>Wails v3</span><span>WebView</span>
      </div>
      <span class="scene-label">工程示意 · 契约生成 bindings</span>
    </div>

    <div v-else class="scene scene-library">
      <div class="code-panel">
        <div class="code-head">
          <span class="hud text-faint">@vakao-ui</span>
          <span class="hud text-[var(--proj-ink)]">TYPESCRIPT</span>
        </div>
        <pre
          class="code-body"
        ><span class="c-key">import</span> { createClient } <span class="c-key">from</span> <span class="c-str">'@vakao-ui/axios'</span>

<span class="c-key">const</span> client = <span class="c-fn">createClient</span>({
  baseURL: <span class="c-str">'/api/v1'</span>,
  refresh: <span class="c-key">true</span>,
})

<span class="c-comment">// 统一信封、401 单飞刷新、重复请求取消</span></pre>
      </div>
      <div class="lib-chips">
        <span>axios</span><span>socket-system</span><span>scripts-utils</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visual {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line);
  background:
    radial-gradient(
      60% 80% at 50% 20%,
      color-mix(in srgb, var(--proj) 12%, transparent),
      transparent 70%
    ),
    var(--color-sunken);
}

.visual-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--color-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
  mask-image: radial-gradient(80% 80% at 50% 45%, #000, transparent);
}

.scene {
  position: absolute;
  inset: 0;
}

.panel {
  position: absolute;
  border: 1px solid var(--color-line-strong);
  background: color-mix(in srgb, var(--color-raised) 94%, transparent);
  box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.panel-top {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding-inline: 9px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--color-line-strong);
}

.panel-body {
  padding: 12px;
}

.line {
  display: block;
  height: 5px;
  background: var(--color-line);
}

.panel-admin {
  left: 7%;
  top: 13%;
  width: 47%;
  z-index: 3;
}

.panel-web {
  right: 7%;
  top: 24%;
  width: 43%;
  z-index: 2;
}

.panel-admin .bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 64px;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.panel-admin .bars span {
  flex: 1;
  background: color-mix(in srgb, var(--proj) 70%, var(--color-paper));
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 7px;
}

.web-hero {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.pill {
  display: block;
  width: 34px;
  height: 9px;
  margin-top: 3px;
  background: var(--proj);
}

.web-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 7px;
}

.web-card {
  display: block;
  height: 28px;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.phone {
  position: absolute;
  right: 30%;
  bottom: -8%;
  z-index: 4;
  width: 24%;
  aspect-ratio: 9 / 18;
  border: 4px solid var(--color-ink);
  border-radius: 18px;
  background: var(--color-ink);
  box-shadow: 0 26px 50px -24px rgba(0, 0, 0, 0.55);
  transform: rotate(-4deg);
}

.phone-notch {
  position: absolute;
  left: 50%;
  top: 5px;
  width: 30%;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 99px;
  background: var(--color-line);
}

.phone-screen {
  position: absolute;
  inset: 10px 5px 5px;
  padding: 8px;
  border-radius: 12px;
  background: var(--color-paper);
}

.phone-tile {
  height: 22px;
  margin-top: 7px;
  border: 1px solid var(--color-line);
  background: color-mix(in srgb, var(--proj) 16%, var(--color-paper));
}

.phone-nav {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 7px;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  border-top: 1px solid var(--color-line);
}

.phone-nav .dot {
  width: 4px;
  height: 4px;
}

/* hub */
.panel-files {
  left: 7%;
  top: 13%;
  width: 55%;
}

.panel-files .panel-body {
  padding: 10px 12px 14px;
}

.file-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px solid var(--color-line);
}

.file-icon {
  width: 10px;
  height: 12px;
  border: 1px solid var(--proj);
  background: color-mix(in srgb, var(--proj) 18%, transparent);
}

.progress {
  height: 4px;
  margin-top: 12px;
  background: var(--color-line);
}

.progress span {
  display: block;
  width: 68%;
  height: 100%;
  background: var(--proj);
}

.share-card {
  position: absolute;
  right: 7%;
  top: 18%;
  width: 29%;
  padding: 14px;
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.45);
}

.qr {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  margin: 10px auto;
  width: 70%;
  aspect-ratio: 1;
}

.qr span {
  background: transparent;
}

.qr span.on {
  background: var(--color-ink);
}

.share-meta {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* dianmo */
.scene-dianmo {
  background:
    radial-gradient(80% 70% at 30% 20%, rgba(239, 231, 214, 0.8), transparent 70%),
    linear-gradient(150deg, #efe7d6, #d9cfba);
}

.washi-phone {
  position: absolute;
  left: 50%;
  top: 10%;
  width: 38%;
  aspect-ratio: 9 / 18;
  transform: translateX(-50%) rotate(-2deg);
  border: 5px solid #241f18;
  border-radius: 22px;
  background: #241f18;
  box-shadow: 0 30px 60px -30px rgba(36, 31, 24, 0.65);
}

.washi-notch {
  position: absolute;
  left: 50%;
  top: 5px;
  width: 28%;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 99px;
  background: #4a4135;
}

.washi-screen {
  position: absolute;
  inset: 12px 6px 6px;
  padding: 10px;
  border-radius: 14px;
  background: linear-gradient(rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.04)), #efe7d6;
  color: #241f18;
}

.washi-head {
  display: flex;
  align-items: center;
  gap: 7px;
}

.washi-seal {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid #b23a2e;
  color: #b23a2e;
  font-size: 10px;
  font-weight: 700;
}

.washi-field {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #cfc4ae;
  background: #f7f1e3;
}

.washi-line {
  display: block;
  height: 4px;
  background: #cfc4ae;
}

.washi-btn {
  margin-left: auto;
  padding: 3px 7px;
  background: #b23a2e;
  color: #f7f1e3;
  font-size: 8px;
}

.washi-tabs {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  font-size: 7px;
  color: #6b6154;
}

.washi-tabs span {
  flex: 1;
  padding: 3px 0;
  text-align: center;
  border: 1px solid transparent;
}

.washi-tabs span.on {
  border-color: #b23a2e;
  color: #b23a2e;
}

.washi-list {
  margin-top: 8px;
  border-top: 1px solid #cfc4ae;
}

.washi-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
  border-bottom: 1px solid #ddd2bd;
}

.washi-value {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 8px;
  color: #6b6154;
}

.washi-edit {
  padding: 1px 4px;
  background: #b23a2e;
  color: #f7f1e3;
  font-size: 7px;
}

.washi-foot {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.washi-cta,
.washi-mini {
  flex: 1;
  padding: 4px 0;
  text-align: center;
  font-size: 7px;
}

.washi-cta {
  background: #b23a2e;
  color: #f7f1e3;
}

.washi-mini {
  border: 1px solid #cfc4ae;
  color: #6b6154;
}

/* wiredeck */
.scene-wiredeck {
  padding: 7% 6% 0;
}

.desktop-window {
  height: 100%;
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  box-shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transform: translateY(4%);
}

.desktop-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding-inline: 9px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.desktop-shot {
  display: block;
  width: 100%;
  height: calc(100% - 26px);
  object-fit: cover;
  object-position: top center;
}

/* extension */
.browser {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 16%;
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  box-shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.5);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding-inline: 9px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.browser-url {
  width: 45%;
  height: 6px;
  margin-left: 8px;
  background: var(--color-line);
}

.video-stage {
  position: relative;
  aspect-ratio: 16 / 8.4;
  background: radial-gradient(
    50% 70% at 50% 40%,
    color-mix(in srgb, var(--proj) 30%, #1b2024),
    #15181b 70%
  );
}

.play {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 14px solid rgba(255, 255, 255, 0.85);
}

.speed-chip {
  position: absolute;
  right: 6%;
  top: 12%;
  padding: 5px 9px;
  background: var(--proj);
  color: #101014;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}

.video-progress {
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 10%;
  height: 3px;
  background: rgba(255, 255, 255, 0.22);
}

.video-progress span {
  display: block;
  width: 62%;
  height: 100%;
  background: var(--proj);
}

.video-tip {
  position: absolute;
  left: 5%;
  bottom: 16%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 8px;
}

/* devtools */
.scene-devtools {
  padding: 8% 10% 0;
}

.devtools {
  height: 100%;
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  box-shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.5);
}

.devtools-head {
  display: flex;
  justify-content: space-between;
  padding: 9px 12px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.req-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-line);
}

.req-row.active {
  background: color-mix(in srgb, var(--proj) 12%, transparent);
}

.method {
  width: 34px;
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 600;
}

.method.get {
  color: #1a708c;
}

.method.post {
  color: #9a4e1b;
}

.mock-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 12px;
  padding: 8px;
  border: 1px dashed var(--color-line-strong);
}

.mock-badge {
  margin-left: auto;
  padding: 2px 5px;
  background: var(--proj);
  color: #101014;
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 700;
}

/* templates */
.scene-template {
  padding: 8% 9% 0;
}

.tpl-window {
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  box-shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.tpl-window .panel-body {
  padding: 10px 12px 12px;
}

.tpl-contract {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 8px;
  border: 1px dashed var(--color-line-strong);
}

/* library */
.scene-library {
  padding: 8% 9% 0;
  background: var(--color-sunken);
}

.code-panel {
  border: 1px solid var(--color-line-strong);
  background: #171512;
  color: #e9e6df;
  box-shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.55);
}

.code-head {
  display: flex;
  justify-content: space-between;
  padding: 9px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.code-body {
  margin: 0;
  padding: 14px 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.8;
  overflow: hidden;
  white-space: pre-wrap;
}

.c-key {
  color: #74c7e0;
}
.c-str {
  color: #eddf55;
}
.c-fn {
  color: #f0995f;
}
.c-comment {
  color: #8c877d;
}

.lib-chips {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.lib-chips span {
  padding: 4px 7px;
  border: 1px solid var(--color-line-strong);
  background: var(--color-raised);
  font-family: var(--font-mono);
  font-size: 8px;
  color: var(--color-muted);
}

.scene-label {
  position: absolute;
  right: 10px;
  bottom: 8px;
  z-index: 6;
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-faint);
  background: color-mix(in srgb, var(--color-paper) 80%, transparent);
  padding: 2px 5px;
}

@media (max-width: 640px) {
  .panel-admin,
  .panel-files {
    left: 4%;
    top: 9%;
    width: 62%;
  }
  .panel-web,
  .share-card {
    right: 4%;
    top: 20%;
    width: 40%;
  }
  .phone {
    right: 24%;
    width: 26%;
  }
  .washi-phone {
    width: 48%;
  }
  .scene-wiredeck {
    padding: 5% 4% 0;
  }
}
</style>
