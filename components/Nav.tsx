"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Planet } from "./Doodles";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/books", label: "Books" },
  { href: "/contact", label: "Contact" },
];

function sectionOf(pathname: string) {
  const first = "/" + (pathname.split("/")[1] ?? "");
  return first === "/" ? "/" : first;
}

export function Brand() {
  return (
    <Link href="/" className="brand">
      <Planet className="dd" />
      Tarreq
    </Link>
  );
}

export function Dock() {
  const pathname = usePathname();
  const active = sectionOf(pathname);
  return (
    <nav className="dock" aria-label="Sections">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="btn"
          aria-current={active === l.href ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
