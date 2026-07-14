import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="container-swiss flex min-h-screen items-center justify-center pt-28 text-center">
      <div className="glass-card max-w-lg p-8">
        <div className="mb-6 text-6xl">🖼️</div>
        <h1 className="mb-2 text-4xl font-bold">Gallery</h1>
        <p className="card-muted mb-8 text-lg italic">
          Curating the collection... Under Construction.
        </p>
        <Link href="/" className="btn">
          ← Back to main page
        </Link>
      </div>
    </div>
  );
}
