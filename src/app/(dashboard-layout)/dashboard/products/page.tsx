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

import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useDeleteProduct } from "@/hooks/useProductMutations";
import ProductForm from "@/components/module/product/ProductForm";
import ProductFilters from "@/components/module/product/ProductFilters";
import DataTable from "@/components/shared/DataTable";
import { getProductColumns } from "@/components/module/product/columns";
import type { ProductQueryParams } from "@/types/product";

function parseNumberParam(value: string | null, defaultValue: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 1 ? defaultValue : n;
}

export default function ProductsPage() {
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
  const [category, setCategory] = useState(
    () => searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState(() => searchParams.get("sortBy") || "title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    () => (searchParams.get("sortOrder") as "asc" | "desc") || "asc"
  );
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    return sort ? [{ id: sort, desc: sortOrder !== "asc" }] : [];
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    const currentString = searchParams.toString();
    if (currentString === lastSyncedRef.current) return;

    setPage(parseNumberParam(searchParams.get("page"), 1));
    setLimit(parseNumberParam(searchParams.get("limit"), 10));
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "title");
    setSortOrder((searchParams.get("sortOrder") as "asc" | "desc") || "asc");
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    setSorting(sort ? [{ id: sort, desc: sortOrder !== "asc" }] : []);

    lastSyncedRef.current = currentString;
  }, [searchParams]);

  const updateUrl = useCallback(
    (values: Record<string, string | number | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (key === "page" && value === 1) ||
          (key === "limit" && value === 10) ||
          (key === "sortBy" && value === "title") ||
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

  // Sync search to URL and reset page
  useEffect(() => {
    updateUrl({ search: search || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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

  const params: ProductQueryParams = {
    page,
    limit,
    ...(search && { searchTerm: search }),
    ...(category && { category }),
    ...(sortBy !== "title" && { sortBy }),
    ...(sortOrder !== "asc" && { sortOrder }),
    ...(sorting.length > 0 && {
      sort: sorting[0].id,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    }),
  };

  const { data, isLoading } = useProductsQuery(params);
  const deleteMutation = useDeleteProduct();

  const products = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit: 10, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

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
    setCategory("");
    setSortBy("title");
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

  const handleEdit = useCallback((productId: string) => {
    setEditProductId(productId);
    setDialogOpen(true);
  }, []);

  const handleDeletePrompt = useCallback((productId: string) => {
    setDeleteProductId(productId);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteProductId) return;
    deleteMutation.mutate(deleteProductId, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        setDeleteProductId(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete product");
        setDeleteProductId(null);
      },
    });
  }, [deleteProductId, deleteMutation]);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setEditProductId(null);
  }, []);

  const columns = useMemo(
    () => getProductColumns({ onEdit: handleEdit, onDelete: handleDeletePrompt }),
    [handleEdit, handleDeletePrompt]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Product Management</h2>
          <p className="text-sm text-slate-400 mt-1">Manage your inventory products</p>
        </div>
        <Button
          onClick={() => {
            setEditProductId(null);
            setDialogOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductFilters
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
        hasActiveFilters={!!(search || category || sortBy !== "title" || sortOrder !== "asc")}
      />

      <DataTable
        columns={columns}
        data={products}
        pageCount={totalPages}
        total={meta.total}
        pagination={pagination}
        sorting={sorting}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        emptyMessage="No products found"
      />

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900 border-emerald-500/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editProductId ? "Edit Product" : "Create Product"}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {editProductId
                ? "Update the product details below."
                : "Fill in the details to create a new product."}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            productId={editProductId}
            onSuccess={handleDialogClose}
            onCancel={handleDialogClose}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteProductId}
        onOpenChange={(open) => !open && setDeleteProductId(null)}
      >
        <DialogContent className="bg-slate-900 border-emerald-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteProductId(null)}
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
