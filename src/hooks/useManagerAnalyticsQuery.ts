import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import {
  ManagerAnalyticsResponse,
  AnalyticsErrorResponse,
} from "@/types/analytics";

export function useManagerAnalyticsQuery() {
  return useQuery<ManagerAnalyticsResponse | AnalyticsErrorResponse, Error>({
    queryKey: ["analytics/manager"],
    queryFn: () =>
      apiService.get<ManagerAnalyticsResponse | AnalyticsErrorResponse>(
        "/analytics/manager"
      ),
    staleTime: 1000 * 60 * 5,
  });
}
