import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { SupplierResponse } from "@/types/product";

export function useSuppliers() {
  return useQuery<SupplierResponse, Error>({
    queryKey: ["suppliers"],
    queryFn: () => apiService.get<SupplierResponse>("/supplier"),
  });
}
