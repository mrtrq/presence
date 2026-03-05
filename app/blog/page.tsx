import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-orange-500">✍️ Blog</h1>
      <p className="text-xl text-gray-600 mb-8">
        Writing is in progress. Check back soon for new articles!
      </p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
}