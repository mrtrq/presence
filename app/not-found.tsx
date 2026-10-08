import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Gargantua } from "@/components/Doodles";
import { TarsHumor } from "@/components/TarsHumor";

export default function NotFound() {
  return (
    <section className="view lost">
      <article className="reader lost-card">
        <Gargantua className="lost-bh" />
        <div className="lost-copy">
          <div className="chip">
            <i className="tone-y" aria-hidden="true" />
            404 · signal lost
          </div>
          <h2>This page slipped past the event horizon.</h2>
          <TarsHumor />
          <Link className="btn g cta" href="/">
            Plot a course home
            <ArrowRight className="ic" strokeWidth={2.8} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </section>
  );
}
