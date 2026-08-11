import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="container-swiss blog-list-shell">
      <div className="blog-list-header">
        <Link href="/" className="article-back">
          Back home
        </Link>
        <p className="article-kicker">Blog</p>
        <h1>Notes and visual investigations</h1>
        <p>
          A place for writing that benefits from being interactive, visual, or a little more
          exploratory than a static note.
        </p>
      </div>

      <div className="blog-card-list">
        <Link href="/blog/exoplanet-atlas" className="blog-card glass-card">
          <p className="card-kicker">D3.js data story</p>
          <h2>What kind of exoplanets did we learn to see?</h2>
          <p>
            NASA Exoplanet Archive data visualized with D3: discovery waves, detection methods,
            and an interactive map of planet radius against host-star temperature.
          </p>
        </Link>
        <Link href="/blog/exoplanet-kepler-story" className="blog-card glass-card">
          <p className="card-kicker">Data story</p>
          <h2>How Kepler Changed Our View of Small Worlds</h2>
          <p>
            A data story on how Kepler turned small planets from rare detections into a measurable
            population, with era comparisons, method mix, and radius-band visualizations.
          </p>
        </Link>
      </div>
    </div>
  );
}
