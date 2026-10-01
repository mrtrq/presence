export type Entry = {
  slug: string;
  title: string;
  meta: string;
  body: string[];
};

export const writing: Entry[] = [
  {
    slug: "notebook-for-physics-i-dont-understand",
    title: "Why I keep a notebook for physics I don't understand yet",
    meta: "Placeholder essay · 6 min",
    body: [
      "Placeholder: open with one concrete moment — the page you got stuck on, the equation you copied without following. Two sentences in, a visitor who stops reading should still leave with something.",
      "Placeholder: say what the notebook actually looks like, and what you do with an idea once you've half-understood it.",
      "Placeholder: close with what you'd like the reader to try, question, or read next.",
    ],
  },
  {
    slug: "what-finishing-a-small-project-taught-me",
    title: "What building a small project taught me about finishing",
    meta: "Placeholder essay · 4 min",
    body: [
      "Placeholder: tell the story of one project from first commit to the day you called it done.",
      "Placeholder: the part that almost made you quit, and what kept you going.",
    ],
  },
  {
    slug: "field-guide-to-learning-astrophysics",
    title: "A field guide to learning astrophysics on your own",
    meta: "Placeholder essay · 8 min",
    body: [
      "Placeholder: the books, lectures, and habits that worked, and the ones that didn't.",
      "Placeholder: one open question you're still chewing on.",
    ],
  },
];

export const interests: Entry[] = [
  {
    slug: "software",
    title: "Software",
    meta: "What I build, and why",
    body: [
      "Placeholder: what you like about making things with code, and two or three projects a curious stranger could open.",
    ],
  },
  {
    slug: "astrophysics",
    title: "Astrophysics",
    meta: "Learning the universe on my own",
    body: [
      "Placeholder: what pulled you in, what you're studying now, and one question you can't put down.",
    ],
  },
  {
    slug: "hobby-three",
    title: "[Hobby three]",
    meta: "Swap in something away from screens",
    body: [
      "Placeholder: a hobby your friends would recognise you by. Say what a good day of it looks like.",
    ],
  },
  {
    slug: "hobby-four",
    title: "[Hobby four]",
    meta: "Anything else worth sharing",
    body: ["Placeholder: a small obsession, a habit, a thing you collect."],
  },
];

export const about: Entry[] = [
  {
    slug: "short-version",
    title: "The short version",
    meta: "For anyone just arriving",
    body: [
      "Placeholder: three sentences on who you are, what you do, and what you care about.",
    ],
  },
  {
    slug: "for-friends",
    title: "For friends",
    meta: "What I've been up to",
    body: ["Placeholder: the casual update, in your own voice."],
  },
  {
    slug: "for-co-founders",
    title: "For co-founders",
    meta: "How I work",
    body: [
      "Placeholder: what you build, how you make decisions, and what kind of partner you look for.",
    ],
  },
  {
    slug: "for-professors",
    title: "For professors",
    meta: "Research interests",
    body: [
      "Placeholder: the questions you want to study, what you've read, and what you're asking for.",
    ],
  },
  {
    slug: "get-in-touch",
    title: "Get in touch",
    meta: "Email and links",
    body: [
      'Email: <a href="mailto:you@example.com">you@example.com</a> (placeholder)',
      'Code: <a href="https://github.com/mrtrq">github.com/mrtrq</a>',
    ],
  },
];

export const sections = { writing, interests, about } as const;
export type SectionKey = keyof typeof sections;
