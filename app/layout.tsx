import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/bricolage-grotesque/latin-800.css";
import "@fontsource/newsreader/latin-400.css";
import "@fontsource/newsreader/latin-400-italic.css";
import "@fontsource/newsreader/latin-600.css";
import { Brand, Dock } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarreq",
  description:
    "Tarreq's essays, interests, and projects — software and questions about the universe.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: ["Muhammad Tarreq", "Tarreq Maulana"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Brand />
          <main className="stage">{children}</main>
          <Dock />
        </div>
      </body>
    </html>
  );
}
