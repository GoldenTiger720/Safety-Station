import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authStorage } from '@/lib/auth-api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user data on mount
    const storedUser = authStorage.getUser();
    const accessToken = authStorage.getAccessToken();

    if (storedUser && accessToken) {
      setUserState(storedUser);
    }
    setIsLoading(false);
  }, []);

  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData) {
      authStorage.setUser(userData);
    }
  };

  const logout = () => {
    authStorage.clearAuth();
    setUserState(null);
    window.location.href = '/signin';
  };

  const isAuthenticated = !!user && !!authStorage.getAccessToken();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};