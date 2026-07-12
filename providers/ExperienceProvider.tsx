"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type ExperienceContextType = {
  entered: boolean;
  enterUniverse: () => void;
};

const ExperienceContext =
  createContext<ExperienceContextType | null>(null);

export function ExperienceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);

  function enterUniverse() {
    setEntered(true);
  }

  return (
    <ExperienceContext.Provider
      value={{
        entered,
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