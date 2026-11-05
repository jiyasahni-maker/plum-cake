"use client";

import { useEffect, useState } from "react";

export const INTRO_DONE_EVENT = "intro:done";
export const INTRO_STORAGE_KEY = "intro-seen";

/** True once the opening scene has been dismissed (or was already seen this session). */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (sessionStorage.getItem(INTRO_STORAGE_KEY)) setDone(true);
      } catch {
        /* ignore */
      }
    }, 0);
    const on = () => setDone(true);
    window.addEventListener(INTRO_DONE_EVENT, on);
    return () => {
      clearTimeout(t);
      window.removeEventListener(INTRO_DONE_EVENT, on);
    };
  }, []);

  return done;
}
