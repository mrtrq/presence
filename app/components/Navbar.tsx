"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-[--color-fg] z-50">
      <div className="container-swiss flex justify-between items-center h-16">
        {/* Name */}
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="text-base font-semibold tracking-tight uppercase"
        >
          Tarreq.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-xs font-medium uppercase tracking-[0.2em]">
          <Link href="#about" style={{ textDecoration: "none" }} className="hover:text-[#e10600] transition-colors">About</Link>
          {/* <Link href="#now"   style={{ textDecoration: "none" }} className="hover:text-[#e10600] transition-colors">Now</Link> */}
          <Link href="#projects" style={{ textDecoration: "none" }} className="hover:text-[#e10600] transition-colors">Works</Link>
          <Link href="#writing" style={{ textDecoration: "none" }} className="hover:text-[#e10600] transition-colors">Writing</Link>
          <Link href="#contact" style={{ textDecoration: "none" }} className="hover:text-[#e10600] transition-colors">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-[--color-fg]">
          <div className="container-swiss flex flex-col py-5 space-y-4 text-xs font-medium uppercase tracking-[0.2em]">
            <Link href="#about"    style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>About</Link>
            {/* <Link href="#now"      style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>Now</Link> */}
            <Link href="#projects" style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>Works</Link>
            <Link href="#writing"  style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>Writing</Link>
            <Link href="#contact"  style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}