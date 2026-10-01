# Personal site

A one-screen dashboard plus five real pages. Navigation is button-driven, so
nobody has to scroll to find anything.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, 17 static routes
```

## Editing content

**Everything you need to change lives in [`app/content.ts`](app/content.ts).**
No other file contains text you own. Sections, in order:

| Export | Drives |
| --- | --- |
| `identity` | Name, role, intro, location, email, social links, footer |
| `deck` | The six cards on the home page, and their grid sizes |
| `posts` | The writing index and every essay route |
| `projects` | The work page |
| `interests` | The hobbies page |
| `about` | The about page, including facts and working style |
| `now` | The "what I'm doing now" page |
| `contact` | The contact page |

Placeholders are written to be plausible so the layout reads honestly. Replace
them with your real details — nothing else needs touching.

### Publishing essays

Each entry in `posts` produces a route at `/writing/<slug>` automatically.

- To write **on the site**, replace the placeholder body in
  `app/writing/[slug]/page.tsx`.
- To publish **elsewhere** (Medium, your own host), add an `href` to the post.
  Point the card at that URL instead of the local route.

Set `featured: true` on exactly one post to pin it to the top of `/writing`.

## Editing the design

### Colour and type — `app/globals.css`

All tokens sit in the `@theme` block at the top:

```
--color-cream     paper ground
--color-paper     card surface
--color-ink       text            (a very dark forest green, not black)
--color-ink-soft  body copy
--color-ink-faint tertiary text
--color-forest    primary accent
--color-sun       secondary accent
--color-sky       tertiary accent
```

`--color-ink-soft` and `--color-ink-faint` are tuned to clear **4.5:1 contrast**
on cream, white, and all three pale tints. If you darken or lighten an accent,
re-check contrast.

Type is **Fraunces** (display) and **Karla** (body), loaded through
`next/font` in `app/layout.tsx` — self-hosted, no external requests.

### Illustration — `app/components/Doodles.tsx`

Every doodle on the site is in this one file, on a shared 24×24 grid with a
1.6 stroke and round caps. To add one, write a `<g className="pen">` entry in
`PATHS` and add its name to the `DoodleName` union.

**No other file should contain raw SVG.** Keeping one pen language is what makes
the illustration read as a set rather than as clip art.

## Structure

```
app/
  content.ts            ← all of your content
  globals.css           design tokens + components
  layout.tsx            fonts, nav, footer
  page.tsx              home dashboard
  about/ work/ interests/ now/ contact/ writing/
  writing/[slug]/       essay pages
  components/
    Doodles.tsx         the entire illustration library
    SiteNav.tsx         nav + mobile sheet
    SiteFooter.tsx
```

## Notes

- `public/_vp.html` was a development viewport harness used to check the desktop
  layouts in fixed-width iframes. It is already removed — do not re-add it.
- Set your real domain in `app/sitemap.ts` and `app/robots.ts`.
- Lighthouse scores 100 for accessibility, best practices, and SEO on all routes.
- Production payload per page: **~296 KB** total — 7.5 KB CSS, 139 KB JS
  (the React baseline plus the nav's client component), 150 KB for the two
  self-hosted variable fonts, 7 KB HTML. DOM content loaded in **45 ms**.
- Respects `prefers-reduced-motion` and prints cleanly.
- `public/` still holds unused images from the previous site (`avatar.jpg`,
  `nitipdoa.png`, `bali-blueprint.jpeg`, `imakata.jpg`, `icon.png`,
  `favicon.ico`). Nothing references them. Delete them, or reuse them as
  project thumbnails on `/work`.
