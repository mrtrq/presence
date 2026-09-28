/**
 * Renders whichever panel is open.
 *
 * The panel bodies are static content, so this is the only client component
 * that pulls all five into the bundle. Splitting them further would mean five
 * separate dynamic imports for content that is a few kilobytes of text; the
 * single boundary here is simpler and about the same size.
 */

"use client";

import { usePanel, type PanelId } from "@/app/components/panels/usePanel";
import {
  AboutPanel,
  ContactPanel,
  PlayPanel,
  WorkPanel,
  WritingPanel,
} from "@/app/components/panels";

const registry: Record<PanelId, () => React.JSX.Element> = {
  about: AboutPanel,
  work: WorkPanel,
  writing: WritingPanel,
  play: PlayPanel,
  contact: ContactPanel,
};

export function PanelHost() {
  const { active } = usePanel();
  if (!active) return null;

  const Panel = registry[active];
  return <Panel key={active} />;
}
