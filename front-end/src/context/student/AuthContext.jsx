import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/api'; // Import your Axios instance

// 1. Export the Context correctly
export const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for BOTH User and Token
        const storedUser = localStorage.getItem('smartboad_user');
        const token = localStorage.getItem('token'); 
        
        if (storedUser && token) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          // If token is missing, user is not logged in
          handleLogoutCleanup();
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        handleLogoutCleanup();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // --- REAL LOGIN FUNCTION ---
  const login = async (email, password) => {
    try {
      // 1. Call your Spring Boot Backend
      // Matches AuthController: @PostMapping("/login")
      const response = await api.post('/auth/login', { email, password });
      
      const { token, refreshToken, user } = response.data;

      // 2. Save Tokens & User Data
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('smartboad_user', JSON.stringify(user));

      // 3. Update State
      setCurrentUser(user);
      setIsAuthenticated(true);

      return { success: true };

    } catch (error) {
      console.error("Login failed:", error);
      
      // Handle different error types
      let message = "Login failed. Please try again.";
      if (error.response) {
        if (error.response.status === 401) message = "Invalid email or password.";
        else if (error.response.status === 404) message = "User not found.";
      }
      
      return { success: false, message };
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    handleLogoutCleanup();
  };

  // Helper to clear everything
  const handleLogoutCleanup = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smartboad_user');
    localStorage.removeItem('smartboad_credentials');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  // --- SIGNUP (You can update this later similarly) ---
  const signup = async (userData) => {
     // For now, keeping your existing logic or you can connect to /auth/register
     return { success: true }; 
  };

  const value = {
    user: currentUser, // Ensure Hook can access 'user'
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  };

  return <StudentAuthContext.Provider value={value}>{children}</StudentAuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};