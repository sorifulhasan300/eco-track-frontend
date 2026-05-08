import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";

export function useApiQuery<T>(
  queryKey: string[],
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<
    UseQueryOptions<T, Error, T, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<T, Error, T, string[]>({
    queryKey,
    queryFn: () => apiService.get<T>(url, params),
    ...options,
  });
}
