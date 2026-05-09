import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import {
  SupplierResponse,
  SingleSupplierResponse,
  SupplierQueryParams,
} from "@/types/product";

export function useSuppliersQuery(params: SupplierQueryParams = {}) {
  return useQuery<SupplierResponse, Error>({
    queryKey: ["suppliers", params],
    queryFn: () =>
      apiService.get<SupplierResponse>("/supplier", params as Record<string, unknown>),
  });
}

export function useSupplierDetail(supplierId: string | null) {
  return useQuery<SingleSupplierResponse, Error>({
    queryKey: ["supplier", supplierId],
    queryFn: () =>
      apiService.get<SingleSupplierResponse>(`/supplier/${supplierId}`),
    enabled: !!supplierId,
  });
}
