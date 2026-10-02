import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Entry, Kind } from "@/lib/content";
import { KeepActiveVisible } from "./KeepActiveVisible";

/**
 * List + reader for Writing and Interests.
 *
 * Wide screens show both side by side. Phones show one at a time:
 *   mode="index" -> the full list (every card visible, scrolls vertically)
 *   mode="entry" -> one entry, with a back button and a pinned Previous/Next
 * On wide screens "index" simply shows the first entry in the reader.
 */
export function MasterDetail({
  label,
  basePath,
  entries,
  kinds,
  activeSlug,
  mode,
}: {
  label: string;
  basePath: string;
  entries: Entry[];
  kinds: Kind[];
  activeSlug: string;
  mode: "index" | "entry";
}) {
  const i = Math.max(
    0,
    entries.findIndex((e) => e.slug === activeSlug)
  );
  const active = entries[i];
  const prev = i > 0 ? entries[i - 1] : null;
  const next = i < entries.length - 1 ? entries[i + 1] : null;
  const activeKind = kinds.find((k) => k.id === active.kind);

  return (
    <section className="view md" data-mode={mode}>
      <div className="side">
        <KeepActiveVisible />
        <h2 className="side-title">{label}</h2>
        <nav className="list" aria-label={label}>
          {entries.map((e, j) => {
            const kind = kinds.find((k) => k.id === e.kind);
            // Entry view: the open card is selected on every screen size.
            // Index view: only wide screens show a selection, because the
            // reader (showing the first entry) is open there.
            const on = mode === "entry" && j === i;
            const onWide = mode === "index" && j === 0;
            return (
              <Link
                key={e.slug}
                href={`${basePath}/${e.slug}`}
                className={`it tone-${kind?.tone ?? "p"}`}
                aria-current={on ? "page" : undefined}
                data-on={on ? "" : undefined}
                data-on-wide={onWide ? "" : undefined}
              >
                <span className="it-text">
                  {kind && <span className="sr-only">{kind.label}: </span>}
                  <b>{e.title}</b>
                  <small>{e.meta}</small>
                </span>
                <ChevronRight className="go" strokeWidth={2.8} aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
        <ul className="key" aria-label="What the card colors mean">
          {kinds.map((k) => (
            <li key={k.id}>
              <i className={`tone-${k.tone}`} aria-hidden="true" />
              {k.label}
            </li>
          ))}
        </ul>
      </div>

      <article className="reader split">
        <div className="crumb">
          <Link className="btn sm" href={basePath}>
            <ArrowLeft className="ic" strokeWidth={2.8} aria-hidden="true" />
            All {label.toLowerCase()}
          </Link>
        </div>

        <div className="body" tabIndex={0} role="region" aria-label={active.title}>
          {activeKind && (
            <div className="chip">
              <i className={`tone-${activeKind.tone}`} aria-hidden="true" />
              {activeKind.label}
            </div>
          )}
          <h2>{active.title}</h2>
          <div className="meta">{active.meta}</div>
          {active.body.map((p, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          {active.images && (
            <div className="shots">
              {active.images.map((img) => (
                <a
                  key={img.src}
                  href={img.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 820px) 70vw, 220px"
                  />
                </a>
              ))}
            </div>
          )}
          {active.link &&
            (active.link.external ? (
              <a
                className="btn g cta"
                href={active.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {active.link.label}
              </a>
            ) : (
              <Link className="btn g cta" href={active.link.href}>
                {active.link.label}
                <ArrowRight className="ic" strokeWidth={2.8} aria-hidden="true" />
              </Link>
            ))}
        </div>

        {/* Always the same two slots in the same place; an unavailable one is
            shown dashed instead of removed, so nothing shifts between entries. */}
        <nav className="pn" aria-label={`${label} navigation`}>
          {prev ? (
            <Link className="btn" href={`${basePath}/${prev.slug}`}>
              <ArrowLeft className="ic" strokeWidth={2.8} aria-hidden="true" />
              Previous
            </Link>
          ) : (
            <span className="btn off" aria-disabled="true">
              <ArrowLeft className="ic" strokeWidth={2.8} aria-hidden="true" />
              Previous
            </span>
          )}
          <span className="count" aria-label={`${i + 1} of ${entries.length}`}>
            {i + 1} / {entries.length}
          </span>
          {next ? (
            <Link className="btn y" href={`${basePath}/${next.slug}`}>
              Next
              <ArrowRight className="ic" strokeWidth={2.8} aria-hidden="true" />
            </Link>
          ) : (
            <span className="btn y off" aria-disabled="true">
              Next
              <ArrowRight className="ic" strokeWidth={2.8} aria-hidden="true" />
            </span>
          )}
        </nav>
      </article>
    </section>
  );
}
