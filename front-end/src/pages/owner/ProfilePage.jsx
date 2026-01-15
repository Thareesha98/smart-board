import React, { useState } from 'react';
import HeaderBar from '../../components/Owner/common/HeaderBar';
import Notification from '../../components/student/maintenance/Notification';

// Component Imports
import ChangeAvatarModal from '../../components/student/profile/ChangeAvatarModal';
import PreferencesSection from '../../components/student/profile/PreferencesSection';
import ProfileHeader from '../../components/Owner/profile/ProfileHeader';
import BusinessInfoSection from '../../components/Owner/profile/BusinessInfoSection';
import AccountSection from '../../components/Owner/profile/AccountSection';
import EditBusinessModal from '../../components/Owner/profile/EditBusinessModal';

import useProfileLogic from '../../hooks/owner/useProfileLogic';

const ProfilePage = () => {
  const {
    ownerData,
    isLoading,
    error,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences,
  } = useProfileLogic();

  const [notification, setNotification] = useState(null);
  const [isEditBusinessOpen, setIsEditBusinessOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  // --- Handlers ---
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateBusiness = async (data) => {
    try {
      await updateBusinessInfo(data);
      setIsEditBusinessOpen(false);
      showNotification('Business information updated successfully!', 'success');
    } catch (err) {
      showNotification('Failed to update information. Please try again.', 'error');
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

  // --- Loading / Error States ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light">
        <div className="font-medium text-gray-500">Loading Profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light">
        <div className="font-medium text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 space-y-6 bg-light">
      
      <HeaderBar 
        title="My Profile" 
        subtitle="Manage your business identity and account settings"
        userAvatar={ownerData.avatar}
        userName={ownerData.fullName} 
      />

      <div className="px-4 max-w-[1600px] mx-auto space-y-6 mt-8">
        
        {/* Profile Header */}
        <ProfileHeader
          ownerData={ownerData}
          onChangeAvatar={() => setIsChangeAvatarOpen(true)}
        />

        {/* Sections Grid */}
        <div className="space-y-6">
          
          {/* Business Info */}
          <BusinessInfoSection
            // The component expects 'businessName', so we map 'fullName' to it
            ownerData={{
                ...ownerData,
                businessName: ownerData.fullName 
            }}
            onEdit={() => setIsEditBusinessOpen(true)}
          />

          {/* Account Info */}
          <AccountSection
            // The component expects 'paymentMethod', so we map 'accNo' to it
            ownerData={{
                ...ownerData,
                paymentMethod: ownerData.accNo 
            }}
            onSecurity={() => showNotification('Security settings coming soon!', 'info')}
          />

          {/* Preferences */}
          <PreferencesSection
            preferences={ownerData.preferences}
            onPreferenceChange={updatePreferences}
            onSettings={() => showNotification('Settings coming soon!', 'info')}
          />
        </div>
      </div>

      {/* --- Modals --- */}
      <EditBusinessModal
        isOpen={isEditBusinessOpen}
        onClose={() => setIsEditBusinessOpen(false)}
        // Map data for the modal form inputs
        ownerData={{
            ...ownerData,
            businessName: ownerData.fullName,
            paymentMethod: ownerData.accNo
        }}
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