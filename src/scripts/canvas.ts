// Shared helpers for the canvas figures: theme colors read from CSS tokens, HiDPI sizing,
// and a theme-change subscription so figures redraw when light/dark flips.

export interface Colors {
  fg: string;
  muted: string;
  accent: string;
  warm: string;
  line: string;
  surface: string;
  /** 12 steps from accent to warm, used to color by energy / distance / index. */
  ramp: string[];
}

export interface Frame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
}

export const TAU = Math.PI * 2;

const tok = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

function hexToRgb(h: string): [number, number, number] {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function readColors(): Colors {
  const C = {
    fg: tok("--fg"),
    muted: tok("--muted"),
    accent: tok("--accent"),
    warm: tok("--warm"),
    line: tok("--line"),
    surface: tok("--surface"),
    ramp: [] as string[],
  };
  const a = hexToRgb(C.accent);
  const w = hexToRgb(C.warm);
  C.ramp = Array.from({ length: 12 }, (_, k) => {
    const t = k / 11;
    const c = a.map((v, i) => Math.round(v + (w[i] - v) * t));
    return `rgba(${c[0]},${c[1]},${c[2]},0.85)`;
  });
  return C;
}

/** Size a canvas to its CSS box at device pixel ratio (capped at 2) and return a ready context. */
export function fit(cv: HTMLCanvasElement): Frame {
  const r = cv.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(r.width));
  const h = Math.max(1, Math.round(r.height));
  if (cv.width !== w * dpr || cv.height !== h * dpr) {
    cv.width = w * dpr;
    cv.height = h * dpr;
  }
  const ctx = cv.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

/** Call `cb` whenever the effective theme changes. Returns an unsubscribe function. */
export function onThemeChange(cb: () => void): () => void {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function gauss(): number {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

/** Small seeded PRNG (mulberry32) so generated sketches are stable between renders. */
export function rng(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
