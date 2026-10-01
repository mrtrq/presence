import { notFound } from "next/navigation";
import { MasterDetail } from "@/components/MasterDetail";
import { writing, writingKinds } from "@/lib/content";

export function generateStaticParams() {
  return writing.map((e) => ({ slug: e.slug }));
}

export default async function WritingEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!writing.some((e) => e.slug === slug)) notFound();

  return (
    <MasterDetail
      label="Writing"
      basePath="/writing"
      entries={writing}
      kinds={writingKinds}
      activeSlug={slug}
    />
  );
}
