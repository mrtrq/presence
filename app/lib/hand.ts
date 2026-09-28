/**
 * Seeded hand-drawn geometry.
 *
 * This is the half of the sketch system that rough.js does not cover: shapes
 * that must be derived ourselves, be deterministic, and survive being stretched
 * by CSS. Every function takes a seed and returns plain path data, so results
 * are identical on the server and the client and can be memoised.
 */

import { createRandom, jitter } from "./prng";

export type Pt = [number, number];

const n = (value: number) => Math.round(value * 100) / 100;

/**
 * Walks a polyline, nudging each interior point perpendicular to the local
 * direction. Endpoints are pinned so lines still meet at their corners.
 */
export function wobbleLine(points: Pt[], seed: string, amount = 2): string {
  if (points.length < 2) return "";
  const random = createRandom(seed);
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;

  for (let i = 1; i < points.length; i += 1) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const dx = cx - px;
    const dy = cy - py;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    // Taper the wobble at both ends so segments join cleanly.
    const taper = Math.min(1, Math.min(i, points.length - 1) / 2);
    const off = jitter(random, amount) * taper;
    d += `L${n(cx + nx * off)} ${n(cy + ny * off)}`;
  }

  return d;
}

/** Smooths a point list into a curve by passing through midpoints. */
export function smoothPath(points: Pt[], seed: string, amount = 2): string {
  if (points.length < 3) return wobbleLine(points, seed, amount);

  const random = createRandom(seed);
  const moved: Pt[] = points.map(([x, y], i) => {
    if (i === 0 || i === points.length - 1) return [x, y];
    return [x + jitter(random, amount * 0.6), y + jitter(random, amount * 0.6)] as Pt;
  });

  let d = `M${n(moved[0][0])} ${n(moved[0][1])}`;
  for (let i = 1; i < moved.length - 1; i += 1) {
    const midX = (moved[i][0] + moved[i + 1][0]) / 2;
    const midY = (moved[i][1] + moved[i + 1][1]) / 2;
    d += `Q${n(moved[i][0])} ${n(moved[i][1])} ${n(midX)} ${n(midY)}`;
  }
  const last = moved[moved.length - 1];
  d += `L${n(last[0])} ${n(last[1])}`;
  return d;
}

/** Rounded-rectangle corner and edge run, wobbled. */
export function roundRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  seed: string,
  amount = 2
): string {
  const r = Math.min(radius, width / 2, height / 2);
  const right = x + width;
  const bottom = y + height;

  return [
    `M${n(x + r)} ${n(y)}`,
    `L${n(right - r)} ${n(y)}`,
    `Q${n(right)} ${n(y)} ${n(right)} ${n(y + r)}`,
    `L${n(right)} ${n(bottom - r)}`,
    `Q${n(right)} ${n(bottom)} ${n(right - r)} ${n(bottom)}`,
    `L${n(x + r)} ${n(bottom)}`,
    `Q${n(x)} ${n(bottom)} ${n(x)} ${n(bottom - r)}`,
    `L${n(x)} ${n(y + r)}`,
    `Q${n(x)} ${n(y)} ${n(x + r)} ${n(y)}`,
    "Z",
  ].join(" ");
}

/** Samples a sine wave along a line. Used for waves, dividers, and squiggles. */
export function wavePath(
  x: number,
  y: number,
  width: number,
  amplitude: number,
  periods: number,
  phase = 0
): string {
  const steps = Math.max(8, Math.round(periods * 8));
  let d = "";

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const px = x + t * width;
    const py = y + Math.sin(t * Math.PI * 2 * periods + phase) * amplitude;
    d += `${i === 0 ? "M" : "L"}${n(px)} ${n(py)}`;
  }

  return d;
}

/** A single sparkle / star burst. */
export function starPath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points = 4,
  rotate = 0
): string {
  const pts: Pt[] = [];

  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = rotate + (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }

  return (
    pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`)
      .join(" ") + " Z"
  );
}

/** Irregular closed blob, for highlighter-style highlights behind text. */
export function blobPath(
  cx: number,
  cy: number,
  width: number,
  height: number,
  seed: string,
  lobes = 9
): string {
  const random = createRandom(seed);
  const pts: Pt[] = [];

  for (let i = 0; i < lobes; i += 1) {
    const angle = (i / lobes) * Math.PI * 2;
    const wobble = 0.86 + random() * 0.28;
    pts.push([
      cx + (Math.cos(angle) * width * wobble) / 2,
      cy + (Math.sin(angle) * height * wobble) / 2,
    ]);
  }

  return smoothPath([...pts, pts[0]], seed, 1.4);
}

/** Hand-lettered-looking underline: a stroke that overshoots at both ends. */
export function underlinePath(
  x: number,
  y: number,
  width: number,
  seed: string,
  amount = 1.6
): string {
  const random = createRandom(seed);
  const overshoot = 3 + random() * 4;
  const drop = 1 + random() * 2;

  return [
    `M${n(x - overshoot)} ${n(y - drop)}`,
    `C${n(x + width * 0.3)} ${n(y + 2.4)} ${n(x + width * 0.7)} ${n(y - 2.4)} ${n(x + width + overshoot)} ${n(y + drop * 0.4)}`,
  ].join(" ");
}

/** Curved arrow with an open hand-drawn head. */
export function arrowPath(
  x: number,
  y: number,
  width: number,
  curve = 14,
  seed = "arrow"
): string {
  const head = 11;
  const tipX = x + width;
  const tipY = y;

  return [
    `M${n(x)} ${n(y)}`,
    `Q${n(x + width * 0.5)} ${n(y - curve)} ${n(tipX)} ${n(tipY)}`,
    `M${n(tipX - head)} ${n(tipY - head * 0.72)}`,
    `L${n(tipX)} ${n(tipY)}`,
    `L${n(tipX - head * 0.9)} ${n(tipY + head * 0.66)}`,
  ].join(" ");
}

/** Wraps path data in an inline SVG data URI. */
export function svgDataUri(
  width: number,
  height: number,
  paths: { d: string; stroke?: string; fill?: string; width?: number; opacity?: number }[]
): string {
  const body = paths
    .map(({ d, stroke = "currentColor", fill = "none", width: w = 2, opacity = 1 }) =>
      `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${opacity !== 1 ? ` opacity="${opacity}"` : ""}/>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
