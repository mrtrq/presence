import { ExternalLink } from "lucide-react";

export function WritingCard({
  title,
  excerpt,
  href,
}: {
  title: string;
  excerpt: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      className="group flex items-start justify-between gap-6 py-5 hover:opacity-60 transition-opacity"
    >
      <div className="min-w-0">
        <h3 className="text-base font-medium leading-snug mb-2 group-hover:underline underline-offset-4">
          {title}
        </h3>
        <p className="text-sm text-[--color-muted] leading-relaxed">
          {excerpt}
        </p>
      </div>
      <ExternalLink className="w-4 h-4 shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}