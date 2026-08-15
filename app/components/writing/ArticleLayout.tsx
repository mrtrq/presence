import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  formatWritingDate,
  getAdjacentWriting,
  type WritingEntry,
  writingFormatLabels,
} from "@/app/content/writing";
import { CopyArticleLink } from "./CopyArticleLink";

export function ArticleLayout({
  article,
  children,
}: {
  article: WritingEntry;
  children: React.ReactNode;
}) {
  const adjacent = getAdjacentWriting(article.slug);

  return (
    <article className={`article-shell article-format-${article.format}`}>
      <header className="article-hero article-container">
        <Link href="/blog" className="article-back">
          <ArrowLeft size={16} aria-hidden="true" />
          All writings
        </Link>
        <div className="article-meta-line">
          <span className={`format-badge format-${article.format}`}>
            {writingFormatLabels[article.format]}
          </span>
          <time dateTime={article.publishedAt}>{formatWritingDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min read</span>
        </div>
        <h1>{article.title}</h1>
        <p className="article-lede">{article.description}</p>
        <div className="article-topic-list" aria-label="Topics">
          {article.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </header>

      {children}

      <footer className="article-footer article-container">
        <div className="article-finish">
          <div>
            <p className="article-finish-label">End note</p>
            <p>Thanks for spending a little time here.</p>
          </div>
          <CopyArticleLink />
        </div>

        <nav className="article-pagination" aria-label="More writing">
          {adjacent.previous ? (
            <Link href={`/blog/${adjacent.previous.slug}`} className="article-pagination-link">
              <ArrowLeft size={17} aria-hidden="true" />
              <span>
                <small>Newer</small>
                {adjacent.previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link href={`/blog/${adjacent.next.slug}`} className="article-pagination-link article-pagination-next">
              <span>
                <small>Older</small>
                {adjacent.next.title}
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </footer>
    </article>
  );
}
