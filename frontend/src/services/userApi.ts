import axios from "axios";

const API_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all users
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Create a user
export const createUser = async (userData: any) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Get a user by ID
export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Update a user
export const updateUser = async (id: string, userData: any) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
