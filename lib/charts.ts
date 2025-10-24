import { CategoryRow, MerchantRow, MonthRow } from "./types";

export function toLineDataset(rows: MonthRow[]) {
  return {
    labels: rows.map(r => r.month),
    datasets: [
      { label: "Income", data: rows.map(r => r.income) },
      { label: "Expenses", data: rows.map(r => r.expense) },
      { label: "Net", data: rows.map(r => r.net) }
    ]
  };
}

export function toPieDataset(rows: CategoryRow[]) {
  return {
    labels: rows.map(r => r.category),
    datasets: [
      { label: "By Category", data: rows.map(r => r.total) }
    ]
  };
}

export function toBarDataset(rows: MerchantRow[]) {
  return {
    labels: rows.map(r => r.merchant),
    datasets: [
      { label: "Top Merchants", data: rows.map(r => r.total) }
    ]
  };
}

export const baseOptions = {
  responsive: true,
  maintainAspectRatio: false
};
