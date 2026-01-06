import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('zoe_token');
  });
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('http://13.50.69.253/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.detail || data.msg || 'Login failed' };
      }

      const accessToken = data.access_token;
      setToken(accessToken);
      localStorage.setItem('zoe_token', accessToken);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('zoe_token');
  };

  const fetchProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://13.50.69.253/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
        }
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        await fetchProfile();
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout,
      fetchProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
