import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/app/content/projects";
import { CopyArticleLink } from "@/app/components/writing/CopyArticleLink";

export function CaseStudyLayout({ project }: { project: CaseStudy }) {
  return (
    <article className="article-shell case-study-shell">
      <header className="article-hero article-container case-study-hero">
        <Link href="/#works" className="article-back">
          <ArrowLeft size={16} aria-hidden="true" />
          All experiences
        </Link>
        <p className="eyebrow">{project.topic}</p>
        <h1>{project.title}</h1>
        <p className="article-lede">{project.description}</p>
      </header>

      <section className="case-study-overview article-container" aria-label="Project overview">
        <div>
          <p className="case-study-label">Focus</p>
          <div className="article-topic-list">
            {project.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <a href={project.supportingLink.href} target="_blank" rel="noreferrer" className="case-study-evidence">
          {project.supportingLink.label}
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </section>

      <div className="case-study-body article-prose">
        {project.sections.map((section) => (
          <section className="case-study-section" key={section.label}>
            <p className="case-study-label">{section.label}</p>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <footer className="article-footer article-container">
        <div className="article-finish">
          <div>
            <p className="article-finish-label">Project note</p>
            <p>The supporting material lives alongside this written account.</p>
          </div>
          <CopyArticleLink />
        </div>
      </footer>
    </article>
  );
}
