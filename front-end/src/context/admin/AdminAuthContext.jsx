import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. AUTO-LOGIN ON LOAD ---
  useEffect(() => {
    const checkLoggedIn = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.post("/auth/refresh", {
          refreshToken: refreshToken,
        });

        if (response.status === 200) {
          const { token, refreshToken: newRefreshToken, user } = response.data;

          if (user.role === "ADMIN") {
            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", newRefreshToken);
            localStorage.setItem("user_data", JSON.stringify(user));

            setCurrentAdmin(user);
            setIsAuthenticated(true);
          } else {
            console.warn("Found valid session, but user is not an Admin.");
          }
        }
      } catch (error) {
        console.error("Admin auto-login failed:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // --- 2. LOGIN ---
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, refreshToken, user } = response.data;

      if (user.role !== "ADMIN") {
        return {
          success: false,
          message: "Access Denied: This account is not an Admin account.",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      setCurrentAdmin(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Admin Login Error:", error);
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return { success: false, message };
    }
  };

  // --- 3. LOGOUT ---
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setCurrentAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export default AdminAuthContext;
