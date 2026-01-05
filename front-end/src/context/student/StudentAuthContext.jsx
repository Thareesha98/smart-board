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

  // 2. Login
  const login = async (email, password) => {
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            Authorization: undefined,
          },
        }
      );
      const { token, refreshToken, user } = response.data;

      if (user.role !== "STUDENT") {
        return {
          success: false,
          message:
            "Access Denied: This account is not registered as a Student.",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      const msg =
        error.response?.status === 401 ? "Invalid credentials" : "Login failed";
      return { success: false, message: msg };
    }
  };

  // 3. Signup Step 1: Request OTP
  const signup = async (userData) => {
    try {
      const payload = {
        ...userData,
        role: "STUDENT",
      };

      // 🚀 CRITICAL FIX: Force Authorization header to undefined
      // This ensures the request is sent as "Public" even if an old token exists
      const config = {
        headers: {
          Authorization: undefined,
        },
      };

      // ✅ Using the endpoint you confirmed: /auth/register/request
      const response = await api.post(
        "/auth/register/request",
        payload,
        config
      );

      return {
        success: true,
        message: response.data?.message || "OTP sent successfully!",
      };
    } catch (error) {
      console.error("Signup Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed.",
      };
    }
  };

  // 4. Verify OTP
  const verifyRegistration = async (email, otp) => {
    try {
      const response = await api.post("/auth/register/verify", { email, otp });
      const { token, refreshToken, user } = response.data;

      if (user.role !== "STUDENT") {
        return {
          success: false,
          message: "Role mismatch during verification.",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || "Invalid OTP Code",
      };
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

  // --- 3. PROFILE UPDATE ACTIONS (Connects Sidebar/Header/Profile) ---

  // Update Text Details
  const updateProfile = async (updatedData) => {
    try {
      if (!currentUser?.id) return { success: false };

      // 1. Call Backend
      const responseUser = await StudentService.updateProfile(
        currentUser.id,
        updatedData
      );

      // 2. Merge response with current user state (Backend should return updated user object)
      const newUser = { ...currentUser, ...responseUser };

      // 3. Update LocalStorage & State
      localStorage.setItem("user_data", JSON.stringify(newUser));
      setCurrentUser(newUser);

      return { success: true };
    } catch (error) {
      console.error("Profile Update Failed:", error);
      return { success: false, message: "Failed to update profile." };
    }
  };

  // Update Avatar
  const updateAvatar = async (fileOrUrl) => {
    try {
      let newAvatarUrl;

      // Check if it's a file (for upload) or a string (gallery selection)
      if (typeof fileOrUrl === "object") {
        // It's a File object, upload to backend
        const response = await StudentService.updateAvatar(
          currentUser.id,
          fileOrUrl
        );
        newAvatarUrl = response.avatarUrl; // Assuming backend returns { avatarUrl: "..." }
      } else {
        // It's a string from the gallery, just update profile directly
        newAvatarUrl = fileOrUrl;
        // Optional: Call updateProfile here to save the gallery URL choice to backend
        await updateProfile({ ...currentUser, avatar: newAvatarUrl });
      }

      // Update State
      const newUserState = { ...currentUser, avatar: newAvatarUrl };
      localStorage.setItem("user_data", JSON.stringify(newUserState));
      setCurrentUser(newUserState);

      return { success: true };
    } catch (error) {
      console.error("Avatar Update Failed", error);
      return { success: false };
    }
  };

  // Update Preferences (Mock implementation if no backend endpoint yet)
  const updatePreferences = (key, value) => {
    const newPreferences = { ...(currentUser.preferences || {}), [key]: value };
    const newUserState = { ...currentUser, preferences: newPreferences };

    // Update Local & State
    localStorage.setItem("user_data", JSON.stringify(newUserState));
    setCurrentUser(newUserState);

    // Ideally call backend API here to save preference
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
  const context = useContext(StudentAuthContext);
  if (!context)
    throw new Error("useAuth must be used within a StudentAuthProvider");
  return context;
};
