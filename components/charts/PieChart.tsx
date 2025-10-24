"use client";
import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { baseOptions } from "@/lib/charts";

type Props = {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
  height?: number;
};

export default function PieChart({ data, options, height = 260 }: Props) {
  return <div style={{ height }}><Pie data={data} options={(options ?? baseOptions) as ChartOptions<"pie">} /></div>;
}
