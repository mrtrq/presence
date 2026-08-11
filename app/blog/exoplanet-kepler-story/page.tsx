import type { Metadata } from "next";
import Link from "next/link";
import { KeplerImpactChart } from "./KeplerImpactChart";

export const metadata: Metadata = {
  title: "How Kepler Changed Our View of Small Worlds | Muhammad Tarreq",
  description:
    "A data story on how Kepler changed exoplanet discovery from a search for giants into a census of small worlds.",
};

export default function KeplerImpactPage() {
  return (
    <article className="article-shell">
      <header className="article-hero container-swiss">
        <Link href="/blog" className="article-back">
          Back to blog
        </Link>
        <p className="article-kicker">Data story</p>
        <h1>How Kepler Changed Our View of Small Worlds</h1>
        <p className="article-lede">
          Before 2009, the confirmed exoplanet catalog was shaped by what our instruments could
          most easily notice: giant planets, often close to their stars. Kepler changed the question.
          Instead of asking whether a few strange systems existed, it asked how common small planets
          might be when one telescope watched the same stars with patient precision.
        </p>
      </header>

      <div className="container-swiss article-grid">
        <aside className="article-side glass-card">
          <p className="card-kicker">About the data</p>
          <p>
            The charts below use the local NASA Exoplanet Archive composite-parameters CSV included
            with this site. The story filters to confirmed planets with measured radius, then focuses
            on worlds smaller than 2 Earth radii.
          </p>
          <p className="card-muted">
            Discovery year is the archive year, so spikes often reflect catalog releases, validation
            papers, and follow-up work rather than a telescope literally finding hundreds of planets
            on one night.
          </p>
        </aside>

        <section className="article-copy">
          <h2>The bias before the breakthrough</h2>
          <p>
            The first famous exoplanets were not typical planets. They were the planets easiest to
            detect: massive enough to tug their stars, close enough to complete orbits quickly, or
            aligned just right for a transit. That early sample taught astronomers that other planetary
            systems existed, but it was a poor census of smaller worlds.
          </p>
          <p>
            Kepler launched in 2009 and watched more than 150,000 stars in one field of view, measuring
            repeated dips in starlight as planets crossed in front of their host stars. That made small
            planets visible in bulk because the method depends on precision and repetition, not on a
            planet being massive enough to shake its star.
          </p>
          <p>
            The useful story is not just that the line goes up. It is that the slope changes. Once
            Kepler's candidate lists, confirmations, and statistical validations entered the archive,
            small planets stopped looking exceptional and started looking like a normal outcome of
            planet formation.
          </p>
        </section>
      </div>

      <KeplerImpactChart />

      <section className="container-swiss article-grid">
        <aside className="article-side glass-card">
          <p className="card-kicker">Reading the charts</p>
          <p>
            Treat the annual bars as publication history and the cumulative curve as the deeper
            scientific signal. The exact timing of a database row is less important than the change
            in what the archive becomes capable of representing.
          </p>
          <p className="card-muted">
            Kepler's original mission ended after reaction-wheel failures, but its extended K2 mission
            and later archival work kept adding planets. TESS then shifted the emphasis toward brighter,
            nearby stars that are easier to follow up.
          </p>
        </aside>

        <section className="article-copy">
          <h2>From discovery to demographics</h2>
          <p>
            Kepler did more than add names to a catalog. It made planet demographics measurable:
            how common small planets are, how often they appear in compact systems, and how their
            sizes compare with Earth, super-Earths, and mini-Neptunes. That is why the radius
            distribution matters. A planet can be "small" compared with Jupiter and still be quite
            different from Earth.
          </p>
          <p>
            The post-Kepler era is not an anticlimax. It is the handoff from census to context. TESS
            finds planets around brighter nearby stars, ground-based observatories refine masses and
            orbits, and telescopes such as JWST can examine a small number of atmospheres in detail.
            Kepler gave the field the population map; newer work helps decide which worlds deserve a
            closer look.
          </p>
        </section>
      </section>
    </article>
  );
}
