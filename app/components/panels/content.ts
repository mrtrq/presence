/**
 * Content, re-exported from one place.
 *
 * Panels, pages, and metadata all read from here, so copy and work listings
 * never drift apart.
 */

import { built, community, contactIntro, hobbiesIntro, research } from "@/app/content/site";
import type { Work } from "@/app/content/site";

export * from "@/app/content/site";

export const workGroups: { id: string; kicker: string; title: string; items: Work[] }[] = [
  { id: "research", kicker: "Research", title: "Questions I am chasing", items: research },
  { id: "community", kicker: "Community", title: "Work with people", items: community },
  { id: "built", kicker: "Built", title: "Things on the internet", items: built },
];

export { contactIntro, hobbiesIntro };
