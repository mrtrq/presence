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
  { title: "Our Mathematical Universe", author: "Max Tegmark", status: "read"},
  { title: "Things to Make and Do in The 4th Dimension", author: "Matt Parker", status: "read"},
  { title: "Bumi Manusia", author: "Pramoedya Ananta Toer", status: "read"},
  { title: "Famous Five", author: "Enid Blyton", status: "read"},
  { title: "The Elegant Universe", author: "Brian Greene", status: "read"},
  { title: "The Adventures of Tintin", author: "Hergé", status: "read"},
  { title: "Project Hail Mary", author: "Andy Weir", status: "want" },
  { title: "Bird by Bird", author: "Anne Lamott ", status: "want" },
  { title: "The Beauty of Falling", author: "Claudia de Rham ", status: "want" },
];
