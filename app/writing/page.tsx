import type { Metadata } from "next";
import Link from "next/link";
import { Doodle, FloatDoodle } from "../components/Doodles";
import { posts } from "../content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays, field notes and build logs on remote sensing, software, and learning to think clearly.",
};

const CATEGORIES = ["All", "Essay", "Field note", "Build log"] as const;

export default function WritingPage() {
  const [featured, ...rest] = posts;
  const featuredYear = featured.date.slice(-4);

  // Useful, and derived rather than hand-maintained.
  const totalMinutes = posts.reduce((sum, post) => sum + (parseInt(post.readTime, 10) || 0), 0);

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
              <Doodle name="pen" size={15} />
              Writing
            </p>
            <h1 className="display" style={{ marginTop: "0.5rem" }}>
              Thinking out loud, in writing that is <span className="scribble-underline">finished</span>
            </h1>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Most of these started as notes I needed to argue with. I keep the ones that survive.
            </p>
          </div>
        </header>

        {/* -------------------------------------------------- featured */}
        {featured && (
          <article className="card card--sky reveal lead-card">
            <div className="lead-card__body">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
                <span className="badge badge--sky">Latest</span>
                <span className="mono-label muted">{featured.category}</span>
                <span className="faint" style={{ fontSize: "var(--step--1)" }}>
                  {featured.date} · {featured.readTime}
                </span>
              </div>

              <h2
                style={{
                  marginTop: "0.85rem",
                  fontSize: "var(--step-2)",
                  maxWidth: "20ch",
                  fontVariationSettings: '"SOFT" 20, "WONK" 1',
                }}
              >
                <Link href={`/writing/${featured.slug}`} className="link-underline">
                  {featured.title}
                </Link>
              </h2>

              <p className="prose" style={{ maxWidth: "58ch" }}>
                {featured.excerpt}
              </p>

              <Link
                href={`/writing/${featured.slug}`}
                className="btn"
                style={{ alignSelf: "start", justifySelf: "start" }}
              >
                Read this one
                <Doodle name="arrowRight" size={17} />
              </Link>
            </div>

            <div className="lead-card__aside">
              <FloatDoodle name="book" size={64} tilt={-9} style={{ position: "relative" }} />
              <p className="mono-label" style={{ color: "var(--color-forest)" }}>
                {posts.length} essays
                <br />
                {totalMinutes} min in total
              </p>
            </div>
          </article>
        )}

        {/* -------------------------------------------------- archive */}
        <section style={{ marginTop: "clamp(2.25rem, 4vw, 3.25rem)" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "0.5rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <h2 className="heading">Everything else</h2>
            <span className="mono-label muted">
              {rest.length} more · {featuredYear} and earlier
            </span>
          </div>

          <div className="row-list">
            {rest.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="row-item">
                <span className="row-item__meta">{post.date}</span>
                <span className="row-item__title">{post.title}</span>
                <Doodle name="arrowUpRight" size={17} className="row-item__arrow" />
                <span className="row-item__excerpt">{post.excerpt}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------- elsewhere */}
        <section
          className="note note--forest reveal"
          style={{
            marginTop: "clamp(2.25rem, 4vw, 3.25rem)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ maxWidth: "52ch" }}>
            <strong style={{ color: "var(--color-ink)" }}>I cross-post everything here.</strong>{" "}
            The full archive, including drafts and the occasional reaction to a paper I liked, lives
            on my Medium profile.
          </p>
          <a
            href="https://medium.com/@yourhandle"
            className="btn btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Doodle name="pen" size={15} />
            Medium archive
            <Doodle name="arrowUpRight" size={15} />
          </a>
        </section>
      </div>
    </div>
  );
}
