import Button from "@/components/ui/Button";

export default function HeroActions() {
  return (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row">

      <Button size="lg">
        Explore My Work →
      </Button>

      <Button
        size="lg"
        variant="outline"
      >
        Download Resume
      </Button>

    </div>
  );
}