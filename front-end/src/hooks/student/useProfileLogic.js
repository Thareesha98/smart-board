import { useState } from 'react';
import { useAuth } from '../../context/student/StudentAuthContext';
import StudentService from '../../api/student/StudentService';

const useProfileLogic = () => {
  const { currentUser, updateLocalUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // 1. General Profile Update
  const updateProfile = async (data) => {
    setIsLoading(true);
    try {
      // Prepare DTO for Backend
      const payload = {
        fullName: `${data.firstName} ${data.lastName}`, // Backend expects fullName
        email: data.email,
        phone: data.phone,
        address: data.address,
        gender: data.gender?.toUpperCase(),
        role: "STUDENT",
        studentUniversity: data.university,
        // Backend UserRegisterDTO doesn't have dob/studentId, so these might be lost 
        // unless you add them to your Java DTO.
      };

      // Call API: PUT /api/users/{id}
      const updatedUserDTO = await StudentService.updateProfile(currentUser.id, payload);

      // Sync Context (Updates Header/Sidebar instantly)
      updateLocalUser(updatedUserDTO);

      return { success: true };
    } catch (error) {
      console.error("Update failed:", error);
      return { success: false, message: "Failed to update profile." };
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Personal Info Wrapper
  const updatePersonalInfo = async (formData) => {
    // Merge new form data with existing user data
    const mergedData = {
      ...currentUser,
      ...formData, 
      // Map Frontend 'university' to Backend 'studentUniversity' if needed
      university: formData.university || currentUser.studentUniversity
    };
    return await updateProfile(mergedData);
  };

  // 3. Avatar Update
  const updateAvatar = async (avatarUrl) => {
    // Note: Your provided backend doesn't have a specific Avatar endpoint yet.
    // We will simulate it by updating the profileImageUrl field via the main update endpoint.
    const mergedData = { ...currentUser, profileImageUrl: avatarUrl };
    return await updateProfile(mergedData);
  };

  // 4. Preferences (Local only for now)
  const updatePreferences = (pref, val) => {
    const newPrefs = { ...(currentUser.preferences || {}), [pref]: val };
    const updatedUser = { ...currentUser, preferences: newPrefs };
    updateLocalUser(updatedUser);
  };

  return {
    // Map Backend DTO fields to Frontend expectations
    userData: currentUser ? {
      ...currentUser,
      firstName: currentUser.fullName ? currentUser.fullName.split(' ')[0] : '',
      lastName: currentUser.fullName ? currentUser.fullName.split(' ').slice(1).join(' ') : '',
      avatar: currentUser.profileImageUrl || 'https://randomuser.me/api/portraits/women/50.jpg',
      university: currentUser.studentUniversity,
    } : {},
    updatePersonalInfo,
    updateProfile,
    updateAvatar,
    updatePreferences,
  };
};

export default useProfileLogic;