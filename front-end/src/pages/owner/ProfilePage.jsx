import React, { useState } from 'react';
import HeaderBar from '../../components/Owner/common/HeaderBar'; 
import Notification from '../../components/student/maintenance/Notification';

// Hooks
import useProfileLogic from '../../hooks/owner/useProfileLogic';
import api from '../../api/api';

// Components
import ProfileHeader from '../../components/Owner/profile/ProfileHeader';
import BusinessInfoSection from '../../components/Owner/profile/BusinessInfoSection';
import AccountSection from '../../components/Owner/profile/AccountSection';
import PreferencesSection from '../../components/student/profile/PreferencesSection';

// Modals
import EditBusinessModal from '../../components/Owner/profile/EditBusinessModal';
import EditAccountModal from '../../components/Owner/profile/EditAccountModal';
import ChangeAvatarModal from '../../components/student/profile/ChangeAvatarModal';

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
  
  // Modal States
  const [isEditBusinessOpen, setIsEditBusinessOpen] = useState(false);
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  // --- Helpers ---
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Handlers ---

  // 1. Update Business Info (Name, Phone, Address)
  const handleUpdateBusiness = async (formData) => {
    try {
      await updateBusinessInfo(formData);
      setIsEditBusinessOpen(false);
      showNotification('Business information updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Failed to update information.', 'error');
    }
  };

  // 2. Update Account Info (Bank Acc + Password)
  const handleUpdateAccount = async (formData) => {
    try {
      // A. Update Bank Account (if changed)
      if (formData.accNo !== ownerData.paymentMethod) {
         await updateBusinessInfo({
             paymentMethod: formData.accNo 
             // Logic hook merges this with existing Name/Phone/Address
         });
      }

      // B. Update Password (if requested)
      if (formData.isPasswordChange) {
        // Ensure you have this endpoint in AuthController
        await api.post('/auth/change-password', {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        });
      }

      setIsEditAccountOpen(false);
      showNotification('Account settings saved!', 'success');
    } catch (err) {
      console.error(err);
      // Re-throw so modal can show the specific error
      throw new Error(err.response?.data?.message || "Failed to update account.");
    }
  };

  // 3. Update Avatar
  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      await updateAvatar(avatarUrl);
      setIsChangeAvatarOpen(false);
      showNotification('Profile picture updated!', 'success');
    } catch (err) {
      showNotification('Failed to update image.', 'error');
    }
  };

  // --- Render ---

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light">
         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 bg-light">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 space-y-6 bg-light">
      
      {/* Header Bar */}
      <HeaderBar 
        title="My Profile" 
        subtitle="Manage your business identity and account settings"
        userAvatar={ownerData.avatar}
        userName={ownerData.businessName} 
      />

      <div className="px-4 max-w-[1600px] mx-auto space-y-6 mt-8">
        
        {/* Profile Header */}
        <ProfileHeader
          ownerData={ownerData}
          onChangeAvatar={() => setIsChangeAvatarOpen(true)}
        />

        {/* Info Grid */}
        <div className="space-y-6">
          
          {/* Business Info Section */}
          <BusinessInfoSection
            ownerData={ownerData}
            onEdit={() => setIsEditBusinessOpen(true)}
          />

          {/* Account Section */}
          <AccountSection
            ownerData={ownerData}
            onEditAccount={() => setIsEditAccountOpen(true)}
          />

          {/* Preferences Section */}
          <PreferencesSection
            preferences={ownerData.preferences}
            onPreferenceChange={updatePreferences}
            onSettings={() => showNotification('Global settings coming soon!', 'info')}
          />
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* 1. Edit Business Modal */}
      <EditBusinessModal
        isOpen={isEditBusinessOpen}
        onClose={() => setIsEditBusinessOpen(false)}
        ownerData={ownerData}
        onSubmit={handleUpdateBusiness}
      />

      {/* 2. Edit Account Modal */}
      <EditAccountModal
        isOpen={isEditAccountOpen}
        onClose={() => setIsEditAccountOpen(false)}
        currentAccNo={ownerData.paymentMethod}
        onSubmit={handleUpdateAccount}
      />

      {/* 3. Change Avatar Modal */}
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