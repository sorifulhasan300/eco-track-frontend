import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { AnalyticsResponse } from "@/types/analytics";

export function useAnalyticsQuery() {
  return useQuery<AnalyticsResponse, Error>({
    queryKey: ["analytics"],
    queryFn: () => apiService.get<AnalyticsResponse>("/analytics"),
    staleTime: 1000 * 60 * 5,
  });
}
