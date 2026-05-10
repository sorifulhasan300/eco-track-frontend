import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080f1e] px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
        <AlertTriangle className="h-10 w-10 text-emerald-400" />
      </div>

      <h1
        className="mb-2 text-7xl font-bold tracking-tight text-white"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        404
      </h1>

      <p
        className="mb-8 max-w-md text-lg text-slate-400"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#080f1e]"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
