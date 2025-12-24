import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('smartboad_user');
        const storedCredentials = localStorage.getItem('smartboad_credentials');
        
        if (storedUser && storedCredentials) {
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
        localStorage.removeItem('smartboad_credentials');
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        // Ensure loading completes
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Signup function
  const signup = (userData) => {
    const newUser = {
      ...userData,
      avatar: userData.avatar || 'https://randomuser.me/api/portraits/women/50.jpg',
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
      },
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('smartboad_user', JSON.stringify(newUser));
    
    // Store credentials for login
    const credentials = {
      email: userData.email,
      password: userData.password,
    };
    localStorage.setItem('smartboad_credentials', JSON.stringify(credentials));
    
    return { success: true };
  };

  // Login function
  const login = (email, password) => {
    const storedCredentials = localStorage.getItem('smartboad_credentials');
    const storedUser = localStorage.getItem('smartboad_user');
    
    if (storedCredentials && storedUser) {
      try {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.email === email && credentials.password === password) {
          const userData = JSON.parse(storedUser);
          userData.lastLogin = new Date().toISOString();
          
          setCurrentUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('smartboad_user', JSON.stringify(userData));
          
          return { success: true };
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smartboad_user');
    localStorage.removeItem('smartboad_credentials');
  };

  // Update profile function
  const updateProfile = (updatedData) => {
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    localStorage.setItem('smartboad_user', JSON.stringify(updated));
  };

  // Update avatar function
  const updateAvatar = (avatarUrl) => {
    const updated = { ...currentUser, avatar: avatarUrl };
    setCurrentUser(updated);
    localStorage.setItem('smartboad_user', JSON.stringify(updated));
  };

  // Update preferences function
  const updatePreferences = (preference, value) => {
    const updated = {
      ...currentUser,
      preferences: {
        ...currentUser.preferences,
        [preference]: value,
      },
    };
    setCurrentUser(updated);
    localStorage.setItem('smartboad_user', JSON.stringify(updated));
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    updateProfile,
    updateAvatar,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};