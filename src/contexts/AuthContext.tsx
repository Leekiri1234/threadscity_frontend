import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/auth.service';

// Define the shape of our auth context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string, fullName: string) => Promise<void>;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await AuthService.checkAuth();
        setIsAuthenticated(isAuth);
        // If we want to get user data, we would do it here
        // For example: if (isAuth) { const userData = await userService.getProfile(); setUser(userData); }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login({ username, password });
      
      // Đặt state ngay lập tức để kích hoạt điều hướng
      setIsAuthenticated(true);
      
      // Thêm debug log
      console.log('Login successful, setting isAuthenticated to true');
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string, fullName: string) => {
    try {
      const response = await AuthService.register({ username, email, password, fullName });
      // Note: You might want to auto-login after registration or redirect
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => React.useContext(AuthContext);