import { useState, useEffect, useCallback } from "react";
import { getOwnerProfile, updateOwnerProfile } from "../../api/owner/service"; // Update path if needed
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";

const useProfileLogic = () => {
  const { currentOwner } = useOwnerAuth(); // Optional: if you need context state

  const [ownerData, setOwnerData] = useState({
    id: null,
    businessName: "", // Maps to backend 'fullName'
    email: "",
    phone: "",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg", // Default fallback
    address: "",
    paymentMethod: "", // Maps to backend 'accNo'
    nicNumber: "",
    verifiedOwner: false,

    // Preferences (Local only for now)
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. FETCH DATA ---
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getOwnerProfile(); // Call Service

      // Map Backend DTO -> Frontend State
      setOwnerData((prev) => ({
        ...prev,
        id: data.id,
        businessName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        avatar: data.profileImageUrl || prev.avatar,
        paymentMethod: data.accNo,
        nicNumber: data.nicNumber,
        verifiedOwner: data.verifiedOwner,
        preferences: prev.preferences, // Keep local prefs
      }));
    } catch (err) {
      console.error("Failed to load profile", err);
      setError("Could not load profile data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // --- 2. UPDATE HANDLER ---
  const handleServiceUpdate = async (payload) => {
    // 1. Prepare Payload for Backend (OwnerProfileUpdateDTO)
    // We merge with existing data to ensure no fields are wiped out accidentally
    const backendPayload = {
      fullName: payload.businessName || ownerData.businessName,
      phone: payload.phone || ownerData.phone,
      accNo: payload.paymentMethod || ownerData.paymentMethod,
      profileImageUrl: payload.avatar || ownerData.avatar,
      address:
        payload.address !== undefined ? payload.address : ownerData.address,
    };

    // 2. Call API
    const updated = await updateOwnerProfile(backendPayload);

    // 3. Update Local State with the Fresh Response
    setOwnerData((prev) => ({
      ...prev,
      businessName: updated.fullName,
      phone: updated.phone,
      paymentMethod: updated.accNo,
      avatar: updated.profileImageUrl,
      address: updated.address, // Ensure backend returns this!
    }));
  };

  // --- 3. EXPOSED ACTIONS ---

  const updateBusinessInfo = async (data) => {
    // Expects: { businessName, phone, address, paymentMethod? }
    await handleServiceUpdate({
      businessName: data.businessName,
      phone: data.phone,
      address: data.address,
      paymentMethod: data.paymentMethod, // Optional, usually handled by AccountModal
    });
  };

  const updateAvatar = async (avatarUrl) => {
    await handleServiceUpdate({ avatar: avatarUrl });
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
