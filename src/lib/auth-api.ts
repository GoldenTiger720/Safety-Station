import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./api-config";

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  visit_reason: string;
  visit_date: string;
  created_at: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: Tokens;
}

export interface SignInData {
  email: string;
  password: string;
}

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

// Storage utilities
export const authStorage = {
  setTokens: (tokens: Tokens) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
  },

  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),

  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  refreshAccessToken: async (): Promise<boolean> => {
    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await authApi.refreshToken(refreshToken);
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access);
      return true;
    } catch (error) {
      // Refresh token is invalid, clear all auth data
      authStorage.clearAuth();
      return false;
    }
  },
};

const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
    return apiRequest<{ access: string }>("/api/auth/token/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },

  logout: async (): Promise<{ message: string }> => {
    const refreshToken = authStorage.getRefreshToken();
    return apiRequest<{ message: string }>("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },
};

export const useSignUp = (onSuccessCallback?: (data: AuthResponse) => void) => {
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data: AuthResponse) => {
      authStorage.setTokens(data.tokens);
      authStorage.setUser(data.user);
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
  });
};

export const useSignIn = (onSuccessCallback?: (data: AuthResponse) => void) => {
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data: AuthResponse) => {
      authStorage.setTokens(data.tokens);
      authStorage.setUser(data.user);
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all auth data from localStorage
      authStorage.clearAuth();
      // Redirect to signin page
      window.location.href = '/signin';
    },
    onError: () => {
      // Even if the logout API call fails, clear local data and redirect
      authStorage.clearAuth();
      window.location.href = '/signin';
    },
  });
};