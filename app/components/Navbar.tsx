"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Works" },
    { href: "/#websites", label: "Websites" },
    { href: "/#writing", label: "Writing" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="nav-wrap">
      <div className="container-swiss">
        <div className="nav-shell flex items-center justify-between gap-4 px-4 sm:px-5">
          <Link href="/" className="nav-brand">
            Tarreq.
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen((value) => !value)}
            className="nav-toggle md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            type="button"
          >
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>

        {open && (
          <div className="mobile-nav-panel md:hidden">
            <div className="flex flex-col gap-1 p-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link rounded-[8px] px-3 py-4"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
