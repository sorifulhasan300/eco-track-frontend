export interface LowStockItem {
  name: string;
  stockLevel: number;
  category: string;
}

export interface CategoryDistribution {
  category: string;
  productCount: number;
}

export interface KeyMetrics {
  totalProducts: number;
  totalRevenue: number;
  lowStockCount: number;
  totalCategories: number;
}

export interface BusinessHealthSummary {
  overallStatus: "Critical" | "Healthy" | "Warning" | string;
  summary: string;
  keyMetrics: KeyMetrics;
}

export interface CriticalInventoryAlert {
  severity: "High" | "Medium" | "Low" | string;
  productName: string;
  currentStock: number;
  category: string;
  recommendation: string;
}

export interface SalesGrowthSuggestion {
  title: string;
  description: string;
  expectedImpact: "High" | "Medium" | "Low" | string;
  timeframe: string;
}

export interface AiInsights {
  businessHealthSummary: BusinessHealthSummary;
  criticalInventoryAlerts: CriticalInventoryAlert[];
  salesGrowthSuggestions: SalesGrowthSuggestion[];
}

export interface DataSnapshot {
  totalProducts: number;
  totalRevenue: number;
  lowStockItems: LowStockItem[];
  categoryDistribution: CategoryDistribution[];
}

export interface AnalyticsData {
  generatedAt: string;
  dataSnapshot: DataSnapshot;
  aiInsights: AiInsights;
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: AnalyticsData;
}

export interface AnalyticsErrorResponse {
  success: false;
  message: string;
  errorType: string;
  retryAfter?: number;
}

// Manager Analytics Types
export interface StatsCards {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalProducts: number;
  lowStockItems: number;
  averageOrderValue: number;
}

export interface OrderByStatus {
  status: string;
  count: number;
}

export interface OrderByCategory {
  category: string;
  count: number;
}

export interface TopProduct {
  productName: string;
  orderCount: number;
  revenue: number;
}

export interface BarChart {
  ordersByStatus: OrderByStatus[];
  ordersByCategory: OrderByCategory[];
  topProducts: TopProduct[];
}

export interface RevenueTrend {
  date: string;
  orders: number;
  revenue: number;
}

export interface GraphChart {
  revenueTrend: RevenueTrend[];
}

export interface ManagerAnalyticsData {
  generatedAt: string;
  statsCards: StatsCards;
  barChart: BarChart;
  graphChart: GraphChart;
}

export interface ManagerAnalyticsResponse {
  success: true;
  message: string;
  meta: null;
  data: ManagerAnalyticsData;
}

// Staff Analytics Types
export interface StaffStatsCards {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  lowStockItems: number;
}

export interface StaffOrderByStatus {
  status: string;
  count: number;
}

export interface StaffBarChart {
  ordersByStatus: StaffOrderByStatus[];
}

export interface StaffOrderTrend {
  date: string;
  orders: number;
}

export interface StaffGraphChart {
  ordersTrend: StaffOrderTrend[];
}

export interface StaffAnalyticsData {
  generatedAt: string;
  statsCards: StaffStatsCards;
  barChart: StaffBarChart;
  graphChart: StaffGraphChart;
}

export interface StaffAnalyticsResponse {
  success: true;
  message: string;
  meta: null;
  data: StaffAnalyticsData;
}
