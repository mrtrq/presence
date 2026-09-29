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

/**
 * Both families are loaded as variable fonts.
 *
 * This is a weight decision, not a stylistic one. Listing discrete weights
 * makes next/font emit one file per weight, and Caveat at three weights plus
 * Nunito at four came to 111 kB before compression — the largest single asset
 * on the home screen. `weight: "variable"` fetches one file per family
 * covering the whole range the site uses.
 */
const hand = Caveat({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-hand",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  weight: "variable",
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
