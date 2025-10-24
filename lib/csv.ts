import { Txn } from "./types";

// Very safe CSV (no formulas, minimal quoting)
function escapeCell(v: string | number): string {
  const s = String(v);
  // Quote if contains comma, quote, newline, or starts with =,+,-,@ (Excel formula injection)
  const needsQuote = /[",\n]/.test(s) || /^[=+\-@]/.test(s);
  const safe = s.replace(/"/g, '""');
  return needsQuote ? `"${safe}"` : safe;
}

export function toCSV(rows: Txn[]): string {
  const headers = ["id", "date", "category", "merchant", "amount"];
  const data = rows.map(r => [
    r.id,
    r.date,
    r.category,
    r.merchant,
    r.amount.toFixed(2),
  ]);
  const lines = [headers, ...data].map(cols => cols.map(escapeCell).join(","));
  return lines.join("\n");
}
