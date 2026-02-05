import { create } from "zustand";

interface AuthState {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  message: string | null;
  isAuthenticated: boolean;

  login: (payload: {
    user: any;
    accessToken: string;
    refreshToken: string;
  }) => void;

  logout: () => void;
  setMessage: (msg: string | null) => void;
  setUser: (user: any) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  message: null,
  isAuthenticated: false,

  hydrate: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (accessToken && refreshToken && user) {
      set({
        accessToken,
        refreshToken,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },
  login: ({ user, accessToken, refreshToken }) => {
    console.log("Storing tokens:", {
      accessToken: accessToken?.slice(0, 20) + "...",
      refreshToken: refreshToken?.slice(0, 20) + "...",
    });

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Tokens stored in localStorage");
  },

  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      message: null,
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  setMessage: (msg) => set({ message: msg }),
}));
