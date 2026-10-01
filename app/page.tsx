import Link from "next/link";
import { Star, Squiggle } from "@/components/Doodles";
import { writing } from "@/lib/content";

export default function HomePage() {
  const latest = writing[0];

  return (
    <section className="view home">
      <div>
        <h1>
          I&apos;m Tarreq. I write software and work through questions about
          the universe.
        </h1>
        <p className="lede">
          This is where I keep my essays, the things I&apos;m curious about,
          and what I&apos;m building. Start with whatever looks interesting.
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
          <div className="ph">Your photo goes here</div>
        </figure>

        <article className="card now on-y">
          <h3>Right now</h3>
          <p>
            Placeholder: what you&apos;re building, reading, or learning this
            month.
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
