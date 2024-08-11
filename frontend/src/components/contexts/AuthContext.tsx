import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/auth";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  refreshToken,
  getUser,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const newToken = await refreshToken();
          if (newToken) {
            localStorage.setItem("token", newToken);
            const user = await getUser();
            setUser(user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Auth initialization failed:", error);
          localStorage.removeItem("token");
        }
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await loginService(email, password);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      logoutService();
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { token, user } = await registerService(name, email, password);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
