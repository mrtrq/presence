import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, DoodleBadge, FloatDoodle } from "../components/Doodles";
import { interests } from "../content";

export const metadata: Metadata = {
  title: "Interests",
  description:
    "The parts of the week that are not research: cycling, film photography, bread, maps and mechanical keyboards.",
};

export default function InterestsPage() {
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
              <Doodle name="bike" size={15} />
              Interests
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              What I do when nobody is <span className="scribble-underline">grading me</span>
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              These are not aspirations. They are things I already do, badly, on a schedule nobody
              set for me.
            </p>
          </div>
        </header>

        <div className="grid-cards grid-cards--3">
          {interests.map((interest) => (
            <article
              key={interest.title}
              className={`card card--${interest.tone} card--interactive reveal`}
            >
              <div className="card__body" style={{ flex: 1, position: "relative" }}>
                <DoodleBadge name={interest.doodle} tone={interest.tone} size="lg" />
                <h2
                  className="card__title"
                  style={{ marginTop: "0.9rem", fontSize: "var(--step-1)" }}
                >
                  {interest.title}
                </h2>
                <p className="card__text" style={{ fontSize: "var(--step-0)", marginTop: "0.5rem" }}>
                  {interest.body}
                </p>
                <p
                  className="mono-label"
                  style={{
                    marginTop: "0.9rem",
                    paddingTop: "0.7rem",
                    borderTop: "1.5px dashed rgba(22,40,31,0.18)",
                    color: "var(--color-forest)",
                    letterSpacing: "0.04em",
                    textTransform: "none",
                    fontSize: "0.8rem",
                    lineHeight: 1.45,
                  }}
                >
                  {interest.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section
          className="note note--sky reveal"
          style={{
            marginTop: "clamp(2rem, 3.5vw, 3rem)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ maxWidth: "50ch" }}>
            <strong style={{ color: "var(--color-ink)" }}>A note on why this page exists.</strong>{" "}
            Most of what makes me good at the research came from hobbies that had nothing to do with
            research. The pattern is worth more than any individual hobby.
          </p>
          <Link href="/contact" className="btn btn--sm">
            <Doodle name="envelope" size={15} />
            Talk about any of it
          </Link>
        </section>
      </div>
    </div>
  );
}
