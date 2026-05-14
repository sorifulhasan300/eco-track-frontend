"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  DollarSign,
  Package,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  BrainCircuit,
  ShieldCheck,
  Clock,
  Zap,
  AlertCircle,
  Calendar,
  XCircle,
  Timer,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useAnalyticsQuery } from "@/hooks/useAnalyticsQuery";
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

import CategoryDistributionChart from "@/components/dashboard/analytics/CategoryDistributionChart";
import AnalyticsSkeleton from "@/components/dashboard/analytics/AnalyticsSkeleton";
import { AnalyticsErrorResponse } from "@/types/analytics";

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
  if (s === "critical") return "bg-red-500/10 text-red-400 border-red-500/20";
  if (s === "healthy") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (s === "warning") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

function getSeverityColor(severity: string) {
  const s = severity.toLowerCase();
  if (s === "high") return "bg-red-500/10 text-red-400 border-red-500/20";
  if (s === "medium") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (s === "low") return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

function getImpactColor(impact: string) {
  const i = impact.toLowerCase();
  if (i === "high") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (i === "medium") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (i === "low") return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

export default function AdminAnalyticsPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isFetching } = useAnalyticsQuery();
  const isError = data && !data.success;
  const analytics = data && data.success ? data.data : null;
  const errorResponse = isError ? data as AnalyticsErrorResponse : null;

  if (!user || user.role !== USER_ROLES.ADMIN) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <ShieldCheck className="mx-auto h-10 w-10 text-slate-500" />
          <h2 className="text-lg font-semibold text-white">Access Denied</h2>
          <p className="text-sm text-slate-400">
            This page is restricted to administrators.
          </p>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["analytics"] });
  };

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // Display error card if API returns error response
  if (isError && errorResponse) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              AI-Powered Analytics
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-time insights and AI-driven recommendations for your inventory.
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

        {/* Error Card */}
        <Card className="border-red-500/20 bg-red-500/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-white">AI Service Error</CardTitle>
                <CardDescription className="text-slate-400">
                  Unable to generate analytics at this time
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-red-500/10 bg-red-500/5 p-4">
              <p className="text-sm text-red-300 leading-relaxed">
                {errorResponse.message}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-red-500/10 text-red-400 border-red-500/20"
              >
                {errorResponse.errorType === "quota_exceeded"
                  ? "Quota Exceeded"
                  : "Error"}
              </Badge>

              {errorResponse.retryAfter && (
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                >
                  <Timer className="mr-1 size-3" />
                  Retry in {errorResponse.retryAfter} seconds
                </Badge>
              )}
            </div>

            {errorResponse.errorType === "quota_exceeded" && (
              <div className="mt-4 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-300 mb-1">
                      Upgrade for Unlimited Access
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You've reached the daily AI request limit for the free tier.
                      Upgrade to a paid plan for unlimited AI-powered analytics
                      and insights.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Total Products",
      value: analytics?.dataSnapshot?.totalProducts ?? 0,
      icon: Package,
      iconColor: "text-emerald-400",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.dataSnapshot?.totalRevenue ?? 0),
      icon: DollarSign,
      iconColor: "text-emerald-400",
    },
    {
      title: "Low Stock Items",
      value: analytics?.dataSnapshot?.lowStockItems?.length ?? 0,
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    {
      title: "Total Categories",
      value: analytics?.dataSnapshot?.categoryDistribution?.length ?? 0,
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
            AI-Powered Analytics
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-400">
              Real-time insights and AI-driven recommendations for your inventory.
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

      {/* Task 1: Data Snapshot Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
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

      {/* Task 2: AI Business Health Summary */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="size-5 text-emerald-400" />
              <CardTitle className="text-white">AI Business Health</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              AI-generated assessment of your inventory health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Overall Status:</span>
              {isFetching && !analytics ? (
                <Skeleton className="h-6 w-20 bg-emerald-500/10" />
              ) : (
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    analytics?.aiInsights?.businessHealthSummary?.overallStatus ??
                      ""
                  )} capitalize`}
                >
                  {analytics?.aiInsights?.businessHealthSummary?.overallStatus}
                </Badge>
              )}
            </div>
            <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Zap className="size-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-300 mb-1">
                    AI Assistant Insight
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isFetching && !analytics ? (
                      <>
                        <Skeleton className="h-4 w-full bg-emerald-500/10 mb-2" />
                        <Skeleton className="h-4 w-5/6 bg-emerald-500/10" />
                      </>
                    ) : (
                      analytics?.aiInsights?.businessHealthSummary?.summary
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task 3: Category Distribution Chart */}
        <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-400" />
              <CardTitle className="text-white">Category Distribution</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Product count breakdown by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching && !analytics ? (
              <Skeleton className="h-[320px] w-full bg-emerald-500/10 rounded-lg" />
            ) : analytics?.dataSnapshot?.categoryDistribution?.length ? (
              <CategoryDistributionChart
                data={analytics.dataSnapshot.categoryDistribution}
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center">
                <p className="text-sm text-slate-500">No category data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Task 4: Critical Inventory Alerts */}
      <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-red-400" />
            <CardTitle className="text-white">Critical Inventory Alerts</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            AI-generated alerts for items requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isFetching && !analytics
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-emerald-500/10 bg-slate-900/30 p-4 space-y-2"
                  >
                    <Skeleton className="h-5 w-1/2 bg-emerald-500/10" />
                    <Skeleton className="h-4 w-full bg-emerald-500/10" />
                    <Skeleton className="h-4 w-3/4 bg-emerald-500/10" />
                  </div>
                ))
              : analytics?.aiInsights?.criticalInventoryAlerts?.length ? (
                  analytics.aiInsights.criticalInventoryAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-emerald-500/10 bg-slate-900/30 p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-sm font-semibold text-white">
                              {alert.productName}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`${getSeverityColor(
                                alert.severity
                              )} capitalize`}
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                            <span>Stock: {alert.currentStock}</span>
                            <span>Category: {alert.category}</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {alert.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-slate-500">No critical alerts at this time</p>
                  </div>
                )}
          </div>
        </CardContent>
      </Card>

      {/* Task 5: Low Stock Items List */}
      <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-400" />
            <CardTitle className="text-white">Low Stock Items</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Items currently running low on inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isFetching && !analytics
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-emerald-500/10 bg-slate-900/30 p-3"
                  >
                    <Skeleton className="h-5 w-1/3 bg-emerald-500/10" />
                    <Skeleton className="h-5 w-20 bg-emerald-500/10" />
                  </div>
                ))
              :analytics?.dataSnapshot?.lowStockItems?.length ? (
                  analytics.dataSnapshot.lowStockItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-emerald-500/10 bg-slate-900/30 p-3 transition-colors hover:bg-slate-800/30"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-amber-400">
                          {item.stockLevel}
                        </span>
                        <span className="text-xs text-slate-500">in stock</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-slate-500">All items are well-stocked</p>
                  </div>
                )}
          </div>
        </CardContent>
      </Card>

      {/* Task 6: Sales Growth Suggestions */}
      <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-emerald-400" />
            <CardTitle className="text-white">AI Sales Growth Suggestions</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Actionable recommendations to improve sales and inventory performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isFetching && !analytics
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-emerald-500/10 bg-slate-900/30 p-4 space-y-3"
                  >
                    <Skeleton className="h-5 w-3/4 bg-emerald-500/10" />
                    <Skeleton className="h-4 w-full bg-emerald-500/10" />
                    <Skeleton className="h-4 w-5/6 bg-emerald-500/10" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 bg-emerald-500/10" />
                      <Skeleton className="h-5 w-20 bg-emerald-500/10" />
                    </div>
                  </div>
                ))
              : analytics?.aiInsights?.salesGrowthSuggestions?.map((suggestion, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-emerald-500/10 bg-slate-900/30 p-4 space-y-3 transition-colors hover:bg-slate-800/30"
                  >
                    <h4 className="text-sm font-semibold text-white">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {suggestion.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Badge
                        variant="outline"
                        className={`${getImpactColor(
                          suggestion.expectedImpact
                        )} capitalize`}
                      >
                        {suggestion.expectedImpact} Impact
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                      >
                        <Clock className="mr-1 size-3" />
                        {suggestion.timeframe}
                      </Badge>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
