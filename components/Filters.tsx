"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/types";
import { parseQuery, patchQuery, FilterParams } from "@/lib/filtering";

function useQuerySync(categories: readonly Category[]) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const parsed = useMemo(() => parseQuery(sp, categories), [sp, categories]);

  const setPatch = (p: Partial<FilterParams>) => {
    const next = patchQuery(sp, p);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return { params: parsed, setPatch };
}

export default function Filters({ categories }: { categories: readonly Category[] }) {
  const { params, setPatch } = useQuerySync(categories);

  // Local UI state mirrors params (typed, no `any`)
  const [from, setFrom] = useState<string>(params.from ?? "");
  const [to, setTo] = useState<string>(params.to ?? "");
  const [min, setMin] = useState<string>(params.min != null ? String(params.min) : "");
  const [max, setMax] = useState<string>(params.max != null ? String(params.max) : "");
  const [cats, setCats] = useState<string[]>(params.cats ?? []);

  // Apply handler (one-shot write)
  const apply = () => {
    setPatch({
      from: from || undefined,
      to: to || undefined,
      cats: (cats as Category[]) || [],
      min: min.trim() === "" ? undefined : Number(min),
      max: max.trim() === "" ? undefined : Number(max),
    });
  };

  const toggleCat = (c: string) => {
    setCats(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]));
  };

  const reset = () => {
    setFrom(""); setTo(""); setMin(""); setMax(""); setCats([]);
    setPatch({ from: undefined, to: undefined, min: undefined, max: undefined, cats: [] });
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <label>
          <div style={{ opacity: .7, marginBottom: 4 }}>From (YYYY-MM)</div>
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="2025-01"
            inputMode="numeric"
            style={inputStyle}
          />
        </label>
        <label>
          <div style={{ opacity: .7, marginBottom: 4 }}>To (YYYY-MM)</div>
          <input
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="2025-03"
            inputMode="numeric"
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <label>
          <div style={{ opacity: .7, marginBottom: 4 }}>Min amount</div>
          <input
            value={min}
            onChange={e => setMin(e.target.value)}
            placeholder="-500"
            inputMode="decimal"
            style={inputStyle}
          />
        </label>
        <label>
          <div style={{ opacity: .7, marginBottom: 4 }}>Max amount</div>
          <input
            value={max}
            onChange={e => setMax(e.target.value)}
            placeholder="2000"
            inputMode="decimal"
            style={inputStyle}
          />
        </label>
      </div>

      <fieldset style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 12 }}>
        <legend style={{ opacity: .7, padding: "0 6px" }}>Categories</legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map(c => (
            <label key={c} style={pill(cats.includes(c))}>
              <input
                type="checkbox"
                checked={cats.includes(c)}
                onChange={() => toggleCat(c)}
                style={{ marginRight: 6 }}
              />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={apply} style={primaryBtn}>Apply</button>
        <button onClick={reset} style={ghostBtn}>Reset</button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "var(--text)",
};

const primaryBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "var(--accent)",
  color: "#fff",
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "var(--text)",
  cursor: "pointer",
};

function pill(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "6px 10px",
    borderRadius: 999,
    border: active ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.15)",
    background: active ? "rgba(91,156,255,0.12)" : "transparent",
    cursor: "pointer",
  };
}
