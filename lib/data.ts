import { Txn, Category } from "./types";

export const categories: Category[] = ["Income", "Food", "Transport", "Bills", "Shopping", "Other"];

export const txns: Txn[] = [
  { id: "t001", date: "2025-01-01", amount: 1200, category: "Income", merchant: "Salary" },
  { id: "t002", date: "2025-01-03", amount: -23.45, category: "Food", merchant: "Cafe" },
  { id: "t003", date: "2025-01-04", amount: -59.9, category: "Transport", merchant: "Taxi" },
  { id: "t004", date: "2025-01-05", amount: -120, category: "Bills", merchant: "Electric Co." },
  { id: "t005", date: "2025-01-09", amount: -220.5, category: "Shopping", merchant: "Amazon" },
  { id: "t006", date: "2025-02-01", amount: 1200, category: "Income", merchant: "Salary" },
  { id: "t007", date: "2025-02-02", amount: -36.2, category: "Food", merchant: "Cafe" },
  { id: "t008", date: "2025-02-07", amount: -80, category: "Bills", merchant: "Water Co." },
  { id: "t009", date: "2025-02-12", amount: -45.3, category: "Transport", merchant: "Metro" },
  { id: "t010", date: "2025-02-15", amount: -310.99, category: "Shopping", merchant: "Amazon" },
  { id: "t011", date: "2025-03-01", amount: 1200, category: "Income", merchant: "Salary" },
  { id: "t012", date: "2025-03-03", amount: -18.9, category: "Food", merchant: "Bakery" },
  { id: "t013", date: "2025-03-06", amount: -130, category: "Bills", merchant: "Internet Co." },
  { id: "t014", date: "2025-03-08", amount: -60.5, category: "Transport", merchant: "Taxi" },
  { id: "t015", date: "2025-03-20", amount: -199.99, category: "Shopping", merchant: "Electronics" },
  { id: "t016", date: "2025-03-25", amount: -75.6, category: "Other", merchant: "Misc" }
];
