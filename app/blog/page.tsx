import { redirect } from "next/navigation";

// The stories are listed under Writing now; keep old /blog links working.
export default function BlogIndex() {
  redirect("/writing");
}
