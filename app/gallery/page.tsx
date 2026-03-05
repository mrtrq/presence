import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50">
      <div className="text-6xl mb-6">🖼️</div>
      <h1 className="text-4xl font-bold mb-2">Gallery</h1>
      <p className="text-lg text-gray-500 italic mb-8">
        Curating the collection... Under Construction.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to main page
      </Link>
    </div>
  );
}