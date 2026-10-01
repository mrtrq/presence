import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, DoodleBadge, FloatDoodle } from "../components/Doodles";
import { about, identity, posts } from "../content";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <div className="page">
      <div className="shell--wide">
        <header className="page-head reveal">
          <Link href="/" className="back-link">
            <Doodle name="arrowLeft" size={16} />
            All sections
          </Link>
          <div>
            <p className="kicker">
              <Doodle name="compass" size={15} />
              About
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              {about.heading}
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              {about.lede}
            </p>
          </div>
        </header>

        <div className="about-grid">
          {/* -------------------------------------------------- narrative */}
          <div className="reveal">
            <div className="prose" style={{ fontSize: "var(--step-1)" }}>
              {about.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <hr className="rule-dash" style={{ margin: "2rem 0 1.5rem" }} />

            <h2 className="heading" style={{ marginBottom: "0.9rem" }}>
              How I work
            </h2>
            <ul className="stack" style={{ gap: "0.7rem", listStyle: "none", padding: 0 }}>
              {about.workingStyle.map((item) => (
                <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: "var(--color-forest)",
                      flex: "none",
                      marginTop: "0.28rem",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                    }}
                  >
                    <Doodle name="check" size={16} />
                  </span>
                  <span className="muted" style={{ fontSize: "var(--step-0)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------- sidebar */}
          <aside className="stack reveal" style={{ gap: "1rem" }}>
            <FloatDoodle
              name="leaf"
              size={34}
              tilt={14}
              style={{ top: "-1.75rem", right: "0.25rem", color: "var(--color-forest-mid)" }}
            />

            <div className="card card--forest" style={{ position: "relative" }}>
              <div className="card__body" style={{ position: "relative" }}>
                <span className="deck-card__eyebrow">The short version</span>
                <h2
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "var(--step-1)",
                    fontVariationSettings: '"SOFT" 20, "WONK" 1',
                  }}
                >
                  {identity.name}
                </h2>
                <p className="card__text" style={{ fontSize: "var(--step-0)" }}>
                  {identity.role}. {identity.location}.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "0.75rem",
                    marginTop: "1.1rem",
                    paddingTop: "1rem",
                    borderTop: "1.5px dashed rgba(22,40,31,0.2)",
                  }}
                >
                  {about.facts.map((fact) => (
                    <div key={fact.label} className="stat">
                      <span className="stat__value" style={{ fontSize: "var(--step-1)" }}>
                        {fact.value}
                      </span>
                      <span className="stat__label">{fact.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="note note--sun">
              <span className="mono-label" style={{ color: "var(--color-ink)" }}>
                In numbers
              </span>
              <div
                style={{
                  display: "grid",
                  gap: "0.85rem",
                  marginTop: "0.75rem",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                }}
              >
                <div className="stat">
                  <span className="stat__value">{posts.length}</span>
                  <span className="stat__label">Essays written</span>
                </div>
                <div className="stat">
                  <span className="stat__value">1</span>
                  <span className="stat__label">Thesis, in progress</span>
                </div>
              </div>
            </div>

            <Link href="/now" className="card card--sky card--interactive" style={{ padding: "1.1rem 1.25rem", gap: "0.35rem" }}>
              <span className="deck-card__eyebrow">Where this is going</span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <span className="card__title">What I'm doing now</span>
                <DoodleBadge name="clock" tone="sky" />
              </span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
