"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useOrdersQuery } from "@/hooks/useOrdersQuery";
import DataTable from "@/components/shared/DataTable";
import { getOrderColumns } from "./columns";
import type { OrderQueryParams } from "@/types/product";

function parseNumberParam(value: string | null, defaultValue: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 1 ? defaultValue : n;
}

export default function MyOrdersPage() {
  const user = useAuthStore((s) => s.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lastSyncedRef = useRef<string>(searchParams.toString());

  const [page, setPage] = useState(() =>
    parseNumberParam(searchParams.get("page"), 1)
  );
  const [limit, setLimit] = useState(() =>
    parseNumberParam(searchParams.get("limit"), 10)
  );
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    return sort ? [{ id: sort, desc: sortOrder !== "asc" }] : [];
  });

  // Sync URL -> state on back/forward
  useEffect(() => {
    const currentString = searchParams.toString();
    if (currentString === lastSyncedRef.current) return;

    setPage(parseNumberParam(searchParams.get("page"), 1));
    setLimit(parseNumberParam(searchParams.get("limit"), 10));
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    setSorting(sort ? [{ id: sort, desc: sortOrder !== "asc" }] : []);

    lastSyncedRef.current = currentString;
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const updateUrl = useCallback(
    (values: Record<string, string | number | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (key === "page" && value === 1) ||
          (key === "limit" && value === 10)
        ) {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });
      const query = current.toString();
      const newUrl = query ? `${pathname}?${query}` : pathname;
      lastSyncedRef.current = current.toString();
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Sync debounced search to URL and reset page
  useEffect(() => {
    updateUrl({ search: debouncedSearch || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const params: OrderQueryParams = {
    page,
    limit,
    ...(debouncedSearch && { searchTerm: debouncedSearch }),
    ...(sorting.length > 0 && {
      sort: sorting[0].id,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    }),
  };

  const { data, isLoading } = useOrdersQuery(params);

  const orders = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit: 10, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const pagination: PaginationState = { pageIndex: page - 1, pageSize: limit };

  const handlePaginationChange = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      setPage(next.pageIndex + 1);
      setLimit(next.pageSize);
      updateUrl({ page: next.pageIndex + 1, limit: next.pageSize });
    },
    [pagination, updateUrl]
  );

  const handleSortingChange = useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      setPage(1);
      updateUrl({
        sort: next[0]?.id,
        sortOrder: next[0]?.id ? (next[0].desc ? "desc" : "asc") : undefined,
        page: 1,
      });
    },
    [sorting, updateUrl]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
    },
    []
  );

  // RBAC: Only ADMIN and MANAGER
  const allowedRoles = [USER_ROLES.ADMIN, USER_ROLES.MANAGER];
  const userRole = user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Unauthorized</h2>
        <p className="text-slate-400 max-w-md">
          You do not have permission to access the My Orders module.
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  const columns = getOrderColumns();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">My Orders</h2>
        <p className="text-sm text-slate-400 mt-1">
          View your order history and track purchases
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          placeholder="Search by product name or order ID..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
        />
      </div>

      <DataTable
        columns={columns}
        data={orders}
        pageCount={totalPages}
        total={meta.total}
        pagination={pagination}
        sorting={sorting}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        emptyMessage="No orders found"
      />
    </div>
  );
}
