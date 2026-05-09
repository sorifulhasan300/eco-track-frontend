"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableSortableHeader } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import type { Order } from "@/types/product";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function shortenUUID(id: string): string {
  return `...${id.slice(-8)}`;
}

function getProductNames(items: Order["items"]): string {
  if (!items || items.length === 0) return "Unknown Product";
  const titles = items.map((i) => i.product?.title).filter(Boolean);
  if (titles.length === 0) return "Unknown Product";
  if (titles.length === 1) return titles[0] as string;
  return `${titles[0]} +${titles.length - 1} more`;
}

function getTotalQuantity(items: Order["items"]): number {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    case "COMPLETED":
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    case "CANCELLED":
      return "bg-red-500/10 text-red-300 border-red-500/20";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
  }
}

interface GetOrderColumnsProps {
  onStatusUpdate: (order: Order) => void;
}

export const getOrderColumns = ({
  onStatusUpdate,
}: GetOrderColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Order ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-slate-300">
        {shortenUUID(row.original.id)}
      </span>
    ),
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Order Number" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-white font-medium">
        {row.original.orderNumber}
      </span>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Product Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-white">
        {getProductNames(row.original.items)}
      </span>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Quantity" />
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm text-slate-300">
        {getTotalQuantity(row.original.items)}
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Total Price" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-emerald-400">
        ${Number(row.original.totalAmount).toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={getStatusColor(row.original.status)}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-slate-400">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onStatusUpdate(row.original)}
        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 h-8 w-8 p-0"
      >
        <Edit className="h-4 w-4" />
      </Button>
    ),
  },
];
