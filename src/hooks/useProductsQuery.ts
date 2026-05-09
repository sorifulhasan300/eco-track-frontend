import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { ProductResponse, ProductQueryParams, SingleProductResponse } from "@/types/product";

export function useProductsQuery(params: ProductQueryParams = {}) {
  return useQuery<ProductResponse, Error>({
    queryKey: ["products", params],
    queryFn: () =>
      apiService.get<ProductResponse>("/product", params as Record<string, unknown>),
  });
}

export function useProductDetail(productId: string | null) {
  return useQuery<SingleProductResponse, Error>({
    queryKey: ["product", productId],
    queryFn: () =>
      apiService.get<SingleProductResponse>(`/product/${productId}`),
    enabled: !!productId,
  });
}
