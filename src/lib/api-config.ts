const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL environment variable is not set");
}

export const apiConfig = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...apiConfig.headers,
    ...options?.headers,
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
    if (response.status === 401 && token) {
      try {
        // Import authStorage dynamically to avoid circular dependency
        const { authStorage } = await import('./auth-api');
        const refreshSuccess = await authStorage.refreshAccessToken();

        if (refreshSuccess) {
          // Retry the original request with new token
          const newToken = authStorage.getAccessToken();
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };

          const retryResponse = await fetch(url, {
            ...options,
            headers: retryHeaders,
          });

          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
      } catch (refreshError) {
        // Refresh failed, clear auth and redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        window.location.href = '/signin';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }

      // If we get here, token refresh failed
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      window.location.href = '/signin';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}