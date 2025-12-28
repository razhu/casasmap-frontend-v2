import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/graphql/generated";

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: Partial<User>, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
