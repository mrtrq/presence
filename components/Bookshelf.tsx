"use client";

import { useState, type CSSProperties } from "react";
import type { Book } from "@/lib/books";

const tones = ["y", "s", "g", "p", "k"] as const;

/** Small stable hash, so a book keeps the same spine on every visit. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function spine(book: Book) {
  const h = hash(book.title + book.author);
  return {
    tone: tones[h % tones.length],
    // share of the shelf height, and thickness in px
    height: 74 + (h >>> 3) % 20,
    // long titles get a thicker spine so they can wrap instead of being cut off
    width: Math.min(62, 32 + Math.round(book.title.length * 0.75) + ((h >>> 8) % 6)),
  };
}

const shelves = [
  { status: "read", label: "Read" },
  { status: "want", label: "Want to read" },
] as const;

/**
 * A shelf of spines, inspired by browsing a record cabinet: press a spine and
 * it slides up off the shelf while its front cover shows in the card.
 *
 * Spines wrap onto as many shelves as they need, so every book is always
 * visible (no sideways scrolling). The card keeps one size and one place, so
 * nothing on the shelf moves when the selection changes.
 */
export function Bookshelf({ books }: { books: Book[] }) {
  const ordered = shelves.flatMap((s) => books.filter((b) => b.status === s.status));
  const [i, setI] = useState(0);
  const active = ordered[i];

  if (!active) {
    return (
      <section className="view books">
        <p className="shelf-empty">The shelf is empty for now.</p>
      </section>
    );
  }

  const look = spine(active);

  return (
    <section className="view books">
      <article className="book-card" aria-live="polite">
        <div className={`cover tone-${look.tone}`} aria-hidden="true">
          <span>{active.title}</span>
          <small>{active.author}</small>
        </div>
        <div className="book-info">
          <div className="chip">
            <i className={active.status === "read" ? "tone-g" : "tone-p"} aria-hidden="true" />
            {active.status === "read"
              ? `Read${active.year ? ` · ${active.year}` : ""}`
              : "Want to read"}
          </div>
          <h2>{active.title}</h2>
          <div className="meta">{active.author}</div>
          {active.note && <p>{active.note}</p>}
          {active.link && (
            <a className="btn sm" href={active.link} target="_blank" rel="noreferrer">
              About the book
            </a>
          )}
        </div>
        <span className="count" aria-label={`${i + 1} of ${ordered.length}`}>
          {i + 1} / {ordered.length}
        </span>
      </article>

      <div className="shelves">
        <h1 className="sr-only">Bookshelf</h1>
        {shelves.map((s) => {
          const onShelf = ordered
            .map((b, j) => ({ b, j }))
            .filter(({ b }) => b.status === s.status);
          if (onShelf.length === 0) return null;
          return (
            <section key={s.status} className="shelf-group" aria-label={s.label}>
              <h3>
                {s.label}
                <span>{onShelf.length}</span>
              </h3>
              <ul className="shelf">
                {onShelf.map(({ b, j }) => {
                  const sp = spine(b);
                  return (
                    <li key={b.title + b.author}>
                      <button
                        type="button"
                        className={`spine tone-${sp.tone}`}
                        style={{ "--h": `${sp.height}%`, "--w": `${sp.width}px` } as CSSProperties}
                        aria-pressed={j === i}
                        aria-label={`${b.title} by ${b.author}`}
                        onClick={() => setI(j)}
                      >
                        <span aria-hidden="true">{b.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
