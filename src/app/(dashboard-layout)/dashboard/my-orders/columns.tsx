"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableSortableHeader } from "@/components/shared/DataTable";
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

export const getOrderColumns = (): ColumnDef<Order>[] => [
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
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "PENDING"
          ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
          : status === "COMPLETED" || status === "CONFIRMED"
          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
          : status === "CANCELLED"
          ? "bg-red-500/10 text-red-300 border-red-500/20"
          : "bg-slate-500/10 text-slate-300 border-slate-500/20";
      return (
        <span
          className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${color}`}
        >
          {status}
        </span>
      );
    },
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
];
