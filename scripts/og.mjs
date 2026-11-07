// Generates public/og.png (1200x630), the site-wide social preview image.
// Run once after a design change: `node scripts/og.mjs`. Not part of the build.
// Draws a damped-pendulum phase portrait (the hero's first scene) in the site's dark palette.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const W = 1200, H = 630;
const BG = "#0A0E15", FG = "#E6E9EF", MUTED = "#8D96A9";
const ACCENT = [125, 182, 255], WARM = [240, 162, 78];

const mix = (t) => {
  const c = ACCENT.map((a, i) => Math.round(a + (WARM[i] - a) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

// Phase portrait on the right half: theta in [-2pi, 2pi], omega in [-3, 3].
const X0 = 690, X1 = W - 30, Y0 = 60, Y1 = H - 60;
const px = (x) => X0 + ((x + 2 * Math.PI) / (4 * Math.PI)) * (X1 - X0);
const py = (v) => Y0 + (1 - (v + 3) / 6) * (Y1 - Y0);

let seed = 3;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const paths = [];
for (let n = 0; n < 230; n++) {
  let x = (rand() * 2 - 1) * 2 * Math.PI, v = (rand() * 2 - 1) * 3;
  const E = (v * v) / 2 - Math.cos(x);
  const color = mix(Math.min(1, Math.max(0, (E + 1) / 3)));
  let d = `M${px(x).toFixed(1)},${py(v).toFixed(1)}`;
  for (let k = 0; k < 320; k++) {
    const dt = 0.02;
    v += (-Math.sin(x) - 0.12 * v) * dt;
    x += v * dt;
    if (Math.abs(x) > 2 * Math.PI || Math.abs(v) > 3.2) break;
    d += `L${px(x).toFixed(1)},${py(v).toFixed(1)}`;
  }
  paths.push(`<path d="${d}" stroke="${color}" stroke-opacity="0.55" stroke-width="1.3" fill="none" stroke-linecap="round"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="0.22" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g>${paths.join("")}</g>
  <rect x="${X0}" y="0" width="${X1 - X0}" height="${H}" fill="url(#fade)"/>
  <line x1="${X0}" x2="${X1}" y1="${py(0)}" y2="${py(0)}" stroke="${FG}" stroke-opacity="0.12"/>
  <circle cx="${px(0)}" cy="${py(0)}" r="6" fill="rgb(${ACCENT.join(",")})"/>
  <text x="72" y="118" font-family="Menlo, monospace" font-size="20" letter-spacing="3" fill="${MUTED}">PHYSICIST · DATA SCIENTIST</text>
  <text x="72" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="${FG}">Kemal Akın</text>
  <text x="72" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="38" fill="${FG}" fill-opacity="0.92">I model systems that evolve.</text>
  <text x="72" y="382" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="34" fill="rgb(${ACCENT.join(",")})">Early universe, now financial markets.</text>
  <text x="72" y="${H - 70}" font-family="Menlo, monospace" font-size="22" fill="${MUTED}">kemalakin.github.io</text>
</svg>`;

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("wrote", out);
