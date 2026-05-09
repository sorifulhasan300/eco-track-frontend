"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableSortableHeader } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import type { UserDetail, USER_STATUS } from "@/types/product";
import { USER_ROLES } from "@/types/roles";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function getRoleColor(role: USER_ROLES) {
  switch (role) {
    case "ADMIN":
      return "bg-purple-500/10 text-purple-300 border-purple-500/20";
    case "MANAGER":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "STAFF":
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
  }
}

function getStatusColor(status: USER_STATUS) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    case "INACTIVE":
      return "bg-red-500/10 text-red-300 border-red-500/20";
    case "BLOCKED":
      return "bg-orange-500/10 text-orange-300 border-orange-500/20";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
  }
}

interface GetUserColumnsProps {
  onManage: (user: UserDetail) => void;
}

export const getUserColumns = ({
  onManage,
}: GetUserColumnsProps): ColumnDef<UserDetail>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-slate-300">
        ...{row.original.id.slice(-8)}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-white font-medium">
        {row.original.name || "-"}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Email" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-slate-300">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} label="Role" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={getRoleColor(row.original.role)}
      >
        {row.original.role}
      </Badge>
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
      <DataTableSortableHeader column={column} label="Created" />
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
        onClick={() => onManage(row.original)}
        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 h-8 w-8 p-0"
      >
        <Edit className="h-4 w-4" />
      </Button>
    ),
  },
];
