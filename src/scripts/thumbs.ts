// Generated, theme-aware thumbnails for the featured project cards.

import { TAU, fit, onThemeChange, readColors, rng, type Colors } from "./canvas";
import { simulateSIR } from "./sir";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, C: Colors) => void;

export const THUMBS: Record<string, Draw> = {
  sir(ctx, w, h, C) {
    const d = simulateSIR(0.32, 0.1);
    const p = 18;
    const X = (k: number) => p + (k / 160) * (w - 2 * p);
    const Y = (v: number) => h - p - v * (h - 2 * p - 22);
    const area = (idx: 0 | 1 | 2) => {
      ctx.beginPath();
      d.forEach((r, k) => (k ? ctx.lineTo(X(k), Y(r[idx])) : ctx.moveTo(X(k), Y(r[idx]))));
    };
    ctx.fillStyle = C.warm;
    ctx.globalAlpha = 0.14;
    area(1); ctx.lineTo(X(160), Y(0)); ctx.lineTo(X(0), Y(0)); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2; ctx.strokeStyle = C.muted; area(0); ctx.stroke();
    ctx.strokeStyle = C.accent; area(2); ctx.stroke();
    ctx.lineWidth = 2.6; ctx.strokeStyle = C.warm; area(1); ctx.stroke();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p, h - p); ctx.lineTo(w - p, h - p); ctx.stroke();
  },
  phase(ctx, w, h, C) {
    const cx = w / 2, cy = h / 2, sc = Math.min(w, h) / 6.4;
    ctx.lineWidth = 1.2;
    for (let a = 0; a < 18; a++) {
      let x = 2.9 * Math.cos((a / 18) * TAU);
      let y = 2.9 * Math.sin((a / 18) * TAU) * 0.9;
      ctx.strokeStyle = a % 3 === 0 ? C.warm : C.accent;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(cx + x * sc * 1.5, cy - y * sc);
      for (let k = 0; k < 700; k++) {
        const dt = 0.02, vx = y, vy = -x - 0.28 * y;
        x += vx * dt; y += vy * dt;
        ctx.lineTo(cx + x * sc * 1.5, cy - y * sc);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, TAU); ctx.fill();
  },
  inflation(ctx, w, h, C) {
    const p = 26, ns0 = 0.94, ns1 = 0.99, r1 = 0.2;
    const X = (ns: number) => p + ((ns - ns0) / (ns1 - ns0)) * (w - 2 * p);
    const Y = (r: number) => h - p - (r / r1) * (h - 2 * p);
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p, p); ctx.lineTo(p, h - p); ctx.lineTo(w - p, h - p); ctx.stroke();
    ctx.fillStyle = C.muted;
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillText("nₛ", w - p - 12, h - p + 16);
    ctx.fillText("r", p - 14, p + 8);
    const ell = (rx: number, ry: number, alpha: number) => {
      ctx.save();
      ctx.beginPath(); ctx.rect(p, p, w - 2 * p, h - 2 * p); ctx.clip();
      ctx.beginPath();
      ctx.ellipse(X(0.9649), Y(0), X(0.9649 + rx) - X(0.9649), Y(0) - Y(ry), 0, 0, TAU);
      ctx.fillStyle = C.accent; ctx.globalAlpha = alpha; ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
    };
    ell(0.0125, 0.065, 0.16);
    ell(0.0065, 0.036, 0.3);
    ctx.fillStyle = C.warm;
    ([[0.96, 0.16], [0.9633, 0.146], [0.9667, 0.132]] as const).forEach(([n, r]) => {
      ctx.beginPath(); ctx.arc(X(n), Y(r), 3.5, 0, TAU); ctx.fill();
    });
    ctx.fillText("φ²", X(0.9675) + 6, Y(0.15));
    ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.arc(X(0.9649), Y(0.0035), 3.5, 0, TAU); ctx.fill();
    ctx.fillText("R²", X(0.9649) + 7, Y(0.0035) - 6);
  },
  candles(ctx, w, h, C) {
    const rnd = rng(11), n = 34, p = 16;
    let price = 100;
    const cs: { o: number; c: number; hi: number; lo: number }[] = [];
    for (let k = 0; k < n; k++) {
      const o = price, c = o * (1 + (rnd() - 0.47) * 0.06);
      const hi = Math.max(o, c) * (1 + rnd() * 0.02), lo = Math.min(o, c) * (1 - rnd() * 0.02);
      cs.push({ o, c, hi, lo });
      price = c;
    }
    const mx = Math.max(...cs.map((c) => c.hi)), mn = Math.min(...cs.map((c) => c.lo));
    const Y = (v: number) => p + (1 - (v - mn) / (mx - mn)) * (h - 2 * p - 6);
    const bw = (w - 2 * p) / n;
    cs.forEach((c, k) => {
      const x = p + k * bw + bw / 2, up = c.c >= c.o;
      ctx.strokeStyle = ctx.fillStyle = up ? C.accent : C.warm;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, Y(c.hi)); ctx.lineTo(x, Y(c.lo)); ctx.stroke();
      ctx.fillRect(x - bw * 0.3, Y(Math.max(c.o, c.c)), bw * 0.6, Math.max(1, Math.abs(Y(c.o) - Y(c.c))));
    });
    ctx.strokeStyle = C.fg; ctx.globalAlpha = 0.45; ctx.lineWidth = 1.5;
    ctx.beginPath();
    cs.forEach((_, k) => {
      if (k < 4) return;
      const m = cs.slice(k - 4, k + 1).reduce((a, b) => a + b.c, 0) / 5;
      const x = p + k * bw + bw / 2;
      if (k === 4) ctx.moveTo(x, Y(m));
      else ctx.lineTo(x, Y(m));
    });
    ctx.stroke();
    ctx.globalAlpha = 1;
  },
};

export function initThumbs(): () => void {
  const draw = () => {
    const C = readColors();
    document.querySelectorAll<HTMLCanvasElement>("canvas[data-thumb]").forEach((cv) => {
      const fn = THUMBS[cv.dataset.thumb ?? ""];
      if (!fn || cv.offsetParent === null) return;
      const { ctx, w, h } = fit(cv);
      ctx.clearRect(0, 0, w, h);
      fn(ctx, w, h, C);
    });
  };
  draw();
  document.fonts?.ready.then(draw);
  let rt = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(rt);
    rt = window.setTimeout(draw, 120);
  });
  document.querySelectorAll("canvas[data-thumb]").forEach((cv) => ro.observe(cv));
  const offTheme = onThemeChange(draw);
  return () => {
    ro.disconnect();
    offTheme();
    clearTimeout(rt);
  };
}
