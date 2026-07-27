import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "temple_trust_member_session";

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NOTE: these currently simulate a network call. Once the Laravel API is live,
  // replace the body with `await apiClient.post("/login", credentials)` etc. —
  // the function signatures components call will not need to change.
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 700));
      if (!email || !password) throw new Error("Email and password are required.");
      const fakeUser = { name: email.split("@")[0], email, memberSince: "2023" };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
      setUser(fakeUser);
      return fakeUser;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 900));
      if (!formData.email || !formData.password) throw new Error("Please fill all required fields.");
      const newUser = { name: formData.fullName, email: formData.email, memberSince: new Date().getFullYear().toString() };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
