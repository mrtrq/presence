export type Topic = {
  id: string;
  title: string;
  blurb: string;
  tone: "y" | "s" | "c";
};

// One card per reason to write (shown as information, not buttons). Edit the words here; the Contact page picks
// them up. Two or three cards fit without scrolling.
export const topics: Topic[] = [
  {
    id: "build",
    title: "Build something",
    blurb:
      "Software and digital products: a rough idea, a prototype, or a team that needs another builder.",
    tone: "y",
  },
  {
    id: "books",
    title: "Swap book notes",
    blurb: "Tell me what you're reading, or what I should read next.",
    tone: "c",
  },
];
