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

// Get user profile
export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData: {
  name: string;
  email: string;
  batch: string;
  subGroup: string;
}) => {
  try {
    const response = await api.put("/profile", {
      ...profileData,
      batch: profileData.batch || "",
      subGroup: profileData.subGroup || "1.1",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Create new user profile
export const createProfile = async (profileData: {
  googleId: string;
  name: string;
  email: string;
  accessToken: string;
  batch?: string;
  subGroup?: string;
}) => {
  try {
    const response = await api.post("/profile", {
      ...profileData,
      batch: profileData.batch || "",
      subGroup: profileData.subGroup || "1.1",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

// Delete user profile
export const deleteProfile = async () => {
  try {
    const response = await api.delete("/profile");
    return response.data;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};
