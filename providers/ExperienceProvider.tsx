"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";

type Origin = { x: number; y: number };

type ExperienceContextType = {
  entered: boolean;
  /** Screen point the stardust burst should radiate from, or null when idle */
  burstOrigin: Origin | null;
  /** Fires the burst from a given screen point, then swaps to AppLayout shortly after */
  triggerEntry: (origin: Origin) => void;
  /** Back-compat: enters immediately from screen center, no burst origin needed */
  enterUniverse: () => void;
};

const ExperienceContext =
  createContext<ExperienceContextType | null>(null);

// Head start given to the particle burst before the moon itself starts
// flying to the navbar — keeps the burst from looking like it's chasing
// an object that's already gone.
const ENTER_DELAY_MS = 180;
// How long the burst layer stays mounted before it's cleared away.
const BURST_LIFETIME_MS = 1400;

export function ExperienceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<Origin | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function triggerEntry(origin: Origin) {
    setBurstOrigin(origin);

    timers.current.push(
      setTimeout(() => setEntered(true), ENTER_DELAY_MS),
      setTimeout(() => setBurstOrigin(null), BURST_LIFETIME_MS)
    );
  }

  function enterUniverse() {
    triggerEntry({
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    });
  }

  return (
    <ExperienceContext.Provider
      value={{
        entered,
        burstOrigin,
        triggerEntry,
        enterUniverse,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(
    ExperienceContext
  );

  if (!context) {
    throw new Error(
      "useExperience must be used inside ExperienceProvider"
    );
  }

  return context;
}