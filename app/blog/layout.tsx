import "./story.css";

// The data stories scroll inside the stage (the page itself never scrolls),
// so they share one scrolling `.view` wrapper.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <section className="view story">{children}</section>;
}
