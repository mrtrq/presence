import Image from "next/image";
import Link from "next/link";
import type { Entry } from "@/lib/content";

export function MasterDetail({
  label,
  basePath,
  entries,
  activeSlug,
}: {
  label: string;
  basePath: string;
  entries: Entry[];
  activeSlug: string;
}) {
  const i = Math.max(
    0,
    entries.findIndex((e) => e.slug === activeSlug)
  );
  const active = entries[i];
  const prev = i > 0 ? entries[i - 1] : null;
  const next = i < entries.length - 1 ? entries[i + 1] : null;

  return (
    <section className="view md">
      <nav className="list" role="tablist" aria-label={label}>
        {entries.map((e, j) => (
          <Link
            key={e.slug}
            href={`${basePath}/${e.slug}`}
            className={`it c${j % 3}`}
            role="tab"
            aria-current={e.slug === active.slug ? "page" : undefined}
            aria-selected={e.slug === active.slug}
          >
            <b>{e.title}</b>
            <small>{e.meta}</small>
          </Link>
        ))}
      </nav>
      <article className="reader">
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
            </Link>
          ))}
        <div className="pn">
          {prev && (
            <Link className="btn" href={`${basePath}/${prev.slug}`}>
              Previous
            </Link>
          )}
          {next && (
            <Link className="btn y" href={`${basePath}/${next.slug}`}>
              Next
            </Link>
          )}
        </div>
      </article>
    </section>
  );
}
