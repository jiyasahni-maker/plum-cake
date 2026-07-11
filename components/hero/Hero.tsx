import Container from "@/components/ui/Container";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center"
    >
      <Container>
        <HeroContent />

        <ScrollIndicator />
      </Container>
    </section>
  );
}