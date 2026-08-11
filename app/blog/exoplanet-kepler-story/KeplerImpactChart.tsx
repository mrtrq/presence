"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

type MethodGroup = "Transit" | "Radial Velocity" | "Transit Timing" | "Other";
type EraId = "before" | "kepler" | "after";

type Exoplanet = {
  name: string;
  year: number;
  radius: number;
  method: string;
  methodGroup: MethodGroup;
  facility: string;
};

type YearData = {
  year: number;
  count: number;
  cumulative: number;
};

type EraSummary = {
  id: EraId;
  label: string;
  rangeLabel: string;
  start: number;
  end: number;
  detail: string;
  totalCount: number;
  smallCount: number;
  annualSmallRate: number;
  smallShare: number;
  methods: Record<MethodGroup, number>;
  topFacilities: Array<{ facility: string; count: number }>;
};

type RadiusBin = {
  label: string;
  range: string;
  min: number;
  max: number;
  count: number;
};

type StoryData = {
  totalCount: number;
  smallCount: number;
  firstYear: number;
  latestYear: number;
  yearlyData: YearData[];
  eras: EraSummary[];
  radiusBins: RadiusBin[];
  transitSmallCount: number;
  keplerFacilityCount: number;
  tessAfterCount: number;
  peakYear: YearData | null;
};

const SMALL_RADIUS_LIMIT = 2;
const KEPLER_START = 2009;
const KEPLER_END = 2018;

const METHOD_ORDER: MethodGroup[] = ["Transit", "Radial Velocity", "Transit Timing", "Other"];

const METHOD_COLORS: Record<MethodGroup, string> = {
  Transit: "#28b9ff",
  "Radial Velocity": "#ffd84a",
  "Transit Timing": "#8f7cf7",
  Other: "#8fa1ad",
};

const ERA_COLORS: Record<EraId, string> = {
  before: "#8fa1ad",
  kepler: "#28b9ff",
  after: "#35c28f",
};

const RADIUS_BANDS = [
  { label: "Sub-Earth", range: "under 1 R", min: 0, max: 1 },
  { label: "Earth-size", range: "1-1.25 R", min: 1, max: 1.25 },
  { label: "Super-Earth", range: "1.25-2 R", min: 1.25, max: SMALL_RADIUS_LIMIT },
];

const numberFormat = new Intl.NumberFormat("en-US");
const compactFormat = new Intl.NumberFormat("en-US", { notation: "compact" });
const percentFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, style: "percent" });
const rateFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function toNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function groupMethod(method: string): MethodGroup {
  if (method === "Transit") return "Transit";
  if (method === "Radial Velocity") return "Radial Velocity";
  if (method.includes("Timing")) return "Transit Timing";
  return "Other";
}

function parsePlanet(row: d3.DSVRowString<string>): Exoplanet | null {
  const year = toNumber(row.disc_year);
  const radius = toNumber(row.pl_rade);
  if (!year || !radius || radius <= 0) return null;

  const method = row.discoverymethod || "Other";

  return {
    name: row.pl_name || "Unnamed planet",
    year: Math.round(year),
    radius,
    method,
    methodGroup: groupMethod(method),
    facility: row.disc_facility || "Unknown facility",
  };
}

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function emptyMethodCounts(): Record<MethodGroup, number> {
  return {
    Transit: 0,
    "Radial Velocity": 0,
    "Transit Timing": 0,
    Other: 0,
  };
}

function getEraDefinitions(firstYear: number, latestYear: number) {
  return [
    {
      id: "before" as const,
      label: "Before Kepler",
      start: firstYear,
      end: Math.min(KEPLER_START - 1, latestYear),
      detail: "Small worlds were mostly below the sensitivity of the dominant searches.",
    },
    {
      id: "kepler" as const,
      label: "Kepler and K2",
      start: Math.max(KEPLER_START, firstYear),
      end: Math.min(KEPLER_END, latestYear),
      detail: "A transit survey turned repeated, shallow dips in starlight into a planet census.",
    },
    {
      id: "after" as const,
      label: "After Kepler",
      start: Math.max(KEPLER_END + 1, firstYear),
      end: latestYear,
      detail: "Archival Kepler work, K2, TESS, and follow-up campaigns extended the small-world harvest.",
    },
  ].filter((era) => era.start <= era.end);
}

function buildStoryData(data: Exoplanet[]): StoryData {
  const firstYear = d3.min(data, (planet) => planet.year) ?? 1995;
  const latestYear = d3.max(data, (planet) => planet.year) ?? 2026;
  const smallPlanets = data.filter((planet) => planet.radius < SMALL_RADIUS_LIMIT);
  const byYear = d3.rollup(
    smallPlanets,
    (items) => items.length,
    (planet) => planet.year,
  );

  let cumulative = 0;
  const yearlyData = d3.range(firstYear, latestYear + 1).map((year) => {
    const count = byYear.get(year) ?? 0;
    cumulative += count;
    return { year, count, cumulative };
  });

  const eras = getEraDefinitions(firstYear, latestYear).map((era) => {
    const planetsInEra = data.filter((planet) => planet.year >= era.start && planet.year <= era.end);
    const smallInEra = planetsInEra.filter((planet) => planet.radius < SMALL_RADIUS_LIMIT);
    const methods = emptyMethodCounts();

    for (const planet of smallInEra) {
      methods[planet.methodGroup] += 1;
    }

    const topFacilities = d3
      .rollups(
        smallInEra,
        (items) => items.length,
        (planet) => planet.facility,
      )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([facility, count]) => ({ facility, count }));

    const years = era.end - era.start + 1;

    return {
      ...era,
      rangeLabel: `${era.start}-${era.end}`,
      totalCount: planetsInEra.length,
      smallCount: smallInEra.length,
      annualSmallRate: smallInEra.length / years,
      smallShare: planetsInEra.length ? smallInEra.length / planetsInEra.length : 0,
      methods,
      topFacilities,
    };
  });

  const radiusBins = RADIUS_BANDS.map((band) => ({
    ...band,
    count: smallPlanets.filter((planet) => planet.radius >= band.min && planet.radius < band.max).length,
  }));

  const transitSmallCount = smallPlanets.filter((planet) => planet.methodGroup === "Transit").length;
  const keplerFacilityCount = smallPlanets.filter(
    (planet) => planet.facility === "Kepler" || planet.facility === "K2",
  ).length;
  const tessAfterCount = smallPlanets.filter(
    (planet) =>
      planet.year > KEPLER_END && planet.facility === "Transiting Exoplanet Survey Satellite (TESS)",
  ).length;

  return {
    totalCount: data.length,
    smallCount: smallPlanets.length,
    firstYear,
    latestYear,
    yearlyData,
    eras,
    radiusBins,
    transitSmallCount,
    keplerFacilityCount,
    tessAfterCount,
    peakYear: d3.greatest(yearlyData, (row) => row.count) ?? null,
  };
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="metric-card glass-card">
      <p className="card-kicker">{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function StoryMetrics({ story }: { story: StoryData }) {
  const beforeEra = story.eras.find((era) => era.id === "before");
  const keplerEra = story.eras.find((era) => era.id === "kepler");

  return (
    <section className="container-swiss metric-grid" aria-label="Small exoplanet dataset summary">
      <MetricCard
        label="Small planets"
        value={numberFormat.format(story.smallCount)}
        detail={`Radius less than 2 Earth radii, ${story.firstYear}-${story.latestYear}`}
      />
      <MetricCard
        label="Kepler-era rate"
        value={`${rateFormat.format(keplerEra?.annualSmallRate ?? 0)}/yr`}
        detail={`Up from ${rateFormat.format(beforeEra?.annualSmallRate ?? 0)}/yr before 2009 in this CSV`}
      />
      <MetricCard
        label="Transit discoveries"
        value={percentFormat.format(story.transitSmallCount / story.smallCount)}
        detail={`${numberFormat.format(story.transitSmallCount)} of the small planets were found by transit`}
      />
    </section>
  );
}

function CumulativeSmallWorldsChart({ story }: { story: StoryData }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 430 : 500;
  const margin = {
    top: 36,
    right: width < 560 ? 20 : 34,
    bottom: 48,
    left: width < 560 ? 42 : 62,
  };
  const topPanel = {
    top: margin.top,
    bottom: width < 560 ? 248 : 296,
  };
  const bottomPanel = {
    top: width < 560 ? 306 : 360,
    bottom: height - margin.bottom,
  };
  const plotRight = width - margin.right;

  const x = d3.scaleLinear().domain([story.firstYear, story.latestYear]).range([margin.left, plotRight]);
  const cumulativeY = d3
    .scaleLinear()
    .domain([0, story.smallCount])
    .nice()
    .range([topPanel.bottom, topPanel.top]);
  const annualMax = d3.max(story.yearlyData, (row) => row.count) ?? 1;
  const annualY = d3
    .scaleLinear()
    .domain([0, annualMax])
    .nice()
    .range([bottomPanel.bottom, bottomPanel.top]);
  const barWidth = Math.max(2.2, ((plotRight - margin.left) / story.yearlyData.length) * 0.64);

  const cumulativeLine = d3
    .line<YearData>()
    .x((row) => x(row.year))
    .y((row) => cumulativeY(row.cumulative))
    .curve(d3.curveCatmullRom.alpha(0.45));

  const cumulativeArea = d3
    .area<YearData>()
    .x((row) => x(row.year))
    .y0(cumulativeY(0))
    .y1((row) => cumulativeY(row.cumulative))
    .curve(d3.curveCatmullRom.alpha(0.45));

  const hovered = hoverYear == null ? null : story.yearlyData.find((row) => row.year === hoverYear);
  const xTicks = Array.from(new Set(x.ticks(width < 560 ? 4 : 7).map(Math.round)));
  const cumulativeTicks = cumulativeY.ticks(4);
  const annualTicks = annualY.ticks(3);
  const keplerX = x(KEPLER_START);
  const keplerWidth = x(Math.min(KEPLER_END, story.latestYear)) - keplerX;

  return (
    <section className="container-swiss viz-section">
      <div className="viz-card glass-card">
        <div className="viz-header">
          <div>
            <p className="card-kicker">Visualization 1</p>
            <h2>The curve bends when the survey begins</h2>
          </div>
          <p>
            The upper panel accumulates small-planet discoveries. The lower panel keeps the annual
            spikes visible, which matters because archive releases and validation papers often arrive
            in batches.
          </p>
        </div>

        <div ref={wrapRef} className="viz-frame">
          <svg
            className="chart-svg"
            role="img"
            aria-label="Cumulative and annual discoveries of exoplanets smaller than two Earth radii"
            viewBox={`0 0 ${width} ${height}`}
          >
            <rect width={width} height={height} rx="8" fill="rgba(255,255,255,0.44)" />

            <rect
              x={keplerX}
              y={topPanel.top}
              width={keplerWidth}
              height={topPanel.bottom - topPanel.top}
              fill="#28b9ff"
              opacity="0.12"
            />
            <rect
              x={keplerX}
              y={bottomPanel.top}
              width={keplerWidth}
              height={bottomPanel.bottom - bottomPanel.top}
              fill="#28b9ff"
              opacity="0.12"
            />

            {cumulativeTicks.map((tick) => (
              <g key={`cum-${tick}`}>
                <line
                  x1={margin.left}
                  x2={plotRight}
                  y1={cumulativeY(tick)}
                  y2={cumulativeY(tick)}
                  className="chart-grid-line"
                />
                <text x={margin.left - 10} y={cumulativeY(tick) + 4} textAnchor="end" className="chart-axis-text">
                  {compactFormat.format(tick)}
                </text>
              </g>
            ))}

            <path d={cumulativeArea(story.yearlyData) ?? undefined} fill="#28b9ff" opacity="0.17" />
            <path
              d={cumulativeLine(story.yearlyData) ?? undefined}
              fill="none"
              stroke="#0d1726"
              strokeWidth="2.2"
            />

            {annualTicks.map((tick) => (
              <g key={`annual-${tick}`}>
                <line
                  x1={margin.left}
                  x2={plotRight}
                  y1={annualY(tick)}
                  y2={annualY(tick)}
                  className="chart-grid-line"
                />
                <text x={margin.left - 10} y={annualY(tick) + 4} textAnchor="end" className="chart-axis-text">
                  {compactFormat.format(tick)}
                </text>
              </g>
            ))}

            {story.yearlyData.map((row) => (
              <rect
                key={row.year}
                x={x(row.year) - barWidth / 2}
                y={annualY(row.count)}
                width={barWidth}
                height={bottomPanel.bottom - annualY(row.count)}
                rx="2"
                fill={row.year >= KEPLER_START && row.year <= KEPLER_END ? "#28b9ff" : "#35c28f"}
                opacity={row.count ? 0.7 : 0.18}
              />
            ))}

            <line x1={margin.left} x2={plotRight} y1={topPanel.bottom} y2={topPanel.bottom} className="chart-axis-line" />
            <line
              x1={margin.left}
              x2={plotRight}
              y1={bottomPanel.bottom}
              y2={bottomPanel.bottom}
              className="chart-axis-line"
            />

            {xTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={x(tick)}
                  x2={x(tick)}
                  y1={bottomPanel.bottom}
                  y2={bottomPanel.bottom + 6}
                  className="chart-axis-line"
                />
                <text x={x(tick)} y={bottomPanel.bottom + 24} textAnchor="middle" className="chart-axis-text">
                  {tick}
                </text>
              </g>
            ))}

            <text x={margin.left} y={topPanel.top - 12} className="chart-note">
              Cumulative small planets
            </text>
            <text x={margin.left} y={bottomPanel.top - 14} className="chart-note">
              Annual additions
            </text>
            <text x={keplerX + Math.max(keplerWidth / 2, 26)} y={topPanel.top + 18} textAnchor="middle" className="chart-note">
              Kepler / K2
            </text>

            {story.peakYear ? (
              <g transform={`translate(${x(story.peakYear.year)}, ${annualY(story.peakYear.count)})`}>
                <circle r="4" fill="#0d1726" />
                <text x="10" y="-8" className="chart-note">
                  Peak: {story.peakYear.year}
                </text>
              </g>
            ) : null}

            {hovered ? (
              <g transform={`translate(${x(hovered.year)}, 0)`}>
                <line y1={topPanel.top} y2={bottomPanel.bottom} className="chart-hover-line" />
                <foreignObject
                  x={x(hovered.year) > width * 0.66 ? -188 : 12}
                  y={topPanel.top + 14}
                  width="176"
                  height="116"
                >
                  <div className="chart-tooltip">
                    <strong>{hovered.year}</strong>
                    <span>{numberFormat.format(hovered.count)} added that year</span>
                    <span>{numberFormat.format(hovered.cumulative)} cumulative small planets</span>
                  </div>
                </foreignObject>
              </g>
            ) : null}

            <rect
              x={margin.left}
              y={topPanel.top}
              width={plotRight - margin.left}
              height={bottomPanel.bottom - topPanel.top}
              fill="transparent"
              onMouseMove={(event) => {
                const [mx] = d3.pointer(event);
                const year = Math.round(x.invert(mx));
                setHoverYear(clamp(year, story.firstYear, story.latestYear));
              }}
              onMouseLeave={() => setHoverYear(null)}
            />
          </svg>
        </div>

        <div className="kepler-insight-strip">
          <span>
            {numberFormat.format(story.smallCount)} small planets in this filtered dataset
          </span>
          <span>
            {story.peakYear
              ? `${numberFormat.format(story.peakYear.count)} were added in ${story.peakYear.year}, the largest annual batch`
              : "Annual batch sizes are unavailable"}
          </span>
          <span>{numberFormat.format(story.keplerFacilityCount)} are tied to Kepler or K2 facilities</span>
        </div>
      </div>
    </section>
  );
}

function EraRateChart({ story }: { story: StoryData }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 280 : 320;
  const margin = {
    top: 30,
    right: 18,
    bottom: 64,
    left: width < 560 ? 44 : 56,
  };
  const x = d3
    .scaleBand<EraId>()
    .domain(story.eras.map((era) => era.id))
    .range([margin.left, width - margin.right])
    .padding(0.28);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(story.eras, (era) => era.annualSmallRate) ?? 1])
    .nice()
    .range([height - margin.bottom, margin.top]);
  const yTicks = y.ticks(4);

  return (
    <div className="kepler-viz-panel">
      <div className="viz-frame" ref={wrapRef}>
        <svg
          className="chart-svg"
          role="img"
          aria-label="Average annual small exoplanet discoveries before, during, and after Kepler"
          viewBox={`0 0 ${width} ${height}`}
        >
          <rect width={width} height={height} rx="8" fill="rgba(255,255,255,0.42)" />

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y(tick)}
                y2={y(tick)}
                className="chart-grid-line"
              />
              <text x={margin.left - 10} y={y(tick) + 4} textAnchor="end" className="chart-axis-text">
                {tick}
              </text>
            </g>
          ))}

          {story.eras.map((era) => {
            const barX = x(era.id) ?? margin.left;
            const barWidth = x.bandwidth();
            const barTop = y(era.annualSmallRate);
            return (
              <g key={era.id}>
                <rect
                  x={barX}
                  y={barTop}
                  width={barWidth}
                  height={height - margin.bottom - barTop}
                  rx="5"
                  fill={ERA_COLORS[era.id]}
                  opacity="0.78"
                />
                <text
                  x={barX + barWidth / 2}
                  y={barTop - 8}
                  textAnchor="middle"
                  className="chart-note"
                >
                  {rateFormat.format(era.annualSmallRate)}/yr
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={height - margin.bottom + 22}
                  textAnchor="middle"
                  className="chart-axis-text"
                >
                  {era.label}
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={height - margin.bottom + 40}
                  textAnchor="middle"
                  className="chart-axis-text"
                >
                  {era.rangeLabel}
                </text>
              </g>
            );
          })}

          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={height - margin.bottom}
            y2={height - margin.bottom}
            className="chart-axis-line"
          />
          <text x={margin.left} y={20} className="chart-note">
            Average small planets added per year
          </text>
        </svg>
      </div>
      <p>
        The pre-Kepler baseline is nearly flat in this radius-filtered data; the Kepler era turns
        small planets into a statistical population.
      </p>
    </div>
  );
}

function MethodMixChart({ story }: { story: StoryData }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 280 : 320;
  const margin = {
    top: 30,
    right: width < 560 ? 18 : 28,
    bottom: 42,
    left: width < 560 ? 92 : 118,
  };
  const rowHeight = 38;
  const rowGap = 26;
  const x = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right]);

  return (
    <div className="kepler-viz-panel">
      <div className="viz-frame" ref={wrapRef}>
        <svg
          className="chart-svg"
          role="img"
          aria-label="Discovery method mix for small exoplanets by era"
          viewBox={`0 0 ${width} ${height}`}
        >
          <rect width={width} height={height} rx="8" fill="rgba(255,255,255,0.42)" />

          {story.eras.map((era, index) => {
            const y = margin.top + index * (rowHeight + rowGap);
            let runningShare = 0;
            return (
              <g key={era.id}>
                <text x={margin.left - 12} y={y + 22} textAnchor="end" className="chart-axis-text">
                  {era.label}
                </text>
                <rect
                  x={margin.left}
                  y={y}
                  width={width - margin.left - margin.right}
                  height={rowHeight}
                  rx="6"
                  fill="rgba(13,23,38,0.06)"
                />

                {METHOD_ORDER.map((method) => {
                  const count = era.methods[method];
                  const share = era.smallCount ? count / era.smallCount : 0;
                  const segmentX = x(runningShare);
                  const segmentWidth = Math.max(0, x(runningShare + share) - segmentX);
                  runningShare += share;

                  if (segmentWidth <= 0) return null;

                  return (
                    <rect
                      key={method}
                      x={segmentX}
                      y={y}
                      width={segmentWidth}
                      height={rowHeight}
                      rx="6"
                      fill={METHOD_COLORS[method]}
                      opacity={method === "Other" ? 0.58 : 0.82}
                    />
                  );
                })}

                <text x={margin.left} y={y + rowHeight + 17} className="chart-note">
                  {numberFormat.format(era.smallCount)} small planets, {percentFormat.format(era.smallShare)} of all
                  planets in the era
                </text>
              </g>
            );
          })}

          <text x={margin.left} y={height - 14} className="chart-note">
            Bar length is 100% of each era's small-planet discoveries
          </text>
        </svg>
      </div>
      <div className="legend-row" aria-label="Discovery method legend">
        {METHOD_ORDER.map((method) => (
          <span key={method}>
            <i style={{ background: METHOD_COLORS[method] }} />
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}

function EraComparisonSection({ story }: { story: StoryData }) {
  const keplerEra = story.eras.find((era) => era.id === "kepler");
  const afterEra = story.eras.find((era) => era.id === "after");
  const keplerTopFacility = keplerEra?.topFacilities[0];

  return (
    <section className="container-swiss viz-section">
      <div className="viz-card glass-card">
        <div className="viz-header">
          <div>
            <p className="card-kicker">Visualization 2</p>
            <h2>The rate changed because the method changed</h2>
          </div>
          <p>
            Comparing eras keeps the story honest: Kepler did not merely add more detections. It
            changed the type of planet that the discovery pipeline was best at seeing.
          </p>
        </div>

        <div className="kepler-chart-grid">
          <EraRateChart story={story} />
          <MethodMixChart story={story} />
        </div>

        <div className="kepler-insight-strip">
          <span>
            {keplerTopFacility
              ? `${keplerTopFacility.facility} leads the Kepler-era small-planet count with ${numberFormat.format(
                  keplerTopFacility.count,
                )} rows`
              : "Kepler-era facility counts are unavailable"}
          </span>
          <span>
            {afterEra
              ? `${numberFormat.format(afterEra.smallCount)} small planets appear after 2018 in this snapshot`
              : "Post-Kepler counts are unavailable"}
          </span>
          <span>{numberFormat.format(story.tessAfterCount)} post-2018 rows are tied to TESS</span>
        </div>
      </div>
    </section>
  );
}

function RadiusDistributionSection({ story }: { story: StoryData }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 260 : 300;
  const margin = {
    top: 32,
    right: width < 560 ? 20 : 34,
    bottom: 40,
    left: width < 560 ? 104 : 128,
  };
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(story.radiusBins, (bin) => bin.count) ?? 1])
    .nice()
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(story.radiusBins.map((bin) => bin.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.28);
  const xTicks = x.ticks(4);
  const largestBin = d3.greatest(story.radiusBins, (bin) => bin.count);

  return (
    <section className="container-swiss viz-section">
      <div className="viz-card glass-card">
        <div className="viz-header">
          <div>
            <p className="card-kicker">Visualization 3</p>
            <h2>Most of the new small worlds were larger than Earth</h2>
          </div>
          <p>
            A radius cutoff of 2 Earth radii groups together several kinds of planets. Splitting the
            bucket shows that the catalog is weighted toward super-Earth-size worlds, not Earth twins.
          </p>
        </div>

        <div ref={wrapRef} className="viz-frame">
          <svg
            className="chart-svg"
            role="img"
            aria-label="Radius distribution for exoplanets smaller than two Earth radii"
            viewBox={`0 0 ${width} ${height}`}
          >
            <rect width={width} height={height} rx="8" fill="rgba(255,255,255,0.42)" />

            {xTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={x(tick)}
                  x2={x(tick)}
                  y1={margin.top}
                  y2={height - margin.bottom}
                  className="chart-grid-line"
                />
                <text x={x(tick)} y={height - margin.bottom + 24} textAnchor="middle" className="chart-axis-text">
                  {compactFormat.format(tick)}
                </text>
              </g>
            ))}

            {story.radiusBins.map((bin) => {
              const yPosition = y(bin.label) ?? margin.top;
              const barWidth = x(bin.count) - margin.left;
              return (
                <g key={bin.label}>
                  <text x={margin.left - 12} y={yPosition + y.bandwidth() / 2 - 2} textAnchor="end" className="chart-axis-text">
                    {bin.label}
                  </text>
                  <text x={margin.left - 12} y={yPosition + y.bandwidth() / 2 + 14} textAnchor="end" className="chart-note">
                    {bin.range}
                  </text>
                  <rect
                    x={margin.left}
                    y={yPosition}
                    width={barWidth}
                    height={y.bandwidth()}
                    rx="6"
                    fill={bin.label === "Super-Earth" ? "#28b9ff" : bin.label === "Earth-size" ? "#35c28f" : "#ffd84a"}
                    opacity="0.8"
                  />
                  <text x={margin.left + barWidth + 8} y={yPosition + y.bandwidth() / 2 + 4} className="chart-note">
                    {numberFormat.format(bin.count)}
                  </text>
                </g>
              );
            })}

            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={height - margin.bottom}
              y2={height - margin.bottom}
              className="chart-axis-line"
            />
            <text x={margin.left} y={20} className="chart-note">
              Planets by measured radius band
            </text>
          </svg>
        </div>

        <div className="kepler-insight-strip">
          <span>
            {largestBin
              ? `${numberFormat.format(largestBin.count)} planets fall in the ${largestBin.label.toLowerCase()} band`
              : "Radius-band counts are unavailable"}
          </span>
          <span>The chart uses planets with measured radius less than 2 Earth radii</span>
        </div>
      </div>
    </section>
  );
}

export function KeplerImpactChart() {
  const [data, setData] = useState<Exoplanet[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const response = await fetch("/data/exoplanets-pscomppars.csv");
        if (!response.ok) throw new Error(`Failed to load data: ${response.status}`);

        const text = await response.text();
        const parsed = d3.csvParse(text, parsePlanet).filter(Boolean) as Exoplanet[];

        if (!cancelled) {
          setData(parsed);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setStatus("error");
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const story = useMemo(() => (data.length ? buildStoryData(data) : null), [data]);

  if (status === "loading") {
    return (
      <section className="container-swiss viz-section">
        <div className="viz-card glass-card">
          <p className="card-kicker">Loading Kepler data story</p>
          <div className="viz-loading" />
        </div>
      </section>
    );
  }

  if (status === "error" || !story) {
    return (
      <section className="container-swiss viz-section">
        <div className="viz-card glass-card">
          <p className="card-kicker">Dataset unavailable</p>
          <p className="card-muted">The local exoplanet CSV could not be loaded.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <StoryMetrics story={story} />
      <CumulativeSmallWorldsChart story={story} />
      <EraComparisonSection story={story} />
      <RadiusDistributionSection story={story} />
    </>
  );
}
