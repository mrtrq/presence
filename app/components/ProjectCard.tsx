import { NonBinary } from "lucide-react";

export function ProjectCard({ topic, title, desc, href }: { topic: string, title: string; desc: string; href: string }) {
  return (
    <a
      href={href}
      style={{textDecoration: 'none'}}
      className="block border border-[--color-fg] no-underline p-6 hover:bg-black hover:text-white hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-black transition-colors"
    >
      <div className="uppercase text-xs tracking-[0.2em] mb-2">{topic}</div>
      <h3 className="mb-1 underline">{title}</h3>
      <p className="text-sm text-balance">{desc}</p>
    </a>
  );
}
