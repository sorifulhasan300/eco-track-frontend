import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cookieAuth } from "@/lib/cookies";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
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
        set({ user, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        cookieAuth.removeToken();
        set({ user: null, isAuthenticated: false, isLoading: false });
      },
      initialize: () => {
        const token = cookieAuth.getToken();
        const { user } = get();
        if (!token && user) {
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
