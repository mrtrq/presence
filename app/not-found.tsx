import Link from "next/link";
import { Doodle, FloatDoodle } from "./components/Doodles";
import { deck } from "./content";

export default function NotFound() {
  return (
    <div className="page" style={{ display: "grid", placeItems: "center" }}>
      <div className="shell stack" style={{ position: "relative", textAlign: "center", gap: "0.85rem" }}>
        <FloatDoodle name="compass" size={40} tilt={-14} style={{ top: "-2.5rem", left: "6%" }} />
        <FloatDoodle name="sparkle" size={22} tilt={12} delay={1} style={{ bottom: "-1rem", right: "8%" }} />

        <p className="kicker" style={{ justifyContent: "center" }}>
          <Doodle name="compass" size={15} />
          404
        </p>
        <h1 className="display">This page is not on the map</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          The link may be old, or I may have moved something. Everything else is still where you
          left it.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
          <Link href="/" className="btn btn--primary">
            <Doodle name="arrowLeft" size={17} />
            Back to the dashboard
          </Link>
          {deck.slice(0, 3).map((card) => (
            <Link key={card.href} href={card.href} className="btn">
              {card.eyebrow}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
