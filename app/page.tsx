/**
 * The home screen.
 *
 * Deliberately one screen tall. Everything else is a panel, so the only
 * decisions a visitor makes are which card to open and whether to close it.
 *
 * The composition is asymmetric on purpose: a large hand-lettered
 * introduction with a cluster of cards floating around it, rather than a
 * centred column, because the cards are meant to look like things on a desk.
 */

import Image from "next/image";
import Link from "next/link";

import { identity, research } from "@/app/content/site";
import { CircleAround, Sparkle, Squiggle } from "@/app/components/draw/Doodles";
import { HomeNav } from "@/app/components/shell/HomeNav";
import { PanelHost } from "@/app/components/shell/PanelHost";
import { DoorGrid, HeroActions } from "@/app/components/shell/home-pieces";
import { frameVars } from "@/app/lib/frame";

const portraitFrame = frameVars({
  seed: "hero:portrait",
  radius: 18,
  strokeWidth: 5,
  roughness: 1.1,
  fill: "#fffdf6",
});

export default function Page() {
  return (
    <div className="page home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <HomeNav />
      <PanelHost />

      <main id="main" className="container-swiss home-main">
        <section className="hero" aria-labelledby="hero-name">
          <div className="hero-copy">
            <p className="label hero-kicker">
              <Sparkle size={15} aria-hidden="true" />
              {identity.role} · {identity.location}
            </p>

            <h1 id="hero-name" className="display-xl">
              <span className="hero-line hero-line-sm">Hi, I&apos;m</span>
              <span className="hero-line hero-name">
                {identity.firstName}
                <span className="hero-dot" aria-hidden="true" />
              </span>
            </h1>

            <p className="lede hero-lede">
              I make things that make other people&apos;s day a little easier. Most of my work
              sits where <span className="mark">design meets infrastructure</span> — and I write
              about attention, refactoring, and the small worlds orbiting other stars.
            </p>

            <Squiggle className="hero-squiggle" seed="hero" />

            <HeroActions />

            <ul className="hero-facts">
              <li>
                <span className="label">Now</span>
                <span>{research[0].title}</span>
              </li>
              <li>
                <span className="label">Wrote</span>
                <span>Notes on attention and on refactoring</span>
              </li>
            </ul>
          </div>

          <div className="hero-portrait">
            <div className="portrait-frame" style={portraitFrame as React.CSSProperties}>
              <span className="tape tape-sky" aria-hidden="true" />
              <Image
                src="/avatar.jpg"
                alt={`${identity.fullName}, smiling`}
                width={640}
                height={800}
                priority
                className="portrait-img"
              />
            </div>
            <p className="portrait-note">
              <CircleAround>hi</CircleAround>
            </p>
          </div>
        </section>

        <section className="doorway" aria-label="Sections of this site">
          <DoorGrid />
        </section>
      </main>

      <footer className="home-footer">
        <div className="container-swiss home-footer-inner">
          <p className="faint small">
            © {new Date().getFullYear()} {identity.fullName}
          </p>
          <ul className="home-footer-links">
            <li>
              <Link href="/blog">Data stories</Link>
            </li>
            <li>
              <a href="https://github.com/mrtrq" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://medium.com/@tarreq.maulana" target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
