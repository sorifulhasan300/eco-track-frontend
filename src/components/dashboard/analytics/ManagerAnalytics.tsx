"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  DollarSign,
  Package,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useManagerAnalyticsQuery } from "@/hooks/useManagerAnalyticsQuery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsErrorResponse } from "@/types/analytics";

import OrdersByStatusChart from "./OrdersByStatusChart";
import RevenueTrendChart from "./RevenueTrendChart";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusColor(status: string) {
  const s = status.toLowerCase();
  if (s === "pending") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (s === "completed") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (s === "cancelled") return "bg-red-500/10 text-red-400 border-red-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

export default function ManagerAnalytics() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isFetching } = useManagerAnalyticsQuery();
  const isError = data && !data.success;
  const analytics = data && data.success ? data.data : null;
  const errorResponse = isError ? data as AnalyticsErrorResponse : null;

  if (!user || user.role !== USER_ROLES.MANAGER) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <CheckCircle className="mx-auto h-10 w-10 text-slate-500" />
          <h2 className="text-lg font-semibold text-white">Access Denied</h2>
          <p className="text-sm text-slate-400">
            This page is restricted to managers.
          </p>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["analytics/manager"] });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-emerald-500/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-32 w-full rounded-xl bg-emerald-500/10"
            />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[350px] w-full rounded-xl bg-emerald-500/10" />
          <Skeleton className="h-[350px] w-full rounded-xl bg-emerald-500/10" />
        </div>
      </div>
    );
  }

  // Display error card if API returns error response
  if (isError && errorResponse) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Manager Analytics
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Track orders, revenue, and inventory performance.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
            className="border-emerald-500/20 bg-white/5 text-white hover:bg-white/10 hover:text-white w-fit"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        <Card className="border-red-500/20 bg-red-500/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-white">Analytics Error</CardTitle>
                <CardDescription className="text-slate-400">
                  Unable to load analytics data
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-red-500/10 bg-red-500/5 p-4">
              <p className="text-sm text-red-300 leading-relaxed">
                {errorResponse.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Orders",
      value: analytics?.statsCards?.totalOrders ?? 0,
      icon: ShoppingCart,
      iconColor: "text-emerald-400",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.statsCards?.totalRevenue ?? 0),
      icon: DollarSign,
      iconColor: "text-emerald-400",
    },
    {
      title: "Pending Orders",
      value: analytics?.statsCards?.pendingOrders ?? 0,
      icon: Clock,
      iconColor: "text-amber-400",
    },
    {
      title: "Completed Orders",
      value: analytics?.statsCards?.completedOrders ?? 0,
      icon: CheckCircle,
      iconColor: "text-blue-400",
    },
    {
      title: "Cancelled Orders",
      value: analytics?.statsCards?.cancelledOrders ?? 0,
      icon: XCircle,
      iconColor: "text-red-400",
    },
    {
      title: "Total Products",
      value: analytics?.statsCards?.totalProducts ?? 0,
      icon: Package,
      iconColor: "text-purple-400",
    },
    {
      title: "Low Stock Items",
      value: analytics?.statsCards?.lowStockItems ?? 0,
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    {
      title: "Avg Order Value",
      value: formatCurrency(analytics?.statsCards?.averageOrderValue ?? 0),
      icon: TrendingUp,
      iconColor: "text-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Manager Analytics
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-400">
              Track orders, revenue, and inventory performance.
            </p>
            {analytics?.generatedAt && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3 w-3" />
                {new Date(analytics.generatedAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isFetching}
          className="border-emerald-500/20 bg-white/5 text-white hover:bg-white/10 hover:text-white w-fit"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="border-emerald-500/10 bg-slate-900/50 backdrop-blur"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {card.title}
                </CardTitle>
                <Icon className={`size-4 ${card.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {isFetching && !analytics ? (
                    <Skeleton className="h-8 w-20 bg-emerald-500/10" />
                  ) : (
                    card.value
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Orders by Status Bar Chart */}
        <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-5 text-emerald-400" />
              <CardTitle className="text-white">Orders by Status</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Distribution of orders by their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching && !analytics ? (
              <Skeleton className="h-[350px] w-full bg-emerald-500/10 rounded-lg" />
            ) : analytics?.barChart?.ordersByStatus?.length ? (
              <OrdersByStatusChart
                data={analytics.barChart.ordersByStatus}
              />
            ) : (
              <div className="flex h-[350px] items-center justify-center">
                <p className="text-sm text-slate-500">No order data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-400" />
              <CardTitle className="text-white">Revenue Trend</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Daily revenue and orders over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching && !analytics ? (
              <Skeleton className="h-[350px] w-full bg-emerald-500/10 rounded-lg" />
            ) : analytics?.graphChart?.revenueTrend?.length ? (
              <RevenueTrendChart data={analytics.graphChart.revenueTrend} />
            ) : (
              <div className="flex h-[350px] items-center justify-center">
                <p className="text-sm text-slate-500">No revenue data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}