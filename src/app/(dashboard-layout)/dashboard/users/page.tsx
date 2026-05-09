"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { Search, Filter, X } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(false);

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
          (key === "limit" && value === 10)
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

  const params: UserQueryParams = {
    page,
    limit,
    ...(debouncedSearch && { searchTerm: debouncedSearch }),
    ...(roleFilter && { role: roleFilter }),
    ...(statusFilter && { status: statusFilter }),
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
      setPage(1);
      updateUrl({ role: cleanValue || undefined, page: 1 });
    },
    [updateUrl]
  );

  const handleStatusFilterChange = useCallback(
    (value: string) => {
      const cleanValue = value === "ALL" ? "" : value;
      setStatusFilter(cleanValue);
      setPage(1);
      updateUrl({ status: cleanValue || undefined, page: 1 });
    },
    [updateUrl]
  );

  const clearFilters = useCallback(() => {
    setRoleFilter("");
    setStatusFilter("");
    setPage(1);
    updateUrl({
      role: undefined,
      status: undefined,
      page: 1,
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

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters((prev) => !prev)}
          className={`border-emerald-500/20 text-white hover:bg-emerald-500/10 hover:text-emerald-300 ${
            (roleFilter || statusFilter) ? "bg-emerald-500/20 border-emerald-500/40" : "bg-white/5"
          }`}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {(roleFilter || statusFilter) && (
            <span className="ml-2 h-2 w-2 rounded-full bg-emerald-400" />
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 items-end p-4 rounded-lg border border-emerald-500/10 bg-white/[0.02]">
          <div className="space-y-1.5 min-w-[160px]">
            <Label className="text-xs text-slate-400">Role</Label>
            <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
              <SelectTrigger className="bg-transparent border-emerald-500/20 text-white h-9 w-[160px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="MANAGER">MANAGER</SelectItem>
                <SelectItem value="STAFF">STAFF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 min-w-[160px]">
            <Label className="text-xs text-slate-400">Status</Label>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="bg-transparent border-emerald-500/20 text-white h-9 w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(roleFilter || statusFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-slate-400 hover:text-white hover:bg-white/5 h-9"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}

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
