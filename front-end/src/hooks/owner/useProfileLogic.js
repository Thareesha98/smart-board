import { useState } from 'react';
import { useOwnerAuth } from '../../context/owner/OwnerAuthContext';

const useOwnerProfileLogic = () => {
  const { currentUser } = useOwnerAuth();

  // Mock state to simulate the context updates if backend isn't ready
  // In production, these update functions would call your API/Context
  const [localData, setLocalData] = useState({
    firstName: currentUser?.firstName || "John",
    lastName: currentUser?.lastName || "Doe",
    email: currentUser?.email || "owner@example.com",
    username: currentUser?.username || "johndoe_owner",
    phone: currentUser?.phone || "+94 77 123 4567",
    avatar: currentUser?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
    businessName: currentUser?.businessName || "Boarding Paradise",
    address: currentUser?.address || "123, Galle Road, Colombo 03",
    joinDate: currentUser?.createdAt || "2023-08-15",
    paymentMethod: "**** 4242",
    stats: {
      activeAds: 12,
      tenants: 45,
      visits: 128,
      rating: "4.8"
    },
    preferences: {
      emailNotifications: true,
      autoConfirm: false, // Owner specific
      marketingEmails: false
    }
  });

  const updateBusinessInfo = (data) => {
    setLocalData(prev => ({ ...prev, ...data }));
    // updateContext(data); // TODO: Connect to real context
  };

  const updateAvatar = (avatarUrl) => {
    setLocalData(prev => ({ ...prev, avatar: avatarUrl }));
  };

  const updatePreferences = (key, value) => {
    setLocalData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  return {
    ownerData: localData,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences
  };
};

export default useOwnerProfileLogic;