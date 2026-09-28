/**
 * Nine-slice hand-drawn borders.
 *
 * A wobbly border must stretch to whatever box it decorates. The only way to
 * do that without measuring the element in the browser is `border-image`, so
 * we draw the slice once here and let CSS scale it.
 *
 * Two details make it look right rather than merely functional:
 *   - the straight runs along each edge are drawn with `roughness: 0`, because
 *     CSS stretches the middle of the slice and a wobbly middle turns into a
 *     smear;
 *   - the corners carry all the character, and CSS never distorts corners.
 *
 * `round` repeat then tiles the straight middle so the border still reads as
 * drawn rather than ruled. Everything runs at module load into a static data
 * URI, so there is no runtime cost and no client JavaScript.
 */

import { createRandom, jitter } from "./prng";

const SIZE = 100;
/** Must match the `border-image-slice` used in CSS. */
export const SLICE = 26;
export const BORDER_WIDTH = 3;

export type FrameStyle = "solid" | "double";

export type FrameOptions = {
  seed: string;
  /** Corner radius in slice units. */
  radius?: number;
  stroke?: string;
  strokeWidth?: number;
  /** How shakier the corners get. */
  roughness?: number;
  style?: FrameStyle;
  /** Gap between the canvas edge and the line, as a 0-1 fraction. */
  inset?: number;
};

type Path = { d: string; fill?: string };

/**
 * Builds the outline as four straight runs and four corner arcs, kept as
 * separate strings.
 *
 * The separation is the whole point. CSS stretches the middle of each edge
 * slice to whatever width the box happens to be, so any wobble in a straight
 * run gets magnified into a visible ripple. Runs are therefore emitted
 * exactly straight, and all the character is put into the corners, which are
 * never distorted.
 */
function roundedRectParts(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  const right = x + width;
  const bottom = y + height;

  return {
    start: [x + r, y] as const,
    topEnd: [right - r, y] as const,
    cornerTR: { from: [right - r, y] as const, ctrl: [right, y] as const, to: [right, y + r] as const },
    rightEnd: [right, bottom - r] as const,
    cornerBR: { from: [right, bottom - r] as const, ctrl: [right, bottom] as const, to: [right - r, bottom] as const },
    bottomEnd: [x + r, bottom] as const,
    cornerBL: { from: [x + r, bottom] as const, ctrl: [x, bottom] as const, to: [x, bottom - r] as const },
    leftEnd: [x, y + r] as const,
    cornerTL: { from: [x, y + r] as const, ctrl: [x, y] as const, to: [x + r, y] as const },
  };
}

const p = (v: number) => Math.round(v * 100) / 100;

/** The same outline with no irregularity, for `roughness: 0`. */
function straightOutline(parts: ReturnType<typeof roundedRectParts>): string {
  return [
    `M${p(parts.start[0])} ${p(parts.start[1])}`,
    `L${p(parts.topEnd[0])} ${p(parts.topEnd[1])}`,
    `Q${p(parts.cornerTR.ctrl[0])} ${p(parts.cornerTR.ctrl[1])} ${p(parts.cornerTR.to[0])} ${p(parts.cornerTR.to[1])}`,
    `L${p(parts.rightEnd[0])} ${p(parts.rightEnd[1])}`,
    `Q${p(parts.cornerBR.ctrl[0])} ${p(parts.cornerBR.ctrl[1])} ${p(parts.cornerBR.to[0])} ${p(parts.cornerBR.to[1])}`,
    `L${p(parts.bottomEnd[0])} ${p(parts.bottomEnd[1])}`,
    `Q${p(parts.cornerBL.ctrl[0])} ${p(parts.cornerBL.ctrl[1])} ${p(parts.cornerBL.to[0])} ${p(parts.cornerBL.to[1])}`,
    `L${p(parts.leftEnd[0])} ${p(parts.leftEnd[1])}`,
    `Q${p(parts.cornerTL.ctrl[0])} ${p(parts.cornerTL.ctrl[1])} ${p(parts.cornerTL.to[0])} ${p(parts.cornerTL.to[1])}`,
    "Z",
  ].join(" ");
}

/**
 * Nudges the four corner arcs, leaving every straight run untouched. This is
 * the only source of irregularity in the slice.
 */
function roughOutline(
  parts: ReturnType<typeof roundedRectParts>,
  seed: string,
  amount: number
): string {
  const random = createRandom(seed);
  const shake = (v: number) => p(v + jitter(random, amount));

  const arc = ({ ctrl, to }: (typeof parts)["cornerTR"]) =>
    `Q${p(ctrl[0])} ${shake(ctrl[1])} ${shake(to[0])} ${p(to[1])}`;

  // Shaking a control point along one axis only. Shaking both would pull the
  // curve off the edge it is supposed to be smoothing.
  const arcH = ({ from, ctrl, to }: (typeof parts)["cornerTR"]) =>
    `Q${shake(ctrl[0])} ${p(ctrl[1])} ${p(to[0])} ${shake(to[1])}`;

  return [
    `M${p(parts.start[0])} ${p(parts.start[1])}`,
    `L${p(parts.topEnd[0])} ${p(parts.topEnd[1])}`,
    arcH(parts.cornerTR),
    `L${p(parts.rightEnd[0])} ${p(parts.rightEnd[1])}`,
    arc(parts.cornerBR),
    `L${p(parts.bottomEnd[0])} ${p(parts.bottomEnd[1])}`,
    arcH(parts.cornerBL),
    `L${p(parts.leftEnd[0])} ${p(parts.leftEnd[1])}`,
    arc(parts.cornerTL),
    "Z",
  ].join(" ");
}

function render(paths: Path[], stroke: string, strokeWidth: number): string {
  const body = paths
    .map(({ d, fill }) =>
      fill
        ? `<path d="${d}" fill="${fill}" stroke="none"/>`
        : `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/>`
    )
    .join("");

  // Explicit width and height matter. Without them the image has no intrinsic
  // size, so `border-image-slice: 26` has an ambiguous reference and the
  // browser scales the slice inconsistently, which shows up as stray coloured
  // specks along the edges.
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" ` +
    `viewBox="0 0 ${SIZE} ${SIZE}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
  );
}

const cache = new Map<string, string>();

/** Returns a `border-image-source` value. Memoised on the full option set. */
export function sketchBorderImage(options: FrameOptions): string {
  const {
    seed,
    radius = 11,
    stroke = "#173A29",
    strokeWidth = BORDER_WIDTH,
    roughness = 1,
    style = "solid",
    inset = 0.08,
  } = options;

  const key = JSON.stringify([seed, radius, stroke, strokeWidth, roughness, style, inset]);
  const hit = cache.get(key);
  if (hit) return hit;

  const lo = inset * SIZE;
  const hi = SIZE - inset * SIZE;
  const size = hi - lo;
  const parts = roundedRectParts(lo, lo, size, size, radius);
  const outline = roughness > 0 ? roughOutline(parts, seed, roughness) : straightOutline(parts);

  const paths: Path[] = [{ d: outline }];
  if (style === "double") {
    const inner = roundedRectParts(lo, lo, size, size, radius * 0.72);
    paths.push({
      d: roughness > 0 ? roughOutline(inner, `${seed}:inner`, roughness) : straightOutline(inner),
    });
  }

  const svg = render(paths, stroke, strokeWidth).replace(/\s+/g, " ").trim();
  const value = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  cache.set(key, value);
  return value;
}

/**
 * CSS custom properties for a hand-drawn border. Spread onto a class or inline
 * style; the class only needs to set the width and padding.
 */
export function frameVars(options: FrameOptions): Record<string, string> {
  return {
    "--frame-image": sketchBorderImage(options),
    "--frame-slice": String(SLICE),
    "--frame-width": `${BORDER_WIDTH}px`,
  };
}
