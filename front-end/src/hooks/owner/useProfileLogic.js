import { useState, useEffect, useCallback } from "react";
import { getOwnerProfile, updateOwnerProfile } from "../../api/owner/service"; // Use the service we fixed

const useProfileLogic = () => {
  const [ownerData, setOwnerData] = useState({
    // Default structure matching the Page expectations
    businessName: "", // Backend: fullName
    email: "",
    phone: "",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    address: "",
    paymentMethod: "", // Backend: accNo
    nicNumber: "",

    // Preferences (Local defaults since backend doesn't have them yet)
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  // --- 1. FETCH DATA (Backend -> Frontend) ---
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getOwnerProfile(); // Call backend

      // Map Backend DTO -> Frontend State
      setOwnerData((prev) => ({
        ...prev,
        id: data.id,
        businessName: data.fullName, // Map fullName -> businessName
        email: data.email,
        phone: data.phone,
        address: data.address,
        avatar: data.profileImageUrl || prev.avatar,
        paymentMethod: data.accNo, // Map accNo -> paymentMethod
        nicNumber: data.nicNumber,
        verifiedOwner: data.verifiedOwner,

        // Keep existing preferences
        preferences: prev.preferences,
      }));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load profile", err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // --- 2. UPDATE HANDLERS (Frontend -> Backend) ---

  // Helper to send data to backend
  const handleServiceUpdate = async (payload) => {
    // Merge updates with current state to avoid sending nulls
    const backendPayload = {
      fullName: payload.businessName || ownerData.businessName,
      phone: payload.phone || ownerData.phone,
      accNo: payload.paymentMethod || ownerData.paymentMethod,
      profileImageUrl: payload.avatar || ownerData.avatar,
      // Backend DTO only accepts these fields for now
    };

    const updated = await updateOwnerProfile(backendPayload);

    // Update local state immediately
    setOwnerData((prev) => ({
      ...prev,
      businessName: updated.fullName,
      phone: updated.phone,
      paymentMethod: updated.accNo,
      avatar: updated.profileImageUrl,
    }));
  };

  // Called by "Edit Business Info" Modal
  const updateBusinessInfo = async (data) => {
    await handleServiceUpdate({
      businessName: data.businessName,
      phone: data.phone,
      paymentMethod: data.paymentMethod,
    });
  };

  // Called by Avatar Modal
  const updateAvatar = async (avatarUrl) => {
    await handleServiceUpdate({ avatar: avatarUrl });
  };

  // Called by Preferences Section (Local Only)
  const updatePreferences = (key, value) => {
    setOwnerData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  return {
    ownerData, // Replaces 'userData'
    isLoading,
    updateBusinessInfo, // Replaces 'updatePersonalInfo'
    updateAvatar,
    updatePreferences,
  };
};

export default useProfileLogic;
