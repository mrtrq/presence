"use client";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

/**
 * WebsiteCard - A card component for displaying websites
 * - Direct link to website (no modal)
 * - Optional preview image/screenshot
 * - Similar design tone to NewProjectCard but tailored for websites
 * - Clean, minimal styling matching the overall site aesthetic
 */
export function WebsiteCard({
  topic,
  title,
  desc,
  href,
  image,
  imageAlt,
}: {
  topic: string;
  title: string;
  desc?: string;
  href: string;
  /** Optional preview image/screenshot of the website */
  image?: string;
  imageAlt?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      className="group block border border-[--color-fg] overflow-hidden hover:bg-black hover:text-white hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-black transition-all duration-200"
    >
      {/* Optional preview image */}
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={imageAlt || title}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="uppercase text-xs tracking-[0.2em] mb-2">{topic}</div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="mb-1 underline underline-offset-4 decoration-1 group-hover:decoration-white flex-1">
            {title}
          </h3>
          <ExternalLink className="h-4 w-4 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
        {desc && (
          <p className="text-sm text-balance mt-2 leading-relaxed">{desc}</p>
        )}
      </div>
    </a>
  );
}
