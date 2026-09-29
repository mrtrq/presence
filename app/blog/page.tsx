import type { Metadata } from "next";
import { ReadShell } from "@/app/components/shell/ReadShell";
import { Card } from "@/app/components/ui";
import { Sparkle, Squiggle } from "@/app/components/draw/Doodles";
import { posts, writingIntro } from "@/app/components/panels/content";
import { featuredPost } from "@/app/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and data stories by Tarreq Maulana, on attention, refactoring, and the small worlds orbiting other stars.",
};

/**
 * The writing index mirrors the panel, in a scrollable form.
 *
 * Both exist on purpose: the panel is how you browse from the home screen, and
 * this page is a stable, linkable address that a professor can be sent to.
 * They read the same content module, so the two can never disagree.
 */
export default function BlogPage() {
  return (
    <ReadShell backHref="/" backLabel="Back home" title="Writing">
      <header className="read-hero">
        <p className="article-kicker">Writing</p>
        <h1 className="display-lg">Notes, essays, and things I had to work out</h1>
        <p>{writingIntro}</p>
        <Squiggle className="rule-squiggle" seed="index" />
      </header>

      <Card tone="sun" seed="index:featured" className="featured-post read-featured">
        <p className="label">Start here</p>
        <h2 className="display-md">
          <a
            href={featuredPost.href}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            {featuredPost.title}
          </a>
        </h2>
        <p className="card-body">{featuredPost.excerpt}</p>
      </Card>

      <ul className="read-list" style={{ marginTop: "1.5rem" }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Card tone={post.tone} seed={`index:${post.id}`} className="read-card">
              <div className="post-meta">
                <span className="label">{post.tag}</span>
                <span className="faint small">{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="doorway-hint" aria-hidden="true">
                <Sparkle size={14} />
              </span>
            </Card>
          </li>
        ))}
      </ul>

      <div className="read-foot">
        <p className="faint small">Older essays live on Medium, where they were first published.</p>
        <a
          className="btn btn-sm btn-sky"
          href="https://medium.com/@tarreq.maulana"
          target="_blank"
          rel="noopener noreferrer"
        >
          All on Medium
        </a>
      </div>
    </ReadShell>
  );
}
