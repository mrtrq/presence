// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"

// Temporary placeholder content
const posts = {
  "welcome-notes-on-navigating": {
    title: "Welcome — Notes on Navigating",
    date: "2025-08-01",
    content: `
      <p>This is my writing space. It will hold essays, short experiments, and technical notes.</p>
      <p>More to come soon.</p>
    `,
  },
  "designing-with-grids": {
    title: "Designing with Grids",
    date: "2025-08-05",
    content: `
      <p>The Swiss design style is about clarity, precision, and timelessness. Grids form its backbone.</p>
      <p>Expect explorations into typography, spacing, and structure.</p>
    `,
  },
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  if (!post) return notFound()

  return (
    <article className="prose prose-neutral max-w-3xl mx-auto px-6 py-16">
      <h1 className="tracking-tight">{post.title}</h1>
      <div className="text-sm text-neutral-500 mb-8">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
