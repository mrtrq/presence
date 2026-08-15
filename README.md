# Tarreq's personal website

A single-screen portfolio with local writing, interactive data stories, and a responsive bottom-dock navigation system.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Writing workflow

Writing metadata lives in `app/content/writing.ts`, ordered newest first. The first three entries automatically appear in the homepage Writing scene, while every entry appears in `/blog`.

To add a Note:

1. Add its metadata to `writingEntries` with `format: "note"`.
2. Create `app/blog/[slug]/page.mdx`.
3. Wrap the Markdown content in `ArticleLayout` following `app/blog/on-making-useful-things/page.mdx`.

To add a Visual story:

1. Add its metadata with `format: "visual-story"`.
2. Create a TypeScript page under `app/blog/[slug]/page.tsx`.
3. Use `ArticleLayout` for the shared header, metadata, copy-link, and reading navigation.
4. Place responsive images, charts, and interactive chapters between the shared header and footer.

Before publishing, run:

```bash
npm run build
```

## Case-study workflow

Case-study content lives in `app/content/projects.ts`. Each entry controls its homepage card, internal `/projects/[slug]` route, focus tags, supporting deck link, and article sections. Update the `sections` array to add your own context, decisions, outcomes, and reflections without changing the page layout.
