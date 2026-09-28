/**
 * rough.js adapter for server-rendered art.
 *
 * `roughjs`'s SVG renderer needs a live DOM node, which is no use in a React
 * server component. Its lower-level `generator()` has no such requirement: hand
 * it a shape and a seed, and it returns plain path data. Because the seed
 * drives a deterministic PRNG, the same call produces byte-identical output on
 * the server and on the client, so this is safe to run during render.
 *
 * Used for fixed-size art: the hero landscape, blob dividers, stamp circles.
 * Fluid containers (cards, panels) use `RoughFrame` instead, which measures.
 */

import rough from "roughjs/bundled/rough.esm.js";
import { hashSeed } from "@/app/lib/prng";

type Op = { op: string; data: number[] };
type OpSet = { type: string; ops: Op[]; path?: string };
export type SketchShape = { shape: string; sets: OpSet[]; options: Record<string, unknown> };

export type SketchOptions = {
  seed: string | number;
  /** Stroke colour. Defaults to the theme ink. */
  stroke?: string;
  strokeWidth?: number;
  /** Fill colour for `fillStyle: "solid"`. */
  fill?: string;
  fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed";
  fillWeight?: number;
  hachureGap?: number;
  roughness?: number;
  bowing?: number;
  /** Double-strokes the outline so it reads as a pen gone over twice. */
  disableMultiStroke?: boolean;
  /** Rounds off the ends of open paths. */
  cap?: "round" | "butt" | "square";
};

export const INK = "#173A29";

/** A single renderable `<path>` extracted from a rough.js shape. */
export type SketchPath = { d: string; kind: "stroke" | "fill" };

function opsToD(ops: Op[]): string {
  let d = "";

  for (const { op, data } of ops) {
    switch (op) {
      case "move":
        d += `M${data[0].toFixed(2)} ${data[1].toFixed(2)}`;
        break;
      case "l":
      case "lineTo":
        d += `L${data[0].toFixed(2)} ${data[1].toFixed(2)}`;
        break;
      case "bcurveTo":
        d += `C${data[0].toFixed(2)} ${data[1].toFixed(2)} ${data[2].toFixed(2)} ${data[3].toFixed(2)} ${data[4].toFixed(2)} ${data[5].toFixed(2)}`;
        break;
      case "bcurve":
        d += `Q${data[0].toFixed(2)} ${data[1].toFixed(2)} ${data[2].toFixed(2)} ${data[3].toFixed(2)}`;
        break;
      case "curve":
        d += `C${data[0].toFixed(2)} ${data[1].toFixed(2)} ${data[2].toFixed(2)} ${data[3].toFixed(2)} ${data[4].toFixed(2)} ${data[5].toFixed(2)}`;
        break;
      case "arc":
        d += `A${data[1].toFixed(2)} ${data[1].toFixed(2)} 0 0 ${data[2] ? 1 : 0} ${data[3].toFixed(2)} ${data[4].toFixed(2)}`;
        break;
      default:
        break;
    }
  }

  return d;
}

/**
 * rough.js returns sets, not paths. The convention is that the last set is the
 * outline and any earlier sets are fill work, so we walk backwards and let
 * callers layer them in paint order.
 */
function toPaths(shape: SketchShape): SketchPath[] {
  const sets = shape.sets.filter((set) => Array.isArray(set.ops) && set.ops.length > 0);
  const fillSet = sets.find((set) => set.type !== "path");
  const strokeSet = sets.find((set) => set.type === "path");

  const paths: SketchPath[] = [];
  if (fillSet) paths.push({ d: opsToD(fillSet.ops), kind: "fill" });
  if (strokeSet) paths.push({ d: opsToD(strokeSet.ops), kind: "stroke" });
  return paths;
}

function generator() {
  return rough.generator();
}

function withDefaults(options: SketchOptions) {
  const {
    seed,
    stroke = INK,
    strokeWidth = 2.4,
    fill,
    fillStyle,
    fillWeight = 1,
    hachureGap = 7,
    roughness = 1,
    bowing = 1.4,
    disableMultiStroke = false,
    cap = "round",
  } = options;

  return {
    seed: hashSeed(seed),
    stroke,
    strokeWidth,
    roughness,
    bowing,
    disableMultiStroke,
    fill,
    fillStyle,
    fillWeight,
    hachureGap,
    strokeLinecap: cap,
  };
}

export function sketchRect(width: number, height: number, options: SketchOptions) {
  return toPaths(generator().rectangle(0, 0, width, height, withDefaults(options)));
}

export function sketchEllipse(
  cx: number,
  cy: number,
  width: number,
  height: number,
  options: SketchOptions
) {
  return toPaths(generator().ellipse(cx, cy, width, height, withDefaults(options)));
}

export function sketchLine(x1: number, y1: number, x2: number, y2: number, options: SketchOptions) {
  return toPaths(generator().line(x1, y1, x2, y2, withDefaults(options)));
}

export function sketchPolyline(points: number[][], options: SketchOptions) {
  return toPaths(generator().linearPath(points, withDefaults(options)));
}

export function sketchCurve(points: number[][], options: SketchOptions) {
  return toPaths(generator().curve(points, withDefaults(options)));
}

export function sketchPolygon(points: number[][], options: SketchOptions) {
  return toPaths(generator().polygon(points, withDefaults(options)));
}

export function sketchArc(
  cx: number,
  cy: number,
  radius: number,
  start: number,
  stop: number,
  options: SketchOptions & { closed?: boolean }
) {
  const { closed, ...rest } = options;
  return toPaths(
    generator().arc(cx, cy, radius, start, stop, closed ?? false, withDefaults(rest))
  );
}

/**
 * Serialises paths into a standalone SVG data URI. Useful for CSS-only
 * decoration where an inline element is not possible.
 */
export function toDataUri(
  width: number,
  height: number,
  paths: SketchPath[],
  { stroke = INK, strokeWidth = 2.4, fill = "none" }: SketchOptions = { seed: 0 }
) {
  const body = paths
    .map(({ d, kind }) => {
      const paint =
        kind === "fill" ? fill : `stroke="${stroke}" stroke-width="${strokeWidth}" fill="none"`;
      return `<path d="${d}" ${paint}/>`;
    })
    .join("");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ` +
    `stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
