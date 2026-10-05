import type { Metadata } from "next";
import Image from "next/image";
import { CopyEmail } from "@/components/CopyEmail";
import { Squiggle, Star } from "@/components/Doodles";
import { profile } from "@/lib/content";
import { topics } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact · Tarreq",
  description:
    "Muhammad Tarreq is a computer science graduate from the University of Indonesia and a software engineer interested in remote sensing, digital products, and student-led organizations.",
};

export default function ContactPage() {
  return (
    <section className="view about">
      <article className="reader contact">
        <h2>Reach me out and let&apos;s create something with purpose</h2>
        <p className="meta">
          Pick the closest topic and your email app opens with the subject
          filled in.
        </p>

        <ul className="topics">
          {topics.map((t) => (
            <li key={t.id} className={`topic t-${t.tone}`}>
              <h3>{t.title}</h3>
              <p>{t.blurb}</p>
              <a
                className="btn"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(t.subject)}`}
              >
                Email me
              </a>
            </li>
          ))}
        </ul>

        <div className="row contact-links">
          <CopyEmail email={profile.email} />
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={profile.medium} target="_blank" rel="noreferrer">
            Medium
          </a>
        </div>
      </article>

      <aside className="about-side">
        <div className="blob" />
        <Star className="dd" style={{ top: "2%", right: "10%" }} />
        <Squiggle className="dd" style={{ bottom: "4%", left: "8%" }} />
        <figure className="portrait">
          <div className="crop">
            <Image
              src="/milkyway.jpeg"
              alt="Picture of a milkyway"
              width={960}
              height={1080}
              sizes="(max-width: 820px) 285px, 400px"
              priority
            />
          </div>
          <figcaption>the milky way</figcaption>
        </figure>
      </aside>
    </section>
  );
}
