import Link from "next/link";
import { Doodle, DoodleBadge, FloatDoodle } from "./components/Doodles";
import { deck, identity, posts } from "./content";

export default function Home() {
  const recent = posts.slice(0, 3);
  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <div className="home">
      <div className="shell--wide home__grid">
        {/* ---------------------------------------------------------- name */}
        <section
          className="stack reveal home__name-block"
          style={{ position: "relative", gap: "0.85rem", minWidth: 0 }}
        >
          <p className="kicker">
            <Doodle name="pin" size={15} />
            {identity.location}
          </p>

          <div style={{ position: "relative" }}>
            <FloatDoodle
              name="sun"
              size={30}
              tilt={-12}
              style={{ top: "-0.7rem", right: "4%" }}
            />
            <h1 className="home__name">
              {identity.name.split(" ")[0]}{" "}
              <span className="scribble-underline">
                {identity.name.split(" ").slice(1).join(" ") || identity.name}
              </span>
            </h1>
          </div>

          <p className="home__role">{identity.role}</p>

          <div style={{ position: "relative" }}>
            <FloatDoodle
              name="sparkle"
              size={19}
              tilt={8}
              delay={1.4}
              style={{ top: "0.1rem", left: "-1.85rem", color: "var(--color-forest-mid)" }}
            />
            <p className="home__intro">{identity.intro}</p>
          </div>

          {featured && (
            <Link
              href="/writing"
              className="note note--sun"
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                alignSelf: "start",
                maxWidth: "30rem",
              }}
            >
              <DoodleBadge name="book" tone="forest" />
              <span style={{ minWidth: 0 }}>
                <span
                  className="mono-label"
                  style={{ display: "block", color: "var(--color-ink)", fontSize: "0.66rem" }}
                >
                  Latest
                </span>
                <span
                  style={{
                    display: "block",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    lineHeight: 1.32,
                    marginTop: "0.1rem",
                  }}
                >
                  {featured.title}
                </span>
              </span>
            </Link>
          )}

          <div className="home__actions">
            <Link href="/writing" className="btn btn--primary">
              <Doodle name="pen" size={17} />
              Read the writing
            </Link>
            <Link href="/work" className="btn">
              See the work
              <Doodle name="arrowRight" size={17} />
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------------- deck */}
        <div className="deck" aria-label="Sections">
          {deck.map((card) => {
            const isBar = card.span === "bar";
            const isFeature = card.span === "feature";

            return (
              <div key={card.href} className={`deck__item deck__item--${card.span}`}>
                <Link
                  href={card.href}
                  className={`card card--${card.tone} deck-card${isBar ? " deck-card--bar" : ""}`}
                >
                  {isBar ? (
                    <>
                      <DoodleBadge name={card.doodle} tone={card.tone} />
                      <div className="deck-card__main">
                        <span className="deck-card__eyebrow">{card.eyebrow}</span>
                        <h2 className="deck-card__title">{card.title}</h2>
                        <p className="deck-card__text">{card.body}</p>
                      </div>
                      <span className="deck-card__go" aria-hidden="true">
                        Open
                        <Doodle name="arrowRight" size={15} />
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="deck-card__top">
                        <span className="deck-card__eyebrow">{card.eyebrow}</span>
                        {card.count ? (
                          <span className="badge badge--sky" style={isFeature ? undefined : { display: "none" }}>
                            {card.count}
                          </span>
                        ) : (
                          <DoodleBadge name={card.doodle} tone={card.tone} />
                        )}
                      </div>

                      <h2 className="deck-card__title">{card.title}</h2>
                      <p className="deck-card__text">{card.body}</p>

                      {isFeature ? (
                        <>
                          <div className="deck-card__index" aria-hidden="true">
                            {recent.map((p) => (
                              <span key={p.slug}>{p.title}</span>
                            ))}
                          </div>
                          <span className="deck-card__go" aria-hidden="true">
                            All {posts.length} essays
                            <Doodle name="arrowRight" size={15} />
                          </span>
                        </>
                      ) : (
                        <span className="deck-card__go" aria-hidden="true">
                          Open
                          <Doodle name="arrowRight" size={15} />
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
