"use client";

import { ArrowRight, Check, Copy, Github } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { NewProjectCard } from "./components/NewProjectCard";
import { WebsiteCard } from "./components/WebsiteCard";
import { WritingCard } from "./components/WritingCard";
import { writingEntries } from "./content/writing";

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
  const [copied, setCopied] = useState(false);
  const activeRef = useRef<SectionId>("about");
  const copyResetRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (copyResetRef.current) window.clearTimeout(copyResetRef.current);
    };
  }, []);

  const copyEmail = async () => {
    const email = "tarreq.maulana@gmail.com";

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }

      setCopied(true);
      if (copyResetRef.current) window.clearTimeout(copyResetRef.current);
      copyResetRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

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
                <p className="eyebrow">About me</p>
                <h1 id="about-title" className="about-title">
                  Hey, I&apos;m Tarreq<span aria-hidden="true">.</span>
                </h1>
                <div className="about-story">
                  <p>
                    I&apos;m a computer science graduate from the University of Indonesia, currently working as a software engineer at BDO Indonesia.
                  </p>
                  <p>
                    I am interested in conducting research about <span> remote-sensing </span>,
                    {" "}<span>digital products</span>, and <span>student-led organizations</span>.
                    Each has taught me to listen carefully, learn from different people, and
                    turn uncertainites into probabilites.
                  </p>
                  <p>
                    I&apos;m excited to navigate forward as I learn and unlearn along the way.
                  </p>
                </div>
                <div className="primary-actions">
                  <button className="primary-link" type="button" onClick={() => showSection("works")}>
                    Explore my work <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  <button className="text-link" type="button" onClick={() => showSection("contact")}>
                    Let&apos;s talk
                  </button>
                </div>
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
                <h1 id="works-title">My Experiences.</h1>
                <p>Slices of my research and activities that revolves around people and exploration.</p>
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
                  <h1 id="websites-title">Selected Works</h1>
                </div>
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
                <h1 id="writing-title">The Writings</h1>
                <p>
                  My way of expressing and translating my curiosities into a brief article.
                </p>
              </header>
              <div className="writing-index-preview">
                <div className="writing-list numbered-writing-list">
                  {writingEntries.slice(0, 3).map((article) => (
                    <WritingCard key={article.slug} article={article} />
                  ))}
                </div>
                <a className="writing-all-link" href="/blog">
                  View all writings <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {active === "contact" && (
            <div className="contact-layout">
              <div>
                <p className="eyebrow">Let's get in touch</p>
                <h1 id="contact-title">
                  Contact Me
                </h1>
              </div>
              <div className="contact-panel">
                <p>
                  I&apos;m all ears for thoughtful discussions, collaborations, and experiments.
                  The most convenient way to reach me is by email.
                </p>
                <button
                  className={`email-link${copied ? " is-copied" : ""}`}
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy tarreq.maulana@gmail.com"
                >
                  <span className="email-address">tarreq.maulana@gmail.com</span>
                  <span className="email-copy-state" aria-live="polite">
                    {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </span>
                </button>
                <div className="social-links">
                  <a href="https://github.com/mrtrq" target="_blank" rel="noreferrer">
                    <Github size={17} aria-hidden="true" /> GitHub
                  </a>
                  <button type="button" onClick={copyEmail}>
                    {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                    {copied ? "Copied" : "Copy email"}
                  </button>
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
