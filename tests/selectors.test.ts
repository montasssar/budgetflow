import { describe, it, expect } from "vitest";
import { sumByMonth, sumByCategory, topMerchants, kpis, round2 } from "@/lib/selectors";
import { Txn } from "@/lib/types";

const tx: Txn[] = [
  { id: "1", date: "2025-01-01", amount: 1000, category: "Income", merchant: "Salary" },
  { id: "2", date: "2025-01-05", amount: -200, category: "Bills", merchant: "Electric" },
  { id: "3", date: "2025-02-01", amount: 1000, category: "Income", merchant: "Salary" },
  { id: "4", date: "2025-02-10", amount: -50, category: "Food", merchant: "Cafe" },
  { id: "5", date: "2025-02-12", amount: -150, category: "Bills", merchant: "Water" },
];

describe("sumByMonth", () => {
  it("aggregates income, expense, net by YYYY-MM", () => {
    const rows = sumByMonth(tx);
    expect(rows).toEqual([
      { month: "2025-01", income: 1000, expense: 200, net: 800 },
      { month: "2025-02", income: 1000, expense: 200, net: 800 },
    ]);
  });
});

describe("sumByCategory", () => {
  it("sums only expenses by category", () => {
    const rows = sumByCategory(tx);
    expect(rows.find(r => r.category === "Bills")?.total).toBe(350);
    expect(rows.find(r => r.category === "Food")?.total).toBe(50);
    expect(rows.find(r => r.category === "Income")).toBeUndefined();
  });
});

describe("topMerchants", () => {
  it("returns top N expense merchants by total spend", () => {
    const rows = topMerchants(tx, 2);
    expect(rows[0].merchant).toBe("Electric");
    expect(rows[0].total).toBe(200);
    expect(rows[1].merchant).toBe("Water");
    expect(rows[1].total).toBe(150);
  });
});

describe("kpis", () => {
  it("computes latest month KPIs and delta vs previous", () => {
    const [net, income, expenses] = kpis(tx);
    expect(round2(Number(income.value))).toBe(1000);
    expect(round2(Number(expenses.value))).toBe(200);
    expect(net.delta).toBe(0); // same net 800 vs 800
  });
});
