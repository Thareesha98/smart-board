import { useAuth } from '../context/AuthContext';

const useProfileLogic = () => {
  // Get everything from AuthContext instead of local state
  const { 
    currentUser, 
    updateProfile: updateProfileContext, 
    updateAvatar: updateAvatarContext, 
    updatePreferences: updatePreferencesContext 
  } = useAuth();

  // Update personal info - syncs with AuthContext
  const updatePersonalInfo = (data) => {
    const updatedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
      university: data.university,
      studentId: data.studentId,
      address: data.address,
      emergencyContact: data.emergencyContact,
    };
    updateProfileContext(updatedData);
  };

  // Update full profile - syncs with AuthContext
  const updateProfile = (data) => {
    const updatedData = {
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
    };
    updateProfileContext(updatedData);
  };

  // Update avatar - syncs with AuthContext (also updates Sidebar & Header)
  const updateAvatar = (avatarUrl) => {
    updateAvatarContext(avatarUrl);
  };

  // Update preferences - syncs with AuthContext
  const updatePreferences = (preference, value) => {
    updatePreferencesContext(preference, value);
  };

  return {
    userData: currentUser || {}, // Return current user from AuthContext
    updatePersonalInfo,
    updateProfile,
    updateAvatar,
    updatePreferences,
  };
};

export default useProfileLogic;