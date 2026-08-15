import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  type WritingEntry,
  writingFormatLabels,
} from "@/app/content/writing";

export function WritingCard({ article }: { article: WritingEntry }) {
  return (
    <Link href={`/blog/${article.slug}`} className="writing-row group">
      <div className="min-w-0">
        <div className="writing-row-meta">
          <span>{writingFormatLabels[article.format]}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min</span>
        </div>
        <h3>{article.title}</h3>
        <p className="card-muted">{article.description}</p>
      </div>
      <ArrowRight className="writing-row-arrow" size={17} aria-hidden="true" />
    </Link>
  );
}
