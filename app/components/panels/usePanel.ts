/**
 * Panel routing.
 *
 * The site is a single screen with panels layered over it, so navigation is
 * modelled as a small state machine rather than as routes. The rules that
 * matter:
 *
 *   - one panel open at a time, and never a second on top of the first;
 *   - the URL always reflects the open panel, so any view can be linked to and
 *     the back button closes rather than exits;
 *   - the hash changes push history, which is what makes the back button work.
 *
 * `next/link` is deliberately avoided for panel navigation: routing through the
 * client router would remount the shell and lose the animation.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const PANEL_IDS = ["about", "work", "writing", "play", "contact"] as const;

export type PanelId = (typeof PANEL_IDS)[number];

export function isPanelId(value: string | null | undefined): value is PanelId {
  return !!value && (PANEL_IDS as readonly string[]).includes(value);
}

export function readHash(): PanelId | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  return isPanelId(raw) ? raw : null;
}

type PanelController = {
  active: PanelId | null;
  open: (id: PanelId) => void;
  close: () => void;
  /** Increments on every close, letting panels reset their internal state. */
  closeCount: number;
};

let listeners = new Set<(state: PanelController) => void>();
let current: PanelController = {
  active: null,
  open: () => {},
  close: () => {},
  closeCount: 0,
};

function publish(next: Partial<PanelController>) {
  current = { ...current, ...next };
  for (const listener of listeners) listener(current);
}

/**
 * A tiny external store instead of React context. Panel state needs to be read
 * by the nav and by the host at the same time, and a context provider would
 * push a re-render through the whole tree on every open and close. This keeps
 * the re-render scoped to the components that subscribe.
 */
export function usePanel(): PanelController {
  const [state, setState] = useState(current);

  useEffect(() => {
    listeners.add(setState);
    setState(current);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
}

let initialised = false;

function ensureInitialised() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  // Reflect a panel opened by a direct link, e.g. /#writing.
  const initial = readHash();
  if (initial) publish({ active: initial });

  window.addEventListener("popstate", () => {
    publish({ active: readHash() });
  });

  window.addEventListener("hashchange", () => {
    publish({ active: readHash() });
  });
}

export function openPanel(id: PanelId) {
  ensureInitialised();
  if (readHash() === id) return;
  window.location.hash = id;
  publish({ active: id });
}

export function closePanel() {
  ensureInitialised();
  const had = current.active !== null;
  if (had) {
    publish({ closeCount: current.closeCount + 1 });
  }

  if (window.history.state?.panel) {
    // The panel was opened by a push, so step back rather than cutting the
    // history entry. This is what makes the back button close the panel.
    window.history.back();
  } else {
    // Opened by a direct link: replace so the hash does not linger.
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    publish({ active: null });
  }
}

/** Locks body scroll while a panel is open, and restores it afterwards. */
export function useScrollLock(locked: boolean) {
  const previous = useRef<string>("");

  useEffect(() => {
    if (!locked) return;

    previous.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous.current;
    };
  }, [locked]);
}

/** Calls back on Escape while `active`. */
export function useEscape(active: boolean, onEscape: () => void) {
  const handler = useRef(onEscape);
  handler.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler.current();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}

/**
 * Moves focus into a panel on open and returns it to the trigger on close, so
 * keyboard and screen-reader users are never stranded behind the overlay.
 */
export function useFocusTrap(container: React.RefObject<HTMLElement | null>, active: boolean) {
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !container.current) return;

    opener.current = document.activeElement as HTMLElement | null;

    const node = container.current;
    const focusables = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    const first = focusables()[0] ?? node;
    first.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    node.addEventListener("keydown", onKey);

    return () => {
      node.removeEventListener("keydown", onKey);
      opener.current?.focus({ preventScroll: true });
    };
  }, [active, container]);
}

/** Convenience wrapper returning stable callbacks for a panel. */
export function usePanelControls() {
  const open = useCallback((id: PanelId) => openPanel(id), []);
  const close = useCallback(() => closePanel(), []);
  return { open, close };
}
