"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

function copyWithTextarea(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  if (!ok) throw new Error("copy failed");
}

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // The async API is missing, or the browser refused it (permissions policy,
    // some Safari/Firefox setups). The textarea route still works from a click.
    copyWithTextarea(text);
  }
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await writeToClipboard(email);
      setStatus("copied");
      // Rocky (Contact page) cheers, if he's around
      window.dispatchEvent(new CustomEvent("rocky:say", { detail: "Fist my bump." }));
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2200);
  }

  const done = status !== "idle";

  return (
    <>
      <button
        type="button"
        className="btn y"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
      >
        {/* Both faces share one grid cell so the button never changes width. */}
        <span className="swap" aria-hidden="true">
          <span data-show={!done}>
            {email}
            <Copy size={17} strokeWidth={2.6} />
          </span>
          <span data-show={done}>
            {status === "failed" ? "Couldn\u2019t copy" : "Copied!"}
            {status !== "failed" && <Check size={17} strokeWidth={2.6} />}
          </span>
        </span>
      </button>
      <span className="sr-only" role="status">
        {status === "copied" && "Email address copied to clipboard"}
        {status === "failed" && "Couldn\u2019t copy the email address"}
      </span>
    </>
  );
}
