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
} from "lucide-react";
import type { Supplier } from "@/types/product";
import { DataTableSortableHeader } from "@/components/shared/DataTable";

export interface SupplierColumnsOptions {
  onEdit: (supplierId: string) => void;
  onDelete: (supplierId: string) => void;
}

export function getSupplierColumns({
  onEdit,
  onDelete,
}: SupplierColumnsOptions): ColumnDef<Supplier>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium text-white">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-slate-300">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <span className="text-slate-300">{row.original.contact}</span>
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
      accessorKey: "reliability",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} label="Reliability" />
      ),
      cell: ({ row }) => {
        const reliability = row.original.reliability;
        let colorClass = "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
        if (reliability < 4) {
          colorClass = "bg-red-500/10 text-red-300 border-red-500/20";
        } else if (reliability < 7) {
          colorClass = "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
        }
        return (
          <Badge variant="secondary" className={colorClass}>
            {reliability}/10
          </Badge>
        );
      },
    },
    {
      accessorKey: "basePrice",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} label="Base Price" />
      ),
      cell: ({ row }) => (
        <span className="text-white">
          ${Number(row.original.basePrice).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "deliveryTime",
      header: "Delivery Time",
      cell: ({ row }) => (
        <span className="text-slate-300">{row.original.deliveryTime}</span>
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
