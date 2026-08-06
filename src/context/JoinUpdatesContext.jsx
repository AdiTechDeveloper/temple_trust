import { createContext, useContext, useState, useEffect, useCallback } from "react";

const JoinUpdatesContext = createContext(null);

const SESSION_KEY = "temple_trust_join_popup_shown";
const AUTO_OPEN_DELAY_MS = 4000;

export function JoinUpdatesProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = useCallback(() => setIsOpen(true), []);
  const closePopup = useCallback(() => setIsOpen(false), []);

  // Auto-open once per browser session, a few seconds after the visitor lands —
  // gentle enough not to feel like a spam popup, but visible on every page since
  // this provider + popup live inside MainLayout (wraps every route).
 useEffect(() => {
  console.log("JoinUpdatesProvider mounted");

  const alreadyShown = sessionStorage.getItem(SESSION_KEY);
  console.log("alreadyShown:", alreadyShown);

  if (alreadyShown) return;

  const timer = setTimeout(() => {
    console.log("Opening popup...");
    setIsOpen(true);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, AUTO_OPEN_DELAY_MS);

  return () => clearTimeout(timer);
}, []);
  return (
    <JoinUpdatesContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </JoinUpdatesContext.Provider>
  );
}

export function useJoinUpdates() {
  const ctx = useContext(JoinUpdatesContext);
  if (!ctx) throw new Error("useJoinUpdates must be used within a JoinUpdatesProvider");
  return ctx;
}
