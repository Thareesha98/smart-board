import { useAuth } from '../../context/student/StudentAuthContext.jsx';

const useProfileLogic = () => {
  const { 
    currentUser, 
    updateProfile, 
    updateAvatar: updateAvatarContext, 
    updatePreferences: updatePreferencesContext 
  } = useAuth();

  // --- 1. TRANSFORM DATA (Backend -> Frontend) ---
  // Backend provides "fullName", Frontend Profile needs "firstName" and "lastName"
  
  let firstName = "Student";
  let lastName = "";
  
  if (currentUser?.fullName) {
    const parts = currentUser.fullName.trim().split(" ");
    if (parts.length > 0) {
        firstName = parts[0];
        lastName = parts.slice(1).join(" "); // Everything else is last name
    }
  }

  // Create a user object that the Profile Page understands
  const userData = currentUser ? {
      ...currentUser,
      firstName: firstName,
      lastName: lastName,
      university: currentUser.studentUniversity, // Map Backend 'studentUniversity' -> Frontend 'university'
      avatar: currentUser.profileImageUrl || 'https://randomuser.me/api/portraits/women/50.jpg', // Map 'profileImageUrl' -> 'avatar'
  
      preferences: currentUser.preferences || {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false
      }
  } : {};

  // --- 2. UPDATE HANDLERS (Frontend -> Backend) ---

  // Called by "Edit Personal Info" Modal
  const updatePersonalInfo = async (data) => {
    const payload = {
       // Combine First/Last back into FullName for Backend
       fullName: `${data.firstName} ${data.lastName}`.trim(),
       
       phone: data.phone,
       address: data.address,
       gender: data.gender ? data.gender.toUpperCase() : null,
       studentUniversity: data.university, // Send as 'studentUniversity'
       studentId: data.studentId,
       dob: data.dob,
       emergencyContact: data.emergencyContact
    };

    await updateProfile(payload);
  };

  // Called by generic "Edit Profile" Modal
  const updateProfileHandler = async (data) => {
     let payload = { ...data };
     
     // If user edited names separately, combine them
     if (data.firstName || data.lastName) {
        payload.fullName = `${data.firstName || firstName} ${data.lastName || lastName}`.trim();
     }
     
     await updateProfile(payload);
  };

  return {
    userData,
    updatePersonalInfo,
    updateProfile: updateProfileHandler,
    updateAvatar: updateAvatarContext,
    updatePreferences: updatePreferencesContext
  };
};

export default useProfileLogic;