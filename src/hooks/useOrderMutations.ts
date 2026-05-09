import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { OrderResponse, UpdateOrderStatusPayload } from "@/types/product";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, { orderId: string; data: UpdateOrderStatusPayload }>({
    mutationFn: ({ orderId, data }) =>
      apiService.patch<OrderResponse>(`/order/${orderId}/status`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      await queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      await queryClient.refetchQueries({ queryKey: ["all-orders"], type: "active" });
      await queryClient.refetchQueries({ queryKey: ["my-orders"], type: "active" });
    },
  });
}
