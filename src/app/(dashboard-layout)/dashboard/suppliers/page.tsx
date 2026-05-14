"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useSuppliersQuery } from "@/hooks/useSuppliersQuery";
import { useDeleteSupplier } from "@/hooks/useSupplierMutations";
import SupplierForm from "@/components/module/supplier/SupplierForm";
import SupplierFilters from "@/components/module/supplier/SupplierFilters";
import DataTable from "@/components/shared/DataTable";
import { getSupplierColumns } from "@/components/module/supplier/columns";
import type { SupplierQueryParams } from "@/types/product";

function parseNumberParam(value: string | null, defaultValue: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 1 ? defaultValue : n;
}

export default function SuppliersPage() {
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
  const [category, setCategory] = useState(
    () => searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState(() => searchParams.get("sortBy") || "name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    () => (searchParams.get("sortOrder") as "asc" | "desc") || "asc"
  );
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    return sort ? [{ id: sort, desc: sortOrder !== "asc" }] : [];
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState<string | null>(null);
  const [deleteSupplierId, setDeleteSupplierId] = useState<string | null>(null);

  useEffect(() => {
    const currentString = searchParams.toString();
    if (currentString === lastSyncedRef.current) return;

    setPage(parseNumberParam(searchParams.get("page"), 1));
    setLimit(parseNumberParam(searchParams.get("limit"), 10));
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "name");
    setSortOrder((searchParams.get("sortOrder") as "asc" | "desc") || "asc");
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    setSorting(sort ? [{ id: sort, desc: sortOrder !== "asc" }] : []);

    lastSyncedRef.current = currentString;
  }, [searchParams]);

  // Debounce search input: update API/URL 400ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Sync debounced search to URL and reset page
  useEffect(() => {
    updateUrl({ search: debouncedSearch || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Sync category to URL and reset page
  useEffect(() => {
    updateUrl({ category: category || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Sync sorting to URL and reset page
  useEffect(() => {
    updateUrl({
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
      page: 1,
    });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder]);

  const updateUrl = useCallback(
    (values: Record<string, string | number | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (key === "page" && value === 1) ||
          (key === "limit" && value === 10) ||
          (key === "sortBy" && value === "name") ||
          (key === "sortOrder" && value === "asc")
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

  const params: SupplierQueryParams = {
    page,
    limit,
    ...(debouncedSearch && { searchTerm: debouncedSearch }),
    ...(category && { category }),
    ...(sortBy !== "name" && { sortBy }),
    ...(sortOrder !== "asc" && { sortOrder }),
    ...(sorting.length > 0 && {
      sort: sorting[0].id,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    }),
  };

  const { data, isLoading } = useSuppliersQuery(params);
  const deleteMutation = useDeleteSupplier();

  const suppliers = data?.data ?? [];
  const meta = (data?.meta as { page: number; limit: number; total: number } | null) ?? { page: 1, limit: 10, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const categories = useMemo(() => {
    const set = new Set<string>();
    suppliers.forEach((s) => set.add(s.category));
    return Array.from(set);
  }, [suppliers]);

  const pagination: PaginationState = useMemo(
    () => ({ pageIndex: page - 1, pageSize: limit }),
    [page, limit]
  );

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

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
    },
    []
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      setSortBy(value);
    },
    []
  );

  const handleSortOrderChange = useCallback(
    (value: "asc" | "desc") => {
      setSortOrder(value);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("");
    setSortBy("name");
    setSortOrder("asc");
    setSorting([]);
    setPage(1);
    updateUrl({
      search: undefined,
      category: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: undefined,
    });
  }, [updateUrl]);

  const handleEdit = useCallback((supplierId: string) => {
    setEditSupplierId(supplierId);
    setDialogOpen(true);
  }, []);

  const handleDeletePrompt = useCallback((supplierId: string) => {
    setDeleteSupplierId(supplierId);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteSupplierId) return;
    deleteMutation.mutate(deleteSupplierId, {
      onSuccess: () => {
        toast.success("Supplier deleted successfully");
        setDeleteSupplierId(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete supplier");
        setDeleteSupplierId(null);
      },
    });
  }, [deleteSupplierId, deleteMutation]);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setEditSupplierId(null);
  }, []);

  const columns = useMemo(
    () => getSupplierColumns({ onEdit: handleEdit, onDelete: handleDeletePrompt }),
    [handleEdit, handleDeletePrompt]
  );

  // RBAC: Only ADMIN and MANAGER can access
  const allowedRoles = [USER_ROLES.ADMIN, USER_ROLES.MANAGER];
  const userRole = user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Unauthorized</h2>
        <p className="text-slate-400 max-w-md">
          You do not have permission to access the Supplier Management module.
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Supplier Management</h2>
          <p className="text-sm text-slate-400 mt-1">Manage your suppliers and vendor relationships</p>
        </div>
        <Button
          onClick={() => {
            setEditSupplierId(null);
            setDialogOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <SupplierFilters
        search={search}
        category={category}
        categories={categories}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
        onClearFilters={clearFilters}
        hasActiveFilters={!!(search || category || sortBy !== "name" || sortOrder !== "asc")}
      />

      <DataTable
        columns={columns}
        data={suppliers}
        pageCount={totalPages}
        total={meta.total}
        pagination={pagination}
        sorting={sorting}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        emptyMessage="No suppliers found"
      />

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) setEditSupplierId(null);
      }}>
        <DialogContent className="bg-slate-900 border-emerald-500/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editSupplierId ? "Edit Supplier" : "Create Supplier"}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {editSupplierId
                ? "Update the supplier details below."
                : "Fill in the details to create a new supplier."}
            </DialogDescription>
          </DialogHeader>
          <SupplierForm
            supplierId={editSupplierId}
            onSuccess={handleDialogClose}
            onCancel={handleDialogClose}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteSupplierId}
        onOpenChange={(open) => !open && setDeleteSupplierId(null)}
      >
        <DialogContent className="bg-slate-900 border-emerald-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this supplier? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteSupplierId(null)}
              className="border-emerald-500/20 text-white bg-white/5 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
