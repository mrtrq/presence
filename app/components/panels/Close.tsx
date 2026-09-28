/**
 * A hand-drawn close affordance.
 *
 * Deliberately not a plain X: the site is built on the idea that controls look
 * touched by a person, and a plain icon is the one thing that would break it.
 */

"use client";

import { wobbleLine } from "@/app/lib/hand";

export function Close({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="close-btn" aria-label="Close panel">
      <svg viewBox="0 0 44 44" aria-hidden="true" fill="none" focusable="false">
        <circle
          cx="22"
          cy="22"
          r="19"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle
          cx="22"
          cy="22"
          r="19"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.4"
          transform="rotate(28 22 22) scale(0.96)"
          style={{ transformOrigin: "22px 22px" }}
        />
        <path
          d={wobbleLine(
            [
              [15, 15],
              [29, 29],
            ],
            "close:1",
            0.9
          )}
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d={wobbleLine(
            [
              [29, 15],
              [15, 29],
            ],
            "close:2",
            0.9
          )}
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
