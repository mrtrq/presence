"use client";

import { ArrowDownRight, ArrowUpRight, Github, Mail } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { NewProjectCard } from "./components/NewProjectCard";
import { WebsiteCard } from "./components/WebsiteCard";
import { WritingCard } from "./components/WritingCard";

const sections = ["about", "works", "websites", "writing", "contact"] as const;
type SectionId = (typeof sections)[number];

const sectionMeta: Record<SectionId, { number: string; label: string }> = {
  about: { number: "01", label: "About" },
  works: { number: "02", label: "Selected works" },
  websites: { number: "03", label: "Websites" },
  writing: { number: "04", label: "Writing" },
  contact: { number: "05", label: "Contact" },
};

function sectionFromHash(hash: string): SectionId {
  const value = hash.replace("#", "");
  if (value === "projects") return "works";
  return sections.includes(value as SectionId) ? (value as SectionId) : "about";
}

export default function Page() {
  const [active, setActive] = useState<SectionId>("about");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const activeRef = useRef<SectionId>("about");

  const showSection = useCallback((next: SectionId, updateHistory = true) => {
    const currentIndex = sections.indexOf(activeRef.current);
    const nextIndex = sections.indexOf(next);

    if (next !== activeRef.current) {
      setDirection(nextIndex >= currentIndex ? "forward" : "backward");
      activeRef.current = next;
      setActive(next);
    }

    if (updateHistory && window.location.hash !== `#${next}`) {
      window.history.pushState(null, "", `#${next}`);
    }

    window.dispatchEvent(new CustomEvent("portfolio:changed", { detail: { section: next } }));
  }, []);

  useEffect(() => {
    const initial = sectionFromHash(window.location.hash);
    activeRef.current = initial;
    setActive(initial);
    window.dispatchEvent(new CustomEvent("portfolio:changed", { detail: { section: initial } }));

    const onNavigate = (event: Event) => {
      const next = (event as CustomEvent<{ section: SectionId }>).detail?.section;
      if (next && sections.includes(next)) showSection(next);
    };
    const onHistory = () => showSection(sectionFromHash(window.location.hash), false);

    window.addEventListener("portfolio:navigate", onNavigate);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("hashchange", onHistory);

    return () => {
      window.removeEventListener("portfolio:navigate", onNavigate);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("hashchange", onHistory);
    };
  }, [showSection]);

  const meta = sectionMeta[active];

  return (
    <div className="portfolio-page">
      <header className="portfolio-chrome">
        <button className="wordmark" type="button" onClick={() => showSection("about")}>
          Tarreq<span aria-hidden="true">.</span>
        </button>
        <div className="view-marker" aria-live="polite">
          <span>{meta.number} / 05</span>
          <span className="view-marker-line" aria-hidden="true" />
          <span>{meta.label}</span>
        </div>
      </header>

      <div className="portfolio-stage">
        <section
          key={active}
          className={`portfolio-view enters-${direction} view-${active}`}
          aria-labelledby={`${active}-title`}
          tabIndex={-1}
        >
          {active === "about" && (
            <div className="about-layout">
              <div className="about-copy">
                <p className="eyebrow">Hello, I&apos;m Muhammad Tarreq</p>
                <h1 id="about-title" className="display-title">
                  Navigating
                  <span>through.</span>
                </h1>
                <p className="display-lede">
                  I learn, unlearn, and make useful things at the intersection of
                  technology, communities, and everyday life.
                </p>
                <div className="primary-actions">
                  <button className="primary-link" type="button" onClick={() => showSection("works")}>
                    Explore my work <ArrowDownRight size={18} aria-hidden="true" />
                  </button>
                  <button className="text-link" type="button" onClick={() => showSection("contact")}>
                    Let&apos;s talk
                  </button>
                </div>
                <p className="about-note">
                  I find fulfillment in making someone&apos;s day easier and better —
                  sometimes through products and technology, often through communities.
                </p>
              </div>

              <figure className="portrait-frame">
                <Image
                  src="/avatar.jpg"
                  alt="Muhammad Tarreq standing in front of the Faculty of Computer Science building"
                  width={960}
                  height={1080}
                  priority
                  sizes="(max-width: 767px) 100vw, 42vw"
                  className="portrait-image"
                />
                <figcaption>
                  <span>Learning in public</span>
                  <span>One step at a time</span>
                </figcaption>
              </figure>
            </div>
          )}

          {active === "works" && (
            <div className="collection-layout">
              <header className="collection-header">
                <p className="eyebrow">A small selection</p>
                <h1 id="works-title">Work with a reason.</h1>
                <p>Research and organizing shaped around real people, real constraints, and useful outcomes.</p>
              </header>
              <div className="works-grid">
                <NewProjectCard
                  topic="Thesis research"
                  title="Remote Sensing"
                  preview="A multi-scenario pipeline comparing super-resolution methods and spectral indices to predict water quality from Sentinel-2 imagery over Jakarta's rivers."
                  viewtype="slide"
                  href="https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link"
                />
                <NewProjectCard
                  topic="Organization"
                  title="BEM Fasilkom UI"
                  desc="Student governance and advocacy — extending wellbeing systems, collaborative infrastructure, and campus life that works for everyone."
                  viewtype="grand design"
                  href="https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing"
                />
              </div>
            </div>
          )}

          {active === "websites" && (
            <div className="collection-layout">
              <header className="collection-header collection-header-wide">
                <div>
                  <p className="eyebrow">Made for the web</p>
                  <h1 id="websites-title">Useful places online.</h1>
                </div>
                <p>Small digital spaces made for prayer, architecture, and a community library.</p>
              </header>
              <div className="websites-grid">
                <WebsiteCard
                  topic="Initiative"
                  title="Nitip Doa"
                  desc="Send your du'a; someone will read it in Mecca or Medina."
                  href="https://nitipdoa.com/"
                  image="/nitipdoa.png"
                  imageAlt="Nitip Doa website"
                />
                <WebsiteCard
                  topic="Portfolio"
                  title="Bali Blueprint"
                  desc="A calm portfolio for an architecture studio."
                  href="https://bali-blueprint.com/"
                  image="/bali-blueprint.jpeg"
                  imageAlt="Bali Blueprint website"
                />
                <WebsiteCard
                  topic="Book listing"
                  title="Imakata Library"
                  desc="A browsable catalogue for the Imakata community library."
                  href="https://imakata.netlify.app/"
                  image="/imakata.jpg"
                  imageAlt="Imakata Library website"
                />
              </div>
            </div>
          )}

          {active === "writing" && (
            <div className="writing-layout">
              <header className="collection-header">
                <p className="eyebrow">Notes along the way</p>
                <h1 id="writing-title">Things I&apos;ve been thinking about.</h1>
              </header>
              <div className="writing-list numbered-writing-list">
                <WritingCard
                  title="Live Your Life at Full Power"
                  excerpt="On operating at full capacity — in work, presence, attention, and everyday moments."
                  href="https://medium.com/@tarreq.maulana/live-your-life-at-full-power-c9c55bd51a42"
                />
                <WritingCard
                  title="Refactor: A Forge to The Structure"
                  excerpt="What the discipline of refactoring teaches us about confronting complexity."
                  href="https://medium.com/@tarreq.maulana/refactor-a-forge-to-the-structure-4b5911753f43"
                />
                <WritingCard
                  title="Market Research Guest Lecture"
                  excerpt="Notes on how market research operates beyond surveys and inside real decisions."
                  href="https://medium.com/@tarreq.maulana/market-research-guest-lecture-836a52c66510"
                />
                <WritingCard
                  title="Achieving Goals through Pitch"
                  excerpt="How framing a goal as a pitch sharpens the objective and the path toward it."
                  href="https://medium.com/@tarreq.maulana/achieving-goals-through-pitch-846bf774cdc7"
                />
              </div>
            </div>
          )}

          {active === "contact" && (
            <div className="contact-layout">
              <div>
                <p className="eyebrow">Get in touch</p>
                <h1 id="contact-title">
                  Have something
                  <span>worth exploring?</span>
                </h1>
              </div>
              <div className="contact-panel">
                <p>
                  I&apos;m all ears for thoughtful discussions, collaborations, and experiments.
                  The easiest way to reach me is by email.
                </p>
                <a className="email-link" href="mailto:tarreq.maulana@gmail.com">
                  <span>tarreq.maulana@gmail.com</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <div className="social-links">
                  <a href="https://github.com/mrtrq" target="_blank" rel="noreferrer">
                    <Github size={17} aria-hidden="true" /> GitHub
                  </a>
                  <a href="mailto:tarreq.maulana@gmail.com">
                    <Mail size={17} aria-hidden="true" /> Email
                  </a>
                </div>
              </div>
              <p className="contact-signoff">© {new Date().getFullYear()} Muhammad Tarreq</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
