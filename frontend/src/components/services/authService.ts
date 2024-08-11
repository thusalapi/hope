import api from "../utils/api";
import { User, AuthResponse, TokenPayload } from "../types/auth";
import { jwtDecode } from "jwt-decode";

const AUTH_STORAGE_KEY = "auth_token";
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  const { token, user } = response.data;
  setToken(token);
  return { token, user };
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  api.post("/auth/logout"); // Optionally invalidate the token on the server
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  const { token, user } = response.data;
  setToken(token);
  return { token, user };
};

export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  if (!refreshToken) return null;

  try {
    const response = await api.post<{ token: string }>("/auth/refresh", {
      refreshToken,
    });
    const newToken = response.data.token;
    setToken(newToken);
    return newToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout();
    return null;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/auth/user");
    return response.data;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put<User>("/auth/profile", userData);
  return response.data;
};

export const setToken = (token: string): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const initiateOAuthFlow = (provider: string): void => {
  window.location.href = `${api.defaults.baseURL}/auth/${provider}`;
};

export const handleOAuthCallback = async (
  provider: string,
  code: string
): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>(`/auth/${provider}/callback`, {
    params: { code },
  });
  const { token, user } = response.data;
  setToken(token);
  return { token, user };
};
