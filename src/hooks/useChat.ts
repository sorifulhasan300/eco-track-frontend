import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";

interface ChatPayload {
  message: string;
}

interface ChatResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: string;
}

export function useChat() {
  return useMutation<ChatResponse, Error, ChatPayload>({
    mutationFn: (data) => apiService.post<ChatResponse>("/chat", data),
  });
}
