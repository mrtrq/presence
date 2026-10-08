import type { CSSProperties } from "react";

type DoodleProps = { className?: string; style?: CSSProperties };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Star({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <g {...strokeProps}>
        <path d="M24 5c2 9 4 13 8 15 4 2 9 3 13 5-8 3-12 5-14 9-2 4-3 8-5 13-2-8-4-12-8-14-4-2-9-3-13-6 8-2 12-4 14-8 2-4 3-8 5-14z" />
      </g>
    </svg>
  );
}

export function Planet({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <g {...strokeProps}>
        <circle cx="24" cy="24" r="10" />
        <path d="M5 31c-3-6 9-15 25-19 11-3 16-1 15 4M43 20c1 8-12 17-27 20-8 2-13 0-13-4" />
      </g>
    </svg>
  );
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <g {...strokeProps}>
        <path d="M4 30c5-12 9 9 14 0s9 9 14 0 8 8 12-2" />
      </g>
    </svg>
  );
}

/**
 * Stellar cast, drawn in the same marker style as the doodles above.
 * Fills use CSS custom properties so each scene can colour them.
 */

/** Gargantua: a black hole with its accretion disk wrapped over the top. */
export function Gargantua({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 140" aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        {/* light from the far side of the disk, bent over and under the hole */}
        <path d="M56 74C56 18 144 18 144 74" stroke="var(--ink)" strokeWidth="15" />
        <path d="M56 74C56 18 144 18 144 74" stroke="var(--y)" strokeWidth="9" />
        <path d="M62 80C62 120 138 120 138 80" stroke="var(--ink)" strokeWidth="8" />
        <path d="M62 80C62 120 138 120 138 80" stroke="var(--y)" strokeWidth="3.5" />
        {/* the far side of the disk itself */}
        <path d="M8 74C8 65 192 65 192 74" stroke="var(--ink)" strokeWidth="12" />
        <path d="M8 74C8 65 192 65 192 74" stroke="var(--y)" strokeWidth="6" />
      </g>
      <circle cx="100" cy="72" r="31" fill="#070a17" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="100" cy="72" r="35" fill="none" stroke="var(--y)" strokeWidth="2" strokeDasharray="3 7" className="bh-ring" />
      <g fill="none" strokeLinecap="round">
        {/* the near side of the disk, in front of the hole */}
        <path d="M8 74C8 88 192 88 192 74" stroke="var(--ink)" strokeWidth="15" />
        <path d="M8 74C8 88 192 88 192 74" stroke="var(--y)" strokeWidth="9" />
        <path d="M24 79C38 85 162 85 176 79" stroke="#e58a63" strokeWidth="2.5" strokeDasharray="10 16" className="bh-flow" />
      </g>
    </svg>
  );
}

/** TARS: four slabs and a little display. Slabs are separate so they can move. */
export function Tars({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 64" aria-hidden="true">
      <g {...strokeProps} fill="var(--tars, none)">
        <rect className="slab s1" x="8" y="6" width="8" height="50" rx="1.5" />
        <rect className="slab s2" x="16" y="6" width="8" height="50" rx="1.5" />
        <rect className="slab s3" x="24" y="6" width="8" height="50" rx="1.5" />
        <rect className="slab s4" x="32" y="6" width="8" height="50" rx="1.5" />
      </g>
      <rect className="tars-screen" x="17.5" y="12" width="13" height="7" rx="1" fill="var(--y)" stroke="currentColor" strokeWidth="2" />
      <path d="M4 59h40" {...strokeProps} />
    </svg>
  );
}

/** Rocky the Eridian: a rocky carapace on five jointed legs, no face. */
export function Rocky({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <g {...strokeProps}>
        <path
          d="M17 22 9 22 4 35M19 24 14 32 13 42M24 25 26 34 23 43M29 24 34 32 35 42M31 22 39 22 44 35"
          className="legs"
        />
        <path
          d="M24 6c4 0 9 3 10 7 1 3-1 7-3 9-3 2-11 2-14 0-2-2-4-6-3-9 1-4 6-7 10-7z"
          fill="var(--rocky, none)"
        />
        <path d="M20 12l2 2M27 11l-1 3M24 17h2" />
      </g>
    </svg>
  );
}
