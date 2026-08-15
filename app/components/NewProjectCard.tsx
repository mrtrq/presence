import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/app/content/projects";

export function NewProjectCard({ project }: { project: CaseStudy }) {
  return (
    <Link href={`/projects/${project.slug}`} className="glass-card project-case-card group">
      <p className="card-kicker">{project.topic}</p>
      <h3>{project.title}</h3>
      <p className="card-muted project-card-summary">{project.description}</p>
      <span className="project-card-cta">
        Read case study <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
