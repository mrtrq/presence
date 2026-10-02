/**
 * The bookshelf. Add a book by adding one line; nothing else needs to change.
 *
 *   status  "read" goes on the top shelf, "want" on the to-read shelf
 *   year    the year you finished it (read books only, optional)
 *   note    one short line at most; this is a shelf, not a review
 *   link    optional page for the book (Goodreads, publisher, ...)
 *
 * Spine height, thickness and color are worked out from the title, so the
 * shelf looks hand-stacked without any extra fields.
 *
 * TODO(Tarreq): the books below are PLACEHOLDERS to show the layout.
 * Replace them with your own before this ships.
 */
export type Book = {
  title: string;
  author: string;
  status: "read" | "want";
  year?: number;
  note?: string;
  link?: string;
};

export const books: Book[] = [
  { title: "Cosmos", author: "Carl Sagan", status: "read", year: 2024 },
  { title: "Pale Blue Dot", author: "Carl Sagan", status: "read", year: 2024 },
  { title: "Atomic Habits", author: "James Clear", status: "read", year: 2023 },
  { title: "Deep Work", author: "Cal Newport", status: "read", year: 2023 },
  { title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt", status: "read", year: 2022 },
  { title: "Sapiens", author: "Yuval Noah Harari", status: "read", year: 2022 },
  { title: "Clean Code", author: "Robert C. Martin", status: "read", year: 2021 },
  { title: "Bumi Manusia", author: "Pramoedya Ananta Toer", status: "read", year: 2021 },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "want" },
  { title: "A Brief History of Time", author: "Stephen Hawking", status: "want" },
  { title: "The Design of Everyday Things", author: "Don Norman", status: "want" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", status: "want" },
  { title: "Project Hail Mary", author: "Andy Weir", status: "want" },
];
