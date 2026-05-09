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
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

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

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Page {pagination.pageIndex + 1} of {pageCount} · {total} total
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-emerald-500/30 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
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
