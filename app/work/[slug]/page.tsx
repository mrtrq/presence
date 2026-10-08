import { notFound } from "next/navigation";
import { MasterDetail } from "@/components/MasterDetail";
import { work, workKinds } from "@/lib/work";

export function generateStaticParams() {
  return work.map((e) => ({ slug: e.slug }));
}

export default async function WorkEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!work.some((e) => e.slug === slug)) notFound();

  return (
    <MasterDetail
      label="Work"
      basePath="/work"
      entries={work}
      kinds={workKinds}
      activeSlug={slug}
      mode="entry"
    />
  );
}
