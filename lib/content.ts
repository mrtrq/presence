export type EntryLink = {
  label: string;
  href: string;
  /** Opens in a new tab. Leave unset for pages inside this site. */
  external?: boolean;
};

export type EntryImage = {
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
};

/** Card colors in the list: y = yellow, s = sky, p = paper (white). */
export type Tone = "y" | "s" | "p";

/** What a card's color means. Every entry belongs to exactly one kind. */
export type Kind = {
  id: string;
  label: string;
  tone: Tone;
};

export type Entry = {
  slug: string;
  title: string;
  /** Id of one of the section's kinds. */
  kind: string;
  meta: string;
  body: string[];
  link?: EntryLink;
  images?: EntryImage[];
};

export const profile = {
  name: "Muhammad Tarreq",
  email: "tarreq.maulana@gmail.com",
  github: "https://github.com/mrtrq",
  medium: "https://medium.com/@tarreq.maulana",
} as const;

export const writingKinds: Kind[] = [
  { id: "story", label: "Data story", tone: "s" },
  { id: "essay", label: "Essay or notes", tone: "y" },
];

export const interestKinds: Kind[] = [
  { id: "build", label: "Build", tone: "y" },
  { id: "research", label: "Research & learning", tone: "s" },
  { id: "community", label: "Community", tone: "p" },
];

export const writing: Entry[] = [
  {
    slug: "exoplanet-atlas",
    title: "What kind of exoplanets did we learn to see?",
    kind: "story",
    meta: "Interactive data story · D3.js",
    body: [
      "NASA Exoplanet Archive data visualized with D3: discovery waves, detection methods, and an interactive map of planet radius against host-star temperature.",
      "The question is simple: as our instruments changed, did the planets we found change too?",
    ],
    link: { label: "Open the story", href: "/blog/exoplanet-atlas" },
  },
  {
    slug: "exoplanet-kepler-story",
    title: "How Kepler changed our view of small worlds",
    kind: "story",
    meta: "Interactive data story · D3.js",
    body: [
      "A data story on how Kepler turned small planets from rare detections into a measurable population, with era comparisons, method mix, and radius-band visualizations.",
    ],
    link: { label: "Open the story", href: "/blog/exoplanet-kepler-story" },
  },
  {
    slug: "live-your-life-at-full-power",
    title: "Live your life at full power",
    kind: "essay",
    meta: "Essay · on Medium",
    body: [
      "On operating at full capacity: not just in work, but in presence, attention, and the everyday moments that compound into a life.",
    ],
    link: {
      label: "Read on Medium",
      href: "https://medium.com/@tarreq.maulana/live-your-life-at-full-power-c9c55bd51a42",
      external: true,
    },
  },
  {
    slug: "refactor-a-forge-to-the-structure",
    title: "Refactor: a forge to the structure",
    kind: "essay",
    meta: "Essay · on Medium",
    body: [
      "What the discipline of code refactoring teaches about confronting complexity, and why restructuring what already exists is often the most creative act.",
    ],
    link: {
      label: "Read on Medium",
      href: "https://medium.com/@tarreq.maulana/refactor-a-forge-to-the-structure-4b5911753f43",
      external: true,
    },
  },
  {
    slug: "market-research-guest-lecture",
    title: "Market research guest lecture",
    kind: "essay",
    meta: "Notes · on Medium",
    body: [
      "Notes and synthesis from a guest lecture on how market research actually operates: beyond surveys and into the architecture of real decisions.",
    ],
    link: {
      label: "Read on Medium",
      href: "https://medium.com/@tarreq.maulana/market-research-guest-lecture-836a52c66510",
      external: true,
    },
  },
  {
    slug: "achieving-goals-through-pitch",
    title: "Achieving goals through pitch",
    kind: "essay",
    meta: "Essay · on Medium",
    body: [
      "How framing a goal as a pitch, to yourself and to others, sharpens both the objective and the path toward it.",
    ],
    link: {
      label: "Read on Medium",
      href: "https://medium.com/@tarreq.maulana/achieving-goals-through-pitch-846bf774cdc7",
      external: true,
    },
  },
];

export const interests: Entry[] = [
  {
    slug: "software",
    title: "Software & digital products",
    kind: "build",
    meta: "What I build, and why",
    body: [
      "I find fulfillment in making someone&rsquo;s day easier and better. Sometimes that happens through products and technology, and a few of those are live on the internet:",
      '<a href="https://nitipdoa.com/" target="_blank" rel="noreferrer">Nitip Doa</a>: send your du&rsquo;a, and someone will read it at Mecca or Medina.',
      '<a href="https://bali-blueprint.com/" target="_blank" rel="noreferrer">Bali Blueprint</a>: a portfolio site for an architecture studio.',
      '<a href="https://imakata.netlify.app/" target="_blank" rel="noreferrer">Imakata Library</a>: a browsable list of the books available at Imakata Library.',
      'The rest of my code lives on <a href="https://github.com/mrtrq" target="_blank" rel="noreferrer">GitHub</a>.',
    ],
    images: [
      {
        src: "/nitipdoa.png",
        alt: "Screenshot of the Nitip Doa website",
        href: "https://nitipdoa.com/",
        width: 1300,
        height: 1172,
      },
      {
        src: "/bali-blueprint.jpeg",
        alt: "Screenshot of the Bali Blueprint website",
        href: "https://bali-blueprint.com/",
        width: 2880,
        height: 1482,
      },
      {
        src: "/imakata.jpg",
        alt: "Screenshot of the Imakata Library website",
        href: "https://imakata.netlify.app/",
        width: 2856,
        height: 1626,
      },
    ],
  },
  {
    slug: "remote-sensing",
    title: "Remote sensing",
    kind: "research",
    meta: "Thesis research",
    body: [
      "My thesis is a multi-scenario pipeline that compares super-resolution methods (bicubic, SRCNN) and feature sets built from spectral indices to predict water quality parameters (TSS, TDS, and DO) from Sentinel-2 imagery over Jakarta&rsquo;s rivers.",
      "It is the kind of work that has taught me to listen carefully and to turn uncertainties into probabilities.",
    ],
    link: {
      label: "View the thesis slides",
      href: "https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link",
      external: true,
    },
  },
  {
    slug: "student-organizations",
    title: "Student-led organizations",
    kind: "community",
    meta: "BEM Fasilkom UI",
    body: [
      "Often, making someone&rsquo;s day easier happens through communities. At BEM Fasilkom UI the work was student governance and advocacy: extending wellbeing systems, collaborative infrastructure, and campus life that works for everyone.",
    ],
    link: {
      label: "View the grand design",
      href: "https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing",
      external: true,
    },
  },
  {
    slug: "astronomy",
    title: "Astronomy",
    kind: "research",
    meta: "Learning the universe from public data",
    body: [
      "I explore stars, exoplanets, gas giants, and related systems through reliable public astronomy resources and datasets. So far that has become two data stories on the NASA Exoplanet Archive: <a href=\"/blog/exoplanet-atlas\">what kinds of exoplanets we learned to see</a>, and <a href=\"/blog/exoplanet-kepler-story\">how Kepler changed our view of small worlds</a>.",
      "Next on the list: using <code>lightkurve</code> to retrieve flux data from space telescope observations, and writing an approachable explanation of what flux reveals about stars and exoplanets.",
    ],
  },
];

export const sections = { writing, interests } as const;
export type SectionKey = keyof typeof sections;
