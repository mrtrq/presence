export function ProjectCard({ title, desc, href }: { title: string; desc: string; href: string }) {
return (
    <a href={href} className="block border border-[--color-fg] p-6 hover:bg-black hover:text-white hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-black transition-colors">
    <div className="uppercase text-xs tracking-[0.2em] mb-2">Project</div>
    <h3 className="mb-1">{title}</h3>
    <p className="text-sm text-balance">{desc}</p>
    </a>
);
}