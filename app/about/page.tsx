import type { Metadata } from "next";
import Image from "next/image";
import { Squiggle, Star } from "@/components/Doodles";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About · Tarreq",
  description:
    "Muhammad Tarreq is a computer science graduate from the University of Indonesia and a software engineer interested in remote sensing, digital products, and student-led organizations.",
};

export default function AboutPage() {
  return (
    <section className="view about">
      <article className="reader">
        <h2>Hi, I&apos;m Tarreq.</h2>
        <div className="meta">{profile.name}</div>

        <p>
          I&apos;m a computer science graduate from the University of Indonesia,
          and I work as a software engineer at BDO Indonesia.
        </p>
        <p>
          I find fulfillment in making someone&apos;s day easier and better.
          Sometimes that happens through products and technology, and often it
          happens through communities and student organizations.
        </p>
        <p>
          I&apos;m interested in research on remote sensing, digital products,
          and student-led organizations. Each has taught me to listen carefully,
          learn from different people, and turn uncertainties into
          probabilities.
        </p>
        <p>
          I&apos;m still navigating forward by learning and unlearning, and I&apos;m
          excited to keep making this world a better place, with approaches that
          rekindle the light in every challenge.
        </p>

        <hr />

        <h3>Say hello</h3>
        <p>
          I&apos;m all ears for thoughtful discussions, collaborations, and
          experiments.
        </p>
        <div className="row">
          <a className="btn y" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
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
          <Image
            src="/avatar.jpg"
            alt="Tarreq standing in front of the Faculty of Computer Science building"
            width={960}
            height={1080}
            sizes="(max-width: 820px) 190px, 300px"
            priority
          />
          <figcaption>Fasilkom UI</figcaption>
        </figure>
      </aside>
    </section>
  );
}
