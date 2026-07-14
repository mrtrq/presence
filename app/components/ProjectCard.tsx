export function ProjectCard({ topic, title, desc, href }: { topic: string, title: string; desc: string; href: string }) {
  return (
    <a
      href={href}
      className="glass-card block p-6 no-underline"
    >
      <div className="card-kicker mb-3">{topic}</div>
      <h3 className="mb-1 underline decoration-1">{title}</h3>
      <p className="card-muted text-sm text-balance">{desc}</p>
    </a>
  );
}
