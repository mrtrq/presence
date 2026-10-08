"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/*
 * The tesseract: Murph's bookshelf from Interstellar. If the shelf sits
 * untouched for a while, one spine taps out STAY in Morse code, the way Cooper
 * pushed books from the other side. It happens once per visit, and never for
 * visitors who ask for reduced motion.
 */
const MORSE: Record<string, string> = { S: "...", T: "-", A: ".-", Y: "-.--" };
const GHOST_WORD = "STAY";
const IDLE_MS = 9000;

function morseFrames(word: string, unit = 150, lift = 11) {
  const steps: { up: boolean; units: number }[] = [];
  for (const letter of word) {
    for (const sym of MORSE[letter]) {
      steps.push({ up: true, units: sym === "." ? 1 : 3 });
      steps.push({ up: false, units: 1 });
    }
    steps.push({ up: false, units: 2 }); // letter gap is three units in all
  }
  const total = steps.reduce((n, s) => n + s.units, 0) * unit;
  const ramp = 45 / total;
  const frames: Keyframe[] = [{ offset: 0, transform: "translateY(0)" }];
  let t = 0;
  for (const s of steps) {
    const end = t + (s.units * unit) / total;
    if (s.up) {
      frames.push({ offset: t + ramp, transform: `translateY(-${lift}px)` });
      frames.push({ offset: end - ramp, transform: `translateY(-${lift}px)` });
      frames.push({ offset: end, transform: "translateY(0)" });
    }
    t = end;
  }
  frames.push({ offset: 1, transform: "translateY(0)" });
  return { frames, total };
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
  const [haunted, setHaunted] = useState(false);
  const shelfRef = useRef<HTMLDivElement>(null);
  const active = ordered[i];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    let anim: Animation | undefined;
    const arm = () => {
      anim?.cancel();
      window.clearTimeout(timer);
      timer = window.setTimeout(haunt, IDLE_MS);
    };
    const haunt = () => {
      const spines = shelfRef.current?.querySelectorAll<HTMLElement>('.spine[aria-pressed="false"]');
      if (!spines?.length || document.hidden) return arm();
      const el = spines[Math.floor(Math.random() * spines.length)];
      const { frames, total } = morseFrames(GHOST_WORD);
      anim = el.animate(frames, { duration: total });
      anim.onfinish = () => {
        stop();
        setHaunted(true);
      };
    };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const stop = () => {
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, arm));
    };
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true }));
    arm();
    return () => {
      stop();
      anim?.cancel();
    };
  }, []);

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

      <div className="shelves" ref={shelfRef}>
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
        {haunted && (
          <p className="ghost-note" role="status">
            One of the books just tapped out <b className="morse" aria-hidden="true">··· − ·− −·−−</b> on
            its own. That&apos;s Morse for <b>STAY</b>.
          </p>
        )}
      </div>
    </section>
  );
}
