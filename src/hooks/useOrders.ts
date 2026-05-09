import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { OrderPayload, OrderResponse } from "@/types/product";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: (data) =>
      apiService.post<OrderResponse>("/order/create", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
