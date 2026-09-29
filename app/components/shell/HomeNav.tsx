/**
 * Home navigation.
 *
 * Two forms of the same links. On wide screens a full bar, because there is
 * room to show where you are. On narrow screens the same targets collapse into
 * a small row of buttons, since the cards below already do the heavy lifting
 * and a menu icon would just add a layer of indirection.
 */

"use client";

import { PANEL_IDS, openPanel, usePanel } from "@/app/components/panels/usePanel";
import Link from "next/link";
import { identity } from "@/app/content/site";

const labels: Record<string, string> = {
  about: "About",
  work: "Work",
  writing: "Writing",
  play: "Interests",
  contact: "Contact",
};

export function HomeNav() {
  const { active } = usePanel();

  return (
    <header className="home-nav">
      <div className="container-swiss home-nav-inner">
        <a className="wordmark" href="#main">
          <span className="wordmark-hand">{identity.firstName}</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </a>

        <nav aria-label="Sections">
          <ul className="nav-row">
            {PANEL_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  className="nav-pill"
                  aria-expanded={active === id}
                  aria-controls={active === id ? `panel-${id}` : undefined}
                  onClick={() => openPanel(id)}
                >
                  {labels[id]}
                </button>
              </li>
            ))}
            <li>
              <Link className="nav-pill" href="/blog">
                Stories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
