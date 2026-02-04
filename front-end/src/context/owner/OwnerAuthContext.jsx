import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";

const OwnerAuthContext = createContext(null);

export const OwnerAuthProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user_data");

      if (token && userData) {
        const user = JSON.parse(userData);
        if (user.role === "OWNER") {
          setCurrentOwner(user);
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
        }
      }
    } catch {
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { headers: { Authorization: undefined } }
    );

    const { token, refreshToken, user } = res.data;

    if (user.role !== "OWNER") {
      return { success: false, message: "Not owner account" };
    }

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user_data", JSON.stringify(user));
    localStorage.setItem("userId", user.id.toString());

    setCurrentOwner(user);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.clear();
    setCurrentOwner(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <OwnerAuthContext.Provider
      value={{ currentOwner, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => {
  const ctx = useContext(OwnerAuthContext);
  if (!ctx) throw new Error("useOwnerAuth must be used inside OwnerAuthProvider");
  return ctx;
};
