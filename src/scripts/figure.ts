// Shared plumbing for the interactive note figures: lifecycle under ClientRouter, slider wiring,
// resize / theme redraws, axes, seeded normals and a few numeric helpers.
import { fit, onThemeChange, readColors, rng, type Colors, type Frame } from "./canvas";

export type { Colors, Frame };
export { fit, rng };

export interface Env {
  /** Current theme colors; refreshed before a redraw when light/dark flips. */
  C: Colors;
}

export interface Figure {
  draw: () => void;
  dispose?: () => void;
}

/**
 * Initialise every element carrying `attr` on each `astro:page-load` and clean up on `astro:before-swap`.
 * Every `input[data-in]` inside the root redraws on input; canvases redraw on resize.
 */
export function mount(attr: string, setup: (root: HTMLElement, env: Env) => Figure): void {
  let cleanups: (() => void)[] = [];
  const stop = () => {
    cleanups.forEach((c) => c());
    cleanups = [];
  };
  document.addEventListener("astro:page-load", () => {
    stop();
    cleanups = Array.from(document.querySelectorAll<HTMLElement>(`[${attr}]`)).map((root) => {
      const env: Env = { C: readColors() };
      const fig = setup(root, env);
      root.querySelectorAll<HTMLInputElement>("input[data-in]").forEach((i) => i.addEventListener("input", fig.draw));
      let rt = 0;
      const ro = new ResizeObserver(() => {
        clearTimeout(rt);
        rt = window.setTimeout(fig.draw, 80);
      });
      root.querySelectorAll("canvas").forEach((c) => ro.observe(c));
      const offTheme = onThemeChange(() => {
        env.C = readColors();
        fig.draw();
      });
      document.fonts?.ready.then(fig.draw);
      fig.draw();
      return () => {
        ro.disconnect();
        offTheme();
        clearTimeout(rt);
        fig.dispose?.();
      };
    });
  });
  document.addEventListener("astro:before-swap", stop);
}

export const $in = (root: HTMLElement, k: string) => root.querySelector<HTMLInputElement>(`[data-in="${k}"]`)!;
export const $out = (root: HTMLElement, k: string) => root.querySelector<HTMLElement>(`[data-out="${k}"]`)!;

/**
 * Segmented toggle: buttons with `data-mode` inside `[data-seg]`. Calls `onChange` with the chosen mode and
 * shows only the `[data-show]` blocks whose value matches it.
 */
export function segmented(root: HTMLElement, onChange: (mode: string) => void): () => string {
  const btns = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-seg] [data-mode]"));
  let mode = btns.find((b) => b.getAttribute("aria-pressed") === "true")?.dataset.mode ?? btns[0]?.dataset.mode ?? "";
  const apply = () => {
    btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    root.querySelectorAll<HTMLElement>("[data-show]").forEach((el) => {
      el.hidden = !el.dataset.show!.split(" ").includes(mode);
    });
  };
  btns.forEach((b) =>
    b.addEventListener("click", () => {
      mode = b.dataset.mode!;
      apply();
      onChange(mode);
    }),
  );
  apply();
  return () => mode;
}

/** `n` standard normal draws from a seeded generator (Box–Muller). */
export function normals(seed: number, n: number): Float64Array {
  const r = rng(seed);
  const z = new Float64Array(n);
  for (let i = 0; i < n; i += 2) {
    let u = 0;
    while (!u) u = r();
    const v = r();
    const m = Math.sqrt(-2 * Math.log(u));
    z[i] = m * Math.cos(2 * Math.PI * v);
    if (i + 1 < n) z[i + 1] = m * Math.sin(2 * Math.PI * v);
  }
  return z;
}

/** Standard normal CDF (Abramowitz–Stegun 7.1.26, error < 1.5e-7). */
export function phi(x: number): number {
  const t = 1 / (1 + (0.3275911 * Math.abs(x)) / Math.SQRT2);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-(x * x) / 2);
  return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

/** Black–Scholes call price. */
export function bsCall(S: number, K: number, T: number, r: number, s: number): number {
  if (T <= 0 || s <= 0) return Math.max(S - K * Math.exp(-r * T), 0);
  const d1 = (Math.log(S / K) + (r + (s * s) / 2) * T) / (s * Math.sqrt(T));
  return S * phi(d1) - K * Math.exp(-r * T) * phi(d1 - s * Math.sqrt(T));
}

/** Implied volatility of a call by bisection; NaN outside the no-arbitrage bounds. */
export function impliedVol(c: number, S: number, K: number, T: number, r: number): number {
  const lower = Math.max(S - K * Math.exp(-r * T), 0);
  if (!(c > lower && c < S)) return NaN;
  let lo = 1e-4, hi = 5;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if (bsCall(S, K, T, r, m) > c) hi = m;
    else lo = m;
  }
  return (lo + hi) / 2;
}

/** About `n` "nice" linear ticks covering [lo, hi]. */
export function niceTicks(lo: number, hi: number, n = 5): number[] {
  const span = hi - lo || 1;
  const raw = span / n;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + step * 1e-9; v += step) out.push(+v.toFixed(12));
  return out;
}

export interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export interface Axis {
  lo: number;
  hi: number;
  ticks?: number[];
  fmt?: (v: number) => string;
  label?: string;
}

/** Grid lines, tick labels and optional axis labels for a box; returns the data → pixel maps. */
export function axes(
  ctx: CanvasRenderingContext2D,
  C: Colors,
  b: Box,
  xa: Axis,
  ya: Axis,
): { X: (v: number) => number; Y: (v: number) => number } {
  const X = (v: number) => b.x0 + ((v - xa.lo) / (xa.hi - xa.lo)) * (b.x1 - b.x0);
  const Y = (v: number) => b.y1 - ((v - ya.lo) / (ya.hi - ya.lo)) * (b.y1 - b.y0);
  ctx.save();
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.lineWidth = 1;
  ctx.strokeStyle = C.line;
  ctx.fillStyle = C.muted;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const v of ya.ticks ?? niceTicks(ya.lo, ya.hi, 4)) {
    if (v < ya.lo || v > ya.hi) continue;
    const y = Math.round(Y(v)) + 0.5;
    ctx.beginPath();
    ctx.moveTo(b.x0, y);
    ctx.lineTo(b.x1, y);
    ctx.stroke();
    ctx.fillText((ya.fmt ?? String)(v), b.x0 - 6, y);
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (const v of xa.ticks ?? niceTicks(xa.lo, xa.hi, 5)) {
    if (v < xa.lo || v > xa.hi) continue;
    ctx.fillText((xa.fmt ?? String)(v), X(v), b.y1 + 6);
  }
  if (xa.label) {
    ctx.textAlign = "right";
    ctx.fillText(xa.label, b.x1, b.y1 + 20);
  }
  if (ya.label) {
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(ya.label, b.x0, b.y0 - 4);
  }
  ctx.restore();
  return { X, Y };
}

/** Polyline through (xs[i], ys[i]) in pixel space. */
export function line(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, width = 1.5, dash: number[] = []): void {
  if (!pts.length) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
  ctx.restore();
}

/** Small text label in the figure's mono font. */
export function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, align: CanvasTextAlign = "left"): void {
  ctx.save();
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

/** Sample autocorrelation at lags 1..maxLag. */
export function acf(x: ArrayLike<number>, maxLag: number): number[] {
  const n = x.length;
  let m = 0;
  for (let i = 0; i < n; i++) m += x[i];
  m /= n;
  let d = 0;
  for (let i = 0; i < n; i++) d += (x[i] - m) ** 2;
  const out: number[] = [];
  for (let k = 1; k <= maxLag; k++) {
    let s = 0;
    for (let i = k; i < n; i++) s += (x[i] - m) * (x[i - k] - m);
    out.push(s / d);
  }
  return out;
}

export const pct = (v: number, d = 0) => (v * 100).toFixed(d) + "%";
