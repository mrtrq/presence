/**
 * Doodle library.
 *
 * Small hand-drawn illustrations used as scene furniture: markers, clouds,
 * plants, telescopes, stamps. They share one stroke weight and one set of
 * wobble parameters so the whole site reads as drawn by a single hand.
 *
 * All shapes are deterministic, so these are server components and cost no
 * client JavaScript.
 */

import {
  smoothPath,
  starPath,
  wavePath,
  wobbleLine,
  underlinePath,
  arrowPath,
  blobPath,
} from "@/app/lib/hand";
import type { Pt } from "@/app/lib/hand";

export const INK = "#173A29";

/**
 * Every doodle takes the same props, so callers can resize one without
 * dropping down to a raw `<svg>`. Size is optional: omit it and the component
 * fills whatever box it is placed in, which is what CSS-driven placements want.
 */
type DoodleProps = {
  className?: string;
  title?: string;
  size?: number;
};

function Svg({
  children,
  viewBox,
  className,
  title,
  size,
  stroke = INK,
  fill = "none",
}: DoodleProps & { children: React.ReactNode; viewBox: string; stroke?: string; fill?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      fill={fill}
      stroke={stroke}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Markers                                                                     */
/* -------------------------------------------------------------------------- */

export function Highlighter({ className, title }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true" fill="none">
      <title>{title}</title>
      <path d={blobPath(60, 20, 116, 34, "hl:1", 11)} fill="currentColor" opacity={0.28} />
      <path
        d={wobbleLine(
          [
            [6, 20],
            [114, 20],
          ],
          "hl:line",
          1.4
        )}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}

export function CircleAround({ children }: { children: React.ReactNode }) {
  return (
    <span className="sketch-circle">
      <svg viewBox="0 0 200 90" className="sketch-circle-ring" aria-hidden="true" fill="none">
        <path
          d={smoothPath(
            ringPoints(100, 45, 92, 34, "circle"),
            "circle",
            2.4
          )}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d={smoothPath(
            ringPoints(100, 45, 88, 31, "circle2", 0.4),
            "circle2",
            2.8
          )}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.55}
        />
      </svg>
      <span className="sketch-circle-text">{children}</span>
    </span>
  );
}

function ringPoints(cx: number, cy: number, rx: number, ry: number, seed: string, phase = 0): Pt[] {
  const pts: Pt[] = [];
  const steps = 26;
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * Math.PI * 2 + phase;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return pts;
}

/* -------------------------------------------------------------------------- */
/* Scene furniture                                                             */
/* -------------------------------------------------------------------------- */

export function Sun({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 120 120" className={className} title={title} size={size}>
      <circle cx="60" cy="60" r="26" fill="currentColor" opacity={0.16} />
      <path
        d={smoothPath(ringPoints(60, 60, 27, 26, "sun"), "sun", 1.8)}
        strokeWidth={2.8}
      />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + 0.2;
        const inner = 38;
        const outer = 48 + (i % 2 ? 3 : 0);
        return (
          <path
            key={i}
            d={wobbleLine(
              [
                [60 + Math.cos(a) * inner, 60 + Math.sin(a) * inner],
                [60 + Math.cos(a) * outer, 60 + Math.sin(a) * outer],
              ],
              `sun-ray-${i}`,
              1.4
            )}
            strokeWidth={2.6}
          />
        );
      })}
    </Svg>
  );
}

export function Cloud({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 160 90" className={className} title={title} size={size}>
      <path
        d={smoothPath(
          [
            [22, 66],
            [16, 52],
            [30, 40],
            [48, 42],
            [58, 24],
            [82, 20],
            [96, 36],
            [118, 34],
            [132, 48],
            [126, 66],
            [22, 66],
          ],
          "cloud",
          2.2
        )}
        strokeWidth={2.8}
      />
      <path
        d={wobbleLine(
          [
            [34, 74],
            [118, 74],
          ],
          "cloud-base",
          1.6
        )}
        strokeWidth={2}
        opacity={0.45}
      />
    </Svg>
  );
}

export function Plant({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 100 140" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [50, 132],
            [50, 62],
          ],
          "stem",
          1.6
        )}
        strokeWidth={2.8}
      />
      <path
        d={smoothPath(
          [
            [50, 84],
            [30, 74],
            [18, 52],
            [34, 44],
            [50, 66],
            [50, 84],
          ],
          "leaf-left",
          1.8
        )}
        strokeWidth={2.6}
      />
      <path
        d={smoothPath(
          [
            [50, 70],
            [70, 58],
            [80, 34],
            [64, 28],
            [50, 52],
            [50, 70],
          ],
          "leaf-right",
          1.8
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [24, 132],
            [76, 132],
          ],
          "pot-base",
          1.4
        )}
        strokeWidth={2.8}
      />
      <path
        d={wobbleLine(
          [
            [32, 132],
            [38, 100],
          ],
          "pot-left",
          1.2
        )}
        strokeWidth={2.4}
      />
      <path
        d={wobbleLine(
          [
            [68, 132],
            [62, 100],
          ],
          "pot-right",
          1.2
        )}
        strokeWidth={2.4}
      />
    </Svg>
  );
}

export function Telescope({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 140 130" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [26, 122],
            [74, 122],
          ],
          "tripod-base",
          1.4
        )}
        strokeWidth={3}
      />
      <path d={wobbleLine([[50, 122], [66, 74]], "tripod-a", 1.4)} strokeWidth={2.6} />
      <path d={wobbleLine([[50, 122], [40, 78]], "tripod-b", 1.4)} strokeWidth={2.6} />
      <path d={wobbleLine([[44, 122], [66, 78]], "tripod-c", 1.2)} strokeWidth={2.2} opacity={0.7} />
      <path
        d={wobbleLine(
          [
            [58, 80],
            [124, 44],
          ],
          "tube",
          1.2
        )}
        strokeWidth={3.2}
      />
      <path
        d={wobbleLine(
          [
            [66, 88],
            [118, 58],
          ],
          "tube-2",
          1
        )}
        strokeWidth={2}
        opacity={0.6}
      />
      <path d={starPath(126, 34, 11, 4.2, 4, 0.3)} fill="currentColor" strokeWidth={1.6} />
      <path d={starPath(110, 20, 6, 2.4, 4, 0.1)} fill="currentColor" strokeWidth={1.2} opacity={0.7} />
    </Svg>
  );
}

export function Book({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 130 100" className={className} title={title} size={size}>
      <path
        d={smoothPath(
          [
            [10, 22],
            [62, 30],
            [65, 88],
            [10, 80],
            [10, 22],
          ],
          "book-left",
          1.8
        )}
        strokeWidth={2.6}
      />
      <path
        d={smoothPath(
          [
            [120, 22],
            [68, 30],
            [65, 88],
            [120, 80],
            [120, 22],
          ],
          "book-right",
          1.8
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [20, 40],
            [54, 44],
          ],
          "book-line-1",
          1
        )}
        strokeWidth={1.8}
        opacity={0.6}
      />
      <path
        d={wobbleLine(
          [
            [20, 54],
            [54, 58],
          ],
          "book-line-2",
          1
        )}
        strokeWidth={1.8}
        opacity={0.6}
      />
      <path
        d={wobbleLine(
          [
            [76, 44],
            [110, 40],
          ],
          "book-line-3",
          1
        )}
        strokeWidth={1.8}
        opacity={0.6}
      />
    </Svg>
  );
}

export function Sprout({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 80 80" className={className} title={title} size={size}>
      <path d={wobbleLine([[40, 74], [40, 34]], "sprout-stem", 1.2)} strokeWidth={2.4} />
      <path
        d={smoothPath(
          [
            [40, 46],
            [24, 42],
            [18, 28],
            [32, 24],
            [40, 40],
          ],
          "sprout-left",
          1.2
        )}
        strokeWidth={2.2}
      />
      <path
        d={smoothPath(
          [
            [40, 38],
            [56, 34],
            [62, 20],
            [48, 16],
            [40, 32],
          ],
          "sprout-right",
          1.2
        )}
        strokeWidth={2.2}
      />
    </Svg>
  );
}

export function Mountain({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 200 90" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [6, 84],
            [52, 26],
            [86, 62],
            [118, 20],
            [194, 84],
          ],
          "ridge",
          2.2
        )}
        strokeWidth={2.8}
      />
      <path
        d={wobbleLine(
          [
            [118, 20],
            [104, 40],
            [132, 42],
          ],
          "snow-cap",
          1.4
        )}
        strokeWidth={2}
        opacity={0.75}
      />
      <path
        d={wobbleLine(
          [
            [52, 26],
            [40, 44],
            [64, 46],
          ],
          "snow-cap-2",
          1.4
        )}
        strokeWidth={2}
        opacity={0.75}
      />
    </Svg>
  );
}

export function Pencil({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 120 40" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [8, 20],
            [96, 20],
          ],
          "pencil-body",
          1
        )}
        strokeWidth={2.6}
      />
      <path d={wobbleLine([[96, 20], [114, 30]], "pencil-tip", 0.8)} strokeWidth={2.4} />
      <path d={wobbleLine([[6, 14], [6, 26]], "pencil-eraser", 0.8)} strokeWidth={2.2} />
    </Svg>
  );
}

export function Puzzle({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 100 100" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [12, 12],
            [44, 12],
          ],
          "pz-1",
          1
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [56, 12],
            [88, 12],
            [88, 44],
          ],
          "pz-2",
          1
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [88, 56],
            [88, 88],
            [56, 88],
          ],
          "pz-3",
          1
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [44, 88],
            [12, 88],
            [12, 56],
          ],
          "pz-4",
          1
        )}
        strokeWidth={2.6}
      />
      <path
        d={wobbleLine(
          [
            [12, 44],
            [12, 12],
          ],
          "pz-5",
          1
        )}
        strokeWidth={2.6}
      />
      <path
        d="M44 12c0-8 12-8 12 0M88 44c8 0 8 12 0 12M56 88c0 8-12 8-12 0M12 56c-8 0-8-12 0-12"
        strokeWidth={2.6}
      />
    </Svg>
  );
}

export function Grid({ className, title, size }: DoodleProps) {
  return (
    <Svg viewBox="0 0 100 100" className={className} title={title} size={size}>
      <path
        d={wobbleLine(
          [
            [10, 10],
            [90, 10],
            [90, 90],
            [10, 90],
            [10, 10],
          ],
          "grid-box",
          1.6
        )}
        strokeWidth={2.4}
      />
      <path d={wobbleLine([[32, 10], [32, 90]], "grid-v1", 1)} strokeWidth={1.8} opacity={0.65} />
      <path d={wobbleLine([[66, 10], [66, 90]], "grid-v2", 1)} strokeWidth={1.8} opacity={0.65} />
      <path d={wobbleLine([[10, 38], [90, 38]], "grid-h1", 1)} strokeWidth={1.8} opacity={0.65} />
      <path d={wobbleLine([[10, 64], [90, 64]], "grid-h2", 1)} strokeWidth={1.8} opacity={0.65} />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Flourishes                                                                  */
/* -------------------------------------------------------------------------- */

export function Squiggle({ className, title, seed = "sq" }: DoodleProps & { seed?: string }) {
  return (
    <svg viewBox="0 0 120 20" className={className} aria-hidden="true" fill="none">
      {title ? <title>{title}</title> : null}
      <path
        d={wavePath(4, 10, 112, 6, 3)}
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Underline({ className, seed = "ul", color = "currentColor" }: { className?: string; seed?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      style={{ color }}
    >
      <path
        d={underlinePath(4, 6, 112, seed, 1.6)}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arrow({ className, seed = "arrow" }: { className?: string; seed?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} aria-hidden="true" fill="none">
      <path
        d={arrowPath(6, 26, 66, 18, seed)}
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({
  className,
  size = 20,
  title,
}: DoodleProps & { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      <path d={starPath(20, 20, 16, 6, 4, 0.2)} fill="currentColor" />
    </svg>
  );
}

export function WaveDivider({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      style={{ color }}
    >
      <path
        d={wavePath(0, 20, 1200, 12, 2)}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}
