import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService, ProfileUpdatePayload, ProfileResponse } from "@/services/apiService";
import { useAuthStore } from "@/store/useAuthStore";

export const useProfile = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: ProfileUpdatePayload) => apiService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      // Update the profile cache
      queryClient.setQueryData(["profile"], updatedProfile);
      
      // Update the auth store with the new user data
      setAuth(updatedProfile, localStorage.getItem("auth-storage") ? 
        JSON.parse(localStorage.getItem("auth-storage")!).state.token : "");
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
};

export const useProfileData = () => {
  const { data: profile, isLoading, error } = useProfile();
  
  return {
    profile,
    isLoading,
    error,
  };
};
