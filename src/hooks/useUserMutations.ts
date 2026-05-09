import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { UsersResponse, ManageUserPayload } from "@/types/product";

export function useManageUser() {
  const queryClient = useQueryClient();

  return useMutation<UsersResponse, Error, { userId: string; data: ManageUserPayload }>({
    mutationFn: ({ userId, data }) =>
      apiService.patch<UsersResponse>(`/user/manage/${userId}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.refetchQueries({ queryKey: ["users"], type: "active" });
    },
  });
}
