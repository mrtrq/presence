import { ReadShell } from "@/app/components/shell/ReadShell";
import { Card } from "@/app/components/ui";
import { Sparkle } from "@/app/components/draw/Doodles";

export const metadata = {
  title: "Gallery",
  description: "Photographs and drawings, eventually.",
};

export default function GalleryPage() {
  return (
    <ReadShell backHref="/" backLabel="Back home" title="Gallery">
      <div style={{ maxWidth: "34rem", marginTop: "3rem" }}>
        <Card tone="sprout" seed="gallery" className="read-card" style={{ alignItems: "center", textAlign: "center" }}>
          <Sparkle size={34} className="doodle-sun" />
          <h1 className="display-md">Gallery</h1>
          <p className="card-body">
            Curating the collection. Nothing curated yet, which is at least an honest start.
          </p>
        </Card>
      </div>
    </ReadShell>
  );
}
