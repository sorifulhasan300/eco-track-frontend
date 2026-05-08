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
  FileText,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function ManagerContent() {
  const user = useAuthStore((s) => s.user);

  return (
    <RoleSlotGuard allowedRole={USER_ROLES.MANAGER}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Inventory Status
              </CardTitle>
              <Package className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3,210</div>
              <p className="text-xs text-slate-400">12 items low stock</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Pending Reports
              </CardTitle>
              <FileText className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <p className="text-xs text-slate-400">3 due this week</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Staff Online
              </CardTitle>
              <UserCheck className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8/12</div>
              <p className="text-xs text-slate-400">4 on leave today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-400" />
                Alerts & Notifications
              </CardTitle>
              <CardDescription className="text-slate-400">
                Issues requiring manager attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Warehouse B temperature spike", severity: "high" },
                { label: "Delivery delayed by 2 hours", severity: "medium" },
                { label: "New compliance report due", severity: "low" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border border-white/5 px-3 py-2"
                >
                  <div
                    className={`size-2 rounded-full ${
                      item.severity === "high"
                        ? "bg-red-500"
                        : item.severity === "medium"
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  <span className="text-sm text-slate-300 flex-1">{item.label}</span>
                  <span className="text-xs text-slate-500 uppercase">{item.severity}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Completed This Week
              </CardTitle>
              <CardDescription className="text-slate-400">
                Staff performance summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Inventory audits", count: 24 },
                { label: "Quality checks", count: 18 },
                { label: "Restocking tasks", count: 56 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-white/5 px-3 py-2"
                >
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span className="text-sm font-semibold text-emerald-400">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleSlotGuard>
  );
}

export default ManagerContent;
