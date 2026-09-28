/**
 * Client entry points for the home screen.
 *
 * The home page itself is a server component; only the things that need to
 * open a panel ship to the browser. This keeps the island small instead of
 * turning the whole page client-side.
 */

"use client";

import { hobbies, posts } from "@/app/content/site";
import { Sparkle, Telescope } from "@/app/components/draw/Doodles";
import { openPanel, type PanelId } from "@/app/components/panels/usePanel";
import { frameVars } from "@/app/lib/frame";

const strokeFor = {
  sun: "#c89412",
  sky: "#2b7ea3",
  sprout: "#2f6b4f",
  forest: "#1d4a35",
} as const;

type Door = {
  id: PanelId;
  title: string;
  blurb: string;
  tone: keyof typeof strokeFor;
  tilt: number;
  count?: number;
  doodle: React.ReactNode;
};

/**
 * Card order is reading order on desktop, so the two most common reasons to
 * visit — the writing and the work — sit in the first row.
 */
const doors: Door[] = [
  {
    id: "about",
    title: "About",
    blurb: "How I think, and the handful of things I keep coming back to.",
    tone: "sprout",
    tilt: -1.6,
    doodle: <Sparkle size={22} />,
  },
  {
    id: "work",
    title: "Work",
    blurb: "Research, organisations, and the things I put online.",
    tone: "sky",
    tilt: 1.3,
    doodle: <Telescope size={30} />,
  },
  {
    id: "writing",
    title: "Writing",
    blurb: "Essays and data stories, mostly about attention and small worlds.",
    tone: "sun",
    tilt: -1,
    count: posts.length,
    doodle: <Sparkle size={22} />,
  },
  {
    id: "play",
    title: "Interests",
    blurb: "Astronomy, books, puzzles, and the habits that survive a deadline.",
    tone: "forest",
    tilt: 1.9,
    count: hobbies.length,
    doodle: <Sparkle size={22} />,
  },
];

export function DoorGrid() {
  return (
    <ul className="doorway-grid">
      {doors.map((door, index) => (
        <li key={door.id}>
          <button
            type="button"
            className="doorway-card card card-hover"
            data-tone={door.tone}
            style={
              {
                "--tilt": `${door.tilt}deg`,
                "--delay": `${index * 80}ms`,
                ...frameVars({
                  seed: `door:${door.id}`,
                  stroke: strokeFor[door.tone],
                  radius: 15,
                  roughness: 1.15,
                }),
              } as React.CSSProperties
            }
            onClick={() => openPanel(door.id)}
          >
            <span className="doorway-doodle" aria-hidden="true">
              {door.doodle}
            </span>
            <span className="doorway-title hand">{door.title}</span>
            <span className="doorway-blurb">{door.blurb}</span>
            {door.count ? (
              <span className="doorway-count">
                {door.count} {door.id === "play" ? "threads" : "pieces"}
              </span>
            ) : null}
            <span className="doorway-hint" aria-hidden="true">
              open
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function HeroActions() {
  return (
    <div className="hero-actions">
      <button type="button" className="btn btn-sun" onClick={() => openPanel("writing")}>
        What I&apos;ve written
      </button>
      <button type="button" className="btn btn-sky" onClick={() => openPanel("work")}>
        See my work
      </button>
    </div>
  );
}
