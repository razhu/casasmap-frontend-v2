import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/graphql/generated";

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setAuth: (user: Partial<User>, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (user, token, rememberMe = true) => {
        set({ user, token, isAuthenticated: true });

        // Manually handle storage based on rememberMe
        if (typeof window !== "undefined") {
          const authData = JSON.stringify({
            state: { user, token, isAuthenticated: true },
            version: 0,
          });

          if (rememberMe) {
            // Store in localStorage (persists after browser closes)
            localStorage.setItem("auth-storage", authData);
            sessionStorage.removeItem("auth-storage");
          } else {
            // Store in sessionStorage (cleared when browser closes)
            sessionStorage.setItem("auth-storage", authData);
            localStorage.removeItem("auth-storage");
          }
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
          sessionStorage.removeItem("auth-storage");
        }
      },
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        // Check both storages on hydration
        if (typeof window === "undefined") return localStorage;

        // Prefer sessionStorage if it exists (user didn't want to be remembered)
        const sessionData = sessionStorage.getItem("auth-storage");
        if (sessionData) {
          return sessionStorage;
        }

        // Otherwise use localStorage
        return localStorage;
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
