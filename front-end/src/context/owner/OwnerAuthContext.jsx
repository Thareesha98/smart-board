import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";

const OwnerAuthContext = createContext(null);

export const OwnerAuthProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
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
        // Attempt to refresh the session using the stored Refresh Token
        const response = await api.post("/auth/refresh", {
          refreshToken: refreshToken,
        });

        if (response.status === 200) {
          const { token, refreshToken: newRefreshToken, user } = response.data;

          // ✅ CHECK ROLE: Only log in if it is an OWNER
          if (user.role === "OWNER") {
            // Update storage with fresh tokens
            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", newRefreshToken);
            localStorage.setItem("user_data", JSON.stringify(user));

            setCurrentOwner(user);
            setIsAuthenticated(true);
          } else {
            // If the token belongs to a Student, we do NOT clear storage.
            // We just don't authenticate this specific Owner context.
            console.warn("Found valid session, but user is not an Owner.");
          }
        }
      } catch (error) {
        console.error("Auto-login failed:", error);
        // If the refresh token is expired or invalid (401/403), clear storage
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
    const res = await api.post(
      "/auth/login",
      { email, password },
      { headers: { Authorization: undefined } }
    );

  // --- 3. SIGNUP (Request OTP) ---
  const signup = async (userData) => {
    try {
      const config = { headers: { Authorization: undefined } };
      const response = await api.post(
        "/auth/register/request",
        userData,
        config,
      );
      return { success: true, message: response.data };
    } catch (error) {
      console.error("Owner Signup Error:", error);
      return {
        success: false,
        message: error.response?.data || "Registration failed",
      };
    }
  };

  // --- 4. VERIFY OTP ---
  const verifyRegistration = async (email, otp) => {
    try {
      const response = await api.post("/auth/register/verify", { email, otp });
      const { token, refreshToken, user } = response.data;

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
    // Force redirect or let the protected route handle it
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
