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

const toneFill: Record<Palette, string> = {
  sun: "color-mix(in srgb, var(--color-sun) 16%, var(--color-paper))",
  sky: "color-mix(in srgb, var(--color-sky) 15%, var(--color-paper))",
  sprout: "color-mix(in srgb, var(--color-sprout) 26%, var(--color-paper))",
  forest: "color-mix(in srgb, var(--color-forest) 12%, var(--color-paper))",
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
    strokeWidth: 3,
    radius: 13,
    roughness: 1,
  });

  return (
    <div
      className={`card card-hover ${className}`}
      style={{ ...frame, background: toneFill[tone], ...style } as React.CSSProperties}
    >
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
