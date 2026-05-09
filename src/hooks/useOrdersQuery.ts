import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { OrdersResponse, OrderQueryParams } from "@/types/product";

export function useOrdersQuery(params: OrderQueryParams = {}) {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["my-orders", params],
    queryFn: () =>
      apiService.get<OrdersResponse>("/order/my-orders", params as Record<string, unknown>),
    staleTime: 0,
  });
}

export function useAllOrdersQuery(params: OrderQueryParams = {}) {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["all-orders", params],
    queryFn: () =>
      apiService.get<OrdersResponse>("/order/all-orders", params as Record<string, unknown>),
    staleTime: 0,
  });
}
