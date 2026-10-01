import { notFound } from "next/navigation";
import { MasterDetail } from "@/components/MasterDetail";
import { about } from "@/lib/content";

export function generateStaticParams() {
  return about.map((e) => ({ slug: e.slug }));
}

export default async function AboutEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!about.some((e) => e.slug === slug)) notFound();

  return (
    <MasterDetail
      label="About"
      basePath="/about"
      entries={about}
      activeSlug={slug}
    />
  );
}
