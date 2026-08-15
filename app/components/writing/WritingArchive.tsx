"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  formatWritingDate,
  type WritingEntry,
  type WritingFormat,
  writingFormatLabels,
} from "@/app/content/writing";

type ArchiveFilter = "all" | WritingFormat;

const filters: Array<{ id: ArchiveFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "note", label: "Notes" },
  { id: "visual-story", label: "Visual stories" },
];

export function WritingArchive({ articles }: { articles: WritingEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>("all");
  const visibleArticles = articles.filter(
    (article) => activeFilter === "all" || article.format === activeFilter,
  );

  return (
    <>
      <div className="archive-filters" aria-label="Filter writing by format">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={activeFilter === filter.id ? "is-active" : undefined}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="blog-card-list" aria-live="polite">
        {visibleArticles.map((article) => (
          <Link href={`/blog/${article.slug}`} className="blog-card" key={article.slug}>
            <div className="blog-card-meta">
              <span className={`format-badge format-${article.format}`}>
                {writingFormatLabels[article.format]}
              </span>
              <time dateTime={article.publishedAt}>{formatWritingDate(article.publishedAt)}</time>
              <span>{article.readingTime} min</span>
            </div>
            <div className="blog-card-copy">
              <div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
              <ArrowUpRight className="blog-card-arrow" size={19} aria-hidden="true" />
            </div>
            <div className="article-topic-list" aria-label="Topics">
              {article.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
