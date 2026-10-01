import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Doodle } from "../../components/Doodles";
import { posts } from "../../content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[index + 1];

  return (
    <article className="page">
      <div className="shell article-shell">
        <Link href="/writing" className="back-link">
          <Doodle name="arrowLeft" size={16} />
          All writing
        </Link>

        <header className="reveal" style={{ maxWidth: "42rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className="badge badge--sky">{post.category}</span>
            <span className="mono-label muted">
              {post.date} · {post.readTime}
            </span>
          </div>

          <h1
            style={{
              marginTop: "0.85rem",
              fontSize: "var(--step-3)",
              fontVariationSettings: '"SOFT" 20, "WONK" 1',
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>

          <p className="lede" style={{ marginTop: "0.9rem" }}>
            {post.excerpt}
          </p>
        </header>

        <div className="note note--sun reveal" style={{ marginBottom: "2.5rem" }}>
          <strong style={{ color: "var(--color-ink)" }}>Placeholder body.</strong> This essay is
          listed so the layout is complete. Either paste the full text here once it exists, or set{" "}
          <code>href</code> on the post in <code>app/content.ts</code> and this route will link
          straight to wherever you publish it.
        </div>

        <div className="prose" style={{ fontSize: "var(--step-1)" }}>
          <p>
            Writing lives here from here on. The reading experience is intentionally narrow and
            generous: one measure, a comfortable size, and no furniture competing for attention.
          </p>
          <p>
            When this is filled in, the body copy will render as a single column with a sticky
            sidebar for the date and category, and a link onward to the next piece at the bottom.
          </p>
        </div>

        {next && (
          <Link
            href={`/writing/${next.slug}`}
            className="card card--forest reveal"
            style={{ marginTop: "3rem", padding: "1.25rem 1.4rem", gap: "0.4rem" }}
          >
            <span className="deck-card__eyebrow">Next up</span>
            <span className="card__title">{next.title}</span>
            <span
              className="deck-card__go"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35em", marginTop: "0.35rem" }}
            >
              Keep reading
              <Doodle name="arrowRight" size={16} />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
