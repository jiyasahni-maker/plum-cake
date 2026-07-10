interface SectionProps {
  id: string;
  children: React.ReactNode;
}

export default function Section({
  id,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-8">
        {children}
      </div>
    </section>
  );
}