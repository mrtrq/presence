import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/bricolage-grotesque/latin-800.css";
import "@fontsource/newsreader/latin-400.css";
import "@fontsource/newsreader/latin-400-italic.css";
import "@fontsource/newsreader/latin-600.css";
import { Brand, Dock } from "@/components/Nav";
import { SpaceControls, themeScript } from "@/components/SpaceControls";
import { Starfield } from "@/components/Starfield";
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
    // data-theme is set by themeScript before paint, so React may find it there.
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Starfield />
        <div className="app">
          <header className="top">
            <Brand />
            <SpaceControls />
          </header>
          <main className="stage">{children}</main>
          <Dock />
        </div>
      </body>
    </html>
  );
}
