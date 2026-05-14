import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import {
  StaffAnalyticsResponse,
  AnalyticsErrorResponse,
} from "@/types/analytics";

export function useStaffAnalyticsQuery() {
  return useQuery<StaffAnalyticsResponse | AnalyticsErrorResponse, Error>({
    queryKey: ["analytics/staff"],
    queryFn: () =>
      apiService.get<StaffAnalyticsResponse | AnalyticsErrorResponse>(
        "/analytics/staff"
      ),
    staleTime: 1000 * 60 * 5,
  });
}
