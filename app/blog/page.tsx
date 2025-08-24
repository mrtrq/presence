// app/blog/page.tsx
import Link from "next/link"

// Temporary fake data for layout testing
const posts = [
  {
    slug: "welcome-notes-on-navigating",
    title: "Welcome — Notes on Navigating",
    description: "Short intro about ideas, experiments, and essays.",
    date: "2025-08-01",
  },
  {
    slug: "designing-with-grids",
    title: "Designing with Grids",
    description: "Exploring the Swiss design approach for timeless layouts.",
    date: "2025-08-05",
  },
]

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Insights</h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4 border-neutral-300">
            <Link
              href={`/blog/${post.slug}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <h2 className="text-xl font-medium">{post.title}</h2>
              <p className="text-sm text-neutral-600 mt-1">{post.description}</p>
              <div className="text-xs text-neutral-500 mt-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
