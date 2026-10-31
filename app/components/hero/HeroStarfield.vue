<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
let dispose: (() => void) | null = null;

const COLORS = [0xf0995f, 0x5fbedc, 0xa27fc2, 0xeddf55] as const;

onMounted(async () => {
  if (!import.meta.client || !canvas.value) return;
  if (!window.matchMedia("(min-width: 1024px)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let THREE: typeof import("three");
  try {
    THREE = await import("three");
  } catch {
    return;
  }

  const el = canvas.value;
  const parent = el.parentElement;
  if (!parent) return;

  let renderer: import("three").WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: el,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6.6);

  const group = new THREE.Group();
  scene.add(group);

  const positions: number[] = [];
  const colors: number[] = [];
  const color = new THREE.Color();

  const pushPoint = (x: number, y: number, z: number, hex: number, alpha = 1) => {
    positions.push(x, y, z);
    color.setHex(hex);
    colors.push(color.r * alpha, color.g * alpha, color.b * alpha);
  };

  // Four petal-shaped clusters, one per brand colour.
  for (let cluster = 0; cluster < 4; cluster += 1) {
    const angle = -Math.PI / 2 + (Math.PI / 2) * cluster;
    const count = 430;
    for (let i = 0; i < count; i += 1) {
      const r = 0.3 + Math.pow(Math.random(), 0.72) * 2.55;
      const spread = 0.16 + r * 0.2;
      const a = angle + (Math.random() - 0.5) * spread;
      const x = Math.cos(a) * r + (Math.random() - 0.5) * 0.34;
      const y = Math.sin(a) * r + (Math.random() - 0.5) * 0.34;
      const z = (Math.random() - 0.5) * (0.5 + r * 0.28);
      pushPoint(x, y, z, COLORS[cluster] ?? 0xf0995f, 0.45 + Math.random() * 0.55);
    }
  }

  // Central dust so the four lobes meet in a bright core.
  for (let i = 0; i < 260; i += 1) {
    const r = Math.pow(Math.random(), 1.8) * 0.7;
    const a = Math.random() * Math.PI * 2;
    pushPoint(
      Math.cos(a) * r,
      Math.sin(a) * r,
      (Math.random() - 0.5) * 0.5,
      0xfaf9f5,
      0.3 + Math.random() * 0.5,
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.026,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  group.add(points);

  // Soft central glow.
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const ctx = glowCanvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.22, "rgba(255,255,255,0.22)");
    gradient.addColorStop(0.55, "rgba(70,166,198,0.10)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Sprite(glowMaterial);
  glow.scale.set(4.8, 4.8, 1);
  group.add(glow);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let time = 0;
  let frame = 0;
  let visible = true;

  const resize = () => {
    const width = parent.clientWidth || 1;
    const height = parent.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const onPointer = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const onVisibility = () => {
    visible = !document.hidden;
  };

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.05 },
  );
  io.observe(el);

  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  resize();

  const tick = () => {
    frame = requestAnimationFrame(tick);
    if (!visible) return;
    time += 0.0022;
    mouseX += (targetX - mouseX) * 0.045;
    mouseY += (targetY - mouseY) * 0.045;

    group.rotation.z = Math.sin(time * 0.55) * 0.08 + time * 0.04;
    group.rotation.x = mouseY * 0.14;
    group.rotation.y = mouseX * 0.18;
    group.position.x = mouseX * 0.08;
    group.position.y = -mouseY * 0.06;
    glow.material.opacity = 0.5 + Math.sin(time * 2.2) * 0.06;

    renderer.render(scene, camera);
  };
  tick();

  dispose = () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    geometry.dispose();
    material.dispose();
    glowTexture.dispose();
    glowMaterial.dispose();
    renderer.dispose();
  };
});

onBeforeUnmount(() => {
  dispose?.();
  dispose = null;
});
</script>

<template>
  <canvas ref="canvas" class="hero-starfield" aria-hidden="true" />
</template>

<style scoped>
.hero-starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
