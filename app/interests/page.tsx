import { MasterDetail } from "@/components/MasterDetail";
import { interests, interestKinds } from "@/lib/content";

export default function InterestsIndex() {
  return (
    <MasterDetail
      label="Interests"
      basePath="/interests"
      entries={interests}
      kinds={interestKinds}
      activeSlug={interests[0].slug}
      mode="index"
    />
  );
}
