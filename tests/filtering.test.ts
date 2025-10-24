import { describe, it, expect } from "vitest";
import { applyFilters, parseQuery } from "@/lib/filtering";
import { Txn, Category } from "@/lib/types";

const cats = ["Income","Food","Transport","Bills","Shopping","Other"] as const satisfies readonly Category[];
const tx: Txn[] = [
  { id:"1", date:"2025-01-01", amount:1000, category:"Income", merchant:"Salary" },
  { id:"2", date:"2025-01-10", amount:-50, category:"Food", merchant:"Cafe" },
  { id:"3", date:"2025-02-10", amount:-200, category:"Bills", merchant:"Electric" },
];

describe("applyFilters", () => {
  it("filters by month range", () => {
    const f = { from:"2025-02", to:"2025-02" };
    const out = applyFilters(tx, f);
    expect(out.map(t => t.id)).toEqual(["3"]);
  });

  it("filters by categories", () => {
    const f = { cats:["Food" as Category] };
    const out = applyFilters(tx, f);
    expect(out.map(t => t.id)).toEqual(["2"]);
  });

  it("filters by amount range", () => {
    const f = { min:-100, max:10 };
    const out = applyFilters(tx, f);
    expect(out.map(t => t.id)).toEqual(["2"]);
  });
});

describe("parseQuery", () => {
  it("parses and validates query params", () => {
    const sp = new URLSearchParams("from=2025-01&to=2025-02&cats=Food,Bills&min=-100&max=200");
    const res = parseQuery(sp, cats);
    expect(res).toEqual({ from:"2025-01", to:"2025-02", cats:["Food","Bills"], min:-100, max:200 });
  });

  it("ignores invalid months and unknown categories", () => {
    const sp = new URLSearchParams("from=bad&cats=Unknown,Food");
    const res = parseQuery(sp, cats);
    expect(res.from).toBeUndefined();
    expect(res.cats).toEqual(["Food"]);
  });
});
