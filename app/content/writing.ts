export type WritingFormat = "note" | "visual-story";

export type WritingEntry = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  format: WritingFormat;
  topics: string[];
  readingTime: number;
};

export const writingEntries: WritingEntry[] = [
  {
    slug: "on-making-useful-things",
    title: "A small note on making useful things",
    description:
      "Usefulness is less about making something impressive and more about paying attention to what makes another person's day lighter.",
    publishedAt: "2026-08-15",
    format: "note",
    topics: ["Practice", "Learning"],
    readingTime: 2,
  },
  {
    slug: "exoplanet-atlas",
    title: "What kind of exoplanets did we learn to see?",
    description:
      "NASA Exoplanet Archive data visualized with D3: discovery waves, detection methods, and an interactive map of planet radius against host-star temperature.",
    publishedAt: "2026-08-11",
    format: "visual-story",
    topics: ["Data visualization", "Astronomy", "D3.js"],
    readingTime: 8,
  },
  {
    slug: "exoplanet-kepler-story",
    title: "How Kepler changed our view of small worlds",
    description:
      "A data story about how Kepler turned small planets from rare detections into a measurable population.",
    publishedAt: "2026-08-11",
    format: "visual-story",
    topics: ["Data story", "Astronomy", "Science"],
    readingTime: 7,
  },
];

export const writingFormatLabels: Record<WritingFormat, string> = {
  note: "Note",
  "visual-story": "Visual story",
};

export function getWritingEntry(slug: string) {
  const entry = writingEntries.find((article) => article.slug === slug);

  if (!entry) {
    throw new Error(`Unknown writing entry: ${slug}`);
  }

  return entry;
}

export function getAdjacentWriting(slug: string) {
  const index = writingEntries.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? writingEntries[index - 1] : null,
    next: index >= 0 && index < writingEntries.length - 1 ? writingEntries[index + 1] : null,
  };
}

export function formatWritingDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
