import { useState } from 'react';
import { sampleProfileData } from '../data/profileData';

const useProfileLogic = () => {
  const [userData, setUserData] = useState(sampleProfileData);

  const updatePersonalInfo = (data) => {
    setUserData(prev => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
      university: data.university,
      studentId: data.studentId,
      address: data.address,
      emergencyContact: data.emergencyContact,
    }));
  };

  const updateProfile = (data) => {
    setUserData(prev => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      phone: data.phone,
      university: data.university,
      studentId: data.studentId,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      emergencyContact: data.emergencyContact,
    }));
  };

  const updateAvatar = (avatarUrl) => {
    setUserData(prev => ({
      ...prev,
      avatar: avatarUrl,
    }));
  };

  const updatePreferences = (preference, value) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }));
  };

  return {
    userData,
    updatePersonalInfo,
    updateProfile,
    updateAvatar,
    updatePreferences,
  };
};

export default useProfileLogic;