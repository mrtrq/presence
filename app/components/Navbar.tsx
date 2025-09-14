"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Name */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Tarreq.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="#about" className="hover:text-blue-600 transition">About</Link>
          <Link href="#projects" className="hover:text-blue-600 transition">Projects</Link>
          <Link href="#writing" className="hover:text-blue-600 transition">Writing</Link>
          <Link href="#contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center focus:outline-none"
        >
          <span className="sr-only">Open Menu</span>
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            <Link href="#about" onClick={() => setOpen(false)}>About</Link>
            <Link href="#projects" onClick={() => setOpen(false)}>Projects</Link>
            <Link href="#writing" onClick={() => setOpen(false)}>Writing</Link>
            <Link href="#contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
