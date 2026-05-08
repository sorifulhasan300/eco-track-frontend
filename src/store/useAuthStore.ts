import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cookieAuth } from "@/lib/cookies";
import { USER_ROLES } from "@/types/roles";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: USER_ROLES;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setAuth: (user, token) => {
        cookieAuth.setToken(token);
        cookieAuth.setRole(user.role);
        set({ user, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        cookieAuth.removeToken();
        cookieAuth.removeRole();
        set({ user: null, isAuthenticated: false, isLoading: false });
      },
      initialize: () => {
        const token = cookieAuth.getToken();
        const { user } = get();
        if (!token && user) {
          cookieAuth.removeRole();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } else if (token && user) {
          set({ isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
