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
    <div className="glass-card p-6 md:p-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block h-2 w-2 rounded-full bg-[#28b9ff] animate-pulse" />
        <span className="card-kicker">Active</span>
      </div>

      <div className="card-kicker mb-3">
        {type}
      </div>

      <h3 className="text-2xl font-semibold mb-4">{title}</h3>

      <p className="card-muted max-w-[60ch] leading-relaxed">{desc}</p>

      <div className="mt-8 flex items-center gap-6">
        <span className="card-muted text-xs uppercase">
          Since {since}
        </span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase underline"
          >
            Preview
          </a>
        )}
      </div>
    </div>
  );
}
