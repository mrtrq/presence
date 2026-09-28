/**
 * Shared presentational primitives.
 *
 * Server components. The only thing they need is a palette name, and they look
 * up the matching hand-drawn border and fill themselves, which is what keeps
 * the visual language consistent when new cards are added.
 */

import { frameVars } from "@/app/lib/frame";
import type { Palette } from "@/app/content/site";

const toneStroke: Record<Palette, string> = {
  sun: "#c89412",
  sky: "#2b7ea3",
  sprout: "#2f6b4f",
  forest: "#1d4a35",
};

/**
 * Tints are resolved to concrete hex values, not `color-mix()`, because they
 * are baked into a data URI. A `color-mix()` here would serialise literally
 * into the SVG and fail to parse, leaving the card transparent.
 */
const toneFill: Record<Palette, string> = {
  sun: "#fdf3d4",
  sky: "#e4f2f9",
  sprout: "#e8f2ec",
  forest: "#dceae3",
};

/**
 * A hand-drawn card. `seed` should be stable and unique per card so no two
 * borders wobble identically.
 */
export function Card({
  children,
  tone = "sprout",
  seed,
  className = "",
  style,
}: {
  children: React.ReactNode;
  tone?: Palette;
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const frame = frameVars({
    seed: seed ?? `card:${className}`,
    stroke: toneStroke[tone],
    strokeWidth: 4,
    radius: 13,
    roughness: 1,
    fill: toneFill[tone],
  });

  return (
    <div className={`card card-hover ${className}`} style={{ ...frame, ...style } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  kicker,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  kicker?: string;
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <div className="section-title">
      {kicker ? <p className="label">{kicker}</p> : null}
      <Tag className="display-md">{children}</Tag>
    </div>
  );
}
