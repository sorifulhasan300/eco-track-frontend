"use client";

import {
  useReactTable,
  getCoreRowModel,
  type SortingState,
  type PaginationState,
  type ColumnDef,
  type Column,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;
  total: number;
  pagination: PaginationState;
  sorting: SortingState;
  isLoading: boolean;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  onSortingChange: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export default function DataTable<TData>({
  columns,
  data,
  pageCount,
  total,
  pagination,
  sorting,
  isLoading,
  onPaginationChange,
  onSortingChange,
  globalFilter = "",
  onGlobalFilterChange,
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    manualSorting: true,
    manualFiltering: true,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onPaginationChange,
    onSortingChange,
  });

  const skeletonRowsCount = pagination.pageSize;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const currentPage = pagination.pageIndex + 1;
    const pages: (number | string)[] = [];
    
    if (pageCount <= 7) {
      // Show all pages if total pages is 7 or less
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(pageCount - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < pageCount - 2) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(pageCount);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-4">
      {onGlobalFilterChange && (
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
          />
        </div>
      )}

      <div className="rounded-lg border border-emerald-500/10 bg-slate-900/50 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-emerald-500/10 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-slate-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: skeletonRowsCount }).map((_, i) => (
                <TableRow key={i} className="border-emerald-500/10">
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full bg-emerald-500/10" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-emerald-500/10 hover:bg-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Page {pagination.pageIndex + 1} of {pageCount} · {total} total
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => (
                page === "..." ? (
                  <span key={`ellipsis-${index}-${page}`} className="px-2 text-slate-400">
                    ...
                  </span>
                ) : (
                  <Button
                    key={`page-${page}`}
                    variant={pagination.pageIndex + 1 === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(Number(page) - 1)}
                    className={
                      pagination.pageIndex + 1 === page
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "border-emerald-500/30 text-white bg-white/5 hover:bg-white/10"
                    }
                  >
                    {page}
                  </Button>
                )
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
}

export function DataTableSortableHeader<TData>({
  column,
  label,
}: SortableHeaderProps<TData>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-slate-400 hover:text-white hover:bg-white/5 -ml-2"
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-1 h-3 w-3" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-1 h-3 w-3" />
      ) : (
        <ArrowUpDown className="ml-1 h-3 w-3" />
      )}
    </Button>
  );
}
