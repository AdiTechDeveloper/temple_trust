import { createContext, useContext, useState, useCallback } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfile as updateProfileApi,
} from "../services/authService";

const AuthContext = createContext(null);

const STORAGE_KEY = "temple_trust_auth";

function getStoredAuth() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {

  const storedAuth = getStoredAuth();

  const [user, setUser] = useState(storedAuth?.user || null);
  const [token, setToken] = useState(storedAuth?.token || null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // ===========================
  // REGISTER
  // ===========================

  const register = useCallback(async (formData) => {

    setLoading(true);
    setError(null);

    try {

      const response = await registerUser(formData);

      return response.data;

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  }, []);


  // ===========================
  // LOGIN
  // ===========================

  const login = useCallback(async (credentials) => {

    setLoading(true);
    setError(null);

    try {

      const response = await loginUser(credentials);

      const { user, token } = response.data;

      // IMPORTANT
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user,
          token,
        })
      );

      setUser(user);
      setToken(token);

      return response.data;

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  }, []);


  // ===========================
  // UPDATE PROFILE
  // ===========================

  const updateProfile = useCallback(async (formData) => {

    setLoading(true);
    setError(null);

    try {

      const response = await updateProfileApi(formData);

      console.log("PROFILE UPDATE RESPONSE:", response.data);

      const updatedUser =
        response.data?.user ||
        response.data;

      // Update React state
      setUser(updatedUser);

      // Get existing authentication
      const stored = getStoredAuth();

      // Update localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: updatedUser,
          token: stored?.token || token,
        })
      );

      return response.data;

    } catch (err) {

      console.error(
        "Profile update error:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
        "Profile update failed."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  }, [token]);


  // ===========================
  // LOGOUT
  // ===========================

  const logout = useCallback(async () => {

    try {

      if (token) {
        await logoutUser();
      }

    } catch (e) {

      console.log("Logout API error:", e);

    } finally {

      localStorage.removeItem(STORAGE_KEY);

      setUser(null);
      setToken(null);
    }

  }, [token]);


  return (
    <AuthContext.Provider
      value={{
        user,
        token,

        loading,
        error,

        register,
        login,
        updateProfile,
        logout,

        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}


export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}