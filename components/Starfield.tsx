/**
 * The night sky behind Space mode: a fixed layer of dots and a few hand-drawn
 * sparkles. Positions come from a seeded generator, so the sky is the same on
 * every visit and costs nothing at runtime. It stays hidden (and unpainted)
 * until <html data-theme="space">.
 */

function seeded(seed: number) {
  let s = seed;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32;
}

const r = seeded(42);
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

const dots = Array.from({ length: 70 }, () => ({
  x: pct(r()),
  y: pct(r()),
  big: r() < 0.15,
  twinkle: r() < 0.3,
  delay: (r() * 4).toFixed(2),
}));

const sparkles = Array.from({ length: 9 }, () => ({
  x: pct(0.03 + r() * 0.94),
  y: pct(0.03 + r() * 0.9),
  size: Math.round(10 + r() * 9),
  delay: (r() * 4).toFixed(2),
}));

export function Starfield() {
  return (
    <svg className="stars" aria-hidden="true">
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.big ? 1.7 : 1}
          className={d.twinkle ? "tw" : undefined}
          style={d.twinkle ? { animationDelay: `${d.delay}s` } : undefined}
        />
      ))}
      {sparkles.map((s, i) => (
        <svg
          key={i}
          x={s.x}
          y={s.y}
          width={s.size}
          height={s.size}
          viewBox="0 0 48 48"
          overflow="visible"
          className="tw"
          style={{ animationDelay: `${s.delay}s` }}
        >
          <path
            d="M24 5c2 9 4 13 8 15 4 2 9 3 13 5-8 3-12 5-14 9-2 4-3 8-5 13-2-8-4-12-8-14-4-2-9-3-13-6 8-2 12-4 14-8 2-4 3-8 5-14z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </svg>
  );
}
