import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="container-swiss flex min-h-screen items-center justify-center pt-28 text-center">
      <div className="glass-card max-w-lg p-8">
        <h1 className="mb-4 text-4xl font-bold">✍️ Blog</h1>
        <p className="card-muted mb-8 text-xl">
          Writing is in progress. Check back soon for new articles!
        </p>
        <Link href="/" className="btn">
          Go Home
        </Link>
      </div>
    </div>
  );
}
