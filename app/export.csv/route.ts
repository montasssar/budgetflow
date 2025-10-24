import { NextResponse } from "next/server";
import { txns, categories } from "@/lib/data";
import { parseQuery, applyFilters } from "@/lib/filtering";
import { toCSV } from "@/lib/csv";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = parseQuery(url.searchParams, categories);
  const filtered = applyFilters(txns, params);
  const csv = toCSV(filtered);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=budgetflow-export.csv",
      "Cache-Control": "no-store",
    },
  });
}
