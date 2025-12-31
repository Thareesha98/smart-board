import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";
import StudentService from "../../api/student/StudentService";

const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check for logged-in user on load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user_data");

      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);

          // 🔒 Security Check: Ensure the saved user is a STUDENT
          if (user.role === "STUDENT") {
            setCurrentStudent(user);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setCurrentStudent(null);
          }
        } catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.removeItem("user_data");
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // 2. Login
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, refreshToken, user } = response.data;

      if (user.role !== "STUDENT") {
        return {
          success: false,
          message: "Access Denied: This account is not registered as a Student.",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      setCurrentStudent(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      const msg = error.response?.status === 401 ? "Invalid credentials" : "Login failed";
      return { success: false, message: msg };
    }
  };

  // 3. Signup Step 1: Request OTP
  const signup = async (userData) => {
    try {
      const payload = {
        ...userData,
        role: 'STUDENT'
      };

      // 🚀 CRITICAL FIX: Force Authorization header to undefined
      // This ensures the request is sent as "Public" even if an old token exists
      const config = {
        headers: {
          Authorization: undefined 
        }
      };

      // ✅ Using the endpoint you confirmed: /auth/register/request
      const response = await api.post('/auth/register/request', payload, config); 
      
      return { success: true, message: response.data?.message || "OTP sent successfully!" };

    } catch (error) {
      console.error('Signup Error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  // 4. Verify OTP
  const verifyRegistration = async (email, otp) => {
    try {
      const response = await api.post("/auth/register/verify", { email, otp });
      const { token, refreshToken, user } = response.data;

      if (user.role !== "STUDENT") {
        return { success: false, message: "Role mismatch during verification." };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      setCurrentStudent(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data || "Invalid OTP Code" };
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentStudent(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  const value = {
    currentStudent,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
    verifyRegistration,
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) throw new Error("useAuth must be used within a StudentAuthProvider");
  return context;
};
