import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, DoodleBadge, FloatDoodle } from "../components/Doodles";
import { contact, identity } from "../content";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.lede,
};

export default function ContactPage() {
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
              <Doodle name="envelope" size={15} />
              Contact
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              {contact.heading}
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              {contact.lede}
            </p>
          </div>
          <FloatDoodle
            name="plane"
            size={38}
            tilt={-16}
            style={{ top: "1.5rem", right: "1.5rem" }}
          />
        </header>

        {/* -------------------------------------------------- primary CTA */}
        <a
          href={`mailto:${identity.email}`}
          className="card card--sun card--interactive reveal"
          style={{ padding: "1.5rem 1.6rem", gap: "0.6rem", position: "relative", overflow: "hidden" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <span className="deck-card__eyebrow">Email</span>
              <p
                style={{
                  marginTop: "0.3rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--step-2)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  wordBreak: "break-word",
                  fontVariationSettings: '"SOFT" 20, "WONK" 1',
                }}
              >
                {identity.email}
              </p>
            </div>
            <DoodleBadge name="mail" tone="forest" size="lg" />
          </div>
        </a>

        {/* -------------------------------------------------- what I'm good for */}
        <section style={{ marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}>
          <h2 className="heading" style={{ marginBottom: "0.85rem" }}>
            What to write about
          </h2>
          <ul className="stack" style={{ gap: "0.6rem", listStyle: "none", padding: 0 }}>
            {contact.reasons.map((reason) => (
              <li
                key={reason}
                className="note note--forest reveal"
                style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", padding: "0.85rem 1.1rem" }}
              >
                <span style={{ color: "var(--color-forest)", flex: "none", marginTop: "0.22rem" }}>
                  <Doodle name="check" size={16} />
                </span>
                <span style={{ color: "var(--color-ink)" }}>{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------- elsewhere */}
        <section style={{ marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}>
          <h2 className="heading" style={{ marginBottom: "0.85rem" }}>
            Elsewhere
          </h2>
          <div className="grid-cards">
            {identity.links
              .filter((link) => link.href !== `mailto:${identity.email}`)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="card card--sky card--interactive"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div
                    className="card__body"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span className="deck-card__eyebrow">{link.label}</span>
                      <p className="card__title" style={{ marginTop: "0.2rem" }}>
                        {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </p>
                    </div>
                    <Doodle name="arrowUpRight" size={19} />
                  </div>
                </a>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
