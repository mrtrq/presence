"use client";

import { useLayoutEffect } from "react";

/**
 * Each entry is its own route, so the card list is rebuilt on every
 * navigation and would snap back to the top. When the list is taller than its
 * box, scroll just the list so the selected card is never hidden.
 */
export function KeepActiveVisible() {
  useLayoutEffect(() => {
    const list = document.querySelector<HTMLElement>(".md .list");
    const active = list?.querySelector<HTMLElement>("[data-on]");
    // clientHeight is 0 when the list isn't on screen (mobile entry view).
    if (!list || !active || list.clientHeight === 0) return;

    const pad = 12;
    const a = active.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    if (a.top < b.top + pad) list.scrollTop -= b.top + pad - a.top;
    else if (a.bottom > b.bottom - pad) list.scrollTop += a.bottom - (b.bottom - pad);
  }, []);

  return null;
}
