import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL; // ✅ CRA-style




// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // only if your backend uses cookies
});

// Request Interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from context
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response && error.response.status === 401) {
      // You can trigger logout or redirect here
      console.warn("Unauthorized! Token might be expired.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
