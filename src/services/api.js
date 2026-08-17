import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("temple_trust_auth");

    if (auth) {
      try {
        const parsedAuth = JSON.parse(auth);

        if (parsedAuth.token) {
          config.headers.Authorization = `Bearer ${parsedAuth.token}`;
        }
      } catch (error) {
        console.error("Invalid auth storage:", error);
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
  (config) => {
    const auth = localStorage.getItem("temple_trust_auth");

    if (auth) {
      try {
        const parsedAuth = JSON.parse(auth);

        if (parsedAuth.token) {
          config.headers.Authorization = `Bearer ${parsedAuth.token}`;
        }
      } catch (error) {
        console.error("Invalid auth storage:", error);
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);

    if (error.response?.status === 401) {
      console.error("Authentication expired or invalid.");

      localStorage.removeItem("temple_trust_auth");
    }

    return Promise.reject(error);
  },
);

// ===============================
// POOJAS
// ===============================

export const getPujas = async () => {
  try {
    const response = await api.get("/admin/poojas");

    // console.log("Pooja API Response:", response.data);

    return response.data.poojas || [];
  } catch (error) {
    console.error("Error fetching pujas:", error);
    // console.error("Status:", error.response?.status);
    // console.error("Response:", error.response?.data);

    throw error;
  }
};

// ===============================
// PUJA BOOKINGS & SLOTS
// ===============================

/**
 * Fetch available time slots for a specific puja and date
 */
export const getAvailableSlots = async (pujaId, bookingDate) => {
  try {
    const response = await api.get("/puja/slots", {
      params: {
        puja_id: pujaId,
        booking_date: bookingDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};

/**
 * Book a puja (Auto-registers user if mobile doesn't exist)
 */
export const bookPuja = async (bookingData) => {
  try {
    const response = await api.post("/puja/book", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error booking puja:", error);
    throw error;
  }
};

// ===============================
// LOGOUT
// ===============================

export const logoutUser = () => {
  return api.post("/logout");
};

export default api;
