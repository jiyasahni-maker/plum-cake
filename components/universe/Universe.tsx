import Background from "./Background";
import Stars from "./Stars";

interface UniverseProps {
  children: React.ReactNode;
}

export default function Universe({
  children,
}: UniverseProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <Background />

      <Stars />

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
}