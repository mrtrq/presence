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
        <h2>Hi! I&apos;m Tarreq.</h2>

        <p>
         I'm a software engineer currently working at BDO in Indonesia. 
        </p>
        <p>
          
        </p>
        <p>
          This website contains a fraction of my writings, experiences, and interests.
        </p>
        <p>
          I believe that navigating forward by learning and unlearning is the way to go.
        </p>

        <hr />

        <h3>Reach me out and let's create something with purpose</h3>
        <p>
          
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
