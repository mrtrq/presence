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
