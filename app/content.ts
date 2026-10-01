/**
 * CONTENT — the only file you need to edit to make this site yours.
 *
 * Every string, link, date and number on the site is defined below.
 * Placeholders are written to be plausible so the layout reads honestly;
 * replace them with your real details when ready.
 *
 * Tone guide for copy: plain sentences, first person, no hype words.
 * Specific beats impressive. "Reads satellite imagery to estimate river
 * clarity" lands harder than "passionate about earth science".
 */

import type { DoodleName } from "./components/Doodles";

/* ==========================================================================
   IDENTITY
   ========================================================================== */
export const identity = {
  name: "Your Name",
  /** Shown under the big name on the home page. */
  role: "Researcher, builder, and occasional writer",
  /** Two or three sentences. Who you are and what you spend your time on. */
  intro:
    "I work at the intersection of remote sensing and software, and I care about tools that make complicated things easier to understand. Most of what I make starts as a question I could not answer with what already existed.",
  /** Single line for the footer / meta description. */
  tagline: "Remote sensing, software, and writing about how both actually work.",
  location: "Based in Jakarta, Indonesia",
  availability: "Open to research collaborations and interesting problems",
  email: "you@example.com",
  links: [
    { label: "Email", href: "mailto:you@example.com", doodle: "mail" as DoodleName },
    { label: "GitHub", href: "https://github.com/yourhandle", doodle: "gear" as DoodleName },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", doodle: "globe" as DoodleName },
    { label: "Writing", href: "https://medium.com/@yourhandle", doodle: "pen" as DoodleName },
  ],
};

/* ==========================================================================
   HOME — the card deck
   Order here is the order on screen. `span` controls the mixed layout:
   "feature" is the big one, "half" and "third" fill the remaining grid.
   ========================================================================== */
export type DeckSpan = "feature" | "half" | "third" | "bar" | "skip";

export type DeckCard = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  doodle: DoodleName;
  tone: "sun" | "sky" | "forest";
  span: DeckSpan;
  /** Small label pinned to the card corner, e.g. "6 essays". */
  count?: string;
  /** Only used by the feature card: a short inline index of recent items. */
  index?: string[];
};

export const deck: DeckCard[] = [
  {
    href: "/writing",
    eyebrow: "Writing",
    title: "Essays on building things and thinking clearly",
    body: "Longer pieces on software, remote sensing, and the parts of learning that never make it onto a CV.",
    doodle: "pen",
    tone: "sky",
    span: "feature",
    count: "6 essays",
  },
  {
    href: "/work",
    eyebrow: "Work",
    title: "Research and products",
    body: "Thesis work, organisation leadership, and the small sites I ship on the side.",
    doodle: "satellite",
    tone: "forest",
    span: "half",
  },
  {
    href: "/interests",
    eyebrow: "Interests",
    title: "Off the clock",
    body: "Bicycle, film camera, bread, and a running habit of taking notes.",
    doodle: "bike",
    tone: "sun",
    span: "third",
  },
  {
    href: "/about",
    eyebrow: "About",
    title: "The longer version",
    body: "Background, working style, and how I ended up here.",
    doodle: "compass",
    tone: "forest",
    span: "third",
  },
  {
    href: "/now",
    eyebrow: "Now",
    title: "This month",
    body: "What I'm actually doing, rewritten often.",
    doodle: "clock",
    tone: "sky",
    span: "third",
  },
  {
    href: "/contact",
    eyebrow: "Contact",
    title: "Say hello",
    body: "Research, collaboration, or just to point out a typo.",
    doodle: "envelope",
    tone: "sun",
    span: "bar",
  },
];

/* ==========================================================================
   WRITING
   Set `featured: true` on exactly one entry to pin it to the top.
   ========================================================================== */
export type Post = {
  slug: string;
  title: string;
  /** One or two sentences. This is what people read before deciding to open. */
  excerpt: string;
  /** Human readable, e.g. "12 Mar 2026". */
  date: string;
  /** Sort key — YYYY-MM-DD. Must be a plain string so it sorts correctly. */
  iso: string;
  readTime: string;
  category: "Essay" | "Field note" | "Build log";
  href?: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "reading-a-river-through-satellites",
    title: "Reading a river through satellites",
    excerpt:
      "Sentinel-2 gives you sixteen bands and a river. Turning that into a number you can act on takes considerably more care than the tutorial suggests.",
    date: "14 Mar 2026",
    iso: "2026-03-14",
    readTime: "9 min",
    category: "Field note",
    featured: true,
  },
  {
    slug: "refactoring-is-thinking",
    title: "Refactoring is a way of thinking, not a chore",
    excerpt:
      "The interesting part of restructuring code is rarely the restructuring. It is the argument you have with yourself about what the thing was actually for.",
    date: "02 Feb 2026",
    iso: "2026-02-02",
    readTime: "7 min",
    category: "Essay",
  },
  {
    slug: "operating-at-full-power",
    title: "Operating at full power",
    excerpt:
      "Capacity is not a mood. It is a set of small conditions you either build or keep hoping for.",
    date: "18 Jan 2026",
    iso: "2026-01-18",
    readTime: "6 min",
    category: "Essay",
  },
  {
    slug: "a-pipeline-i-had-to-rebuild",
    title: "A pipeline I had to rebuild twice",
    excerpt:
      "What a super-resolution baseline taught me about the difference between measuring something and measuring the right thing.",
    date: "09 Dec 2025",
    iso: "2025-12-09",
    readTime: "11 min",
    category: "Build log",
  },
  {
    slug: "notes-on-pitching-a-goal",
    title: "Notes on pitching a goal",
    excerpt:
      "Framing an objective as an argument, rather than a wish, tends to expose the parts you had not actually decided yet.",
    date: "21 Oct 2025",
    iso: "2025-10-21",
    readTime: "5 min",
    category: "Essay",
  },
  {
    slug: "what-market-research-actually-is",
    title: "What market research actually is",
    excerpt:
      "Synthesis from a guest lecture. Mostly about the gap between what a survey says and what a decision requires.",
    date: "03 Sep 2025",
    iso: "2025-09-03",
    readTime: "8 min",
    category: "Field note",
  },
];

/* ==========================================================================
   WORK
   ========================================================================== */
export type Project = {
  title: string;
  kind: string;
  /** Year or date range, right-aligned on the card. */
  period: string;
  summary: string;
  /** Bullet points. Keep to two or three. */
  points: string[];
  href?: string;
  hrefLabel?: string;
  doodle: DoodleName;
  tone: "sun" | "sky" | "forest";
  /** Featured projects take a wider card. Mark one or two. */
  wide?: boolean;
};

export const projects: Project[] = [
  {
    title: "Surface water quality from Sentinel-2",
    kind: "Thesis research",
    period: "2025 — 2026",
    summary:
      "A multi-scenario pipeline that compares super-resolution baselines and spectral-index feature sets to predict turbidity, dissolved solids, and dissolved oxygen across Jakarta's rivers from open satellite imagery.",
    points: [
      "Compares bicubic interpolation against learned super-resolution before any downstream modelling",
      "Treats seasonal and rainfall-driven turbidity swings as a first-class case, not an outlier",
      "Built so a reviewer can re-run any single scenario without reading the whole pipeline",
    ],
    href: "#",
    hrefLabel: "Read the write-up",
    doodle: "wave",
    tone: "sky",
    wide: true,
  },
  {
    title: "Student organisation leadership",
    kind: "Organisation",
    period: "2024 — 2026",
    summary:
      "Student government work focused on the unglamorous parts: how programmes get funded, who maintains them, and why the same three things keep breaking every year.",
    points: [
      "Ran a wellbeing programme that outlived the people who started it",
      "Wrote the handover docs nobody asked for, so it kept running after handover",
      "Learned that most institutional problems are documentation problems wearing a costume",
    ],
    href: "#",
    hrefLabel: "See the proposal deck",
    doodle: "sprout",
    tone: "forest",
  },
  {
    title: "Nitip Doa",
    kind: "Side project",
    period: "2024",
    summary:
      "A small place to leave a prayer for someone else to read. Built because I wanted a reason to visit a mosque that was not on a weekend.",
    points: [
      "Small enough to ship in a weekend, and it did",
      "Modelled the reading queue as a queue, which made moderation tractable",
    ],
    href: "#",
    hrefLabel: "Visit the site",
    doodle: "envelope",
    tone: "sun",
  },
  {
    title: "Bali Blueprint",
    kind: "Client site",
    period: "2025",
    summary:
      "Portfolio site for an architecture studio. Every drawing is heavy; the site is not. I rebuilt it to load images without making anyone wait.",
    points: [
      "Cut initial payload by deferring the full image set until requested",
      "Kept the typographic voice the studio already had, and only fixed the loading",
    ],
    href: "#",
    hrefLabel: "Visit the site",
    doodle: "mountain",
    tone: "forest",
  },
  {
    title: "Imakata Library",
    kind: "Community tool",
    period: "2025",
    summary:
      "A searchable index of the books in a campus library nobody had a catalogue for. Mostly a data problem wearing a website costume.",
    points: [
      "Turned an inconsistent spreadsheet into a stable schema, then a search index",
      "Now used enough that someone else maintains it",
    ],
    href: "#",
    hrefLabel: "Visit the site",
    doodle: "book",
    tone: "sky",
  },
];

/* ==========================================================================
   INTERESTS
   Keep four to six. Each gets a card, a paragraph, and a doodle.
   ========================================================================== */
export type Interest = {
  title: string;
  body: string;
  /** A single line that makes it concrete. Shown under the paragraph. */
  detail: string;
  doodle: DoodleName;
  tone: "sun" | "sky" | "forest";
};

export const interests: Interest[] = [
  {
    title: "Cycling around the city",
    body: "Riding is the only part of my week with a built-in stopping problem. Jakarta's bike lanes are inconsistent, which has turned route planning into a small cartography hobby. I keep notes on which streets are actually usable and when the traffic calms down.",
    detail: "Longest ride so far: 62 km, and I still had energy for the last ten.",
    doodle: "bike",
    tone: "sun",
  },
  {
    title: "Film photography",
    body: "I shoot on a thirty-year-old rangefinder and develop at home. The constraint is the point: twelve frames at a time, no preview screen, and a real reason to slow down. Most of what I keep is ordinary, which is a relief.",
    detail: "Currently working through a roll of Portra from 2019.",
    doodle: "camera",
    tone: "sky",
  },
  {
    title: "Baking bread",
    body: "Sourdough, mostly, because the schedule is imposed by the starter and I cannot argue with it. Fermentation taught me more about patience and measurement than any lab class: the same recipe produces a different loaf depending on the room's temperature.",
    detail: "Roughly one loaf a week. The kitchen is a war zone on Saturday mornings.",
    doodle: "coffee",
    tone: "forest",
  },
  {
    title: "Reading with a pencil",
    body: "Paper books, annotated heavily, then typed up into notes. I keep the notes in plain text and re-read them yearly. Most of my actual thinking happens between the lines rather than in the highlights.",
    detail: "About forty books this year. Roughly half finished, which I have decided is fine.",
    doodle: "book",
    tone: "sky",
  },
  {
    title: "Maps, and the data under them",
    body: "I am happiest with a shapefile and a free afternoon. Contour lines, satellite tiles, catchments, coastline. It is the same instinct as the research, pointed somewhere with no deadline attached.",
    detail: "Currently tracing the upstream extent of the Ciliwung catchment for no reason in particular.",
    doodle: "compass",
    tone: "forest",
  },
  {
    title: "Mechanical keyboards",
    body: "A small, unnecessary expertise. I built my first split keyboard over a long weekend and have been adjusting it ever since. It is not a productivity tool; it is a thing I get to take apart.",
    detail: "Four boards. Two of them currently in pieces.",
    doodle: "gear",
    tone: "sun",
  },
];

/* ==========================================================================
   ABOUT
   ========================================================================== */
export const about = {
  heading: "The longer version",
  lede: "I study computer science, work on geospatial machine learning, and spend an unreasonable amount of time making small things properly.",
  /** Paragraphs. Two or three reads best. */
  body: [
    "I got here sideways. I did not plan to work on water quality or satellite imagery; I planned to build things for people I already knew, which turned out to be the more useful instinct. What stayed constant is a preference for problems where the answer is genuinely checkable — a number that is either right or not, a page that is either fast or not.",
    "Most of my work sits where remote sensing meets software engineering: pulling clean signal out of noisy public imagery, and being honest about how much of the signal is real. That has made me a careful evaluator of my own results, which is the habit I would keep if I had to drop everything else.",
    "Alongside the research I keep student organisation work, a couple of small websites, and a habit of writing things down. I care about the people who will maintain a thing after I am done with it, which changes almost every decision I make about scope.",
  ],
  /** Small factual blocks. Two or three is plenty. */
  facts: [
    { label: "Focus", value: "Geospatial ML" },
    { label: "Degree", value: "B.S. Computer Science" },
    { label: "Based in", value: "Jakarta" },
  ],
  /** How you work. Short, concrete, no adjectives. */
  workingStyle: [
    "I would rather ship something small that actually runs than a plan for something large.",
    "I keep written notes on everything, including things I was sure about the first time.",
    "I ask a lot of questions early, which can read as slow and is usually cheaper.",
  ],
};

export const now = {
  heading: "What I'm doing this month",
  lede: "A page I rewrite often so the answer stays honest. It is deliberately short.",
  updated: "March 2026",
  items: [
    {
      label: "Building",
      body: "Finishing the thesis pipeline and cleaning up the evaluation harness so the results are reproducible without me in the room.",
      doodle: "satellite" as DoodleName,
    },
    {
      label: "Learning",
      body: "Working through a proper course on time series forecasting, because the water-quality series keep defeating the methods I know.",
      doodle: "chart" as DoodleName,
    },
    {
      label: "Otherwise",
      body: "Two loaves a week, more film than I can develop, and a slow attempt to ride further than last month.",
      doodle: "bike" as DoodleName,
    },
  ],
};

export const contact = {
  heading: "Say hello",
  lede: "I read everything. I reply to most of it, usually within a few days.",
  /** Adjust the framing to match what you actually want from people. */
  reasons: [
    "Research on water quality, remote sensing, or geospatial ML",
    "Collaboration on a student organisation or a community project",
    "A question about something I wrote, or a correction to it",
  ],
};
