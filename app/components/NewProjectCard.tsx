"use client";
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
        style={{ textDecoration: "none" }}
        className="group block border border-[--color-fg] p-6 hover:bg-black hover:text-white hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-black transition-colors"
      >
        <div className="uppercase text-xs tracking-[0.2em] mb-2">{topic}</div>
        <h3 className="mb-1 underline underline-offset-4 decoration-1">{title}</h3>
        {/* <p className="text-sm text-balance">{desc}</p> */}
      </a>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative max-w-2xl w-[92vw] rounded-2xl bg-white text-black shadow-2xl border border-black/10">
            <div className="p-6 sm:p-8">
              <div className="uppercase text-xs tracking-[0.2em] mb-2 text-neutral-600">
                {topic}
              </div>
              <h2 id="project-modal-title" className="text-2xl font-medium mb-3">
                {title}
              </h2>
              <p className="text-base leading-relaxed text-neutral-800">
                {preview || desc}
              </p>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={href}
                  style={{textDecoration: 'none'}}
                  className="inline-flex items-center gap-2 rounded-xl border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  target="_blank"
                >
                  View {viewtype}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M13 5h6v6h-2V8.41l-9.29 9.3-1.42-1.42 9.3-9.29H13V5Z" />
                  </svg>
                </a>
                <button
                  ref={closeButtonRef}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-black px-4 py-2 hover:bg-neutral-100"
                >
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
