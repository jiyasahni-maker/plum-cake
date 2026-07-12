interface RealmProps {
  children: React.ReactNode;
  id: string;
}

export default function Realm({
  children,
  id,
}: RealmProps) {
  return (
    <section
      id={id}
      className="
      relative
      py-36
      "
    >
      {children}
    </section>
  );
}