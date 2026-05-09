import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { OrderPayload, OrderResponse } from "@/types/product";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: (data) =>
      apiService.post<OrderResponse>("/order/create", data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      await queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      await queryClient.refetchQueries({ queryKey: ["products"], type: "active" });
    },
  });
}
