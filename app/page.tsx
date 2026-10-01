import Image from "next/image";
import Link from "next/link";
import { Star, Squiggle } from "@/components/Doodles";
import { writing } from "@/lib/content";

export default function HomePage() {
  const latest = writing[0];

  return (
    <section className="view home">
      <div>
        <h1>
          Hi! I&apos;m Tarreq
        </h1>
        <p className="lede">
          Computer science graduate from the University of Indonesia, software
          engineer at BDO Indonesia. This is where I keep my writing, what I&apos;m
          curious about, and what I&apos;ve built.
        </p>
        <div className="row">
          <Link className="btn y" href="/writing">
            Read the writing
          </Link>
          <Link className="btn" href="/interests">
            See what I&apos;m into
          </Link>
        </div>
      </div>

      <div className="fl">
        <div className="blob" />
        <Star className="dd" style={{ top: "6%", left: "46%" }} />
        <Squiggle className="dd" style={{ bottom: "2%", left: "14%" }} />

        <figure className="card photo" style={{ margin: 0 }}>
          <Image
            src="/avatar.jpg"
            alt="Tarreq standing in front of the Faculty of Computer Science building"
            width={960}
            height={1080}
            sizes="220px"
          />
        </figure>

        <article className="card now on-y">
          <h3>Right now</h3>
          <p>
            Working as a software engineer, and reading the sky through
            exoplanet data.
          </p>
        </article>

        <Link className="card late on-s" href={`/writing/${latest.slug}`}>
          <h3>Latest essay</h3>
          <b>{latest.title}</b>
          <span
            className="btn"
            style={{
              display: "inline-block",
              padding: ".35em .8em",
              boxShadow: "2px 2px 0 var(--sh)",
            }}
          >
            Read it
          </span>
        </Link>
      </div>
    </section>
  );
}
