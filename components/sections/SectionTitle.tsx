interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-16">
      <h2 className="text-5xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
}