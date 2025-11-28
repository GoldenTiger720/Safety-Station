const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiConfig = {
  baseURL: API_URL || "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
};

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...apiConfig.headers,
    ...(options?.headers as Record<string, string>),
  };

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle token expiration - try to refresh token
    if (response.status === 401 && token && typeof window !== "undefined") {
      // Clear auth and redirect
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
      window.location.href = "/signin";
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new Error(
      error.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
