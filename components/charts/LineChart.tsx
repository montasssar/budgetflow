"use client";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { baseOptions } from "@/lib/charts";

type Props = {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  height?: number;
};

export default function LineChart({ data, options, height = 260 }: Props) {
  return <div style={{ height }}><Line data={data} options={(options ?? baseOptions) as ChartOptions<"line">} /></div>;
}
