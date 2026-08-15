"use client";

import {
  BriefcaseBusiness,
  Globe2,
  Mail,
  NotebookPen,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About", icon: UserRound },
  { id: "works", label: "Works", icon: BriefcaseBusiness },
  { id: "websites", label: "Websites", icon: Globe2 },
  { id: "writing", label: "Writing", icon: NotebookPen },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

type SectionId = (typeof links)[number]["id"];

function sectionFromHash(hash: string): SectionId {
  const value = hash.replace("#", "");
  if (value === "projects") return "works";
  return links.some((link) => link.id === value) ? (value as SectionId) : "about";
}

export function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId>("about");
  const isReading = pathname.startsWith("/blog/") || pathname.startsWith("/projects/");

  useEffect(() => {
    if (pathname !== "/") return;

    const syncFromUrl = () => setActive(sectionFromHash(window.location.hash));
    const syncFromPage = (event: Event) => {
      const next = (event as CustomEvent<{ section: SectionId }>).detail?.section;
      if (next) setActive(next);
    };

    syncFromUrl();
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("portfolio:changed", syncFromPage);

    return () => {
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("portfolio:changed", syncFromPage);
    };
  }, [pathname]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, section: SectionId) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { section } }));
  };

  return (
    <nav className={`nav-wrap${isReading ? " nav-wrap-reading" : ""}`} aria-label="Portfolio sections">
      <div className="dock-shell">
        {links.map(({ id, label, icon: Icon }) => {
          const isActive = pathname === "/" && active === id;

          return (
            <Link
              key={id}
              href={`/#${id}`}
              className={`dock-link${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => navigate(event, id)}
            >
              <span className="dock-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span className="dock-label">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
