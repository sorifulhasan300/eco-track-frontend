import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { OrdersResponse, OrderQueryParams } from "@/types/product";

export function useOrdersQuery(params: OrderQueryParams = {}) {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["orders", params],
    queryFn: () =>
      apiService.get<OrdersResponse>("/order/my-orders", params as Record<string, unknown>),
  });
}
