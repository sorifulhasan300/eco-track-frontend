"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CategoryDistribution } from "@/types/analytics";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

interface CategoryDistributionChartProps {
  data: CategoryDistribution[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-slate-900 px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-white">{payload[0].name}</p>
        <p className="text-xs text-slate-400">
          Products: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export default function CategoryDistributionChart({
  data,
}: CategoryDistributionChartProps) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        name: item.categoryName,
        value: item.productCount,
      })),
    [data]
  );

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value: string) => (
              <span className="text-xs text-slate-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
