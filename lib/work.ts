import type { Entry, Kind } from "./content";

export const workKinds: Kind[] = [
  { id: "build", label: "Work", tone: "y" },
  { id: "research", label: "Research", tone: "s" },
];

// Edit the words here; /work and /work/[slug] pick them up. Client names and
// screens stay out on purpose: this describes the work in words only.
export const work: Entry[] = [
  {
    slug: "audit-systems",
    title: "Audit Management Systems",
    kind: "build",
    meta: "Software engineer · BDO Indonesia",
    body: [
      "At BDO Indonesia I worked on audit management systems software for two different financial institutions, and they asked for opposite kinds of work.",
      "For the first client, I'm building one from the ground up: a Windows desktop application written in C# on .NET. It covers the audit process end to end, sends email notifications automatically, and produces the audit reports.",
      "For the second, the system already existed and people depended on it every day. It's written in plain Python, without a framework, with a TypeScript front end. My job is to keep it running and improve it without breaking what works, down to the database tables and stored procedures underneath.",
      "Building something new and keeping something alive teach different lessons. The first is about deciding what should exist. The second is about understanding why things already are the way they are.",
    ],
  },
  {
    slug: "thesis",
    title: "Estimating river water quality from Sentinel-2",
    kind: "research",
    meta: "Undergraduate thesis · Remote sensing",
    body: [
      "Checking a river's water quality usually means someone going to the river, taking a sample, and sending it to a lab. My thesis asked how much of that a satellite could estimate instead.",
      "I paired reflectance values from Sentinel-2 imagery with ground-truth measurements taken from actual rivers in Jakarta, published on the Satu Data Jakarta open-data portal. I trained models to estimate three parameters: total dissolved solids (TDS), total suspended solids (TSS), and dissolved oxygen (DO).",
      "I compared three families of models: linear models, decision-tree models, and neural networks. I also tested super-resolution (bicubic and SRCNN) and spectral-index features.",
      "XGBoost, a gradient-boosted tree model, gave the best estimates. Dissolved oxygen was the hardest to estimate: it is a chemical parameter, and its changes and amounts are not visible in the image.",
    ],
    link: {
      label: "View the thesis slides",
      href: "https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link",
      external: true,
    },
  },
];
