import React, { createContext, useContext, useState, useEffect } from 'react';

const OwnerAuthContext = createContext(null);

export const OwnerAuthProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedOwner = localStorage.getItem('smartboad_owner_user');
        const storedCreds = localStorage.getItem('smartboad_owner_credentials');
        
        if (storedOwner && storedCreds) {
            const parsedOwner = JSON.parse(storedOwner);
          setCurrentOwner(JSON.parse(storedOwner));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading owner data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ADDED: Signup function
  const signup = (userData) => {
    try {
      const newUser = {
        ...userData,
        role: 'owner',
        joinDate: new Date().toISOString(),
        avatar: 'https://ui-avatars.com/api/?name=' + userData.firstName, // Default avatar
      };
      
      // Store in localStorage using owner-specific keys
      localStorage.setItem('smartboad_owner_user', JSON.stringify(newUser));
      localStorage.setItem('smartboad_owner_credentials', JSON.stringify({
        email: userData.email,
        password: userData.password,
      }));
      
      // Update state so the user is "logged in" immediately after signup if desired
      // Or keep it as is and let them manually login
      return { success: true };
    } catch (error) {
      console.error('Signup Error:', error);
      return { success: false, message: 'Could not complete registration' };
    }
  };

  const login = (email, password) => {
    const storedCreds = localStorage.getItem('smartboad_owner_credentials');
    const storedOwner = localStorage.getItem('smartboad_owner_user');
    
    if (storedCreds && storedOwner) {
      const credentials = JSON.parse(storedCreds);
      if (credentials.email === email && credentials.password === password) {
        const ownerData = JSON.parse(storedOwner);
        ownerData.lastLogin = new Date().toISOString();
        setCurrentOwner(ownerData);
        setIsAuthenticated(true);
        localStorage.setItem('smartboad_owner_user', JSON.stringify(ownerData));
        return { success: true };
      }
    }
    return { success: false, message: 'Invalid owner credentials' };
  };

  const logout = () => {
    setCurrentOwner(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smartboad_owner_user');
    localStorage.removeItem('smartboad_owner_credentials');
  };

  // UPDATED: Include signup in the value object
  const value = { 
    currentOwner, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    signup // MUST BE HERE
  };

  return <OwnerAuthContext.Provider value={value}>{children}</OwnerAuthContext.Provider>;
};

export const useOwnerAuth = () => {
  const context = useContext(OwnerAuthContext);
  if (!context) throw new Error('useOwnerAuth must be used within an OwnerAuthProvider');
  return context;
};