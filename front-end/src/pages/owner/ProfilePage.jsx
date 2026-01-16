import React, { useState } from 'react';
// import OwnerLayout from '../../components/Owner/common/OwnerLayout'; // Ensure you have this
import HeaderBar from '../../components/Owner/common/HeaderBar'; // Or use Layout

import useProfileLogic from '../../hooks/owner/useProfileLogic'; // The file above

// Component Imports (Ensure these exist or rename the Student ones)
import ProfileHeader from '../../components/Owner/profile/ProfileHeader';
import BusinessInfoSection from '../../components/Owner/profile/BusinessInfoSection'; // Renamed
import AccountSection from '../../components/Owner/profile/AccountSection';
import PreferencesSection from '../../components/student/profile/PreferencesSection'; // Can reuse Student's
import EditBusinessModal from '../../components/Owner/profile/EditBusinessModal'; // Renamed
import ChangeAvatarModal from '../../components/student/profile/ChangeAvatarModal'; // Can reuse Student's
import Notification from '../../components/student/maintenance/Notification'; // Can reuse Student's

const ProfilePage = () => {
  const {
    ownerData,
    isLoading,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences,
  } = useProfileLogic();

  const [notification, setNotification] = useState(null);
  const [isEditBusinessOpen, setIsEditBusinessOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  // Notification Helper
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Handlers ---
  const handleUpdateBusiness = async (data) => {
    try {
      await updateBusinessInfo(data);
      setIsEditBusinessOpen(false);
      showNotification('Business information updated successfully!', 'success');
    } catch (err) {
      showNotification('Failed to update. Check your connection.', 'error');
    }
  };

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      await updateAvatar(avatarUrl);
      setIsChangeAvatarOpen(false);
      showNotification('Profile picture updated successfully!', 'success');
    } catch (err) {
      showNotification('Failed to update profile picture.', 'error');
    }
  };

  const handlePreferenceChange = (preference, value) => {
    updatePreferences(preference, value);
  };

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen pb-12 bg-light">
      {/* Reusing your HeaderBar or Layout */}
      <HeaderBar 
        title="My Profile" 
        subtitle="Manage your business identity and account settings"
        userAvatar={ownerData.avatar}
        userName={ownerData.businessName} 
      />

      <div className="px-4 max-w-[1600px] mx-auto space-y-6 mt-8">
        
        {/* 1. Profile Header */}
        <ProfileHeader
          ownerData={ownerData} // Pass ownerData instead of userData
          onChangeAvatar={() => setIsChangeAvatarOpen(true)}
        />

        <div className="space-y-6">
          {/* 2. Business Info (Was Personal Info) */}
          <BusinessInfoSection
            ownerData={ownerData}
            onEdit={() => setIsEditBusinessOpen(true)}
          />

          {/* 3. Account Info */}
          <AccountSection
            ownerData={ownerData}
            onSecurity={() => showNotification('Security settings coming soon!', 'info')}
          />

          {/* 4. Preferences */}
          <PreferencesSection
            preferences={ownerData.preferences}
            onPreferenceChange={handlePreferenceChange}
            onSettings={() => showNotification('Settings coming soon!', 'info')}
          />
        </div>
      </div>

      {/* --- Modals --- */}
      <EditBusinessModal
        isOpen={isEditBusinessOpen}
        onClose={() => setIsEditBusinessOpen(false)}
        ownerData={ownerData}
        onSubmit={handleUpdateBusiness}
      />

      <ChangeAvatarModal
        isOpen={isChangeAvatarOpen}
        onClose={() => setIsChangeAvatarOpen(false)}
        currentAvatar={ownerData.avatar}
        onSubmit={handleUpdateAvatar}
      />

      <Notification notification={notification} />
    </div>
  );
};

export default ProfilePage;