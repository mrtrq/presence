import { MasterDetail } from "@/components/MasterDetail";
import { writing, writingKinds } from "@/lib/content";

export default function WritingIndex() {
  return (
    <MasterDetail
      label="Writing"
      basePath="/writing"
      entries={writing}
      kinds={writingKinds}
      activeSlug={writing[0].slug}
      mode="index"
    />
  );
}
