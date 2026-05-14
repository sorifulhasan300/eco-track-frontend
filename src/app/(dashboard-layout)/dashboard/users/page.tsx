"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import { useManageUser } from "@/hooks/useUserMutations";
import DataTable from "@/components/shared/DataTable";
import { getUserColumns } from "./columns";
import type { UserDetail, UserQueryParams, USER_STATUS } from "@/types/product";

function parseNumberParam(value: string | null, defaultValue: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 1 ? defaultValue : n;
}

export default function UsersManagementPage() {
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

  // Filters
  const [roleFilter, setRoleFilter] = useState(() => searchParams.get("role") || "");
  const [statusFilter, setStatusFilter] = useState(() => searchParams.get("status") || "");
  const [sortBy, setSortBy] = useState(() => searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    () => (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
  );

  // Default sort: createdAt desc
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    if (sort) {
      return [{ id: sort, desc: sortOrder !== "asc" }];
    }
    return [{ id: "createdAt", desc: true }];
  });

  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [newStatus, setNewStatus] = useState<string>("");

  // Sync URL -> state
  useEffect(() => {
    const currentString = searchParams.toString();
    if (currentString === lastSyncedRef.current) return;

    setPage(parseNumberParam(searchParams.get("page"), 1));
    setLimit(parseNumberParam(searchParams.get("limit"), 10));
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    setRoleFilter(searchParams.get("role") || "");
    setStatusFilter(searchParams.get("status") || "");
    setSortBy(searchParams.get("sortBy") || "createdAt");
    setSortOrder((searchParams.get("sortOrder") as "asc" | "desc") || "desc");
    const sort = searchParams.get("sort");
    const sortOrder = searchParams.get("sortOrder");
    setSorting(sort ? [{ id: sort, desc: sortOrder !== "asc" }] : [{ id: "createdAt", desc: true }]);

    lastSyncedRef.current = currentString;
  }, [searchParams]);

  // Debounce search
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
    updateUrl({ search: debouncedSearch || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Sync role filter to URL and reset page
  useEffect(() => {
    updateUrl({ role: roleFilter || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter]);

  // Sync status filter to URL and reset page
  useEffect(() => {
    updateUrl({ status: statusFilter || undefined, page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

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

  const params: UserQueryParams = {
    page,
    limit,
    ...(debouncedSearch && { searchTerm: debouncedSearch }),
    ...(roleFilter && { role: roleFilter }),
    ...(statusFilter && { status: statusFilter }),
    ...(sortBy !== "createdAt" && { sortBy }),
    ...(sortOrder !== "desc" && { sortOrder }),
    ...(sorting.length > 0 && {
      sort: sorting[0].id,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    }),
  };

  const { data, isLoading } = useUsersQuery(params);
  const manageUserMutation = useManageUser();

  const users = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit: 10, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const pagination: PaginationState = { pageIndex: page - 1, pageSize: limit };

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
      const hasSort = next.length > 0 && next[0]?.id;
      const sortId = hasSort ? next[0].id : "createdAt";
      const sortOrder = hasSort ? (next[0].desc ? "desc" : "asc") : "desc";
      setSorting(hasSort ? next : [{ id: "createdAt", desc: true }]);
      setPage(1);
      updateUrl({
        sort: hasSort ? sortId : undefined,
        sortOrder: hasSort ? sortOrder : undefined,
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

  const handleRoleFilterChange = useCallback(
    (value: string) => {
      const cleanValue = value === "ALL" ? "" : value;
      setRoleFilter(cleanValue);
    },
    []
  );

  const handleStatusFilterChange = useCallback(
    (value: string) => {
      const cleanValue = value === "ALL" ? "" : value;
      setStatusFilter(cleanValue);
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
    setRoleFilter("");
    setStatusFilter("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setSorting([]);
    setPage(1);
    updateUrl({
      search: undefined,
      role: undefined,
      status: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: undefined,
    });
  }, [updateUrl]);

  const handleManage = useCallback((userDetail: UserDetail) => {
    setSelectedUser(userDetail);
    setNewRole(userDetail.role);
    setNewStatus(userDetail.status);
    setManageDialogOpen(true);
  }, []);

  const handleConfirmManage = useCallback(() => {
    if (!selectedUser) return;

    const payload: { status?: USER_STATUS; role?: USER_ROLES } = {};
    if (newStatus && newStatus !== selectedUser.status) {
      payload.status = newStatus as USER_STATUS;
    }
    if (newRole && newRole !== selectedUser.role) {
      payload.role = newRole as USER_ROLES;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to apply");
      setManageDialogOpen(false);
      setSelectedUser(null);
      return;
    }

    manageUserMutation.mutate(
      {
        userId: selectedUser.id,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          setManageDialogOpen(false);
          setSelectedUser(null);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update user");
        },
      }
    );
  }, [selectedUser, newRole, newStatus, manageUserMutation]);

  // RBAC: Only ADMIN
  const userRole = user?.role;

  if (userRole !== USER_ROLES.ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Unauthorized</h2>
        <p className="text-slate-400 max-w-md">
          You do not have permission to access the User Management module.
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  const columns = getUserColumns({ onManage: handleManage });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">User Management</h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage all users and their roles
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
          />
        </div>

        <Select value={roleFilter || "ALL"} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-[180px] bg-transparent border-emerald-500/20 text-white">
            <SlidersHorizontal className="mr-2 h-4 w-4 text-slate-500" />
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MANAGER">Manager</SelectItem>
            <SelectItem value="STAFF">Staff</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter || "ALL"} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-[180px] bg-transparent border-emerald-500/20 text-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={handleSortByChange}>
          <SelectTrigger className="w-[140px] bg-transparent border-emerald-500/20 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
            <SelectItem value="createdAt">Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={handleSortOrderChange}>
          <SelectTrigger className="w-[100px] bg-transparent border-emerald-500/20 text-white">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>

        {(search || roleFilter || statusFilter || sortBy !== "createdAt" || sortOrder !== "desc") && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="border-red-500/20 text-red-300 bg-red-500/5 hover:bg-red-500/10"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={users}
        pageCount={totalPages}
        total={meta.total}
        pagination={pagination}
        sorting={sorting}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        emptyMessage="No users found"
      />

      {/* Manage User Dialog */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="bg-slate-900 border-emerald-500/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Manage User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update role or status for {selectedUser?.name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="bg-transparent border-emerald-500/20 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="MANAGER">MANAGER</SelectItem>
                  <SelectItem value="STAFF">STAFF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="bg-transparent border-emerald-500/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setManageDialogOpen(false);
                setSelectedUser(null);
              }}
              className="border-emerald-500/20 text-white bg-white/5 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmManage}
              disabled={
                manageUserMutation.isPending ||
                (newRole === selectedUser?.role && newStatus === selectedUser?.status)
              }
              className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-slate-700 disabled:text-slate-400"
            >
              {manageUserMutation.isPending
                ? "Updating..."
                : "Update User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
