"use client";

import styles from "./styles/dashboard.module.css";
import Card from "@/components/Card";
import StatBox from "@/components/StatBox";
import Button from "@/components/Button";
import Filters from "@/components/Filters";
import ResultsAnnouncer from "@/components/ResultsAnnouncer";

import { useMemo } from "react";
import { txns, categories } from "@/lib/data";
import {
  kpis,
  sumByMonth,
  sumByCategory,
  topMerchants,
  formatCurrency,
} from "@/lib/selectors";
import { toLineDataset, toPieDataset, toBarDataset } from "@/lib/charts";
import { applyFilters, parseQuery } from "@/lib/filtering";
import { useSearchParams } from "next/navigation";

import dynamic from "next/dynamic"; // Lazy-load for better UX
import "@/components/charts/Chart"; // Chart.js registration

// Lazy-load non-critical charts
const PieChart = dynamic(() => import("@/components/charts/PieChart"), {
  ssr: false,
  loading: () => <div style={{ height: 300, opacity: 0.6 }}>Loading chart…</div>,
});
const BarChart = dynamic(() => import("@/components/charts/BarChart"), {
  ssr: false,
  loading: () => <div style={{ height: 300, opacity: 0.6 }}>Loading chart…</div>,
});
// Keep line chart eager for performance
import LineChart from "@/components/charts/LineChart";

export default function DashboardClient() {
  const sp = useSearchParams();

  // Read and apply filters
  const filterParams = useMemo(() => parseQuery(sp, categories), [sp]);
  const filtered = useMemo(() => applyFilters(txns, filterParams), [filterParams]);

  // Derive analytics
  const kpiRows = useMemo(() => kpis(filtered), [filtered]);
  const monthly = useMemo(() => sumByMonth(filtered), [filtered]);
  const byCategory = useMemo(() => sumByCategory(filtered), [filtered]);
  const merchants = useMemo(() => topMerchants(filtered, 5), [filtered]);

  // Prepare chart datasets
  const lineData = useMemo(() => toLineDataset(monthly), [monthly]);
  const pieData = useMemo(() => toPieDataset(byCategory), [byCategory]);
  const barData = useMemo(() => toBarDataset(merchants), [merchants]);

  const [net, income, expenses] = kpiRows;

  // Preserve filters in CSV download
  const query = sp.toString();
  const csvUrl = `/export.csv${query ? `?${query}` : ""}`;

  return (
    <div className={styles.grid}>
      <ResultsAnnouncer count={filtered.length} />

      {/* Header */}
      <div
        className="span12"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h1 style={{ margin: 0 }}>Dashboard</h1>

        {/* ✅ CSV Export Button */}
        <a href={csvUrl} download style={{ textDecoration: "none" }}>
          <Button>Download CSV</Button>
        </a>
      </div>

      {/* Filters */}
      <div className="span12">
        <Card title="Filters">
          <Filters categories={categories} />
        </Card>
      </div>

      {/* KPI Overview */}
      <div className="span12">
        <Card>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <StatBox
              label={net.label}
              value={formatCurrency(Number(net.value))}
              delta={net.delta}
            />
            <StatBox
              label={income.label}
              value={formatCurrency(Number(income.value))}
            />
            <StatBox
              label={expenses.label}
              value={formatCurrency(Number(expenses.value))}
            />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="span12">
        <Card title="Monthly Income / Expenses / Net">
          {monthly.length ? <LineChart data={lineData} height={300} /> : <Empty />}
        </Card>
      </div>

      <div className="span6">
        <Card title="Category Breakdown">
          {byCategory.length ? <PieChart data={pieData} height={300} /> : <Empty />}
        </Card>
      </div>

      <div className="span6">
        <Card title="Top Merchants">
          {merchants.length ? <BarChart data={barData} height={300} /> : <Empty />}
        </Card>
      </div>
    </div>
  );
}

function Empty() {
  return <p style={{ opacity: 0.7, margin: 0 }}>No data for the current filters.</p>;
}
