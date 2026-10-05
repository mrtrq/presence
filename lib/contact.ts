export type Topic = {
  id: string;
  title: string;
  blurb: string;
  /** Pre-filled into the subject line of the email this card opens. */
  subject: string;
  tone: "y" | "s" | "c";
};

// One card per reason to write. Edit the words here; the Contact page picks
// them up. Keep the list to three so the page fits without scrolling.
export const topics: Topic[] = [
  {
    id: "build",
    title: "Build something",
    blurb:
      "Software and digital products: a rough idea, a prototype, or a team that needs another builder.",
    subject: "Building something together",
    tone: "y",
  },
  {
    id: "sky",
    title: "Study the sky",
    blurb:
      "Exoplanets, remote sensing, and the data behind them. Questions, papers, and possible projects.",
    subject: "Exoplanets and remote sensing",
    tone: "s",
  },
  {
    id: "books",
    title: "Swap book notes",
    blurb: "Tell me what you're reading, or what I should read next.",
    subject: "A book recommendation",
    tone: "c",
  },
];
