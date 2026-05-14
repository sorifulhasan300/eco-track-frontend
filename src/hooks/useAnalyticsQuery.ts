import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { AnalyticsResponse, AnalyticsErrorResponse } from "@/types/analytics";

export function useAnalyticsQuery() {
  return useQuery<AnalyticsResponse | AnalyticsErrorResponse, Error>({
    queryKey: ["analytics/admin"],
    queryFn: () => apiService.get<AnalyticsResponse | AnalyticsErrorResponse>("/analytics/admin"),
    staleTime: 1000 * 60 * 5,
  });
}
