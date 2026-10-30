import { site } from "@/data";
import HeroActions from "./HeroActions";

export default function HeroContent() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-[var(--accent)]">
        HELLO.
      </p>

      <h1 className="text-5xl font-black leading-none sm:text-7xl lg:text-8xl">

        <span className="block text-2xl font-normal tracking-normal mb-4">
          I'm
        </span>

        {site.name}

      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 opacity-80">
        {site.tagline}
      </p>

      <HeroActions />

    </div>
  );
}