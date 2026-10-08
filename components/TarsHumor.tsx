"use client";

import { useState, type CSSProperties } from "react";
import { Tars } from "./Doodles";

// What TARS says about a missing page, from 0% humor up to 100%.
const takes = [
  "Error 404. The page does not exist.",
  "That page isn't here. I checked twice.",
  "It fell past the event horizon. From out here, it's frozen at the edge forever.",
  "I'd show you the page, but it's on the other side of a black hole and I left my tesseract at home.",
  "Knock knock. Who's there? Not this page.",
];

export function TarsHumor() {
  const [level, setLevel] = useState(3); // 75%, the setting Cooper settles on

  return (
    <div className="tars-box">
      <Tars className="tars" style={{ "--lean": `${level * 3}deg` } as CSSProperties} />
      <div className="tars-talk">
        <p className="tars-says" aria-live="polite">
          {takes[level]}
        </p>
        <label className="humor">
          <span>
            Humor setting <output>{level * 25}%</output>
          </span>
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            aria-valuetext={`${level * 25}%`}
          />
        </label>
      </div>
    </div>
  );
}
