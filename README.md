# Presence

Personal site for Tarreq Maulana. A single-screen home with overlay panels,
plus two long-form data stories on their own pages.

## The idea

The home screen does not scroll. Everything else opens as a panel over it, so
navigation is by button and the page never gets longer. The two data stories
are the exception: reading several paragraphs inside a modal is unpleasant, so
they are ordinary scrolling pages that share the same design system.

## Stack

- Next.js 16 (App Router, static export, no runtime data)
- Tailwind v4 for layout utilities, plain CSS for the design system
- `roughjs` and a seeded path generator for the hand-drawn surfaces
- D3 for the two data stories, charted client-side from a local CSV
- Caveat and Nunito, loaded as variable fonts

## Design system

`app/globals.css` holds the tokens and every component class. The palette is
cream and white as surfaces, with yellow, sky blue and forest green carrying
the accents. Forest green is also the ink, so the drawings and the text come
from the same colour.

### Hand-drawn surfaces

`app/lib/` has the geometry, and it is all deterministic:

- `prng.ts` — seeded RNG. Every wobble derives from a string seed, so the
  server and the client produce identical output and React never re-rolls a
  border on hydration.
- `hand.ts` — seeded geometry primitives (wobbly lines, smoothed paths,
  waves, stars, blobs).
- `frame.ts` — nine-slice borders. rough.js draws the slice once, CSS stretches
  it. The straight edge runs are drawn exactly straight, because CSS
  magnifies any wobble in the middle of a slice.
- `sketch.ts` — a thin adapter over rough.js's DOM-free `generator()` for
  static art.
- `app/components/draw/Doodles.tsx` — the illustration set: sparkles, suns,
  clouds, plants, telescopes, books, puzzles.

All of it renders on the server, so the site ships no JavaScript for its
decorations.

### Why the panel motion is on an inner element

Anything that promotes `.panel-card` to a compositing layer — an animated
`transform`, a `backdrop-filter` on a sibling — makes Chrome composite its
`border-image` interior from the GPU instead of repainting it, and the home
screen shows through the supposedly opaque panel. The entry animation lives on
`.panel-motion` inside the panel for that reason. Same reason the scrim has no
`backdrop-filter`.

## Layout

The home screen is a flex column pinned to the viewport: nav, hero, card row,
footer. A three-tier ladder of height media queries sheds the least useful row
first, so it fits without scrolling from 680x600 up to 2560x1440. Phones stack
and scroll, which is expected. Width alone is the wrong axis — a 1400x620
window is wide but barely taller than a phone in landscape.

## Panel routing

Navigation is client state, not routes, so the shell is not remounted and the
animation survives. The URL hash always reflects the open panel, and panels are
opened with `pushState` recording the panel in history state — that is what
lets the back button close a panel instead of leaving the site. Deep links like
`/#writing` open the matching panel on load.

## Content

Everything readable lives in `app/content/site.ts`. The writing panel and the
`/blog` index both read from it, so the two views cannot disagree.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build
./scripts/check.sh   # typecheck, build, and report weight per route
```

Weight is reported gzipped, which is what actually transfers. At the time of
writing the home screen is ~315 kB over the wire, of which 111 kB is the two
variable fonts and 190 kB is React.
