export type Category = "Income" | "Food" | "Transport" | "Bills" | "Shopping" | "Other";

export type Txn = {
  id: string;
  date: string;            // ISO e.g., "2025-01-15"
  amount: number;          // + for income, - for expense
  category: Category;
  merchant: string;        // e.g., "Amazon", "Cafe"
  account?: string;        // e.g., "Visa"
  notes?: string;
};

export type MonthRow = { month: string; income: number; expense: number; net: number };
export type CategoryRow = { category: Category; total: number };
export type MerchantRow = { merchant: string; total: number };
export type KPI = { label: string; value: number; delta?: number };
