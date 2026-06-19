import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { decodeJwt, getStoredAuth, setToken } from "../services/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem("TEPI_JWT") ?? null);
  const [user, setUser] = useState(() => getStoredAuth());

  useEffect(() => {
    const storedUser = getStoredAuth();
    setUser(storedUser);
    setTokenState(storedUser ? localStorage.getItem("TEPI_JWT") : null);
  }, []);

  const value = useMemo(() => {
    return {
      token,
      user,
      login: (newToken) => {
        setTokenState(newToken);
        setToken(newToken);
        setUser(decodeJwt(newToken));
      },
      logout: () => {
        setTokenState(null);
        setToken(null);
        setUser(null);
      },
      hasRole: (role) => user?.role === role,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

