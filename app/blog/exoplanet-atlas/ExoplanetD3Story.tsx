"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

type Exoplanet = {
  name: string;
  host: string;
  year: number;
  method: string;
  facility: string;
  radius: number;
  mass: number | null;
  period: number | null;
  equilibriumTemperature: number | null;
  starTemperature: number;
  starRadius: number | null;
  distance: number | null;
  methodGroup: MethodGroup;
};

type MethodGroup =
  | "Transit"
  | "Radial Velocity"
  | "Microlensing"
  | "Imaging"
  | "Timing"
  | "Other";

type YearDatum = {
  year: number;
} & Record<string, number>;

const METHOD_ORDER: MethodGroup[] = [
  "Transit",
  "Radial Velocity",
  "Microlensing",
  "Imaging",
  "Timing",
  "Other",
];

const METHOD_COLORS: Record<MethodGroup, string> = {
  Transit: "#28b9ff",
  "Radial Velocity": "#ffd84a",
  Microlensing: "#35c28f",
  Imaging: "#ff8a65",
  Timing: "#8f7cf7",
  Other: "#8fa1ad",
};

const numberFormat = new Intl.NumberFormat("en-US");
const compactFormat = new Intl.NumberFormat("en-US", { notation: "compact" });

function toNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function groupMethod(method: string): MethodGroup {
  if (method === "Transit") return "Transit";
  if (method === "Radial Velocity") return "Radial Velocity";
  if (method === "Microlensing") return "Microlensing";
  if (method === "Imaging") return "Imaging";
  if (method.includes("Timing") || method.includes("Pulsar")) return "Timing";
  return "Other";
}

function parsePlanet(row: d3.DSVRowString<string>): Exoplanet | null {
  const year = toNumber(row.disc_year);
  const radius = toNumber(row.pl_rade);
  const starTemperature = toNumber(row.st_teff);

  if (!year || !radius || !starTemperature) return null;

  const method = row.discoverymethod || "Other";

  return {
    name: row.pl_name || "Unnamed planet",
    host: row.hostname || "Unknown host",
    year,
    method,
    facility: row.disc_facility || "Unknown facility",
    radius,
    mass: toNumber(row.pl_bmasse),
    period: toNumber(row.pl_orbper),
    equilibriumTemperature: toNumber(row.pl_eqt),
    starTemperature,
    starRadius: toNumber(row.st_rad),
    distance: toNumber(row.sy_dist),
    methodGroup: groupMethod(method),
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

function buildYearRows(data: Exoplanet[]) {
  const [minYear = 1995, maxYear = 2026] = d3.extent(data, (planet) => planet.year);
  const byYearMethod = d3.rollup(
    data,
    (items) => items.length,
    (planet) => planet.year,
    (planet) => planet.methodGroup,
  );

  return d3.range(minYear, maxYear + 1).map((year) => {
    const row: YearDatum = { year };
    for (const method of METHOD_ORDER) {
      row[method] = byYearMethod.get(year)?.get(method) ?? 0;
    }
    row.total = METHOD_ORDER.reduce((sum, method) => sum + row[method], 0);
    return row;
  });
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

function DiscoveryTimeline({ data }: { data: Exoplanet[] }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 300 : 380;
  const margin = {
    top: 24,
    right: width < 560 ? 18 : 34,
    bottom: 42,
    left: width < 560 ? 38 : 54,
  };

  const rows = useMemo(() => buildYearRows(data), [data]);
  const stackSeries = useMemo(
    () =>
      d3
        .stack<YearDatum>()
        .keys(METHOD_ORDER)
        .value((row, key) => row[key] ?? 0)(rows),
    [rows],
  );

  const [minYear, maxYear] = d3.extent(rows, (row) => row.year) as [number, number];
  const yMax = d3.max(rows, (row) => row.total) ?? 1;
  const x = d3.scaleLinear().domain([minYear, maxYear]).range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const area = d3
    .area<d3.SeriesPoint<YearDatum>>()
    .x((_, index) => x(rows[index]?.year ?? minYear))
    .y0((point) => y(point[0]))
    .y1((point) => y(point[1]))
    .curve(d3.curveCatmullRom.alpha(0.45));

  const hoveredRow = hoverYear == null ? null : rows.find((row) => row.year === hoverYear);
  const topYear = d3.greatest(rows, (row) => row.total);
  const xTicks = x.ticks(width < 560 ? 4 : 7).map(Math.round);
  const yTicks = y.ticks(4);

  return (
    <section className="container-swiss viz-section">
      <div className="viz-card glass-card">
        <div className="viz-header">
          <div>
            <p className="card-kicker">Visualization 1</p>
            <h2>Discovery changed from a trickle to a survey wave</h2>
          </div>
          <p>
            Each band counts confirmed planets by discovery method per year. D3 builds the stack,
            curves the areas, scales the axes, and lets the hover state follow the nearest year.
          </p>
        </div>

        <div ref={wrapRef} className="viz-frame">
          <svg
            className="chart-svg"
            role="img"
            aria-label="Stacked area chart of confirmed exoplanet discoveries by year and method"
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <linearGradient id="timelineGlow" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
                <stop offset="100%" stopColor="rgba(40,185,255,0.08)" />
              </linearGradient>
            </defs>

            <rect width={width} height={height} rx="8" fill="url(#timelineGlow)" />

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
                  {compactFormat.format(tick)}
                </text>
              </g>
            ))}

            {stackSeries.map((series) => (
              <path
                key={series.key}
                d={area(series) ?? undefined}
                fill={METHOD_COLORS[series.key as MethodGroup]}
                opacity={series.key === "Other" ? 0.48 : 0.78}
              />
            ))}

            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={height - margin.bottom}
              y2={height - margin.bottom}
              className="chart-axis-line"
            />

            {xTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={x(tick)}
                  x2={x(tick)}
                  y1={height - margin.bottom}
                  y2={height - margin.bottom + 6}
                  className="chart-axis-line"
                />
                <text x={x(tick)} y={height - margin.bottom + 24} textAnchor="middle" className="chart-axis-text">
                  {tick}
                </text>
              </g>
            ))}

            <text x={margin.left} y={22} className="chart-note">
              Confirmed planets per year
            </text>

            {topYear ? (
              <g transform={`translate(${x(topYear.year)}, ${y(topYear.total)})`}>
                <line y1={0} y2={height - margin.bottom - y(topYear.total)} className="chart-annotation-line" />
                <circle r="4" fill="#0d1726" />
                <text x="10" y="-10" className="chart-note">
                  Peak: {topYear.year}
                </text>
              </g>
            ) : null}

            {hoveredRow ? (
              <g transform={`translate(${x(hoveredRow.year)}, 0)`}>
                <line y1={margin.top} y2={height - margin.bottom} className="chart-hover-line" />
                <foreignObject
                  x={x(hoveredRow.year) > width * 0.72 ? -178 : 12}
                  y={margin.top + 6}
                  width="166"
                  height="150"
                >
                  <div className="chart-tooltip">
                    <strong>{hoveredRow.year}</strong>
                    <span>{numberFormat.format(hoveredRow.total)} confirmed</span>
                    {METHOD_ORDER.map((method) => (
                      <span key={method}>
                        <i style={{ background: METHOD_COLORS[method] }} />
                        {method}: {hoveredRow[method]}
                      </span>
                    ))}
                  </div>
                </foreignObject>
              </g>
            ) : null}

            <rect
              x={margin.left}
              y={margin.top}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
              fill="transparent"
              onMouseMove={(event) => {
                const [mx] = d3.pointer(event);
                const year = Math.round(x.invert(mx));
                setHoverYear(clamp(year, minYear, maxYear));
              }}
              onMouseLeave={() => setHoverYear(null)}
            />
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
    </section>
  );
}

function PlanetMap({ data }: { data: Exoplanet[] }) {
  const [wrapRef, measuredWidth] = useElementWidth<HTMLDivElement>();
  const [selectedMethod, setSelectedMethod] = useState<MethodGroup | "All">("All");
  const [hovered, setHovered] = useState<{ planet: Exoplanet; x: number; y: number } | null>(null);

  const width = Math.max(measuredWidth, 320);
  const height = width < 560 ? 420 : 500;
  const margin = {
    top: 30,
    right: width < 560 ? 20 : 36,
    bottom: 58,
    left: width < 560 ? 46 : 62,
  };

  const filtered = useMemo(() => {
    const source = selectedMethod === "All" ? data : data.filter((planet) => planet.methodGroup === selectedMethod);
    return source.filter(
      (planet) =>
        planet.radius > 0 &&
        planet.radius <= 32 &&
        planet.starTemperature >= 2400 &&
        planet.starTemperature <= 9000,
    );
  }, [data, selectedMethod]);

  const x = d3
    .scaleLinear()
    .domain([9000, 2400])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLog()
    .domain([0.35, 32])
    .range([height - margin.bottom, margin.top])
    .clamp(true);
  const color = d3
    .scaleSequentialLog(d3.interpolateTurbo)
    .domain([120, 2600])
    .clamp(true);

  const delaunay = useMemo(() => {
    if (!filtered.length) return null;
    return d3.Delaunay.from(
      filtered,
      (planet) => x(planet.starTemperature),
      (planet) => y(planet.radius),
    );
  }, [filtered, x, y]);

  const xTicks = x.ticks(width < 560 ? 4 : 6);
  const yTicks = [0.5, 1, 2, 4, 8, 16, 32];
  const yAxisLabelX = width < 560 ? 30 : 18;

  return (
    <section className="container-swiss viz-section">
      <div className="viz-card glass-card">
        <div className="viz-header">
          <div>
            <p className="card-kicker">Visualization 2</p>
            <h2>A planet map needs more than one encoding</h2>
          </div>
          <p>
            Each point is a confirmed planet. Horizontal position is host-star temperature,
            vertical position is planet radius on a log scale, and color estimates planetary
            equilibrium temperature where available.
          </p>
        </div>

        <div className="method-filter" aria-label="Filter planet map by discovery method">
          {(["All", ...METHOD_ORDER] as Array<MethodGroup | "All">).map((method) => (
            <button
              key={method}
              type="button"
              className={selectedMethod === method ? "is-active" : ""}
              onClick={() => {
                setSelectedMethod(method);
                setHovered(null);
              }}
            >
              {method}
            </button>
          ))}
        </div>

        <div ref={wrapRef} className="viz-frame">
          <svg
            className="chart-svg"
            role="img"
            aria-label="Scatter plot of planet radius by host star temperature"
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
                  {numberFormat.format(tick)}
                </text>
              </g>
            ))}

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

            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={height - margin.bottom}
              y2={height - margin.bottom}
              className="chart-axis-line"
            />
            <line
              x1={margin.left}
              x2={margin.left}
              y1={margin.top}
              y2={height - margin.bottom}
              className="chart-axis-line"
            />

            <text x={(margin.left + width - margin.right) / 2} y={height - 14} textAnchor="middle" className="chart-note">
              Host star temperature in Kelvin - hotter stars on the left
            </text>
            <text
              x={yAxisLabelX}
              y={(margin.top + height - margin.bottom) / 2}
              textAnchor="middle"
              transform={`rotate(-90 ${yAxisLabelX} ${(margin.top + height - margin.bottom) / 2})`}
              className="chart-note"
            >
              Planet radius in Earth radii
            </text>

            <line x1={x(5772)} x2={x(5772)} y1={margin.top} y2={height - margin.bottom} className="chart-annotation-line" />
            <text x={x(5772) + 8} y={margin.top + 14} className="chart-note">
              Sun-like host
            </text>

            <line x1={margin.left} x2={width - margin.right} y1={y(1)} y2={y(1)} className="chart-annotation-line" />
            <text x={margin.left + 8} y={y(1) - 8} className="chart-note">
              Earth radius
            </text>

            <g opacity={0.78}>
              {filtered.map((planet) => {
                const cx = x(planet.starTemperature);
                const cy = y(planet.radius);
                const pointColor = planet.equilibriumTemperature
                  ? color(planet.equilibriumTemperature)
                  : "rgba(95,111,123,0.5)";

                return (
                  <circle
                    key={`${planet.name}-${planet.host}`}
                    cx={cx}
                    cy={cy}
                    r={planet.radius > 10 ? 3.6 : planet.radius > 2 ? 2.8 : 2.1}
                    fill={pointColor}
                    stroke="rgba(255,255,255,0.72)"
                    strokeWidth="0.55"
                  />
                );
              })}
            </g>

            {hovered ? (
              <g>
                <circle cx={hovered.x} cy={hovered.y} r="7" fill="none" stroke="#0d1726" strokeWidth="1.5" />
                <foreignObject
                  x={hovered.x > width * 0.68 ? hovered.x - 222 : hovered.x + 14}
                  y={hovered.y > height * 0.6 ? hovered.y - 136 : hovered.y + 12}
                  width="208"
                  height="132"
                >
                  <div className="chart-tooltip">
                    <strong>{hovered.planet.name}</strong>
                    <span>{hovered.planet.host}</span>
                    <span>Radius: {hovered.planet.radius.toFixed(2)} Earth radii</span>
                    <span>Host star: {numberFormat.format(Math.round(hovered.planet.starTemperature))} K</span>
                    <span>Method: {hovered.planet.methodGroup}</span>
                  </div>
                </foreignObject>
              </g>
            ) : null}

            <rect
              x={margin.left}
              y={margin.top}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
              fill="transparent"
              onMouseMove={(event) => {
                if (!delaunay || !filtered.length) return;
                const [mx, my] = d3.pointer(event);
                const index = delaunay.find(mx, my);
                const planet = filtered[index];
                if (!planet) return;
                const px = x(planet.starTemperature);
                const py = y(planet.radius);
                const distance = Math.hypot(px - mx, py - my);

                setHovered(distance < 32 ? { planet, x: px, y: py } : null);
              }}
              onMouseLeave={() => setHovered(null)}
            />
          </svg>
        </div>

        <div className="planet-caption">
          <span>{numberFormat.format(filtered.length)} planets shown</span>
          <span>Color: cooler to hotter equilibrium temperature</span>
          <span>Scale: log radius, so small rocky worlds remain visible</span>
        </div>
      </div>
    </section>
  );
}

export function ExoplanetD3Story() {
  const [data, setData] = useState<Exoplanet[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const response = await fetch("/data/exoplanets-pscomppars.csv");
        if (!response.ok) throw new Error(`Could not load exoplanet data: ${response.status}`);

        const text = await response.text();
        const parsed = d3.csvParse(text, parsePlanet).filter(Boolean) as Exoplanet[];

        if (!cancelled) {
          setData(parsed);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => {
    if (!data.length) return null;

    const firstYear = d3.min(data, (planet) => planet.year) ?? 0;
    const latestYear = d3.max(data, (planet) => planet.year) ?? 0;
    const methodCounts = d3.rollups(
      data,
      (items) => items.length,
      (planet) => planet.methodGroup,
    );
    const leadingMethod = d3.greatest(methodCounts, ([, count]) => count);
    const medianRadius = d3.median(data, (planet) => planet.radius) ?? 0;

    return {
      firstYear,
      latestYear,
      leadingMethod: leadingMethod?.[0] ?? "Unknown",
      leadingMethodCount: leadingMethod?.[1] ?? 0,
      medianRadius,
    };
  }, [data]);

  if (status === "loading") {
    return (
      <section className="container-swiss viz-section">
        <div className="viz-card glass-card">
          <p className="card-kicker">Loading D3 story</p>
          <div className="viz-loading" />
        </div>
      </section>
    );
  }

  if (status === "error") {
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
      {summary ? (
        <section className="container-swiss metric-grid" aria-label="Exoplanet dataset summary">
          <MetricCard
            label="Planets"
            value={numberFormat.format(data.length)}
            detail={`${summary.firstYear}-${summary.latestYear} discovery years`}
          />
          <MetricCard
            label="Leading method"
            value={summary.leadingMethod}
            detail={`${numberFormat.format(summary.leadingMethodCount)} planets in this filtered set`}
          />
          <MetricCard
            label="Median radius"
            value={`${summary.medianRadius.toFixed(2)} Earth radii`}
            detail="Earth radii among rows with radius data"
          />
        </section>
      ) : null}

      <DiscoveryTimeline data={data} />
      <PlanetMap data={data} />
    </>
  );
}
