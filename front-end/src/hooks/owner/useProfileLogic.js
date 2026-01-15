import { useState, useEffect, useCallback } from 'react';
import { getOwnerProfile, updateOwnerProfile } from "../../api/owner/service";

const useProfileLogic = () => {
  
  const [ownerData, setOwnerData] = useState({
    firstName: "", 
    fullName: "", // Acts as Business Name
    email: "",
    phone: "",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    address: "",
    accNo: "",
    // Backend doesn't support preferences yet, so we keep defaults locally
    preferences: { 
      emailNotifications: true, 
      autoConfirm: false, 
      marketingEmails: false 
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch Profile ---
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      // Use the service function
      const data = await getOwnerProfile();

      setOwnerData(prev => ({
        ...prev,
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        // If backend sends null for image, keep the default or previous one
        avatar: data.profileImageUrl || prev.avatar,
        address: data.address,
        accNo: data.accNo,
        verifiedOwner: data.verifiedOwner,
        preferences: prev.preferences 
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

  // --- Helper: Centralized Update Logic ---
  const handleServiceUpdate = async (payload) => {
    try {
      // Merge current data with the new payload to ensure we don't send nulls
      // if the backend expects a full DTO.
      const finalPayload = {
        fullName: payload.fullName || ownerData.fullName,
        phone: payload.phone || ownerData.phone,
        accNo: payload.accNo || ownerData.accNo,
        profileImageUrl: payload.profileImageUrl || ownerData.avatar
        // Note: 'address' is not currently updatable via the OwnerProfileUpdateDTO
      };

      // Use the service function
      const updatedData = await updateOwnerProfile(finalPayload);
      
      // Update local state with the fresh response from backend
      setOwnerData(prev => ({
        ...prev,
        fullName: updatedData.fullName,
        phone: updatedData.phone,
        avatar: updatedData.profileImageUrl,
        accNo: updatedData.accNo
      }));

      return true;
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };

  // --- 2. Action: Update Business Info ---
  const updateBusinessInfo = async (formData) => {
    // Map Frontend Form keys -> Backend DTO keys
    await handleServiceUpdate({
      fullName: formData.businessName, 
      phone: formData.phone,
      accNo: formData.paymentMethod 
    });
  };

  // --- 3. Action: Update Avatar ---
  const updateAvatar = async (avatarUrl) => {
    // Map Frontend Avatar -> Backend 'profileImageUrl'
    await handleServiceUpdate({ profileImageUrl: avatarUrl });
  };

  // --- 4. Action: Update Preferences (Local Only) ---
  const updatePreferences = (key, value) => {
    setOwnerData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  return {
    ownerData,
    isLoading,
    error,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences
  };
};

export default useProfileLogic;