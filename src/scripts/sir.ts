export type SirRow = [s: number, i: number, r: number];

/**
 * Integrate the SIR model in population shares with classic RK4.
 * Starts from 0.1% infected; returns one row per day (days + 1 rows).
 */
export function simulateSIR(beta: number, gamma: number, days = 160, dt = 0.25): SirRow[] {
  let s = 0.999;
  let i = 0.001;
  let r = 0;
  const out: SirRow[] = [[s, i, r]];
  const f = (s: number, i: number): SirRow => [-beta * s * i, beta * s * i - gamma * i, gamma * i];
  const per = Math.round(1 / dt);
  for (let d = 1; d <= days; d++) {
    for (let k = 0; k < per; k++) {
      const k1 = f(s, i);
      const k2 = f(s + (dt / 2) * k1[0], i + (dt / 2) * k1[1]);
      const k3 = f(s + (dt / 2) * k2[0], i + (dt / 2) * k2[1]);
      const k4 = f(s + dt * k3[0], i + dt * k3[1]);
      s += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      i += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      r += (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    }
    out.push([s, i, r]);
  }
  return out;
}
