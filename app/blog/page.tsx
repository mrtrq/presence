import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WritingArchive } from '@/app/components/writing/WritingArchive';
import { writingEntries } from '@/app/content/writing';

export default function BlogPage() {
  return (
    <div className="blog-list-shell article-container">
      <div className="blog-list-header">
        <Link href="/" className="article-back">
          <ArrowLeft size={16} aria-hidden="true" />
          Back home
        </Link>
        <p className="eyebrow">Writing</p>
        <h1>Notes and visual stories.</h1>
        <p>
          Short pieces for a quiet read, and richer investigations that use data and interaction
          when words alone are not enough.
        </p>
      </div>
      <WritingArchive articles={writingEntries} />
    </div>
  );
}
