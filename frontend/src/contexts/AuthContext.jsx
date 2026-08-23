/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "sourdoughlife-authenticated";

function getInitialAuthState() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState);

  function signIn(email, password) {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    return true;
  }

  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
