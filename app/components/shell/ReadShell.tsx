/**
 * Shell for the long-form pages.
 *
 * The home screen is a single screen with panels; the data stories are not,
 * because reading three paragraphs inside a modal is miserable. These pages
 * scroll normally but borrow the same tokens and drawn surfaces, and they
 * always offer a way back to the hub.
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ReadShell({
  children,
  backHref = "/",
  backLabel = "Back to home",
  title,
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  title?: string;
}) {
  return (
    <div className="read-shell">
      <a className="skip-link" href="#read-main">
        Skip to content
      </a>

      <header className="read-top">
        <div className="container-swiss read-top-inner">
          <Link href={backHref} className="read-back">
            <ArrowLeft aria-hidden="true" size={16} />
            {backLabel}
          </Link>
          <Link href="/" className="wordmark">
            <span className="wordmark-hand">Tarreq</span>
            <span className="wordmark-dot" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main id="read-main" className="container-swiss read-main">
        {children}
      </main>
    </div>
  );
}
