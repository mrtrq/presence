import type { Metadata } from "next";
import { Bookshelf } from "@/components/Bookshelf";
import { books } from "@/lib/books";

export const metadata: Metadata = {
  title: "Books · Tarreq",
  description: "Tarreq's bookshelf: books read, and books waiting to be read.",
};

export default function BooksPage() {
  return <Bookshelf books={books} />;
}
