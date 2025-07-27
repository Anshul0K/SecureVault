import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/api/auth/register", formData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};

