import { Skeleton } from "@/components/ui/skeleton";

export default function StaffLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-emerald-500/10 bg-slate-900/50 p-5 space-y-3">
            <Skeleton className="h-4 w-24 bg-emerald-500/10" />
            <Skeleton className="h-8 w-16 bg-emerald-500/10" />
            <Skeleton className="h-3 w-32 bg-emerald-500/10" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/10 bg-slate-900/50 p-5 space-y-4">
          <Skeleton className="h-5 w-32 bg-emerald-500/10" />
          <Skeleton className="h-3 w-48 bg-emerald-500/10" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-emerald-500/10" />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/10 bg-slate-900/50 p-5 space-y-4">
          <Skeleton className="h-5 w-32 bg-emerald-500/10" />
          <Skeleton className="h-3 w-48 bg-emerald-500/10" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-emerald-500/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
