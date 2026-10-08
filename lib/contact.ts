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
    title: "Build & Research",
    blurb:
      "Let's try to replicate experiments, do prototyping, or create a MVP",
    tone: "c",
  },
  {
    id: "books",
    title: "Book Recommendations",
    blurb: "Tell me one or two books that you think I should read",
    tone: "c",
  },
];
