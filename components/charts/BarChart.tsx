"use client";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { baseOptions } from "@/lib/charts";

type Props = {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
  height?: number;
};

export default function BarChart({ data, options, height = 260 }: Props) {
  return <div style={{ height }}><Bar data={data} options={(options ?? baseOptions) as ChartOptions<"bar">} /></div>;
}
