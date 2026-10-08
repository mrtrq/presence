import type { Metadata } from "next";
import { MasterDetail } from "@/components/MasterDetail";
import { work, workKinds } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work · Tarreq",
  description:
    "What Tarreq builds and studies: audit management systems at BDO Indonesia, and a thesis on estimating river water quality from Sentinel-2 satellite images.",
};

export default function WorkIndex() {
  return (
    <MasterDetail
      label="Work"
      basePath="/work"
      entries={work}
      kinds={workKinds}
      activeSlug={work[0].slug}
      mode="index"
    />
  );
}
