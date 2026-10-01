import { Doodle } from "./Doodles";
import { identity } from "../content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell--wide footer__inner">
        <div className="stack" style={{ gap: "0.35rem" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              fontVariationSettings: '"SOFT" 30, "WONK" 1',
            }}
          >
            Let&apos;s work on something.
          </p>
          <p className="muted" style={{ fontSize: "var(--step--1)" }}>
            {identity.availability} · {identity.location}
          </p>
        </div>

        <nav className="footer__links" aria-label="Elsewhere">
          {identity.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer__link"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Doodle name={link.doodle} size={15} />
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        className="shell--wide"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1.25rem",
          justifyContent: "space-between",
          marginTop: "1.75rem",
          paddingTop: "1.25rem",
          borderTop: "1.5px dashed rgba(22,40,31,0.18)",
          fontSize: "0.8rem",
          color: "var(--color-ink-soft)",
        }}
      >
        <span>
          © {new Date().getFullYear()} {identity.name}
        </span>
        <span>Built by hand. Set in Fraunces &amp; Karla.</span>
      </div>
    </footer>
  );
}
