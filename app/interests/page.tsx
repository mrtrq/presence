import { redirect } from "next/navigation";
import { interests } from "@/lib/content";

export default function InterestsIndex() {
  redirect(`/interests/${interests[0].slug}`);
}
