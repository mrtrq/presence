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
      className="glass-card group block overflow-hidden no-underline"
    >
      {/* Optional preview image */}
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={imageAlt || title}
            width={800}
            height={450}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="card-kicker mb-3">{topic}</div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="mb-1 flex-1 underline decoration-1 group-hover:decoration-[#28b9ff]">
            {title}
          </h3>
          <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-55 transition-opacity group-hover:opacity-100" />
        </div>
        {desc && (
          <p className="card-muted mt-2 text-sm leading-relaxed text-balance">{desc}</p>
        )}
      </div>
    </a>
  );
}
