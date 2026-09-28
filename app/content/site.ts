/**
 * Site content.
 *
 * One typed source of truth for everything a visitor can read. Keeping copy out
 * of components means the panels, the home cards, and any future route all stay
 * in agreement, and it makes drafting the tone in one place far easier.
 */

export type Palette = "sun" | "sky" | "sprout" | "forest";

/* -------------------------------------------------------------------------- */
/* Identity                                                                     */
/* -------------------------------------------------------------------------- */

export const identity = {
  firstName: "Tarreq",
  fullName: "Tarreq Maulana",
  legalName: "Muhammad Tarreq Maulana",
  role: "Designer & builder",
  location: "Jakarta, Indonesia",
  email: "tarreq.maulana@gmail.com",
  tagline: "I make things that make other people's day a little easier.",
} as const;

export const links = {
  github: "https://github.com/mrtrq",
  medium: "https://medium.com/@tarreq.maulana",
  linkedin: "https://www.linkedin.com/in/tarreq-maulana/",
  email: `mailto:${identity.email}`,
} as const;

/* -------------------------------------------------------------------------- */
/* About                                                                        */
/* -------------------------------------------------------------------------- */

export const about = {
  headline: "A few things I believe",
  intro: [
    "I find a lot of meaning in making someone's day easier. Sometimes that is a piece of software that removes a task nobody wanted. Often it is a community, a policy, or a piece of student infrastructure that makes a place feel like it belongs to the people in it.",
    "Most of my work sits at the junction of design and infrastructure: figuring out what a thing should be before deciding how to build it. I care about interfaces that feel obvious, and about the unglamorous systems that keep a place running.",
    "Outside of that, I am happiest somewhere near a telescope, a terminal, or a pot of coffee that has gone slightly cold because I lost track of time.",
  ],
  beliefs: [
    {
      title: "Clarity is a kindness",
      body: "Most confusion in software and in institutions comes from things that were never explained. Explaining well is design work.",
      tone: "sun" as Palette,
    },
    {
      title: "Start with the person",
      body: "A feature is a means. Before anything gets built, the question is who is having a worse day because this does not exist yet.",
      tone: "sky" as Palette,
    },
    {
      title: "Restructure before adding",
      body: "Most of the real gains in a system come from removing and reorganising, not from stacking something new on top.",
      tone: "sprout" as Palette,
    },
  ],
  facts: [
    { label: "Based in", value: identity.location },
    { label: "Studying", value: "Information Systems, Fasilkom UI" },
    { label: "Working on", value: "Remote sensing & civic technology" },
    { label: "Writing at", value: "Medium, occasionally" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Work                                                                         */
/* -------------------------------------------------------------------------- */

export type Work = {
  id: string;
  topic: string;
  title: string;
  summary: string;
  detail: string;
  year: string;
  href?: string;
  hrefLabel?: string;
  tone: Palette;
  doodle: "telescope" | "sprout" | "puzzle" | "grid";
  tags: string[];
};

export const research: Work[] = [
  {
    id: "remote-sensing",
    topic: "Thesis research",
    title: "Water quality from orbit",
    summary:
      "Predicting TSS, TDS, and dissolved oxygen in Jakarta's rivers from Sentinel-2 imagery.",
    detail:
      "A multi-scenario pipeline comparing super-resolution methods (bicubic, SRCNN) against feature sets drawn from spectral indices, to see how much of a river's water quality is legible from a satellite that never gets wet. The interesting part is not the prediction score but the gap between what a model can claim and what a river actually is.",
    year: "2025",
    href: "https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link",
    hrefLabel: "View slides",
    tone: "sky",
    doodle: "telescope",
    tags: ["Remote sensing", "Sentinel-2", "Python", "Water quality"],
  },
  {
    id: "exoplanet-work",
    topic: "Self-directed",
    title: "Exoplanet data stories",
    summary:
      "Two interactive write-ups built on the NASA Exoplanet Archive, drawn with D3.",
    detail:
      "Both pieces treat the archive as a story about instruments rather than a list of planets. One follows how the confirmed sample changed as detection methods improved; the other follows how Kepler moved small worlds from rarity to baseline.",
    year: "2025",
    href: "/blog",
    hrefLabel: "Read the stories",
    tone: "forest",
    doodle: "grid",
    tags: ["D3.js", "Data viz", "Astronomy"],
  },
];

export const community: Work[] = [
  {
    id: "bem-fasilkom",
    topic: "Student organisation",
    title: "BEM Fasilkom UI",
    summary:
      "Student governance and advocacy for the Faculty of Computer Science at UI.",
    detail:
      "Governance is mostly invisible when it works. My work has been wellbeing systems, collaborative infrastructure between student bodies, and pushing for campus life that does not quietly assume you have a car, a spare hour, or a large social circle.",
    year: "2024 —",
    href: "https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing",
    hrefLabel: "View deck",
    tone: "sprout",
    doodle: "sprout",
    tags: ["Organising", "Policy", "Community"],
  },
];

export const built: Work[] = [
  {
    id: "nitip-doa",
    topic: "Website",
    title: "Nitip Doa",
    summary: "Send a du'a, and have someone read it at Mecca or Medina.",
    detail:
      "A small, deliberately gentle product. The whole flow is one field and one promise, which is harder to design than a complicated interface because there is nowhere to hide.",
    year: "2025",
    href: "https://nitipdoa.com/",
    hrefLabel: "Visit site",
    tone: "sun",
    doodle: "puzzle",
    tags: ["Product", "Web"],
  },
  {
    id: "bali-blueprint",
    topic: "Website",
    title: "Bali Blueprint",
    summary: "Portfolio site for an architecture studio.",
    detail: "A studio portfolio that lets the work be the interface.",
    year: "2025",
    href: "https://bali-blueprint.com/",
    hrefLabel: "Visit site",
    tone: "sky",
    doodle: "grid",
    tags: ["Design", "Web"],
  },
  {
    id: "imakata",
    topic: "Website",
    title: "Imakata Library",
    summary: "A browsable list of the books at Imakata Library.",
    detail:
      "A small utility born from a real annoyance: not knowing what a library actually had. The interesting design question was how to make a list feel navigable.",
    year: "2025",
    href: "https://imakata.netlify.app/",
    hrefLabel: "Visit site",
    tone: "sprout",
    doodle: "puzzle",
    tags: ["Utility", "Web"],
  },
];

/* -------------------------------------------------------------------------- */
/* Writing                                                                      */
/* -------------------------------------------------------------------------- */

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  meta: string;
  readTime: string;
  tag: "Essay" | "Data story" | "Notes";
  tone: Palette;
  internal?: boolean;
};

export const featuredPost: Post = {
  id: "full-power",
  title: "Live Your Life at Full Power",
  excerpt:
    "On operating at full capacity — not just in work, but in presence, attention, and the everyday moments that compound into a life. A short argument for treating attention as a finite resource rather than a mood.",
  href: "https://medium.com/@tarreq.maulana/live-your-life-at-full-power-c9c55bd51a42",
  meta: "Essay",
  readTime: "6 min",
  tag: "Essay",
  tone: "sun",
};

export const posts: Post[] = [
  {
    id: "kepler",
    title: "How Kepler Changed Our View of Small Worlds",
    excerpt:
      "Before 2009 the catalog was shaped by what instruments could most easily notice: giants, close in. Kepler changed the question, and small planets stopped looking exceptional.",
    href: "/blog/exoplanet-kepler-story",
    meta: "Data story",
    readTime: "9 min",
    tag: "Data story",
    tone: "sky",
    internal: true,
  },
  {
    id: "refactor",
    title: "Refactor: A Forge to the Structure",
    excerpt:
      "What the discipline of code refactoring teaches about confronting complexity — and why restructuring what already exists is often the most creative act available.",
    href: "https://medium.com/@tarreq.maulana/refactor-a-forge-to-the-structure-4b5911753f43",
    meta: "Essay",
    readTime: "7 min",
    tag: "Essay",
    tone: "sprout",
  },
  {
    id: "atlas",
    title: "What Kind of Exoplanets Did We Learn to See?",
    excerpt:
      "NASA Exoplanet Archive data in D3: discovery waves, detection methods, and planet radius against host-star temperature. The same sky, drawn differently by each tool.",
    href: "/blog/exoplanet-atlas",
    meta: "Data story",
    readTime: "8 min",
    tag: "Data story",
    tone: "forest",
    internal: true,
  },
  {
    id: "market-research",
    title: "Market Research Guest Lecture",
    excerpt:
      "Notes and synthesis from a guest lecture on how market research actually operates — beyond surveys and into the architecture of real decisions.",
    href: "https://medium.com/@tarreq.maulana/market-research-guest-lecture-836a52c66510",
    meta: "Notes",
    readTime: "4 min",
    tag: "Notes",
    tone: "sky",
  },
  {
    id: "pitch",
    title: "Achieving Goals through Pitch",
    excerpt:
      "How framing a goal as a pitch — to yourself and to others — sharpens both the objective and the path toward it.",
    href: "https://medium.com/@tarreq.maulana/achieving-goals-through-pitch-846bf774cdc7",
    meta: "Essay",
    readTime: "5 min",
    tag: "Essay",
    tone: "sun",
  },
];

export const writingIntro =
  "I write to think. Most of these started as notes to myself and got less private once they seemed useful to someone else. The longer pieces lean on data; the short ones rarely do.";

/* -------------------------------------------------------------------------- */
/* Hobbies and interests                                                        */
/* -------------------------------------------------------------------------- */

export type Hobby = {
  id: string;
  title: string;
  body: string;
  tone: Palette;
  doodle: "telescope" | "book" | "puzzle" | "grid" | "sprout";
  meta: string;
};

export const hobbiesIntro =
  "The parts of my life that have nothing to do with a deadline. I have kept this list short on purpose, because a short list is still true six months later.";

export const hobbies: Hobby[] = [
  {
    id: "astronomy",
    title: "Small worlds, far away",
    body:
      "Exoplanets started as a data-visualisation problem and became an obsession. I like reading about how detection methods change what a catalogue is able to contain, and I keep a private list of things I want to build next: light curves from `lightkurve`, a proper explainer of flux, interactive stellar maps.",
    tone: "sky",
    doodle: "telescope",
    meta: "Ongoing",
  },
  {
    id: "books",
    title: "Reading in parallel",
    body:
      "Three or four books at once, which I understand to be an unsophisticated way of avoiding commitment to any single one. I keep a list of what is at the Imakata Library, and I am slowly working through it.",
    tone: "sun",
    doodle: "book",
    meta: "Constant",
  },
  {
    id: "puzzles",
    title: "Puzzles and small games",
    body:
      "Sudoku, trivia, word games, the lot. I like problems with exactly one right answer that I am wrong about today and right about tomorrow. It is the closest thing to a clean unit test that my hobbies manage.",
    tone: "sprout",
    doodle: "puzzle",
    meta: "Weekends",
  },
  {
    id: "making",
    title: "Tidying up small systems",
    body:
      "Rearranging shelves, rewriting a script that did not need to exist, restyling something nobody asked me to restyle. Refactoring applied to a room, a filing system, or a weekend. It is the same itch as `refactor`, pointed at other things.",
    tone: "forest",
    doodle: "grid",
    meta: "Whenever",
  },
  {
    id: "plants",
    title: "Keeping plants alive",
    body:
      "Lower expectations than I had going in, but the current streak is long enough to be interesting. Watering on Sundays has become the most reliable habit in my week, which I choose to read as encouraging.",
    tone: "sprout",
    doodle: "sprout",
    meta: "Sundays",
  },
  {
    id: "coffee",
    title: "Coffee, and going slightly cold",
    body:
      "Brewing on a small scale, and then getting distracted by whatever is on the second monitor. The cup goes cold. I drink it anyway and regret nothing.",
    tone: "sun",
    doodle: "book",
    meta: "Daily",
  },
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                      */
/* -------------------------------------------------------------------------- */

export const contactIntro =
  "I am glad to hear from anyone. Collaborations, questions about a project, a good book recommendation, or a complaint about something I built — all of it lands.";

export const socials = [
  { label: "Email", href: links.email, value: identity.email },
  { label: "GitHub", href: links.github, value: "github.com/mrtrq" },
  { label: "Medium", href: links.medium, value: "medium.com/@tarreq.maulana" },
  { label: "LinkedIn", href: links.linkedin, value: "in/tarreq-maulana" },
] as const;
