"use client";

import { useMemo, useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { useProductsQuery } from "@/hooks/useProductsQuery";
import ProductCard from "@/components/module/product/ProductCard";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import QuickOrderModal from "@/components/module/product/QuickOrderModal";
import type { Product, ProductQueryParams } from "@/types/product";

function parseNumberParam(value: string | null, defaultValue: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 1 ? defaultValue : n;
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lastSyncedRef = useRef<string>(searchParams.toString());

  const [page, setPage] = useState(() =>
    parseNumberParam(searchParams.get("page"), 1)
  );
  const [limit, setLimit] = useState(() =>
    parseNumberParam(searchParams.get("limit"), 12)
  );
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState(
    () => searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sortBy") || "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    () => (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
  );

  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);

  const { isAuthenticated, isLoading: authLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authLoading, isAuthenticated]);

  // Sync URL -> state on back/forward
  useEffect(() => {
    const currentString = searchParams.toString();
    if (currentString === lastSyncedRef.current) return;

    setPage(parseNumberParam(searchParams.get("page"), 1));
    setLimit(parseNumberParam(searchParams.get("limit"), 10));
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "createdAt");
    setSortOrder((searchParams.get("sortOrder") as "asc" | "desc") || "desc");

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
          (key === "limit" && value === 10) ||
          (key === "sortBy" && value === "createdAt") ||
          (key === "sortOrder" && value === "desc")
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

  // Sync debounced search to URL
  useEffect(() => {
    updateUrl({ searchTerm: debouncedSearch || undefined, page: 1 });
    setPage(1); // eslint-disable-next-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const params: ProductQueryParams = {
    ...(page !== 1 && { page }),
    ...(limit !== 10 && { limit }),
    ...(debouncedSearch && { searchTerm: debouncedSearch }),
    ...(category && { category }),
    ...(sortBy !== "createdAt" && { sortBy }),
    ...(sortOrder !== "desc" && { sortOrder }),
  };

  const { data, isLoading } = useProductsQuery(params);

  const products = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit: 10, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / (meta.limit || 10)));

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
    },
    []
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      setPage(1);
      updateUrl({ category: value || undefined, page: 1 });
    },
    [updateUrl]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      setSortBy(value);
      setPage(1);
      updateUrl({ sortBy: value, page: 1 });
    },
    [updateUrl]
  );

  const handleSortOrderChange = useCallback(
    (value: "asc" | "desc") => {
      setSortOrder(value);
      setPage(1);
      updateUrl({ sortOrder: value, page: 1 });
    },
    [updateUrl]
  );

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
    setLimit(10);
    updateUrl({
      searchTerm: undefined,
      category: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: undefined,
      limit: undefined,
    });
  }, [updateUrl]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateUrl({ page: newPage });
    },
    [updateUrl]
  );

  const handleQuickOrder = useCallback((product: Product) => {
    setQuickOrderProduct(product);
    setQuickOrderOpen(true);
  }, []);

  const handleQuickOrderClose = useCallback(() => {
    setQuickOrderOpen(false);
    setQuickOrderProduct(null);
  }, []);

  const handleView = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, [router]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080f1e]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f1e] py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse our inventory and place orders directly
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search by title..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
            />
          </div>

          <Select
            value={category || "all"}
            onValueChange={(val) => handleCategoryChange(val === "all" ? "" : val)}
          >
            <SelectTrigger className="w-[180px] bg-transparent border-emerald-500/20 text-white">
              <SlidersHorizontal className="mr-2 h-4 w-4 text-slate-500" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={handleSortByChange}
          >
            <SelectTrigger className="w-[140px] bg-transparent border-emerald-500/20 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="stockLevel">Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(val: "asc" | "desc") => handleSortOrderChange(val)}
          >
            <SelectTrigger className="w-[100px] bg-transparent border-emerald-500/20 text-white">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectContent>
          </Select>

          {(search || category || sortBy !== "createdAt" || sortOrder !== "desc") && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="border-red-500/20 text-red-300 bg-red-500/5 hover:bg-red-500/10"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: limit }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[320px] w-full rounded-xl bg-emerald-500/10"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-white">No products found</h3>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickOrder={handleQuickOrder}
                onView={handleView}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <span className="text-sm text-slate-400">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, meta.total)} of {meta.total} products
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                className="border-emerald-500/20 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                      className={
                        page === pageNum
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "border-emerald-500/20 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="border-emerald-500/20 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Quick Order Modal */}
        <QuickOrderModal
          product={quickOrderProduct}
          open={quickOrderOpen}
          onOpenChange={handleQuickOrderClose}
        />
      </div>
    </div>
  );
}

function ProductsFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080f1e]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsPageContent />
    </Suspense>
  );
}
