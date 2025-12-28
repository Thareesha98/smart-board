import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/api';

const OwnerAuthContext = createContext(null);

export const OwnerAuthProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  

  // 1. Check for logged-in user on load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user_data');

      if (token && savedUser) {
        try {
          setCurrentOwner(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.clear();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // 2. Login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken, user } = response.data;

      if (user.role !== "OWNER") {
        return { 
          success: false, 
          message: "Access Denied: This portal is for Owners only." 
        };
      }

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user_data', JSON.stringify(user));

      setCurrentOwner(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login Error:', error);
      const msg = error.response?.status === 401 ? "Invalid credentials" : "Login failed";
      return { success: false, message: msg };
    }
  };

  // 3. Signup Step 1: Request OTP
  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/register/request', userData);
      return { success: true, message: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data || 'Registration failed' };
    }
  };

  // 4. Signup Step 2: Verify OTP
  const verifyRegistration = async (email, otp) => {
    try {
      const response = await api.post('/auth/register/verify', { email, otp });
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user_data', JSON.stringify(user));

      setCurrentOwner(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Invalid OTP' };
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentOwner(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const value = { 
    currentOwner, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    signup,
    verifyRegistration 
  };

  return <OwnerAuthContext.Provider value={value}>{children}</OwnerAuthContext.Provider>;
};

export const useOwnerAuth = () => {
  const context = useContext(OwnerAuthContext);
  if (!context) throw new Error('useOwnerAuth must be used within an OwnerAuthProvider');
  return context;
};