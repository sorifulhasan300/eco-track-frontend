"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import RoleSlotGuard from "@/components/dashboard/RoleSlotGuard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  ClipboardList,
  UserCircle,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

function StaffContent() {
  const user = useAuthStore((s) => s.user);

  return (
    <RoleSlotGuard allowedRole={USER_ROLES.STAFF}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Assigned Items
              </CardTitle>
              <Package className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">142</div>
              <p className="text-xs text-slate-400">Under your care</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Open Tasks
              </CardTitle>
              <ClipboardList className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
              <p className="text-xs text-slate-400">2 due today</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Profile Status
              </CardTitle>
              <UserCircle className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Active</div>
              <p className="text-xs text-slate-400">Shift ends at 6:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ClipboardList className="size-4 text-emerald-400" />
                My Tasks
              </CardTitle>
              <CardDescription className="text-slate-400">
                Tasks assigned to you today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Audit Section A inventory", status: "pending", due: "10:00 AM" },
                { label: "Update stock records", status: "done", due: "9:00 AM" },
                { label: "Label new shipments", status: "pending", due: "11:30 AM" },
                { label: "Report damaged units", status: "pending", due: "2:00 PM" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border border-white/5 px-3 py-2"
                >
                  {item.status === "done" ? (
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="size-4 text-slate-500 shrink-0" />
                  )}
                  <span
                    className={`text-sm flex-1 ${
                      item.status === "done" ? "text-slate-500 line-through" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="size-3" />
                    {item.due}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCircle className="size-4 text-emerald-400" />
                Quick Profile
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your account summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.name || user?.email}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>
              <div className="rounded-md border border-white/5 px-3 py-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Department</span>
                  <span className="text-slate-300">Operations</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shift</span>
                  <span className="text-slate-300">Morning (8AM - 6PM)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Supervisor</span>
                  <span className="text-slate-300">Manager</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleSlotGuard>
  );
}

export default StaffContent;
