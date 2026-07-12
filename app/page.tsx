"use client";

import OpeningExperience from "@/components/opening/OpeningExperience";
import AppLayout from "@/components/layout/AppLayout";

import { useExperience } from "@/providers/ExperienceProvider";

export default function Home() {
  const { entered } =
    useExperience();

  return entered
    ? <AppLayout />
    : <OpeningExperience />;
}