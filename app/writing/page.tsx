import { redirect } from "next/navigation";
import { writing } from "@/lib/content";

export default function WritingIndex() {
  redirect(`/writing/${writing[0].slug}`);
}
