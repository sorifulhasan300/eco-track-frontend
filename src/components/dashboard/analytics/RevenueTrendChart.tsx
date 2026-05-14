"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RevenueTrend } from "@/types/analytics";

interface RevenueTrendChartProps {
  data: RevenueTrend[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; dataKey: string }>;
}) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-slate-900 px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-white mb-1">
          {new Date(data.name).toLocaleDateString()}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-slate-400">
            {entry.dataKey}:{" "}
            {entry.dataKey === "revenue"
              ? `$${entry.value.toFixed(2)}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function RevenueTrendChart({
  data,
}: RevenueTrendChartProps) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        name: item.date,
        orders: item.orders,
        revenue: item.revenue,
      })),
    [data]
  );

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={{ stroke: "#334155" }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
