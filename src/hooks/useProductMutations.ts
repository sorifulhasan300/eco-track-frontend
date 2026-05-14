import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { ProductPayload, SingleProductResponse } from "@/types/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<SingleProductResponse, Error, ProductPayload>({
    mutationFn: (data) =>
      apiService.post<SingleProductResponse>("/product/create-product", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation<SingleProductResponse, Error, ProductPayload>({
    mutationFn: (data) =>
      apiService.patch<SingleProductResponse>(
        `/product/${productId}/update-product`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<SingleProductResponse, Error, string>({
    mutationFn: (id) =>
      apiService.delete<SingleProductResponse>(`/product/${id}/delete-product`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
