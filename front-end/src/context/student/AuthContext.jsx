import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. FIX: Export this and rename it to StudentAuthContext
export const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('smartboad_user');
        // Note: For real backend, we usually check for a 'token' here
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('smartboad_user');
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Signup function (Mock)
  const signup = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(), // Ensure ID exists for the hook
      avatar: userData.avatar || 'https://randomuser.me/api/portraits/women/50.jpg',
      joinDate: new Date().toISOString(),
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('smartboad_user', JSON.stringify(newUser));
    
    // For real backend, you would save the token here:
    // localStorage.setItem('token', response.data.token);
    
    return { success: true };
  };

  // Login function (Mock)
  const login = (email, password) => {
    // ... existing mock logic ...
    // NOTE: This mock login does NOT save a Token. 
    // Your Report API calls will likely fail with 401 until you connect this to the Backend.
    
    // Simulating success for now:
    const mockUser = {
        id: 1, // HARDCODED ID FOR TESTING REPORT
        fullName: "Test Student",
        email: email,
        role: "STUDENT"
    };

    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('smartboad_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smartboad_user');
    localStorage.removeItem('token'); // Clear token too
  };

  const value = {
    user: currentUser, // 2. FIX: Map 'currentUser' to 'user' so the hook can read it
    currentUser,       // Keep this for backward compatibility
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
  };

  // 3. FIX: Use StudentAuthContext.Provider
  return <StudentAuthContext.Provider value={value}>{children}</StudentAuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};