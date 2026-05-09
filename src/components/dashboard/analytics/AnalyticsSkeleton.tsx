"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-emerald-500/10" />
          <Skeleton className="h-4 w-64 bg-emerald-500/10" />
        </div>
        <Skeleton className="h-9 w-24 bg-emerald-500/10" />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between pb-3">
              <Skeleton className="h-4 w-24 bg-emerald-500/10" />
              <Skeleton className="h-5 w-5 rounded-full bg-emerald-500/10" />
            </div>
            <Skeleton className="h-8 w-20 bg-emerald-500/10" />
          </div>
        ))}
      </div>

      {/* AI Insights + Chart */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4 backdrop-blur">
          <Skeleton className="h-5 w-40 bg-emerald-500/10 mb-4" />
          <Skeleton className="h-4 w-full bg-emerald-500/10 mb-2" />
          <Skeleton className="h-4 w-5/6 bg-emerald-500/10" />
        </div>
        <div className="rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4 backdrop-blur">
          <Skeleton className="h-5 w-48 bg-emerald-500/10 mb-4" />
          <Skeleton className="h-[260px] w-full bg-emerald-500/10 rounded-lg" />
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4 backdrop-blur">
        <Skeleton className="h-5 w-56 bg-emerald-500/10 mb-4" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-3/4 bg-emerald-500/10" />
              <Skeleton className="h-4 w-full bg-emerald-500/10" />
              <Skeleton className="h-4 w-5/6 bg-emerald-500/10" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 bg-emerald-500/10" />
                <Skeleton className="h-5 w-20 bg-emerald-500/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
