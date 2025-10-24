import { Txn, Category } from "./types";

// URL/State model for filters
export type FilterParams = {
  from?: string;          // "YYYY-MM"
  to?: string;            // "YYYY-MM"
  cats?: Category[];      // categories to include (empty = all)
  min?: number;           // inclusive
  max?: number;           // inclusive
};

// Helpers
const ym = (iso: string) => iso.slice(0, 7);
const inYmRange = (d: string, from?: string, to?: string) => {
  const y = ym(d);
  if (from && y < from) return false;
  if (to && y > to) return false;
  return true;
};

export function applyFilters(txns: Txn[], f: FilterParams): Txn[] {
  const catsSet = f.cats && f.cats.length ? new Set(f.cats) : null;
  const min = typeof f.min === "number" ? f.min : -Infinity;
  const max = typeof f.max === "number" ? f.max : Infinity;

  return txns.filter(t => {
    if (!inYmRange(t.date, f.from, f.to)) return false;
    if (catsSet && !catsSet.has(t.category)) return false;
    // amount filter compares raw signed amount (income positive, expense negative)
    if (t.amount < min) return false;
    if (t.amount > max) return false;
    return true;
  });
}

// Parse query params → FilterParams
export function parseQuery(sp: URLSearchParams, allCategories: readonly Category[]): FilterParams {
  const from = sp.get("from") || undefined;
  const to = sp.get("to") || undefined;

  // Validate YYYY-MM
  const mm = /^[0-9]{4}-[0-9]{2}$/;
  const safeFrom = from && mm.test(from) ? from : undefined;
  const safeTo = to && mm.test(to) ? to : undefined;

  const catsRaw = sp.get("cats");
  const catList = (catsRaw ? catsRaw.split(",") : []) as Category[];
  const allowed = new Set(allCategories);
  const cats = catList.filter(c => allowed.has(c));

  const min = sp.get("min");
  const max = sp.get("max");

  return {
    from: safeFrom,
    to: safeTo,
    cats,
    min: min != null ? Number(min) : undefined,
    max: max != null ? Number(max) : undefined,
  };
}

// Merge → URLSearchParams
export function patchQuery(current: URLSearchParams, patch: Partial<FilterParams>): URLSearchParams {
  const next = new URLSearchParams(current.toString());

  type Value = string | number | readonly Category[] | undefined;
  const setOrDel = (k: string, v: Value) => {
    if (v == null || (Array.isArray(v) && v.length === 0)) {
      next.delete(k);
      return;
    }
    if (Array.isArray(v)) {
      // Category extends string; join is safe and produces a comma-separated list
      next.set(k, (v as readonly Category[]).join(","));
    } else {
      next.set(k, String(v));
    }
  };

  if ("from" in patch) setOrDel("from", patch.from);
  if ("to" in patch) setOrDel("to", patch.to);
  if ("cats" in patch) setOrDel("cats", patch.cats);
  if ("min" in patch) setOrDel("min", patch.min);
  if ("max" in patch) setOrDel("max", patch.max);

  return next;
}
