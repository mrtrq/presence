import type { Metadata, Viewport } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";

/**
 * Two families, deliberately.
 *
 * `Caveat` carries the hand-drawn voice and is only ever used at large sizes
 * where its letterforms have room to breathe. `Nunito` handles every piece of
 * body copy and UI, because the site has to stay comfortable for a professor
 * reading a paragraph of prose as well as for a friend skimming a card.
 */

const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans-sw",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tarreq.dev"),
  title: {
    default: "Tarreq Maulana — designer, builder, astronomy enthusiast",
    template: "%s · Tarreq Maulana",
  },
  description:
    "Tarreq Maulana is a designer and builder at Fasilkom UI working on civic technology, satellite imagery, and student organisations. He writes about attention, refactoring, and the small worlds orbiting other stars.",
  keywords: [
    "Tarreq Maulana",
    "Muhammad Tarreq",
    "BEM Fasilkom UI",
    "remote sensing",
    "exoplanets",
    "civic technology",
    "design",
  ],
  openGraph: {
    type: "website",
    title: "Tarreq Maulana",
    description: "Designer, builder, astronomy enthusiast. Writing, work, and the things I love.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf8ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hand.variable} ${sans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
