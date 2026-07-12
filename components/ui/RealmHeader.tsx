import Container from "./Container";

interface RealmHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function RealmHeader({
  eyebrow,
  title,
  description,
}: RealmHeaderProps) {
  return (
    <Container>
      <div className="mx-auto mb-24 max-w-4xl text-center">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.45em] text-[var(--accent)]">
          {eyebrow}
        </p>

        <h2 className="text-5xl font-black leading-tight md:text-6xl">
          {title}
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 opacity-75">
          {description}
        </p>

      </div>
    </Container>
  );
}