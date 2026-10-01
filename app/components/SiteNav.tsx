"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Doodle } from "./Doodles";
import { identity } from "../content";

const LINKS = [
  { href: "/writing", label: "Writing" },
  { href: "/work", label: "Work" },
  { href: "/interests", label: "Interests" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll and support Escape while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav">
        <nav className="shell--wide nav__inner" aria-label="Primary">
          <Link href="/" className="nav__brand">
            <span className="nav__mark">
              <Doodle name="sprout" size={19} />
            </span>
            {identity.name}
          </Link>

          <div className="nav__links">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav__link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <Doodle name={open ? "close" : "menu"} size={21} />
          </button>
        </nav>
      </header>

      {open && (
        <div className="nav-sheet" id="mobile-nav">
          <div className="shell stack" style={{ gap: "0.5rem" }}>
            <Link
              href="/"
              className="nav-sheet__link"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
              <Doodle name="arrowRight" size={18} />
            </Link>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-sheet__link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <Doodle name="arrowRight" size={18} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
