"use client";
import { ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const closeModal = useCallback(() => {
    if (closing) return;
    setClosing(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      triggerRef.current?.focus();
    }, prefersReducedMotion ? 0 : 220);
  }, [closing]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal, open]);

  // Move focus to close button when modal opens
  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
      document.documentElement.classList.add("overflow-y-hidden");
      return () => document.documentElement.classList.remove("overflow-y-hidden");
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setClosing(false);
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
          aria-describedby="project-modal-description"
          className={`modal-layer fixed inset-0 z-[80] flex items-center justify-center p-4${closing ? " is-closing" : ""}`}
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            className="modal-backdrop"
            onClick={closeModal}
            type="button"
          />

          {/* Panel */}
          <div ref={panelRef} className="glass-modal" tabIndex={-1}>
            <div className="p-6 sm:p-8">
              <div className="card-kicker mb-2">
                {topic}
              </div>
              <h2 id="project-modal-title" className="text-2xl font-medium mb-3">
                {title}
              </h2>
              <p id="project-modal-description" className="card-muted text-base leading-relaxed">
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
                  onClick={closeModal}
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
