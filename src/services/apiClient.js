import axios from "axios";

// Base URL will point to the Laravel API once the backend is live.
// e.g. VITE_API_BASE_URL=https://api.rudreshwartrust.org/api
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { Accept: "application/json" },
  withCredentials: true, // required for Sanctum cookie-based auth
});

export default apiClient;
