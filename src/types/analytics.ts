export interface LowStockItem {
  id: string;
  title: string;
  stockLevel: number;
}

export interface CategoryDistribution {
  categoryName: string;
  productCount: number;
}

export interface BusinessHealthSummary {
  overallStatus: "Critical" | "Healthy" | "Warning" | string;
  summary: string;
  keyMetrics: {
    totalCategories: number;
  };
}

export interface AiInsights {
  businessHealthSummary: BusinessHealthSummary;
}

export interface SalesGrowthSuggestion {
  title: string;
  description: string;
  expectedImpact: "High" | "Medium" | "Low" | string;
  timeframe: string;
}

export interface DataSnapshot {
  totalProducts: number;
  totalRevenue: number;
}

export interface AnalyticsData {
  dataSnapshot: DataSnapshot;
  lowStockItems: LowStockItem[];
  categoryDistribution: CategoryDistribution[];
  aiInsights: AiInsights;
  salesGrowthSuggestions: SalesGrowthSuggestion[];
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: AnalyticsData;
}
