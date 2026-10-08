"use client";

import { Earth, Rocket } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

const THEME_KEY = "orbit";
const LIFTOFF_KEY = "liftoff";

/** Runs in <head> before first paint, so a returning visitor never sees a flash. */
export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="space")document.documentElement.dataset.theme="space"}catch(e){}`;

// Miller's planet: one hour there is seven years on Earth.
const EARTH_SECONDS_PER_SECOND = 7 * 365.25 * 24;

function earthTime(seconds: number) {
  const days = (seconds * EARTH_SECONDS_PER_SECOND) / 86400;
  if (days < 1) return `${Math.round(days * 24)} hours`;
  if (days < 365.25) return `${Math.round(days)} ${Math.round(days) === 1 ? "day" : "days"}`;
  return `${(days / 365.25).toFixed(1)} years`;
}

function clock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function liftoffTime() {
  try {
    const saved = Number(sessionStorage.getItem(LIFTOFF_KEY));
    if (saved) return saved;
    const now = Date.now();
    sessionStorage.setItem(LIFTOFF_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

/**
 * Header controls: the Lift off / Land switch and, while in space, a time
 * dilation readout. Which label shows is decided by CSS from data-theme, so
 * the server HTML is right before React even starts.
 */
export function SpaceControls() {
  const [space, setSpace] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setSpace(document.documentElement.dataset.theme === "space");
  }, []);

  useEffect(() => {
    if (!space) return;
    const start = liftoffTime();
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [space]);

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next = !space;
    const apply = () => {
      const root = document.documentElement;
      if (next) root.dataset.theme = "space";
      else delete root.dataset.theme;
      try {
        localStorage.setItem(THEME_KEY, next ? "space" : "ground");
        if (next) sessionStorage.setItem(LIFTOFF_KEY, String(Date.now()));
      } catch {}
      setElapsed(0);
      setSpace(next);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    // The new sky opens as a circle from the button that was pressed.
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return (
    <div className="orbit">
      <span
        className="dilation in-space"
        title="Near Gargantua, one hour here is seven years on Earth"
      >
        <span className="long">
          {clock(elapsed)} here = {earthTime(elapsed)} on Earth
        </span>
        <span className="short">Earth +{earthTime(elapsed)}</span>
      </span>
      {/* The visible label says what pressing it does: switch to space, or back. */}
      <button type="button" className="btn sm launch" onClick={toggle}>
        <span className="in-ground">
          <Rocket className="ic" strokeWidth={2.6} aria-hidden="true" />
          Lift off<span className="sr-only"> to space mode</span>
        </span>
        <span className="in-space">
          <Earth className="ic" strokeWidth={2.6} aria-hidden="true" />
          Land<span className="sr-only"> back on Earth</span>
        </span>
      </button>
    </div>
  );
}
