import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Star, Squiggle } from "@/components/Doodles";
import { books } from "@/lib/books";

export default function HomePage() {
  const latest = books.find((b) => b.status === "read");

  return (
    <section className="view home">
      <div>
        <h1>
          Hi! I&apos;m Tarreq
        </h1>
        <p className="lede">
          Currently, I am working as a software
          engineer at BDO in Indonesia. I love to read books, especially when accompanied by a cup of tea. 
        </p>
        <div className="row">
          <Link className="btn y" href="/books">
            Browse my bookshelf
          </Link>
          <Link className="btn" href="/contact">
            Get in touch
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

        <article className="card now note on-y">
          <h3>Right now</h3>
          <p>
            Working as a software engineer, and reading the sky through
            exoplanet data.
          </p>
        </article>

        {latest && (
          <Link className="card late on-s" href="/books">
            <h3>Last read</h3>
            <b>
              {latest.title} · {latest.author}
            </b>
            <span className="more">
              See the shelf
              <ArrowRight strokeWidth={2.8} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
