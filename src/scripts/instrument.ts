// The hero "instrument": four live scenes on one canvas, switched by tabs.
// Ported from the approved prototype. Pauses when off-screen or the tab is hidden;
// with reduced motion it renders a still frame instead of animating.

import { TAU, fit, gauss, onThemeChange, prefersReducedMotion, readColors, type Colors, type Frame } from "./canvas";

interface Scene {
  eq: string;
  legend: [color: string, label: string][];
  hint: string;
  overlay: boolean;
  prewarm: number;
  staticFrames: number;
  staticAlpha: number;
  tapFrames: number;
  setup(still: boolean): void;
  frame(fade: boolean): void;
  tap(px: number, py: number): void;
}

const SCENE_KEY = "hero-scene";

export function initInstrument(root: HTMLElement): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>("canvas")!;
  const plot = root.querySelector<HTMLElement>(".plot")!;
  const overlay = root.querySelector<HTMLElement>("[data-overlay]")!;
  const eqEl = root.querySelector<HTMLElement>("[data-eq]")!;
  const legendEl = root.querySelector<HTMLElement>("[data-legend]")!;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-scene]"));
  const noteLink = root.querySelector<HTMLAnchorElement>("[data-note-link]");

  const reduced = prefersReducedMotion();
  let C: Colors = readColors();
  let F: Frame = fit(canvas);
  let running = false;
  let visible = true;
  let raf = 0;

  const fadeOut = (a: number) => {
    const { ctx } = F;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${a})`;
    ctx.fillRect(0, 0, F.w, F.h);
    ctx.globalCompositeOperation = "source-over";
  };
  const seg = (x0: number, y0: number, x1: number, y1: number, c: string) => {
    const { ctx } = F;
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  /* A: damped pendulum phase portrait */
  const pendulum: Scene = (() => {
    const XMAX = TAU;
    const VMAX = 3;
    type P = { x: number; v: number; age: number; max: number };
    let parts: P[] = [];
    const toPx = (x: number, v: number): [number, number] => [
      ((x + XMAX) / (2 * XMAX)) * F.w,
      (1 - (v + VMAX) / (2 * VMAX)) * F.h,
    ];
    const spawn = (p: Partial<P>, x?: number, v?: number): P => {
      p.x = x ?? (Math.random() * 2 - 1) * XMAX;
      p.v = v ?? (Math.random() * 2 - 1) * VMAX;
      p.age = 0;
      p.max = 160 + Math.random() * 320;
      return p as P;
    };
    const col = (p: P) => {
      const E = (p.v * p.v) / 2 - Math.cos(p.x);
      return C.ramp[Math.round(Math.min(1, Math.max(0, (E + 1) / 3)) * 11)];
    };
    return {
      eq: "θ̈ = −sin θ − 0.12 θ̇",
      legend: [["var(--accent)", "bound"], ["var(--warm)", "rotating"]],
      hint: "tap to release particles",
      overlay: true, prewarm: 50, staticFrames: 140, staticAlpha: 0.55, tapFrames: 90,
      setup(still) {
        const n = still ? 260 : Math.round(Math.min(950, (F.w * F.h) / 300));
        parts = Array.from({ length: n }, () => spawn({}));
        if (!still) parts.forEach((p) => { p.age = Math.random() * p.max; });
      },
      frame(fade) {
        if (fade) fadeOut(0.075);
        F.ctx.lineWidth = 1.15;
        F.ctx.lineCap = "round";
        for (const p of parts) {
          for (let s = 0; s < 2; s++) {
            const ox = p.x, ov = p.v, dt = 0.018;
            p.v += (-Math.sin(p.x) - 0.12 * p.v) * dt;
            p.x += p.v * dt;
            let wrapped = false;
            if (p.x > XMAX) { p.x -= 2 * XMAX; wrapped = true; }
            else if (p.x < -XMAX) { p.x += 2 * XMAX; wrapped = true; }
            if (wrapped || Math.abs(p.v) > VMAX * 1.1) continue;
            const [x0, y0] = toPx(ox, ov);
            const [x1, y1] = toPx(p.x, p.v);
            seg(x0, y0, x1, y1, col(p));
          }
          if (++p.age > p.max || Math.abs(p.v) > VMAX * 1.1) spawn(p);
        }
      },
      tap(px, py) {
        const x = (px / F.w) * 2 * XMAX - XMAX;
        const v = (1 - py / F.h) * 2 * VMAX - VMAX;
        const sorted = parts.slice().sort((a, b) => b.age / b.max - a.age / a.max);
        for (let i = 0; i < Math.min(160, parts.length); i++) {
          spawn(sorted[i], x + (Math.random() - 0.5) * 0.5, v + (Math.random() - 0.5) * 0.5);
        }
      },
    };
  })();

  /* B: Hubble flow, every galaxy recedes at v = H d from any observer */
  const hubble: Scene = (() => {
    const H = 0.0045;
    type G = { x: number; y: number; life: number; s: number };
    let gal: G[] = [];
    let cx = 0, cy = 0, a = 1;
    const spawn = (g: Partial<G>, life: number): G => {
      g.x = Math.random() * F.w;
      g.y = Math.random() * F.h;
      g.life = life;
      g.s = 0.8 + Math.random() * 1.6;
      return g as G;
    };
    return {
      eq: "v = H₀ d",
      legend: [["var(--accent)", "near, low z"], ["var(--warm)", "far, high z"]],
      hint: "tap to move the observer",
      overlay: false, prewarm: 0, staticFrames: 1, staticAlpha: 1, tapFrames: 1,
      setup() {
        cx = F.w / 2; cy = F.h / 2; a = 1;
        const n = Math.round(Math.min(700, (F.w * F.h) / 420));
        gal = Array.from({ length: n }, () => spawn({}, 1));
      },
      frame() {
        const { ctx } = F;
        ctx.clearRect(0, 0, F.w, F.h);
        a *= 1 + H;
        if (a >= 2) a /= 2;
        const s = (Math.min(F.w, F.h) / 7) * a;
        const rmax = Math.hypot(Math.max(cx, F.w - cx), Math.max(cy, F.h - cy));
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 1;
        for (let r = s / 2; r < rmax; r += s / 2) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); }
        const ga = ctx.globalAlpha;
        ctx.lineCap = "round";
        for (const g of gal) {
          const dx = g.x - cx, dy = g.y - cy;
          g.x += dx * H; g.y += dy * H;
          if (g.x < -10 || g.x > F.w + 10 || g.y < -10 || g.y > F.h + 10) { spawn(g, 0); continue; }
          g.life = Math.min(1, g.life + 0.02);
          const c = C.ramp[Math.round(Math.min(1, Math.hypot(dx, dy) / rmax) * 11)];
          ctx.globalAlpha = ga * g.life;
          ctx.lineWidth = g.s;
          seg(g.x - dx * H * 9, g.y - dy * H * 9, g.x, g.y, c);
        }
        ctx.globalAlpha = ga;
        ctx.strokeStyle = C.fg;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.stroke();
        ctx.fillStyle = C.muted;
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText("you", cx + 10, cy - 8);
      },
      tap(px, py) { cx = px; cy = py; },
    };
  })();

  /* C: Monte Carlo price paths (geometric Brownian motion) with the terminal distribution */
  const monte: Scene = (() => {
    const N = 64, T = 220, MU = 0.06, SIG = 0.38, DT = 1 / T, BINS = 34, HOLD = 70, PER = 2;
    let paths: number[] = [], k = 0, hold = 0, hist: number[] = [];
    const L = () => Math.round(F.w * 0.8);
    const Y = (ls: number) => F.h / 2 - (ls / 1.3) * (F.h / 2 - 14);
    const X = (i: number) => 10 + (i / T) * (L() - 20);
    function base(x0: number, x1: number) {
      const { ctx } = F;
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = C.muted;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0)); ctx.stroke();
      ctx.restore();
    }
    function batch() {
      F.ctx.clearRect(0, 0, L(), F.h);
      paths = new Array(N).fill(0);
      k = 0; hold = 0;
      base(10, L());
    }
    function drawHist() {
      const { ctx } = F, x0 = L() + 6, wmax = F.w - x0 - 10, ga = ctx.globalAlpha;
      ctx.clearRect(L(), 0, F.w - L(), F.h);
      base(L(), F.w - 10);
      const mx = Math.max(1, ...hist), bh = (F.h - 28) / BINS;
      hist.forEach((c, b) => {
        const ls = 1.3 - (b + 0.5) * (2.6 / BINS);
        ctx.fillStyle = ls >= 0 ? C.accent : C.warm;
        ctx.globalAlpha = ga * 0.75;
        ctx.fillRect(x0, 14 + b * bh + 1, (c / mx) * wmax, Math.max(1, bh - 2));
      });
      ctx.globalAlpha = ga;
    }
    return {
      eq: "dS = μS dt + σS dW",
      legend: [["var(--accent)", "gain"], ["var(--warm)", "loss"]],
      hint: "64 paths, 1 year · tap to re-run",
      overlay: false, prewarm: 0, staticFrames: 3 * (T / PER + HOLD + 1) + T / PER, staticAlpha: 1, tapFrames: T / PER,
      setup() { hist = new Array(BINS).fill(0); batch(); drawHist(); },
      frame() {
        const { ctx } = F;
        if (k < T) {
          const ga = ctx.globalAlpha;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = ga * 0.4;
          for (let st = 0; st < PER && k < T; st++, k++) {
            for (let i = 0; i < N; i++) {
              const s0 = paths[i];
              const s1 = s0 + (MU - (SIG * SIG) / 2) * DT + SIG * Math.sqrt(DT) * gauss();
              paths[i] = s1;
              seg(X(k), Y(s0), X(k + 1), Y(s1), s1 >= 0 ? C.accent : C.warm);
            }
          }
          ctx.globalAlpha = ga;
          if (k >= T) {
            paths.forEach((s) => {
              const b = Math.floor(((1.3 - s) / 2.6) * BINS);
              hist[Math.max(0, Math.min(BINS - 1, b))]++;
            });
            drawHist();
          }
        } else if (++hold > HOLD) batch();
      },
      tap() { batch(); },
    };
  })();

  /* D: Lorenz attractor, 48 starts a hair apart drift onto different wings */
  const lorenz: Scene = (() => {
    const N = 48;
    type T = { x: number; y: number; z: number; c: string };
    let tr: T[] = [];
    let th = 0.6;
    const seed = (x: number, y: number, z: number, spread: number) => {
      tr = Array.from({ length: N }, (_, i) => ({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        z: z + (Math.random() - 0.5) * spread,
        c: C.ramp[Math.round((i / (N - 1)) * 11)],
      }));
    };
    const proj = (p: T): [number, number] => {
      const sc = Math.min(F.w / 62, F.h / 56);
      const X = p.x * Math.cos(th) - p.y * Math.sin(th);
      return [F.w / 2 + X * sc, F.h / 2 - (p.z - 25) * sc];
    };
    return {
      eq: "σ = 10, ρ = 28, β = 8/3",
      legend: [],
      hint: "48 starts 0.01 apart · tap to restart",
      overlay: false, prewarm: 40, staticFrames: 700, staticAlpha: 0.35, tapFrames: 400,
      setup(still) { th = 0.6; if (still) seed(0, 1, 20, 30); else seed(1, 1, 20, 0.01); },
      frame(fade) {
        if (fade) fadeOut(0.04);
        th += 0.0025;
        F.ctx.lineWidth = 1.2;
        F.ctx.lineCap = "round";
        for (const p of tr) {
          for (let s = 0; s < 3; s++) {
            const [x0, y0] = proj(p), dt = 0.005;
            const dx = 10 * (p.y - p.x), dy = p.x * (28 - p.z) - p.y, dz = p.x * p.y - (8 / 3) * p.z;
            p.x += dx * dt; p.y += dy * dt; p.z += dz * dt;
            const [x1, y1] = proj(p);
            seg(x0, y0, x1, y1, p.c);
          }
        }
      },
      tap() { const p = tr[0]; seed(p.x, p.y, p.z, 0.01); },
    };
  })();

  /* ---------- engine ---------- */
  const SCENES: Record<string, Scene> = { pendulum, hubble, monte, lorenz };
  let scene: Scene = pendulum;

  function runStill(n: number) {
    F.ctx.globalAlpha = scene.staticAlpha;
    for (let i = 0; i < n; i++) scene.frame(false);
    F.ctx.globalAlpha = 1;
  }
  function setupScene() {
    F = fit(canvas);
    F.ctx.clearRect(0, 0, F.w, F.h);
    scene.setup(reduced);
    if (reduced) runStill(scene.staticFrames);
    else for (let i = 0; i < scene.prewarm; i++) scene.frame(true);
  }
  function switchScene(name: string) {
    if (!SCENES[name]) name = "pendulum";
    scene = SCENES[name];
    tabs.forEach((t) => {
      const on = t.dataset.scene === name;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on) {
        plot.setAttribute("aria-labelledby", t.id);
        if (noteLink) {
          noteLink.hidden = !t.dataset.note;
          if (t.dataset.note) noteLink.href = t.dataset.note;
        }
      }
    });
    overlay.hidden = !scene.overlay;
    eqEl.textContent = scene.eq;
    legendEl.innerHTML =
      scene.legend.map(([c, l]) => `<span><i class="sw" style="background:${c}"></i>${l}</span>`).join("") +
      `<span>${scene.hint}</span>`;
    try { localStorage.setItem(SCENE_KEY, name); } catch {}
    setupScene();
  }
  function loop() {
    if (!running) return;
    scene.frame(true);
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (!running && !reduced && visible && !document.hidden) {
      running = true;
      raf = requestAnimationFrame(loop);
    }
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onTab = (e: Event) => switchScene((e.currentTarget as HTMLElement).dataset.scene ?? "pendulum");
  tabs.forEach((t) => t.addEventListener("click", onTab));
  // WAI-ARIA tabs pattern: arrows / Home / End move between tabs and activate them.
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.indexOf(e.currentTarget as HTMLButtonElement);
    const next =
      e.key === "ArrowRight" ? (i + 1) % tabs.length :
      e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length :
      e.key === "Home" ? 0 :
      e.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    tabs[next].focus();
    switchScene(tabs[next].dataset.scene ?? "pendulum");
  };
  tabs.forEach((t) => t.addEventListener("keydown", onKey));
  const onPointer = (e: PointerEvent) => {
    const r = plot.getBoundingClientRect();
    scene.tap(e.clientX - r.left, e.clientY - r.top);
    if (reduced) runStill(scene.tapFrames);
  };
  plot.addEventListener("pointerdown", onPointer);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible) start();
    else stop();
  });
  io.observe(plot);

  let rt = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(rt);
    rt = window.setTimeout(setupScene, 120);
  });
  ro.observe(plot);

  const offTheme = onThemeChange(() => {
    C = readColors();
    setupScene();
  });

  let saved = "pendulum";
  try { saved = localStorage.getItem(SCENE_KEY) || "pendulum"; } catch {}
  switchScene(saved);
  start();

  return () => {
    stop();
    io.disconnect();
    ro.disconnect();
    offTheme();
    clearTimeout(rt);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
