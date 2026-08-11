"use client";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * NewProjectCard with inline Modal Preview
 * - Whole card opens a preview modal
 * - Title keeps underline; other text does not
 * - Keyboard accessible (Esc to close, focus trap start)
 * - Includes a primary CTA to the full project page
 */
export function NewProjectCard({
  topic,
  title,
  desc,
  href,
  preview,
  viewtype,
}: {
  topic: string;
  title: string;
  desc?: string;
  href: string;
  viewtype: string;
  /** Optional longer preview shown in the modal; falls back to desc */
  preview?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus to close button when modal opens
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      document.documentElement.classList.add("overflow-y-hidden");
      return () => document.documentElement.classList.remove("overflow-y-hidden");
    }
  }, [open]);

  return (
    <>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="glass-card group block p-6 no-underline md:p-7"
      >
        <div className="card-kicker mb-3">{topic}</div>
        <h3 className="mb-1 underline decoration-1 group-hover:decoration-[#28b9ff]">{title}</h3>
        <p className="card-muted project-card-summary text-sm text-balance">
          {desc || preview}
        </p>
      </a>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            className="modal-backdrop"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="glass-modal">
            <div className="p-6 sm:p-8">
              <div className="card-kicker mb-2">
                {topic}
              </div>
              <h2 id="project-modal-title" className="text-2xl font-medium mb-3">
                {title}
              </h2>
              <p className="card-muted text-base leading-relaxed">
                {preview || desc}
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={href}
                  className="modal-action modal-action-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View {viewtype}
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
                <button
                  ref={closeButtonRef}
                  onClick={() => setOpen(false)}
                  className="modal-action"
                  type="button"
                >
                  <X aria-hidden="true" size={16} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
