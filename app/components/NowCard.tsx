export function NowCard({
  type,
  title,
  desc,
  since,
  href,
}: {
  type: string;
  title: string;
  desc: string;
  since: string;
  href?: string;
}) {
  return (
    <div className="border border-[--color-fg] p-6 md:p-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
        <span className="uppercase text-xs tracking-[0.2em] text-[#e10600]">Active</span>
      </div>

      <div className="uppercase text-xs tracking-[0.2em] text-[--color-muted] mb-3">
        {type}
      </div>

      <h3 className="text-2xl font-semibold mb-4">{title}</h3>

      <p className="leading-relaxed text-[--color-muted] max-w-[60ch]">{desc}</p>

      <div className="mt-8 flex items-center gap-6">
        <span className="text-xs uppercase tracking-[0.2em] text-[--color-muted]">
          Since {since}
        </span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] underline underline-offset-4"
          >
            Preview
          </a>
        )}
      </div>
    </div>
  );
}