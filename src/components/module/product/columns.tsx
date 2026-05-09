"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";
import type { Product } from "@/types/product";
import { DataTableSortableHeader } from "@/components/shared/DataTable";

export interface ProductColumnsOptions {
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export function getProductColumns({
  onEdit,
  onDelete,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.image ? (
            <img
              src={row.original.image}
              alt={row.original.title}
              className="h-8 w-8 rounded object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-emerald-500/10">
              <Package className="h-4 w-4 text-emerald-400" />
            </div>
          )}
          <span className="font-medium text-white">{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} label="Price" />
      ),
      cell: ({ row }) => (
        <span className="text-white">
          ${Number(row.original.price).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "stockLevel",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} label="Stock" />
      ),
      cell: ({ row }) => {
        const stock = row.original.stockLevel;
        return (
          <Badge
            variant="secondary"
            className={
              stock === 0
                ? "bg-red-500/10 text-red-300 border-red-500/20"
                : stock < 10
                  ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                  : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
            }
          >
            {stock}
          </Badge>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-slate-300">{row.original.location}</span>
      ),
    },
    {
      accessorKey: "user.name",
      header: "Created By",
      cell: ({ row }) => (
        <div className="text-slate-300">
          <div className="text-sm">{row.original.user?.name || "—"}</div>
          <div className="text-xs text-slate-500">
            {row.original.user?.email || ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-900 border-emerald-500/20"
          >
            <DropdownMenuItem
              onClick={() => onEdit(row.original.id)}
              className="text-slate-300 focus:bg-emerald-500/10 focus:text-emerald-300"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(row.original.id)}
              className="text-red-400 focus:bg-red-500/10 focus:text-red-300"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
