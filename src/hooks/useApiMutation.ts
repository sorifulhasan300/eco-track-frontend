import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { apiService } from "@/services/apiService";

export function useApiPost<T, V = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, V>, "mutationFn">,
) {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) => apiService.post<T>(url, data),
    ...options,
  });
}

export function useApiPatch<T, V = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, V>, "mutationFn">,
) {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) => apiService.patch<T>(url, data),
    ...options,
  });
}

export function useApiPut<T, V = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, V>, "mutationFn">,
) {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) => apiService.put<T>(url, data),
    ...options,
  });
}

export function useApiDelete<T>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, void>, "mutationFn">,
) {
  return useMutation<T, Error, void>({
    mutationFn: () => apiService.delete<T>(url),
    ...options,
  });
}
