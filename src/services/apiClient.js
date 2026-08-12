import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { Accept: "application/json" },
  withCredentials: true, // required for Sanctum cookie-based auth
});

export default apiClient;
