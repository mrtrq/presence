import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, DoodleBadge, FloatDoodle } from "../components/Doodles";
import { projects } from "../content";

export const metadata: Metadata = {
  title: "Work",
  description: "Research, organisation leadership, and small products — with the reasoning attached.",
};

export default function WorkPage() {
  const [lead, ...rest] = projects;

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
              <Doodle name="satellite" size={15} />
              Work
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              Things I built, and <span className="scribble-underline">why</span>
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Descriptions include the part that usually gets left out — what was hard, and what I
              would do differently.
            </p>
          </div>
        </header>

        {/* -------------------------------------------------- lead project */}
        {lead && (
          <article className="card card--sky reveal lead-card">
            <div className="lead-card__body">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.6rem",
                }}
              >
                <span className="badge badge--sky">{lead.kind}</span>
                <span className="mono-label muted">{lead.period}</span>
              </div>

              <h2
                style={{
                  fontSize: "var(--step-2)",
                  maxWidth: "24ch",
                  fontVariationSettings: '"SOFT" 20, "WONK" 1',
                }}
              >
                {lead.title}
              </h2>

              <p className="prose" style={{ maxWidth: "62ch" }}>
                {lead.summary}
              </p>

              <ul className="tick-list">
                {lead.points.map((point) => (
                  <li key={point}>
                    <Doodle name="check" size={15} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {lead.href && (
                <a
                  href={lead.href}
                  className="btn"
                  style={{ justifySelf: "start" }}
                  target={lead.href.startsWith("http") ? "_blank" : undefined}
                  rel={lead.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {lead.hrefLabel}
                  <Doodle name="arrowUpRight" size={16} />
                </a>
              )}
            </div>

            <div className="lead-card__aside">
              <FloatDoodle name={lead.doodle} size={68} tilt={-8} style={{ position: "relative" }} />
              <p className="mono-label" style={{ color: "var(--color-forest)" }}>
                Current focus
                <br />
                since {lead.period.slice(0, 4)}
              </p>
            </div>
          </article>
        )}

        {/* -------------------------------------------------- other work */}
        <section style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}>
          <div className="grid-cards grid-cards--3">
            {rest.map((project) => (
              <article
                key={project.title}
                className={`card card--${project.tone} card--interactive reveal`}
              >
                <div className="card__body" style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      marginBottom: "0.85rem",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span className="deck-card__eyebrow">{project.kind}</span>
                      <p className="faint" style={{ fontSize: "var(--step--1)", marginTop: "0.15rem" }}>
                        {project.period}
                      </p>
                    </div>
                    <DoodleBadge name={project.doodle} tone={project.tone} />
                  </div>

                  <h3 className="card__title">{project.title}</h3>
                  <p className="card__text">{project.summary}</p>

                  <ul className="tick-list" style={{ marginTop: "0.9rem" }}>
                    {project.points.map((point) => (
                      <li key={point}>
                        <Doodle name="check" size={14} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.href && (
                  <div style={{ padding: "0 1.35rem 1.35rem" }}>
                    <a
                      href={project.href}
                      className="link"
                      style={{ fontSize: "var(--step--1)" }}
                      target={project.href.startsWith("http") ? "_blank" : undefined}
                      rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {project.hrefLabel}
                      <Doodle name="arrowUpRight" size={15} />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
