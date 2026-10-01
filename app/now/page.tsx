import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, DoodleBadge } from "../components/Doodles";
import { now } from "../content";

export const metadata: Metadata = {
  title: "Now",
  description: now.lede,
};

/** Rotate tones so adjacent cards never share a shadow colour. */
const TONES = ["sky", "sun", "forest"] as const;

export default function NowPage() {
  return (
    <div className="page">
      <div className="shell">
        <header className="page-head reveal" style={{ position: "relative" }}>
          <Link href="/" className="back-link">
            <Doodle name="arrowLeft" size={16} />
            All sections
          </Link>
          <div>
            <p className="kicker">
              <Doodle name="clock" size={15} />
              Now
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              {now.heading}
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              {now.lede}
            </p>
          </div>
        </header>

        <div className="grid-cards grid-cards--3">
          {now.items.map((item, i) => (
            <article
              key={item.label}
              className={`card card--${TONES[i % TONES.length]} card--interactive reveal`}
            >
              <div className="card__body" style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    marginBottom: "0.9rem",
                  }}
                >
                  <span className="deck-card__eyebrow">{item.label}</span>
                  <DoodleBadge name={item.doodle} tone={TONES[i % TONES.length]} />
                </div>
                <p style={{ fontSize: "var(--step-0)", lineHeight: 1.55, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="note reveal"
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p>
            Last rewritten <strong style={{ color: "var(--color-ink)" }}>{now.updated}</strong>. This
            page is deliberately short — if it needs sections, the answer is a blog post.
          </p>
          <Link href="/writing" className="btn btn--sm">
            <Doodle name="pen" size={15} />
            Read something longer
          </Link>
        </div>
      </div>
    </div>
  );
}
