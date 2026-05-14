"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OrderByStatus } from "@/types/analytics";

const COLORS = {
  Pending: "#f59e0b",
  Completed: "#10b981",
  Cancelled: "#ef4444",
};

interface OrdersByStatusChartProps {
  data: OrderByStatus[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload?: OrderByStatus }>;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-slate-900 px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-white">{payload[0].name}</p>
        <p className="text-xs text-slate-400">Orders: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default function OrdersByStatusChart({
  data,
}: OrdersByStatusChartProps) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        name: item.status,
        value: item.count,
        fill: COLORS[item.status as keyof typeof COLORS] || "#64748b",
      })),
    [data]
  );

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={{ stroke: "#334155" }}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={{ stroke: "#334155" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.1)" }} />
          <Legend
            wrapperStyle={{ paddingTop: "1rem" }}
            iconType="circle"
            formatter={(value: string) => (
              <span className="text-xs text-slate-300">{value}</span>
            )}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
