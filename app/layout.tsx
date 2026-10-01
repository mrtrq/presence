import type { Metadata, Viewport } from "next";
import { Fraunces, Karla } from "next/font/google";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { identity } from "./content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${identity.name} — ${identity.role}`,
    template: `%s · ${identity.name}`,
  },
  description: identity.tagline,
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description: identity.tagline,
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#fbf4e4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
