"use client";

import { LayoutGroup } from "framer-motion";
import OpeningExperience from "@/components/opening/OpeningExperience";
import StardustBurst from "@/components/opening/StardustBurst";
import AppLayout from "@/components/layout/AppLayout";

import { useExperience } from "@/providers/ExperienceProvider";

export default function Home() {
  const { entered } = useExperience();

  return (
    // LayoutGroup wraps the swap point so BrandMark's shared layoutId
    // tracks correctly between OpeningExperience (Moon) and AppLayout (Navbar).
    <LayoutGroup>
      {entered ? <AppLayout /> : <OpeningExperience />}
      <StardustBurst />
    </LayoutGroup>
  );
}