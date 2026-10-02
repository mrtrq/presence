import { notFound } from "next/navigation";
import { MasterDetail } from "@/components/MasterDetail";
import { interests, interestKinds } from "@/lib/content";

export function generateStaticParams() {
  return interests.map((e) => ({ slug: e.slug }));
}

export default async function InterestsEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!interests.some((e) => e.slug === slug)) notFound();

  return (
    <MasterDetail
      label="Interests"
      basePath="/interests"
      entries={interests}
      kinds={interestKinds}
      activeSlug={slug}
      mode="entry"
    />
  );
}
