import type { Metadata } from "next";
import Image from "next/image";
import { CopyEmail } from "@/components/CopyEmail";
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
