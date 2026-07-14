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
      className="writing-row group"
    >
      <div className="min-w-0">
        <h3 className="mb-2 text-base font-medium leading-snug group-hover:underline">
          {title}
        </h3>
        <p className="card-muted text-sm leading-relaxed">
          {excerpt}
        </p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-45 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
