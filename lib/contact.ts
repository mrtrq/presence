export type Topic = {
  id: string;
  title: string;
  blurb: string;
  /** Pre-filled into the subject line of the email this card opens. */
  subject: string;
  tone: "y" | "s" | "c";
};

// One card per reason to write. Edit the words here; the Contact page picks
// them up. Two or three cards fit without scrolling.
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
    id: "books",
    title: "Swap book notes",
    blurb: "Tell me what you're reading, or what I should read next.",
    subject: "A book recommendation",
    tone: "c",
  },
];
