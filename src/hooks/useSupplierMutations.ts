import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { SupplierPayload, SingleSupplierResponse } from "@/types/product";

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation<SingleSupplierResponse, Error, SupplierPayload>({
    mutationFn: (data) =>
      apiService.post<SingleSupplierResponse>("/supplier/create-supplier", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useUpdateSupplier(supplierId: string) {
  const queryClient = useQueryClient();

  return useMutation<SingleSupplierResponse, Error, SupplierPayload>({
    mutationFn: (data) =>
      apiService.patch<SingleSupplierResponse>(`/supplier/${supplierId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["supplier", supplierId] });
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation<SingleSupplierResponse, Error, string>({
    mutationFn: (id) => apiService.delete<SingleSupplierResponse>(`/supplier/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}
