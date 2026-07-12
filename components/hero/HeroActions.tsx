import Button from "@/components/ui/Button";
import { site } from "@/data";

export default function HeroActions() {
  return (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row">

      <a href="#projects">

        <Button size="lg">

          Explore My Work →

        </Button>

      </a>

      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
      >

        <Button
          variant="outline"
          size="lg"
        >

          Download Resume

        </Button>

      </a>

    </div>
  );
}