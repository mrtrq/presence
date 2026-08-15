import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/app/components/projects/CaseStudyLayout";
import { caseStudies, getCaseStudy } from "@/app/content/projects";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} case study | Muhammad Tarreq`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyLayout project={project} />;
}
