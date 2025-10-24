export default function StatBox({
  label,
  value,
  delta,
}: {
  label: string;
  value: string | number;
  delta?: number;
}) {
  const color =
    delta == null ? "var(--muted)" : delta >= 0 ? "var(--ok)" : "var(--danger)";
  const sign = delta == null ? "" : delta >= 0 ? "+" : "";

  return (
    <div style={{ display: "grid", gap: 4 }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <strong style={{ fontSize: "1.6rem", lineHeight: 1 }}>{value}</strong>
      {delta != null && (
        <span style={{ color }}>{sign}{delta}%</span>
      )}
    </div>
  );
}
