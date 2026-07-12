"use client";

import Moon from "./Moon";
import Prompt from "./Prompt";

import { useExperience } from "@/providers/ExperienceProvider";

export default function OpeningExperience() {
  const { enterUniverse } =
    useExperience();

  return (
    <section
      className="
      fixed
      inset-0
      flex
      flex-col
      items-center
      justify-center
      bg-black
      text-white
    "
    >
      <Moon
        onClick={enterUniverse}
      />

      <Prompt />
    </section>
  );
}