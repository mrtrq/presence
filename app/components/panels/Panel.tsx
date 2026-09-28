/**
 * The panel shell.
 *
 * Every overlay in the site is this component. It owns the backdrop, the
 * slide-in transition, focus management, and scroll locking, so individual
 * panels only have to worry about their own content.
 *
 * On mobile it presents as a full-height sheet rising from the bottom; on
 * larger screens it becomes a wide card on the right. Same markup, different
 * geometry, which keeps the DOM stable across the breakpoint.
 */

"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Palette } from "@/app/content/site";
import { frameVars } from "@/app/lib/frame";
import { Close } from "./Close";
import { useEscape, useFocusTrap, useScrollLock } from "./usePanel";

const toneInk: Record<Palette, string> = {
  sun: "#c89412",
  sky: "#2b7ea3",
  sprout: "#2f6b4f",
  forest: "#fdf8ec",
};

export function Panel({
  id,
  title,
  kicker,
  tone = "sprout",
  icon,
  onClose,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  tone?: Palette;
  icon?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollLock(true);
  useEscape(true, onClose);
  useFocusTrap(ref, true);

  const frame = frameVars({
    seed: `panel:${id}`,
    radius: 14,
    stroke: "#173a29",
    strokeWidth: 6,
    roughness: 0.9,
    fill: "#fffdf6",
  });

  return (
    <div className="panel-root" role="presentation">
      <button className="panel-scrim" onClick={onClose} aria-label={`Close ${title}`} tabIndex={-1} />

      <div
        ref={ref}
        id={`panel-${id}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="panel-card"
        style={frame as React.CSSProperties}
      >
        {/* The wrapper carries the entry animation. Putting it on .panel-card
            instead would promote the border-image surface to a compositing
            layer, and Chrome then fails to repaint the slice interior, letting
            the home page show through the panel. See .panel-motion in the CSS. */}
        <div className="panel-motion">
          <span
            className="panel-tab"
            style={{ background: toneInk[tone] }}
            aria-hidden="true"
          />

          <header className="panel-header">
            <div className="panel-heading">
              {icon ? <span className="panel-icon">{icon}</span> : null}
              <div>
                {kicker ? <p className="label">{kicker}</p> : null}
                <h2 className="display-md">{title}</h2>
              </div>
            </div>
            <Close onClick={onClose} />
          </header>

          <div className="panel-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** A "read the rest" link used at the bottom of several panels. */
export function PanelFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="btn btn-sm btn-sun" href={href}>
      {children}
      <ArrowRight aria-hidden="true" size={16} />
    </a>
  );
}
