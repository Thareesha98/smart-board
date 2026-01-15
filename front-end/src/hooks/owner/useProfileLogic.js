import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";

// Update this if your backend runs on a different port
const API_BASE_URL = "http://localhost:8080/api/owner/profile";

const useProfileLogic = () => {
  const { currentOwner } = useOwnerAuth();

  const [ownerData, setOwnerData] = useState({
    // Default initial state
    firstName: "",
    fullName: "", // Maps to Business Name
    email: "",
    phone: "",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    address: "",
    accNo: "",
    // Removed 'stats' object here to get rid of the "active tabs"
    preferences: {
      emailNotifications: true,
      autoConfirm: false,
      marketingEmails: false,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // --- Fetch Profile ---
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_BASE_URL, getAuthHeader());
      const data = response.data;

      setOwnerData((prev) => ({
        ...prev,
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        avatar: data.profileImageUrl || prev.avatar,
        address: data.address,
        accNo: data.accNo,
        verifiedOwner: data.verifiedOwner,
        preferences: prev.preferences,
      }));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Could not load profile data.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // --- Update Profile ---
  const updateBusinessInfo = async (data) => {
    const payload = {
      fullName: data.businessName, // Frontend 'businessName' -> Backend 'fullName'
      phone: data.phone,
      accNo: data.paymentMethod, // Frontend 'paymentMethod' -> Backend 'accNo'
    };
    // Note: Backend ProfileServiceImpl does not currently update 'address'

    await updateBackend(payload);
  };

  const updateAvatar = async (avatarUrl) => {
    await updateBackend({ profileImageUrl: avatarUrl });
  };

  const updateBackend = async (payload) => {
    try {
      // Merging current data with updates
      const finalPayload = {
        fullName: payload.fullName || ownerData.fullName,
        phone: payload.phone || ownerData.phone,
        accNo: payload.accNo || ownerData.accNo,
        profileImageUrl: payload.profileImageUrl || ownerData.avatar,
      };

      const response = await axios.put(
        API_BASE_URL,
        finalPayload,
        getAuthHeader()
      );

      setOwnerData((prev) => ({
        ...prev,
        fullName: response.data.fullName,
        phone: response.data.phone,
        avatar: response.data.profileImageUrl,
        accNo: response.data.accNo,
      }));
    } catch (err) {
      throw err;
    }
  };

  const updatePreferences = (key, value) => {
    setOwnerData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  return {
    ownerData,
    isLoading,
    error,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences,
  };
};

export default useProfileLogic;
