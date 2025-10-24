import { Txn, MonthRow, CategoryRow, MerchantRow, KPI, Category } from "./types";

const ym = (iso: string) => iso.slice(0, 7); // "YYYY-MM"

export function sumByMonth(txns: Txn[]): MonthRow[] {
  const map = new Map<string, { income: number; expense: number }>();
  for (const t of txns) {
    const key = ym(t.date);
    const row = map.get(key) ?? { income: 0, expense: 0 };
    if (t.amount >= 0) row.income += t.amount; else row.expense += Math.abs(t.amount);
    map.set(key, row);
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, { income, expense }]) => ({ month, income, expense, net: income - expense }));
}

export function sumByCategory(txns: Txn[]): CategoryRow[] {
  const map = new Map<Category, number>();
  for (const t of txns) {
    if (t.category === "Income") continue; // only expenses in breakdown
    map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount));
  }
  return [...map.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export function topMerchants(txns: Txn[], n = 5): MerchantRow[] {
  const map = new Map<string, number>();
  for (const t of txns) {
    if (t.category === "Income") continue;
    map.set(t.merchant, (map.get(t.merchant) ?? 0) + Math.abs(t.amount));
  }
  return [...map.entries()]
    .map(([merchant, total]) => ({ merchant, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, n);
}

export function kpis(txns: Txn[]): KPI[] {
  // Group by month → compute last and previous for deltas
  const rows = sumByMonth(txns);
  if (rows.length === 0) {
    return [
      { label: "Net (This Month)", value: 0, delta: 0 },
      { label: "Income", value: 0 },
      { label: "Expenses", value: 0 },
    ];
  }
  const last = rows[rows.length - 1];
  const prev = rows.length > 1 ? rows[rows.length - 2] : { net: 0, income: 0, expense: 0 };

  const pct = (curr: number, base: number) =>
    base === 0 ? (curr === 0 ? 0 : 100) : Math.round(((curr - base) / Math.abs(base)) * 100);

  return [
    { label: "Net (This Month)", value: round2(last.net), delta: pct(last.net, prev.net) },
    { label: "Income", value: round2(last.income) },
    { label: "Expenses", value: round2(last.expense) }
  ];
}

export function formatCurrency(n: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
}
export function round2(n: number) {
  return Math.round(n * 100) / 100;
}
