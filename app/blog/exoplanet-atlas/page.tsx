import type { Metadata } from "next";
import { ExoplanetD3Story } from "./ExoplanetD3Story";
import { ReadShell } from "@/app/components/shell/ReadShell";
import { Card } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "What kind of exoplanets did we learn to see?",
  description:
    "A D3.js data story using NASA Exoplanet Archive data to explore how confirmed exoplanet discoveries changed over time.",
};

export default function ExoplanetAtlasPage() {
  return (
    <ReadShell backHref="/blog" backLabel="All writing">
      <article className="article-shell">
        <header className="article-hero">
          <p className="article-kicker">D3.js data story</p>
          <h1>What kind of exoplanets did we learn to see?</h1>
          <p className="article-lede">
            A small visual investigation using NASA Exoplanet Archive data. The question is
            simple: as instruments changed, did the confirmed planets we found also change?
          </p>
        </header>

        <div className="article-grid">
          <Card tone="sky" seed="atlas:data" className="article-side">
            <p className="label">Dataset</p>
            <p>
              5,978 confirmed planets from the NASA Exoplanet Archive composite parameters table,
              filtered to rows with discovery year, planet radius, and host-star temperature.
            </p>
            <p className="card-muted">
              This local CSV is intentionally small enough for a personal site, while still rich
              enough to make D3 useful.
            </p>
          </Card>

          <section className="article-copy">
            <h2>The story</h2>
            <p>
              Exoplanet discovery is not only a story about planets. It is a story about instruments,
              survey strategy, and what kinds of signals are easiest to see. The same sky can look
              different when the tool changes.
            </p>
            <p>
              D3 is useful here because the visualization is not a standard dashboard chart. We want
              a stacked discovery history, a log-scaled planet map, astronomy-flavored axes, custom
              annotations, and hover behavior tuned to thousands of tiny points. A high-level
              charting library could draw a chart faster, but D3 gives direct control over the
              visual grammar.
            </p>
          </section>
        </div>

        <ExoplanetD3Story />

        <div className="article-grid">
          <Card tone="sun" seed="atlas:why" className="article-side">
            <p className="label">Why D3 here?</p>
            <p>
              D3 is not a chart template. It is a toolbox for scales, shapes, layouts, parsing,
              interaction, and SVG. That makes it more work, but much more expressive.
            </p>
          </Card>

          <section className="article-copy">
            <h2>D3 compared with other tools</h2>
            <div className="comparison-grid">
              <Card tone="sprout" seed="atlas:cmp:1" className="comparison-card">
                <h3>Spreadsheet chart</h3>
                <p>
                  Fast for a quick answer, but awkward for log axes, dense hover targets, and custom
                  explanatory layout.
                </p>
              </Card>
              <Card tone="sprout" seed="atlas:cmp:2" className="comparison-card">
                <h3>Dashboard library</h3>
                <p>
                  Great defaults and less code, but the visual design tends to follow the library's
                  available chart types.
                </p>
              </Card>
              <Card tone="forest" seed="atlas:cmp:3" className="comparison-card comparison-card-active">
                <h3>D3</h3>
                <p>
                  More deliberate code, but every encoding is yours: stacked areas, log scales,
                  color ramps, annotations, and nearest-point interaction can be composed directly.
                </p>
              </Card>
            </div>

            <h2>Sources</h2>
            <ul className="source-list">
              <li>
                <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer">
                  NASA Exoplanet Archive
                </a>
              </li>
              <li>
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/docs/API_queries.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Exoplanet Archive TAP/API query examples
                </a>
              </li>
              <li>
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/docs/API_exoplanet_columns.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Exoplanet Archive column definitions
                </a>
              </li>
              <li>
                <a href="https://d3js.org/what-is-d3" target="_blank" rel="noreferrer">
                  D3 documentation: what is D3?
                </a>
              </li>
              <li>
                <a href="https://github.com/d3/d3" target="_blank" rel="noreferrer">
                  d3/d3 on GitHub
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </ReadShell>
  );
}
