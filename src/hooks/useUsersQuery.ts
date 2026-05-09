import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { UsersResponse, UserQueryParams } from "@/types/product";

export function useUsersQuery(params: UserQueryParams = {}) {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", params],
    queryFn: () =>
      apiService.get<UsersResponse>("/user/all-users", params as Record<string, unknown>),
    staleTime: 0,
  });
}
