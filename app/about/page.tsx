import { redirect } from "next/navigation";
import { about } from "@/lib/content";

export default function AboutIndex() {
  redirect(`/about/${about[0].slug}`);
}
