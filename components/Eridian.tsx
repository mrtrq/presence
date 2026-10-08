"use client";

import { useEffect, useRef, useState } from "react";
import { Rocky } from "./Doodles";

/**
 * Rocky from Project Hail Mary. Eridians talk in musical chords, so pressing
 * him plays a short chord (Web Audio, no files) and shows the translation.
 * Other components can make him talk silently:
 *   window.dispatchEvent(new CustomEvent("rocky:say", { detail: "Fist my bump." }))
 */
const lines = [
  { text: "Amaze! Amaze! Amaze!", notes: [523.25, 659.25, 783.99, 1046.5] },
  { text: "Question?", notes: [392, 493.88, 587.33, 739.99] },
  { text: "Fist my bump.", notes: [261.63, 329.63, 392] },
  { text: "Good good good.", notes: [349.23, 440, 523.25] },
  { text: "You sleep. I watch.", notes: [220, 261.63, 329.63] },
];

let audio: AudioContext | undefined;

function sing(notes: number[]) {
  try {
    audio ??= new AudioContext();
    const now = audio.currentTime;
    notes.forEach((f, i) => {
      const t = now + i * 0.07;
      const osc = audio!.createOscillator();
      const gain = audio!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t);
      // a small upward slide, so it sounds sung rather than played
      osc.frequency.exponentialRampToValueAtTime(f * 1.03, t + 0.35);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.07, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      osc.connect(gain).connect(audio!.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  } catch {
    // no audio: the caption still shows
  }
}

export function Eridian({ className }: { className?: string }) {
  const [said, setSaid] = useState<{ text: string; n: number } | null>(null);
  const next = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  function say(text: string) {
    setSaid((s) => ({ text, n: (s?.n ?? 0) + 1 }));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaid(null), 2600);
  }

  useEffect(() => {
    const onSay = (e: Event) => say(String((e as CustomEvent).detail));
    window.addEventListener("rocky:say", onSay);
    return () => {
      window.removeEventListener("rocky:say", onSay);
      window.clearTimeout(timer.current);
    };
  }, []);

  function press() {
    const line = lines[next.current++ % lines.length];
    sing(line.notes);
    say(line.text);
  }

  return (
    <div className={`eridian ${className ?? ""}`}>
      {said && (
        <p key={said.n} className="bubble" role="status">
          <span aria-hidden="true">♪ </span>
          {said.text}
          <span aria-hidden="true"> ♫</span>
        </p>
      )}
      <button
        type="button"
        className="rocky"
        data-talking={said ? "" : undefined}
        onClick={press}
        aria-label="Rocky the Eridian. Press to hear him talk."
      >
        <Rocky />
      </button>
    </div>
  );
}
