/**
 * DOODLES — the single source of illustration for the whole site.
 *
 * One pen language:
 *   - 24x24 viewBox, drawn on a light grid
 *   - stroke only, round caps/joins, 1.6 weight
 *   - deliberately imperfect curves so lines read as drawn, not generated
 *   - currentColor, so a doodle inherits its context's colour
 *
 * To add one: write a <g class="pen"> and place it in PATHS.
 * Nothing else in the codebase should ever contain raw SVG.
 */

export type DoodleName =
  | "satellite"
  | "book"
  | "pen"
  | "sprout"
  | "sun"
  | "wave"
  | "mountain"
  | "coffee"
  | "bulb"
  | "plane"
  | "envelope"
  | "gear"
  | "pin"
  | "sparkle"
  | "headphones"
  | "controller"
  | "camera"
  | "globe"
  | "bike"
  | "chart"
  | "compass"
  | "leaf"
  | "clock"
  | "arrowUpRight"
  | "arrowRight"
  | "arrowLeft"
  | "menu"
  | "close"
  | "check"
  | "mail";

type DoodleProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function Doodle({
  name,
  className = "",
  size = 24,
  strokeWidth,
}: DoodleProps & { name: DoodleName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={strokeWidth ? ({ "--pen": strokeWidth } as React.CSSProperties) : undefined}
    >
      <g className="pen">{PATHS[name]}</g>
    </svg>
  );
}

const PATHS: Record<DoodleName, React.ReactNode> = {
  /* --- subjects --------------------------------------------------------- */

  satellite: (
    <>
      <path d="M9.4 6.2 6.1 3.4 4.6 5l3.3 2.8" />
      <path d="m7.4 4.5 3 2.5" />
      <path d="M18.6 17.8 21.9 20.6l1.5-1.6-3.3-2.8" />
      <path d="m20.6 19.5-3-2.5" />
      <path d="M10.6 8.1 6.9 11.8a2.3 2.3 0 0 0 0 3.2l2.1 2.1a2.3 2.3 0 0 0 3.2 0l3.7-3.7z" />
      <path d="m12.3 10.4 1.5 1.5" />
      <path d="M9.6 15.2 7.2 17.6" />
      <path d="M18.4 9.1a3.6 3.6 0 0 0-3.9-3.9" />
      <path d="M15.2 4.6a6.2 6.2 0 0 0-6.6 6.6" />
    </>
  ),

  book: (
    <>
      <path d="M12 6.6C10.4 5.3 8.3 4.7 5.4 4.8c-.7 0-1.2.5-1.2 1.2v10.3c0 .7.5 1.2 1.2 1.2 2.8-.1 4.9.5 6.6 1.8" />
      <path d="M12 6.6c1.6-1.3 3.7-1.9 6.6-1.8.7 0 1.2.5 1.2 1.2v10.3c0 .7-.5 1.2-1.2 1.2-2.8-.1-4.9.5-6.6 1.8" />
      <path d="M12 6.6v12.7" />
      <path d="M6.9 9.1c1.5.1 2.7.5 3.7 1.2" />
      <path d="M17.1 9.1c-1.5.1-2.7.5-3.7 1.2" />
    </>
  ),

  pen: (
    <>
      <path d="m15.6 4.1 4.3 4.3-9.5 9.5-5.1.8.8-5.1z" />
      <path d="m13.4 6.3 4.3 4.3" />
      <path d="m5.3 13.7 5 5" />
      <path d="m5.3 18.7 2.5-2.5" />
    </>
  ),

  sprout: (
    <>
      <path d="M12 20.4v-6.6" />
      <path d="M12 13.8C12 10.4 9.6 7.9 6 7.6c-.4 3.6 2.1 6.2 6 6.2z" />
      <path d="M12 12.6c.2-3 2.3-5 5.5-5.2.3 3.1-1.8 5.2-5.5 5.2z" />
      <path d="M7.6 20.4h8.8" />
      <path d="M9.4 17.8c1.6-.5 3.4-.5 5.1 0" />
    </>
  ),

  sun: (
    <>
      <path d="M12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2z" />
      <path d="M12 2.6v1.6M12 19.8v1.6M21.4 12h-1.6M4.2 12H2.6M18.6 5.4l-1.1 1.1M6.5 17.5l-1.1 1.1M18.6 18.6l-1.1-1.1M6.5 6.5 5.4 5.4" />
    </>
  ),

  wave: (
    <>
      <path d="M2.6 10.2c1.7-1.9 3.2-1.9 4.8 0s3.1 1.9 4.8 0 3.1-1.9 4.8 0 3.1 1.9 4.4.4" />
      <path d="M2.6 15.1c1.7-1.9 3.2-1.9 4.8 0s3.1 1.9 4.8 0 3.1-1.9 4.8 0 3.1 1.9 4.4.4" />
    </>
  ),

  mountain: (
    <>
      <path d="M2.2 19.4 9 6.6l4 7.3 2.1-3.4 6.7 8.9z" />
      <path d="m6.9 11.2 2.1 1.7 1.6-1.4" />
      <path d="M17.3 15.6h4.5" />
    </>
  ),

  coffee: (
    <>
      <path d="M4.4 8.9h12.2v5.4a4.6 4.6 0 0 1-4.6 4.6H9a4.6 4.6 0 0 1-4.6-4.6z" />
      <path d="M16.6 10.6h1.9a2.3 2.3 0 0 1 0 4.6h-1.9" />
      <path d="M3.4 21.1h14.2" />
      <path d="M8.6 3.2c-.9 1-.9 2 0 3s.9 2 0 3" />
      <path d="M12.4 3.2c-.9 1-.9 2 0 3s.9 2 0 3" />
    </>
  ),

  bulb: (
    <>
      <path d="M12 3.1a6 6 0 0 1 3.5 10.9c-.5.4-.8 1-.8 1.6v.6H9.3v-.6c0-.6-.3-1.2-.8-1.6A6 6 0 0 1 12 3.1z" />
      <path d="M9.6 18.1h4.8M10.2 20.6h3.6" />
      <path d="M12 8.4v3.4" />
    </>
  ),

  plane: (
    <>
      <path d="M20.9 4.2 3.6 11.4l6.5 2.1 2.1 6.5z" />
      <path d="m10.1 13.5 4-4" />
    </>
  ),

  envelope: (
    <>
      <path d="M2.8 6.4h18.4v11.2H2.8z" />
      <path d="m2.8 7 9.2 6.2L21.2 7" />
    </>
  ),

  gear: (
    <>
      <path d="m9.6 3.4.5-1.1h3.8l.5 1.1.2 1.4 1.3.5 1.2-.7 2.7 2.7-.7 1.2.5 1.3 1.4.2v3.8l-1.4.2-.5 1.3.7 1.2-2.7 2.7-1.2-.7-1.3.5-.2 1.4h-3.8l-.2-1.4-1.3-.5-1.2.7-2.7-2.7.7-1.2-.5-1.3-1.4-.2V9.8l1.4-.2.5-1.3-.7-1.2 2.7-2.7 1.2.7 1.3-.5z" />
      <path d="M12 9.1a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8z" />
    </>
  ),

  pin: (
    <>
      <path d="M12 21.4c3.6-4.4 5.6-7.7 5.6-10.5a5.6 5.6 0 0 0-11.2 0c0 2.8 2 6.1 5.6 10.5z" />
      <path d="M12 7.6a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8z" />
    </>
  ),

  sparkle: (
    <>
      <path d="M12 3.2c.6 4.3 1.9 5.6 6.2 6.2-4.3.6-5.6 1.9-6.2 6.2-.6-4.3-1.9-5.6-6.2-6.2 4.3-.6 5.6-1.9 6.2-6.2z" />
      <path d="M18.6 15.4c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8z" />
    </>
  ),

  headphones: (
    <>
      <path d="M4.2 15.4v-2.9a7.8 7.8 0 0 1 15.6 0v2.9" />
      <path d="M4.2 12.6h1.4a1.6 1.6 0 0 1 1.6 1.6v3.5a1.6 1.6 0 0 1-1.6 1.6H4.2a1.6 1.6 0 0 1-1.6-1.6v-3.5a1.6 1.6 0 0 1 1.6-1.6z" />
      <path d="M19.8 12.6h-1.4a1.6 1.6 0 0 0-1.6 1.6v3.5a1.6 1.6 0 0 0 1.6 1.6h1.4a1.6 1.6 0 0 0 1.6-1.6v-3.5a1.6 1.6 0 0 0-1.6-1.6z" />
    </>
  ),

  controller: (
    <>
      <path d="M7.4 7.6h9.2a4.6 4.6 0 0 1 4.5 3.7l.8 4.4a2.3 2.3 0 0 1-4.1 1.8l-1.9-2.5H8.1l-1.9 2.5a2.3 2.3 0 0 1-4.1-1.8l.8-4.4a4.6 4.6 0 0 1 4.5-3.7z" />
      <path d="M7.1 11.3v2.4M5.9 12.5h2.4" />
      <path d="M15.5 11.6h.01M17.6 13.2h.01" />
    </>
  ),

  camera: (
    <>
      <path d="M3.2 8.4h3.4l1.5-2.2h7.8l1.5 2.2h3.4v10.2H3.2z" />
      <path d="M12 10.3a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z" />
    </>
  ),

  globe: (
    <>
      <path d="M12 3.1a8.9 8.9 0 1 1 0 17.8 8.9 8.9 0 0 1 0-17.8z" />
      <path d="M3.3 9.8h17.4M3.3 14.2h17.4" />
      <path d="M12 3.1c2.2 2.4 3.4 5.5 3.4 8.9s-1.2 6.5-3.4 8.9c-2.2-2.4-3.4-5.5-3.4-8.9s1.2-6.5 3.4-8.9z" />
    </>
  ),

  bike: (
    <>
      <path d="M5.4 17.4a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      <path d="M18.6 17.4a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      <path d="m5.4 13.9 4-7.4h4.1" />
      <path d="m9.4 6.5 4.4 6.9H5.4" />
      <path d="M15.4 6.5h2.4" />
    </>
  ),

  chart: (
    <>
      <path d="M3.6 4.2v16.2h17" />
      <path d="M7.4 16.4v-4.2" />
      <path d="M11.6 16.4V8.6" />
      <path d="M15.8 16.4v-6.1" />
      <path d="M20 16.4V6.2" />
    </>
  ),

  compass: (
    <>
      <path d="M12 3.1a8.9 8.9 0 1 1 0 17.8 8.9 8.9 0 0 1 0-17.8z" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5z" />
    </>
  ),

  leaf: (
    <>
      <path d="M4.4 19.6C2.9 14 6.2 5.9 19.6 4.4c1.5 11.9-5.6 16.6-11.2 15.2z" />
      <path d="M4.4 19.6C6.9 15.4 10.4 12.4 15 10.6" />
    </>
  ),

  clock: (
    <>
      <path d="M12 3.1a8.9 8.9 0 1 1 0 17.8 8.9 8.9 0 0 1 0-17.8z" />
      <path d="M12 6.9V12l3.4 2.2" />
    </>
  ),

  /* --- interface ------------------------------------------------------- */

  arrowUpRight: (
    <>
      <path d="M6.6 17.4 17.4 6.6" />
      <path d="M8.4 6.6h9v9" />
    </>
  ),

  arrowRight: (
    <>
      <path d="M4.4 12h15.2" />
      <path d="m13.6 5.9 6.1 6.1-6.1 6.1" />
    </>
  ),

  arrowLeft: (
    <>
      <path d="M19.6 12H4.4" />
      <path d="m10.4 5.9-6.1 6.1 6.1 6.1" />
    </>
  ),

  menu: (
    <>
      <path d="M3.8 7.2h16.4M3.8 12h16.4M3.8 16.8h16.4" />
    </>
  ),

  close: (
    <>
      <path d="M5.8 5.8l12.4 12.4M18.2 5.8 5.8 18.2" />
    </>
  ),

  check: (
    <>
      <path d="m4.6 12.6 4.8 4.8 10-10.8" />
    </>
  ),

  mail: (
    <>
      <path d="M2.8 6.4h18.4v11.2H2.8z" />
      <path d="m2.8 7 9.2 6.2L21.2 7" />
    </>
  ),
};

/* --------------------------------------------------------------------------
   DoodleBadge — a sticker pinned to a card corner.
   -------------------------------------------------------------------------- */
export function DoodleBadge({
  name,
  tone = "sun",
  size = "md",
  className = "",
}: {
  name: DoodleName;
  tone?: "sun" | "sky" | "forest";
  size?: "md" | "lg";
  className?: string;
}) {
  const toneClass =
    tone === "sky" ? "doodle-badge--sky" : tone === "forest" ? "doodle-badge--forest" : "";
  const sizeClass = size === "lg" ? "doodle-badge--lg" : "";

  return (
    <span className={`doodle-badge ${toneClass} ${sizeClass} ${className}`}>
      <Doodle name={name} size={size === "lg" ? 30 : 23} />
    </span>
  );
}

/* --------------------------------------------------------------------------
   FloatDoodle — a free-floating background mark.
   Parent must be position: relative.
   -------------------------------------------------------------------------- */
export function FloatDoodle({
  name,
  size = 40,
  tilt = 0,
  className = "",
  style,
  delay = 0,
}: {
  name: DoodleName;
  size?: number;
  tilt?: number;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <span
      className={`float-doodle ${className}`}
      style={
        {
          "--tilt": `${tilt}deg`,
          animationDelay: `${delay}s`,
          ...style,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <Doodle name={name} size={size} strokeWidth={1.4} />
    </span>
  );
}
