import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (profileData: {
  name: string;
  email: string;
  batch?: string;
  subgroup?: string;
  department?: string;
}) => {
  const response = await api.put("/profile", profileData);
  return response.data;
};
