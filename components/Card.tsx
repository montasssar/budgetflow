export default function Card({
  title,
  right,
  children,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        padding: "16px",
      }}
    >
      {(title || right) && (
        <header
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}
        >
          {title ? <h2 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h2> : <div />}
          {right}
        </header>
      )}
      {children}
    </section>
  );
}
